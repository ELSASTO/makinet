<?php 
    Class Customer extends DB {

        private $nameCustomer;
        private $addressCustomer;
        private $cityCustomer;
        private $emailCustomer;
        private $phoneCustomer;
        private $nitCustomer;
        private $webCustomer;

        // nombre de la empresa o cliente
        public function setNameCustomer($nameCustomer){
            $this->nameCustomer = $nameCustomer;
        }
        public function getNameCustomer(){
            return $this->nameCustomer;
        }

        // direccion de la empresa o cliente
        public function setAddressCustomer($addressCustomer){
            $this->addressCustomer = $addressCustomer;
        }
        public function getAddressCustomer(){
            return $this->addressCustomer;
        }

        // ciudad de la empresa o cliente
        public function setCityCustomer($cityCustomer){
            $this->cityCustomer = $cityCustomer;
        }
        public function getCityCustomer(){
            return $this->cityCustomer;
        }

        // corre electronico de la empresa o cliente
        public function setEmailCustomer($emailCustomer){
            $this->emailCustomer = $emailCustomer;
        }
        public function getEmailCustomer(){
            return $this->emailCustomer;
        }

        // telefono de la empresa o cliente
        public function setPhoneCustomer($phoneCustomer){
            $this->phoneCustomer = $phoneCustomer;
        }
        public function getPhoneCustomer(){
            return $this->phoneCustomer;
        }

        // nit de la empresa o cliente
        public function setNitCustomer($nitCustomer){
            $this->nitCustomer = $nitCustomer;
        }
        public function getNitCustomer(){
            return $this->nitCustomer;
        }

        // municipio de la empresa o cliente
        public function setWebCustomer($webCustomer){
            $this->webCustomer = $webCustomer;
        }
        public function getWebCustomer(){
            return $this->webCustomer;
        }


        public function createCustomer(){
            $sql = "INSERT INTO clientes(nombre_cliente, direccion_cliente, ciudad, correo_cliente, telefono_cliente, nit, pagina_web)
                    VALUES ('$this->nameCustomer', '$this->addressCustomer', '$this->cityCustomer', '$this->emailCustomer', 
                            '$this->phoneCustomer' , '$this->nitCustomer', '$this->webCustomer')";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount() == 1){
                $response = array(
                    'error'   => false,
                    'message' => 'Customer created sucessfully'
                );
                Messages::printJSON($response);
            }            

        }

    }
?>