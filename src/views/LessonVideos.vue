<template>
    <div class="main-box">
        <div class="box-title d-flex justify-content-start">
            <router-link :to="'/courses/' + courseId" class="arrow-icon">
                <i class="fa-solid fa-arrow-left"></i>
            </router-link>
           <div class="title dir_rr"> &nbsp;{{$t('back_to')}} {{ coursesTitle }}</div>
        </div>
        <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                <div class="modal-content modal_content">
                <div class="modal-header modal_header">
                <h5 class="modal-title modal_title" id="addModalLabel">{{$t('Edit course')}}</h5>
            </div>
            <!-- Add Video -->
            <div class="modal-body modal_body">
                <form class="form-style">
                <div class="mb-2">
                    <label class="label-style" for="course-name">{{$t('Title')}}</label>
                    <input v-model="title" class="input-style" type="text" id="course-name" name="course-name" :placeholder="$t('Write course name')">
                    <div v-for="(item, index) in v$.title.$errors" :key="index" class="error-msg mx-1 gap-1">
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
                    <label class="label-style" for="duration">{{$t('length')}}minutes </label>
                    <input v-model="length" class="input-style" type="text" id="duration" name="duration" :placeholder="$t('write the course duration')">
                    <div v-for="(item, index) in v$.length.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </div>
                <div class="mb-2">
                    <label class="label-style" for="size">{{$t('size')}}</label>
                    <textarea v-model="size" class="input-style" id="size" name="size" rows="3" cols="45" :placeholder="$t('size')" style="height: unset;"></textarea>
                    <div v-for="(item, index) in v$.size.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </div>
                <!-- <div class="mb-2">
                    <label class="label-style" for="teacher-course">{{$t('Teacher')}}</label>
                    <v-select class="select-style-modal input-style" :options="Sections" v-model="selectedSection" @search="searchSections" :placeholder="$t('Choose teacher')"></v-select>
                        <div v-for="(item, index) in v$.selectedSection.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div>
                </div> -->
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
        <div class="details_box mt-3">
            <div class="sec-head">
                <div class="sec-head-2">
                    <div class="title">{{$t('videos_of')}}: {{ sectionTitle }}</div>
                    <div class="info d-flex gap-1 align-items-center info-icon" v-if="false"> 
                        <TimeAlert></TimeAlert>
                        <div>10 hours remaining to complete the course sessions</div>
                    </div>
                </div>
                <div @click="validation_var = 'lesson';init_lessons()" class="d-flex gap-1 add-btn">
                    
                    <div class="add" data-bs-toggle="modal" data-bs-target="#addVideo"><AddIcon class="add-icon"></AddIcon>{{$t('Add Video')}}</div>
                </div>
                <div class="modal fade" id="addVideo" tabindex="-1" aria-labelledby="addLessonLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                        <div class="modal-content modal_content">
                        <div class="modal-header modal_header">
                        <h5 v-if="operation == 'add'"  class="modal-title modal_title" id="addModalLabel">{{$t('New Video')}}</h5>
                        <h5 v-if="operation == 'edit'" class="modal-title modal_title" id="addModalLabel">{{$t('Edit Video')}}</h5>
                    </div>
                    <!-- Rael Add Video -->
                    <div class="modal-body modal_body">
                <form ref="restImage" class="form-style">
                <div class="mb-2">
                    <label class="label-style" for="course-name">{{$t('Title')}}</label>
                    <input v-model="title" class="input-style" type="text" id="course-name" name="course-name" :placeholder="$t('Write course name')">
                    <div v-for="(item, index) in v$.title.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </div>
                <div class="mb-2">
                    <label class="label-style" for="duration">{{$t('length')}} ({{ $t('minutes') }}) </label>
                    <input v-model="length" class="input-style" type="number" id="duration" name="duration" :placeholder="$t('enter') + ' ' + $t('length')">
                    <div v-for="(item, index) in v$.length.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </div>
                <div class="mb-2">
                    <label class="label-style" for="size">{{$t('size')}}</label>
                    <input type="number" v-model="size" class="input-style" id="size" name="size":placeholder="$t('enter') + ' ' + $t('size')" style="height: unset;"/>
                    <div v-for="(item, index) in v$.size.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </div>
                <div class="mb-2">
                    <label class="label-style" for="link">{{$t('video_link')}}</label>
                    <input v-model="link" class="input-style" id="link" name="link":placeholder="$t('enter') + ' ' + $t('video_link')" style="height: unset;"/>
                    <div v-for="(item, index) in v$.link.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </div>
                <div class="mb-2">
                    <label class="label-style" for="order">{{$t('order')}}</label>
                    <input type="number" v-model="order" class="input-style" id="order" name="order":placeholder="$t('enter') + ' ' + $t('order')" style="height: unset;"/>
                    <div v-for="(item, index) in v$.order.$errors" :key="index" class="error-msg mx-1 gap-1">
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
                <div class="mb-3">
                    <label class="label-style" for="image">
                        {{$t('image')}}
                    </label>
                    <input class="input-style" type="file" id="image" name="Import" @change="chooseImage($event)" accept="image/*">
                    <div v-for="(item, index) in v$.imgLink.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                            <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                    </div>
                </div>
            </form>
            </div>
                    
                    <div class="box-buttons-modal">
                        <button v-if="operation == 'add'" :disabled="lesson_loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addVideo()">
                            <div v-if="lesson_loading_loader" class="lds-dual-ring-white"></div>
                            <template v-if="!lesson_loading_loader" >{{$t('Add Video')}}</template>
                        </button>
                        <button v-if="operation == 'edit'" :disabled="lesson_loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editVideo()">
                            <div v-if="lesson_loading_loader" class="lds-dual-ring-white"></div>
                            <template v-if="!lesson_loading_loader" >{{$t('Edit Video')}}</template>
                        </button>
                        <button ref="close_lesson_modal"  type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="not-found">
                <div v-if="loading" class="lds-dual-ring"></div>
                <template v-if="lessons.length == 0 && !loading">
                    <NotFound></NotFound>
                    <div class="no-lesson">{{$t('no_videos_yet')}}</div>
                    <div @click="validation_var = 'lesson';init_lessons()" class="d-flex gap-1 add-btn">
                    
                    <div  class="button-style"data-bs-toggle="modal" data-bs-target="#addVideo"><AddIcon></AddIcon>{{$t('Add Video')}}</div>
                </div>
                </template>
            </div>
            <EasyDataTable v-if="lessons.length > 0" class="data_table"
                v-model:server-options="serverOptions"
                :server-items-length="serverItemsLength"
                :headers="headers"
                :items="lessons"
                :rowsItems="[10,25,50]"
                border-cell
                table-class-name="customize-table"
                header-text-direction="left"
                body-text-direction="left"
                :loading="loading"
                theme-color="#426ab3"
                show-index
                >
                <template #item-manage="item">
                    <div class="d-block gap-3 table-box-btn">
                        <button @click="change_selected_lesson_item(item);deleteVideo()" class="btn_table" type="button" data-bs-toggle="modal">
                            <DeleteIcon class="table-icon"></DeleteIcon>
                        </button>
                        <button  @click="change_selected_lesson_item(item);validation_var = 'lesson'" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addVideo">
                            <EditIcon class="table-icon"></EditIcon>
                        </button>
                    </div>
                </template>
                <template #item-handle_description="item">
                    {{ item?.description?.substring(0,200) }}
                </template>
                <template #item-handle_length="item">
                    {{ item?.length }}m
                </template>
                <template #item-handle_size="item">
                    {{ item?.size }}MB
                </template>
                <template #item-duration="item">
                    {{ item?.duration }} {{$t('minutes')}}
                </template>
                <template #item-date="item">
                    {{ $t(item?.day) }} {{ item?.date }} <br>{{ item?.time }}
                </template>
                
            </EasyDataTable>
        </div>
    </div>
</template>
<script>
        import EasyDataTable from 'vue3-easy-data-table';
        import {api_url,storage_url} from '../constants';
        import useVuelidate from '@vuelidate/core';
        import { required,helpers, integer, requiredIf} from '@vuelidate/validators';
        import "vue-select/dist/vue-select.css";
        import { useAuthStore } from '../stores/auth';
        import { mapState } from 'pinia';
        import EditIcon from '../components/icons/EditIcon.vue';
        import DurationIcon from '../components/icons/DurationIcon.vue';
        import UserImg from '../components/icons/UserImg.vue';
        import TimeAlert from '../components/icons/TimeAlert.vue'
        import AddIcon from '../components/icons/AddIcon.vue'
        import axios from 'axios';
        import { authHeader } from '../helpers';
        import { _t } from '../helpers';
        import { useLangStore } from '../stores/language';
        import NotFound from '../components/icons/NotFound.vue'
        import DeleteIcon from '../components/icons/DeleteIcon.vue';
        import DetailsButton from '../components/icons/DetailsButton.vue';
        import DateTime from '../components/icons/DateTime.vue';
        import SelectedDateDuration from '../components/SelectedDateDuration.vue';
        import RequireStarIcon from '../components/icons/RequireStarIcon.vue';
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
                courseId:null,
                sectionId:null,
                sectionTitle:null,
                coursesTitle:null,
                //Video data
                title:'',
                length:'',
                size:'',
                order:'',
                link:'',
                imgLink:'',
                description:'',
                // selectedSection:'',

                //
                serverOptions: {
                    page: 1,
                    rowsPerPage: 10,
                    sortBy: 'name',
                    sortType: 'desc',
                },
               
            courses_data :[],
            students_data:[],
            serverItemsLength: 0,
            serverItemsLengthStudent: 0,
            storage_url:storage_url,
            vuelidateExternalResults: {
                title:[],
                length:[],
                size:[],
                order:[],
                link:[],
                imgLink:[],
                description:[],
                // selectedSection:[],
                //
            },
            loading_loader:false,
            description:'',
            searchTeachersLoading:false,
            lessons:[],
            validation_var:'course',
            lesson_loading_loader:false,
            loading: true,
            selected_lesson_item:'',
            operation:'add',
            students :[],
            select_student :'',
            select_sales:'',
            searchStudentsLoading:false,
            searchSalesLoading:false,
            sessions:[],
            sessions_day:[],
            sessions_duration:[],
            sessions_time:[],
            generate_loading_loader:false,
            loading_generate:true,
            student_loading_loader:false,
            status:''
            }
        },
        created() {
            this.courseId = this.$route.params.courseId;
            this.sectionId = this.$route.params.sectionId;
            this.sectionTitle = this.$route.params.sectionTitle;
            this.coursesTitle = this.$route.params.coursesTitle;
            // this.getVideos();
        },
        components: { EditIcon, DurationIcon, DurationIcon, UserImg, TimeAlert, AddIcon, NotFound, DeleteIcon, DetailsButton, SelectedDateDuration, DateTime, RequireStarIcon},
        computed:{
       ...mapState(useAuthStore, {
          user: 'user'
       }),
       ...mapState(useLangStore, {
          lang: 'language'
       }),
       headers() {
        return [
        //    { text: this.$t('Num'), value: "num", height:'44' },
           { text: this.$t('Title'), value:"title", height:'44' },
           { text: this.$t('length'), value:"handle_length", height:'44' },
           { text: this.$t('size'), value:"handle_size", height:'44' },
           { text: this.$t('order'), value:"order", height:'44' },
           { text: this.$t('description'), value:"handle_description", height:'44' },
           { text: 'Actions', value:"manage", height:'44' }
        ]
       },
       headers2() {
            return [
                { text:this.$t('Name'), value: "student.name", height:'44' },
                { text: this.$t('operation employee'), value:"operator.full_name", height:'44' },
                { text: '', value:"deleteStudent", height:'44' }
            ]
       }
        },
        methods :{
            _t(message){return _t(message, this.$t);},
            addVideo() {
                this.vuelidateExternalResults.title=[];
                this.vuelidateExternalResults.description=[];
                this.vuelidateExternalResults.length=[];
                this.vuelidateExternalResults.size=[];
                this.vuelidateExternalResults.order=[];
                this.vuelidateExternalResults.link=[];
                this.vuelidateExternalResults.imgLink=[];
    
                this.v$.$touch();
                if (this.v$.$invalid) {
                    return;
                }
    
                this.lesson_loading_loader=true;
    
                const data = {
                    title : this.title,
                    length : this.length,
                    size : this.size,
                    order : this.order,
                    link : this.link,
                    description : this.description,
                    imgLink : this.imgLink,
                    section_id:this.sectionId
                }
    
                var formData = new FormData();
                Object.keys(data).forEach((key) => {
                    if((!['description','imgLink'].includes(key)) || (data[key] != null && data[key] !== "")){
                        formData.append(key, data[key]);
                    }
                });
                axios.post(`${api_url}/courses/${this.courseId}/videos`, formData, {
                    headers: {...authHeader()} // , 'Content-Type': 'application/json'
                }).then((response) => {
    
                    this.lesson_loading_loader=false;
                    this.getVideos();
                    this.$refs.close_lesson_modal.click();
                    Toast.fire({
                        icon: 'success',
                        title: this.$t('Added')
                    });
                },error=>{
                    this.lesson_loading_loader=false;
                    if(error.response.status==422){
                        const errors = error.response.data.errors;
                        this.vuelidateExternalResults.title=errors.title??[];
                        this.vuelidateExternalResults.description=errors.description??[];
                        this.vuelidateExternalResults.length=errors.length??[];
                        this.vuelidateExternalResults.size=errors.size??[];
                        this.vuelidateExternalResults.order=errors.order??[];
                        this.vuelidateExternalResults.imgLink=errors.imgLink??[];
                        this.vuelidateExternalResults.lectures_count=errors.lectures_count??[];
                    }
                })
            },
            editVideo() {
                this.vuelidateExternalResults.title=[];
                this.vuelidateExternalResults.description=[];
                this.vuelidateExternalResults.length=[];
                this.vuelidateExternalResults.size=[];
                this.vuelidateExternalResults.order=[];
                this.vuelidateExternalResults.link=[];
                this.vuelidateExternalResults.imgLink=[];
    
                this.v$.$touch();
                if (this.v$.$invalid) {
                    return;
                }
    
                this.lesson_loading_loader=true;
    
                const data = {
                    title : this.title,
                    length : this.length,
                    size : this.size,
                    order : this.order,
                    link : this.link,
                    description : this.description,
                    imgLink : this.imgLink,
                    course_id:this.courseId,
                    section_id:this.sectionId
                }
                
                var formData = new FormData();
                Object.keys(data).forEach((key) => {
                    if((!['imgLink'].includes(key)) || (data[key] != null && data[key] !== "")){
                        formData.append(key, data[key]);
                    }
                });
                formData.append('_method', 'PUT');
                // axios.put(`${api_url}/videos/${this.selected_lesson_item?.id}`, formData, {
                axios.post(`${api_url}/videos/${this.selected_lesson_item?.id}`, formData, {
                    headers: {...authHeader()} //, 'Content-Type': 'application/json'
                }).then((response) => {
                    this.lesson_loading_loader=false;
                    this.getVideos();
                    this.$refs.close_lesson_modal.click();
                    Toast.fire({
                        icon: 'success',
                        title: this.$t('Updated')
                    });
                },error=>{
                    this.lesson_loading_loader=false;
                    if(error.response.status==422){
                        const errors = error.response.data.errors;
                        this.vuelidateExternalResults.title=errors.title??[];
                        this.vuelidateExternalResults.description=errors.description??[];
                        this.vuelidateExternalResults.length=errors.length??[];
                        this.vuelidateExternalResults.size=errors.size??[];
                        this.vuelidateExternalResults.order=errors.order??[];
                        this.vuelidateExternalResults.imgLink=errors.imgLink??[];
                        this.vuelidateExternalResults.lectures_count=errors.lectures_count??[];
                    }
                })
            },
            init_lessons(){
                this.v$.$reset();
                this.operation = 'add',
                this.$refs.restImage?.reset();
                this.title="",
                this.length="",
                this.size="",
                this.link="",
                this.order="",
                this.description=""
            },
            change_selected_item(value){
                console.log(value);
                this.$refs.restImage?.reset();
                if(!value)
                    return;
                this.v$.$reset();
                this.course_name = value.title;
                this.course_duration = value.duration;
                this.description =  value.description;
                this.notes =  value.notes;
                this.status =  value.status;
                this.select_teacher=value?.teachers;
                if (value?.teachers) {
                    this.select_teacher = value.teachers.map(value => {
                        return {
                            id: value.id,
                            label: value.full_name
                        };
                    });
                }
            },
            getVideos(){
                var id = this.$route.params.id;
                this.loading=true;
                axios.get( `${api_url}/courses/${this.courseId}/videos?section_id=${this.sectionId}`,{ headers:{...authHeader()}
                }).then((response) => {
                    this.loading=false;
                    this.lessons = response.data;
                });
            },
            //Chande nezame
            change_selected_lesson_item(value){
                if(!value)
                    return;
                this.v$.$reset();
                this.$refs.restImage?.reset();
                this.operation = 'edit';
                this.selected_lesson_item = value;
                this.title = value.title;
                this.length =  value.length;
                this.description = value.description;
                this.order = value.order;
                this.link = value.link;
                this.size = value.size;
            },
            deleteVideo(){
                this.$swal.fire({
                title: this.$t('delete_video'),
                showCancelButton: true,
                cancelButtonText: this.$t('Cancel'),
                confirmButtonText: this.$t('Delete'),
                customClass: {
                   title:"delete-para",
                   popup:"container_alert",
                   confirmButton: "button-style-alert",
                   cancelButton: "button-style-alert2"
                },
                }).then((result) => {
                   if (result.isConfirmed) {
                      axios.delete(`${api_url}/courses/${this.courseId}/videos/${this.selected_lesson_item?.id}`, {headers: {...authHeader()}
                      }).then((response) => {
                         this.getVideos();
                         Toast.fire({
                               icon: 'success',
                               title: this.$t('Deleted')
                         });
                      })
                   }
                },error=>{
    
                }
             );
            },
            chooseImage(e){
                this.vuelidateExternalResults.imgLink = [];
                const file = e.target.files[0];

                if (!file) {
                    // إذا لم يتم اختيار ملف
                    return;
                }

                // التحقق من نوع الملف
                const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                if (!validImageTypes.includes(file.type)) {
                    Toast.fire({
                        icon: 'error',
                        title: this.$t('select_valid_img')
                    });
                    this.vuelidateExternalResults.imgLink.push(this.$t('select_valid_img'))
                    e.target.value = ''; // إعادة تعيين حقل الإدخال
                    return;
                }

                // إذا كان الملف صحيحًا
                this.imgLink = file;
                console.log('Valid image selected:', this.imgLink);
            },
       
         
        },
        validations() {
            var optional = (value) => true;
                return {
                    title: {
                        required: helpers.withMessage('_.required.title', required),
                    },
                    length: {
                        required: helpers.withMessage('_.required.length', required),
                        integer: helpers.withMessage('_.mustBeInt', integer),
                        
                    },
                    size: {
                        required: helpers.withMessage('_.required.size', required),
                        integer: helpers.withMessage('_.mustBeInt.size', integer),
                        
                    },
                    order: {
                        required: helpers.withMessage('_.required.order', required),
                        integer: helpers.withMessage('_.mustBeInt', integer),
                    },
                    link: {
                        required: helpers.withMessage('_.required.link', required),
                    },
                    imgLink: {
                        // requiredIf: helpers.withMessage('_.required.imgLink', requiredIf(this.operation == 'edit')),
                    },
                    description: {
                        required: helpers.withMessage('_.required.description', required),
                    }
                   
            }
        },
        mounted(){
            this.getVideos();
            document.querySelectorAll('.fieldDate').forEach(element => {
                element.min= new Date().toISOString().split("T")[0];
            });
        },
        watch:{
            serverOptions(_new,_old){
                this.getVideos();
            },
        }
    }
</script>
    
    
<style scoped src="../assets/css/TabStyle.css"> </style>

<style scoped>
/* 1. Image and Appearance Classes */
.img_user {
    width: 20px;
    height: 20px;
}
.img_user img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}
.user-img {
    width: 20px;
    height: 20px;
    border-radius: 30px;
}
.user-img img {
    object-fit: cover;
}
.user_img {
    width: 20px;
    height: 20px;
}
/* 2. Message and text elements classes */
.not-found {
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
    margin-top: 20px;
}
.no-lesson {
    font-weight: 500;
    color: var(--main-color);
    margin-top: 16px;
    margin-bottom: 24px;
}
.det_title {
    font-size: 20px;
    font-weight: 600;
    color: var(--main-color);
    margin: 8px 0px 16px 0px;
}
.lessons {
    font-weight: 600;
    font-size: 20px;
    color: var(--main-color);
}
.info {
    color: #7B8190;
    font-size: 14px;
    font-weight: 400;
    text-align: justify;
}
/* 3. Layout classes */
.box-modal {
    display: flex;
}
.details_box {
    background-color: white;
    padding: 24px 20px;
    border-radius: 30px;
}
.sec-head {
    display: flex;
    justify-content: space-between;
}
.sec-head-2 {
    display: flex;
    gap: 24px;
}
.info-flex {
    display: flex;
    gap: 16px;
}
/* 4. Button classes and interactions */
.add-btn {
    cursor: pointer;
}
.edit-btn {
    cursor: pointer;
}
.add-icon :deep() path {
    stroke: var(--primary-color);
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
.add {
    font-size: 16px;
    font-weight: 400;
    color: var(--primary-color);
}
.lesson-det {
    font-weight: bold;
}
/* 5. Additional table classes */
.data_table:deep() .shadow {
    box-shadow: none!important;
}
.data_table_admin :deep() .vue3-easy-data-table__main {
    max-height: calc(100vh - 302px);
    height: calc(100vh - 302px);
}
.data_table_height :deep() .vue3-easy-data-table__main {
    max-height: calc(100vh - 302px);
    height: calc(100vh - 302px);
}
/* 6. Additional RTL classes */
[data-direction = rtl] .lesson-det {
    flex-direction: row-reverse;
}
[data-direction = rtl] .arrow-icon {
    transform: rotate(180deg);
}
/* 7. Additional modal classes */
.modal-dialog {
    max-width: 600px;
}
.modal_content_lesson_info {
    min-height: 211px;
    height: 211px;
    padding: 20px;
}
</style>