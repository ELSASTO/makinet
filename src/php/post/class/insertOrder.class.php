<?php

class insertar extenDs DB{
    
    private $idOrder;
    private $nuevoCosto;

    public function setidOrder($idOrder){
        $this->idOrder  = $idOrder;
    }
    public function getidOrder(){
        return $this->idOrder;
    }
    //-------
    public function setdescriptionCostos($descriptionCostos){
        $this->descriptionCostos  = $descriptionCostos;
    }
    public function getdescriptionCostos(){
        return $this->descriptionCostos;
    }
    //---------
    public function setvalor($valor){
        $this->valor  = $valor;
    }
    public function getvalor(){
        return $this->valor;
    }
    public function insertOrder(){
                
        
            $sql="INSERT INTO pedidos_costos (id_pedido, descripcion, precio_unitario)
            VALUES ('$this->idOrder','$this->descriptionCostos','$this->valor')";
            $result = $this->connect()->prepare($sql);
            $result ->execute();
    
        if($result->rowCount()==1){
            $response = array(
                'error' => false,
                'message' => 'se actualizo',
            );
        }else{
            $response = array(
                'error' => true,
                'message' => 'no se pudo actualizar ',
            );
        }
    
        return $response;
    }
}

?>