<?php
    include('Conexion.php');
    if(isset($_POST['codigo'])){
        $codigo=$_POST['codigo'];
        $query = "Select * from Servicios where codigo = $codigo ;";
        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('falla al obtener Servicio');
        }

        $json = array();
        while($datos = mysqli_fetch_array($resultado)){
            $json[] = array(
                'nombre' => $datos['nombre'],
                'descripcion' => $datos['descripcion'],
                'precio' => $datos['precio']
            ) ;
        }

        $jsonEnconde = json_encode($json[0]);
        echo $jsonEnconde;
    }
    else{
        echo 'Codigo no Definido';
    }
?>