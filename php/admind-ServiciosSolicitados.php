<?php
    include('Conexion.php');

    $query = "
    select serviciosclientes.codigo, habitaciones.nombre as 'habitacion',
    usuarios.name as 'nombre',usuarios.cedula as 'cedula',
    servicios.nombre as 'servicio',serviciosclientes.status 
    from servicios,serviciosclientes,usuarios,reservacion,habitaciones 
    where reservacion.status=3 and reservacion.idcliente=usuarios.cedula 
    and reservacion.idhabitacion=habitaciones.id 
    and serviciosclientes.idcliente = usuarios.cedula 
    and serviciosclientes.idservicio=servicios.codigo;
    ";

    $result = mysqli_query($connection,$query);

    if(!$result){
        die('Falla Al Cargar los Servicios Solicitados');
    }

    $json = array();
    while($servicios = mysqli_fetch_array($result))
    {
        $json[] = array(
            'codigo' => $servicios['codigo'],
            'cedula' => $servicios['cedula'],
            'nombre' => $servicios['nombre'],
            'habitacion' => $servicios['habitacion'],
            'servicio' => $servicios['servicio'],
            'status' => $servicios['status']
        );
    }

    $jsonEncode = json_encode($json);

    echo $jsonEncode;
?>