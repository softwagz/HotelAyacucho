<?php
    include('Conexion.php');
    if(isset($_POST['cedulaCliente'])){
    $cedulaCliente = $_POST['cedulaCliente'];
    $cedula = $_POST['cedula'];
    $name = $_POST['name'];
    $apel = $_POST['apel'];
    $phone = $_POST['phone'];
    $correo = $_POST['email'];
    $password = $_POST['pass'];
    
    if(  !empty(trim($name)) and !empty(trim($apel)) and !empty(trim($correo)) and !empty(trim($password)))
    {
        $query = "Update usuarios set cedula = '$cedula',name='$name',apel='$apel', email='$correo',password='$password',phone='$phone' where cedula = $cedulaCliente;";

        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('no se ha podido modificar el Usuario');
        }

        echo 'Modificacion Exitosa';

    }
    }
?>