<?php 

    //session_start();

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/orderList.class.php';
    
    
    $pedidos = new Pedidos();
    
    $res = $pedidos->getPedidos();
    
    Messages::printJSON($res);

?>