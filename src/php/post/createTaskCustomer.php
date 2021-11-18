<?php
    date_default_timezone_set('America/Bogota');
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    session_start();

    if(isset($_POST['name_activity'])){
        $nameActivity = ucfirst(strtolower($_POST['name_activity']));
    }

    if(isset($_POST['warranty_value'])){
        $warranty = $_POST['warranty_value'];
    }
    if(isset($_POST['customer_value'])){
        $customer = $_POST['customer_value'];
    }
    if(isset($_POST['liable_value'])){
        $liable = $_POST['liable_value'];
    }
    if(isset($_POST['request_value'])){
        $request = $_POST['request_value'];
    }

    if(isset($_POST['descRequest_value'])){
        $descRequest = $_POST['descRequest_value'];
    }
    if(isset($_POST['activity'])){
        $activity = $_POST['activity'];
    }

    if(isset($_POST['countPieces_value'])){
        $countPieces = $_POST['countPieces_value'];
    }
    else{
        $countPieces = 0;
    }

    if(isset($_POST['fechaEntrega_value'])){
        if($_POST['fechaEntrega_value'] == date('Y-m-d')){
            $fechaEntrega = '0000-00-00';
        }else{
            $fechaEntrega = $_POST['fechaEntrega_value'];        
        }
    }
    else{
        $fechaEntrega = '0000-00-00';
    }

    if(isset($_POST['totalPrice'])){
        $valorTotal = $_POST['totalPrice'];
    }
    else{
        $valorTotal = 0;
    }

    if(isset($_POST['valorCancelado'])){
        $valorCancelado = $_POST['valorCancelado'];
    }
    else{
        $valorCancelado = 0;
    }

    if(isset($_POST['saldoPendiente'])){
        $saldo = $_POST['saldoPendiente'];
    }
    else{
        $saldo = '0';
    }
    
    if(isset($_POST['descOtro'])){
        $descOtro = $_POST['descOtro'];
    }
    else{
        $descOtro = 'Ninguna';
    }

    if(isset($_POST['solicitante_value'])){
        $solicitante = $_POST['solicitante_value'];
    }

    $asignaActivity = $_SESSION['username'] ." ". $_SESSION['usertlastname'];

    // print_r($_POST);die();

    
    Class CreateTask extends DB {

        private $nameActivity;
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
        private $solicitante;

         // definicion de la variable garantia
         public function setNameActivity($nameActivity){
            $this->nameActivity = $nameActivity;
        }
        public function getNameActivity(){
            return $this->nameActivity;
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

        // definicion de la variable descripcion de la solicitud
        public function setDescOtro($descOtro){
            $this->descOtro = $descOtro;
        }
        public function getDescOtro(){
            return $this->descOtro;
        }

        // definicion de la variable cantidad de pieces
        public function setCountPieces($countPieces){
            $this->countPieces = $countPieces;
        }
        public function getCountPieces(){
            return $this->countPieces;
        }

        // definicion de la variable fecha entrega
        public function setFechaEntrega($fechaEntrega){
            $this->fechaEntrega = $fechaEntrega;
        }
        public function getFechaEntrega(){
            return $this->fechaEntrega;
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

        // definicion de la variable quien asigna la actividad
        public function setAsignActivity($asignaActivity){
            $this->asignaActivity = $asignaActivity;
        }
        public function getAsignActivity(){
            return $this->asignaActivity;
        }

        // definicion de la variable solicitante de la actividad
        public function setSolicitante($solicitante){
            $this->solicitante = $solicitante;
        }
        public function getSolicitante(){
            return $this->solicitante;
        }

        public function createdTaskCustomer(){
            $pdo = $this->connect();
            $asignado = 'Asignado';
            $dateNow  = date('Y-m-d H:i:s');

            

            $sql = "INSERT INTO solicitudes(fecha_limite_entrega, nombre_actividad, responsable_actividad, solicitante_actividad, cliente, tipo_solicitud, descripcion_solicitud, descripcion_solicitud_otro, piezas_digitales, 
                                            valor_total, valor_cancelado, valor_pendiente, descripcion_actividad, proceso_solicitud, tipo_garantia, asigna_actividad,
                                            fecha_registro)
                    VALUES ('$this->fechaEntrega', '$this->nameActivity' , '".implode(',', $this->liable)."', '$this->solicitante', '$this->customer', '$this->request', '$this->descRequest',
                             '$this->descOtro', '$this->countPieces', 
                            '$this->valorTotal', '$this->valorCancelado', '$this->saldo', '$this->activity', '$asignado', '$this->warranty', '$this->asignaActivity', 
                            '$dateNow')";

            $result = $pdo->prepare($sql);
            $result->execute();
                    
            if($result->rowCount() == 1){
                                
                $lastInsertId = $pdo->lastInsertId();
                $responsables =  $this->liable;

                for($i = 0; $i < count($responsables); $i++){            
                    $sql = "INSERT INTO solicitudes_responsables(id_solicitud, id_responsable) VALUES('$lastInsertId','".$responsables[$i]."')";
                    $result = $pdo->prepare($sql);
                    $result->execute();
                }

                if($result->rowCount()){
                    $message = array(
                        'error'     => false,
                        'message'   => "Create successfully"
                    );                            
                    Messages::printJSON($message);
                }
                

            }else{
                $message = array(
                    'error'     => true,
                    'message'   => "Not created"
                );                            
                Messages::printERROR($message);
            }

        }

    }

    $createTask = new CreateTask();
    
    $createTask->setNameActivity($nameActivity);
    $createTask->setWarranty($warranty);
    $createTask->setCustomer($customer);
    $createTask->setLiable($liable);
    $createTask->setRequest($request);
    $createTask->setDescRequest($descRequest);
    $createTask->setDescOtro($descOtro);
    $createTask->setCountPieces($countPieces);
    $createTask->setFechaEntrega($fechaEntrega);
    $createTask->setValorTotal($valorTotal);
    $createTask->setValorCancelado($valorCancelado);
    $createTask->setSaldo($saldo);
    $createTask->setActivity($activity);
    $createTask->setAsignActivity($asignaActivity);
    $createTask->setSolicitante($solicitante);


    $createTask->createdTaskCustomer();
    


?>