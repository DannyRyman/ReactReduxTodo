using System;

namespace TodoList.Models
{
    public class TodoItem
    {
        public TodoItem(string description, bool completed)
        {
            Id = Guid.NewGuid();
            Description = description;
            Completed = completed;
        }

        public Guid Id { get; }

        public string Description { get; set; }

        public bool Completed { get; set; }

        public void UpdateFrom(TodoItem item)
        {
            Description = item.Description;
            Completed = item.Completed;
        }
    }
}