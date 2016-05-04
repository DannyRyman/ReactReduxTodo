using System;
using System.Collections.Generic;
using System.Web.Http;
using Marvin.JsonPatch;
using TodoList.Models;
using TodoList.Support.Repositories;

namespace TodoList.Controllers
{
    public class TodoController : ApiController
    {
        private readonly TodoRepository repository;

        public TodoController(TodoRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Todo
        public IEnumerable<TodoItem> Get()
        {
            return repository.All();
        }

        // GET: api/Todo/5
        public IHttpActionResult Get(Guid id)
        {
            var item = repository.GetItemById(id);

            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        // POST: api/Todo
        public IHttpActionResult Post([FromBody]TodoItem item)
        {
            repository.AddItem(item);
            return Created($"/api/todo/{item.Id}", item);
        }

        // PUT: api/Todo/5
        public IHttpActionResult Put(Guid id, [FromBody]TodoItem updatedItem)
        {
            var item = repository.GetItemById(id);

            if (item == null)
            {
                return NotFound();
            }

            item.UpdateFrom(updatedItem);

            //repository.UpdateItem(item);
            return Ok();
        }

        [HttpPatch]
        public IHttpActionResult Patch(Guid id, [FromBody] JsonPatchDocument<TodoItem> todoItemPatchDocument)
        {
            var item = repository.GetItemById(id);

            if (item == null)
            {
                return NotFound();
            }

            todoItemPatchDocument.ApplyTo(item);
            return Ok();
        }

        // DELETE: api/Todo/5
        public IHttpActionResult Delete(Guid id)
        {
            var item = repository.GetItemById(id);

            if (item == null)
            {
                return NotFound();
            }

            repository.RemoveItem(item);
            return Ok();
        }
    }
}
