using System;
using MassTransit;
using Videa.Boilerplate.Messages;
using Videa.Framework;

namespace Videa.Boilerplate.MessagePublisher
{
    public class App
    {
        private readonly IServiceBus _serviceBus;
        private readonly ILogger _logger;

        public App(IServiceBus serviceBus, ILogger logger)
        {
            _serviceBus = serviceBus;
            _logger = logger;
        }

        public void Start()
        {
            _serviceBus.Publish(new BoilerplateMessage
            {
                Id = Guid.NewGuid(),
                Name = "Boilerplate Message Name"
            });
            _logger.Debug("Message sent");
        }
    }
}
