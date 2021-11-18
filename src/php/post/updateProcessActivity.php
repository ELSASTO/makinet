<?php 
    date_default_timezone_set('America/Bogota');

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    session_start();

    if(isset($_POST['process_value'])){
        $process_value = $_POST['process_value'];
    }

    
    Class UpdatedTask extends DB {

        private $idRequest;
        private $process_value;

        // definicion de la variable id solicitud
        public function setIdRequest($idRequest){
            $this->idRequest = $idRequest;
        }
        public function getIdRequest(){
            return $this->idRequest;
        }

        // definicion de la variable id solicitud
        public function setNewProcess($process_value){
            $this->process_value = $process_value;
        }
        public function getNewProcess(){
            return $this->process_value;
        }

       
        public function updatedTaskCustomer(){

            $sql = "UPDATE solicitudes SET proceso_solicitud = '$this->process_value' WHERE id_solicitud = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idRequest]);
            
            if($result->rowCount()){
                $message = array(
                    'error'     => false,
                    'message'   => 'Updated successfully',                   
                );                            
                Messages::printJSON($message);
            }else{
                $message = array(
                    'error'     => true,
                    'message'   => "Not updated"
                );                            
                Messages::printERROR($message);
            }

        }

    }

    $updatedProcess = new UpdatedTask();

    if(isset($_GET['id'])){
        $idRequest = $_GET['id'];
        $updatedProcess->setIdRequest($idRequest);
        $updatedProcess->setNewProcess($process_value);
        $updatedProcess->updatedTaskCustomer();
    }

?>