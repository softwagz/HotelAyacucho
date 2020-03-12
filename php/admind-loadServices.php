<?php
    include('Conexion.php');
    $query ="Select * from servicios";

    $resultado = mysqli_query($connection,$query);
    if(!$resultado){
        die('error al cargar Servicios');
    }

    $json = array();

    while($datos = mysqli_fetch_array($resultado)){
        $json[] = array(
            'codigo' => $datos['codigo'],
            'nombre' => $datos['nombre'],
            'descripcion' => $datos['descripcion'],
            'tipo' => $datos['tipo'],
            'precio' =>$datos['precio'],
            'status' => $datos['status']
        );
    }

    $jsonEncode = json_encode($json);
    echo $jsonEncode;

?>