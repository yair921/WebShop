//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace WebShop.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tbl_relationship_pc
    {
        public int id { get; set; }
        public Nullable<int> id_product { get; set; }
        public Nullable<int> id_product_category { get; set; }
        public Nullable<bool> enabled { get; set; }
        public Nullable<System.DateTime> last_update { get; set; }
    
        public virtual tbl_product_categories tbl_product_categories { get; set; }
        public virtual tbl_products tbl_products { get; set; }
    }
}