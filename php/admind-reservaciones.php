<?php
    include('Conexion.php');

    $query = "
    select reservacion.codigo,
    reservacion.idcliente,
    usuarios.name,
    habitaciones.nombre as 'habitacion',
    bancos.nombre as 'banco',
    reservacion.numeroreferencia,
    DATE_FORMAT(reservacion.fecha, '%d/%m/%Y') fecha,
    DATE_FORMAT(reservacion.fechasalida, '%d/%m/%Y') fechasalida,
    reservacion.precio,
    reservacion.status
    FROM reservacion,bancos,usuarios,habitaciones
    WHERE reservacion.idcliente=usuarios.cedula AND 
    reservacion.codigobanco=bancos.codigo AND 
    reservacion.idhabitacion=habitaciones.id order by reservacion.status ,reservacion.codigo;";

    $resultado = mysqli_query($connection,$query);

    if(!$resultado){
        die('No se han podido cargar las Reservaciones');
    }

    $json = array();
    while($datos = mysqli_fetch_array($resultado)){
        $json[] =array(
            'codigo' => $datos['codigo'],
            'cedula' => $datos['idcliente'],
            'cliente' => $datos['name'],
            'habitacion' => $datos['habitacion'],
            'banco' => $datos['banco'],
            'referencia' => $datos['numeroreferencia'],
            'fecha' => $datos['fecha'],
            'fechasalida' => $datos['fechasalida'],
            'precio' => $datos['precio'],
            'status' => $datos['status']

        );
    }

    $jsonString = json_encode($json);
    
    echo $jsonString;

?>