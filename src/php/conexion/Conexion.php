<?php 
    // ©copyright todos los derechos reservados
    // autor:  juan manuel camacho naranjo
    // contact: juanmanuel273816381@gmail.com - 3223821204
    class DB{
        private $host;
        private $db;
        private $user;
        private $password;
        private $charset;

        public function __construct(){
            $this->host     = 'agenciamanager.com';
            $this->db       = 'agencia8_makinetManager';
            $this->user     = 'agencia8';
            $this->password = '4G3NC1@#2021';
            $this->charset  = 'utf8mb4';
        }

        public function connect(){
            try{
                $connection = "mysql:host=".$this->host.";dbname=".$this->db .";charset=".$this->charset;
                $options = [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_EMULATE_PREPARES   => false,
                ];
                $pdo = new PDO($connection,$this->user,$this->password, $options);
                return $pdo;

            }catch(PDOException $e){
                print_r('Error connection: ' . $e->getMessage());
            }
        }
    }
?>