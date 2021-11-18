<?php
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    date_default_timezone_set('America/Bogota'); // region para inserta fecha actual
    session_start(); // se reanuda la sesion

    if(isset($_POST['commentTask'])){
        $commentTask = $_POST['commentTask'];
    }
    
    $name = $_SESSION['username'];
    $lastName = $_SESSION['usertlastname'];

    // se crea la clase objeto comentario
    Class Comment extends DB {

        private $idcommentTask;
        private $commentTask;
        private $name;
        private $lastName;

        // definicion de la variable id task
        public function setIdTask($idcommentTask){
            $this->idcommentTask = $idcommentTask;
        }
        public function getIdTask(){
            return $this->idcommentTask;
        }
        
        // definicion de la variable comentario
        public function setCommentTask($commentTask){
            $this->commentTask = $commentTask;
        }
        public function getCommentTask(){
            return $this->commentTask;
        }

        // definicion de la variable nombre de usuario
        public function setName($name){
            $this->name = $name;
        }
        public function getName(){
            return $this->name;
        }

        // definicion de la variable apellidos usuario
        public function setLastName($lastName){
            $this->lastName = $lastName;
        }
        public function getLastName(){
            return $this->lastName;
        }


        public function addCommentTask(){
            $dateNow  = date('Y-m-d H:i:s');

            $sql = "INSERT INTO solicitudes_comentarios(id_solicitud, comentario, nombre, apellidos, fecha_comentario)
                    VALUES ('$this->idcommentTask', '$this->commentTask', '$this->name', '$this->lastName','$dateNow')";

            $result = $this->connect()->prepare($sql);
            $result->execute();
            
            if($result->rowCount() >= 1){
                $message = array(
                    'error'     => false,
                    'message'   => 'Add Comment successfully',                   
                );                            
                Messages::printJSON($message);
            }else{
                $message = array(
                    'error'     => true,
                    'message'   => 'Not add comment'
                );                            
                Messages::printERROR($message);
            }
        }

    }

    $comment = new Comment();

    if(isset($_GET['id'])){
        $idcommentTask = $_GET['id'];
        if($commentTask != ''){
            $comment->setIdTask($idcommentTask);
            $comment->setCommentTask($commentTask);
            $comment->setName($name);
            $comment->setLastName($lastName);

            $comment->addCommentTask();
        }
    }

    


?>