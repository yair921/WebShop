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
    /// Controlador que contiene todas las funcionalidades para la vista
    /// productCategoriesAdd.
    /// </summary>
    public class ProductCategoriesAddController : Controller
    {
        #region VARIABLES GLOBALES

        /// <summary>
        /// Variables globales.
        /// </summary>
        WebShopEntities db = new WebShopEntities();

        #endregion

        #region MÉTODOS PÚBLICOS

        /// <summary>
        /// Método que muestra la vista correspondiente al controlador.
        /// </summary>
        /// <returns>ActionResult</returns>
        public ActionResult Index()
        {
            return View("~/Views/ProductCategories/ProductCategoriesAdd.cshtml");
        }

        /// <summary>
        /// Método que inserta un nuevo productoCategoria.
        /// </summary>
        /// <param name="args">Objetos que contiene los atributos requeridos</param>
        /// <returns>String con respuesta de la operación</returns>
        [HttpPost]
        public string Insert(tbl_product_categories args)
        {
            string result = "";
            var sessionStorage = Session["isLocalStorage"];
            if (sessionStorage == null || (bool)sessionStorage == false)
            {
                result = InsertDb(args);
            }
            else if ((bool)sessionStorage == true)
            {
                result = InsertLocal(args);
            }
            return result;
        }

        #endregion

        #region MÉTODOS PRIVADOS

        /// <summary>
        /// Método que realiza el guardado de productCategories
        /// en la memoria temporal.
        /// </summary>
        /// <param name="args">Objeto con los argumentos requeridos.</param>
        /// <returns>string con la repuesta de la operación</returns>
        private string InsertLocal(tbl_product_categories args)
        {
            string result = "";
            List<tbl_product_categories> listCategories = new List<tbl_product_categories>();
            int id = DateTime.Now.ToString().GetHashCode();
            try
            {
                if (Session["productCategories"] != null)
                {
                    listCategories = (List<tbl_product_categories>)Session["productCategories"];
                }
                if (validateExist(args, listCategories))
                {
                    tbl_product_categories category = new tbl_product_categories
                    {
                        id_product_category = id,
                        description = args.description,
                        last_update = DateTime.Now
                    };
                    listCategories.Add(category);
                    Session["productCategories"] = listCategories;
                    result = "Categoría guardada correctamente";
                }
                else
                {
                    result = "La categoría ya existe en la base de datos";
                }
            }
            catch (Exception error)
            {
                result = error.Message.ToString();
            }
            return result;
        }

        /// <summary>
        /// Método que realiza el guardado de productCategories
        /// en la base de datos.
        /// </summary>
        /// <param name="args">Objeto con los argumentos requeridos.</param>
        /// <returns>String con las respuesta de la operación</returns>
        private string InsertDb(tbl_product_categories args)
        {
            string result = "";
            try
            {
                if (validateExist(args, null))
                {
                    tbl_product_categories category = new tbl_product_categories
                    {
                        description = args.description,
                        last_update = DateTime.Now
                    };
                    db.tbl_product_categories.Add(category);
                    db.SaveChanges();
                    result = "Categoría guardada correctamente";
                }
                else
                {
                    result = "La categoría ya existe en la base de datos";
                }
            }
            catch (Exception error)
            {
                result = error.Message.ToString();
            }
            return result;
        }

        /// <summary>
        /// Mètodo que valida si un registro existe antes de insertarlo.
        /// </summary>
        /// <param name="args">Objeto con los atributos a insertar</param>
        /// <param name="listCategories">Objeto Lista productCategories</param>
        /// <returns>Boolean, donde true será cuando exista el registro</returns>
        private bool validateExist(tbl_product_categories args, List<tbl_product_categories> listCategories)
        {
            bool result = true;
            var sessionStorage = Session["isLocalStorage"];
            if (sessionStorage == null || (bool)sessionStorage == false)
            {
                if (db.tbl_product_categories.Any(p => p.description == args.description))
                {
                    result = false;
                }
            }
            else if ((bool)sessionStorage == true)
            {
                if (listCategories.Any(p => p.description == args.description))
                {
                    result = false;
                }
            }
            return result;
        }

        #endregion
    }
}