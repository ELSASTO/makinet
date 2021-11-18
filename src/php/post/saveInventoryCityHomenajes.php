<?php 
    
    include_once '../conexion/Conexion.php';
    include_once '../messages/Messages.php';
    include_once 'class/saveInventoryCityHomenajes.class.php';
    
    // instancia de la clase para crear usuarios de clientes
    $inventory = new Inventory();

    if(isset($_POST['city']) && isset($_POST['inventario'])){
        
        $idCity = $_POST['city'];
        $dataInventory = $_POST['inventario']; 
        
        $inventory->setIdCity($idCity);
        $inventory->setDataIventory($dataInventory);
        $response = $inventory->saveInventoryHomenajes();

        Messages::printJSON($response);
    }



?>