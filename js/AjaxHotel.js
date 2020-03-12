$(function(){
    
    console.log('jquery is working');

    $('#formulario-registro').submit(function(e){
        e.preventDefault();
        let url = './php/register-users.php';
        const postDate = {
            name:$('#register-name').val(),
            apel:$('#register-apel').val(),
            pass:$('#register-pass').val(),
            email:$('#register-email').val(),
            phone:$('#register-phone').val(),
            cedula:$('#register-ced').val()
        };

        $.post(url,postDate,function(response){
            let datos = JSON.parse(response);
            var validar = datos.validar;

            if(validar == 'true'){
                window.alert('Registro Exitoso');

                
                document.cookie = sendCookies('id' , datos.id);
                document.cookie = sendCookies('nombre', datos.name);

                window.location.href += "cliente.html";

            }
            $('#formulario-registro').trigger('reset');
            
        });

    });

    $('#formulario-acceso').submit(function(e){
        e.preventDefault();
        let url = './php/login-users.php';
        const postDate = {
            password:$('#password').val(),
            email:$('#email').val()
        };

        $.post(url,postDate,function(response){
            
            let datos = JSON.parse(response);

            if(datos.validar == "true"){
                document.cookie = sendCookies('id',datos.id);
                document.cookie = sendCookies('nombre',datos.nombre);
                window.location.href += `cliente.html`;
            
            }
            else{
                alert('Datos incorrectos');
            }

            $('#formulario-registro').trigger('reset');
            
        });

   });



////////////////////////////////////////Cliente//////////////////////////////////////////////////////////////

function sendCookies(name,cookie){
    var coo = cookie;
    var name = name;
    var encode = name + "="+encodeURIComponent(coo)+";path=/";
    return encode;
}



});
