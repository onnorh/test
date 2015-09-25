using System.Web.Mvc;
using Videa.Web.Framework.Infrastructure;

namespace Videa.Boilerplate.WebApp.Controllers
{
    public class AccountController : BaseController
    {
        public ActionResult Login()
        {
            return View();
        }
    }
}