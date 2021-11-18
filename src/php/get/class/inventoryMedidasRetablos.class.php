<?php 

    Class Retablos extends DB{

        private $idRetablosCity;

        public function setIdRetablos($idRetablosCity){
            $this->idRetablosCity = $idRetablosCity;
        }
        public function getIdRetablos(){
            return $this->idRetablosCity;
        }

    
        public function getMedidasRetablosHomenajes(){

            $retablos = array();
            $retablos['retablos'] = array();

            $sql = "SELECT * FROM homenajes_retablos WHERE ciudad = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idRetablosCity]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $item = array(
                        "id"        => $row['id'],
                        "id_city"   => $row['ciudad'],
                        "medida"      => $row['medida_retablo'],                        
                    );
                    array_push($retablos['retablos'], $item);
                }
                return $retablos;
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