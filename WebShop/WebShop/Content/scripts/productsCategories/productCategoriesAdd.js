var productCategories = productCategories || {};
(function () {
    'use strict';
    var that = this;

    /*=================================================
      ================ PUBLIC METHODS =================
      =================================================*/

    that.saveCategory = function () {
        var objValidate = [
           { id: 'txt_description' }
        ];
        helper.validateFields(objValidate).then(function () {
            var objToSend = {
                description: document.getElementById('txt_description').value
            }
            $.ajax({
                type: 'POST',
                url: '/productCategoriesAdd/Insert',
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

    window.onload = function () {
        document.getElementById('btn_save').addEventListener('click', function () {
            that.saveCategory();
        });
    }

}).apply(productCategories);