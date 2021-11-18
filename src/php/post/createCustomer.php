<?php 

    date_default_timezone_set('America/Bogota');

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/createCustomer.class.php';

    session_start();

    if(isset($_POST['name_customer'])){
        $nameCustomer = strtoupper($_POST['name_customer']);
    }

    if(isset($_POST['address_customer'])){
        $addressCustomer = strtoupper($_POST['address_customer']);
    }

    if(isset($_POST['city_customer'])){
        $cityCustomer = strtoupper($_POST['city_customer']);
    }

    if(isset($_POST['email_customer'])){
        $emailCustomer = strtoupper($_POST['email_customer']);
    }

    if(isset($_POST['phone_customer'])){
        $phoneCustomer = $_POST['phone_customer'];
    }

    if(isset($_POST['nit_customer'])){
        $nitCustomer = $_POST['nit_customer'];
    }

    if(isset($_POST['web_customer'])){
        $webCustomer = strtoupper($_POST['web_customer']);
    }
    
    $customer = new Customer();
    
    $customer->setNameCustomer($nameCustomer);
    $customer->setAddressCustomer($addressCustomer);
    $customer->setCityCustomer($cityCustomer);
    $customer->setEmailCustomer($emailCustomer);
    $customer->setPhoneCustomer($phoneCustomer);
    $customer->setNitCustomer($nitCustomer);
    $customer->setWebCustomer($webCustomer);

    $customer->createCustomer();



?>