using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Datos;
using Capa_Entidad;

namespace Capa_Negocio
{
   public class FallaReportadaBL
    {
        public List<FallaReportadaCLS> listarFallaReportada(string fechainicio, string fechafin,
        string numOS, string Estado, int? idUsrCreacion)
        {
            FallaReportadaDAL oFallaReportadaDAL = new FallaReportadaDAL();
            return oFallaReportadaDAL.listarFallaReportada(fechainicio, fechafin,
            numOS, Estado, idUsrCreacion);

        }

        public List<EstadoFallaCLS> listarEstados()
        {
            FallaReportadaDAL oFallaReportadaDAL = new FallaReportadaDAL();
            return oFallaReportadaDAL.listarEstados();

        }


    }
}
