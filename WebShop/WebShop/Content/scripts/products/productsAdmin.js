var productsAdmin = productsAdmin || {};
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
                url: 'ProductsAdmin/Remove',
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

}).apply(productsAdmin);