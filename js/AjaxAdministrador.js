$(function(){
        
    let validar = false;
    let validarServicio = false;
    let tipo;
    let codigoServicio;
    let codigoHabitacion;
    let fechaConsulta1;
    let fechaConsulta2;
    

    $('#contenedorReservaciones').show();
    $('#GestionClientes').hide();
    $('#GestionHabitaciones').hide();
    $('#GestionServicios').hide();
    $('#GestionReportes').hide();
    $('#cardHabitacion').hide();
    $('#btnReporte').hide();


    cargarServicios();
    cargarReservaciones();
    cargarHabitaciones();


    
    $(document).on('click','#btnReservaciones',function(){
        $('#contenedorReservaciones').show();
        $('#GestionClientes').hide();
        $('#GestionHabitaciones').hide();
        $('#GestionServicios').hide();
        $('#GestionReportes').hide();


    });
    
    $(document).on('click','#btnClientes',function(){
        $('#contenedorReservaciones').hide();
        $('#GestionClientes').show();
        $('#GestionHabitaciones').hide();
        $('#GestionServicios').hide();
        $('#GestionReportes').hide();


    });
    
    $(document).on('click','#btnHabitaciones',function(){
        
        $('#contenedorReservaciones').hide();
        $('#GestionClientes').hide();
        $('#GestionHabitaciones').show();
        $('#GestionServicios').hide();
        $('#GestionReportes').hide();


    });
    
    $(document).on('click','#btnReporte',function(){
        $('#contenedorReservaciones').hide();
        $('#GestionClientes').hide();
        $('#GestionHabitaciones').hide();
        $('#GestionServicios').hide();
        $('#GestionReportes').show();


    });
    $(document).on('click','#btnServicios',function(){
        $('#contenedorReservaciones').hide();
        $('#GestionClientes').hide();
        $('#GestionHabitaciones').hide();
        $('#GestionServicios').show();
        $('#GestionReportes').hide();

    });


    //Logica de los Servicios
    $(document).on('click','.tipo', function () {
        tipo = $(this).attr('codigo');
    });
    $(document).on('click','.eliminarServicio',function(){
        let codigo = $(this).attr('codigo');
        if(confirm('Desea Eliminar el Servicio')){
            $.post('./php/admind-deleteService.php', {codigo},
                function (response) {
                    window.alert(response);
                }
            );
        }
    });

    $(document).on('click','.modificarServicio',function(){
        $('.radio').hide();
        $('#btn-registrarServicio').html('Modificar');
        $('#radio1').removeAttr('required');
        $('#radio2').removeAttr('required');
        validarServicio = true;
        codigoServicio = $(this).attr('codigo');
        codigo = codigoServicio;
        $.post('./php/admind-getService.php', {codigo},
            function (response) {
                let dato = JSON.parse(response);
                $('#nombreServicio').val(dato.nombre);
                $('#descripcionServicio').val(dato.descripcion);
                $('#precioServicio').val(dato.precio);

                
            }
        );
    });
    


    $('#service-form').submit(function(f){

        f.preventDefault();
        if(validarServicio === true){
            /*pendiente por corregir
            $('#radio1').attr('required');
            $('#radio2').attr('required');
            alert('listo');
            */
        } 
        const postDate = {
            codigo:codigoServicio,
            nombre:$('#nombreServicio').val(),
            descripcion:$('#descripcionServicio').val(),
            tipo:tipo,
            precio:$('#precioServicio').val(),
            
        };
        let url = validarServicio === false ? './php/admind-Services.php' : './php/admind-modifiqueService.php';

        $.post(url,postDate,
            function (response) {
                alert(response);
            });
  
        validarServicio = false;
        $('#btn-registrarServicio').html("Registrar Servicio");
        $('.radio').show();
        $('#service-form').trigger('reset');

    
        cargarServicios();
    });



    $(document).on('click','.elimininarServicioSolicitado',function(){
        let codigoServicio = $(this).attr('codigo');

        $.post('./php/eliminarServicio.php', {codigoServicio},
            function (response) {
                alert(response);
            }
        );
    });

    $(document).on('click','.confirmarServicioSolicitado',function(){
        let codigoServicio = $(this).attr('codigo');

        $.post('./php/admind-confirmarServicioSolicitado.php', {codigoServicio},
            function (response) {
                alert(response);
            }
        );
    });

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
                                
                                <button codigo="${servicios.codigo}" class="btn btn-success modificarServicio">Modificar</button>
                                <button codigo="${servicios.codigo}" class="btn btn-primary eliminarServicio">Eliminar</button>
                          
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
                            <button codigo="${servicios.codigo}" class="btn btn-success modificarServicio">Modificar</button>
                            <button codigo="${servicios.codigo}" class="btn btn-primary eliminarServicio">Eliminar</button>
                            </td>
                        </tr>
                        `;
                    }
                });
                $('#services').html(templates);


            }
        });
    }

    function cargarServiciosSolicitados(){
        $.ajax({
            url: './php/admind-ServiciosSolicitados.php',
            type: "GET",
            success: function (response) {
                let templates ="";
                let servicios = JSON.parse(response);

                servicios.forEach(servicios => {
                    if(servicios.status=='1'){
                        templates += `
                        <tr>
                            <td>${servicios.cedula}</td>
                            <td>${servicios.nombre}</td>
                            <td>${servicios.habitacion} </td>
                            <td>${servicios.servicio}</td>
                            <td style="color: rgb(255, 10, 10)">Pendiente por Confirmar</td>
                            <td>
                            <button class="btn btn-success confirmarServicioSolicitado" codigo ="${servicios.codigo}">Confirmar</button>
                            <button class="btn btn-danger elimininarServicioSolicitado" codigo ="${servicios.codigo}">Eliminar</button>
                            </td>
                        </tr>
                    `;
                    }
                    if(servicios.status =='2'){
                        templates += `
                        <tr>
                        <td>${servicios.cedula}</td>
                        <td>${servicios.nombre}</td>
                        <td>${servicios.habitacion} </td>
                        <td>${servicios.servicio}</td>
                        <td style="color: darkgreen">Servicio Confirmado</td>
                        <td>
                        <button codigo ="${servicios.codigo}" class="btn btn-danger elimininarServicioSolicitado">Eliminar</button>
                        </td>

                        </tr>
                        `;
                    }
                });
                $('#ServiciosSolicitados').html(templates);


            }
        });

    }
    //Fin de la Logica de los Servicios

    //Logica de Reservaciones

    function cargarReservaciones(){
        let data = "";
        $.post('./php/admind-reservaciones.php', data,
            function (response) {
                let datos = JSON.parse(response);
                let reservaciones = "";
                
                datos.forEach(datos => {
                if(datos.status==1){
                    reservaciones += `
                <tr codigo="${datos.codigo}">
                <td>${datos.cedula}</td>
                <td>${datos.cliente}</td>
                <td>${datos.habitacion}</td>
                <td>${datos.banco}</td>
                <td>${datos.referencia}</td>
                <td>${datos.fecha}</td>
                <td>${datos.fechasalida}</td>
                <td >${datos.precio}</td>
                <td style="color: rgb(19, 255, 255)">En espera</td>
                <td>
                    <ul style="list-style: none;margin-left: -10%">
                        <li><button class="btn btn-success confirmar">Confirmar</button><button class="btn btn-primary procesar">Procesar</button></li>
                        <li><button class="btn btn-dark terminar">Terminar</button><button class="btn btn-danger eliminar">Eliminar</button></li>
                    </ul>
                </td>
            </tr>
                `;
                }
                if(datos.status==2){
                    reservaciones += `
                <tr codigo="${datos.codigo}">
                <td>${datos.cedula}</td>
                <td>${datos.cliente}</td>
                <td>${datos.habitacion}</td>
                <td>${datos.banco}</td>
                <td>${datos.referencia}</td>
                <td>${datos.fecha}</td>
                <td>${datos.fechasalida}</td>
                <td >${datos.precio}</td>
                <td style="color: rgb(66, 255, 19)">Confirmada</td>
                <td>
                    <ul style="list-style: none;margin-left: -10%">
                        <li><button class="btn btn-primary procesar">Procesar</button></li>
                        <li><button  class="btn btn-dark terminar">Terminar</button><button class="btn btn-danger eliminar">Eliminar</button></li>
                    </ul>
                </td>
            </tr>
                `;

                }
                if(datos.status==3){
                    reservaciones += `
                <tr codigo="${datos.codigo}">
                <td>${datos.cedula}</td>
                <td>${datos.cliente}</td>
                <td>${datos.habitacion}</td>
                <td>${datos.banco}</td>
                <td>${datos.referencia}</td>
                <td>${datos.fecha}</td>
                <td>${datos.fechasalida}</td>
                <td >${datos.precio}</td>
                <td style="color: rgb(8, 66, 255)">En Proceso</td>
                <td>
                    <ul style="list-style: none;margin-left: -10%">
                        <li><button  class="btn btn-dark terminar">Terminar</button><button class="btn btn-danger eliminar">Eliminar</button></li>
                    </ul>
                </td>
            </tr>
                `;

                }
                if(datos.status==4){
                    reservaciones += `
                <tr codigo="${datos.codigo}">
                <td>${datos.cedula}</td>
                <td>${datos.cliente}</td>
                <td>${datos.habitacion}</td>
                <td>${datos.banco}</td>
                <td>${datos.referencia}</td>
                <td>${datos.fecha}</td>
                <td>${datos.fechasalida}</td>
                <td>${datos.precio}</td>
                <td style="color: rgb(0, 226, 11)">Finalizada</td>
                <td>
                    <ul style="list-style: none;margin-left: -10%">
                        <li><button  class="btn btn-danger eliminar">Eliminar</button></li>
                    </ul>
                </td>
            </tr>
                `;

                }

                });
                
                $('#listaReservaciones').html(reservaciones);
            }
            
        );
    };

    $(document).on('click','.confirmar',function(){
        let elemento = $(this)[0].parentElement.parentElement.parentElement.parentElement;
        let codigo = $(elemento).attr('codigo');
        if(confirm('Desea Confirmar Reservacion')){
        $.post('./php/admind-confirm.php', {codigo},
            function (response) {
             alert(response);   
            }
        );
        cargarReservaciones();
        }
    });
    
    $(document).on('click','.procesar',function(){
        let elemento = $(this)[0].parentElement.parentElement.parentElement.parentElement;
        let codigo = $(elemento).attr('codigo');
        if(confirm('Desea Procesar Reservacion')){

        $.post('./php/admind-procesar.php', {codigo},
            function (response) {
             alert(response);   
            }
        );
        cargarReservaciones();
        }
    });
    
    $(document).on('click','.eliminar',function(){
        let elemento = $(this)[0].parentElement.parentElement.parentElement.parentElement;
        let codigo = $(elemento).attr('codigo');
        if(confirm('Desea Eliminar esta Reservacion')){

        $.post('./php/admind-delet.php', {codigo},
            function (response) {
             alert(response);   
            }
        );
        cargarReservaciones();
        }
    });
    
    $(document).on('click','.terminar',function(){
        let elemento = $(this)[0].parentElement.parentElement.parentElement.parentElement;
        let codigo = $(elemento).attr('codigo');
        if(confirm('Desea Terminar la Reservacion')){

        $.post('./php/admind-terminar.php', {codigo},
            function (response) {
             alert(response);   
            }
        );
        cargarReservaciones();
        }
    });

    //Fin de la Logica de Reservaciones

    //Logica de los Clientes
    function loadCliente(){
        let data ="";
        $.post('./php/clientLoad.php', {data},
            function (response) {
            let datos = JSON.parse(response);
            let clientes = "";
            
            datos.forEach(datos=>{
                clientes +=`
                <tr cedula="${datos.cedula}">
                <td>${datos.cedula}</td>
                <td>${datos.nombre}</td>
                <td>${datos.apellido}</td>
                <td>${datos.phone}</td>
                <td>${datos.correo}</td>
                <td>${datos.password}</td>
                <td>
                    <button  type="submit" class="btn btn-danger deleteClient">Eliminar</button>
                    <button  type="submit" class="btn btn-primary modific">Modificar</button>
                </td>
            </tr>
                
                `;
            });
            $('#client').html(clientes);
            }
                   );
    }

    $(document).on('click','.deleteClient',function(){
        let elemento = $(this)[0].parentElement.parentElement;
        let cedula = $(elemento).attr('cedula');

        if(confirm('Desea Eliminar el Cliente')){
            $.post('./php/user-delete.php', {cedula},
            function (response) {
                alert(response);
            });
        }
       
    });
    $(document).on('click','.modific',function(){
        let elemento = $(this)[0].parentElement.parentElement;
        let cedula = $(elemento).attr('cedula');

        $.post('./php/user-consult.php',
        {cedula},
        function(response){
            
            let cliente = JSON.parse(response);
            console.log(cliente);
            
            console.log(cliente);
            $('#cedula').val(cliente.cedula);
            $('#name').val(cliente.nombre);
            $('#apel').val(cliente.apellido);
            $('#password').val(cliente.password);
            $('#email').val(cliente.correo);
            $('#phone').val(cliente.phone);
            $('#cedulaCliente').val(cliente.cedula);

        });

        $('#btn').html('Guardar Modificacion');
        validar = true;    
       
    });

    $(document).on('click','#btn',function(e){
        let url = validar === false ? 'php/user-add.php' : './php/user-modifique.php';
        e.preventDefault();
        const postDate = {
            cedula:$('#cedula').val(),
            name:$('#name').val(),
            apel:$('#apel').val(),
            pass:$('#password').val(),
            email:$('#email').val(),
            phone:$('#phone').val(),
            cedulaCliente:$('#cedulaCliente').val()
        };

        $.post(url,postDate,
            function (response) {
                alert(response);
            });
        $('#btn').html('Registrar');
        validar = false;
        limpiar();
    });

    function limpiar(){
        $('#cedula').val("");
        $('#name').val("");
        $('#apel').val("");
        $('#password').val("");
        $('#email').val("");
        $('#phone').val("");
        $('#codigoCliente').val("");
    }
    // fin de la Logica de los Clientes

    //Logica de Habitaciones
    function cargarHabitaciones(){
        let data = "";
        $.post('./php/roomLoad.php', {data},
            function (response) {
             let habitaciones = JSON.parse(response);
             let templates = "";
             habitaciones.forEach(habitaciones => {
                 templates += `
                    <tr>
                        <td>${habitaciones.nombre}</td>
                        <td>${habitaciones.precio} </td>
                        <td>${habitaciones.cantidad}</td>
                        <td> 
                            <button nombre="${habitaciones.nombre}" codigo="${habitaciones.id}" class="btn btn-info modificarHabitacion"> Modificar </button>
                        </td>
                        
                    </tr>
                 
                 `;
             });

             $('#listadeHabitaciones').html(templates);
             
            }       );
    } 

    $('#cancelarModificacion').click(function () { 
        $('#cardHabitacion').hide();
        $('#PrecioHabitacion').val("");
        $('#cantidadHabitaciones').val("");
    });
    
    $('#habitacion-form').submit(function (e) {
        e.preventDefault();
        const data = {
            codigo:codigoHabitacion,
            precio:$('#PrecioHabitacion').val(),
            cantidad:$('#cantidadHabitaciones').val()
        }

        $.post('./php/admind-modificarHabitacion.php', data,
            function (response) {
                alert(response);
            }
        );
        $('#cardHabitacion').hide();
        $('#PrecioHabitacion').val("");
        $('#cantidadHabitaciones').val("");
        cargarHabitaciones();
      });


      $(document).on('click','.modificarHabitacion',function(){
          codigoHabitacion = $(this).attr('codigo');
          let nombre = $(this).attr('nombre');
          $('#cardHabitacion').show();
          $('#nombreHabitacion').html(nombre);
          $('#PrecioHabitacion').val("");
          $('#cantidadHabitaciones').val("");
      });

      function consultaFechas(fechainicial, fechafinal) {
        const data = {
            fecha1:fechainicial,
            fecha2:fechafinal
        }

        $.post('./php/admind-Reporte.php', data,
            function (response) {
                console.log(response);
            }
        );
        
      } 
    

        
    setInterval(cargarHabitaciones,2000);
    setInterval(cargarServiciosSolicitados,2000);
    setInterval(cargarReservaciones,2000);
    setInterval(loadCliente,2000);
    setInterval(cargarServicios,2000);




});