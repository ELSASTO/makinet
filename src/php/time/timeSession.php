<?php 
    ini_set("session.cookie_lifetime","43200");
    ini_set("session.gc_maxlifetime","43200");
    session_set_cookie_params(60*60*24*14);
    session_start()
?>