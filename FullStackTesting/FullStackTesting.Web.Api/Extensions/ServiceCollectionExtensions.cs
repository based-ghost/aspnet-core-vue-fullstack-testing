using Newtonsoft.Json;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.DependencyInjection;

namespace FullStackTesting.Web.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddCorsConfig(this IServiceCollection services, string policyName)
        {
            services.AddCors(options =>
                options.AddPolicy(policyName,
                    corsBuilder => corsBuilder
                        .AllowAnyOrigin()
                        .AllowAnyHeader()
                        .AllowAnyMethod()));

            return services;
        }

        public static IServiceCollection AddMvcConfig(this IServiceCollection services, CompatibilityVersion aspNetCoreVersion)
        {
            services.AddMvc()
                .SetCompatibilityVersion(aspNetCoreVersion)
                .AddJsonOptions(options => {
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
                });

            return services;
        }
    }
}
