Vue.component('Createpieceuser',{
	data:() => ({

		titleModule: 'Pieza de diseño',
		// estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			deep_purple: 'deep-purple',
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			cyan: 'cyan',
			colorinput: 'teal accent-4',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important'
		},

		infoCard:{
			icon: 'mdi-brush mdi-48px ',
			head: 'Design',
			title: 'Crear pieza de diseño',
			desc: 'Crea las piezas de diseño a tus diseñadores de la empresa.',
			btnCreate: 'Crear pieza'
		},

		rules:[
			v => !!v || 'Diligencie el campo',
		],

		e1: 1,
		loading: false,
		absolute: true,
      	overlay: false,
		responseMessage: '',

		customers:[],
		customer:'',

		liables:[],
		liable: '',

		date: new Date().toISOString().substr(0, 10),
      	menu: false,

		objectives:[],
		objectivePiece: '',

		socials:[],
		objectiveSocial: '',

		descripcionPost: '',
		copyPrincipal:'',
		copyExterno: '',
		hashtag: '#',
		arroba: '@',
		keyword: '',

		responseTaskSuccess: false,
		responseTaskError: false,

		message_success: 'Se creo la pieza correctamente',
		message_error: 'Asegurate de diligenciar los campos necesarios para crear la pieza.',

		snackbar: false,
		snackbarColor: false,
		messageCreatePiece: '',

		// actividades para crear las piezas graficas
		actividades:[]

	}),
	computed:{

	},
	methods:{
		// funcion para crear la pieza
		createdPiece(){
			if(this.customer == '' || this.liable == '' || this.date == '' || this.objectivePiece == '' || this.objectiveSocial == ''
				|| this.descripcionPost == '' || this.copyPrincipal == '' || this.copyExterno == '' || this.hashtag == '' || this.arroba == '' || this.keyword == ''){

					this.$refs.form2.validate();
					this.responseTaskError = true
					setTimeout(() => {
						this.responseTaskError = false
					}, 3000);	
			}else{
				this.loading = true;
				const data = new FormData(document.getElementById('formCreatePieces'))
				fetch('../php/post/createPieceDigitalCustomer',{
					method:'POST',
					body: data,
				})
				.then(response => response.json())
				.then(data => {
					if(data.error == false){
						this.responseTaskSuccess = true
						setTimeout(() => {
							this.responseTaskSuccess = false
						}, 3000);
						this.responseMessage = data.message
						this.overlay = true
						this.$refs.form2.reset()
						this.hashtag = '#'
						this.arroba = '@'
						setTimeout(() => {
							this.loading = false
						}, 2000);
						
						this.snackbar = true
						this.snackbarColor = true
						this.messageCreatePiece = 'Se creo la pieza correctamente.'
					}else{

						this.snackbar = true
						this.snackbarColor = false
						this.messageCreatePiece = 'No se puedo crear la pieza.'
					}
				})
				.catch(err => console.log(err))
			}
		},
		// obtiene los titulos de las actividades para relacionar la pieza.
		async getTitleActivitys(){
			await fetch('../php/get/requestCustomer.php')
			.then(response => response.json())
			.then(data => {
				_.forEach(data.request, value => {
					const item = {
						value: value.id,
						description: value.activity
					}
					this.actividades.push(item);
				});
			})
		},
		// obtiene todos los clientes
		async getCustomers(){
			await fetch('../php/get/customers')
				.then(response => response.json())
				.then(data => {
					data.customers.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].name
						}
						this.customers.push(item)
					})
				})
				.catch(err => console.error(err))
		},
		// obtiene el responsable para asignar la pieza
		async getLiables(){
			await fetch('../php/get/liable.php')
				.then(response => response.json())
				.then(data => {
					data.liables.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.liables.push(item)
					})
				})
				.catch(err => console.error(err))
		},
		// obtiene los objetivos de la pieza digital a publicar
		async objective(){
			await fetch('../php/get/piecesDigitalObjective')
				.then(response => response.json())
				.then(data => {
					data.objectives.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.objectives.push(item);
					})
				})
				.catch(err => console.error(err))
		},
		// obtiene las redes sociales donde sera publicada la pieza
		async socialMedia(){
			await fetch('../php/get/piecesDigitalSocialMedia')
				.then(response => response.json())
				.then(data => {
					data.social.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.socials.push(item)
					})
				})
				.catch(err => console.error(err))
		},
		// reemplaza las espacios por hashtaf
		replaceHashtag(){
			const hashtag = this.hashtag.replace("  ", " #")
			this.hashtag = hashtag
		},
		// reemplaza las espacios por hashtaf
		replaceArroba(){
			const arroba = this.arroba.replace("  ", " @")
			this.arroba = arroba
		},

		// ver piezas creadas
		seePiece(){
			window.location.href = "RequestCustomer.php";
		}
	},
	mounted(){
		this.getCustomers();
		this.getLiables();
		this.objective();
		this.socialMedia();
		this.getTitleActivitys();
	},
	template: /*html*/`
		<v-container fluid class="pa-8">
			<v-form ref="form2" id="formCreatePieces">
				<v-row>
					<v-col cols="12" sm="12" md="8" lg="8" xl="8">
						<v-card :style="style.v_card" class="rounded-xl">
							<v-card-text class="body-1">
								Crear pieza gráfica
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
				<v-row>
					<!-- card datos de la ficha -->
					<v-col cols="12" sm="12" md="8" lg="8" xl="8">
						<v-card :style="style.v_card" class="mb-6 rounded-xl">
							<v-stepper v-model="e1" elevation="0">
								<v-stepper-header>
									<v-stepper-step :complete="e1 > 1" step="1" color="teal accent-3"> Objetivos principales </v-stepper-step>
									<v-divider></v-divider>
									<v-stepper-step :complete="e1 > 2" step="2" color="teal accent-3"> Cliente </v-stepper-step>
									<v-divider></v-divider>
									<v-stepper-step step="3" color="teal accent-3"> Name of step 3 </v-stepper-step>
								</v-stepper-header>

								<v-stepper-items>
									<v-stepper-content step="1">
										<v-row align="center" justify="center">
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- titulos para la pieza -->
												<v-autocomplete
													:items="actividades"
													item-value="value"
													item-text="description"
													prepend-icon="mdi-file-document-edit-outline"
													name="activity_piece"
													color="light-blue"
													item-color="light-blue"
													label="Actividad / Tarea"
												></v-autocomplete>
											</v-col>
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- fecha de publicacion de la pieza -->
												<v-menu
													ref="menu"
													v-model="menu"
													:close-on-content-click="false"
													:return-value.sync="date"
													transition="scale-transition"
													offset-y
													min-width="auto"
												>
													<template v-slot:activator="{ on, attrs }">
													<v-text-field
														v-model="date"
														name="Date"
														:color="style.colorinput"
														label="Fecha publicacion"
														prepend-icon="mdi-calendar"
														readonly
														v-bind="attrs"
														v-on="on"
													></v-text-field>
													</template>
													<v-date-picker v-model="date" no-title scrollable>
														<v-spacer></v-spacer>
														<v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
														<v-btn text color="primary" @click="$refs.menu.save(date)"> OK </v-btn>
													</v-date-picker>
												</v-menu>
											</v-col>
										</v-row>
										<v-row align="center" justify="center">
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- objetivo de las piezas -->
												<v-select
													v-model="objectivePiece"
													name="Objective"
													:color="style.colorinput"
													:items="objectives"
													:rules="rules"
													item-value="description"
													item-text="description"
													:item-color="style.colorinput"
													prepend-icon="mdi-crosshairs-gps"
													label="Objetivo"
													clearable
													multiple
													small-chips
												></v-select>
											</v-col>
											<v-col cols="12" sm="12" md="6" lg="6" xl="6">
												<!-- redes sociales -->
												<v-select
													v-model="objectiveSocial"
													name="Social"
													:color="style.colorinput"
													:items="socials"
													:rules="rules"
													:item-color="style.colorinput"
													item-value="description"
													item-text="description"
													prepend-icon="mdi-share-variant-outline"
													label="Redes sociales"
													clearable
													multiple
													small-chips
												></v-select>
											</v-col>
										</v-row>
										<v-row align="center" justify="center">
											<v-col cols="12" sm="12" md="12" lg="12" xl="12">
												<!-- hashtag -->
												<v-textarea
													v-model="hashtag"
													name="Hashtag"
													:color="style.colorinput"
													:rules="rules"
													class="mx-2"
													rows="1"
													prepend-icon="mdi-comment-text-outline"
													label="Hashtag"
													hint="Presiona dos espacios para que salga un nuevo #"
													@keyup.space="replaceHashtag"
												></v-textarea>
											</v-col>
										</v-row>
										<v-row align="center" justify="center">
											<v-col cols="12" sm="12" md="12" lg="12" xl="12">
												<!-- menciones -->
												<v-textarea
													v-model="arroba"
													name="Arroba"
													:color="style.colorinput"
													:rules="rules"
													class="mx-2"
													rows="1"
													prepend-icon="mdi-comment-text-outline"
													label="Menciones"
													hint="Presiona espacio para que salga un nuevo #"
													@keyup.space="replaceArroba"
												></v-textarea>
											</v-col>
										</v-row>
										<v-btn elevation="0" rounded small color="teal accent-3" dark @click="e1 = 2"> Siguiente </v-btn>
									</v-stepper-content>

									<v-stepper-content step="2">
										<!-- select de los clientes -->
										<v-autocomplete
											v-model="customer"
											name="Customer"
											:color="style.colorinput"
											:items="customers"
											:rules="rules"
											item-value="value"
											item-text="description"
											prepend-icon="mdi-account-group"
											label="Seleccionar el cliente"
										></v-autocomplete>
										<!-- select de los responsables -->
										<v-autocomplete
											v-model="liable"
											name="Liable"
											:color="style.colorinput"
											:items="liables"
											:rules="rules"
											item-value="value"
											item-text="description"
											prepend-icon="mdi-account"
											label="Seleccionar responsable"
										></v-autocomplete><br>

										<v-btn elevation="0" rounded small color="teal accent-3" @click="e1 = 3" dark> Siguiente </v-btn>
										<v-btn elevation="0" rounded small text color="teal accent-3" @click="e1 = 1"> Atras </v-btn>
									</v-stepper-content>

									<v-stepper-content step="3">
										<v-row>
											<v-col cols="12" sm="12" md="12" lg="12" xl="12">
												<!-- palabras clave -->
												<v-textarea 
													v-model="keyword"
													name="Keywords"
													:color="style.colorinput"
													:rules="rules"
													class="mx-2"
													rows="2"
													prepend-icon="mdi-comment-check-outline"
													label="Palabras clave"
													@keyup.space="replaceArroba"
												></v-textarea>
												<!-- copy principal -->
												<v-textarea
													v-model="copyPrincipal"
													name="Copyprincipal"
													:color="style.colorinput"
													:rules="rules"
													class="mx-2"
													rows="2"
													prepend-icon="mdi-comment-edit"
													label="Copy principal"
												></v-textarea>
												<!-- copy externo -->
												<v-textarea
													v-model="copyExterno"
													name="Copyexterno"
													:color="style.colorinput"
													:rules="rules"
													class="mx-2"
													rows="2"
													prepend-icon="mdi-comment-arrow-right-outline"
													label="Copy externo"									
												></v-textarea>
												<!-- descripcion de la publicacion -->
												<v-textarea
													v-model="descripcionPost"
													name="Post"
													:color="style.colorinput"
													:rules="rules"
													class="mx-2"
													rows="2"
													prepend-icon="mdi-comment"
													label="Descripcion publicacion"
												></v-textarea>
											</v-col>
										</v-row>

										<v-btn elevation="0" rounded small color="teal accent-3" dark @click="createdPiece()"> {{ infoCard.btnCreate }} </v-btn>
										<v-btn elevation="0" rounded small text color="teal accent-3" @click="e1 = 2"> Atras </v-btn>
									</v-stepper-content>
								</v-stepper-items>
							</v-stepper>
						</v-card>
					</v-col>
				</v-row>
			</v-form>

			<v-snackbar
				v-model="snackbar"
				:timeout="3000"
				class="pa-3"
				:color="snackbarColor == false ? 'red accent-3' : 'green accent-3'"
				elevation="24"
			> {{ messageCreatePiece }} 
			
				<template v-slot:action="{ attrs }"
					v-bind="attrs">

					<v-btn @click="seePiece" text>
						Ver solicitudes
					</v-btn>
				</template>
			</v-snackbar>				
		</v-container>
	`
});