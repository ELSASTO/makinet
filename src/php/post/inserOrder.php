<?php 
    date_default_timezone_set('America/Bogota');

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/insertOrder.class.php';

    session_start();

    if(isset($_POST['idOrder'])){
        $idOrder = $_POST['idOrder'];
    }

    if(isset($_POST['descriptionCostos'])){
        $descriptionCostos = $_POST['descriptionCostos'];
    }
    if(isset($_POST['valor'])){
        $valor = $_POST['valor'];
    }

    $insertar = new insertar();
    $insertar->setidOrder($idOrder);
    $insertar->setdescriptionCostos($descriptionCostos);
    $insertar->setvalor($valor);

    $response = $insertar->insertOrder();
    Messages::printJSON($response);
?>