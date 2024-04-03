<template>
    <div class="main-box">
      <div class="box-title">
         <div class="title">{{ title }}</div>
         <button @click="init()" type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/><span>{{$t('Add User')}}</span></button>
      </div>
       <div class="filter-box">
         <div class="search-box">
            <input @input="debounce(() => { search_name=$event.target.value; } , 1000);" class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
            <SearchIcon class="search-icon"></SearchIcon>
         </div>
         <v-select v-if="user?.role=='super_admin'" class="select-style" :options="branches" :loading="searchBranchesLoading"  @search="searchBranches" v-model="select_branch" :placeholder="$t('Branch: All')"></v-select>
      </div>
       <!-- Modal For Add User (super admin add admin + operations +sales +add teacher) -->
      <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content">
            <div class="modal-header modal_header">
            <h5 v-if="operation=='add'" class="modal-title modal_title" id="addModalLabel">  <span> {{$t('New')}} </span> <span> {{ modal_title }} </span> </h5>
            <h5 v-if="operation=='edit'" class="modal-title modal_title" id="addModalLabel">{{ 'Edit' }} {{ modal_title }}  </h5>
         </div>
         <div class="modal-body modal_body">
            <form class="form-style">
            <div>
               <div class="mb-2">
                  <label class="label-style" for="full-name">{{$t('Full Name')}}</label>
                  <input v-model="fullName" class="input-style" type="text" id="full-name" name="name" :placeholder="$t('Write full name')">
                  <div v-for="(item, index) in v$.fullName.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                  </div>  
               </div>
               <div class="mb-2">
                  <label class="label-style" for="user-name">{{$t('User Name')}}</label>
                     <input class="input-style" type="text" id="user-name" name="user-name" :placeholder="$t('Write user name')" v-model="userName">
                     <div v-for="(item, index) in v$.userName.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                     </div>
               </div>
               <div class="mb-2">
                  <label class="label-style" for="email">{{$t('Email')}}</label>
                     <input class="input-style" type="text" id="email" name="email" :placeholder="$t('Write user name')" v-model="email">
                     <div v-for="(item, index) in v$.email.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                     </div>
               </div>
               <div class="mb-2">
                  <label class="label-style" for="password">{{$t('Password')}}</label>
                     <input class="input-style" type="password" id="password" name="password" :placeholder="$t('Enter password')" v-model="newPass" autocomplete="password">
                     <div v-for="(item, index) in v$.newPass.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                      </div>
               </div>
               <!-- teacher -->
               <div class="mb-2" v-if="type=='teacher'">
                  <div class="d-flex">
                     <label class="label-style" for="certificate">{{$t('Certificate')}}</label>
                     <span v-if="certificate" class="px-1" @click="delete_cer()" style="cursor:pointer;color:#EB5757">{{$t('delete')}}</span><a style="text-decoration: none;color: #898b8d;" v-if="certificate" class="px-1" :href="storage_url+'/'+certificate" target="_blank" >{{$t('show')}}</a>
                  </div>
                  <input class="input-style" type="file" v-on:change="change_certificate_file" ref="certificate" id="certificate" name="name" placeholder="Write certificate">
                  <div v-for="(item, index) in v$.certificate.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                  </div>
               </div>
               <div v-if="type=='admin'" class="mb-2">
                  <div class="label-style">{{$t('Role')}}</div>
                  <v-select class="select-style-modal input-style" :options="admins" v-model="admin_role" :placeholder="$t('Choose role')"></v-select>
                  <div v-for="(item, index) in v$.admin_role.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                  </div>
               </div>
               <div v-if="user?.role=='super_admin' && admin_role?.name != 'super_admin'" class="mb-2">
                  <div class="label-style">{{$t('Branch')}}</div>
                  <v-select class="select-style-modal input-style" :options="branches" v-model="branch_input" :loading="searchBranchesLoading"  @search="searchBranches" :placeholder="$t('Choose branch')"></v-select>
                  <div v-for="(item, index) in v$.branch_input.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                  </div>
               </div>
              
            </div>
            </form>
         </div>
         <div class="box-buttons-modal">
            <button v-if="operation=='add'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addUser()">
               <div v-if="loading_loader" class="lds-dual-ring-white"></div>
               <template v-if="!loading_loader">{{$t('Add User')}}</template>
            </button>
            <button v-if="operation=='edit'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editUser()">
               <div v-if="loading_loader" class="lds-dual-ring-white"></div>
               <template v-if="!loading_loader">{{$t('Edit user')}}</template>
            </button>
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
            :class="{'data_table_admin': user?.role =='super_admin', 'data_table_height':user?.role !='super_admin'}"
            v-model:server-options="serverOptions"
            :server-items-length="serverItemsLength"
            :headers="headers"
            :items="user_data"
            :rowsItems="[10,25,50]"
            border-cell
            table-class-name="customize-table"
            header-text-direction="left"
            body-text-direction="left"
            :loading="loading"
            theme-color="#426ab3"
         >
         <template #item-handle_name="{image,full_name}">
               <div class="d-flex gap-3 align-items-center">
                     <UserImg v-if="image==null"></UserImg> 
                 <div v-if="image!=null" class="img_user">
                    <img :src="storage_url+'/'+image ">
                 </div> 
                  <div>{{ full_name }}</div>
               </div>
         </template>
         <template #item-role="item">
            {{ item.role == 'admin' ? $t('admin') : $t('super_admin') }}
         </template>
         <template #item-branch="item">
            {{ item.branch.translations.name[lang]}}
         </template>
         <template #item-certificate="item">
            <a class="download_type" :href="`${storage_url}`+'/'+item?.certificate" download style="margin-inline:26px"><i class="fa fa-download"></i></a>
         </template>
            <template #item-manage="item">
                <div class="d-flex gap-3 table-box-btn">
                  <button @click="deleteUser(item)" class="btn_table" type="button">
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
   import AddIcon from '../components/icons/AddIcon.vue';
   import SearchIcon from '../components/icons/SearchIcon.vue';
   import UserImg from './icons/UserImg.vue';
   import DeleteIcon from './icons/DeleteIcon.vue';
   import EditIcon from './icons/EditIcon.vue';
   import useVuelidate from '@vuelidate/core';
   import { required,helpers, minLength, email } from '@vuelidate/validators';
   import "vue-select/dist/vue-select.css";
   import axios from 'axios';
   import {api_url,storage_url} from '../constants';
   import { authHeader } from '../helpers';
   import { useAuthStore } from '../stores/auth';
   import { mapState } from 'pinia';
   import { useLangStore } from '../stores/language';
   import { _t } from '../helpers'

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
      props:['title', 'modal_title', 'type'],
      data() {
         return {
            headers1:[],
            // type:'',
            serverOptions: {
               page: 1,
               rowsPerPage:10,
               sortBy: 'name',
               sortType: 'asc',
            },
            loading: false,
            loading_loader:false,
            serverItemsLength: 0,
            operation:'add',
            selected_item:{},
            storage_url:storage_url,
            user_data:[],
            searchBranchesLoading:false,
            check_branch:[false,false,false],
            fullName:'',
            userName:'',
            newPass:'',
            certificate:'',
            branch_input:'',
            branches:[],
            search_name:'',
            select_branch:'',
            vuelidateExternalResults: {
               fullName:[],
               userName:[],
               newPass:[],
               certificate:[],
               branch_input:[],
            },
            admins:[
               {name:'admin', label:'admin'},
               {name:'super_admin', label:'super admin'},
            ],
            admin_role:'',
            email:''
         }
      },
      components: { AddIcon, SearchIcon, UserImg, DeleteIcon, EditIcon},
      computed:{
         activeRouter(){
               return this.$route.name;
         },
         ...mapState(useAuthStore, {
            user: 'user'
        }),
         ...mapState(useLangStore, {
            lang: 'language'
         }),
         headers() {
            return this.headers1;
            // return [
            //    { text: this.$t('Name'), value: "handle_name",height:'44' },
            //    { text:this.$t('User Name') , value: "user_name" ,height:'44' },
            //    { text: "", value: "manage" ,height:'44' },
            // ];
         }
      },
      validations() {
         var full_name = (value) => {
            const regex = /^\S+ \S+$/;
            return regex.test(value)
         };
         var string_full_name =(value) => {
            const regex = /^[a-zA-Z\s]+$/;
            return regex.test(value)
         };
         var none_space =(value)=> {
            const regex = /^\S[a-z0-9.-]+$/;
            return regex.test(value)
         }
         var lower_case =(value) => {
            const regex =/^[a-z0-9.-]+$/;
            return regex.test(value)
         }
         // var if_teacher = (value) => { return !(this.type=='teacher') || value }
         var if_admin = (value) => { return !(this.type=='admin') || value }
         var if_super_admin = (value) => { return !(this.type=='super_admin') || value }
         var if_add = (value) => { return !(this.operation=='add') || value }
         var optional = (value) => true;
         return {
            fullName : {
               required: helpers.withMessage('_.required.full_name', required),
               // full_name: helpers.withMessage('full name must be two words separated by a space.',full_name),
               // string_full_name: helpers.withMessage('Please enter only alphabetic characters.',string_full_name),
            },
            userName :{
               required: helpers.withMessage('_.required.username', required),
               lower_case: helpers.withMessage('_.The username can only contains small english letters or dots or dashes' ,lower_case),
               // none_space: helpers.withMessage('Username cannot contain spaces' ,none_space)
            },
            newPass:{
               if_add: helpers.withMessage('_.required.password', if_add),
               // minLength: helpers.withMessage('_.The password must be at least 8 characters and must contains letters, numbers and symbols' ,minLength(8))
            },
            certificate:{
               // if_teacher: helpers.withMessage('Certificate is required', if_teacher),
               optional
            },
            branch_input:{
               if_super_admin: helpers.withMessage('_.required.branch', if_super_admin),
            },
            email:{optional, email},
            admin_role:{
               if_admin: helpers.withMessage('_.required.role', if_admin),
            }
         }
      },
      mounted(){
         this.searchBranches('',null,true)
         this.get_users()
         this.add_headers()
      },
      methods:{
         _t(message){return _t(message, this.$t);},
         get_users() {
            this.loading= true;
            var q = this.search_name!=''?`q=${this.search_name}`:''
            var branch_id = this.select_branch?.id ? "&branch_id="+this.select_branch?.id : "";

            axios.get( `${api_url}/users?role=${this.type}&${q}${branch_id}&page=${this.serverOptions.page}&per_page=${this.serverOptions.rowsPerPage}`,
            { headers:{
               ...authHeader()
            }
            }).then((response) => {
               this.loading= false,
               this.user_data = response.data.data;
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
         add_headers() {
            const certificate = { text: this.$t('Certificate'), value: "certificate", width:'220' ,height:'44' };
            const branch = { text: this.$t('Branch') , value: "branch.name", width:'264' ,height:'44' };
            const role = { text: this.$t('Role') , value: "role", width:'264' ,height:'44' };
            const name = { text: this.$t('Name'), value: "handle_name",height:'44' };
            const username =  { text:this.$t('User Name') , value: "user_name" ,height:'44' };
            const id =  { text:this.$t('ID') , value: "id" ,height:'44' };
            const btns = { text: "", value: "manage" ,height:'44' };

            this.headers1.splice(0, 0, id);
            this.headers1.splice(1, 0, name);
            this.headers1.splice(3, 0, username);
            if(this.type=='teacher' && this.user?.role!='super_admin') {
               this.headers1.splice(2, 0, certificate);
            }else if(this.type=='teacher' && this.user?.role=='super_admin') {
               this.headers1.splice(4, 0, certificate);
               this.headers1.splice(2, 0, branch);
            }
            else if((this.user?.role=='super_admin' || this.user?.role=='admin') && this.type=='admin'){
               this.headers1.splice(2, 0, branch);
               this.headers1.splice(5, 0, role);
            }
            else if(this.user?.role=='super_admin') {
               this.headers1.splice(2, 0, branch);
            }
            this.headers1.splice(6, 0, btns);

         },
         addUser(){
            this.vuelidateExternalResults.fullName=[],
            this.vuelidateExternalResults.userName=[],
            this.vuelidateExternalResults.newPass=[],
            this.vuelidateExternalResults.branch_input=[],
            this.vuelidateExternalResults.admin_role=[],
            this.vuelidateExternalResults.email=[]
            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }
            this.loading_loader = true;
            var data = { 
                full_name:this.fullName,
                user_name:this.userName,
                password:this.newPass,
                role: this.admin_role == '' ? this.type : this.admin_role?.name,
                branch_id:this.user?.role=='super_admin'?this.branch_input?.id:this.user?.branch?.id,
                certificate:this.type=='teacher'?this.certificate:'',
                email:this.email
            };
            var formData = new FormData();
            Object.keys(data).forEach((key) => {
                if((!['certificate','email', 'branch_id'].includes(key)) || (data[key] != null && data[key] !== "")){
                    formData.append(key, data[key]);
                }
            });
            // 'Content-Type': 'multipart/form-data
            axios.post(`${api_url}/users`, formData, {
                headers: {...authHeader()}
            }).then((response) => {
                this.loading_loader = false;
                this.get_users();
                document.querySelector('#addModal .btn-close-modal').click();
                Toast.fire({
                    icon: 'success',
                    title: 'Added'
                });
            },error=>{
                this.loading_loader = false;
                if(error.response.status==422)
                {
                    var errors = error.response.data.errors;
                    this.vuelidateExternalResults.fullName=errors.full_name??[],
                    this.vuelidateExternalResults.userName=errors.user_name??[],
                    this.vuelidateExternalResults.newPass=errors.password??[],
                    this.vuelidateExternalResults.branch_input=errors.branch_id??[],
                    this.vuelidateExternalResults.certificate=errors.certificate??[],    
                    this.vuelidateExternalResults.admin_role=errors.role??[],
                    this.vuelidateExternalResults.email=errors.email??[]        
                }
                // TODO: handle other errors
            });
        },
        editUser(){
            this.vuelidateExternalResults.fullName=[],
            this.vuelidateExternalResults.userName=[],
            this.vuelidateExternalResults.newPass=[],
            this.vuelidateExternalResults.branch_input=[],
            this.vuelidateExternalResults.email=[],
            this.v$.$touch();
            if (this.v$.$invalid) {
                return;
            }
            this.loading_loader = true;
            var data = { 
                full_name:this.fullName,
                user_name:this.userName,
                password:this.newPass,
                role: this.admin_role == '' ? this.type : this.admin_role?.name,
                branch_id:this.user?.role=='super_admin'?this.branch_input?.id:this.user?.branch?.id,
                certificate:this.type=='teacher'?this.certificate:'',
                email:this.email,
                _method:'PUT'
            };
            var formData = new FormData();
            Object.keys(data).forEach((key) => {
                if((!['certificate','password','email'].includes(key)) || (data[key] != null && data[key] !== "")){
                    formData.append(key, data[key]);
                }
            });
            // 'Content-Type': 'multipart/form-data
            axios.post(`${api_url}/users/${this.selected_item?.id}`, formData, {
                headers: {...authHeader()}
            }).then((response) => {
                this.loading_loader = false;
                this.get_users();
                document.querySelector('#addModal .btn-close-modal').click();
                Toast.fire({
                    icon: 'success',
                    title: 'Updated'
                });
            },error=>{
                this.loading_loader = false;
                if(error.response.status==422)
                {
                    var errors = error.response.data.errors;
                    this.vuelidateExternalResults.fullName=errors.full_name??[],
                    this.vuelidateExternalResults.userName=errors.user_name??[],
                    this.vuelidateExternalResults.newPass=errors.password??[],
                    this.vuelidateExternalResults.branch_input=errors.branch_id??[],
                    this.vuelidateExternalResults.certificate=errors.certificate??[]    
                    this.vuelidateExternalResults.email=errors.email??[]    
                }
                // TODO: handle other errors
            });
        },
        deleteUser(item){
         this.$swal.fire({
            title: 'Are you sure you want to delete this User?',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Delete',
            customClass: {
               title:"delete-para",
               popup:"container_alert",
               confirmButton: "button-style-alert",
               cancelButton: "button-style-alert2"
            },
            }).then((result) => {
               if (result.isConfirmed) {
                  axios.delete(`${api_url}/users/${item.id}`, {headers: {...authHeader()}
                  }).then((response) => {
                     this.get_users();
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
            this.operation='add'
            this.fullName='';
            this.userName='';
            this.newPass='';
            this.certificate='';
            this.email='';
            this.branch_input=null;
            // if(this.user?.role=='super_admin'){
            // }
            // if(this.user?.role=='admin'){
            //    this.branch_input='';
            // }
            this.admin_role = '';
            document.getElementById('certificate').value = ''
         },
         change_selected_item(value){
            this.selected_item=value;
            this.v$.$reset()
            this.operation='edit',
            this.fullName=value?.full_name;
            this.userName=value?.user_name;
            this.newPass='';
            if(value?.branch != null){
               value.branch.label=value?.branch?.translations.name[this.lang];
               this.branch_input=value?.branch;
            }
            else{
               this.branch_input=null;
            }
            // if(this.user?.role=='super_admin'){
            // }else if(this.user?.role=='admin'){
            //    this.branch_input=this.user?.branch?.id;
            // }
            this.certificate=this.type=='teacher'?value?.certificate:'';
            this.email=value?.email;
            if(this.type=='super_admin')
            {
               this.admin_role=value?.role;
            }
            else{
               this.admin_role='';
            }
            document.getElementById('certificate').value = ''
         },
         change_certificate_file(event) {
            this.certificate = event.target.files[0];
        },
        delete_cer(){
            this.certificate = null;
            document.getElementById('certificate').value = ''
        },
      },
      watch:{
         search_name(_new,_old){
            this.get_users()
         },
         select_branch(_new,_old){
            this.get_users()
         },
         serverOptions(_new,_old) {
            this.get_users()
         },
         lang(_new,_old){
            this.headers1=[]
            this.add_headers()
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
.data_table_admin :deep() .vue3-easy-data-table__main {
   max-height: calc(100vh - 301px);
   height: calc(100vh - 301px);
}
.data_table_height :deep() .vue3-easy-data-table__main {
   max-height: calc(100vh - 301px);
   height: calc(100vh - 301px);
}
 .table-icon {
    cursor: pointer;
 }
 .input-style-search {
   padding-inline: 46px;
 }
 .button-style-modal {
   padding: 12px 58px;
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
   padding: 15px 24px;
   border-radius: 20px;
}
.select-style {
   width: 200px;
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
 padding-inline: 8px;
}
.select-style :deep() .vs__clear {
   margin-inline: 6px;
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
.data_table :deep() .vue3-easy-data-table__header th {
   background-color: rgb(246 248 251);
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
.select-style :deep() .vs__dropdown-toggle {
    max-width: 182.35px;
    width: 182.35px;
 } 
}
@media(max-width:992px) {
   .main-box {
    padding: 26px 30px;
}
}
 @media(max-width:576px) { 
   .modal_content {
      padding: 15px 8px;
   }
   .filter-box {
      flex-direction: column;
   }
   .dropdown-style {
      padding: 10px 18px;
      width: 100%;
   }
   .dropdown-menu-style{
      min-width: 100%;
      top: 12px !important;
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
 .select-style {
   width: 100% !important;
 }
 .select-style :deep() .vs__dropdown-toggle {
   width: 100% !important;
   max-width: 100% !important;
 }
 .data_table_admin :deep() .vue3-easy-data-table__main {
      max-height: calc(100vh - 354px);
      height: calc(100vh - 354px);
  }
  .data_table_height :deep() .vue3-easy-data-table__main{
      max-height: calc(100vh - 354px);
      height: calc(100vh - 354px);
   }

}

 </style>