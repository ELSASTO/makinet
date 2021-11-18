<?php

Class Pedidos extends DB{

    public function getPedidos(){

        $pedidos = array();
        $pedidos['pedidos'] = array();

        $sql = "SELECT 	pd.id, pd.fecha_solicitud, pd.fecha_entrega, cl.nombre_cliente, pd.nombre_solicitante, pd.observaciones, pd.precio_venta, pd.estado
                FROM pedidos AS pd
                INNER JOIN clientes AS cl ON cl.id_cliente =  pd.cliente;";

        $result = $this->connect()->prepare($sql);
        $result->execute();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            $items = array(
                "id"                    => $row['id'],
                "fecha_solicitud"       => $row['fecha_solicitud'],
                "fecha_entrega"         => $row['fecha_entrega'],
                "cliente"               => $row['nombre_cliente'],
                "nombre_solicitante"    => $row['nombre_solicitante'],
                "descripcion"           => $row['observaciones'],
                "precio_venta"          => $row['precio_venta'],
                "estado"                => $row['estado'],
            );
            array_push($pedidos['pedidos'], $items);
        }
        return $pedidos;
    }
}

?>