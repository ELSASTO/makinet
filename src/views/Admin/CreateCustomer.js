Vue.component('Createcustomer',{
	data:() => ({

		titleModule: 'Crear cliente',
		// estilos personalizados
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

		// card del formulario de creacion del cliente
        cardCustomer:{
            icon:'mdi-account-tie mdi-48px ',
            head: 'Task',
            title: 'Crear cliente',
            subtitle: 'Crea los clientes de acuerdo al tipo de garantia para poder asignar tareas de los clientes.',
            btn: 'Crear tarea',
            // estilos
            color_card: 'indigo',
            btnCreateCustomer: 'Crear cliente'
        },

        // card donde se crean los clientes para el tipo de garantia 
        cardWarranty:{
            title: 'Tipo de garantia',
            icon: 'mdi-text-box-check-outline mdi-48px '
        },

        // card donde se crean los usuarios clientes para asignar actividades
        cardCreateUser:{
            title: 'Crear usuarios que solicitan actividad',
        },

        // campos obligatorios para ingresar
        campsRules:[
            v => !!v || 'Asegurate de diligenciar el campo',
        ],

        // campos obligatorios para ingresar
        campsRulesW:[
            v => !!v || 'Asegurate de diligenciar el campo',
        ],

        
        // datos del formulario
        nameCustomer:'',
        addressCustomer: '',
        cityCustomer: '',
        emailCustomer: '',
        nitCustomer: '',
        webCustomer: '',
        phoneCustomer: '',
        
        // tipo de garantia para crear el cliente
        warrantys:[],
        customers:[],

        color: '',
        
        snackbar: false,
        messageCreateCustomer: '',

        snackbar2: false,
        messageCreateCustomerWarranty: '',

        // datos del formulario crear usuario clientes
        nameUser: '',
        lastNameUser: '',

        snackbar3: false,
        messageCreateUserCustomer: '',

	}),
	created(){

	},
	mounted(){
        this.typeGaranty()
        this.getcustomers()
	},
	computed:{
	},
	methods:{

        createUserCustomer(){
            if(this.nameUser == ''  || this.lastNameUser == ''){
                this.$refs.formUserCustomer.validate();
                setTimeout(()=>{
                    this.$refs.formUserCustomer.resetValidation();
                },2000)
            }else{
                const data = new FormData(document.getElementById('formUserCustomer'));
                fetch('../php/post/createUserCustomer.php',{
                    method: 'POST',
                    body: data
                })
                .then(response => response.json())
                .then(data => {
                    if(data.error == false){
                        this.$refs.formUserCustomer.reset();
                        this.color = 'green';
                        this.snackbar3 = true
                        this.messageCreateUserCustomer = 'Se creo el usuario correctamente';
                    }else{
                        this.$refs.formUserCustomer.reset();
                        this.color = 'red';
                        this.snackbar3 = true
                        this.messageCreateUserCustomer = 'No se pudo crear el usuario';
                    }
                })
                .catch(err => console.error(err));
            }
        },
        createWarrantyCustomer(){
            if(this.warrantys == '' || this.customers == '' ){
                this.$refs.warrantyCustomer.validate();
            }else{
                const data = new FormData(document.getElementById('formWarrantyCustomer'))

                fetch('../php/post/createCustomerWarranty.php',{
                    method:'POST',
                    body: data
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if(data.error == false){
                        this.color = 'green'
                        this.snackbar2 = true
                        this.messageCreateCustomerWarranty = 'Se creo la garantia para el cliente'
                        this.$refs.warrantyCustomer.reset();
                    }else if(data.error == true){
                        this.color = 'red'
                        this.snackbar2 = true
                        this.messageCreateCustomerWarranty = 'Ya existe el tipo de garantia para el cliente'
                    }
                })
            }
        },

        createCustomer(){
            const _this = this;
        
            if(this.nameCustomer == '' || this.addressCustomer == '' || this.cityCustomer == '' || this.emailCustomer == '' || this.phoneCustomer == '' ){

                this.$refs.createCustomer.validate()
                setTimeout(() => {
                    this.$refs.createCustomer.resetValidation();
                }, 3000)
            }else{
                var data = {
                    name_customer:this.nameCustomer,
                    address_customer: this.addressCustomer,
                    city_customer: this.cityCustomer,
                    email_customer: this.emailCustomer,
                    nit_customer: this.nitCustomer,
                    web_customer: this.webCustomer,
                    phone_customer: this.phoneCustomer,
                }

                $.ajax({
                    method: 'POST',
                    url: '../php/post/createCustomer.php',
                    data: data,
                    dataType: 'json',
                })
                .done(data => {
                    if(data.error == false){
                        _this.snackbar = true,
                        _this.messageCreateCustomer = 'Se creo el cliente.'
                    }
                })
                .catch(err => console.error(err))
            }

        },

        async getcustomers(){        
		    await fetch('../php/get/customers.php')
			.then(response => response.json())
			.then(data => {
                // console.log(data)
                _.forEach(data.customers, (value) => {
                    const item = {
                        value: value.id,
                        description: value.name
                    }
                    this.customers.push(item)
                })            
			})
			.catch(err => console.error(err))
		},
	

		async typeGaranty(){
			await fetch('../php/get/typeGaranty.php')
				.then(response => response.json())
				.then(data => {
					data.warranty.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.warrantys.push(item)
					})
				})
				.catch(err => console.error(err))
		},
	
	},
	template: /*html*/`
		<div class="mb-10 pa-8">          
			<v-row>
				<v-col cols="12" sm="12" md="8" lg="8" xl="8">
                    <v-form id="formCreateCustomer" ref="createCustomer">
					    <v-card flat :style="style.v_card" class="rounded-xl">
                            <v-card-title>
                                <span class="text--secondary"> Crear cliente </span> 
                            </v-card-title>					
							<v-card-text>
                                <v-row no-gutters>
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <v-text-field
                                            v-model="nameCustomer"
                                            name="name_customer"
                                            :rules="campsRules"
                                            :color="style.colorInput"
                                            prepend-icon="mdi-account-tie"
                                            placeholder="La empresa del mañana"
                                            label="Nombre empresa o cliente"
                                            rounded
                                            filled
                                            
                                        ></v-text-field>
                                        <v-row>
                                            <v-col cols="12" sm="12" md="6" lg="6">
                                                <v-text-field
                                                    v-model="nitCustomer"
                                                    name="nit_customer"
                                                    :color="style.colorInput"
                                                    prepend-icon="mdi-numeric"
                                                    placeholder="12345678-9"
                                                    label="Nit"
                                                    rounded
                                                    filled
                                                    
                                                    hide-details
                                                ></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="12" md="6" lg="6">
                                                <v-text-field
                                                    v-model="addressCustomer"
                                                    name="address_customer"
                                                    :rules="campsRules"
                                                    :color="style.colorInput"
                                                    prepend-icon="mdi-sign-direction"
                                                    placeholder="Av. 100 pre viva, calle falsa 123"
                                                    label="Direccion cliente"
                                                    rounded
                                                    filled
                                                    
                                                    hide-details
                                                ></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-col>
                                </v-row>                                
                                <v-row>                                
                                    <v-col cols="12" sm="12" md="12" lg="12" xl="12">
                                        <v-text-field
                                            v-model="cityCustomer"
                                            name="city_customer"
                                            :rules="campsRules"
                                            :color="style.colorInput"
                                            prepend-icon="mdi-city-variant-outline"
                                            placeholder="Ciudad"
                                            label="Ciudad"
                                            rounded
                                            filled
                                            
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>                                    
                                    <v-col cols="12" sm="12" md="6" lg="6">
                                        <v-text-field
                                            v-model="emailCustomer"
                                            name="email_customer"
                                            :rules="campsRules"
                                            :color="style.colorInput"
                                            prepend-icon="mdi-email-edit-outline"
                                            placeholder="juanito@example.com"
                                            label="Correo electronico"
                                            rounded
                                            filled
                                            
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12" md="6" lg="6">
                                        <v-text-field
                                            v-model="webCustomer"
                                            name="web_customer"
                                            :color="style.colorInput"
                                            prepend-icon="mdi-web"
                                            placeholder="www.example.com"
                                            label="Página web"
                                            rounded
                                            filled
                                            
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col cols="12" sm="12" md="6" lg="6">
                                        <v-text-field
                                            v-model.number="phoneCustomer"
                                            name="phone_customer"
                                            :rules="campsRules"
                                            :color="style.colorInput"
                                            prepend-icon="mdi-phone-outline"
                                            placeholder="3223821204, 3223821204"
                                            label="Telefono"
                                            hint="Si tiene mas de un telefono dividelo por comas."
                                            rounded
                                            filled
                                            
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
							</v-card-text>
							<v-card-actions>
								<v-spacer></v-spacer>
								<v-btn :color="style.indigo" rounded dark @click.prevent="createCustomer">
									{{ cardCustomer.btnCreateCustomer }}
								</v-btn>
							</v-card-actions>
                        </v-card>
                    </v-form>
					<v-snackbar
						v-model="snackbar"
                        :timeout="3000"
						class="pa-4"
						color="green accent-3"
						elevation="24"
                        rounded="pill"
					> {{ messageCreateCustomer }} </v-snackbar>
				</v-col>
				<v-col cols="12" sm="12" md="4" lg="4" xl="4">
                    <!-- card para las garantias de los clientes -->
                    <v-card flat :style="style.v_card" class="rounded-xl mb-6">
                        <v-toolbar color="deep-purple accent-4" dark flat>
                            <h1 class="subtitle-1 font-weight-normal"> {{ cardWarranty.title }} </h1>
                        </v-toolbar>
                        <v-form id="formWarrantyCustomer" ref="warrantyCustomer">                            
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <v-autocomplete
                                            name="customer"
                                            :items="customers"
                                            color="deep-purple accent-4"
                                            item-color="deep-purple accent-4"
                                            prepend-icon="mdi-file-document-edit-outline"
                                            item-text="description"
                                            item-value="value"
                                            label="Cliente"
                                            rounded
                                            filled                                        
                                        ></v-autocomplete>
                                        <v-select
                                            name="warranty"
                                            :items="warrantys"
                                            color="deep-purple accent-4"
                                            item-color="deep-purple accent-4"
                                            prepend-icon="mdi-file-document-edit-outline"
                                            item-text="description"
                                            item-value="value"
                                            label="Tipo de garantia"
                                            rounded
                                            filled
                                            hide-details
                                        ></v-select>
                                    </v-col>                                    
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="deep-purple accent-4" rounded text @click="createWarrantyCustomer" dark>
                                    Agregar
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                    <v-snackbar
						v-model="snackbar2"
                        :timeout="3000"
						class="pa-4"
						:color="color"
						elevation="24"
					> {{ messageCreateCustomerWarranty }} </v-snackbar>

                    <!-- card para crear los usuarios de los clientes -->
                    <v-card flat :style="style.v_card" class="rounded-xl">
                        <v-toolbar :color="style.indigo" dark flat>
                            <h1 class="subtitle-1 font-weight-normal"> {{ cardCreateUser.title }} </h1>
                        </v-toolbar>
                        <v-form id="formUserCustomer" ref="formUserCustomer">
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="12" md="12" lg="12">
                                        <v-autocomplete
                                            name="customer"
                                            :items="customers"
                                            prepend-icon="mdi-file-document-edit-outline"
                                            item-text="description"
                                            item-value="value"
                                            label="Cliente"
                                            rounded
                                            filled 
                                        ></v-autocomplete>
                                        <v-text-field
                                            v-model="nameUser"
                                            name="name_user"
                                            prepend-icon="mdi-account-box-outline"
                                            label="Nombre"
                                            rounded
                                            filled 
                                        ></v-text-field>
                                        <v-text-field
                                            v-model="lastNameUser"
                                            name="lastName_user"
                                            prepend-icon="mdi-account-box-outline"
                                            label="Apellidos"
                                            rounded
                                            filled
                                            hide-details
                                        ></v-text-field>
                                    </v-col>
                                </v-row>                                
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="indigo accent-4" rounded text dark @click="createUserCustomer">
                                    Agregar usuario
                                </v-btn>
                            </v-card-actions>
                        </v-form>
                    </v-card>
                    <v-snackbar
						v-model="snackbar3"
                        :timeout="3000"
						class="pa-4"
						:color="color"
						elevation="24"
					> {{ messageCreateUserCustomer }} </v-snackbar>
                </v-col>
			</v-row>
		</div>
	`
});