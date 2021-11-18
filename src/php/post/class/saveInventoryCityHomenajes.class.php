<?php

    class Inventory extends DB{

        private $dataInventory;
        private $idCity;

        public function setDataIventory($dataInventory){
            $this->dataInventory = $dataInventory;
        }

        public function getDataIventory(){
            return $this->dataInventory;
        }

        public function setIdCity($idCity){
            $this->idCity = $idCity;
        }

        public function getIdCity(){
            return $this->idCity;
        }

        public function saveInventoryHomenajes(){

            $sql = "SELECT IF(EXISTS(SELECT ciudad FROM homenajes_inventario WHERE ciudad = :id ),1,0) ciudad";

            $result = $this->connect()->prepare($sql);
            
            $result->execute(['id' => $this->idCity]);

            if($row = $result->fetch(PDO::FETCH_ASSOC)){
                if($row['ciudad'] == 1){ // validacion para true
                    
                    $sql = "UPDATE homenajes_inventario SET stock = '$this->dataInventory' WHERE ciudad = :id ";
                    
                    $result = $this->connect()->prepare($sql);
                    $result->execute(['id' => $this->idCity]);

                    if($result->rowCount() == 1){
                        $res = array(
                            'error' =>  false,
                            'message' => 'Se actualizo el inventario',
                        );
                        return $res;
                    }

                }else if($row['ciudad'] == 0){ // validacion para false

                    $sql = "INSERT INTO homenajes_inventario(ciudad, stock, inventario_total)
                            VALUES ('$this->idCity' , '$this->dataInventory', '0')";
                    
                    $result = $this->connect()->prepare($sql);
                    $result->execute();

                    if($result->rowCount() == 1){
                        $res = array(
                            'error' =>  false,
                            'message' => 'Se creo nuevo inventario',
                        );
                        return $res;
                    }
                }
            }


        }

    }


?>