<?php
    Class DeleteLiable extends DB{

        private $idSolicitud;
        private $idLiable;
        private $newLiables;

        // definicion variable del usuario que sera eliminado
        public function setIdSolicitud($idSolicitud){
            $this->idSolicitud = $idSolicitud;
        }
        public function getIdSolicitud(){
            return $this->idSolicitud;
        }

        // definicion variable del usuario que sera eliminado
        public function setIdLiable($idLiable){
            $this->idLiable = $idLiable;
        }
        public function getIdLiable(){
            return $this->idLiable;
        }

        // definicion variable de los nuevos usuarios
        public function setNewLiables($newLiables){
            $this->newLiables = $newLiables;
        }
        public function getNewLiables(){
            return $this->newLiables;
        }

        // elimina responsable de la actividad
        public function deleteLiableTask(){
            $sql = "CALL deleteLiable('$this->idSolicitud', :id)";
            
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idLiable]);

            if($result->rowCount()){
                $response = array(
                    'error' => true,
                    'message' => 'Se elimino correctamente'
                );
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'Se elimino correctamente'
                );
            }
            return $response;
        }
        // actualiza los responsables de la actividad
        public function updateLiablesTask(){
            $sql = "CALL updateLiables('$this->newLiables', :id)";
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idSolicitud]);

            if($result->rowCount()){
                $response = array(
                    'error' => true,
                    'message' => 'Se actualizaron los responsables'
                );
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se pudo actualizar los responsables'
                );
            }
            return $response;
        }
    }
?>