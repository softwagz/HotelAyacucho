<?php
    include('Conexion.php');
    $matrimonial;
    $familiar;
    $sencilla;


        for($i = 1; $i<4; $i++){
            $query = "SELECT reservacion.idhabitacion, COUNT(reservacion.idhabitacion) as cantidad FROM reservacion where reservacion.idhabitacion = $i and status!= 0;";

        $resultado = mysqli_query($connection,$query);
        if(!$resultado){
            die('error en obtener');
        }

        while($datos = mysqli_fetch_array($resultado))
        {    if($i==1){
            $matrimonial = $datos['cantidad'];
            }
            if($i==2){
                $familiar = $datos['cantidad'];
                }
            if($i==3){
                $sencilla = $datos['cantidad'];
            }
        }
        }

        $json = array(
            'matrimonial' =>$matrimonial,
            'familiar' => $familiar,
            'sencilla' => $sencilla
        );
        $jsonEncode = json_encode($json);

    echo $jsonEncode;
?>