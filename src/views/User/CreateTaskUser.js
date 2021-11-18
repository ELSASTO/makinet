Vue.component('Createtaskuser',{
	data:() => ({

		titleModule: 'Tarea',
		// estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			cyan: 'cyan',
			orange: 'orange',
			deep_purple: 'deep-purple',
			teal: 'teal',
			colortext1: 'teal--text',
			teal_lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			v_cardindigo: 'box-shadow: rgba(48, 79, 254, 0.55) 0px 9px 19px -7px !important',
			v_cardteal: 'box-shadow: rgba(29, 233, 182, 0.55) 0px 9px 19px -7px !important',
			v_cardpurple: 'box-shadow: rgba(101, 31, 255, 0.55) 0px 9px 19px -7px !important',
			colorInput: 'teal accent-3'
		},

		// cards 
			cardTask:{
				icon:'mdi-36px mdi-file-document-edit-outline',
				head: 'Task',
				title: 'Crear Tarea',
				subtitle: 'Realiza la asignación de tareas a tus colaborares y lleva un registro de las actividades que se realizan dentro de la epresa.',
				btn: 'Crear tarea',
				// estilos
				color_card: 'indigo'
			},

			e1: 1,

			//datos del formulario

			valid: null,
			// garantia del cliente
			warrantys:[],
			// clientes
			customers:[],
			// responsable
			liable:[],
			// tipo solicitud
			request:[],
			// descripción de solicitud
			descRequest:[],
			// quien solicita la actividad
			solicitante:[],


			// fecha limite de entrega de la actividad
			checkBoxCalendar: false,
			fechaEntrega: false,
			showCalendar: false,
			date: new Date().toISOString().substr(0, 10),
			menu: false,

			// Precios para la actividad
			checkBoxPrice: false,
			showPrice: false,
			Precios: '',

			// mostrar campos adicionales para el campo diseño digital
			showCountPieces: false,
			// mostrar campo para otro,
			showOtherOption: false,
			// boton crear tarea
			btnCreateTask: 'Crear tarea',
			btnReset: 'Vaciar campos',

			// formulario con los datos a enviar para crear la tarea
			loadingCreateTask: false,
			name_activity:'',
			warranty_value: '',
			customer_value: '',
			liable_value: '',
			request_value: '',
			descOtro: '',
			descRequest_value: '',
			countPieces_value: '0',
			fechaEntrega_value: '',
			totalPrice: '0',
			valorCancelado: '0',
			saldo: '0',
			activity:'',
			solicitante_value: '',


			responseTaskSuccess: false,
			responseTaskError: false,

			message_success: 'Se creo la tarea correctamente',
			message_error: 'Asegurate de diligenciar los campos necesarios para crear la tarea.',


			// campos obligatorios para ingresar
			campsRules:[
				v => !!v || 'Asegurate de diligenciar el campo',
			],

			snackbar: false,
			messageCreateTask: '',

			// responsable
			hintNombreActividad: true,

			// responsable
			hintTipoGarantia: true,

			// solicita Actividad:
			hintSolicitaActividad: true,

			// responsable
			hintResponsable: true


	}),
	created(){
		this.typeGaranty()
		this.liables()
		this.typeRequest()
	},
	mounted(){
		
	},
	computed:{
		saldoPrice(){
			return (this.saldo = this.totalPrice - this.valorCancelado) 
		},
	},
	methods:{

		// funcion para crear la tarea
		createdTask(){
			
			var _this = this

			var data = {
				name_activity: this.name_activity,
				warranty_value: this.warranty_value,
				customer_value: this.customer_value,
				liable_value: this.liable_value,
				request_value: this.request_value,
				descOtro: this.descOtro,
				descRequest_value: this.descRequest_value,
				countPieces_value: this.countPieces_value,
				fechaEntrega_value: this.date,
				totalPrice: this.totalPrice,
				valorCancelado: this.valorCancelado,
				saldo: this.saldo,
				activity: tinyMCE.get('descActivity').getContent(),
				solicitante_value: this.solicitante_value
			}

			this.loadingCreateTask = true;
			
			if(this.warranty_value == '' || this.customer_value == '' || this.liable_value == '' || this.request_value == '' || this.descRequest_value == ''){					
				this.$refs.form.validate()
				this.responseTaskError = true
				setTimeout(() => {
					this.responseTaskError = false
				}, 3000);
				this.loadingCreateTask = false;
			}else{

				$.ajax({
					type: 'POST',
					url: '../php/post/createTaskCustomer.php',
					data: data,
					dataType: 'json',
				})
				.done(data => {
					if(data.error == false){					
						_this.snackbar = true
						_this.messageCreateTask = 'Se creo la tarea correctamente.'
						_this.$refs.form.resetValidation()
						_this.checkBoxPrice = false
						_this.checkBoxCalendar = false
						_this.showCalendar = false
						_this.showPrice = false
						_this.showOtherOption = false
						_this.showCountPieces = false
						_this.date = new Date().toISOString().substr(0, 10)
						
						_this.name_activity = ''
						_this.warranty_value = ''
						_this.customer_value = ''
						_this.solicitante_value = ''
						_this.liable_value = ''
						_this.request_value = ''
						_this.descRequest_value = ''
						_this.activity = ''
						_this.countPieces_value =  0
						_this.totalPrice = 0
						_this.valorCancelado = 0
						_this.saldo = 0
						_this.e1 = 1;
						_this.loadingCreateTask = false;

					}
				});
			}
		},

		seeRequest(){
			window.location.href = "RequestCustomer.php";
		},

		showFormCountPieces(param){
			if(param == '1'){
				this.showCountPieces = true
			}else{
				this.showCountPieces = false
				this.countPieces_value = '0';
			}

			if(param == '17'){ // 17 Otro
				this.showOtherOption = true
			}else{
				this.showOtherOption = false
			}
		},
		// funciones del formulario principal
		async descTypeRequest(param){
			this.descRequest = [];
			await fetch('../php/get/descTypeRequest.php/?id='+ param)
				.then(response => response.json())
				.then(data => {
					data.descRequest.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.descRequest.push(item)
					});
				})
				.catch(err => console.error(err))
		},
		
		// funcion tipo de solicitud
		async typeRequest(){
			await fetch('../php/get/typeRequest.php')
				.then(response => response.json())
				.then(data => {
					data.typeRequest.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.request.push(item)
					})
				})
				.catch(err => console.error(err))
		},

		// funcion que consulta los usuarios que solicitan las actividades
		async solicitanteActividad(param){
			await fetch('../php/get/solicitanteTask?solicitante=' + param)
				.then(response => response.json())
				.then(data => {
					// console.log(data);
					data.solicitantes.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.solicitante.push(item)
					})
				})
				.catch(err => console.error(err))
		},

		async liables(){
			await fetch('../php/get/liable.php')
				.then(response => response.json())
				.then(data => {
					data.liables.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.liable.push(item)
					})
				})
				.catch(err => console.error(err))
		},
		async garantyCustomer(param){
			this.customers = [];
			await fetch('../php/get/customers.php/?id='+param)
				.then(response => response.json())
				.then(data => {
					data.customers.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.customers.push(item)
					});
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
		<v-container fluid class="pa-8">		
			<v-form id="formCreateTaskOne" ref="form">
				<v-row>
					<v-col cols="12" sm="12" md="8" lg="8" xl="8">
						<v-card :style="style.v_card" class="rounded-xl">
							<v-card-text class="body-1">
								Crear tareas / actividades
							</v-card-text>
						</v-card> 
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="12" sm="12" md="8" lg="8" xl="8">
						<v-card :style="style.v_card" class="rounded-xl" :loading="loadingCreateTask">
							<v-stepper v-model="e1" elevation="0">
								<v-stepper-header>
									<v-stepper-step :complete="e1 > 1" step="1" color="teal accent-3"> Datos principales </v-stepper-step>
									<v-divider></v-divider>
									<v-stepper-step :complete="e1 > 2" step="2" color="teal accent-3"> Datos de la actividad </v-stepper-step>
									<v-divider></v-divider>
								</v-stepper-header>

								<v-stepper-items>
									<v-stepper-content step="1">
										<!-- nombre de la actividad -->
										<v-text-field
											v-model="name_activity"
											prepend-icon="mdi-file-document-edit-outline"
											:rules="campsRules"
											:color="style.colorInput"
											label="Nombre actividad"
											hint="Escribe un titulo a la actividad."
											rounded
											filled
											:persistent-hint="hintNombreActividad"
										></v-text-field>
										<v-row>
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- Select para el tipo de garantia -->
												<v-select
													v-model="warranty_value"
													:items="warrantys"
													:rules="campsRules"
													:color="style.colorInput"
													:item-color="style.colorInput"
													prepend-icon="mdi-file-document-edit-outline"
													item-text="description"
													item-value="value"
													rounded
													filled
													label="Tipo de garantia"
													hint="El tipo de garantia es un control del tipo de contrato que maneja el cliente."
													:persistent-hint="hintTipoGarantia"
													@change="garantyCustomer"
												></v-select>	
											</v-col>
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- Select del cliente de acuerdo al tipo de garantia -->
												<v-autocomplete
													v-model="customer_value"
													:items="customers"
													:rules="campsRules"
													:color="style.colorInput"
													:item-color="style.colorInput"
													prepend-icon="mdi-account-group-outline"
													item-text="description"
													item-value="value"
													rounded
													filled
													label="Cliente"
													@change="solicitanteActividad"
												></v-autocomplete>	
											</v-col>
										</v-row>
																				
										<!-- Solicita actividad -->
										<v-autocomplete
											v-model="solicitante_value"
											:items="solicitante"
											:rules="campsRules"
											:color="style.colorInput"
											:item-color="style.colorInput"
											prepend-icon="mdi-account-arrow-left-outline"
											item-text="description"
											item-value="value"
											rounded
											filled
											label="Solicita actividad"
											hint="Selecciona la persona quien le realiza la solicitud"
											:persistent-hint="hintSolicitaActividad"
										></v-autocomplete>
										<br>
										<v-btn elevation="0" rounded small color="teal accent-3" @click="e1 = 2" dark> Siguiente </v-btn>									
									</v-stepper-content>

									<v-stepper-content step="2">
										<!-- Responsable -->
										<v-autocomplete
											v-model="liable_value"
											:items="liable"
											:rules="campsRules"
											:color="style.colorInput"
											:item-color="style.colorInput"
											prepend-icon="mdi-account-outline"
											item-text="description"
											item-value="value"
											label="Responsable"
											rounded
											filled											
											clearable
											hint="Selecciona la persona que realizara la actividad"
											:persistent-hint="hintResponsable"
											multiple
										></v-autocomplete>
										<v-row>
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- Tipo de solicitud -->
												<v-select
													v-model="request_value"
													:items="request"
													:rules="campsRules"
													:color="style.colorInput"
													:item-color="style.colorInput"
													prepend-icon="mdi-format-list-bulleted"
													item-text="description"
													item-value="value"
													rounded
													filled
													label="Tipo de solicitud"
													@change="descTypeRequest"
												></v-select>
											</v-col>
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- Descripcion de la solicitud -->
												<v-select
													v-model="descRequest_value"
													:items="descRequest"
													:rules="campsRules"
													:color="style.colorInput"
													:item-color="style.colorInput"
													prepend-icon="mdi-format-list-checkbox"
													item-text="description"
													item-value="value"
													rounded
													filled
													label="Descripcion de solicitud"
													@change = "showFormCountPieces"
												></v-select>
											</v-col>
										</v-row>
										<!-- Cantidad de piezas, cuando es seleccionado el tipo de solicitud: Diseño, Descripcion solicitud: Diseño digital -->
										<v-expand-transition>
											<div v-show="showCountPieces">
												<v-text-field
													v-model="countPieces_value"
													:color="style.colorInput"
													value="0"
													rounded
													filled
													prepend-icon="mdi-cash-check"
													label="Cantidad de piezas"
												></v-text-field>
											</div>
										</v-expand-transition>
										<!-- input para la opcion de otro tipo de solicitud -->
										<v-expand-transition>
											<div v-show="showOtherOption">
												<v-text-field
													v-model="descOtro"
													:color="style.colorInput"
													prepend-icon="mdi-format-list-checkbox"
													rounded
													filled
													label="¿Cuál?"
												></v-text-field>
											</div>
										</v-expand-transition>
										<span class="text--secondary body-2"> Realizar la descripcion de manera detallada de la actividad para evitar confusiones a nuestros colaboradores</span><br>
										<textarea id="descActivity"></textarea>
										<br>										
										<v-btn elevation="0" rounded small color="teal accent-3" dark @click="createdTask"> Crear actividad </v-btn>
										<v-btn elevation="0" rounded small text color="teal accent-3" @click="e1 = 1"> Atras </v-btn>
									</v-stepper-content>

								</v-stepper-items>
							</v-stepper>
						</v-card>
					</v-col>
					<!-- card datos adicionales de la tarea -->
					<v-col cols="12" sm="12" md="4" lg="4">
						<v-card :style="style.v_card" class="rounded-xl">
							<v-toolbar color="teal accent-3" flat>
								<h1 class="subtitle-1 font-weight-normal white--text"> Datos adicionales para la actividad: </h1>
							</v-toolbar>
							<v-card-text>
								<!-- Checkbox para la fecha limite de entrega -->
								<v-checkbox									
									v-model="checkBoxCalendar"
									label="Fecha limite de entrega para la actividad"
									:color="style.colorInput"
									@click="showCalendar = !showCalendar"
								></v-checkbox>
								<v-expand-transition>
									<div v-show="showCalendar">
										<v-menu
											ref="menu"
											:close-on-content-click="false"
											:return-value.sync="date"
											:color="style.colorInput"
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
											<v-date-picker v-model="date" no-title scrollable :color="style.colorInput">
												<v-spacer></v-spacer>
												<v-btn text color="teal accent-3" @click="menu = false">Cancel</v-btn>
												<v-btn text color="teal accent-3" @click="$refs.menu.save(date)"> OK </v-btn>
											</v-date-picker>
										</v-menu>
									</div>
								</v-expand-transition>
								
								<!-- Checkbox para los precios -->
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
													v-model.number="totalPrice"
													type="number"
													name="totalPrice"
													:color="style.colorInput"
													label="Precio de venta"
													prepend-icon="mdi-cash-check"
													prefix="$"
													suffix="cop"
												></v-text-field>
											</v-col>
											<v-col cols="12" sm="12" md="6" lg="6">
												<v-text-field
													v-model.number="valorCancelado"
													type="number"
													name="valorCancelado"
													:color="style.colorInput"
													label="Abono"
													prepend-icon="mdi-cash-minus"
													prefix="$"
													suffix="cop"
												></v-text-field>
											</v-col>
										</v-row>
										<span v-if="totalPrice != 0 || totalPrice != '' && valorCancelado != 0 || valorCancelado != ''">
											<span><strong>Saldo: </strong> {{ saldoPrice }} </span><br><br>
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
										</span>
									</div>
								</v-expand-transition>
							</v-card-text>								
						</v-card>
					</v-col>
				</v-row>
				<v-snackbar
					v-model="snackbar"
					:timeout="3000"
					class="pa-3"
					color="green accent-3"
					elevation="24"
					rounded="pill"
				> 
					{{ messageCreateTask }} 
					<template v-slot:action="{ attrs }"
						v-bind="attrs">

						<v-btn small @click="seeRequest" text>
							Ver solicitudes
						</v-btn>
					</template>
				</v-snackbar>
			</v-form>
		</v-container>
	`
});