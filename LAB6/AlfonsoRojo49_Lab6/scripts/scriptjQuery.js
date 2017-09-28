$(document).ready(function(){
    $("#agregarCarrito").on("click", validarNombreCliente);
    $("#agregarCarrito").on("click", validarTipoHamburguesa);
    $("#agregarCarrito").on("click", validarTipoPan);
    $("#agregarCarrito").on("click", validarAderezos);
    $("#agregarCarrito").on("click", validarCantidad);
    $("#agregarCarrito").on("click", mostrarOrden);
    $("#resetearOrden").on("click", limpiarOrden);
    menuFunctionality();
    
    $("#comentarComentario").on("click", validarCorreo);
    $("#comentarComentario").on("click", validarComentario);
    
    //Comentada para ser sustituida por la extraccion de comentarios de la base de datos
    // Función para cargar los correos y sus respectivos comentarios
    /*
    $.ajax({
        url : "data/comments.xml",
        type : "GET",
        dataType : "xml",
        success : function(xmlData){
            var listaRows = "";
            
            $(xmlData).find("comment").each(function(){
                var $actualElement = $(this);
                listaRows += "<tr>";
                    listaRows += "<td>" + $actualElement.find("name").text() + "</td>";
                    listaRows += "<td>" + $actualElement.find("text").text() + "</td>";
                listaRows += "</tr>";
            });
            
            $("#commentTable").append(listaRows);
        },
        error : function(errorMessage){
            
        }
    });
    */
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
    //           Función que carga los comentarios desde la base de datos               //
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
    
    $.ajax({
        url : "data/cargarComentarios.php",
        type : "GET",
        dataType : "json",
        success : function(jsonReceived){
            
            //alert("Los comentarios se han cargado para la página");
            
            $.each(jsonReceived, function(index){
                //$("#commentTable").append('<tr>');
                    $("#commentTable").append('<tr>' + '<td>' + jsonReceived[index].firstName + " " + jsonReceived[index].lastName + '</td>' + '<td>' + jsonReceived[index].comentario + '</td>'+ '</tr>');
                    //$("#commentTable").append('<td>' + jsonReceived[index].comentario + '</td>'+ '</tr>');
                //$("#commentTable").append('</tr>');
            });
            
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
    
    //Si ya hay una sesión iniciada publicar comentario, si no, hacer aparecer el inicio de sesión / registro de usuario
    $("#comentarComentario").on("click", function(){
        
        var jsonToSend = {
            "uCorreoComentario" : $("#correoComentario").val(),
            "uComentarioComentario" : $("#comentarioComentario").val()
        };
            
        $.ajax({
            url : "data/verificarSesionEnComentarios.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            success : function(jsonReceived){
                
                agregarComentarioConSesionIniciada();
                
                //alert("BIEN");
                
                //alert("Correo: " + jsonReceived.correo);
                //alert("Comentario : " + jsonReceived.comentario);
                
                //alert("Usuario: " + jsonReceived.usuario);
                
                //alert("Usuario: " + jsonReceived.usuario);
                //alert("Correo: " + jsonReceived.correo);
                //alert("Comentario: " + jsonReceived.comentario);
            },
            error : function(errorMessage){
                alert("No haz iniciado sesión.");
                muestraOval();
            }
        });
    });
    
    // Si no funciona la función de arriba volver a activar la de abajo \|/
    
    //Función para mostrar el oval
    //$("#comentarComentario").on("click", muestraOval);
    
    //Comentada para ser sustituida por la extraccion de chefs de la base de datos
    //Función para cargar los datos de los chefs y mostrarlos
    /*
    $.getJSON("data/mr_burger_chefs.json", function(data){
        var chefsData = "";
       
        $.each(data.contactos, function(key, value){
            chefsData += "<tr>";
                chefsData += "<td>" + value.nombre + "</td>";
                chefsData += "<td>" + value.apellidos + "</td>";
                chefsData += "<td>" + value.edad + "</td>";
                chefsData += "<td>" + value.tipo + "</td>";
                //chefsData += "<td>" + value.especialidades + "</td>";
               
                $.each(value.especialidades, function(key2, value2){
                    chefsData += "<td>" + value2.especialidad + " " + value2.clave + "</td>";  
                });    
           
            chefsData += "</tr>";
        });
        $("#chefsTable").find("tbody").append(chefsData);
    });
    */
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
    //           Función que carga los chefs desde la base de datos                     //
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^//
    
    $.ajax({
        url : "data/cargarChefs.php",
        type : "GET",
        dataType : "json",
        success : function(jsonReceived){
            //alert("Los chefs se han cargado en la página");  
            
            $.each(jsonReceived, function(index){
                
                //alert(index.valueOf() + " " + (index.valueOf() + 1));
                //alert(jsonReceived[index+1].nombre);
                if((index.valueOf() + 1) == 10){
                    $("#chefsTable").append(
                        '<tr>' +
                        '<td>' + jsonReceived[index].nombre + '</td>' +
                        '<td>' + jsonReceived[index].apellidos + '</td>' +
                        '<td>' + jsonReceived[index].edad + '</td>' +
                        '<td>' + jsonReceived[index].tipo + '</td>' +
                        '<td>' + jsonReceived[index].clave + " " + jsonReceived[index].especialidad + '</td>' +
                        '</tr>'
                    );     
                }
                
                if(jsonReceived[index].nombre == jsonReceived[index+1].nombre)
                {
                    $("#chefsTable").append(
                        '<tr>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + '</td>' +
                        '<td>' + jsonReceived[index].clave + " " + jsonReceived[index].especialidad + '</td>' +
                        '</tr>'
                    );         
                }else{
                    $("#chefsTable").append(
                        '<tr>' +
                        '<td>' + jsonReceived[index].nombre + '</td>' +
                        '<td>' + jsonReceived[index].apellidos + '</td>' +
                        '<td>' + jsonReceived[index].edad + '</td>' +
                        '<td>' + jsonReceived[index].tipo + '</td>' +
                        '<td>' + jsonReceived[index].clave + " " + jsonReceived[index].especialidad + '</td>' +
                        '</tr>'
                    );     
                }

            });
        },
        error : function(errorMessage){
            alert(errorMessage.responseText);
        }
    });
    
    $("#registrarUsuario").on("click", validarNombreRegistro);
    $("#registrarUsuario").on("click", validarApellidosRegistro);
    $("#registrarUsuario").on("click", validarNombreUsuarioRegistro);
    $("#registrarUsuario").on("click", validarContrasena1);
    $("#registrarUsuario").on("click", validarContrasena2);
    $("#registrarUsuario").on("click", validarContrasena3);
    
    $("#iniciarSesion").on("click", validarUsuario);
    $("#iniciarSesion").on("click", validarContrasena);
    
    // Función para registrar un nuevo usuario
    $("#registrarUsuario").on("click", function(){
        var jsonToSend = {
            "uNombreRegistro" : $("#nombreRegistro").val(),
            "uApellidosRegistro" : $("#apellidosRegistro").val(),
            "uNombreUsuarioRegistro" : $("#nombreUsuarioRegistro").val(),
            "uContrasenaRegistro" : $("#contrasenaRegistro").val()
        };
        
        $.ajax({
            url : "data/registrationService.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                alert("Tu usuario ha sido registrado exitosamente");
                window.location.replace("index.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });
    
    // Función para iniciar sesión
    $("#iniciarSesion").on("click", function(){
        
        var rememberMe = $("#recordarCredenciales").is(":checked");
        
        var jsonToSend = {
            "uUsuarioIngreso" : $("#usuarioIngreso").val(),
            "uContrasenaIngreso" : $("#contrasenaIngreso").val(),
            "remember" : rememberMe
        };
        
        $.ajax({
           url : "data/loginService.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                alert("Bienvenido de vuelta " + jsonReceived.firstName + " " + jsonReceived.lastName);
                window.location.replace("index.html");
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
                alert("NO");
            }
        });
    });
    
    // Función para iniciar sesión en los comentarios
    $("#iniciarSesionComentarios").on("click", function(){
        
        var rememberMe = $("#recordarCredencialesComentarios").is(":checked");
        
        var jsonToSend = {
            "uUsuarioComentarios" : $("#usuarioComentarios").val(),
            "uContrasenaComentarios" : $("#contrasenaComentarios").val(),
            "remember" : rememberMe,
            //Comentario a registrar en la base de datos
            "uCorreo" : $("#correoComentario").val(),
            "uComentario" : $("#comentarioComentario").val()
        };
        
        $.ajax({
           url : "data/loginServiceComentarios.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                alert("Bienvenido de vuelta " + jsonReceived.firstName + " " + jsonReceived.lastName);
                
                //Ocultar y mostrar secciones correspondientes
                $("#loginEnComentarios").addClass("hiddenSection");
                $("#formaComentario").removeClass("hiddenSection");
                
                /*
                // Función para agregar un comentario
                $("#comentarComentario").on("click", agregarComentario);
                */
                
                agregarComentario();
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });
    
    $("#registrarseEnComentarios").on("click", mostrarRegistro);
    
    // Función para registrar usuario en la parte de comentarios
    $("#registrarUsuarioEnComentarios").on("click", function(){
         var jsonToSend = {
             "uNombreRegistroComentarios" : $("#nombreRegistroComentarios").val(),
             "uApellidosRegistroComentarios" : $("#apellidosRegistroComentarios").val(),
             "uNombreUsuarioRegistroComentarios" : $("#nombreUsuarioRegistroComentarios").val(),
             "uContrasenaRegistroComentarios" : $("#contrasenaRegistroComentarios").val(),
             
             //Correo y comentario
             "uCorreo" : $("#correoComentario").val(),
             "uComentario" : $("#comentarioComentario").val()
         };
        
        $.ajax({
            url : "data/registrationServiceComentarios.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                alert("Tu usuario ha sido registrado");
                //Comprobación para saber que el nombre de usuario se está pasando
                //alert("Usuario registrado: " + $("#nombreUsuarioRegistroComentarios").val());
                $("#registroEnComentarios").addClass("hiddenSection");
                $("#formaComentario").removeClass("hiddenSection");
                agregarComentario();
            },
            error : function(errorMessage){
                alert(errorMessage.responseText);
            }
        });
    });
    
    $("#volverFormaComentarios").on("click", volverComentarios);
    
    // Acción para cargar las cookies previamente guardadas
    $.ajax({
       url : "data/cookieService.php",
        type : "GET",
        dataType : "json",
        success : function(cookieJson){
            $("#usuarioIngreso").val(cookieJson.username);
            $("#usuarioComentarios").val(cookieJson.username);
            $("#contrasenaIngreso").val(cookieJson.passwrd);
            $("#contrasenaComentarios").val(cookieJson.passwrd);
        },
        error : function(errorMessage){
            console.log(errorMessage.responseText);
        }
    });
    
    // Función para volver del registro en comentarios a el inicio de sesion en comentarios
    $("#volverDeRegistroAmenuPrincipal").on("click", volverInicioSesion);
    
    // Función para cerrar la sesión
    $("#cerrarSesion").on("click", function(){
       $.ajax({
            url : "data/cookieDelete.php",
            type : "GET",
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                alert("Tus credenciales se han eliminado");
                window.location.replace("index.html");
            },
            error : function(errorMessage){
                
            }
       });
    });
    
    
    //Función para cargar el nombre en la cajita de orden si es que hay una sesióna activa
    $.ajax({
        url : "data/checarCargarNombre.php",
        type : "GET",
        dataType : "json",
        contentType : "application/x-www-form-urlencoded",
        success : function(jsonReceived){
            //alert(jsonReceived);
            //alert(jsonReceived);
            //alert("SI");
            
            var prueba1;
            var prueba2;
            
            $.each(jsonReceived, function(index){
                prueba1 = jsonReceived[index].firstName;
                prueba2 = jsonReceived[index].lastName;
            });
            
            //alert(prueba1);
            
            var prueba3 = " ";
            
            prueba2 = prueba3.concat(prueba2);
            
            //alert(prueba2);
            
            var nombreCompleto  = prueba1.concat(prueba2);
            //alert(nombreCompleto);
            
            $("#nombreCliente").val(nombreCompleto);
        },
        error : function(errorMessage){
            //alert("NO");
        }
    });
    
    $("#cancelarOrdenTabla").on("click", function(){
        $("#resumenOrden").addClass("hiddenElement");
        $("#loginPedido").addClass("hiddenElement");
    });
    
    $("#agregarOrdenTabla").on("click", function(){
        var nombre = ($("#nombreOrden").text().replace('Nombre: ', ''));
        var tipoHamburguesa = ($("#tipoOrden").text().replace('Tipo de hamburguesa: ', ''));
        var tipoPan = ($("#panOrden").text().replace('Tipo de pan: ', ''));
        var aderezos = ($("#aderezosOrden").text().replace('Aderezos: ', ''));
        var cantidad = ($("#cantidadOrden").text().replace('Cantidad de hamburguesas: ', ''));
        
        //alert(nombre);
        //alert(tipoHamburguesa);
        //alert(tipoPan);
        //alert(aderezos);
        //alert(cantidad);
        
        var jsonToSend = {
            "nombre" : nombre,
            "tipoHamburguesa" : tipoHamburguesa,
            "tipoPan" : tipoPan,
            "aderezos" : aderezos,
            "cantidad" : cantidad
        };
        
        //alert(jsonToSend.nombre);
        //alert(jsonToSend.tipoHamburguesa);
        //alert(jsonToSend.tipoPan);
        //alert(jsonToSend.aderezos);
        //alert(jsonToSend.cantidad);
        
        $.ajax({
            url : "data/crearPedido.php",
            type : "POST",
            data : jsonToSend,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success : function(jsonReceived){
                alert("Se ha creado el pedido");
                window.location.replace("index.html");
            },
            error : function(errorMessage){
                $("#loginPedido").removeClass("hiddenSection");
            }
        });
        
        $("#iniciarSesionPedido").on("click", validarUsuarioPedido);
        $("#iniciarSesionPedido").on("click", validarContrasenaPedido);
        
        $("#iniciarSesionPedido").on("click", function(){
        
            var rememberMe = $("#recordarCredencialesPedido").is(":checked");

            var jsonToSend = {
                "uUsuarioIngreso" : $("#usuarioIngresoPedido").val(),
                "uContrasenaIngreso" : $("#contrasenaIngresoPedido").val(),
                "remember" : rememberMe
            };

            $.ajax({
               url : "data/loginServicePedido.php",
                type : "POST",
                data : jsonToSend,
                dataType : "json",
                contentType : "application/x-www-form-urlencoded",
                success : function(jsonReceived){
                    alert("Bienvenido de vuelta " + jsonReceived.firstName + " " + jsonReceived.lastName);
                    $.ajax({
                        url : "data/crearPedido.php",
                        type : "POST",
                        data : jsonToSend,
                        dataType : "json",
                        contentType : "application/x-www-form-urlencoded",
                        success : function(jsonReceived){
                            alert("Se ha creado el pedido");
                            window.location.replace("index.html");
                        },
                        error : function(errorMessage){
                            alert("No se ha podido iniciar sesión, serás redirigido al inicio del sitio");
                            window.location.replace("index.html");
                        }
                    });
                },
                error : function(errorMessage){
                    alert(errorMessage.responseText);
                    alert("NO");
                }
            });
        });
        
    });
    
    $.ajax({
        url : "data/cargarPedidos.php",
        type : "GET",
        dataType : "json",
        success : function(jsonReceived){
            //alert(jsonReceived.length);
            $.each(jsonReceived, function(index){    
                $("#pedidosTable").append(
                    '<tr>' +
                    '<td>' + jsonReceived[index].numero + '</td>' +
                    '<td>' + jsonReceived[index].tipoHamburguesa + '</td>' +
                    '<td>' + jsonReceived[index].tipoPan + '</td>' +
                    '<td>' + jsonReceived[index].aderezos + '</td>' +
                    '<td>' + jsonReceived[index].cantidad + '</td>' +
                    '<td>' + jsonReceived[index].estado + '</td>'
                    + '</tr>'
                );  

            });
            
        },
        error : function(errorMessage){
            alert("NO");
        }
    });
});

function validarNombreCliente(){
    var boolCliente;
    
    if($("#nombreCliente").val() == ""){
        $("#clientNameErrorMessage").removeClass("hiddenElement");
        boolCliente = false;
    }else{
        $("#clientNameErrorMessage").addClass("hiddenElement");
        boolCliente = true;
    }
    
    return boolCliente;
}

function validarTipoHamburguesa(){
    var boolTipo;
    
    if($("#tipoHamburguesa").val() == 0){
        $("#typeErrorMessage").removeClass("hiddenElement");
        boolTipo = false;
        
    }else{
        $("#typeErrorMessage").addClass("hiddenElement");
        boolTipo = true;
    }
    
    return boolTipo;
}

function validarTipoPan(){
    var boolPan;
    
    if($("#tipoPan").val() == 0){
        $("#breadErrorMessage").removeClass("hiddenElement");
        boolPan = false;
    }else{
        $("#breadErrorMessage").addClass("hiddenElement");
        boolPan = true;
    }
    
    return boolPan;
}

function validarAderezos(){
    var boolAderezos;
    
    if(!$("#aderezos_si").is(':checked') && !$("#aderezos_no").is(':checked')){
        $("#aderezosErrorMessage").removeClass("hiddenElement");
        boolAderezos = false;
    }else{
        $("#aderezosErrorMessage").addClass("hiddenElement");
        boolAderezos = true;
    }
    
    return boolAderezos;
}

function validarCantidad(){
    var boolCantidad;
    
    if($("#cantidadHamburguesas").val() == ""){
        $("#quantityErrorMessage").removeClass("hiddenElement");
        boolCantidad = false;
    }else{
        $("#quantityErrorMessage").addClass("hiddenElement");
        boolCantidad = true;
    }
    
    return boolCantidad;
}

function mostrarOrden(){
    var nombre = validarNombreCliente();
    var tipo = validarTipoHamburguesa();
    var pan = validarTipoPan();
    var aderezos = validarAderezos();
    var cantidad = validarCantidad();
    if(nombre == true && tipo == true && pan == true && aderezos == true && cantidad == true){
        // Ocultar el anuncio de que la orden no está completa
        $("#ordenNoCompleta").addClass("hiddenElement");
        
        // Mostrar el span del resumen de la orden
        $("#resumenOrden").removeClass("hiddenElement");
        
        // Mostrar el nombre del cliente
        $("#nombreOrden").html("Nombre: " + $("#nombreCliente").val());
        
        // Mostrar el tipo de hamburguesa
        var tipoH = $('#tipoHamburguesa').find(":selected").text();
        $("#tipoOrden").html("Tipo de hamburguesa: " + tipoH);
        
        // Mostrar el tipo de pan
        var panH = $('#tipoPan').find(":selected").text();
        $("#panOrden").html("Tipo de pan: " + panH);
        
        // Mostrar si se desean aderezos
        if($("#aderezos_si").is(':checked')){
            $("#aderezosOrden").html("Aderezos: Sí");
        }else if($("#aderezos_no").is(':checked')){
            $("#aderezosOrden").html("Aderezos: No");
        }
        
        // Mostrar complementos opcionales
        $("#complementosOrden").html("Complementos:");
        
        if($("#c1-1").is(":checked")){
            $("#11").html("Tomate");
        }else{
            $("#11").html("");
        }
        
        if($("#c1-2").is(":checked")){
            $("#12").html("Lechuga");
        }else{
            $("#12").html("");
        }
        
        if($("#c1-3").is(":checked")){
            $("#13").html("Cebolla");
        }else{
            $("#13").html("");
        }
        
        if($("#c1-4").is(":checked")){
            $("#14").html("Pepinillos");
        }else{
            $("#14").html("");
        }
        
        if($("#c1-5").is(":checked")){
            $("#15").html("Aguacate");
        }else{
            $("#15").html("");
        }
        
        if($("#c1-6").is(":checked")){
            $("#16").html("Repollo");
        }else{
            $("#16").html("");
        }
        
        if($("#c1-7").is(":checked")){
            $("#17").html("Pimiento");
        }else{
            $("#17").html("");
        }
        
        if($("#c1-8").is(":checked")){
            $("#18").html("Jalapeño");
        }else{
            $("#18").html("");
        }
        
        if($("#c1-9").is(":checked")){
            $("#19").html("Champiñones");
        }else{
            $("#19").html("");
        }
        
        if($("#c1-10").is(":checked")){
            $("#110").html("Tocino");
        }else{
            $("#110").html("");
        }
        
        if($("#c1-11").is(":checked")){
            $("#111").html("Queso Extra");
        }else{
            $("#111").html("");
        }
        
        if($("#c1-12").is(":checked")){
            $("#112").html("Cebolla a la parrilla");
        }else{
            $("#112").html("");
        }
        
        if($("#c1-13").is(":checked")){
            $("#113").html("Pimiento a la parrilla");
        }else{
            $("#113").html("");
        }
        
        if($("#c1-14").is(":checked")){
            $("#114").html("Aceite de oliva");
        }else{
            $("#114").html("");
        }
        
        //Mostrar salsas opcionales
        $("#salsasOrden").html("Salsas:");
        
        if($("#c2-1").is(":checked")){
            $("#21").html("Salsa Mr. Burger");
        }else{
            $("#21").html("");
        }
        
        if($("#c2-2").is(":checked")){
            $("#22").html("Salsa al Bistec");
        }else{
            $("#22").html("");
        }
        
        if($("#c2-3").is(":checked")){
            $("#23").html("Salsa Barbeque");
        }else{
            $("#23").html("");
        }
        
        if($("#c2-4").is(":checked")){
            $("#24").html("Salsa Picante");
        }else{
            $("#24").html("");
        }
        
        if($("#c2-5").is(":checked")){
            $("#25").html("Honey Mustard");
        }else{
            $("#25").html("");
        }
        
        if($("#c2-6").is(":checked")){
            $("#26").html("Ranch");
        }else{
            $("#26").html("");
        }
        
        if($("#c2-7").is(":checked")){
            $("#27").html("Salsa Chipotle");
        }else{
            $("#27").html("");
        }
        
        if($("#c2-8").is(":checked")){
            $("#28").html("Aceite de Oliva");
        }else{
            $("#28").html("");
        }
        
        // Mostrar Adicionales
        $("#adicionalesOrden").html("Adicionales:");
        
        if($("#c3-1").is(":checked")){
            $("#31").html("Ensalada");
        }else{
            $("#31").html("");
        }
        
        if($("#c3-2").is(":checked")){
            $("#32").html("Papas a la francesa");
        }else{
            $("#32").html("");
        }
        
        if($("#c3-3").is(":checked")){
            $("#33").html("Papas Cris-Cut");
        }else{
            $("#33").html("");
        }
        
        //Mostrar la cantidad de hamburguesas
        $("#cantidadOrden").html("Cantidad de hamburguesas: " + $("#cantidadHamburguesas").val());
        
    }else{
        // Remover el anuncio de que la orden no está completa
        $("#ordenNoCompleta").removeClass("hiddenElement");
    }
}

function limpiarOrden(){
    $("#nombreCliente").val("");
    $("#tipoHamburguesa").val(0);
    $("#tipoPan").val(0);
    $("#aderezos_si").prop('checked', false);
    $("#aderezos_no").prop('checked', false);
    
    $("#c1-1").prop('checked', false);
    $("#c1-2").prop('checked', false);
    $("#c1-3").prop('checked', false);
    $("#c1-4").prop('checked', false);
    $("#c1-5").prop('checked', false);
    $("#c1-6").prop('checked', false);
    $("#c1-7").prop('checked', false);
    $("#c1-8").prop('checked', false);
    $("#c1-9").prop('checked', false);
    $("#c1-10").prop('checked', false);
    $("#c1-11").prop('checked', false);
    $("#c1-12").prop('checked', false);
    $("#c1-13").prop('checked', false);
    $("#c1-14").prop('checked', false);
    
    $("#c2-1").prop('checked', false);
    $("#c2-2").prop('checked', false);
    $("#c2-3").prop('checked', false);
    $("#c2-4").prop('checked', false);
    $("#c2-5").prop('checked', false);
    $("#c2-6").prop('checked', false);
    $("#c2-7").prop('checked', false);
    $("#c2-8").prop('checked', false);
    
    $("#c3-1").prop('checked', false);
    $("#c3-2").prop('checked', false);
    $("#c3-3").prop('checked', false);
    
    $("#cantidadHamburguesas").val("");
    
    $("#resumenOrden").addClass("hiddenElement");
    
    $("#clientNameErrorMessage").addClass("hiddenElement");
    $("#typeErrorMessage").addClass("hiddenElement");
    $("#breadErrorMessage").addClass("hiddenElement");
    $("#aderezosErrorMessage").addClass("hiddenElement");
    $("#quantityErrorMessage").addClass("hiddenElement");
    $("#ordenNoCompleta").addClass("hiddenElement");
    
    $("#11").html("");
    $("#12").html("");
    $("#13").html("");
    $("#14").html("");
    $("#15").html("");
    $("#16").html("");
    $("#17").html("");
    $("#18").html("");
    $("#19").html("");
    $("#110").html("");
    $("#111").html("");
    $("#112").html("");
    $("#113").html("");
    $("#114").html("");
    
    $("#21").html("");
    $("#22").html("");
    $("#23").html("");
    $("#24").html("");
    $("#25").html("");
    $("#26").html("");
    $("#27").html("");
    $("#28").html("");
    
    $("#31").html("");
    $("#32").html("");
    $("#33").html("");
}

function menuFunctionality(){
    $("#menu > li").on("click", function(){
        $(".selected").removeClass("selected");
        
        var $currentSelection = $(".currentSelection");
        $currentSelection.removeClass("currentSelection");
        $currentSelection.addClass("hiddenSection");
        
        var currentSection = $(this).attr("class");
        
        $("#" + currentSection).addClass("currentSelection")
                               .removeClass("hiddenSection");
        
        $(this).addClass("selected");
    });
}

function validarCorreo(){
    var boolCorreo;
    
    if($("#correoComentario").val() == ""){
        $("#correoErrorMessage").removeClass("hiddenElement");
        boolCorreo = false;
    }else
    {
        $("#correoErrorMessage").addClass("hiddenElement");
        boolCorreo = true;
    }
    
    return boolCorreo;
}

function validarComentario(){
    var boolComentario;
    
    if ($.trim($('#comentarioComentario').val()).length < 1) {
        $("#comentarioErrorMessage").removeClass("hiddenElement");
        boolComentario = false;
    }else{
        $("#comentarioErrorMessage").addClass("hiddenElement");
        boolComentario = true;
    }
    
    return boolComentario;
}

function agregarComentario(){
    /*
        $("#correoComentario");
        $("#comentarioComentario");
    */
    /*
    $("#commentTable").append("<tr>");
        $("#commentTable").append("<td>" + $("#correoComentario").val() + "</td>");
        $("#commentTable").append("<td>" + $("#comentarioComentario").val() + "</td>");
    $("#commentTable").append("</tr>");
    */
    
    //$("#correoErrorMessage").addClass("hiddenElement");
    //$("#comentarioErrorMessage").addClass("hiddenElement");
    
    correo = validarCorreo();
    comentario = validarComentario();
    
    if(correo == true && comentario == true){
        $("#commentTable").find("tbody").append([
            "<tr>",
                "<td>" + $("#correoComentario").val() + "</td>",
                "<td>" + $("#comentarioComentario").val() + "</td>",
            "</tr>"
        ].join());
    }
}

function validarNombreRegistro(){
    var booleano;
    
    if($("#nombreRegistro").val() == ""){
        $("#nombreRegistroErrorMessage").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#nombreRegistroErrorMessage").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarApellidosRegistro(){
    var booleano;
    
    if($("#apellidosRegistro").val() == ""){
        $("#apellidosRegistroErrorMessage").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#apellidosRegistroErrorMessage").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarNombreUsuarioRegistro(){
    var booleano;
    
    if($("#nombreUsuarioRegistro").val() == ""){
        $("#nombreUsuarioRegistroErrorMessage").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#nombreUsuarioRegistroErrorMessage").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarContrasena1(){
    var booleano;
    
    if($("#contrasenaRegistro").val() == ""){
        $("#constrasenaRegistroErrorMessage").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#constrasenaRegistroErrorMessage").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarContrasena2(){
    var booleano;
    
    if($("#contrasenaConfirmacionRegistro").val() == ""){
        $("#contrasenaConfirmacionRegistroErrorMessage").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#contrasenaConfirmacionRegistroErrorMessage").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarContrasena3(){
    var booleano;
    
    if($("#contrasenaRegistro").val() == $("#contrasenaConfirmacionRegistro").val()){
        $("#contrasenaRepetida1").addClass("hiddenElement");
        $("#contrasenaRepetida2").addClass("hiddenElement");
        booleano = true;
    }else{
        $("#contrasenaRepetida1").removeClass("hiddenElement");
        $("#contrasenaRepetida2").removeClass("hiddenElement");
        booleano = false;   
    }
    
    return booleano;
}

function validarUsuario(){
    var booleano;
    
    if($("#usuarioIngreso").val() == ""){
        $("#usuarioIngresoErrorMessage").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#usuarioIngresoErrorMessage").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarUsuarioPedido(){
    var booleano;
    
    if($("#usuarioIngresoPedido").val() == ""){
        $("#usuarioIngresoErrorMessagePedido").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#usuarioIngresoErrorMessagePedido").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarContrasena(){
    var booleano;
    
    if($("#contrasenaIngreso").val() == ""){
        $("#contrasenaIngresoErrorMessage").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#contrasenaIngresoErrorMessage").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function validarContrasenaPedido(){
    var booleano;
    
    if($("#contrasenaIngresoPedido").val() == ""){
        $("#contrasenaIngresoErrorMessagePedido").removeClass("hiddenElement");
        booleano = false;
    }else{
        $("#contrasenaIngresoErrorMessagePedido").addClass("hiddenElement");
        booleano = true;
    }
    
    return booleano;
}

function muestraOval(){
    $("#loginEnComentarios").removeClass("hiddenSection");
    $("#formaComentario").addClass("hiddenSection");
}

function mostrarRegistro(){
    $("#registroEnComentarios").removeClass("hiddenSection");
    $("#loginEnComentarios").addClass("hiddenSection");
}

function volverComentarios(){
    $("#formaComentario").removeClass("hiddenSection");
    $("#loginEnComentarios").addClass("hiddenSection");
    $("#registroEnComentarios").addClass("hiddenSection");
}

function volverInicioSesion(){
    $("#loginEnComentarios").removeClass("hiddenSection");
    $("#registroEnComentarios").addClass("hiddenSection");
}

function agregarComentarioConSesionIniciada(){
    correo = validarCorreo();
    comentario = validarComentario();
    
    if(correo == true && comentario == true){
        $("#commentTable").find("tbody").append([
            "<tr>",
                "<td>" + $("#correoComentario").val() + "</td>",
                "<td>" + $("#comentarioComentario").val() + "</td>",
            "</tr>"
        ].join());
    }
}

function cargarInicio(){
    alert("HOLA");
}