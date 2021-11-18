Vue.component('Dashboarduser',{
	
	data:() => ({
		selectedItem: String,
		drawer: null,
		titleModule:'Dashboard',
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
		// datos del usuario
		text:{
			titleOne: 'Información del usuario',
			fullname: String,
			typeuser: String,
			desc: 'Bienvenido a makinet el sistema completo para la gestión y administración <br> de tus actividades dentro de la empresa.'
		},
		// menus de navegación horizontales

		menu_nav_access_direct: [
			{ 
				title: 'Crear tarea', 
				icon: 'mdi-plus-circle-outline', 
				link:'CreateTaskUser', 
				desc: 'Crea tareas para tus colaboradores, es importante guardar la información',
				descbtn: 'Crear tarea'
			},
			{ 
				title: 'Ver solicitudes', 
				icon: 'mdi-file-document-outline', 
				link: 'RequestCustomerUSer', 
				desc: 'Visualiza en una tablas todas las solicitudes que se han realizado.',
				descbtn: 'Ver solicitudes'
			},
			{ 
				title: 'Los Olivos', 
				icon: 'mdi-warehouse', 
				link:'LosOlivosUser',
				desc: 'Visualiza y registra los homenajes que se han registrado para los olivos.',
				descbtn: 'Ver homenajes'
			},
			
		],
		// Estadisticas

		titleStatistics: 'Estadísticas',

		Statistics_desc:{
			title:'Estadisticas',
			requestsTotalTitle: 'Empresas con más solicitudes',
			processRequest: 'Estados de las solicitudes:',
			customers: 'Clientes'

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
				if(res.error == true){
					this.messagePieNoData = res.message
					this.loadingGraphicsBar = false					
				}else{
					this.messagePieNoData = ''
					_.forEach(res.statistics, (value) => {						
						this.totalSolicitudes += parseInt(value.process)
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
								'rgb(29, 233, 182)',
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
		<div class="mb-10 pa-8">		
			<!-- informacion del usuario -->
			<v-row>
				<v-col cols="12" sm="12" md="8" lg="8" xl="8">
					<v-card flat :style="style.v_cardpurple" class="mb-6 pa-2 rounded-xl" color="deep-purple accent-3" dark>
						<v-card-text>
							<span class="display-1" v-html="text.fullname"></span><br>
							<span class="font-weight-light text-h5" v-html="text.typeuser"></span>
						</v-card-text>
					</v-card>

					<v-row>				
						<!-- grafica de barras con los estados de las solicitudes y el total de solicitudes -->
						<v-col cols="12" sm="12" md="12" lg="12" xl="12">
							<v-card flat :style="style.v_card" :loading="loadingGraphicsBar" class="mb-6 rounded-xl">
								<v-card-title>
									<span class="text--secondary subtitle-1">{{ Statistics_desc.processRequest }}</span>
								</v-card-title>
								<v-card-text>							
									<p v-if="messagePieNoData != '' " v-html="messagePieNoData"></p>
									<div v-else style="width:93%;" align="center">
										<canvas id="barRequestMonths"></canvas>
									</div>
								</v-card-text>
								<v-card-text>
									<span> 
										Se muestran los estados de las actividades, actividades finalizadas, actividades pendientes y actividades que se encuentran en otros
										procesos.									
									</span>
								</v-card-text>
							</v-card>
						</v-col>
					</v-row>					
				</v-col>
				<v-col cols="12" sm="12" md="4" lg="4" xl="4">
					<!-- total de solicitudes -->
					<v-card :style="style.v_cardteal" class="mb-6 rounded-xl" color="teal accent-3">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total solicitudes <br>
									<span class="text-h4"> {{ totalSolicitudes }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-icon> mdi-file-document-multiple-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
					<!-- Total de comentarios realizados -->
					<v-card :style="style.v_cardindigo" class="mb-6 rounded-xl" color="indigo accent-3" dark>
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total comentarios <br>
									<span class="text-h4"> 0 </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-icon> mdi-comment-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
					<!-- cards con accesos directos -->
					<v-card v-for="(item, index) in menu_nav_access_direct" :key="index" flat :style="style.v_card" class="mb-6 rounded-xl" :href="item.link">						
						<v-card-text>
							<v-row align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									<span class="title-1 text-h5">{{ item.title }}</span> <br>
									<span class="grey--text"> {{ item.desc }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4" class="text-end">
									<v-btn text fab icon :href="item.link" :color="style.indigo">
										<v-icon> {{ item.icon }} </v-icon>
									</v-btn>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>
	`
})