<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    if(isset($_GET['id'])){
        $idActivity = $_GET['id'];
    }

    Class Warranty extends DB{
        
        private $idActivity;

        public function setIdActivity($idActivity){
            $this->idActivity = $idActivity;
        }
        public function getIdActivity(){
            return  $this->idActivity;
        }

        public function getTypeWarranty(){
            $sql = "SELECT * FROM tipo_garantia";
            $result = $this->connect()->prepare($sql);
            $result->execute();
            $warrantys = array();
            $warrantys['warranty'] = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){   
                $items = array(
                    "id"            => $row['id_garantia'],
                    "desc"   => $row['descripcion_garantia'],                       
                );
                array_push($warrantys['warranty'], $items);
            }
            Messages::printJSON($warrantys);
        }
        public function getTypeWarrantyId(){
            $sql = "SELECT sl.tipo_garantia, tg.descripcion_garantia FROM solicitudes AS sl
                    INNER JOIN tipo_garantia AS tg ON (tg.id_garantia = sl.tipo_garantia)
                    WHERE id_solicitud = :id";

            $result = $this->connect()->prepare($sql);
            $result->bindParam('id', $this->idActivity, PDO::PARAM_INT);
            $result->execute();

            $warrantys = array();
            $warrantys['warranty'] = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){   
                $items = array(
                    "id"            => $row['tipo_garantia'],
                    "desc"   => $row['descripcion_garantia'],                       
                );
                array_push($warrantys['warranty'], $items);
            }
            Messages::printJSON($warrantys);
        }
    }
    $warranty = new Warranty();

    if(isset($idActivity)){
        $warranty->setIdActivity($idActivity);
        $warranty->getTypeWarrantyId();
    }else{
        $warranty->getTypeWarranty();
    }

?>