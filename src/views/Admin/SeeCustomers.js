Vue.component('Seecustomers',{
	data:() => ({
        
		titleModule: 'Clientes',
        titleModule2: 'Piezas graficas',
		// estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			deep_purple: 'deep-purple',
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			cyan: 'cyan',
			colorinput: 'cyan',
			v_card: 'box-shadow: 0px 0px 10px -2px #e0e0e0 !important;'
		},

        infoCard:{
            title: 'Solicitudes',
            subtitle: 'Visualiza las solicitudes que estan en proceso dentro de la empresa.'
        },

        dialogDelete: false,
        loading_table: true,

        search: '',
        headers: [
            {
                text: 'Id solicitud',
                align: 'start',
                value: 'id',
            },
            {
                text: 'Cliente',
                value: 'customer',
            },
            { 
                text: 'Direccion', 
                value: 'address' 
            },
            { 
                text: 'Correo', 
                value: 'email' 
            },
            { 
                text: 'Telefono', 
                value: 'phone' 
            },
            { 
                text: 'Nit', 
                value: 'nit',
                sortable: true
            },
            { 
                text: 'Acciones', 
                value: 'actions', 
                sortable: false 
            },
        ],
        customers: [],
        
        editedIndex: -1,
        editedItem: {
            id: '',
            customer: '',
            address: '',
            email: '',
            phone: '',
            nit: '',
        },
        defaultItem: {
            customer: '',
            address: '',
            email: '',
            phone: '',
            nit: '',
        },

        page: 1,
        pageCount: 0,
    
	}),
    watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
    },
    mounted () {
        this.tableCustomers();
    }, 

	methods:{        

        tableCustomers () {
            fetch('../php/get/infoCustomer.php')
                .then(response => response.json())
                .then(data => {                    
                    _.forEach(data.customers, (value)=>{
                        const item = {
                            id: value.id,
                            customer: value.name,
                            address: value.address,
                            email: value.email,
                            phone: value.phone,
                            web: value.web,
                            nit: value.nit
                        }
                        this.customers.push(item)
                    })
                    setTimeout(() => {
                        this.loading_table = false                    
                    }, 1000);
                });
        },

        seeCustomer(item){
            // console.log(item)
            window.location.href = "SeeFileCustomer?id=" + item.id + "&business=" + item.customer;
            // SeeFileCustomer?id=${value.idCustomer}&business=${value.customer}
        },
        // printRequest(){
        //     window.open('../php/reportes/mpdf/seefile/requests.report.php', '_blank');
        // },

        refreshTable(){
            this.snackbar = false
            location.reload();
        },

	},
	template: /*html*/`
		<div class="mb-10">
			<v-row class="mt-md-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
                    <h1 class="display-1" style="color:#12263f"> {{ titleModule }} </h1>
                    <v-divider></v-divider>
				</v-col>
			</v-row>
            <v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
                <v-col cols="12" sm="12" md="6" lg="6">
                    <div>
                        <v-btn color="red" text small disabled>
                            <v-icon left>
                                mdi-pdf-box
                            </v-icon>
                            reportes
                        </v-btn> <span class="grey--text">|</span>
                        <v-btn color="green" text small disabled>
                            <v-icon left>
                                mdi-microsoft-excel
                            </v-icon>
                            excel
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
			<v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col  cols="12" sm="12" md="12" lg="12">
                    <v-card flat outlined flat :style="style.v_card">
                        <v-card-text>
                            <v-data-table
                                :headers="headers"
                                :items="customers"
                                :search="search"
                                :loading="loading_table"
                                :page.sync="page"
                                loading-text="Loading... Please wait"
                                sort-by="id"
                                class="elevation-1"
                            >
                                <!-- BUSCADOR EN LA TABLA -->
                                <template v-slot:top>
                                    <v-toolbar flat>
                                        <v-text-field
                                            v-model="search"
                                            append-icon="mdi-magnify"
                                            label="Buscar solicitud"
                                            single-line
                                            hide-details
                                        ></v-text-field>                                                                                        
                                    </v-toolbar>
                                </template>
                                <!-- BOTONES DE ACCIONES -->
                                <template v-slot:item.actions="{ item }">
                                    <v-icon small class="mr-2" @click="seeCustomer(item)" title="Ver ficha"> mdi-eye </v-icon>
                                    <!-- <v-icon small class="mr-2" @click="editItem(item)" title="Editar"> mdi-pencil</v-icon> -->
                                    <!-- <v-icon small class="mr-2" @click="printItem(item)" title="Imprimi"> mdi-printer </v-icon> -->
                                </template>
                                <!-- BOTON RESET DE LA TABLA -->
                                <template v-slot:no-data>
                                    <v-btn color="primary" @click="initialize"> Reset </v-btn>
                                </template>
                            </v-data-table>                            
                        </v-card-text>
                    </v-card>
				</v-col>
			</v-row>

		</div>
	`
});