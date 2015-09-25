using System;
using System.ServiceModel;
using StructureMap;

namespace Videa.Boilerplate.WebServices.Host.Infrastructure
{
    public class StructureMapServiceHost : ServiceHost
    {
        private readonly IContainer _container;

        public StructureMapServiceHost()
        {
        }

        public StructureMapServiceHost(Type serviceType, IContainer container, params Uri[] baseAddresses)
            : base(serviceType, baseAddresses)
        {
            _container = container;
        }

        protected override void OnOpening()
        {
            Description.Behaviors.Add(new StructureMapServiceBehavior(_container));
            base.OnOpening();
        }
    }
}