using System.Net;
using VueCliMiddleware;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using FullStackTesting.Web.Api.Models;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.SpaServices;
using Microsoft.Extensions.Configuration;
using FullStackTesting.Web.Api.Persistence;
using Microsoft.Extensions.DependencyInjection;

namespace FullStackTesting.Web.Api
{
    public class Startup
    {
        private readonly string _spaSourcePath;
        private readonly string _corsPolicyName;

        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _spaSourcePath = Configuration.GetValue<string>("SPA:SourcePath");
            _corsPolicyName = Configuration.GetValue<string>("CORS:PolicyName");
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Register the in-memory db (Data is seeded in Main method of the Program.cs now).
            services.AddDbContext<AppDbContext>(context => context.UseInMemoryDatabase("EmployeeMemoryDB"));

            // Registered a scoped EmployeeRepository service (DI into EmployeeController)
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();

            // Add AllowAny CORS policy
            services.AddCors(c => c.AddPolicy(_corsPolicyName,
                options => options.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()));

            // IMPORTANT CONFIG CHANGE IN 3.0 - 'Async' suffix in action names get stripped by default - so, to access them by full name with 'Async' part - opt out of this feature'.
            services.AddMvc(options => options.SuppressAsyncSuffixInActionNames = false);

            // In production, the Vue files will be served from this directory
            services.AddSpaStaticFiles(opt => opt.RootPath = $"{_spaSourcePath}/dist");

            // Register RazorPages/Controllers
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseExceptionHandler(builder =>
            {
                builder.Run(async context =>
                {
                    var error = context.Features.Get<IExceptionHandlerFeature>();
                    var exDetails = new ExceptionDetails((int)HttpStatusCode.InternalServerError, error?.Error.Message);

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = exDetails.StatusCode;
                    context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
                    context.Response.Headers.Add("Application-Error", exDetails.Message);
                    context.Response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");

                    await context.Response.WriteAsync(exDetails.ToString());
                });
            });

            app.UseCors(_corsPolicyName);

            app.UseHttpsRedirection();
            // app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();

                endpoints.MapToVueCliProxy(
                   "{*path}",
                   new SpaOptions { SourcePath = _spaSourcePath },
                   npmScript: System.Diagnostics.Debugger.IsAttached ? "serve" : null,
                   regex: "Compiled successfully",
                   forceKill: true
                );
            });
        }
    }
}
