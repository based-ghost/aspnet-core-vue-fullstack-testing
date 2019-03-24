using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FullStackTesting.Web.Api.Models;
using FullStackTesting.Web.Api.Extensions;

namespace FullStackTesting.Web.Api.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Employee> Employees { get; set; }

        public override int SaveChanges()
        {
            AddDbGeneratedInfo();
            return base.SaveChanges();
        }

        public async Task<int> SaveChangesAsync()
        {
            AddDbGeneratedInfo();
            return await base.SaveChangesAsync();
        }

        private void AddDbGeneratedInfo()
        {
            var utcNowDate = DateTime.UtcNow;
            foreach (var entry in ChangeTracker.Entries().GetAddedOrModifiedBaseEntities())
            {
                ((BaseEntity)entry.Entity).Modified = utcNowDate;
                if (entry.State.Equals(EntityState.Added))
                    ((BaseEntity)entry.Entity).Created = utcNowDate;
            }
        }
    }
}
