<?php 
    include_once '../php/time/timeSession.php';
    
    if($_SESSION['idStrSession'] == null || $_SESSION['idStrSession'] == '' ){
        header("Location:../../public_html/login");
    }
    include_once '../php/cabecera/head.php'; 
    if($_SESSION['tipo_usuario'] == 1){
        include_once '../php/cabecera/vue.php'
?>
<body>
    <div id="app">
        <v-app id="inspire">
            <!-- menu de navegacion vertical -->
            <v-navigation-drawer v-model="drawer" app>
                <!-- informacion del usuario -->
                <template v-slot:prepend>    
                    <!-- Nombre de la empresa -->
                    <div><Namebusiness/></div>
                    <v-divider></v-divider><br>
                    <!-- Informacion del usuario en el menu vertical -->
                    <div><Infouser/></div>
                </template>
                                    
                <!-- Boton accesos directos a las opciones mas utilizadas -->
                <div><Accessdirect/></div>

                <!-- Seccion de las paginas o modulos que se van a utilizar -->
                <div class="ma-3 pl-3 caption" style="color: #687992">Páginas</div>
                <div><Pages/></div>
                
                <!-- menu de navegacion para la informacion de clientes y usuarios -->
                <div class="ma-3 pl-3 caption" style="color: #687992">Información</div>
                <div><Information/></div>

                <!-- configuracion de la plataforma -->
                <div class="ma-3 pl-3 caption" style="color: #687992"> Configuracion </div>
                <div><Configurations/></div>        
            </v-navigation-drawer>

            <!-- menu de navegacion horizontal -->
            <v-app-bar app flat color="white" :style="style.header" class="ma-4 rounded-xl">
                <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title>Makinet</v-toolbar-title>
                <v-spacer></v-spacer>
                <div class="mr-3">
                    <!-- boton de notificaciones -->
                    <v-btn icon class="mr-2">
                        <Notificaciones/>
                    </v-btn>
                    <!-- boton del perfil -->
                    <v-btn icon>
                        <Tools/>
                    </v-btn>
                </div>
            </v-app-bar>

            <v-main wrap :style="style.bg_system">
		        <v-container fluid>
                    <Createcustomer/>
                </v-container>
            </v-main>
        </v-app>
    </div>

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <!-- jquery -->
    <script src="../components/jQuery.js"></script>
    <!-- lodash -->
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <!-- chart js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.0.2/chart.min.js" integrity="sha512-dnUg2JxjlVoXHVdSMWDYm2Y5xcIrJg1N+juOuRi0yLVkku/g26rwHwysJDAMwahaDfRpr1AxFz43ktuMPr/l1A==" crossorigin="anonymous"></script>
    <!-- vuejs -->
    <script src="../views/Admin/CreateCustomer.js"></script>
    
    <?php include_once '../php/cabecera/footer.php' ?>
</body>
</html>
<?php } ?> 