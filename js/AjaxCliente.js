$(function() {
    let id = readCookie('id');
    let nombre = readCookie('nombre');
    let codigobanco = "";
    let codigohabitacion="";
    let precioHabitacion="";
    let fecha = "";
    let fechasalida = "";
    $('#BtnServicios').hide();

    
    changedRoom();
    loadReserver();
    roomLoad();
    cargarBancos();

    $('#User-name').html(nombre);
    $('#Habitacion2').hide();
    $('#Habitacion3').hide();
    $('#Reservaciones').hide();
    $('#Servicios').hide();
    $('#textoMatrimonial').hide();
    $('#textoSencilla').hide();
    $('#textoFamiliar').hide();
    $('#calendarioSencilla').hide();
    $('#calendarioMatrimonial').hide();
    $('#calendarioFamiliar').hide();
    
    $('#formulario2').hide();
    $('#formulario3').hide();



    $('#cerrar').on('click',function(){
        $('#formulario2').hide();
        $('#formulario3').hide();
        $('#formulario-reserva').trigger('reset');


    });

    $('#BtnHabitacionMatrimonial').on('click',function(){
        $('#Habitacion1').show();
        $('#Habitacion2').hide();
        $('#Habitacion3').hide();
        changedRoom();
    });
    $('#BtnHabitacionFamiliar').on('click',function(){
        $('#Habitacion1').hide();
        $('#Habitacion2').show();
        $('#Habitacion3').hide();
        changedRoom();
    });
    $('#BtnHabitacionSencilla').on('click',function(){
        $('#Habitacion1').hide();
        $('#Habitacion2').hide();
        $('#Habitacion3').show();
        changedRoom();
    });

    $('#BtnHabitaciones').on('click',function(){
        $('#Habitaciones').show();
        $('#Reservaciones').hide();
        $('#Servicios').hide();
        changedRoom();
    });
    $('#BtnReservaciones').on('click',function(){
        loadReserver();
        $('#Habitaciones').hide();
        $('#Reservaciones').show();
        $('#Servicios').hide();
    });
    $('#BtnServicios').on('click',function(){
        $('#Habitaciones').hide();
        $('#Reservaciones').hide();
        $('#Servicios').show();
    });

    $('#formulario-reserva').submit(function(e){
        e.preventDefault();
        fecha = $('#fecha1').val()
        fechasalida = $('#fecha2').val();
        reservar();
        $('#Habitaciones').hide();
        $('#Reservaciones').show();
        $('#Servicios').hide();
    });


    $(document).on('click','#reser',function(){
        roomLoad();
    });

    function roomLoad(){

            $.ajax({
                url: 'php/roomLoad.php',
                type: "GET",
                success: function (response) {
                    let task = JSON.parse(response);
                    let templates ="";
                    task.forEach(task =>{
    
                        if(task.id==1){
                                templates +=
                            `<tr>
                                <td >${task.nombre}</td>
                                <td>${task.precio}</td>
                                <td><input required  type="radio" codigoHabitacion="${task.id}" class="selectHabit" nombre="${task.nombre}" name="selectHabitacion" value="${task.precio}"></td>
                            </tr>`;
                            
                            
                        }
                        if(task.id==2){
                                templates +=
                                `<tr>
                                    <td >${task.nombre}</td>
                                    <td>${task.precio}</td>
                                    <td><input required type="radio" codigoHabitacion="${task.id}" class="selectHabit" nombre="${task.nombre}" name="selectHabitacion" value="${task.precio}"></td>
        
                                </tr>`;
                            
    
                        }
                        if(task.id==3){
                                templates +=
                                `<tr>
                                    <td >${task.nombre}</td>
                                    <td>${task.precio}</td>
                                    <td><input required type="radio" codigoHabitacion="${task.id}" class="selectHabit" nombre="${task.nombre}" name="selectHabitacion" value="${task.precio}"></td>
        
                                </tr>`;
                 
                        }
                    
                        
                    });
                    $('.rooms').html(templates);
               

                }

    });
    }

    function changedRoom(){
    
    $('.disponible').hide();
    $('.noDisponible').hide();

    $('#referencia').hide();
    
    $('#fechaMatrimonial').val("");
    $('#fechaFamiliar').val("");
    $('#fechaSencilla').val("");
    $('#NumeroReferenciaMatrimonial').val("");
    $('#NumeroReferenciaFamiliar').val("");
    $('#NumeroReferenciaSencilla').val("");

}

    function loadReserver(){

        $.post('./php/reserverLoad.php', {id},
            function (response) {
                let reservaciones = JSON.parse(response);
                let status1 = '';
                let status2 ='';
                let status3 = '';
                let status4 = '';
                reservaciones.forEach(reservaciones => {
                var status = reservaciones.status;
                if(status==1){
                //$('#BtnServicios').hide();
                //En espera
                    status1+=`
                    <tr codigo=${reservaciones.id}>
                        <td>${reservaciones.nombre}</td>
                        <td>${reservaciones.precio}</td>
                        <td>${reservaciones.fecha}</td>
                        <td>${reservaciones.fechafinal}</td>
                        <td>
                            <span>Por Confirmar</span>
                            <button class="btn btn-danger botonesInfo cancelar" ><strong>Cancelar</strong></button>
                        </td>
                    </tr>
                    `;
                }
                if(status==2){
                //$('#BtnServicios').hide();
                //confirmada
                status2+=`
                    <tr codigo=${reservaciones.id}>
                        <td>${reservaciones.nombre}</td>
                        <td>${reservaciones.precio}</td>
                        <td>${reservaciones.fecha}</td>
                        <td>${reservaciones.fechafinal}</td>
                        <td>                      
                            <button class="btn btn-success botonesInfo" ><strong>Confirmada</strong></button>
                        </td>
                    </tr>
                    `;
                }
                if(status==3)
                {
                //en proceso
                $('#BtnServicios').show();
                status3+=`
                    <tr codigo=${reservaciones.id}>
                        <td>${reservaciones.nombre}</td>
                        <td>${reservaciones.precio}</td>
                        <td>${reservaciones.fecha}</td>
                        <td>${reservaciones.fechafinal}</td>

                        <td>
                            <button class="btn btn-primary botonesInfo" ><strong>En Proceso</strong></button>
                        </td>
                    </tr>
                    `;
                }
                if(status==4){
                //$('#BtnServicios').hide();
                //finalizada
                status4+=`
                    <tr codigo=${reservaciones.id}>
                        <td>${reservaciones.nombre}</td>
                        <td>${reservaciones.precio}</td>
                        <td>${reservaciones.fecha}</td>
                        <td>${reservaciones.fechafinal}</td>
                        <td>
                            <button class="btn btn-light botonesInfo" ><strong>Procesada</strong></button>
                        </td>
                    </tr>
                    `;
                }

                let todas = status3+status1+status2+status4;

                $('#mostrarReservaciones').html(todas);

                
                });    
                }


            
        );
    }

    function cargarBancos(){
        var nula = "";
        $.post('./php/bancos.php', {nula},
            function(response){
                let bancos = JSON.parse(response);
                let tabla="";
                bancos.forEach(bancos => {
                    tabla += `
                    <tr>
                        <td>${bancos.nombre}</td>
                        <td>${bancos.nrocuenta}</td>
                        <td>${bancos.tipocuenta}</td>
                        <td><input required  type="radio" name="select" class="select" codigo="${bancos.codigo}"></td>

                    </tr>
                    `;
                });

                $('.banks').html(tabla);
            }
        );

    }

    function readCookie(name) {

        var nameEQ = name + "="; 
        var ca = document.cookie.split(';');
      
        for(var i=0;i < ca.length;i++) {
      
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) {
            return decodeURIComponent( c.substring(nameEQ.length,c.length) );
          }
      
        }
      
        return null;
      
      }
$(document).on('click','.cancelar', function (){

    let elemento = $(this)[0].parentElement.parentElement;
    let codigo = $(elemento).attr('codigo');
    if(confirm('Desea Cancelar esta Reservacion')){

        $.post('./php/admind-delet.php', {codigo},
            function (response) {
             alert(response);   
            }
        );
        roomLoad();
        loadReserver();
        }
 
    
});
    
$(document).on('click','.select',function(){
    codigobanco = $(this).attr('codigo');
    $('#referencia').show();
    console.log(codigobanco);
    $('#formulario3').show();

    });

$(document).on('click','.selectHabit',function () { 
    precioHabitacion = $(this).attr('value');
    codigohabitacion =$(this).attr('codigoHabitacion');
    let nombre = $(this).attr('nombre');

    if(nombre=='MATRIMONIAL'){
        $('#formulario2').show();

        $('#textoMatrimonial').show();
        $('#textoSencilla').hide();
        $('#textoFamiliar').hide();
        $('#fecha1').val("");
        $('#fecha2').val("");

    }
    if(nombre=='FAMILIAR'){
        $('#formulario2').show();
        $('#textoMatrimonial').hide();
        $('#textoSencilla').hide();
        $('#textoFamiliar').show();
        $('#fecha1').val("");
        $('#fecha2').val("");
    }
    if(nombre=='SENCILLA'){
        $('#formulario2').show();
        $('#textoMatrimonial').hide();
        $('#textoSencilla').show();
        $('#textoFamiliar').hide();

        $('#fecha1').val("");
        $('#fecha2').val("");

    }

    console.log(nombre);
    console.log(precioHabitacion);
 });

 function reservar(){
     let numeroReferencia= $('#numeroReferencia').val();

     let reservacion = {
         idcliente:id,
         idhabitacion:codigohabitacion,
         idbanco:codigobanco,
         fecha:fecha,
         fechasalida,fechasalida,
         precio:precioHabitacion,
         numeroReferencia:numeroReferencia

     }

     $.post('./php/reserver.php', reservacion,
         function (response) {
            console.log(response);
            window.alert('Se ha enviado su reservacion');
            $('#formulario-reserva').trigger('reset');
         });

         roomLoad();

 }

//logica de los Servicios
 function cargarServicios(){
    $.ajax({
        url: 'php/admind-loadServices.php',
        type: "GET",
        success: function (response) {
            let templates ="";
            let servicios = JSON.parse(response);

            servicios.forEach(servicios => {
                if(servicios.tipo=='1'){
                    templates += `
                    <tr>
                        <td>${servicios.nombre}</td>
                        <td>${servicios.descripcion}</td>
                        <td>Servicio de Limpieza </td>
                        <td>${servicios.precio}</td>
                        <td>
                            <ul style="list-style: none;margin-left: -10%">
                                <li><button codigo="${servicios.codigo}" class="btn btn-success solicitarServicio">Solicitar</button></li>
                            </ul>
                        </td>
                    </tr>
                `;
                }
                if(servicios.tipo =='2'){
                    templates += `
                    <tr>
                        <td>${servicios.nombre}</td>
                        <td>${servicios.descripcion}</td>
                        <td>Servicio de Comida </td>
                        <td>${servicios.precio}</td>
                        <td>
                            <ul style="list-style: none;margin-left: -10%">
                                <li><button codigo="${servicios.codigo}" class="btn btn-success solicitarServicio">Solicitar</button></li>
                            </ul>
                        </td>
                    </tr>
                    `;
                }
            });
            $('#listaServicios').html(templates);


        }
    });
}

$(document).on('click','.solicitarServicio',function(e){
    e.preventDefault();
    let codigo = $(this).attr('codigo');
    alert('estas solicitando un servicio');
    const postDate = {
        codigo:codigo,
        id:id
    };

    $.post('./php/solicitar-Servicio.php', postDate,
        function (response) {
            alert(response);
        }
    );



});

$(document).on('click','.cancelarServicio',function(e){
    if(confirm('Desea Cancelar El servicio')){
        let codigoServicio = $(this).attr('codigo');

        $.post('./php/eliminarServicio.php', {codigoServicio},
        function (response) {
            alert(response);
        }   );
    }
    
});

function ServiciosSolicitados(){

    $.post('./php/client-ServiciosSolicitados.php', {id},
        function (response) {
            console.log(response);

            let datos = JSON.parse(response);
            let templates="";
            datos.forEach(datos => {

                if(datos.status == '1'){
                    templates+=`
                <tr>
                    <td>${datos.nombre}</td>
                    <td>Pendiente por Confirmar</td>
                    <td> <button codigo="${datos.codigo}" class="btn btn-danger cancelarServicio">Cancelar</button></td>
                    
                </tr>
                `;

                }
                
                if(datos.status == '2'){
                    templates+=`
                <tr>
                    <td>${datos.nombre}</td>
                    <td>Confirmado, espere mientras se le entrega</td>
                    <td> <button codigo="${datos.codigo}" class="btn btn-success">En Proceso</button></td>
                    
                </tr>
                `;

                }
                
            });

            $('#serviciosSolicitados').html(templates);
            
        });

}

$(document).on('click','#fecha1',function(){
    var fechaActual = new Date();
    let dia = fechaActual.getDate();
    let mes = fechaActual.getMonth();
    mes+=1
    let anno = fechaActual.getFullYear();

    if(mes<10){
        mes = "0"+mes;
    }
  
    let fecha = anno+'-'+mes+'-'+dia;
    $('#fecha1').attr('min',fecha);

});



$(document).on('click','#fecha2',function(){
    var fechaActual = $('#fecha1').val();
    
    if(fechaActual==""){
        alert('Escoge una fecha de Inicio Valida');
    }
    $(this).attr('min',fechaActual);
});

    setInterval(ServiciosSolicitados,2000);
    setInterval(cargarServicios,5000);
    setInterval(loadReserver,2000);

});