<template>
    <div class="main-box">    
      <div class="box-title">
         <div class="title">{{$t('Reports')}}</div>
         <button v-if="user?.role=='teacher'" @click="init()" type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add Report')}}</span></button>
      </div>
       <div class="filter-box">
        <button type="button" class="button-style button-style-filter" data-bs-toggle="modal" data-bs-target="#filterBy">
           <FilterIcon class="filter-icon"></FilterIcon>
           <span>{{$t('Filter')}}</span>
           <div class="filter_num" v-if="filterCounter!=0"> {{ filterCounter }}</div> 
        </button>
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
                            <v-select class="select-style-modal input-style mb-2" :options="students" :loading="searchStudentsLoading" @search="searchStudents" v-model="student_add_edit" :placeholder="$t('Choose student')"></v-select>
                            <div v-for="(item, index) in v$.student_add_edit.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="label-style" for="file">{{$t('Report file')}}</label>
                            <input accept="application/pdf" class="select-style-modal input-style mb-2"  type="file" id="file" name="file" v-on:change="choose_file" ref="file">
                            <div v-for="(item, index) in v$.file.$errors" :key="index" class="error-msg mx-1 gap-1">
                                <div class="error-txt">
                                <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                            </div>
                        </div>
                        </form>
                    </div>
                    <div class="box-buttons-modal">
                        <button :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addReport()">
                           <div v-if="loading_loader" class="lds-dual-ring-white"></div>
                           <template v-if="!loading_loader">{{$t('Add Report')}}</template>
                        </button>
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
        <template #item-handle_teacher="{ teacher }">
            <div v-if="teacher!=null" class="d-flex gap-3 align-items-center">
               <UserImg v-if="teacher?.image==null"></UserImg>
               <div v-if="teacher?.image!=null" class="img_user">
                     <img :src="storage_url+'/'+teacher?.image">
               </div>
               <span>{{ teacher?.full_name }}</span>
            </div>
        </template>
        <template #item-handle_branch="item">
            <div class="d-flex gap-3 align-items-center">
               <span>{{ item?.teacher?.branch?.translations?.name[lang] }}</span>
            </div>
        </template>
        <template #item-file_title="item">
            <div class="d-flex gap-3 align-items-center">
               <Pdf/>{{ item?.file_title }}
            </div>
        </template>
          <template #item-manage="item">
             <div class="d-flex gap-3 table-box-btn">
               <a :id="'file'+item?.id" class="btn_table" type="button" target="_blank" @click="downloadPdf(item)">
                   <DownloadIcon class="table-icon"></DownloadIcon>
                </a>
                <button v-if="user?.role=='teacher'" @click="deleteReport(item)" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">
                   <DeleteIcon class="table-icon"></DeleteIcon>
                </button>
             </div>
          </template>
        </EasyDataTable>
        <!-- modal for filter by -->
        <div class="modal fade" id="filterBy" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
           <div class="modal-dialog modal-dialog-centered modal-dialog-style">
              <div class="modal-content modal_content_student_course">
                 <div class="modal-header modal_header">
                 <h5 class="modal-title modal_title_filter" id="addModalLabel">{{$t('Filter')}}</h5>
                 <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               <button  style="display:none"   type="button" class="btn-close-k" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body modal_body px-3">
                <div v-if="user?.role=='super_admin'" class="mb-2">
                    <div class="label-style">{{$t('Branch')}}</div>
                    <v-select class="select-style-modal input-style mb-2" :options="branches" :loading="searchBranchesLoading" @search="searchBranches" v-model="select_branch" :placeholder="$t('Choose branch')"></v-select>
                </div>
                <div class="mb-2" v-if="user?.role=='admin' || user?.role=='super_admin' || user?.role=='operation'">
                    <div  class="label-style">{{$t('Teacher')}}</div>
                    <v-select class="select-style-modal input-style mb-2" :options="teachers" :loading="searchTeacherLoading" @search="searchTeacher" v-model="select_teacher" :placeholder="$t('Choose teacher')"></v-select>
                </div>
                <div class="mb-2">
                    <div class="label-style">{{$t('Student')}}</div>
                      <v-select class="select-style-modal input-style mb-2" :options="students" :loading="searchStudentsLoading" @search="searchStudents" v-model="select_student_modal" :placeholder="$t('Choose student')"></v-select>
                </div>
                <div class="mb-2">
                    <div class="label-style">{{$t('Start dater')}}</div>
                    <input type="date" class="select-style-modal input-style mb-2" v-model="start_date" :placeholder="$t('Start dater')">
                </div>
                <div class="mb-2">
                    <div class="label-style">{{$t('End dater')}}</div>
                    <input type="date" class="select-style-modal input-style mb-2" v-model="end_date" :placeholder="$t('End dater')">
                </div>
              </div>
              <div class="box-buttons-modal">
                 <button @click="applySearch()" class="button-style button-style-modal">{{$t('Apply')}}</button>
                 <button @click="resetFilter()" type="button" class="button-style button-style-2  button-style-modal">{{$t('Reset all')}}</button> 
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
  import DownloadIcon from '../components/icons/DownloadIcon.vue';
  import FilterIcon from '../components/icons/FilterIcon.vue';
  import Pdf from '../components/icons/Pdf.vue';
  
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
       api_url:api_url,
       searchBranchesLoading:false,
       searchTeacherLoading:false,
       filterCounter:0,
       student_add_edit:null,
       searchStudentsLoading:false,
       searchCoursesLoading:false,
        student_course_data:[],
        operation:'add',
        student_name:'',
        agents:[],
        select_agent:'',
        select_operation:'',
        select_agent_modal:'',
        select_student_modal:null,
        select_branch:null,
        select_teacher:null,
        select_branch_modal:'',
        select_course:'',
        branches:[],
        teachers:[],
        loading_loader:false,
        students:[],
        file:'',
        reports_data:[],
        start_date:'',
        end_date:'',
        vuelidateExternalResults: {
         file:[],
         student_add_edit:[],
      },
    }
   },
   components: { AddIcon, SearchIcon, DeleteIcon, EditIcon, UserImg, DetailsButton, FilterIcon,DownloadIcon, Pdf},
   computed:{
     ...mapState(useAuthStore, {
        user: 'user'
     }),
     ...mapState(useLangStore, {
           lang: 'language'
     }),
     headers() {
      var custom_header = [];
      custom_header.push({ text: this.$t("ID"), value: "id",height:'44' },)
      custom_header.push({text: this.$t('File') , value: "file_title", height:'44'})
      custom_header.push({text: this.$t('teacher') , value: "handle_teacher", height:'44'})
      if(this.user?.role == 'super_admin'){
         custom_header.push({ text: this.$t('Branch'), value:"handle_branch", height:'44' })
      }
      custom_header.push({text: this.$t('student') , value: "student.name", height:'44'})
      custom_header.push({ text: this.$t('Date created'), value: "date", height:'44' })
      custom_header.push({ text: "", value: "manage", width:'116', height:'44' })
      return custom_header
   },
  },
    methods :{
      _t(message){return _t(message, this.$t);},

        get_reports() {
            var start_date = this.start_date!= '' ? "&start_date="+this.start_date :"";
            var end_date = this.end_date!= '' ? "&end_date="+this.end_date :"";
            var branch_id = (this.select_branch!=null && this.select_branch)?`&branch_id=${this.select_branch?.id}`:''
            var teacher_id = (this.select_teacher!=null && this.select_agent)?`&teacher_id=${this.select_teacher?.id}`:''
            var student_id = (this.select_student_modal!=null && this.select_student_modal)?`&student_id=${this.select_student_modal?.id}`:''
            this.loading=true
            axios.get( `${api_url}/reports?${start_date}${end_date}${branch_id}${teacher_id}${student_id}`,
            { headers:{
               ...authHeader()
            }
            }).then((response) => {
               this.loading=false;
               this.reports_data = response.data.data;
               this.serverItemsLength = response.data.meta.total
            });
        },
        applySearch(){
         this.get_reports();
         document.querySelector('#filterBy .btn-close-k').click();
         },
         resetFilter(){
            this.select_branch=null;
            this.select_teacher=null;
            this.select_student_modal=null;
            this.start_date='';
            this.end_date='';
            this.get_reports();
            // document.querySelector('#filterBy .btn-close').click();
            this.filterCounter=0;
         },
      searchBranches(q = '', loading = null, force = false) {
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
                  });
                  if(loading !== null)
                     loading(false);
                  else
                     this.searchBranchesLoading = false;
               });
            }
         }, 1000);
      },
      searchStudents(q = '', loading = null, force = false) {
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
            });
            if(loading !== null)
               loading(false);
            else
               this.searchStudentsLoading = false;
            });
               // this.searchStudentsLoading = false;
               // if(loading !== null)
               //    loading(false)
         }, 1000);
      },
      searchTeacher(q = '', loading = null, force = false) {
         if(q.length==0 && ! force)
               return;
         this.teachers = [];
         if(loading !== null)
               loading(true);
         else
            this.searchTeacherLoading = true;
         this.debounce(() => {
            q = q.length>0?"&q=" + q:'';
         //    if(this.user?.role=='super_admin'){
               axios.get(`${api_url}/users?role=teacher${q}`
               ,{headers: {...authHeader()}}).then((response) => {
               this.teachers = response.data.data;
               if(this.user?.role=='super_admin'){
                  this.searchBranches('',null,true);
               }
               this.teachers.forEach(el => {
                  el.label=el?.full_name
                  // this.searchTeacherLoading = false;
                  });
                  if(loading !== null)
                     loading(false);
                  else
                     this.searchTeacherLoading = false;
               });
               // this.searchTeacherLoading = false;
               // if(loading !== null)
               //    loading(false)
         //    }
         }, 1000);
      },
      choose_file(e){
         this.file=e.target.files[0]
      },
      addReport(){
         this.vuelidateExternalResults.student_add_edit=[],
         this.vuelidateExternalResults.file=[],
         this.v$.$touch();
         if (this.v$.$invalid) {
               return;
         }
         this.loading_loader = true;
         var data = { 
               file:this.file,
               student_id:this.student_add_edit?.id,
         };
         var formData = new FormData();
         Object.keys(data).forEach((key) => {
               if((![].includes(key)) || (data[key] != null && data[key] !== "")){
                  formData.append(key, data[key]);
               }
         });
         // 'Content-Type': 'multipart/form-data
         axios.post(`${api_url}/reports`, formData, {
               headers: {...authHeader()}
         }).then((response) => {
               this.loading_loader = false;
               this.get_reports();
               Toast.fire({
                  icon: 'success',
                  title: this.$t('Added')
               });
               document.querySelector('#addModal .btn-close-modal').click();
         },error=>{
               this.loading_loader = false;
               if(error.response.status==422)
               {
                  var errors = error.response.data.errors;
                  this.vuelidateExternalResults.file=errors.file??[],
                  this.vuelidateExternalResults.student_add_edit=errors.student_id??[]
               }
               // TODO: handle other errors
         });
      },
      deleteReport(item){
         this.$swal.fire({
            title: this.$t('Are you sure you want to delete this Report?'),
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
                  axios.delete(`${api_url}/reports/${item.id}`, {headers: {...authHeader()}
                  }).then((response) => {
                     this.get_reports();
                     Toast.fire({
                           icon: 'success',
                           title: 'Deleted'
                     });
                  })
               }
            },error=>{

            });
         } ,
      init(){
         this.v$.$reset()
         this.student_add_edit=null;
         this.file='';
         document.getElementById('file').value=null
      },
      downloadPdf(item){
         // const link = document.getElementById(`file${item.id}`);
         // link.href =`${this.api_url}+'/reports/'+${item?.id}/export`;
         // link.setAttribute('download', `czvxvvxx.pdf`);
         // :href="api_url + `/reports/${item?.id}/export`"
         // link.click();
         // const pdfData = item?.file; 
         // const blob = new Blob([pdfData], { type: 'application/pdf' });
         // const url = URL.createObjectURL(blob);

         // const a = document.createElement('a');
         // a.href = url;
         // a.download = item?.file_title+ '.pdf';
         // document.body.appendChild(a);
         // a.click();
         axios.get(`${api_url}/reports/${item.id}/export`, {
                headers: {...authHeader()},
                responseType: 'blob',
            }).then(response=>{
                if(response.status == 200){
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', `${item.file_title}.pdf`);
                    document.body.appendChild(link);
                    link.click();
                }
            },error=>{
            });

      }
     },
     mounted() {
        this.searchStudents('',null,true);
        this.get_reports();
 
     },
     validations() {
        return {
         student_add_edit: {
              required: helpers.withMessage('_.required.student', required),
           },
           file: {
              required: helpers.withMessage('_.required.report', required),
           },
        }
     },
     watch:{
      serverOptions(_new,_old) {
         this.get_reports()
      },
      serverOptionsStudent(_new,_old) {
         this.get_reports()
      },
      select_branch(_new,_old){
         if(_new != null && _old==null){
            this.filterCounter=this.filterCounter+1
         }
         if(_new==null && this.filterCounter>0){
            this.filterCounter=this.filterCounter-1;
         }
      },
      select_teacher(_new,_old){
         if(_new != null && _old==null){
            this.filterCounter=this.filterCounter+1
         }
         if(_new==null && this.filterCounter>0){
            this.filterCounter=this.filterCounter-1;
         }
      },
      select_student_modal(_new,_old){
         if(_new != null && _old==null){
            this.filterCounter=this.filterCounter+1
         }
         if(_new==null && this.filterCounter>0){
            this.filterCounter=this.filterCounter-1;
         }
      },
      start_date(_new,_old){
         if(_new != null && _old==''){
            this.filterCounter=this.filterCounter+1
         }
         if(_new=='' && this.filterCounter>0){
            this.filterCounter=this.filterCounter-1;
         }
      },
      end_date(_new,_old){
         if(_new != null && _old==''){
            this.filterCounter=this.filterCounter+1
         }
         if(_new=='' && this.filterCounter>0){
            this.filterCounter=this.filterCounter-1;
         }
      },
     }
  }
  </script>
  
  <style scoped>
   .vue3-easy-data-table {
        z-index: 0 !important;
    }
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
  /* .data_table :deep() .easy-data-table__rows-selector {
    margin-right: 0px;
  } */
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
  [data-direction = rtl] .data_table :deep() .next-page__click-button {
    transform: rotate(180deg);
}
   [data-direction=rtl] .data_table :deep() .vue3-easy-data-table__footer .pagination__rows-per-page{
      direction: ltr;
   }
   [data-direction=rtl] .data_table :deep().vue3-easy-data-table__footer .pagination__items-index {
      direction: ltr;
      margin: 0px 10px 0 20px;
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