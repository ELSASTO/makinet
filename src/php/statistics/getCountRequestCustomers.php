<?php
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';


    // clase estadisticas

    Class Statistics extends DB{

        // funcion que trae la cantidad de solicitudes por clientes los primeros 4 clientes con mas solicitudes
        public function getStatistics(){

            // estadisticas: solicitudes totales
            $sql = "SELECT COUNT(sl.id_solicitud)solicitudes, cl.nombre_cliente FROM solicitudes AS sl
                    INNER JOIN clientes AS cl ON (cl.id_cliente = sl.cliente)
                    GROUP BY cliente ORDER BY solicitudes DESC LIMIT 4";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            $statistics = array();
            $statistics['statistics'] = array();

            if($result->rowCount() > 0){
                while($data = $result->fetch(PDO::FETCH_ASSOC)){
                    $items = array(
                        'totalRequests' => $data['solicitudes'],
                        'nameCustomer'  => $data['nombre_cliente']
                    );
                    array_push($statistics['statistics'],$items);
                }
                Messages::printJSON($statistics);
            }else{
                $res = array(
                    'error'   => true,
                    'message' => 'No hay datos para visualizar.'
                );
                Messages::printJSON($res);
            }
        }
    }

    $statistics = new Statistics();
    $statistics->getStatistics();
?>