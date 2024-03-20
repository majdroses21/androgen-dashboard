import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {router} from './router'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import vSelect from 'vue-select'

const app = createApp(App)
app.use(router)

app.mount('#app')
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('v-select', vSelect)