<?php
    include('Conexion.php');
if(isset($_POST['codigo'])){
    $codigo = $_POST['codigo'];
    $precio = $_POST['precio'];
    $cantidad = $_POST['cantidad'];
    $query ="update habitaciones set precio = $precio, cantidad=$cantidad where
    id = $codigo"; 

    $result = mysqli_query($connection,$query);
    if(!$result){
        die('Falla al Modificar Habitacion');
    }

    echo 'Modificada Exitosamente';
}
else {
    echo 'no esta definido codigo';
}
   
?>