$(document).ready(function(){
	// Acción del registro
	$("#registerButton").on("click", function(){
        var jsonObject = {
            "username" : $("#username").val(),
            "userPassword" : $("#userPassword").val(),
            "userFirstName" : $("#firstName").val(),
            "userLastName" : $("#lastName").val()
        };

        $.ajax({
            type: "POST",
            url: "data/registrationService.php",
            data : jsonObject,
            dataType : "json",
            contentType : "application/x-www-form-urlencoded",
            success: function(jsonData) {
                window.location.replace("home.html");  
               
            },
            error: function(errorMsg){
                alert(errorMsg.statusText);
            }
        });
   });

	// Acción para el botón de cancel
   	$("#cancelButton").on("click", function(){
        window.location.replace("index.html");
   	});
});


