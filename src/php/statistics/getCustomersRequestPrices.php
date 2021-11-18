<?php
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    Class Statistics extends DB{

        public function getStatistics(){

            $statistics = array();
            $statistics['statistics'] = array();

            // estadisticas: solicitudes totales
            $sql = "SELECT cl.id_cliente, COUNT(sl.id_solicitud)cantidad_solicitudes, cl.nombre_cliente, SUM(sl.valor_total)valor_total, SUM(sl.valor_pendiente)saldo FROM solicitudes AS sl
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    GROUP BY cliente ORDER BY cantidad_solicitudes DESC";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            while($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'count'    => $data['cantidad_solicitudes'],
                    'idCustomer' => $data['id_cliente'],
                    'customer' => $data['nombre_cliente'],
                    'total'    => $data['valor_total'],
                    'saldo'    => $data['saldo'],

                );
                array_push($statistics['statistics'],$items);
            }
            Messages::printJSON($statistics);
        }
    }

    $statistics = new Statistics();
    $statistics->getStatistics();
?>