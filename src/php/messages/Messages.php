<?php 

    Class Messages{
        // imprime json con los datos de la funcion
        public function printJSON($array){
            echo json_encode(
                $array ,JSON_UNESCAPED_UNICODE
            );
        }
        // imprime json con los datos de la funcion
        public function printERROR($array){
            echo json_encode(
                $array ,JSON_UNESCAPED_UNICODE
            );
        }
    }

?>