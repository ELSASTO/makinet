<?php

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/commentsTask.class.php';

    
    $commentTask = new Comments();

    if(isset($_GET['id'])){
        $idfile = $_GET['id'];
        $commentTask->setIdCommentTask($idfile);
        $datos = $commentTask->getCommentsTask();
        Messages::printJSON($datos);
    }

?>