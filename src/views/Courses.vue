<template>
  <div class="main-box">    
    <div class="box-title">
       <div class="title d-flex gap-3">{{$t('Courses')}}</div>
       <button @click="init()" type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add course')}}</span></button>
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
               <div class="mb-2" >
                  <div class="label-style">{{ $t('Branch') }}</div>
                  <v-select class="select-style-modal input-style mb-2" :options="branches" :loading="searchBranchesLoading"  @search="searchBranches" v-model="branches_filter" :placeholder="$t('Choose branch')" ></v-select>
               </div>
               <!-- <div class="mb-2" >
                  <div class="label-style">{{ $t('Teacher') }}</div>
                  <v-select  class="select-style-modal input-style mb-2" :options="teachers" :loading="searchTeachersLoading"  @search="searchTeachers" v-model="teacher_filter" :placeholder="$t('Choose teacher')"></v-select>
               </div> -->
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
              <label class="label-style" for="duration">{{$t('minute_count')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="minute_count" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.minute_count.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
           <div  class="mb-2">
                  <div class="label-style">
                     {{$t('category')}}
                     <RequireStarIcon class="required-icon"></RequireStarIcon>
                  </div>
                  <v-select class="select-style-modal input-style" :options="Categories" v-model="selectedCategory" :placeholder="$t('category')"></v-select>
                  <div v-for="(item, index) in v$.selectedCategory.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                  </div>
               </div>
           <div class="mb-2">
              <label class="label-style" for="duration">{{$t('courseLength')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="courseLength" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.courseLength.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
           <div class="mb-2">
              <label class="label-style" for="duration">{{$t('lecturesCount')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="lecturesCount" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.lecturesCount.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
           <div class="mb-2">
              <label class="label-style" for="duration">{{$t('price')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="price" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.price.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
           <div class="mb-2">
              <label class="label-style" for="duration">{{$t('discount')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="discount" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.discount.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
           <div class="mb-2">
              <label class="label-style" for="duration">{{$t('offerDuration')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="offerDuration" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.offerDuration.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
          
           <!-- <div class="mb-2">
               <label class="label-style" for="teacher-course">{{$t('Teacher')}} <RequireStarIcon class="required-icon"></RequireStarIcon></label>
               <v-select multiple class="select-style-modal input-style" :options="teachers" :loading="searchTeachersLoading"  @search="searchTeachers" v-model="select_teacher" :placeholder="$t('Choose teacher')"></v-select>
               <div v-for="(item, index) in v$.select_teacher.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div> -->
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
              <button @click="change_selected_item(item);deleteCourse()" class="btn_table" type="button" data-bs-toggle="modal">
                 <DeleteIcon class="table-icon"></DeleteIcon>
              </button>
              <button @click="change_selected_item(item)" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
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
        <!-- <template #item-handle_image="item">
            <span v-for="teacher in item.teachers" class=" ">
               <UserImg v-if="teacher.image==null"></UserImg> 
               <div v-if="teacher.image!=null" class="img_user">
                  <img :src="storage_url+'/'+teacher.image">
               </div>   
               {{ teacher.teacher_name }} &nbsp; &nbsp;
            </span>
         </template> -->
         <template #item-handle_image="item">
                <div class="d-flex gap-3 align-items-center"> 
                    <img :src="storage_url  + item.image" class="img-fluid rounded hover-shadow" style="width: 90px; height: 90px; object-fit: cover;"> 
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
     api_url:api_url,
     searchTeachersLoading:false,
     searchBranchesLoading:false,
      courses_data:[],
      items:[],
      course_name:'',
      course_duration:'',
      offerDuration:'',
      minute_count:'',
      select_teacher:'',
      teachers:[],
      teacher_filter:null,
      branches_filter:null,
      branches:[],
      search_course:'',
      description:'',
      lecturesCount:'',
      price:'',
      discount:'',
      description:'',
      notes:'',
      operation:'add',
      selectedCategory:null,
      vuelidateExternalResults: {
         course_name:[],
         course_duration:[],
         offerDuration:[],
         minute_count:[],
         select_teacher:[],
         lecturesCount:[],
         description:[],
         discount:[],
         price:[],
         selectedCategory:[],
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
      custom_header.push({text: this.$t('Course Name'), value: "title", height:'44'})
      custom_header.push({text: this.$t('course_img'), value: "handle_image", height:'44'})
      custom_header.push({ text:this.$t('The Teacher'), value: "teacher_name", height:'44' })
      custom_header.push({ text: this.$t('Duration'), value:"minute_count", height:'44' })
      custom_header.push({ text: this.$t('price'), value:"price", height:'44' })
      custom_header.push({text: this.$t('order'), value: "order", height:'44'})
      // custom_header.push({text: this.$t('remaining_hours'), value: "remaining_hours", height:'44'})
      custom_header.push({ text: "Actions", value: "manage", width:'116', height:'44' })
      return custom_header;
   }
},
 mounted(){
   this.get_courses()
   this.handleHeaders()
  },
  methods :{
   _t(message){return _t(message, this.$t);},
   get_courses() {
      this.loading=true;
      var q = this.search_course!=''?`&q=${this.search_course}`:'';
      axios.get( `${api_url}/courses?${q}`,
      { headers:{
         ...authHeader()
      }
      }).then((response) => {
         console.log(response);
         this.loading=false;
         this.courses_data = response.data.courses;
         // this.serverItemsLength = response.data.meta.total
      });
   },

   addCourse(){
      this.vuelidateExternalResults.course_name=[];
      this.vuelidateExternalResults.description=[];
      this.vuelidateExternalResults.notes=[];
      this.vuelidateExternalResults.minute_count=[];
      this.vuelidateExternalResults.select_teacher=[];
      this.vuelidateExternalResults.selectedCategory=[];

      this.v$.$touch();
      if (this.v$.$invalid) {
         return;
      }

      this.loading_loader=true;
      var data = {
         title : this.course_name,
         description : this.description,
         minute_count : this.minute_count,
         notes : this.notes,
         status : this.status,
         status : this.selectedCategory?.id,
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
   // searchTeachers(q = '', loading = null, force = false) {
   //    if(q.length==0 && ! force)
   //       return;
   //    this.teachers = [];
   //    if(loading !== null)
   //       loading(true);
   //    else
   //       this.searchTeachersLoading = true;
   //       this.debounce(() => {
   //       q = q.length>0?"&q=" + q:'';
   //       var branch_id = ['sale', 'operation', 'admins'].includes(this.user?.role) ? "&branch_id="+this.user?.branch?.id : "";
   //       this.branches_filter?.id ? "&branch_id="+this.branches_filter?.id : "";
   //       axios.get(`${api_url}/users?role=teacher${q}${branch_id}`
   //       ,{headers: {...authHeader()}}).then((response) => {
   //       this.searchBranches('',null,true)
   //       this.teachers = response.data.data;
   //       this.teachers.forEach(el => {
   //          el.label=el?.full_name
   //          });
   //          if(loading !== null)
   //             loading(false);
   //          else
   //             this.searchTeachersLoading = false;
   //       });
   //    }, 1000);
   // },
   // searchBranches(q = '', loading = null, force = false) {
   //    if(q.length==0 && ! force)
   //       return;
   //    this.branches = [];
   //    if(loading !== null)
   //       loading(true);
   //    else
   //       this.searchBranchesLoading = true;
   //       this.debounce(() => {
   //       q = q.length>0?"?q=" + q:'';
   //       if(this.user?.role=='super_admin'){
   //          axios.get(`${api_url}/branches${q}`
   //          ,{headers: {...authHeader()}}).then((response) => {
   //          this.branches = response.data.data;
   //          this.branches.forEach(el => {
   //             el.label=el?.name
   //             });
   //             if(loading !== null)
   //                loading(false);
   //             else
   //                this.searchBranchesLoading = false;
   //          });
   //          }
   //    }, 1000);
   // },
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
      this.course_name = value.title;
      this.minute_count = value.minute_count;
      // value.teacher.label = value.teacher.full_name;
      // this.select_teacher = value.teacher;
      this.description =  value.description;
      this.courseLength =  value.courseLength;
      this.lecturesCount =  value.lecturesCount;
      this.offerDuration =  value.offerDuration;
      this.price =  value.price;
      this.discount =  value.discount;
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
      minute_count: {
         required: helpers.withMessage('_.required.minute_count', required),
      },
      courseLength: {
         required: helpers.withMessage('_.required', required),
      },
      lecturesCount: {
         required: helpers.withMessage('_.required', required),
      },
      selectedCategory: {
         required: helpers.withMessage('_.required.category', required),
      },
      select_teacher: {
         required: helpers.withMessage('_.required.teacher', required),
      },
      price: {
         required: helpers.withMessage('_.required.price', required),
      },
      discount: {
         required: helpers.withMessage('_.required.discount', required),
      },
      offerDuration: {
         required: helpers.withMessage('_.required.discount', required),
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
<style scoped src="../assets/css/TabStyle.css"> 
</style>