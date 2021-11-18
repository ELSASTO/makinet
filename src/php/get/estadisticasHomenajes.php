<?php  

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/estadisticasHomenajes.class.php';

    $_message = new Messages();
    $_estadisticas = new Estadisticas();

    // egm = estadisticas generales ultimo mes
    if(isset($_GET['egm'])){
        $datos = $_estadisticas->getDataLastMonth();
        $_message->printJSON($datos);

    }else if(isset($_GET['eg'])){ // eg = estadisticas generlaes
        $datos = $_estadisticas->getDataGenerals();
        $_message->printJSON($datos);

    }else if(isset($_POST['dateRange']) && isset($_POST['city'])){

        $fecha = $_POST['dateRange'];
        $city = $_POST['city'];

        if($fecha[0] <= $fecha[1]){        
            $fecha1 = $fecha[0];
            $fecha2 = $fecha[1];            
        }else{
            $fecha1 = $fecha[1];
            $fecha2 = $fecha[0];
        }

        $_estadisticas->setDate1($fecha1);
        $_estadisticas->setDate2($fecha2);
        $_estadisticas->setCity($city);


        $datos = $_estadisticas->getDataRangeDate();
        $_message->printJSON($datos);
    }
    
?>