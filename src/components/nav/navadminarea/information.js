Vue.component('Information',{
    data:() => ({
        menu_nav_two: [
			{
				value: false,
				title: 'Clientes',
				icon:'mdi-account-group-outline',
				options:[
					{ title: 'Ver clientes', icon: '', link:'SeeCustomers.php'},
					{ title: 'Crear clientes', icon: '', link:'CreateCustomer' },
				]
			}
		],	
    }),
    template:/*html*/`
        <v-list dense nav>
            <v-list-group :value="items.value" 
                v-for="(items, index) in menu_nav_two" :key="index.title"
                :prepend-icon="items.icon"
                active-class="indigo--text white"	
            >
                <template v-slot:activator>
                    <v-list-item-title>{{ items.title }}</v-list-item-title>
                </template>
                <v-list-item v-for="(option, index) of items.options" :key="index.title" link :href="option.link">
                    <v-list-item-icon>
                        <v-icon>
                            {{ option.icon }}
                        </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title right>{{ option.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    `
})