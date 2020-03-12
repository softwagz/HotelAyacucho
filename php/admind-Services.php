<?php
    include('Conexion.php');
    if(isset($_POST['nombre'])){
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $tipo = $_POST['tipo'];
        $precio = $_POST['precio'];
        
        $query ="
        insert into servicios (nombre,descripcion,tipo,precio,status)
        values('$nombre','$descripcion',$tipo,$precio,1);
        ";

        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('error al registrar Servicio');
        }
        echo 'Servicio Registrado';

    }
   
?>