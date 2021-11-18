<?php 

    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    session_start();

    if(isset($_POST['passOne'])){
        $passOne = $_POST['passOne'];
    }
    if(isset($_POST['passTwo'])){
        $passTwo = $_POST['passTwo'];
    }

    $user = $_SESSION['identificacion'];
    
    Class Changepass extends DB {

        private $user;
        private $passOne;
        private $passTwo;

        // definicion de la variable usuario
        public function setUser($user){
            $this->user = $user;
        }
        public function getUser(){
            return $this->user;
        }

        // definicion de la variable password one
        public function setPassOne($passOne){
            $this->passOne = $passOne;
        }
        public function getPassOne(){
            return $this->passOne;
        }
        // definicion de la variable password two
        public function setPassTwo($passTwo){
            $this->passTwo = $passTwo;
        }
        public function getPassTwo(){
            return $this->passTwo;
        }

        public function changePassword(){
            
            if($this->passOne == $this->passTwo){
                $hash_password = hash('md5', $this->passTwo);
            }
            $sql = "UPDATE usuarios SET clave = '$hash_password' WHERE usuario = :id";
            $result = $this->connect()->prepare($sql);
            $result->execute(['id' => $this->user]);

            if($result->rowCount() == 1){
                $message = array(
                    'error'     => false,
                    'message'   => 'Change password successfully',
                );                            
                Messages::printJSON($message);
            }else{
                $message = array(
                    'error'     => true,
                    'message'   => "Doesn't change password"
                );                            
                Messages::printERROR($message);
            }
        }

    }

    $validateUser = new Changepass();
    $validateUser->setUser($user);
    $validateUser->setPassOne($passOne);
    $validateUser->setPassTwo($passTwo);
    $validateUser->changePassword();
    

?>