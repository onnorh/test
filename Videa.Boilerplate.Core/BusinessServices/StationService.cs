using System.Collections.Generic;
using Videa.Boilerplate.Core.Entities;
using Videa.Boilerplate.Core.Services;

namespace Videa.Boilerplate.Core.BusinessServices
{
    public class StationService : IStationService
    {
        private readonly IVideaPlatformDataService<Station> _dataService;

        public StationService(IVideaPlatformDataService<Station> dataService)
        {
            _dataService = dataService;
        }

        public ICollection<Station> GetAll()
        {
            return _dataService.GetAll();
        }
    }
}