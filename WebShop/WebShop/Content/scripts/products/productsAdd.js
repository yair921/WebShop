var productsAdd = productsAdd || {};
(function () {
    'use strict';
    var that = this;

    /*=================================================
      ================ PUBLIC METHODS =================
      =================================================*/

    that.saveProduct = function () {
        var objValidate = [
            { id: 'txt_number' },
            { id: 'txt_title' },
            { id: 'txt_price' },
            { id: 'ddl_product_categories' }
        ];
        helper.validateFields(objValidate).then(function () {
            var objToSend = {
                number: $('#txt_number').val(),
                title: $('#txt_title').val(),
                price: processDecimal($('#txt_price').val()),
                ids_product_categories: $('#ddl_product_categories').val()
            }
            $.ajax({
                type: 'POST',
                url: '/ProductsAdd/Insert',
                data: objToSend,
                success: function (response) {
                    processResponse(response);
                }
            });
        }).catch(function (error) {
            $('#modalMessageTitle').html('Complete lo siguientes campos:');
            $('#modalMessageContent').html(error);
            $("#modalMessage").modal();
        });
    };

    /*=================================================
      =============== PRIVATE METHODS =================
      =================================================*/

    function processResponse(response) {
        $('#modalMessageTitle').html('Resultado');
        $('#modalMessageContent').html(response);
        $("#modalMessage").modal();
    }

    function processDecimal(monto) {
        monto = monto.replace(/\./g, '');
        return monto;
    }

    window.onload = function () {
        document.getElementById('btn_save').addEventListener('click', function () {
            that.saveProduct();
        });

        //$(document).ready(function () {
        helper.onlyDecimal('txt_price', ',');
        helper.onlyInteger('txt_number');
        //});
    }

}).apply(productsAdd);