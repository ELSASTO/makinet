<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    
    Class DescRequest extends DB{

        private $idDescRequest;
        private $idDescRequestTask;

        // definicion de variable para mostrar descripcion de solicitud de acuerdo al tipo de solicitud
        public function setIdTypeRequest($idDescRequest){
            $this->idDescRequest = $idDescRequest;
        }
        public function getIdTypeRequest(){
            return $this->idDescRequest;
        }
        // definicion de variable para mostrar descripcion de solicitud editar
        public function setIdTypeRequestTask($idDescRequestTask){
            $this->idDescRequestTask = $idDescRequestTask;
        }
        public function getIdTypeRequestTask(){
            return $this->idDescRequestTask;
        }

        // funcion que trae descripcion de solicitud
        public function getDescTypeRequestTask(){
            $descRequests = array();
            $descRequests['descRequest'] = array();

            $sql = "SELECT tsd.id_tipo_solicitud, tsd.descripcion_solicitud FROM solicitudes AS so
                    INNER JOIN tipo_solicitud_descripcion AS tsd ON(tsd.id_tipo_solicitud = so.tipo_solicitud)
                    WHERE so.id_solicitud = :desc";
            $result = $this->connect()->prepare($sql);
            $result->execute(['desc' => $this->idDescRequestTask]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"    => $row['id_tipo_solicitud'],
                        "desc"  => $row['descripcion_solicitud']
                    );
                    array_push($descRequests['descRequest'], $items);
                }
                Messages::printJSON($descRequests);
            }
        }

        // funcion que filtra la informacion
        public function getDescTypeRequest(){
            $descRequests = array();
            $descRequests['descRequest'] = array();

            $sql = "SELECT * FROM tipo_solicitud_descripcion WHERE tipo_solicitud = :id";
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idDescRequest]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"    => $row['id_tipo_solicitud'],
                        "desc"  => $row['descripcion_solicitud']
                    );
                    array_push($descRequests['descRequest'], $items);
                }
                Messages::printJSON($descRequests);
            }
        }
    }
    $descRequest = new DescRequest();
    if(isset($_GET['id'])){

        $idDescRequest = $_GET['id'];
        $descRequest->setIdTypeRequest($idDescRequest);
        $descRequest->getDescTypeRequest();

    }else if(isset($_GET['desc'])){

        $idDescRequestTask = $_GET['desc'];
        $descRequest->setIdTypeRequestTask($idDescRequestTask);
        $descRequest->getDescTypeRequestTask();
    }

    

?>