<template>
  <div class="main-box">    
    <div class="box-title">
       <div class="title d-flex gap-3">{{$t('Courses')}}</div>
       <button type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add course')}}</span></button>
    </div>
     <div class="filter-box">
       <div class="search-box">
          <input @input="debounce(() => { search_course=$event.target.value; } , 1000);" class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
          <SearchIcon class="search-icon"></SearchIcon>
       </div>
       <v-select v-if="user?.role=='super_admin'" class="select-style" :options="branches" :loading="searchBranchesLoading"  @search="searchBranches" v-model="branches_filter" :placeholder="branches_filter ? `'Branch:'${branches_filter?.name}` : $t('Branch: All')" ></v-select>
       <v-select v-if="user?.role!='teacher'" class="select-style" :options="teachers" :loading="searchTeachersLoading"  @search="searchTeachers" v-model="teacher_filter" :placeholder="$t('Teacher: All')"></v-select>
    </div>
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-dialog-style">
          <div class="modal-content modal_content">
          <div class="modal-header modal_header">
          <h5 class="modal-title modal_title" id="addModalLabel">{{$t('New Course')}}</h5>
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
                 <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
              </div>
           </div>
           <div class="mb-2">
              <label class="label-style" for="description">{{$t('Description')}}</label>
              <textarea v-model="description" class="input-style" id="description" name="description" rows="3" cols="45" :placeholder="$t('Write task description')"  style="height: unset;">
               </textarea>
           </div>
           <div class="mb-2">
              <label class="label-style" for="duration">{{$t('Duration (hours)')}}</label>
              <input v-model="course_duration" class="input-style" type="text" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.course_duration.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
              </div>
           </div>
           <div class="mb-2">
              <label class="label-style" for="notes">{{$t('Notes')}}</label>
              <textarea v-model="notes" class="input-style" id="notes" name="notes" rows="3" cols="45" :placeholder="$t('Write task notes')" style="height: unset;">
               </textarea>
            </div>
           <div class="mb-2">
               <label class="label-style" for="teacher-course">{{$t('Teacher')}}</label>
               <v-select class="select-style-modal input-style" :options="teachers" v-model="select_teacher" :placeholder="$t('Choose teacher')"></v-select>
               <div v-for="(item, index) in v$.select_teacher.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
              </div>
           </div>
          </form>
       </div>
       <div class="box-buttons-modal">
          <button type="button" class="button-style button-style-modal" @click.prevent="addCourse()">{{$t('Add course')}}</button>
          <button type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
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
               <router-link to="/" class="btn_table">
                    <DetailsButton class="table-icon"></DetailsButton>
               </router-link>
              <button v-if="user?.role=='operation'" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">
                 <DeleteIcon class="table-icon"></DeleteIcon>
              </button>
              <button v-if="user?.role=='operation'" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                 <EditIcon class="table-icon"></EditIcon>
              </button>
           </div>
        </template>
        <template #item-handle_image="item">
            <div class="d-flex gap-3 align-items-center">
               <UserImg v-if="item.teacher.image==null"></UserImg> 
               <div v-if="item.teacher.image!=null" class="img_user">
                  <img :src="storage_url+'/'+item.teacher.image">
               </div> 
               <div>{{ item.teacher.full_name }}</div>
            </div>
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
      teacher_filter:'',
      branches_filter:'',
      branches:[],
      search_course:'',
      description:'',
      notes:''
  }
 },
 components: { AddIcon, SearchIcon, DeleteIcon, EditIcon, UserImg, CoursesIcon, DetailsButton },
 computed:{
   ...mapState(useAuthStore, {
      user: 'user'
   }),
   ...mapState(useLangStore, {
      lang: 'language'
   }),
   headers() {
      return [
         { text: this.$t('ID') , value: "id",height:'44' },
         { text: this.$t('Course Name'), value: "name",height:'44' },
         { text:this.$t('The Teacher'), value: "handle_image",height:'44' },
         { text: this.$t('Duration'), value:"duration",height:'44' },
         { text: "", value: "manage", width:'116' ,height:'44' },
      ];
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
   get_courses() {
      this.loading=true;
      var q = this.search_course!=''?`&q=${this.search_course}`:''
      axios.get( `${api_url}/courses?page=${this.serverOptions.page}&per_page=${this.serverOptions.rowsPerPage}${q}`,
      { headers:{
         ...authHeader()
      }
      }).then((response) => {
         this.loading=false;
         this.courses_data = response.data.data;
         console.log(this.courses_data);
         this.serverItemsLength = response.data.meta.total
      });
   },

   addCourse(){
      this.v$.$touch();
      if (this.v$.$invalid) {
         return;
      }  
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
         axios.get(`${api_url}/users?role=teacher${q}`
         ,{headers: {...authHeader()}}).then((response) => {
         this.searchBranches('',null,true)
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
   handleHeaders() {
      const branch = { text: "Branch", value: "branch.name" ,height:'44' }
      if(this.user?.role=='super_admin') {
         this.headers.splice(2, 0, branch);  
      }
   }
  },
  validations() {
   return {
      course_name: {
         required: helpers.withMessage('The name field is required', required),
      },
      course_duration: {
         required: helpers.withMessage('The duration field is required', required),
      },
      select_teacher: {
         required: helpers.withMessage('The teacher field is required', required),
      },
   }
  },
  watch:{
   search_course(_new,_old) {
        this.get_courses()
     },
  },
}
</script>
<style scoped>
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
 width: 170px;
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
/* [data-direction = rtl] .data_table :deep() .previous-page__click-button.first-page {
    transform: rotate(180deg);
}
[data-direction = rtl] .data_table :deep() .next-page__click-button.last-page {
    transform: rotate(180deg);
}
[data-direction = rtl] .data_table :deep() .next-page__click-button .arrow.arrow-left {
   transform: rotate(180deg);

} */
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
 .filter-box {
    flex-direction: column;
 }
 .select-style {
   width: 100%;
 }
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
     max-height: calc(100vh - 287px);
  }
}

</style>