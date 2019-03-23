using System.ComponentModel.DataAnnotations;

namespace FullStackTesting.Web.Api.Models
{
    public class Employee : BaseEntity, IEmployee
    {
        [Required]
        public string FirstName  { get; set; }

        [Required]
        public string LastName   { get; set; }

        public string Department { get; set; }
        public bool   FullTime   { get; set; }
    }
}
