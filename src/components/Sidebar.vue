<template>
    <div>
        <div  class="side-bar-box"> 
            <!-- <Logo v-if="language=='en'"  class="sidebar-logo"></Logo> -->
            <!-- <LogoAr v-if="language=='ar'" class="sidebar-logo"></LogoAr> -->
            <img class="sidebar-logo" src="../assets/logo.png" alt="">
            <div class="sidebar-content">
                <div class="sidebar-content-2">
                    <div class="dash-pages-style d-none" @click="$emit('sidebar-status',true)">
                        <router-link to="/users/teachers" class="dash-pages">
                            <TeacherIcon class="pages-icon-fill" :class="{'user-option-checked-icon' : activeRouter=='teachers'}"></TeacherIcon>
                            <div class="d-flex align-items-center">
                                <span class="color-span user-option" :class="{'user-option-checked' : activeRouter=='teachers'}">{{$t('Teachers')}}</span>
                            </div>
                        </router-link>
                    </div>
                    <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                        <router-link to="/" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='dashboard'}">
                            <DashboardIcon class="pages-icon"></DashboardIcon>
                                <span class="color-span">{{$t('Dashboard')}}</span>
                        </router-link>        
                    </div>
                    
                 
                   
                   
                    <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                        <router-link to="/courses" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='courses'}">
                        <CoursesIcon class="pages-icon"></CoursesIcon>
                        <span class="color-span">{{$t('Courses')}}</span> 
                    </router-link>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Logo from './icons/Logo.vue'
import LogoAr from './icons/LogoAr.vue';
import DashboardIcon from './icons/DashboardIcon.vue';
import CoursesIcon from './icons/CoursesIcon.vue';
import TeacherIcon from './icons/TeacherIcon.vue'
import CheckIcon from './icons/CheckIcon.vue';
import AdminsManageIcon from './icons/AdminsManageIcon.vue';
import ArrowIcon from './icons/ArrowIcon.vue'
import { useAuthStore } from '../stores/auth';
import { mapState } from 'pinia';
import { useLangStore } from '../stores/language';

 export default {
    data() {
        return {
            rotate:false,
            routes:{},
            role_type:''
        }
    },
    created(){
        this.role_type = useAuthStore()?.user?.role;
        var routes = this.$router.options.routes[1].children;
        routes.forEach( r => {
            this.routes[r.name] = r.meta;
        });
    },
    components :{ 
        Logo,
        DashboardIcon,
        CoursesIcon,
        CheckIcon,
        AdminsManageIcon,
        ArrowIcon,
        LogoAr
    },
    computed:{
        activeRouter(){
            return this.$route.name;
        },
        ...mapState(useAuthStore, {
            user: 'user',
        }),
        ...mapState(useLangStore, {
            language: 'language'
        }),
    },
    emits: ["sidebar-status"],
    methods:{
       
    },
}

</script>
<style scoped>
[data-direction = rtl] .dash-pages{
    flex-direction: row-reverse;
}
[data-direction = rtl]  .check-style{
    flex-direction: row-reverse;
    gap:17px;
}
[data-direction = rtl]  .sidebar-logo{
    margin-left: auto;
    display: block;
  
}
[data-direction = rtl]  .user{
    flex-direction: row-reverse;
}
[data-direction = rtl]  .accordion-button{
    flex-direction: row-reverse;
    gap: 17px;
}
[data-direction = rtl] .ul-user-style {
    padding-right: 29px;
    padding-left: unset;
}
.sidebar-content-2 {
    margin-top: 30px;
}
.check-icon1 {
    margin-left: 25px;
}
.check-icon2 {
    margin-left: 51px;
}
.check-icon3 {
    margin-left: 90px;
}
.dropdown-toggle {
    color: var(--main-color);
    font-weight: 500;
}
.dropdown-toggle::after {
    color: #4D515A;
}
.side-bar-box {
    padding: 32px 16px 0px 16px;
    direction: ltr;
}
.dash-pages{
    display: flex;
    gap: 12px;
    margin-bottom: 10px;
    padding-left: 12px;
    text-decoration: none;
    color: var(--main-color);
    font-weight: 500;
    padding: 12px 12px;
    border-radius: 8px;
    align-items: center;
}
.dash-pages:hover .user {
    color: var(--primary-color);
}

.dash-pages:hover .color-span{
    color: var(--primary-color);
}
.dash-pages:hover :deep() .pages-icon path {
    stroke: var(--primary-color);
}
.dash-pages:hover :deep() .pages-icon-fill path {
    fill: var(--primary-color);
}
.dash-pages:hover :deep() .icon-list path {
    stroke: var(--primary-color);
}
.dash-pages:hover :deep() .icon-list-fill path {
    fill: var(--primary-color);
}
.dash-pages-active {
    background-color: var(--primary-color);
    color: white;
    transition: 0.5s;
}
.dash-pages-active :deep() .pages-icon path {
    stroke: white;
}
.dash-pages-active :deep() .pages-icon-fill path {
    fill: white;
}
.dash-pages-active:hover :deep() .pages-icon path {
    stroke: white;
}
.dash-pages-active:hover :deep() .pages-icon-fill path {
    fill: white;
}
.user {
    width: 100% !important;

}
.accordion-button {
    width: 100% !important;
    display: flex;
    /* gap: 16px; */
}
.accordion-button::after {
    display: none;
}
.accordion-button:not(.collapsed) {
    box-shadow: none;
}
.accordion-button:focus {
    box-shadow: none;
}
.user-option-checked {
    color: var(--primary-color);
    text-align: right;
}
.user-option-checked-icon :deep() path {
    stroke: var(--primary-color);
}
.dash-pages-active:hover .color-span{
    color: white;
}
.user {
    display: flex;
    justify-content: space-between;
}
.dash-pages-active :deep() .arrow-icon path{
    stroke: white;
    
}
.user span {
    margin-left: 7px;
    font-weight: 500;
}
.dash-pages-active .user{
    color: white;
}
.dash-pages-active:hover .user{
    color: white;
}
.dash-pages-active:hover :deep() .pages-icon path{
    stroke: white;
}
.accordion-button  {
    background-color: transparent;
}
.ul-user-style {
    background: #FAFAFA;
    padding: 12px 0px 12px 29px;
}
.accordion-flush>.accordion-item>.accordion-collapse {
    border-radius: 8px;
}
::-webkit-scrollbar {
  width: 6px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 3px grey;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 10px;
}
.rotate-style {
    transform: rotate(90deg);
    transition: 0.4s;
}
.rotate-style-2 {
    transform: rotate(0deg);
    transition: 0.4s;
}
[data-direction = rtl] .rotate-style-2 {
    transform: rotate(180deg);
}
@media(max-width:1024px) {
    .side-bar-box {
        padding-inline: 10px;
    }
}

@media (max-width:992px) {
    .dash-pages {
        margin-bottom: 6px;
    }
    .check-icon1 {
        margin-left: 10px;
    }
    .check-icon3 {
        margin-left: 70px;
    }
}
@media(max-width:375px) {
    .check-icon2 {
        margin-left: 25px;
    }
}
.sidebar-logo {
    width: 100%;
    height: 100px;
    margin: auto;
    display: block;
    max-width: 100%;
    object-fit: contain;
}
</style>

