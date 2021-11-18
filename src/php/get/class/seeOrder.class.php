<?php

    Class seeorder extends DB{

        public $Ordenes = array(
            'ficha' => '',
            'ordenes' => array()
        );
        

        private $idOrder;

        public function setIdOrder($idOrder){
            $this->idOrder = $idOrder;
        }   
        public function getIdOrder(){
            return $this->idOrder;
        }
        public function getOrder(){

            $sql = "SELECT  pc.id, pc.id_pedido, DATE_FORMAT(pd.fecha_solicitud,'%b %e, %Y')fecha_solicitud, DATE_FORMAT(pd.fecha_entrega,'%b %e, %Y')fecha_entrega, cl.nombre_cliente, pd.nombre_solicitante, pd.observaciones, pd.precio_venta, pd.estado, pd.fecha_registro, pc.descripcion, pc.precio_unitario 
            FROM pedidos AS pd 
            INNER JOIN clientes AS cl ON cl.id_cliente = pd.cliente 
            INNER JOIN pedidos_costos AS pc ON pc.id_pedido = pd.id
            WHERE pc.id_pedido = :id ORDER BY id_pedido ";
            
            $result = $this->connect()->prepare($sql);
            
            $result->execute(['id' => $this->idOrder]);

            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    "id"                        =>$row['id'],
                    "id_pedido"                 => $row['id_pedido'],
                    "fechaSolicitud"            => $row['fecha_solicitud'],
                    "fechaEntrega"              => $row['fecha_entrega'],
                    "nombreCliente"             => $row['nombre_cliente'],
                    "nombreSolicitante"         => $row['nombre_solicitante'],
                    "observaciones"             => $row['observaciones'],
                    "descripcion"               => $row['descripcion'],
                    "precioVenta"               => $row['precio_venta'],
                    "estado"                    => $row['estado'],
                    "precioUnitario"            => $row['precio_unitario'],
                    "fecha_registro"            => $row['fecha_registro'],
                );
                array_push($this->Ordenes['ordenes'], $item);
            }

        }
        public function getFicha(){

            $sql = "SELECT pd.id, DATE_FORMAT(pd.fecha_solicitud,'%b %e, %Y')fecha_solicitud, DATE_FORMAT(pd.fecha_entrega,'%b %e, %Y')fecha_entrega, cl.nombre_cliente, pd.nombre_solicitante, pd.observaciones, pd.precio_venta, pd.estado, pd.fecha_registro
            FROM pedidos AS pd
            INNER JOIN clientes AS cl ON cl.id_cliente =pd.cliente
            WHERE pd.id=:id; ";
            
            $result = $this->connect()->prepare($sql);
            
            $result->execute(['id' => $this->idOrder]);
            
            while($row = $result->fetch(PDO::FETCH_ASSOC)){
                $item = array(
                    "id_pedido"                 => $row['id'],
                    "fechaSolicitud"            => $row['fecha_solicitud'],
                    "fechaEntrega"              => $row['fecha_entrega'],
                    "nombreCliente"             => $row['nombre_cliente'],
                    "nombreSolicitante"         => $row['nombre_solicitante'],
                    "observaciones"             => $row['observaciones'],
                    "precioVenta"               => $row['precio_venta'],
                    "estado"                    => $row['estado'],
                    "fecha_registro"            => $row['fecha_registro'],
                );
                $this->Ordenes['ficha'] = $item;
            }
        }
        
    }

?>