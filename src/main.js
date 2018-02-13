import { registerServiceWorker } from './sw-helpers';
import './assets/scss/main';
import Vue from 'vue';
import App from './App';

registerServiceWorker();

new Vue({
    el: '#app',
    components: {
        App
    },
    render: h => h(App)
});
