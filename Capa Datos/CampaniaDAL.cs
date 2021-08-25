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
   public class CampaniaDAL : CadenaDALFalla
    {


        public List<CampaniaCLS> listarCampanias()
        {
            List<CampaniaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {

                    string fechainiciof = "";
                    string fechafinf = "";

                    //if (fechainicio == "" || fechafin == "")
                    //{

                    //    DateTime fechainicioc = DateTime.Now;
                    //    DateTime fechafinc = DateTime.Now;

                    //    fechainicioc = DateTime.Today.AddMonths(-3);

                    //    fechainiciof = Convert.ToDateTime(fechainicioc).ToString("yyyy/MM/dd");
                    //    fechafinf = Convert.ToDateTime(fechafinc).ToString("yyyy/MM/dd");

                    //}
                    //else
                    //{

                    //    string Date = fechainicio;
                    //    string day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    //    string month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    //    string year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                    //    fechainiciof = year + "/" + month + "/" + day;

                    //    Date = fechafin;
                    //    day = String.Format("{0:dd}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    //    month = String.Format("{0:MM}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));
                    //    year = String.Format("{0:yyyy}", DateTime.ParseExact(Date, "dd/MM/yyyy", CultureInfo.InvariantCulture));

                    //    fechafinf = year + "/" + month + "/" + day;


                    //}



                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaCampanias", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        
                        //cmd.Parameters.AddWithValue("@FechaInicio", Convert.ToDateTime(fechainiciof));
                        //cmd.Parameters.AddWithValue("@FechaFin", Convert.ToDateTime(fechafinf));
                        //cmd.Parameters.AddWithValue("@numOS", numOS);
                        //cmd.Parameters.AddWithValue("@Estado", Estado);
                        //cmd.Parameters.AddWithValue("@idUsrCreacion", idUsrCreacion);


                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<CampaniaCLS>();
                            CampaniaCLS oCampaniaCLS;

                            int posIdCampania = drd.GetOrdinal("idCampana");
                            int posNumCampana = drd.GetOrdinal("numCampana");
                            int posTipoCampania = drd.GetOrdinal("TipoCampania");

                            int posGrupo = drd.GetOrdinal("Grupo");
                            int posGrupoModelo = drd.GetOrdinal("GrupoModelo");
                            int posFechaInicio = drd.GetOrdinal("FechaInicio");
                            int posFechaFin = drd.GetOrdinal("FechaFin");
                            int posEstado = drd.GetOrdinal("Estado");

                          
                            while (drd.Read())
                            {
                                oCampaniaCLS = new CampaniaCLS();

                                oCampaniaCLS.idCampana = drd.GetInt32(posIdCampania);
                                oCampaniaCLS.numCampana = drd.GetString(posNumCampana);
                                oCampaniaCLS.TipoCampana = drd.GetString(posTipoCampania);

                                oCampaniaCLS.Grupo = drd.GetString(posGrupo);
                                oCampaniaCLS.GrupoModelo = drd.GetString(posGrupoModelo);
                                oCampaniaCLS.FechaInicio = drd.GetString(posFechaInicio);

                                oCampaniaCLS.FechaFin = drd.GetString(posFechaFin);
                                oCampaniaCLS.Estado = drd.GetString(posEstado);

                                lista.Add(oCampaniaCLS);
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

        public List<TipoCampaniaCLS> listarTiposCampanias()
        {
            List<TipoCampaniaCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaTipoCampana", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<TipoCampaniaCLS>();

                            TipoCampaniaCLS oTipoCLS;
                            int posidTipo = drd.GetOrdinal("idTipoCampana");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oTipoCLS = new TipoCampaniaCLS();

                                oTipoCLS.idTipoCampana = drd.IsDBNull(posidTipo) ? 0
                                    : drd.GetInt32(posidTipo);
                                oTipoCLS.Nombre = drd.IsDBNull(posnombre) ? ""
                                  : drd.GetString(posnombre);


                                lista.Add(oTipoCLS);
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


        public List<GrupoModeloCLS> listarGruposModelo()
        {
            List<GrupoModeloCLS> lista = null;
            //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                try
                {
                    //Abro la conexion
                    cn.Open();
                    //Llame al procedure
                    using (SqlCommand cmd = new SqlCommand("USP_ListaTipoCampana", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        SqlDataReader drd = cmd.ExecuteReader();
                        if (drd != null)
                        {
                            lista = new List<GrupoModeloCLS>();

                            GrupoModeloCLS oGrupoCLS;
                            int posidTipo = drd.GetOrdinal("idGrupoModelo");
                            int posnombre = drd.GetOrdinal("nombre");


                            while (drd.Read())
                            {
                                oGrupoCLS = new GrupoModeloCLS();

                                oGrupoCLS.idGrupoModelo = drd.IsDBNull(posidTipo) ? 0
                                    : drd.GetInt32(posidTipo);
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


        //public int CrearCampania(CampaniaCLS oCampaniaCLS)
        //{
        //    int rpta = 0;
        //    //  string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString; 
        //    using (SqlConnection cn = new SqlConnection(cadena))
        //    {
        //        try
        //        {
        //            //Abro la conexion
        //            cn.Open();
        //            //Llame al procedure
        //            using (SqlCommand cmd = new SqlCommand("USP_AgregarFallaReportada", cn))
        //            {


        //                //Buena practica (Opcional)->Indicamos que es un procedure
        //                cmd.CommandType = CommandType.StoredProcedure;


        //                cmd.Parameters.AddWithValue("@titulo", oFallaCLS.titulo);
        //                cmd.Parameters.AddWithValue("@idUsrSolicitante", oFallaCLS.idUsrSolicitante);
        //                cmd.Parameters.AddWithValue("@numOs", oFallaCLS.numOS);
        //                cmd.Parameters.AddWithValue("@idGrupo", oFallaCLS.idGrupo);
        //                cmd.Parameters.AddWithValue("@numSerieRef", oFallaCLS.numserie);
        //                cmd.Parameters.AddWithValue("@fchFalla", oFallaCLS.FechaFalla);
        //                cmd.Parameters.AddWithValue("@idDivision", oFallaCLS.idDivision);
        //                cmd.Parameters.AddWithValue("@idTipoEquipo", oFallaCLS.idTipoEquipo);
        //                cmd.Parameters.AddWithValue("@idModelo", oFallaCLS.idModelo);
        //                cmd.Parameters.AddWithValue("@idCliente", oFallaCLS.idCliente);
        //                cmd.Parameters.AddWithValue("@idFaena", oFallaCLS.idFaena);
        //                cmd.Parameters.AddWithValue("@fchReparacion", oFallaCLS.FechaReparacion);
        //                cmd.Parameters.AddWithValue("@fchEstimada", oFallaCLS.FechaEstimada);
        //                cmd.Parameters.AddWithValue("@descripcion", oFallaCLS.Descripcion);



        //                SqlParameter IDFalla = new SqlParameter("@idFalla", SqlDbType.Int);
        //                IDFalla.Direction = ParameterDirection.Output;
        //                IDFalla.Size = 20;
        //                // cmd.Parameters["@IDSubClasificacion"].Value = 0;
        //                cmd.Parameters.Add(IDFalla);



        //                rpta = cmd.ExecuteNonQuery();
        //            }

        //            //Cierro una vez de traer la data
        //            cn.Close();
        //        }
        //        catch (Exception ex)
        //        {
        //            cn.Close();
        //        }

        //    }
        //    return rpta;


        //}



    }
}
