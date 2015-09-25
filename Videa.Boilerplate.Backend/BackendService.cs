using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using log4net;
using MassTransit;
using MassTransit.Log4NetIntegration;
using StructureMap;
using Videa.Boilerplate.Backend.Infrastructure;
using Videa.Framework;
using Videa.Framework.Messaging;

namespace Videa.Boilerplate.Backend
{
    public class BackendService
    {
        private static IContainer _container;
        private readonly ILog _log = LogManager.GetLogger(typeof(BackendService));

        public void Start()
        {
            try
            {
                _log.Info("Starting Videa.Boilerplate.Backend service");
                ConfigureAndStart();
                _log.Info("Successfully started Videa.Backend service");
            }
            catch (Exception ex)
            {
                _log.Error(ex.ToString());
                throw;
            }
        }

        public void Stop()
        {
            _log.Info("Stopping Videa.Boilerplate.Backend service");
        }

        private void ConfigureAndStart()
        {
            _container = new Container(cfg =>
            {
                cfg.AddRegistry(new StandardRegistry());
                cfg.AddRegistry(new ServiceBusRegistry());
                cfg.AddRegistry(new LoggingRegistry());
            });

            var esbConfig = _container.GetInstance<IEsbConfig>();
            var bus = ServiceBusFactory.New(configurator =>
            {
                if (esbConfig.UseRabbitMq)
                {
                    _log.Debug("Use RabbitMQ");
                    var queueUri = esbConfig.GetQueueUri("Videa.Boilerplate.Backend");
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
                    configurator.ReceiveFrom("msmq://localhost/Videa.Boilerplate.Backend");
                }
                configurator.UseLog4Net();
                configurator.UseXmlSerializer();

                var consumers = _container.Model.AllInstances.Where(i => i.PluginType == typeof(IConsumer));
                foreach (var consumer in consumers)
                {
                    configurator.Subscribe(
                        c => { c.Consumer(consumer.ReturnedType, type => _container.GetInstance(type)).Permanent(); });
                }

                configurator.SetCreateTransactionalQueues(false);
                configurator.DisablePerformanceCounters();
            });

            _container.Configure(cfg => { cfg.ForSingletonOf<IServiceBus>().Use(bus); });
        }
    }
}
