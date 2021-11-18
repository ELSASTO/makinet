<?php 
    date_default_timezone_set('America/Bogota');
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    session_start();


    if(isset($_POST['fechaEntrega_value'])){
        
        if($_POST['fechaEntrega_value'] == date('Y-m-d')){
            $dateDelivery = '0000-00-00';
        }else{
            $dateDelivery = $_POST['fechaEntrega_value'];
        }
    }
    else{
        $dateDelivery = '0000-00-00';
    }

    if(isset($_POST['warranty_value'])){
        $warranty = $_POST['warranty_value'];
    }

    if(isset($_POST['customer_value'])){
        $customer = $_POST['customer_value'];
    }

    if(isset($_POST['liable_value'])){
        $liable = implode(',',$_POST['liable_value']);
    }

    if(isset($_POST['request_value'])){
        $request = $_POST['request_value'];
    }

    if(isset($_POST['descRequest_value'])){
        $descRequest = $_POST['descRequest_value'];
    }
    
    if(isset($_POST['totalPrice'])){
        $valorTotal = $_POST['totalPrice'];
    }
    
    if(isset($_POST['valorCancelado'])){
        $valorCancelado = $_POST['valorCancelado'];
    }
    
    if(isset($_POST['saldoPendiente'])){
        $saldo = $_POST['saldoPendiente'];
    }
    
    if(isset($_POST['activity'])){
        $activity = $_POST['activity'];
    }
        
    Class UpdatedTask extends DB {

        private $idRequestCustomer;

        private $dateDelivery;
        private $warranty;
        private $customer;
        private $liable;
        private $request;
        private $descRequest;
        private $descOtro;
        private $countPieces;
        private $fechaEntrega;
        private $valorTotal;
        private $valorCancelado;
        private $saldo;
        private $activity;
        private $asignaActivity;

        // definicion de la variable fecha entrega
        public function setDateDelivery($dateDelivery){
            $this->dateDelivery = $dateDelivery;
        }
        public function getDateDelivery(){
            return $this->dateDelivery;
        }

        // definicion de la variable garantia
        public function setIdTask($idRequestCustomer){
            $this->idRequestCustomer = $idRequestCustomer;
        }
        public function getIdTask(){
            return $this->idRequestCustomer;
        }

        // definicion de la variable garantia
        public function setWarranty($warranty){
            $this->warranty = $warranty;
        }
        public function getWarranty(){
            return $this->warranty;
        }

        // definicion de la variable customer
        public function setCustomer($customer){
            $this->customer = $customer;
        }
        public function getCustomer(){
            return $this->customer;
        }

        // definicion de la variable responsable
        public function setLiable($liable){
            $this->liable = $liable;
        }
        public function getLiable(){
            return $this->liable;
        }

        // definicion de la variable tipo solicitud
        public function setRequest($request){
            $this->request = $request;
        }
        public function getRequest(){
            return $this->request;
        }

        // definicion de la variable descripcion de la solicitud
        public function setDescRequest($descRequest){
            $this->descRequest = $descRequest;
        }
        public function getDescRequest(){
            return $this->descRequest;
        }

        // definicion de la variable valor total
        public function setValorTotal($valorTotal){
            $this->valorTotal = $valorTotal;
        }
        public function getValorTotal(){
            return $this->valorTotal;
        }

        // definicion de la variable valor cancelado
        public function setValorCancelado($valorCancelado){
            $this->valorCancelado = $valorCancelado;
        }
        public function getValorCancelado(){
            return $this->valorCancelado;
        }

        // definicion de la variable saldo
        public function setSaldo($saldo){
            $this->saldo = $saldo;
        }
        public function getSaldo(){
            return $this->saldo;
        }

        // definicion de la variable actividad a realizar
        public function setActivity($activity){
            $this->activity = $activity;
        }
        public function getActivity(){
            return $this->activity;
        }
      
        public function updatedTaskCustomer(){

            $sql = "UPDATE solicitudes 
                    SET fecha_limite_entrega = '$this->dateDelivery', tipo_garantia = '$this->warranty', cliente = '$this->customer', responsable_actividad = '$this->liable', tipo_solicitud = '$this->request',
                        descripcion_solicitud = '$this->descRequest', valor_total = '$this->valorTotal', valor_cancelado = '$this->valorCancelado', 
                        valor_pendiente = '$this->saldo', descripcion_actividad = '$this->activity'                                                
                    WHERE id_solicitud = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idRequestCustomer]);
            
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

    $updatedTask = new UpdatedTask();

    if(isset($_GET['id'])){
        $idRequestCustomer = $_GET['id'];
        $updatedTask->setDateDelivery($dateDelivery);
        $updatedTask->setIdTask($idRequestCustomer);
        $updatedTask->setWarranty($warranty);
        $updatedTask->setCustomer($customer);
        $updatedTask->setLiable($liable);
        $updatedTask->setRequest($request);
        $updatedTask->setDescRequest($descRequest);
        $updatedTask->setValorTotal($valorTotal);
        $updatedTask->setValorCancelado($valorCancelado);
        $updatedTask->setSaldo($saldo);
        $updatedTask->setActivity($activity);
        // $updatedTask->setSolicitante($solicitante);


        $updatedTask->updatedTaskCustomer();
    }

?>