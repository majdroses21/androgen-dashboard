<template>
    <div class="main-box">
        <div class="title">Edit profile</div>
        <div class="profile-box">
            <div class="user-box">
                <div class="user-box-content">
                    <div>
                        <!-- Image input shown by default -->
                        <div @click="openFilePicker()"> 
                            <div v-if="shown_image==''" class="user-img">
                                <div class="over-lay-user">
                                    <AddPhoto class="add-photo"></AddPhoto>
                                </div>
                                <UserImg class="user-icon"></UserImg>
                            </div>
                            <img class="user-selected-img" v-if="shown_image!=''" :src="shown_image"> 
                        </div>
                        <!-- Hidden file input -->
                        <input style="display:none" type="file" ref="userImg" accept="image/*" @change="handleFileChange($event)">
                    </div> 
                    <div class="user-info">
                        <div class="user-name">User Name</div>
                        <div class="admin">Admin (Branch name)</div>
                        <div class="teacher" v-if="false">
                            <CertificateIcon/>
                            <div>Fine arts</div>
                        </div>
                    </div>
                </div>
                <button type="button" class="button-style large-stat" @click.prevent="saveChanges()">save changes</button>
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
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
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
                        <label class="label-style" for="confirm-pass">New password confirmation</label>
                        <input v-model="confirmPass" class="input-style" type="password" id="confirm-pass" name="confirm-pass">
                        <div v-for="(item, index) in v$.confirmPass.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                        </div>
                    </div>    
                </div>
                <button type="button" class="button-style small-stat" @click.prevent="saveChanges()">save changes</button>
            </div>
        </div>
    </div>
</template>
<script>
import CertificateIcon from '../components/icons/CertificateIcon.vue';
import UserImg from '../components/icons/UserImg.vue';
import AddPhoto from '../components/icons/AddPhoto.vue';
import useVuelidate from '@vuelidate/core';
import { required,helpers, sameAs, minValue } from '@vuelidate/validators';
export default {
    setup() {
          return { v$: useVuelidate()}
        },
    data() {
        return {
            fullName:'',
            userName:'',
            image:'',
            shown_image:'',
            newPass:'',
            confirmPass:'',
            selectedImage: null,  
        }
    },
    components:{UserImg ,CertificateIcon ,AddPhoto},
    validations() {
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
            const regex =/^[a-z0-9.]+$/;
            return regex.test(value)
        }
         return {
            fullName : {
                required: helpers.withMessage('Full name is required', required),
                full_name: helpers.withMessage('Please enter your full name as two words separated by a space.',full_name),
                string_full_name: helpers.withMessage('Please enter only alphabetic characters.',string_full_name),
            },
            confirmPass:{
                sameAsPassword: helpers.withMessage('Make sure your confirm password matches the new password.', sameAs(this.newPass))
            },
            newPass:{
                minValueValue: helpers.withMessage('Your password must be at least 8 characters long.' ,minValue(8))
            },
            userName :{
                lower_case: helpers.withMessage('Please enter your username using only lowercase letters.' ,lower_case),
                none_space: helpers.withMessage('Username cannot contain spaces' ,none_space)
            }
        }
    },
    methods :{
        openFilePicker() {
            this.$refs.userImg.click()
        },
        handleFileChange(event) {
            this.image=event.target.files[0];
            console.log('zzz',this.image);
            this.shown_image=URL.createObjectURL(event.target.files[0])
        },
        saveChanges(){
            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
        } 
    }
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