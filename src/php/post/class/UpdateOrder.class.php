<?php
class actualizar extends DB{
        
        private $idOrder;
        private $nombreSolicitante;
        private $fechaEntrega;
        private $fechaSolicitud;
        private $descripcion;
        private $precioVenta;
        private $estado;

        public function setidOrder($idOrder){
            $this->idOrder = $idOrder;
        }
        public function getidOrder(){
            return $this->idOrder;
        }
        //-----------
        public function setNombreSolicitante($nombreSolicitante){
            $this->nombreSolicitante  = $nombreSolicitante;
        }
        public function getNombreSolicitante(){
            return $this->nombreSolicitante;
        }
         //-----------
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
        public function updateFicha(){
            
          $sql = "UPDATE pedidos
            SET fecha_solicitud = '$this->fechaSolicitud', fecha_entrega = '$this->fechaEntrega', nombre_solicitante = '$this->nombreSolicitante', observaciones = '$this->descripcion', precio_venta = '$this->precioVenta', estado = '$this->estado'  WHERE id = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idOrder]);

            if($result->rowCount()==1){
                $response = array(
                    'error' => false,
                    'message' => 'se actualizo',
                );
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'no se pudo actualizar ',
                );
            }
    
            Messages::printJSON($response);
        } 
              
    }
?>