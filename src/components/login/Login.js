Vue.component('loginuser',{
    data: () => ({
        valid: true,

        style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			cyan: 'cyan',
			orange: 'orange',
			deep_purple: 'deep-purple accent-4',
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: 0px 0px 10px -2px #e0e0e0 !important;'
		},
        // datos del formulario
        show1: false,

        username: '',
        password: '',

        loading: false,

        // descripción o ayuda en el campo de la contraseña
        infoPassword: 'Si no recuerdas tu contraseña, contactate con un administrador de la plataforma.',
        descMakinet: 'Makinet, es un sistema encargado de procesar y gestionar las actividades realizadas dentro de una empresa, un sistema desarrollado por: agencia manager',

        // estilos personalizados
        style:{
            bg_color: 'background-color: aliceblue',
            d_complete: 'height: 100vh',
        },

        // campos obligatorios para ingresar
        userRules:[
            v => !!v || 'Usuario requerido',
        ],
        passRules: {
            required: value => !!value || 'Contraseña requerida',
        },

        // social media
        socialMedia:[
            {link:'https://www.facebook.com', icon:'mdi-facebook mdi-36px', color:'blue'},
            {link:'https://www.instagram.com', icon:'mdi-instagram mdi-36px', color:'#C13584'},
            {link:'https://www.youtube.com', icon:'mdi-youtube mdi-36px', color:'#c4302b'},
        ],

        // mensaje de error cuando el usuario no existe
        messageError: false,
        messageErrorText: 'El <strong>usuario</strong> no esta registrado.',

        loading: false

    }),
    created(){
        // code
    },
    computed:{
        // code
    },
    methods:{
        SignIn(){
            this.loading = true;
            
            if(this.username == '' || this.password == ''){
                this.$refs.form.validate()

                setTimeout(() => {
                    this.loading = false;
                },2000);
            }else{

                const data = new FormData(document.getElementById('formLogin'))

                fetch('../src/php/post/validateUser.php',{
                    method: 'POST',
                    body: data
                })
                .then(response => response.json())
                .then(data => {
                    var tipoUsuario = data.typeUser
                    this.loading = false;

                    if(data.error == false){
                        fetch('../src/php/get/infoUser.php')
                        .then(response => response.json())
                        .then(data => {                                       
                                if(tipoUsuario == 1){
                                    window.location.href = '../src/admin/Dashboard';
                                }else if(tipoUsuario == 2){
                                    window.location.href = '../src/user/DashboardUser';
                                }else if(tipoUsuario == 3){
                                    window.location.href = '../src/customer/Dashboard';
                                }else if(tipoUsuario == 4){
                                    window.location.href = '../src/adminArea/Dashboard';
                                }
                                
                                if(typeof(Storage) !== 'undefined'){
                                    sessionStorage.setItem('firstname', data.name)
                                    sessionStorage.setItem('lastname', data.lastname)
                                    sessionStorage.setItem('nameuser', data.fullname)
                                    sessionStorage.setItem('initials', data.initials)
                                    sessionStorage.setItem('typeuser', data.typeUser)
                                    sessionStorage.setItem('email', data.email)

                                }else{
                                    console.log("Doesn't exists storage")
                                }
                            })
                            .catch(err => console.error(err))
                    }else{
                        this.messageError = true;
                        setTimeout(() => {
                            this.messageError = false;
                        }, 3000);
                    }
                })
                .catch(err => console.error(err))
            }
        }
    },
    template: /*html*/`
        <section>
            <v-container fluid>
                <v-row align="center" justify="center" :style="style.d_complete" class="pa-3">
                    <v-col cols="12" sm="12" md="5" lg="3">
                        <v-form v-model="valid" lazy-validation ref="form" id="formLogin" type="submit">
                            <v-card :style="style.v_card" flat :loading="loading"><br>
                                <v-card-title style="justify-content: center">                                    
                                    <h1 class="display-3 font-weight-thin">Makinet</h1>
                                </v-card-title>
                                <v-card-text>
                                    <div class="mb-10">
                                        <v-text-field
                                            name="user"
                                            v-model="username"
                                            :rules="userRules"
                                            label="Usuario"                                        
                                            required
                                            autofocus
                                            autocomplete="off"
                                        >
                                        </v-text-field>
                                        <v-text-field
                                            name="pass"
                                            v-model="password"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[passRules.required]"
                                            :type="show1 ? 'text' : 'password'"
                                            label="Contraseña"
                                            hint=""                                        
                                            counter
                                            @click:append="show1 = !show1"
                                            required
                                            @keyup.enter="SignIn"
                                        ></v-text-field>
                                        <span v-html="infoPassword" class="caption text-right grey--text"></span>
                                    </div>                            
                                    <v-expand-transition>
                                        <div v-show="messageError">
                                            <v-alert
                                                type="error"
                                                outlined
                                                dense   
                                            ><span v-html="messageErrorText"></span></v-alert>
                                        </div>
                                    </v-expand-transition>
                                </v-card-text>
                                <v-card-actions style="justify-content:center">
                                    <v-btn color="primary" @click.prevent="SignIn" >
                                        Ingresar
                                    </v-btn>
                                </v-card-actions>
                            </v-card>                                                        
                        </v-form><br>
                        <span v-html="descMakinet" class="caption text-right grey--text"></span>
                        <div class="mt-10 text-center">
                            <v-btn v-for="(item, index) in socialMedia" :key="index"  
                                :href="item.link" 
                                target="_blank" 
                                icon
                                class="ml-3"
                                dark
                            >
                                <v-icon :color="item.color">
                                    {{ item.icon }}
                                </v-icon>
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>                
            </v-container>
        </section>
    `
})