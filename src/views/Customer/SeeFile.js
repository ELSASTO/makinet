Vue.component('Seefile',{
    props: {
        title: String,
    },
    data:() => ({
        titleModule: 'Tarea',
        // estilos personalizados para la vista
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo',
			deep_purple: 'deep-purple',
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: 0px 0px 10px -2px #e0e0e0 !important;',
			colorInput: 'teal',
			colorInput2: 'indigo',
            scrollData: 'overflow-y: scroll; height: 400px;'
		},
        // items para breakcrumb en la parte superior
        items:[
            {
                text: 'Volver',
                disabled: false,
                href: 'RequestCustomer'
            },
            {
                text: 'Ver ficha',
                disabled: true,
                href: ''
            },
        ],

        // estilos y textos para el card de la ficha
        infoCard:{
            icon:'mdi-36px mdi-file-document-edit-outline',
            head: 'Task',
            title: 'Editar Tarea',
            subtitle: 'Realiza la asignación de tareas a tus colaborares y lleva un registro de las actividades que se realizan dentro de la epresa.',
            btnEdit: 'Editar tarea',
            color_card: 'indigo'
        },


        // datos consultados para la ficha de la solicitud
        file:{
            warranty: '',
            customer: '',
            datecreate: '',
            typeRequest: '',
            descRequest: '',
            activity: '',
            total: '',
            cancelado: '',
            saldo: '',
            comentarios:[],
            liable: ''
        },

        snackbar: true,
        snackbar2: false,
        procesoActual: '',


        // card de proceso de la solicitud
        titleStatusRequest: 'Estatus de la actividad:',
        procesoSolicitud: [],

        dialogStatusTask: false,

        initials:'',
        messageAddComment: '',
        commentUserTask: '',
        commentrules:[
            v => !!v || 'Asegurate de escribir tu comentario',
		],

        // loading para el proceso de la solicitud
        loadingProcess: true,

        // datos de las piezas
        piecesGraphics:[]

		
    }),
	computed:{

	},
    methods:{

        // function que obtiene las piezas relacionadas con la tarea
        getPiecesTask(){
            fetch('../php/get/infoPiecesGraphics.php/?id='+ this.title )
            .then(response => response.json())
            .then(data => {
                console.log(data);
                _.forEach(data.pieces, value => {
                    const item = {
                        titulo: value.titulo,
                        estado: value.estado,
                        date: value.date,
                        liable: value.responsable,
                        objective: value.objetivo.split(',').join(', '),
                        social: value.social.split(',').join(', '),
                        description: value.descripcion
                    }
                    this.piecesGraphics.push(item)
                })
            })
        },

        // funcion que obtiene la informacion de la tarea
        getfiletask(){
            fetch('../php/get/seeFile?id=' + this.title)
            .then(response => response.json())
            .then(data => {
                this.file.warranty = data.warranty
                this.file.typeRequest = data.typeRequest
                this.file.descRequest = data.descRequest
                this.file.customer = data.customer
                this.file.datecreate = data.datecreate
                this.file.activity = data.activity
                this.file.total = Intl.NumberFormat().format(data.total)
                this.file.cancelado = Intl.NumberFormat().format(data.cancelado)
                this.file.saldo = Intl.NumberFormat().format(data.saldo)
                this.file.liable = data.liable
            })
        },

        // funcion que obtiene los comentarios de las actividades
        getfilecomments(){
            fetch('../php/get/commentsTask?id=' + this.title)
            .then(response => response.json())
            .then(data => {
                _.forEach(data.comments, (value) =>{
                    item = {
                        nombre: value.nombre,
                        apellidos: value.apellidos,
                        iniciales: value.initials,
                        comentario: value.comment,
                        fecha: value.date
                    }
                    this.file.comentarios.push(item)
                })
            })
        },

        async getProcessRequest(){
			// obtener el proceso actual de la actividad para que luego se muestre en el select
			await fetch('../php/get/processRequest.php/?pr='+ this.title) // pr = proceso de la solicitud
			.then(response => response.json())
			.then(data => {
				this.procesoActual = data.proceso_actual
			})	
		},

        // funcion que trae el tipo de solicitud
        async typeRequest(){
                await fetch('../php/get/typeRequest.php/?request='+ this.title)
                .then(response => response.json())
                .then(data => {
                    
                    this.request = data.typeRequest[0].id
                    // consulta el proceso de acuerdo al tipo de solicitud
                    fetch('../php/get/processRequest?id='+this.request)
                    .then(response => response.json())
                    .then(data => {                    
                        _.forEach(data.process, (value) => {
                            const item = {
                                id: value.id, 
                                tipo_proceso: value.tipo_proceso, 
                                desc_proceso: value.desc_proceso,
                                icon: value.icon
                            }
                            this.procesoSolicitud.push(item);
                        })							
                        this.loadingProcess = false;
                    })
                })
                .catch(err => console.error(err))
	
		},

        // color de los iconos, estatus de la actividad
        colorEstado(desc_proceso){
            const procesoA = this.procesoActual 

            if(procesoA == desc_proceso){
                if(procesoA == 'Asignado'){
                    return 'red'
                }else if(procesoA == 'Finalizado'){
                    return 'green'
                }else{
                    return 'orange'
                }
            }else{
                return 'grey'
            }
        },
        
        // funcion para generar el pdf
        generatePDF(){
            window.open('../php/reportes/mpdf/seefile/seefile.report.php/?id=' + this.title ,'_blank')
        },

        // function para editar la ficha
        editItem() {        
            window.location.href = 'EditActivity?id=' + this.title
        },

        //  funcion que agrega comentarios a la actividad
		sendMessage () {
			if(this.commentUserTask == ''){
				this.$refs.formComment.validate()
			}else{
				this.commentUserTask.trim()			
				const data = new FormData(document.getElementById('formComment'));
				fetch('../php/post/addCommentTask.php/?id=' + this.title,{
					method:'POST',
					body: data
				})
				.then(response => response.json())
				.then(data => {
					if(data.error == false){
                        this.file.comentarios = [];
                        this.getfilecomments();
						this.$refs.formComment.reset()
						this.$refs.formComment.resetValidation()
						this.snackbar2 = true,
						this.messageAddComment = 'Se agrego tu comentario a la actividad ' + this.title
					}
				})
			}
		},
        // iniciales para la seccion del comentario
		commentsTask(){
			this.initials = sessionStorage.getItem('initials')
		},

    },
	mounted(){
        this.getfiletask();
        this.getfilecomments();
        this.getProcessRequest();
        this.typeRequest();
        this.commentsTask();
        this.getPiecesTask();
    },
    template: /*html*/`
        <div fluid class="mb-15">                    
			<v-row class="mt-md-7 mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
				<v-col cols="12">
					<div>
						<h1 class="display-1" style="color:#12263f;">{{ titleModule }} - {{ title }}</h1>
						<v-divider></v-divider>
                        <v-breadcrumbs :items="items"></v-breadcrumbs>
					</div>
				</v-col>
			</v-row>            
            <v-row class="mr-md-15 ml-md-15 pr-md-15 pl-md-15 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
                <v-col cols="12" sm="12" md="6" lg="6">
                    <div>
                        <v-btn @click="generatePDF" color="red" text small>
                            <v-icon left>
                                mdi-pdf-box
                            </v-icon>
                            descargar
                        </v-btn> 
                        <!-- <span class="grey--text">|</span> -->
                        <!-- <v-btn color="green" text small disabled>
                            <v-icon left>
                                mdi-microsoft-excel
                            </v-icon>
                            excel
                        </v-btn> <span class="grey--text">|</span> 
                        <v-btn @click.prevent="editItem" color="primary" text small>
                            <v-icon left>
                                mdi-file-edit-outline
                            </v-icon>
                            editar
                        </v-btn>                      -->
                    </div>
                </v-col>
            </v-row>
            <v-row class="mr-md-16 ml-md-16 pr-md-16 pl-md-16 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
                <v-col cols="12">
                    <v-skeleton-loader
                        :loading="loadingProcess"
                        type="list-item, image"
                        max-height="149"
                        :style="style.v_card"
                    >                    
                        <v-card class="mx-auto" flat :style="style.v_card">
                            <v-card-title>
                                <h1 class="display-1 overline">  {{ titleStatusRequest }} </h1>
                            </v-card-title>
                            <v-card-text>
                                <v-divider style="position: relative;top: 19px;"></v-divider>
                                <v-row>
                                    <v-col v-for="(item, index) of procesoSolicitud" :key="index">
                                        <div>
                                            <div class="text-center" style="height: 46px;">
                                                <v-icon
                                                    :color="colorEstado(item.desc_proceso)">
                                                    {{ item.icon }}
                                                </v-icon>                                        
                                            </div>
                                            <div class="text-center">
                                                {{ item.desc_proceso }}
                                            </div>
                                        </div>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                        </v-card>
                    </v-skeleton-loader>
                </v-col>
            </v-row>				
            <v-row class="mr-md-16 ml-md-16 pr-md-16 pl-md-16 mr-sm-3 ml-sm-3 pr-sm-3 pl-sm-3">
                <v-col cols="12" sm="12" md="8" lg="8">
                    <!-- card con la informacion de la ficha -->
                    <v-card class="mx-auto mb-6" flat :style="style.v_card">
                        <div v-if="procesoActual == 'Finalizado'">
                            <span style="
                                position: absolute;
                                top: 20px;
                                transform: rotate(0deg);
                                left: -13px;
                                width: 141px;
                                text-align: center;
                                padding-top: 5px;
                                padding-bottom: 5px;
                                background-color: #2fb000;
                                color: white;
                                border-radius: 4px;
                            ">{{ procesoActual }}</span>
                        </div>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <div class="text-end pa-5">
                                        <h1 class="display-1 indigo--text"> {{ file.warranty }} </h1>
                                    </div>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row class="mt-2 mb-2 ml-2">
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <strong>Cliente: &nbsp;&nbsp;&nbsp;&nbsp;<span class="blue-grey--text"> {{ file.customer }} </span> </strong>
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <strong>Fecha creacion: </strong>{{ file.datecreate }}
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row class="mt-2 mb-2 ml-2">
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <strong>Tipo Solicitud: </strong>{{ file.typeRequest }}
                                </v-col>
                                <v-col cols="12" sm="12" md="6" lg="6">
                                    <strong>Descripcion solicitud: </strong>{{ file.descRequest }}
                                </v-col>    
                            </v-row>
                            <v-divider></v-divider>
                            <v-row class="mt-2 mb-2 ml-2 mr-2">
                                <v-col cols="12" sm="12" md="2" lg="2">
                                    <strong>Actividad: </strong>
                                </v-col>
                                <v-col cols="12" sm="12" md="10" lg="10">
                                   <span v-html="file.activity"></span>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row class="pa-5">
                                <v-col cols="12" sm="12" md="12" lg="12">
                                    <strong class="blue-grey--text">COSTOS: </strong>
                                    <v-simple-table id="tablaCostos">
                                        <template v-slot:default>
                                            <thead>
                                                <tr>
                                                    <th class="text-left"> Total </th>
                                                    <th class="text-left"> Valor Cancelado </th>
                                                    <th class="text-left"> Saldo </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr> 
                                                    <td>$ {{ file.total }}</td>
                                                    <td>$ {{ file.cancelado }}</td>
                                                    <td>$ {{ file.saldo }}</td>
                                                </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col>
                            </v-row>                            
                            <v-divider></v-divider>
                            <v-row class="pa-5">
                                <v-col cols="12" sm="12" md="12" lg="12" class="mt-3">
                                    <strong class="blue-grey--text">Responsable de la actividad:</strong> 
                                    <span> {{ file.liable }} </span>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row class="pa-5">
                                <v-col cols="12" class="text-end">
                                    <strong class="blue-grey--text">Costos totales:</strong> <br>
                                    <span  v-if="file.total != 0" class="headline"> $ {{ file.total }} </span> 
                                    <span  v-else> No hay costos para esta actividad </span> 
                                </v-col>
                            </v-row>                                
                        </v-card-text>
                    </v-card>
                    <!-- piezas relacionadas con la actividad -->
                    <v-card :style="style.v_card" flat v-if="piecesGraphics.length != 0">
                        <v-card-title>
                            <h1 class="subtitle-1 font-weight-normal">Piezas gráficas:</h1> 
                        </v-card-title>
                        <v-card-text>
                            <v-expansion-panels flat focusable>
                                <v-expansion-panel
                                    v-for="(item,i) in piecesGraphics"
                                    :key="i"
                                >
                                    <v-expansion-panel-header>
                                        <template v-slot:default="{ open }">
                                            <v-row no-gutters>
                                                <v-col cols="4">
                                                    {{ item.titulo }}
                                                </v-col>
                                                <v-col class="text--secondary">
                                                    <span> Fecha publicacion: {{ item.date }} </span>
                                                </v-col>
                                                <v-col class="text--secondary">
                                                    <span> Estado de la pieza: {{ item.estado }} </span>
                                                </v-col>
                                            </v-row>
                                        </template>
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <v-row no-gutters>
                                            <v-col cols="12">                                               
                                                <p class="pa-3"> <strong class="text--secondary">Responsable de la pieza:</strong> {{ item.liable }} </p>
                                                <v-divider></v-divider>
                                                <p class="pa-3"> <strong class="text--secondary">Objetivo de la pieza:</strong> {{ item.objective }} </p>
                                                <v-divider></v-divider>
                                                <p class="pa-3"> <strong class="text--secondary">Redes sociales:</strong> {{ item.social }} </p>
                                                <v-divider></v-divider>
                                                <p class="pa-3"> <strong class="text--secondary">Descripcion:</strong> {{ item.description }} </p>
                                            </v-col>
                                        </v-row>                                       
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>                        
                        </v-card-text>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="12" md="4" lg="4">
                    <!-- card para agregar comentarios a la solicitud -->
                    <v-card class="mx-auto" flat :style="style.v_card" height="600px" max-weight="600px">
                        <v-toolbar color="grey lighten-3" flat dense>
                            <h1 class="subtitle-1 font-weight-normal"> Comentarios: </h1>
                        </v-toolbar>
                        <v-card-text>                        
                            <v-row align="center" justify="center">
                                <v-col cols="12" sm="12" md="2" lg="2" class="d-none d-sm-flex d-sm-none d-md-flex d-md-none d-lg-flex">
                                    <v-avatar
                                        color="grey lighten-3"
                                        size="56"
                                    ><span class="indigo--text headline"> {{ initials }} </span></v-avatar>
                                </v-col>
                                <v-col cols="12" sm="12" md="10" lg="10">
                                    <v-form id="formComment" ref="formComment" @submit.prevent="sendMessage">
                                        <v-text-field
                                            v-model="commentUserTask"
                                            name="commentTask"
                                            :color="style.colorInput2"
                                            :rules="commentrules"
                                            label="Agregar comentario"
                                            append-outer-icon="mdi-send"
                                            autocomplete="off"
                                            @click:append-outer="sendMessage"
                                        ></v-text-field>
                                    </v-form>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-text v-if="file.comentarios.length != 0">
                            <v-list three-line :style="file.comentarios.length >= 5 ? style.scrollData : '' ">
                                <template v-for="(item, index) of file.comentarios">
                                    <v-divider></v-divider>
                                    <v-list-item>
                                        <v-list-item-avatar color="grey lighten-2">
                                            <span class="indigo--text" v-html="item.iniciales"></span>
                                        </v-list-item-avatar>
                                        <v-list-item-content>
                                            <v-list-item-title v-html="item.nombre"></v-list-item-title>
                                            <v-list-item-subtitle v-html="item.comentario"></v-list-item-subtitle>
                                            <v-list-item-subtitle v-html="item.fecha"></v-list-item-subtitle>
                                        </v-list-item-content>
                                    </v-list-item>
                                </template>                            
                            </v-list>
                        </v-card-text>
                        <v-card-text v-else align="center">
                            <br><br><v-icon> mdi-plus-thick mdi-48px </v-icon>
                            <p> No hay comentarios</p>
                        </v-card-text>
                    </v-card>
                    <v-snackbar
                        v-model="snackbar2"
                        :timeout="3000"
                        class="pa-3"
                        color="indigo accent-4"
                        elevation="24"
                    ><span class="subtitle-1"> {{ messageAddComment }} </span> </v-snackbar>
				</v-col>
            </v-row>            
		</div>
    `
})