<?php
    include('Conexion.php');

    if(isset($_POST['cedula'])){
        $cedula = $_POST['cedula'];

        $query = "select * from usuarios where cedula = $cedula";

        $resultado = mysqli_query($connection,$query);

        if(!$resultado){
            die('Error al obtener cliente');
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

        $jsonEncode = json_encode($json[0]);
        echo $jsonEncode;

        }
    
?>