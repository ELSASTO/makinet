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
        <v-list dense nav rounded class="pl-5">
            <v-list-group :value="items.value" 
                v-for="(items, index) in menu_nav_two" :key="index.title"
                active-class="indigo--text white"	
            >
                <template v-slot:activator>
                    <v-list-item-title class="font-weight-normal pl-3":title="items.title"> <span style="color:#687992;">{{ items.title }}</span></v-list-item-title>
                </template>
                <v-list-item v-for="(option, index) of items.options" :key="index.title" link :href="option.link" style="padding-left: 34px !important;">
                    <v-list-item-content>
                        <v-list-item-title class="font-weight-regular"> <v-icon color="#687992"> mdi-circle-small </v-icon> <span style="color:#687992;">{{ option.title }}</span></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    `
})