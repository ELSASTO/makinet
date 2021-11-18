<?php

    Class Business extends DB{

        private $datos = array();

        public function getInfoBusiness(){
            $sql = "SELECT * FROM empresa";
            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    "id"       => $row['id'],
                    "name"     => $row['nombre_empresa'],
                    "address"  => $row['direccion'],
                    "Municipy" => $row['municipio'],
                    "city"     => $row['ciudad'],
                    "phone"    => $row['telefono'],
                    "phone2"   => $row['telefono2'],
                    "web"      => $row['pagina_web'],
                    "email"    => $row['correo'],
                    "nit"      => $row['nit'],
                );
                return $this->datos = $item;
            }
        }
    }


?>