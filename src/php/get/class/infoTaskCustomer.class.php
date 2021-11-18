<?php

    // clase que trae las tareas del cliente para ser mostradas en toda la información del cliente
    Class Tasks extends DB{

        public function setIdCustomerToTask($idCustomer){
            $this->idCustomer = $idCustomer;
        }
        public function getIdCustomerToTask(){
            return $this->idCustomer;
        }

        // function de trae las tareas finalizadas del cliente
        public function getInfoTaskCustomerFinalizadas(){

            $taskFinal = array();
            $taskFinal['taskFinal'] = array();

            $sql = "SELECT sl.id_solicitud, sl.fecha_registro, tg.descripcion_garantia, cl.nombre_cliente, DATE_FORMAT(sl.fecha_registro, '%d %b de %Y')creacion, ts.descripcion, 
                            tsd.descripcion_solicitud, sl.descripcion_actividad, sl.valor_total, sl.valor_cancelado, sl.valor_pendiente, sl.proceso_solicitud,
                            CONCAT(ui.nombre, ' ', ui.apellidos)responsable
                    FROM solicitudes AS sl
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    INNER JOIN tipo_solicitud AS ts ON (ts.id_tipo_solicitud = sl.tipo_solicitud)
                    INNER JOIN tipo_solicitud_descripcion AS tsd ON (tsd.id_tipo_solicitud = sl.descripcion_solicitud)
                    INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = sl.responsable_actividad)
                    INNER JOIN tipo_garantia AS tg ON(tg.id_garantia = sl.tipo_garantia)
                    WHERE sl.cliente = :id AND sl.proceso_solicitud LIKE '%finalizado%' ORDER BY sl.fecha_registro DESC";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idCustomer]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $res = array(
                    "id"             => $row['id_solicitud'],
                    "descWarranty"   => $row['descripcion_garantia'],
                    "nameCustomer"   => $row['nombre_cliente'],
                    "dateCreated"    => $row['creacion'],
                    "description"    => $row['descripcion'],
                    "descRequest"    => $row['descripcion_solicitud'],
                    "descActivity"   => $row['descripcion_actividad'],
                    "valorTotal"     => $row['valor_total'],
                    "valorCanceled"  => $row['valor_cancelado'],
                    "valorPendiente" => $row['valor_pendiente'],
                    "processRequest" => $row['proceso_solicitud'],
                    "liable"        => $row['responsable'],                     
                );
                array_push($taskFinal['taskFinal'], $res);
            }
            return $taskFinal;
        }
        // function de trae las tareas Asignadas del cliente
        public function getInfoTaskCustomerAsignadas(){

            $taskFinal = array();
            $taskFinal['taskAsignada'] = array();

            $sql = "SELECT sl.id_solicitud, tg.descripcion_garantia, cl.nombre_cliente, DATE_FORMAT(sl.fecha_registro, '%d %b de %Y')creacion, ts.descripcion, 
                            tsd.descripcion_solicitud, sl.descripcion_actividad, sl.valor_total, sl.valor_cancelado, sl.valor_pendiente, sl.proceso_solicitud,
                            CONCAT(ui.nombre, ' ', ui.apellidos)responsable
                    FROM solicitudes AS sl
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    INNER JOIN tipo_solicitud AS ts ON (ts.id_tipo_solicitud = sl.tipo_solicitud)
                    INNER JOIN tipo_solicitud_descripcion AS tsd ON (tsd.id_tipo_solicitud = sl.descripcion_solicitud)
                    INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = sl.responsable_actividad)
                    INNER JOIN tipo_garantia AS tg ON(tg.id_garantia = sl.tipo_garantia)
                    WHERE sl.cliente = :id AND sl.proceso_solicitud LIKE '%asignado%'";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idCustomer]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $res = array(
                    "id"             => $row['id_solicitud'],
                    "descWarranty"   => $row['descripcion_garantia'],
                    "nameCustomer"   => $row['nombre_cliente'],
                    "dateCreated"    => $row['creacion'],
                    "description"    => $row['descripcion'],
                    "descRequest"    => $row['descripcion_solicitud'],
                    "descActivity"   => $row['descripcion_actividad'],
                    "valorTotal"     => $row['valor_total'],
                    "valorCanceled"  => $row['valor_cancelado'],
                    "valorPendiente" => $row['valor_pendiente'],
                    "processRequest" => $row['proceso_solicitud'],
                    "liable"        => $row['responsable'],                     
                );
                array_push($taskFinal['taskAsignada'], $res);
            }
            return $taskFinal;
        }

        // function de trae las tareas pendientes con otros procesos del cliente
        public function getInfoTaskCustomerPendientes(){

            $taskFinal = array();
            $taskFinal['taskPendiente'] = array();

            $sql = "SELECT sl.id_solicitud, tg.descripcion_garantia, cl.nombre_cliente, DATE_FORMAT(sl.fecha_registro, '%d %b de %Y')creacion, ts.descripcion, 
                            tsd.descripcion_solicitud, sl.descripcion_actividad, sl.valor_total, sl.valor_cancelado, sl.valor_pendiente, sl.proceso_solicitud,
                            CONCAT(ui.nombre, ' ', ui.apellidos)responsable
                    FROM solicitudes AS sl
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    INNER JOIN tipo_solicitud AS ts ON (ts.id_tipo_solicitud = sl.tipo_solicitud)
                    INNER JOIN tipo_solicitud_descripcion AS tsd ON (tsd.id_tipo_solicitud = sl.descripcion_solicitud)
                    INNER JOIN usuarios_informacion AS ui ON (ui.id_usuario = sl.responsable_actividad)
                    INNER JOIN tipo_garantia AS tg ON(tg.id_garantia = sl.tipo_garantia)
                    WHERE sl.cliente = :id AND sl.proceso_solicitud NOT LIKE '%asignado%' AND sl.proceso_solicitud NOT LIKE '%finalizado%'";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idCustomer]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $res = array(
                    "id"             => $row['id_solicitud'],
                    "descWarranty"   => $row['descripcion_garantia'],
                    "nameCustomer"   => $row['nombre_cliente'],
                    "dateCreated"    => $row['creacion'],
                    "description"    => $row['descripcion'],
                    "descRequest"    => $row['descripcion_solicitud'],
                    "descActivity"   => $row['descripcion_actividad'],
                    "valorTotal"     => $row['valor_total'],
                    "valorCanceled"  => $row['valor_cancelado'],
                    "valorPendiente" => $row['valor_pendiente'],
                    "processRequest" => $row['proceso_solicitud'],
                    "liable"        => $row['responsable'],                     
                );
                array_push($taskFinal['taskPendiente'], $res);
            }
            return $taskFinal;
        }
    }


?>