Vue.component('Editactivity',{
    props: {
        title: String,
    },
    data:() => ({
        titleModule: 'Activity',
        // estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			deep_purple: 'deep-purple',
			teal: 'teal accent-4',
			teal__lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			colorInput: 'teal accent-3',
			colorInput2: 'indigo'
		},

        infoCard:{
            icon:'mdi-36px mdi-file-document-edit-outline',
            head: 'Task',
            title: 'Editar Tarea',
            subtitle: 'Realiza la asignación de tareas a tus colaborares y lleva un registro de las actividades que se realizan dentro de la epresa.',
            btnEdit: 'Editar tarea',
            color_card: 'indigo'
        },

        // campos obligatorios para ingresar
        campsRules:[
            v => !!v || 'Seleccionar al menos un dato',
        ],
		commentrules:[
            v => !!v || 'Asegurate de escribir tu comentario',
		],

        items:[
            {
                text: 'Volver',
                disabled: false,
                href: 'RequestCustomer'
            },
            {
                text: 'Editar tarea',
                disabled: true,
                href: ''
            }
        ],

		loading: false,

		// barra de progreso de la tarea
		procesoSolicitud: [],
		procesoActual: null,

		// mensaje proceso de la solicitud
		snackbarProcess: false,
		messageUpdatedProcess: '',
		
        warrantys:[],
        warranty: null,

        customers:[],
        customer: null,

        liables:[],
        liable: [],

        requests:[],
        request: null,

		descRequest:[],
		descriptionrequest: null,

		activity: '',

		// Precios para la actividad
		checkBoxPrice: true,
		showPrice: true,
		showPriceComponent: false,

		priceTotal:'',
		priceCanceled:'',
		saldo:'',


		// fecha de la actividad
		fechaEntrega: false,
		date: new Date().toISOString().substr(0, 10),
		menu: false,

		showfechaEntrega: false,
		fechaEntrega: '',
		
    }),
	computed:{
		saldoPrice(){
			return (this.saldo = this.priceTotal - this.priceCanceled) 
		},
	},
    methods:{

		// obtener el proceso actual de la actividad para que luego se muestre en el select
		async getProcessRequest(){
			await fetch('../php/get/processRequest.php/?pr='+ this.title) // pr = proceso de la solicitud
			.then(response => response.json())
			.then(data => {
				this.procesoActual = data.proceso_actual
			})	
		},

		// funcion que obtiene el tipo de garantia
        async typeWarranty(){
            // console.log(this.title);
            await fetch('../php/get/typeGaranty.php')
                .then(response => response.json())
                .then(data => {
					_.forEach(data.warranty, (value) => {
						const item = {
                            value: value.id,
                            description: value.desc
                        }
                        this.warrantys.push(item)
					})            
                    fetch('../php/get/typeGaranty.php/?id='+this.title)
                    .then(response => response.json())
                    .then(data => {
                        this.warranty = data.warranty[0].id
                    })                    
                })
        },
		// funcion que obtiene los clientes y el cliente a editar
        async getcustomer(){
			this.customers = [];
			await fetch('../php/get/customers.php')
				.then(response => response.json())
				.then(data => {
					_.forEach(data.customers, (value) => {
						const item = {
							value: value.id,
							description: value.name
						}
						this.customers.push(item)
					})
                    fetch('../php/get/customers.php/?cliente='+ this.title)
                    .then(response => response.json())
                    .then(data => {
                        this.customer = data.id
                    })
                    .catch(err => console.error(err))
				})
				.catch(err => console.error(err))
		},
		// funcion que trae el responsable
        async getliables(){
			await fetch('../php/get/liable.php')
				.then(response => response.json())
				.then(data => {
					_.forEach(data.liables, (value) => {
						const item = {
							value: value.id,
							description: value.desc
						}
						this.liables.push(item)
					})
                    fetch('../php/get/liable.php/?liable='+this.title)
                    .then(response => response.json())
                    .then(data => {
                        _.forEach(data.liables, value => {
							this.liable.push(value.id);
						})
                    })
                    .catch(err => console.error(err))
				})
				.catch(err => console.error(err))
		},

		// funcion que trae el tipo de solicitud
        async typeRequest(){
			await fetch('../php/get/typeRequest.php')
				.then(response => response.json())
				.then(data => {
                    _.forEach(data.typeRequest, (value) => {
                        const item = {
                            value: value.id,
					 		description: value.desc
                        }
						this.requests.push(item)
                    });
					// tipo de solicitud
					fetch('../php/get/typeRequest.php/?request='+ this.title)
                    .then(response => response.json())
                    .then(data => {

                        this.request = data.typeRequest[0].id

						// consulta el proceso de acuerdo al tipo de solicitud
						fetch('../php/get/processRequest?id='+this.request)
						.then(response => response.json())
						.then(data => {
							_.forEach(data.process, (value) => {
								const item = {
									id: value.id, 
									tipo_proceso: value.tipo_proceso, 
									desc_proceso: value.desc_proceso
								}
								this.procesoSolicitud.push(item);
							})							
						})
                    })
                    .catch(err => console.error(err))
				})
				.catch(err => console.error(err))
		},

		// funcion que trae todas las descripciones de solicitud
		async descTypeRequest(param){
			this.descRequest = [];
			await fetch('../php/get/descTypeRequest.php/?id='+ param)
				.then(response => response.json())
				.then(data => {
					_.forEach(data.descRequest, (value) => {
						const item = {
							value: value.id,
							description: value.desc
						}
						this.descRequest.push(item)
					})
				})
				.catch(err => console.error(err))
		},

		// funcion que trae la descripcion de la solicitud
		async descTypeRequestVal(){
			this.descRequest = [];
			await fetch('../php/get/descTypeRequest.php/?desc='+ this.title)
				.then(response => response.json())
				.then(data => {
					_.forEach(data.descRequest, (value) => {
						const item = {
							value: value.id,
							description: value.desc
						}
						this.descriptionrequest = value.id
						this.descRequest.push(item)
					})
				})
				.catch(err => console.error(err))
		},
		// funcion que trae la descripción de la actividad
		async descActivity(){
			await fetch('../php/get/activityTask.php/?desc='+ this.title)
				.then(response => response.json())
				.then(data => {					
					tinyMCE.get('descriptionActivity').setContent(data.desc)
				})
		},

		// funcion que trae los precios de la actividad
		async priceTask(){
			await fetch('../php/get/priceTask.php/?price='+ this.title)
				.then(response => response.json())
				.then(data => {
					if(data){
						this.showPriceComponent = true
						this.priceTotal = data.total
						this.priceCanceled = data.cancelado
						this.saldo = data.saldo
					}else{
						this.showPriceComponent = false						
					}
				})
		},

		// funcion que trae la fecha de la actividad
		async dateTask(){
			await fetch('../php/get/dateDeliveryTask.php/?date='+ this.title)
				.then(response => response.json())
				.then(data => {
					if (data.date == '0000-00-00'){
						this.showfechaEntrega = false
					}else{
						this.showfechaEntrega = true
						this.fechaEntrega = moment(data.date).format('MMMM Do YYYY')
						this.date = data.date
					}
				})
		},
		// ver ficha de la tarea
		seeFile() {        
            window.location.href = 'SeeFile?id=' + this.title
        },

		// actualiza el estado de la solicitud
		async updatedProcessActivity(){

			const data = new FormData(document.getElementById('formProcess'))

			await fetch('../php/post/updateProcessActivity.php/?id='+this.title,{
				method: 'POST',
				body: data
			})
			.then(response => response.json())
			.then(data => {
				if(data.error == false){
					this.snackbarProcess = true
					this.messageUpdatedProcess = 'Se actualizo el estado de la solicitud'
				}
			})
		},

		// funcion para editar la actividad
		updatedActivity(){
			this.loading = true;
			var _this =  this;

			var data = {
				fechaEntrega_value: this.date,
				warranty_value: this.warranty,
				customer_value: this.customer,
				liable_value: this.liable,
				request_value: this.request,
				descRequest_value: this.descriptionrequest,
				totalPrice: this.priceTotal,
				valorCancelado: this.priceCanceled,
				saldoPendiente: this.saldo,
				activity: tinyMCE.get('descriptionActivity').getContent()
			}

			$.ajax({
				method: 'POST',
				url: '../php/post/updateTaskCustomer.php/?id='+ this.title,
				data: data,
				dataType: 'json'
			})
			.done(data => {
				if(data.error == false){
					_this.snackbarProcess = true
					_this.messageUpdatedProcess = 'Se actualizo la actividad.'
				}else{
					_this.snackbarProcess = true
					_this.messageUpdatedProcess = 'No hay cambios para la actividad'
				}
			})
        },

		//  funcion que agrega comentarios a la actividad
		sendMessage () {
			if(this.commentUserTask == ''){
				this.$refs.formComment.validate()
			}else{
				this.commentUserTask.trim()			
				const data = new FormData(document.getElementById('formComment'));
				fetch('../php/post/addCommentTask.php/?id=' + this.title,{
					method:'POST',
					body: data
				})
				.then(response => response.json())
				.then(data => {
					if(data.error == false){
						this.$refs.formComment.reset()
						this.$refs.formComment.resetValidation()
						this.snackbar = true,
						this.messageAddComment = 'Se agrego tu comentario a la actividad ' + this.title
					}
				})
			}
		},

    },
	mounted(){
		this.getProcessRequest()
        this.typeWarranty()
        this.getcustomer()
        this.getliables()
        this.typeRequest()
		this.descTypeRequestVal()
		this.descActivity()
		this.priceTask()
		this.dateTask()
    },
    template: /*html*/`
        <div class="pa-8">
			<v-row>
				<v-col cols="12">
					<v-card class="mx-auto rounded-xl" flat :style="style.v_card">					
                        <v-breadcrumbs :items="items"></v-breadcrumbs>
					</v-card>
				</v-col>
			</v-row>
			<v-row>	
				<v-col cols="12" sm="12" md="8" lg="8" xl="8">
					<!-- formulario para editar la actividad -->
					<v-form id="formEdit" ref="form">
						<v-card class="mx-auto rounded-xl mb-6" flat :style="style.v_card">
							<v-card-title>
								<span class="text--secondary"> {{ infoCard.title }} </span>
							</v-card-title>
							<v-card-subtitle class="mb-5"> {{ infoCard.subtitle }} </v-card-subtitle>
							<v-card-text>
								<v-row>
									<v-col cols="12" sm="12" md="6" lg="6" xl="6">
										<!-- fecha de entrega -->
										<v-menu
											ref="menu"
											:close-on-content-click="false"
											return-value.sync="date"
											item-color="teal accent-3"
											color="teal accent-3"
											transition="scale-transition"
											offset-y											
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="date"
													name="fechaEntrega_value"
													color="teal accent-3"
													item-color="teal accent-3"
													label="Fecha de entrega"
													prepend-icon="mdi-calendar"
													readonly
													rounded
													hide-details
													filled
													v-bind="attrs"
													v-on="on"
												></v-text-field>
											</template>
											<v-date-picker v-model="date" no-title scrollable>
												<v-spacer></v-spacer>
												<v-btn text color="teal accent-3" @click="menu = false">Cancel</v-btn>
												<v-btn text color="teal accent-3" @click="$refs.menu.save(date)"> OK </v-btn>
											</v-date-picker>
										</v-menu>										
									</v-col>

									<v-col cols="12" sm="12" md="6" lg="6" xl="6">
										<!-- Select del cliente de acuerdo al tipo de garantia -->
										<v-autocomplete
											v-model="customer"
											name="customer_value"
											:items="customers"
											:rules="campsRules"
											:color="style.colorInput"
											:item-color="style.teal"
											item-value="value"
											item-text="description"
											prepend-icon="mdi-account-group"
											label="Cliente"
											rounded
											filled
										></v-autocomplete>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="6" lg="6">										
										<!-- Select del responsable a quien se le asigna la tarea -->
										<v-autocomplete
											v-model="liable"
											name="liable_value"
											:items="liables"
											:rules="campsRules"
											:color="style.colorInput"
											:item-color="style.teal"
											prepend-icon="mdi-account"
											item-text="description"
											item-value="value"
											label="Responsable"
											multiple
											rounded
											filled
										></v-autocomplete>
										<!-- Select tipo de solicitud que se realizara -->
										<v-select
											v-model="request"
											name="request_value"
											:items="requests"
											:rules="campsRules"
											:color="style.colorInput"
											:item-color="style.teal"
											prepend-icon="mdi-format-list-bulleted"
											item-text="description"
											item-value="value"
											label="Tipo de solicitud"
											@change="descTypeRequest"
											rounded
											filled
										></v-select>
										<!-- Select descripcion tipo de solicitud que se realizara -->
										<v-select
											v-model="descriptionrequest"
											name="descRequest_value"
											:items="descRequest"
											:rules="campsRules"
											:color="style.colorInput"
											prepend-icon="mdi-format-list-checkbox"
											item-text="description"
											item-value="value"
											label="Descripcion de solicitud"
											rounded
											filled 										
										></v-select>
									</v-col>
									<v-col cols="12" sm="12" md="6" lg="6">												
										<div>
											<v-checkbox
												v-model="checkBoxPrice"
												label="Establecer precios para la actividad"
												color="teal accent-3"
												@click="showPrice = !showPrice"
											></v-checkbox>
											<v-expand-transition>
												<div v-show="showPrice">
													<v-row>
														<v-col cols="12" sm="12" md="6" lg="6">	
															<!-- precio total de la solicitud -->
															<v-text-field
																v-model.number="priceTotal"
																type="number"
																name="totalPrice"
																color="teal accent-3"
																label="Precio de venta"
																prepend-icon="mdi-cash-check"
																prefix="$"
																suffix="cop"
																filled
																rounded
															></v-text-field>
														</v-col>
														<v-col cols="12" sm="12" md="6" lg="6">
															<!-- abono del precio total de la solicitud -->
															<v-text-field
																v-model.number="priceCanceled"
																type="number"
																name="valorCancelado"
																color="teal accent-3"
																label="Abono"
																prepend-icon="mdi-cash-minus"
																prefix="$"
																suffix="cop"
																filled
																rounded
															></v-text-field>
														</v-col>
													</v-row>
													<!-- saldo pendiente -->
													<v-text-field
														v-model.number="saldo"
														disabled
														type="number"
														name="saldoPendiente"
														:color="style.teal"
														label="Saldo pendiente"
														prepend-icon="mdi-cash-minus"
														prefix="$"
														suffix="cop"
														filled
														rounded
													></v-text-field>
												</div>
											</v-expand-transition>
										</div>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12" lg="12" class="pa-5">
										<!-- text area de la actividad -->
										<textarea id="descriptionActivity" name="activity"></textarea>
									</v-col>
								</v-row>
							</v-card-text>
							<v-card-actions>
								<!-- boton para editar la actividad -->
								<v-btn elevation="0" color="teal accent-3" rounded dark @click.prevent="updatedActivity">
									{{ infoCard.btnEdit }}
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-form>
				</v-col>

				<v-col cols="12" sm="12" md="4" lg="4" xl="4">
					<v-alert type="info" border="left" color="teal accent-3" class="rounded-xl">
						<strong>Fecha limite de entrega: </strong>
						<span v-show="showfechaEntrega" v-if="fechaEntrega != 0000-00-00">
							{{ fechaEntrega }}
						</span>
						<span v-else>
							No tiene fecha limite de entrega.
						</span>
					</v-alert>
					<v-card class="mx-auto rounded-xl mb-6" flat :style="style.v_card">
						<v-card-text>
							<span class="body-2"> Estatus Actividad</span><br>
							<span class="text-h5 font-weight-regular"> {{ procesoActual }}</span>
						</v-card-text>
					</v-card>
					<v-form id="formProcess">
						<v-card class="mx-auto rounded-xl" flat :style="style.v_card">
							<v-card-text>
								<v-select
									v-model="procesoActual"
									name="process_value"
									color="teal accent-3"
									item-color="teal accent-3"
									:items="procesoSolicitud"
									item-value="desc_proceso"
									item-text="desc_proceso"									
									append-outer-icon="mdi-send"
									label="Estado solicitud"
									@click:append-outer="updatedProcessActivity"
									hide-details
								></v-select>
							</v-card-text>
							<v-card-actions>
								<v-btn color="teal accent-3" rounded text small elevation="0" @click="updatedProcessActivity">
									<v-icon left>mdi-list-status</v-icon>
									cambiar estado
								</v-btn>
								<v-btn color="indigo accent-2" rounded text small @click="seeFile">
									<v-icon left>mdi-eye-check</v-icon>
									Ver ficha
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-form>
					<v-snackbar
						rounded="pill"
						v-model="snackbarProcess"
						:timeout="3000"						
						color="teal accent-3"
						elevation="24"
					><span> {{ messageUpdatedProcess }} </span> </v-snackbar>
				</v-col>				
			</v-row>					
		</div>

    `
})