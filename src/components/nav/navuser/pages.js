Vue.component('Pages',{
    data:()=>({
        menu_nav_principal:[
			{
				value: false,
				title:'Tareas',
				icon:'mdi-plus-circle-outline',
				options:[
					{ title: 'Crear solicitud', icon: 'mdi-file-document-edit-outline', link:'CreateTaskUser', desc: ''},
					{ title: 'Mis solicitudes', icon: 'mdi-file-document-multiple-outline', link:'RequestCustomerUSer', desc: ''},
					{ title: 'Los Olivos', icon: 'mdi-leaf', link:'Olivos',desc: ''},
					{ title: 'Cuarderno de tareas', icon: 'mdi-dock-left', link:'#',desc: ''},
				]
			},
			// {
			// 	value: false,
			// 	title:'Crm',
			// 	icon:'mdi-file-document-outline',
			// 	options:[
			// 		{ title: 'Encuestas', icon: 'mdi-circle-small', link:'#', desc: ''},
			// 	]
			// },
			// {
			// 	value: false,
			// 	title:'Inventario',
			// 	icon:'mdi-dock-window',
			// 	options:[
			// 		{ title: 'Productos', icon: 'mdi-storefront-outline', link:'#', desc: ''},
			// 		// { title: '', icon: '', link:'', desc: ''},
			// 		// { title: '', icon: '', link:'',desc: ''},
			// 	]
			// },
			{
				value: false,
				title:'Recursos humanos',
				icon:'mdi-account-hard-hat',
				options:[
					// { title: '', icon: '', link:'', desc: ''},
					// { title: '', icon: '', link:'', desc: ''},
					// { title: '', icon: '', link:'',desc: ''},
				]
			},
			{
				value: false,
				title:'Comites',
				icon:'mdi-clipboard-text-outline',
				options:[
					{ title: 'Crear reporte', icon: '', link:'#', desc: ''},
					// { title: 'Ver solicitudes', icon: '', link:'', desc: ''},
					// { title: 'Los Olivos', icon: '', link:'',desc: ''},
				]
			},
			{
				value: false,
				title:'Informes',
				icon:'mdi-clipboard-outline',
				options:[
					{ title: 'Informes', icon: '', link:'#', desc: ''},
					// { title: 'Ver solicitudes', icon: '', link:'', desc: ''},
					// { title: 'Los Olivos', icon: '', link:'',desc: ''},
				]
			},
		],
    }),
    template:/*html*/`
        <v-list dense nav rounded class="pl-5">
            <v-list-group :value="items.value"
                v-for="items in menu_nav_principal" :key="items.title"
                no-action
				color="deep-purple accent-3"	
            >
                <template v-slot:activator>
                    <v-list-item-title class="font-weight-normal pl-3":title="items.title"> <span style="color:#687992;">{{ items.title }}</span></v-list-item-title>
                </template>
                <v-list-item v-for="option in items.options" :key="option.title" link :href="option.link" style="padding-left: 34px !important;">
					<v-list-item-content>
						<v-list-item-title class="font-weight-regular" justify="center"> 
							<v-icon color="#687992" small> {{ option.icon }} </v-icon>
							<span class="ml-2" style="color:#687992;">{{ option.title }}</span>
						</v-list-item-title>
					</v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    `
})