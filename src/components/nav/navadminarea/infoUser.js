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
				const name = sessionStorage.getItem('nameuser')
				this.fullname = name			
				// showname.innerHTML = /*html*/`
				// 	<span> ${this.fullname}</span>
				// `
			}
			if(sessionStorage.getItem('initials') != ''){
				const initials 		= sessionStorage.getItem('initials')
				this.initials = initials			
			}
		},
		btnclick(){
			alert('Hola jajaja.');
		}
	},
    template:/*html*/`
        <!-- <v-list-item two-line color="light-blue">

            <v-list-item-content>
					<v-list-item-avatar> -->
					<div class="mx-auto text-center">
						<v-avatar color="indigo accent-3" size="55">
							<span class="white--text headline"> {{ initials }} </span>
						</v-avatar>
						<div class="mt-3">
							<h3 class="display-1 white--text subtitle-1"> {{ fullname }} </h3>						
							<p class="white--text subtitle-2"> Logged in </p>						
						</div>
					</div>
					<!-- </v-list-item-avatar>

					<v-list-item-title id="fullname"></v-list-item-title>
					<v-list-item-subtitle align="center">Logged In</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>         -->
    `
})