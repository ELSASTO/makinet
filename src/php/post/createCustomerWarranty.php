<?php
    date_default_timezone_set('America/Bogota');

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
 
    session_start();

    if(isset($_POST['warranty'])){
        $warranty = $_POST['warranty'];
    }

    if(isset($_POST['customer'])){
        $customer = $_POST['customer'];
    }


    Class WarrantyCustomer extends DB {

        private $warranty;
        private $customer;

        public function setWarranty($warranty){
            $this->warranty = $warranty;
        }
        public function getWarranty(){
            return $this->warranty;
        }

        public function setCustomer($customer){
            $this->customer = $customer;
        }
        public function getCustomer(){
            return $this->customer;
        }

        public function createWarrantyCustomer(){

            $sql = "SELECT id_cliente, id_garantia 
                    FROM clientes_tipo_garantia 
                    WHERE id_cliente = '$this->customer' AND id_garantia = '$this->warranty'";
            
            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount() == 1){
                $response =  array(
                    'error' => true,
                    'message' => 'Already exists warranty of customer'
                );
                Messages::printJSON($response);

            }else{
                $sql = "INSERT INTO clientes_tipo_garantia(id_cliente, id_garantia)
                        VALUES ('$this->customer','$this->warranty')";
                
                $result = $this->connect()->prepare($sql);
                $result->execute();
    
                if($result->rowCount() == 1){
                    $response =  array(
                        'error' => false,
                        'message' => 'Created warranty customer successfully'
                    );
                    Messages::printJSON($response);
                }else{
                    $response =  array(
                        'error' => true,
                        'message' => "Doesn't created to warranty"
                    );
                    Messages::printJSON($response);
                }
            }

            
        }
    }

    $warrantyCustomer = new WarrantyCustomer();

    $warrantyCustomer->setWarranty($warranty);
    $warrantyCustomer->setCustomer($customer);

    $warrantyCustomer->createWarrantyCustomer();

?>