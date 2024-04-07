<template>
   <div class="main-box">    
      <div class="box-title">
         <div class="title">{{$t('Agents')}}</div>
         <button type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addAgent">
            <AddIcon/>
             <span>{{$t('Add Agent')}}</span>
         </button>
      </div>
      <div class="filter-box">
        <div class="search-box">
           <input class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
           <SearchIcon class="search-icon"></SearchIcon>
        </div>
        <!-- <button type="button" class="button-style button-style-add" style="padding-inline: 24px;" data-bs-toggle="modal" data-bs-target="#filterBy">
           <FilterIcon></FilterIcon>
           <span>Filter By</span> 
         </button> -->
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
                        <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <label class="label-style" for="date">Due date</label>
                     <input v-model="date" class="input-style" type="date" id="date" name="date">
                     <!-- <div v-for="(item, index) in v$.date.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <label class="label-style" for="agent">Agent</label>
                     <input v-model="agent_name" placeholder="Agent name" class="input-style" type="text" id="agent" name="agent">
                     <!-- <div v-for="(item, index) in v$.agent_name.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <label class="label-style" for="agent_assign">Assign to</label>
                     <input v-model="agent_assign" placeholder="employee name" class="input-style" type="text" id="agent_assign" name="agent_assign">
                     <!-- <div v-for="(item, index) in v$.agent_assign.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                     </div> -->
                  </div>
                  <div class="mb-2">
                     <div class="label-style">Course</div>
                        <v-select class="select-style-modal input-style" :options="courses" v-model="select_course" placeholder="Choose course"></v-select>
                        <!-- <div v-for="(item, index) in v$.select_course.$errors" :key="index" class="error-msg mx-1 gap-1">
                           <div class="error-txt">
                              <i class="fa-solid fa-exclamation error-icon"></i>
                           </div>
                           <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
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
      <!-- modal for filter by -->
      <div class="modal fade" id="filterBy" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content_filterBy">
               <div class="modal-header modal_header">
               <h5 class="modal-title modal_title" id="addModalLabel" style="margin: unset; margin-left: auto;">Filter By</h5>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body modal_body px-3">
               <v-select class="select-style-modal input-style mb-2" :options="branches" v-model="select_branch" placeholder="Branch: All"></v-select>
               <!-- admins + sales  -->
               <v-select class="select-style-modal input-style mb-2" :options="all_nationalities" v-model="nationality_filter" placeholder="Nationality: All"></v-select>
               <v-select class="select-style-modal input-style mb-2" :options="all_emirates" v-model="emirate_filter" placeholder="Emirate: All"></v-select> 
            </div>
            <div class="box-buttons-modal">
               <button  class="button-style button-style-modal">apply</button>
               <button type="button" class="button-style button-style-2  button-style-modal">reset</button> 
            </div>   
            </div>
         </div>
      </div>
      <!-- Modal For Add Agent -->
      <div class="modal fade" id="addAgent" tabindex="-1" aria-labelledby="addAgentModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered justify-content-center">
           <div class="modal-content modal_content_addAgent">
              <div class="modal-header modal_header">
                 <h5 class="modal-title modal_title">{{$t('New Agent')}}</h5>
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
                              <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                           </div>
                        </div>
                        <div class="mb-2">
                           <div class="label-style">{{$t('Emirate')}}</div>
                           <v-select class="select-style-modal input-style" :options="all_emirates" v-model="select_emirate" :placeholder="$t('Choose emirate')"></v-select>
                        </div>          
                        <div class="mb-2">
                           <label class="label-style" for="phone_num_1">{{$t('Phone number 1')}}</label>
                           <input v-model="phone_num_1" :placeholder="$t('Write agent phone number')" class="input-style" type="number" id="phone_num_1" name="phone_num_1">
                           <div v-for="(item, index) in v$.phone_num_1.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                           </div>
                        </div>
                        <div class="mb-2">
                           <label class="label-style" for="phone_num_3">{{$t('Phone number 3')}}</label>
                           <input v-model="phone_num_3" :placeholder="$t('Write agent phone number')" class="input-style" type="number" id="phone_num_3" name="phone_num_3">
                        </div>
                     </div>
                     <div class="col-lg-6 col-md-6 col-sm-6">
                        <div class="mb-2">
                           <div class="label-style">{{$t('Nationality')}}</div>
                           <v-select class="select-style-modal input-style" :options="all_nationalities" v-model="select_nationality" :placeholder="$t('Choose nationality')"></v-select>
                        </div>
                        <div class="mb-2">
                             <label class="label-style" for="agent_address">{{$t('Address')}}</label>
                             <input v-model="agent_address" :placeholder="$t('Write agent address')" class="input-style" type="text" id="agent_address" name="agent_address">
                        </div>
                        <div class="mb-2">
                           <label class="label-style" for="phone_num_2">{{$t('Phone number 2')}}</label>
                           <input v-model="phone_num_2" :placeholder="$t('Write agent phone number')" class="input-style" type="number" id="phone_num_2" name="phone_num_2">
                        </div>
                     </div>
                  </div>
               </form>
            </div>
            <div class="box-buttons-modal">
               <button  class="button-style button-style-modal" @click="addAgent"> {{$t('Add agent')}}</button>
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
        <template #item-handle_number="{phone_number_1,phone_number_2,phone_number_3}">
            <div class="zz">
               <span class="d-block">{{ phone_number_1 }}</span>
               <span class="d-block">{{ phone_number_2 }}</span>
               <span class="d-block">{{ phone_number_3 }}</span>
            </div>
        </template>
         <!-- <template #item-manage="item">
            <div class="d-flex gap-3">
               <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">
                  <DeleteIcon class="table-icon"></DeleteIcon>
               </button>
               <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addAgent">
                  <EditIcon class="table-icon"></EditIcon>
               </button>
               <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                  <AddTaskIcon class="table-icon"></AddTaskIcon>
               </button>
            </div>
         </template> -->
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
import {api_url} from '../constants'
import useVuelidate from '@vuelidate/core';
import { required,helpers} from '@vuelidate/validators';
import "vue-select/dist/vue-select.css";
import FilterIcon from '../components/icons/FilterIcon.vue';
import { authHeader } from '../helpers';
import { _t } from '../helpers';
import { useLangStore } from '../stores/language';
import { useAuthStore } from '../stores/auth';
import { mapState } from 'pinia';

export default {
   setup() {
     return { v$: useVuelidate()}
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
      // v-model for branch_name
      branch_name:'',
      // v-model for address
      address:'',
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
      nationality_filter:'',
      emirate_filter:'',
      select_branch:''

   }
  },
  components: { AddIcon, SearchIcon,  DeleteIcon, EditIcon, AddTaskIcon, FilterIcon},
   methods :{
      get_agents() {
         this.loading= true,
         axios.get( `${api_url}/agents?page=${this.serverOptions.page}&per_page=${this.serverOptions.rowsPerPage}`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.loading= false,
            this.agents_data = response.data.data;
            this.serverItemsLength = response.data.meta.total
         });
      },
      get_branches() {
         axios.get( `${api_url}/branches`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.branches = response.data.data;
            this.branches.forEach(item => {
               item.label=item?.name
            });
         });
      },
      get_nationality() {
         axios.get( `${api_url}/countries`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.all_nationalities = response.data.data;
            this.all_nationalities.forEach(item => {
               item.label=item?.name
            });
         });
      },
      get_emirate() {
         axios.get( `${api_url}/cities`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.all_emirates = response.data.data;
            this.all_emirates.forEach(item => {
               item.label=item?.name
            });
         });
      },
      addAgent(){
         this.v$.$touch();
         if (this.v$.$invalid) {
            return;
         }  
      },
   },
   mounted(){
      this.get_agents()
      this.get_branches()
      this.get_nationality()
      this.get_emirate()
   },
   computed:{
      ...mapState(useAuthStore, {
         user: 'user'
      }),
      ...mapState(useLangStore, {
         lang: 'language'
      }),
      headers() {
         return [
            { text: this.$t('ID'), value: "id",height:'44' },
            { text: this.$t('Name'), value: "full_name",height:'44' },
            { text: this.$t('branch'), value: "branch.name",height:'44' },
            { text: this.$t('Nationality') , value: "nationality.nationality",height:'44' },
            { text: this.$t('Emirate') , value: "city.name" ,height:'44' },
            { text: this.$t('Address') , value: "address",height:'44' },
            { text: this.$t('Phone Number') , value: "handle_number",height:'44' },
         ]
      }
   },
   watch:{
      serverOptions(_new,_old) {
         this.get_agents()
      }
   },
   validations() {
      return {
         add_agent_name: {
            required: helpers.withMessage('The name  field is required', required),
         },
         phone_num_1: {
            required: helpers.withMessage('The number field is required', required),
         },
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