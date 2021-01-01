import './bootstrap'
import config from '@/js/configs'

// Set Vue globally
import Vue from 'vue'
window.Vue = Vue

// Set Vue router
import router from './routes/web_routes'
import VueRouter from 'vue-router'
Vue.router = router
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
};
Vue.use(VueRouter)

// vuetify
import '@mdi/font/css/materialdesignicons.min.css';
import 'vuetify/dist/vuetify.min.css';
import Vuetify from 'vuetify';
Vue.use(Vuetify);
const vuetifyOptions = {
    theme: {
        dark : false,
        themes: {
            light: {
                primary: config.theme.primary,
                secondary: config.theme.secondary
            },
            dark: {
                primary: config.theme.secondary,
                secondary: config.theme.primary
            },
        },
    }
}

// Set Vue authentication
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
var baseurl = window.location.protocol + "//" + window.location.host;
axios.defaults.baseURL = baseurl+`/api`

import auth from './auth'
import VueAuth from '@websanova/vue-auth'
Vue.use(VueAuth, auth)

// Prototype
import api from './api/api_routes'
import { errorHandler } from "@/js/helpers/common.js"
Vue.prototype.$api = api
Vue.prototype.$errorHandler = errorHandler

// Filter :: register global utility filters.
import * as filters from '@/js/filters'; // global filters
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key]);
});

// Load Index
import Index from './views/index'
Vue.component('index', Index)

// initialize vue app
const app = new Vue({
    el: '#app',
    router,
    vuetify: new Vuetify(vuetifyOptions),
});
