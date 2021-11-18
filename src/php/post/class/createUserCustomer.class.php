<?php

    date_default_timezone_set('America/Bogota');

    Class UserCustomer extends DB {

        private $customer;
        private $name;
        private $lastName;

        public function setCustomer($customer){
            $this->customer = $customer;
        }
        public function getCustomer(){
            return $this->customer;
        }

        public function setName($name){
            $this->name = $name;
        }
        public function getName(){
            return $this->name;
        }

        public function setLastName($lastName){
            $this->lastName = $lastName;
        }
        public function getLastName(){
            return $this->lastName;
        }


        public function createUserCustomer(){

            $sql = "INSERT INTO usuarios_clientes (cliente, nombre, apellidos)
                    VALUES ('$this->customer','$this->name','$this->lastName')";
            
            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount() == 1){
                $response =  array(
                    'error' => false,
                    'message' => 'User created successfull'
                );
                return $response;
            }

            
        }
    }


?>