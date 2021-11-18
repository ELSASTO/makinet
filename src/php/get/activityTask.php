<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    
    Class Activity extends DB{

        private $idDescRequestTask;

        // definicion de variable para mostrar descripcion de solicitud editar
        public function setActivityId($idDescRequestTask){
            $this->idDescRequestTask = $idDescRequestTask;
        }
        public function getIdTypeRequestTask(){
            return $this->idDescRequestTask;
        }

        // funcion que filtra la informacion
        public function getDescActivityTask(){
            $sql = "SELECT id_solicitud, descripcion_actividad FROM solicitudes WHERE id_solicitud = :desc";
            $result = $this->connect()->prepare($sql);
            $result->execute(['desc' => $this->idDescRequestTask]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"    => $row['id_solicitud'],
                        "desc"  => $row['descripcion_actividad']
                    );
                }
                Messages::printJSON($items);
            }
        }
    }
    $descRequest = new Activity();
    if(isset($_GET['desc'])){
        $idDescRequestTask = $_GET['desc'];
        $descRequest->setActivityId($idDescRequestTask);
        $descRequest->getDescActivityTask();
    }

?>