<?php
    include('Conexion.php');

    $idCliente =$_POST['idcliente']; 
    $idHabitacion= $_POST['idhabitacion'];
    $idBanco = $_POST['idbanco'];
    $fechaInicio = $_POST['fecha'];
    $fechaFinal = $_POST['fechasalida'];
    $precioHabitacion = $_POST['precio'];
    $numeroReferencia = $_POST['numeroReferencia'];


    $query = "insert into reservacion (idcliente,idhabitacion,fecha,precio,status,codigobanco,fechasalida, numeroreferencia)
    values ( $idCliente,$idHabitacion,'$fechaInicio',$precioHabitacion,1,$idBanco,'$fechaFinal','$numeroReferencia')";

    $resultado = mysqli_query($connection,$query);

    if(!$resultado){
        die('error al registrar');
    }

    echo ('se ha registrado correctamente la Reservacion');
?>