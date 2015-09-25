using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using log4net.Config;
using MassTransit;
using MassTransit.Log4NetIntegration;
using StructureMap;
using Videa.Boilerplate.MessagePublisher.Infrastructure;
using Videa.Framework;
using Videa.Framework.Messaging;

namespace Videa.Boilerplate.MessagePublisher
{
    internal class Program
    {
        private static readonly ILog _log = LogManager.GetLogger(typeof (Program));
        private static Container _container;

        private static void Main(string[] args)
        {
            XmlConfigurator.Configure();
            ConfigureApp();
            var app = _container.GetInstance<App>();
            app.Start();
        }

        private static void ConfigureApp()
        {
            _container = new Container(cfg =>
            {
                cfg.AddRegistry(new StandardRegistry());
                cfg.AddRegistry(new LoggingRegistry());
            });

            var esbConfig = _container.GetInstance<IEsbConfig>();
            var bus = ServiceBusFactory.New(configurator =>
            {
                if (esbConfig.UseRabbitMq)
                {
                    _log.Debug("Use RabbitMQ");
                    var queueUri = esbConfig.GetQueueUri("Videa.Boilerplate.MessagePublisher");
                    configurator.UseRabbitMq(r =>
                    {
                        r.ConfigureHost(queueUri, h =>
                        {
                            //h.SetUsername("username");
                            //h.SetPassword("password");
                        });
                    });
                    configurator.ReceiveFrom(queueUri);
                }
                else
                {
                    _log.Debug("Use MSMQ");
                    configurator.UseMsmq(sbc => sbc.UseMulticastSubscriptionClient());
                    configurator.ReceiveFrom("msmq://localhost/Videa.Boilerplate.MessagePublisher");
                }
                configurator.UseLog4Net();
                configurator.UseXmlSerializer();

                var consumers = _container.Model.AllInstances.Where(i => i.PluginType == typeof (IConsumer));
                foreach (var consumer in consumers)
                {
                    configurator.Subscribe(
                        c => { c.Consumer(consumer.ReturnedType, type => _container.GetInstance(type)).Permanent(); });
                }

                configurator.SetPurgeOnStartup(true);
                configurator.SetCreateTransactionalQueues(false);
                configurator.DisablePerformanceCounters();
            });

            _container.Configure(cfg => { cfg.ForSingletonOf<IServiceBus>().Use(bus); });
        }
    }
}