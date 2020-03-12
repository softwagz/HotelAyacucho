<?php
    include('Conexion.php');
    if(isset($_POST['fecha1'])){
        $fecha1 = $_POST['fecha1'];
        $fecha2 = $_POST['fecha2'];
        $query="Select SUM(precio) as 'total' from reservacion where (fecha>='$fecha1' and fecha<='fecha2') and (status=3 or status = 4)";

        $result = mysqli_query($connection,$query);

        $json = array();
        
        $datos = mysqli_fetch_array($result);

        $json[] = array(
            'total' => $datos['total']
        );

        $jsonEncode = json_encode($json[0]);
        echo $jsonEncode;
    }

?>