Vue.component('Changepassword',{
    data: () => ({

        titleModule:'Password',
        title: 'Cambiar contraseña',

        style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			deep_purple: 'deep-purple',
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			cyan: 'cyan',
			colorinput: 'cyan',
			v_card: 'box-shadow: 0px 0px 10px -2px #e0e0e0 !important;'
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
        <div class="mb-10">
            <v-row class="mt-md-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
                    <h1 class="display-1" style="color:#12263f;">{{ titleModule }}</h1>
                    <v-divider></v-divider>
				</v-col>
			</v-row>
            <v-row class="mt-md-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12" sm="12" md="6" lg="6">
                    <v-card flat outlined flat :style="style.v_card">
                        <v-card-title color="indigo">
                            <h1 class="subtitle-1" style="color:#12263f;">{{ title }}</h1>
                        </v-card-title>
                        <v-divider></v-divider>
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
                                        ></v-text-field>
                                    </v-col>                                    
                                </v-row>                                                           
                            </v-form>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="indigo accent-4" dark @click.prevent="Changepassword">
                                {{ btnchangepass }}
                            </v-btn> 
                        </v-card-actions>
                    </v-card>
				</v-col>
			</v-row>
        </div>
    `
});