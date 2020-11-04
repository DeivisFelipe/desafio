/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

import Vuetify from '../plugins/vuetify'
import VueRouter from 'vue-router';

Vue.use(VueRouter)

Vue.component('menu-nav', require('./components/Menu.vue').default);

const routes = [
    { path: '/', component: require('./components/Dash.vue').default},
    { path: '/profile', component: require('./components/Perfil.vue').default},
    { path: '/dash', component: require('./components/Dash.vue').default}
];

const router = new VueRouter({
    routes: routes,
    mode:'history'
})

const app = new Vue({
    vuetify:Vuetify,
    router,
    el: '#app',
});
