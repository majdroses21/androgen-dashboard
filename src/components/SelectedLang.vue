<template>
        <button class="btn dropdown-toggle dropdown-toggle-style" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
            <div class="user-info px-1">
                <div class="user-name">
                    <Earth class="mx-1"/>
                  <span class="lang">
                      {{ selected_language=='en' ? 'English':'عربي' }}
                  </span>  
                </div>
            </div>
        </button>
        <div class="dropdown dropdown_style">
            <ul class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenuButton1">
                <li class="li-content dropdown-item" @click="selected_language='en'">
                    <router-link to="" class="li-style align-items-center">
                        <span :class="{'second_color': selected_language=='en'}">English</span>
                        <CheckIcon class="check-icon" v-if="selected_language=='en'"/>
                    </router-link>
                </li>
                <li class="li-content dropdown-item pt-3" style="border: none;" @click="selected_language='ar'">
                    <router-link to="" class="li-style align-items-center">
                        <span :class="{'second_color': selected_language=='ar' }">عربي</span>
                        <CheckIcon class="check-icon" v-if="selected_language=='ar'"/>
                    </router-link>
                </li>
            </ul>
        </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import { useLangStore } from '../stores/language';
import { i18n } from '../lang';
import Earth from '../components/icons/Earth.vue'
import CheckIcon from './icons/CheckIcon.vue';
export default {
    name:'SelectedLang',
    data(){
        return{
            selected_language: useLangStore().language,
        }
    },
    methods:{
        ...mapActions(useLangStore, ['setLanguage']),
    },
    computed:{
        ...mapState(useLangStore, {
            language: 'language'
        }),
    },
    watch:{
        selected_language(new_lang, old_lang){
            document.documentElement.setAttribute('lang', new_lang);
            document.documentElement.dataset.direction = ['ar'].includes(new_lang)?'rtl':'ltr';
            i18n.setLocale(this.selected_language);
            useLangStore().language = this.selected_language;
            this.setLanguage(this.selected_language);
        }
    },
    components: {Earth, CheckIcon}
}
</script>

<style scoped>
.check-icon :deep() path {
    fill:#f89220;
}
.dropdown-menu-style {
    border-radius: 20px;
    box-shadow: 0px 0px 16px 0px #415C9933;
    padding: 16px 12px;
    width: 117px;
    min-width:117px;
    height: 103.6px;
    border:0;
}
.dropdown-toggle-style {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    border:none;
}
.dropdown-toggle-style:active {
    border:none !important;
}
.dropdown-menu.show {
    top:55px !important;
    right: 13px !important;
    left: unset;
}
.dropdown-menu-style li {
    font-size: 12px;
}
.li-style {
    font-weight: 400;
    color: var(--main-color); 
    display: flex;
    text-decoration: none;
    justify-content: space-between;
}
.li-content {
    padding-bottom: 12px;
    border-bottom: 1px solid #D8D8D8;
    padding-inline: 0px;
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
.second_color{
    color:var(--secondary-color)
}
@media(max-width:320px) {
    .lang {
        display: none;
    }
}
</style>