<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/myTask.class.php';
    session_start();

    $_task = new MyTask();

    if(isset($_GET['task'])){

        if(isset($_SESSION['id_usuario']) && !empty($_SESSION['id_usuario'])){
            $responsable =  $_SESSION['id_usuario'];
            $_task->setResponsable($responsable);
        }

        $res = $_task->getTaskUser();
        Messages::printJSON($res);

    }else{

        if(isset($_POST['description']) && !empty($_POST['description'])){
            $description = $_POST['description'];
            $_task->setDescription($description);
        }
        if(isset($_POST['estado']) && !empty($_POST['estado'])){
            $estado = '0';
            $_task->setEstado($estado);
        }
    
        if(isset($_SESSION['id_usuario']) && !empty($_SESSION['id_usuario'])){
            $responsable =  $_SESSION['id_usuario'];
            $_task->setResponsable($responsable);
        }
    
    
        $res = $_task->createTask();
        Messages::printJSON($res);
    }
    
    

?>