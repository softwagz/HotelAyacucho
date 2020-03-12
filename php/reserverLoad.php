<?php
    include('Conexion.php');
    if(isset($_POST['id'])){
    $idcliente = $_POST['id'];
    
    $query = "
    select reservacion.codigo,habitaciones.nombre,reservacion.precio, DATE_FORMAT(reservacion.fecha, '%d/%m/%Y') fecha,
    DATE_FORMAT(reservacion.fechasalida, '%d/%m/%Y') fechasalida,
    reservacion.status from habitaciones,reservacion,usuarios 
    where usuarios.cedula = $idcliente AND usuarios.cedula=reservacion.idcliente 
    and reservacion.idhabitacion=habitaciones.id ORDER BY reservacion.status
    ";
    $resultado = mysqli_query($connection,$query);
    if(!$resultado){
        die('Consulta Fallida: '. mysqli_error($connection));
    }
    $json = array();
    while($row = mysqli_fetch_array($resultado)){
        $json[] = array(
            'id' => $row['codigo'],
            'nombre' => $row['nombre'],
            'precio' => $row['precio'],
            'fecha'=> $row['fecha'],
            'fechafinal' => $row['fechasalida'],
            'status' => $row['status']
        );
    }

    $jsonString = json_encode($json);
    
    echo $jsonString;
}

?>