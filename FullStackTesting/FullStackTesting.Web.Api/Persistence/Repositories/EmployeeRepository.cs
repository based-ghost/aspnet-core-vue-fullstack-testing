using FullStackTesting.Web.Api.Models;

namespace FullStackTesting.Web.Api.Persistence
{
    public sealed class EmployeeRepository : EFRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(AppDbContext appDbContext) : base(appDbContext){ }
    }
}