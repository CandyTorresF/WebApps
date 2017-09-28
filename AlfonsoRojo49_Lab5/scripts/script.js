/*
    Recursos utilizados de internet:
    https://stackoverflow.com/questions/20871787/html-select-option-validation
    https://stackoverflow.com/questions/1423777/how-can-i-check-whether-a-radio-button-is-selected-with-javascript
    https://stackoverflow.com/questions/11456929/if-function-false-do-this
*/

document.addEventListener("DOMContentLoaded", function(){
    var submitButton = document.getElementById("agregarCarrito");
    var cancelButton = document.getElementById("resetearOrden");
    
    submitButton.addEventListener("click", validateName);
    submitButton.addEventListener("click", validateType);
    submitButton.addEventListener("click", validateAderezos);
    submitButton.addEventListener("click", validateBread);
    submitButton.addEventListener("click", validateQuantity);
    submitButton.addEventListener("click", showOrder);
    
    cancelButton.addEventListener("click", cleanOrder);
});

function validateName(){
    var clientName = document.getElementById("nombreCliente");
    var clientNameErrorMessage = document.getElementById("clientNameErrorMessage");
    var boolCliente;
    
    if(clientName.value == ""){
        clientNameErrorMessage.classList.remove("hiddenElement");
        boolCliente = false;
    }else{
        clientNameErrorMessage.classList.add("hiddenElement");
        boolCliente = true;
    }
    
    return boolCliente;
}

/* Corregir validacion del tipo de hamburguesa */
function validateType(){
    var hamburguerType = document.getElementById("tipoHamburguesa");
    var tipoHamburguesaValue = hamburguerType.options[hamburguerType.selectedIndex].value;
    var typeErrorMessage = document.getElementById("typeErrorMessage");
    var boolTipo;
    
    
    if(tipoHamburguesaValue == 0){
        typeErrorMessage.classList.remove("hiddenElement");
        boolTipo = false;
    }else{
        typeErrorMessage.classList.add("hiddenElement");
        boolTipo = true;
    }
    
    return boolTipo;
}

/* Arreglar función */
function validateBread(){
    var breadType = document.getElementById("tipoPan");
    var tipoPanValue = breadType.options[breadType.selectedIndex].value;
    var breadErrorMessage = document.getElementById("breadErrorMessage");
    var boolPan;
    
    if(tipoPanValue == 0){
        breadErrorMessage.classList.remove("hiddenElement");
        boolPan = false;
    }else{
        breadErrorMessage.classList.add("hiddenElement");
        boolPan = true;
    }
    
    return boolPan;
}

function validateAderezos(){
    //Forma 1
    var aderezosErrorMessage = document.getElementById("aderezosErrorMessage");
    var boolAderezos;
    
    if(document.getElementById("aderezos_si").checked == false && document.getElementById("aderezos_no").checked == false){
        aderezosErrorMessage.classList.remove("hiddenElement");
        boolAderezos = false;
    }else{
        aderezosErrorMessage.classList.add("hiddenElement");
        boolAderezos = true;
    }
    
    return boolAderezos;
    
    /*
    //Forma 2
    var aderezosSi = document.getElementById("aderezos_si");
    var aderezosNo = document.getElementById("aderezos_no");
    
    var aderezosErrorMessage = document.getElementById("aderezosErrorMessage");
    
    if(aderezosSi.checked == false && aderezosNo.checked == false){
        aderezosErrorMessage.classList.remove("hiddenElement");
    }else{
        aderezosErrorMessage.classList.add("hiddenElement");
    }
    */
}

function validateQuantity(){
    var quantity = document.getElementById("cantidadHamburguesas");
    var quantityErrorMesssage = document.getElementById("quantityErrorMessage");
    var boolCantidad;
    
    if(quantity.value == ""){
        quantityErrorMesssage.classList.remove("hiddenElement");
        boolCantidad = false;
    }else{
        quantityErrorMesssage.classList.add("hiddenElement");
        boolCantidad = true;
    }
    
    return boolCantidad;
}

function showOrder(){
    if(validateName() && validateType() && validateBread() && validateAderezos() && validateQuantity())
    {
        //Obtener span del resumen de la orden y mostrarlo
        var resumenOrder = document.getElementById("resumenOrden");
        resumenOrder.classList.remove("hiddenElement");
        
        //Nombre del cliente
        var nombreCliente = document.getElementById("nombreCliente");
        document.getElementById("nombreOrden").innerHTML = "Nombre: " + nombreCliente.value;
        //Tipo de Hamburguesa
        var tipoHamburguesaElement = document.getElementById("tipoHamburguesa");
        var tipoHamburguesaValue = tipoHamburguesaElement.options[tipoHamburguesaElement.selectedIndex].text;
        document.getElementById("tipoOrden").innerHTML = "Tipo de hamburguesa: " + tipoHamburguesaValue;
        //Tipo de pan
        var tipoPanElement = document.getElementById("tipoPan");
        var tipoPanValue = tipoPanElement.options[tipoPanElement.selectedIndex].text;
        document.getElementById("panOrden").innerHTML = "Tipo de pan: " + tipoPanValue;
        //Aderezos
        var aderezosSi = document.getElementById("aderezos_si");
        var aderezosNo = document.getElementById("aderezos_no");
        if(aderezosSi.checked == true){
            document.getElementById("aderezosOrden").innerHTML = "Aderezos: Sí";
        }else if(aderezosNo.checked == true){
            document.getElementById("aderezosOrden").innerHTML = "Aderezos: No";
        }
        //Complementos
        document.getElementById("complementosOrden").innerHTML = "Complementos:";
        if(document.getElementById("c1-1").checked == true){
            document.getElementById("11").innerHTML = "Tomate";
        }
        if(document.getElementById("c1-2").checked == true){
            document.getElementById("12").innerHTML = "Lechuga";
        }
        if(document.getElementById("c1-3").checked == true){
            document.getElementById("13").innerHTML = "Cebolla";
        }
        if(document.getElementById("c1-4").checked == true){
            document.getElementById("14").innerHTML = "Pepinillos";
        }
        if(document.getElementById("c1-5").checked == true){
            document.getElementById("15").innerHTML = "Aguacate";
        }
        if(document.getElementById("c1-6").checked == true){
            document.getElementById("16").innerHTML = "Repollo";
        }
        if(document.getElementById("c1-7").checked == true){
            document.getElementById("17").innerHTML = "Pimiento";
        }
        if(document.getElementById("c1-8").checked == true){
            document.getElementById("18").innerHTML = "Jalapeño";
        }
        if(document.getElementById("c1-9").checked == true){
            document.getElementById("19").innerHTML = "Champiñones";
        }
        if(document.getElementById("c1-10").checked == true){
            document.getElementById("110").innerHTML = "Tocino";
        }
        if(document.getElementById("c1-11").checked == true){
            document.getElementById("111").innerHTML = "Queso Extra";
        }
        if(document.getElementById("c1-12").checked == true){
            document.getElementById("112").innerHTML = "Cebolla a la parrilla";
        }
        if(document.getElementById("c1-13").checked == true){
            document.getElementById("113").innerHTML = "Pimiento a la parrilla";
        }
        if(document.getElementById("c1-14").checked == true){
            document.getElementById("114").innerHTML = "Aceite de oliva";
        }
        //Salsas
        document.getElementById("salsasOrden").innerHTML = "Salsas:";
        if(document.getElementById("c2-1").checked == true){
            document.getElementById("21").innerHTML = "Salsa Mr. Burger";
        }
        if(document.getElementById("c2-2").checked == true){
            document.getElementById("22").innerHTML = "Salsa al Bistec";
        }
        if(document.getElementById("c2-3").checked == true){
            document.getElementById("23").innerHTML = "Salsa Barbeque";
        }
        if(document.getElementById("c2-4").checked == true){
            document.getElementById("24").innerHTML = "Salsa Picante";
        }
        if(document.getElementById("c2-5").checked == true){
            document.getElementById("25").innerHTML = "Honey Mustard";
        }
        if(document.getElementById("c2-6").checked == true){
            document.getElementById("26").innerHTML = "Ranch";
        }
        if(document.getElementById("c2-7").checked == true){
            document.getElementById("27").innerHTML = "Salsa Chipotle";
        }
        if(document.getElementById("c2-8").checked == true){
            document.getElementById("28").innerHTML = "Aceite de Oliva";
        }
        //Adicionales
        document.getElementById("adicionalesOrden").innerHTML = "Adicionales:";
        if(document.getElementById("c3-1").checked == true){
            document.getElementById("31").innerHTML = "Ensalada";
        }
        if(document.getElementById("c3-2").checked == true){
            document.getElementById("32").innerHTML = "Papas a la Francesa";
        }
        if(document.getElementById("c3-3").checked == true){
            document.getElementById("33").innerHTML = "Papas Cris-Cut";
        }

        //Cantidad de hamburguesas
        var cantidadHamburguesas = document.getElementById("cantidadHamburguesas");
        document.getElementById("cantidadOrden").innerHTML = "Cantidad de hamburguesas: " + cantidadHamburguesas.value;
        
        var ordenNoCompleta = document.getElementById("ordenNoCompleta");
        ordenNoCompleta.classList.add("hiddenElement");
    }else{
        var ordenNoCompleta = document.getElementById("ordenNoCompleta");
        ordenNoCompleta.classList.remove("hiddenElement");
    }
}

/* Arreglar función */
function cleanOrder(){
    document.getElementById("nombreCliente").value = "";            // Limpiar nombre del cliente
    document.getElementsByName("tipoHamburguesa")[0].value = 0;     // Limpiar el tipo de hamburguesa
    document.getElementsByName("tipoPan")[0].value = 0;             // Limpiar el tipo de pan
    document.getElementById("aderezos_si").checked = null;          // Limpiar el primer radio button
    document.getElementById("aderezos_no").checked = null;          // Limpiar el segundo radio button
    
    //Limpiar set de checkboxes 1
    document.getElementById("c1-1").checked = false;
    document.getElementById("c1-2").checked = false;
    document.getElementById("c1-3").checked = false;
    document.getElementById("c1-4").checked = false;
    document.getElementById("c1-5").checked = false;
    document.getElementById("c1-6").checked = false;
    document.getElementById("c1-7").checked = false;
    document.getElementById("c1-8").checked = false;
    document.getElementById("c1-9").checked = false;
    document.getElementById("c1-10").checked = false;
    document.getElementById("c1-11").checked = false;
    document.getElementById("c1-12").checked = false;
    document.getElementById("c1-12").checked = false;
    document.getElementById("c1-13").checked = false;
    document.getElementById("c1-14").checked = false;
    //Limpiar set de checkboxes 2
    document.getElementById("c2-1").checked = false;
    document.getElementById("c2-2").checked = false;
    document.getElementById("c2-3").checked = false;
    document.getElementById("c2-4").checked = false;
    document.getElementById("c2-5").checked = false;
    document.getElementById("c2-6").checked = false;
    document.getElementById("c2-7").checked = false;
    document.getElementById("c2-8").checked = false;
    //Limpiar set de checkboxes 3
    document.getElementById("c3-1").checked = false;
    document.getElementById("c3-2").checked = false;
    document.getElementById("c3-3").checked = false;
    
    document.getElementById("cantidadHamburguesas").value = "";     //Limpiar la cantidad de hamburguesas
    
    //Oculté el span para el resumen de la orden
    var resumenOrder = document.getElementById("resumenOrden");
    resumenOrder.classList.add("hiddenElement");
    
    //Oculté los mensajes de error en dado caso que estuvieran mostrandose
    var clientNameErrorMessage = document.getElementById("clientNameErrorMessage");
    clientNameErrorMessage.classList.add("hiddenElement");
    
    var typeErrorMessage = document.getElementById("typeErrorMessage");
    typeErrorMessage.classList.add("hiddenElement");
    
    var breadErrorMessage = document.getElementById("breadErrorMessage");
    breadErrorMessage.classList.add("hiddenElement");
    
    var aderezosErrorMessage = document.getElementById("aderezosErrorMessage");
    aderezosErrorMessage.classList.add("hiddenElement");
    
    var quantityErrorMesssage = document.getElementById("quantityErrorMessage");
    quantityErrorMesssage.classList.add("hiddenElement");
    
    var ordenNoCompleta = document.getElementById("ordenNoCompleta");
    ordenNoCompleta.classList.add("hiddenElement");
    
    //Limpiar resumen
    var limpiar11 =  document.getElementById("11");
    limpiar11.textContent="";
    var limpiar12 =  document.getElementById("12");
    limpiar12.textContent="";
    var limpiar13 =  document.getElementById("13");
    limpiar13.textContent="";
    var limpiar14 =  document.getElementById("14");
    limpiar14.textContent="";
    var limpiar15 =  document.getElementById("15");
    limpiar15.textContent="";
    var limpiar16 =  document.getElementById("16");
    limpiar16.textContent="";
    var limpiar17 =  document.getElementById("17");
    limpiar17.textContent="";
    var limpiar18 =  document.getElementById("18");
    limpiar18.textContent="";
    var limpiar19 =  document.getElementById("19");
    limpiar19.textContent="";
    var limpiar110 =  document.getElementById("110");
    limpiar110.textContent="";
    var limpiar111 =  document.getElementById("111");
    limpiar111.textContent="";
    var limpiar112 =  document.getElementById("112");
    limpiar112.textContent="";
    var limpiar113 =  document.getElementById("113");
    limpiar113.textContent="";
    var limpiar114 =  document.getElementById("114");
    limpiar114.textContent="";
    
    var limpiar21 =  document.getElementById("21");
    limpiar21.textContent="";
    var limpiar22 =  document.getElementById("22");
    limpiar22.textContent="";
    var limpiar23 =  document.getElementById("23");
    limpiar23.textContent="";
    var limpiar24 =  document.getElementById("24");
    limpiar24.textContent="";
    var limpiar25 =  document.getElementById("25");
    limpiar25.textContent="";
    var limpiar26 =  document.getElementById("26");
    limpiar26.textContent="";
    var limpiar27 =  document.getElementById("27");
    limpiar27.textContent="";
    var limpiar28 =  document.getElementById("28");
    limpiar28.textContent="";
    
    var limpiar31 =  document.getElementById("31");
    limpiar31.textContent="";
    var limpiar32 =  document.getElementById("32");
    limpiar32.textContent="";
    var limpiar33 =  document.getElementById("33");
    limpiar33.textContent="";
}
