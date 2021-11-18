<?php
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/getCountStateRequest.class.php';
    session_start();

    // print_r($_SESSION['id_usuario']);
    // die();

    $statistics = new Statistics();

    if(isset($_SESSION['tipo_usuario']) || !empty($_SESSION['tipo_usuario'])){
        $tipoUsuario = $_SESSION['tipo_usuario'];

        if($tipoUsuario == 1){
            $res = $statistics->getStatistics();
            Messages::printJSON($res);
        }else if($tipoUsuario == 2){
            $idUser = $_SESSION['id_usuario'];
            $statistics->setIdUser($idUser);
            $res = $statistics->getStatisticsUser();
            Messages::printJSON($res);
        }
    }
    // die();

    // if()


?>