<?php
    include('Conexion.php');

    if(isset($_POST['codigo'])){
        $codigo = $_POST['codigo'];
        $nombre = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $precio = $_POST['precio'];
        $query="Update Servicios set
        nombre='$nombre',descripcion = '$descripcion',precio = $precio where 
        codigo= $codigo ";

        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('Falla al Actualizar Servicio');
        }
        
        echo 'Servicio Modificado';

    }

?>