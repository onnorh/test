using System;
using System.ServiceModel.Configuration;
using Videa.Framework.WCF;

namespace Videa.Boilerplate.WebServices.Host.Infrastructure
{
    public class ErrorBehaviorExtensionElement : BehaviorExtensionElement
    {
        public override Type BehaviorType
        {
            get { return typeof(ServiceErrorBehaviourAttribute); }
        }

        protected override object CreateBehavior()
        {
            return new ServiceErrorBehaviourAttribute(typeof(HttpErrorHandler));
        }
    }
}