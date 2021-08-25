using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
  public class AdjuntoCLS
    {

        public int idAdjunto { get; set; }

        public string Nombre { get; set; }

        public string NombreFile { get; set; }

        public int idTipoAdjunto { get; set; }

        public string TipoAdjunto { get; set; }

        public int idFalla { get; set; }

        public string Comentario { get; set; }

        public int idUsrCreacion { get; set; }

        public string Ruta { get; set; }

    }
}
