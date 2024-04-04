<template>
<div class="main-box">    
    <div class="box-title">
        <router-link to="/courses" class="arrow-icon">
            <i class="fa-solid fa-arrow-left"></i>
        </router-link>
       <div class="title">{{course?.name}}</div>
    </div>
    <div class="details_box">
        <div class="d-flex justify-content-between">
            <div class="det_title">{{$t('Course details')}}</div>
            <div @click="change_selected_item(course)" class="d-flex gap-2 align-items-center edit-btn" data-bs-toggle="modal" data-bs-target="#addModal">
                <EditIcon class="edit_icon"></EditIcon> <span class="edit">{{$t('Edit')}}</span> 
            </div>
        </div>
        <div class="info info-flex">
            <div class="d-flex gap-2">
                <DurationIcon></DurationIcon>
                <div>
                    <span>{{$t('Duration :')}}</span>
                    <span class="px-1">{{course?.duration}}</span>
                    <span>{{$t('hours')}}</span>
                </div>
            </div>
            <div class="d-flex gap-2">
                <!-- <div class="user-img"> <img src="" alt=""> </div> -->
                <UserImg class="user_img"></UserImg>
                <div>
                    <span>{{ course?.teacher?.full_name }}</span>
                </div>
            </div>
        </div>
        <div class="det_title mt-2" v-if="course?.description">{{$t('Description')}}</div>
        <div class="info">{{course?.description}}</div>
        <div class="det_title mt-2" v-if="course?.notes">{{$t('Notes')}}</div>
        <div class="info">
            <div class="d-flex gap-1">
                <!-- <div>1</div> -->
                <div>{{ course?.notes }}</div>
            </div> 
            <!-- <div class="d-flex gap-1">
                <div>2</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sapiente laborum illum esse ex numquam corporis explicabo nesciun</div>
            </div> -->
        </div> 
    </div>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content">
            <div class="modal-header modal_header">
            <h5 class="modal-title modal_title" id="addModalLabel">{{$t('Edit course')}}</h5>
        </div>
        <div class="modal-body modal_body">
            <form class="form-style">
            <div class="mb-2">
                <label class="label-style" for="course-name">{{$t('Course name')}}</label>
                <input v-model="course_name" class="input-style" type="text" id="course-name" name="course-name" :placeholder="$t('Write course name')">
                <div v-for="(item, index) in v$.course_name.$errors" :key="index" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="description">{{$t('Description')}}</label>
                <textarea v-model="description" class="input-style" id="description" name="description" rows="3" cols="45" :placeholder="$t('Write task description')"  style="height: unset;"></textarea>
                <div v-for="(item, index) in v$.description.$errors" :key="index" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="duration">{{$t('Duration (hours)')}}</label>
                <input v-model="course_duration" class="input-style" type="text" id="duration" name="duration" :placeholder="$t('write the course duration')">
                <div v-for="(item, index) in v$.course_duration.$errors" :key="index" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="notes">{{$t('Notes')}}</label>
                <textarea v-model="notes" class="input-style" id="notes" name="notes" rows="3" cols="45" :placeholder="$t('Write task notes')" style="height: unset;"></textarea>
                <div v-for="(item, index) in v$.notes.$errors" :key="index" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="teacher-course">{{$t('Teacher')}}</label>
                <v-select class="select-style-modal input-style" :options="teachers" v-model="select_teacher" @search="searchTeachers" :placeholder="$t('Choose teacher')"></v-select>
                <div v-for="(item, index) in v$.select_teacher.$errors" :key="index" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            </form>
        </div>
        <div class="box-buttons-modal">
            <button :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editCourse()">
                <div v-if="loading_loader" class="lds-dual-ring-white"></div>
                <template v-if="!loading_loader" >{{$t('Edit course')}}</template>
            </button>
            <button ref="close_modal" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
        </div>   
        </div>
    </div>
    </div>
    <!-- <div class="details_box">
        <div>
            <div class="lessons">Lessons </div>
            <div class="info d-flex gap-1"> 
                <TimeAlert></TimeAlert>
                <div>10 hours remaining to complete the course sessions</div>
            </div>
            <div>
                <AddIcon></AddIcon>
            </div>
        </div>
    </div> -->

</div>
</template>
<script>
    import EditIcon from '../components/icons/EditIcon.vue';
    import DurationIcon from '../components/icons/DurationIcon.vue';
    import UserImg from '../components/icons/UserImg.vue';
    import useVuelidate from '@vuelidate/core';
    import { required,helpers} from '@vuelidate/validators';
    import "vue-select/dist/vue-select.css";
    import TimeAlert from '../components/icons/TimeAlert.vue'
    import AddIcon from '../components/icons/TimeAlert.vue'
    import axios from 'axios';
    import { api_url } from '../constants';
    import { authHeader } from '../helpers';
    import { _t } from '../helpers';
    export default {
    setup() {
        function createDebounce() {
            let timeout = null;
            return function (fnc, delayMs) {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                fnc();
                }, delayMs || 500);
            };
        }
        return {
            debounce: createDebounce(),
            v$: useVuelidate(),
        }
    },
    data() {
        return {
            course_name:'',
            course_duration:'',
            select_teacher:'',
            teachers:[],
            course:[],
            notes:'',
            vuelidateExternalResults: {
                course_name:[],
                course_duration:[],
                select_teacher:[],
                description:[],
                notes:[]
            },
            loading_loader:false,
            description:'',
            searchTeachersLoading:false,
        }
    },
    components: { EditIcon, DurationIcon, DurationIcon, UserImg, TimeAlert, AddIcon },
    methods :{
        _t(message){return _t(message, this.$t);},

        addCourse(){
            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }  
        },
        get_course(){
            var id = this.$route.params.id;
            axios.get( `${api_url}/courses/${id}`,
            { headers:{
                ...authHeader()
            }
            }).then((response) => {
                console.log(response)
                this.course = response.data.data;
            });
        },
        editCourse(){
            var id = this.$route.params.id;
            this.vuelidateExternalResults.course_name=[];
            this.vuelidateExternalResults.description=[];
            this.vuelidateExternalResults.notes=[];
            this.vuelidateExternalResults.course_duration=[];
            this.vuelidateExternalResults.select_teacher=[];

            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }

            this.loading_loader=true;
            var data = {
                name : this.course_name,
                duration : this.course_duration,
                description : this.description,
                notes : this.notes,
                teacher_id : this.select_teacher?.id,
                _method:'PUT'
            }
            let formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            axios.post(`${api_url}/courses/${id}`, formData, {
                headers: {...authHeader(), 'Content-Type': 'application/json'}
            }).then((response) => {
                this.loading_loader=false;
                this.get_course();
                this.$refs.close_modal.click();
                Toast.fire({
                    icon: 'success',
                    title: this.$t('Updated')
                });
            },error=>{
                this.loading_loader=false;
                if(error.response.status==422){
                    var errors = error.response.data.errors;
                    this.vuelidateExternalResults.course_name=errors.name??[];
                    this.vuelidateExternalResults.course_duration=errors.duration??[];
                    this.vuelidateExternalResults.description=errors.description??[];
                    this.vuelidateExternalResults.notes=errors.notes??[];
                    this.vuelidateExternalResults.select_teacher=errors.teacher_id??[];
                }
            })
        },
        searchTeachers(q = '', loading = null, force = true) {
            if(q.length==0 && ! force)
                return;
            this.teachers = [];
            if(loading !== null)
                loading(true);
            else
                this.searchTeachersLoading = true;
                this.debounce(() => {
                q = q.length>0?"&q=" + q:'';
                var branch_id = ['sales', 'operation', 'admins'].includes(this.user?.role) ? "&branch_id="+this.user?.branch?.id : "";
                this.branches_filter?.id ? "&branch_id="+this.branches_filter?.id : "";
                axios.get(`${api_url}/users?role=teacher${q}${branch_id}`
                ,{headers: {...authHeader()}}).then((response) => {
                this.teachers = response.data.data;
                this.teachers.forEach(el => {
                    el.label=el?.full_name
                    this.searchTeachersLoading = false;
                    });
                });
                this.searchTeachersLoading = false;
                if(loading !== null)
                    loading(false)
            }, 1000);
        },
        change_selected_item(value){
            if(!value)
                return;
            this.v$.$reset();
            this.course_name = value.name;
            this.course_duration = value.duration;
            value.teacher.label = value.teacher.full_name;
            this.select_teacher = value.teacher;
            this.description =  value.description;
            this.notes =  value.notes;
        },
    },
    validations() {
        var optional = (value) => true;
        return {
            course_name: {
                required: helpers.withMessage('_.required.name', required),
            },
            course_duration: {
                required: helpers.withMessage('_.required.duration', required),
            },
            select_teacher: {
                required: helpers.withMessage('_.required.teacher', required),
            },
            description:{ optional },
            notes:{ optional }
        }
    },
    mounted(){
        this.get_course();
        this.searchTeachers('',null,true)
    }
    }
</script>



<style scoped>
 .details_box {
    margin-inline: 40px;
    background-color: white;
    padding: 24px 20px;
    border-radius: 30px;
 }
.box-title {
    justify-content: unset;
    gap: 16px;
}
.user-img {
    width: 20px;
    height: 20px;
    border-radius: 30px;
}
.user-img img {
    object-fit: cover;
}
 .det_title {
    font-size: 20px;
    font-weight: 600;
    color: var(--main-color);
    margin:8px 0px 16px 0px;
 }
 .lessons {
    font-weight: 600;
    font-size: 20px;
    color: var(--main-color);
 }
 .info-flex {
    display: flex;
    gap: 16px;
 }
 .arrow-icon {
    color: #3B424A;

 }
 .edit {
    font-size: 16px;
    font-weight: 400;
    color: var(--primary-color);
 }
 .edit_icon :deep() path {
    stroke: var(--primary-color);
 }
 .edit_icon {
    width: 15px;
    height: 15px;
 }
 /* .duration, .teacher, .desc {
    color: #7B8190;
    font-size: 14px;
    font-weight: 400;
    display: flex;
    gap: 8px;
 } */
 .user_img {
    width: 20px;
    height: 20px;
 }
 .info {
    color: #7B8190;
    font-size: 14px;
    font-weight: 400;
    text-align: justify;
 }
.modal_content {
 min-height: 533px;
 height: 533px;
}
.modal_body {
 overflow-y: auto;
}
.label-style {
    display: block;
    margin: auto;
    position: relative;
    margin-bottom: 4px;
    margin-left: 0px;
 }
 .edit-btn {
    cursor: pointer;
 }
 .input-style {
    padding-inline: 16px;
    border-radius: 8px;
 }
 .button-style-modal {
  padding: 12px 58px;
  text-wrap:nowrap;
}
.button-style {
    padding: 10px 13px;
 }
 .button-style-2 {
    background-color: white;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
 }
 .button-style-2:hover {
    background-color: var(--primary-color);
    color: white;
 }
 .select-style-modal:deep() .vs__dropdown-toggle {
 border: none !important;
}
.select-style-modal:deep() .vs__search {
 margin-top: 0px;
}
.select-style-modal :deep()::placeholder {
 color: #d9d9d9;
}
.select-style-modal :deep() .v-select{
 max-height: 42.6px !important;
 height: 42.6px!important;
 padding-top: 7px;
 padding-bottom: 7px;
}
.select-style-modal :deep() .vs__dropdown-option--highlight {
 background-color: var(--primary-color) !important;
}

.select-style-modal :deep() .vs__dropdown-menu {
 border-radius: 8px;
 margin-top: 9px;
}
.button-style-modal {
  padding: 12px 58px;
  text-wrap:nowrap;
}
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option {
   text-align: right;
}
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option--highlight {
   text-align: right;
}

[data-direction = rtl] .edit-btn{
    flex-direction: row-reverse;
}
[data-direction = rtl] .arrow-icon {
    transform: rotate(180deg);
}
::-webkit-scrollbar {
width: 3px;
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
@media(max-width:1024px) {
    .details_box {
        margin-inline: 5px;
    }
}
@media(max-width: 576px) {
    .modal_content {
        padding: 15px 8px;
    }
    .modal-dialog-style {
    width: 90%;
    max-width: 90%;
    margin-inline: auto;
    }
    .main-box {
    padding: 22px 11px;
    }
    .main-box {
        padding-bottom: 2px;
    }
    .info-flex {
        flex-direction: column;
        gap: 6px;
    }
    .det_title {
        margin-bottom: 12px;
    }
    .button-style{
        padding: 7px 19px;
    }
}
</style>