Vue.component('Changepassword',{
    data: () => ({

        titleModule:'Password',
        title: 'Cambiar contraseña',

        // estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo accent-3',
			deep_purple: 'deep-purple',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			v_cardindigo: 'box-shadow: rgba(48, 79, 254, 0.55) 0px 9px 19px -7px !important',
			v_cardteal: 'box-shadow: rgba(29, 233, 182, 0.55) 0px 9px 19px -7px !important',
			v_cardpurple: 'box-shadow: rgba(101, 31, 255, 0.55) 0px 9px 19px -7px !important',
		},


        show1: false,
        show2: false,

        valid: false,
        loading: false,


        password: '',
        password2: '',
        btnchangepass: 'Cambiar contraseña',

        alertpass: false,

        passRules: {
            required: value => !!value || 'Contraseña requerida',
            min: v => v.length >= 8 || 'Minimo 8 carácteres',
        },
        passRules2: {
            required: value => !!value || 'Contraseña requerida',
            min: v => v.length >= 8 || 'Minimo 8 carácteres',
        },

    }),
    created(){

    },
    methods:{
        Changepassword(){
            if(this.password == '' || this.password2 == ''){
                this.$refs.form.validate();
            }else{
                if(this.password != '' || this.password2 != ''){
                    if(this.password.length > 8 && this.password2.length > 8){
                        if(this.password == this.password2){
                            fetch('../php/post/changePassword.php',{
                                method: 'POST',
                                body: data
                            })
                            .then(response => response.json())
                            .then(data => {
                                console.log(data);
                            })
                        }
                    }
                }
            }
        },
    },
    template: /*html*/`
        <div class="mb-10 pa-8">
            <v-row align="center">
				<v-col cols="12" sm="12" md="5" lg="5" xl="5">
                    <v-card flat :style="style.v_card" class="rounded-xl">
                        <v-card-title color="indigo">
                            <h1 class="subtitle-1" style="color:#12263f;">{{ title }}</h1>
                        </v-card-title>
                        <v-card-text>
                            <v-form v-model="valid" ref="form">
                                <v-row>
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <v-text-field
                                            v-model="password"
                                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[passRules.required, passRules.min]"
                                            :type="show1 ? 'text' : 'password'"
                                            label="Contraseña"
                                            hint="Debe contener más de 8 carácteres"                        
                                            @click:append="show1 = !show1"
                                            required
                                            rounded
                                            filled
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="password2"
                                            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                                            :rules="[passRules2.required, passRules2.min]"
                                            :type="show2 ? 'text' : 'password'"
                                            label="Confirmar contraseña"
                                            hint="Debe contener más de 8 carácteres"
                                            @click:append="show2 = !show2"
                                            required
                                            rounded
                                            filled
                                        ></v-text-field>
                                    </v-col>                                    
                                </v-row>                                                           
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="indigo accent-3" rounded dark @click.prevent="Changepassword">
                                {{ btnchangepass }}
                            </v-btn> 
                        </v-card-actions>
                    </v-card>
				</v-col>
			</v-row>
        </div>
    `
});