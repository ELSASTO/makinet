Vue.component('Seeorder',{
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

        // datos consultados para la ficha de la solicitud
        ficha: '',
        List:[],

        messageNotData: '',
        // loading para el proceso de la solicitud
        loadingProcess: true,
    }),	
    methods:{
        // funcion que obtiene la informacion de las ordenes
        getOrders(){
            fetch('../php/get/seeOrder?id=' + this.title)
            .then(response => response.json())
            .then(data => {

                this.ficha = data.ficha

                data.ordenes.forEach(element =>  {
                    this.List.push({
                        fechaSolicitud: element.fechaSolicitud,
                        fechaEntrega: element.fechaEntrega,
                        cliente: element.nombreCliente,
                        nombreSolicitante: element.nombreSolicitante,
                        descripcion: element.descripcion,
                        estado: element.estado,
                        precioVenta: Intl.NumberFormat().format(element.precioVenta),
                        precioUnitario: Intl.NumberFormat().format(element.precioUnitario),
                    })              
                });
                if(this.List.length !== 0 ) {

                    this.loadingProcess = false;
                
                }else{
                
                    this.loadingProcess = false;
                    this.messageNotData = 'No hay items'
                
                }
            })
        },
     
        // funcion para generar el pdf
        // generatePDF(){
        //     window.open('../php/reportes/mpdf/seefile/seefile.report.php/?id=' + this.title ,'_blank')
        // },

        // function para editar la ficha
        // editItem() {        
        //     window.location.href = 'EditActivity?id=' + this.title
        // },
    },
	mounted(){
        this.getOrders();
    },
    template:/*html*/` 
        <v-row>
            <v-col cols="12" sm="12" md="8" lg="8" xl="8">
                <v-card flat :style="style.v_card" class="mb-6 rounded-xl">
                    <v-skeleton-loader
                        :loading="loadingProcess"
                        class="mx-auto rounded-xl"
                        type="article"
                    >      
                        <v-card-title>
                            <span class="body-1 text--secondary"> <b class="blue-grey--text"> Fecha Solicitud: </b> {{ ficha.fechaSolicitud }} </span>
                            <v-spacer></v-spacer>
                            <span class="body-1 text--secondary"> <b class="blue-grey--text"> Fecha Entrega: </b> {{ ficha.fechaEntrega }} </span>
                            <v-spacer></v-spacer>
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Nombre Cliente: </span>
                                    <h2 class="font-weight-light"> {{ ficha.nombreCliente }} </h2>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Nombre Solicitante: </span>
                                    <h2 class="font-weight-light"> {{ ficha.nombreSolicitante }} </h2>
                                </v-col>
                            </v-row>
                             <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Estado: </span>
                                    <h2 class="font-weight-light"> {{ ficha.estado }} </h2>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Fecha Registro: </span>
                                    <h2 class="font-weight-light"> {{ ficha.fecha_registro }} </h2>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Observaciones: </span>
                                    <h2 class="font-weight-light"> {{ ficha.observaciones }} </h2>
                                </v-col>
                                <v-spacer></v-spacer>
                                <v-col cols="12" sm="12" md="6" lg="6" xl="6" class="pl-5">
                                    <span> Precio Total: </span>
                                    <h2 class="font-weight-light"> $ {{ Intl.NumberFormat().format(ficha.precioVenta) }} </h2>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-skeleton-loader>
                </v-card>
                <v-skeleton-loader
                    :loading="loadingProcess"
                    class="mx-auto rounded-xl"
                    type="article"
                >                
                    <v-card flat :style="style.v_card" class="mb-6 rounded-xl">
                        <div  v-if="List.length !== 0">    
                            <v-card-title class="blue-grey--text"> Items: </v-card-title>
                            <v-card-text>
                                <v-list>
                                    <v-list-item v-for="(item, index) in List" :key="index">
                                        <v-list-item-content>
                                            <v-list-item-title> Descripcion: </v-list-item-title>
                                            <v-list-item-subtitle> {{ item.descripcion }} </v-list-item-subtitle>
                                        </v-list-item-content>
                                        <v-list-item-action>
                                          $  {{ item.precioUnitario  }}
                                        </v-list-item-action>
                                    </v-list-item>
                                </v-list>
                            </v-card-text>
                        </div>
                        <v-card-text v-else>
                            <v-list>
                                <v-list-item>
                                    <v-list-item-content>
                                        {{messageNotData}}
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card-text>                            
                    </v-card>                
                </v-skeleton-loader>
            </v-col>
        </v-row>
    `
})


