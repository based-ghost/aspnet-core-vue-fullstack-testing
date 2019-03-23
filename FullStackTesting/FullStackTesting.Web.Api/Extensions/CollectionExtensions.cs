using System.Linq;
using System.Collections.Generic;

namespace FullStackTesting.Web.Api.Extensions
{
    public static class CollectionExtensions
    {
        public static bool IsNullOrEmpty<T>(this IEnumerable<T> source)
            => !source?.Any() ?? true;

        public static List<T> ToListNullSafe<T>(this IEnumerable<T> source)
            => source?.ToList() ?? new List<T>();
    }
}
