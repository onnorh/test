using System.Web.Mvc;
using Videa.Framework;
using Videa.Web.Framework.Filters;

namespace Videa.Boilerplate.WebApp
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            filters.Add(new DebugFilter(new AppConfig()));
        }
    }
}
