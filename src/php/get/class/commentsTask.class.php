<?php 

    Class Comments extends DB{
        
        private $idComment;

        public function setIdCommentTask($idComment){
            $this->idComment = $idComment;
        }   
        public function getIdCommentTask(){
            return $this->idComment;
        }

        public function getCommentsTask(){

            $comments = array();
            $comments['comments'] = array();

            $sql = "SELECT id_comentario, id_solicitud, comentario, nombre, apellidos, DATE_FORMAT(fecha_comentario ,'%e of %b, %Y - %h:%i %p')fecha_comentario
                    FROM solicitudes_comentarios WHERE id_solicitud = :id ORDER BY id_comentario DESC";
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idComment]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    "id"        => $row['id_comentario'],
                    "ids"       => $row['id_solicitud'],
                    "comment"   => $row['comentario'],
                    "nombre"    => $row['nombre'],
                    "apellidos" => $row['apellidos'],
                    "initials"  => $row['nombre'][0] . $row['apellidos'][0],
                    "date"      => $row['fecha_comentario'],
                );
                array_push($comments['comments'], $item);
            }
            return $comments;
        }

    }


?>