import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import { store } from "./store/store";
export const EventBus = new Vue();

/* Styles (bulma) */
require('./assets/main.scss')

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
Vue.component('vue-fontawesome', FontAwesomeIcon);

import Buefy from 'buefy';
import 'buefy/dist/buefy.css';
Vue.use(Buefy, {
    defaultIconComponent: 'vue-fontawesome',
    defaultIconPack: 'fas',
});

import splitPane from 'vue-splitpane';
Vue.component('split-pane', splitPane);

import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
Vue.component("v-select", vSelect);

import VueSimplemde from 'vue-simplemde';
import 'simplemde/dist/simplemde.min.css';
import 'simplemde-theme-base/dist/simplemde-theme-base.min.css';
Vue.component('vue-simplemde', VueSimplemde);


Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
