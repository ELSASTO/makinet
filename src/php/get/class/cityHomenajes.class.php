<?php 

    Class CityHomenajes extends DB{
    
        public function getCitysHomenajes(){

            $citys = array();
            $citys['citys'] = array();

            $sql = "SELECT * FROM homenajes_ciudad";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    "id"        => $row['id'],
                    "city"       => $row['ciudad'],
                );
                array_push($citys['citys'], $item);
            }
            return $citys;
        }

    }


?>