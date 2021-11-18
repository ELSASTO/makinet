<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/historialActivity.class.php';

    $historial = new Historial();

    if(isset($_GET['id'])){

        // definicion de la variable id
        $idActivity = $_GET['id'];
        // llamado a las  funciones
        $historial->setIdActivity($idActivity);
        $response = $historial->historialActivity();
        // imprime el resultado
        Messages::printJSON($response);

    }
?>