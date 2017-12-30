using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;

namespace romstore.data
{
    public class IdentityInitializer
    {
        private readonly RomstoreContext _context;
        private readonly ILogger<IdentityInitializer> _logger;
        private readonly RoleManager<IdentityRole> _roleMgr;
        private readonly UserManager<IdentityUser> _userMgr;

        public IdentityInitializer(UserManager<IdentityUser> userMgr, RoleManager<IdentityRole> roleMgr,
            RomstoreContext context, ILogger<IdentityInitializer> logger)
        {
            _userMgr = userMgr;
            _roleMgr = roleMgr;
            _context = context;
            _logger = logger;
        }

        public async Task Seed()
        {
            //Create database schema if none exists
            _context.Database.EnsureCreated();

            try
            {
                _logger.LogInformation(" ----------- Creating Admin Role -----------");
                if (! _context.Roles.Any(r => r.Name == "Admin"))
                    await _roleMgr.CreateAsync(new IdentityRole("Admin"));
                //Create mohammad user
                await _userMgr.CreateAsync(new IdentityUser { UserName = "mohammad", Email = "mohammad@bpmo.ir", EmailConfirmed = true }, "P@ssword123");
                var identityUser = await _userMgr.FindByNameAsync("mohammad");
                await _userMgr.AddToRoleAsync(identityUser, "Admin");
                await _userMgr.AddClaimAsync(identityUser, new Claim("SuperUser", "True"));

               _logger.LogInformation(" ----------- Creating TransportCorp Role -----------");
                if (! _context.Roles.Any(r => r.Name == "TransportCorp"))
                    await _roleMgr.CreateAsync(new IdentityRole("TransportCorp"));
                //Create transco user
                await _userMgr.CreateAsync(new IdentityUser { UserName = "transco", Email = "transco@trans.ir", EmailConfirmed = true }, "Tr@ns567");
                identityUser = await _userMgr.FindByNameAsync("transco");
                await _userMgr.AddToRoleAsync(identityUser, "TransportCorp");
                await _userMgr.AddClaimAsync(identityUser, new Claim("TransportCorp", "True"));
                
            }
            catch (Exception ex)
            {
                _logger.LogError($"------ Exception Uccer In IdentityInitializer: {0}", ex);
            }
        }

    }
}