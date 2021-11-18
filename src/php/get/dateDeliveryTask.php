<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    
    Class Date extends DB{

        private $dateId;

        // definicion de variable para mostrar descripcion de solicitud editar
        public function setDateId($dateId){
            $this->dateId = $dateId;
        }
        public function getDateId(){
            return $this->dateId;
        }

        // funcion que filtra la informacion
        public function getDateTask(){
            $sql = "SELECT id_solicitud, fecha_limite_entrega FROM solicitudes WHERE id_solicitud = :date";
            $result = $this->connect()->prepare($sql);
            $result->execute(['date' => $this->dateId]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"        => $row['id_solicitud'],
                        "date"     => $row['fecha_limite_entrega'],
                    );
                }
                Messages::printJSON($items);
            }
        }
    }

    $descRequest = new Date();

    if(isset($_GET['date'])){

        $dateId = $_GET['date'];
        $descRequest->setDateId($dateId);
        $descRequest->getDateTask();

    }

?>