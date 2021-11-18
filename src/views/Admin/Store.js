Vue.component('Store',{
	
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

		loading: false,
      	selection: 1,

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
		reserve () {
			this.loading = true
	
			setTimeout(() => (this.loading = false), 2000)
		},
	},
	template: /*html*/`
		<div class="mb-10 pa-8">		
			<!-- informacion del usuario -->
			<v-row>
				<v-col cols="12" sm="12" md="8" lg="8" xl="8">
					<span class="display-1 font-weight-light text--secondary"> Store Makinet</span>
				</v-col>
				<v-col cols="12" sm="12" md="4" lg="4" xl="4" align="right">
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="red accent-3"
								class="mr-3"
								dark
								v-bind="attrs"
								v-on="on"
								fab
								small
								:style="style.v_cardindigo"
							>
								<v-icon>
									mdi-delete
								</v-icon>
							</v-btn>
						</template>
						<span>Eliminar producto</span>
					</v-tooltip>
					<v-tooltip bottom>
						<template v-slot:activator="{ on, attrs }">
							<v-btn
								color="indigo accent-3"
								dark
								v-bind="attrs"
								v-on="on"
								fab
								:style="style.v_cardindigo"
							>
								<v-icon>
									mdi-plus
								</v-icon>
							</v-btn>
						</template>
						<span>Agregar producto</span>
					</v-tooltip>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" sm="12" md="4" lg="4" xl="4">
					<v-card
						:loading="loading"
						:style="style.v_card"
						class="mx-auto my-12"
						class="rounded-xl p-relative"
					>
						<template slot="progress">
							<v-progress-linear
								color="deep-purple"
								height="10"
								indeterminate
							></v-progress-linear>
						</template>

						<v-img
							width="120"
							height="120"
							src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
							class="rounded-xl p-absolute-img-card"
							:style="style.v_card"
						></v-img>

						<v-card-title>Cafe Badilico</v-card-title>

						<v-card-text>
							<v-row align="center" class="mx-0">
								<v-rating
									:value="4.5"
									color="amber"
									dense
									half-increments
									readonly
									size="14"
								></v-rating>

								<div class="grey--text ms-4"> 4.5 (413)</div>
							</v-row>

							<div class="my-4 text-subtitle-1"> $ • Italian, Cafe </div>
							<div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
						</v-card-text>

						<v-divider class="mx-4"></v-divider>

						<v-card-title>Tonight's availability</v-card-title>					

						<v-card-actions>
							<v-btn color="deep-purple accent-4" rounded text> Ver producto </v-btn>
						</v-card-actions>
					</v-card>
				</v-col>
			</v-row>
		</div>
	`
})