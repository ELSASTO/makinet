Vue.component('Createhomenajeuser',{
	data:() => ({

		titleModule: 'Registro homenajes',
		titleModule2: 'Informacion Homenajes',
		// estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			cyan: 'cyan',
			orange: 'orange',
			colorInput: 'teal accent-3',
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			v_cardindigo: 'box-shadow: rgba(48, 79, 254, 0.55) 0px 9px 19px -7px !important',
			v_cardteal: 'box-shadow: rgba(29, 233, 182, 0.55) 0px 9px 19px -7px !important',
			v_cardpurple: 'box-shadow: rgba(101, 31, 255, 0.55) 0px 9px 19px -7px !important',
		},

        // campos obligatorios para ingresar
        campsRules:[
            v => !!v || 'Asegurate de completar el campo',
        ],


		// inventario
		cantidadInventario: '',
		agregarInventario: '',
		nuevoInventario: 0,
		ciudadInventario: 'Villavicencio',

		// ciudad homenaje
		cityDefault: 1, 
		citys:[],

		// fecha recibido
		date: new Date().toISOString().substr(0, 10),
		menu: false,

		// hora recibido
		time: '',
		menu2: false,

		//  fecha de entrega
		date2: new Date().toISOString().substr(0, 10),
		menu3: false,

		// hora de entrega
		time2: '',
		menu4:false,


		// nombre completo
		fullname: '',

		// videos
		videoDefault: 1,
		videos:[
			{
				value: 0,
				description: 'No'
			},
			{
				value: 1,
				description: 'Si'
			}
		],

		// trasmision
		trasmisionDefault: 'No',	
		
		// retablo
		medidasRetablos: [],
		medidaRetablo: 0,
		restarRetablo: 0,


		// observaciones
		observaciones: 'Sin observaciones',

		// respuestas al momento de guardar el inventario
		loadingSaveInventory: false,
		loadingColorInventory: 'teal accent-2',
		snackbar2: false,
		snackbarColor2: '',
		snackbarSaveInventory: '',



		// respuestas luego de guardar el homenaje
		loadingSaveHomenaje: false,
		loadingColorSaveHomenaje: 'teal accent-2',
		snackbar: false,
		snackbarColor: '',
		snackbarSaveHomenaje: '',

		
		// tabla de homenajes

		// buscador de la tabla
		search: '',
		
		// encabezado de la tabla de homenajes
		headers: [
			{
			  text: 'Fecha Recibido/Entrega - (dd-mm-aaaa)',
			  align: 'start',
			  value: 'date',
			},
			{ 
				text: 'Nombre',
				value: 'name' 
			},
			{ 
				text: 'Ciudad',
				value: '' 
			},
			{ 
				text: 'Video', 
				value: 'video' 
			},
			{ 
				text: 'Retablo', 
				value: 'retablo' 
			},
			{ 
				text: 'Trasmision', 
				value: 'trasmision' 
			},
			{ 
				text: 'Actions', 
				value: 'actions', 
				sortable: false 
			},
		],
		// datos de los homenajes
		dataHomenajes:[],


		editedItem: {
			id: '',
			city: '',
			date: '',
			name: '',
			video: '',
			retablo: '',
			trasmision: '',
			observaciones: '',
			medida: null
		},
		medida: '',


		// editar item 
		dialogEditItem: false,
		snackbar3: false,
		snackbarColor3: '',
		snackbarUpdateHomenaje: '',

		// rango de fechas para los homenajes
		dates:[],

		// estadisticas homenajes ultimo mes
		totalVideosLastMonth: 0,
		totalHomenajesLastMonth: 0,
		totalRetablosGrandeLastMonth: 0,
		totalRetablosPequeñoLastMonth: 0,
		// estadisticas homenajes generales
		totalHomenajes: 0,
		totalVideos: 0,
		totalRetablos: 0,
		
	}),
	methods:{

		// primer dia del mes
		firstDayMonth(){
			this.dates.push(moment().startOf('month').format('YYYY-MM-DD'));
			this.dates.push(moment().format('YYYY-MM-DD'));
			this.rangoFechasHomenajes();
		},

		// rango de fechas para los homenajes
		rangoFechasHomenajes(){
			var _this = this;

			var data = {
				dateRange: this.dates,
				city: this.cityDefault
			}

			$.ajax({
				method: 'POST',
				url:'../php/get/estadisticasHomenajes.php',
				data: data,
				dataType: 'json',
			}).done(data => {
				_this.totalHomenajesLastMonth = Intl.NumberFormat().format(data.total_homenajes);
				_this.totalVideosLastMonth = Intl.NumberFormat().format(data.cantidad_videos);
				_this.totalRetablosGrandeLastMonth = Intl.NumberFormat().format(data.cantidad_grande);
				_this.totalRetablosPequeñoLastMonth = Intl.NumberFormat().format(data.cantidad_pequeño);
			})
		},
		// funcion para obtener estadisticas de los homenajes
		getEstadisticasHomenajes(){

			fetch('../php/get/estadisticasHomenajes.php/?egm=1')
			.then(response => response.json())
			.then(data => {
				this.totalHomenajesLastMonth = Intl.NumberFormat().format(data.total_homenajes);
				this.totalVideosLastMonth = Intl.NumberFormat().format(data.cantidad_videos);
				this.totalRetablosLastMonth = Intl.NumberFormat().format(data.cantidad_retablo);
			}).catch(err => console.error(err))

			fetch('../php/get/estadisticasHomenajes.php/?eg=1')
			.then(response => response.json())
			.then(data => {
				this.totalHomenajes = Intl.NumberFormat().format(data.total_homenajes);
				this.totalVideos = Intl.NumberFormat().format(data.cantidad_videos);
				this.totalRetablos = Intl.NumberFormat().format(data.cantidad_retablo);
			}).catch(err => console.error(err))

		},
		
		// function para obtener las ciudades para los homenajes
		getCityHomenajes(){
			fetch('../php/get/cityHomenajes.php')
			.then(response => response.json())
			.then(data => {
				_.forEach(data.citys, value => {
					const item = {
						value: value.id,
						description: value.city
					}
					this.citys.push(item)
				})
			}).catch(err => console.error(err))
		},

		// funcion para obtener el inventario de cada ciudad con retablos
		getInventoryCity(param = 1){
			// obtiene el inventario de acuerdo a la ciudad
			fetch('../php/get/inventoryCityHomenajes.php/?id=' + param)
			.then(response => response.json())
			.then(data => {
				if(data.error == true){
					this.cantidadInventario = 'No hay inventario';
					this.ciudadInventario = 'Agrega inventario';
				}else{
					_.forEach(data.inventorys, value => {
						this.cantidadInventario = value.inventory;
						this.ciudadInventario = value.city
					})
				}
			}).catch(err => console.error(err));

			// obtiene las medidas de los retablos de acuerdo a la ciudad
			this.medidasRetablos = [];
			fetch('../php/get/inventoryMedidasRetablos.php/?id=' + param)
			.then(response => response.json())
			.then(data => {

				_.forEach(data.retablos, value => {
					const item = {
						value: value.id,
						description: value.medida
					}
					this.medidasRetablos.push(item);
				})
		
			}).catch(err => console.error(err));
		},

		// funcion para guardar el inventario
		saveInventoryCity(){
			// this.getCityHomenajes();
			this.loadingSaveInventory = true;

			var _this = this;
			
			this.nuevoInventario = parseInt(this.cantidadInventario) + parseInt(this.agregarInventario);

			var data = {
				city: this.cityDefault,
				inventario: this.nuevoInventario
			}

			if(this.agregarInventario == '' || this.agregarInventario == 0){

				this.loadingColorInventory = 'red accent-3'
				this.snackbar2 = true
				this.snackbarColor2 = 'red accent-3'
				this.snackbarSaveInventory = 'Asegurate que la cantidad sea mayor a 0'

				setTimeout(() => {
					_this.loadingSaveInventory = false;
					_this.loadingColorInventory = 'teal accent-2'
				},2000);
			}else{

				$.ajax({
					type: 'POST',
					url: '../php/post/saveInventoryCityHomenajes.php',
					data: data,
					dataType: 'json',				
				})
				.done(function(data){
					if(data.error == false){
						_this.loadingColorInventory = 'green accent-4'

						_this.snackbar2 = true
						_this.snackbarColor2 = 'green accent-4'
						_this.snackbarSaveInventory = `Se agregaron ${_this.agregarInventario} retablos al inventario de ${_this.ciudadInventario}`
		
						setTimeout(() => {
							_this.loadingSaveInventory = false;
							_this.loadingColorInventory = 'teal accent-2'
						},2000);

						_this.agregarInventario = 0;

						_this.getInventoryCity(param = _this.cityDefault);
					}
	
				});
			}

		},
		// function para crear el homenaje
		saveHomenaje(){
			this.loadingSaveHomenaje = true;

			var _this = this;
			var data = {
				city: this.cityDefault,
				dateReceived: this.date ,
				hourReceived: this.time,
				dateDelivery: this.date2,
				hourDelivery: this.time2,
				fullName: this.fullname,
				video: this.videoDefault,
				trasmision: this.trasmisionDefault,
				medidaRetablo: this.medidaRetablo,
				retablo: this.restarRetablo,
				observaciones: this.observaciones,
			}

			if(this.fullname == '' || this.time == null || this.time2 == null){
				this.snackbar = true;
				this.snackbarSaveHomenaje = 'Asegurate de completar los campos';
				this.snackbarColor = 'red accent-3';
				this.loadingColorSaveHomenaje = 'red accent-3';

				setTimeout(()=> {
					this.loadingSaveHomenaje = false;
					this.loadingColorSaveHomenaje = 'teal accent-3';
				},3000);

			}else{
				this.loadingColorSaveHomenaje = 'teal accent-3';
				$.ajax({
					method: 'POST',
					url: '../php/post/saveHomenaje.php',
					data: data,
					dataType: 'json',				
				})
				.done(function(data){
					if(data.error == false){
						_this.loadingSaveHomenaje = true;
						_this.loadingColorSaveHomenaje = 'green accent-3';

						setTimeout(() => {
							_this.loadingSaveHomenaje = false;
							_this.loadingColorSaveHomenaje = 'teal accent-2';
						}, 2000)
						
						_this.snackbar = true
						_this.snackbarColor = 'green accent-3'
						_this.snackbarSaveHomenaje = data.message
						_this.cityDefault = 1;

						_this.fullname = '';
						_this.medidaRetablo = 0;
						_this.observaciones = 'Sin observaciones';
						_this.restarRetablo = 0;
						_this.getInventoryCity(param = _this.cityDefault);
						_this.tableHomenajes();
						
	
					}else{
						_this.loadingSaveHomenaje = false
						_this.snackbar = true
						_this.snackbarColor = 'red accent-3'
						_this.snackbarSaveHomenaje = data.message
					}		
				})
				.catch(err => console.error(err))
			}
		},

		// funcion para la tablas de homenajes
		async tableHomenajes(){
			await fetch('../php/get/olivosHomenajes.php')
			.then(response => response.json())
			.then(data => {
				// console.log(data)
				_.forEach(data.homenajes, value => {
					const item = {
						id: value.id,
						city: value.ciudad,
						date: value.date,
						name: value.name,
						video: value.video,
						retablo: value.retablo,
						trasmision: value.trasmision,
						observaciones: value.observaciones,
						medida: value.medidaRetablo,
					}
					this.dataHomenajes.push(item)
				})
			})

		},
		// funcion para editar el homenaje
		async editItem(item){
			this.editedItem = await Object.assign({},item);
			this.dialogEditItem = true
		},
		editHomenaje(){
			var data = this.editedItem;
			var _this = this;
			$.ajax({
				method: 'POST',
				url: '../php/post/updateHomenaje.php',
				data: data,
				dataType: 'json',
			})
			.done(data => {
				if(data.error == false){
					_this.dialogEditItem = false
					_this.snackbar3 = true
					_this.snackbarColor3 = 'green accent-4'
					_this.snackbarUpdateHomenaje = data.message
					_this.tableHomenajes();
					
					setTimeout(()=> {
						_this.snackbar2 = false
					},3000)
				}else{
					_this.snackbar3 = true
					_this.snackbarColor3 = 'red accent-3'
					_this.snackbarUpdateHomenaje = data.message
				}
			})
			.catch(err => { console.error(err)})
		},
		parseDate (date) {			
			if (!date) return null
				// const [month, day, year] = date.split('/')
				// return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		},
	},	
	mounted(){
		this.getCityHomenajes();
		this.getInventoryCity();
		this.tableHomenajes();
		this.getEstadisticasHomenajes();
		this.firstDayMonth();
	},

	template: /*html*/`
        <div class="mb-15 pa-8">
			<v-row>
				<v-col cols="12" sm="12" md="4" lg="4" xl="4">					
					<!-- card datos del homenaje -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl" :loading="loadingSaveHomenaje">
						<template slot="progress">
							<v-progress-linear
								:color="loadingColorSaveHomenaje"
								height="5"
								indeterminate
							></v-progress-linear>
						</template>
						<v-card-title>
                            <h1 class="subtitle-1 font-weight-normal"> <v-chip color="teal accent-3 white--text"> 1 </v-chip> Datos del homenaje: </h1>
                        </v-card-title>
						<v-card-text>
							<!-- ciudad para los homenajes -->
							<v-select
								v-model="cityDefault"
								:items="citys"
								item-value="value"
								item-text="description"
								:item-color="style.colorInput"
								:color="style.colorInput"
								prepend-icon="mdi-city-variant-outline"
								label="Ciudad"
								@change="getInventoryCity"
							></v-select>
							<!-- fecha recibido -->					
							<v-menu
								ref="menuDate"
								v-model="menu"
								:close-on-content-click="false"
								transition="scale-transition"
								:color="style.colorInput"
								offset-y
								max-width="290px"
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="date"
										label="Fecha recibido"
										:color="style.colorInput"
										hint="Fecha en que se recibe el homenaje"
										prepend-icon="mdi-calendar"
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									v-model="date"
									no-title
									@input="menu = false"
									:color="style.colorInput"
								></v-date-picker>
							</v-menu>

							<!-- hora recibido -->
							<v-text-field
								v-model="time"
								prepend-icon="mdi-clock-time-four-outline"
								label="Hora recibido"
								:color="style.colorInput"
								value="12:30:00"
								type="time"
								suffix="24 hrs"
							></v-text-field>

							<!-- fecha entrega -->
							<v-menu
								ref="menuDate2"
								v-model="menu3"
								:close-on-content-click="false"
								transition="scale-transition"
								:color="style.colorInput"
								offset-y
								max-width="290px"
								min-width="auto"
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										v-model="date2"
										label="Fecha entrega"
										:color="style.colorInput"
										hint="Fecha en que se recibe el homenaje"
										prepend-icon="mdi-calendar"
										v-bind="attrs"
										v-on="on"
									></v-text-field>
								</template>
								<v-date-picker
									v-model="date2"
									no-title
									@input="menu3 = false"
									:color="style.colorInput"
								></v-date-picker>
							</v-menu>

							<!-- hora entrega -->
							<v-text-field
								v-model="time2"
								prepend-icon="mdi-clock-time-four-outline"
								label="Hora entrega"
								:color="style.colorInput"
								value="12:30:00"
								type="time"
								suffix="24 hrs"
							></v-text-field>
							
							<v-row>
                                <v-col cols="12">
                                    <v-icon>
                                        mdi-help-circle-outline mdi-18px
                                    </v-icon>
                                    <span>
                                        Recuerda que es necesario ingresar todos los campos para una mejor trazabilidad.
                                    </span>
                                </v-col>
                            </v-row>
						</v-card-text>
					</v-card>							
				</v-col>

				<v-col cols="12" sm="12" md="5" lg="5" xl="5">
					<v-card :style="style.v_card" class="mb-6 rounded-xl" :loading="loadingSaveHomenaje">
						<template slot="progress">
							<v-progress-linear
								:color="loadingColorSaveHomenaje"
								height="5"
								indeterminate
							></v-progress-linear>
						</template>
						<v-card-title>
                            <h1 class="subtitle-1 font-weight-normal"> <v-chip color="teal accent-3 white--text"> 2 </v-chip> Informacion del homenaje: </h1>
                        </v-card-title>
						<v-card-text>
							<v-row>
								<v-col>
									<!-- campo nombre completo -->
									<v-text-field
										v-model="fullname"
										:color="style.colorInput"
										label="Nombre completo *"
										hint="Ingresa el nombre de la persona fallecida."
										prepend-icon="mdi-account-heart-outline"
									></v-text-field>
									<!-- campo video -->
									<v-select
										v-model="videoDefault"
										:items="videos"
										item-value="value"
										item-text="description"
										:item-color="style.colorInput"
										:color="style.colorInput"
										prepend-icon="mdi-video-outline"
										label="Video *"
									></v-select>
									<!-- campo trasmision -->
									<v-text-field
										v-model="trasmisionDefault"
										placeholder="Lugar de la trasmisión: Iglesia"
										:color="style.colorInput"
										prepend-icon="mdi-video-wireless-outline"
										label="Trasmision *"
									></v-text-field>
								</v-col>
							</v-row>
							<v-row>								
								<v-col cols="12" sm="8" md="8" lg="8">
									<!-- medida del retablo -->
									<v-select
										v-model="medidaRetablo"
										:items="medidasRetablos"
										item-value="value"
										item-text="description"
										prepend-icon="mdi-account-box-outline"
										:color="style.colorInput"
										:item-color="style.colorInput"
										label="Medida Retablo"
									></v-select>
								</v-col>
								<v-col cols="12" sm="4" md="4" lg="4">
									<!-- cantidad retablos homenaje -->
									<v-text-field
										v-model="restarRetablo"
										:color="style.colorInput"
										type="number"
										prepend-icon="mdi-plus-minus"
										label="Retablo *"
									></v-text-field>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
					<v-card :style="style.v_card" class="rounded-xl" :loading="loadingSaveHomenaje">
						<template slot="progress">
							<v-progress-linear
								:color="loadingColorSaveHomenaje"
								height="5"
								indeterminate
							></v-progress-linear>
						</template>
						<v-card-title>
                            <h1 class="subtitle-1 font-weight-normal"> <v-chip color="teal accent-3 white--text"> 3 </v-chip> Observaciones: </h1>
                        </v-card-title>
						<v-card-text>
							<v-textarea
								v-model="observaciones"
								:color="style.colorInput"
								label="Observaciones del homenaje"
								rows="3"
								value="Sin observaciones"
								hint="Realiza todas tus observaciones sobre el homenaje solicitado."
							></v-textarea>
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								:color="style.colorInput"
								elevation="0"
								rounded
								dark
								@click="saveHomenaje"
							> Guardar homenaje </v-btn>
						</v-card-actions>
					</v-card>
					<v-snackbar
						v-model="snackbar"
						:timeout="3000"
						class="pa-3"
						:color="snackbarColor"
						rounded="pill"
					> 
						{{ snackbarSaveHomenaje }}
					</v-snackbar>
				</v-col>
				
				<!-- card stock de las ciudades -->
				<v-col cols="12" sm="12" md="3" lg="3" xl="3">
					<!-- card inventario de retablos -->
					<v-card :style="style.v_card" :loading="loadingSaveInventory" class="rounded-xl">
						<template slot="progress">
							<v-progress-linear
								:color="loadingColorInventory"
								height="5"
								indeterminate
								absolute
								bottom
							></v-progress-linear>
						</template>						
						<v-toolbar color="teal accent-3" flat>
                            <h1 class="title font-weight-normal white--text"> Stock: </h1>
                        </v-toolbar>
						<v-card-text>
							<div class="mb-5">
								<span> Ciudad: </span>
								<h1 class="font-weight-light"> {{ ciudadInventario }} </h1>
							</div>
							<div class="mb-5">
								<span> Stock: </span>
								<h1 class="font-weight-regular" v-if="cantidadInventario == '0' || cantidadInventario == 0"> No hay inventario </h1>
								<h1 class="font-weight-normal" v-else> {{ cantidadInventario }} </h1>

							</div>
							<div class="">
								<v-form ref="formInventory">
								<!-- cantidad inventario -->
									<v-text-field
										v-model="agregarInventario"
										type="number"
										label="Agregar al stock"
										:color="style.colorInput"
									></v-text-field>
								</v-form>
							</div>
							<div>
								<v-icon>
									mdi-help-circle-outline mdi-18px
								</v-icon>
								<span>
									Agregar stock a la ciudad.
								</span>							
							</div>                                
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn text color="teal accent-3" small rounded @click="saveInventoryCity">								
								agregar al stock
							</v-btn>
						</v-card-actions>
						<v-snackbar
							v-model="snackbar2"
							:timeout="3000"
							class="pa-3"
							:color="snackbarColor2"
							rounded="pill"						
						> {{ snackbarSaveInventory }} </v-snackbar>
					</v-card>
				</v-col>
			</v-row>

			<!-- seccion tabla de homenajes -->
			<v-row>
				<v-col cols="12" sm="12" md="9" lg="9" xl="9">											
					<v-toolbar color="teal accent-3 rounded-xl" dark :style="style.v_cardteal">
						<v-toolbar-title> Homenajes </v-toolbar-title>
						<v-spacer></v-spacer>
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Buscar homenaje"
							hide-details
						></v-text-field>
					</v-toolbar><br>

					<v-data-table
						:headers="headers"
						:items="dataHomenajes"
						sort-by="calories"
						class="elevation-1 rounded-xl"
						:search="search"
						:style="style.v_card"
						:items-per-page="10"
					>
						<template v-slot:top>
							<v-dialog v-model="dialogEditItem" max-width="650px">
								<v-card>
									<v-card-title>
										Editar Homenaje
									</v-card-title>
									<v-card-text>
										<!-- ciudad para los homenajes -->
										<v-select
											v-model="editedItem.city"
											:items="citys"
											item-value="value"
											item-text="description"
											:item-color="style.colorInput"
											:color="style.colorInput"
											prepend-icon="mdi-city-variant-outline"
											label="Ciudad"
											@change="getInventoryCity"
										></v-select>
										<!-- editar nombre -->
										<v-text-field
											v-model="editedItem.name"
											:color="style.colorInput"
											label="Nombre completo *"
											hint="Ingresa el nombre de la persona fallecida."
											prepend-icon="mdi-account-heart-outline"
										></v-text-field>
										<!-- editar video -->
										<v-select
											v-model="editedItem.video"
											:items="videos"
											item-value="value"
											item-text="description"
											:item-color="style.colorInput"
											:color="style.colorInput"
											prepend-icon="mdi-video-outline"
											label="Video *"
										></v-select>
										<!-- editar trasmision -->
										<v-text-field
											v-model="editedItem.trasmision"
											placeholder="Lugar de la trasmisión: Iglesia"
											:color="style.colorInput"
											prepend-icon="mdi-video-wireless-outline"
											label="Trasmision *"
										></v-text-field>
										<!-- medida del retablo -->
										<v-select
											v-model="editedItem.medida"
											:items="medidasRetablos"
											item-value="value"
											item-text="description"
											prepend-icon="mdi-account-box-outline"
											:color="style.colorInput"
											:item-color="style.colorInput"
											label="Medida Retablo"
										></v-select>
										<!-- cantidad retablos homenaje -->
										<v-text-field
											v-model="editedItem.retablo"
											:color="style.colorInput"
											type="number"
											prepend-icon="mdi-plus-minus"
											label="Retablo *"
										></v-text-field>
										<!-- observaciones -->
										<v-textarea
											v-model="editedItem.observaciones"
											prepend-icon="mdi-comment-outline"
											:color="style.colorInput"
											label="Observaciones del homenaje"
											rows="3"
											value=""
											hint="Realiza todas tus observaciones sobre el homenaje solicitado."
										></v-textarea>
									</v-card-text>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn small text color="teal accent-3" @click="dialogEditItem = false">													
											Cancelar
										</v-btn>
										<v-btn small text color="teal accent-3" @click="editHomenaje">
											<v-icon left> mdi-account-edit-outline </v-icon>
											Editar
										</v-btn>
									</v-card-actions>
								</v-card>
							</v-dialog>
						</template>
						<template v-slot:item.actions="{ item }">
							<v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
						</template>
						<template v-slot:no-data>
							<v-btn small dark rounded color="teal accent-3" @click="tableHomenajes"> Reset </v-btn>
						</template>
					</v-data-table>

					<v-snackbar
						v-model="snackbar3"
						:timeout="3000"
						class="pa-3"
						:color="snackbarColor3"
					> 
						{{ snackbarUpdateHomenaje }}
					</v-snackbar>
				</v-col>

				<!-- filtros del calendario para homenajes -->
				<v-col cols="12" sm="12" md="3" lg="3" xl="3">
					<v-select
						v-model="cityDefault"
						:items="citys"
						item-value="value"
						item-text="description"
						:item-color="style.colorInput"
						:color="style.colorInput"
						prepend-icon="mdi-city-variant-outline"
						label="Ciudad"
						@change="rangoFechasHomenajes"
					></v-select>

					<v-card class="rounded-xl mb-6" :style="style.v_card">					
						<v-date-picker
							v-model="dates"
							color="teal accent-3"
							item-color="teal accent-2"
							range
							width=""
							@change="rangoFechasHomenajes"
						></v-date-picker>
					</v-card>

					<!-- Total de homenajes ultimo mes -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total homenajes <br>
									<span class="text-h4 font-weight-light"> {{ totalHomenajesLastMonth }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-icon color="teal accent-2"> mdi-calendar mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>

					<!-- Total de videos -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Cantidad de videos <br>
									<span class="text-h4 font-weight-light"> {{ totalVideosLastMonth }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-icon color="teal accent-2"> mdi-file-video-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>

					<!-- Total de retablos -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total retablos <br>
									<span class="text-h4 font-weight-light"> {{ totalRetablosGrandeLastMonth }} </span>
									<span> 38x59 </span> <br>
									<span class="text-h4 font-weight-light"> {{ totalRetablosPequeñoLastMonth }} </span>
									<span> 15x20 </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-icon color="teal accent-2"> mdi-account-box-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
			
				</v-col>
			</v-row>
			
        </div>
	`
});