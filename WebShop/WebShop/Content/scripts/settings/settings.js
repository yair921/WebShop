var settings = settings || {};
(function () {
    'use strict';
    var that = this;

    /*=================================================
      ================ PUBLIC METHODS =================
      =================================================*/

    that.setStorageType = function () {
        var objToSend = {
            is_local_storage: document.getElementById('chk_local_storage').checked
        }
        $.ajax({
            type: 'POST',
            url: '/Settings/SetLocalStorage',
            data: objToSend,
            success: function (response) {
                processResponse(response);
            }
        });
    };

    that.getStorageType = function () {
        $.ajax({
            type: 'POST',
            url: '/Settings/GetLocalStorage',
            success: function (response) {
                if (response == "True") {
                    document.getElementById('chk_local_storage').checked = true;
                }
            }
        });
    };

    /*=================================================
      =============== PRIVATE METHODS =================
      =================================================*/

    window.onload = function () {
        that.getStorageType();
        document.getElementById('chk_local_storage').addEventListener('click', function () {
            that.setStorageType();
        });
    }

}).apply(settings);