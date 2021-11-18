Vue.component('Accessdirect',{
    data:()=>({
        style:{
            indigo: ''
        },
        // menu_nav_principal
		menu_access:[
			{ title: 'Dashboard', icon: 'mdi-view-dashboard', link:'DashboardUser', desc: ''},
		],
    }),
    template:/*html*/`
        <v-list dense nav rounded>
            <v-list-item v-for="option in menu_access" :key="option.title" link :href="option.link">
                <v-list-item-icon>
                    <v-icon color="deep-purple accent-3">
                        {{ option.icon }}
                    </v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title class="font-weight-normal"> <span style="color:#687992">{{ option.title }}</span>  </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    `
})