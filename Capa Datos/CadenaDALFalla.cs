using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace Capa_Datos
{
    public class CadenaDALFalla
    {
        public string cadena { get; set; }
        public CadenaDALFalla()
        {
            cadena = ConfigurationManager.ConnectionStrings["Conexion"].ConnectionString;
        }
    }
}
