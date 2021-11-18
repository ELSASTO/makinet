<?php

    Class Statistics extends DB{

        private $idUser;

        // id del usuario para los filtros de las actividades
        public function setIdUser($idUser){
            $this->idUser = $idUser;
        }

        public function getIdUser(){
            return $this->idUser;
        }
        

        public function getStatistics(){

            $statistics = array();
            $statistics['statistics'] = array();

            // estadisticas: solicitudes totales
            $sql = "SELECT COUNT(proceso_solicitud)proceso_finalizado FROM solicitudes WHERE proceso_solicitud LIKE '%finalizado%'";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['proceso_finalizado'],
                    'description'   => 'Finalizado',

                );
                array_push($statistics['statistics'],$items);
            }

            // estadisticas: solicitudes asignadas
            $sql = "SELECT COUNT(proceso_solicitud)proceso_asignado FROM solicitudes WHERE proceso_solicitud LIKE '%asignado%'";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['proceso_asignado'],
                    'description'   => 'Asignado',

                );
                array_push($statistics['statistics'],$items);
            }

            // estadisticas: otros procesos de solicituds
            $sql = "SELECT COUNT(proceso_solicitud)proceso_asignado FROM solicitudes WHERE proceso_solicitud NOT LIKE '%finalizado%' AND  proceso_solicitud NOT LIKE '%asignado%'";

            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['proceso_asignado'],
                    'description'   => 'Otros procesos',

                );
                array_push($statistics['statistics'],$items);
            }
            if($statistics == 0){
                $res = array(
                    'error'   => true,
                    'message' => 'No hay datos para visualizar.',
                );
                return $res;
            }else{
                return $statistics;
            }
        }

        public function getStatisticsUser(){

            $statistics = array();
            $statistics['statistics'] = array();

            // estadisticas: solicitudes totales
            $sql = "SELECT COUNT(proceso_solicitud)proceso_finalizado 
                    FROM solicitudes AS so
                    INNER JOIN usuarios_informacion AS ui ON(ui.id_usuario = so.responsable_actividad)
                    WHERE proceso_solicitud LIKE '%finalizado%' AND so.responsable_actividad = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idUser]);

            if($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['proceso_finalizado'],
                    'description'   => 'Finalizado',

                );
                array_push($statistics['statistics'],$items);
            }

            // estadisticas: solicitudes asignadas
            $sql = "SELECT COUNT(proceso_solicitud)proceso_asignado
                    FROM solicitudes AS so
                    INNER JOIN usuarios_informacion AS ui ON(ui.id_usuario = so.responsable_actividad)
                    WHERE proceso_solicitud LIKE '%asignado%' AND so.responsable_actividad = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idUser]);
 
            if($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['proceso_asignado'],
                    'description'   => 'Asignado',

                );
                array_push($statistics['statistics'],$items);
            }

            // estadisticas: otros procesos de solicituds
            $sql = "SELECT COUNT(proceso_solicitud)otros_procesos
                    FROM solicitudes AS so
                    INNER JOIN usuarios_informacion AS ui ON(ui.id_usuario = so.responsable_actividad)
                    WHERE proceso_solicitud NOT LIKE '%asignado%' AND proceso_solicitud NOT LIKE '%finalizado%' AND so.responsable_actividad = :id";

            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->idUser]);

            if($data = $result->fetch(PDO::FETCH_ASSOC)){
                $items = array(
                    'process'  => $data['otros_procesos'],
                    'description'   => 'Otros procesos',

                );
                array_push($statistics['statistics'],$items);
            }
            if($statistics == 0){
                $res = array(
                    'error'   => true,
                    'message' => 'No hay datos para visualizar.',
                );
                return $res;
            }else{
                return $statistics;
            }
        }
    }
?>