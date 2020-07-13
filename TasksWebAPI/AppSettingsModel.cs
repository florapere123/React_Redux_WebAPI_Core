namespace TasksWebAPI
{
    public class AppSettingsModel
    {
        /// <summary>
        /// upload path for images
        /// </summary>
        public string UploadPath { get; set; }
        /// <summary>
        /// path from with client application runs
        /// </summary>
        public string ClientAppPath { get; set; }
    }
}