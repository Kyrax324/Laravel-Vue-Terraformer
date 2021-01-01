<template>
<v-container fluid fill-height class="justify-center primary">
    <v-container>
    <v-row justify="center">
        <v-col cols=auto>
            <h1 class="white--text font-weight-bold">Hello World</h1>
        </v-col>
        <v-col cols=12 class="text-center">
            <v-btn to="/login" color="secondary" rounded>Login</v-btn>
        </v-col>
    </v-row>
    </v-container>
</v-container>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    created(){
    },
    methods:{
    }
}
</script>