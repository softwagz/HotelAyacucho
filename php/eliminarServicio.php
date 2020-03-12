<?php
    include('Conexion.php');
    
    if(isset($_POST['codigoServicio'])){
        $codigo = $_POST['codigoServicio'];

        $query = "delete from serviciosclientes where codigo = $codigo";

        $result = mysqli_query($connection, $query);
        if(!$result){
            die('Fallo al Cancelar el Servicio');
        }

        echo ' Servicio Cancelado';
    }


?>