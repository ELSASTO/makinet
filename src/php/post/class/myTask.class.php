<?php

    Class MyTask extends DB{

        private $description;
        private $estado;
        private $responsable;

        // descripción
        public function setDescription($description){
            $this->description = $description;
        }

        public function getDescription(){
            return $this->description;
        }

        // Estado
        public function setEstado($estado){
            $this->estado = $estado;
        }

        public function getEstado(){
            return $this->estado;
        }

        // Responsable
        public function setResponsable($responsable){
            $this->responsable = $responsable;
        }

        public function getResponsable(){
            return $this->responsable;
        }

        public function createTask(){
            $res = array();
            $fechaRegistro = date('Y-m-d H:i:s');

            $sql = "CALL task('$this->description','$this->estado','$this->responsable','$fechaRegistro')";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount()){
                $res = array(
                    'error' => false,
                    'message' => 'Se agrego una nueva tarea',
                );
            }else{
                $res = array(
                    'error' => true,
                    'message' => 'No se agrego la tarea',
                );
            }
            return $res;
        }

        public function getTaskUser(){

            $res = array();

            $sql = "SELECT * FROM tareas WHERE responsable_tarea = :id ORDER BY fecha_registro DESC";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->responsable]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    'id' => $row['id'],
                    'description' => $row['descripcion_tarea'],
                    'estado' => $row['estado_tarea'],
                    'fecha' => $row['fecha_registro'],                    
                );
                array_push($res, $item);
            }
            return $res;
        }
    }

?> 