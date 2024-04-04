<template>
   <div class="main-box">    
     <div class="box-title">
        <div class="title">{{$t('Branches')}}</div>
        <button @click="init()" type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add Branch')}}</span></button>
     </div>
      <div class="filter-box">
        <div class="search-box">
           <input  @input="debounce(() => { search_name=$event.target.value; } , 1000);" class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
           <SearchIcon class="search-icon"></SearchIcon>
        </div>
        <v-select v-if="user?.role=='super_admin'" class="select-style" :options="emirates" v-model="filter_select_emirate" :placeholder="$t('Emirate: All')" ></v-select>
     </div>
     <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-style">
           <div class="modal-content modal_content">
           <div class="modal-header modal_header">
           <h5 v-if="operation == 'add'" class="modal-title modal_title" id="addModalLabel">{{$t('New branch')}}</h5>
           <h5 v-if="operation == 'edit'" class="modal-title modal_title" id="addModalLabel">{{$t('Edit branch')}}</h5>
        </div>
        <div class="modal-body modal_body">
           <form class="form-style">
            <div class="mb-2">
               <label class="label-style" for="branch-name">{{$t('Branch name en')}}</label>
               <input v-model="branch_name_en" class="input-style" type="text" id="branch-name" name="branch-name" :placeholder="$t('write branch name')">
               <div v-for="(item, index) in v$.branch_name_en.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                     <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
            <div class="mb-2">
               <label class="label-style" for="branch-name"> {{$t('Branch name ar')}}</label>
               <input v-model="branch_name_ar" class="input-style" type="text" id="branch-name" name="branch-name" :placeholder="$t('write branch name')">
               <div v-for="(item, index) in v$.branch_name_ar.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                     <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
            <div class="mb-2">
               <div class="label-style">{{$t('Emirate')}}</div>
               <v-select class="select-style-modal input-style" :options="emirates" v-model="select_emirate" :placeholder="$t('Choose emirate')"></v-select>
               <div v-for="(item, index) in v$.select_emirate.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                     <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
            <div class="mb-2">
               <label class="label-style" for="address">{{$t('Address en')}}</label>
               <input v-model="address_en" class="input-style" type="text" id="address" name="address" :placeholder="$t('write branch address')">
               <div v-for="(item, index) in v$.address_en.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                     <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
            <div class="mb-2">
               <label class="label-style" for="address">{{$t('Address ar')}}</label>
               <input v-model="address_ar" class="input-style" type="text" id="address" name="address" placeholder="write branch address">
               <div v-for="(item, index) in v$.address_ar.$errors" :key="index" class="error-msg mx-1 gap-1">
                  <div class="error-txt">
                     <i class="fa-solid fa-exclamation error-icon"></i>
                  </div>
                  <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
               </div>
            </div>
           </form>
        </div>
        <div class="box-buttons-modal">
            <button v-if="operation == 'add'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addBranch()">
               <div v-if="loading_loader" class="lds-dual-ring-white"></div>
               <template v-if="!loading_loader" >{{$t('Add Branch')}}</template>
            </button>
            <button v-if="operation == 'edit'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editBranch()">
               <div v-if="loading_loader" class="lds-dual-ring-white"></div>
               <template v-if="!loading_loader" >{{$t('Edit branch')}}</template>
            </button>
           <button ref="close_modal" type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
        </div>   
      </div>
      </div>
      </div>
      
      <EasyDataTable class="data_table"
         v-model:server-options="serverOptions"
         :server-items-length="serverItemsLength"
         :headers="headers"
         :items="branch_data"
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
               <span>{{ item.translations.name[lang] }}</span>
            </div>
        </template>
        <template #item-city="item">
            <div class="d-flex gap-3 align-items-center">
               <span>{{ item.city?.translations?.name[lang] }}</span>
            </div>
        </template>
        <template #item-address="item">
            <div class="d-flex gap-3 align-items-center">
               <span>{{ item.translations.address[lang] }}</span>
            </div>
        </template>
         <template #item-manage="item">
            <div class="d-flex gap-3 table-box-btn">
               <button @click="change_selected_item(item);deleteBranch()" class="btn_table" type="button">
                  <DeleteIcon class="table-icon"></DeleteIcon>
               </button>
               <button @click="change_selected_item(item)" class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                  <EditIcon class="table-icon"></EditIcon>
               </button>
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
import {api_url} from '../constants'
import useVuelidate from '@vuelidate/core';
import { required,helpers} from '@vuelidate/validators';
import "vue-select/dist/vue-select.css";
import { authHeader } from '../helpers';
import { mapState } from 'pinia';
import { useLangStore } from '../stores/language';
import { _t } from '../helpers'
import { useAuthStore } from '../stores/auth';


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
         v$: useVuelidate(),
         debounce: createDebounce(),
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
      branch_data:[],
      emirates:[],
      // v-model for select_emirate
      select_emirate:'',
      // v-model for branch_name
      branch_name_ar:'',
      branch_name_en:'',
      // v-model fen address
      address_ar:'',
      address_en:'',
      loading_loader:false,
      operation:'add',
      selected_item:'',
      search_name:'',
      vuelidateExternalResults: {
         branch_name_ar:[],
         branch_name_en:[],
         select_emirate:[],
         address_ar:[],
         address_en:[]
      },
      filter_select_emirate:''
   }
  },
  components: { AddIcon, SearchIcon, DeleteIcon, EditIcon},
   methods :{
      _t(message){return _t(message, this.$t);},

      get_branches() {
         this.loading=true;
         var q = this.search_name!='' ? "&q="+this.search_name : ""; 
         var city_id = this.filter_select_emirate?.id ? "&city_id="+this.filter_select_emirate?.id : "";

         axios.get( `${api_url}/branches?page=${this.serverOptions.page}&per_page=${this.serverOptions.rowsPerPage}&${q}&${city_id}`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.loading=false;
            this.branch_data = response.data.data;
            this.serverItemsLength = response.data.meta.total
         });
      },
      addBranch(){
         this.vuelidateExternalResults.branch_name_ar=[];
         this.vuelidateExternalResults.branch_name_en=[];
         this.vuelidateExternalResults.select_emirate=[];
         this.vuelidateExternalResults.address_ar=[];
         this.vuelidateExternalResults.address_en=[];
         this.v$.$touch();
         if (this.v$.$invalid) {
            return;
         }
         this.loading_loader=true;
         var data = {
            'name[en]' : this.branch_name_en,
            'name[ar]' : this.branch_name_ar,
            city_id : this.select_emirate.id,
            'address[en]' : this.address_en,
            'address[ar]' : this.address_ar
         }
         let formData = new FormData();
         Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
         });
         axios.post(`${api_url}/branches`, formData, {
            headers: {...authHeader(), 'Content-Type': 'application/json'}
         }).then((response) => {
            this.loading_loader=false;
            this.get_branches();
            this.$refs.close_modal.click();
            Toast.fire({
               icon: 'success',
               title: 'Added'
            });
         },error=>{
            this.loading_loader=false;
            if(error.response.status==422){
               var errors = error.response.data.errors;
               this.vuelidateExternalResults.branch_name_en=errors['name.en']??[];
               this.vuelidateExternalResults.branch_name_ar=errors['name.ar']??[];
               this.vuelidateExternalResults.select_emirate=errors.city_id??[];
               this.vuelidateExternalResults.address_en=errors['address.en']??[];
               this.vuelidateExternalResults.address_ar=errors['address.ar']??[];
            }
         })
      },
      choose_emirate() {
         axios.get(`${api_url}/cities`,{
            headers:{ ...authHeader() }
         }).then((response) =>{
            this.emirates =response.data.data;
            this.emirates.forEach(item => {
               item.label=item?.name
            });
         })
      },
      editBranch(){
         this.vuelidateExternalResults.branch_name_ar=[];
         this.vuelidateExternalResults.branch_name_en=[];
         this.vuelidateExternalResults.select_emirate=[];
         this.vuelidateExternalResults.address_ar=[];
         this.vuelidateExternalResults.address_en=[];
         this.v$.$touch();
         if (this.v$.$invalid) {
            return;
         }
         this.loading_loader=true;
         var data = {
            'name[en]' : this.branch_name_en,
            'name[ar]' : this.branch_name_ar,
            city_id : this.select_emirate.id,
            'address[en]' : this.address_en,
            'address[ar]' : this.address_ar,
            _method:'PUT'
         }
         let formData = new FormData();
         Object.keys(data).forEach((key) => {
            formData.append(key, data[key]);
         });
         axios.post(`${api_url}/branches/${this.selected_item?.id}`, formData, {
            headers: {...authHeader(), 'Content-Type': 'application/json'}
         }).then((response) => {
            this.loading_loader=false;
            this.get_branches();
            this.$refs.close_modal.click();
            Toast.fire({
               icon: 'success',
               title: 'Updated'
            });
         },error=>{
            this.loading_loader=false;
            if(error.response.status==422){
               var errors = error.response.data.errors;
               this.vuelidateExternalResults.branch_name_en=errors['name.en']??[];
               this.vuelidateExternalResults.branch_name_ar=errors['name.ar']??[];
               this.vuelidateExternalResults.select_emirate=errors.city_id??[];
               this.vuelidateExternalResults.address_en=errors['address.en']??[];
               this.vuelidateExternalResults.address_ar=errors['address.ar']??[];
            }
         })
      },
      init(){
         this.v$.$reset();
         this.operation = 'add';
         this.branch_name_en = '';
         this.branch_name_ar = '';
         this.select_emirate = '';
         this.address_en = '';
         this.address_ar = ''
      },
      change_selected_item(value){
         if(!value)
            return;
         console.log('value',value)
         this.selected_item = value;
         this.v$.$reset();
         this.operation = 'edit';
         this.branch_name_ar = value.translations.name.ar;
         this.branch_name_en = value.translations.name.en;
         value.city.label = value.city.translations.name[this.lang];
         this.select_emirate = value.city;
         this.address_en =  value.translations.address.en;
         this.address_ar =  value.translations.address.ar;
      },
      deleteBranch(){
         this.$swal.fire({
            title: this.$t('Are you sure you want to delete this branch?'),
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
                  axios.delete(`${api_url}/branches/${this.selected_item.id}`, {headers: {...authHeader()}
                  }).then((response) => {
                     this.get_branches();
                     Toast.fire({
                           icon: 'success',
                           title: 'Deleted'
                     });
                  })
               }
            },error=>{

            }
         );
      } 
   },
   computed:{
      ...mapState(useLangStore, {
         lang: 'language'
      }),
      ...mapState(useAuthStore, {
            user: 'user'
      }),
      headers(){
         return [
            { text: this.$t("Id"), value: "id",height:'44' },
            { text: this.$t("Name"), value: "name",height:'44' },
            { text: this.$t("Emirate"), value: "city" ,height:'44' },
            { text: this.$t("Address"), value: "address" ,height:'44' },
            { text: "", value: "manage" ,height:'44' },
         ];
      },
   },
   watch:{
      serverOptions(_new,_old) {
         this.get_branches()
      },
      search_name(newVal,oldVal){
         this.serverOptions.page = 1;
         this.get_branches();
      },
      filter_select_emirate(newVal,oldVal){
         this.serverOptions.page = 1;
         this.get_branches();
      },
   },
   validations() {
      var optional = (value) => true;
      return {
         branch_name_ar: {
            required: helpers.withMessage('_.required.branchAr', required),
         },
         branch_name_en: {
            required: helpers.withMessage('_.required.branchEn', required),
         },
         select_emirate: {
            required: helpers.withMessage('_.required.emirate', required),
         },
         address_ar: { optional
            // required: helpers.withMessage('_.required.addressAr', required),
         },
         address_en: { optional
            // required: helpers.withMessage('_.required.addressEn', required),
         }
      }
   },
   mounted(){
      this.get_branches(),
      this.choose_emirate()
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
  /* width: 481px; */
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
.select-style :deep() .vs__clear {
   margin-inline: 6px;
}
.select-style-modal :deep() .vs__clear {
   margin-inline: 6px;
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
.select-style {
   width: 230px;
}
.select-style :deep() .vs__dropdown-toggle {
    padding: 6px 8px 6px 6px;
    border-radius: 30px;
    border: 1px solid var(--primary-color);
    max-height: 42.6px;
    height: 42.6px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
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
   border-radius: 8px;
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
   max-height: calc(100vh - 301px);
   height: calc(100vh - 301px);
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
@media(max-width:576px) { 
  .filter-box {
     flex-direction: column;
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
      max-height: calc(100vh - 270px);
   }
   .select-style {
      width: 100%;
   }
   .data_table:deep() .vue3-easy-data-table__main {
      max-height: calc(100vh - 354px);
      height: calc(100vh - 354px);
  }
}


</style>