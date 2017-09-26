using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebShop.Structs
{
    public struct MainStruct
    {
        public bool isLocalStorage
        {
            get
            {
                return false;
            }
            set
            {
                this.isLocalStorage = value;
            }
        }
    }
}