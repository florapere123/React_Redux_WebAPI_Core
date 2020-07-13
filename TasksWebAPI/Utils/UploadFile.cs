using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace TasksWebAPI.Utils
{


    /// <summary>
    /// upload files to url from config if not exist than to  Resources/Images
    /// </summary>
    public class UploadFile
    {
        public static string UploadPath = "";
        private IOptions<AppSettingsModel> settings;
        public UploadFile(IOptions<AppSettingsModel> settings)
        {
              this.settings = settings;
               UploadPath = settings.Value.UploadPath;
        }
        /// <summary>
        /// uploades file to the specified place inside project
        /// the path is taken from config file 
        /// if the path is not specified than it copies to Resources/Images
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        public static string Upload(IFormFile file)
        {
            var url = ""; 
             var folderName = (String.IsNullOrEmpty(UploadPath)) ? Path.Combine("Resources", "Images"):UploadPath;
           // var folderName =  Path.Combine("Resources", "Images") ;
            var pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

            if (file.Length > 0)
            {
                var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                var fullPath = Path.Combine(pathToSave, fileName);
                url = Path.Combine(folderName, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                return url;
            }
            else
            {
                return url;
            }


        }
    }
}
