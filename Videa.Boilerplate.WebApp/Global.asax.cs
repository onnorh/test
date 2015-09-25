using System;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using StructureMap;
using Videa.Boilerplate.WebApp.Infrastructure;
using Videa.Framework;
using Videa.Web.Framework.Infrastructure;

namespace Videa.Boilerplate.WebApp
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private static StructureMapDependencyResolver _structureMapDependencyResolver;
        private static IContainer _container;
        protected void Application_Start()
        {
            _container = new Container();
            AreaRegistration.RegisterAllAreas();
            _container.Configure(cfg =>
            {
                cfg.AddRegistry(new StandardRegistry());
                cfg.AddRegistry(new LoggingRegistry());
                cfg.AddRegistry(new ControllerRegistry());
                cfg.AddRegistry(new ServiceRegistry());
                cfg.AddRegistry(new DataContextRegistry());
                cfg.AddRegistry(new MvcRegistry());
            });
            _structureMapDependencyResolver = new StructureMapDependencyResolver(() => _container);
            Func<IContainer> containerFactory = () => _structureMapDependencyResolver.CurrentNestedContainer ?? _container;

            DependencyResolver.SetResolver(_structureMapDependencyResolver);
            GlobalConfiguration.Configure(config =>
            {
                WebApiConfig.Register(config, containerFactory);
            });
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        void Application_BeginRequest(object sender, EventArgs e)
        {
            _structureMapDependencyResolver.CreateNestedContainer();
        }

        void Application_EndRequest(object sender, EventArgs e)
        {
            _structureMapDependencyResolver.DisposeNestedContainer();
        }
    }
}
