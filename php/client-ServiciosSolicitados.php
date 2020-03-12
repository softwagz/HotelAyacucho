<?php
    include('Conexion.php');

    if(isset($_POST['id'])){
    $cedula = $_POST['id'];
    
    $query ="select serviciosclientes.codigo,servicios.nombre,serviciosclientes.status from servicios,serviciosclientes,usuarios 
    where usuarios.cedula = '$cedula' and usuarios.cedula=serviciosclientes.idcliente and serviciosclientes.idservicio=servicios.codigo; ";

    $resultado = mysqli_query($connection,$query);
    if(!$resultado){
        die('Falla al obtener Servicios Solicitados');
        }
    $json = array();    
    while($datos = mysqli_fetch_array($resultado)){
        $json[] = array(
            'nombre' => $datos['nombre'],
            'status' => $datos['status'],
            'codigo' => $datos['codigo']
        );

    }
    $jsonEnconde = json_encode($json);
    echo $jsonEnconde;
}


?>