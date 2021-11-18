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
        <v-list dense nav rounded class="pl-5">
            <v-list-group :value="items.value"  color="indigo"
                v-for="items in menu_nav_principal" :key="items.title"
                no-action
                active-class="indigo--text white"					
            >
                <template v-slot:activator>
                    <v-list-item-title class="font-weight-normal pl-3":title="items.title"> <span style="color:#687992;">{{ items.title }}</span></v-list-item-title>
                </template>
                <v-list-item v-for="option in items.options" :key="option.title" link :href="option.link" style="padding-left: 34px !important;">
                    <v-list-item-content>   
                        <v-list-item-title class="font-weight-regular"> 
                            <v-icon color="#687992"> mdi-circle-small </v-icon> 
                            <span style="color:#687992;">{{ option.title }}</span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-group>
        </v-list>
    `
})