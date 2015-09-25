using System;
using System.Net.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using StructureMap;

namespace Videa.Boilerplate.WebApp.Infrastructure
{
    public class StructureMapServiceActivator : IHttpControllerActivator
    {
        private readonly Func<IContainer> _containerFactory;

        public StructureMapServiceActivator(Func<IContainer> containerFactory)
        {
            _containerFactory = containerFactory;
        }

        public IHttpController Create(
            HttpRequestMessage request,
            HttpControllerDescriptor controllerDescriptor,
            Type controllerType)
        {
            var container = _containerFactory();
            return (IHttpController) container.GetInstance(controllerType);
        }
    }
}