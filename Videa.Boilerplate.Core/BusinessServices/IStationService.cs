using System.Collections.Generic;
using Videa.Boilerplate.Core.Entities;

namespace Videa.Boilerplate.Core.BusinessServices
{
    public interface IStationService
    {
        ICollection<Station> GetAll();
    }
}