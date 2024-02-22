import {createRouter,createWebHistory} from 'vue-router'

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/login',
            name:'login',
            component:() => import('../views/Login.vue')
        },
        {
            path: '/',
            name: '',
            component: () => import('../layouts/DashboardLayout.vue'),
            children: [
                {
                  path: '/',
                  name: 'dashboard',
                  component: () => import('../views/Dashboard.vue'),
                },
            ]
        },
    ]
})
export {router}
