<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/inventoryCityHomenajes.class.php';

    $inventory = new Inventory();

    if($_GET['id']){
        $idCity = $_GET['id'];
        $inventory->setIdInventory($idCity);
        $datos = $inventory->getCitysHomenajes();
        Messages::printJSON($datos);
    }
?>