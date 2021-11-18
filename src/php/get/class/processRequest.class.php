<?php
    Class Process extends DB{

        private $idProceso;
        private $idProcesoRequest;

        public function setIdProcesoRequest($idProcesoRequest){
            $this->idProcesoRequest = $idProcesoRequest;
        }

        public function getIdProcesoRequest(){
            return $this->idProcesoRequest;
        }

        public function setIdProceso($idProceso){
            $this->idProceso = $idProceso;
        }

        public function getIdProceso(){
            return $this->idProceso;
        }

        public function getRequest(){
            $requests = array();
            $requests['process'] = array();

            $sql = "SELECT * FROM solicitudes_procesos WHERE id_tipo_proceso = :id";
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idProceso]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id"           => $row['id_proceso'],
                    "tipo_proceso" => $row['id_tipo_proceso'],
                    "desc_proceso" => $row['descripcion_proceso'],
                    "icon"         => $row['icono_proceso'],

                );
                array_push($requests['process'], $items);
            }
            return $requests;
        }

        public function getProcessActualRequest(){
            $sql = "SELECT proceso_solicitud FROM solicitudes WHERE id_solicitud = :id";

            $result =  $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idProcesoRequest]);

            if($row = $result->rowCount()){
                if($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $item = array(
                        'proceso_actual' => $row['proceso_solicitud']
                    );
                    return $item;
                }
            }
        }
    }

?>