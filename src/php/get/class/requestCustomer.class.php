<?php 

    Class Request extends DB{

        private $typeUser;
        private $idUser;
        
        // tipo de usuario
        public function setTypeUser($typeUser){
            $this->typeUser = $typeUser;
        }
        public function getTypeUser(){
            return $this->typeUser;
        }
        
        // id de usuario
        public function setIdUser($idUser){
            $this->idUser = $idUser;
        }
        public function getIdUser(){
            return $this->idUser;
        }  

        public function getRequest(){
            $requests = array();
            $requests['request'] = array();

            // 1 es el perfil administrador
            if($this->typeUser == 1){

                $sql = "SELECT sl.id_solicitud, cl.id_cliente, cl.nombre_cliente, tsd.descripcion_solicitud, CONCAT(ui.nombre, ' ', ui.apellidos)responsable_actividad, sl.proceso_solicitud,
                            tg.descripcion_garantia, sl.nombre_actividad
                        FROM solicitudes AS sl
                        INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                        INNER JOIN tipo_solicitud_descripcion AS tsd ON (tsd.id_tipo_solicitud = sl.descripcion_solicitud)
                        INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = sl.responsable_actividad)
                        INNER JOIN tipo_garantia AS tg ON(tg.id_garantia = sl.tipo_garantia);";

                $result = $this->connect()->prepare($sql);
                $result->execute();

                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"         => $row['id_solicitud'],
                        "id_cliente" => $row['id_cliente'],
                        "cliente"    => $row['nombre_cliente'],
                        "desc_so"    => $row['descripcion_solicitud'],
                        "liable"     => $row['responsable_actividad'],
                        "process"    => $row['proceso_solicitud'],
                        "warranty"   => $row['descripcion_garantia'],
                        "activity"   => $row['nombre_actividad'],
                    );
                    array_push($requests['request'], $items);
                }
                return $requests;

            }else if($this->typeUser == 2){ // 2 usuario de la empresa

                $sql = "SELECT sr.id_solicitud, cl.nombre_cliente, tsd.descripcion_solicitud, sl.nombre_actividad, CONCAT(ui.nombre,' ',ui.apellidos)responsable_actividad, sl.proceso_solicitud FROM solicitudes_responsables AS sr
                        INNER JOIN solicitudes AS sl ON(sl.id_solicitud = sr.id_solicitud)
                        INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                        INNER JOIN tipo_solicitud_descripcion AS tsd ON (tsd.id_tipo_solicitud = sl.descripcion_solicitud)
                        INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = sr.id_responsable)
                        INNER JOIN tipo_garantia AS tg ON(tg.id_garantia = sl.tipo_garantia)
                        WHERE ui.id_usuario = '$this->idUser'";                        

                $result = $this->connect()->prepare($sql);
                $result->execute();

                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"        => $row['id_solicitud'],
                        "cliente"   => $row['nombre_cliente'],
                        "desc_so"   => $row['descripcion_solicitud'],
                        "activity"  => $row['nombre_actividad'],
                        "resc_ac"   => $row['responsable_actividad'],
                        "process"   => $row['proceso_solicitud'],
                    );
                    array_push($requests['request'], $items);
                }
                return $requests;

            }else if($this->typeUser == 3){

                
                $sql = "SELECT sl.nombre_actividad, sl.id_solicitud, cl.nombre_cliente, sl.responsable_actividad, tsd.descripcion_solicitud, CONCAT(ui.nombre,' ',ui.apellidos)responsable, sl.proceso_solicitud,
                            tg.descripcion_garantia, sl.descripcion_actividad
                        FROM usuarios AS us
                        INNER JOIN solicitudes AS sl ON(sl.cliente = us.cliente)
                        INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                        INNER JOIN tipo_solicitud_descripcion AS tsd ON (tsd.id_tipo_solicitud = sl.descripcion_solicitud)
                        INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = responsable_actividad)
                        INNER JOIN tipo_garantia AS tg ON(tg.id_garantia = sl.tipo_garantia)";

                $result = $this->connect()->prepare($sql);
                $result->execute();

                while($row = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        "id"        => $row['id_solicitud'],
                        "cliente"   => $row['nombre_cliente'],
                        "desc_so"   => $row['descripcion_solicitud'],
                        "liable"    => $row['responsable'],
                        "resc_ac"   => $row['responsable_actividad'],
                        "process"   => $row['proceso_solicitud'],
                        "warranty"  => $row['descripcion_garantia'],
                        "activity"  => $row['nombre_actividad'],
                    );
                    array_push($requests['request'], $items);
                }
                return $requests;
            }
           
        }

        public function getTaskUser(){
            $requests = array();
            $requests['cantidad_actividades'] = array();


            $sql = "SELECT COUNT(id_solicitud)cantidad_solicitudes, 
                    (SELECT COUNT(proceso_solicitud) FROM solicitudes WHERE proceso_solicitud LIKE '%finalizado%' AND responsable_actividad = $this->idUser )finalizado,
                    (SELECT COUNT(proceso_solicitud) FROM solicitudes WHERE proceso_solicitud LIKE '%asignado%' AND responsable_actividad = $this->idUser )asignado,
                    (SELECT COUNT(proceso_solicitud) FROM solicitudes WHERE proceso_solicitud NOT LIKE '%finalizado%' AND proceso_solicitud NOT LIKE '%asignado%' AND responsable_actividad = $this->idUser)otros
                    FROM solicitudes WHERE responsable_actividad = $this->idUser ";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount()){
                $row = $result->fetch(PDO::FETCH_ASSOC);
                $item = array(
                    "finalizado" => $row['finalizado'],
                    "asignado" => $row['asignado'],
                    "otros" => $row['otros'],
                );
                array_push($requests['cantidad_actividades'], $item);
            }

            

            return $requests;
        }
    }
    