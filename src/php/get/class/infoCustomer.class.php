<?php

    Class Customer extends DB{

        public function setIdCustomer($idCustomer){
            $this->idCustomer = $idCustomer;
        }
        public function getIdCustomer(){
            return $this->idCustomer;
        }

        public function getInfoCustomer(){
            $sql = "CALL cliente_id(:id)";
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idCustomer]);

            if($row = $result->fetch(PDO::FETCH_ASSOC)){
                $res = array(
                    "id"       => $row['id_cliente'],
                    "name"     => $row['nombre_cliente'],
                    "address"  => $row['direccion_cliente'],
                    "municipy" => $row['municipio'],
                    "city"     => $row['ciudad'],
                    "email"    => $row['correo_cliente'],
                    "phone"   => $row['telefono_cliente'],
                    "web"      => $row['pagina_web'],
                    "nit"      => $row['nit'],
                );
                return $res;
            }
        }
        public function getInfoCustomers(){

            $customers = array();
            $customers['customers'] = array();

            $sql = "SELECT * FROM clientes";
            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $res = array(
                    "id"       => $row['id_cliente'],
                    "name"     => $row['nombre_cliente'],
                    "address"  => $row['direccion_cliente'],
                    "municipy" => $row['municipio'],
                    "city"     => $row['ciudad'],
                    "email"    => $row['correo_cliente'],
                    "phone"    => $row['telefono_cliente'],
                    "web"      => $row['pagina_web'],
                    "nit"      => $row['nit'],
                );
                array_push($customers['customers'], $res);
            }
            return $customers;

        }
    }


?>