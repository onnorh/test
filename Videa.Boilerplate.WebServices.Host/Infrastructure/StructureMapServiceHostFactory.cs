using System;
using System.ServiceModel;
using System.ServiceModel.Activation;
using log4net.Config;
using StructureMap;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;
using Videa.Framework;

namespace Videa.Boilerplate.WebServices.Host.Infrastructure
{
    public class StructureMapServiceHostFactory : ServiceHostFactory
    {
        private readonly IContainer _container;
        public StructureMapServiceHostFactory()
        {
            XmlConfigurator.Configure();

            _container = new Container(cfg =>
            {
                cfg.AddRegistry(new StandardRegistry());
                cfg.AddRegistry(new LoggingRegistry());
            });
        }

        protected override ServiceHost CreateServiceHost(Type serviceType, Uri[] baseAddresses)
        {
            return new StructureMapServiceHost(serviceType, _container, baseAddresses);
        }
    }

    public class StandardRegistry : Registry
    {
        public StandardRegistry()
        {
            Scan(scan =>
            {
                scan.AssembliesFromApplicationBaseDirectory(
                    a => a.FullName.StartsWith("Videa"));
                scan.IncludeNamespace("Videa");
                scan.WithDefaultConventions();
            });
        }
    }
}