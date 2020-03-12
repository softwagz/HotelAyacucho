<?php
    include('Conexion.php');

    if(isset($_POST['codigo'])){
        $codigo = $_POST['codigo'];
        $query =" delete from servicios where codigo = $codigo;";

        $resultado = mysqli_query($connection,$query);

        if(!$resultado){
            die('Falla al Eliminar Servicio');
        }
        echo 'Servicio Eliminado';
    }
?>