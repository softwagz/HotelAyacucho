<?php

    include('Conexion.php');

    $query = "select * from habitaciones where status = 1";
    $resultado = mysqli_query($connection,$query);
    if(!$resultado){
        die('Consulta Fallida: '. mysqli_error($connection));
    }
    $json = array();
    while($row = mysqli_fetch_array($resultado)){
        $json[] = array(
            'id' => $row['id'],
            'cantidad'=> $row['cantidad'],
            'nombre' => $row['nombre'],
            'precio' => $row['precio'],
            'status' => $row['status']
        );
    }

    $jsonString = json_encode($json);
    
    echo $jsonString;


?>