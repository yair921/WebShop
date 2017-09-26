using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebShop.Controllers.Settings
{
    public class SettingsController : Controller
    {
        public ActionResult Index()
        {
            return View("~/Views/Settings/Settings.cshtml");
        }

        [HttpPost]
        public void SetLocalStorage(bool is_local_storage)
        {
            Session["isLocalStorage"] = is_local_storage;
        }

        [HttpPost]
        public bool GetLocalStorage()
        {
            if (Session["isLocalStorage"] == null)
                return false;
            bool is_local_storage = (bool)Session["isLocalStorage"];
            bool result = false;
            if (is_local_storage)
            {
                result = true;
            }
            return result;
        }
    }
}