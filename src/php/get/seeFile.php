<?php

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/seefile.class.php';

    $seefile = new File();

    if(isset($_GET['id'])){
        $idfile = $_GET['id'];
        $seefile->setIdFile($idfile);
        $datos = $seefile->getFileTask();
        Messages::printJSON($datos);
    }
?>