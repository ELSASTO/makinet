Vue.component('Notificaciones',{
    data:() => ({
        selectedItem: '',
        btns: [
			['Large', 'lg'],
		],
        colors: ['indigo accent-3', 'error', 'teal darken-1'],

    }),
    template: /*html*/`
        <div>
            <v-menu v-for="([text, rounded], index) in btns" :key="text" :rounded="rounded" offset-y>
                <template v-slot:activator="{ attrs, on }">
                    <v-btn icon
                        :color="colors[index]"
                        class="white--text"
                        v-bind="attrs"
                        v-on="on"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg"><path d="M10,21H14A2,2 0 0,1 12,23A2,2 0 0,1 10,21M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M17,11A5,5 0 0,0 12,6A5,5 0 0,0 7,11V18H17V11M19.75,3.19L18.33,4.61C20.04,6.3 21,8.6 21,11H23C23,8.07 21.84,5.25 19.75,3.19M1,11H3C3,8.6 3.96,6.3 5.67,4.61L4.25,3.19C2.16,5.25 1,8.07 1,11Z"></path></svg>
                    </v-btn>
                </template>

                <v-list flat>
                    <v-subheader>NOTIFICACIONES</v-subheader>
                    <v-list-item-group
                        v-model="selectedItem"
                        color="primary"
                    >
                        <v-list-item
                        v-for="(item, i) in 1"
                        :key="i"
                        >
                        <v-list-item-content>
                            <v-list-item-title>😆 Proximamente tus notificaciones aqui </v-list-item-title>
                        </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-menu>
        </div>
    `
})