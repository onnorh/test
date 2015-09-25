using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Videa.Boilerplate.Core.BusinessServices;
using Videa.Boilerplate.Core.Entities;
using Videa.Framework.Utilities;
using Videa.Web.Framework.Infrastructure;

namespace Videa.Boilerplate.WebApp.Controllers
{
    public class HomeController : BaseController
    {
        private readonly IStationService _stationService;

        public HomeController(IStationService stationService)
        {
            _stationService = stationService;
        }

        public ActionResult Index()
        {
            var d = _stationService.GetAll().FirstOrDefault().With(s => s.Name);
            return View();
        }

        public ActionResult GetAllStations()
        {
            var stations = _stationService.GetAll();
            return JsonSuccess(stations, true);
        }

        public ActionResult ViewStations()
        {
            var allStations = new List<Station>
            {
                new Station
                {
                    StationId = 1,
                    Name = "FOX23",
                    CallLetters = "KOKI-TV",
                    SalesName = "Videa"
                },
                new Station
                {
                    StationId = 2,
                    Name = "KMYT",
                    CallLetters = "KMYT-TV",
                    SalesName = "Videa"
                },
                new Station
                {
                    StationId = 3,
                    Name = "WVEC",
                    CallLetters = "WVEC-TV",
                    SalesName = "Videa"
                },
                new Station
                {
                    StationId = 4,
                    Name = "WVEC2",
                    CallLetters = "WVEC2",
                    SalesName = "Videa"
                },
                new Station
                {
                    StationId = 5,
                    Name = "WVEC9",
                    CallLetters = "WVEC9",
                    SalesName = "Videa"
                },
                new Station
                {
                    StationId = 6,
                    Name = "WISN",
                    CallLetters = "WISN",
                    SalesName = "Videa"
                }
            };
            return View(allStations);
        }
    }
}