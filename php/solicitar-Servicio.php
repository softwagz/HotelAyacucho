<?php
    include('Conexion.php');

    if(isset($_POST['id'])){
        $idCliente = $_POST['id'];
        $idServicio = $_POST['codigo'];
        
        $query ="insert into serviciosclientes (idcliente,idservicio,status)
        values ('$idCliente',$idServicio,1)";

        $resultado = mysqli_query($connection,$query);

        if(!$resultado){
            die('falla al Registrarle el servicio al cliente');
        }

        echo ' Servicio Registrado';
    
    }
    else{
        echo 'Id no registrado';
    }


?>