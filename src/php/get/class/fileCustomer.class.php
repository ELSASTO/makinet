<?php 

    Class Garanty extends DB{

        private $idCustomergaranty;
        private $customerEdit;

        // se define la variable para filtrar clientes y posteriormente editarlos
        public function setCustomerEd($customerEdit){
            $this->customerEdit = $customerEdit;
        }
        public function getCustomerEd(){
            return $this->customerEdit;
        }
        
        // se define la variable para filtrar clientes de acuerdo al tipo de garantia
        public function setIdCustomerGaranty($idCustomergaranty){
            $this->idCustomergaranty = $idCustomergaranty;
        }
        public function getIdCustomerGaranty(){
            return $this->idCustomergaranty;
        }

        public function getCustomerEdit(){
            $sql = "SELECT so.cliente, cl.nombre_cliente FROM solicitudes AS so
                    INNER JOIN clientes AS cl ON(cl.id_cliente = so.cliente) WHERE id_solicitud = :cliente";

            $result = $this->connect()->prepare($sql);
            $result->execute(['cliente' => $this->customerEdit]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id" => $row['cliente'],
                        "desc" => $row['nombre_cliente']
                    );
                }
                Messages::printJSON($items);
            }
        }

        // funcion obtiene los clientes de acuerdo al tipo de garantia
        public function getCustomersGaranty(){
            $customers = array();
            $customers['customers'] = array();

            $sql = "SELECT ctg.id_cliente, cl.nombre_cliente, ctg.id_garantia FROM clientes_tipo_garantia AS ctg
                    JOIN clientes AS cl ON (ctg.id_cliente = cl.id_cliente)
                    WHERE id_garantia = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idCustomergaranty]);

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id" => $row['id_cliente'],
                        "desc" => $row['nombre_cliente']
                    );
                    array_push($customers['customers'], $items);
                }
                Messages::printJSON($customers);
            }            
        }
        // funcion que obtiene todo los clientes
        public function customers(){
            $customers = array();
            $customers['customers'] = array();

            $sql = "SELECT * FROM clientes";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount()){
                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"    => $row['id_cliente'],
                        "name"  => $row['nombre_cliente'],
                        "dir"   => $row['direccion_cliente'],
                        "city"  => $row['ciudad'],
                        "email" => $row['correo_cliente'],
                        "phone" => $row['telefono_cliente'],
                    );
                    array_push($customers['customers'], $items);
                }
                Messages::printJSON($customers);
            }else{
                $message = array(
                    "message" => "No se encontraron resultados."
                );
                Messages::printERROR($message);
            }
        }
    }

    $customers = new Garanty();

    if(isset($_GET['id'])){
        $idCustomergaranty = $_GET['id'];
        $customers->setIdCustomerGaranty($idCustomergaranty);
        $customers->getCustomersGaranty();
    }else if(isset($_GET['cliente'])){
        $customerEdit = $_GET['cliente'];
        $customers->setCustomerEd($customerEdit);
        $customers->getCustomerEdit();

    }else{
        $customers->customers();
    }

?>