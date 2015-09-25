using System.Web.Optimization;
using Videa.Web.Framework.Infrastructure;

namespace Videa.Boilerplate.WebApp
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new StaticBundle("~/Scripts/libraries.min.js").Include(
                "~/Scripts/jquery-1.10.2.js",
                "~/Scripts/jquery.validate.js",
                "~/Scripts/jquery.validate.unobtrusive.js",
                "~/Scripts/vui.validation.js",
                "~/Scripts/vui.checkbox.js",
                "~/Scripts/highcharts.js",
                "~/Scripts/app/utilities/preloadStore.js",
                "~/Scripts/app/utilities/stacktrace.js",
                "~/Scripts/modernizr-2.7.2.js"));

            bundles.Add(new StaticBundle("~/Scripts/bootstrap.min.js").Include(
                "~/Scripts/bootstrap.js",
                "~/Scripts/respond.js"));

            bundles.Add(new StaticBundle("~/Scripts/angular.all.min.js").Include(
                "~/Scripts/angular.js",
                "~/Scripts/angular-route.js",
                "~/Scripts/app/utilities/requestNotificationChannel.js",
                "~/Scripts/app/utilities/videa-util.js",
                "~/Scripts/ui-bootstrap-tpls-custom.js",
                "~/Scripts/ui-utils.js",
                "~/Scripts/ui-utils-ieshiv.js"));

            bundles.Add(new StaticBundle("~/Content/styles/site.min.css").Include(
                "~/Content/styles/bootstrap.css",
                "~/Content/styles/site.css"));

            //bundles.Add(
            //    new StaticBundle("~/Content/styles/login-page.min.css").Include("~/Content/styles/login-page.css"));

            bundles.Add(new StaticBundle("~/Scripts/app/shared/app.min.js").Include(
                "~/Scripts/app/shared/module.js",
                "~/Scripts/app/shared/directives/*.js",
                "~/Scripts/app/shared/services/*.js",
                "~/Scripts/app/shared/controllers/*.js"));

            bundles.Add(new StaticBundle("~/Scripts/app/account/app.min.js").Include(
                "~/Scripts/app/account/app.js",
                "~/Scripts/app/account/services/*.js",
                "~/Scripts/app/account/controllers/*.js"));
        }
    }
}