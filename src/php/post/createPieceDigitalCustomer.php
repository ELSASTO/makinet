<?php 
    date_default_timezone_set('America/Bogota');
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    session_start();

    if(isset($_POST['activity_piece'])){
        $activityPiece = $_POST['activity_piece'];
    }
    if(isset($_POST['Customer'])){
        $customer = $_POST['Customer'];
    }
    if(isset($_POST['Liable'])){
        $liable = $_POST['Liable'];
    }
    if(isset($_POST['Date'])){
        $date = $_POST['Date'];
    }
    if(isset($_POST['Objective'])){
        $objective = $_POST['Objective'];
    }
    if(isset($_POST['Social'])){
        $social = $_POST['Social'];
    }
    if(isset($_POST['Post'])){
        $post = $_POST['Post'];
    }
    if(isset($_POST['Copyprincipal'])){
        $copyprincipal = $_POST['Copyprincipal'];
    }
    if(isset($_POST['Copyexterno'])){
        $copyexterno = $_POST['Copyexterno'];
    }
    if(isset($_POST['Hashtag'])){
        $hashtag = $_POST['Hashtag'];
    }
    if(isset($_POST['Arroba'])){
        $arroba = $_POST['Arroba'];
    }
    if(isset($_POST['Keywords'])){
        $keywords = $_POST['Keywords'];
    }
    if(isset($_POST['Keywords'])){
        $keywords = $_POST['Keywords'];
    }
    if(isset($_SESSION['username']) && isset($_SESSION['usertlastname'])){
        $asignapieza = $_SESSION['username'] . $_SESSION['usertlastname'];
    }

    Class Piece extends DB {

        private $activityPiece;
        private $customer;
        private $liable;
        private $date;
        private $objective;
        private $social;
        private $post;
        private $copyprincipal;
        private $copyexterno;
        private $hashtag;
        private $arroba;
        private $keywords;
        private $estado = 'Asignado';
        private $asignapieza;

        // definicion de la variable cliente
        public function setActivityPiece($activityPiece){
            $this->activityPiece = $activityPiece;
        }
        public function getActivityPiece(){
            return $this->activityPiece;
        }

        // definicion de la variable cliente
        public function setCustomer($customer){
            $this->customer = $customer;
        }
        public function getCustomer(){
            return $this->customer;
        }

        // definicion de la variable responsable
        public function setLiable($liable){
            $this->liable = $liable;
        }
        public function getLiable(){
            return $this->liable;
        }

        // definicion de la variable fecha publicacion
        public function setDate($date){
            $this->date = $date;
        }
        public function getDate(){
            return $this->date;
        }

        // definicion de la variable objetivo de la publicacion
        public function setObjective($objective){
            $this->objective = $objective;
        }
        public function getObjective(){
            return $this->objective;
        }

        // definicion de la variable redes sociales
        public function setSocial($social){
            $this->social = $social;
        }
        public function getSocial(){
            return $this->social;
        }

        // definicion de la variable descripcion de la publicacion
        public function setPost($post){
            $this->post = $post;
        }
        public function getPost(){
            return $this->post;
        }

        // definicion de la variable copy principal
        public function setCopyprincipal($copyprincipal){
            $this->copyprincipal = $copyprincipal;
        }
        public function getCopyprincipal(){
            return $this->copyprincipal;
        }

        // definicion de la variable copy externo
        public function setCopyexterno($copyexterno){
            $this->copyexterno = $copyexterno;
        }
        public function getCopyexterno(){
            return $this->copyexterno;
        }

        // definicion de la variable hashtag
        public function setHashtag($hashtag){
            $this->hashtag = $hashtag;
        }
        public function getHashtag(){
            return $this->hashtag;
        }

        // definicion de la variable arroba
        public function setArroba($arroba){
            $this->arroba = $arroba;
        }
        public function getArroba(){
            return $this->arroba;
        }

        // definicion de la variable keywords
        public function setKeywords($keywords){
            $this->keywords = $keywords;
        }
        public function getKeywords(){
            return $this->keywords;
        }

        // definicion de la variable asigna pieza
        public function setAsign($asignapieza){
            $this->asignapieza = $asignapieza;
        }
        public function getAsign(){
            return $this->asignapieza;
        }
        
    

        public function createPiece(){
            
            $dateCurrent = date('Y-m-d H:i:s');

            $sql = "INSERT INTO piezas_digitales (cliente, fecha_publicacion, solicitud, objetivo, red_social, descripcion_publicacion, copy_principal, copy_externo,
                                                 hashtag, menciones, palabras_clave_otro, responsable, estado_pieza, asigna_pieza, fecha_registro)
                    VALUES('$this->customer','$this->date','$this->activityPiece','$this->objective','$this->social','$this->post','$this->copyprincipal','$this->copyexterno',
                            '$this->hashtag','$this->arroba','$this->keywords','$this->liable','$this->estado','$this->asignapieza','$dateCurrent')";
                            
            $result = $this->connect()->prepare($sql);
            $result->execute();

            if($result->rowCount()){
                $response = array(
                    'error'     => false,
                    'message'   => 'Se creo la pieza'
                );
                Messages::printJSON($response);
            }else{
                $response = array(
                    'error'     => false,
                    'message'   => 'No se pudo crear la pieza'
                );
                Messages::printJSON($response);
            }
        }

    }

    $piece = new Piece();

    $piece->setActivityPiece($activityPiece);
    $piece->setCustomer($customer);
    $piece->setLiable($liable);
    $piece->setDate($date);
    $piece->setObjective($objective);
    $piece->setSocial($social);
    $piece->setPost($post);
    $piece->setCopyprincipal($copyprincipal);
    $piece->setCopyexterno($copyexterno);
    $piece->setHashtag($hashtag);
    $piece->setArroba($arroba);
    $piece->setKeywords($keywords);
    $piece->setAsign($asignapieza);
    $piece->createPiece();







?> 