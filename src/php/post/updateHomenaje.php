<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/updateHomenaje.class.php';

    $_homenajes = new Homenajes();

    if(isset($_POST['id']) || isset($_POST['name']) || isset($_POST['retablo']) || isset($_POST['trasmision']) || isset($_POST['video']) || isset($_POST['medida']) || isset($_POST['observaciones'])){
        
        $id            = $_POST['id'];
        $medida        = $_POST['medida'];
        $name          = $_POST['name'];
        $observaciones = $_POST['observaciones'];
        $retablo       = $_POST['retablo'];
        $trasmision    = $_POST['trasmision'];
        $video         = $_POST['video'];

        $_homenajes->setIdHomenaje($id);
        $_homenajes->setName($name);
        $_homenajes->setRetablo($retablo);
        $_homenajes->setTrasmision($trasmision);
        $_homenajes->setVideo($video);
        $_homenajes->setMedida($medida);
        $_homenajes->setObservaciones($observaciones);

        $datos = $_homenajes->setHomenaje();
        Messages::printJSON($datos);
    }

    // $datos = $homenajes->getHomenajes();

?>