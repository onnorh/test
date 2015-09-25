using System.Data.Entity;
using StructureMap.Configuration.DSL;
using Videa.Boilerplate.Core.Entities;
using Videa.Boilerplate.Core.Services;

namespace Videa.Boilerplate.WebApp.Infrastructure
{
    public class DataContextRegistry : Registry
    {
        public DataContextRegistry()
        {
            For(typeof (IVideaPlatformDataService<>)).Use(typeof (VideaPlatformDataService<>));
            Database.SetInitializer<VideaPlatformContext>(null);
        }
    }
}