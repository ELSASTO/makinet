<?php

    Class ProcessActivity extends DB{

        // definicion de variables a modificar
        private $idActivity; 
        private $typeActivity;
        private $descActivity;
        private $idNewUser;

        // definicion de las funciones de las variables
        // id de la actividad a modificar
        public function setIdActivity($idActivity){
            $this->idActivity = $idActivity;
        }

        public function getIdActivity(){
            return $this->idActivity;
        }

        // tipo de solicitud
        public function setTypeActivity($typeActivity){
            $this->typeActivity = $typeActivity;
        }

        public function getTypeActivity(){
            return $this->typeActivity;
        }

        // decripcion de la solicitud
        public function setDescActivity($descActivity){
            $this->descActivity = $descActivity;
        }

        public function getDescActivity(){
            return $this->descActivity;
        }

        // decripcion de la solicitud
        public function setIdNewUser($idNewUser){
            $this->idNewUser = $idNewUser;
        }

        public function getIdNewUser(){
            return $this->idNewUser;
        }

        // funcion que cambia el proceso de la solicitud
        public function newProcessForActivity(){
            $sql = "UPDATE solicitudes 
                    SET responsable_actividad = CONCAT(responsable_actividad, ',$this->idNewUser'), tipo_solicitud = '$this->typeActivity', descripcion_solicitud = '$this->descActivity',
                        proceso_solicitud = 'Asignado'
                    WHERE id_solicitud = :id ";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idActivity]);

            if($result->rowCount()){
                $response = array(
                    'error' => false,
                    'message' => 'Se actualizo correctamente'
                );
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se pudo actualizar'
                );
            }
            return $response;
        }

        // agrega nuevo usuario al proceso de la actividad
        public function addNewUserForProcessActivity(){
            $sql = "INSERT INTO solicitudes_responsables(id_solicitud, id_responsable) 
                    VALUES ('$this->idActivity' , '$this->idNewUser')";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount()){
                $response = array(
                    'error' => false,
                    'message' => 'Se agrego nuevo usuario a la actividad'
                );
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se pudo agregar el nuevo usuario a la actividad'
                );
            }
            return $response;
        }
    }
?>