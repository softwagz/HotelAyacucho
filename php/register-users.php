<?php
include('Conexion.php');
if(isset($_POST['name'])){
    $name = $_POST['name'];
    $apel = $_POST['apel'];
    $phone = $_POST['phone'];
    $correo = $_POST['email'];
    $password = $_POST['pass'];
    $cedula = $_POST['cedula'];
    
    if(  !empty(trim($name)) and !empty(trim($apel)) and !empty(trim($correo)) and !empty(trim($password)) and !empty(trim($cedula)))
    {


        $query = "Insert into usuarios (name,apel,email,password,status,phone,cedula) Values ('$name','$apel','$correo','$password',1,'$phone','$cedula')";
        $resultado = mysqli_query($connection,$query);

        if(!$resultado){
            die('Ha falado al insertar el dato '. mysqli_erro($connection));
        }
        $query = "select cedula,name from usuarios where email='$correo' and password='$password' and status=1";
        $resultado = mysqli_query($connection,$query);

        if(!$resultado){
            die('falla obtener id'.mysqli_error($connection));
        }

        $dato = mysqli_fetch_array($resultado);

        $json = array();

        $json[] = array(
            'id' => $dato['cedula'],
            'name'=> $dato['name'],
            'validar' => 'true'
        );

        $jsonString = json_encode($json[0]);


        echo $jsonString;
       
    }
}

?>