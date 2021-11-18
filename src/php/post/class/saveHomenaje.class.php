<?php 
    
    date_default_timezone_set('America/Bogota');
    
    class Homenaje extends DB{

        private $city;
        private $dateReceived;
        private $hourReceived;
        private $dateDelivery;
        private $hourDelivery;
        private $fullName;
        private $video;
        private $trasmision;
        private $medidadRetablo;
        private $retablo;
        private $observaciones;
        private $usuario;

        // getters & setters

        // Ciudad 
        public function setCity($city){
            $this->city = $city;
        }
        public function getCity(){
            return $this->city;
        }

        // Fecha recibido 
        public function setDateReceived($dateReceived){
            $this->dateReceived = $dateReceived;
        }
        public function getDateReceived(){
            return $this->dateReceived;
        }

        // Hora recibido 
        public function setHourReceived($hourReceived){
            $this->hourReceived = $hourReceived;
        }
        public function getHourReceived(){
            return $this->hourReceived;
        }

        // Fecha entrega 
        public function setDateDelivery($dateDelivery){
            $this->dateDelivery = $dateDelivery;
        }
        public function getDateDelivery(){
            return $this->dateDelivery;
        }

        // Hora entrega 
        public function setHourDelivery($hourDelivery){
            $this->hourDelivery = $hourDelivery;
        }
        public function getHourDelivery(){
            return $this->hourDelivery;
        }

        // Nombre completo
        public function setFullName($fullName){
            $this->fullName = $fullName;
        }
        public function getFullName(){
            return $this->fullName;
        }

        // Video
        public function setVideo($video){
            $this->video = $video;
        }
        public function getVideo(){
            return $this->video;
        }

        // Trasmisión
        public function setTrasmision($trasmision){
            $this->trasmision = $trasmision;
        }
        public function getTrasmision(){
            return $this->trasmision;
        }

        // Medida Retablo
        public function setMedidaRetablo($medidadRetablo){
            $this->medidadRetablo = $medidadRetablo;
        }
        public function getMedidaRetablo(){
            return $this->medidadRetablo;
        }

        // Retablo
        public function setRetablo($retablo){
            $this->retablo = $retablo;
        }
        public function getRetablo(){
            return $this->retablo;
        }

        // Observaciones
        public function setObservaciones($observaciones){
            $this->observaciones = $observaciones;
        }
        public function getObservaciones(){
            return $this->observaciones;
        }

        // Usuario
        public function setUsuario($usuario){
            $this->usuario = $usuario;
        }
        public function getUsuario(){
            return $this->usuario;
        }

        public function saveHomenaje(){
            $dateNow = date('Y-m-d H:i:s');
            
            $sql = "INSERT INTO homenajes(ciudad, fecha_recibido, hora_recibido, fecha_entrega, hora_entrega, nombre_completo, video, trasmision, medida_retablo,
                                retablo_cantidad, observaciones, fecha_modificacion, fecha_registro, responsable)
                    VALUES ('$this->city', '$this->dateReceived', '$this->hourReceived', '$this->dateDelivery', '$this->hourDelivery', '$this->fullName', '$this->video',
                             '$this->trasmision', '$this->medidadRetablo', '$this->retablo', '$this->observaciones', '$dateNow', '$dateNow', '$this->usuario')";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount() == 1){

                if($this->retablo != 0){
                    $sql = "UPDATE homenajes_inventario SET stock = stock - $this->retablo, ventas = ventas + $this->retablo WHERE ciudad = :id";
    
                    $result = $this->connect()->prepare($sql);
                    $result->execute(['id' => $this->city]);
    
                    if($result->rowCount() == 1){
                        $res = array(
                            'error'   => false,
                            'message' => 'Se guardo correctamente el homenaje.'
                        );
                    }
                }else{
                    $res = array(
                        'error'   => false,
                        'message' => 'Se guardo correctamente el homenaje.'
                    );
                }


            }else{
                $res = array(
                    'error'   => false,
                    'message' => 'No se pudo guardar el homenaje'
                );
            }
            return $res;
        }
        public function saveCantidadHomenaje(){
            
            
        }
    }

?>