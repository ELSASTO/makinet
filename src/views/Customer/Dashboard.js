Vue.component('Dashboard',{
	
	data:() => ({
		selectedItem: String,
		drawer: null,
		titleModule:'Dashboard',
		// estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo accent-4',
			deep_purple: 'deep-purple',
			v_card: 'box-shadow: 0px 0px 10px -2px #e0e0e0 !important;',
		},
		// datos del usuario
		text:{
			titleOne: 'Información del usuario',
			fullname: String,
			typeuser: String,
			desc: 'Bienvenido a makinet el sistema completo para la gestión y administración <br> de tus actividades dentro de la empresa.'
		},
		// menus de navegación horizontales

		menu_nav_access_direct: [
			// { 
			// 	title: 'Crear tarea', 
			// 	icon: 'mdi-plus-circle-outline', 
			// 	link:'CreateTask', 
			// 	desc: 'Crea tareas para tus colaboradores, es importante guardar la información',
			// 	descbtn: 'Crear tarea'
			// },
			{ 
				title: 'Ver solicitudes', 
				icon: 'mdi-file-document-outline', 
				link: 'RequestCustomer', 
				desc: 'Visualiza en una tablas todas las solicitudes que se han realizado.',
				descbtn: 'Ver solicitudes'
			},
			// { 
			// 	title: 'Los Olivos', 
			// 	icon: 'mdi-warehouse', 
			// 	link:'',
			// 	desc: 'Visualiza y registra los homenajes que se han registrado para los olivos.',
			// 	descbtn: 'Ver homenajes'
			// },
			
		],
		// Estadisticas

		titleStatistics: 'Estadísticas',

		Statistics_desc:{
			title:'Estadisticas',
			requestsTotalTitle: '#Empresas con más solicitudes',
			processRequest: '#Estados de las solicitudes - Total de solicitudes:',
			customers: '#Clientes'

		},

		labelsPie1: Array(),
		infoPie1: Array(),

		labelsBar1: Array(),
		infoBar1: Array(),

		tableRequestCustomerPricesDOM: [],


		loading: true,
		loadingGraphicsBar: true,
		loadingGraphicsPie: true,
	
		transition: 'scale-transition',
		attrs: {
			class: 'mb-6',
			boilerplate: true,
			elevation: 2,
		},

		totalSolicitudes: 0, 
		messagePieNoData: '',
		messageTableNoData: '',

	}),
	created(){

	},
	mounted(){
		this.cardInfoUser()
		this.pieRequestCustomer()
		this.barRequestProcess()
		this.tableRequestCustomerPrices()
	},
	methods:{

		cardInfoUser(){
			(sessionStorage.getItem('nameuser') != '') ? this.text.fullname = sessionStorage.getItem('nameuser') : '';
			(sessionStorage.getItem('typeuser') != '') ? this.text.typeuser = sessionStorage.getItem('typeuser') : '';
		},

		// funcion que trae la información de las 5 empresas con mas solicitudes
		// dentro de la misma petición crea el grafico

		pieRequestCustomer(){

			fetch('../php/statistics/getCountRequestCustomers.php')
			.then(response => response.json())
			.then(res => {
				console.log(res);
				if(res.error == true){
					this.messagePieNoData = res.message
					this.loadingGraphicsPie = false
				}else{
					this.messagePieNoData = ''
					_.forEach(res.statistics, (value) => {
						this.labelsPie1.push(value.nameCustomer)
						this.infoPie1.push(value.totalRequests)
					})
				
					const data = {
						labels : this.labelsPie1,
						datasets: [{
							label: 'Generales',
							data: this.infoPie1,
							backgroundColor: [
								'rgb(171, 71, 188)',
								'rgb(255, 205, 86)',
								'rgb(255, 99, 132)',
								'rgb(66, 165, 245)',
								'rgb(255, 167, 38)',
							],
							hoverOffset: 4
						}],
						options: {
							plugins:{
								legend:{
									labels:{
										align: 'start',
										padding: '10'
									}
								}
							}
						}
					};
					
					const config = {
						type: 'pie',
						data: data,
					};
		
					new Chart(
						document.getElementById('myChart'),
						config
					);
					this.loadingGraphicsPie = false
				}
			})
		},

		// funcion que trae la información de estados en el cual se encuentra la solicitud
		// dentro de la misma petición crea el grafico
		barRequestProcess(){

			fetch('../php/statistics/getCountStateRequest.php')
			.then(response => response.json())
			.then(res => {
				console.log(res)
				if(res.error == true){
					this.messagePieNoData = res.message
					this.loadingGraphicsBar = false					
				}else{
					this.messagePieNoData = ''
					_.forEach(res.statistics, (value) => {
						this.totalSolicitudes += value.process
					})
					_.forEach(res.statistics, (value) => {
						this.labelsBar1.push(value.description)
						this.infoBar1.push(value.process)
					})

					const data = {
						labels: this.labelsBar1,
						datasets: [{
							label: 'Cantidad',
							data: this.infoBar1,
							backgroundColor: [
								'rgb(102, 187, 106)',
								'rgb(255, 99, 132)',
								'rgb(255, 205, 86)',							
							],
							
							hoverOffset: 4
						}]
					};
					
					const config = {
						type: 'bar',
						data: data,
						options: {
							indexAxis: 'y',
							plugins: {
								legend: {
									display: false,
								}
							}
						}
					};

					
					new Chart(
						document.getElementById('barRequestMonths'),
						config
					);
					this.loadingGraphicsBar = false
				}
			});
		},
		
		// funcion que trae la información del cliente precios el total de todas las solicitudes
		tableRequestCustomerPrices(){
			fetch('../php/statistics/getCustomersRequestPrices.php')
			.then(response => response.json())
			.then(data => {
				if(data){
					_.forEach(data.statistics, (value) => {
						const item = {
							customer: () =>{
								return `<a href="SeeFileCustomer?id=${value.idCustomer}&business=${value.customer}">${value.customer}</a>`	
							}, 
							count: value.count,
							total: () => {
								if(value.total == 0){
									return 'Sin costos de actividad.';
								}else{
									return `$ ${Intl.NumberFormat().format(value.total)}`
								}
								
							},
							saldo: () => {
								if(value.saldo == 0){
									return 'No hay saldo pendiente.';
								}else{
									return `$ ${Intl.NumberFormat().format(value.saldo)}`
								}							
							}
						}
						this.tableRequestCustomerPricesDOM.push(item)
					})
					this.loading = false
				}
			})
		}
	},
	template: /*html*/`
		<div class="mb-10">
			<v-row class="mt-md-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
					<h1 class="display-1" style="color:#12263f;">{{ titleModule }}</h1>
					<v-divider></v-divider>
				</v-col>
			</v-row>
			<!-- informacion del usuario -->
			<v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
					<v-card color="deep-purple accent-2" dark flat :style="style.v_card" >
						<v-card-text>
							<div class="mb-3">
								<span v-html="text.titleOne"></span>
							</div>
							<p class="display-1" v-html="text.fullname"></p>
							<p class="display-1 font-weight-thin" v-html="text.typeuser"></p>
							<div v-html="text.desc"></div>
						</v-card-text>
					</v-card>				
				</v-col>
			</v-row>
			<!-- accesos directos a las opciones del menú de navegación -->		
			<v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col v-for="(item, index) in menu_nav_access_direct" :key="index" cols="12" sm="12" md="4" lg="4">
						<v-card flat :style="style.v_card">
							<v-card-title>
								<span class="title-1 font-weight-light">{{ item.title }}</span>
								<v-spacer></v-spacer>
								<v-icon :color="style.indigo"> {{ item.icon }} </v-icon>
							</v-card-title>
							<v-divider></v-divider>
							<v-card-text>
								<span class="grey--text"> {{ item.desc }} </span>
							</v-card-text>
							<v-card-actions>
								<v-btn text :href="item.link" :color="style.indigo">
									{{ item.descbtn }}
								</v-btn>
							</v-card-actions>
						</v-card>
				</v-col>
			</v-row>

			<v-row class="mt-md-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
					<h1 class="display-1" style="color:#12263f;">{{ titleStatistics }}</h1>
					<v-divider></v-divider>
				</v-col>
			</v-row>
			<!-- estadisticas que se visualizan en la dashboard -->
			<v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">

				<!-- pie con los estados de las solicitudes y el total de solicitudes -->
				<v-col cols="12" sm="12" md="4" lg="4">
					<v-card flat :style="style.v_card" :loading="loadingGraphicsPie">
						<v-card-title>
							<span class="text--primary subtitle-1">{{Statistics_desc.requestsTotalTitle}}</span>
						</v-card-title>
						<v-divider></v-divider>
						<v-card-text>
							<p v-if="messagePieNoData != ''" v-html="messagePieNoData"></p>
							<div v-else>
								<canvas id="myChart" width="100" height="100"></canvas>
							</div>
						</v-card-text>
					</v-card>					
      			</v-col>
				
				<!-- grafica de barras con los estados de las solicitudes y el total de solicitudes -->
				<v-col cols="12" sm="12" md="8" lg="8">
					<v-card flat :style="style.v_card" :loading="loadingGraphicsBar">
						<v-card-title>
							<span class="text--primary subtitle-1">{{ Statistics_desc.processRequest }} {{ totalSolicitudes }}</span>
						</v-card-title>
						<v-divider></v-divider>
						<v-card-text>							
							<p v-if="messagePieNoData != '' " v-html="messagePieNoData"></p>
							<div v-else style="width:93%;" align="center">
								<canvas id="barRequestMonths"></canvas>
							</div>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<!-- <v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12" sm="12" md="12" lg="12">
					<v-skeleton-loader
						:loading="loading"
						type="card-heading, table-tbody"
						>
						<v-card flat :style="style.v_card">
							<v-card-title>
								<span class="text--primary subtitle-1"> {{ Statistics_desc.customers }} </span>
							</v-card-title>
							<v-divider></v-divider>
							<v-card-text>
								<p v-if="tableRequestCustomerPricesDOM == '' || tableRequestCustomerPricesDOM == 0" v-html="messageTableNoData"></p>
								<v-simple-table v-slot:default v-else
									fixed-header
									height="350px"
								>
									<thead>
										<th class="text-left"> Id </th>
										<th class="text-left"> Cliente </th>
										<th class="text-left"> Cantidad Solicitudes </th>
										<th class="text-left"> Total </th>
										<th class="text-left"> Saldo </th>
									</thead>
									<tbody>
										<tr
											v-for="(item, index) of tableRequestCustomerPricesDOM"
											:key="index"
										>
											<td> {{ index+1 }} </td>
											<td> <span v-html="item.customer()"></span> </td>											
											<td> {{ item.count }} </td>
											<td> {{ item.total() }}</td>
											<td>
												<div v-if="item.saldo() != 'No hay saldo pendiente.'">
													<v-chip color="red" dark>
														<span v-html="item.saldo()"></span>
													</v-chip>
												</div>
												<div v-else>
													<span v-html="item.saldo()"></span>
												</div>
											</td>
										</tr>
									</tbody>
								</v-simple-table>
							</v-card-text>
						</v-card>
					</v-skeleton-loader>
				</v-col>
			</v-row> -->
		</div>
	`
})