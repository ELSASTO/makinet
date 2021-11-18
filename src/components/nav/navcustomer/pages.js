Vue.component('Pages',{
    data:()=>({
        menu_nav_principal:[
			{
				value: false,
				title:'TAREAS',
				icon:'mdi-plus-circle-outline',
				options:[
					// { title: 'Crear tarea', icon: '', link:'CreateTaskUser', desc: ''},
					{ title: 'Ver solicitudes', icon: '', link:'RequestCustomer', desc: ''},
					// { title: 'Los Olivos', icon: '', link:'Olivos',desc: ''},
				]
			},
			// {
			// 	value: false,
			// 	title:'CRM',
			// 	icon:'mdi-file-document-outline',
			// 	options:[
			// 		{ title: 'Crear tarea', icon: '', link:'', desc: ''},
			// 		{ title: 'Ver solicitudes', icon: '', link:'', desc: ''},
			// 		{ title: 'Los Olivos', icon: '', link:'',desc: ''},
			// 	]
			// },
			// {
			// 	value: false,
			// 	title:'INVENTARIO',
			// 	icon:'mdi-dock-window',
			// 	options:[
			// 		{ title: 'Crear tarea', icon: '', link:'', desc: ''},
			// 		{ title: 'Ver solicitudes', icon: '', link:'', desc: ''},
			// 		{ title: 'Los Olivos', icon: '', link:'',desc: ''},
			// 	]
			// },
			// {
			// 	value: false,
			// 	title:'RECURSOS HUMANOS',
			// 	icon:'mdi-account-hard-hat',
			// 	options:[
			// 		{ title: 'Crear tarea', icon: '', link:'', desc: ''},
			// 		{ title: 'Ver solicitudes', icon: '', link:'', desc: ''},
			// 		{ title: 'Los Olivos', icon: '', link:'',desc: ''},
			// 	]
			// },
			// {
			// 	value: false,
			// 	title:'COMITES',
			// 	icon:'mdi-clipboard-text-outline',
			// 	options:[
			// 		{ title: 'Crear reporte', icon: '', link:'', desc: ''},
			// 		// { title: 'Ver solicitudes', icon: '', link:'', desc: ''},
			// 		// { title: 'Los Olivos', icon: '', link:'',desc: ''},
			// 	]
			// },
		],
    }),
    template:/*html*/`
        <v-list dense nav>
            <v-list-group :value="items.value"
                v-for="items in menu_nav_principal" :key="items.title"
                :prepend-icon="items.icon"
                no-action
				active-class="deep-purple--text white"				
            >
                <template v-slot:activator>
                    <v-list-item-title v-text="items.title" :title="items.title"></v-list-item-title>
                </template>
                <v-list-item v-for="option in items.options" :key="option.title" link :href="option.link">
                    <v-list-item-content>
                        <v-list-item-title right :title="option.title">{{ option.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    `
})