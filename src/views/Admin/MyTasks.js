Vue.component('Mytasks',{
	
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
			scrollY: 'overflow-y:scroll;',
            noScroll: 'overflow-y:none;'
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
				link:'CreateTask', 
				desc: 'Crea tareas para tus colaboradores, es importante guardar la información',
				descbtn: 'Crear tarea'
			},
			{ 
				title: 'Ver solicitudes', 
				icon: 'mdi-file-document-outline', 
				link: 'RequestCustomer', 
				desc: 'Visualiza en una tablas todas las solicitudes que se han realizado.',
				descbtn: 'Ver solicitudes'
			},
			{ 
				title: 'Los Olivos', 
				icon: 'mdi-warehouse', 
				link:'LosOlivos',
				desc: 'Visualiza y registra los homenajes que se han registrado para los olivos.',
				descbtn: 'Ver homenajes'
			},
			
		],

		dialogList: false,
		descTask: null,
        tareas:[],
		taskFinalizadaList: false,

        //tareas
        addListTaskUser:[],
        newTask: null,

		// color tareas
		dialogPickers: '',

		// dialogo actividad
		dialogActivity: false,

		descListTaskUser:{
			id: null, 
			description: null,
			estado: false,
			descripcionDetallada: ''
		}
	}),

	methods:{

		cardInfoUser(){
			(sessionStorage.getItem('nameuser') != '') ? this.text.fullname = sessionStorage.getItem('nameuser') : '';
			(sessionStorage.getItem('typeuser') != '') ? this.text.typeuser = sessionStorage.getItem('typeuser') : '';
		},
		
        agregarLista(){
			this.dialogList = true;			
        },

		// agregar nueva actividad
		addNewList(){
			if(this.descTask != ''){
				
				var data = {
					description: this.descTask,
					estado: false,
				}

				$.ajax({
					method: 'POST',
					url: '../php/post/myTask.php',
					data: data,
					dataType: 'json'
				})
				.done(data => {
					console.log(data);
				})

				this.addListTaskUser.push({
					description: this.descTask,
					done: false
				});
				this.dialogList = false;
				this.descTask = null
				
			}
		},

		// consultar tareas
		getList(){
			
			var _this = this;
			var data = {
				description: this.descTask,
				estado: false,
			}

			$.ajax({
				method: 'GET',
				url: '../php/post/myTask.php/?task=1',
				data: data,
				dataType: 'json'
			})
			.done(data => {
				_.forEach(data, value => {
					const item = {
						id: value.id,
						description: value.description,
						done: value.done
					}
					_this.addListTaskUser.push(item)
				})
			})			
		},

		
		dialogColors(){
			this.dialogPickers = true;
		},

		taskFinalizada(item){
			item.done = false;
		},

		taskPendiente(item){
			item.done = true;
		},


		deleteItemList(item){			
            var i = this.addListTaskUser.indexOf(item);
            if (i !== -1){
               this.addListTaskUser.splice( i, 1 );
            }
        },

		// dialogo para cada actividad
		descActivity(item){
			this.dialogActivity = true;
			this.descListTaskUser = Object.assign({},item);
		}
	},
	mounted(){
		this.getList();
	},
	template: /*html*/`
		<div class="mb-10 pa-8">		
			<!-- informacion del usuario -->
			<v-row align="center">
				<v-col cols="12" sm="12" md="12" lg="12" xl="12">
					<span class="body-1"> Cuaderno de tareas: </span>
					<v-btn rounded color="deep-purple accent-4" text elevation="0" @click="agregarLista">
                        agregar actividad
                        <v-icon right> mdi-plus </v-icon>
                    </v-btn>
					<v-btn rounded color="indigo accent-4" text elevation="0" @click="agregarLista" disabled>
                        crear recordatorio
                        <v-icon right> mdi-bell-ring-outline </v-icon>
                    </v-btn>
                </v-col>
			</v-row>
            <v-row>			
				<v-col cols="12" sm="12" md="12" lg="4" xl="4">
					<v-dialog
						v-model="dialogList"				
						max-width="800"
					>					
						<!-- card de las actividades para realizar -->
						<v-card>
							<v-toolbar color="deep-purple accent-3" dark>
								<h1 class="subtitle-1 font-weight-normal"> Nombre de la actividad: </h1>                        
							</v-toolbar>
							<v-card-text class="mt-4">
								<v-text-field
									v-model="descTask"
									label="Titulo para tu actividad"
									append-outer-icon="mdi-plus-thick"
									@keyup.enter="addNewList"
									@click:append-outer="addNewList"
									hint="Presiona Enter para agregar la actividad"
									color="deep-purple accent-3"
									rounded
									filled
									hide-details
									:autofocus="dialogList ? true : false"
								></v-text-field>					
							</v-card-text>  
							<v-card-actions>
								<v-btn
									color="deep-purple accent-4"
									rounded
									text
									@click="addNewList"
								> Crear </v-btn>
								<v-btn
									color="red accent-3"
									rounded
									text
									@click="dialogList = false"
								> Cancelar </v-btn>
							</v-card-actions>                 
                    	</v-card>
					</v-dialog>
													
					<span class="text--secondary">Hoy:</span><br><br>
					
					<div class="contenedor-lista rounded-lg">					
						<v-card v-for="(item, index) in addListTaskUser" :key="index"
							class="rounded-lg mb-3" :style="style.v_card" >
							<v-card-text>					
								<v-row no-gutters align="center" justify="center">
									<v-col cols="9" sm="9" md="9" lg="9" xl="9" @click="descActivity(item)" class="title-activity-dialog">
										<span class="font-weight-regular text--secondary body-1"> {{ item.description }} </span>
									</v-col>
									<v-col cols="3" sm="3" md="3" lg="3" xl="3" align="right">
										<v-btn icon @click="taskFinalizada(item)" v-if="item.done == true" :color="item.done == true ? 'red accent-3' : ''" >
											<v-icon> mdi-close </v-icon>
										</v-btn>
										<v-btn icon @click="taskPendiente(item)" v-else :color="item.done == false ? 'teal accent-3' : 'teal accent-3'" >
											<v-icon> mdi-check </v-icon>
										</v-btn>
										<v-btn icon color="red accent-3" @click="deleteItemList(item)">
											<v-icon> mdi-delete </v-icon>
										</v-btn>
									</v-col>
								</v-row>
							</v-card-text>
						</v-card>
						<v-dialog
							v-model="dialogActivity"				
							max-width="1000"
							height="800px"						
						>
							<v-card class="pa-2 pt-4">							
								<v-card-text>
									<v-row>
										<v-col cols="12" sm="12" md="12" lg="12" xl="12">
											<v-text-field
												:value="descListTaskUser.description"
												prepend-icon="mdi-format-title"
												hide-details
												solo
												flat
												filled
											></v-text-field>
										</v-col>
									</v-row>
									<v-row>
										<v-col cols="12" sm="12" md="10" lg="10" xl="10">
											<span class="font-weight-regular body-2"> Descripcion </span>
											<v-textarea
												v-model="descListTaskUser.descripcionDetallada"
												solo
												flat
												prepend-icon="mdi-format-list-bulleted"
												filled
												rows="2"											
												label="Añade una descripcion mas detallada..."											
											></v-textarea>
											<v-row no-gutters class="mb-3">
												<v-col cols="9">
													<span class="font-weight-regular body-2"> Actividad </span>
												</v-col>
												<v-col cols="2">
													<v-btn color="deep-purple accent-4" small text> 
														Mostrar detalles
													</v-btn>
												</v-col>
											</v-row>
											<v-row no-gutters>
												<v-col cols="12">
												<v-text-field
													filled
													rounded
													label="Agregar comentario..."
													append-icon="mdi-comment-outline"
													hide-details
													clearable
													color="deep-purple accent-3"
													autocomplete="off"
												></v-text-field>
												</v-col>												
											</v-row>
										</v-col>
										<v-col cols="12" sm="12" md="2" lg="2" xl="2">
											<div class="mb-2">
												<span class="font-weight-regular body-2"> Añadir: </span>
											</div>
											<div>
												<v-btn small text class="mb-3"> 
													<span class="text--secondary">Etiquetas</span>
													<v-icon right color="deep-purple accent-3"> mdi-label </v-icon>
												</v-btn>
												<v-btn small text class="mb-3"> 
													<span class="text--secondary">Checklist</span>
													<v-icon right color="deep-purple accent-3"> mdi-check-box-outline </v-icon>
												</v-btn>
											</div>
										</v-col>	
									</v-row>
								</v-card-text>
								<v-card-actions>
									<span class="text--secondary"> Actividad: {{ descListTaskUser.id }}</span>
								</v-card-actions>
							</v-card>			
						</v-dialog>
					</div>
                </v-col>
				<v-col cols="12" sm="12" md="12" lg="4" xl="4">
					<span class="text--secondary">Ayer:</span>
                </v-col>
			</v-row>

		</div>
	`
})