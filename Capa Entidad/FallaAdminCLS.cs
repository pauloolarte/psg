using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class FallaAdminCLS
    {
  
        public int ResponsablePSG { get; set; }

        // public string idEstado { get; set; }

        public int IngGarantias { get; set; }

        public int Fabrica { get; set; }

        public string NroReporte { get; set; }

        public string NroAfa { get; set; }

        public int TipoGarantia { get; set; }

        public string FechaRecepcion { get; set; }

        public string FechaReclamoFab { get; set; }

        public float TotalReclamado { get; set; }

        public string FechaAceptacion { get; set; }

        public float TotalAceptado { get; set; }

        public float Margen { get; set; }

        public int idFallaG { get; set; }

        public string ReclamoWebSag { get; set; }


    }
}
