#region USINGS

using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebShop.Models;

#endregion

namespace WebShop.Controllers.Products
{
    /// <summary>
    /// Controlador que contiene las funcionalidades de la vista
    /// ProductsCategoriesAdmin.
    /// </summary>
    public class ProductCategoriesAdminController : Controller
    {
        #region VARIABLES GLOBALES

        /// <summary>
        /// Variables globales.
        /// </summary>
        WebShopEntities db = new WebShopEntities();

        #endregion

        #region MÉTODOS PÚBLICOS

        /// <summary>
        /// Método que renderiza la vista correspondiente.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index()
        {
            return View("~/Views/ProductCategories/ProductCategoriesAdmin.cshtml", GetAllCategories(null, null));
        }

        /// <summary>
        /// Método que obtiene todas las categorías de productos.
        /// </summary>
        /// <param name="sessionLocalStorage">Variable que indica si se debe almacenar en la memoria</param>
        /// <param name="sessionPc">Objeto que puede contener una lista de categorías o ser null</param>
        /// <returns></returns>
        public List<tbl_product_categories> GetAllCategories(dynamic sessionLocalStorage, dynamic sessionPc)
        {
            try
            {
                bool sessionStorage;
                List<tbl_product_categories> categories = new List<tbl_product_categories>();
                if (sessionLocalStorage != null)
                {
                    sessionStorage = sessionLocalStorage;
                }
                else
                {
                    if (Session != null)
                    {
                        if (Session["isLocalStorage"] != null)
                            sessionStorage = (bool)Session["isLocalStorage"];
                        else
                            sessionStorage = false;
                    }
                    else
                    {
                        sessionStorage = false;
                    }
                }
                if (sessionStorage == false)
                {
                    categories = db.tbl_product_categories.ToList();
                }
                else
                {
                    if (sessionPc != null)
                    {
                        categories = sessionPc;
                    }
                    else
                    {
                        if (Session != null)
                            categories = (List<tbl_product_categories>)Session["productCategories"];
                    }
                }
                return categories;
            }
            catch (Exception error)
            {
                throw;
            }
        }

        /// <summary>
        /// Método que elimina una categoría desde la base de datos
        /// o de la memoria temporal.
        /// </summary>
        /// <param name="id">Entero con el id del registro a eliminar</param>
        /// <returns>string con la repuesta de la operación</returns>
        [HttpPost]
        public string Remove(int id)
        {
            string result = "";
            try
            {
                List<tbl_product_categories> categories = new List<tbl_product_categories>();
                var sessionStorage = Session["isLocalStorage"];
                if (sessionStorage == null || (bool)sessionStorage == false)
                {
                    db.tbl_product_categories.RemoveRange(db.tbl_product_categories.Where(pc => pc.id_product_category == id));
                    db.SaveChanges();
                }
                else
                {
                    categories = (List<tbl_product_categories>)Session["productCategories"];
                    var itemToRemove = categories.Single(r => r.id_product_category == id);
                    categories.Remove(itemToRemove);
                    Session["productCategories"] = categories;
                }
                result = "La Categoría se ha eliminado de forma exitosa.";
            }
            catch (Exception error)
            {
                result = error.Message.ToString();
            }
            return result;
        }

        #endregion
    }
}