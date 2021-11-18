<?php 

    Class Homenajes extends DB{
    
        public function getHomenajes(){

            $homenajes = array();
            $homenajes['homenajes'] = array();

            $sql = "SELECT ho.id, hc.ciudad, DATE_FORMAT(ho.fecha_recibido, '%d-%m-%Y')fecha_recibido, 
                            DATE_FORMAT(ho.fecha_entrega, '%d-%m-%Y')fecha_entrega, ho.nombre_completo, ho.video, ho.trasmision, ho.medida_retablo, ho.retablo_cantidad, ho.observaciones 
                    FROM homenajes AS ho
                    INNER JOIN homenajes_ciudad AS hc ON(hc.id = ho.ciudad)";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    "id"            => $row['id'],
                    "date"          => $row['fecha_recibido'] . " / " . $row['fecha_entrega'],
                    "name"          => $row['nombre_completo'],
                    "video"         => $row['video'],
                    "trasmision"    => $row['trasmision'],
                    "medidaRetablo" => $row['medida_retablo'],
                    "retablo"       => $row['retablo_cantidad'],
                    "observaciones" => $row['observaciones'],
                    "ciudad"        => $row['ciudad'],
                );
                array_push($homenajes['homenajes'], $item);
            }
            return $homenajes;
        }

    }


?>