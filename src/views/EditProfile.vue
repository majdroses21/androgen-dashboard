<template>
    <div class="main-box">
        <input type="text" style="display:block;width:0;height:0;position:fixed;left:-100px;">
        <input type="password" style="display:block;width:0;height:0;position:fixed;left:-100px;">
        <div class="title">Edit profile</div>
        <div class="profile-box">
            <!-- <div v-for="(item, index) in v$.image.$errors" :key="index" class="error-msg mx-1 gap-1">
                <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                </div>
                <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
            </div> -->
            <div class="user-box">
                <div class="user-box-content">
                    <div>
                        <div class="d-flex align-items-center gap-3">
                            <div>
                                <!-- Image input shown by default -->
                                <div @click="openFilePicker()"> 
                                    <div v-if="(user?.image==null&&shown_image=='')" class="user-img">
                                        <div class="over-lay-user">
                                            <AddPhoto class="add-photo"></AddPhoto>
                                        </div>
                                        <UserImg class="user-icon"></UserImg>
                                    </div>
                                    <img v-if="(user?.image!=null||shown_image!='')" class="user-selected-img"  :src="shown_image==''?storage_url+'/'+user?.image:shown_image"> 
                                </div>
                                <!-- Hidden file input -->
                                <input style="display:none" type="file" ref="userImg" accept="image/*" @change="handleFileChange($event)">
                            </div> 
                            <div class="user-info">
                                <div class="user-name">{{ user?.full_name }}</div>
                                <div class="admin">{{ user?.role }} {{ user?.branch_id!=null?user?.branch_id?.name:'' }}</div>
                                <div class="teacher" v-if="user?.role=='teacher'">
                                    <CertificateIcon/>
                                    <div>{{ user?.user_info?.certificate }}</div>
                                </div>
                            </div>
                        </div>
                        <div v-for="(item, index) in v$.image.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                    </div>
                    </div>
               
                </div>
                <div style="display:flex;align-items:center;gap:5px">
                    <div class="lds-dual-ring" v-if="loading_loader"></div>
                    <button type="button" class="button-style large-stat" @click.prevent="saveChanges()">save changes</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="mb-3">
                        <label class="label-style" for="full-name">Full Name</label>
                        <input v-model="fullName" class="input-style" type="text" id="full-name" name="name">
                        <div v-for="(item, index) in v$.fullName.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="label-style" for="user-name">User Name</label>
                        <input v-model="userName" class="input-style" type="text" id="user-name" name="name">
                        <div v-for="(item, index) in v$.userName.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="label-style" for="new-pass">Email</label>
                        <input v-model="email" class="input-style" type="email" id="new-email" name="new-email">
                        <div v-for="(item, index) in v$.email.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                        </div>
                    </div> 
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                    <div class="mb-3">
                        <label class="label-style" for="new-pass">Current password</label>
                        <input v-model="currentPass" class="input-style" type="password" id="new-pass" name="new-pass">
                        <div v-for="(item, index) in v$.currentPass.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="label-style" for="new-pass">New password</label>
                        <input v-model="newPass" class="input-style" type="password" id="new-pass" name="new-pass">
                        <div v-for="(item, index) in v$.newPass.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="label-style" for="confirm-pass">Confirm new password </label>
                        <input v-model="confirmPass" class="input-style" type="password" id="confirm-pass" name="confirm-pass">
                        <div v-for="(item, index) in v$.confirmPass.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                        </div>
                    </div> 
                </div>
                <div style="display:flex;flex-direction:column;align-items:center">
                    <button type="button" class="button-style small-stat" @click.prevent="saveChanges()">save changes</button>
                  </div>
            </div>
        </div>
    </div>
</template>
<script>
import CertificateIcon from '../components/icons/CertificateIcon.vue';
import UserImg from '../components/icons/UserImg.vue';
import AddPhoto from '../components/icons/AddPhoto.vue';
import useVuelidate from '@vuelidate/core';
import { required,helpers, sameAs, minLength } from '@vuelidate/validators';
import { mapState } from 'pinia';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import { api_url , storage_url} from '../constants';
import { authHeader } from '../helpers';
export default {
    setup() {
          return { v$: useVuelidate()}
        },
    data() {
        return {
            fullName:'',
            userName:'',
            storage_url:storage_url,
            shown_image:'',
            currentPass:'',
            image:'',
            loading_loader:false,
            image:'',
            user:{},
            newPass:'',
            email:'',
            confirmPass:'',
            selectedImage: null,  
            vuelidateExternalResults: {
                userName:[],
                newPass:[],
                currentPass:[],
                confirmPass:[],
                fullName:[],
                email:[],
                image:[],
            },
        }
    },
    computed:{
       
    },
    components:{UserImg ,CertificateIcon ,AddPhoto},
    mounted(){
        this.loadFromServer();
    },
    validations() {
        var optional = (value) => true;
        var full_name = (value) => {
            const regex = /^\S+ \S+$/;
            return regex.test(value)
        };
        var string_full_name =(value) => {
            const regex = /^[a-zA-Z\s]+$/;
            return regex.test(value)
        };
        var none_space =(value)=> {
            const regex = /^\S+$/;
            return regex.test(value)
        }
        var lower_case =(value) => {
            const regex =/^[a-z0-9._]+$/;
            return regex.test(value)
        }
        var current_Pass =(value) => {
           return false
            // if (gg !==''){
            //     return test(value)
            // }
        }
        var if_current = (value) => { return !(this.currentPass == '' && this.newPass != '') || value }
         return {
            fullName : {
                required: helpers.withMessage('The full name field is required', required),
                full_name: helpers.withMessage('Please enter your full name as two words separated by a space.',full_name),
                string_full_name: helpers.withMessage('Please enter only alphabetic characters.',string_full_name),
            },
            confirmPass:{
                sameAsPassword: helpers.withMessage('The new password confirmation does not match', sameAs(this.newPass))
            },
            newPass:{
                minLength: helpers.withMessage('The new password must be at least 8 characters and must contains letters, numbers and symbols' ,minLength(8))
            },
            image:{
                optional
            },
            currentPass:{
                if_current:helpers.withMessage('The current password field is required when new password is present',if_current),
            },
            userName :{
                required: helpers.withMessage('The username field is required', required),
                lower_case: helpers.withMessage('The username can only contains small english letters or dots or dashes.' ,lower_case),
                none_space: helpers.withMessage('Username cannot contain spaces' ,none_space)
            },
            email:{optional},
        }
    },
    methods :{
        loadFromServer(){
            axios.get(`${api_url}/user`
                ,{headers: {...authHeader()}
            }).then((response) => {
                this.user = response.data.data;
                this.fullName=response.data.data.full_name,
                this.userName=response.data.data.user_name,
                this.email=response.data.data.email,
                this.image=response.data.data.image,
                this.newPass='';
                this.confirmPass='';
            },error=>{
                
            });
        },
        saveChanges(){
            this.vuelidateExternalResults.fullName = [];
            this.vuelidateExternalResults.confirmPass = [];
            this.vuelidateExternalResults.newPass = [];
            this.vuelidateExternalResults.email = [];
            this.vuelidateExternalResults.currentPass=[],
            this.vuelidateExternalResults.userName = [];
            this.vuelidateExternalResults.image = [];

            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }
            this.loading_loader=true
            var data = {
                user_name: this.userName,
                password: this.password,
                current_password:this.currentPass,
                email:this.email,
                full_name:this.fullName,
                password:this.newPass,
                password_confirmation:this.confirmPass,
                image:this.image,
                _method:'PUT'
            }
            var formData = new FormData();
            Object.keys(data).forEach((key) => {
                if((!['image','current_password','password','email','password_confirmation'].includes(key)) || (data[key] != null && data[key] !== "")){
                    formData.append(key, data[key]);
                }
            });
            axios.post(`${api_url}/user`,formData,{headers: {...authHeader()},'Content-Type': 'multipart/form-data'}).then((response) => {
                this.loading_loader=false;
                Toast.fire({
                    icon: 'success',
                    title: 'Saved'
                });
            },error =>{
                this.loading_loader=false
                if(error.response.status==422)
                {
                    var errors = error.response.data.errors;
                    this.vuelidateExternalResults.userName = errors.user_name??[];
                    this.vuelidateExternalResults.fullName = errors.full_name??[];
                    this.vuelidateExternalResults.confirmPass = errors.password_confirmation??[];
                    this.vuelidateExternalResults.newPass = errors.password??[];
                    this.vuelidateExternalResults.currentPass = errors.current_password??[];
                    this.vuelidateExternalResults.image = errors.image??[];
                    this.vuelidateExternalResults.email = errors.email??[];
                }
            });
        },
        openFilePicker() {
            this.$refs.userImg.click()
        },
        handleFileChange(event) {
            this.image=event.target.files[0];
            this.shown_image=URL.createObjectURL(event.target.files[0])
        },
    } 
}

</script>

<style scoped>
.user-selected-img {
    width: 100px;
    height: 100px;
    cursor: pointer;
    border-radius: 50px;
    object-fit: cover;
}
.user-name {
    color: #40444D;
    font-weight: 500;
    overflow-x: hidden;
    text-overflow: ellipsis;
    font-size: 24px;
}
.admin {
    color: var(--main-color);
    font-size: 14px;
    font-weight: 400;
}
.user-img{
    width: 100px;
    height: 100px;
    cursor: pointer;
    position: relative;
    z-index: 1;
}
.over-lay-user {
    position: absolute;
    width: 97.5px;
    height: 98.7px;
    background-color: rgba(66, 106, 179, 0.4);
    z-index: 2;
    left: 1px;
    border-radius: 50px;
    top: 1px;
    backdrop-filter: blur(6px);
    transition: 0.3s;
    opacity: 0;
}
.user-img:hover .over-lay-user {
    transition:  0.3;
    opacity: 1;
}
.add-photo {
    position: relative;
    z-index: 3;
    position: relative;
    z-index: 3;
    top: 38%;
    left: 34%;
}
.user-icon {
    width: 100%;
    height: 100%;
}
.label-style {
    color: var(--main-color);
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 5px;
}
.input-style {
   padding: 10px 16px; 
   border-radius: 8px;
   border: 1px solid #EEEEEE;
   width: 100%;
}
.profile-box {
    background-color: white;
    margin: 16px auto;
    padding: 24px 20px;
    border-radius: 30px;
    width: 100%;
    max-width: 100%;
}
.user-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 32px;
}
.user-box-content {
    display: flex;
    align-items: center;
    gap: 16px;
}
.small-stat {
    display: none;
}
.teacher {
    color: var(--primary-color);
    display: flex;
    align-items: center;
    gap: 8px;
}
@media (max-width:992px) {
    .user-name {
        font-size: 20px;
    }
}
@media(max-width:576px) {
    .user-box-content {
        flex-direction: column;
    }
    .user-box {
        justify-content: center;
    }
    .user-info {
        text-align: center;
    }
    .large-stat {
        display: none;
    }
    .small-stat {
        display: block;
        width: 96%;
        margin: auto;
        padding: 12px 12px;
        height: unset;
    }
}

</style>