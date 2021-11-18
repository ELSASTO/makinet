<?php 
    ini_set("session.cookie_lifetime","7200");
    ini_set("session.gc_maxlifetime","7200");
    session_start();
    // print_r($_SESSION);die();
    if($_SESSION['idStrSession'] == null || $_SESSION['idStrSession'] == '' ){
        header("Location:../../public_html/login");
    }
    include_once '../php/cabecera/head.php'; 
    if($_SESSION['tipo_usuario'] == 4){
?>

<body>
    <div id="app">
        <v-app id="inspire">
            <!-- menu de navegacion vertical -->
            <v-navigation-drawer v-model="drawer" app color="indigo accent-3" dark>
                <!-- informacion del usuario -->
                <template v-slot:prepend>    
                    <!-- Nombre de la empresa -->
                    <div><Namebusiness/></div>
                    <!-- Informacion del usuario en el menu vertical -->
                    <div><Infouser/></div>
                </template>
                                    
                <!-- Boton accesos directos a las opciones mas utilizadas -->
                <div><Accessdirect/></div>

                <!-- Seccion de las paginas o modulos que se van a utilizar -->            
                <div class="ma-3 white--text">Páginas</div>
                <div><Pages/></div>
                           
                <!-- menu de navegacion para la informacion de clientes y usuarios -->
                <div class="ma-3 white--text">Información</div>
                <div><Information/></div>            

                <!-- configuracion de la plataforma -->
                <div class="ma-3 white--text"> Configuracion </div>
                <div><Configurations/></div>
            
            </v-navigation-drawer>

            <!-- menu de navegacion horizontal -->
            <v-app-bar app flat color="white" :style="style.header">
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
                    <Dashboard/>
                </v-container>
            </v-main>
        </v-app>
    </div>

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
     <!-- lodash -->
     <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <!-- chart js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.0.2/chart.min.js" integrity="sha512-dnUg2JxjlVoXHVdSMWDYm2Y5xcIrJg1N+juOuRi0yLVkku/g26rwHwysJDAMwahaDfRpr1AxFz43ktuMPr/l1A==" crossorigin="anonymous"></script>
    <!-- vuejs -->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.js"></script>

    <script src="../views/Admin/Dashboard.js"></script>
    
    <?php include_once '../php/cabecera/footer.php' ?>
</body>
</html>
<?php 
    }
?>