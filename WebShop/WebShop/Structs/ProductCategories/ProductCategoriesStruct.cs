using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebShop.Structs.ProductCategories
{
    public struct ProductCategoriesStruct
    {
        public int id_product_category { get; set; }
        public string description { get; set; }
        public Nullable<System.DateTime> last_update { get; set; }
    }
}