using FullStackTesting.Web.Api.Models;

namespace FullStackTesting.Web.Api.Persistence
{
    public static class AppDbSeedData
    {
        public static void LoadSeedData(AppDbContext dbContext)
        {
            dbContext.Employees.Add(new Employee { Id = 1, FirstName = "Matt", LastName = "Areddia", Department = "Information Technology", FullTime = true });
            dbContext.Employees.Add(new Employee { Id = 2, FirstName = "Jane", LastName = "Doe", Department = "Accounting", FullTime = true });
            dbContext.Employees.Add(new Employee { Id = 3, FirstName = "Bob", LastName = "Smith", Department = "Human Resources", FullTime = true });
            dbContext.Employees.Add(new Employee { Id = 4, FirstName = "Debbie", LastName = "Test", Department = "Information Technology", FullTime = true });
            dbContext.Employees.Add(new Employee { Id = 5, FirstName = "Jeremy", LastName = "Wu", Department = "Claims", FullTime = false });
            dbContext.SaveChanges();
        }
    }
}