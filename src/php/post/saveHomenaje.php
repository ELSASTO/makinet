<?php 
    
    date_default_timezone_set('America/Bogota');
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/saveHomenaje.class.php';
    session_start();
    
    // instancia de la clase para crear usuarios de clientes
    $homenaje = new Homenaje();

    if(isset($_POST['city']) && isset($_POST['dateReceived']) && isset($_POST['hourReceived']) && isset($_POST['dateDelivery']) && isset($_POST['hourDelivery']) && 
        isset($_POST['fullName']) && isset($_POST['video']) && isset($_POST['trasmision']) && isset($_POST['medidaRetablo']) && isset($_POST['retablo']) 
        && isset($_POST['observaciones'])){
        
        $city           = $_POST['city'];
        $dateReceived   = $_POST['dateReceived'];
        $hourReceived   = $_POST['hourReceived']; 
        $dateDelivery   = $_POST['dateDelivery']; 
        $hourDelivery   = $_POST['hourDelivery']; 
        $fullName       = strtoupper($_POST['fullName']); 
        $video          = $_POST['video']; 
        $trasmision     = strtoupper($_POST['trasmision']);
        $usuario        = $_SESSION['username'] ." ". $_SESSION['usertlastname'];

        if($_POST['medidaRetablo'] == '3' || $_POST['medidaRetablo'] == '6'){
            $medidadRetablo = $_POST['medidaRetablo'];
            $retablo = $_POST['retablo'];   
        }else{
            $medidadRetablo = $_POST['medidaRetablo'];
            $retablo = 0;
        }

        $observaciones  = $_POST['observaciones']; 
        
        $homenaje->setCity($city);
        $homenaje->setDateReceived($dateReceived);
        $homenaje->setHourReceived($hourReceived);
        $homenaje->setDateDelivery($dateDelivery);
        $homenaje->setHourDelivery($hourDelivery);
        $homenaje->setFullName($fullName);
        $homenaje->setVideo($video);
        $homenaje->setTrasmision($trasmision);
        $homenaje->setMedidaRetablo($medidadRetablo);
        $homenaje->setRetablo($retablo);
        $homenaje->setObservaciones($observaciones);
        $homenaje->setUsuario($usuario);

        $response = $homenaje->saveHomenaje();

        Messages::printJSON($response);
    }



?>