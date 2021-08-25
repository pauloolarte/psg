using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Capa_Datos;
using Capa_Entidad;

namespace Capa_Negocio
{
   public class CampaniaBL
    {

        public List<CampaniaCLS> listarCampanias()
        {
            CampaniaDAL oCampaniaDAL = new CampaniaDAL();
            return oCampaniaDAL.listarCampanias();

        }

    }
}
