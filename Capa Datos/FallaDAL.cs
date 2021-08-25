using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using System.Data.SqlClient;
using System.Data;
using Capa_Datos;
using Capa_Entidad;
using System.Globalization;

namespace Capa_Datos
{
   public class FallaDAL :  CadenaDALFalla
    {

        public EquipoCLS RecuperarEquipoPorSerie(string Serie)
        {
            EquipoCLS oEquipoCLS = null;
            
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_SelecEquipoxSerie", cn))
                    {

                                   


                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Serie", Serie);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {

                            int posIdEquipo = drd.GetOrdinal("idEquipo");

                            int posNombre = drd.GetOrdinal("Nombre");
                            int posSerie = drd.GetOrdinal("numSerie");


                            int posEstado = drd.GetOrdinal("estado");


                            int posTipoEquipo = drd.GetOrdinal("idTipoEquipo");

                            int posCliente = drd.GetOrdinal("idCliente");
                            int posFaena = drd.GetOrdinal("idFaena");

                            int posModelo = drd.GetOrdinal("idModelo");



                            while (drd.Read())
                            {
                                oEquipoCLS = new EquipoCLS();

                                oEquipoCLS.idEquipo = drd.IsDBNull(posIdEquipo) ? 0 :
                                    drd.GetInt32(posIdEquipo);

                                oEquipoCLS.NombreEquipo = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oEquipoCLS.Serie = drd.IsDBNull(posSerie) ? ""
                                    : drd.GetString(posSerie);

                                oEquipoCLS.Estado = drd.IsDBNull(posEstado) ? ""
                                    : drd.GetString(posEstado);

                                oEquipoCLS.TipoEquipo = drd.IsDBNull(posTipoEquipo) ? 0
                                : drd.GetInt32(posTipoEquipo);

                            
                                oEquipoCLS.ClienteE = drd.IsDBNull(posCliente) ? 0
                               : drd.GetInt32(posCliente);


                                oEquipoCLS.FaenaE = drd.IsDBNull(posFaena) ? 0
                       : drd.GetInt32(posFaena);


                                oEquipoCLS.ModeloE = drd.IsDBNull(posModelo) ? 0
                       : drd.GetInt32(posModelo);


                                //              oFallaCLS.TipoEquipo = drd.IsDBNull(posTipoEquipo) ? ""
                                //     : drd.GetString(posTipoEquipo);

                                //              oFallaCLS.Modelo = drd.IsDBNull(posModelo) ? ""
                                //: drd.GetString(posModelo);

                                





                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return oEquipoCLS;


        }

        public List<EquipoCLS> RecuperarEquipos()
        {
            List<EquipoCLS> lista = null;

            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_SelecAllEquipos", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                     
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {

                            lista = new List<EquipoCLS>();

                            EquipoCLS oEquipoCLS;

                            int posIdEquipo = drd.GetOrdinal("idEquipo");

                            int posNombre = drd.GetOrdinal("nombre");
                            int posSerie = drd.GetOrdinal("numserie");



                            int posTipoEquipo = drd.GetOrdinal("idTipoEquipo");

                            int posCliente = drd.GetOrdinal("idCliente");
                            int posFaena = drd.GetOrdinal("idFaena");

                            int posModelo = drd.GetOrdinal("idModelo");

                            int posClienteN = drd.GetOrdinal("Cliente");
                            int posFaenaN = drd.GetOrdinal("Faena");

                            int posTipoEquipoN = drd.GetOrdinal("TipoEquipoN");
                            int posModeloN = drd.GetOrdinal("ModeloN");



                            while (drd.Read())
                            {
                                oEquipoCLS = new EquipoCLS();

                                oEquipoCLS.idEquipo = drd.IsDBNull(posIdEquipo) ? 0 :
                                    drd.GetInt32(posIdEquipo);

                                oEquipoCLS.NombreEquipo = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oEquipoCLS.Serie = drd.IsDBNull(posSerie) ? ""
                                    : drd.GetString(posSerie);


                                oEquipoCLS.TipoEquipo = drd.IsDBNull(posTipoEquipo) ? 0
                                : drd.GetInt32(posTipoEquipo);


                                oEquipoCLS.ClienteE = drd.IsDBNull(posCliente) ? 0
                               : drd.GetInt32(posCliente);


                                oEquipoCLS.FaenaE = drd.IsDBNull(posFaena) ? 0
                       : drd.GetInt32(posFaena);


                                oEquipoCLS.ModeloE = drd.IsDBNull(posModelo) ? 0
                       : drd.GetInt32(posModelo);

                                oEquipoCLS.Cliente = drd.IsDBNull(posClienteN) ? ""
                                  : drd.GetString(posClienteN);

                                oEquipoCLS.Faena = drd.IsDBNull(posFaenaN) ? ""
                                    : drd.GetString(posFaenaN);

                                oEquipoCLS.TipoEquipoN = drd.IsDBNull(posTipoEquipoN) ? ""
                                 : drd.GetString(posTipoEquipoN);

                                oEquipoCLS.ModeloN = drd.IsDBNull(posModeloN) ? ""
                                    : drd.GetString(posModeloN);



                                lista.Add(oEquipoCLS);
                            }

                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }


        public EquipoModCLS RecuperarEquipoPorSerieMod(string Serie, int idModelo)
        {
            EquipoModCLS oEquipoCLS = null;

            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_SelecEquipoxSerieModelo", cn))
                    {




                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@Serie", Serie);
                        cmd.Parameters.AddWithValue("@idModelo", idModelo);

                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {

                            int posIdEquipo = drd.GetOrdinal("idEquipo");

                            int posNombre = drd.GetOrdinal("Nombre");
                            int posSerie = drd.GetOrdinal("numSerie");


                            int posEstado = drd.GetOrdinal("estado");


                            int posTipoEquipo = drd.GetOrdinal("idTipoEquipo");

                            int posCliente = drd.GetOrdinal("idCliente");
                            int posFaena = drd.GetOrdinal("idFaena");

                            int posModelo = drd.GetOrdinal("idModelo");



                            while (drd.Read())
                            {
                                oEquipoCLS = new EquipoModCLS();

                                oEquipoCLS.idEquipoM = drd.IsDBNull(posIdEquipo) ? 0 :
                                    drd.GetInt32(posIdEquipo);

                                oEquipoCLS.NombreEquipoM = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oEquipoCLS.SerieM = drd.IsDBNull(posSerie) ? ""
                                    : drd.GetString(posSerie);

                                oEquipoCLS.EstadoM = drd.IsDBNull(posEstado) ? ""
                                    : drd.GetString(posEstado);

                                oEquipoCLS.TipoEquipoM = drd.IsDBNull(posTipoEquipo) ? 0
                                : drd.GetInt32(posTipoEquipo);


                                oEquipoCLS.ClienteEM = drd.IsDBNull(posCliente) ? 0
                               : drd.GetInt32(posCliente);


                                oEquipoCLS.FaenaEM = drd.IsDBNull(posFaena) ? 0
                       : drd.GetInt32(posFaena);


                                oEquipoCLS.ModeloEM = drd.IsDBNull(posModelo) ? 0
                       : drd.GetInt32(posModelo);


                                //              oFallaCLS.TipoEquipo = drd.IsDBNull(posTipoEquipo) ? ""
                                //     : drd.GetString(posTipoEquipo);

                                //              oFallaCLS.Modelo = drd.IsDBNull(posModelo) ? ""
                                //: drd.GetString(posModelo);







                            }
                        }

                    }

                    if (oEquipoCLS == null)
                    {
                        oEquipoCLS = new EquipoModCLS();

                        oEquipoCLS.idEquipoM = 0;

                        oEquipoCLS.NombreEquipoM = "";

                        oEquipoCLS.SerieM = "";


                        oEquipoCLS.EstadoM = "";


                        oEquipoCLS.TipoEquipoM = 0;



                        oEquipoCLS.ClienteEM = 0;
                       


                        oEquipoCLS.FaenaEM = 0;


                        oEquipoCLS.ModeloEM = 0 ;

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return oEquipoCLS;


        }


        public EquipoModCLS RecuperarEquipoPorIdFalla(int IdFalla)
        {
            EquipoModCLS oEquipoCLS = null;

            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_SelecEquipoxIdFalla", cn))
                    {

                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idFalla", IdFalla);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {

                            int posIdEquipo = drd.GetOrdinal("idEquipo");

                            int posNombre = drd.GetOrdinal("Nombre");
                            int posSerie = drd.GetOrdinal("numSerie");


                            int posEstado = drd.GetOrdinal("estado");


                            int posTipoEquipo = drd.GetOrdinal("idTipoEquipo");

                            int posCliente = drd.GetOrdinal("idCliente");
                            int posFaena = drd.GetOrdinal("idFaena");

                            int posModelo = drd.GetOrdinal("idModelo");



                            while (drd.Read())
                            {
                                oEquipoCLS = new EquipoModCLS();

                                oEquipoCLS.idEquipoM = drd.IsDBNull(posIdEquipo) ? 0 :
                                    drd.GetInt32(posIdEquipo);

                                oEquipoCLS.NombreEquipoM = drd.IsDBNull(posNombre) ? ""
                                    : drd.GetString(posNombre);
                                oEquipoCLS.SerieM = drd.IsDBNull(posSerie) ? ""
                                    : drd.GetString(posSerie);

                                oEquipoCLS.EstadoM = drd.IsDBNull(posEstado) ? ""
                                    : drd.GetString(posEstado);

                                oEquipoCLS.TipoEquipoM = drd.IsDBNull(posTipoEquipo) ? 0
                                : drd.GetInt32(posTipoEquipo);


                                oEquipoCLS.ClienteEM = drd.IsDBNull(posCliente) ? 0
                               : drd.GetInt32(posCliente);


                                oEquipoCLS.FaenaEM = drd.IsDBNull(posFaena) ? 0
                       : drd.GetInt32(posFaena);


                                oEquipoCLS.ModeloEM = drd.IsDBNull(posModelo) ? 0
                       : drd.GetInt32(posModelo);


                                //              oFallaCLS.TipoEquipo = drd.IsDBNull(posTipoEquipo) ? ""
                                //     : drd.GetString(posTipoEquipo);

                                //              oFallaCLS.Modelo = drd.IsDBNull(posModelo) ? ""
                                //: drd.GetString(posModelo);







                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return oEquipoCLS;


        }



        public FallaModCLS recuperarFallaPorId(int idFalla)
        {
            FallaModCLS oFallaCLS = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_SelecFallaxId", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idFalla", idFalla);
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {

                            int posIdFalla = drd.GetOrdinal("idFalla");
                            int posTitulo = drd.GetOrdinal("titulo");
                            int posIdEstado = drd.GetOrdinal("idEstado");

                      
                            int posEstado = drd.GetOrdinal("Estado");
                            int posidUsrSolicitante = drd.GetOrdinal("idUsrSolicitante");

                            int posSolicitante = drd.GetOrdinal("Solicitante");
                            int posnumOS = drd.GetOrdinal("numOS");

                            int posidGrupo = drd.GetOrdinal("idGrupo");

                            int posGrupo = drd.GetOrdinal("Grupo");

                            int posNumeroSerie = drd.GetOrdinal("NumeroSerie");

                            int posFechaFalla = drd.GetOrdinal("FechaFalla");

                            int posidDivision = drd.GetOrdinal("idDivision");
                            int posDivision = drd.GetOrdinal("Division");

                            int posidTipoEquipo = drd.GetOrdinal("idTipoEquipo");


                            int posTipoEquipo = drd.GetOrdinal("TipoEquipo");
                            int posidModelo = drd.GetOrdinal("idModelo");
                            int posModelo = drd.GetOrdinal("Modelo");

                            int posidCliente = drd.GetOrdinal("idCliente");

                            int posidFaena = drd.GetOrdinal("idFaena");
                            int posFaena = drd.GetOrdinal("Faena");

                            int posFechaReparacion = drd.GetOrdinal("FechaReparacion");
                            int posFechaEstimada = drd.GetOrdinal("FechaEstimada");

                            int posDescripcion = drd.GetOrdinal("Descripcion");

                            ///////////////////////////////////////
                            /// <summary>
                            ///  int posidCliente = drd.GetOrdinal("idCliente");

                            int posResponsablePSG = drd.GetOrdinal("ResponsablePSG");
                            int posIngGarantias = drd.GetOrdinal("IngGarantias");
                            int posFabrica = drd.GetOrdinal("Fabrica");

                            int posNroReporte = drd.GetOrdinal("NroReporte");
                            int posNroAfa = drd.GetOrdinal("NroAfa");

                            int posTipoGarantia = drd.GetOrdinal("TipoGarantia");

                            /// </summary>
                            /// 
                            int posFechaRecepcion = drd.GetOrdinal("FechaRecepcion");
                            int posFechaReclamoFab = drd.GetOrdinal("FechaReclamoFab");
                            int posTotalReclamado = drd.GetOrdinal("TotalReclamado");

                            int posFechaAceptacion = drd.GetOrdinal("FechaAceptacion");
                            int posTotalAceptado = drd.GetOrdinal("TotalAceptado");

                            int posMargen = drd.GetOrdinal("Margen");

                            int posclienteRef = drd.GetOrdinal("clienteRef");

                            int posfaenaRef = drd.GetOrdinal("faenaRef");
                            int posCliente = drd.GetOrdinal("Cliente");

                            int posidEquipo = drd.GetOrdinal("idEquipo");

                            int posReclamoWebSag = drd.GetOrdinal("numReclamoWebSag");




                            while (drd.Read())
                            {
                                oFallaCLS = new FallaModCLS();
                                oFallaCLS.idFallaM = drd.IsDBNull(posIdFalla) ? 0 :
                                    drd.GetInt32(posIdFalla);
                                oFallaCLS.tituloM = drd.IsDBNull(posTitulo) ? ""
                                    : drd.GetString(posTitulo);
                                oFallaCLS.idEstado = drd.IsDBNull(posIdEstado) ? ""
                                    : drd.GetString(posIdEstado);
                                oFallaCLS.idEstadoAnt = drd.IsDBNull(posIdEstado) ? ""
                                    : drd.GetString(posIdEstado);

                                oFallaCLS.idusrSolicitanteM = drd.IsDBNull(posidUsrSolicitante) ? 0
                                : drd.GetInt32(posidUsrSolicitante);

                                oFallaCLS.numOSM = drd.IsDBNull(posnumOS) ? ""
                                : drd.GetString(posnumOS);

                                oFallaCLS.idGrupoM = drd.IsDBNull(posidGrupo) ? 0
                               : drd.GetInt32(posidGrupo);

                                oFallaCLS.numserieM = drd.IsDBNull(posNumeroSerie) ? ""
                              : drd.GetString(posNumeroSerie);

                                oFallaCLS.FechaFallaM = drd.IsDBNull(posFechaFalla) ? ""
                             : drd.GetString(posFechaFalla);

                                oFallaCLS.idDivisionM = drd.IsDBNull(posidDivision) ? 0
                       : drd.GetInt32(posidDivision);


                                oFallaCLS.idTipoEquipoM = drd.IsDBNull(posidTipoEquipo) ? 0
                       : drd.GetInt32(posidTipoEquipo);


                                oFallaCLS.TipoEquipoM = drd.IsDBNull(posTipoEquipo) ? ""
                       : drd.GetString(posTipoEquipo);

                                oFallaCLS.ModeloM = drd.IsDBNull(posModelo) ? ""
                  : drd.GetString(posModelo);

                                oFallaCLS.idModeloM = drd.IsDBNull(posidModelo) ? 0
                 : drd.GetInt32(posidModelo);

                                oFallaCLS.idClienteM = drd.IsDBNull(posidCliente) ? 0
            : drd.GetInt32(posidCliente);

                                oFallaCLS.idFaenaM = drd.IsDBNull(posidFaena) ? 0
          : drd.GetInt32(posidFaena);

                                oFallaCLS.FechaReparacionM = drd.IsDBNull(posFechaReparacion) ? ""
         : drd.GetString(posFechaReparacion);

                                oFallaCLS.FechaEstimadaM = drd.IsDBNull(posFechaEstimada) ? ""
      : drd.GetString(posFechaEstimada);

                                oFallaCLS.DescripcionM = drd.IsDBNull(posDescripcion) ? ""
               : drd.GetString(posDescripcion);

                                oFallaCLS.clienteRefM = drd.IsDBNull(posclienteRef) ? ""
               : drd.GetString(posclienteRef);

                                oFallaCLS.faenaRefM = drd.IsDBNull(posfaenaRef) ? ""
               : drd.GetString(posfaenaRef);

                                oFallaCLS.Cliente = drd.IsDBNull(posCliente) ? ""
               : drd.GetString(posCliente);

                                oFallaCLS.FaenaM = drd.IsDBNull(posFaena) ? ""
              : drd.GetString(posFaena);


                                ///////////////////////////////////////GAdmin


                                oFallaCLS.ResponsablePSG = drd.IsDBNull(posResponsablePSG) ? 0
    : drd.GetInt32(posResponsablePSG);

                                oFallaCLS.IngGarantias = drd.IsDBNull(posIngGarantias) ? 0
            : drd.GetInt32(posIngGarantias);


                                oFallaCLS.Fabrica = drd.IsDBNull(posFabrica) ? 0
          : drd.GetInt32(posFabrica);


                                oFallaCLS.NroReporte = drd.IsDBNull(posNroReporte) ? ""
         : drd.GetString(posNroReporte);

                                oFallaCLS.NroAfa = drd.IsDBNull(posNroAfa) ? ""
      : drd.GetString(posNroAfa);
/// </summary>
                                /// 
                           


                                oFallaCLS.TipoGarantia = drd.IsDBNull(posTipoGarantia) ? 0
               : drd.GetInt32(posTipoGarantia);

                                oFallaCLS.FechaRecepcion = drd.IsDBNull(posFechaRecepcion) ? ""
        : drd.GetString(posFechaRecepcion);

                                oFallaCLS.FechaReclamoFab = drd.IsDBNull(posFechaReclamoFab) ? ""
       : drd.GetString(posFechaReclamoFab);


                                oFallaCLS.TotalReclamado = drd.IsDBNull(posTotalReclamado) ? ""
       : drd.GetString(posTotalReclamado);

                                oFallaCLS.FechaAceptacion = drd.IsDBNull(posFechaAceptacion) ? ""
       : drd.GetString(posFechaAceptacion);

                                oFallaCLS.TotalAceptado = drd.IsDBNull(posTotalAceptado) ? ""
      : drd.GetString(posTotalAceptado);

                                oFallaCLS.Margen = drd.IsDBNull(posMargen) ? ""
      : drd.GetString(posMargen);

                                oFallaCLS.idFallaG = drd.IsDBNull(posIdFalla) ? 0
    : drd.GetInt32(posIdFalla);

                                oFallaCLS.idEquipoFM = drd.IsDBNull(posidEquipo) ? 0
                                  : drd.GetInt32(posidEquipo);

                                oFallaCLS.ReclamoWebSag = drd.IsDBNull(posReclamoWebSag) ? ""
                : drd.GetString(posReclamoWebSag);

                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return oFallaCLS;


        }


        public int guardarFalla(FallaModCLS oFallaCLS)
        {
            int rpta = 0;

            string Date = "";
            string day;
            string month;
            string year;
            string fechafallaf;
            string fechareparacionf;
            string fechaestimadaf;

            Date = oFallaCLS.FechaFallaM;

            if (Date == null)
            { fechafallaf = "1901/01/01"; }
            else
            {

                day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                fechafallaf = year + "/" + month + "/" + day;
            }

            Date = oFallaCLS.FechaReparacionM;

            if (Date == null)
            { fechareparacionf = "1901/01/01"; }
            else
            {

                day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                fechareparacionf = year + "/" + month + "/" + day;
            }

            Date = oFallaCLS.FechaEstimadaM;

            if (Date == null)
            { fechaestimadaf = "1901/01/01"; }
            else
            {
                day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                fechaestimadaf = year + "/" + month + "/" + day;
            }


            if (oFallaCLS.numOSM == null) { oFallaCLS.numOSM = ""; }
            if (oFallaCLS.numserieM == null) { oFallaCLS.numserieM = ""; }
            if (oFallaCLS.DescripcionM == null) { oFallaCLS.DescripcionM = ""; }

            if (oFallaCLS.clienteRefM == null) { oFallaCLS.clienteRefM = ""; }
            if (oFallaCLS.faenaRefM == null) { oFallaCLS.faenaRefM = ""; }



            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ActualizarFallaxId", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@titulo", oFallaCLS.tituloM);

                        if (oFallaCLS.idEstado == null)
                            { oFallaCLS.idEstado = "CRE";}


                        cmd.Parameters.AddWithValue("@idEstado", oFallaCLS.idEstado);
                        cmd.Parameters.AddWithValue("@Solicitante", oFallaCLS.idusrSolicitanteM);
                        

                        cmd.Parameters.AddWithValue("@numOS", oFallaCLS.numOSM);
                        cmd.Parameters.AddWithValue("@idGrupo", oFallaCLS.idGrupoM);
                        cmd.Parameters.AddWithValue("@NumeroSerie", oFallaCLS.numserieM);

                        cmd.Parameters.AddWithValue("@FechaFalla", Convert.ToDateTime(fechafallaf));
                        cmd.Parameters.AddWithValue("@Division", oFallaCLS.idDivisionM);
                        cmd.Parameters.AddWithValue("@TipoEquipo", oFallaCLS.idTipoEquipoM);


                        cmd.Parameters.AddWithValue("@Modelo", oFallaCLS.idModeloM);
                        cmd.Parameters.AddWithValue("@Cliente", oFallaCLS.idClienteM);
                        cmd.Parameters.AddWithValue("@Faena", oFallaCLS.idFaenaM);

                        cmd.Parameters.AddWithValue("@FechaReparacion", Convert.ToDateTime(fechareparacionf));
                        cmd.Parameters.AddWithValue("@FechaEstimada", Convert.ToDateTime(fechaestimadaf));
                        cmd.Parameters.AddWithValue("@Descripcion", oFallaCLS.DescripcionM);

                        cmd.Parameters.AddWithValue("@clienteRef", oFallaCLS.clienteRefM);
                        cmd.Parameters.AddWithValue("@faenaRef", oFallaCLS.faenaRefM);
                        cmd.Parameters.AddWithValue("@idEquipo", oFallaCLS.idEquipoFM);




                        cmd.Parameters.AddWithValue("@idFalla", oFallaCLS.idFallaM);


                        rpta = cmd.ExecuteNonQuery();
                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

        public int guardarFallaAdmin(FallaAdminCLS oFallaCLS)
        {
            int rpta = 0;

            string day = "";
            string month = "";
            string year = "";

            string fecharecepcionf = "";
            string fechareclamofabf = "";
            string fechaaceptacionf = "";

            string Date;

          
            Date = oFallaCLS.FechaRecepcion;

            if (Date != null)
            {

                day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                 fecharecepcionf = year + "/" + month + "/" + day;
            }
            else
            {
                 fecharecepcionf = "1901/01/01";
            }

            Date = oFallaCLS.FechaReclamoFab;

            if (Date != null)
            {

                day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                 fechareclamofabf = year + "/" + month + "/" + day;
            }
            else 
            {
                fechareclamofabf = "1901/01/01";
            }

            Date = oFallaCLS.FechaAceptacion;

            if (Date != null)
            {

                day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                fechaaceptacionf = year + "/" + month + "/" + day;


            }
            else
            {

                fechaaceptacionf = "1901/01/01";

            }

            if (oFallaCLS.ReclamoWebSag == null) { oFallaCLS.ReclamoWebSag = ""; }


            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ActualizarFallaAdmin", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IngGarantias", oFallaCLS.IngGarantias);
                        cmd.Parameters.AddWithValue("@ResponsablePSG", oFallaCLS.ResponsablePSG);
                        cmd.Parameters.AddWithValue("@Fabrica", oFallaCLS.Fabrica);

                        cmd.Parameters.AddWithValue("@NroReporte", oFallaCLS.NroReporte);
                        cmd.Parameters.AddWithValue("@NroAfa", oFallaCLS.NroAfa);
                        cmd.Parameters.AddWithValue("@TipoGarantia", oFallaCLS.TipoGarantia);

                        cmd.Parameters.AddWithValue("@FechaRecepcion", Convert.ToDateTime(fecharecepcionf));
                        cmd.Parameters.AddWithValue("@FechaReclamoFab", Convert.ToDateTime(fechareclamofabf));
                        cmd.Parameters.AddWithValue("@TotalReclamado", oFallaCLS.TotalReclamado);

                        cmd.Parameters.AddWithValue("@FechaAceptacion", Convert.ToDateTime(fechaaceptacionf));


                        cmd.Parameters.AddWithValue("@TotalAceptado", oFallaCLS.TotalAceptado);

                        cmd.Parameters.AddWithValue("@Margen", oFallaCLS.Margen);

                        cmd.Parameters.AddWithValue("@ReclamoWebSag", oFallaCLS.ReclamoWebSag);


                        cmd.Parameters.AddWithValue("@idFalla", oFallaCLS.idFallaG);

                        rpta = cmd.ExecuteNonQuery();
                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }


        public int crearFalla(FallaCLS oFallaCLS)
        {
            int rpta = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_AgregarFalla", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@numOs", oFallaCLS.numOS);
                        cmd.Parameters.AddWithValue("@fchFalla", oFallaCLS.FechaFalla);
                        cmd.Parameters.AddWithValue("@clienteRef", oFallaCLS.clienteRef);

                        cmd.Parameters.AddWithValue("@faenaRef", oFallaCLS.faenaRef);

                        cmd.Parameters.AddWithValue("@fchReparacion", oFallaCLS.FechaReparacion);

                        cmd.Parameters.AddWithValue("@fchEstimada", oFallaCLS.FechaEstimada);

                        cmd.Parameters.AddWithValue("@idGrupo", oFallaCLS.idGrupo);

                        cmd.Parameters.AddWithValue("@idDivision", oFallaCLS.idDivision);
                        cmd.Parameters.AddWithValue("@TipoEquipo", oFallaCLS.idTipoEquipo);

                        cmd.Parameters.AddWithValue("@numSerieRef", oFallaCLS.numserie);

                        cmd.Parameters.AddWithValue("@idModelo", oFallaCLS.idModelo);


                        cmd.Parameters.AddWithValue("@idCliente", oFallaCLS.idCliente);

                        cmd.Parameters.AddWithValue("@idFaena", oFallaCLS.idFaena);

                        cmd.Parameters.AddWithValue("@idEstado", oFallaCLS.idEstado);


                        cmd.Parameters.AddWithValue("@idUsrCreacion", oFallaCLS.idUsrCreacion);

                        cmd.Parameters.AddWithValue("@fchCreacion", oFallaCLS.FechaCreacion);

                        cmd.Parameters.AddWithValue("@idUsrSolicitante", oFallaCLS.idUsrSolicitante);
                        
                        cmd.Parameters.AddWithValue("@descripcion", oFallaCLS.Descripcion);

                        cmd.Parameters.AddWithValue("@titulo", oFallaCLS.titulo);

                        cmd.Parameters.AddWithValue("@estado", oFallaCLS.estado);

                        cmd.Parameters.AddWithValue("@idUsrIngPsg", oFallaCLS.idUsrIngPsg);
                        cmd.Parameters.AddWithValue("@idUsrRespPsg", oFallaCLS.idUsrRespPsg);
                        cmd.Parameters.AddWithValue("@numReporte", oFallaCLS.numReporte);

                        cmd.Parameters.AddWithValue("@numAfa", oFallaCLS.numAfa);

                        cmd.Parameters.AddWithValue("@idTipoGarantia", oFallaCLS.idTipoGarantia);

                        cmd.Parameters.AddWithValue("@fchRecepcion", oFallaCLS.fchRecepcion);
                        cmd.Parameters.AddWithValue("@fchReclamadoFab", oFallaCLS.fchReclamadoFab);
                        cmd.Parameters.AddWithValue("@fchAceptacion", oFallaCLS.fchAceptacion);

                        cmd.Parameters.AddWithValue("@totalReclamado", oFallaCLS.totalReclamado);

                        cmd.Parameters.AddWithValue("@totalAceptado", oFallaCLS.totalAceptado);

                        cmd.Parameters.AddWithValue("@fchAceptacion", oFallaCLS.fchAceptacion);

                        cmd.Parameters.AddWithValue("@margen", oFallaCLS.margen);

                        cmd.Parameters.AddWithValue("@idFabrica", oFallaCLS.idFabrica);

                        cmd.Parameters.AddWithValue("@idEquipo", oFallaCLS.idEquipo);

                        SqlParameter IDFalla = new SqlParameter("@idFalla", SqlDbType.Int);
                        IDFalla.Direction = ParameterDirection.Output;
                        IDFalla.Size = 20;
                        // cmd.Parameters["@IDSubClasificacion"].Value = 0;
                        cmd.Parameters.Add(IDFalla);



                        rpta = cmd.ExecuteNonQuery();
                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

        public int crearFallita(FallitaCLS oFallaCLS)
        {
            int rpta = 0;
            int IDFallaF = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    string Date = oFallaCLS.FechaFalla;
                    string fechafallaf = "";
                    string fechareparacionf = "";
                    string fechaestimadaf = "";

                    string day = "";
                    string month = "";
                    string year = "";
                        
                        
                    if (Date == null)
                    { fechafallaf = "1901/01/01"; }
                    else
                    {

                         day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                         month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                         year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                        fechafallaf = year + "/" + month + "/" + day;
                    }

                    Date = oFallaCLS.FechaReparacion;

                    if (Date == null)
                    { fechareparacionf = "1901/01/01"; }
                    else
                    {

                        day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                        fechareparacionf = year + "/" + month + "/" + day;
                    }

                    Date = oFallaCLS.FechaEstimada;

                    if (Date == null)
                    { fechaestimadaf = "1901/01/01"; }
                    else
                    {

                        day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                        fechaestimadaf = year + "/" + month + "/" + day;
                    }

                    if (oFallaCLS.numOS == null) { oFallaCLS.numOS = ""; }
                    if (oFallaCLS.numserie == null) { oFallaCLS.numserie = ""; }
                    if (oFallaCLS.Descripcion == null) { oFallaCLS.Descripcion = ""; }

                    if (oFallaCLS.clienteRef == null) { oFallaCLS.clienteRef = ""; }
                    if (oFallaCLS.faenaRef == null) { oFallaCLS.faenaRef = ""; }
                    



                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_AgregarFallaReportada", cn))
                    {


                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;


                        cmd.Parameters.AddWithValue("@titulo", oFallaCLS.titulo);
                        cmd.Parameters.AddWithValue("@idUsrSolicitante", oFallaCLS.idusrSolicitante);
                        cmd.Parameters.AddWithValue("@numOs", oFallaCLS.numOS);
                        cmd.Parameters.AddWithValue("@idGrupo", oFallaCLS.idGrupo);
                        cmd.Parameters.AddWithValue("@numSerieRef", oFallaCLS.numserie);
                        cmd.Parameters.AddWithValue("@fchFalla",Convert.ToDateTime(fechafallaf));
                        cmd.Parameters.AddWithValue("@idDivision", oFallaCLS.idDivision);
                        cmd.Parameters.AddWithValue("@idTipoEquipo", oFallaCLS.idTipoEquipo);
                        cmd.Parameters.AddWithValue("@idModelo", oFallaCLS.idModelo);
                        cmd.Parameters.AddWithValue("@idCliente", oFallaCLS.idCliente);
                        cmd.Parameters.AddWithValue("@idFaena", oFallaCLS.idFaena);
                        cmd.Parameters.AddWithValue("@fchReparacion", Convert.ToDateTime(fechareparacionf));
                        cmd.Parameters.AddWithValue("@fchEstimada", Convert.ToDateTime(fechaestimadaf));
                        cmd.Parameters.AddWithValue("@descripcion", oFallaCLS.Descripcion);

                        cmd.Parameters.AddWithValue("@clienteRef", oFallaCLS.clienteRef);
                        cmd.Parameters.AddWithValue("@faenaRef", oFallaCLS.faenaRef);
                        cmd.Parameters.AddWithValue("@idEquipo", oFallaCLS.idEquipoF);



                        SqlParameter IDFalla = new SqlParameter("@idFalla", SqlDbType.Int);
                        IDFalla.Direction = ParameterDirection.Output;
                        IDFalla.Size = 20;
                        // cmd.Parameters["@IDSubClasificacion"].Value = 0;
                        cmd.Parameters.Add(IDFalla);



                        rpta = cmd.ExecuteNonQuery();

                        IDFallaF = Convert.ToInt32(cmd.Parameters["@idFalla"].Value);

                        // Se registra el estado en el Historial de Estados

                        int hist = this.guardarHistorialEstados("CRE", 1, "Creacion de Falla", IDFallaF);
                         

                    }

                    //Cierro una vez de traer la data
                    cn.Close();

                    
                    return IDFallaF;
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

        public int RegistrarEquipo(EquipoCLS oEquipoCLS)
        {
            int rpta = 0;
            int IDEquipoF = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                   

                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_RegistrarEquipo", cn))
                    {

                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oEquipoCLS.NombreEquipo);
                        cmd.Parameters.AddWithValue("@Serie", oEquipoCLS.Serie);
                        cmd.Parameters.AddWithValue("@TipoEquipo", oEquipoCLS.TipoEquipo);
                        cmd.Parameters.AddWithValue("@Cliente", oEquipoCLS.ClienteE);
                        cmd.Parameters.AddWithValue("@Faena", oEquipoCLS.FaenaE);
                        cmd.Parameters.AddWithValue("@Modelo", oEquipoCLS.ModeloE);

                        SqlParameter IDEquipo = new SqlParameter("@idEquipo", SqlDbType.Int);
                        IDEquipo.Direction = ParameterDirection.Output;
                        IDEquipo.Size = 20;
                        // cmd.Parameters["@IDSubClasificacion"].Value = 0;
                        cmd.Parameters.Add(IDEquipo);

                        rpta = cmd.ExecuteNonQuery();

                        IDEquipoF = Convert.ToInt32(cmd.Parameters["@idEquipo"].Value);

                        // Se registra el estado en el Historial de Estados

                        //int hist = this.guardarHistorialEstados("CRE", 1, "Creacion de Falla", IDFallaF);


                    }

                    //Cierro una vez de traer la data
                    cn.Close();


                    return IDEquipoF;
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

        public int RegistrarEquipoMod(EquipoModCLS oEquipoCLS)
        {
            int rpta = 0;
            int IDEquipoF = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {


                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_RegistrarEquipo", cn))
                    {

                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@Nombre", oEquipoCLS.NombreEquipoM);
                        cmd.Parameters.AddWithValue("@Serie", oEquipoCLS.SerieM);
                        //cmd.Parameters.AddWithValue("@Estado", oEquipoCLS.EstadoM);
                        cmd.Parameters.AddWithValue("@TipoEquipo", oEquipoCLS.TipoEquipoM);
                        cmd.Parameters.AddWithValue("@Cliente", oEquipoCLS.ClienteEM);
                        cmd.Parameters.AddWithValue("@Faena", oEquipoCLS.FaenaEM);
                        cmd.Parameters.AddWithValue("@Modelo", oEquipoCLS.ModeloEM);

                        SqlParameter IDEquipo = new SqlParameter("@idEquipo", SqlDbType.Int);
                        IDEquipo.Direction = ParameterDirection.Output;
                        IDEquipo.Size = 20;
                        // cmd.Parameters["@IDSubClasificacion"].Value = 0;
                        cmd.Parameters.Add(IDEquipo);

                        rpta = cmd.ExecuteNonQuery();

                        IDEquipoF = Convert.ToInt32(cmd.Parameters["@idEquipo"].Value);

                        // Se registra el estado en el Historial de Estados

                        //int hist = this.guardarHistorialEstados("CRE", 1, "Creacion de Falla", IDFallaF);


                    }

                    //Cierro una vez de traer la data
                    cn.Close();


                    return IDEquipoF;
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }


        public List<SolicitanteCLS> listarSolicitantes()
        {
            List<SolicitanteCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaSolicitantes", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<SolicitanteCLS>();

                            SolicitanteCLS oSolicitanteCLS;
                            int posidUsuario = drd.GetOrdinal("idUsuario");
                            int posusuario = drd.GetOrdinal("usuario");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oSolicitanteCLS = new SolicitanteCLS();

                                oSolicitanteCLS.idUsuario = drd.IsDBNull(posidUsuario) ? 0
                                    : drd.GetInt32(posidUsuario);
                                oSolicitanteCLS.usuario = drd.IsDBNull(posusuario) ? ""
                                  : drd.GetString(posusuario);
                                oSolicitanteCLS.nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oSolicitanteCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<SolicitanteCLS> listarIngGarantias()
        {
            List<SolicitanteCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaIngGarantias", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<SolicitanteCLS>();

                            SolicitanteCLS oSolicitanteCLS;
                            int posidUsuario = drd.GetOrdinal("idUsuario");
                            int posusuario = drd.GetOrdinal("usuario");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oSolicitanteCLS = new SolicitanteCLS();

                                oSolicitanteCLS.idUsuario = drd.IsDBNull(posidUsuario) ? 0
                                    : drd.GetInt32(posidUsuario);
                                oSolicitanteCLS.usuario = drd.IsDBNull(posusuario) ? ""
                                  : drd.GetString(posusuario);
                                oSolicitanteCLS.nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oSolicitanteCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<FabricaCLS> listarFabricas()
        {
            List<FabricaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaFabricas", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<FabricaCLS>();

                            FabricaCLS oFabricaCLS;
                            int posidFabrica = drd.GetOrdinal("id_fabrica");
                           int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oFabricaCLS = new FabricaCLS();

                                oFabricaCLS.idFabrica = drd.IsDBNull(posidFabrica) ? 0
                                    : drd.GetInt32(posidFabrica);
                                oFabricaCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oFabricaCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }


        public List<SerieEquipoCLS> listarSeriesEquipos()
        {
            List<SerieEquipoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaSeriesEquipo", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<SerieEquipoCLS>();

                            SerieEquipoCLS oSerieCLS;
                            int posCodigo = drd.GetOrdinal("numSerie");
                            int posSerie = drd.GetOrdinal("numSerie");


                            while (drd.Read())
                            {
                                oSerieCLS = new SerieEquipoCLS();

                                oSerieCLS.Codigo = drd.IsDBNull(posCodigo) ? ""
                                    : drd.GetString(posCodigo);
                                oSerieCLS.Serie = drd.IsDBNull(posSerie) ? ""
                                  : drd.GetString(posSerie);


                                lista.Add(oSerieCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<SerieEquipoCLS> listarSeriesEquiposC()
        {
            List<SerieEquipoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaSeriesEquipoC", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<SerieEquipoCLS>();

                            SerieEquipoCLS oSerieCLS;

                            int posidEquipo = drd.GetOrdinal("idEquipo");
                            int posSerie = drd.GetOrdinal("numSerie");


                            while (drd.Read())
                            {
                                oSerieCLS = new SerieEquipoCLS();

                                oSerieCLS.idEquipo = drd.IsDBNull(posidEquipo) ? 0
                                    : drd.GetInt32(posidEquipo);
                                oSerieCLS.Serie = drd.IsDBNull(posSerie) ? ""
                                  : drd.GetString(posSerie);


                                lista.Add(oSerieCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }



        public List<TipoGarantiaCLS> listarTiposGarantia()
        {
            List<TipoGarantiaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaTipoGarantias", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TipoGarantiaCLS>();

                            TipoGarantiaCLS oTipoGarantiaCLS;
                            int posidFabrica = drd.GetOrdinal("idTipoGarantia");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oTipoGarantiaCLS = new TipoGarantiaCLS();

                                oTipoGarantiaCLS.idTipoGarantia = drd.IsDBNull(posidFabrica) ? 0
                                    : drd.GetInt32(posidFabrica);
                                oTipoGarantiaCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oTipoGarantiaCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }


        public List<SolicitanteCLS> listarResponsablePSG()
        {
            List<SolicitanteCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaResponsablePSG", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<SolicitanteCLS>();

                            SolicitanteCLS oSolicitanteCLS;
                            int posidUsuario = drd.GetOrdinal("idUsuario");
                            int posusuario = drd.GetOrdinal("usuario");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oSolicitanteCLS = new SolicitanteCLS();

                                oSolicitanteCLS.idUsuario = drd.IsDBNull(posidUsuario) ? 0
                                    : drd.GetInt32(posidUsuario);
                                oSolicitanteCLS.usuario = drd.IsDBNull(posusuario) ? ""
                                  : drd.GetString(posusuario);
                                oSolicitanteCLS.nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oSolicitanteCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }



        public List<GrupoCLS> listarGrupos()
        {
            List<GrupoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaGrupos", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<GrupoCLS>();

                            GrupoCLS oGrupoCLS;
                            int posidGrupo = drd.GetOrdinal("idGrupo");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oGrupoCLS = new GrupoCLS();

                                oGrupoCLS.idGrupo = drd.IsDBNull(posidGrupo) ? 0
                                    : drd.GetInt32(posidGrupo);
                                oGrupoCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oGrupoCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<DivisionCLS> listarDivisiones()
        {
            List<DivisionCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaDivisiones", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<DivisionCLS>();

                            DivisionCLS oDivisionCLS;
                            int posIdDivision = drd.GetOrdinal("idDivision");
                            int posnombre = drd.GetOrdinal("nombre");

                            while (drd.Read())
                            {
                                oDivisionCLS = new DivisionCLS();

                                oDivisionCLS.idDivision = drd.IsDBNull(posIdDivision) ? 0
                                    : drd.GetInt32(posIdDivision);

                                oDivisionCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oDivisionCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<TipoEquipoCLS> listarTiposEquipo()
        {
            List<TipoEquipoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaTipoEquipo", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TipoEquipoCLS>();

                            TipoEquipoCLS oTipoEquipoCLS;
                            int posIdTipoEquipo = drd.GetOrdinal("idTipoEquipo");
                            int posnombre = drd.GetOrdinal("nombre");

                            while (drd.Read())
                            {
                                oTipoEquipoCLS = new TipoEquipoCLS();

                                oTipoEquipoCLS.idTipoEquipo = drd.IsDBNull(posIdTipoEquipo) ? 0
                                    : drd.GetInt32(posIdTipoEquipo);

                                oTipoEquipoCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oTipoEquipoCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<ModeloCLS> listarModelos()
        {
            List<ModeloCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaModelo", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ModeloCLS>();

                            ModeloCLS oModeloCLS;
                            int posIdModelo = drd.GetOrdinal("idModelo");
                            int posnombre = drd.GetOrdinal("nombre");

                            while (drd.Read())
                            {
                                oModeloCLS = new ModeloCLS();

                                oModeloCLS.idModelo = drd.IsDBNull(posIdModelo) ? 0
                                    : drd.GetInt32(posIdModelo);

                                oModeloCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oModeloCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<ClienteCLS> listarClientes()
        {
            List<ClienteCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaCliente", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<ClienteCLS>();

                            ClienteCLS oClienteCLS;
                            int posIdCliente = drd.GetOrdinal("idCliente");
                            int posnombre = drd.GetOrdinal("nombre");

                            while (drd.Read())
                            {
                                oClienteCLS = new ClienteCLS();

                                oClienteCLS.idCliente = drd.IsDBNull(posIdCliente) ? 0
                                    : drd.GetInt32(posIdCliente);

                                oClienteCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oClienteCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<FaenaCLS> listarFaenas()
        {
            List<FaenaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaFaena", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<FaenaCLS>();

                            FaenaCLS oFaenaCLS;
                            int posIdFaena = drd.GetOrdinal("idFaena");
                            int posnombre = drd.GetOrdinal("nombre");

                            while (drd.Read())
                            {
                                oFaenaCLS = new FaenaCLS();

                                oFaenaCLS.idFaena = drd.IsDBNull(posIdFaena) ? 0
                                    : drd.GetInt32(posIdFaena);

                                oFaenaCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oFaenaCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public int crearFallaRep(FallaCLS oFallaCLS)
        {
            int rpta = 0;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_AgregarFallaReportada", cn))
                    {


                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;


                        cmd.Parameters.AddWithValue("@titulo", oFallaCLS.titulo);
                        cmd.Parameters.AddWithValue("@idUsrSolicitante", oFallaCLS.idUsrSolicitante);
                        cmd.Parameters.AddWithValue("@numOs", oFallaCLS.numOS);
                        cmd.Parameters.AddWithValue("@idGrupo", oFallaCLS.idGrupo);
                        cmd.Parameters.AddWithValue("@numSerieRef", oFallaCLS.numserie);
                        cmd.Parameters.AddWithValue("@fchFalla", oFallaCLS.FechaFalla);
                        cmd.Parameters.AddWithValue("@idDivision", oFallaCLS.idDivision);
                        cmd.Parameters.AddWithValue("@idTipoEquipo", oFallaCLS.idTipoEquipo);
                        cmd.Parameters.AddWithValue("@idModelo", oFallaCLS.idModelo);
                        cmd.Parameters.AddWithValue("@idCliente", oFallaCLS.idCliente);
                        cmd.Parameters.AddWithValue("@idFaena", oFallaCLS.idFaena);
                        cmd.Parameters.AddWithValue("@fchReparacion", oFallaCLS.FechaReparacion);
                        cmd.Parameters.AddWithValue("@fchEstimada", oFallaCLS.FechaEstimada);
                        cmd.Parameters.AddWithValue("@descripcion", oFallaCLS.Descripcion);

                     
                       
                        SqlParameter IDFalla = new SqlParameter("@idFalla", SqlDbType.Int);
                        IDFalla.Direction = ParameterDirection.Output;
                        IDFalla.Size = 20;
                        // cmd.Parameters["@IDSubClasificacion"].Value = 0;
                        cmd.Parameters.Add(IDFalla);



                        rpta = cmd.ExecuteNonQuery();
                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }


        public List<EstadoFallaCLS> listarEstadosAdminFallas()
        {
            List<EstadoFallaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaEstadosAdminFallas", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<EstadoFallaCLS>();
                            EstadoFallaCLS oEstadoCLS;
                            int posidEstado = drd.GetOrdinal("IDESTADO");
                            int posEstado = drd.GetOrdinal("ESTADO");

                            while (drd.Read())
                            {
                                oEstadoCLS = new EstadoFallaCLS();

                                oEstadoCLS.idEstado = drd.IsDBNull(posidEstado) ? ""
                                    : drd.GetString(posidEstado);
                                oEstadoCLS.Estado = drd.IsDBNull(posEstado) ? ""
                                  : drd.GetString(posEstado);
                                lista.Add(oEstadoCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<FallaReportadaCLS> listarAdminFallas(string fechainicio, string fechafin,
        string numOS, string Estado, int? idUsrCreacion)
        {
            List<FallaReportadaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {

                    string fechainiciof = "";
                    string fechafinf = "";

                    if (fechainicio == "" || fechafin == "")
                    {

                        DateTime fechainicioc = DateTime.Now;
                        DateTime fechafinc = DateTime.Now;

                        fechainicioc = DateTime.Today.AddMonths(-3);

                        fechainiciof = Convert.ToDateTime(fechainicioc).ToString("yyyy/MM/dd");
                        fechafinf = Convert.ToDateTime(fechafinc).ToString("yyyy/MM/dd");

                    }
                    else
                    {

                        string Date = fechainicio;
                        string day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        string month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        string year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                        fechainiciof = year + "/" + month + "/" + day;

                        Date = fechafin;
                        day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                        year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                        fechafinf = year + "/" + month + "/" + day;


                    }



                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaAdminFallas", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@FechaInicio", Convert.ToDateTime(fechainiciof));
                        cmd.Parameters.AddWithValue("@FechaFin", Convert.ToDateTime(fechafinf));
                        cmd.Parameters.AddWithValue("@numOS", numOS);
                        cmd.Parameters.AddWithValue("@Estado", Estado);
                        cmd.Parameters.AddWithValue("@idUsrCreacion", idUsrCreacion);


                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<FallaReportadaCLS>();
                            FallaReportadaCLS oFallaReportadaCLS;

                            int posIdFalla = drd.GetOrdinal("idFalla");
                            int posTitulo = drd.GetOrdinal("titulo");
                            int posTipoEquipo = drd.GetOrdinal("TipoEquipo");

                            int posModelo = drd.GetOrdinal("Modelo");
                            int posOrdenServicio = drd.GetOrdinal("numOS");
                            int posfchCreacion = drd.GetOrdinal("fchCreacion");

                            int posidCliente = drd.GetOrdinal("idCliente");
                            int posCliente = drd.GetOrdinal("Cliente");
                            int posEstado = drd.GetOrdinal("Estado");

                            while (drd.Read())
                            {
                                oFallaReportadaCLS = new FallaReportadaCLS();
                                oFallaReportadaCLS.idFalla = drd.GetInt32(posIdFalla);
                                oFallaReportadaCLS.titulo = drd.GetString(posTitulo);
                                oFallaReportadaCLS.TipoEquipo = drd.GetString(posTipoEquipo);

                                oFallaReportadaCLS.Modelo = drd.GetString(posModelo);
                                oFallaReportadaCLS.OrdenServicio = drd.GetString(posOrdenServicio);
                                oFallaReportadaCLS.FechaCreacion = drd.GetString(posfchCreacion);

                                oFallaReportadaCLS.idCliente = drd.GetInt32(posidCliente);
                                oFallaReportadaCLS.Cliente = drd.GetString(posCliente);
                                oFallaReportadaCLS.Estado = drd.GetString(posEstado);



                                lista.Add(oFallaReportadaCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }


        public List<TipoAdjuntoCLS> listarTiposAdjuntos()
        {
            List<TipoAdjuntoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaTipoAdjunto", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TipoAdjuntoCLS>();

                            TipoAdjuntoCLS oTipoAdjuntoCLS;
                            int posidTipoAdjunto = drd.GetOrdinal("idTipoAdjunto");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oTipoAdjuntoCLS = new TipoAdjuntoCLS();

                                oTipoAdjuntoCLS.idTipoAdjunto = drd.IsDBNull(posidTipoAdjunto) ? 0
                                    : drd.GetInt32(posidTipoAdjunto);
                               
                                oTipoAdjuntoCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);

                                lista.Add(oTipoAdjuntoCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public List<AdjuntoCLS> listarAdjuntosxIdFalla(int IdFalla)
        {
            List<AdjuntoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {

                   
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaAdjuntoxIdFalla", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idFalla", IdFalla);

                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<AdjuntoCLS>();
                            AdjuntoCLS oAdjuntoCLS;

                            int posidAdjunto = drd.GetOrdinal("idAdjunto");
                            int posNombreArchivo = drd.GetOrdinal("NombreArchivo");
                            int posTipoAdjunto = drd.GetOrdinal("TipoAdjunto");

                            int posidFalla = drd.GetOrdinal("idFalla");
                            int poscomentario = drd.GetOrdinal("comentario");
                            int posRuta = drd.GetOrdinal("Ruta");




                            while (drd.Read())
                            {
                                oAdjuntoCLS = new AdjuntoCLS();

                                oAdjuntoCLS.idAdjunto = drd.GetInt32(posidAdjunto);
                                oAdjuntoCLS.Nombre = drd.GetString(posNombreArchivo);
                                oAdjuntoCLS.TipoAdjunto = drd.GetString(posTipoAdjunto);
                                oAdjuntoCLS.idFalla = drd.GetInt32(posidFalla);
                                oAdjuntoCLS.Comentario = drd.GetString(poscomentario);
                                oAdjuntoCLS.Ruta = drd.GetString(posRuta);

                                lista.Add(oAdjuntoCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        //public int AgregarAdjunto(AdjuntoCLS oAdjuntoCLS)
        public int AgregarAdjunto(string Nombre, int? idTipoAdjunto, int idFalla, string Comentario,
            string Ruta,
            int? idUsrCreacion)

        {
            int rpta = 0;

          
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_AgregarAdjunto", cn))
                    {


                        int IdAdjuntoF = 0;

                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@nombre", Nombre);
                        cmd.Parameters.AddWithValue("@idTipoAdjunto", idTipoAdjunto);
                        cmd.Parameters.AddWithValue("@idFalla", idFalla);

                        cmd.Parameters.AddWithValue("@comentario", Comentario);
                        cmd.Parameters.AddWithValue("@Ruta", Ruta);

                        cmd.Parameters.AddWithValue("@idUsuario", idUsrCreacion);


                        SqlParameter IdAdjunto = new SqlParameter("@idAdjunto", SqlDbType.Int);
                        IdAdjunto.Direction = ParameterDirection.Output;
                        IdAdjunto.Size = 20;
                        // cmd.Parameters["@IDSubClasificacion"].Value = 0;
                        cmd.Parameters.Add(IdAdjunto);

                        rpta = cmd.ExecuteNonQuery();

                        IdAdjuntoF = Convert.ToInt32(cmd.Parameters["@idAdjunto"].Value);


                        return IdAdjuntoF;
                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }


        public int TrasladarFalla(int idFalla)

        {
            int rpta = 0;


            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_TrasladarFalla", cn))
                    {

                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@idFalla", idFalla);

                        rpta = cmd.ExecuteNonQuery();

                        if (rpta == 1)
                        {
                            this.guardarHistorialEstados("REV", 1, "Enviado a PSG", idFalla);
                        }

                       
                    }

                    //Cierro una vez de traer la data
                    cn.Close();

                    return rpta;
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }

        public int ActualizarEstado(int idFalla, string idEstado, string Comentario)

        {
            int rpta = 0;


            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ActualizarEstadoFalla", cn))
                    {

                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@idFalla", idFalla);
                        cmd.Parameters.AddWithValue("@idEstado", idEstado);


                        rpta = cmd.ExecuteNonQuery();

                        if (rpta == 1)
                        {
                            this.guardarHistorialEstados(idEstado, 1, Comentario, idFalla);
                        }


                    }

                    //Cierro una vez de traer la data
                    cn.Close();

                    return rpta;
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }


        public int EliminarAdjunto(int idAdjunto)

        {
            int rpta = 0;


            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_EliminaAdjunto", cn))
                    {

                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@idAdjunto", idAdjunto);

                        rpta = cmd.ExecuteNonQuery();

                        

                    }

                    //Cierro una vez de traer la data
                    cn.Close();

                    return rpta;
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return rpta;


        }



        public List<HistorialEstadoCLS> listarHistorialEstados(int IdFalla)
        {
            List<HistorialEstadoCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {


                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaHistorialEstados", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@idFalla", IdFalla);

                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<HistorialEstadoCLS>();
                            HistorialEstadoCLS oHistorialEstadoCLS;

                            int posidHistorial = drd.GetOrdinal("idEstadoHistorial");
                            int posidEstado = drd.GetOrdinal("idEstado");
                          
                            int posEstado = drd.GetOrdinal("Estado");

                            int posfchCreacion = drd.GetOrdinal("FechaCreacion");

                            int posidUsuarioCreacion = drd.GetOrdinal("idUsuarioCreacion");

                            int poscomentario = drd.GetOrdinal("comentario");

                            int posidFalla = drd.GetOrdinal("idFalla");


                            while (drd.Read())
                            {
                                oHistorialEstadoCLS = new HistorialEstadoCLS();

                                oHistorialEstadoCLS.idEstadoHistorial = drd.GetInt32(posidHistorial);
                                oHistorialEstadoCLS.idEstado = drd.GetString(posidEstado);
                                oHistorialEstadoCLS.Estado = drd.GetString(posEstado);
                                oHistorialEstadoCLS.idFalla = drd.GetInt32(posidFalla);
                                oHistorialEstadoCLS.Comentario = drd.GetString(poscomentario);
                                oHistorialEstadoCLS.FechaCreacion = drd.GetString(posfchCreacion);




                                lista.Add(oHistorialEstadoCLS);
                            }
                        }

                    }

                    //Cierro una vez de traer la data
                    cn.Close();
                }
                catch (Exception ex)
                {
                    cn.Close();
                }

            }
            return lista;


        }

        public int guardarHistorialEstados(string idEstado, int idUsuarioCreacion, string Comentario, int idFalla)

        {
            int rpta = 0;



            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
                {
                    try
                    {
                        //Abro la conexion
                        cn.Open();
                        //Llame al procedure
                        using (SqlCommand cmd = new SqlCommand("USP_AgregaHistorialEstados", cn))
                        {



                            //Buena practica (Opcional)->Indicamos que es un procedure
                            cmd.CommandType = CommandType.StoredProcedure;

                            cmd.Parameters.AddWithValue("@idEstado", idEstado);
                            cmd.Parameters.AddWithValue("@idUsuarioCreacion", idUsuarioCreacion);

                        cmd.Parameters.AddWithValue("@comentario", Comentario);
                        cmd.Parameters.AddWithValue("@idFalla", idFalla);




                            rpta = cmd.ExecuteNonQuery();

                      

                        }

                        //Cierro una vez de traer la data
                        cn.Close();

                    return rpta;
                }
                    catch (Exception ex)
                    {
                        cn.Close();
                    }

                }
                return rpta;


            }



        }
    }
