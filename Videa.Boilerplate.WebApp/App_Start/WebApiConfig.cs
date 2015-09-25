using System;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using StructureMap;
using Videa.Boilerplate.WebApp.Infrastructure;

namespace Videa.Boilerplate.WebApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config, Func<IContainer> containerFactory)
        {
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Services.Replace(
                typeof (IHttpControllerActivator),
                new StructureMapServiceActivator(containerFactory));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional}
                );
        }
    }
}