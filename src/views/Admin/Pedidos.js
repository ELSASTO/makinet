Vue.component('Pedidos',{
	
	data(){
		return{
			selectedItem: String,
			drawer: null,
			titleModule:'Pedidos',
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
			color: '',
			snackbar: false,
			//snackbar2: false,
			messageCreateOrder: '',
			message:'',
			//datos formulario pedidos
			//fechas
			date: new Date().toISOString().substr(0, 10),
			menu: false,

			date2: new Date().toISOString().substr(0, 10),
			menu2: false,
			
			// clientes
			customer_value: '',
			customers:[],
			nameApplicant:'',

			// costos
			saleValue: '',
			descriptionCostos: '',
			precio: 0,
			precios:[],
			total: 0,
			
			costos: [],
			nuevoCosto:[],
			valor:0,
			valorDos:0,
			nuevaDescripcion:'',
			nuevaDescripcionDos:'',
			//descripciones
			description:'',
			//carga
			loading: false,
			campsRules:[
				v => !!v || 'Asegurate de diligenciar el campo',
			],
			headers: [
				{
					text: 'Id pedido',
					align: 'start',
					value: 'id',
				},
				{
					text: 'Fecha Solicitud',
					value: 'fechaSolicitud',
				},
				{ 
					text: 'Fecha Entrega', 
					value: 'fechaEntrega', 
				},
				{
					text: 'Nombre Cliente',
					value: 'cliente'
				},
				{ 
					text: 'Nombre Solicitante', 
					value: 'nombreSolicitante',

				},
				{ 
					text: 'Descripcion', 
					value: 'descripcion',
				},
				{ 
					text: 'Precio Venta', 
					value: 'precioVenta',
					
				},
				{ 
					text: 'Estado', 
					value: 'estado', 
					
				},
				{ 
					text: 'Acciones', 
					value: 'actions', 
					sortable: false 
				},
			],
			requests: [],
			editedIndex: -1,
			loading_table: false,
			editedIndex: -1,
			menu3: false,
			ficha: '',
			List:[],

			editFicha:{
				id:"",
				cliente: "",
				descripcion: "",
				estado: "",
				fechaEntrega: "",
				fechaSolicitud: "",
				nombreSolicitante: "",
				precioVenta: "",
			},
			estados:[
				'Asignado',
				'Finalizado'
			],
			editOrder:{

			},
			Editdialog: false,

			messageNotData: '',
			// loading para el proceso de la solicitud
			loadingProcess: true,
			divider: true, 
			inset: true
		}	

	},
	mounted(){
		this.cardInfoUser();
		this.allCustomers();	
		this.initialize();	
	},
	methods:{
		
		cardInfoUser(){
			(sessionStorage.getItem('nameuser') != '') ? this.text.fullname = sessionStorage.getItem('nameuser') : '';
			(sessionStorage.getItem('typeuser') != '') ? this.text.typeuser = sessionStorage.getItem('typeuser') : '';
		},
		async allCustomers(){
			this.customers = [];
			await fetch('../php/get/customers.php')
				.then(response => response.json())
				.then(data => {
					data.customers.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].name
						}
						this.customers.push(item)
					});
				})
				.catch(err => console.error(err))
		},
		editcostos(editFicha){
			let descriptionCostos = this.nuevaDescripcionDos;
			let valor = parseInt(this.valorDos);

			
			if (descriptionCostos == '' || valor == '') {
				this.snackbar= true;
				this.message= 'Por favor llenar todos los campos';
			} else {
				
				this.nuevoCosto.push({
					descriptionCostos,
					valor,
					valorPesos:Intl.NumberFormat("de-DE").format(this.valorDos),
				});

				let nuevoCosto = this.nuevoCosto[this.nuevoCosto.length - 1]; // retorna el ultimo valor de un arreglo 
				let data = {
					idOrder: editFicha.id,
					descriptionCostos: nuevoCosto.descriptionCostos,
					valor: nuevoCosto.valor
				}
				$.ajax({
					url: '../php/post/inserOrder.php',
					method: 'POST', //en este caso
					data: data,
					dataType : 'json',
					
				}).done( data => {

					if (data.error == false ) {
						this.snackbar= true;
						this.message= 'El costo se agrego exitosamentge';
						//this.Editdialog = false;
						//this.nuevoCosto = [];	
					} else {
						this.snackbar= true;
						this.message= 'No se pudo agregar el costo';
					}
				});

				this.nuevaDescripcionDos = '';
				this.valorDos = 0;	
				this.$refs.formCreateOrder.resetValidation();
			}
			this.precios = this.costos.map( x => parseInt(x.valor));
			_.forEach(this.precios, value => {
				this.total += value;
			})
		},
		descostos(){
			let descriptionCostos = this.nuevaDescripcion;
			let valor = parseInt(this.valor);

			
			if (descriptionCostos == '' || valor == '') {
				this.snackbar= true;
				this.message= 'Por favor llenar todos los campos';
			} else {
				
				this.costos.push({
					descriptionCostos,
					valor,
					valorPesos:Intl.NumberFormat("de-DE").format(this.valor),
				});
				this.nuevaDescripcion = '';
				this.valor = 0;	
				this.$refs.formCreateOrder.resetValidation();
			}
			// this.precios = this.costos.map( x => parseInt(x.valor));
			// _.forEach(this.precios, value => {
			// 	this.total += value;
			// })
		},

		eliminar(index){
            this.costos.splice(index,1);
        },
		// EliminarCosto(index){
		// 	this.nuevoCosto.splice(index,1);
		// },
		DeleteCosto(item,index){
			const data = {
				id: item.id
			}
			$.ajax({
				url: '../php/post/DeleteCost.php',
				method: 'POST', 
				data,
				dataType : 'json',
			}).done(function(data){
				
				if (data.error == false ) {
					this.snackbar= true;
					this.message= 'Se elimino exitosamente';
					
				} else {
					this.snackbar= true;
					this.message= 'No se pudo eliminar';
				}
			});
			this.List.splice(index,1);
		},

		seeItem (item) {
			this.editedIndex = this.requests.indexOf(item)
            window.location.href = 'SeeOrder?id='+item.id
		},
		editItem (item) {
			this.List = [];
			this.Editdialog = true;
			this.editFicha = Object.assign({}, item)
			
			fetch('../php/get/seeOrder?id=' + item.id)
            .then(response => response.json())
            .then(data => {	
		
				data.ordenes.forEach(element =>  {					
					this.List.push({
						id: element.id,
                        descripcion: element.descripcion,
                        precioUnitario: Intl.NumberFormat().format(element.precioUnitario),
                    })              

                });
                if(this.List.length !== 0 ) {
                    this.loadingProcess = false;
                }else{
                    this.loadingProcess = false;
                }
            })
        },
		updateorder(editFicha){
			const data = {
				idOrder: editFicha.id,
				nombreSolicitante: editFicha.nombreSolicitante,
				fechaEntrega: editFicha.fechaEntrega,
				fechaSolicitud: editFicha.fechaSolicitud,
				descripcion: editFicha.descripcion,
				precioVenta: editFicha.precioVenta,
				estado: editFicha.estado,
			};
			$.ajax({
				url: '../php/post/actualizaOrder.php',
				method: 'POST', //en este caso
				data,
				dataType : 'json',
				
			}).done( data => {
				if (data.error == false ) {
					this.snackbar= true;
					this.message= 'Se actulizo exitosamente';
					this.nuevoCosto=[];
					this.Editdialog = false;

				} else {
					this.snackbar= true;
					this.message= 'No hay cambios para el pedido';
					this.snackbar= false;
					this.nuevoCosto=[];
					this.Editdialog = false;
				}
			})
			

		},
		createOrder(){
		
			if(this.date == ''  || this.date2 == '' || this.customer_value =='' || this.nameApplicant == '' || this.description == '' || this.saleValue == ''){
				this.snackbar= true;
				this.message= 'Asegurate de haber llenado todos los campos';
                this.$refs.formCreateOrder.validate();
                setTimeout(()=>{
                    this.$refs.formCreateOrder.resetValidation();
                },2000)
            }else{
				this
				const data = {
					date: this.date,
					date2: this.date2,
					customer_value: this.customer_value,
					nameApplicant: this.nameApplicant,
					description: this.description,
					saleValue: this.saleValue,
					costos: this.costos,
				};
				$.ajax({
					url: '../php/post/createOrder.php',
					method: 'POST', //en este caso
					data: data,
					dataType : 'json',
					
				}).done( data => {

					if (data.error == false ) {
						this.snackbar= true;
						this.message= 'Orden guardada exitosamente';
						
						this.customer_value = '';
						this.costos = [];
						this.saleValue = '';
						this.nameApplicant ='';
						this.description = '';
						this.descriptionCostos = '';
						this.precio = 0;
						this.$refs.formCreateOrder.resetValidation();

					} else {
						this.loading = true;
						this.snackbar= true;
						this.message= 'No se pudo crear la orden';
					}

				}).catch(error => console.log(error));
            }
		},
		
		initialize () {
            fetch('../php/get/orderList.php')
                .then(response => response.json())
                .then(data => {
                    data.pedidos.forEach((value, index, element)=>{                        
                        this.requests.push({
                            id: element[index].id,
                           	fechaSolicitud: element[index].fecha_solicitud,
                            fechaEntrega: element[index].fecha_entrega,
							cliente: element[index].cliente,
                            nombreSolicitante: element[index].nombre_solicitante,
                            descripcion: element[index].descripcion,
                            precioVenta: element[index].precio_venta,
                            estado: element[index].estado
                        })
                        
                    }),
					
                    setTimeout(() => {
                        this.loading_table = false
                    }, 1000);
                });
        },

	},
	template: /*html*/`
		<div class="mb-10 pa-8">		
				<!-- informacion del usuario -->
			<v-row>
				<v-col cols="12" sm="12" md="12" lg="8" xl="8">
					<v-form id="formCreateOrder" ref="formCreateOrder" >
						<v-card flat :style="style.v_card" class="rounded-xl" :loading="loading">
							<v-toolbar flat color="indigo accent-3" dark>
								Orden de pedido
							</v-toolbar>
							<v-card-text >
								<v-row>
									<v-col cols="6">
									<!-- fecha solicitud -->
										<v-menu
											ref="menuDate"
											v-model="menu"
											:close-on-content-click="false"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="date"
													name="date"
													label="Fecha solicitado"
													hint="Fecha de solicitud del pedido"
													prepend-icon="mdi-calendar"
													v-bind="attrs"
													v-on="on"
													rounded
													filled
													dense
													:rules="campsRules"
													hide-details=""
												></v-text-field>
											</template>
											<v-date-picker
												v-model="date"
												no-title
												@input="menu = false"
												:color="style.colorInput"
											></v-date-picker>
										</v-menu>
									</v-col>
									<v-col cols="6">
											<!-- fecha entrega -->
										<v-menu
										
											ref="menuDate"
											v-model="menu2"
											:close-on-content-click="false"
											transition="scale-transition"
											offset-y
											max-width="290px"
											min-width="auto"
										>
											<template v-slot:activator="{ on, attrs }">
												<v-text-field
													v-model="date2"
													name="date2"
													label="Fecha Entrega"
													hint="Fecha de solicitud del pedido"
													prepend-icon="mdi-calendar"
													v-bind="attrs"
													v-on="on"
													rounded
													:rules="campsRules"
													filled
													dense
													hide-details=""
												></v-text-field>
											</template>
												<v-date-picker
													v-model="date2"
													no-title
													@input="menu = false"
													:color="style.colorInput"
												></v-date-picker>
										</v-menu>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="6">
										<v-autocomplete
											v-model="customer_value"
											name="customer_value"
											:items="customers"
											:color="style.colorInput"
											:item-color="style.colorInput"
											prepend-icon="mdi-account-group-outline"
											item-text="description"
											item-value="value"
											rounded
											:rules="campsRules"
											filled
											dense
											label="Cliente"
											hide-details=""
										></v-autocomplete>									
									</v-col>
									<v-col cols="6">
										<v-text-field		
											v-model="nameApplicant"
											name="nameApplicant"
											prepend-icon="mdi-account-outline"
											rounded
											:rules="campsRules"
											filled
											dense
											label="solicitado por"
											hide-details=""
										></v-text-field>
									</v-col>
								</v-row>
							</v-card-text>
							<v-card-text>
								<v-textarea
									v-model="description"
									name="description"
									prepend-icon="mdi-format-title"
									rounded
									:rules="campsRules"
									filled
									label="Observaciones"
									rows="2"
								></v-textarea>
								<v-row>
									<v-col cols="12" sm="12" md="8" lg="8" xl="8">
										<v-text-field
											v-model="nuevaDescripcion"
											prepend-icon="mdi-format-title"
											rounded
											filled
											:rules="campsRules"
											dense
											label="Descripcion"
											hide-details=""
										></v-text-field>
									</v-col>
									<v-col cols="12" sm="12" md="4" lg="4" xl="4">
										<v-text-field
											v-model="valor"
											type="number"
											prepend-icon="mdi-currency-usd"
											rounded
											filled
											:rules="campsRules"
											dense
											label="valor"
											hide-details=""
											@keyup.enter="descostos"
										></v-text-field>
									</v-col>
								</v-row>
								<div class="mb-3 text-end ma-3">
									<v-btn
										color="indigo accent-2"
										rounded
										dark
										elevation="0"
										@click="descostos"
									>
										agregar costos
										<v-icon right> mdi-plus </v-icon>
									</v-btn>
								</div>
								<v-row no-gutters cols="12" sm="12" md="12" lg="12" xl="12">
									<v-col>
										<v-list>
											<template  v-for="(item, indexAgr) of costos">											
												<v-list-item  :key="indexAgr">
													<v-list-item-avatar>
														{{indexAgr}}
													</v-list-item-avatar>
													<v-list-item-content>
														<v-list-item-title> &nbsp&nbsp {{  item.descriptionCostos }}</v-list-item-title>
														<v-list-item-subtitle> $ {{item.valorPesos}} </v-list-item-subtitle>
													</v-list-item-content>
													<v-list-item-action cols="6" sm="4" md="6" lg="2" class="text-center">
														<v-btn @click="eliminar(indexAgr)" icon text color="red accent-3" > <v-icon> mdi-delete </v-icon> </v-btn>
													</v-list-item-action>
												</v-list-item>
												<v-divider
													v-if="indexAgr < costos.length - 1"
												></v-divider>
											</template>
										</v-list>
									</v-col>
								</v-row>
								<v-row>
									<v-col cols="12" sm="12" md="12" lg="12" xl="12">
										<v-text-field										
											v-model="saleValue"
											name="saleValue"
											type="number"
											:rules="campsRules"
											prepend-icon="mdi-currency-usd"
											rounded
											filled
											dense
											label="Precio de venta"
											hide-details=""
											@keyup.enter="createOrder"
										></v-text-field>
									</v-col>
								</v-row>
							</v-card-text>
							<v-card-actions>
								<v-btn
									color="indigo accent-3"
									rounded
									dark
									elevation="0"
									id='createOrder'
									@click="createOrder"
								>
									 Crear orden
								</v-btn>
							</v-card-actions>
						</v-card>
					</v-form>
					<v-snackbar
						rounded="pill"
						v-model="snackbar"
						:timeout="3000"						
						color="blue-grey"
						elevation="24"
					>
						<span> {{ message }} </span> 
						<template v-slot:action="{ attrs }">
							<v-btn
								color="indigo"
								text
								v-bind="attrs"
								@click="snackbar = false"
							> Close </v-btn>
						</template>
					</v-snackbar>
                </v-col>
			</v-row>

			<!--/////////////////////////////////////////////////////////////////
				/////////// TABLA DE ORDENES////////////////////////////////////
				////////////////////////////////////////////////////////////////-->
			<v-row>
				<v-data-table
					:loading="loading_table"
					:headers="headers"
					:items="requests"
					class="elevation-1"
				>
					<!-- BOTONES DE ACCIONES -->
					<template v-slot:item.actions="{ item }">
						<v-icon small class="mr-2" @click="seeItem(item)" title="Ver orden"> mdi-eye </v-icon>
						<v-icon small class="mr-2" @click="editItem(item)" title="Editar"> mdi-pencil</v-icon>
						<v-icon small class="mr-2" @click="printItem(item)" title="Imprimir"> mdi-printer </v-icon>
					</template>
				</v-data-table>
			</v-row>
			<!--/////////////////////////////////////////////////////////////////
				/////////// EDITAR DE ORDENES////////////////////////////////////
				////////////////////////////////////////////////////////////////-->
			<template>
				<v-row justify="center">
					<v-dialog
						v-model="Editdialog"
						width="800px"
						flat :style="style.v_card" class="rounded-xl" :loading="loading"
					>
						<v-card>
							<v-toolbar class="mb-3" flat color="indigo accent-3" dark>
								<h3 class="font-weight-regular"> Pedido del cliente: {{ editFicha.cliente }}</h3>
								<v-spacer/>
								<h3 class="font-weight-regular"> Pedido #0{{ editFicha.id }}</h3>
							</v-toolbar>
							<v-card-text>
							<v-row>
							<v-col >
								<v-text-field
									label="Nombre Solicitante"
									v-model="editFicha.nombreSolicitante"
								></v-text-field>
							</v-col>
							</v-row>
							<v-row>
								<v-col>
									<v-text-field
										v-model="editFicha.fechaEntrega"
										label="Fecha Entrega"
									></v-text-field>
								</v-col>
								<v-col>
									<v-text-field
										v-model="editFicha.fechaSolicitud"
										label="Fecha Solicitud"
									></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col >
									<v-text-field
										label="Descripcion"
										v-model="editFicha.descripcion"
									></v-text-field>
								</v-col>
							</v-row>
							<v-row>
								<v-col >
									<v-text-field
										label="Precio Venta"
										v-model="editFicha.precioVenta"
									></v-text-field>
								</v-col>
								<v-col >
									<v-select
										:items= "estados"
										label="Estado"
										v-model="editFicha.estado"
									></v-select>
								</v-col>
							</v-row>
							<v-row>
								<v-col >
									<v-text-field
										label="Agregar Orden"
										v-model="nuevaDescripcionDos"
									></v-text-field>
								</v-col>
								<v-col >
									<v-text-field
										label="Precio"
										v-model="valorDos"
									></v-text-field>
								</v-col>
							</v-row>
							<div class="mb-3 text-end ma-3">
									<v-btn
										color="indigo accent-2"
										rounded
										dark
										elevation="0"
										@click="editcostos(editFicha)"
									>
										agregar costos
										<v-icon right> mdi-plus </v-icon>
									</v-btn>
							</div>
							<v-row no-gutters cols="12" sm="12" md="12" lg="12" xl="12">
									<v-col>
										<v-list>
											<template v-for="(item, index) in nuevoCosto">											
												<v-list-item :key="index">
													<v-list-item-avatar>
														{{index}}
													</v-list-item-avatar>
													<v-list-item-content>
														<v-list-item-title>Descripcion: {{  item.descriptionCostos }}</v-list-item-title>
														<v-list-item-subtitle> $ {{item.valorPesos}} </v-list-item-subtitle>
													</v-list-item-content>
													<v-list-item-action cols="6" sm="4" md="6" lg="2" class="text-center">
														<v-btn @click="DeleteCosto(item, index)" icon text color="red accent-3" > <v-icon> mdi-delete </v-icon> </v-btn>
													</v-list-item-action>
												</v-list-item>
												<v-divider
													v-if="index < nuevoCosto.length - 1"
												></v-divider>
											</template>
										</v-list>
									</v-col>
								</v-row>
								<v-skeleton-loader
									:loading="loadingProcess"
									class="mx-auto rounded-xl"
									type="article"
								>
									<v-list>
										<v-list-item v-for="(item, index in List" :key="index">
											<v-list-item-avatar>
												{{index+1}}
											</v-list-item-avatar>
											<v-list-item-content>
												<v-list-item-title> Descripcion: {{ item.descripcion }} </v-list-item-title>
												<v-list-item-subtitle> $  {{ item.precioUnitario  }} </v-list-item-subtitle>
											</v-list-item-content>
											<v-list-item-action>
												<v-btn @click="DeleteCosto(item, index)" icon text color="red accent-3" > <v-icon> mdi-delete </v-icon> </v-btn>
											</v-list-item-action>
										</v-list-item>
									</v-list>
									</v-skeleton-loader>
									<v-card-actions>
										<v-spacer></v-spacer>
											<v-btn
											depressed
											color="primary"
											@click="updateorder(editFicha)"
											>
											Guardar
										</v-btn>
									</v-card-actions>
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-row>
			</template>
		</div>
	`
})