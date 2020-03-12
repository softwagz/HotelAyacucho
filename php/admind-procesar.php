<?php
    include('Conexion.php');

    if(isset($_POST['codigo'])){
        $codigo = $_POST['codigo'];
        $query = "update reservacion set status=3 where codigo =$codigo ";

        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('error al Procesar Reservacion');
        }
        echo 'Reservacion en Proceso';
    }
?>