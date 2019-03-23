using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using FullStackTesting.Web.Api.Models;

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
            foreach (var entry in ChangeTracker.Entries().Where(x => x.Entity is BaseEntity && (x.State.Equals(EntityState.Added) || x.State.Equals(EntityState.Modified))))
            {
                if (entry.State.Equals(EntityState.Added))
                    ((BaseEntity)entry.Entity).Created = DateTime.UtcNow;

                ((BaseEntity)entry.Entity).Modified = DateTime.UtcNow;
            }
        }
    }
}
