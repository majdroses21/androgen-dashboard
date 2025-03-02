<template>
  <div class="main-box">    
    <div class="box-title">
       <div class="title d-flex gap-3">{{$t('Courses')}}</div>
       <button v-if="user?.role == 'operation'" @click="init()" type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add course')}}</span></button>
    </div>
     <div class="filter-box">
      <button type="button" class="button-style button-style-filter" data-bs-toggle="modal" data-bs-target="#filterBy">
         <FilterIcon class="filter-icon"></FilterIcon>
         <span>{{$t('Filter')}}</span>
         <div class="filter_num" v-if="filter_counter!=0">{{ filter_counter }}</div> 
      </button>
       <div class="search-box">
          <input @input="debounce(() => { search_course=$event.target.value; } , 1000);" class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
          <SearchIcon class="search-icon"></SearchIcon>
       </div>
    </div>
      <!-- modal for filter by -->
      <div class="modal fade" id="filterBy" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content_filterBy">
               <div class="modal-header modal_header">
               <h5 class="modal-title modal_title_filter" id="addModalLabel">{{ $t('Filter') }}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               <button style="display: none;" type="button" class="btn-close-k"  data-bs-dismiss="modal" aria-label="Close"></button> 
            </div>
            <div class="modal-body modal_body px-3">
               <div class="mb-2" v-if="user?.role=='super_admin'" >
                  <div class="label-style">{{ $t('Branch') }}</div>
                  <v-select class="select-style-modal input-style mb-2" :options="branches" :loading="searchBranchesLoading"  @search="searchBranches" v-model="branches_filter" :placeholder="$t('Choose branch')" ></v-select>
               </div>
               <div class="mb-2" v-if="user?.role!='teacher'">
                  <div class="label-style">{{ $t('Teacher') }}</div>
                  <v-select  class="select-style-modal input-style mb-2" :options="teachers" :loading="searchTeachersLoading"  @search="searchTeachers" v-model="teacher_filter" :placeholder="$t('Choose teacher')"></v-select>
               </div>
               <div class="mb-2">
                  <div class="label-style">{{ $t('Status') }}</div>
                  <v-select  class="select-style-modal input-style mb-2" :options="[$t('active'), $t('inactive')]"  v-model="filter_status" :placeholder="$t('Choose status')"></v-select>
               </div>
            </div>
            <div class="box-buttons-modal">
               <button @click="applySearch()" class="button-style button-style-modal apply-btn">{{ $t('Apply') }}</button>
               <button @click="resetFilter()" type="button" class="button-style button-style-2  button-style-modal">{{ $t('Reset') }}</button> 
            </div>   
            </div>
         </div>
      </div>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-dialog-style">
          <div class="modal-content modal_content">
          <div class="modal-header modal_header">
          <h5 v-if="operation == 'add'" class="modal-title modal_title" id="addModalLabel">{{$t('New Course')}}</h5>
          <h5 v-if="operation == 'edit'" class="modal-title modal_title" id="addModalLabel">{{$t('Edit course')}}</h5>
       </div>
       <div class="modal-body modal_body">
          <form class="form-style">
           <div class="mb-2">
              <label class="label-style" for="course-name">{{$t('Course name')}} <RequireStarIcon class="required-icon"></RequireStarIcon></label>
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
              <label class="label-style" for="duration">{{$t('Duration (hours)')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="course_duration" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
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
               <label class="label-style" for="teacher-course">{{$t('Teacher')}} <RequireStarIcon class="required-icon"></RequireStarIcon></label>
               <v-select multiple class="select-style-modal input-style" :options="teachers" :loading="searchTeachersLoading"  @search="searchTeachers" v-model="select_teacher" :placeholder="$t('Choose teacher')"></v-select>
               <div v-for="(item, index) in v$.select_teacher.$errors" :key="index" class="error-msg mx-1 gap-1">
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
       <!-- <div class="box-buttons-modal">
          <button type="button" class="button-style button-style-modal" @click.prevent="addCourse()">{{$t('Add course')}}</button>
          <button ref="close_modal" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
       </div>    -->
       <div class="box-buttons-modal">
         <button v-if="operation == 'add'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addCourse()">
            <div v-if="loading_loader" class="lds-dual-ring-white"></div>
            <template v-if="!loading_loader" >{{$t('Add course')}}</template>
         </button>
         <button v-if="operation == 'edit'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editCourse()">
            <div v-if="loading_loader" class="lds-dual-ring-white"></div>
            <template v-if="!loading_loader" >{{$t('Edit course')}}</template>
         </button>
         <button ref="close_modal" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
      </div>
     </div>
     </div>
     </div>
     <!-- modal for delete member -->
     <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
           <div class="modal-content modal_content_delete">
              <div class="delete-para">Are you sure you want to delete <span style="font-size: 18px; font-weight: 600;"> ‘ User Name ‘</span>?</div>
                 <div class="box-buttons-modal">
                    <button type="button" class="button-style button-style-modal">Delete</button>
                    <button type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
                 </div>   
           </div>
        </div>
     </div>
     <EasyDataTable class="data_table"
        v-model:server-options="serverOptions"
        :server-items-length="serverItemsLength"
        :headers="headers"
        :items="courses_data"
        :rowsItems="[10,25,50]"
        border-cell
        table-class-name="customize-table"
        header-text-direction="left"
        body-text-direction="left"
        :loading="loading"
        theme-color="#426ab3"
       >
        <template #item-manage="item">
           <div class="d-flex gap-3 table-box-btn">
               <router-link :to="{ name: 'course-details', params: { id: item?.id } }" class="btn_table">
                    <DetailsButton class="table-icon"></DetailsButton>
               </router-link>
              <button v-if="user?.role=='operation'" @click="change_selected_item(item);deleteCourse()" class="btn_table" type="button" data-bs-toggle="modal">
                 <DeleteIcon class="table-icon"></DeleteIcon>
              </button>
              <button v-if="user?.role=='operation'" @click="change_selected_item(item)" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                 <EditIcon class="table-icon"></EditIcon>
              </button>
           </div>
        </template>
        <template #item-branch="item">
            {{ item?.branch?.translations.name[lang] }}
         </template>
         <template #item-status="item">
            {{ $t(item?.status) }}
         </template>
        <template #item-handle_image="item">
            <span v-for="teacher in item.teachers" class=" ">
               <UserImg v-if="teacher.image==null"></UserImg> 
               <div v-if="teacher.image!=null" class="img_user">
                  <img :src="storage_url+'/'+teacher.image">
               </div>   
               {{ teacher.full_name }} &nbsp; &nbsp;
            </span>
         </template>
      </EasyDataTable>
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
import UserImg from '../components/icons/UserImg.vue';
import { useAuthStore } from '../stores/auth';
import { mapState } from 'pinia';
import CoursesIcon from '../components/icons/CoursesIcon.vue';
import DetailsButton from '../components/icons/DetailsButton.vue';
import { useLangStore } from '../stores/language';
import { _t } from '../helpers';
import FilterIcon from '../components/icons/FilterIcon.vue';
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
     serverOptions: {
        page: 1,
        rowsPerPage: 10,
        sortBy: 'name',
        sortType: 'desc',
     },
     loading: false,
     loading_loader:false,
     serverItemsLength: 0,
     storage_url:storage_url,
     searchTeachersLoading:false,
     searchBranchesLoading:false,
      courses_data:[],
      course_name:'',
      course_duration:'',
      select_teacher:'',
      teachers:[],
      teacher_filter:null,
      branches_filter:null,
      branches:[],
      search_course:'',
      description:'',
      notes:'',
      operation:'add',
      vuelidateExternalResults: {
         course_name:[],
         course_duration:[],
         select_teacher:[],
         description:[],
         notes:[]
      },
      status:'active',
      filter_counter:0,
      filter_status:null,
  }
 },
 components: { AddIcon, SearchIcon, DeleteIcon, EditIcon, UserImg, CoursesIcon, DetailsButton, FilterIcon, RequireStarIcon},
 computed:{
   ...mapState(useAuthStore, {
      user: 'user'
   }),
   ...mapState(useLangStore, {
      lang: 'language'
   }),
   headers() {
      var custom_header = [];
      custom_header.push({text: this.$t('ID') , value: "id", height:'44'})
      custom_header.push({text: this.$t('Course Name'), value: "name", height:'44'})
      if(this.user?.role == 'super_admin'){
         custom_header.push({ text: this.$t('Branch'), value:"branch", height:'44' })
      }
      custom_header.push({ text:this.$t('The Teacher'), value: "handle_image", height:'44' })
      custom_header.push({ text: this.$t('Duration'), value:"duration", height:'44' })
      custom_header.push({ text: this.$t('Status'), value:"status", height:'44' })
      custom_header.push({text: this.$t('completed_lessons'), value: "completed_lessons", height:'44'})
      custom_header.push({text: this.$t('remaining_hours'), value: "remaining_hours", height:'44'})
      custom_header.push({ text: "", value: "manage", width:'116', height:'44' })
      return custom_header;
   }
},
 mounted(){
   if(this.user?.role!='teacher'){
      this.searchTeachers('',null,true)
   }
   this.get_courses()
   this.handleHeaders()
  },
  methods :{
   _t(message){return _t(message, this.$t);},
   get_courses() {
      this.loading=true;
      var q = this.search_course!=''?`&q=${this.search_course}`:'';
      var status = this.filter_status ?`&status=${this.filter_status}`:'';
      var branch_id = this.branches_filter?.id ? "&branch_id="+this.branches_filter?.id : "";
      var teacher_id = this.teacher_filter?.id ? "&teacher_id="+this.teacher_filter?.id : "";

      axios.get( `${api_url}/courses?page=${this.serverOptions.page}&per_page=${this.serverOptions.rowsPerPage}${q}${branch_id}${teacher_id}${status}`,
      { headers:{
         ...authHeader()
      }
      }).then((response) => {
         this.loading=false;
         this.courses_data = response.data.data;
         this.serverItemsLength = response.data.meta.total
      });
   },

   addCourse(){
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
         status : this.status,
         // teacher_id : this.select_teacher?.id
      }
      let formData = new FormData();
      Object.keys(data).forEach((key) => {
         formData.append(key, data[key]);
      });
      if (this.select_teacher) {
            this.select_teacher.forEach((el,i) => {
            formData.append(`teacher_ids[${i}]`,el.id);
         });
      }
      axios.post(`${api_url}/courses`, formData, {
         headers: {...authHeader(), 'Content-Type': 'application/json'}
      }).then((response) => {
         this.loading_loader=false;
         this.get_courses();
         this.$refs.close_modal.click();
         Toast.fire({
            icon: 'success',
            title: this.$t('Added')
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
   searchTeachers(q = '', loading = null, force = false) {
      if(q.length==0 && ! force)
         return;
      this.teachers = [];
      if(loading !== null)
         loading(true);
      else
         this.searchTeachersLoading = true;
         this.debounce(() => {
         q = q.length>0?"&q=" + q:'';
         var branch_id = ['sale', 'operation', 'admins'].includes(this.user?.role) ? "&branch_id="+this.user?.branch?.id : "";
         this.branches_filter?.id ? "&branch_id="+this.branches_filter?.id : "";
         axios.get(`${api_url}/users?role=teacher${q}${branch_id}`
         ,{headers: {...authHeader()}}).then((response) => {
         this.searchBranches('',null,true)
         this.teachers = response.data.data;
         this.teachers.forEach(el => {
            el.label=el?.full_name
            });
            if(loading !== null)
               loading(false);
            else
               this.searchTeachersLoading = false;
         });
      }, 1000);
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
   handleHeaders() {
      const branch = { text: "Branch", value: "branch.name" ,height:'44' }
      if(this.user?.role=='super_admin') {
         this.headers.splice(2, 0, branch);  
      }
   },
   init(){
      this.v$.$reset();
      this.operation = 'add';
      this.course_name = '';
      this.course_duration = '';
      this.description = '';
      this.notes = '';
      this.select_teacher = '';
      this.status = 'active';
   },
   editCourse(){
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
         status : this.status,
         // teacher_id : this.select_teacher?.id,
         _method:'PUT'
      }
      let formData = new FormData();
      Object.keys(data).forEach((key) => {
         formData.append(key, data[key]);
      });
      if (this.select_teacher) {
            this.select_teacher.forEach((el,i) => {
            formData.append(`teacher_ids[${i}]`,el.id);
         });
      }
      axios.post(`${api_url}/courses/${this.selected_item?.id}`, formData, {
         headers: {...authHeader(), 'Content-Type': 'application/json'}
      }).then((response) => {
         this.loading_loader=false;
         this.get_courses();
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
      if(!value)
         return;
      this.selected_item = value;
      this.v$.$reset();
      this.operation = 'edit';
      this.course_name = value.name;
      this.course_duration = value.duration;
      // value.teacher.label = value.teacher.full_name;
      // this.select_teacher = value.teacher;
      this.description =  value.description;
      this.notes =  value.notes;
      this.status =  value.status;
      if (value?.teachers) {
         console.log(111,value.teachers);
         this.select_teacher = value.teachers.map(value => {
            return {
                  id: value.id,
                  label: value.full_name
            };
         });
      }
   },
   deleteCourse(){
      this.$swal.fire({
         title: this.$t('Are you sure you want to delete this course?'),
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
               axios.delete(`${api_url}/courses/${this.selected_item.id}`, {headers: {...authHeader()}
               }).then((response) => {
                  this.get_courses();
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
   applySearch(){
      this.get_courses();
      document.querySelector('#filterBy .btn-close-k').click();
   },
   resetFilter(){
      this.branches_filter=null;
      this.teacher_filter=null;
      this.filter_status=null;
      this.filter_counter=0;
      this.get_courses();
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
  watch:{
      search_course(_new,_old) {
         this.serverOptions.page = 1;
         this.get_courses()
      },
      serverOptions(_new,_old){
         this.get_courses();
      },
      teacher_filter(_new,_old){
         this.serverOptions.page = 1;
         if (_new !=null && _old==null) {
            this.filter_counter=this.filter_counter+1;
         }
         if(_new==null && this.filter_counter>0) {
            this.filter_counter=this.filter_counter-1;
         }
      },
      branches_filter(_new,_old){
         this.serverOptions.page = 1;
         if (_new !=null && _old==null) {
            this.filter_counter=this.filter_counter+1;
         }
         if(_new==null && this.filter_counter>0) {
            this.filter_counter=this.filter_counter-1;
         }
      },
      filter_status(_new,_old){
         this.serverOptions.page = 1;
         if (_new !=null && _old==null) {
            this.filter_counter=this.filter_counter+1;
         }
         if(_new==null && this.filter_counter>0) {
            this.filter_counter=this.filter_counter-1;
         }
         // if(_new=="" ||_new==null) {
         //    this.filter_counter=this.filter_counter-1;
         // }
      }
  },
}
</script>
<style scoped>
.vue3-easy-data-table {
   z-index: 0 !important;
}
.required-icon :deep() path {
      fill: red;
   }
.label-style {
    display: block;
    margin: auto;
    position: relative;
    margin-bottom: 4px;
    margin-left: 0px;
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
.input-style-search{
   padding-inline: 46px;
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
 min-height: 533px;
 height: 533px;
}
.select-style {
 width: 230px;
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
 padding-inline: 8px;
}
.select-style :deep() .vs__clear {
   margin-inline: 6px;
}
.select-style-modal :deep() .vs__clear {
   margin-inline: 6px;
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
.data_table:deep() .vue3-easy-data-table__main {
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
 .button-style{
  padding: 7px 19px;
 }
 .main-box {
  padding: 22px 11px;
 }
 .modal-dialog-style {
  width: 90%;
  max-width: 90%;
  margin-inline: auto;
  }
  .data_table :deep() .vue3-easy-data-table__main {
      max-height: calc(100vh - 326px);
      height: calc(100vh - 326px);
  }
   .modal_content, .modal_content_delete {
       padding: 15px 8px;
   }
   .button-style-filter {
      padding: 7px;
   }
}

</style>