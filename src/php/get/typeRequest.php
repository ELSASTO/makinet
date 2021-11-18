<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    // se instancia la clase en el archivo api.php
    Class TypeRequest extends DB{

        private $requestId;

        // definicion de la variable tipo solicitud para editar tarea
        public function setIdRequest($requestId){
            $this->requestId = $requestId;
        }
        public function getIdRequest(){
            return $this->requestId;
        }

        // funcion que trae el tipo de solicitud de acuerdo a la tarea editar
        public function getRequestTask(){
            $requests = array();
            $requests['typeRequest'] = array();

            $sql = "SELECT ts.id_tipo_solicitud, ts.descripcion, ts.abreviacion FROM solicitudes AS so
                    INNER JOIN tipo_solicitud AS ts ON(ts.id_tipo_solicitud = so.tipo_solicitud)
                    WHERE so.id_solicitud = :request";

            $result = $this->connect()->prepare($sql);
            $result->execute(['request' => $this->requestId]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id"    => $row['id_tipo_solicitud'],
                    "desc"  => $row['descripcion'],
                    "abrv"  => $row['abreviacion']
                );
                array_push($requests['typeRequest'], $items);
            }
            Messages::printJSON($requests);
        }

        // funcion que trae todos los tipos de solicitud
        public function getTypeRequest(){
            $requests = array();
            $requests['typeRequest'] = array();

            $sql = "SELECT * FROM tipo_solicitud";
            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id"    => $row['id_tipo_solicitud'],
                    "desc"  => $row['descripcion'],
                    "abrv"  => $row['abreviacion']
                );
                array_push($requests['typeRequest'], $items);
            }
            Messages::printJSON($requests);
        }
    }
    $typeRequest = new TypeRequest();
    if(isset($_GET['request'])){
        $requestId = $_GET['request'];
        $typeRequest->setIdRequest($requestId);
        $typeRequest->getRequestTask();
    }else{
        $typeRequest->getTypeRequest();
    }


?>