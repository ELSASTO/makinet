<?php

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/solicitanteTask.class.php';

    $solicitante = new Solicitante();

    // validacion de la variable para realizar la peticion a la base de datos
    if(isset($_GET['solicitante'])){

        // se guarda el parametro que llega en una variable
        $idCustomer = $_GET['solicitante'];
        // se instancian las funciones necesarias para realizar la petición
        $solicitante->setIdCustomer($idCustomer);
        $solicita = $solicitante->getSolicitanteTask();
        // se imprime los datos en json para retornalos
        Messages::printJSON($solicita);
    }
?>