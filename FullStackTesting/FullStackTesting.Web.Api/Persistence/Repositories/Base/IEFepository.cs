using System.Threading.Tasks;
using System.Collections.Generic;
using FullStackTesting.Web.Api.Models;

namespace FullStackTesting.Web.Api.Persistence
{
    public interface IEFepository<T> where T : BaseEntity
    {
        Task<T> AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
        Task<List<T>> GetAllAsync();
        Task<T> GetByIdAsync(int id);
        Task<List<T>> ListAsync(ISpecification<T> spec);
        Task<T> GetSingleBySpecAsync(ISpecification<T> spec);
    }
}