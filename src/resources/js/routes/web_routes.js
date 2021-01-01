import VueRouter from 'vue-router'
import { setPageTitle } from '@/js/helpers/common'

// Layout
const BaseLayout = () => import('@/js/views/layouts/BaseLayout')

// Pages
const Login  = () => import( '@/js/views/General/Login')
const Main  = () => import( '@/js/views/General/Main')
const Error404  = () => import( '@/js/views/General/404')
const Comingsoon  = () => import( '@/js/views/General/Comingsoon')

// Routes
// ** for more information, kindy refer to https://github.com/websanova/vue-auth/blob/master/docs/Privileges.md
// ** auth: true <- can be access only if auth.check = true
// ** auth: false <- cannot be access is auth.check = true
// ** auth: null, title: '' <- no auth rule
// ** auth: [1,2] <- can be access is auth.user.role matched

const baseLayoutRoutes = [
    { path: '/comingsoon', name: 'admin.home2', component: Comingsoon, meta: { auth: [ 1,5 ], title: 'Coming Soon' } },
]

const routes = [

    { path: '/', name: 'main', component: Main, meta: { auth: null, title: 'Home' } },
    { path: '/login', name: 'login', component: Login, meta: { auth: null, title: 'Login' } },
    // { path: '/403', name: '403', component: Error403, meta: { auth: null, title: '403' } },

    // base_layout
    { path: '/', name: 'base_layout', component: BaseLayout, children: baseLayoutRoutes },

    { path: '*', name: '404', component: Error404, meta: { auth: null, title: '404' } },
]

const router = new VueRouter({
    history: true,
    mode: 'history',
    routes,
})

// if url doesnot match any register routes
router.beforeEach((to, from, next) => {
    setPageTitle(to.meta.title)
    next()
    // if (!to.matched.length) {
    //     next('/404');
    // }else {
    //     next()
    // }
});

export default router