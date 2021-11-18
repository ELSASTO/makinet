<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    Class Liable extends DB{

        private $liableId;

        // variable para traer el responsable de la tarea
        public function setLiableId($liableId){
            $this->liableId = $liableId;
        }

        public function getLiableId(){
            return $this->liableId;
        }

        // function que muestra todos los responsables
        public function getLiable(){
            $liables = array();
            $liables['liables'] = array();

            $sql = "SELECT * FROM usuarios_informacion";
            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id" => $row['id_usuario'],
                    "desc" => $row['nombre'] . ' ' . $row['apellidos']
                );
                array_push($liables['liables'], $items);
            }
            Messages::printJSON($liables);
        }

        // funcion para traer al responsable de la actividad
        public function liableTask(){
            $liables = array();
            $liables['liables'] = array();

            $sql = "SELECT sr.id_responsable, ui.nombre, ui.apellidos  FROM solicitudes_responsables AS sr
                    INNER JOIN usuarios_informacion AS ui ON(ui.id_usuario = sr.id_responsable)
                    WHERE sr.id_solicitud = :liable";
                    
            $result = $this->connect()->prepare($sql);
            $result->execute(['liable' => $this->liableId]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id" => $row['id_responsable'],
                    // "desc" => $row['nombre'] . ' ' . $row['apellidos']
                );
                array_push($liables['liables'], $items);
            }
            Messages::printJSON($liables);
        }
    }
    $liable = new Liable();

    if(isset($_GET['liable'])){
        $liableId = $_GET['liable'];
        $liable->setLiableId($liableId);
        $liable->liableTask();

    }else{
        $liable->getLiable();
    }

?>