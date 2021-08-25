using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Capa_Entidad
{
    public class CampaniaCLS
    {

	    public int idCampana { get; set; }

		public string numCampana { get; set; }


		public string FechaInicio { get; set; }

		public string FechaFin { get; set; }

		public int hh { get; set; }

		public string psn { get; set; }

		public string psnLink { get; set; }

		public string km { get; set; }


		public string parts { get; set; }

		public int idGrupo { get; set; }
		public int idTipoCampana { get; set; }
		public int idFabrica { get; set; }

		public int idGrupoModelo { get; set; }
		public int idEstado { get; set; }

		public string Grupo { get; set; }
		public string TipoCampana { get; set; }
		public string Fabrica { get; set; }

		public string GrupoModelo { get; set; }
		public string Estado { get; set; }

		public string Descripcion { get; set; }

		public string Observaciones { get; set; }

	}
}
