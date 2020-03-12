<?php
include('Conexion.php');
$query = "select * from bancos where status =1";

$resultado = mysqli_query($connection,$query);

if(!$resultado){
    die('Falla al consultar bancos');
}
$json = array();
while($row = mysqli_fetch_array($resultado)){
    $json[] = array(
        'codigo' => $row['codigo'],
        'nombre' => $row['nombre'],
        'nrocuenta' => $row['nrocuenta'],
        'tipocuenta' => $row['tipocuenta']
    );
}

$jsonString = json_encode($json);

echo $jsonString;
?>