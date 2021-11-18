<?php
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/seeOrder.class.php';

    $seeorders = new seeorder();

    if(isset($_GET['id'])){
        $idOrder = $_GET['id'];
        $seeorders->setIdOrder($idOrder);
        $seeorders->getFicha();
        $seeorders->getOrder();
        Messages::printJSON($seeorders->Ordenes);
        // echo $datos;
    }
?>