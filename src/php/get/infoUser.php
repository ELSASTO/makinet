<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    session_start();

    if($_SESSION['idStrSession'] != null || $_SESSION['idStrSession'] != ''){
        $idUser = $_SESSION['identificacion'];
    }

    Class User extends DB{
        private $idUser;

        public function setIdUser($idUser){
            $this->idUser = $idUser;
        }
        public function getIdUser(){
            return $this->idUser;
        }
        public function getInfoUser(){
            $sql = "SELECT * FROM usuarios_informacion WHERE identificacion = :identificacion";
            $result = $this->connect()->prepare($sql);
            $result->bindParam(':identificacion', $this->idUser, PDO::PARAM_STR);
            $result->execute();

            if($result->rowCount() == 1){
               if($row = $result->fetch()){   
                   $infoUser = array(
                       'iduser'   => $row['id_usuario'],
                       'id'       => $row['identificacion'],
                       'initials' => $row['nombre'][0] . $row['apellidos'][0] ,
                       'fullname' => $row['nombre'] . ' ' . $row['apellidos'],
                       'name'     => $row['nombre'],
                       'lastname' => $row['apellidos'],
                       'email'    => $row['correo_electronico'],
                       'typeUser' => $row['profesion'],
                       'phone'    => $row['telefono']
                    );
                    Messages::printJSON($infoUser);
                }
            }else{
                $message = array(
                    'error'     => true,
                    'message'   => "Doesn't Exist info user"
                ); 
                Messages::printERROR($message);
            }
        }
    }

    $infoUser = new User();
    $infoUser->setIdUser($idUser);
    $infoUser->getInfoUser();

?>