<template>
<div>
    <!-- App bar -->
    <v-app-bar
        dark
        color="primary"
    >   
        <v-app-bar-nav-icon @click="isOpen=!isOpen"></v-app-bar-nav-icon>
        <v-toolbar-title>QERA</v-toolbar-title>
        <v-spacer></v-spacer>
    </v-app-bar>

    <!-- Side bar -->
    <v-navigation-drawer
        v-model="isOpen"
        color="white"
        app
        fixed
        temporary
    >   
        <template v-for="group in route_groups">
            <v-list nav :subheader="group.title!=null" dense>
                <v-subheader v-if="group.title!=null">{{group.title }}</v-subheader>
                <template v-for="item in group.routes">
                    <v-menu
                        v-if="item.sub != null"
                        offset-x open-on-hover 
                        close-on-content-click close-on-click
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-list-item
                            v-model="navIndex"
                            v-bind="attrs" v-on="on"
                            :to="item.route"
                        >
                            <v-list-item-icon>
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        </template>
                        <v-list dense>
                            <v-list-item
                                v-for="(item, index) in item.sub"
                                :key="index"
                                :to="item.route"
                            >
                                <v-list-item-title>{{ item.title }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-list-item
                        v-else
                        v-model="navIndex"
                        :to="item.route"
                    >
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ item.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </template>
    </v-navigation-drawer>

</div>
</template>

<script>
import navi from '@/js/configs/navbar'
export default {
    data () {
        return {
            navIndex: null,
            isOpen: false,
            route_groups: [],
        }
    },
    // watch:{
    //     $route (to, from){
    //     }
    // },
    created(){
        let navi_key = 'admin'
        if(this.$auth.user().role_id == 4) {
            navi_key = 'role_2'
        }
        this.route_groups = navi.navbar_path[navi_key]
    },
    methods: {
        logout(){
            this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
            this.$auth.logout({
                makeRequest: true,
                params: {}, // data: {} in axios
                success: function () { },
                error: function () { },
                redirect: '/login',
                // etc...
            });
        },
    }
  }
</script>