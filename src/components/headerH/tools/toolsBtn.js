Vue.component('Tools',{
    data:() => ({
        selectedItem:'',

        style:{
            indigo: 'indigo accent-4'
        },
        btns: [
			['Large', 'lg'],
		],
        colors: ['indigo accent-4', 'error', 'teal darken-1'],
        items:[
            {title: 'Configuración cuenta',},
            {title: 'Cerrar sesión', link:'Logout()'}
        ],

        // informacion del usuario en el boton superior
        infoProfile: {
            initials:'',
            firstname: '',
            lastname: '',
            emailuser: ''
        }
    }),
    mounted(){
        this.infoUserBtn()
    },
    methods:{
        Logout(){
            fetch('../php/closeSession/close_session.php')
                .then(response => response.json())
                .then(data => {
                    if(data.err == true){
                        sessionStorage.clear();
                        window.location.href = '../../public_html/login';
                    }
                });
        },
        infoUserBtn(){
            // informacion que se muestra en el menu desplegable del boton
            if(sessionStorage.getItem('firstname') != ''){
				const firstName = sessionStorage.getItem('firstname');
				this.infoProfile.firstname = firstName
			}
            if(sessionStorage.getItem('lastname') != ''){
				const lastName = sessionStorage.getItem('lastname');
				this.infoProfile.lastname = lastName
			}
            if(sessionStorage.getItem('email') != ''){
				const email = sessionStorage.getItem('email');
				this.infoProfile.emailuser = email
			}

            // boton donde se le da clic para las opciones
            if(sessionStorage.getItem('initials') != ''){
				const initials 		= sessionStorage.getItem('initials');
				this.infoProfile.initials = initials
			}       
        }
    },
    template: /*html*/`
        <div>
            <v-menu v-for="([text, rounded], index) in btns" :key="text" :rounded="rounded" offset-y>
                <!-- Boton menu desplegable -->
                <template v-slot:activator="{ attrs, on }">
                    <v-btn icon
                        :color="colors[index]"
                        class="white--text"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-avatar color="grey lighten-4" size="48">
                            <span class="indigo--text headline"> {{ infoProfile.initials }} </span>
                        </v-avatar>
                    </v-btn>
                </template>

                <!-- lista con el menu del perfil -->
                <v-card>
                    <v-list-item-content class="justify-center">
                        <div class="mx-auto text-center">
                            <v-avatar :color="style.indigo" class="mb-2">
                                <span class="white--text headline"> {{ infoProfile.initials }} </span>
                            </v-avatar>
                            <div class="ml-3 mr-3">                    
                                <h3 class="display-1 subtitle-2"> {{ infoProfile.firstname }} <br/> {{ infoProfile.lastname }}</h3>
                                <p class="caption mt-1"> {{ infoProfile.emailuser }} </p>
                            </div>
                            <v-divider class="my-3"></v-divider>
                            <v-list-item depressed text>
                                Editar Cuenta
                            </v-list-item>
                            <v-divider class="my-3"></v-divider>
                            <v-list-item depressed text @click="Logout">
                                Cerrar sesion
                            </v-list-item>
                        </div>
                    </v-list-item-content>
                </v-card>
            </v-menu>
        </div>
    `
})