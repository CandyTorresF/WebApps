$(document).ready(function(){
	// Acción para el botón de logout
	$("#logoutButton").on("click", function(){
		$.ajax({
			url : "data/deleteSession.php",
			type : "GET",
			dataType : "json",
			success : function(sessionJson){
				window.location.replace("index.html");
			},
			error : function(errorMessage){
				window.location.replace("index.html");
			}
		});
	});

	// Acción para verificar que la sesión sigue activa
	$.ajax({
		url : "data/sessionService.php",
		type : "GET",
		dataType : "json",
		success : function(sessionJson){
			$("h2").text(sessionJson.fName + " " + sessionJson.lName);
		},
		error : function(errorMessage){
			alert(errorMessage.responseText);
			window.location.replace("index.html");
		}
	});
});