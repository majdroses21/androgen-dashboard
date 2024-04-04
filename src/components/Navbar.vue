<template>
  <div class="nav-bar">
    <nav class="navbar navbar-expand-lg navbar-light p-0">
        <div class="container-fluid p-0">
            <div class="nav_box">
                <button @click="$emit('sidebar-toggle',false)"
                 class="navbar-toggler sidebar_toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <MenuToggler></MenuToggler>
                </button>
                <div class="d-flex gap-2 box-info-nav">
                    <SelectedLang/>
                    <div class="dropdown dropdown_style">
                        <UserImg v-if="user?.image==null"></UserImg>
                        <div v-if="user?.image!=null" class="img_user">
                            <img :src="storage_url+'/'+user?.image">
                        </div>
                    <button class="btn dropdown-toggle dropdown-toggle-style" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                        <div class="user-info">
                            <div class="user-name">{{ user?.full_name }}</div>
                            <div class="admin">{{ $t(user?.role??'') }}  <span v-if="user?.role!='super_admin'">({{ (user?.branch!=null)?user?.branch?.translations?.name[lang]:'' }})</span></div>
                        </div>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenuButton1">
                        <li class="first-li dropdown-item">
                            <router-link to="/edit" class="li-style">
                                <UserEditIcon class="user-icon"/>
                                <span>{{$t('Edit profile')}}</span>
                            </router-link>
                        </li>
                        <li @click="logout()" class="sec-li dropdown-item">
                            <router-link to="#" class="li-style">
                                <logoutIcon class="user-icon"></logoutIcon>
                                <span class="logout">{{$t('Logout')}}</span>
                            </router-link>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
  </div>
</template>
<script>
import UserImg from './icons/UserImg.vue';
import UserEditIcon from './icons/UserEditIcon.vue';
import LogoutIcon from './icons/LogoutIcon.vue';
import MenuToggler from './icons/MenuToggler.vue';
import Sidebar from './Sidebar.vue';
import axios from 'axios';
import { api_url ,storage_url} from '../constants';
import { useAuthStore } from '../stores/auth'
import { mapState } from 'pinia';
import { authHeader } from '../helpers';
import SelectedLang from './SelectedLang.vue';
import Earth from './icons/Earth.vue';
import { useLangStore } from '../stores/language';
export default {
    data() {
        return {
            showSidebar: false,
            sidebar_collapsed:true,
            storage_url:storage_url
        }
    },
    computed:{
         ...mapState(useLangStore, {
            lang: 'language'
         }),
         ...mapState(useAuthStore, {
            user: 'user'
         }),
      },
    mounted(){
    },
    emits: ["sidebar-toggle"],
    components : { UserImg , UserEditIcon,LogoutIcon ,MenuToggler, Sidebar, SelectedLang },
    methods:{
        logout(){
            const store = useAuthStore();
            axios.post(`${api_url}/logout`, {}, {headers: {...authHeader()}});
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            store.logout();
            this.$router.push({name:'login'});
        },
    }
}
</script>

<style scoped>
.side-bar-small{
    display: none;
    width: 100%;

}
.nav-bar {
    background-color: white;
    width: 100%;
    min-height: 60px;
    height: 60px;
    box-shadow: 0px -1px 5px 0px rgba(115, 100, 255, 0.25);
    z-index: 1;
    position: relative;
    padding:10.5px 40px 10.5px 40px;
}

.img_user {
   width: 40px;
   height: 40px;
   border-radius: 20px;
 }
 .img_user img {
   max-width: 100%;
   width: 100%;
   height: 100%;
   max-height: 100%;
   object-fit: cover;
   border-radius: 20px;
 }
.user-name {
    color: #40444D;
    font-weight: 500;
    font-size: 16px;
    width: 122.30px;
    overflow-x: hidden;
    text-overflow: ellipsis;
}
.user-info {
    text-align: start;
}
.admin {
    color: var(--main-color);
    font-size: 12px;
    font-weight: 400;
}
.dropdown-toggle-style {
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
    padding: 0px;
}
.dropdown_style {
    display: flex;
    gap: 12px;
}
.dropdown-menu-style {
    border-radius: 20px;
    box-shadow: 0px 0px 16px 0px #415C9933;
    padding: 16px 12px;
    width: 213px;
    border:none;
}
.dropdown-menu.show {
    top:55px !important;
}
[data-direction = rtl] .dropdown-menu.show {
    left: unset;
}
.dropdown-menu-style li {
    font-size: 12px;
}
.li-style {
    font-weight: 400;
    color: var(--main-color); 
    gap: 8px;
    display: flex;
    text-decoration: none;
}
.logout {
    color: #EB5757;
}
.first-li {
    padding-bottom: 12px;
    border-bottom: 1px solid #D8D8D8;
    padding-inline: 0px;
}
.sec-li {
    padding-top: 12px;
    padding-inline: 0px;

}
.sec-li span {
    color: #EB5757;
}
.dropdown-item:hover{
    background-color: white;
}
.dropdown-item:hover span {
    color: var(--secondary-color);
}
.dropdown-item:hover :deep() .user-icon path{
    stroke: var(--secondary-color);
}
.navbar-toggler {
    display: none;
}
.navbar-toggler:focus {
    box-shadow: none;
}
.nav_box {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}
.accordion-body {
    padding: 0px;
}
.sidebar {
    width: 300px;
    height: 100%;
    position: fixed;
    top: 0;
    left: -600px;
    transition: left 0.4s ease;
    display: none;
}
.show {
    left: 0;
}
.hide-sidebar {
    margin-left: 0;
}
.sidebar_toggler{
    padding: 0 10px;
}
@media(max-width:768px) {
    .navbar-toggler {
        display: block;
        border: none;
    }
    .dropdown-menu.show {
        left: -20px;
    }
    [data-direction = rtl] .dropdown-menu.show  {
        right: -20px;
    }
    .nav_box {
        justify-content: space-between;
    }

    .sidebar {
        display: block;
    }
    .dropdown_style {
        gap: 7px;
    }
}
@media(max-width:576px) {
    .nav-bar {
        padding:10.5px 20px 10.5px 20px;  
    }
    .user-name {
        font-size: 14px;
    }
    .admin {
        font-size: 10px;
    }
    
}
@media(max-width:425px) {
.dropdown-menu.show{
    left: -54px;
    width:123px;
    min-width:123px;
}
[data-direction = rtl] .dropdown-menu.show  {
    left: unset;
    right: -86px;
    width: 160px;
    min-width: 160px;
}
.user-info {
    display: none;
}
}
@media(max-width:320px) {
    .dropdown-menu-style {
        width: 185px;
    }
}
</style>