<?php 

    date_default_timezone_set('America/Bogota');

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/createOrder.class.php';

    session_start();

    if(isset($_POST['date'])){
        $date = strtoupper($_POST['date']);
    }

    if(isset($_POST['date2'])){
        $date2 = strtoupper($_POST['date2']);
    }

    if(isset($_POST['customer_value'])){
        $customer_value = strtoupper($_POST['customer_value']);
    }

    if(isset($_POST['nameApplicant'])){
        $nameApplicant = strtoupper($_POST['nameApplicant']);
    }

    if(isset($_POST['description'])){
        $description = $_POST['description'];
    }

    if(isset($_POST['saleValue'])){
        $saleValue = $_POST['saleValue'];
    }
    if(isset($_POST['costos'])){
        $costos = $_POST['costos'];
    }
    
    $order = new Order();
    
    $order->setDate($date);
    $order->setDate2($date2);
    $order->setCustomer_value($customer_value);
    $order->setNameApplicant($nameApplicant);
    $order->setDescription($description);
    $order->setSaleValue($saleValue);

    $order->createOrder($costos);

?>