<?php
 include('Conexion.php');
 if(isset($_POST['name'])){
    $cedula = $_POST['cedula'];
 $name = $_POST['name'];
 $apel = $_POST['apel'];
 $phone = $_POST['phone'];
 $correo = $_POST['email'];
 $password = $_POST['pass'];
 
 if(  !empty(trim($name)) and !empty(trim($apel)) and !empty(trim($correo)) and !empty(trim($password)))
 {
     $query = "Insert into usuarios (cedula, name, apel,email,password,phone,status) values ('$cedula','$name','$apel','$correo','$password' ,'$phone',1);";

     $resultado = mysqli_query($connection,$query);
     if(!$resultado){
         die('no se ha podido Registrar el Usuario');
     }

     echo 'Registro Exitoso';

 }
 }
?>