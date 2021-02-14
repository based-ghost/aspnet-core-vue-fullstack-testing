using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using FullStackTesting.Web.Api.Models;

namespace FullStackTesting.Web.Api.Persistence
{
    public abstract class EFRepository<T> : IEFepository<T> where T : BaseEntity
    {
        protected readonly AppDbContext _appDbContext;

        protected EFRepository(AppDbContext appDbContext) => _appDbContext = appDbContext;

        public async Task<List<T>> GetAllAsync()
        {
            return await _appDbContext.Set<T>().ToListAsync();
        }

        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _appDbContext.Set<T>().FindAsync(id);
        }

        public async Task<T> GetSingleBySpecAsync(ISpecification<T> spec)
        {
            var result = await ListAsync(spec);
            return result.FirstOrDefault();
        }

        public async Task<List<T>> ListAsync(ISpecification<T> spec)
        {
            // fetch a Queryable that includes all expression-based includes
            var queryableResultWithIncludes = spec.Includes
                .Aggregate(_appDbContext.Set<T>().AsQueryable(), (current, include) => current.Include(include));

            // modify the IQueryable to include any string-based include statements
            var secondaryResult = spec.IncludeStrings
                .Aggregate(queryableResultWithIncludes, (current, include) => current.Include(include));

            // return the result of the query using the specification's criteria expression
            return await secondaryResult.Where(spec.Criteria).ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            _appDbContext.Set<T>().Add(entity);
            await _appDbContext.SaveChangesAsync();
            return entity;
        }

        public async Task DeleteAsync(T entity)
        {
            _appDbContext.Set<T>().Remove(entity);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity)
        {
            _appDbContext.Entry(entity).State = EntityState.Modified;
            await _appDbContext.SaveChangesAsync();
        }
    }
}