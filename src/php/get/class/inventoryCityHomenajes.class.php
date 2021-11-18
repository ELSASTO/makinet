<?php 

    Class Inventory extends DB{

        private $idInventoryCity;

        public function setIdInventory($idInventoryCity){
            $this->idInventoryCity = $idInventoryCity;
        }
        public function getIdInventory(){
            return $this->idInventoryCity;
        }

    
        public function getCitysHomenajes(){

            $inventory = array();
            $inventory['inventorys'] = array();

            $sql = "SELECT hi.id, hi.ciudad AS id_ciudad, hc.ciudad, hi.stock FROM homenajes_inventario AS hi
                    INNER JOIN homenajes_ciudad AS hc ON (hc.id = hi.ciudad)
                    WHERE hi.ciudad = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idInventoryCity]);

            if($result->rowCount() == 1){         
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $item = array(
                        "id"        => $row['id'],
                        "id_city"   => $row['id_ciudad'],
                        "city"      => $row['ciudad'],
                        "inventory" => $row['stock'],
                    );
                    array_push($inventory['inventorys'], $item);
                }
                return $inventory;
            }else{
                $noData = array(
                    "error"   => true,
                    "message" => 'No hay inventario para la ciudad',
                );
                return $noData;
            }
        }

    }


?>