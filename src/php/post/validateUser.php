<?php 
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    session_start();

    if(isset($_POST['user'])){
        $username = $_POST['user'];
    }
    if(isset($_POST['pass'])){
        $password = $_POST['pass'];
    }
    
    Class validateUser extends DB {

        private $username;
        private $password;
        private $randomString;


        // definicion de la variable usuario
        public function setUsername($username){
            $this->username = $username;
        }
        public function getUsername(){
            return $this->username;
        }

        // definicion de la variable password
        public function setPassword($password){
            $this->password = $password;
        }
        public function getPassword(){
            return $this->password;
        }

        // string para crear la session
        public function STRandom($length = 30){
            $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            $charactersLength = strlen($characters);
            $randomString = '';
            for ($i = 0; $i < $length; $i++) {
                $randomString .= $characters[rand(0, $charactersLength - 1)];
            }
            return $randomString;
        }

        public function validateUserLogin(){
            
            $hash_password = hash('md5', $this->password);
            $sql = "SELECT * FROM usuarios WHERE usuario = :usuario AND clave = :clave";
            $result = $this->connect()->prepare($sql);
            $result->bindParam(':usuario', $this->username, PDO::PARAM_STR);
            $result->bindParam(':clave', $hash_password, PDO::PARAM_STR);
            $result->execute();
            // echo $result->rowCount(); die();

            if($result->rowCount() == 1){
                if($row = $result->fetch()){                  
                    if($row['acceso'] == 1){
                        $_SESSION['idStrSession'] = $this->STRandom();
                        $_SESSION['tipo_usuario'] = $row['tipo_usuario'];
                        // obtener los datos del usuario que ingreso y tiene el permiso de acceso para crear las cookies
                        $sql = "SELECT id_usuario, identificacion, nombre, apellidos, correo_electronico FROM usuarios_informacion WHERE identificacion = :identificacion";
                        $result = $this->connect()->prepare($sql);
                        $result->bindParam(':identificacion', $row['usuario'], PDO::PARAM_STR);
                        $result->execute();

                        if($result->rowCount() == 1){
                            if(isset($_SESSION['idStrSession'])){
                                $data = $result->fetch(PDO::FETCH_ASSOC);
                                $_SESSION['identificacion'] = $data['identificacion'];
                                $_SESSION['username']       = $data['nombre'];
                                $_SESSION['usertlastname']  = $data['apellidos'];
                                $_SESSION['email']          = $data['correo_electronico'];
                                $_SESSION['id_usuario']     = $data['id_usuario'];

                                $message = array(
                                    'error'     => false,
                                    'message'   => 'Sign in successfully',
                                    'name'      => $data['nombre'] . ' ' . $data['apellidos'],
                                    'typeUser'  => $_SESSION['tipo_usuario']
                                );                            
                                Messages::printJSON($message);
                            }
                        }else{
                            $message = array(
                                'error'     => true,
                                'message'   => 'No se encontro el usuario',
                            );                            
                            Messages::printERROR($message);
                        }
                    }
                }
            }else{
                $message = array(
                    'error'     => true,
                    'message'   => "Doesn't Exist User"
                );                            
                Messages::printERROR($message);
            }
        }

    }

    $validateUser = new validateUser();
    $validateUser->setUsername($username);
    $validateUser->setPassword($password);
    $validateUser->validateUserLogin();
    

?>