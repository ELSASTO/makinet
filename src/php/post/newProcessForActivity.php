<?php 
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/newProcessForActivity.class.php';

    $processActivity = new ProcessActivity();

    if(isset($_GET['id']) && !empty($_GET['id'])){

        // tipo de actividad
        if(isset($_POST['typeRequest']) && !empty($_POST['typeRequest'])){
            $typeActivity = $_POST['typeRequest'];
            $processActivity->setTypeActivity($typeActivity);
        }
        // descripcion de la actividad
        if(isset($_POST['descRequest']) && !empty($_POST['descRequest'])){
            $descActivity = $_POST['descRequest'];
            $processActivity->setDescActivity($descActivity);
        }

        // nuevo responsable en la actividad
        if(isset($_POST['responsable']) && !empty($_POST['responsable'])){
            $idNewUser = $_POST['responsable'];
            $processActivity->setIdNewUser($idNewUser);
        }

        $idActivity = $_GET['id'];
        $processActivity->setIdActivity($idActivity);

        $processActivity->addNewUserForProcessActivity();
        $response = $processActivity->newProcessForActivity();

        // imprime las respuestas de los resultados
        Messages::printJSON($response);

    }



?>