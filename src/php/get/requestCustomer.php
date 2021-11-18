<?php 

    session_start();

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/requestCustomer.class.php';
    
    
    $typeUser = $_SESSION['tipo_usuario'];
    $idUser = $_SESSION['id_usuario'];
   
    $request = new Request();
    
    if(isset($_GET['taskUser'])){

        $idUserTask = $_GET['taskUser'];
        $request->setIdUser($idUserTask);

        $res = $request->getTaskUser();
        Messages::printJSON($res);

    }else{
        $request->setTypeUser($typeUser);
        $request->setIdUser($idUser);

        $res = $request->getRequest();
        Messages::printJSON($res);
    }
?>