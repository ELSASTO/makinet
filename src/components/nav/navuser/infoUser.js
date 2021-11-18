Vue.component('Infouser',{
	data:()=>({
		fullname: '',
		initials: ''
	}),
	mounted(){
		this.DataUserLocalStorage();
	},
	methods:{
		DataUserLocalStorage(){
			if(sessionStorage.getItem('nameuser') != ''){
				this.fullname = sessionStorage.getItem('nameuser')
			}
			if(sessionStorage.getItem('initials') != ''){
				const initials 		= sessionStorage.getItem('initials')
				this.initials = initials			
			}
		},
	},
    template:/*html*/`
        <!-- <v-list-item two-line color="light-blue">

            <v-list-item-content>
					<v-list-item-avatar> -->
					<div class="mx-auto text-center mb-6">
						<v-avatar color="deep-purple accent-3" size="55">
							<span class="headline white--text"> {{ initials }} </span>
						</v-avatar><br><br>
						<span style="color:#687992;" v-html="fullname"></span>
					</div>
					<!-- </v-list-item-avatar>

					<v-list-item-subtitle align="center">Logged In</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>         -->
    `
})