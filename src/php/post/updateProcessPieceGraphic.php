<?php
    session_start();

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/updateProcessPieceGraphic.class.php';
    
    $piecesGraphics = new Pieces();

    if(isset($_POST['id_piece'])){
        $idPiece = $_POST['id_piece'];
    }
    if(isset($_POST['state_piece'])){
        $statePiece = $_POST['state_piece'];
    }
    
    $piecesGraphics->setIdPiece($idPiece);
    $piecesGraphics->setStatePiece($statePiece);
    $datos = $piecesGraphics->setPieceGraphics();
    Messages::printJSON($datos);

?>