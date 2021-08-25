using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
  public class FallaReportadaCLS
    {
        public int idFalla { get; set; }

        public string titulo { get; set; }

        public string TipoEquipo { get; set; }

        public string Modelo { get; set; }

        public string OrdenServicio { get; set; }

        public string FechaCreacion { get; set; }

        public int idCliente { get; set; }

        public string Cliente { get; set; }

        public string Estado { get; set; }


    }
}
