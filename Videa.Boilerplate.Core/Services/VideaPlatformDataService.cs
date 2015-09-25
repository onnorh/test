using Videa.Boilerplate.Core.Entities;
using Videa.Framework.Data;

namespace Videa.Boilerplate.Core.Services
{
    public class VideaPlatformDataService<TObject> : BaseDataService<TObject>, IVideaPlatformDataService<TObject>
        where TObject : class
    {
        public VideaPlatformDataService(VideaPlatformContext context)
            : base(context)
        {
        }
    }
}