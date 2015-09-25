using System;
using System.ServiceModel.Channels;
using System.ServiceModel.Dispatcher;
using Elmah;

namespace Videa.Boilerplate.WebServices.Host.Infrastructure
{
    /// <summary>
    /// Your handler to actually tell ELMAH about the problem.
    /// </summary>
    public class HttpErrorHandler : IErrorHandler
    {
        public bool HandleError(Exception error)
        {
            return false;
        }

        public void ProvideFault(Exception error, MessageVersion version, ref Message fault)
        {
            if (error != null) // Notify ELMAH of the exception.
            {
                if (System.Web.HttpContext.Current == null)
                {
                    ErrorLog.GetDefault(null).Log(new Error(error));
                    return;
                }

                ErrorSignal.FromCurrentContext().Raise(error);
            }
        }
    }
}