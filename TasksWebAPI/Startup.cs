using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

 

namespace TasksWebAPI
{
    public class Startup
    {
        readonly string MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.Configure<AppSettingsModel>(Configuration.GetSection("ApplicationSettings"));

            string clientAppPath = Configuration.GetSection("ApplicationSettings").GetValue<string>("ClientAppPath");
            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                builder =>
                  {
                    //builder.WithOrigins("http://localhost",
                    //                    "http://localhost:3000")
                    builder.WithOrigins(clientAppPath)
                        .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
                  });
            });

            services.AddMvc(options => options.EnableEndpointRouting = false);

            services.AddControllers(options => options.EnableEndpointRouting = false) 
               .AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddOptions();
          

        }

        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           string imagesUploadPath = Configuration.GetSection("ApplicationSettings").GetValue<string>("UploadPath");
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseCors();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"Resources")),
                RequestPath = new PathString("/Resources")
            });
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseRouting();



            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            //  app.UseMvc();
        }
    }
}
