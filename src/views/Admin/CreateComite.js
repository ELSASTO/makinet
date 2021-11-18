Vue.component('Createcomite',{
	data:() => ({

		// estilos personalizados
		style:{
			header: 'border-bottom: 1px solid #e0e0e0 !important',
			indigo: 'indigo accent-3',
			deep_purple: 'deep-purple',
			teal_lighten_1: 'teal lighten-1',
			v_card: 'box-shadow: rgba(48, 79, 254, 0.13) 0px 9px 19px -7px !important',
			v_cardindigo: 'box-shadow: rgba(48, 79, 254, 0.55) 0px 9px 19px -7px !important',
			v_cardteal: 'box-shadow: rgba(29, 233, 182, 0.55) 0px 9px 19px -7px !important',
			v_cardpurple: 'box-shadow: rgba(101, 31, 255, 0.55) 0px 9px 19px -7px !important',
            scrollY: 'overflow-y:scroll; max-height: 250px;',
            noScroll: 'overflow-y:none;'
		},

        loadingComite: false,
        snackbarComite: false,
        snackbarComiteColor: '',
        messageCreateComite: '',

        // titulo del comite
        titulo_comite: '',

        // participantes
        value:'',
        participantes:[],
        participanComite: [],

        // descripcion del comite
        descripcion_comite: '',

        // tareas del comite
        idTask: 0,
        descTask: '',
        tareasComite:[],

        // conclusiones
        conclusiones: '',

        // fecha comite
        fecha_comite: new Date().toISOString().substr(0, 10),

        // ubicacion y hora del comite
        ubicacion: '',
        horaInicio: '08:00:00',
        
	}),
	
	mounted(){
        this.participantesComite();
	},

	methods:{
        createComite(){
            var _this = this
            var data = {
                titulo: this.titulo_comite,
                participantes: this.value,
                descripcion: this.descripcion_comite,
                tareas: this.tareasComite,
                conclusiones: this.conclusiones,
                fecha: this.fecha_comite,
                ubicacion: this.ubicacion,
                horaInicio: this.horaInicio,
            }

            if(this.titulo_comite == '' || this.value == '' || this.descripcion_comite == '' || this.tareasComite == '' || this.fecha_comite == '' || this.ubicacion == '' || this.horaInicio == ''){

                _this.snackbarComite = true;
                _this.snackbarComiteColor = 'red accent-3';
                _this.messageCreateComite = 'Asegurate de diligenciar todos los campos';

            }else{

                $.ajax({
                    method: 'POST',
                    url: '../php/post/createComite.php',
                    data: data,
                    dataType: 'json',
                })
                .done(data => {
                    if(data.error == false){                
                        _this.loadingComite = true;
                        _this.snackbarComiteColor = 'green accent-3';
                        setTimeout(() => {
                            _this.loadingComite = false;
                        }, 1000);
    
                        _this.snackbarComite = true;
                        _this.messageCreateComite = data.message;
    
                    }
                })
                .catch(err => console.error(err)); 
            }

        },
        
        // agregar tareas de manera dinamica a la lista
        addTask(param){
            if(param != ''){
                const item = {
                    value: false,            
                    description: param.trim()
                }
                this.tareasComite.push(item);
                this.descTask = '';
            }
        },

        // borrar items de la lista de tareas
        deleteItemList(item){            
            var i = this.tareasComite.indexOf( item ); 
            if ( i !== -1 ) {
                this.tareasComite.splice( i, 1 );
            }
        },

        // obtiene los participantes que perteneceran al comite
        async participantesComite(){
            await fetch('../php/get/liable.php')
            .then(response => response.json())
            .then(data => {
                // if(data){    
                    _.forEach(data.liables, (value) => {
                        const item = {
                            value: value.id,
                            description: value.desc
                        }
                        this.participantes.push(item);
                    })
                // }
            })
            .catch(err => console.error(err))
        }

	},
	template: /*html*/`
		<div class="pa-8">
            <v-row>
                <v-col cols="12" sm="12" md="4" lg="4" xl="4">
                    <v-card :style="style.v_card" class="rounded-xl mb-6">
                        <v-toolbar :color="style.indigo" dark  flat dense>
                            <h1 class="subtitle-1 font-weight-normal">Comite N°</h1>
                        </v-toolbar>            
                        <v-card-text>                            
                            <!-- campo tema -->
                            <v-text-field
                                v-model="titulo_comite"
                                prepend-icon="mdi-file-document-outline"
                                label="Tema *"
                                :color="style.indigo"
                                rounded
                                filled
                            ></v-text-field>
                            <v-row>
                                <v-col cols="12">
                                    <v-icon>
                                        mdi-help-circle-outline mdi-18px
                                    </v-icon>
                                    <span>
                                        Recomendacion: Tema del comite descripcion general del tema que se abarcará. 
                                    </span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <!-- carda participantes del comite -->
                    <v-card :style="style.v_card" class="rounded-xl mb-6" :loading="loadingComite">
                        <v-card-title>
                            <h1 class="text--secondary subtitle-1"> Participantes: </h1>
                        </v-card-title>
                        <v-card-text>
                            <v-select
                                v-model="value"
                                :color="style.indigo"
                                :items="participantes"
                                :item-color="style.indigo"
                                item-value="value"
                                item-text="description"
                                prepend-icon="mdi-account-group-outline"
                                label="Selecciona los participantes"
                                clearable
                                multiple
                                rounded
                                filled
                            >
                                <template v-slot:selection="{ item, index }">
                                    <v-chip v-if="index === 0">
                                        <span>{{ item.description }}</span>
                                    </v-chip>
                                    <span
                                        v-if="index === 1"
                                        class="grey--text text-caption"
                                    >
                                        (+{{ value.length - 1 }} otros)
                                    </span>
                                </template>
                            </v-select>
                            <v-row>
                                <v-col cols="12">
                                    <v-icon>
                                        mdi-help-circle-outline mdi-18px
                                    </v-icon>
                                    <span>
                                        Recuerda: Podrás seleccionar mas de un participante para la reunión.
                                    </span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <!-- card descripcion general del comite -->
                    <v-card :style="style.v_card" class="rounded-xl mb-6" :loading="loadingComite">
                        <v-card-title>
                            <h1 class="text--secondary subtitle-1"> Descripcion: </h1>
                        </v-card-title>
                        <v-card-text>
                            <v-textarea
                                v-model="descripcion_comite"
                                :color="style.indigo"
                                label="Descripcion del comite"                                
                                name=""
                                rounded
                                filled
                            ></v-textarea>
                            <v-row>
                                <v-col cols="12">
                                    <v-icon>
                                        mdi-help-circle-outline mdi-18px
                                    </v-icon>
                                    <span>
                                        Recuerda que la descripción es algo muy general de la reunión, para actividades puntutales crealas en las actividades.
                                    </span>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>                    
                </v-col>
                <v-col cols="12" sm="12" md="5" lg="5" xl="5">
                    <!-- card de las actividades para realizar -->
                    <v-card :style="style.v_card" class="mb-6 rounded-xl" height="450px" max-height="450px">
                        <v-toolbar color="deep-purple accent-3" dark flat dense>
                            <h1 class="subtitle-1 font-weight-normal"> Actividades a realizar: </h1>                        
                        </v-toolbar>
                        <v-card-text>
                            <v-text-field
                                v-model="descTask"
                                label="Agregar tarea"
                                append-outer-icon="mdi-plus-thick"
                                @keyup.enter="addTask(descTask, idTask)"
                                @click:append-outer="addTask(descTask)"
                                hint="Presiona Enter para agregar la actividad"
                                color="deep-purple accent-3"
                                rounded
                                filled
                                hide-details
                            ></v-text-field>
                        </v-card-text>
                        <v-card-text v-if="tareasComite.length != 0">                            
                            <v-list flat subheader :style="tareasComite.length == 0 ? style.noScroll : style.scrollY ">
                                <v-list-item-group multiple>
                                    <v-list-item v-for="(item, index) of tareasComite" :key="index">
                                        <v-list-item-content>
                                            <span> Actividad:  {{ index+1. }} </span>
                                            <v-text-field
                                                style="padding: 0px; margin: 0px;"
                                                v-model="item.description"
                                                :value="item.description"
                                                hide-details
                                                color="green"
                                            ></v-text-field>
                                        </v-list-item-content>
                                        <!-- <v-list-item-action>
                                            <v-checkbox v-model="item.value" color="green"></v-checkbox>
                                        </v-list-item-action> -->
                                        <v-list-item-action>                                                
                                            <v-btn icon @click="deleteItemList(item)" color="red" text>
                                                <v-icon> mdi-close </v-icon>
                                            </v-btn>
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card-text>                        
                        <v-card-text v-else align="center">
                            <br><br> <v-icon> mdi-plus-thick mdi-48px </v-icon>
                            <p> Agregar tareas/actividades</p>
                        </v-card-text>
                    </v-card>

                    <!-- card para las conclusiones u observaciones -->
                    <v-card :style="style.v_card" class="rounded-xl mb-6" :loading="loadingComite">
                        <v-card-title>
                            <h1 class="text--secondary subtitle-1"> Conclusiones: </h1>
                        </v-card-title>
                        <v-card-text>
                            <v-textarea
                                v-model="conclusiones"
                                :color="style.indigo"
                                label="conclusiones de la actividad/comite"                                
                                rows="3"
                                rounded
                                filled
                            ></v-textarea>
                        </v-card-text>
                    </v-card>
                </v-col>

                <v-col cols="12" sm="12" md="3" lg="3" xl="3">
                    <v-date-picker
                        width=""
                        v-model="fecha_comite"
                        :style="style.v_card" 
                        class="rounded-xl mb-6"
                        :color="style.indigo"
                    ></v-date-picker>
                    <v-card :style="style.v_card" class="rounded-xl mb-6" :loading="loadingComite">
                        <v-card-title>
                            <h1 class="text--secondary subtitle-1"> Ubicacion y Hora del Comite: </h1>
                        </v-card-title>
                        <v-card-text>
                            <!-- campo ubicacion -->
                            <v-text-field
                                v-model="ubicacion"
                                :color="style.indigo"
                                prepend-icon="mdi-city-variant-outline"
                                label="Ubicacion / lugar"
                                rounded
                                filled
                            ></v-text-field>
                            <!-- campo hora inicio -->
                            <v-text-field
                                v-model="horaInicio"
                                :color="style.indigo"
                                prepend-icon="mdi-clock-time-ten-outline"
                                label="Hora inicio*"
                                value="12:30:00"
                                type="time"
                                rounded
                                filled
                            ></v-text-field>
                        </v-card-text>
                    </v-card>
                    <v-btn
                        class="ma-2"                   
                        :style="style.v_cardindigo"
                        :color="style.indigo"
                        @click.prevent="createComite"
                        block
                        rounded
                    >
                        <span class="white--text"> Guardar comite </span>
                        <template v-slot:loader>
                            <span>Loading...</span>
                        </template>
                    </v-btn>
                    <v-snackbar 
                        v-model="snackbarComite" 
                        :color="snackbarComiteColor" 
                        rounded="pill" 
						class="pa-3"
                    >
                        <span> {{ messageCreateComite }} </span>
                    </v-snackbar>
                </v-col>
            </v-row>      
		</div>
	`
});