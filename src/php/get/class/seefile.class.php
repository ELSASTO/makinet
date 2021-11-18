<?php

    Class File extends DB{

        private $idfile;

        public function setIdFile($idfile){
            $this->idfile = $idfile;
        }   
        public function getIdFile(){
            return $this->idfile;
        }

        public function getFileTask(){

            $responsables = array();
            $responsables['responsables'] = array();
             
            $sql = "SELECT sr.id_solicitud, sl.nombre_actividad, tg.descripcion_garantia, cl.nombre_cliente,DATE_FORMAT(sl.fecha_registro, '%d %b de %Y')creacion, ts.descripcion,
                        tsd.descripcion_solicitud, sl.descripcion_actividad, sl.valor_total, sl.valor_cancelado, sl.valor_pendiente, ts.abreviacion,
                        CONCAT(ui.nombre,' ', ui.apellidos)responsable_actividad, sl.fecha_limite_entrega, sl.fecha_ultima_modificacion, sl.fecha_registro,
                        sl.asigna_actividad, ui.id_usuario
                    FROM solicitudes_responsables AS sr
                    INNER JOIN solicitudes AS sl ON(sl.id_solicitud = sr.id_solicitud)
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    INNER JOIN tipo_garantia AS tg ON(tg.id_garantia = sl.tipo_garantia)
                    INNER JOIN tipo_solicitud AS ts ON (ts.id_tipo_solicitud = sl.tipo_solicitud)
                    INNER JOIN tipo_solicitud_descripcion AS tsd ON (tsd.id_tipo_solicitud = sl.descripcion_solicitud)
                    INNER JOIN usuarios_informacion AS ui ON(ui.id_usuario = sr.id_responsable)
                    WHERE sl.id_solicitud = :id";
            
            $result = $this->connect()->prepare($sql);

            $result->execute(['id' => $this->idfile]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    "id"                        => $row['id_solicitud'],
                    "nombre_actividad"          => $row['nombre_actividad'],
                    "warranty"                  => $row['descripcion_garantia'],
                    "customer"                  => $row['nombre_cliente'],
                    "datecreate"                => $row['creacion'],
                    "typeRequest"               => $row['descripcion'],
                    "descRequest"               => $row['descripcion_solicitud'],
                    "activity"                  => $row['descripcion_actividad'],
                    "total"                     => $row['valor_total'],
                    "cancelado"                 => $row['valor_cancelado'],
                    "saldo"                     => $row['valor_pendiente'],
                    "abreviate"                 => $row['abreviacion'],
                    "id_liable"                 => $row['id_usuario'],
                    "liable"                    => $row['responsable_actividad'],
                    "asignActivity"             => $row['asigna_actividad'],
                    "fecha_limite_entrega"      => $row['fecha_limite_entrega'],
                    "fecha_registro"            => $row['fecha_registro'],                
                    "fecha_ultima_modificacion" => $row['fecha_ultima_modificacion']
                );
                array_push($responsables['responsables'], $item);
            }
            return $responsables;
        }
    }


?>