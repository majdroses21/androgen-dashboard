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
            <div @click="change_selected_item(course);validation_var = 'course'" class="d-flex gap-2 align-items-center edit-btn" data-bs-toggle="modal" data-bs-target="#addModal">
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
                <div>{{ course?.notes }}</div>
            </div> 
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
                <div v-for="(item, index) in v$.course_name.$errors" :key="index" v-if="validation_var == 'course'" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="description">{{$t('Description')}}</label>
                <textarea v-model="description" class="input-style" id="description" name="description" rows="3" cols="45" :placeholder="$t('Write task description')"  style="height: unset;"></textarea>
                <div v-for="(item, index) in v$.description.$errors" :key="index" v-if="validation_var == 'course'" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="duration">{{$t('Duration (hours)')}}</label>
                <input v-model="course_duration" class="input-style" type="text" id="duration" name="duration" :placeholder="$t('write the course duration')">
                <div v-for="(item, index) in v$.course_duration.$errors" :key="index" v-if="validation_var == 'course'" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="notes">{{$t('Notes')}}</label>
                <textarea v-model="notes" class="input-style" id="notes" name="notes" rows="3" cols="45" :placeholder="$t('Write task notes')" style="height: unset;"></textarea>
                <div v-for="(item, index) in v$.notes.$errors" :key="index" v-if="validation_var == 'course'" class="error-msg mx-1 gap-1">
                    <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                    </div>
                    <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                </div>
            </div>
            <div class="mb-2">
                <label class="label-style" for="teacher-course">{{$t('Teacher')}}</label>
                <v-select class="select-style-modal input-style" :options="teachers" v-model="select_teacher" @search="searchTeachers" :placeholder="$t('Choose teacher')"></v-select>
                    <div v-for="(item, index) in v$.select_teacher.$errors" :key="index" v-if="validation_var == 'course'" class="error-msg mx-1 gap-1">
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
    <div class="details_box mt-3">
        <div class="sec-head">
            <div class="sec-head-2">
                <div class="lessons">{{$t('Lessons')}}</div>
                <div class="info d-flex gap-1 align-items-center info-icon" v-if="false"> 
                    <TimeAlert></TimeAlert>
                    <div>10 hours remaining to complete the course sessions</div>
                </div>
            </div>
            <div v-if="user?.role == 'operation'" @click="validation_var = 'lesson';init_lessons()" class="d-flex gap-1 add-btn">
                <AddIcon class="add-icon"></AddIcon>
                <div class="add" data-bs-toggle="modal" data-bs-target="#addLesson">{{$t('Add lesson')}}</div>
            </div>
            <div class="modal fade" id="addLesson" tabindex="-1" aria-labelledby="addLessonLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                    <div class="modal-content modal_content">
                    <div class="modal-header modal_header">
                    <h5 v-if="operation == 'add'"  class="modal-title modal_title" id="addModalLabel">{{$t('New lesson')}}</h5>
                    <h5 v-if="operation == 'edit'" class="modal-title modal_title" id="addModalLabel">{{$t('Edit lesson')}}</h5>
                </div>
                <div class="modal-body modal_body">
                    <form class="form-style">
                    <div class="mb-2">
                        <label class="label-style" for="lesson-name">{{$t('Lesson name')}}</label>
                        <input v-model="lesson_name" class="input-style" type="text" id="lesson-name" name="lesson-name" :placeholder="$t('Write lesson name')">
                        <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.lesson_name.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label class="label-style" for="lesson_duration">{{$t('Duration')}}</label>
                        <input v-model="lesson_duration" class="input-style" type="number" min="1" id="lesson_duration" name="lesson_duration" :placeholder="$t('write lesson duration')">
                        <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.lesson_duration.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label class="label-style" for="lesson_desc">{{$t('Description')}}</label>
                        <textarea v-model="lesson_desc" class="input-style" id="lesson_desc" name="lesson_desc" rows="3" cols="45" :placeholder="$t('Write lesson description')"  style="height: unset;"> </textarea>
                        <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.lesson_desc.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label class="label-style" for="dateTime">{{$t('Date')}} </label>
                        <input v-model="date" type="date" class="input-style fieldDate" id="dateTime" name="dateTime">
                        <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.date.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div>
                    </div>
                    <div class="mb-2">
                        <label class="label-style" for="dateTime">{{$t('Time')}}</label>
                        <input v-model="time" type="time" class="input-style" id="dateTime" name="dateTime">
                        <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.time.$errors" :key="index" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div>
                    </div>
                    </form>
                </div>
                <div class="box-buttons-modal">
                    <button v-if="operation == 'add'" :disabled="lesson_loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addLesson()">
                        <div v-if="lesson_loading_loader" class="lds-dual-ring-white"></div>
                        <template v-if="!lesson_loading_loader" >{{$t('Add lesson')}}</template>
                    </button>
                    <button v-if="operation == 'edit'" :disabled="lesson_loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editLesson()">
                        <div v-if="lesson_loading_loader" class="lds-dual-ring-white"></div>
                        <template v-if="!lesson_loading_loader" >{{$t('Edit lesson')}}</template>
                    </button>
                    <button ref="close_lesson_modal"  type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
                </div>
                </div>
                </div>
            </div>
        </div>
        <div class="not-found">
            <template v-if="lessons.length == 0">
                <NotFound></NotFound>
                <div class="no-lesson">{{$t('No lessons yet')}}</div>
                <button type="button" class="button-style" data-bs-toggle="modal" data-bs-target="#generate">
                    {{$t('Generate lessons')}}
                </button>
            </template>
            <!-- Generate lessons -->
            <div class="modal fade" id="generate" tabindex="-1" aria-labelledby="generate" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                    <div class="modal-content modal_content" style="height: unset; min-height: unset;">
                        <div class="modal-header modal_header">
                            <h5 class="modal-title modal_title" id="addModalLabel">{{$t('Generate lessons')}}</h5>
                        </div>
                        <div class="modal-body modal_body">
                            <form class="form-style">
                                <div class="mb-2 box-modal gap-3 justify-content-center">
                                    <div style="width: 100%;">
                                        <label class="label-style" for="lesson-name">{{$t('Start date')}}</label>
                                        <input v-model="start_date" class="input-style" type="date" id="start_date" name="start_date">
                                    </div>
                                    <div style="width: 100%;">
                                        <label class="label-style" for="week">{{$t('Lessons per week')}}</label>
                                        <input v-model="lesson_per__week" class="input-style" type="text" id="week" name="week" :placeholder="$t('Write lessons count')">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="box-buttons-modal mt-0">
                            <button type="button" class="button-style button-style-modal" data-bs-toggle="modal" data-bs-target="#generatePart2">
                                {{$t('Generate')}}
                            </button>
                            <button ref="close_modal" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Generate lessons part2 -->
            <div class="modal fade" id="generatePart2" tabindex="-1" aria-labelledby="generatePart2" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                    <div class="modal-content modal_content" style="height: 365px; min-height: 365px; padding-inline: 0px;">
                        <div class="modal-header modal_header">
                            <h5 class="modal-title modal_title" id="addModalLabel">{{$t('Generate lessons')}}</h5>
                        </div>
                        <div class="modal-body modal_body">
                            <form class="form-style">
                                <div class="mb-2 box-modal gap-3 justify-content-center">
                                    <div style="width: 100%;">
                                        <label class="label-style" for="lesson-name">{{$t('Start date')}}</label>
                                        <input v-model="start_date" class="input-style" type="date" id="start_date" name="start_date">
                                    </div>
                                    <div style="width: 100%;">
                                        <label class="label-style" for="week">{{$t('Lessons per week')}}</label>
                                        <input v-model="lesson_per__week" class="input-style" type="text" id="week" name="week" :placeholder="$t('Write lessons count')">
                                    </div>
                                </div>
                                <div class="mb-2 box-modal gap-3">
                                    <div style="width: 100%;">
                                        <label class="label-style" for="lesson-name">{{$t('Day of week')}}</label>
                                        <v-select class="select-style-modal input-style" :options="days" v-model="select_day" :placeholder="$t('Choose teacher')"></v-select>
                                    </div>
                                    <div style="width: 100%;">
                                        <label class="label-style" for="time">{{$t('Time')}}</label>
                                        <input v-model="time" type="time" class="input-style" id="time" name="time">
                                    </div>
                                    <div style="width: 100%;">
                                        <label class="label-style" for="generate_lesson" style="text-wrap:nowrap;">{{$t('Duration (Minutes)')}}</label>
                                        <input v-model="generate_lesson" type="time" class="input-style" id="generate_lesson" name="generate_lesson" :placeholder="$t('Duration')">
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div class="box-buttons-modal mt-0">
                            <button type="button" class="button-style button-style-modal">
                                {{$t('Generate')}}
                            </button>
                            <button ref="close_modal" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
                        </div>
                    </div>
                </div>
            </div>
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
                <div class="d-flex gap-3 table-box-btn">
                    <router-link to="/courses/1" class="btn_table">
                        <DetailsButton class="table-icon"></DetailsButton>
                    </router-link>
                    <button v-if="user?.role=='operation'" @click="change_selected_lesson_item(item);deleteLesson()" class="btn_table" type="button" data-bs-toggle="modal">
                        <DeleteIcon class="table-icon"></DeleteIcon>
                    </button>
                    <button v-if="user?.role=='operation'" @click="change_selected_lesson_item(item);validation_var = 'lesson'" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addLesson">
                        <EditIcon class="table-icon"></EditIcon>
                    </button>
                </div>
            </template>
            <template #item-description="item">
                {{ item?.description?.substring(0,200) }}
            </template>
            <template #item-duration="item">
                {{ item?.duration }} {{$t('minutes')}}
            </template>
            <template #item-date="item">
                {{ $t(item?.day) }} {{ item?.date }} <br>{{ item?.time }}
            </template>
        </EasyDataTable>
    </div>
    <div class="details_box mt-3">
        <div class="sec-head">
            <div class="lessons">{{$t('Students')}}</div>
            <div class="d-flex gap-1 add-btn">
                <AddIcon class="add-icon"></AddIcon>
                <div class="add" data-bs-toggle="modal" data-bs-target="#addStudent">{{$t('Add student')}}</div>
            </div>
            <div class="modal fade" id="addStudent" tabindex="-1" aria-labelledby="addStudentLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                    <div class="modal-content modal_content" style="height: unset; min-height: unset;">
                    <div class="modal-header modal_header">
                    <h5 class="modal-title modal_title" id="addModalLabel">{{$t('Add student')}}</h5>
                </div>
                <div class="modal-body modal_body">
                    <form class="form-style">
                        <div class="mb-2">
                            <label class="label-style" for="student-course">{{$t('Students')}}</label>
                            <v-select class="select-style-modal input-style" :options="students" v-model="select_student" @search="searchStudents" :loading="searchStudentsLoading" :placeholder="$t('Choose a student')"></v-select>
                            <!-- <div v-for="(item, index) in v$.select_student.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                    <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                            </div> -->
                        </div>
                        <div class="mb-2">
                            <label class="label-style" for="sales-employee">{{$t('Sales employee')}}</label>
                            <v-select class="select-style-modal input-style" :options="sales" v-model="select_sales" @search="searchSales" :loading="searchSalesLoading" :placeholder="$t('Choose sales employee')"></v-select>
                            <!-- <div v-for="(item, index) in v$.select_sales.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                    <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                            </div> -->
                        </div>
                    </form>
                </div>
                <div class="box-buttons-modal">
                    <button type="button" class="button-style button-style-modal" @click.prevent="addStudent()">
                        {{$t('Add student')}}
                    </button>
                    <button ref="close_modal" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
                </div>
                </div>
                </div>
            </div>
        </div>
        <EasyDataTable class="data_table"
                v-model:server-options="serverOptionsStudent"
                :server-items-length="serverItemsLengthStudent"
                :headers="headers2"
                :items="students_data"
                :rowsItems="[10,25,50]"
                border-cell
                table-class-name="customize-table"
                header-text-direction="left"
                body-text-direction="left"
                :loading="loading"
                theme-color="#426ab3"
            >
            <template #item-deleteStudent="item">
                <button class="btn_table" type="button" data-bs-toggle="modal">
                    <DeleteIcon class="table-icon"></DeleteIcon>
                </button>
            </template>
        </EasyDataTable>
    </div>
</div>
</template>
<script>
    import EasyDataTable from 'vue3-easy-data-table';
    import {api_url,storage_url} from '../constants';
    import useVuelidate from '@vuelidate/core';
    import { required,helpers} from '@vuelidate/validators';
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
            lesson_name:'',
            course_name:'',
            course_duration:'',
            lesson_duration:'',
            lesson_desc:'',
            date:'',
            time:'',
            select_teacher:'',
            teachers:[],
            course:[],
            start_date:'',
            lesson_per__week:'',
            notes:'',
            select_day:'',
            generate_lesson:'',
            time:'',
            days:['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday',],
            serverOptions: {
            page: 1,
            rowsPerPage: 10,
            sortBy: 'name',
            sortType: 'desc',
            },
            serverOptionsStudent: {
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
                course_name:[],
                course_duration:[],
                select_teacher:[],
                description:[],
                notes:[],
                lesson_name:[],
                lesson_duration:[],
                dateTime:[],
                lesson_desc:[],
                select_student:[],
                select_sales:[]
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
        sales:[],
        select_sales:'',
        searchStudentsLoading:false,
        searchSalesLoading:false
            
        }
    },
    components: { EditIcon, DurationIcon, DurationIcon, UserImg, TimeAlert, AddIcon, NotFound, DeleteIcon, DetailsButton},
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
       { text: this.$t('Lesson'), value:"name", height:'44' },
       { text: this.$t('Description'), value:"description", height:'44' },
       { text: this.$t('Duration'), value:"duration", height:'44' },
       { text: this.$t('Date & Time'), value:"date", height:'44' },
       { text: '', value:"manage", height:'44' }
    ]
   },
   headers2() {
    return [
       { text:this.$t('Name'), value: "", height:'44' },
       { text: this.$t('operation employee'), value:"", height:'44' },
       { text: '', value:"deleteStudent", height:'44' }
    ]
   }
    },
    methods :{
        _t(message){return _t(message, this.$t);},
        addLesson() {
            console.log('1');
            this.vuelidateExternalResults.lesson_name=[];
            this.vuelidateExternalResults.lesson_desc=[];
            this.vuelidateExternalResults.dateTime=[];
            this.vuelidateExternalResults.lesson_duration=[];

            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }
            console.log('2');

            this.lesson_loading_loader=true;

            var data = {
                name : this.lesson_name,
                duration : this.lesson_duration,
                description : this.lesson_desc,
                date:this.date,
                time:this.time,
                course_id : this.$route.params.id
            }
            let formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            axios.post(`${api_url}/lessons`, formData, {
                headers: {...authHeader(), 'Content-Type': 'application/json'}
            }).then((response) => {
                console.log('3');

                this.lesson_loading_loader=false;
                this.get_lessons();
                this.$refs.close_lesson_modal.click();
                Toast.fire({
                    icon: 'success',
                    title: this.$t('Added')
                });
            },error=>{
                this.lesson_loading_loader=false;
                if(error.response.status==422){
                    var errors = error.response.data.errors;
                    this.vuelidateExternalResults.lesson_name=errors.name??[];
                    this.vuelidateExternalResults.lesson_duration=errors.duration??[];
                    this.vuelidateExternalResults.lesson_desc=errors.description??[];
                    this.vuelidateExternalResults.date=errors.date??[];
                    this.vuelidateExternalResults.time=errors.time??[];
                    this.vuelidateExternalResults.select_teacher=errors.teacher_id??[];
                }
            })
        },
        get_course_by_id(){
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
                this.get_course_by_id();
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
        get_lessons(){
            var id = this.$route.params.id;
            this.loading=true;
            axios.get( `${api_url}/lessons?course_id=${id}`,{ headers:{...authHeader()}
            }).then((response) => {
                this.loading=false;
                this.lessons = response.data.data;
            });
        },
        editLesson() {
            this.vuelidateExternalResults.lesson_name=[];
            this.vuelidateExternalResults.lesson_desc=[];
            this.vuelidateExternalResults.dateTime=[];
            this.vuelidateExternalResults.lesson_duration=[];

            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }

            this.lesson_loading_loader=true;

            var data = {
                name : this.lesson_name,
                duration : this.lesson_duration,
                description : this.lesson_desc,
                date:this.date,
                time:this.time.substring(0,5),
                course_id : this.$route.params.id,
                _method:'PUT'
            }
            let formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
            axios.post(`${api_url}/lessons/${this.selected_lesson_item?.id}`, formData, {
                headers: {...authHeader(), 'Content-Type': 'application/json'}
            }).then((response) => {
                this.lesson_loading_loader=false;
                this.get_lessons();
                this.$refs.close_lesson_modal.click();
                Toast.fire({
                    icon: 'success',
                    title: this.$t('Updated')
                });
            },error=>{
                this.lesson_loading_loader=false;
                if(error.response.status==422){
                    var errors = error.response.data.errors;
                    this.vuelidateExternalResults.lesson_name=errors.name??[];
                    this.vuelidateExternalResults.lesson_duration=errors.duration??[];
                    this.vuelidateExternalResults.lesson_desc=errors.description??[];
                    this.vuelidateExternalResults.date=errors.date??[];
                    this.vuelidateExternalResults.time=errors.time??[];
                    this.vuelidateExternalResults.select_teacher=errors.teacher_id??[];
                }
            })
        },
        init_lessons(){
            this.v$.$reset();
            this.lesson_name="",
            this.lesson_duration="",
            this.lesson_desc="",
            this.date="",
            this.time="",
            this.operation = 'add'
        },
        change_selected_lesson_item(value){
            if(!value)
                return;
            this.v$.$reset();
            this.operation = 'edit';
            this.selected_lesson_item = value;
            this.lesson_name = value.name;
            this.lesson_duration = value.duration;
            this.lesson_desc =  value.description;
            this.date =  value.date;
            this.time =  value.time;
        },
        deleteLesson(){
            this.$swal.fire({
            title: this.$t('Are you sure you want to delete this lesson?'),
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
                  axios.delete(`${api_url}/lessons/${this.selected_lesson_item?.id}`, {headers: {...authHeader()}
                  }).then((response) => {
                     this.get_lessons();
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
        searchStudents(q = '', loading = null, force = true) {
            if(q.length==0 && ! force)
                return;
            this.students = [];
            if(loading !== null)
                loading(true);
            else
                this.searchStudentsLoading = true;
                this.debounce(() => {
                q = q.length>0?"&q=" + q:'';
                axios.get(`${api_url}/students${q}`
                ,{headers: {...authHeader()}}).then((response) => {
                this.searchSales('',null,true)
                this.students = response.data.data;
                this.students.forEach(el => {
                    el.label=el?.name
                    this.searchStudentsLoading = false;
                    });
                });
                this.searchStudentsLoading = false;
                if(loading !== null)
                    loading(false)
            }, 1000);
        },
        searchSales(q = '', loading = null, force = true) {
            if(q.length==0 && ! force)
                return;
            this.sales = [];
            if(loading !== null)
                loading(true);
            else
                this.searchSalesLoading = true;
                this.debounce(() => {
                q = q.length>0?"&q=" + q:'';
                axios.get(`${api_url}/users?role=sale${q}`
                ,{headers: {...authHeader()}}).then((response) => {
                this.sales = response.data.data;
                this.sales.forEach(el => {
                    el.label=el?.full_name
                    this.searchSalesLoading = false;
                    });
                });
                this.searchSalesLoading = false;
                if(loading !== null)
                    loading(false)
            }, 1000);
        },
    },
    validations() {
        var optional = (value) => true;
        if(this.validation_var == 'course'){
            console.log('sdafsf')
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
        }else if(this.validation_var != 'course'){
            return{
                date: {
                    required: helpers.withMessage('_.required.date', required),
                },
                time: {
                    required: helpers.withMessage('_.required.time', required),
                },
                lesson_duration :{
                    required: helpers.withMessage('_.required.duration', required),
                },
                lesson_name :{
                    required: helpers.withMessage('_.required.name', required),
                },
                lesson_desc :{
                    optional
                },
                // select_student :{
                //     required: helpers.withMessage('_.required.name', required),
                // },
                // select_sales :{
                //     required: helpers.withMessage('_.required.name', required),
                // },
            }
        }
    },
    mounted(){
        this.get_course_by_id();
        this.searchTeachers('',null,true);
        this.get_lessons();
        document.querySelectorAll('.fieldDate').forEach(element => {
            element.min= new Date().toISOString().split("T")[0];
        });
        this.searchStudents('',null,true)
        // this.get_students();
        // this.get_num()
    },
    watch:{
        serverOptions(_new,_old){
            // this.get_courses();
        }
    }
}
</script>



<style scoped>
.not-found {
    display: flex;
    justify-content: center;
    align-items:center;
    flex-direction:column;
    margin-top: 20px;
}
.data_table:deep() .shadow {
    box-shadow: none!important;
}
.box-modal {
     display: flex;
}
.no-lesson {
    font-weight :500px;
    color :var(--main-color);
    margin-top:16px;
    margin-bottom:24px;
}
 .details_box {
    background-color: white;
    padding: 24px 20px;
    border-radius: 30px;
 }
 .add-btn {
    cursor: pointer;
 }
 .sec-head {
    display: flex;
    justify-content: space-between;
 }
 .sec-head-2 {
    display: flex;
    gap: 24px;
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
.add-icon :deep() path {
    stroke: var(--primary-color);
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
.add{
    font-size: 16px;
    font-weight: 400;
    color: var(--primary-color);

}
.data_table :deep() .vue3-easy-data-table__main.border-cell .vue3-easy-data-table__body td {
  border-right: none;
  padding: 16px 24px;
}
[data-direction = rtl] .data_table :deep() .vue3-easy-data-table__main.border-cell .vue3-easy-data-table__body td {
   text-align: right;
}
.data_table :deep() .vue3-easy-data-table__main.border-cell .vue3-easy-data-table__header th {
  border-right: none !important;
  font-weight: 500;
}
.data_table :deep() .vue3-easy-data-table__header th {
  background-color: rgb(246 248 251);
}
.data_table :deep() .easy-data-table__rows-selector .rows-input__wrapper {
  justify-content: unset;
  gap: 9px;
  width: 36px;
  padding: 0px;
}
.data_table :deep() .vue3-easy-data-table__footer .pagination__items-index {
  margin-left: 0px;
}
.data_table :deep() .vue3-easy-data-table__footer {
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
}
.data_table_admin :deep() .vue3-easy-data-table__main {
   max-height: calc(100vh - 302px);
   height: calc(100vh - 302px);
}
.data_table_height :deep() .vue3-easy-data-table__main {
   max-height: calc(100vh - 302px);
   height: calc(100vh - 302px);
}
[data-direction = rtl] .data_table :deep().vue3-easy-data-table__main {
    direction: rtl;
}
[data-direction = rtl].data_table :deep() .table-box-btn  {
   justify-content: flex-start;
}
[data-direction = rtl].data_table :deep() .vue3-easy-data-table__footer{
   justify-content: flex-start;
}
[data-direction = rtl].data_table :deep() .vue3-easy-data-table__footer .pagination__items-index{
    margin: 0 10px 0 20px;
}
[data-direction = rtl].data_table:deep() .vue3-easy-data-table__footer{
   flex-direction: row-reverse;
}
[data-direction = rtl] .data_table :deep() .previous-page__click-button {
   transform: rotate(180deg);

}
[data-direction = rtl] .data_table :deep() .next-page__click-button {
    transform: rotate(180deg);
}
.btn_table {
  border: none;
  background-color: transparent;
}
.btn_table:hover :deep() .table-icon path {
  stroke: var(--primary-color);

}
.data_table :deep() .easy-data-table__rows-selector ul.select-items{
  position: absolute;
  top: 23px;
  left: -3px; 
  width: 44px;
}
.data_table :deep() .vue3-easy-data-table__main {
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
}
.table-icon {
  cursor: pointer;
}



/* rtl */
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option {
   text-align: right;
}
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option--highlight {
   text-align: right;
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
    .box-modal {
        flex-direction: column;
    }
}
</style>