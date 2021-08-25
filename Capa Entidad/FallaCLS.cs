using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class FallaCLS
    {
        public int idFalla { get; set; }

        public string titulo { get; set; }

        public string idEstado { get; set; }

        public int idusrSolicitante { get; set; }

        public string numOS { get; set; }

        public int idGrupo { get; set; }
        public string numserie { get; set; }

        public string FechaFalla { get; set; }
        public int idDivision { get; set; }


        public string TipoEquipo { get; set; }

        public string Modelo { get; set; }
        public int idTipoEquipo { get; set; }

        public int idModelo { get; set; }


        public int idCliente { get; set; }


        public int idFaena { get; set; }

        public string FechaReparacion { get; set; }

        public string FechaEstimada { get; set; }

        public string Descripcion { get; set; }

        public string clienteRef { get; set; }

        public string faenaRef { get; set; }

        public int idUsrCreacion { get; set; }

        public DateTime FechaCreacion { get; set; }
        public int idUsrSolicitante { get; set; }

        public string estado { get; set; }

        public int idUsrIngPsg { get; set; }

        public int idUsrRespPsg { get; set; }

        public string numReporte { get; set; }
        public string numAfa { get; set; }
        public int idTipoGarantia { get; set; }
        public DateTime fchRecepcion { get; set; }
        public DateTime fchReclamadoFab { get; set; }
        public DateTime fchAceptacion { get; set; }

        public float totalReclamado { get; set; }

        public float totalAceptado { get; set; }

        public float margen { get; set; }

        public int idFabrica { get; set; }
        public int idEquipo { get; set; }



    }
}
