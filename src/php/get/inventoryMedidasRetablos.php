<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/inventoryMedidasRetablos.class.php';

    $retablos = new Retablos();

    if($_GET['id']){

        $idRetablosCity = $_GET['id'];

        $retablos->setIdRetablos($idRetablosCity);
        $datos = $retablos->getMedidasRetablosHomenajes();
        Messages::printJSON($datos);

    }
?>