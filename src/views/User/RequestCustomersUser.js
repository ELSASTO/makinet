Vue.component('Requestcustomeruser',{
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
			colorInput: 'indigo accent-4',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			v_cardindigo: 'box-shadow: rgba(48, 79, 254, 0.55) 0px 9px 19px -7px !important',
			v_cardteal: 'box-shadow: rgba(29, 233, 182, 0.55) 0px 9px 19px -7px !important',
			v_cardpurple: 'box-shadow: rgba(101, 31, 255, 0.55) 0px 9px 19px -7px !important',
            linkCustomer: ''
		},

        infoCard:{
            title: 'Solicitudes',
            subtitle: 'Visualiza las solicitudes que estan en proceso dentro de la empresa.'
        },

        dialogDelete: false,
        loading_table: true,


        // filtros para las solicitudes
        liable_value: '',


        // tabla de solicitudes
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


        // estados de las solicitudes    
        StatePendiente: 0,
        StateFinalizado: 0,
        StateOtrosProcesos: 0,

        // responsable
		liable:[],

        // cantidad de actividades por usuario
        sumaActividadesUser: 0,
        finalizado: 0,
        asignado: 0,
        otros: 0

	}),
    watch: {
        dialog (val) {
          val || this.close()
        },
        dialogDelete (val) {
          val || this.closeDelete()
        },
    },

    computed:{
        sumaActividades() {
            return this.StatePendiente + this.StateFinalizado + this.StateOtrosProcesos
        }
    },

	methods:{

        // cantidad de tareas por usuario
        taskUser(param){
            if(param == 0 || param == ''){
                this.getStateRequest();
            }else{
                fetch('../php/get/requestCustomer.php/?taskUser='+ param)
                .then(response => response.json())
                .then(data => {
                    this.sumaActividadesUser = parseInt(data.cantidad_actividades[0].finalizado) + parseInt(data.cantidad_actividades[0].asignado) + parseInt(data.cantidad_actividades[0].otros)
                    this.finalizado = data.cantidad_actividades[0].finalizado
                    this.asignado = data.cantidad_actividades[0].asignado
                    this.otros = data.cantidad_actividades[0].otros
                })
            }
        },

        // responsables
        async liables(){
			await fetch('../php/get/liable.php')
				.then(response => response.json())
				.then(data => {
					data.liables.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.liable.push(item)
					})
				})
				.catch(err => console.error(err))
		},

        // ver cliente
        customer(props){
            return `<a :class="style.linkCustomer" href="SeeFileCustomer?id=${props.item.idCliente}&business=${props.item.customer}"> ${props.item.customer} </a>`
        },

        // tabla con las solicitudes
        initialize () {
            fetch('../php/get/requestCustomer.php')
                .then(response => response.json())
                .then(data => {
                    data.request.forEach((value, index, element)=>{                        
                        var item = {
                            id: element[index].id,
                            idCliente: element[index].id_cliente,
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
                this.request = data.typeRequest[0].id                                
                // consulta el proceso de acuerdo al tipo de solicitud
                fetch('../php/get/processRequest?id='+ this.request)
                .then(response => response.json())
                .then(data => {
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
				if(data.error == false){
					this.messageUpdatedProcess = 'Se actualizo el estado de la solicitud'
                    this.requests = []
                    this.initialize();
				}
			})
        },

        getColor(process) {
            if (process == 'Asignado') return 'red accent-3'
            else if (process == 'Finalizado') return 'green accent-4'
            else return 'orange accent-3'
        },

        editItem (item) {
            this.editedIndex = this.requests.indexOf(item)
            this.editedItem = Object.assign({}, item)
            window.location.href = 'EditActivity?id='+item.id
        },

        seeItem (item) {
            this.editedIndex = this.requests.indexOf(item)
            window.location.href = 'SeeFileUser?id='+item.id
        },

        printItem(item){
            window.open('../php/reportes/mpdf/seefile/seefile.report.php/?id=' + item.id ,'_blank')
        },
        printRequest(){
            window.open('../php/reportes/mpdf/seefile/requests.report.php', '_blank');
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

        // metodos para las piezas graficas
        dataTablePieces(){
            fetch('../php/get/infoPiecesGraphics.php')
            .then(response => response.json())
            .then(data => {
                _.forEach(data.pieces, (value)=>{
                    const item = {
                        id: value.id,
                        customer: value.customer,
                        date: value.date,
                        asigna: value.asignaP,
                        state: value.estado,
                        objetivo: value.objetivo,
                        social: value.social,
                        asignaP: value.asignaP,
                        hashtag: value.hashtag,
                        menciones: value.menciones,
                        descripcion: value.descripcion,
                        palabras: value.palabras,
                        copyExterno: value.copyE,
                        copyPrincipal: value.copyP,
                        responsable: value.responsable
                    }
                    this.piecesGraphics.push(item)
                })
            })
        },

        // function para ver la pieza seleccionada
        seePiece (item) {
            this.seeIndexPiece = this.piecesGraphics.indexOf(item)
            this.seeItemPiece = Object.assign({}, item)
            this.dialogSeeItem = true
        },

        // guardar cambios en la pieza grafica
        saveSeePiece(){
            this.loadingPiece = true

            const data = new FormData(document.getElementById('formStatePiece'));
            fetch('../php/post/updateProcessPieceGraphic.php',{
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(data => {
                if(data.error == false){
                    this.loadingPiece = false;
                    this.snackbar2 = true;
                    this.colorMessageProcessPiece = 'green';
                    this.messageUpdatedProcessPiece = 'Se actualizo la pieza.'
                }else{
                    this.loadingPiece = false;
                    this.snackbar2 = true;
                    this.colorMessageProcessPiece = 'primary';
                    this.messageUpdatedProcessPiece = 'No hay datos para actualizar.'
                }
            })
            .catch(err => console.error(err))
        },

        // cerrar el dialogo de la pieza
        closeSeePiece(){
            this.dialogSeeItem = false
            this.loadingPiece = false
        },

        // color piezas
        getColorPieces(props){
            let MyDate = new Date(props.item.date);
            let fechaPieza = MyDate.getFullYear() + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + ('0' + MyDate.getDate()).slice(-2);

            let DateActual = new Date();
            let fechaActual = DateActual.getFullYear() + '-' + ('0' + (DateActual.getMonth()+1)).slice(-2) + '-' + ('0' + DateActual.getDate()).slice(-2)
                        
            if(props.item.state == 'Asignado'){
                if(fechaActual < fechaPieza){
                    return 'orange'
                }else if (fechaActual >= fechaPieza){
                    return 'red accent-3'
                }else {
                    return 'red accent-3'
                }
            }else if(props.item.state == 'Publicada'){
                return 'blue accent-4'
            }
        },
        // estadisticas de las solicitudes
        // function que trae los procesos de las solicitudes
        getStateRequest(){
			fetch('../php/statistics/getCountStateRequest.php')
            .then(response => response.json())
            .then(data => {
                this.StateFinalizado = parseInt(data.statistics[0].process)
                this.StatePendiente = parseInt(data.statistics[1].process)
                this.StateOtrosProcesos = parseInt(data.statistics[2].process)
            })
        }
	},
    mounted () {
        this.initialize();
        this.dataTablePieces();
        this.getStateRequest();
        this.liables();
    }, 
	template: /*html*/`
		<div fluid class="mb-10 pa-8">
            <v-row>
                <v-col cols="6" sm="6" md="6" lg="3" xl="3">
                    <v-card :style="style.v_cardindigo" class="rounded-xl" color="indigo accent-3" dark>
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Total de actividades: <br>
									<span class="headline"> {{ sumaActividades }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">                                    
										<v-icon> mdi-file-document-multiple-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="3" xl="3">
                    <v-card :style="style.v_card" class="rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Actividades finalizadas: <br>
									<span class="headline"> {{ StateFinalizado }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">                                    
										<v-icon> mdi-file-document-multiple-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="3" xl="3">
                    <v-card :style="style.v_card" class="rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Actividades asignadas <br>
									<span class="headline"> {{ StatePendiente }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">                                    
										<v-icon> mdi-file-document-multiple-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
                </v-col>

                <v-col cols="6" sm="6" md="6" lg="3" xl="3">
                    <v-card :style="style.v_card" class="rounded-xl">
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									Actividades en otros procesos: <br>
									<span class="headline"> {{ StateOtrosProcesos }} </span>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">                                    
										<v-icon> mdi-file-document-multiple-outline mdi-24px </v-icon>
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
                </v-col>
            </v-row>
            
			<v-row>
				<v-col cols="12" sm="12" md="12" lg="9" xl="9">
                    <v-card flat :style="style.v_card" class="rounded-xl mb-10">
                        <v-card-title>
                            <span class="text--secondary"> Solicitudes </span> 
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <div>
                                        <v-btn @click="printRequest" color="red" text small disabled>
                                            <v-icon left>
                                                mdi-pdf-box
                                            </v-icon>
                                            imprimir reporte
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

                            <v-data-table
                                :headers="headers"
                                :items="requests"
                                :search="search"
                                :loading="loading_table"
                                :page.sync="page"
                                loading-text="Loading... Please wait"
                                sort-by="id"
                                class="rounded-xl"
                                :sort-desc="[true]"
                            >
                                <template v-slot:item.customer="props">
                                    <span v-html="customer(props)"></span>
                                </template>       
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
                                    <v-icon small class="mr-2" @click="editItem(item)" title="Editar"> mdi-pencil</v-icon>
                                    <v-icon small class="mr-2" @click="printItem(item)" title="Imprimi"> mdi-printer </v-icon>
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

                    <!-- PIEZAS GRAFICAS -->

                    <v-card flat :style="style.v_card" class="rounded-xl mb-6">
                        <v-card-title>
                            <span class="text--secondary"> Piezas gráficas </span> 
                        </v-card-title>
                        <v-row>
                            <v-col cols="12" sm="12" md="6" lg="6">
                                <div>
                                    <v-btn @click="printRequest" color="red" text small disabled>
                                        <v-icon left>
                                            mdi-pdf-box
                                        </v-icon>
                                        Imprimir reporte
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

                        <v-data-table
                            :headers="headers2"
                            :items="piecesGraphics"
                            :search="search"
                            :loading="loading_table"
                            :page.sync="page"
                            loading-text="Loading... Please wait"
                            sort-by="id"
                            :sort-desc="[true]"
                            class="elevation-0"
                            @page-count="pageCount = $event"
                        >
                                    
                            <!-- DIALOGO PARA MODIFICAR EL PROCESO DE LA SOLICITUD -->
                            <template v-slot:item.date="props">
                                <v-chip
                                    :color="getColorPieces(props)"
                                    dark
                                >
                                    {{ props.item.date }}
                                </v-chip>
                            </template>
                            <!-- BUSCADOR EN LA TABLA -->
                            <template v-slot:top>
                                <v-toolbar flat>
                                    <v-text-field
                                        v-model="search"
                                        append-icon="mdi-magnify"
                                        label="Buscar Pieza"
                                        single-line
                                        hide-details
                                    ></v-text-field>
                                </v-toolbar>
                            </template>

                            <template v-slot:top>                    
                                <v-dialog v-model="dialogSeeItem" max-width="900px">
                                    <v-card :loading="loadingPiece">
                                        <template slot="progress">
                                            <v-progress-linear
                                                color="deep-purple accent-2"
                                                height="5"
                                                indeterminate
                                            ></v-progress-linear>
                                        </template>
                                        <v-toolbar color="indigo accent-4" dark>
                                            <v-icon>
                                                mdi-pencil-plus-outline
                                            </v-icon>
                                            <v-toolbar-title> Pieza gráfica </v-toolbar-title>
                                            <v-spacer></v-spacer>
                                            <v-form id="formStatePiece">
                                                <v-text-field
                                                    v-model="seeItemPiece.id"
                                                    name="id_piece"
                                                    style="display: none"
                                                ></v-text-field>
                                                <v-select
                                                    v-model="seeItemPiece.state"
                                                    name="state_piece"
                                                    :items="estadoPieza"
                                                    item-value="description"
                                                    item-text="description"
                                                    label="Estado"
                                                    hide-details
                                                    single-line
                                                ></v-select>
                                            </v-form>
                                            <v-btn icon @click="saveSeePiece">
                                                <v-icon>mdi-content-save</v-icon>
                                            </v-btn>
                                            <v-btn icon @click="closeSeePiece">
                                                <v-icon>mdi-close</v-icon>
                                            </v-btn>
                                        </v-toolbar>

                                        <v-card-title class="display-1" style="color:#12263f"> {{ seeItemPiece.customer }} </v-card-title>
                                        <v-divider></v-divider>
                                        <v-card-text><br>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="6" lg="6">
                                                    <p class="subtitle-1"><strong>Fecha publicacion: </strong>{{ seeItemPiece.date }} </p>
                                                    <p class="subtitle-1"><strong>Objetivo: </strong> {{ seeItemPiece.objetivo.replace(",", ", ") }} </p>
                                                    <p class="subtitle-1"><strong>Redes Sociales: </strong> {{ seeItemPiece.social }} </p>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="6" lg="6">
                                                    <p class="subtitle-1"><strong>Solicita pieza: </strong>{{ seeItemPiece.asignaP }} </p>
                                                    <p class="subtitle-1"><strong>#: </strong>{{ seeItemPiece.hashtag }} </p>
                                                    <p class="subtitle-1"><strong>@: </strong>{{ seeItemPiece.menciones }} </p>
                                                </v-col>
                                            </v-row>
                                            <v-divider></v-divider><br>
                                            <v-row>
                                                <v-col cols="12" sm="12" md="6" lg="6">
                                                    <p class="subtitle-1"><strong>Descripcion: </strong> {{ seeItemPiece.descripcion }} </p>
                                                    <p class="subtitle-1"><strong>Copy externo: </strong> {{ seeItemPiece.copyExterno }} </p>
                                                    <p class="subtitle-1"><strong>Copy Principal: </strong> {{ seeItemPiece.copyPrincipal }} </p>
                                                </v-col>
                                                <v-col cols="12" sm="12" md="6" lg="6">
                                                    <p class="subtitle-1"><strong>Palabras clave: </strong> {{ seeItemPiece.palabras }} </p>
                                                </v-col>
                                            </v-row>                                                   
                                        </v-card-text>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <p class="subtitle-1"><strong>Responsable: </strong> {{ seeItemPiece.responsable }} </p>
                                        </v-card-actions>                                            
                                    </v-card>
                                </v-dialog>
                                <v-snackbar                                
                                    v-model="snackbar2"
                                    bottom
                                    :color="colorMessageProcessPiece" dark
                                > {{ messageUpdatedProcessPiece }}
                                    <v-spacer></v-spacer>
                                    <template v-slot:action="{ attrs }">
                                        <v-btn
                                            text
                                            v-bind="attrs"
                                            @click="refreshTable"
                                        > Refresh </v-btn>
                                    </template>
                                </v-snackbar>
                            </template>
                            <!-- BOTONES DE ACCIONES -->
                            <template v-slot:item.actions="{ item }">
                                <v-icon small class="mr-2" @click="seePiece(item)" title="Ver pieza"> mdi-eye </v-icon>
                            </template>
                            <!-- BOTON RESET DE LA TABLA -->
                            <template v-slot:no-data>
                                <v-btn color="primary" @click="dataTablePieces"> Reset </v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
				</v-col>
			</v-row>
		</div>
	`
});