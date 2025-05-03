import {createRouter,createWebHistory} from 'vue-router'
import { useAuthStore } from '../stores/auth';

const router = createRouter({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path:'/login',
            name:'login',
            component:() => import('../views/Login.vue'),
            meta: { requiresGuest: true },
        },
        {
            path: '/',
            name: 'dashboard',
            component: () => import('../layouts/DashboardLayout.vue'),
            meta: { requiresAuth: true },
            children: [
                {
                  path: '/',
                  name: 'dashboard',
                  component: () => import('../views/Dashboard.vue'),
                  meta: { requiresAuth: true, allowedRoles: ['super_admin', 'teacher', 'sale','operation','admin'] },
                },
                {
                    path: '/courses',
                    name: 'courses',
                    component: () => import('../views/Courses.vue'),
                    // meta: { requiresAuth: true, allowedRoles: ['super_admin','admin','operation','sale','teacher'] },
                },
                {
                    path: '/courses/:id',
                    name: 'course-details',
                    component: () => import('../views/CourseDetails.vue'),
                    // meta: { requiresAuth: true, allowedRoles: ['super_admin','admin','operation','sale','teacher'] },
                },
                {
                    path: '/videos/:courseId/:sectionId',
                    name: 'LessonVideos',
                    component: () => import('../views/LessonVideos.vue'),
                    // meta: { requiresAuth: true, allowedRoles: ['super_admin','admin','operation','sale','teacher'] },
                },
               
                {
                    path: '/edit',
                    name: 'edit',
                    component: () => import('../views/EditProfile.vue'),
                    // meta: { requiresAuth: true},
                }
            ]
        },
        {path: '/:pathMatch(.*)*', name: 'NotFound', component:() => import('../components/NotFound.vue'), },
    ],
})

router.beforeEach((to, from, next) => {
	const authRequired = (to?.meta?.requiresAuth == true);
	const loggedIn = localStorage.getItem('token') != null;
    const guestRequired = (to?.meta?.requiresGuest == true);
	const userRole = useAuthStore()?.user?.role;
	const roleAllowed = to?.meta?.allowedRoles == undefined || to?.meta?.allowedRoles.includes(userRole);
    if (authRequired && !loggedIn){
        console.log('1')
        next({name: 'login'});
    }
    else if (guestRequired && loggedIn){
        console.log('2')
        next({name: 'dashboard'});
    }
    else if(roleAllowed){
        console.log('3')
        next();
    }
    else{
        console.log('4')

        next({name: 'dashboard'});
    }
});
export {router}
