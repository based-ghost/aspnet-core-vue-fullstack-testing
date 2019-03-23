namespace FullStackTesting.Web.Api.Models
{
    public interface IEmployee
    {
        string FirstName  { get; set; }
        string LastName   { get; set; }
        string Department { get; set; }
        bool   FullTime   { get; set; }
    }
}
