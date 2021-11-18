<?php

    session_start();

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/infoPiecesGraphics.class.php';
    
    $piecesGraphics = new Pieces();

    if($_SESSION['tipo_usuario'] == 2){
        if(isset($_SESSION['id_usuario'])){
            $idUser = $_SESSION['id_usuario'];
            $piecesGraphics->setIdUser($idUser);
            $datos = $piecesGraphics->getPiecesGraphics();
            Messages::printJSON($datos);
        }
    }else if($_SESSION['tipo_usuario'] == 1){
        
        if(isset($_GET['id'])){
            $id = $_GET['id'];
            $piecesGraphics->setIdTaskPieces($id);
            $datos = $piecesGraphics->getPiecesGraphicsAdminId();
            Messages::printJSON($datos);
        }else{
            $datos = $piecesGraphics->getPiecesGraphicsAdmin();
            Messages::printJSON($datos);
        }
    }


?>