<?php 

    date_default_timezone_set('America/Bogota');

    Class Comite extends DB{

        private $tema;
        private $participantes;
        private $descripcion;
        private $tareas;
        private $conclusiones;
        private $fecha;
        private $ubicacion;
        private $horaInicio;
        private $responsable;

        // tema del comite
        public function setTema($tema){
            $this->tema = $tema;
        }
        public function getTema(){
            return $this->tema;
        }

        // participantes del comite
        public function setParticipantes($participantes){
            $this->participantes = $participantes;
        }
        public function getParticipantes(){
            return $this->participantes;
        }

        // descripcion del comite
        public function setDescripcion($descripcion){
            $this->descripcion = $descripcion;
        }
        public function getDescripcion(){
            return $this->descripcion;
        }

        // tareas del comite
        public function setTareas($tareas){
            $this->tareas = $tareas;
        }
        public function getTareas(){
            return $this->tareas;
        }

        // Conclusiones del comite
        public function setConclusiones($conclusiones){
            $this->conclusiones = $conclusiones;
        }
        public function getConclusiones(){
            return $this->conclusiones;
        }

        // Fecha del comite
        public function setFecha($fecha){
            $this->fecha = $fecha;
        }
        public function getFecha(){
            return $this->fecha;
        }

        // Ubicacion del comite
        public function setUbicacion($ubicacion){
            $this->ubicacion = $ubicacion;
        }
        public function getUbicacion(){
            return $this->ubicacion;
        }

        // HoraInicio del comite
        public function setHoraInicio($horaInicio){
            $this->horaInicio = $horaInicio;
        }
        public function getHoraInicio(){
            return $this->horaInicio;
        }

        // Responsable del comite
        public function setResponsable($responsable){
            $this->responsable = $responsable;
        }
        public function getResponsable(){
            return $this->responsable;
        }

        public function createComite(){

            $horaFinal = date('H:i:s');
            $fechaRegistro = date('Y-m-d H:i:s');

            $sql = "CALL create_comite('$this->tema', '$this->ubicacion', '$this->fecha', '$this->horaInicio', '$horaFinal', '$this->participantes', '$this->descripcion', 
                                        '$this->tareas', '$this->conclusiones', '$this->responsable', '$fechaRegistro')";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount()){
                $response = array(
                    'error' => false,
                    'message' => 'Se creo el comite correctamente'
                );
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se creo el comite correctamente'
                );
            }
            return $response;
        }

    }

?> 