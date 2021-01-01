<template>
<div class="fill-height">
<div class="rounded-banner primary elevation-1" :style="$vuetify.breakpoint.mdAndUp ? 'height: 55vh' : 'height: 55vh'">
</div>
<v-container class="text-center justify-center fill-height">
    <v-row justify="center" dense class="px-3" style="z-index: 1">
        <v-col cols=12 md=8>
            <div 
                class="py-1 px-6 mb-3 white--text" 
                style="
                    letter-spacing: 2px;
                    font-size: 30px;
                "
            >TITLE</div>
            <v-card width="100%" class="radius-05">
                <v-card-title class="font-weight-bold justify-center" :class="$vuetify.breakpoint.mdAndUp ? '' : 'body-1' ">
                    <span>Login</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text class="pa-6">
                    <v-text-field
                        v-model="user.username"
                        label="Username" placeholder="Enter Username"
                        prepend-icon="mdi-account"
                        :error-messages="errors.username"
                    ></v-text-field>
                    <v-text-field
                        @keyup.enter="login()"
                        v-model="user.password" type="password"
                        label="Password" placeholder="Enter Password"
                        prepend-icon="mdi-lock"
                        :error-messages="errors.password"
                    ></v-text-field>
                </v-card-text>
                <div class="caption error--text font-italic px-10">{{ errors.else }}</div>
                <v-card-actions class="pa-6 pt-3">
                    <v-btn rounded block color="secondary" :loading="isLoading" @click="login()">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</div>
</template>

<script>
export default {
    data() {
        return {
            user:{
                username : null,
                password : null
            },
            errors : {},
            isLoading : false,
        }
    },
    created(){
        // check is logined
        if(this.$auth.check()){
            this.redirectUser(this.$auth.user().role_id)
        }
    },
    methods:{
        login(){
            this.errors = {}
            this.isLoading = true;
            this.$auth.login({
                params: {
                    username: this.user.username,
                    password: this.user.password,
                }, // data: {} in Axios
                success: function () { },
                error: function (err ) { },
                rememberMe: true,
                fetchUser: true,
                // etc...
            }).then((res)=>{
                this.redirectUser(res.data.role_id)
            })
            .catch((err)=>{
                console.log(err.data)
                if(err.data.status == 422){
                    this.errors = err.data.message
                }else{
                    this.errors.else = err.data.message
                }
            }).finally(()=>{
                this.isLoading = false
            });
        },
        redirectUser(role_id){
            console.log(role_id)
            var path = "";
            if( [1,5].indexOf(role_id) != -1 ){
                path = "/home/admin"
            }else if(role_id == 4){
                path = "/home/course-provider"
            }else{
                this.$toast.warning('Invalid Authorization')
            }
            this.$router.push(path)
        }
    }
}
</script>