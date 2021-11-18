Vue.component('Seefile',{
    props: {
        title: String,
    },
    data:() => ({
        titleModule: 'Tarea',
        // estilos personalizados para la vista
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo accent-3',
			deep_purple: 'deep-purple',
			teal: 'teal',
			teal__lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			v_cardindigo: 'box-shadow: rgba(48, 79, 254, 0.55) 0px 9px 19px -7px !important',
			v_cardteal: 'box-shadow: rgba(29, 233, 182, 0.55) 0px 9px 19px -7px !important',
			v_cardpurple: 'box-shadow: rgba(101, 31, 255, 0.55) 0px 9px 19px -7px !important',
			colorInput: 'teal accent-4',
			colorInput2: 'indigo',
            scrollData: 'overflow-y: scroll;'
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
            nameActivity: '',
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
            liable: [],
            asignActivity: '',
            fechaLimiteEntrega: '',
            fechaUltimaModificacion: '',
        },

        // campos obligatorios para ingresar
        campsRules:[
            v => !!v || 'Asegurate de diligenciar el campo',
        ],

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
        piecesGraphics:[],


        // comentarios de las actividades
        comentariosTask:[],

        // actualiza el estado de la actividad
        updateProcessRequest: false,
        messageProcessRequest: '',

        // fechas para la actividad
        fechaActual: '',

        // dialogo para tareas finalizadas:
        taskFinalizada: false,

        // tipo solicitud
        request_value: '',
		requests:[],

        // descripcion de la solicitud
        descRequest_value:'',
        descRequest:[],

        // responsable de la actividad
        liable_value: '',
        liable: [],

        // linea de tiempo modificacion de la actividad
        events: [],
        input: null,
        nonce: 0,
        // datos de la linea de tiempo
        historial: [],

        // eliminar responsable de la actividad
        snackbarDeleteUSer: false,
        colorDeleteUser: '',
        messageDeleteUser: '',
		
    }),	
    methods:{

        // color item ultimo en modificar
        colorLastModify(item){
            if(item == 'Finalizado') return 'green accent-3'
            else return 'blue lighten-4'
        },
        // historial de la actividad
        async historialActivity(){
            await fetch('../php/get/historialActivity.php/?id=' + this.title)
                .then(response => response.json())
                .then(data => {
                    _.forEach(data.historial, value => {
                        const item = {
                            fecha: moment(value.fecha).format('D of MMM, YYYY'),
                            hora: moment(value.fecha).format('hh:mm'),
                            proceso: value.proceso_solicitud,
                            tipoSolicitud: value.descripcion,
                            descSolicitud: value.descripcion_solicitud
                        }
                        this.historial.push(item)
                    })
                })
                .catch(err =>  console.error(err))
        },
        // linea de tiempo
        comment(){
            const time = (new Date()).toTimeString()
            this.events.push({
                    id: this.nonce++,
                    text: this.input,
                    time: time.replace(/:\d{2}\sGMT-\d{4}\s\((.*)\)/, (match, contents, offset) => {
                    return ` ${contents.split(' ').map(v => v.charAt(0)).join('')}`
                }),
            })
            this.input = null
        },

        // cambiar el estado
        changeState(item){
            var _this = this;
            var data = {
                process_value: item
            }

            if(item == 'finalizado' || item == 'Finalizado'){
                this.taskFinalizada = true
            }else{
                $.ajax({
                    method: 'POST',
                    url: '../php/post/updateProcessActivity.php/?id=' + this.title,
                    data: data,
                    dataType: 'json'
                })
                .done(data => {
                    if(data.error == false){                    
                        _this.getProcessRequest();
                        _this.updateProcessRequest = true;
                        _this.messageProcessRequest = `Se actualizo el estado a: ${item}`
                    }
                })
            }

        },

        // eliminar usuario de la actividad
        deleteUserActivity(item){

            var _this = this;
            var liables = [];
            var i = this.file.liable.indexOf( item ); 
            
            if ( i !== -1 ) {                
                if(this.file.liable.length > 1){

                    this.file.liable.splice( i, 1 );

                    _.forEach(this.file.liable,  value => {
                        liables.push(value.id);
                    })
                    var data = {
                        liables: liables,
                        deleteLiable: item.id
                    }
                    $.ajax({
                        method: 'POST',
                        url: '../php/post/deleteLiableTask.php/?id=' + this.title,
                        data: data,
                        dataType: 'json',
                    })
                    .done(data => {
                        if(data.error == false){
                            _this.snackbarDeleteUSer = true
                            _this.colorDeleteUser = 'red accent-3'
                            _this.messageDeleteUser = 'Se elimino el usuario de la actividad.'
                        }
                    })
                    .catch(err => console.error(err))
                }else{
                    this.snackbarDeleteUSer = true
                    this.colorDeleteUser = 'blue accent-3'
                    this.messageDeleteUser = 'La actividad debe tener asignado por lo menos un usuario'
                }

            }
        },

        // cambiar proceso de la actividad
        cambiarProcesoActividad(){
            var _this = this;
            var data = {
                typeRequest: this.request_value,
                descRequest: this.descRequest_value,
                responsable: this.liable_value
            }

            $.ajax({
                method: 'POST',
                url: '../php/post/newProcessForActivity.php/?id=' + this.title,
                data: data,
                dataType: 'json',
            })
            .done(data => {
                _this.taskFinalizada = false
                location.reload();
            })
            .catch(err => console.error(err))
        },

        // finalizar tarea directamente
        finalizarTarea(){
            var _this = this;
            var data = { 
                process_value: 'Finalizado'
            }            
            $.ajax({
                method: 'POST',
                url: '../php/post/updateProcessActivity.php/?id=' + this.title,
                data: data,
                dataType: 'json'
            })
            .done( data => {
                if(data.error == false){
                    _this.taskFinalizada = false
                }
            })
        },

        // funcion responsables
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

        // funcion tipo de solicitud
		async typeRequestChange(){
			await fetch('../php/get/typeRequest.php')
				.then(response => response.json())
				.then(data => {
					data.typeRequest.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.requests.push(item)
					})
				})
				.catch(err => console.error(err))
		},

        // funciones del formulario principal
		async descTypeRequest(param){
			this.descRequest = [];
			await fetch('../php/get/descTypeRequest.php/?id='+ param)
				.then(response => response.json())
				.then(data => {
					data.descRequest.forEach((value, index, element) => {
						const item = {
							value: element[index].id,
							description: element[index].desc
						}
						this.descRequest.push(item)
					});
				})
				.catch(err => console.error(err))
		},

        // function que obtiene las piezas relacionadas con la tarea
        getPiecesTask(){
            fetch('../php/get/infoPiecesGraphics.php/?id='+ this.title )
            .then(response => response.json())
            .then(data => {
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
                // console.log(data)
                this.file.nameActivity = data.responsables[0].nombre_actividad
                this.file.warranty = data.responsables[0].warranty
                this.file.typeRequest = data.responsables[0].typeRequest
                this.file.descRequest = data.responsables[0].descRequest
                this.file.customer = data.responsables[0].customer
                this.file.datecreate = data.responsables[0].datecreate
                this.file.activity = data.responsables[0].activity
                this.file.asignActivity = data.responsables[0].asignActivity
                this.file.total = Intl.NumberFormat().format(data.responsables[0].total)
                this.file.cancelado = Intl.NumberFormat().format(data.responsables[0].cancelado)
                this.file.saldo = Intl.NumberFormat().format(data.responsables[0].saldo)
                this.file.fechaLimiteEntrega = data.responsables[0].fecha_limite_entrega
                this.file.fechaUltimaModificacion = moment(data.responsables[0].fecha_ultima_modificacion).format('YYYY-MM-DD')

                _.forEach( data.responsables, value => {
                    const responsable = {     
                        id: value.id_liable,
                        usuario: value.liable
                    }
                    this.file.liable.push(responsable);
                })
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
                    this.comentariosTask.push(item)
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
                    return 'red accent-3'
                }else if(procesoA == 'Finalizado'){
                    return 'green accent-3'
                }else{
                    return 'orange accent-3'
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
                this.comentariosTask.push({                    
                    comentario: this.commentUserTask,
                    nombre: sessionStorage.getItem('firstname'),
                    iniciales: sessionStorage.getItem('initials')
                })

				const data = new FormData(document.getElementById('formComment'));
				fetch('../php/post/addCommentTask.php/?id=' + this.title,{
					method:'POST',
					body: data
				})
				.then(response => response.json())
				.then(data => {
					if(data.error == false){
                        this.file.comentarios = [];
						this.$refs.formComment.reset()
						this.$refs.formComment.resetValidation()
					}
				})
			}
		},
        // iniciales para la seccion del comentario
		commentsTask(){
			this.initials = sessionStorage.getItem('initials')
		},

    },
    created(){

    },
	mounted(){
        this.getfiletask();
        this.getfilecomments();
        this.getProcessRequest();
        this.typeRequest();
        this.commentsTask();
        this.getPiecesTask();
        this.typeRequestChange();
        this.liables();
        this.historialActivity();
    },
    template: /*html*/`
        <div class="pa-8">
            <v-row>
                <v-col cols="12">
                    <v-card class="mx-auto rounded-xl" flat :style="style.v_card">
                        <v-breadcrumbs :items="items">
                            <template v-slot:divider>
                                <v-icon>mdi-chevron-right</v-icon>
                            </template>
                        </v-breadcrumbs>
                    </v-card>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="6" lg="6">
                    <div>
                        <v-btn @click="generatePDF" color="red" rounded text small>
                            <v-icon left>
                                mdi-pdf-box
                            </v-icon>
                            descargar
                        </v-btn> <span class="grey--text">|</span>                        
                        <v-btn @click.prevent="editItem" rounded color="primary" text small>
                            <v-icon left>
                                mdi-file-edit-outline
                            </v-icon>
                            editar
                        </v-btn>                     
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <v-skeleton-loader
                        :loading="loadingProcess"
                        type="list-item, image"
                        max-height="149"
                    >                    
                        <!-- card proceso de la solicitud -->
                        <v-card class="mx-auto rounded-xl" flat :style="style.v_card">
                            <v-card-title>
                                <h1 class="body-2 text--secondary"> {{ titleStatusRequest }} </h1>
                            </v-card-title>
                            <v-card-text>
                                <v-divider style="position: relative;top: 19px;"></v-divider>
                                <v-row>
                                    <v-col v-for="(item, index) of procesoSolicitud" :key="index">
                                        <div>
                                            <div class="text-center" style="height: 46px;">
                                                <v-icon @click="changeState(item.desc_proceso)"
                                                    :value="item.desc_proceso"
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

                    <v-dialog
                        v-model="taskFinalizada"
                        width="600px"                        
                    >
                        <v-card class="rounded-xl">
                            <v-card-title class="mb-5">
                                <span class="font-weight-regular blue-grey--text">¿Que deseas hacer?</span>
                            </v-card-title>
                            <v-card-text>
                                <!-- Tipo de solicitud -->
                                <v-select
                                    v-model="request_value"
                                    :items="requests"
                                    :rules="campsRules"
                                    :color="style.colorInput"
                                    :item-color="style.colorInput"
                                    prepend-icon="mdi-format-list-bulleted"
                                    item-text="description"
                                    item-value="value"
                                    label="Tipo de solicitud"
                                    rounded
                                    filled
                                    @change="descTypeRequest"
                                >i</v-select>

                                <!-- Descripcion de la solicitud -->
                                <v-select
                                    v-model="descRequest_value"
                                    :items="descRequest"
                                    :rules="campsRules"
                                    :color="style.colorInput"
                                    :item-color="style.colorInput"
                                    prepend-icon="mdi-format-list-checkbox"
                                    item-text="description"
                                    item-value="value"
                                    rounded
                                    filled
                                    label="Descripcion de solicitud"
                                ></v-select>

                                <!-- Responsable -->
                                <v-autocomplete
                                    v-model="liable_value"
                                    :items="liable"
                                    :rules="campsRules"
                                    :color="style.colorInput"
                                    :item-color="style.colorInput"
                                    prepend-icon="mdi-account-outline"
                                    item-text="description"
                                    item-value="value"
                                    label="Responsable"
                                    hint="Selecciona la persona que continuara con el proceso"
                                    rounded
                                    filled
                                ></v-autocomplete>

                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="red accent-3" text rounded @click="taskFinalizada = false"> Cerrar </v-btn>
                                <v-btn color="orange accent-4" text rounded @click="cambiarProcesoActividad"> Asignar nuevo proceso </v-btn>
                                <v-btn color="teal accent-4" dark rounded @click="finalizarTarea" elevation=""> Finalizar </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-snackbar
                        v-model="updateProcessRequest"
                        :timeout="3000"
                        class="pa-3"
                        color="blue accent-3"
                        elevation="24"
                    > <span> {{ messageProcessRequest }} </span> </v-snackbar>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" sm="12" md="8" lg="8" xl="8">
                    <v-card flat :style="style.v_card" class="mb-6 rounded-lg rounded-b-xl">
                        <v-toolbar v-if="procesoActual == 'Finalizado'" height="8" flat color="green accent-3"></v-toolbar>
                        <v-toolbar v-else-if="procesoActual == 'Asignado'" height="8" flat color="red accent-3"></v-toolbar>
                        <v-toolbar v-else="procesoActual != 'Finalizado' || procesoActual != 'Asignado'" height="8" flat color="orange accent-3"></v-toolbar>

                        <v-card-title>
                            <span class="body-1 text--secondary"> <b class="blue-grey--text"> Fecha de creacion: </b> {{ file.datecreate }} </span>
                            <v-spacer></v-spacer>
                            <span class="body-1 text--secondary" v-if="procesoActual == 'Finalizado'"> <v-icon color="green accent-3"> mdi-circle-medium </v-icon> {{ procesoActual }} </span>
                            <span class="body-1 text--secondary" v-else-if="procesoActual == 'Asignado'"> <v-icon color="red accent-3"> mdi-circle-medium </v-icon> {{ procesoActual }} </span>
                            <span class="body-1 text--secondary" v-else="procesoActual != 'Finalizado' || procesoActual != 'Asignado'"> <v-icon color="orange accent-3"> mdi-circle-medium </v-icon> {{ procesoActual }} </span>

                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="pl-5">
                                    <span> Actividad: </span>
                                    <h2 class="font-weight-light"> {{ file.nameActivity }} </h2>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Cliente: </span>
                                    <h2 class="font-weight-light"> {{ file.customer }} </h2>
                                </v-col>
                                <!-- <v-divider class="d-none d-md-flex" vertical></v-divider> -->
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Garantia: </span>
                                    <h2 class="font-weight-light"> {{ file.warranty }} </h2>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <v-row>
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            <v-card flat :style="style.v_card" class="rounded-xl">
                                <v-card-text class="body-1">
                                    <strong class="blue-grey--text">Tipo de solicitud: </strong>

                                    <h2 class="font-weight-light"> {{ file.typeRequest }} </h2>
                                </v-card-text>
                            </v-card>
                        </v-col>
                        <v-col cols="12" sm="12" md="6" lg="6" xl="6">
                            <v-card flat :style="style.v_card" class="mb-6 rounded-xl">
                                <v-card-text class="body-1">
                                    <strong class="blue-grey--text">Descripción de la solicitud: </strong>
                                    <h2 class="font-weight-light"> {{ file.descRequest }} </h2>
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                    
                    <!-- ficha de la actividad -->
                    <v-card flat :style="style.v_card" class="mb-6 rounded-xl">
                        <v-card-text class="body-1">
                            <v-row>
                                <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pl-5">
                                    <strong class="blue-grey--text">Actividad: </strong>
                                </v-col>
                                <v-col cols="12" sm="12" md="8" lg="8" xl="8" class="pl-5">
                                    <span class="font-weight-light" v-html="file.activity"></span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-list>
                            <v-list-item>
                                <v-list-item-content three-line>
                                    <span> 
                                        <v-row no-gutters>
                                            <v-col cols="12" sm="12" md="3" lg="3" xl="3">
                                                <span class="font-weight-light" v-if="file.liable.length > 1"> Responsables de la actividad: </span> 
                                                <span class="font-weight-light" v-else> Responsable de la actividad: </span>                                                 
                                            </v-col>
                                            <v-col cols="12" sm="12" md="9" lg="9" xl="9">
                                                <v-chip v-for="(item, index) in file.liable" :key="index" class="ma-1" dense :color="style.indigo" dark>
                                                    <v-icon left>
                                                        mdi-account
                                                    </v-icon>
                                                    {{ item.usuario }}
                                                    <v-avatar color="white" right>
                                                        <v-tooltip bottom>
                                                            <template v-slot:activator="{ on, attrs }">
                                                                <v-btn color="white" v-bind="attrs" v-on="on" fab small :style="style.v_cardteal"
                                                                    @click="deleteUserActivity(item)"
                                                                >
                                                                    <v-icon :color="style.indigo">
                                                                        mdi-close
                                                                    </v-icon>
                                                                </v-btn>
                                                            </template>
                                                            <span>Eliminar usuario</span>
                                                        </v-tooltip>
                                                    </v-avatar>
                                                </v-chip>
                                                <v-tooltip bottom>
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-btn color="teal accent-3" dark v-bind="attrs" v-on="on" fab small :style="style.v_cardteal">
                                                            <v-icon> mdi-plus </v-icon>
                                                        </v-btn>
                                                    </template>
                                                    <span>Agregar usuario</span>
                                                </v-tooltip>                                                
                                            </v-col>
                                        </v-row>
                                    </span>
                                    <v-list-item-subtitle> <span class="font-weight-light"> Fecha: {{ file.datecreate }} </span> </v-list-item-subtitle>                                        
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                                <v-list-item-content three-line>
                                    <v-list-item-title> <span class="font-weight-light"> Actividad solicitada por: {{ file.asignActivity }} </span> </v-list-item-title> 
                                    <v-list-item-subtitle> <span class="font-weight-light"> Fecha: {{ file.datecreate }} </span> </v-list-item-subtitle>                                        
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>

                        <v-snackbar v-model="snackbarDeleteUSer" :timeout="3000" :color="colorDeleteUser" rounded="pill">
                            {{ messageDeleteUser }}
                            <template v-slot:action="{ attrs }">
                                <v-btn color="white" rounded text v-bind="attrs" @click="snackbarDeleteUSer = false">Close</v-btn>
                            </template>
                        </v-snackbar>
                    </v-card>
                
                    <!-- card con la informacion de la ficha -->
                    <v-card class="rounded-xl mb-6" flat :style="style.v_card">

                        <v-card-text class="body-1">
                            <strong class="blue-grey--text">Costos de la actividad: </strong>
                            <v-row>
                                <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pl-5">
                                    <span> Precio de venta: </span>
                                    <h2 class="font-weight-light"> $ {{ file.total }} </h2>
                                </v-col>
                                <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pl-5">
                                    <span> Abono: </span>
                                    <h2 class="font-weight-light"> $ {{ file.cancelado }} </h2>
                                </v-col>
                                <v-col cols="12" sm="12" md="4" lg="4" xl="4" class="pl-5">
                                    <span> Saldo: </span>
                                    <h2 class="font-weight-light"> $ {{ file.saldo }} </h2>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>

                    <!-- piezas relacionadas con la actividad -->
                    <v-card :style="style.v_card" flat v-if="piecesGraphics.length != 0" class="rounded-xl">
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
                    <!-- card informacion de la actividad tienen fecha limite de entrega -->
					<v-card :style="style.v_card" class="mb-6 rounded-xl" v-if="file.fechaLimiteEntrega != '' && file.fechaLimiteEntrega != '0000-00-00'">                        
						<v-card-text>
							<v-row no-gutters align="center" justify="center">
								<v-col cols="8" sm="8" md="8" lg="8" xl="8">
									<b>Fecha limite de entrega:</b> {{ file.fechaLimiteEntrega }} <br>
									<span><b>Fecha ultima modificación:</b> {{ file.fechaUltimaModificacion }}</span>
                                    <span v-if="file.fechaUltimaModificacion <= file.fechaLimiteEntrega  && procesoActual == 'Finalizado'"> <br><br>La actividad se entrego a tiempo según la fecha indicada </span>
                                    <span v-else-if="file.fechaUltimaModificacion >= file.fechaLimiteEntrega  && procesoActual == 'Finalizado'"> <br><br> La actividad no se entrego a tiempo según la fecha indicada </span><br>
								</v-col>
								<v-col cols="4" sm="4" md="4" lg="4" xl="4">
									<div class="text-right pa-4">
										<v-icon v-if="file.fechaUltimaModificacion <= file.fechaLimiteEntrega  && procesoActual == 'Finalizado'" color="green accent-3"> mdi-check-circle mdi-24px </v-icon>
										<v-icon v-else-if="file.fechaUltimaModificacion >= file.fechaLimiteEntrega  && procesoActual == 'Finalizado'" color="orange accent-3"> mdi-check-circle-outline mdi-24px </v-icon>                                    
									</div>
								</v-col>
							</v-row>
						</v-card-text>
					</v-card>
                    <!-- card para agregar comentarios a la solicitud -->
                    <v-card :style="style.v_card" flat max-height="520px" class="mb-6 rounded-xl">
                        <v-card-title>
                            <span class="font-weight-regular text--secondary"> Comentarios </span>                                
                        </v-card-title>
                        <v-card-text>
                            <v-list v-if="comentariosTask.length != 0" :style="comentariosTask.length > 5 ? style.scrollData : ''" max-height="320">
                                <v-list-item v-for="(item, i) in comentariosTask" :key="i" class="ma-2">
                                    <v-list-item-avatar> 
                                        <v-avatar size="48" color="deep-purple accent-1"> <span class="white--text"> {{ item.iniciales }} </span> </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content three-line class="blue-grey lighten-5 pa-2 pl-4 rounded-r-xl rounded-b-xl">
                                        <span> {{ item.comentario }} </span>
                                        <v-list-item-subtitle> {{ item.nombre }} </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                            <div v-else>                            
                                <v-icon color="deep-purple accent-2"> mdi-emoticon-cool-outline </v-icon>
                                <span> Sé el primero en comentar... </span>                                
                            </div>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-avatar>
                                        <v-avatar size="58" color="deep-purple accent-2"> <span class="white--text">{{ initials }}</span>  </v-avatar>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <v-form id="formComment" ref="formComment" @submit.prevent="">
                                            <v-text-field
                                                v-model="commentUserTask"
                                                name="commentTask"
                                                filled
                                                rounded
                                                label="Agregar comentario..."
                                                append-icon="mdi-comment-outline"
                                                hide-details
                                                clearable
                                                color="deep-purple accent-3"
                                                autocomplete="off"
                                                @keyup.enter="sendMessage"
                                            ></v-text-field>
                                        </v-form>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>
                    </v-card>                    
                    <v-snackbar
                        v-model="snackbar2"
                        :timeout="3000"
                        class="pa-3"
                        color="indigo accent-3"
                        elevation="24"
                    ><span class="subtitle-1"> {{ messageAddComment }} </span> </v-snackbar>
                
                    <!-- historial de la actividad -->
                    <v-card :style="style.v_card" class="rounded-xl">
                        <v-responsive
                            class="overflow-y-auto"
                            max-height="500"
                        >
                            <v-card-text>
                                <v-timeline dense clipped v-if="historial.length > 0">
                                    <v-timeline-item
                                        class="mb-6"
                                        hide-dot
                                    >
                                        <span>HISTORIAL: proceso de la solicitud</span>
                                    </v-timeline-item>

                                    <v-timeline-item 
                                        v-for="(item, index) in historial" :key="index"
                                        class="mb-4" 
                                        :color="colorLastModify(item.proceso)"
                                        item-color="grey lighten-1"
                                        small
                                    >
                                        <v-row justify="space-between">
                                            <v-col cols="7">
                                                <span class="subtitle-2"> {{ item.proceso }}. </span><br>
                                                <span> {{ item.fecha }} </span><br>
                                                <span> {{ item.tipoSolicitud }} - {{ item.descSolicitud }} </span>
                                            </v-col>
                                            <v-col cols="5" class="text-right">
                                                {{ item.hora }} EDT
                                            </v-col>
                                        </v-row>
                                    </v-timeline-item>                                                                                            
                                </v-timeline>
                                <span v-else class="text--secondary"> No hay historial para la actividad </span>
                            </v-card-text>
                        </v-responsive>
                    </v-card>
				</v-col>
            </v-row>            
		</div>
    `
})