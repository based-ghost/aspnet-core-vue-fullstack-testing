using System;
using System.Linq.Expressions;
using System.Collections.Generic;

namespace FullStackTesting.Web.Api.Models
{
    public class Specification<T> : ISpecification<T>
    {
        public List<string>                      IncludeStrings { get; }
        public Expression<Func<T, bool>>         Criteria       { get; }
        public List<Expression<Func<T, object>>> Includes       { get; }
    }
}
