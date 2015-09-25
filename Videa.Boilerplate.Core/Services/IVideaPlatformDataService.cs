using Videa.Framework.Data;

namespace Videa.Boilerplate.Core.Services
{
    public interface IVideaPlatformDataService<TObject> : IBaseDataService<TObject>
        where TObject : class
    {
    }
}