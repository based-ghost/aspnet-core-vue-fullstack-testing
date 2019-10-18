﻿using System.Net;
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

            // Add AllowAny CORS policy
            services.AddCors(c => c.AddPolicy(_corsPolicyName,
                options => options.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod()));

            // Register RazorPages/Controllers
            services.AddControllersWithViews();
            services.AddRazorPages();

            // IMPORTANT CONFIG CHANGE IN 3.0 - 'Async' suffix in action names get stripped by default - so, to access them by full name with 'Async' part - opt out of this feature'.
            services.AddMvc(options => options.SuppressAsyncSuffixInActionNames = false);

            // In production, the Vue files will be served from this directory
            services.AddSpaStaticFiles(configuration => configuration.RootPath = $"{_spaSourcePath}/dist");
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
                app.UseHttpsRedirection();
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

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseRouting();

            app.UseCors(_corsPolicyName);

            app.UseEndpoints(endpoints => {
                endpoints.MapControllers();

                // initialize vue cli middleware
#if DEBUG
                if (System.Diagnostics.Debugger.IsAttached)
                    endpoints.MapToVueCliProxy("{*path}", new SpaOptions { SourcePath = _spaSourcePath }, "serve", regex: "running at");
                else
#endif
                    // note: output of vue cli or quasar cli should be wwwroot
                    endpoints.MapFallbackToFile("index.html");
            });
        }
    }
}
