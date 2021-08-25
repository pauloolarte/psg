using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Capa_Entidad;
using Capa_Negocio;

namespace WebApplication1.Controllers
{
    public class FallaController : Controller
    {
        // GET: Falla
        public ActionResult AdminFallas()
        {
            return View();
        }

        public ActionResult Timer()
        {
            return View();
        }

        public ActionResult AutoC()
        {
            return View();
        }


        public ActionResult Tabs()
        {
            return View();
        }

        public ActionResult ModificarFalla()
        {

            return View();
        }

        public ActionResult Input()
        {
            return View();
        }

        public ActionResult Adjunto()
        {
            return View();
        }

        // GET: Falla/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        public JsonResult listarAdminFallas(string fechainicio, string fechafin,
    string numOS, string Estado, int? idUsrCreacion)
        {
            FallaBL obj = new FallaBL();
            return Json(obj.listarAdminFallas(fechainicio, fechafin,
            numOS, Estado, idUsrCreacion),

            JsonRequestBehavior.AllowGet);
        }

        public ActionResult Calendario()
        {
            return View();
        }

        public JsonResult listarEstadosAdminFallas()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarEstadosAdminFalla(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarSolicitantes()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarSolicitantes(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarIngGarantias()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarIngGarantias(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarResponsablePSG()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarResponsablePSG(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarFabricas()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarFabricas(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarTiposGarantia()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarTiposGarantia(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarGrupos()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarGrupos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarDivisiones()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarDivisiones(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarEquipos()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.RecuperarEquipos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarSeriesEquipos()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarSeriesEquipos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult ListarSeriesEquiposC()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarSeriesEquiposC(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarTiposEquipo()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarTiposEquipo(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarModelos()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarModelos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarClientes()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarClientes(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarFaenas()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarFaenas(), JsonRequestBehavior.AllowGet);
        }

        public int CrearFalla(FallitaCLS oFalla)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.crearFallita(oFalla);
        }

        public int GuardarFalla(FallaModCLS oFalla)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.guardarFalla(oFalla);
        }

        public int GuardarFallaAdmin(FallaAdminCLS oFalla)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.guardarFallaAdmin(oFalla);
        }

        public JsonResult recuperarFalla(int id)
        {
            FallaBL obj = new FallaBL();
            return Json(obj.recuperarFallaPorId(id), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarEquipoxSerie(string Serie)
        {
            FallaBL obj = new FallaBL();
            return Json(obj.RecuperarEquipoxSerie(Serie), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarEquipoxSerieMod(string Serie, int idModelo)
        {
            FallaBL obj = new FallaBL();
            return Json(obj.RecuperarEquipoxSerieMod(Serie, idModelo), JsonRequestBehavior.AllowGet);
        }

        public JsonResult RecuperarEquipoxIdFalla(int IdFalla)
        {
            FallaBL obj = new FallaBL();
            return Json(obj.RecuperarEquipoxIdFalla(IdFalla), JsonRequestBehavior.AllowGet);
        }


        public int RegistrarEquipo(EquipoCLS oEquipoCLS)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.RegistrarEquipo(oEquipoCLS);
        }

        public int RegistrarEquipoMod(EquipoModCLS oEquipoCLS)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.RegistrarEquipoMod(oEquipoCLS);
        }

        // GET: Falla/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Falla/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Falla/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Falla/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Falla/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Falla/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        /**************Adjunto***************/

        public int CrearAdjunto(string Nombre, int? idTipoAdjunto, int idFalla, string Comentario,
            string Ruta,
            int idUsrCreacion)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.CrearAdjunto(Nombre,idTipoAdjunto, idFalla,Comentario,Ruta,
             idUsrCreacion);
        }

        public int guardarHistorialEstados(string idEstado, int idUsuarioCreacion, string Comentario, int idFalla)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.guardarHistorialEstados(idEstado, idUsuarioCreacion, Comentario, idFalla
             );
        }

        public int ActualizarEstado(int idFalla, string idEstado, string Comentario)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.ActualizarEstado(idFalla, idEstado, Comentario);

        }



        public int TrasladarFalla(int idFalla)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.TrasladarFalla(idFalla);
        }

        public int EliminarAdjunto(int idAdjunto)
        {
            FallaBL oFallaBL = new FallaBL();
            return oFallaBL.EliminarAdjunto(idAdjunto);
        }
        public JsonResult listarTiposAdjuntos()
        {
            FallaBL oFallaBL = new FallaBL();
            return Json(oFallaBL.listarTiposAdjuntos(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarAdjuntoxIdFalla(int idFalla)
        {
            FallaBL obj = new FallaBL();
            return Json(obj.listarAdjuntosxIdFalla(idFalla),

            JsonRequestBehavior.AllowGet);
        }

        public JsonResult listarHistorialEstados(int idFalla)
        {
            FallaBL obj = new FallaBL();
            return Json(obj.listarHistorialEstados(idFalla),

            JsonRequestBehavior.AllowGet);
        }

    }
}
