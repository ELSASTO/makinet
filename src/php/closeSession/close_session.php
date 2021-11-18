<?php 
    ini_set("session.cookie_lifetime","7200");
    ini_set("session.gc_maxlifetime","7200");
    include_once '../messages/Messages.php';
    session_start();

    if(isset($_SESSION['idStrSession'])){
        session_destroy();
        $items = array(
            "err" => true,
            "message" => 'Close session succesfully',
        );
        Messages::printJSON($items);
    }
?>