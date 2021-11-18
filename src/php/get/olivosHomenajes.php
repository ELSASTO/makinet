<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/olivosHomenajes.class.php';

    $homenajes = new Homenajes();

    $datos = $homenajes->getHomenajes();
    Messages::printJSON($datos);

?>