<?php 
    Class Order extends DB {
        private $date;
        private $date2;
        private $customer_value;
        private $nameApplicant;
        private $description;
        private $saleValue;
        private $costos;

        public function setDate($date){
            $this->date = $date;
        }
        public function getDate(){
            return $this->date;
        }
        public function setDate2($date2){
            $this->date2 = $date2;
        }
        public function getDate2(){
            return $this->date2;
        }
        public function setCustomer_value($customer_value){
            $this->customer_value = $customer_value;
        }
        public function getCustomer_value(){
            return $this->customer_value;
        }
        public function setNameApplicant($nameApplicant){
            $this->nameApplicant = $nameApplicant;
        }
        public function getNameApplicant(){
            return $this->nameApplicant;
        }
        public function setDescription($description){
            $this->description = $description;
        }
        public function getDescription(){
            return $this->description;
        }
        public function setSaleValue($saleValue){
            $this->saleValue = $saleValue;
        }
        public function getSaleValue(){
            return $this->saleValue;
        }
        
        public function createOrder($costos){
          
            $registrationDate= date('Y-m-d H:m:i');
            $sql="INSERT INTO pedidos (fecha_solicitud,fecha_entrega, cliente, nombre_solicitante, observaciones, precio_venta, estado, fecha_registro) 
                  VALUES ('$this->date','$this->date2','$this->customer_value','$this->nameApplicant','$this->description','$this->saleValue','Asignado','$registrationDate')";

            $pdo = $this->connect();
            $result = $pdo->prepare($sql);
            $result->execute();
            
            if($result->rowCount() == 1){
                $lastId = $pdo->lastInsertId();
                
                foreach($costos as $key => $value){
                    $sqlC="INSERT INTO pedidos_costos (id_pedido, descripcion, precio_unitario)
                    VALUES ('".$lastId."','".$value['descriptionCostos']."','".$value['valor']."')";

                    $result = $pdo->prepare($sqlC);
                    $result->execute();
                }
                $response = array(
                        'error'   => false,
                        'message' => 'Pedido creado correctamente ',
                        'lastId' => $lastId,
                    );    
                    
                    Messages::printJSON($response);
            }  

        }
    }
    
?>