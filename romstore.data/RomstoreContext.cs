using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using romstore.data.Entities;
using Microsoft.AspNetCore.Identity;

namespace romstore.data
{
    public class RomstoreContext:IdentityDbContext<IdentityUser,IdentityRole,string>
    {
        private IConfigurationRoot _config;
        
        public RomstoreContext(DbContextOptions<RomstoreContext> options,IConfigurationRoot config)
            :base(options)
        {
            _config = config;
        }

        public DbSet<Course> Courses { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer(_config["Data:ConnectionString"]);
        }
    }
}