<?php
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    Class Statistics extends DB{

        public function getStatistics(){

            $statistics = array();
            $statistics['statistics'] = array();

            // estadisticas: solicitudes finalizadas
            $sql = "SELECT cl.nombre_cliente, COUNT(proceso_solicitud)proceso_finalizado FROM solicitudes AS sl
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    WHERE sl.cliente = cl.id_cliente 
                    AND proceso_solicitud IN (SELECT proceso_solicitud FROM solicitudes WHERE proceso_solicitud LIKE '%finalizado%')
                    GROUP BY cl.nombre_cliente, sl.proceso_solicitud";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['nombre_cliente'],
                    'count'  => $data['proceso_finalizado'],
                    'description'   => 'Finalizado',

                );
                array_push($statistics['statistics'],$items);
            }

            // estadisticas: solicitudes asignadas
            $sql = "SELECT cl.nombre_cliente, COUNT(proceso_solicitud)proceso_finalizado FROM solicitudes AS sl
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    WHERE sl.cliente = cl.id_cliente 
                    AND proceso_solicitud IN (SELECT proceso_solicitud FROM solicitudes WHERE proceso_solicitud LIKE '%asignado%')
                    GROUP BY cl.nombre_cliente, sl.proceso_solicitud";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['nombre_cliente'],
                    'count'  => $data['proceso_finalizado'],
                    'description'   => 'Finalizado',

                );
                array_push($statistics['statistics'],$items);
            }

            Messages::printJSON($statistics);
        }
    }

    $statistics = new Statistics();
    $statistics->getStatistics();
?>