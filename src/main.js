import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './router'
import { createPinia } from 'pinia'
import axios from 'axios';
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import vSelect from 'vue-select'
import { useAuthStore } from './stores/auth'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { Toast } from './toast';
import {i18n} from './lang';
window.Toast = Toast;

const app = createApp(App)
app.use(createPinia())
app.use(VueSweetalert2);
app.use(router)
app.use(i18n)

app.mount('#app')
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('v-select', vSelect)

axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (401 === error.response.status) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        const auth_store = useAuthStore();
        auth_store.remove_user();
        router.replace({name: 'login'});
        return Promise.reject(error);
    } 
    if(400 === error.response.status){
        Toast.fire({
            icon: 'error',
            title: error.response.data.message
        });
        return Promise.reject(error);
    }else if(500 === error.response.status){
        Toast.fire({
            icon: 'error',
            title: "Server Error"
        });
        return Promise.reject(error);
    }else {
        return Promise.reject(error);
    }
});
