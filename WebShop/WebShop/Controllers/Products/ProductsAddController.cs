using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebShop.Models;

namespace WebShop.Controllers.Products
{
    public class ProductsAddController : Controller
    {
        WebShopEntities db = new WebShopEntities();
        public ActionResult Index()
        {
            ProductCategoriesAdminController categories = new ProductCategoriesAdminController();
            return View("~/Views/Products/ProductsAdd.cshtml",
                categories.GetAllCategories(Session["isLocalStorage"], Session["productCategories"]));
        }

        [HttpPost]
        public string Insert(tbl_products args)
        {
          //  args.price = (decimal)args.price.ToString().Replace(',','');
            string result = "";
            try
            {
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
            catch (Exception error)
            {
                result = error.Message.ToString();
            }
            return result;
        }

        public string InsertDb(tbl_products args)
        {
            string result = "";
            if (ValidateExist(args, null))
            {
                tbl_products product = new tbl_products
                {
                    number = args.number,
                    title = args.title,
                    price = args.price,
                    last_update = DateTime.Now
                };
                db.tbl_products.Add(product);
                db.SaveChanges();

                InsertProductCategories(product.id_product, args.ids_product_categories);
                result = "Producto guardado exitosamente!";
            }
            else
            {
                result = "El producto ya existe en la base de datos";
            }
            return result;
        }

        public string InsertLocal(tbl_products args)
        {
            string result = "";
            List<tbl_products> listProducts = new List<tbl_products>();
            int id = DateTime.Now.ToString().GetHashCode();

            if (Session["products"] != null)
            {
                listProducts = (List<tbl_products>)Session["products"];
            }
            if (ValidateExist(args, listProducts))
            {
                tbl_products product = new tbl_products
                {
                    id_product = id,
                    number = args.number,
                    title = args.title,
                    price = args.price,
                    last_update = DateTime.Now
                };

                listProducts.Add(product);
                Session["products"] = listProducts;

                InsertProductCategories(product.id_product, args.ids_product_categories);
                result = "Producto guardado exitosamente!";
            }
            else
            {
                result = "El producto ya existe en la base de datos";
            }
            return result;
        }

        private void InsertProductCategories(int id_product, int[] ids_product_categories)
        {
            var sessionStorage = Session["isLocalStorage"];
            if (sessionStorage == null || (bool)sessionStorage == false)
            {
                for (int i = 0; i < ids_product_categories.Count(); i++)
                {
                    tbl_relationship_pc pc = new tbl_relationship_pc
                    {
                        id_product = id_product,
                        id_product_category = ids_product_categories[i],
                        enabled = true,
                        last_update = DateTime.Now
                    };
                    db.tbl_relationship_pc.Add(pc);
                    db.SaveChanges();
                }
            }
            else if ((bool)sessionStorage == true)
            {
                List<tbl_relationship_pc> listRelation = new List<tbl_relationship_pc>();
                if (Session["relationPc"] != null)
                {
                    listRelation = (List<tbl_relationship_pc>)Session["relationPc"];
                }
                for (int i = 0; i < ids_product_categories.Count(); i++)
                {
                    tbl_relationship_pc pc = new tbl_relationship_pc
                    {
                        id_product = id_product,
                        id_product_category = ids_product_categories[i],
                        enabled = true,
                        last_update = DateTime.Now
                    };
                    listRelation.Add(pc);
                    Session["relationPc"] = listRelation;
                }
            }
        }

        private bool ValidateExist(tbl_products args, List<tbl_products> listProducts)
        {
            bool result = true;
            var sessionStorage = Session["isLocalStorage"];
            if (sessionStorage == null || (bool)sessionStorage == false)
            {
                if (db.tbl_products.Any(p => p.number == args.number || p.title == args.title))
                {
                    result = false;
                }
            }
            else if ((bool)sessionStorage == true)
            {
                if (listProducts.Any(p => p.number == args.number || p.title == args.title))
                {
                    result = false;
                }
            }
            return result;
        }

        private bool validateToCategory(tbl_products args)
        {
            bool result = true;
            for (int i = 0; i < args.ids_product_categories.Count(); i++)
            {
                if (db.tbl_relationship_pc.Any(pc => pc.id_product == args.id_product
                && pc.id_product_category == args.ids_product_categories[i]))
                {
                    result = false;
                }
            }
            return result;
        }
    }
}