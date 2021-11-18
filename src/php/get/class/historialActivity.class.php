<?php

    Class Historial extends DB{

        private $idActivity;

        public function setIdActivity($idActivity){
            $this->idActivity = $idActivity;
        }

        public function getIdActivity(){
            return $this->idActivity;
        }

        public function historialActivity(){
            $historial = array();
            $historial['historial'] = array();
            $sql = "SELECT ha.id, ha.id_solicitud, ha.fecha, ts.descripcion, tsd.descripcion_solicitud, ha.proceso_solicitud FROM historial_solicitudes AS ha
                    INNER JOIN tipo_solicitud AS ts ON(ts.id_tipo_solicitud = ha.tipo_solicitud)
                    INNER JOIN tipo_solicitud_descripcion AS tsd ON(tsd.id_tipo_solicitud = ha.descripcion_solicitud)
                    WHERE ha.id_solicitud = :id GROUP BY ha.tipo_solicitud, ha.proceso_solicitud ORDER BY ha.id DESC;";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idActivity]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $response = array(
                        'error' => false,
                        'id_solicitud' => $row['id_solicitud'],
                        'fecha' => $row['fecha'],
                        'descripcion' => $row['descripcion'],
                        'descripcion_solicitud' => $row['descripcion_solicitud'],
                        'proceso_solicitud' => $row['proceso_solicitud'],
                    );
                    array_push($historial['historial'], $response);
                }
            }else{
                $historial = array(
                    'error' => true,
                    'message' => 'No hay cambios en la actividad'
                );
                
            }
            return $historial;
        }
    }

?>