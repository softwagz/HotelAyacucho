<?php
    include('Conexion.php');
    if(isset($_POST['codigo'])){
        $codigo = $_POST['codigo'];
        $query = "update reservacion set status=0 where codigo =$codigo ";

        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('error al eliminar Reservacion');
        }
        echo 'Reservacion Eliminada';
    }

?>