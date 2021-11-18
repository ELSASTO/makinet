<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/cityHomenajes.class.php';


    $citys = new CityHomenajes();
    $datos = $citys->getCitysHomenajes();
    if($datos){
        Messages::printJSON($datos);
    }
?>