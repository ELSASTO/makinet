<?php 
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/createUserCustomer.class.php';
    
    // instancia de la clase para crear usuarios de clientes
    $userCustomer = new UserCustomer();

    if(isset($_POST['customer']) && isset($_POST['name_user']) && isset($_POST['lastName_user'])){

        // se guardan las variables
        $customer = $_POST['customer'];
        $name = $_POST['name_user'];
        $lastName = $_POST['lastName_user'];

        // instancias de las variables
        $userCustomer->setCustomer($customer);
        $userCustomer->setName($name);
        $userCustomer->setLastName($lastName);

        $datos = $userCustomer->createUserCustomer();
        // imprime la respuesta 
        Messages::printJSON($datos);
    }

?>