using System.Data.Entity;

namespace Videa.Boilerplate.Core.Entities
{
    public class VideaPlatformContext : DbContext
    {
        static VideaPlatformContext()
        {
            Database.SetInitializer<VideaPlatformContext>(null);
        }

        public VideaPlatformContext() : base("name=VideaPlatform")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Station>().ToTable("Station", "buyers");
        }
    }
}