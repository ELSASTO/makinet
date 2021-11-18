<?php 
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/createComite.class.php';

    session_start();

    $_comite = new Comite();

    if(isset($_POST['titulo']) && !empty($_POST['titulo'])){
        $tema = $_POST['titulo'];
        $_comite->setTema($tema);
    }

    if(isset($_POST['participantes']) && !empty($_POST['participantes'])){
        $participantes = implode(',',$_POST['participantes']);
        $_comite->setParticipantes($participantes);
    }

    if(isset($_POST['descripcion']) && !empty($_POST['descripcion'])){
        $descripcion = $_POST['descripcion'];
        $_comite->setDescripcion($descripcion);
    }

    if(isset($_POST['tareas']) && !empty($_POST['tareas'])){
        $tareas = 'SI';
    }else{
        $tareas = 'NO';
    }
    $_comite->setTareas($tareas);

    if(isset($_POST['conclusiones']) && !empty($_POST['conclusiones'])){
        $conclusiones = $_POST['conclusiones'];
        $_comite->setConclusiones($conclusiones);
    }

    if(isset($_POST['fecha']) && !empty($_POST['fecha'])){
        $fecha = $_POST['fecha'];
        $_comite->setFecha($fecha);
    }

    if(isset($_POST['ubicacion']) && !empty($_POST['ubicacion'])){
        $ubicacion = $_POST['ubicacion'];
        $_comite->setUbicacion($ubicacion);
    }

    if(isset($_POST['horaInicio']) && !empty($_POST['horaInicio'])){
        $horaInicio = $_POST['horaInicio'];
        $_comite->setHoraInicio($horaInicio);
    }
 
    if(isset($_SESSION['username']) && !empty($_SESSION['username']) && isset($_SESSION['usertlastname']) && !empty($_SESSION['usertlastname'])){
        $responsable = $_SESSION['username'] ." ". $_SESSION['usertlastname'];
        $_comite->setResponsable($responsable);        
    } 

    $res = $_comite->createComite();  

    if($res){
        Messages::printJSON($res);
    }

?>