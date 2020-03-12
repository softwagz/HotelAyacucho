<?php
    include('Conexion.php');

    $query="Select * from usuarios";

    $resultado = mysqli_query($connection,$query);

    if(!$resultado){
        die('error al obtener listado de clientes');
    }
    $json = array();
    while($datos = mysqli_fetch_array($resultado)){
        $json[] = array(
            'cedula' => $datos['cedula'],
            'nombre' => $datos['name'],
            'phone' => $datos['phone'],
            'apellido'  => $datos['apel'],
            'correo' => $datos['email'],
            'password' => $datos['password']
        );
    }

    $jsonCode = json_encode($json);

    echo $jsonCode;
?>