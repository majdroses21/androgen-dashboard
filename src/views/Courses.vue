<template>
  <div class="main-box">    
    <div class="box-title">
       <div class="title d-flex gap-3">{{$t('Courses')}}</div>
    </div>
    <div class="d-flex box-content">
       <div class="d-flex justify-content-between">
         <div class="filter-box ">
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
      <button @click="init()" type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add course')}}</span></button>
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
               <div class="mb-2">
                  <div class="label-style">
                     {{$t('Teacher')}}
                  </div>
                  <v-select class="select-style-modal input-style" :options="Teachers" v-model="selectedTeacher_filter"
                     @search="searchTeachers" :loading="searchTeachersLoading"
                     :placeholder="$t('Choose') + ' ' + $t('Teacher')"
                     style="z-index: 10 !important;"></v-select>
               </div>
               <!-- By Status -->
               <!-- <div class="mb-2">
                  <div class="label-style">{{ $t('Status') }}</div>
                  <v-select  class="select-style-modal input-style mb-2" :options="[$t('active'), $t('inactive')]"  v-model="filter_status" :placeholder="$t('Choose status')"></v-select>
               </div> -->
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
          <form ref="restImage" class="form-style">
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
              <label class="label-style" for="order">{{$t('order')}} <RequireStarIcon class="required-icon"></RequireStarIcon></label>
              <input v-model="order" class="input-style" type="number" id="order" name="order" :placeholder="$t('order')">
              <div v-for="(item, index) in v$.order.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
           <div class="mb-2">
               <div class="label-style">
                  {{$t('Teacher')}}
                  <RequireStarIcon class="required-icon"></RequireStarIcon>
               </div>
               <v-select class="select-style-modal input-style" :options="Teachers" v-model="selectedTeacher"
                  @search="searchTeachers" :loading="searchTeachersLoading"
                  :placeholder="$t('Choose') + ' ' + $t('Teacher')"
                  style="z-index: 10 !important;"></v-select>
               <div v-for="(item, index) in v$.selectedTeacher.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                     <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
           <div class="mb-2">
               <div class="label-style">
                  {{$t('category')}}
                  <RequireStarIcon class="required-icon"></RequireStarIcon>
               </div>
               <v-select class="select-style-modal input-style" :options="Categories" v-model="selectedCategory"
                  @search="searchCategories" :loading="searchCategoryLoading"
                  :placeholder="$t('Choose') + ' ' + $t('category')"
                  style="z-index: 9 !important;"></v-select>
               <div v-for="(item, index) in v$.selectedCategory.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                     <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
            <!-- <div class="mb-2">
              <label class="label-style" for="duration">{{$t('courseLength')}} <RequireStarIcon class="required-icon"></RequireStarIcon> </label>
              <input v-model="courseLength" class="input-style" type="number" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.courseLength.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div> -->
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
              <label class="label-style" for="description">{{$t('Description')}}<RequireStarIcon class="required-icon"></RequireStarIcon></label>
              <textarea v-model="description" class="input-style" id="description" name="description" rows="3" cols="45" :placeholder="$t('Write task description')"  style="height: unset;"></textarea>
              <div v-for="(item, index) in v$.description.$errors" :key="index" class="error-msg mx-1 gap-1">
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
              <input v-model="offerDuration" class="input-style" type="date" min="1" id="duration" name="duration" :placeholder="$t('write the course duration')">
              <div v-for="(item, index) in v$.offerDuration.$errors" :key="index" class="error-msg mx-1 gap-1">
                 <div class="error-txt">
                    <i class="fa-solid fa-exclamation error-icon"></i>
                 </div>
                 <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
              </div>
           </div>
           <div class="mb-3">
               <label class="label-style" for="image">
                  {{$t('course_image')}}
                  <RequireStarIcon v-if="operation == 'add'" class="required-icon"></RequireStarIcon>
               </label>
               <input class="input-style" type="file" id="image" name="Import" @change="chooseImage($event)" accept="image/*">
               <div v-for="(item, index) in v$.image.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
          </form>
       </div>
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
                  <!-- {{  storage_url  + item.image}} -->
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
import { required,helpers, integer, requiredIf} from '@vuelidate/validators';
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
         debounceTeachers: createDebounce(),
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
     //data
     course_name:'',
     order:'',
     offerDuration:'',
     minute_count:'',
     courseLength:'',
     description:'',
     lecturesCount:'',
     price:'',
     discount:'',
     image:'',

      
      teacher_filter:null,
      search_course:'',
      operation:'add',
      //v-Select
      selectedCategory:null,
      searchTeachersLoading:false,
      Categories:[],
      //
      selectedTeacher:null,
      selectedTeacher_filter:null,
      searchCategoryLoading:false,
      Teachers:[],
      vuelidateExternalResults: {
         course_name:[],
         order:[],
         offerDuration:[],
         minute_count:[],
         lecturesCount:[],
         description:[],
         discount:[],
         price:[],
         selectedCategory:[],
         selectedTeacher:[],
         image:[],
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
      custom_header.push({ text: "Actions", value: "manage", width:'116', height:'44' })
      return custom_header;
   }
},
 mounted(){
   this.get_courses();
   this.handleHeaders();
   this.searchCategories('', null, true);
   this.searchTeachers('', null, true);

  },
  methods :{
   _t(message){return _t(message, this.$t);},
   get_courses() {
      this.loading=true;
      const q = this.search_course!=''?`name=${this.search_course}`:'';
      const Teacher = this.selectedTeacher_filter ? `&instructor_id=${this.selectedTeacher_filter.id}` : '';
      axios.get( `${api_url}/courses?${q}${Teacher}`,
      { headers:{
         ...authHeader()
      }
      }).then((response) => {
         console.log(response);
         this.loading=false;
         this.courses_data = response.data.courses;
      });
   },

   addCourse(){
      this.vuelidateExternalResults.course_name=[];
      this.vuelidateExternalResults.order=[];
      this.vuelidateExternalResults.selectedTeacher=[];
      this.vuelidateExternalResults.selectedCategory=[];
      this.vuelidateExternalResults.minute_count=[];
      this.vuelidateExternalResults.lecturesCount=[];
      this.vuelidateExternalResults.price=[];
      this.vuelidateExternalResults.discount=[];
      this.vuelidateExternalResults.offerDuration=[];
      this.vuelidateExternalResults.image=[];

      this.v$.$touch();
      if (this.v$.$invalid) {
         return;
      }

      this.loading_loader=true;
      const data = {
         title : this.course_name,
         order : this.order,
         instructor_id : this.selectedTeacher?.id,
         category_id : this.selectedCategory?.id,
         minute_count : this.minute_count,
         lecturesCount : this.lecturesCount,
         description : this.description,
         price : this.price,
         discount : this.discount,
         offerDuration : this.offerDuration,
         image : this.image,
      }
      let formData = new FormData();
      Object.keys(data).forEach((key) => {
         formData.append(key, data[key]);
      });
      axios.post(`${api_url}/courses`, formData, {
         headers: {...authHeader()} //, 'Content-Type': 'application/json'
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
            const errors = error.response.data.errors;
            this.vuelidateExternalResults.course_name=errors.order??[];
            this.vuelidateExternalResults.order=errors.title??[];
            this.vuelidateExternalResults.selectedTeacher=errors.instructor_id??[];
            this.vuelidateExternalResults.selectedCategory=errors.category_id??[];
            this.vuelidateExternalResults.minute_count=errors.minute_count??[];
            this.vuelidateExternalResults.lecturesCount=errors.lecturesCount??[];
            this.vuelidateExternalResults.description=errors.description??[];
            this.vuelidateExternalResults.price=errors.price??[];
            this.vuelidateExternalResults.discount=errors.discount??[];
            this.vuelidateExternalResults.offerDuration=errors.teacher_id??[];
            this.vuelidateExternalResults.image=errors.image??[];
         }
      })
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
      this.order = '';
      this.selectedTeacher = '';
      this.selectedCategory = '';
      this.minute_count = '';
      this.lecturesCount = '';
      this.description = '';
      this.price = '';
      this.discount = '';
      this.offerDuration = '';
      this.$refs.restImage?.reset();
   },
   editCourse(){
      this.vuelidateExternalResults.course_name=[];
      this.vuelidateExternalResults.order=[];
      this.vuelidateExternalResults.selectedTeacher=[];
      this.vuelidateExternalResults.selectedCategory=[];
      this.vuelidateExternalResults.minute_count=[];
      this.vuelidateExternalResults.lecturesCount=[];
      this.vuelidateExternalResults.price=[];
      this.vuelidateExternalResults.discount=[];
      this.vuelidateExternalResults.offerDuration=[];
      this.vuelidateExternalResults.image=[];

      this.v$.$touch();
      if (this.v$.$invalid) {
         return;
      }

      this.loading_loader=true;
      const data = {
         title : this.course_name,
         order : this.order,
         instructor_id : this.selectedTeacher?.id,
         category_id : this.selectedCategory?.id,
         minute_count : this.minute_count,
         lecturesCount : this.lecturesCount,
         description : this.description,
         price : this.price,
         discount : this.discount,
         offerDuration : this.offerDuration,
         image : this.image,
      }
      let formData = new FormData();
      // Object.keys(data).forEach((key) => {
      //    if (!['image'].includes(key) || data[key] != null && data[key] !== "") {
      //       formData.append(key, data[key]);
      //    }
      // });
      Object.keys(data).forEach((key) => {
         if (data[key] != null && data[key] !== "") {
            formData.append(key, data[key]);
         }
      });
      formData.append('_method', 'PUT');

      axios.post(`${api_url}/courses/${this.selected_item?.id}`, formData, {
         headers: {...authHeader()} //, 'Content-Type': 'application/json'
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
            const errors = error.response.data.errors;
            this.vuelidateExternalResults.course_name=errors.title??[];
            this.vuelidateExternalResults.order=errors.order??[];
            this.vuelidateExternalResults.selectedTeacher=errors.instructor_id??[];
            this.vuelidateExternalResults.selectedCategory=errors.category_id??[];
            this.vuelidateExternalResults.minute_count=errors.minute_count??[];
            this.vuelidateExternalResults.lecturesCount=errors.lecturesCount??[];
            this.vuelidateExternalResults.description=errors.description??[];
            this.vuelidateExternalResults.price=errors.price??[];
            this.vuelidateExternalResults.discount=errors.discount??[];
            this.vuelidateExternalResults.offerDuration=errors.teacher_id??[];
            this.vuelidateExternalResults.image=errors.image??[];
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
      this.order = value.order;
      this.minute_count = value.minute_count;
      this.lecturesCount =  value.lecturesCount;
      this.description =  value.description;
      this.price =  value.price;
      this.discount =  value.discount;
      this.offerDuration =  value.offerDuration;
      this.offerDuration =  value.offerDuration.split('T')[0];
      this.selectedTeacher = value?.instructor
      if (value?.instructor) {
         this.selectedTeacher.label = value?.instructor?.name;
      }

      this.selectedCategory = value?.category;
      if (value?.category) {
         this.selectedCategory.label = value?.category?.title;
      }

      
      this.$refs.restImage?.reset();
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
      this.selectedTeacher_filter=null;
      this.filter_counter=0;
      this.get_courses();
      document.querySelector('#filterBy .btn-close').click();
   },
   searchCategories(q = '', loading = null, force = true) {
         if (q.length == 0 && !force)
               return;
         this.Categories = [];
         if (loading !== null)
               loading(true);
         else
               this.searchCategoryLoading = true;
         this.debounce(() => {
            q = q.length > 0 ? "?q=" + q : '';
            axios.get(`${api_url}/categories${q}`
               , { headers: { ...authHeader() } }).then((response) => {
                  // this.Categories = response.data.categories;
                  this.Categories = response.data['categories '];
                  this.Categories.forEach(el => {
                        el.label = el.title;
                        this.searchCategoryLoading = false;
                  });
               });
            this.searchCategoryLoading = false;
            if (loading !== null)
               loading(false)
      }, 1000);
   },
   searchTeachers(q = '', loading = null, force = true) {
         if (q.length == 0 && !force)
               return;
         this.Teachers = [];
         if (loading !== null)
               loading(true);
         else
               this.searchTeachersLoading = true;
         this.debounceTeachers(() => {
            q = q.length > 0 ? "?q=" + q : '';
            axios.get(`${api_url}/instructors${q}`
               , { headers: { ...authHeader() } }).then((response) => {
                  console.log(response.data);
                  this.Teachers = response.data;
                  this.Teachers.forEach(el => {
                        el.label = el.name;
                        this.searchTeachersLoading = false;
                  });
               });
            this.searchTeachersLoading = false;
            if (loading !== null)
               loading(false)
      }, 1000);
   },
   chooseImage(e){
      this.vuelidateExternalResults.image = [];
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
         this.vuelidateExternalResults.image.push(this.$t('select_valid_img'))
         e.target.value = ''; // إعادة تعيين حقل الإدخال
         return;
      }

      // إذا كان الملف صحيحًا
      this.image = file;
   },
  },
  validations() {
   var optional = (value) => true;
   return {
      course_name: {
         required: helpers.withMessage('_.required.name', required),
      },
      order: {
         required: helpers.withMessage('_.required.order', required),
         integer: helpers.withMessage('_.mustBeInt', integer)
      },
      selectedTeacher: {
         required: helpers.withMessage('_.required.teacher', required),
      },
      selectedCategory: {
         required: helpers.withMessage('_.required.category', required),
      },
      minute_count: {
         required: helpers.withMessage('_.required.minute_count', required),
         integer: helpers.withMessage('_.mustBeInt', integer)
      },
      lecturesCount: {
         required: helpers.withMessage('_.required', required),
         integer: helpers.withMessage('_.mustBeInt', integer)
      },
      description:{ 
         required: helpers.withMessage('_.required', required)
       },  
      price: {
         required: helpers.withMessage('_.required.price', required),
         integer: helpers.withMessage('_.mustBeInt', integer)
      },
      discount: {
         required: helpers.withMessage('_.required.discount', required),
         integer: helpers.withMessage('_.mustBeInt', integer)
      },
      offerDuration: {
         required: helpers.withMessage('_.required.discount', required),
      },
      image: {
         requiredIf: helpers.withMessage('_.required.image', requiredIf(this.operation == 'add')),
      },
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
      selectedTeacher_filter(_new,_old){
         if (_new !=null && _old==null) {
            this.filter_counter=this.filter_counter+1;
         }
         if(_new==null && this.filter_counter>0) {
            this.filter_counter=this.filter_counter-1;
         }
      },
  },
}
</script>
<style scoped src="../assets/css/TabStyle.css"> 
</style>