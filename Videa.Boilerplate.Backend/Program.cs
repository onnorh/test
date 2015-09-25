using log4net.Config;
using Topshelf;

namespace Videa.Boilerplate.Backend
{
    class Program
    {
        static void Main(string[] args)
        {
            XmlConfigurator.Configure();

            HostFactory.Run(x =>
            {
                x.Service<BackendService>(c =>
                {
                    c.ConstructUsing(() => new BackendService());
                    c.WhenStarted(d => d.Start());
                    c.WhenStopped(d => d.Stop());
                });

                x.SetDescription("Videa.Backend service");
                x.SetDisplayName("Videa.Backend service");
                x.SetServiceName("Videa.Backend");
                x.EnableServiceRecovery(rc =>
                {
                    rc.RestartService(1); // restart the service after 1 minute
                    rc.SetResetPeriod(1); // set the reset interval to one day
                });
            });

        }
    }
}
