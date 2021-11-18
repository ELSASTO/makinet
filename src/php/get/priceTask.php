<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    
    Class Price extends DB{

        private $priceTask;

        // definicion de variable para mostrar descripcion de solicitud editar
        public function setPriceId($priceTask){
            $this->priceTask = $priceTask;
        }
        public function getPriceId(){
            return $this->priceTask;
        }

        // funcion que filtra la informacion
        public function getDescPriceTask(){
            $sql = "SELECT id_solicitud, valor_total, valor_cancelado, valor_pendiente FROM solicitudes WHERE id_solicitud = :price";
            $result = $this->connect()->prepare($sql);
            $result->execute(['price' => $this->priceTask]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"        => $row['id_solicitud'],
                        "total"     => $row['valor_total'],
                        "cancelado" => $row['valor_cancelado'],
                        "saldo"     => $row['valor_pendiente'],
                    );
                }
                Messages::printJSON($items);
            }
        }
    }
    $descRequest = new Price();

    if(isset($_GET['price'])){
        $priceId = $_GET['price'];

        $descRequest->setPriceId($priceId);
        $descRequest->getDescPriceTask();
    }

?>