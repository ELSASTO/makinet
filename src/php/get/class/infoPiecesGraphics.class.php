<?php 


    class Pieces extends DB{

        private $idUser;
        private $idTaskPieces;

        // funcion que define el id del usuario para realizar la consulta
        public function setIdUser($idUser){
            $this->idUser = $idUser;
        }
        public function getIdUser(){
            return $this->idUser;
        }

        // funcion que define el id para obtener las piezas de acuerdo a la actividad
        public function setIdTaskPieces($idTaskPieces){
            $this->idTaskPieces = $idTaskPieces;
        }
        public function getIdTaskPieces($idTaskPieces){
            return $this->idTaskPieces;
        }

        // funcion que obtiene las piezas para los usuarios
        public function getPiecesGraphics(){

            $pieces = array();
            $pieces['pieces'] = array();

            $sql = "SELECT id_pieza, cl.nombre_cliente, fecha_publicacion, objetivo, red_social, descripcion_publicacion, copy_principal, copy_externo,
                            hashtag, menciones, palabras_clave_otro, responsable, estado_pieza, asigna_pieza
                    FROM piezas_digitales AS pd
                    INNER JOIN clientes AS cl ON(cl.id_cliente = pd.cliente)
                    WHERE responsable = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idUser]); 

            while($data = $result->fetch(PDO::FETCH_ASSOC)){
                $datos = array(
                    'id'          => $data['id_pieza'],
                    'customer'    => $data['nombre_cliente'],
                    'date'        => $data['fecha_publicacion'],
                    'objetivo'    => $data['objetivo'],
                    'social'      => $data['red_social'],
                    'descripcion' => $data['descripcion_publicacion'],
                    'copyP'       => $data['copy_principal'],
                    'copyE'       => $data['copy_externo'],
                    'hashtag'     => $data['hashtag'],
                    'menciones'   => $data['menciones'],
                    'palabras'    => $data['palabras_clave_otro'],
                    'responsable' => $data['responsable'],
                    'estado'      => $data['estado_pieza'],
                    'asignaP'     => $data['asigna_pieza'],

                );
                array_push($pieces['pieces'], $datos);
            }
            return $pieces;
        }

        // funcion que obtiene las piezas graficas para el administrador
        public function getPiecesGraphicsAdmin(){

            $pieces = array();
            $pieces['pieces'] = array();

            $sql = "SELECT id_pieza, cl.nombre_cliente, fecha_publicacion, objetivo, red_social, descripcion_publicacion, copy_principal, copy_externo,
                            hashtag, menciones, palabras_clave_otro, CONCAT(ui.nombre, ' ', ui.apellidos)responsable, estado_pieza, asigna_pieza
                    FROM piezas_digitales AS pd
                    INNER JOIN clientes AS cl ON(cl.id_cliente = pd.cliente)
                    INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = pd.responsable)";

            $result = $this->connect()->prepare($sql);
            $result->execute(); 

            while($data = $result->fetch(PDO::FETCH_ASSOC)){
                $datos = array(
                    'id'          => $data['id_pieza'],
                    'customer'    => $data['nombre_cliente'],
                    'date'        => $data['fecha_publicacion'],
                    'objetivo'    => $data['objetivo'],
                    'social'      => $data['red_social'],
                    'descripcion' => $data['descripcion_publicacion'],
                    'copyP'       => $data['copy_principal'],
                    'copyE'       => $data['copy_externo'],
                    'hashtag'     => $data['hashtag'],
                    'menciones'   => $data['menciones'],
                    'palabras'    => $data['palabras_clave_otro'],
                    'responsable' => $data['responsable'],
                    'estado'      => $data['estado_pieza'],
                    'asignaP'     => $data['asigna_pieza'],

                );
                array_push($pieces['pieces'], $datos);
            }
            return $pieces;
        }

        // funcion que obtiene las piezas relacionadas con la tarea
        public function getPiecesGraphicsAdminId(){

            $pieces = array();
            $pieces['pieces'] = array();

            $sql = "SELECT id_pieza, cl.nombre_cliente, sl.nombre_actividad, fecha_publicacion, objetivo, red_social, descripcion_publicacion, copy_principal, copy_externo,
                        hashtag, menciones, palabras_clave_otro, CONCAT(ui.nombre, ' ', ui.apellidos)responsable, estado_pieza, asigna_pieza, pd.fecha_registro
                    FROM piezas_digitales AS pd
                    INNER JOIN clientes AS cl ON(cl.id_cliente = pd.cliente)
                    INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = pd.responsable)
                    INNER JOIN solicitudes AS sl ON(sl.id_solicitud = pd.solicitud)
                    WHERE solicitud = :id ORDER BY pd.fecha_registro DESC";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idTaskPieces]); 

            while($data = $result->fetch(PDO::FETCH_ASSOC)){
                $datos = array(
                    'id'          => $data['id_pieza'],
                    'titulo'      => $data['nombre_actividad'],
                    'customer'    => $data['nombre_cliente'],
                    'date'        => $data['fecha_publicacion'],
                    'objetivo'    => $data['objetivo'],
                    'social'      => $data['red_social'],
                    'descripcion' => $data['descripcion_publicacion'],
                    'copyP'       => $data['copy_principal'],
                    'copyE'       => $data['copy_externo'],
                    'hashtag'     => $data['hashtag'],
                    'menciones'   => $data['menciones'],
                    'palabras'    => $data['palabras_clave_otro'],
                    'responsable' => $data['responsable'],
                    'estado'      => $data['estado_pieza'],
                    'asignaP'     => $data['asigna_pieza'],

                );
                array_push($pieces['pieces'], $datos);
            }
            return $pieces;
        }
    }

?> 