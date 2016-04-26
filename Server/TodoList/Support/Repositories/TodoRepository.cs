using System;
using System.Collections.Generic;
using TodoList.Models;

namespace TodoList.Support.Repositories
{
    public class TodoRepository
    {
        private readonly Dictionary<Guid, TodoItem> store = new Dictionary<Guid, TodoItem>();

        public TodoRepository()
        {
            PopulateInitialStore();
        }

        private void PopulateInitialStore()
        {
            AddItem(new TodoItem("Call john about stuff", false));
            AddItem(new TodoItem("Complete timesheet", false));
            AddItem(new TodoItem("Finish some other task", false));
        }        

        public TodoItem GetItemById(Guid id)
        {
            if (store.ContainsKey(id))
            {
                return store[id];
            }
            return null;
        }

        public void RemoveItem(TodoItem item)
        {
            store.Remove(item.Id);
        }

        public void AddItem(TodoItem item)
        {
            store.Add(item.Id, item);
        }

        public void UpdateItem(TodoItem item)
        {
            if (store.ContainsKey(item.Id))
            {
                var existingItem = store[item.Id];
                existingItem.UpdateFrom(item);
                return;
            }

            throw new InvalidOperationException("Attempted to update an item that does not exist.");
        }

        public IEnumerable<TodoItem> All()
        {
            return store.Values;
        }
    }
}