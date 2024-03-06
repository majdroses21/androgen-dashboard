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
                {
                    path: '/users/admins',
                    name: 'admins',
                    component: () => import('../views/Admins.vue'),
                },
                {
                    path: '/users/operations',
                    name: 'operations',
                    component: () => import('../views/Operations.vue'),
                },
                {
                    path: '/users/sales',
                    name: 'sales',
                    component: () => import('../views/Sales.vue'),
                },
                {
                    path: '/users/teachers',
                    name: 'teachers',
                    component: () => import('../views/Teachers.vue'),
                },
                {
                    path: '/agents',
                    name: 'agents',
                    component: () => import('../views/Agents.vue'),
                },
                {
                    path: '/students',
                    name: 'students',
                    component: () => import('../views/Students.vue'),
                },
                {
                    path: '/tasks',
                    name: 'tasks',
                    component: () => import('../views/Tasks.vue'),
                },
                {
                    path: '/courses',
                    name: 'courses',
                    component: () => import('../views/Courses.vue'),
                },
                {
                    path: '/reports',
                    name: 'reports',
                    component: () => import('../views/Reports.vue'),
                },
                {
                    path: 'branches',
                    name: 'branches',
                    component: () => import('../views/Branches.vue'),
                },
            ]
        },
    ],
})
export {router}
