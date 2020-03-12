<?php
    include('Conexion.php');
    if(isset($_POST['cedula'])){
        $cedula=$_POST['cedula'];
        $query = "delete from usuarios where cedula=$cedula";

        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('error al eliminar el cliente');
        }

        echo 'Cliente Eliminado Satisfactoriamente';
    }

?>