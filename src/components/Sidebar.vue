<template>
        <div>
            <div class="side-bar-box"> 
                <Logo class="sidebar-logo"></Logo>
                <div class="sidebar-content">
                    <div class="sidebar-content-2">
                        <div class="dash-pages-style d-none" @click="$emit('sidebar-status',true)">
                            <router-link to="/users/teachers" class="dash-pages">
                                <TeacherIcon class="pages-icon-fill" :class="{'user-option-checked-icon' : activeRouter=='teachers'}"></TeacherIcon>
                                <div class="d-flex align-items-center">
                                    <span class="color-span user-option" :class="{'user-option-checked' : activeRouter=='teachers'}">Teachers</span>
                                </div>
                            </router-link>
                        </div>
                        <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                            <router-link to="/" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='dashboard'}">
                                <DashboardIcon class="pages-icon"></DashboardIcon>
                                    <span class="color-span">{{$t('Dashboard')}}</span>
                            </router-link>        
                        </div>
                        <div class="accordion accordion-flush" id="user-accordion">
                            <div class="accordion-item">
                                <div class="dash-pages" :class="{'dash-pages-active' : activeRouter=='admins' ||activeRouter=='sales' || activeRouter=='teachers' ||activeRouter=='operations' }">
                                    <div class="user">
                                        <button @click="rotate=!rotate" class="accordion-button collapsed p-0 m-0"  type="button" data-bs-toggle="collapse" data-bs-target="#user-collapse" aria-expanded="false" aria-controls="user-collapse">
                                            <UserIcon style="width: 24px; height: 24px;" class="pages-icon"></UserIcon>
                                            <span class="user">
                                                <span>{{$t('Users')}}</span>
                                                <ArrowIcon :class="{'rotate-style' : rotate, 'rotate-style-2': !rotate}" class="arrow-icon"></ArrowIcon>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                <div id="user-collapse" class="accordion-collapse collapse ul-user-style" aria-labelledby="user" data-bs-parent="#user-accordion">
                                    <div class="accordion-body p-0">
                                        <router-link to="/users/admins" class="dash-pages px-0" @click="$emit('sidebar-status',true)"> 
                                            <AdminsManageIcon class="pages-icon" :class="{'user-option-checked-icon' : activeRouter=='admins'}"></AdminsManageIcon>
                                            <div class="d-flex align-items-center">
                                                <span class="color-span user-option" :class="{'user-option-checked' : activeRouter=='admins' }">{{$t('Admins')}}</span> 
                                                <CheckIcon class="check-icon1" v-if="activeRouter=='admins'"></CheckIcon>
                                            </div>
                                        </router-link>
                                        <router-link to="/users/operations" class="dash-pages px-0" @click="$emit('sidebar-status',true)"> 
                                            <OperationIcon class="pages-icon" :class="{'user-option-checked-icon' : activeRouter=='operations'}"></OperationIcon>
                                            <div class="d-flex align-items-center">
                                                <span class="color-span user-option" :class="{'user-option-checked' : activeRouter=='operations' }">Operations</span> 
                                                <CheckIcon class="check-icon1" v-if="activeRouter=='operations'"></CheckIcon>
                                            </div>
                                        </router-link>
                                        <router-link to="/users/sales" class="dash-pages px-0" @click="$emit('sidebar-status',true)">
                                            <SalesIcon class="pages-icon" :class="{'user-option-checked-icon' : activeRouter=='sales'}"></SalesIcon>
                                            <div class="d-flex align-items-center">
                                                <span class="color-span user-option" :class="{'user-option-checked' : activeRouter=='sales'}">Sales</span>
                                                <CheckIcon class="check-icon2" v-if="activeRouter=='sales'"></CheckIcon>
                                            </div>
                                            </router-link>
                                        <router-link to="/users/teachers" class="dash-pages px-0" @click="$emit('sidebar-status',true)">
                                            <TeacherIcon class="pages-icon-fill" :class="{'user-option-checked-icon' : activeRouter=='teachers'}"></TeacherIcon>
                                            <div class="d-flex align-items-center">
                                                <span class="color-span user-option" :class="{'user-option-checked' : activeRouter=='teachers'}">Teachers</span>
                                                <CheckIcon class="check-icon3" v-if="activeRouter=='teachers'"></CheckIcon>
                                            </div>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                            <router-link to="/agents" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='agents'}"> 
                            <AgentIcon class="pages-icon-fill"></AgentIcon>
                            <span class="color-span">Agents</span> </router-link>
                        </div>
                        <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                            <router-link to="/students" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='students'}">
                            <StudentIcon class="pages-icon"></StudentIcon>
                            <span class="color-span">Students</span> 
                        </router-link>
                        </div>
                        <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                            <router-link to="/tasks" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='tasks'}">
                            <TaskIcon class="pages-icon-fill"></TaskIcon>
                            <span class="color-span">Tasks</span> 
                        </router-link>
                        </div>
                        <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                            <router-link to="/courses" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='courses'}">
                            <CoursesIcon class="pages-icon"></CoursesIcon>
                            <span class="color-span">Courses</span> 
                        </router-link>
                        </div>
                        <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                            <router-link to="/reports" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='reports'}">
                            <ReportIcon class="pages-icon-fill"></ReportIcon>
                            <span class="color-span">Reports</span> 
                        </router-link>
                        </div>
                        <div class="dash-pages-style" @click="$emit('sidebar-status',true)">
                            <router-link to="/branches" class="dash-pages" :class="{'dash-pages-active' : activeRouter=='branches'}" > <BranchIcon class="pages-icon"></BranchIcon><span class="color-span">Branches</span> </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import Logo from './icons/Logo.vue'
import DashboardIcon from './icons/DashboardIcon.vue';
import AgentIcon from './icons/AgentIcon.vue';
import BranchIcon from './icons/BranchIcon.vue';
import CoursesIcon from './icons/CoursesIcon.vue';
import TaskIcon from './icons/TaskIcon.vue';
import ReportIcon from './icons/ReportIcon.vue';
import StudentIcon from './icons/StudentIcon.vue';
import UserIcon from './icons/UserIcon.vue';
import TeacherIcon from './icons/TeacherIcon.vue'
import SalesIcon from './icons/SalesIcon.vue';
import OperationIcon from './icons/OperationIcon.vue';
import CheckIcon from './icons/CheckIcon.vue';
import AdminsManageIcon from './icons/AdminsManageIcon.vue';
import ArrowIcon from './icons/ArrowIcon.vue'

 export default {
    data() {
        return {
            rotate:false
        }
    },

    components :{ 
        Logo,
        DashboardIcon,
        AgentIcon,
        BranchIcon,
        CoursesIcon,
        TaskIcon,
        ReportIcon,
        StudentIcon,
        UserIcon,
        TeacherIcon,
        OperationIcon,
        SalesIcon,
        CheckIcon,
        AdminsManageIcon,
        ArrowIcon
    },
    computed:{
        activeRouter(){
            return this.$route.name;
        },
    },
    emits: ["sidebar-status"],
}

</script>
<style scoped>
.sidebar-content-2 {
    margin-top: 30px;
}
.check-icon1 {
    margin-left: 25px;
}
.check-icon2 {
    margin-left: 70px;
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
    .check-icon2 {
        margin-left: 55px;
    }
    .check-icon3 {
        margin-left: 70px;
    }
}
</style>

