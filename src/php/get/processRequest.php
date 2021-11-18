<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/processRequest.class.php';


    $process = new Process();

    if(isset($_GET['id'])){
        $idProceso = $_GET['id'];
        $process->setIdProceso($idProceso);
        $datos = $process->getRequest();
        Messages::printJSON($datos);

    }else if(isset($_GET['pr'])){
        $idProcesoRequest =  $_GET['pr'];
        $process->setIdProcesoRequest($idProcesoRequest);
        $datos = $process->getProcessActualRequest();
        Messages::printJSON($datos);
    }
?>