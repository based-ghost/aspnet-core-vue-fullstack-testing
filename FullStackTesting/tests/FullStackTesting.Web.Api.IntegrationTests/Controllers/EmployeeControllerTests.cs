using Xunit;
using System.Text;
using System.Net.Http;
using Newtonsoft.Json;
using System.Threading.Tasks;
using System.Collections.Generic;
using FullStackTesting.Web.Api.Models;

namespace FullStackTesting.Web.Api.IntegrationTests.Controllers
{
    public class EmployeeControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;

        public EmployeeControllerTests(CustomWebApplicationFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Fact]
        public async Task CanGetAllEmployeesAsync()
        {
            // The endpoint or route of the controller action
            var httpResponse = await _client.GetAsync("/api/Employee/GetAllEmployeesAsync");

            // Must be successful
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var employees = JsonConvert.DeserializeObject<List<Employee>>(stringResponse);

            Assert.Contains(employees, e => e.FirstName.Equals("Matt") && e.LastName.Equals("Areddia"));
            Assert.Contains(employees, e => e.FirstName.Equals("Jeremy") && e.LastName.Equals("Wu"));
        }

        [Fact]
        public async Task CanGetEmployeeByIdAsync()
        {
            // The endpoint or route of the controller action
            const int targetId = 5;
            var httpResponse = await _client.GetAsync($"/api/Employee/GetEmployeeByIdAsync?id={targetId}");

            // Must be successful
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var employee = JsonConvert.DeserializeObject<Employee>(stringResponse);

            Assert.Equal(targetId, employee.Id);
            Assert.Equal("Jeremy", employee.FirstName);
            Assert.Equal("Wu", employee.LastName);
        }

        [Fact]
        public async Task CanAddEmployeeAsync()
        {
            // New Employee record to be posted in content
            var addEmployee = new Employee {
                Id = 7,
                FirstName = "TestFirstName",
                LastName = "TestLastName",
                Department = "Claims",
                FullTime = false
            };

            // The endpoint or route of the controller action (AddEmployeeAsync) with StringContent comprised of the employee to add
            var addEmployeeStringContent = new StringContent(JsonConvert.SerializeObject(addEmployee), Encoding.UTF8, "application/json");
            var httpResponse = await _client.PostAsync("/api/Employee/AddEmployeeAsync", addEmployeeStringContent);

            // Must be successful
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results (compare employee object returned in response to that passed in initial request - should match)
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var employee = JsonConvert.DeserializeObject<Employee>(stringResponse);

            Assert.Equal(addEmployee.Id, employee.Id);
            Assert.Equal(addEmployee.FirstName, employee.FirstName);
            Assert.Equal(addEmployee.LastName, employee.LastName);
        }

        [Fact]
        public async Task CanUpdateEmployeeAsync()
        {
            // Existing Employee record to be updated
            var updateEmployee = new Employee {
                Id = 4,
                FirstName = "Debbie",
                LastName = "Test",
                Department = "Accounting", // Change from Information Technology
                FullTime = false           // Change from true
            };

            // The endpoint or route of the controller action (UpdateEmployeeAsync) with StringContent comprised of the employee to update / id of employee to update
            var updateEmployeeStringContent = new StringContent(JsonConvert.SerializeObject(updateEmployee), Encoding.UTF8, "application/json");
            var httpPutResponse = await _client.PutAsync($"/api/Employee/UpdateEmployeeAsync?id={updateEmployee.Id}", updateEmployeeStringContent);

            // Must be successful
            httpPutResponse.EnsureSuccessStatusCode();

            // The endpoint or route of the controller action (GetEmployeeByIdAsync) - the employee we updated
            var httpResponse = await _client.GetAsync($"/api/Employee/GetEmployeeByIdAsync?id={updateEmployee.Id}");

            // Must be successful
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var employee = JsonConvert.DeserializeObject<Employee>(stringResponse);

            Assert.Equal(updateEmployee.FirstName, employee.FirstName);
            Assert.Equal(updateEmployee.LastName, employee.LastName);
            Assert.Equal(updateEmployee.FullTime, employee.FullTime);
            Assert.Equal(updateEmployee.Department, employee.Department);
        }

        [Fact]
        public async Task CanDeleteEmployeeAsync()
        {
            // The endpoint or route of the controller action (DeleteEmployeeAsync)
            const int targetId = 2;
            var httpDeleteResponse = await _client.DeleteAsync($"/api/Employee/DeleteEmployeeAsync?id={targetId}");

            // Must be successful
            httpDeleteResponse.EnsureSuccessStatusCode();

            // The endpoint or route of the controller action (GetAllEmployeesAsync)
            var httpResponse = await _client.GetAsync("/api/Employee/GetAllEmployeesAsync");

            // Must be successful
            httpResponse.EnsureSuccessStatusCode();

            // Deserialize and examine results (should no longer contain record having Id = 1, FirstName = 'Matt', LastName = 'Areddia')
            var stringResponse = await httpResponse.Content.ReadAsStringAsync();
            var employees = JsonConvert.DeserializeObject<List<Employee>>(stringResponse);

            Assert.DoesNotContain(employees, e => e.Id.Equals(targetId) && e.FirstName.Equals("Jane") && e.LastName.Equals("Doe"));
        }
    }
}

