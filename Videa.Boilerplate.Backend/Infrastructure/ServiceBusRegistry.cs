using MassTransit;
using StructureMap.Configuration.DSL;
using StructureMap.Graph;

namespace Videa.Boilerplate.Backend.Infrastructure
{
    public class ServiceBusRegistry : Registry
    {
        public ServiceBusRegistry()
        {
            Scan(scan =>
            {
                scan.AssembliesFromApplicationBaseDirectory(a => a.FullName.StartsWith("Videa"));
                scan.IncludeNamespace("Videa");
                scan.AddAllTypesOf<IConsumer>();
            });
        }
    }
}
