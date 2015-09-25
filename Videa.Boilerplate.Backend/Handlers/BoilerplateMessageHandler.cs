using MassTransit;
using Videa.Boilerplate.Messages;
using Videa.Framework;

namespace Videa.Boilerplate.Backend.Handlers
{
    public class BoilerplateMessageHandler : Consumes<BoilerplateMessage>.All
    {
        private readonly ILogger _logger;

        public BoilerplateMessageHandler(ILogger logger)
        {
            _logger = logger;
        }

        public void Consume(BoilerplateMessage message)
        {
            _logger.Debug("Received BoilerplateMessage. Id: {0}, Name: {1}", message.Id, message.Name);
        }
    }
}