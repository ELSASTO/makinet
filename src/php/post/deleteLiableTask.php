<?php 
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/deleteLiableTask.class.php';

    $newLiables = new DeleteLiable();

    if(isset($_GET['id']) && !empty($_GET['id'])){

        $idSolicitud = $_GET['id'];
        $newLiables->setIdSolicitud($idSolicitud);

        if(isset($_POST['liables'])){
            $liables = $_POST['liables'];
            $newLiablesTask = implode(',',$liables);
            $newLiables->setNewLiables($newLiablesTask);
            $newLiables->updateLiablesTask();
        }

        if(isset($_POST['deleteLiable'])){        
            $deleteLiable = $_POST['deleteLiable'];
            $newLiables->setIdLiable($deleteLiable);
            $response = $newLiables->deleteLiableTask();
            // imprime las respuestas de los resultados
            Messages::printJSON($response);
        }

    }


?>