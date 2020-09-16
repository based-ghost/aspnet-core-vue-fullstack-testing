using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using FullStackTesting.Web.Api.Models;
using FullStackTesting.Web.Api.Extensions;
using FullStackTesting.Web.Api.Persistence;

namespace FullStackTesting.Web.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeRepository _employeeRepo;

        public EmployeeController(IEmployeeRepository employeeRepo)
        {
            _employeeRepo = employeeRepo;
        }

        // GET api/Employee/GetAllEmployeesAsync
        [HttpGet]
        [ProducesResponseType(typeof(List<Employee>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAllEmployeesAsync()
        {
            var employees = await _employeeRepo.GetAllAsync();
            return Ok(employees);
        }

        // GET api/Employee/GetEmployeeByIdAsync?id=3
        [HttpGet]
        [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetEmployeeByIdAsync(int id)
        {
            var employee = await _employeeRepo.GetByIdAsync(id);

            if (employee == null)
                return NotFound();

            return Ok(employee);
        }

        // POST api/Employee/AddEmployeeAsync
        [HttpPost]
        [ProducesResponseType(typeof(Employee), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> AddEmployeeAsync(int id, Employee employee)
        {
            if (!ModelState.IsValid || !id.Equals(employee.Id))
                return BadRequest(ModelState.GetErrorMessages());

            await _employeeRepo.AddAsync(employee);

            return CreatedAtAction(nameof(GetEmployeeByIdAsync), new { id }, employee);
        }

        // PUT api/Employee/UpdateEmployeeAsync
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateEmployeeAsync(int id, Employee employee)
        {
            if (!ModelState.IsValid || !id.Equals(employee.Id))
                return BadRequest(ModelState.GetErrorMessages());

            await _employeeRepo.UpdateAsync(employee);

            return NoContent();
        }

        // DELETE api/Employee/DeleteEmployeeAsync?id=3
        [HttpDelete]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteEmployeeAsync(int id)
        {
            var employee = await _employeeRepo.GetByIdAsync(id);

            if (employee == null)
                return NotFound();

            await _employeeRepo.DeleteAsync(employee);

            return NoContent();
        }
    }
}