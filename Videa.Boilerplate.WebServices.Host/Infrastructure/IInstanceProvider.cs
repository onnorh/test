using System;
using System.ServiceModel;
using System.ServiceModel.Channels;
using System.ServiceModel.Dispatcher;
using StructureMap;

namespace Videa.Boilerplate.WebServices.Host.Infrastructure
{
    public class StructureMapInstanceProvider : IInstanceProvider
    {
        private readonly IContainer _container;
        private readonly Type _serviceType;

        public StructureMapInstanceProvider(IContainer container, Type serviceType)
        {
            _container = container;
            _serviceType = serviceType;
        }

        public object GetInstance(InstanceContext instanceContext)
        {
            return GetInstance(instanceContext, null);
        }

        public object GetInstance(InstanceContext instanceContext, Message message)
        {
            var structureMapExtension = instanceContext.Extensions.Find<StructureMapInstanceContextExtension>();
            if (structureMapExtension == null)
            {
                structureMapExtension = new StructureMapInstanceContextExtension(instanceContext, _container);
                instanceContext.Extensions.Add(structureMapExtension);
            }
            var container = structureMapExtension.NestedContainer ?? _container;
            return container.GetInstance(_serviceType);
        }

        public void ReleaseInstance(InstanceContext instanceContext, object instance)
        {
            var structureMapExtension = instanceContext.Extensions.Find<StructureMapInstanceContextExtension>();
            if (structureMapExtension != null)
            {
                instanceContext.Extensions.Remove(structureMapExtension);
            }
        }
    }
}