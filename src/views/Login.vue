<template>
    <div class="container-fluid login-container">
        <!-- خلفية الغيوم المتحركة -->
        <div class="cloud-background">
            <!-- الطبقة الأولى من الغيوم -->
            <div class="cloud"></div>
            <div class="cloud"></div>
            <div class="cloud"></div>
            <div class="cloud"></div>
            <div class="cloud"></div>
            <div class="cloud"></div>
            <div class="cloud"></div>
            <div class="cloud"></div>
            
            <!-- الطبقة الثانية من الغيوم (للعمق) -->
            <div class="cloud-layer-2"></div>
            <div class="cloud-layer-2"></div>
            <div class="cloud-layer-2"></div>
            
            <!-- تأثير الضوء -->
            <div class="light-overlay"></div>
        </div>

        <div class="login-form">     
            <Logo class="logo-img"></Logo>
            <!-- <LogoAr v-if="language=='ar'" class="logo-img"></LogoAr> -->
            <div class="login-title">{{$t('Login to our dashboard')}}</div>
            <form class="form-style">
                <label class="label-style" for="user-name">
                    <input class="input-style" type="text" id="user-name" name="user-name" :placeholder="$t('email')" v-model="email" @keyup.enter="tryToLogIn()">
                    <i class="fa-solid fa-envelope input-icon"></i>
                    <div v-for="(item, index) in v$.email.$errors" :key="index" class="error-msg">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </label>
                <label class="label-style" for="device-id">
                    <input class="input-style" type="text" id="device-id" name="device-id" :placeholder="$t('device_id')" v-model="device_id" @keyup.enter="tryToLogIn()">
                    <i class="fa-solid fa-mobile-screen input-icon"></i>
                    <div v-for="(item, index) in v$.device_id.$errors" :key="index" class="error-msg">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </label>
                <label class="label-style" for="password">
                    <input class="input-style" type="password" id="password" name="password" :placeholder="$t('Password')" v-model="password" @keyup.enter="tryToLogIn()" autocomplete="password">
                    <i class="fa-solid fa-lock input-icon"></i>
                    <div v-for="(item, index) in v$.password.$errors" :key="index" class="error-msg">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </label>
                <div style="display:flex;flex-direction:column;align-items:center;margin-top: 20px;">
                    <button v-if="loading_loader" style="padding:0 !important" class="button-login" type="button">
                        <div class="lds-dual-ring"></div>
                    </button>
                    <button v-if="!loading_loader" class="button-login" type="button" @click.prevent="tryToLogIn()">
                        {{$t('Login')}}
                    </button>
                </div>
            </form>
        </div>  
    </div>
</template>
<script>
    import Logo from '../components/icons/Logo.vue'
    import LogoAr from '../components/icons/LogoAr.vue'
    import useVuelidate from '@vuelidate/core'
    import { required,helpers, email } from '@vuelidate/validators'
    import {authHeader} from '../helpers'
    import axios from 'axios';
    import { api_url } from '../constants';
    import { useAuthStore } from '../stores/auth';
    import { useLangStore } from '../stores/language';
    import { mapState } from 'pinia';
    import { _t } from '../helpers';

    export default {
        setup() {
            return { v$: useVuelidate()}
        },
        data() {
            return {
                email :'',
                device_id :'',
                password:'',
                loading_loader:false,
                vuelidateExternalResults: {
                    email:[],
                    device_id:[],
                    password:[],
                },
            }
        },
        components :{ Logo, LogoAr },
        validations() {
            return {
                email: {
                    required: helpers.withMessage('_.required.user-name', required),
                    email: helpers.withMessage('_.mustEmail', email)
                },
                device_id: {required: helpers.withMessage('_.required.device_id', required)},
                password :{required: helpers.withMessage('_.required.password', required)},
            }
        },
        methods :{
            _t(message){return _t(message, this.$t);},
            tryToLogIn(){
                this.vuelidateExternalResults.email = [];
                this.vuelidateExternalResults.password = [];
                this.v$.$touch();
                if (this.v$.$invalid) {
                    return;
                }
                this.loading_loader=true
                const store = useAuthStore();
                axios.post(`${api_url}/login`, {
                    email: this.email,
                    device_id: this.device_id,
                    password: this.password
		        }).then((response) => {
                    console.log(response);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('token', response.data.access_token);
                    store.loginSave(response.data.user);
                    this.loading_loader=false
                    this.$router.replace('/');
                },error =>{
                    this.loading_loader=false
                    if(error.response.status==401)
                    {
                        const errors = error.response.data.error;
                        console.log(errors);
                        Toast.fire({
                            icon: 'error',
                            title: errors
                        });
                        this.vuelidateExternalResults.email = errors.email??[];
                        this.vuelidateExternalResults.password = errors.password??[];
                    }
                });
            },
        },
        computed:{
        ...mapState(useLangStore, {
            language: 'language'
        }),
    },
    }
</script>
<style scoped>
/* خلفية الغيوم المتحركة */
.cloud-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 0;
}

.cloud {
    position: absolute;
    background: radial-gradient(circle, 
        rgba(255, 255, 255, 0.1) 0%, 
        rgba(255, 255, 255, 0.05) 40%, 
        transparent 70%);
    border-radius: 50%;
    filter: blur(2px);
    animation: float 20s infinite linear;
}

.cloud:nth-child(1) {
    width: 300px;
    height: 150px;
    top: 10%;
    left: -300px;
    animation-duration: 25s;
    animation-delay: 0s;
}

.cloud:nth-child(2) {
    width: 200px;
    height: 100px;
    top: 20%;
    left: -200px;
    animation-duration: 30s;
    animation-delay: -5s;
}

.cloud:nth-child(3) {
    width: 250px;
    height: 125px;
    top: 35%;
    left: -250px;
    animation-duration: 35s;
    animation-delay: -10s;
}

.cloud:nth-child(4) {
    width: 180px;
    height: 90px;
    top: 50%;
    left: -180px;
    animation-duration: 28s;
    animation-delay: -15s;
}

.cloud:nth-child(5) {
    width: 320px;
    height: 160px;
    top: 65%;
    left: -320px;
    animation-duration: 32s;
    animation-delay: -20s;
}

.cloud:nth-child(6) {
    width: 150px;
    height: 75px;
    top: 80%;
    left: -150px;
    animation-duration: 26s;
    animation-delay: -8s;
}

.cloud:nth-child(7) {
    width: 280px;
    height: 140px;
    top: 5%;
    left: -280px;
    animation-duration: 38s;
    animation-delay: -12s;
}

.cloud:nth-child(8) {
    width: 220px;
    height: 110px;
    top: 70%;
    left: -220px;
    animation-duration: 42s;
    animation-delay: -18s;
}

@keyframes float {
    0% {
        transform: translateX(0) scale(1);
        opacity: 0;
    }
    10% {
        opacity: 0.8;
    }
    90% {
        opacity: 0.8;
    }
    100% {
        transform: translateX(calc(100vw + 400px)) scale(1.1);
        opacity: 0;
    }
}

/* الغيوم الثانوية للعمق */
.cloud-layer-2 {
    position: absolute;
    background: radial-gradient(ellipse, 
        rgba(135, 206, 235, 0.08) 0%, 
        rgba(135, 206, 235, 0.03) 50%, 
        transparent 70%);
    border-radius: 50%;
    filter: blur(4px);
    animation: floatSlow 40s infinite linear;
}

.cloud-layer-2:nth-child(9) {
    width: 400px;
    height: 200px;
    top: 15%;
    left: -400px;
    animation-delay: -25s;
}

.cloud-layer-2:nth-child(10) {
    width: 350px;
    height: 175px;
    top: 45%;
    left: -350px;
    animation-delay: -35s;
}

.cloud-layer-2:nth-child(11) {
    width: 300px;
    height: 150px;
    top: 75%;
    left: -300px;
    animation-delay: -45s;
}

@keyframes floatSlow {
    0% {
        transform: translateX(0) scale(0.8);
        opacity: 0;
    }
    15% {
        opacity: 0.4;
    }
    85% {
        opacity: 0.4;
    }
    100% {
        transform: translateX(calc(100vw + 500px)) scale(1);
        opacity: 0;
    }
}

/* تأثير الضوء الخفيف */
.light-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 30% 20%, 
        rgba(255, 255, 255, 0.1) 0%, 
        transparent 50%);
    pointer-events: none;
}

/* بقية الأنماط الأصلية */
.login-container {
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(135deg, 
        #1e3c72 0%, 
        #2a5298 25%, 
        #1e3c72 50%, 
        #0f2027 75%, 
        #203a43 100%);
    overflow: hidden;
}

.login-form {
    background-color: white;
    width: 470px;
    border-radius: 20px;
    padding: 32px 0px;
    max-width: 90%;
    z-index: 1;
    position: relative;
    box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.login-form img {
    width: 50%;
    margin: auto;
    display: block;
}

.login-title {
    color: var(--main-color);
    font-size: 18px;
    font-weight: 400;
    text-align: center;
    margin:32px 0px;
    position: relative;
}

.label-style {
    display: block;
    margin: auto;
    position: relative;
    margin-bottom: 16px;
}

.lds-dual-ring:after {
   content: " ";
   display: block;
   width: 30px;
   height: 30px;
   margin: 8px;
   border-radius: 50%;
   border: 6px solid #fff;
   border-color: #fff transparent #fff transparent;
   animation: lds-dual-ring 1.2s linear infinite;
}

.label-style-2 {
    color: var(--main-color-2);
    font-size: 14px;
    font-weight: 500;
    position: relative;
    bottom: 1px;
    margin-inline: 5px;  
}

.form-style {
    width: 75%;
    max-width: 75%;
    margin: auto;
}

.checkbox-style {
    width: 15px;
    height: 15px;
    border-radius: 6px;
    margin-inline: 2px;
}

.checkbox-box {
    width: fit-content;
    position: relative;
    left: 25px;
}

.button-login {
    background-color: var(--primary-color);
    padding: 14px 26px;
    border: none;
    border-radius: 30px;
    color: white;
    width: 100%;
    font-size: 14px;
    font-weight: 500;
}

.checkbox-box {
    margin-bottom: 16px;
}

.button-login:hover {
    background-color: var(--hover-color);
}

.error-style {
    border-color: #EB5757;
}

.logo-img {
    display: block;
    margin: auto;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

[data-direction=rtl] .input-icon {
    right: 26px;
}

/* استجابة للشاشات الصغيرة */
@media (max-width: 768px) {
    .cloud {
        filter: blur(1.5px);
    }
    
    .cloud:nth-child(1) { width: 200px; height: 100px; }
    .cloud:nth-child(2) { width: 150px; height: 75px; }
    .cloud:nth-child(3) { width: 180px; height: 90px; }
    .cloud:nth-child(4) { width: 120px; height: 60px; }
    .cloud:nth-child(5) { width: 220px; height: 110px; }
    .cloud:nth-child(6) { width: 100px; height: 50px; }
    .cloud:nth-child(7) { width: 190px; height: 95px; }
    .cloud:nth-child(8) { width: 160px; height: 80px; }
    .cloud-layer-2:nth-child(9) { width: 250px; height: 125px; }
    .cloud-layer-2:nth-child(10) { width: 220px; height: 110px; }
    .cloud-layer-2:nth-child(11) { width: 200px; height: 100px; }
    
    .login-form {
        width: 95%;
        margin: 20px;
    }
}

@media (max-width: 480px) {
    .cloud {
        filter: blur(1px);
    }
    
    .cloud:nth-child(1) { width: 150px; height: 75px; }
    .cloud:nth-child(2) { width: 120px; height: 60px; }
    .cloud:nth-child(3) { width: 140px; height: 70px; }
    .cloud:nth-child(4) { width: 100px; height: 50px; }
    .cloud:nth-child(5) { width: 160px; height: 80px; }
    .cloud:nth-child(6) { width: 80px; height: 40px; }
    .cloud:nth-child(7) { width: 130px; height: 65px; }
    .cloud:nth-child(8) { width: 110px; height: 55px; }
    
    .form-style {
        width: 85%;
    }
    
    .login-title {
        font-size: 16px;
        margin: 24px 0px;
    }
}

/* للشاشات الكبيرة جداً */
@media (min-width: 1920px) {
    .cloud:nth-child(1) { width: 400px; height: 200px; }
    .cloud:nth-child(2) { width: 300px; height: 150px; }
    .cloud:nth-child(3) { width: 350px; height: 175px; }
    .cloud:nth-child(4) { width: 280px; height: 140px; }
    .cloud:nth-child(5) { width: 420px; height: 210px; }
    .cloud:nth-child(6) { width: 250px; height: 125px; }
    .cloud:nth-child(7) { width: 380px; height: 190px; }
    .cloud:nth-child(8) { width: 320px; height: 160px; }
    .cloud-layer-2:nth-child(9) { width: 500px; height: 250px; }
    .cloud-layer-2:nth-child(10) { width: 450px; height: 225px; }
    .cloud-layer-2:nth-child(11) { width: 400px; height: 200px; }
}
</style>