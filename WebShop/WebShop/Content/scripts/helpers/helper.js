/**
 * @author Yair Montes.
 * @copyright Derechos Reservados.
 *
 * History
 * 1.0 - 20161217 - Creation.
 * 1.0 - 20170226 - Last Modification.
 */
var helper = helper || {};
(function () {
    'use strict';
    var that = this;

    /**
     * Función pública que permite validar el llenado o completación de los campos de un formulario.
     *
     * @param {array} args :      Arreglo de jsons, con los ids y nombres de cada control a validar, donde:
     *                              id {string} :         Es el identificador del control.
     *                              name {string} :     Continene la descripción del control.
     *                              email {boolean}? :   Opcional que en true indica que dicho campo se debe validar
     *                                                    como correo, en caso de no suministrarse se establece en false.
     *                              password {boolean}? : Opcional, que en true indica que dicho campo se debe validar
     *                                                    como contraseña, en caso de no suministrarse senestablece en false.
     *                              length {int}? :        Opcional que indica que el length del contenido del campo a validar
     *                                                    debe ser igual o mayor al valor suministrado, en caso de no suministrarse
     *                                                    senestablece en 0.
     *                              ej.
     *                                args = [
     *                                        { id: 'ddlTipoAcceso', name: 'Tipo de Acceso' },
     *                                        { id: 'ddlTipoDocumento', name: 'Tipo de Documento' },
     *                                        { id: 'txtUsuario', name: 'Usuario', email : true},
     *                                        { id: 'txtPassword', name: 'Contraseña', password: true },
     *                                        { id: 'txtSede', name: 'Sede', largo : 5 }
     *                                       ];
     *
     * @return {promise} : Si la validación es correcta se resuelve la promesa (resolve()).
     *                     En caso contrario la promesa se rechaza (reject(err)) enviando un string con estructura Html
     *                     la lista de los campos vacíos.
     *
     * @ImplementationExample : validateFields(arg).then(function(){ -- do something -- }).catch(function(err){ -- do somethings with err -- });
     */
    that.validateFields = function (args) {
        try {
            if (that.isNullOrEmpty(args) || !that.isArray(args)) {
                throw "No arguments";
            }
            var camposVacios = '';
            var passUno = null;
            return new Promise(function (resolve, reject) {
                args.forEach(function (row, index) {
                    var idControl = row.id || '';
                    var validar = row.validar || true;
                    var control = document.getElementById(idControl);
                    if (isValidControl(idControl) && validar) {
                        var nombreControl = row.name || document.getElementById(idControl).getAttribute('name');
                        var isEmail = row.email || false;
                        var isPassword = row.password || false;
                        var length = row.length || 0;
                        var argsControl = {
                            id: idControl,
                            name: nombreControl,
                            isEmail: isEmail,
                            isPassword: isPassword,
                            length: length
                        };
                        camposVacios += validateControl(argsControl);
                        if (isPassword) {
                            if (that.isNullOrEmpty(passUno)) {
                                passUno = that.getValue(idControl);
                            } else if (passUno !== that.getValue(idControl)) {
                                camposVacios += '<li>Las contraseñas no coinciden.</li>';
                            }
                        }
                    }
                });
                if (that.isNullOrEmpty(camposVacios)) {
                    resolve();
                } else {
                    reject(camposVacios);
                }
            });
        } catch (e) {
            console.error('"validateFields", error: ' + e);
            alert('"validateFields", error: ' + e);
        }
    };


    /**
     * Función pública que permite determinar si un objeto es de tipo Array.
     *
     * @param {Object} obj : Objeto a determinar si es de tipo Array.
     *
     * @return {Boolean} :   true si el elemento especificado es de tipo Array.
     */
    that.isArray = function (obj) {
        try {
            return (typeof obj !== 'undefined') && Object.prototype.toString.call(obj) === '[object Array]';
        } catch (e) {
            console.error('"isArray", error: ' + e);
        }
    };

    /**
     * Función privada que valida la existencia de un control.
     *
     * @param {string} idControl : Parámetro que contiene el id del control.
     *
     * @return {bool} :            Retorna true si el control existe o está visible.
     */
    function isValidControl(idControl) {
        try {
            var retorno = false;
            var control = document.getElementById(idControl);
            if (!that.isNullOrEmpty(control)) {
                retorno = true;
            }
            return retorno;
        } catch (e) {
            console.error('"isValidControl", error: ' + e);
        }
    }

    /**
     * Permite determinar si un objeto es nulo o vacío.
     *
     * @param {Object} obj : Objeto a determinar si es nulo o vacío.
     * @return {Boolean} :   True si el elemento especificado es nulo o vacío.
     */
    that.isNullOrEmpty = function (obj) {
        try {
            return (typeof obj === 'undefined') || (obj === null) || (obj === '');
        } catch (e) {
            console.error('"isNullOrEmpty", error: ' + e);
        }
    };

    /**
     * Función privada que permite validar campos.
     *
     * @param {objeto} argsControl : Parámetro que contiene los argumentos que identifican que validaciones se
     *                                realizaran en el control
     *                                ej. argsControl = {
     *                                                   id: idControl,
     *                                                   name: name,
     *                                                   isEmail: isEmail,
     *                                                   isPassword: isPassword,
     *                                                   length: length
     *                                                   };
     *
     * @return {string}:              Retorna un string con la lista de los controles vacíos.
     */
    function validateControl(argsControl) {
        try {
            var retorno = '';
            var element = document.getElementById(argsControl.id);
            let elementType = element.type;
            var elementContent = null;

            if (elementType == 'file') {
                elementContent = element.files[0];
            } else {
                elementContent = element.value.trim();
            }

            switch (elementType) {
                case 'text':
                case 'password':
                    if (elementContent.length === 0) {
                        retorno = '<li>' + argsControl.name + '</li>';
                    }
                    break;
                case 'select-one':
                    if (elementContent === "0" || elementContent.length === 0) {
                        retorno = '<li>' + argsControl.name + '</li>';
                    }
                    break;
                case 'file':
                    if (that.isNullOrEmpty(elementContent)) {
                        retorno = '<li>' + argsControl.name + '</li>';
                    }
                    break;
                default:
                    if (elementContent.length === 0) {
                        retorno = '<li>' + argsControl.name + '</li>';
                    }
                    break;
            }
            if (retorno === '') {
                if (argsControl.isPassword) {
                    retorno = that.validatePassword('', argsControl);
                }
                if (argsControl.isEmail && retorno === '') {
                    retorno = that.validateEmail('', argsControl);
                }
                if (argsControl.length > 0 && retorno === '') {
                    retorno = that.validateLength('', argsControl);
                }
            }
            if (retorno !== '') {
                formatErrControl(argsControl.id, true);
            } else {
                formatErrControl(argsControl.id, false);
            }
            return retorno;
        } catch (e) {
            console.error('"validateControl", error: ' + e);
        }
    }

    /**
     * Función pública que permite validar que la contraseña posea las especificaciones mínimas.
     *
     * @param {string}? idControl :   Parámetro opcional que contiene identificador del control en donde
     *                                 se quiere validar el correo, se recibe este parámetro cuando se va
     *                                 hacer una valación específica de un solo control.
     * @param {objeto}? argsControl : Parámetro opcional que contiene los argumentos del control a validar,
     *                                 se recibe este parámetro cuando se realizan validaciones masivas.
     *                                 ej. argsControl = {
     *                                                    id: idControl,
     *                                                    nombre: nombreControl
     *                                                   };
     *
     * @return {boolean} || {string}: Si se recibe el parámetro "idControl" retorna "boolean" de lo contrario
     *                                 retorna un string.
     */
    that.validatePassword = function (idControl, argsControl) {
        try {
            var retorno;
            idControl = idControl || '';
            argsControl = argsControl || null;
            var contenido = '';
            var largo = 0;
            var exprNumero = /[0-9]/;
            var exprMinuscula = /[a-z]/;
            var expMayuscula = /[A-Z]/;
            var tieneBlancos = that.haveSpaces(idControl, argsControl);
            if (idControl === '' && !that.isNullOrEmpty(argsControl)) {
                contenido = document.getElementById(argsControl.id).value.trim();
                largo = contenido.length;
                if (largo < 6
                        || !exprNumero.test(contenido)
                        || !exprMinuscula.test(contenido)
                        || !expMayuscula.test(contenido)
                        || tieneBlancos) {
                    retorno = '<li>' + argsControl.name + '<i> (Debe poseer un mínimo de 6 carácteres entre numéricos, mayúsculas y minúsculas, sin espacios en blanco.)</i>';
                } else {
                    retorno = '';
                }
            } else {
                if (!isValidControl(argsControl.id)) {
                    throw ERROR_ARGS;
                }
                contenido = document.getElementById(idControl).value.trim();
                largo = contenido.length;
                if (largo < 6
                        || !exprNumero.test(contenido)
                        || !exprMinuscula.test(contenido)
                        || !expMayuscula.test(contenido)
                        || tieneBlancos) {
                    retorno = false;
                } else {
                    retorno = true;
                }
            }
            return retorno;
        } catch (e) {
            console.error('"validatePassword", error: ' + e);
            alert('"validatePassword", error: ' + e);
        }
    };

    /**
     * Función pública que permite validar que el contenido de un control posea formato de correo electrónico.
     *
     * @param {string} idControl : Identificador del control en donde se quiere validar el correo.
     *
     * @return {boolean} :         true cuando el correo contiene un formato válido.
     */
    that.validateEmail = function (idControl, argsControl) {
        try {
            var retorno = '';
            idControl = idControl || '';
            argsControl = argsControl || null;
            var correoE = '';
            var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!that.isNullOrEmpty(argsControl) && idControl === '') {
                correoE = document.getElementById(argsControl.id).value.trim();
                if (!expr.test(correoE)) {
                    retorno = '<li>' + argsControl.name + '<i> (Correo inválido)</i>';
                }
            } else {
                var control = document.getElementById(idControl);
                if (isValidControl(idControl)) {
                    correoE = control.value.trim();
                    if (!expr.test(correoE)) {
                        retorno = false;
                    }
                } else {
                    retorno = false;
                }
                if (retorno !== '') {
                    formatErrControl(argsControl.id, true);
                } else {
                    formatErrControl(argsControl.id, false);
                }
            }
            return retorno;
        } catch (e) {
            console.error('"validateEmail", error: ' + e);
            alert('"validateEmail", error: ' + e);
        }
    };

    /**
     * Función pública que permite validar que el length del contenido de un control.
     *
     * @param {string}? idControl : Parámetro opcional que contiene identificador del control en donde
     *                               se quiere hacer la validación, se recibe este parámetro cuando se va
     *                               hacer una valación específica de un solo control.
     * @param {objeto}? argsControl : Parámetro opcional que contiene los argumentos del control a validar,
     *                               se recibe este parámetro cuando se realizan validaciones masivas.
     *                               ej. argsControl = {
     *                                                  id: idControl,
     *                                                  nombre: nombreControl
     *                                                 };
     *
     * @return {boolean} || {string}: Si se recibe el parámetro "idControl" retorna "boolean" de lo contrario
     *                                 retorna un string.
     */
    that.validateLength = function (idControl, argsControl) {
        try {
            var retorno = true;
            idControl = idControl || '';
            argsControl = argsControl || null;
            var largo = 0;
            var contenido = '';
            if (idControl === '' && !that.isNullOrEmpty(argsControl)) {
                contenido = document.getElementById(argsControl.id).value.trim();
                largo = contenido.length;
                if (largo < argsControl.length) {
                    retorno = '<li>' + argsControl.name + '<i> (Mínimo ' + argsControl.largo + ' carácteres)</i></li>';
                } else {
                    retorno = '';
                }
            } else {
                if (!isValidControl(idControl)) {
                    throw 'argumento(s) no definido o de tipo incorrecto.';
                }
                contenido = document.getElementById(idControl).value.trim();
                largo = contenido.length;
                if (largo < argsControl.length) {
                    retorno = false;
                } else {
                    retorno = true;
                }
            }
            return retorno;
        } catch (e) {
            console.error('"validateLength", error: ' + e);
            alert('"validateLength", error: ' + e);
        }
    };

    /**
     * Función privada que establece el color de borde a un control.
     *
     * @param {string} idControl : Parámetro que contiene el id del control.
     * @param {bool} err :         Boleano que determina si es error o no.
     *
     * @return {void}.
     */
    function formatErrControl(idControl, err) {
        try {
            var colorBorde = err ? 'red' : '#A9A9A9';
            document.getElementById(idControl).style.borderColor = colorBorde;
        } catch (e) {
            console.error('"formatErrControl", error: ' + e);
        }
    }

    /**
     * Función pública que permite validar que el contenido de un control no posea espacios en blanco.
     *
     * @param {string}? idControl :   Parámetro opcional que contiene identificador del control en donde
     *                                 se quiere hacer la validación, se recibe este parámetro cuando se va
     *                                 hacer una valación específica de un solo control.
     * @param {objeto}? argsControl : Parámetro opcional que contiene los argumentos del control a validar,
     *                                 se recibe este parámetro cuando se realizan validaciones masivas.
     *                                 ej. argsControl = {
     *                                                    id: idControl,
     *                                                    nombre: nombreControl
     *                                                   };
     *
     * @return {boolean} || {string}: Si se recibe el parámetro "idControl" retorna "boolean" de lo contrario
     *                                 retorna un string.
     */
    that.haveSpaces = function (idControl, argsControl) {
        try {
            var retorno = false;
            idControl = idControl || '';
            argsControl = argsControl || null;
            var valorControl = '';
            if (idControl === '' && !that.isNullOrEmpty(argsControl)) {
                valorControl = document.getElementById(argsControl.id).value;
            } else {
                if (!isValidControl(idControl)) {
                    throw ERROR_ARGS;
                }
                valorControl = document.getElementById(idControl).value;
            }
            var blancos = valorControl.indexOf(' ');
            if (blancos !== -1) {
                retorno = true;
            }
            return retorno;
        } catch (e) {
            console.error('"haveSpaces", error: ' + e);
            alert('"haveSpaces", error: ' + e);
        }
    };

    /**
     * Función pública valida la entrada numerica en un control.
     *
     * @param {string} idControl : Identificador del control en donde se quiere validar.
     *
     * @return {void}.
     */
    that.onlyInteger = function (idControl) {
        try {
            if (helper.isNullOrEmpty(idControl)) {
                throw ERROR_ARGS;
            }
            document.getElementById(idControl).oncontextmenu = function () {
                return false;
            };
            document.getElementById(idControl).addEventListener('keyup', function (e) {
                var control = document.getElementById(idControl);
                var value = control.value;
                var newValue = '';
                value = value.split('');
                for (var i = 0; i < value.length; i++) {
                    if (!isNaN(value[i])) {
                        newValue += value[i];
                    }
                }
                control.value = newValue;
            });
        } catch (e) {
            console.error('"onlyNumbers", error: ' + e);
        }
    };

    /**
     * Función pública valida la entrada numerica en un control.
     *
     * @param {string} idElement        : Identificador del control en donde se quiere validar.
     * @param {string} decimalSeparator : Decimal separator character.
     *
     * @return {void}.
     */
    that.onlyDecimal = function (idElement, decimalSeparator) {
        let element = document.getElementById(idElement);
        element.style.textAlign = 'right';
        element.style.paddingRight = '3px';
        document.getElementById(idElement).oncontextmenu = function () {
            return false;
        };
        document.getElementById(idElement).addEventListener('keyup', function (e) {
            let element = document.getElementById(idElement);
            if (element.type !== 'text')
                return;
            element.value = element.value.replace(' ', '');
            if (that.isNullOrEmpty(element.value))
                return;
            element.value = that.convertToDecimal(element.value, decimalSeparator);
        });
    };

    /**
     * Función pública valida la entrada numerica en un control.
     *
     * @param {string} idElement        : Identificador del control en donde se quiere validar.
     * @param {string} decimalSeparator : Decimal separator character.
     *
     * @return {void}.
     */
    //   that.convertToDecimal = function (idElement, decimalSeparator) {
    that.convertToDecimal = function (val, decimalSeparator) {
        let result;
        let thousandsSeparator = decimalSeparator == '.' ? ',' : '.';
        decimalSeparator = thousandsSeparator == '.' ? ',' : '.';
        if (val.charAt(0) == thousandsSeparator
                || val.charAt(0) == decimalSeparator
                || val.charAt(0) == 0) {
            val = val.slice(1);
        }
        let monto = '';
        let previusValue = '';
        let value = val.split('');
        for (var i = 0; i < value.length; i++) {
            if ((value[i].charCodeAt(0) >= 48 && value[i].charCodeAt(0) <= 57)
                    || value[i].charCodeAt(0) == 44 || value[i].charCodeAt(0) == 46) {
                monto += value[i];
            }
        }
        if (that.isNullOrEmpty(monto)) {
            result = '';
            return result;
        }
        let redondeoConDecimales = false;
        var mtr = '';
        var contador = 0;
        var contador2 = 0;
        var resultado = '';
        var esNegativo = false;
        if (thousandsSeparator == '.') {
            monto = monto.replace(/\./g, '');
        } else {
            monto = monto.replace(/\,/g, '');
        }
        if (monto == '') {
            monto = 0;
        }
        if (monto.charAt(0) == '-') {
            monto = monto.substr(1, monto.length);
            esNegativo = true;
        }
        if (redondeoConDecimales) {
            monto = Math.round(parseFloat(monto) * 100) / 100;
        }
        if (monto.toString().indexOf(decimalSeparator) > -1) {
            mtr = monto.toString().split(decimalSeparator);
            if (mtr[0].length > 3) {
                var ultimoCaracter = mtr[0].length;
                for (let r = 0; r <= parseInt(mtr[0].length) - parseInt(1) ; r++) {
                    contador++;
                    contador2++;
                    if (contador == 4) {
                        resultado = mtr[0].charAt(parseInt(ultimoCaracter) - parseInt(contador2)) + thousandsSeparator + resultado;
                        contador = 1;
                    } else {
                        resultado = mtr[0].charAt(parseInt(ultimoCaracter) - parseInt(contador2)) + resultado;
                    }
                }
                if (esNegativo) {
                    result = '-' + resultado + '.' + mtr[1];
                } else {
                    result = resultado + decimalSeparator + mtr[1];
                }
            } else {
                if (esNegativo) {
                    result = '-' + mtr[0] + '.' + mtr[1];
                } else {
                    result = mtr[0] + decimalSeparator + mtr[1];
                }
            }
        } else {
            if (parseInt(monto.toString().length) > 3) {
                var ultimoCaracter = parseInt(monto.toString().length);
                for (let r = 0; r <= parseInt(monto.toString().length) - parseInt(1) ; r++) {
                    contador2++;
                    contador++;
                    if (contador == 4) {
                        resultado = monto.toString().charAt(parseInt(ultimoCaracter) - parseInt(contador2)) + thousandsSeparator + resultado;
                        contador = 1;
                    } else {
                        resultado = monto.toString().charAt(parseInt(ultimoCaracter) - parseInt(contador2)) + resultado;
                    }
                }
                if (esNegativo) {
                    result = '-' + resultado + '';
                } else {
                    result = resultado + '';
                }
            } else {
                if (esNegativo) {
                    result = '-' + monto + '';
                } else {
                    result = monto + '';
                }
            }
        }
        return result;
    };
}).apply(helper);