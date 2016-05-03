using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TodoList.Models
{
    public class UpdateTodoItem
    {
        public string Description { get; }
        public bool? Completed { get; }

        public UpdateTodoItem(string description, 
            bool? completed)
        {
            Description = description;
            Completed = completed;
        }
    }
}