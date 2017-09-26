var productCategoriesAdmin = productCategoriesAdmin || {};
(function () {
    'use strict';
    var that = this;

    /*=================================================
      ================ PUBLIC METHODS =================
      =================================================*/

    that.remove = function (id) {
        var result = confirm("¿Seguro que desea eliminar este registro?");
        if (result) {
            $.ajax({
                type: 'POST',
                url: 'productCategoriesAdmin/Remove',
                data: { id },
                success: function (response) {
                    window.location = window.location.href;
                }
            });
        }
    };

    /*=================================================
      =============== PRIVATE METHODS =================
      =================================================*/

}).apply(productCategoriesAdmin);