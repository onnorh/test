using System.ServiceModel;
using StructureMap;

namespace Videa.Boilerplate.WebServices.Host.Infrastructure
{
    /// <summary>
    /// Initializes and disposes nested structuremap container
    /// </summary>
    public class StructureMapInstanceContextExtension : IExtension<InstanceContext>
    {
        public StructureMapInstanceContextExtension(InstanceContext instanceContext, IContainer container)
        {
            NestedContainer = NestedContainer ?? container.GetNestedContainer();
        }

        public IContainer NestedContainer { get; set; }

        public void Attach(InstanceContext owner)
        {
        }

        public void Detach(InstanceContext owner)
        {
            if (NestedContainer != null)
            {
                NestedContainer.Dispose();
                NestedContainer = null;
            }
        }
    }
}