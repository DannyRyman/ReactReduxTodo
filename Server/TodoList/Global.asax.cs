using System.Net.Http.Formatting;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using Newtonsoft.Json.Serialization;
using TodoList.Support;

namespace TodoList
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            GlobalConfiguration.Configuration.Services.Replace(
                typeof(IHttpControllerActivator),
                new ControllerFactory());

            GlobalConfiguration.Configure(WebApiConfig.Register);

            GlobalConfiguration.Configuration.Formatters.Clear();

            var jsonFormatter = new JsonMediaTypeFormatter
            {
                SerializerSettings = {ContractResolver = new CamelCasePropertyNamesContractResolver()}
            };

            GlobalConfiguration.Configuration.Formatters.Add(jsonFormatter);
            
        }
    }
}
