<?php

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/infoTaskCustomer.class.php';

    // instancia del objeto
    $tasksCustomer = new Tasks();

    if(isset($_GET['id'])){
        // definicion de la variable id cliente para traer las tareas del cliente
        $idfile = $_GET['id'];
        // instancias para traer la informacion 
        $tasksCustomer->setIdCustomerToTask($idfile);
        $datos = $tasksCustomer->getInfoTaskCustomerFinalizadas();
        // imprimir json con los datos
        Messages::printJSON($datos);

    }else if(isset($_GET['ag'])){
        // definicion de la variable id cliente para traer las tareas del cliente
        $idfile = $_GET['ag'];
        // instancias para traer la informacion 
        $tasksCustomer->setIdCustomerToTask($idfile);
        $datos = $tasksCustomer->getInfoTaskCustomerAsignadas();
        // imprimir json con los datos
        Messages::printJSON($datos);

    }else if(isset($_GET['pd'])){
        // definicion de la variable id cliente para traer las tareas del cliente
        $idfile = $_GET['pd'];
        // instancias para traer la informacion 
        $tasksCustomer->setIdCustomerToTask($idfile);
        $datos = $tasksCustomer->getInfoTaskCustomerPendientes();
        // imprimir json con los datos
        Messages::printJSON($datos);

    }

?>