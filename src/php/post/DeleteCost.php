<?php 
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';

    if(isset($_POST['id']) && !empty($_POST['id'])){
        $id = $_POST['id'];
    }
    
    class Delete extends DB {
        
        private $id;
        
        public function setId($id){
            $this->id  = $id;
        }
        public function getId(){
            return $this->id;
        }
        public function DeleteCost(){
            
            $sql='DELETE FROM pedidos_costos WHERE id = :id';
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->id]);

            if($result->rowCount()){
                $response = array(
                    'error' => false,
                    'message' => 'Se elimino correctamente',
                );
            }else{
                $response = array(
                    'error' => true,
                    'message' => 'No se elimino el registro ',
                );
            }
            return $response;
        } 
    }
    $eliminar = new Delete();
    $eliminar->setId($id);
    $response = $eliminar->DeleteCost();
    Messages::printJSON($response);
?>