<?php


include('Conexion.php');

if(isset($_POST['email'])){
    $email = $_POST['email'];
    $password = $_POST['password'];

    
    if(  !empty(trim($email)) and !empty(trim($password))  )
    {   
        $query = " Select cedula,name,apel,email,password from usuarios where email='$email' and password='$password' and status='1'";
        $resultado = mysqli_query($connection,$query);

        if(!$resultado){
            die('Ha falado al insertar el dato '. mysqli_erro($connection));
        }

        $datos = mysqli_fetch_array($resultado);
        
        $Json = array();

        if($datos['email'] === $email and $datos['password'] === $password){
            $Json[] = array(
                'id' => $datos['cedula'],
                'nombre' =>$datos['name'],
                'apel' =>$datos['apel'],
                'validar'=> "true"
            );

            $jsoncode= json_encode($Json[0]);
            echo($jsoncode);
        }
        else {
            $Json = array();
            $Json[] = array(
                'validar'=> "false");
            $jsoncode= json_encode($Json[0]);
            echo($jsoncode);

        }
        
        }

    }




?>