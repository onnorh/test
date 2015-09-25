using StructureMap.Configuration.DSL;
using StructureMap.Graph;

namespace Videa.Boilerplate.WebApp.Infrastructure
{
    public class ServiceRegistry : Registry
    {
        public ServiceRegistry()
        {
            Scan(scan =>
            {
                scan.AssembliesFromApplicationBaseDirectory(a => a.FullName.StartsWith("Videa"));
                scan.IncludeNamespace("Videa");
                scan.With(new ServiceConvention());
            });
        }
    }
}