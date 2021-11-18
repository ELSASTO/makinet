Vue.component('Filecustomer',{
	props: {
        title: String,
        business: String
    },
	data:() => ({
		selectedItem: String,
		drawer: null,
		titleModule:'Ficha cliente',
		// estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			deep_purple: 'deep-purple',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			v_cardteal: 'box-shadow: rgba(48, 79, 254, 0.55) 0px 9px 19px -7px !important',
			counters: 'title',
			countersDesc: '',
		},

		// ficha de la empresa con la información de las solicitudes
		cardBusiness:{
			descFicha: 'Ficha técnica e informativa de la empresa donde se encuentra todo la información.'
		},

		// ficha de la empresa información de la empresa
		cardInfoBusiness:{
			name: '',
			city: '',
			municipy: '',
			email: '',
			address: '',
			nit: '',
			phone: '',
			web: ''
		},

		// progress circular con el total de ginalizadas
		value: 0,
		search: '',

		// datatable de las tareas finalizadas del cliente
        headersTable: [
			{ 
				text: 'Tipo solicitud', 
				sortable: false, 
				value: 'description' 
			},
			{ 
				text: 'Descripcion', 
				sortable: false, 
				value: 'descRequest' 
			},
			{ 
				text: 'Responsable', 
				sortable: false, 
				value: 'liable' 
			},
			{ 
				text: 'Fecha creacion', 
				sortable: false, 
				value: 'date' 
			},
			{ 
				text: 'Actions', 
				sortable: false, 
				value: 'actions' 
			},
        ],
        cardTaskFinalizadas: [],
		activityTask:'',

		// datatable de las tareas asignadas del cliente
		headersTable2: [
			{ 
				text: 'Tipo solicitud', 
				sortable: false, 
				value: 'description' 
			},
			{ 
				text: 'Descripcion', 
				sortable: false, 
				value: 'descRequest' 
			},
			{ 
				text: 'Responsable', 
				sortable: false, 
				value: 'liable' 
			},
			{ 
				text: 'Fecha creacion', 
				sortable: false, 
				value: 'date' 
			},
			{ 
				text: 'Actions', 
				sortable: false, 
				value: 'actions' 
			},
        ],
		cardTaskAsignadas: [],

		// datatable de las tareas asignadas del cliente
		headersTable3: [
			{ 
				text: 'Tipo solicitud', 
				sortable: false, 
				value: 'description' 
			},
			{ 
				text: 'Descripcion', 
				sortable: false, 
				value: 'descRequest' 
			},
			{ 
				text: 'Responsable', 
				sortable: false, 
				value: 'liable' 
			},
			{ 
				text: 'Fecha creacion', 
				sortable: false, 
				value: 'date' 
			},
			{ 
				text: 'Actions', 
				sortable: false, 
				value: 'actions' 
			},
        ],
		cardTaskPendientes: [],

		loading: true,
		model: null,
		dialog: false,

		loadingTables: true,

		// estadisticas de la empresa
		porcentajeFinalizadas: 0,
		porcentajeAsignadas: 0,
		porcentajeOtroProcesos: 0,
		totalActividadesCustomer: 0,

	}),

	methods:{	
		// informacion para porcentaje de actividades
		porcentajeActividades(){

			setTimeout(() => {

				const totalActividades = this.totalActividadesCustomer = parseInt(this.cardTaskFinalizadas.length) + parseInt(this.cardTaskAsignadas.length) + parseInt(this.cardTaskPendientes.length);

				const finalizadas = this.porcentajeFinalizadas = Math.round(this.cardTaskFinalizadas.length / totalActividades * 100);
				const asignadas = this.porcentajeAsignadas = Math.round(this.cardTaskAsignadas.length / totalActividades * 100);
				const otrosprocesos = this.porcentajeOtroProcesos = Math.round(this.cardTaskPendientes.length / totalActividades * 100);
				
				const dataPorcentajes = [ finalizadas, asignadas, otrosprocesos ]

				const data = {
					labels : ['Finalizadas' , 'Asignadas', 'Otros procesos'],
					datasets: [{
						label: 'Generales',
						data: dataPorcentajes,
						backgroundColor: [
							'rgb(29, 233, 182)',
							'rgb(255, 23, 68)',
							'rgb(255, 145, 0)',
						],
						hoverOffset: 3
					}],			
				};
				
				const config = {
					type: 'doughnut',
					data: data,
					options: {
						plugins: {
							legend: {
								display: false,
							}
						}
					}
				};
	
				new Chart(
					document.getElementById('pieRequestCustomer'),
					config
				);
			},1000)
		},

		// obtiene la informacion del cliente
		getCustomer(){
			fetch('../php/get/infoCustomer?id='+ this.title)
			.then(response => response.json())
			.then(data => {
				if(data){
					// console.log(data)				
					this.cardInfoBusiness.name = data.name
					this.cardInfoBusiness.city = data.city
					this.cardInfoBusiness.municipy = data.municipy
					this.cardInfoBusiness.address = data.address
					this.cardInfoBusiness.email = data.email
					this.cardInfoBusiness.phone = data.phone
					this.cardInfoBusiness.nit = data.nit
					this.cardInfoBusiness.web = data.web

					// funcion para ocultar la animacion de carga de los cards información de la empresa
					setTimeout(()=>{
						this.loading = false
					},1000)
				}
			})
		},
		// informacion de las tareas pendientes
		getTaskPendientes(){
			fetch('../php/get/infoTaskCustomer?pd='+ this.title)
			.then(response => response.json())
			.then(data => {
				// console.log(data)
				_.forEach(data.taskPendiente, (value) => {
					const item = {
						id: value.id,
						customer: value.nameCustomer,
						warranty: value.descWarranty,
						date: value.dateCreated,
						description: value.description,
						descRequest: value.descRequest,
						liable: value.liable,
						activity: value.descActivity,
					}
					this.cardTaskPendientes.push(item)
					this.loadingTables = false
				})
			})
		},
		// informacion de las tareas asignadas
		getTaskAsignadas(){
			fetch('../php/get/infoTaskCustomer?ag='+ this.title)
			.then(response => response.json())
			.then(data => {
				// console.log(data)
				_.forEach(data.taskAsignada, (value) => {
					const item = {
						id: value.id,
						customer: value.nameCustomer,
						warranty: value.descWarranty,
						date: value.dateCreated,
						description: value.description,
						descRequest: value.descRequest,
						liable: value.liable,
						activity: value.descActivity,
					}
					this.cardTaskAsignadas.push(item)
					this.loadingTables = false
				})
			})
		},
		//  informacion de las tareas finalizadas
		getTaskFinalizadas(){
			fetch('../php/get/infoTaskCustomer?id='+ this.title)
			.then(response => response.json())
			.then(data => {
				_.forEach(data.taskFinal, (value) => {
					const item = {
						id: value.id,
						customer: value.nameCustomer,
						warranty: value.descWarranty,
						date: value.dateCreated,
						description: value.description,
						descRequest: value.descRequest,
						liable: value.liable,
						activity: value.descActivity,
					}
					this.cardTaskFinalizadas.push(item)
					this.loadingTables = false
				})
			})
		},
		
		// ver ficha
		seeItem (item) {
            window.location.href = 'SeeFile?id='+item.id
        },
		
	},
	mounted(){
		this.getCustomer();
		this.getTaskFinalizadas();
		this.getTaskAsignadas();
		this.getTaskPendientes();
		this.porcentajeActividades();
	},
	
	template: /*html*/`
		<div class="mb-10 pa-8">
			<v-row>
				<v-col cols="12" sm="12" md="8" lg="8" xl="8">
					<!-- informacion de la empresa -->
					<v-card class="rounded-xl mb-6" :style="style.v_cardteal" color="indigo accent-4" dark>
						<v-card-text>
							<v-row align="center">
								<v-col cols="12" sm="12" md="5" lg="5" xl="5">
									<div class="pa-5 text-center">
										<p class="headline font-weight-regular"> {{ business }}</p>
									</div>
								</v-col>
								<v-col cols="12" sm="12" md="7" lg="7" xl="7">
									<div class="pa-5">
										<div class="mb-4">
											<v-row no-gutters align="center">
												<v-col cols="3" class="text-center">
													<v-icon class="pa-4"> mdi-email-outline mdi-36px </v-icon>
												</v-col>
												<v-col cols="9">
													<b class="subtitle-2">Correo electronico:</b><br>
													<span class="headline font-weight-light">{{ cardInfoBusiness.email }} </span>
												</v-col>
											</v-row>
										</div>

										<div class="mb-4">
											<v-row no-gutters align="center">
												<v-col cols="3" class="text-center">
													<v-icon class="pa-4"> mdi-map-marker-check-outline mdi-36px </v-icon>
												</v-col>
												<v-col cols="9">
													<b class="subtitle-2">Dirección:</b> <br>
													<span class="headline font-weight-light">{{ cardInfoBusiness.address }} </span>
												</v-col>
											</v-row>
										</div>

										<div class="mb-4">
											<v-row no-gutters align="center">
												<v-col cols="3" class="text-center">
													<v-icon class="pa-4"> mdi-phone mdi-36px </v-icon>
												</v-col>
												<v-col cols="9">
													<b class="subtitle-2">Telefono:</b> <br>
													<span class="headline font-weight-light">{{ cardInfoBusiness.phone }} </span>
												</v-col>
											</v-row>
										</div>

										<div v-if="cardInfoBusiness.nit != '' && cardInfoBusiness.nit != '0'" class="mb-4">
											<v-row no-gutters align="center">
												<v-col cols="3" class="text-center">
													<v-icon> mdi-numeric mdi-36px </v-icon>
												</v-col>
												<v-col cols="9">
													<b class="subtitle-2">Nit:</b> <br>
													<span>{{ cardInfoBusiness.nit }} </span>
												</v-col>
											</v-row>
										</div>

										<div v-if="cardInfoBusiness.web != '' && cardInfoBusiness.web != '0'" class="mb-4">
											<v-row no-gutters align="center">
												<v-col cols="3" class="text-center">
													<v-icon> mdi-web mdi-36px </v-icon>
												</v-col>
												<v-col cols="9">
													<b class="subtitle-2">Web:</b> <br>
													<span>{{ cardInfoBusiness.web }} </span>
												</v-col>
											</v-row>											
										</div>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>

					<!-- Estadisticas de la empresa -->
					<v-row>
						<!-- Porcentaje de actividades -->
						<v-col cols="12" sm="12" md="12" lg="5" xl="5">
							<v-card class="rounded-xl" :style="style.v_card">
								<v-card-text>
									<v-icon color="deep-purple accent-3"> mdi-circle-medium </v-icon>
									<span class="text--secondary font-weight-regular"> Porcentaje de actividades </span>
									<v-row class="pa-4" align="center">
										<v-col cols="5" sm="5" md="5" lg="5" xl="5">
											<canvas id="pieRequestCustomer"></canvas>
										</v-col>
										<v-col cols="7" sm="7" md="7" lg="7" xl="7">
											<div class="mb-5">
												<v-chip color="teal accent-3" label small dark> </v-chip> &nbsp;
												<span>Finalizadas:</span>
												<span> {{ porcentajeFinalizadas }}% </span>
											</div>
											<div class="mb-5">
												<v-chip color="red accent-3" label small dark> </v-chip> &nbsp;
												<span>Asignadas:</span>
												<span> {{ porcentajeAsignadas }}% </span>
											</div>
											<div>
												<v-chip color="orange accent-3" label small dark> </v-chip> &nbsp;
												<span>Otros procesos:</span>
												<span> {{ porcentajeOtroProcesos }}% </span>
											</div>
										</v-col>
									</v-row>
									<div>
									</div>								
								</v-card-text>
							</v-card>
						</v-col>

						<!-- Total de actividades activas -->
						<v-col cols="12" sm="12" md="6" lg="3" xl="3">
							<v-card class="rounded-xl" :style="style.v_card">
								<v-card-subtitle>
									<v-icon color="deep-purple accent-3"> mdi-circle-medium </v-icon>
									<span class="text--secondary font-weight-regular"> Activas </span>
									<v-tooltip left color="indigo accent-4" max-width="250px">
										<template v-slot:activator="{ on, attrs }">
											<v-icon
												color="deep-purple accent-2"
												dark small
												v-bind="attrs"
												v-on="on"
											> mdi-help-circle-outline mdi-16px </v-icon>
										</template>
										<span> Es la suma de actividades asignadas y actividades en otros procesos del mes actual.</span>
									</v-tooltip>
								</v-card-subtitle>
								<v-card-text>
									<div class="pa-3 pa-xl-6">
										<h1 class="display-1"> 
											{{ cardTaskAsignadas.length + cardTaskPendientes.length }} 
											<!-- <v-icon color="teal accent-3"> mdi-arrow-top-right </v-icon>  -->
											<v-icon color="indigo accent-3"> mdi-clipboard-list-outline </v-icon> 	
										</h1><br>
										<v-row no-gutters>
											<v-col cols="12">
												<span class="subtitle-2"> Jun </span><br>
												<span> Tareas activas </span>												
											</v-col>											
										</v-row>
									</div>
								</v-card-text>
							</v-card>
						</v-col>
						<!-- actividades con respecto a meses anteriores -->
						<v-col cols="12" sm="12" md="6" lg="4" xl="4">
							<v-card class="rounded-xl mb-6" :style="style.v_card">
								<v-card-subtitle>
									<v-icon color="deep-purple accent-3"> mdi-circle-medium </v-icon>
									<span class="text--secondary font-weight-regular"> Actividades mensuales </span>
								</v-card-subtitle>
								<v-card-text>
									<div  class="pa-3 pa-xl-6">
										<h1 class="display-1"> 
											{{ totalActividadesCustomer }} 
											<v-icon color="red accent-3" small> mdi-arrow-bottom-right </v-icon> 	
											<span> Jun </span>
										</h1><br>
										<v-row no-gutters>
											<v-col cols="6">
												<span> May </span><br>
												<span> 16 </span>
												<v-icon color="red accent-3" small> mdi-arrow-bottom-right </v-icon> 
											</v-col>
											<v-col cols="6">
												<span> Apr </span><br>
												<span> 18 </span>
												<v-icon color="teal accent-3" small> mdi-arrow-top-right </v-icon>
											</v-col>
										</v-row>							
									</div>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>

					<!-- actividades pendientes de la empresa -->
					<v-card class="rounded-xl mb-6" :style="style.v_card" v-if="cardTaskPendientes.length > 0">
						<v-card-title>
							<span class="text--secondary"> <v-chip color="orange" dark> Actividades Pendientes: {{ cardTaskPendientes.length }} </v-chip> </span>
						</v-card-title>
						<v-data-table
							class="rounded-xl"
							:headers="headersTable3"
							:items="cardTaskPendientes"
							:search="search"
							loading-text="Loading... Please wait"
							:items-per-page="5"
						>
							<!-- BUSCADOR EN LA TABLA -->
							<template v-slot:top>
								<v-toolbar flat>
									<v-text-field
										v-model="search"
										append-icon="mdi-magnify"
										label="Buscar solicitud"
										single-line
										hide-details
									></v-text-field>
								</v-toolbar>
                            </template>
							<!-- BOTON DE LAS ACCIONES -->
							<template v-slot:item.actions="{ item }">
								<v-icon small class="mr-2" @click="seeItem(item)" title="Ver ficha"> mdi-eye </v-icon>
							</template>
						</v-data-table>
					</v-card>

					<!-- actividades asignadas de la empresa -->
					<v-card class="rounded-xl mb-6" :style="style.v_card" v-if="cardTaskAsignadas.length > 0">
						<v-card-title>
							<span class="text--secondary"> <v-chip color="red accent-3" dark> Actividades asignadas: {{ cardTaskAsignadas.length }} </v-chip> </span>
						</v-card-title>
						<v-data-table
								:headers="headersTable2"
								:items="cardTaskAsignadas"
								:search="search"
								:items-per-page="5"
						>
							<!-- BUSCADOR EN LA TABLA -->
							<template v-slot:top>
								<v-toolbar flat>
									<v-text-field
										v-model="search"
										append-icon="mdi-magnify"
										label="Buscar solicitud"
										single-line
										hide-details
									></v-text-field>
								</v-toolbar>
							</template>
							<!-- BOTON DE LAS ACCIONES -->
							<template v-slot:item.actions="{ item }">
								<v-icon small class="mr-2" @click="seeItem(item)" title="Ver ficha"> mdi-eye </v-icon>
							</template>
						</v-data-table>
					</v-card>
					
					<!-- actividades asignadas de la empresa -->
					<v-card class="rounded-xl mb-6" :style="style.v_card"  v-if="cardTaskFinalizadas.length > 0">
						<v-card-title>
							<span class="text--secondary"> <v-chip color="teal accent-3" dark> Actividades finalizadas: {{ cardTaskFinalizadas.length }} </v-chip> </span>
						</v-card-title>
						<v-skeleton-loader
							:loading="loadingTables"
							type="card-heading, table-tbody"
						>
							<v-data-table
								:headers="headersTable"
								:items="cardTaskFinalizadas"
								:search="search"
								:items-per-page="5"
								class="rounded-xl"
							>
								<!-- BUSCADOR EN LA TABLA -->
								<template v-slot:top>
									<v-toolbar flat>
										<v-text-field
											v-model="search"
											append-icon="mdi-magnify"
											label="Buscar solicitud"
											single-line
											hide-details
										></v-text-field>
									</v-toolbar>
								</template>
								<!-- BOTON DE LAS ACCIONES -->
								<template v-slot:item.actions="{ item }">
									<v-icon small class="mr-2" @click="seeItem(item)" title="Ver ficha"> mdi-eye </v-icon>
								</template>
							</v-data-table>
						</v-skeleton-loader>
					</v-card>


				</v-col>
				<v-col cols="12" sm="12" md="4" lg="4" xl="4">
					<!-- total de solicitudes finalizadas -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total solicitudes finalizadas: <br>
									<span class="text-h4"> {{ cardTaskFinalizadas.length }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-menu open-on-click left offset-x class="rounded-xl" max-height="450px">
											<template v-slot:activator="{ on, attrs }">
												<v-btn
													color="teal accent-3" fab :style="style.v_cardteal" dark
													v-bind="attrs"
													v-on="on"
												>
													<v-icon> mdi-check mdi-24px </v-icon>
												</v-btn>
											</template>

											<v-list nav>
												<v-list-item v-for="(item, index) in cardTaskFinalizadas" :key="index" @click="seeItem(item)">
													<v-list-item-avatar> 
														<v-icon color="teal accent-3"> mdi-check mdi-24px </v-icon> 
													</v-list-item-avatar>
													<v-list-item-content three-line>
														<v-list-item-title> {{ item.description }} - {{ item.descRequest }} </v-list-item-title>
														<v-list-item-subtitle v-html="item.liable"></v-list-item-subtitle>
														<v-list-item-subtitle v-html="item.date"></v-list-item-subtitle>
													</v-list-item-content>
													<v-list-item-action>														
														<v-icon class="mr-2" @click="seeItem(item)" title="Ver ficha"> mdi-eye </v-icon>
													</v-list-item-action>
												</v-list-item>
											</v-list>
										</v-menu>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
					<!-- total de solicitudes asignadas -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total solicitudes asignadas: <br>
									<span class="text-h4"> {{ cardTaskAsignadas.length }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-menu open-on-click left offset-x class="rounded-xl" max-height="450px">
											<template v-slot:activator="{ on, attrs }">
												<v-btn
												color="red accent-3" fab :style="style.v_cardteal" dark
													v-bind="attrs"
													v-on="on"
												>
													<v-icon> mdi-alert-rhombus-outline mdi-24px </v-icon>
												</v-btn>
											</template>

											<v-list nav>
												<v-list-item v-for="(item, index) in cardTaskAsignadas" :key="index" @click="seeItem(item)">
													<v-list-item-avatar> 
														<v-icon color="red accent-3"> mdi-alert-rhombus-outline mdi-24px </v-icon> 
													</v-list-item-avatar>
													<v-list-item-content three-line>
														<v-list-item-title> {{ item.description }} - {{ item.descRequest }} </v-list-item-title>
														<v-list-item-subtitle v-html="item.liable"></v-list-item-subtitle>
														<v-list-item-subtitle v-html="item.date"></v-list-item-subtitle>
													</v-list-item-content>
													<v-list-item-action>														
														<v-icon class="mr-2" @click="seeItem(item)" title="Ver ficha"> mdi-eye </v-icon>
													</v-list-item-action>
												</v-list-item>
											</v-list>
										</v-menu>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
					<!-- total de solicitudes en otros procesos -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total solicitudes en otros procesos: <br>
									<span class="text-h4"> {{ cardTaskPendientes.length }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-menu open-on-click left offset-x class="rounded-xl" max-height="450px">
											<template v-slot:activator="{ on, attrs }">
												<v-btn
													color="orange accent-3" fab :style="style.v_cardteal" dark
													v-bind="attrs"
													v-on="on"
												>
													<v-icon> mdi-list-status mdi-24px </v-icon>
												</v-btn>
											</template>

											<v-list nav>
												<v-list-item v-for="(item, index) in cardTaskPendientes" :key="index" @click="seeItem(item)">
													<v-list-item-avatar> 
														<v-icon color="orange accent-3"> mdi-list-status mdi-24px </v-icon> 
													</v-list-item-avatar>
													<v-list-item-content three-line>
														<v-list-item-title> {{ item.description }} - {{ item.descRequest }} </v-list-item-title>
														<v-list-item-subtitle v-html="item.liable"></v-list-item-subtitle>
														<v-list-item-subtitle v-html="item.date"></v-list-item-subtitle>
													</v-list-item-content>
													<v-list-item-action>														
														<v-icon class="mr-2" @click="seeItem(item)" title="Ver ficha"> mdi-eye </v-icon>
													</v-list-item-action>
												</v-list-item>
											</v-list>
										</v-menu>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>            
			
			<!-- tabla de las actividades finalizadas -->
			<v-row>
				<v-col cols="12" sm="12" md="12" lg="12">
					
				</v-col>
			</v-row>
		</div>
	`
})