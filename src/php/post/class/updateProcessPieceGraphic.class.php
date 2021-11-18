<?php 

    class Pieces extends DB{

        private $idPiece;
        private $statePiece;

        public function setIdPiece($idPiece){
            $this->idPiece = $idPiece;
        }

        public function getIdPiece(){
            return $this->idPiece;
        }

        public function setStatePiece($statePiece){
            $this->statePiece = $statePiece;
        }

        public function getStatePiece(){
            return $this->statePiece;
        }

        public function setPieceGraphics(){

            $response = array();

            $sql = "UPDATE piezas_digitales SET estado_pieza = '$this->statePiece' WHERE id_pieza = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idPiece]);

            if($result->rowCount() == 1){
                $response = array(
                    'error'   => false,
                    'message' => 'Estado actualizado'
                );
            }
            return $response;
        }


    }

?>