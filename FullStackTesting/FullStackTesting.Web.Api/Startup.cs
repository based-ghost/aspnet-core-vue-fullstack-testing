using VueCliMiddleware;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using FullStackTesting.Web.Api.Extensions;
using FullStackTesting.Web.Api.Persistence;
using Microsoft.Extensions.DependencyInjection;

namespace FullStackTesting.Web.Api
{
    public class Startup
    {
        private readonly string _spaSourcePath;
        private readonly string _corsPolicyName;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _spaSourcePath = Configuration.GetValue<string>("SPA:SourcePath");
            _corsPolicyName = Configuration.GetValue<string>("CORS:PolicyName");
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Register the in-memory db (Data is seeded in Main method of the Program.cs now).
            services.AddDbContext<AppDbContext>(context => context.UseInMemoryDatabase("EmployeeMemoryDB"));

            // Registered a scoped EmployeeRepository service (DI into EmployeeController)
            services.AddScoped<IEmployeeRepository, EmployeeRepository>();

            // Register CORS and Mvc
            services.AddCorsConfig(_corsPolicyName)
                .AddMvcConfig(CompatibilityVersion.Version_2_2);

            // In production, the Vue files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = $"{_spaSourcePath}/dist");
        }

        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHttpsRedirection();
                app.UseHsts();
            }

            app.UseCors(_corsPolicyName);
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = _spaSourcePath;

                if (env.IsDevelopment())
                {
                    // Option 1: Run npm process with client app (VueCli - pretty buggy, likely should stick with second option and launch client independently)
                    // spa.Options.StartupTimeout = new TimeSpan(days: 0, hours: 0, minutes: 1, seconds: 30);
                    // spa.UseVueCli(npmScript: "serve", port: 8080);

                    // Option 2: Serve ClientApp independently and proxy requests from ClientApp (baseUri using Vue app port):
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:8080");
                }
            });
        }
    }
}
