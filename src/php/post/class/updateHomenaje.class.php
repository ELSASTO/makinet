<?php 

    Class Homenajes extends DB{

        private $id;
        private $name;
        private $retablo;
        private $trasmision;
        private $video;
        private $medida;
        private $observaciones;

        public function setIdHomenaje($id){
            $this->id = $id;
        }
        public function getIdHomenaje(){
            return $this->id;
        }
        // ----------------------------------
        public function setName($name){
            $this->name = $name;
        }
        public function getName(){
            return $this->name;
        }
        // ----------------------------------
        public function setRetablo($retablo){
            $this->retablo = $retablo;
        }
        public function getRetablo(){
            return $this->retablo;
        }
        // ----------------------------------
        public function setTrasmision($trasmision){
            $this->trasmision = $trasmision;
        }
        public function getTrasmision(){
            return $this->trasmision;
        }
        // ----------------------------------
        public function setVideo($video){
            $this->video = $video;
        }
        public function getVideo(){
            return $this->video;
        }
        // ----------------------------------
        public function setMedida($medida){
            $this->medida = $medida;
        }
        public function getMedida(){
            return $this->medida;
        }
        // ----------------------------------
        public function setObservaciones($observaciones){
            $this->observaciones = $observaciones;
        }
        public function getObservaciones(){
            return $this->observaciones;
        }
        // ----------------------------------

        
        public function setHomenaje(){

            $homenajes = array();
            $homenajes['homenajes'] = array();

            $sql = "UPDATE homenajes SET nombre_completo = '$this->name', retablo_cantidad = '$this->retablo', medida_retablo = '$this->medida', video = '$this->video', 
                            observaciones = '$this->observaciones', trasmision = '$this->trasmision' WHERE id = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->id]);

            if($result->rowCount() == 1){
                $res = array(
                            'error' => false,
                            'message' => 'Se actualizo el homenaje.'
                        );                    
            }else{
                $res = array(
                            'error' => true,
                            'message' => 'No hay datos para actualizar.'
                    );
            }
        
            return $res;
        }

    }


?>