using System;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using TodoList.Controllers;
using TodoList.Support.Repositories;

namespace TodoList.Support
{
    public class ControllerFactory : IHttpControllerActivator
    {
        private readonly TodoRepository repository;

        public ControllerFactory()
        {
            this.repository = new TodoRepository();
        }

        public IHttpController Create(HttpRequestMessage request, HttpControllerDescriptor controllerDescriptor, Type controllerType)
        {
            if (controllerType == typeof (TodoController))
            {
                return new TodoController(repository);
            }

            throw new ArgumentException("Unexpected type!", nameof(controllerType));
        }
    }
}