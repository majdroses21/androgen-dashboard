<template>
    <div class="main-box">    
      <div class="box-title">
         <div class="title">{{$t('Reports')}}</div>
         <button type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add Report')}}</span></button>
      </div>
       <div class="filter-box">
        <button type="button" class="button-style button-style-filter" data-bs-toggle="modal" data-bs-target="#filterBy">
           <FilterIcon class="filter-icon"></FilterIcon>
           <span>{{$t('Filter')}}</span>
           <div class="filter_num"> {{ filterCounter }}</div> 
        </button>
         <div class="search-box">
           <input @input="debounce(() => { search_report=$event.target.value; } , 1000);" class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
           <SearchIcon class="search-icon"></SearchIcon>
         </div>
      </div>
      <!-- modal for add report -->
      <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-style">
                <div class="modal-content modal_content" style="height: 413px; min-height: 413px;">
                        <div class="modal-header modal_header">
                        <h5 class="modal-title modal_title" id="addModalLabel">{{$t('New report')}}</h5>
                    </div>
                    <div class="modal-body modal_body">
                        <form class="form-style">
                        <div class="mb-2">
                            <label class="label-style" for="student_name">{{$t('Name')}}</label>
                            <v-select class="select-style-modal input-style mb-2" :options="students" :loading="searchStudentsLoading" @search="searchStudents" v-model="select_student_modal" :placeholder="$t('Choose student')"></v-select>
                            <div v-for="(item, index) in v$.select_student_modal.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="label-style" for="file">{{$t('Report file')}}</label>
                            <input class="select-style-modal input-style mb-2"  type="file" id="file" name="file" v-on:change="choose_file" ref="file">
                            <div v-for="(item, index) in v$.choose_file.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                            </div>
                        </div>
                        </form>
                    </div>
                    <div class="box-buttons-modal">
                        <button type="button" class="button-style button-style-modal" @click.prevent="addReport()">{{$t('Add report')}}</button>
                        <button type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
                    </div>   
                </div>
            </div>
       </div>
       <EasyDataTable class="data_table"
          v-model:server-options="serverOptions"
          :server-items-length="serverItemsLength"
          :headers="headers"
          :items="reports_data"
          :rowsItems="[10,25,50]"
          border-cell
          table-class-name="customize-table"
          header-text-direction="left"
          body-text-direction="left"
          :loading="loading"
          theme-color="#426ab3"
         >
          <!-- <template #item-manage="item">
             <div class="d-flex gap-3 table-box-btn">
                <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">
                   <DeleteIcon class="table-icon"></DeleteIcon>
                </button>
                <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                   <EditIcon class="table-icon"></EditIcon>
                </button>
                 <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#studentCourse">
                    <DetailsButton class="table-icon"></DetailsButton>
                 </button>
             </div>
          </template> -->
        </EasyDataTable>
        <!-- modal for filter by -->
        <div class="modal fade" id="filterBy" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
           <div class="modal-dialog modal-dialog-centered modal-dialog-style">
              <div class="modal-content modal_content_student_course">
                 <div class="modal-header modal_header">
                 <h5 class="modal-title modal_title_filter" id="addModalLabel">{{$t('Filter')}}</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body modal_body px-3">
                <div class="mb-2">
                    <div class="label-style">{{$t('Branch')}}</div>
                    <v-select class="select-style-modal input-style mb-2" :options="branches" :loading="searchBranchesLoading" @search="searchBranches" v-model="select_branch" :placeholder="$t('Choose branch')"></v-select>
                </div>
                <div class="mb-2">
                    <div class="label-style">{{$t('Teacher')}}</div>
                    <v-select class="select-style-modal input-style mb-2" :options="teachers" :loading="searchTeacherLoading" @search="searchTeacher" v-model="select_teacher" :placeholder="$t('Choose teacher')"></v-select>
                </div>
                <div class="mb-2">
                    <div class="label-style">{{$t('Student')}}</div>
                      <v-select class="select-style-modal input-style mb-2" :options="students" :loading="searchStudentsLoading" @search="searchStudents" v-model="select_student_modal" :placeholder="$t('Choose student')"></v-select>
                </div>
                <div class="mb-2">
                    <div class="label-style">{{$t('Start date')}}</div>
                    <input type="date" class="select-style-modal input-style mb-2" v-model="start_date" :placeholder="$t('Start date')">
                </div>
                <div class="mb-2">
                    <div class="label-style">{{$t('End date')}}</div>
                    <input type="date" class="select-style-modal input-style mb-2" v-model="end_date" :placeholder="$t('Start date')">
                </div>
              </div>
              <div class="box-buttons-modal">
                 <button  class="button-style button-style-modal">{{$t('Apply')}}</button>
                 <button type="button" class="button-style button-style-2  button-style-modal">{{$t('Reset all')}}</button> 
              </div>   
              </div>
           </div>
        </div>
    </div>
  </template>
  <script>
  import EasyDataTable from 'vue3-easy-data-table';
  import AddIcon from '../components/icons/AddIcon.vue';
  import SearchIcon from '../components/icons/SearchIcon.vue';
  import DeleteIcon from '../components/icons/DeleteIcon.vue';
  import EditIcon from '../components/icons/EditIcon.vue';
  import axios from 'axios'
  import {api_url,storage_url} from '../constants';
  import useVuelidate from '@vuelidate/core';
  import { required,helpers} from '@vuelidate/validators';
  import "vue-select/dist/vue-select.css";
  import { authHeader } from '../helpers';
  import { mapState } from 'pinia';
  import { useLangStore } from '../stores/language';
  import { _t } from '../helpers'
  import { useAuthStore } from '../stores/auth';
  import UserImg from '../components/icons/UserImg.vue';
  import DetailsButton from '../components/icons/DetailsButton.vue';
  import FilterIcon from '../components/icons/FilterIcon.vue';
  
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
       serverOptions: {
          page: 1,
          rowsPerPage: 10,
          sortBy: 'name',
          sortType: 'desc',
       },
       loading: true,
       serverItemsLength: 0,
       storage_url:storage_url,
       searchBranchesLoading:false,
       searchTeacherLoading:false,
       searchStudentsLoading:false,
       searchCoursesLoading:false,
        student_course_data:[],
        student_name:'',
        agents:[],
        select_agent:'',
        select_operation:'',
        select_agent_modal:'',
        select_student_modal:'',
        select_branch:'',
        select_teacher:'',
        select_branch_modal:'',
        select_course:'',
        branches:[],
        teachers:[],
        search_report:'',
        students:[],
        choose_file:'',
        reports_data:[],
        start_date:'',
        end_date:''
    }
   },
   components: { AddIcon, SearchIcon, DeleteIcon, EditIcon, UserImg, DetailsButton, FilterIcon},
   computed:{
     ...mapState(useAuthStore, {
        user: 'user'
     }),
     ...mapState(useLangStore, {
           lang: 'language'
     }),
     headers() {
        return [
          { text: this.$t("ID"), value: "student.id",height:'44' },
          { text: this.$t("student"), value: "student.name" ,height:'44' },
          { text: this.$t("branch"), value: "branch" ,height:'44' },
          { text: this.$t("File address"), value: "name",height:'44' },
          { text: this.$t("teacher") , value: "" ,height:'44' },
          { text: this.$t("Date created"), value: "" ,height:'44'},
       ]
     },
  },
    methods :{
        get_reports() {
            var start_date = this.start_date!= '' ? "&start_date="+this.start_date :"";
            var end_date = this.end_date!= '' ? "&end_date="+this.end_date :"";
            
         axios.get( `${api_url}/reports?${start_date}`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.loading=false;
            this.reports_data = response.data.data;
            this.serverItemsLength = response.data.meta.total
         });
        },
     searchBranches(q = '', loading = null, force = true) {
        if(q.length==0 && ! force)
              return;
        this.branches = [];
        if(loading !== null)
              loading(true);
        else
           this.searchBranchesLoading = true;
        this.debounce(() => {
           q = q.length>0?"?q=" + q:'';
           if(this.user?.role=='super_admin'){
              axios.get(`${api_url}/branches${q}`
              ,{headers: {...authHeader()}}).then((response) => {
              this.branches = response.data.data;
              this.branches.forEach(el => {
                 el.label=el?.name
                 this.searchBranchesLoading = false;
                 });
              });
              this.searchBranchesLoading = false;
              if(loading !== null)
                 loading(false)
           }
        }, 1000);
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
        q = q.length>0?"?q=" + q:'';
        axios.get(`${api_url}/students${q}`
        ,{headers: {...authHeader()}}).then((response) => {
        this.students = response.data.data;
        this.searchTeacher('',null,true)
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
    searchTeacher(q = '', loading = null, force = true) {
        if(q.length==0 && ! force)
              return;
        this.teachers = [];
        if(loading !== null)
              loading(true);
        else
           this.searchTeacherLoading = true;
        this.debounce(() => {
           q = q.length>0?"?q=" + q:'';
        //    if(this.user?.role=='super_admin'){
              axios.get(`${api_url}/users?role=teacher&${q}`
              ,{headers: {...authHeader()}}).then((response) => {
              this.teachers = response.data.data;
              this.searchBranches('',null,true);
              this.teachers.forEach(el => {
                 el.label=el?.full_name
                 this.searchTeacherLoading = false;
                 });
              });
              this.searchTeacherLoading = false;
              if(loading !== null)
                 loading(false)
        //    }
        }, 1000);
     },
     addReport(){
     this.v$.$touch();
     if (this.v$.$invalid) {
        return;
     }  
     },
     },
     mounted() {
        this.searchStudents('',null,true);
        this.get_reports();
 
     },
     validations() {
        return {
           select_student_modal: {
              required: helpers.withMessage('The student field is required', required),
           },
            choose_file: {
              required: helpers.withMessage('The report field is required', required),
           },
        }
     },
  }
  </script>
  
  <style scoped>
  .data_table:deep().shadow {
    box-shadow: none !important;
  }
  .label-style {
      display: block;
      margin: auto;
      position: relative;
      margin-bottom: 4px;
      margin-left: 0px;
   }
   .img_user {
     object-fit: cover;
   }
   .button-style-filter {
     background-color: transparent;
     border: 1px solid var(--primary-color);
     color: #7B8190;
     height: 40px;
     font-size: 14px;
     display: flex;
   }
  .modal_content_filterBy {
     height: 410px;
     min-height: 410px;
     padding: 15px 24px;
     border-radius: 20px;
  }
  .modal_content_student_course {
     height: 470px;
     min-height: 470px;
     padding: 15px 24px;
     border-radius: 20px;
  }
   .filter_num {
     width: 20px;
     height: 20px;
     background-color: var(--primary-color);
     color: white;
     border-radius: 20px;
   }
   .input-style {
      padding-inline: 16px;
      border-radius: 8px;
   }
   .error-msg {
      margin-left: 12px;
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
   .button-style-modal {
    padding: 12px 58px;
    text-wrap:nowrap;
  }
  .data_table :deep() .vue3-easy-data-table__main.border-cell .vue3-easy-data-table__body td {
    border-right: none !important;
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
  .data_table :deep() .easy-data-table__rows-selector {
    margin-right: 0px;
  }
  .data_table :deep() .vue3-easy-data-table__footer .pagination__items-index {
    margin-left: 0px;
  }
  .data_table :deep() .vue3-easy-data-table__footer {
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
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
  .dropdown-menu-style-modal {
    width: 100%;
    /* top: 12px !important; */
    left: -17px !important;
    border: 1px solid #8080806b;
    padding: 3px 14px;
  }
  .input-style-search {
     padding-inline: 46px;
     height: 40px;
  }
  .modal_body {
   overflow-y: auto;
  }
  .modal_content_delete {
   padding: 32px 24px;
  }
  /* end style easy data table */
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
  .modal_content {
   min-height: 454px;
   height: 454px;
  }
  .select-style {
   width: 150px;
  }
  .select-style :deep() .vs__dropdown-toggle {
    padding: 6px 0px;
    border-radius: 30px;
    border: 1px solid var(--primary-color);
    max-height: 42.6px;
    height: 42.6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .select-style :deep() .vs__search {
   font-size: 14px;
    font-weight: 500;
    color: #7B8190;
    margin: 0px;
  }
  .select-style :deep().vs--single .vs__selected {
   font-size: 14px;
   font-weight: 500;
    color: #7B8190;
  }
  .select-style :deep() .vs--single .vs__selected{
   margin: 0px !important;
  }
  .select-style :deep() .vs__actions  {
   padding-top: 0px;
   padding-bottom: 0px;
  }
  .select-style :deep() .vs__selected {
   margin-top: 0px;
   font-size: 14px;
  }
  
  .select-style :deep() .vs__dropdown-menu {
   border-radius: 20px;
   margin-top: 7px;
  }
  .select-style :deep() .vs__dropdown-option--highlight {
   background-color: var(--primary-color) !important;
  }
  .select-style :deep() .vs__dropdown-option {
   font-size: 14px;
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
  .data_table :deep() .vue3-easy-data-table__main {
    max-height: calc(100vh - 284px);
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
  [data-direction = rtl].data_table :deep().vue3-easy-data-table__main.border-cell .vue3-easy-data-table__body td {
  text-align: right;
  }
  
  [data-direction = rtl].select-style:deep().vs__selected-options{
     display: flex !important;
     flex-direction: row-reverse!important;
  }
  [data-direction = rtl].select-style:deep() .vs__actions {
     flex-direction: row-reverse;
  }
  [data-direction=rtl] .table-box-btn {
     justify-content: flex-start;
  }
  [data-direction = rtl] .select-style :deep() .vs__dropdown-option {
     text-align: right;
  }
  [data-direction = rtl] .select-style :deep() .vs__dropdown-option--highlight {
     text-align: right;
  }
  [data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option {
     text-align: right;
  }
  [data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option--highlight {
     text-align: right;
  }
  [data-direction = rtl] .data_table :deep() .previous-page__click-button {
     transform: rotate(180deg);
  }
  [data-direction = rtl] .data_table :deep() .next-page__click-button {
      transform: rotate(180deg);
  }
  [data-direction =rtl] .student-course {
     flex-direction: row-reverse;
  }
  @media(max-width:1024px) {
   .box-title {
      justify-content: unset;
      gap: 24px;
   }
   .button-style-add {
      padding: 9px 43px;
      text-wrap:nowrap;   
   }
  }
  @media(max-width:576px) { 
  
   .search-box {
      width: 100%;
   }
   .box-title {
      justify-content: unset;
      gap: 24px;
   }
   .main-box {
    padding: 22px 11px;
   }
   .modal-dialog-style {
    width: 90%;
    max-width: 90%;
    margin-inline: auto;
    }
    .button-style{
      padding: 7px 19px;
     }
    .modal_content_filterBy ,.modal_content_student_course{
        padding: 15px 8px;
     }
     .button-style-filter {
        padding: 7px;
     }
     
  }
  </style>