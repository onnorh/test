using System.ComponentModel.DataAnnotations;

namespace Videa.Boilerplate.Core.Entities
{
    public class Station
    {
        [Key]
        public long StationId { get; set; }

        public string Name { get; set; }
        public string CallLetters { get; set; }
        public string SalesName { get; set; }
        public bool IsActive { get; set; }
    }
}