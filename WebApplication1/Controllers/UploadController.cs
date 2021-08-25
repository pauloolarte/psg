using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.IO;

namespace WebApplication1.Controllers
{
    public class UploadController : Controller
    {
        // GET: Upload
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult UploadFile()
        {
            return View();
        }



        [HttpPost]
        public ActionResult UploadFile(HttpPostedFileBase file)
        //public JsonResult UploadFile(HttpPostedFileBase file)
        //public int UploadFile(HttpPostedFileBase file)
        {
            try
            {
                if (file.ContentLength > 0)
                {
                    string _FileName = Path.GetFileName(file.FileName);
                    string _path = Path.Combine(Server.MapPath("~/Adjuntos"), _FileName);
                    file.SaveAs(_path);
                }
               // return Json(new { success = true }, JsonRequestBehavior.AllowGet);

                return Redirect("FallaReporatad");

                //ViewBag.Message = "File Uploaded Successfully!!";
                //return View();
                //return 1;
            }
            catch
            {
                //ViewBag.Message = "File upload failed!!";
                //return View();
                //return 0;
                //return Json(new { success = false }, JsonRequestBehavior.AllowGet);
                return Redirect("FallaReporatad");

            }
        }
    }
}