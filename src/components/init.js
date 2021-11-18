var app = new Vue({
    el:'#app',
    vuetify: new Vuetify(),
	data:() => ({
		selectedItem: '',
		drawer: null,
		// estilos personalizados
		style:{
			header: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			indigo: 'indigo',
			deep_purple: 'deep-purple',
			bg_main: 'background-color: #f0f8ff87',
			colorsystem: 'indigo',
			bg_system:'background-color: #f9fbfd;',
			radius:'border-radius: 7px; border: 1px solid rgb(224, 224, 224) !important;'
		},
		// datos del usuario
		fullname: '',
		text:{
			titleOne: 'Información del usuario',
			desc: 'Bienvenido a makinet el sistema completo para la gestión y administración <br> de tus actividades dentro de la empresa.'
		},

		menu_nav_one: [
			{ title: 'Crear tarea', icon: 'mdi-plus-circle-outline', link:'Createtask', desc: ''},
			{ title: 'Ver solicitudes', icon: 'mdi-file-document-outline', link:'', desc: ''},
			{ title: 'Los Olivos', icon: 'mdi-warehouse', link:'',desc: ''},
		],

		btns: [
			['Large', 'lg'],
		],
		colors: ['indigo accent-4', 'error', 'teal darken-1'],
		items:[
			{title: 'Configuración cuenta',},
			{title: 'Cerrar sesión',}
		]
			
	}),	
})