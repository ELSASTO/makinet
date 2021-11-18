Vue.component('Namebusiness',{
    data:() => ({
        Namebusiness: 'Agencia Manager'
    }),
    methods:{

    },
    template:/*html*/`
        <div class="d-block ma-5 text--secondary" align="center">
            <h1 class="font-weight-regular">
                <span style="color: #3d5afe">{{ Namebusiness }}</span>
            </h1>
        </div>
    `
})