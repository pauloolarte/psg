using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Capa_Entidad;
//Conectarme a base de datos SQL Server
using System.Data.SqlClient;
using System.Data;
using System.Configuration;
using System.Globalization;

namespace Capa_Datos
{
   public class FallaReportadaDAL : CadenaDALFalla
    {

        public List<EstadoFallaCLS> listarEstados()
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
                    using (SqlCommand cmd = new SqlCommand("USP_ListaEstados", cn))
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

        public List<FallaReportadaCLS> listarFallaReportada(string fechainicio, string fechafin ,
        string numOS,string Estado, int? idUsrCreacion)
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
                    using (SqlCommand cmd = new SqlCommand("USP_ListaFallasReportadas", cn))
                    {
                        //Buena practica (Opcional)->Indicamos que es un procedure
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@FechaInicio",Convert.ToDateTime(fechainiciof));
                        cmd.Parameters.AddWithValue("@FechaFin",Convert.ToDateTime(fechafinf));
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

    }
}
