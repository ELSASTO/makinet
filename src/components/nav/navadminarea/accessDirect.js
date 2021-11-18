Vue.component('Accessdirect',{
    data:()=>({
        style:{
            indigo: 'white'
        },
        // menu_nav_principal
		menu_access:[
			{ title: 'Dashboard', icon: 'mdi-view-dashboard', link:'Dashboard', desc: ''},
		],
    }),
    template:/*html*/`
        <v-list dense nav>
            <v-list-item v-for="option in menu_access" :key="option.title" link :href="option.link">
                <v-list-item-icon>
                    <v-icon :color="style.indigo">
                        {{ option.icon }}
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>{{ option.title }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    `
})