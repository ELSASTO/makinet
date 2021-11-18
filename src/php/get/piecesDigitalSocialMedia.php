<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    Class PiecesDigitalSocial extends DB{

        public function getPiecesDigitalSocial(){
            $socialMedia = array();
            $socialMedia['social'] = array();

            $sql = "SELECT * FROM piezas_digitales_social";
            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    "id" => $row['id_social_media'],
                    "desc" => $row['descripcion_social_media']
                );
                array_push($socialMedia['social'], $items);
            }
            Messages::printJSON($socialMedia);
        }
    }
    $socialMedia = new PiecesDigitalSocial();
    $socialMedia->getPiecesDigitalSocial();

?>