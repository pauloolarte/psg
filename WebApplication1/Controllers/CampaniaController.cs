using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using Capa_Entidad;
using Capa_Negocio;


namespace WebApplication1.Controllers
{
    public class CampaniaController : Controller
    {
        // GET: Campania
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult listarCampanias()
        {
            CampaniaBL obj = new CampaniaBL();
            return Json(obj.listarCampanias(),

            JsonRequestBehavior.AllowGet);
        }
    }
}