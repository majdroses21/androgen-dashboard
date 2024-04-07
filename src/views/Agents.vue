<template>
   <div class="main-box">    
      <div class="box-title">
         <div class="title">{{$t('Agents')}}</div>
         <button v-if="user?.role=='sale'" @click="init()" type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addAgent">
            <AddIcon/>
             <span>{{$t('Add Agent')}}</span>
         </button>
      </div>
      <div class="filter-box">
        <div class="search-box">
           <input  @input="debounce(() => { search_name=$event.target.value; } , 1000);" class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
           <SearchIcon class="search-icon"></SearchIcon>
        </div>
        <button type="button" class="button-style button-style-add" style="padding-inline: 24px;" data-bs-toggle="modal" data-bs-target="#filterBy">
           <FilterIcon></FilterIcon>
           <span>{{ $t('Filter') }}</span> 
         </button>
     </div>
     <!-- Modal for Create Task For Agent -->
      <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-style">
         <div class="modal-content modal_content modal_content_newTask">
            <div class="modal-header modal_header">
            <h5 class="modal-title modal_title" id="addModalLabel">New Task</h5>
        </div>
            <div class="modal-body modal_body px-3">
               <form class="form-style">      
                  <div class="mb-2">
                     <label class="label-style" for="description">Description</label>
                     <textarea v-model="description" class="input-style" id="description" name="description" rows="3" cols="45"  placeholder="Write task description" style="height: unset;">
                     </textarea>
                     <!-- <div v-for="(item, index) in v$.description.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <label class="label-style" for="date">Due date</label>
                     <input v-model="date" class="input-style" type="date" id="date" name="date">
                     <!-- <div v-for="(item, index) in v$.date.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <label class="label-style" for="agent">Agent</label>
                     <input v-model="agent_name" placeholder="Agent name" class="input-style" type="text" id="agent" name="agent">
                     <!-- <div v-for="(item, index) in v$.agent_name.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <label class="label-style" for="agent_assign">Assign to</label>
                     <input v-model="agent_assign" placeholder="employee name" class="input-style" type="text" id="agent_assign" name="agent_assign">
                     <!-- <div v-for="(item, index) in v$.agent_assign.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <div class="label-style">Course</div>
                        <v-select class="select-style-modal input-style" :options="courses" v-model="select_course" placeholder="Choose course"></v-select>
                        <!-- <div v-for="(item, index) in v$.select_course.$errors" :key="index" class="error-msg mx-1 gap-1">
                           <div class="error-txt">
                              <i class="fa-solid fa-exclamation error-icon"></i>
                           </div>
                           <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                        </div> -->
                  </div>    
               </form>
            </div>
            <div class="box-buttons-modal">
               <button  class="button-style button-style-modal">Add task</button>
               <button type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
            </div>   
         </div>
      </div>
      </div>
      <!-- modal for filter by -->
      <div class="modal fade" id="filterBy" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content_filterBy">
               <div class="modal-header modal_header">
               <h5 class="modal-title modal_title" id="addModalLabel">{{ $t('Filter By') }}</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body modal_body px-3">
               <v-select v-if="user?.role=='super_admin'" class="select-style-modal input-style mb-2" :options="branches" v-model="select_branch" @search="searchBranches" :loading="searchBranchesLoading" :placeholder="$t('Branch: All')"></v-select>
               <!-- admins + sales  -->
               <v-select class="select-style-modal input-style mb-2" :options="all_nationalities" v-model="nationality_filter" :loading="searchNationalitiesLoading" @search="searchNationalities" :placeholder="$t('Nationality: All')"></v-select>
               <v-select class="select-style-modal input-style mb-2" :options="all_emirates" :loading="searchEmiratesLoading" @search="searchEmirates" v-model="emirate_filter" :placeholder="$t('Emirate: All')"></v-select> 
            </div>
            <div class="box-buttons-modal">
               <button @click="applySearch()" class="button-style button-style-modal">{{ $t('Apply') }}</button>
               <button @click="resetFilter()" type="button" class="button-style button-style-2  button-style-modal">{{ $t('Reset') }}</button> 
            </div>   
            </div>
         </div>
      </div>
      <!-- Modal For Add Agent -->
      <div class="modal fade" id="addAgent" tabindex="-1" aria-labelledby="addAgentModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered justify-content-center">
           <div class="modal-content modal_content_addAgent">
              <div class="modal-header modal_header">
                 <h5 v-if="operation=='add'" class="modal-title modal_title">{{$t('New Agent')}}</h5>
                 <h5 v-if="operation=='edit'" class="modal-title modal_title">{{$t('Edit Agent')}}</h5>
              </div>
            <div class="modal-body modal-body-addAgent py-0 px-3">
               <form class="form-style">
                  <div class="mb-2 row">
                     <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="mb-2">
                           <label class="label-style" for="agent_assign">{{$t('Name')}}</label>
                           <input v-model="add_agent_name" :placeholder="$t('Write agent name')" class="input-style" type="text" id="add_agent_name" name="add_agent_name">
                           <div v-for="(item, index) in v$.add_agent_name.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                           </div>
                        </div>
                        <div class="mb-2">
                           <div class="label-style">{{$t('Emirate')}}</div>
                           <v-select class="select-style-modal input-style" :options="all_emirates" v-model="select_emirate" :placeholder="$t('Choose emirate')"></v-select>
                           <div v-for="(item, index) in v$.select_emirate.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                           </div>
                        </div>          
                        <div class="mb-2">
                           <label class="label-style" for="phone_num_1">{{$t('Phone number 1')}}</label>
                           <input v-model="phone_num_1" :placeholder="$t('Write agent phone number')" class="input-style" type="text" id="phone_num_1" name="phone_num_1">
                           <div v-for="(item, index) in v$.phone_num_1.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                           </div>
                        </div>
                        <div class="mb-2">
                           <label class="label-style" for="phone_num_3">{{$t('Phone number 3')}}</label>
                           <input v-model="phone_num_3" :placeholder="$t('Write agent phone number')" class="input-style" type="text" id="phone_num_3" name="phone_num_3">
                           <div v-for="(item, index) in v$.phone_num_3.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                           </div>
                        </div>
                     </div>
                     <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="mb-2">
                           <div class="label-style">{{$t('Nationality')}}</div>
                           <v-select class="select-style-modal input-style" :options="all_nationalities" v-model="select_nationality" :placeholder="$t('Choose nationality')"></v-select>
                           <div v-for="(item, index) in v$.select_nationality.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                           </div>
                        </div>
                        <div class="mb-2">
                             <label class="label-style" for="agent_address">{{$t('Address')}}</label>
                             <input v-model="agent_address" :placeholder="$t('Write agent address')" class="input-style" type="text" id="agent_address" name="agent_address">
                             <div v-for="(item, index) in v$.agent_address.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                           </div>
                        </div>
                        <div class="mb-2">
                           <label class="label-style" for="phone_num_2">{{$t('Phone number 2')}}</label>
                           <input v-model="phone_num_2" :placeholder="$t('Write agent phone number')" class="input-style" type="text" id="phone_num_2" name="phone_num_2">
                           <div v-for="(item, index) in v$.phone_num_2.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
            <div class="box-buttons-modal">
            <button v-if="operation=='add'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addAgent()">
               <div v-if="loading_loader" class="lds-dual-ring-white"></div>
               <template v-if="!loading_loader">{{$t('Add Agent')}}</template>
            </button>
            <button v-if="operation=='edit'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editAgent()">
               <div v-if="loading_loader" class="lds-dual-ring-white"></div>
               <template v-if="!loading_loader">{{$t('Edit Agent')}}</template>
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
         :items="agents_data"
         :rowsItems="[10,25,50]"
         border-cell
         table-class-name="customize-table"
         header-text-direction="left"
         body-text-direction="left"
         :loading="loading"
         theme-color="#426ab3"
        >
        <template #item-name="item">
            <div class="d-flex gap-3 align-items-center">
               <span>{{ item.name }}</span>
            </div>
        </template>
        <template #item-handle_operation="{ created_by }">
            <div v-if="created_by!=null" class="d-flex gap-3 align-items-center">
               <UserImg v-if="created_by?.image==null"></UserImg>
               <div v-if="created_by?.image!=null" class="img_user">
                     <img :src="storage_url+'/'+created_by?.image">
               </div>
               <span>{{ created_by?.full_name }}</span>
            </div>
        </template>
        <template #item-handle_nationality="{nationality}">
            <div class="d-flex gap-3 align-items-center">
               <span>{{ nationality?.translations?.name[lang] }}</span>
            </div>
        </template>
        <template #item-handle_city="{city}">
            <div class="d-flex gap-3 align-items-center">
               <span>{{ city?.translations?.name[lang] }}</span>
            </div>
        </template>
        <template #item-handle_branch="{branch}">
            <div class="d-flex gap-3 align-items-center">
               <span>{{ branch?.translations?.name[lang] }}</span>
            </div>
        </template>
        <template #item-handle_number="{phone_number_1,phone_number_2,phone_number_3}">
            <div class="zz">
               <span class="d-block">{{ phone_number_1 }}</span>
               <span class="d-block">{{ phone_number_2 }}</span>
               <span class="d-block">{{ phone_number_3 }}</span>
            </div>
        </template>
         <template #item-manage="item">
            <div class="d-flex gap-3">
               <button v-if="user?.role=='sale'" @click="deleteAgent(item)" class="btn_table" type="button">
                  <DeleteIcon class="table-icon"></DeleteIcon>
               </button>
               <button v-if="user?.role=='sale'" @click="change_selected_item(item)" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addAgent">
                  <EditIcon class="table-icon"></EditIcon>
               </button>
               <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                  <AddTaskIcon class="table-icon"></AddTaskIcon>
               </button>
            </div>
         </template>
       </EasyDataTable>
   </div>
</template>

<script>
import AddIcon from '../components/icons/AddIcon.vue';
import SearchIcon from '../components/icons/SearchIcon.vue';
import DeleteIcon from '../components/icons/DeleteIcon.vue';
import EditIcon from '../components/icons/EditIcon.vue';
import AddTaskIcon from '../components/icons/AddTaskIcon.vue'
import axios from 'axios'
import UserImg from '../components/icons/UserImg.vue';
import {api_url} from '../constants'
import useVuelidate from '@vuelidate/core';
import { required,helpers,minLength,maxLength} from '@vuelidate/validators';
import "vue-select/dist/vue-select.css";
// import FilterIcon from '../components/icons/FilterIcon.vue';
import { authHeader } from '../helpers';
import { _t } from '../helpers';
import { useLangStore } from '../stores/language';
import { useAuthStore } from '../stores/auth';
import { mapState } from 'pinia';

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
         rowsPerPage:10,
         sortBy: 'name',
         sortType: 'asc',
      },
      loading: true,
      serverItemsLength: 0,
      agents_data:[],
      operation:'add',
      // v-model for branch_name
      branch_name:'',
      // v-model for address
      address:'',
      search_name:'',
      //v-model description for create task
      description:'',
      //v-model date
      date:'',
      //v-model agent_name
      agent_name:'',
      //v-model agent_assign
      agent_assign:'',
      courses:['Course A' ,'Course B'],
      //v-model select_course
      select_course:'',
      //v-model add_agent_name
      add_agent_name:'',
      // v-model for select_emirate
      select_emirate:'',
      //v-model phone_num_1
      phone_num_1:'',
      //v-model phone_num_3
      phone_num_3:'',
      select_nationality:'',
      //v-model agent_address
      agent_address:'',
      //v-model phone_num_2
      phone_num_2:'',
      branches:[],
      all_nationalities:[],
      all_emirates:[],
      nationality_filter:null,
      searchBranchesLoading:false,
      searchNationalitiesLoading:false,
      searchEmiratesLoading:false,
      emirate_filter:null,
      select_branch:null,
      selected_item:{},
      vuelidateExternalResults: {
         add_agent_name:[],
         select_emirate:[],
         select_nationality:[],
         phone_num_2:[],
         phone_num_2:[],
         phone_num_3:[],
         agent_address:[],
      },

   }
  },
  components: { AddIcon, SearchIcon,  DeleteIcon, EditIcon, AddTaskIcon,UserImg},
   methods :{
      _t(message){return _t(message, this.$t);},
      get_agents() {
         var q = this.search_name!=''?`&q=${this.search_name}`:''
         var branch_id = (this.select_branch!=null && this.select_branch)?`&branch_id=${this.select_branch?.id}`:''
         var nationality_id = (this.nationality_filter!=null && this.nationality_filter)?`&nationality_id=${this.nationality_filter?.id}`:''
         var city_id = (this.emirate_filter!=null && this.emirate_filter)?`&city_id=${this.emirate_filter?.id}`:''
         this.loading= true,
         axios.get( `${api_url}/agents?page=${this.serverOptions.page}&per_page=${this.serverOptions.rowsPerPage}${q}${city_id}${nationality_id}${branch_id}`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.loading= false,
            this.agents_data = response.data.data;
            this.serverItemsLength = response.data.meta.total
         });
      },
      applySearch(){
         this.get_agents();
         document.querySelector('#filterBy .btn-close').click();
      },
      resetFilter(){
         this.emirate_filter=null;
         this.nationality_filter=null;
         this.select_branch=null;
         this.get_agents();
      },
      addAgent(){
         this.vuelidateExternalResults.add_agent_name=[],
         this.vuelidateExternalResults.agent_address=[],
         this.vuelidateExternalResults.select_nationality=[],
         this.vuelidateExternalResults.select_emirate=[],
         this.vuelidateExternalResults.phone_num_1=[],
         this.vuelidateExternalResults.phone_num_2=[],
         this.vuelidateExternalResults.phone_num_3=[],
         this.v$.$touch();
         if (this.v$.$invalid) {
               return;
         }
         this.loading_loader = true;
         var data = { 
               full_name:this.add_agent_name,
               phone_number_1:this.phone_num_1,
               phone_number_2:this.phone_num_2,
               phone_number_3: this.phone_num_3,
               address:this.agent_address,
               nationality_id:this.select_nationality?.id,
               city_id:this.select_emirate?.id
         };
         var formData = new FormData();
         Object.keys(data).forEach((key) => {
               if((!['phone_number_2','phone_number_3', 'address','city_id','nationality_id'].includes(key)) || (data[key] != null && data[key] !== "")){
                  formData.append(key, data[key]);
               }
         });
         // 'Content-Type': 'multipart/form-data
         axios.post(`${api_url}/agents`, formData, {
               headers: {...authHeader()}
         }).then((response) => {
               this.loading_loader = false;
               this.get_agents();
               document.querySelector('#addAgent .btn-close-modal').click();
               Toast.fire({
                  icon: 'success',
                  title: this.$t('Added')
               });
         },error=>{
               this.loading_loader = false;
               if(error.response.status==422)
               {
                  var errors = error.response.data.errors;
                  this.vuelidateExternalResults.add_agent_name=errors.full_name??[],
                  this.vuelidateExternalResults.agent_address=errors.address??[],
                  this.vuelidateExternalResults.phone_num_1=errors.phone_number_1??[],
                  this.vuelidateExternalResults.phone_num_2=errors.phone_number_2??[],
                  this.vuelidateExternalResults.phone_num_3=errors.phone_number_3??[],    
                  this.vuelidateExternalResults.select_nationality=errors.nationality_id??[],
                  this.vuelidateExternalResults.select_emirate=errors.city_id??[]        
               }
               // TODO: handle other errors
         });
      },
      editAgent(){
         this.vuelidateExternalResults.add_agent_name=[],
         this.vuelidateExternalResults.agent_address=[],
         this.vuelidateExternalResults.select_nationality=[],
         this.vuelidateExternalResults.select_emirate=[],
         this.vuelidateExternalResults.phone_num_1=[],
         this.vuelidateExternalResults.phone_num_2=[],
         this.vuelidateExternalResults.phone_num_3=[],
         this.v$.$touch();
         if (this.v$.$invalid) {
               return;
         }
         this.loading_loader = true;
         var data = { 
               full_name:this.add_agent_name,
               phone_number_1:this.phone_num_1,
               phone_number_2:this.phone_num_2,
               phone_number_3: this.phone_num_3,
               address:this.agent_address,
               nationality_id:this.select_nationality?.id,
               city_id:this.select_emirate?.id,
               _method:'PUT'
         };
         var formData = new FormData();
         Object.keys(data).forEach((key) => {
               if((!['phone_number_2','phone_number_3', 'address','city_id','nationality_id'].includes(key)) || (data[key] != null && data[key] !== "")){
                  formData.append(key, data[key]);
               }
         });
         // 'Content-Type': 'multipart/form-data
         axios.post(`${api_url}/agents/${this.selected_item?.id}`, formData, {
               headers: {...authHeader()}
         }).then((response) => {
               this.loading_loader = false;
               this.get_agents();
               document.querySelector('#addAgent .btn-close-modal').click();
               Toast.fire({
                  icon: 'success',
                  title: this.$t('Updated')
               });
         },error=>{
               this.loading_loader = false;
               if(error.response.status==422)
               {
                  var errors = error.response.data.errors;
                  this.vuelidateExternalResults.add_agent_name=errors.full_name??[],
                  this.vuelidateExternalResults.agent_address=errors.address??[],
                  this.vuelidateExternalResults.phone_num_1=errors.phone_number_1??[],
                  this.vuelidateExternalResults.phone_num_2=errors.phone_number_2??[],
                  this.vuelidateExternalResults.phone_num_3=errors.phone_number_3??[],    
                  this.vuelidateExternalResults.select_nationality=errors.nationality_id??[],
                  this.vuelidateExternalResults.select_emirate=errors.city_id??[]        
               }
               // TODO: handle other errors
         });
      },
      deleteAgent(item){
         this.$swal.fire({
            title: this.$t('Are you sure you want to delete this Agent?'),
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
                  axios.delete(`${api_url}/agents/${item.id}`, {headers: {...authHeader()}
                  }).then((response) => {
                     this.get_agents();
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
         this.v$.$reset();
         this.operation='add';
         this.add_agent_name='';
         this.select_emirate='';
         this.select_nationality='';
         this.phone_num_1='';
         this.phone_num_2='';
         this.phone_num_3='';
         this.agent_address='';
      },
      change_selected_item(value){
         this.v$.$reset();
         this.operation='edit';
         this.selected_item=value;
         this.add_agent_name=value.full_name;
         this.phone_num_1=value.phone_number_1;
         this.phone_num_2=value.phone_number_2;
         this.phone_num_3=value.phone_number_3;
         this.agent_address=value.address;
         if(value.city!=null){
            this.select_emirate=value.city;
            this.select_emirate.label=value?.city?.translations?.name[this.lang]
         }
         if(value.nationality!=null){
            this.select_nationality=value.nationality;
            this.select_nationality.label=value?.nationality?.translations?.name[this.lang]
         }
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
      searchNationalities(q = '', loading = null, force = true) {
         if(q.length==0 && ! force)
               return;
         this.all_nationalities = [];
         if(loading !== null)
               loading(true);
         else
               this.searchNationalitiesLoading = true;
         this.debounce(() => {
            q = q.length>0?"?q=" + q:'';
            axios.get(`${api_url}/countries${q}`
            ,{headers: {...authHeader()}}).then((response) => {
            this.all_nationalities = response.data.data;
            this.all_nationalities.forEach(el => {
               el.label=el?.name
               this.searchNationalitiesLoading = false;
               });
            });
            this.searchNationalitiesLoading = false;
            if(loading !== null)
               loading(false)
         }, 1000);
      },
      searchEmirates(q = '', loading = null, force = true) {
         if(q.length==0 && ! force)
               return;
         this.all_emirates = [];
         if(loading !== null)
               loading(true);
         else
               this.searchEmiratesLoading = true;
         this.debounce(() => {
            q = q.length>0?"?q=" + q:'';
            axios.get(`${api_url}/cities${q}`
            ,{headers: {...authHeader()}}).then((response) => {
               this.searchNationalities('',null,true)
            this.all_emirates = response.data.data;
            this.all_emirates.forEach(el => {
               el.label=el?.name
               this.searchEmiratesLoading = false;
               });
            });
            this.searchEmiratesLoading = false;
            if(loading !== null)
               loading(false)
            
         }, 1000);
      },
   },
   mounted(){
      this.get_agents()
      if(this.user?.role=='super_admin'){
         this.searchBranches('',null,true)
      }
      this.searchEmirates('',null,true)
   },
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
         custom_header.push({text: this.$t('Name'), value: "full_name", height:'44'})
         if(this.user?.role == 'super_admin'){
            custom_header.push({ text: this.$t('Branch'), value:"handle_branch", height:'44' })
         }
         custom_header.push({ text:this.$t('Nationality'), value: "handle_nationality", height:'44' })
         custom_header.push({ text: this.$t('Emirate'), value:"handle_city", height:'44' })
         custom_header.push({ text: this.$t('Address'), value:"address", height:'44' })
         custom_header.push({ text: this.$t('Phone Number'), value:"handle_number", height:'44' })
         custom_header.push({ text: this.$t('Operation'), value:"handle_operation", height:'44' })
         custom_header.push({ text: "", value: "manage", width:'116', height:'44' })
         return custom_header;
      }
   },
   watch:{
      serverOptions(_new,_old) {
         this.get_agents()
      },
      search_name(_new,_old) {
         this.get_agents()
      },
   },
   validations() {
      var optional = (value) => true;
      var phone_number =(value) => {
         if(!value)
            return true;
         if(value.length < 9 || value.length > 15)
            return false;
         var digits = value;
         if(value.charAt(0)=='+')
         {
            if(value.charAt(1)=='0')
            return false;
            if(!/^[1-9]+$/.test(value.charAt(1)))
            return false;
            digits = value.substr(2);
         }
         return /^[0-9]+$/.test(digits);
      };
      return {
         add_agent_name: {
            required: helpers.withMessage('_.required.name', required),
         },
         select_emirate:{optional},
         select_nationality:{optional},
         phone_num_1:{
            required: helpers.withMessage('_.required.Phone number 1', required),
            phone_number:helpers.withMessage(this.$t('phone_number_valid'),phone_number)
         },
         phone_num_2:{
            phone_number: helpers.withMessage(this.$t('phone_number_valid'),phone_number)
         },
         phone_num_3:{
            phone_number: helpers.withMessage(this.$t('phone_number_valid'),phone_number)
         },
         agent_address:{optional},
      }
   }
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
.data_table {
   margin-top: 16px;
   border-radius: 12px;
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
  min-height: 431px;
  height: 431px;
  border: none;
  /* width: 481px; */
}
.modal_content_filterBy {
   height: 410px;
   min-height: 410px;
   padding: 15px 24px;
   border-radius: 20px;
 
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
.modal_content_addAgent {
   padding: 15px 40px;
   border-radius: 20px;
   min-width: 680px;
   height: 485.6px;
   min-height: 486.6px;
}
.modal-body-addAgent {
   overflow-y: auto;
}
.modal_content_newTask {
   min-height: 527px;
   height: 527px;
}
.filter-box {
   justify-content: space-between;
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
@media(max-width:768px) {
   .modal_content_addAgent{
     min-width: 320px;
  }
}
@media(max-width:576px) { 
   /* .filter-box {
      flex-direction: column;
   } */
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
      max-height: calc(100vh - 270px);
   }
   .modal_content_addAgent{
      padding: 14px 9px;
      min-width: 298px;
   }
   .modal_content_filterBy {
      padding: 15px 8px;
   }
}
</style>