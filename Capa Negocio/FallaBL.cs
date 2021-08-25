using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Datos;
using Capa_Entidad;

namespace Capa_Negocio
{
    public class FallaBL
    {

       public List<FallaReportadaCLS> listarAdminFallas(string fechainicio, string fechafin,
       string numOS, string Estado, int? idUsrCreacion)
        {
            FallaDAL oFallaReportadaDAL = new FallaDAL();
            return oFallaReportadaDAL.listarAdminFallas(fechainicio, fechafin,
            numOS, Estado, idUsrCreacion);

        }

        public List<EstadoFallaCLS> listarEstadosAdminFalla()
        {
            FallaDAL oFallaReportadaDAL = new FallaDAL();
            return oFallaReportadaDAL.listarEstadosAdminFallas();

        }

        public FallaModCLS recuperarFallaPorId(int id)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.recuperarFallaPorId(id);
        }

        public EquipoCLS RecuperarEquipoxSerie(string Serie)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.RecuperarEquipoPorSerie(Serie);
        }


        public EquipoModCLS RecuperarEquipoxSerieMod(string Serie, int idModelo)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.RecuperarEquipoPorSerieMod(Serie, idModelo);
        }


        public EquipoModCLS RecuperarEquipoxIdFalla(int IdFalla)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.RecuperarEquipoPorIdFalla(IdFalla);
        }

        public int guardarFalla(FallaModCLS oFallaCLS)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.guardarFalla(oFallaCLS);
        }

        public int guardarFallaAdmin(FallaAdminCLS oFallaCLS)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.guardarFallaAdmin(oFallaCLS);
        }

        public int crearFalla(FallaCLS oFallaCLS)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.crearFallaRep(oFallaCLS);
        }

        public int RegistrarEquipo(EquipoCLS oEquipoCLS)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.RegistrarEquipo(oEquipoCLS);
        }

        public int RegistrarEquipoMod(EquipoModCLS oEquipoCLS)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.RegistrarEquipoMod(oEquipoCLS);
        }


        public int crearFallita(FallitaCLS oFallaCLS)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.crearFallita(oFallaCLS);
        }
        public List<SolicitanteCLS> listarSolicitantes()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarSolicitantes();

        }

        public List<EquipoCLS> RecuperarEquipos()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.RecuperarEquipos();

        }

        public List<GrupoCLS> listarGrupos()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarGrupos();

        }

        public List<DivisionCLS> listarDivisiones()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarDivisiones();

        }


        public List<SerieEquipoCLS> listarSeriesEquipos()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarSeriesEquipos();

        }


        public List<SerieEquipoCLS> listarSeriesEquiposC()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarSeriesEquiposC();

        }

        public List<TipoEquipoCLS> listarTiposEquipo()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarTiposEquipo();

        }

        public List<ModeloCLS> listarModelos()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarModelos();

        }

        public List<ClienteCLS> listarClientes()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarClientes();

        }

        public List<FaenaCLS> listarFaenas()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarFaenas();

        }

        public List<SolicitanteCLS> listarIngGarantias()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarIngGarantias();

        }

        public List<SolicitanteCLS> listarResponsablePSG()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarResponsablePSG();

        }

        public List<FabricaCLS> listarFabricas()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarFabricas();

        }

        public List<TipoGarantiaCLS> listarTiposGarantia()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarTiposGarantia();

        }
        /*************Adjuntos**********/

        public List<TipoAdjuntoCLS> listarTiposAdjuntos()
        {
            FallaDAL oFallaDAL = new FallaDAL();
            return oFallaDAL.listarTiposAdjuntos();

        }

        public List<AdjuntoCLS> listarAdjuntosxIdFalla(int IdFalla)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.listarAdjuntosxIdFalla(IdFalla);

        }

        public List<HistorialEstadoCLS> listarHistorialEstados(int IdFalla)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.listarHistorialEstados(IdFalla);

        }

        public int CrearAdjunto(string Nombre, int? idTipoAdjunto, int idFalla, string Comentario,
            string Ruta,
            int idUsrCreacion)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.AgregarAdjunto( Nombre,  idTipoAdjunto,  idFalla,  Comentario, Ruta,
             idUsrCreacion);
        }

        public int guardarHistorialEstados(string idEstado, int idUsuarioCreacion, string Comentario, int idFalla)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.guardarHistorialEstados(idEstado, idUsuarioCreacion, Comentario, idFalla
             );
        }

        public int TrasladarFalla(int idFalla)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.TrasladarFalla(idFalla
          );
        }

        public int ActualizarEstado(int idFalla, string idEstado, string Comentario)
        { 
              FallaDAL oFalla = new FallaDAL();
            return oFalla.ActualizarEstado(idFalla, idEstado,  Comentario);
             
        }




    public int EliminarAdjunto(int idAdjunto)
        {
            FallaDAL oFalla = new FallaDAL();
            return oFalla.EliminarAdjunto(idAdjunto
          );
        }

    }
}
