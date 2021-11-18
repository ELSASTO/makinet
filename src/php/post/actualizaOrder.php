<?php 
    date_default_timezone_set('America/Bogota');

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    if(isset($_POST['idOrder'])){
        $idOrder = $_POST['idOrder'];
    }

    if(isset($_POST['nombreSolicitante'])){
        $nombreSolicitante = $_POST['nombreSolicitante'];
    }

    if(isset($_POST['fechaEntrega'])) {
        $fechaEntrega = $_POST['fechaEntrega'];
    }

    if(isset($_POST['fechaSolicitud'])) {
        $fechaSolicitud = $_POST['fechaSolicitud'];
    }

    if(isset($_POST['descripcion'])) {
        $descripcion = $_POST['descripcion'];
    }

    if(isset($_POST['precioVenta'])) {
        $precioVenta = $_POST['precioVenta'];
    }
    if(isset($_POST['estado'])){
        $estado = $_POST['estado'];
    }

    class Actualizar extends DB {
        
        private $idOrder;
        private $nombreSolicitante;
        private $fechaEntrega;
        private $fechaSolicitud;
        private $descripcion;
        private $precioVenta;
        private $estado;

        //---------
        public function setidOrder($idOrder){
            $this->idOrder = $idOrder;
        }
        public function getidOrder(){
            return $this->idOrder;
        }

        // //-----------
        public function setNombreSolicitante($nombreSolicitante){
            $this->nombreSolicitante  = $nombreSolicitante;
        }
        public function getNombreSolicitante(){
            return $this->nombreSolicitante;
        }

        // //-----------
        public function setFechaEntrega($fechaEntrega){
            $this->fechaEntrega  = $fechaEntrega;
        }
        public function getFechaEntrega(){
            return $this->fechaEntrega;
        }

        //-----------
        public function setFechaSolicitud($fechaSolicitud){
            $this->fechaSolicitud  = $fechaSolicitud;
        }
        public function getFechaSolicitud(){
            return $this->fechaSolicitud;
        }

        //-----------
        public function setDescripcion($descripcion){
            $this->descripcion  = $descripcion;
        }
        public function getDescripcion(){
            return $this->descripcion;
        }
        //-----------
        public function setPrecioVenta($precioVenta){
            $this->precioVenta  = $precioVenta;
        }
        public function getPrecioVenta(){
            return $this->precioVenta;
        }
        //-----------
        public function setEstado($estado){
            $this->estado  = $estado;
        }
        public function getEstado(){
            return $this->estado;
        }
        //-----------

        public function actualizarficha(){
            
        
          $sql = "UPDATE pedidos
            SET  fecha_solicitud = '$this->fechaSolicitud',fecha_entrega = '$this->fechaEntrega', nombre_solicitante = '$this->nombreSolicitante', observaciones = '$this->descripcion', precio_venta = '$this->precioVenta', estado = '$this->estado'  WHERE id = :id";

             $result = $this->connect()->prepare($sql);
             $result->execute(['id' => $this->idOrder]);

            if($result->rowCount()==1){
                $response = array(
                    'error' => false,
                    'message' => 'se actualizo',
                    "id" => $this->idOrder,
                    "nombreSolicitante" => $this->nombreSolicitante,
                    "fechaEntrega" => $this->fechaEntrega,
                    "fechaSolicitud" => $this->fechaSolicitud,
                    "descripcion" => $this->descripcion,
                    "precioVenta" => $this->precioVenta,
                    "estado" => $this->estado,
                );
            
            }else{

                $response = array(
                    'error' => true,
                    'message' => 'no se pudo actualizar ',
                    
                );
            }
            return $response;
            
        } 
              
    }

    $update = new Actualizar();
    $update->setidOrder($idOrder);
    $update->setNombreSolicitante($nombreSolicitante);
    $update->setFechaEntrega($fechaEntrega);
    $update->setFechaSolicitud($fechaSolicitud);
    $update->setDescripcion($descripcion);
    $update->setPrecioVenta($precioVenta);
    $update->setEstado($estado);
    
    $response = $update->actualizarficha();
    
    Messages::printJSON($response);
     
?>