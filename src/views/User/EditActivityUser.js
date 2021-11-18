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
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: 0px 0px 10px -2px #e0e0e0 !important;',
			colorInput: 'teal',
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
                href: 'RequestCustomerUser'
            },
            {
                text: 'Editar tarea',
                disabled: true,
                href: ''
            }
        ],

		loading: false,
		titleProcess: 'Proceso de la solicitud',

		// barra de progreso de la tarea
		procesoSolicitud: [],
		procesoActual: null,

		// mensaje proceso de la solicitud
		snackbarProcess: false,
		messageUpdatedProcess: '',
		  
        abrv: '',

        warrantys:[],
        warranty: null,

        customers:[],
        customer: null,

        liables:[],
        liable: null,

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
		showCalendar: false,
		date: new Date().toISOString().substr(0, 10),
		menu: false,

		showfechaEntrega: false,
		fechaEntrega: '',

		showMessageNoUpdated: false,
		textMessageNoUpdated: false,
		messageNoUpdated: 'No hay datos para actualizar.',
		messageUpdated: 'Se actualizo correctamente la tarea.',

		initials:'',
		commentUserTask: '',
		snackbar: false,
		messageAddComment: ''
		
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
                        this.liable = data.liables[0].id
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
					this.activity = data.desc
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

		// iniciales para la seccion del comentario
		commentsTask(){
			this.initials = sessionStorage.getItem('initials')
		},
		// ver ficha de la tarea
		seeFile() {        
            window.location.href = 'SeeFileUser?id=' + this.title
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

			const data = new FormData(document.getElementById('formEdit'))
			fetch('../php/post/updateTaskCustomer.php/?id='+ this.title ,{
				method: 'post',
				body: data
			})
			.then(response => response.json())
			.then(data => {
				if(data.error == false){
					this.loading = false;
					this.showMessageNoUpdated = true
					this.textMessageNoUpdated = true

				}else if(data.error == true){
					this.loading = false;
					this.showMessageNoUpdated = true
					this.textMessageNoUpdated = false
				}else{
					this.showMessageNoUpdated = false
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
		this.commentsTask()
    },
    template: /*html*/`
        <div fluid>
			<v-row class="mt-md-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
					<div>
						<h1 class="display-1" style="color:#12263f;">{{ titleModule }} - {{ title }}</h1>
						<v-divider></v-divider>
                        <v-breadcrumbs :items="items"></v-breadcrumbs>
					</div>
				</v-col>
			</v-row>
			<v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">	
				<v-col cols="12">							
					<v-row>
						<v-col>
							<h2 class="overline"> Estatus Actividad</h2>
							<p class="display-1"> 
								<span>{{ procesoActual }}</span>
							</p>
						</v-col>
						<v-col>
							<h2 class="overline"> {{ titleProcess }} </h2>
							<v-form id="formProcess">
								<v-select
									v-model="procesoActual"
									name="process_value"
									color="teal"
									:items="procesoSolicitud"
									item-value="desc_proceso"
									item-text="desc_proceso"
									append-outer-icon="mdi-send"
									label="Proceso solicitud"
									@click:append-outer="updatedProcessActivity"										
								></v-select>
								<v-btn color="teal" dark small @click="updatedProcessActivity">									
									<v-icon left>mdi-list-status</v-icon>
									cambiar estado
								</v-btn> 								
								<span class="grey--text">|</span>
								<v-btn color="primary" text small @click="seeFile">
									<v-icon left>mdi-eye-check</v-icon>
									Ver ficha
								</v-btn>
								<span class="grey--text">|</span>								
							</v-form>
						</v-col>
					</v-row>
					<v-snackbar
						v-model="snackbarProcess"
						:timeout="3000"
						class="pa-3"
						color="green"
						elevation="24"
					><span class="subtitle-1"> {{ messageUpdatedProcess }} </span> </v-snackbar>
				</v-col>
			</v-row>
			<v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12" sm="12" md="6" lg="6">
					
				</v-col>
			</v-row>
			<v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12" sm="12" md="12" lg="12">
					<v-card class="mx-auto" outlined flat :style="style.v_card">
						<v-form id="formEdit" ref="form" class="ma-6">
							<div class="mt-6 ml-2">									
								<v-icon :color="style.teal"> mdi-file-document-edit-outline mdi-48px </v-icon>
							</div>
							<v-card-title class="overline">							
								<h2> {{ infoCard.title }} </h2>
							</v-card-title>
							<v-card-subtitle class="mb-5"> {{ infoCard.subtitle }} </v-card-subtitle>
							<v-card-text>
									<v-row>
										<v-col cols="12" sm="12" md="12" lg="12">
											<!-- fecha de entrega -->
											<div color="teal accent-1">
												<v-alert type="info" border="left" color="teal" outlined >
													<strong>Fecha limite de entrega: </strong>
													<span v-show="showfechaEntrega" v-if="fechaEntrega != 0000-00-00">
														{{ fechaEntrega }}
													</span>
													<span v-else>
														No tiene fecha limite de entrega.
													</span>																										
												</v-alert>
											</div>
											<v-menu
												ref="menu"
												:close-on-content-click="false"
												:return-value.sync="date"
												transition="scale-transition"
												offset-y
												min-width="auto"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
														v-model="date"
														name="fechaEntrega_value"
														:color="style.colorInput"
														label="Seleccionar la fecha"
														prepend-icon="mdi-calendar"
														readonly
														v-bind="attrs"
														v-on="on"
													></v-text-field>
												</template>
												<v-date-picker v-model="date" no-title scrollable>
													<v-spacer></v-spacer>
													<v-btn text color="primary" @click="menu = false">Cancel</v-btn>
													<v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
												</v-date-picker>
											</v-menu>
											<!-- Select para el tipo de garantia -->
											<v-select
												v-model="warranty"
												name="warranty_value"
												:items="warrantys"
												:rules="campsRules"
												:color="style.colorInput"
												item-value="value"
												item-text="description"
												prepend-icon="mdi-file-document-edit-outline"
												label="Tipo de garantia"
											></v-select>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12" sm="12" md="6" lg="6">
											<!-- Select del cliente de acuerdo al tipo de garantia -->
											<v-autocomplete
												v-model="customer"
												name="customer_value"
												:items="customers"
												:rules="campsRules"
												:color="style.colorInput"
												item-value="value"
												item-text="description"
												prepend-icon="mdi-account-group"
												label="Cliente"
											></v-autocomplete>
											<!-- Select del responsable a quien se le asigna la tarea -->
											<v-autocomplete
												v-model="liable"
												name="liable_value"
												:items="liables"
												:rules="campsRules"
												:color="style.colorInput"
												prepend-icon="mdi-account"
												item-text="description"
												item-value="value"
												label="Responsable"
											></v-autocomplete>
											<!-- Select tipo de solicitud que se realizara -->
											<v-select
												v-model="request"
												name="request_value"
												:items="requests"
												:rules="campsRules"
												:color="style.colorInput"
												prepend-icon="mdi-format-list-bulleted"
												item-text="description"
												item-value="value"
												label="Tipo de solicitud"
												@change="descTypeRequest"
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
											></v-select>
										</v-col>
										<v-col cols="12" sm="12" md="6" lg="6">												
											<div>
												<v-checkbox
													v-model="checkBoxPrice"
													label="Establecer precios para la actividad"
													:color="style.colorInput"
													@click="showPrice = !showPrice"
												></v-checkbox>
												<v-expand-transition>
													<div v-show="showPrice">
														<v-row>
															<v-col cols="12" sm="12" md="6" lg="6">												
																<v-text-field
																	v-model.number="priceTotal"
																	type="number"
																	name="totalPrice"
																	:color="style.colorInput"
																	label="Valor total"
																	prepend-icon="mdi-cash-check"
																	prefix="$"
																	suffix="cop"
																></v-text-field>
															</v-col>
															<v-col cols="12" sm="12" md="6" lg="6">
																<v-text-field
																	v-model.number="priceCanceled"
																	type="number"
																	name="valorCancelado"
																	:color="style.colorInput"
																	label="Valor cancelado"
																	prepend-icon="mdi-cash-minus"
																	prefix="$"
																	suffix="cop"
																></v-text-field>
															</v-col>
														</v-row>
														<span v-if="priceTotal != 0 || priceTotal != '' && priceCanceled != 0 || priceCanceled != ''">
															<span><strong class="teal--text">Saldo: </strong> {{ saldoPrice }} </span><br><br>
														</span>													
														<v-text-field
															v-model.number="saldo"
															type="number"
															name="saldoPendiente"
															:color="style.colorInput"
															label="Saldo pendiente"
															prepend-icon="mdi-cash-minus"
															prefix="$"
															suffix="cop"
														></v-text-field>
													</div>
												</v-expand-transition>
											</div>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12" sm="12" md="12" lg="12">
											<v-textarea 
												v-model="activity"
												name="activity" 
												:rules="campsRules"
												:color="style.colorInput"
												prepend-icon="mdi-comment"
												hint="Describe de manera detallada la actividad para evitar confusiones"
												label="Descripcion de la actividad"
												filled
											></v-textarea>
										</v-col>
									</v-row>
							</v-card-text>
							<v-card-actions>
								<!-- <v-spacer></v-spacer> -->
								<v-row>
									<v-col cols="12" sm="12" md="2" lg="2">
										<v-btn :color="style.teal" dark @click.prevent="updatedActivity">
											{{ infoCard.btnEdit }}
										</v-btn>									
									</v-col>
									<v-col cols="12" sm="12" md="10" lg="10"> 
										<v-snackbar
											v-model="showMessageNoUpdated" 
											:color="textMessageNoUpdated == false ? 'blue' : 'green'"
											:timeout="3000"
											elevation="24"												
											class="pa-3"
											icon="mdi-clock-fast"
											border="left"
										> <span class="subtitle-1"> {{ textMessageNoUpdated == false ? messageNoUpdated : messageUpdated }} </span></v-snackbar>
									</v-col>
								</v-row>
							</v-card-actions>
						</v-form>
						<v-progress-linear
							:indeterminate="loading"
							buffer-value
							color="teal"
						></v-progress-linear>
					</v-card>
				</v-col>
			</v-row>
			<v-row class="mb-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
						<v-card class="mx-auto" outlined flat :style="style.v_card">
							<v-card-text>
								<v-row align="center" justify="center">
									<v-col cols="12" sm="12" md="1" lg="1" class="text-center">
										<v-avatar
											color="grey lighten-3"
											size="56"
										><span class="indigo--text headline"> {{ initials }} </span></v-avatar>
									</v-col>
									<v-col cols="12" sm="12" md="10" lg="10">
										<v-form id="formComment" ref="formComment" @submit.prevent="sendMessage">
											<v-text-field
												v-model="commentUserTask"
												name="commentTask"
												:color="style.colorInput2"
												:rules="commentrules"
												label="Agregar comentario"
												append-outer-icon="mdi-send"
												autocomplete="off"
												@click:append-outer="sendMessage"
											></v-text-field>
										</v-form>
									</v-col>
								</v-row>
								<v-row>
								
								</v-row>
							</v-card-text>
						</v-card>
						<v-snackbar
							v-model="snackbar"
							:timeout="3000"
							class="pa-3"
							color="indigo accent-4"
							elevation="24"
						><span class="subtitle-1"> {{ messageAddComment }} </span> </v-snackbar>
				</v-col>
			</v-row>
		</div>
    
    `
})