<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    Class PiecesDigitalObjective extends DB{

        public function getPiecesDigitalObjective(){
            $Objectives = array();
            $Objectives['objectives'] = array();

            $sql = "SELECT * FROM piezas_digitales_objetivo";
            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id" => $row['id_objetivo'],
                    "desc" => $row['descripcion_objetivo']
                );
                array_push($Objectives['objectives'], $items);
            }
            Messages::printJSON($Objectives);
        }
    }
    $Objective = new PiecesDigitalObjective();
    $Objective->getPiecesDigitalObjective();

?>