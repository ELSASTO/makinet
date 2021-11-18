<?php

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/infoCustomer.class.php';
    
    // instancia del objeto
    $infoCustomer = new Customer();

    if(isset($_GET['id'])){

        // definición de la variable id
        $idCustomer = $_GET['id'];
        // instancias de las funciones de la clase para traer la informacion
        $infoCustomer->setIdCustomer($idCustomer);
        $datos = $infoCustomer->getInfoCustomer();
        // imprime los datos en un json
        Messages::printJSON($datos);
    }else{
        
        $datos = $infoCustomer->getInfoCustomers();
        // imprime los datos en un json
        Messages::printJSON($datos);    
    }

?>