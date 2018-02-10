import serviceWorkerRegistration from './service-worker-registration';
import './assets/scss/main';
import Vue from 'vue';
import App from './App';

serviceWorkerRegistration();

new Vue({
    el: '#app',
    components: {
        App
    },
    render: h => h(App)
});
