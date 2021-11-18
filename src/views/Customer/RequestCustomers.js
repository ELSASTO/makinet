Vue.component('Requestcustomer',{
	data:() => ({
        
		titleModule: 'Solicitudes',
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
                text: 'Tipo de solicitud', 
                value: 'request' 
            },
            { 
                text: 'Actividad', 
                value: 'activity'

            },
            { 
                text: 'Responsable', 
                value: 'liable' 
            },
            { 
                text: 'Proceso solicitud', 
                value: 'process',
                sortable: true
            },
            { 
                text: 'Acciones', 
                value: 'actions', 
                sortable: false 
            },
        ],
        requests: [],
        
        editedIndex: -1,
        editedItem: {
            id: '',
            customer: '',
            request: '',
            activity: '',
            warr: '',
            process: '',
        },
        defaultItem: {
            customer: '',
            request: '',
            activity: '',
            warr: '',
            process: '',
        },

        page: 1,
        pageCount: 0,

        // input para cambiar el estado de la solicitud
        idProcessRequest: '',
        procesoSolicitud: [],
        request: '',
        procesoActual: null,

        snackbar: false,



        // datatable de la piezas graficas

        headers2:[
            {
                text: 'Id solicitud',
                align: 'start',
                value: 'id',
            },
            {
                text: 'Cliente',
                align: 'start',
                value: 'customer',
            },            
            {
                text: 'Solicita',
                align: 'start',
                value: 'asigna',
            },
            {
                text: 'Estado',
                align: 'start',
                value: 'state',
            },
            {
                text: 'fecha publicacion',
                align: 'start',
                value: 'date',
            },
            {
                text: 'Acciones',
                align: 'start',
                value: 'actions',
            },
        ],
        piecesGraphics:[],

        // datos para la tabla de piezas graficas

        dialogSeeItem: false,
        seeIndexPiece: -1,
        seeItemPiece: {
            id: '',
            customer: '',
            asigna: '',
            state: '',
            date: '',
            objetivo: '',
            social: '',
            asignaP: '',
            hashtag: '',
            menciones: '',
            descripcion: '',
            palabras: '',
            copyExterno: '',
            copyPrincipal: '',
            responsable: ''
        },

        estadoPieza:[
            {
                description: 'Asignado'
            },
            {
                description: 'Publicada'
            }
        ],

        loadingPiece: false,

        snackbar2: false,
        messageUpdatedProcessPiece: '',
        colorMessageProcessPiece: '',


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
        this.initialize();
    }, 

	methods:{        

        initialize () {
            fetch('../php/get/requestCustomer.php')
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data.request.forEach((value, index, element)=>{                        
                        var item = {
                            id: element[index].id,
                            customer: element[index].cliente,
                            request: element[index].desc_so,
                            activity: element[index].activity,
                            liable: element[index].liable,
                            process: element[index].process,
                            warr: element[index].warranty
                        }
                        this.requests.push(item)
                    })
                    setTimeout(() => {
                        this.loading_table = false
                    }, 1000);
                });
        },

        // funcion que trae el tipo de solicitud
        typeRequest(props){
            // tipo de solicitud
            fetch('../php/get/typeRequest.php/?request='+ props.item.id)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                this.request = data.typeRequest[0].id
                                    
                // consulta el proceso de acuerdo al tipo de solicitud
                fetch('../php/get/processRequest?id='+ this.request)
                .then(response => response.json())
                .then(data => {
                    // console.log(data)
                    this.procesoSolicitud = [];
                    _.forEach(data.process, (value) => {
                        const item = {
                            id: value.id, 
                            tipo_proceso: value.tipo_proceso, 
                            desc_proceso: value.desc_proceso
                        }
                        this.procesoSolicitud.push(item);
                    })                        
                    this.procesoActual = props.item.process                        
                })
            })
            .catch(err => console.error(err))
		},

        // funcion que guarda el proceso modificado
        saveProcess (props) {
            // console.log(props.item.id);
            const data = new FormData(document.getElementById('formProcess'));

			fetch('../php/post/updateProcessActivity.php/?id='+ props.item.id,{
				method: 'POST',
				body: data
			})
			.then(response => response.json())
			.then(data => {
                // console.log(data)
				if(data.error == false){
					this.messageUpdatedProcess = 'Se actualizo el estado de la solicitud'
                    this.snackbar = true
				}
			})
        },

        getColor(process) {
            if (process == 'Asignado') return 'red'
            else if (process == 'Finalizado') return 'green'
            else return 'orange'
        },

        editItem (item) {
            this.editedIndex = this.requests.indexOf(item)
            this.editedItem = Object.assign({}, item)
            window.location.href = 'EditActivity?id='+item.id
        },

        seeItem (item) {
            this.editedIndex = this.requests.indexOf(item)
            window.location.href = 'SeeFile?id='+item.id
        },

        printItem(item){
            window.open('../php/reportes/mpdf/seefile/seefile.report.php/?id=' + item.id ,'_blank')
        },
        printRequest(){
            window.open('../php/reportes/mpdf/seefile/requests.report.php', '_blank');
        },

        cancelProcess () {
            // this.snack = true
        },
        openProcess () {
            // this.snack = true
        },

        refreshTable(){
            this.snackbar = false
            location.reload();
        },
    
    
        save () {
            if (this.editedIndex > -1) {
              Object.assign(this.requests[this.editedIndex], this.editedItem)
            } else {
              this.requests.push(this.editedItem)
            }
            this.close()
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
                        <v-btn @click="printRequest" color="red" text small disabled>
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
                                :items="requests"
                                :search="search"
                                :loading="loading_table"
                                :page.sync="page"
                                loading-text="Loading... Please wait"
                                sort-by="id"
                                :sort-desc="[true]"
                                class="elevation-1"
                            >
                                
                                <!-- DIALOGO PARA MODIFICAR EL PROCESO DE LA SOLICITUD -->
                                <template v-slot:item.process="props">
                                    <v-chip
                                        :color="getColor(props.item.process)"
                                        dark
                                    >
                                        <v-edit-dialog
                                            :return-value.sync="props.item.process"
                                            large
                                            persistent
                                            @save="saveProcess(props)"
                                            @cancel="cancelProcess"
                                            @open="typeRequest(props)"
                                        >
                                            <div>{{ props.item.process }}</div>
                                            <template v-slot:input>
                                                <div class="mt-4 title">
                                                    Actualizar proceso
                                                </div>
                                                <v-form id="formProcess">                                                    
                                                    <v-select
                                                        v-model="procesoActual"
                                                        name="process_value"
                                                        :items="procesoSolicitud"
                                                        item-value="desc_proceso"
                                                        item-text="desc_proceso"
                                                        label="Proceso solicitud"
                                                    ></v-select>
                                                </v-form>                                             
                                            </template>
                                        </v-edit-dialog>
                                    </v-chip>
                                </template>
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
                                    <v-icon small class="mr-2" @click="seeItem(item)" title="Ver ficha"> mdi-eye </v-icon>
                                    <!-- <v-icon small class="mr-2" @click="editItem(item)" title="Editar"> mdi-pencil</v-icon>
                                    <v-icon small class="mr-2" @click="printItem(item)" title="Imprimi"> mdi-printer </v-icon> -->
                                </template>
                                <!-- BOTON RESET DE LA TABLA -->
                                <template v-slot:no-data>
                                    <v-btn color="primary" @click="initialize"> Reset </v-btn>
                                </template>
                            </v-data-table>
                            <v-snackbar
                                v-model="snackbar"
                                :multi-line="true"
                            > Actualizar tabla
                                <v-spacer></v-spacer>
                                <template v-slot:action="{ attrs }">
                                    <v-btn
                                        color="primary"
                                        v-bind="attrs"
                                        @click="refreshTable"
                                    > Refresh </v-btn>
                                </template>
                                </v-snackbar>
                        </v-card-text>
                    </v-card>
				</v-col>
			</v-row>
		</div>
	`
});