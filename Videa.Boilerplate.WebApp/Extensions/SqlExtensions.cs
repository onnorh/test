using System.Data.Entity.Core.Objects;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Reflection;

namespace Videa.Boilerplate.WebApp.Extensions
{
    public static class SqlExtensions
    {
        public static SqlCommand ToSqlCommand<T>(this DbQuery<T> query)
        {
            SqlCommand command = new SqlCommand();

            command.CommandText = query.ToString();

            var objectQuery = query.ToObjectQuery();

            foreach (var param in objectQuery.Parameters)
            {
                command.Parameters.AddWithValue(param.Name, param.Value);
            }

            return command;
        }
        public static ObjectQuery<T> ToObjectQuery<T>(this DbQuery<T> query)
        {
            var internalQuery = query.GetType()
                .GetFields(BindingFlags.NonPublic | BindingFlags.Instance)
                .Where(field => field.Name == "_internalQuery")
                .Select(field => field.GetValue(query))
                .First();

            var objectQuery = internalQuery.GetType()
                .GetFields(BindingFlags.NonPublic | BindingFlags.Instance)
                .Where(field => field.Name == "_objectQuery")
                .Select(field => field.GetValue(internalQuery))
                .Cast<ObjectQuery<T>>()
                .First();

            return objectQuery;
        }
    }
}