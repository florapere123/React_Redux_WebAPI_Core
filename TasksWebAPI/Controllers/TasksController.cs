using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Mime;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiSample.Models;
using TasksWebAPI.Utils;
using Microsoft.Extensions.Logging;

namespace WebApiSample.Controllers
{
   
    [Produces(MediaTypeNames.Application.Json)]

    [Route("[controller]")]
    public class TasksController : APIControllerBase
    
    {
        private static readonly List<Task> _tasksInMemoryStore = new List<Task>();
         private readonly ILogger<TasksController> _logger;


        public TasksController(ILogger<TasksController> logger)
        {
            _logger = logger;
            InitDataWithDefaultObject();
        }

        private static void InitDataWithDefaultObject()
        {
            if (_tasksInMemoryStore.Count == 0)
            {
                _tasksInMemoryStore.Add(
                    new Task
                    {
                        Id = 1,
                        Description = "Default Task ",
                        ImageUrl = "Resources\\Images\\default\\avatar.jpg"
                    });
            }
        }

        [HttpGet]
        public ActionResult<List<Task>> GetAll() => _tasksInMemoryStore;

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<Task> GetById(int id)
        {
            var task = _tasksInMemoryStore.FirstOrDefault(p => p.Id == id);

            #region snippet_ProblemDetailsStatusCode
            if (task == null)
            {
                return NotFound();
            }
            #endregion

            return task;
        }


        /// <summary>
        /// creates new task with an image 
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<Task> Create([FromForm]TaskFile file)
        {
            string url = "";
            try
            {
                url = UploadFile.Upload(file.File);
                Task task = new Task
                {
                    Description = file.Description,
                    ImageUrl = url
                };
                task.Id = _tasksInMemoryStore.Any() ?
                   _tasksInMemoryStore.Max(t => t.Id) + 1 : 1;

                _tasksInMemoryStore.Add(task);

                return CreatedAtAction(nameof(GetById), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                {
                  _logger.LogError($"Something went wrong inside Create action: {ex.Message}");
                    return StatusCode(500, "Internal server error");
                }

            }





        }
    }
}
