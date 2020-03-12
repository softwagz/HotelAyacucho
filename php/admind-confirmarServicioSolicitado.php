<?php
    include('Conexion.php');
    
    if(isset($_POST['codigoServicio'])){
        $codigo = $_POST['codigoServicio'];

        $query = "update serviciosclientes set status = 2 where codigo = $codigo";

        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Fallo al Confirmar el Servicio');
        }

        echo ' Servicio Confirmado';
    }


?>