<?php 

    Class Estadisticas extends DB{

        private $fecha1;
        private $fecha2;
        private $city;

        // fecha primaria para el rando de fechas
        public function setDate1($fecha1){
            $this->fecha1 = $fecha1;
        }
        public function getDate1($fecha1){
            return $this->fecha1;
        }

        // fecha secundaria para el rango de fechas
        public function setDate2($fecha2){
            $this->fecha2 = $fecha2;
        }
        public function getDate2($fecha2){
            return $this->fecha2;
        }

        // ciudad para seleccionar la cantidad de homenajes
        public function setCity($city){
            $this->city = $city;
        }
        public function city($city){
            return $this->city;
        }


        public function getDataRangeDate(){
            $sql = "SELECT COUNT(id)total_homenajes, SUM(video)cantidad_videos,
                    (SELECT SUM(ho.retablo_cantidad) 
                    FROM homenajes AS ho
                    INNER JOIN homenajes_retablos AS hr ON(hr.id = ho.medida_retablo)
                    WHERE ho.fecha_recibido BETWEEN '$this->fecha1' AND '$this->fecha2' AND ho.ciudad = '$this->city' AND hr.medida_retablo = '38 x 59')cantidad_grande,
                    (SELECT SUM(ho.retablo_cantidad) FROM homenajes AS ho 
                    INNER JOIN homenajes_retablos AS hr ON(hr.id = ho.medida_retablo)
                    WHERE ho.fecha_recibido BETWEEN '$this->fecha1' AND '$this->fecha2' AND ho.ciudad = '$this->city' AND hr.medida_retablo = '15 x 20')cantidad_pequeño
                    FROM homenajes AS ho
                    WHERE ho.fecha_recibido BETWEEN '$this->fecha1' AND '$this->fecha2' AND ciudad = '$this->city'";
            
            $result = $this->connect()->prepare($sql);
            $result->execute();

            if ($result->rowCount()){
                if($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $response = array(
                        'total_homenajes' => $row['total_homenajes'],
                        'cantidad_videos' => $row['cantidad_videos'],
                        'cantidad_grande' => $row['cantidad_grande'],
                        'cantidad_pequeño' => $row['cantidad_pequeño'],
                    );
                }
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se encontraron resultados'
                );
            }   
            return $response;
        }

        public function getDataGenerals(){
            $sql = "SELECT COUNT(id)total_homenajes, SUM(video)cantidad_videos, SUM(retablo_cantidad)cantidad_retablo 
                    FROM homenajes";
            
            $result = $this->connect()->prepare($sql);
            $result->execute();

            if ($result->rowCount()){
                if($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $response = array(
                        'total_homenajes' => $row['total_homenajes'],
                        'cantidad_videos' => $row['cantidad_videos'],
                        'cantidad_retablo' => $row['cantidad_retablo'],
                    );
                }
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se encontraron resultados'
                );
            }   
            return $response;
        }

        // estadisticas del ultimo mes
        public function getDataLastMonth(){
            $sql = "SELECT COUNT(id)total_homenajes, SUM(video)cantidad_videos, SUM(retablo_cantidad)cantidad_retablo 
                    FROM homenajes 
                    WHERE fecha_recibido BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE()";
            
            $result = $this->connect()->prepare($sql);
            $result->execute();

            if ($result->rowCount()){
                if($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $response = array(
                        'total_homenajes' => $row['total_homenajes'],
                        'cantidad_videos' => $row['cantidad_videos'],
                        'cantidad_retablo' => $row['cantidad_retablo'],
                    );
                }
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se encontraron resultados'
                );
            }   
            return $response;
        }
    }


?>

