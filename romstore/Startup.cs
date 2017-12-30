using System.IO;
using System.Text;
using System.Threading.Tasks;
using romstore.data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace romstore
{
  public class Startup
  {
    private readonly IConfigurationRoot _config;

    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", true, true)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", true)
        .AddEnvironmentVariables();

      _config = builder.Build();
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {

      services.AddSingleton(_config);
      services.AddDbContext<RomstoreContext>(ServiceLifetime.Scoped);
      services.AddTransient<IdentityInitializer>();

      //Inject Automation Context
      //services.AddDbContext<CCSContext>(ServiceLifetime.Scoped);

      services.AddIdentity<IdentityUser, IdentityRole>()
        .AddEntityFrameworkStores<RomstoreContext>();


      services.AddAuthentication(option =>
        {
          option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidIssuer = _config["tokens:issuer"],
            ValidAudience = _config["tokens:audience"],
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["tokens:key"])),
            ValidateLifetime = true
          };
        });


      ConfigureApplicationCookie(services);

      services.AddMvc();

      services.AddAuthorization(options =>
      {
        options.AddPolicy("SuperUsers", policy => policy.RequireClaim("SuperUser"));
        options.AddPolicy("TransportCorps", policy => policy.RequireClaim("TransportCorp"));
      });
    }

    private static void ConfigureApplicationCookie(IServiceCollection services)
    {
      services.ConfigureApplicationCookie(options =>
      {
        options.Events.OnRedirectToLogin = ctx =>
        {
      if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
        ctx.Response.StatusCode = 401;
      return Task.CompletedTask;
    };

        options.Events.OnRedirectToAccessDenied = ctx =>
        {
      if (ctx.Request.Path.StartsWithSegments("/api") && ctx.Response.StatusCode == 200)
        ctx.Response.StatusCode = 401;
      return Task.CompletedTask;
    };
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory,
      IdentityInitializer identitySeeder)
    {
      loggerFactory.AddConsole(_config.GetSection("Logging"));
      loggerFactory.AddDebug();
      loggerFactory.AddFile("Logs/romstore-{Date}-log.txt");

      app.Use(async (context, next) =>
      {
        await next();
        if (context.Response.StatusCode == 404 &&
            !Path.HasExtension(context.Request.Path.Value) &&
            !context.Request.Path.Value.StartsWith("/api/"))
        {
          context.Request.Path = "/index.html";
          await next();
        }
      });

      app.UseForwardedHeaders(new ForwardedHeadersOptions
      {
        ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
      });

      app.UseAuthentication();
      app.UseMvcWithDefaultRoute();
      app.UseDefaultFiles();
      app.UseStaticFiles();

      identitySeeder.Seed().Wait();
    }
  }
}
