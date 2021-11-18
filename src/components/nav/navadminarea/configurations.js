Vue.component('Configurations',{
    data:()=>({
        menu_nav_principal:[
			{
				value: false,
				title:'Configuraciones',
				icon:'mdi-tools',
				options:[
					{ title: 'Cambiar clave', icon: '', link:'ChangePassword', desc: ''},
				]
			},
		],
    }),
    methods:{

    },
    template:/*html*/`
        <v-list dense nav>
            <v-list-group :value="items.value"  color="indigo"
                v-for="items in menu_nav_principal" :key="items.title"
                :prepend-icon="items.icon"
                no-action
                active-class="indigo--text white"					
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