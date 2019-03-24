using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using FullStackTesting.Web.Api.Models;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace FullStackTesting.Web.Api.Extensions
{
    public static class DbContextExtensions
    {
        public static IEnumerable<EntityEntry> GetAddedOrModifiedBaseEntities(this IEnumerable<EntityEntry> entries)
            => entries.Where(x => x.Entity is BaseEntity && (x.State.Equals(EntityState.Added) || x.State.Equals(EntityState.Modified)));
    }
}
