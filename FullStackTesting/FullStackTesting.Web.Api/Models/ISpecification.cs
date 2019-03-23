using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace FullStackTesting.Web.Api.Models
{
    public interface ISpecification<T>
    {
        List<string>                      IncludeStrings { get; }
        Expression<Func<T, bool>>         Criteria       { get; }
        List<Expression<Func<T, object>>> Includes       { get; }
    }
}
