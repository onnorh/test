using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Videa.Boilerplate.Core.BusinessServices;

namespace Videa.Boilerplate.WebApp.Controllers
{
    [AllowAnonymous]
    public class StationsController : ApiController
    {
        private readonly IStationService _stationService;

        public StationsController(IStationService stationService)
        {
            _stationService = stationService;
        }

        [HttpGet]
        public IHttpActionResult Station(HttpRequestMessage requestMessage)
        {
            return Ok(_stationService.GetAll().FirstOrDefault());
        }
    }
}