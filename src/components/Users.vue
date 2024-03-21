<template>
    <div class="main-box">    
      <div class="box-title">
         <div class="title">{{ title }}</div>
         <button type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span> Add User</span></button>
      </div>
       <div class="filter-box">
         <div class="search-box">
            <input class="input-style px-5 input-style-search" type="search" id="search" name="search" placeholder="Search..." style="border-radius: 30px;">
            <SearchIcon class="search-icon"></SearchIcon>
         </div>
         <v-select class="select-style" :options="branches" v-model="select_branch" placeholder="Branch: All"></v-select>
      </div>
       <!-- Modal For Add User (super admin add admin + operations +sales +add teacher) -->
      <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content">
            <div class="modal-header modal_header">
            <h5 class="modal-title modal_title" id="addModalLabel"> {{ modal_title }}</h5>
         </div>
         <div class="modal-body modal_body">
            <form class="form-style">
            <div>
               <div class="mb-2">
                  <label class="label-style" for="full-name">Full Name</label>
                  <input v-model="fullName" class="input-style" type="text" id="full-name" name="name" placeholder="Write full name">
                  <div v-for="(item, index) in v$.fullName.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                  </div>  
               </div>
               <div class="mb-2">
                  <label class="label-style" for="user-name">User Name</label>
                     <input class="input-style" type="text" id="user-name" name="user-name" placeholder="Write user name" v-model="userName">
                     <div v-for="(item, index) in v$.userName.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                     </div>
               </div>
               <div class="mb-2">
                  <label class="label-style" for="password">Password</label>
                     <input class="input-style" type="password" id="password" name="password" placeholder="Enter password" v-model="newPass">
                     <div v-for="(item, index) in v$.newPass.$errors" :key="index" class="error-msg mx-1 gap-1">
                        <div class="error-txt">
                           <i class="fa-solid fa-exclamation error-icon"></i>
                        </div>
                        <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                      </div>
               </div>
               <!-- teacher -->
               <div class="mb-2" v-if="title=='Teachers'">
                  <label class="label-style" for="certificate">Certificate</label>
                  <input v-model="certificate" class="input-style" type="text" id="certificate" name="name" placeholder="Write certificate">
                  <div v-for="(item, index) in v$.certificate.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                  </div>
               </div>
               <div class="mb-2">
                  <div class="label-style">Branch</div>
                  <v-select class="select-style-modal input-style" :options="branches" v-model="select_branch" placeholder="Choose branch"></v-select>
                  <div v-for="(item, index) in v$.select_branch.$errors" :key="index" class="error-msg mx-1 gap-1">
                     <div class="error-txt">
                        <i class="fa-solid fa-exclamation error-icon"></i>
                     </div>
                     <span v-if="item.$message" class="valid_msg">{{ item.$message }}</span>
                  </div>
               </div>
            </div>
            </form>
         </div>
         <div class="box-buttons-modal">
            <button type="button" class="button-style button-style-modal" @click.prevent="addUser()">Add user</button>
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
       <EasyDataTable class="data_table"
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
         <template #item-name="item">
               <div class="d-flex gap-3 align-items-center">
                  <UserImg></UserImg> 
                  <span>{{ item.name }}</span>
               </div>
         </template>
            <template #item-manage="item">
                <div class="d-flex gap-3">
                  <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#deleteModal">
                     <DeleteIcon class="table-icon"></DeleteIcon>
                  </button>
                  <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
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
   import { required,helpers, minValue } from '@vuelidate/validators';
   import "vue-select/dist/vue-select.css";
   export default {
      setup() {
         return { v$: useVuelidate()}
      },
      data() {
         return {
            role:'super-admin',
            serverOptions: {
               page: 1,
               rowsPerPage:10,
               sortBy: 'name',
               sortType: 'asc',
            },
            loading: false,
            loading_loader:false,
            serverItemsLength: 0,
            user_data:[
               {
                  name:'ww',
                  branch:'ww',
                  userName:'ww',
               },
               {
                  name:'ww',
                  branch:'ww',
                  userName:'ww',
               },
               {
                  name:'ww',
                  branch:'ww',
                  userName:'ww',
               },
               {
                  name:'ww',
                  branch:'ww',
                  userName:'ww',
               },
               {
                  name:'ww',
                  branch:'ww',
                  userName:'ww',
               },
               {
                  name:'ww',
                  branch:'ww',
                  userName:'ww',
               },
               {
                  name:'ww',
                  branch:'ww',
                  userName:'ww',
               },
            ],
            headers:[
               { text: "Name", value: "name", width:'320',height:'44' },
               { text: "Branch", value: "branch", width:'264' ,height:'44' },
               { text: "User Name", value: "userName", width:'361' ,height:'44' },
               { text: "", value: "manage", width:'116' ,height:'44' },
            ],
            check_branch:[false,false,false],
            selected_option:'',
            //v-model user full name
            fullName:'',
            //v-model user full name
            userName:'',
            //v-model user full name
            newPass:'',
            //v-model teacher certificate
            certificate:'',
            branches:['branch A','branch B','branch C'],
            select_branch:''
         }
      },
      props:['title', 'modal_title'],
      components: { AddIcon, SearchIcon, UserImg, DeleteIcon, EditIcon},
      computed:{
         activeRouter(){
               return this.$route.name;
         },
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
            const regex = /^\S+$/;
            return regex.test(value)
         }
         var lower_case =(value) => {
            const regex =/^[a-z0-9.]+$/;
            return regex.test(value)
         }
         return {
            fullName : {
               required: helpers.withMessage('Full name is required', required),
               full_name: helpers.withMessage('full name must be two words separated by a space.',full_name),
               string_full_name: helpers.withMessage('Please enter only alphabetic characters.',string_full_name),
            },
            userName :{
               lower_case: helpers.withMessage('Please enter your username using only lowercase letters.' ,lower_case),
               none_space: helpers.withMessage('Username cannot contain spaces' ,none_space)
            },
            newPass:{
               required: helpers.withMessage('Password is required', required),
               minValueValue: helpers.withMessage('Your password must be at least 8 characters long.' ,minValue(8))
            },
            certificate:{
               required: helpers.withMessage('Certificate is required', required),
            },
            select_branch :{
               required: helpers.withMessage('Branch is required', required),
            }
         }
      },
      methods:{
         addUser(){
            this.v$.$touch();
            if (this.v$.$invalid) {
               return;
            }  
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
   /* easy data table */
   /* .customize-table {
    --easy-table-border: 1px solid #E4E7EC;
    --easy-table-row-border: 1px solid #E4E7EC;
    --easy-table-header-font-size: 12px;
    --easy-table-header-height: 44px;
    --easy-table-header-font-color: #7B8190;
    --easy-table-header-background-color: rgba(66, 106, 179, 0.05);
    --easy-table-header-item-padding: 12px 24px;
    --easy-table-body-even-row-font-color: #fff;
    --easy-table-body-even-row-background-color: #0000;
    --easy-table-body-row-font-color: #3B424A;
    --easy-table-body-row-background-color: #fff;
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;
    --easy-table-body-row-hover-font-color: #2d3a4f;
    --easy-table-body-row-hover-background-color: #fff;
    --easy-table-body-item-padding: 10px 15px;
    --easy-table-footer-background-color: #fff;
    --easy-table-footer-font-color: #3B424A;
    --easy-table-footer-font-size: 12px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 52px;
    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 5px;
    --easy-table-rows-per-page-selector-z-index: 1;
    --easy-table-scrollbar-track-color: #7b8190;
    --easy-table-scrollbar-color: #7b8190;
    --easy-table-scrollbar-thumb-color: var(--primary-color);
} */
.data_table {
    margin-top: 16px;
    border-radius: 12px;
 }
 .data_table :deep() .vue3-easy-data-table__main.border-cell .vue3-easy-data-table__body td {
    border-right: none !important;
    padding: 16px 24px;
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
 .table-icon {
    cursor: pointer;
 }
 .input-style-search {
   padding-right: 10px !important;
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
   max-height: 600px;
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
   max-height: calc(100vh - 284px);
}
.data_table :deep() .vue3-easy-data-table__header th {
   background-color: rgb(246 248 251);
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
 .data_table :deep() .vue3-easy-data-table__main {
   max-height: calc(100vh - 337px);
}

}

 </style>