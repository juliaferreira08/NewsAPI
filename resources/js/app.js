import './bootstrap';
import { createApp } from 'vue';
import '../css/colors.css';
import router from './router';
import App from './components/App.vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

library.add(faCircle)

createApp(App)
    .use(router)
    .component('font-awesome-icon', FontAwesomeIcon)
    .mount('#app');