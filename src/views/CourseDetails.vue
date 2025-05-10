<template>
    <div class="main-box">    
        <!-- <div class="box-title">
            <div class="title d-flex gap-3">{{$t('courses_portal')}}</div>
        </div> -->
        <div class="box-title d-flex justify-content-start">
            <router-link to="/courses" class="arrow-icon">
                <i class="fa-solid fa-arrow-left"></i>
            </router-link>
           <div class="title dir_rr"> &nbsp;{{$t('courses_portal')}}</div>
        </div>
       <!-- <div v-if="!loading" class="lds-dual-ring"></div> -->
       <div v-if="loading" style="position: relative; height: 100vh;">
             <div class="lds-dual-ring" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"></div>
       </div>
       <div class="details_box" v-if="!loading">
            <div class="position-relatives mb-4 overflow-hidden rounded-3" style="height: 15rem;" >
                <img :src="storage_url + courseInfo?.course?.image" class="w-100 h-100 object-fit-cover transition-transform duration-700 hover-scale-105" alt="">
            </div>
            <div class="d-flex justify-content-between">
                <div class="fs-3 fw-semibold" style="color: var(--primary-color);">{{$t('courses_details')}}</div>
                <div @click="change_selected_item(course)" class="d-flex gap-2 align-items-center edit-btn mb-2" data-bs-toggle="modal" data-bs-target="#addModal">
                    <EditIcon class="edit_icon"></EditIcon> <span class="edit">{{$t('Edit')}}</span> 
                </div>
            </div>
            <h1 class="fs-3 fs-md-2 fw-bold text-dark mb-4 mt-1">{{ courseInfo?.course?.title }}</h1>
            <!-- Teacher image or default avatar -->
            <div class="d-flex align-items-center gap-3 mb-4">
                <div v-if="courseInfo?.course?.teacher?.image" class="rounded-circle overflow-hidden" style="width: 40px; height: 40px; border: 2px solid #dbeafe;">
                    <img 
                    :src="courseInfo?.course?.teacher?.image" 
                    class="w-100 h-100 object-fit-cover"
                    />
                </div>
                <div v-else class="rounded-circle d-flex align-items-center justify-content-center" style="width: 40px; height: 40px; background-color: #dbeafe;">
                    <UserImg class="user-icon"></UserImg>
                </div>
                
                <!-- Teacher name with label -->
                <div>
                    <span class="text-muted small">{{ $t('lecturer') }}:</span>
                    <h3 class="fw-medium text-body">{{ courseInfo?.course?.teacher_name }}</h3>
                </div>
            </div>
            <!-- Duration -->
            <div class="d-flex gap-2 align-items-center">
                <ClockIcon class="text-primary" style="width: 20px; height: 20px;" />
                <div>
                    <span class="text-body-tertiary">{{ $t('Duration') }}: </span>
                    <span class="px-1 fw-medium">{{ Math.round(courseInfo?.course?.minute_count / 60) }}</span>
                    <span class="text-body-tertiary">{{ $t('hours') }}</span>
                </div>
            </div>
            <!-- Price -->
            <div class="d-flex gap-2 align-items-center mt-2">
                <PriceIcon  style="width: 20px; height: 20px;" />
                <div>
                    <span class="text-body-tertiary">{{ $t('price') }}: </span>
                    <span class="px-1 fw-medium text-success"> <b>{{ courseInfo?.course?.price  }}</b> </span>
                    <span class="text-body-tertiary">{{ $t('sp') }}</span>
                </div>
            </div>
            <h3 class="fs-4 fw-semibold mt-4 mb-2" style="color: var(--primary-color);"> {{ $t('Description') }} </h3>
            <p class="text-body-secondary small md-base text-justify">{{ courseInfo?.course?.description }}</p>
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
                    <v-select multiple class="select-style-modal input-style" :options="teachers" v-model="select_teacher" @search="searchTeachers" :placeholder="$t('Choose teacher')"></v-select>
                        <div v-for="(item, index) in v$.select_teacher.$errors" :key="index" v-if="validation_var == 'course'" class="error-msg mx-1 gap-1">
                            <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                            </div>
                            <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div>
                </div>
                <div class="mb-2 d-flex gap-1">
                    <input type="radio" id="a" name="status" value="active" v-model="status">
                    <label class="" for="a">{{$t('active')}}</label>
                    <input type="radio" id="u" name="status" value="inactive" v-model="status">
                    <label class="" for="u">{{$t('inactive')}}</label>
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
                    <div class=" title">{{$t('Lessons')}}</div>
                    <div class="info d-flex gap-1 align-items-center info-icon" v-if="false"> 
                        <TimeAlert></TimeAlert>
                        <div>10 hours remaining to complete the course sessions</div>
                    </div>
                </div>
                <div @click="validation_var = 'lesson';init_lessons()" class="d-flex gap-1 add-btn">
                    
                    <div class="add" data-bs-toggle="modal" data-bs-target="#addLesson"><AddIcon class="add-icon"></AddIcon> {{$t('Add lesson')}}</div>
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
                            <label class="label-style" for="lesson-name">
                                {{$t('Lesson name')}}
                                <RequireStarIcon class="required-icon"></RequireStarIcon>
                            </label>
                            <input v-model="lesson_name" class="input-style" type="text" id="lesson-name" name="lesson-name" :placeholder="$t('Write lesson name')">
                            <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.lesson_name.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                    <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="label-style" for="order">
                                {{$t('order')}}
                                <RequireStarIcon class="required-icon"></RequireStarIcon>
                            </label>
                            <input v-model="order" class="input-style" type="number" min="1" id="order" name="order" :placeholder="$t('write lesson duration')">
                            <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.order.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                    <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="label-style" for="length">
                                {{$t('length')}} ({{$t('minutes')}})
                                <RequireStarIcon class="required-icon"></RequireStarIcon>
                            </label>
                            <input v-model="length" class="input-style" type="number" min="1" id="length" name="length" :placeholder="$t('write lesson duration')">
                            <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.length.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                    <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="label-style" for="lectures_count">
                                {{$t('lecturesCount')}} 
                                <RequireStarIcon class="required-icon"></RequireStarIcon>
                            </label>
                            <input v-model="lectures_count" class="input-style" type="number" min="1" id="lectures_count" name="lectures_count" :placeholder="$t('write lesson duration')">
                            <div v-if="validation_var== 'lesson'" v-for="(item, index) in v$.lectures_count.$errors" :key="index" class="error-msg mx-1 gap-1">
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
                <!-- lesson info modal -->
                <div class="modal fade info_modal" id="LessonInfo" tabindex="-1" aria-labelledby="LessonInfoLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                        <div class="modal-content modal_content_lesson_info">
                            <div class="modal-header modal_header m-auto lesson-det">
                                <span>{{selected_lesson_item?.name}} </span> <span class="px-1"> {{$t('details')}}</span>
                            </div>
                            <div class="modal-body modal_body">
                                <div class="det_title mt-2">{{$t('Description')}}</div>
                                <div class="info info-flex">
                                    <div class="d-flex gap-2">
                                        <DurationIcon></DurationIcon>
                                        <div>
                                            <span>{{$t('Duration :')}}</span>
                                            <span class="px-1">{{selected_lesson_item?.duration}}</span>
                                            <span>{{$t('minutes')}}</span>
                                        </div>
                                    </div>
                                    <div class="d-flex gap-2">
                                        <!-- <div class="user-img"> <img src="" alt=""> </div> -->
                                        <DateTime></DateTime>
                                        <div>
                                            <span>{{$t('Date & Time :')}} </span>
                                            <span>{{$t(selected_lesson_item?.day)}}  {{ selected_lesson_item?.date }}  {{ selected_lesson_item?.time?.substring(0,5) }}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="info pt-3">{{selected_lesson_item?.description}}</div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="not-found">
                <div v-if="loading" class="lds-dual-ring"></div>
                <template v-if="lessons.length == 0 && !loading">
                    <NotFound></NotFound>
                    <div class="no-lesson">{{$t('No lessons yet')}}</div>
                    <button @click="validation_var = 'generate', init_generate()" type="button" class="button-style" data-bs-toggle="modal" data-bs-target="#generate">
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
                                            <div v-if="validation_var== 'generate'" v-for="(item, index) in v$.start_date.$errors" :key="index" class="error-msg mx-1 gap-1">
                                                <div class="error-txt">
                                                    <i class="fa-solid fa-exclamation error-icon"></i>
                                                </div>
                                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                                            </div>
                                        </div>
                                        <div style="width: 100%;">
                                            <label class="label-style" for="week">{{$t('Lessons per week')}}</label>
                                            <input v-model="sessions_number" class="input-style" type="number" min="1" id="week" name="week" :placeholder="$t('Write lessons count')">
                                            <div v-if="validation_var== 'generate'" v-for="(item, index) in v$.sessions_number.$errors" :key="index" class="error-msg mx-1 gap-1">
                                                <div class="error-txt">
                                                    <i class="fa-solid fa-exclamation error-icon"></i>
                                                </div>
                                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <SelectedDateDuration v-if="sessions_number > 0" v-for="index in parseInt(sessions_number)" :key="index" validation_var="generate"
                                         v-model:select_day="sessions_day[index-1]" v-model:generate_time="sessions_time[index-1]" v-model:generate_duration="sessions_duration[index-1]"
                                         :vuelidateExternalResultsDuration="vuelidateExternalResults.sessions_duration[index-1]"/>
    
                                         <!-- :vuelidateExternalResultsTime="vuelidateExternalResults.sessions_time[index-1]"
                                         :vuelidateExternalResultsDay="vuelidateExternalResults.sessions_day[index-1]"  -->
                                </form>
                            </div>
                            <div class="box-buttons-modal mt-0">
                                <button :disabled="generate_loading_loader" type="button" class="button-style button-style-modal" @click="generateLesson()">
                                    <div v-if="generate_loading_loader" class="lds-dual-ring-white"></div>
                                    <template v-if="!generate_loading_loader" >{{$t('Generate')}}</template>
                                </button>
                                <button ref="close_generate_lesson" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
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
                        <router-link :to="{ name: 'LessonVideos', params: { sectionId: item?.id, courseId: item?.course_id, sectionTitle: item?.title, coursesTitle: courseInfo?.course?.title  } }" class="btn_table">
                            <DetailsButton class="table-icon"></DetailsButton>
                        </router-link>
                        <button @click="change_selected_lesson_item(item);deleteLesson()" class="btn_table" type="button" data-bs-toggle="modal">
                            <DeleteIcon class="table-icon"></DeleteIcon>
                        </button>
                        <button  @click="change_selected_lesson_item(item);validation_var = 'lesson'" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addLesson">
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
        import DateTime from '../components/icons/DateTime.vue';
        import SelectedDateDuration from '../components/SelectedDateDuration.vue';
        import RequireStarIcon from '../components/icons/RequireStarIcon.vue';
        import ClockIcon from '../components/icons/ClockIcon.vue';
        import PriceIcon from '../components/icons/PriceIcon.vue';
import Courses from './Courses.vue';
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
                length:'',
                lectures_count:'',
                order:'',
                lesson_desc:'',
                date:'',
                time:'',
                select_teacher:'',
                teachers:[],
                course:[],
                courseInfo:[],
                start_date:'',
                sessions_number:'',
                notes:'',
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
                length:[],
                lectures_count:[],
                order:[],
                dateTime:[],
                lesson_desc:[],
                select_student:[],
                select_sales:[],
                sessions_time:[],
                sessions_day:[],
                sessions_duration:[],
                start_date:[],
                sessions_number:[]
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
        components: { EditIcon, DurationIcon, DurationIcon, UserImg, TimeAlert, AddIcon, NotFound, DeleteIcon, DetailsButton, SelectedDateDuration, DateTime, RequireStarIcon, ClockIcon, PriceIcon},
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
           { text: this.$t('ID'), value:"id", height:'44' },
           { text: this.$t('Lesson'), value:"title", height:'44' },
           { text: this.$t('lecturesCount'), value:"lectures_count", height:'44' },
           { text: this.$t('length'), value:"length", height:'44' },
           { text: this.$t('order'), value:"order", height:'44' },
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
            addLesson() {
                this.vuelidateExternalResults.lesson_name=[];
                this.vuelidateExternalResults.lesson_desc=[];
                this.vuelidateExternalResults.dateTime=[];
                this.vuelidateExternalResults.length=[];
    
                this.v$.$touch();
                if (this.v$.$invalid) {
                    return;
                }
    
                this.lesson_loading_loader=true;
    
                const data = {
                    title : this.lesson_name,
                    order : this.order,
                    length : this.length,
                    lectures_count : this.lectures_count,
                    course_id : this.$route.params.id
                }
    
                const formData = new FormData();
                Object.keys(data).forEach((key) => {
                    if((!['description'].includes(key)) || (data[key] != null && data[key] !== "")){
                        formData.append(key, data[key]);
                    }
                });
                axios.post(`${api_url}/sections`, formData, {
                    headers: {...authHeader(), 'Content-Type': 'application/json'}
                }).then((response) => {
    
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
                        this.vuelidateExternalResults.lesson_name=errors.title??[];
                        this.vuelidateExternalResults.length=errors.length??[];
                        this.vuelidateExternalResults.lectures_count=errors.lectures_count??[];
                        this.vuelidateExternalResults.order=errors.order??[];
                    }
                })
            },
            editLesson() {
                this.vuelidateExternalResults.lesson_name=[];
                this.vuelidateExternalResults.lesson_desc=[];
                this.vuelidateExternalResults.dateTime=[];
                this.vuelidateExternalResults.length=[];
    
                this.v$.$touch();
                if (this.v$.$invalid) {
                    return;
                }
    
                this.lesson_loading_loader=true;
    
                const data = {
                    title : this.lesson_name,
                    length : this.length,
                    order : this.order,
                    lectures_count : this.lectures_count,
                    course_id : this.$route.params.id,
                    _method:'PUT'
                }
                
                const formData = new FormData();
                Object.keys(data).forEach((key) => {
                    if((!['description'].includes(key)) || (data[key] != null && data[key] !== "")){
                        formData.append(key, data[key]);
                    }
                });
                axios.post(`${api_url}/sections/${this.selected_lesson_item?.id}`, formData, {
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
                        this.vuelidateExternalResults.lesson_name=errors.title??[];
                        this.vuelidateExternalResults.length=errors.length??[];
                        this.vuelidateExternalResults.lectures_count=errors.lectures_count??[];
                    }
                })
            },
            init_lessons(){
                this.v$.$reset();
                this.operation = 'add',
                this.lesson_name="",
                this.length="",
                this.lectures_count=""
                this.order=""
            },
            get_course_by_id(){
                var id = this.$route.params.id;
                axios.get( `${api_url}/courses/${id}`,
                { headers:{
                    ...authHeader()
                }
                }).then((response) => {
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
                    // teacher_id : this.select_teacher?.id,
                    status : this.status,
                    _method:'PUT'
                }
                let formData = new FormData();
                
                if (this.select_teacher) {
                        this.select_teacher.forEach((el,i) => {
                        formData.append(`teacher_ids[${i}]`,el.id);
                    });
                }
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
            change_selected_item(value){
                console.log(value);
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
            get_lessons(){
                var id = this.$route.params.id;
                this.loading=true;
                axios.get( `${api_url}/sections?course_id=${id}`,{ headers:{...authHeader()}
                }).then((response) => {
                    this.loading=false;
                    this.lessons = response.data;
                });
            },
            change_selected_lesson_item(value){
                if(!value)
                    return;
                this.v$.$reset();
                this.operation = 'edit';
                this.selected_lesson_item = value;
                this.lesson_name = value.title;
                this.order = value.order;
                this.lectures_count = value.lectures_count;
                this.length =  value.length;
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
                      axios.delete(`${api_url}/sections/${this.selected_lesson_item?.id}`, {headers: {...authHeader()}
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
            getCourseDetails(){
                const courseId = this.$route.params.id;
                this.loading = true;
                axios.get( `${api_url}/courses/${courseId}`,{ headers:{...authHeader()}
                }).then((response) => {
                    this.courseInfo = response.data;
                    this.loading = false;
                });
            },
            
         
        },
        validations() {
            var optional = (value) => true;
    
            if(this.validation_var == 'course'){
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
            }else if(this.validation_var == 'lesson'){
                return{
                    lesson_name: {
                        required: helpers.withMessage('_.required.lesson_name', required),
                    },
                    length: {
                        required: helpers.withMessage('_.required.length', required),
                    },
                    lectures_count :{
                        required: helpers.withMessage('_.required.lectures_count', required),
                    },
                    order :{
                        required: helpers.withMessage('_.required.order', required),
                    }
                }
            }
            else if( this.validation_var =='generate' ){
                return {
                    start_date:{ required: helpers.withMessage('_.required.start_date', required) },
                    sessions_number:{
                        required: helpers.withMessage('_.required.sessions_number', required),
                    }
                }
            }else if(this.validation_var =='student' ){
                return{
                     select_student :{
                        required: helpers.withMessage('_.required.name', required),
                    },
                    // select_sales :{
                    //     required: helpers.withMessage('_.required.name', required),
                    // },
                }
            }
        },
        mounted(){
            this.get_course_by_id();
            this.get_lessons();
            this.getCourseDetails();
            document.querySelectorAll('.fieldDate').forEach(element => {
                element.min= new Date().toISOString().split("T")[0];
            });
        },
        watch:{
            serverOptions(_new,_old){
                this.get_lessons();
            },

        }
    }
</script>
<style scoped src="../assets/css/TabStyle.css"> </style>
<style scoped>
 .hover-scale-105:hover {
    transform: scale(1.05);
  }
  .duration-700 {
    transition-duration: 700ms;
  }
  .hover-custom:hover {
    color: #1e40af; /* Tailwind's blue-800 */
  }
  .transition-colors {
    transition: color 0.3s ease;
  }
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
/* 2. Messages and alerts classes */
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
/* 3. General coordination and elements classes */
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