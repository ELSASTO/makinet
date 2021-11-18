<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    Class Solicitante extends DB{

        private $idCustomer;

        // variable para traer el responsable de la tarea
        public function setIdCustomer($idCustomer){
            $this->idCustomer = $idCustomer;
        }

        public function getIdCustomer(){
            return $this->idCustomer;
        }

        // function que muestra todos los responsables
        public function getSolicitanteTask(){
            $solicitante = array();
            $solicitante['solicitantes'] = array();

            $sql = "SELECT uc.id, uc.cliente, uc.nombre, uc.apellidos FROM usuarios_clientes AS uc 
                    INNER JOIN clientes AS cl ON (cl.id_cliente = uc.cliente) 
                    WHERE cliente = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idCustomer]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id" => $row['id'],
                    "customer" => $row['cliente'],
                    "desc" => $row['nombre'] . ' ' . $row['apellidos']
                );
                array_push($solicitante['solicitantes'], $items);
            }
            return $solicitante;
        }        
    }


?>