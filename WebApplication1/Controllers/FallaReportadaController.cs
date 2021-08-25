using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Capa_Entidad;
using Capa_Negocio;

namespace MiPrimeraAplicacionMVCConCapas.Controllers
{
    public class FallaReportadaController : Controller
    {
        // GET: FallaReportada
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarFallaReportada(string  fechainicio, string fechafin,
        string numOS, string Estado, int? idUsrCreacion)
        {
            FallaReportadaBL obj = new FallaReportadaBL();
            return Json(obj.listarFallaReportada(fechainicio,  fechafin,
            numOS,  Estado,  idUsrCreacion),

            JsonRequestBehavior.AllowGet);
        }

        public ActionResult Calendario()
        {
            return View();
        }

        public JsonResult listarEstados()
        {
            FallaReportadaBL oFallaBL = new FallaReportadaBL();
            return Json(oFallaBL.listarEstados(), JsonRequestBehavior.AllowGet);
        }


    }
}