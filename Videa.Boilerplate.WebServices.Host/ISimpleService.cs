using System.ServiceModel;

namespace Videa.Boilerplate.WebServices.Host
{
    [ServiceContract]
    public interface ISimpleService
    {
        [OperationContract]
        void DoWork();
    }
}
