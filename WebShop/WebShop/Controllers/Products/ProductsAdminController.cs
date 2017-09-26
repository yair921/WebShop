using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebShop.Models;
using System.Web.Script.Serialization;

namespace WebShop.Controllers.Products
{
    public class ProductsAdminController : Controller
    {
        WebShopEntities db = new WebShopEntities();
        public ActionResult Index()
        {
            return View("~/Views/Products/ProductsAdmin.cshtml", GetAllProducts());
        }

        private List<tbl_products> GetAllProducts()
        {
            try
            {
                List<tbl_products> products = new List<tbl_products>();
                var sessionStorage = Session["isLocalStorage"];
                if (sessionStorage == null || (bool)sessionStorage == false)
                {
                    products = db.tbl_products.ToList();
                }
                else if ((bool)sessionStorage == true)
                {
                    products = (List<tbl_products>)Session["products"];
                }
                return products;
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPost]
        public string Remove(int id)
        {
            string result = "";
            try
            {
                var sessionStorage = Session["isLocalStorage"];
                if (sessionStorage == null || (bool)sessionStorage == false)
                {
                    db.tbl_relationship_pc.RemoveRange(db.tbl_relationship_pc.Where(rel => rel.id_product == id));
                    db.tbl_products.RemoveRange(db.tbl_products.Where(p => p.id_product == id));
                    db.SaveChanges();
                }
                else if ((bool)sessionStorage == true)
                {
                    List<tbl_products> products = (List<tbl_products>)Session["products"];
                    var itemToRemove = products.Single(p => p.id_product == id);
                    products.Remove(itemToRemove);
                    Session["products"] = products;
                }
                result = "El producto se ha eliminado correctamente.";
            }
            catch (Exception error)
            {
                result = error.Message.ToString();
            }
            return result;
        }
    }
}