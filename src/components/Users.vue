<template>
    <div class="main-box">    
       <div class="box-title">
          <div class="title">{{ title }}</div>
          <button type="button" class="button-style button-style-add" :class="{'d-none' :activeRouter=='agents'}" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{ button_text }}</span></button>
       </div>
       <div class="filter-box">
          <div class="search-box">
             <input class="input-style px-5 input-style-search" type="search" id="search" name="search" placeholder="Search..." style="border-radius: 30px;">
             <SearchIcon class="search-icon"></SearchIcon>
          </div>
          <div v-if="role=='super-admin'" class="dropdown dropdown-style" :class="{'d-none' :activeRouter=='branches'}" @click="rotate_dropdown[0]=!rotate_dropdown[0]">
             <button class="btn dropdown-toggle dropdown_btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
               <div>
                  <span class="firs-span">Branch</span>
                   <span class="sec-span">: All</span>
               </div>
               <ArrowIcon class="arrow-icon-branch" :class="{'rotate-style' : rotate_dropdown[0], 'rotate-style-2': !rotate_dropdown[0]}"></ArrowIcon>
             </button>
             <ul class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item li-style" href="#">Branch A</a></li>
                <li><a class="dropdown-item li-style" href="#">Branch B</a></li>
             </ul>
          </div>
          <!--superAdmin/Agents  Admins/Agents + Sales/Agents -->
          <div v-if="activeRouter=='agents'" class="dropdown dropdown-style" @click="rotate_dropdown[1]=!rotate_dropdown[1]">
             <button class="btn dropdown-toggle dropdown_btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
               <div>
                  <span class="firs-span">Nationality</span>
                   <span class="sec-span">: All</span>
               </div>
               <ArrowIcon class="arrow-icon-branch" :class="{'rotate-style' : rotate_dropdown[1], 'rotate-style-2': !rotate_dropdown[1]}"></ArrowIcon>
             </button>
             <ul class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item li-style" href="#">Syrian1</a></li>
                <li><a class="dropdown-item li-style" href="#">Syrian2</a></li>
             </ul>
          </div>
         <!-- Admins/Agents + Sales/Agents -->
         <div v-if="activeRouter=='agents'" class="dropdown dropdown-style" @click="rotate_dropdown[2]=!rotate_dropdown[2]">
             <button class="btn dropdown-toggle dropdown_btn" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
               <div>
                  <span class="firs-span">Emirate</span>
                   <span class="sec-span">: All</span>
               </div>
               <ArrowIcon class="arrow-icon-branch" :class="{'rotate-style' : rotate_dropdown[2], 'rotate-style-2': !rotate_dropdown[2]}"></ArrowIcon>
             </button>
             <ul class="dropdown-menu dropdown-menu-style" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item li-style" href="#">Dubai1</a></li>
                <li><a class="dropdown-item li-style" href="#">Dubai2</a></li>
             </ul>
          </div>
        </div>
       <!-- Modal For Add User (super admin add admin + operations +sales +add teacher) -->
       <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
       <div class="modal-dialog modal-dialog-centered modal-dialog-style">
          <div class="modal-content modal_content">
             <div class="modal-header modal_header">
             <!-- <h5 class="modal-title modal_title" id="addModalLabel">New Admin</h5> -->
             <!-- add operation employee -->
             <h5 v-if="false" class="modal-title modal_title" id="addModalLabel"> New operation employee</h5>
             <!-- add sales employee -->
             <h5 v-if="false" class="modal-title modal_title" id="addModalLabel"> New sales employee</h5>
             <!-- add New teacher -->
             <h5 v-if="false" class="modal-title modal_title" id="addModalLabel"> New teacher</h5>
              <!-- add Branch For Super Admin -->
              <h5 class="modal-title modal_title" id="addModalLabel"> New Branch</h5>      
         </div>
             <div class="modal-body modal_body p-0">
                <form class="form-style">
                  <div v-if="false">
                     <div class="mb-2">
                        <label class="label-style" for="full-name">Full Name</label>
                        <input v-model="fullName" class="input-style" type="text" id="full-name" name="name" placeholder="Write full name">
                        <div class="error-msg mx-1">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span>Incorrect username</span>
                           </div>
                     </div>
                     <div class="mb-2">
                        <label class="label-style" for="user-name">User Name</label>
                         <input class="input-style" type="text" id="user-name" name="user-name" placeholder="Write user name" v-model="userName">
                        <div class="error-msg">
                           <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                           </div>
                           <span>Incorrect username</span>
                        </div>
                     </div>
                     <div class="mb-2">
                        <label class="label-style" for="password">Password</label>
                           <input class="input-style" type="password" id="password" name="password" placeholder="Enter password" v-model="password">
                           <div v-if="true" class="error-msg">
                              <div class="error-txt">
                                 <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span>Incorrect username</span>
                           </div> 
                     </div>
                     <div class="mb-2">
                          <label class="label-style" for="certificate">Certificate</label>
                          <input v-model="fullName" class="input-style" type="text" id="certificate" name="name" placeholder="Write certificate">
                          <div class="error-msg mx-1">
                                <div class="error-txt">
                                   <i class="fa-solid fa-exclamation error-icon"></i>
                                </div>
                                <span>Incorrect username</span>
                             </div>
                       </div>
                     <div class="mb-2">
                       <div class="label-style">Branch</div>
                        <div class="dropdown dropdown-style-modal input-style">
                           <button @click="rotate=!rotate" class="btn dropdown-toggle dropdown_btn_modal" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                              <span style="color:#8080806b;">
                                <span>{{selected_option !=='' ? selected_option : 'Choose branch'}} </span>
                                </span>
  
                              <ArrowIcon :class="{'rotate-style' : rotate, 'rotate-style-2': !rotate}" class="arrow-icon"></ArrowIcon>
                           </button>
                           <ul class="dropdown-menu dropdown-menu-style-modal" aria-labelledby="dropdownMenuButton1">
                                 <li  v-for="i in 3" :key="i" @click="check_branch[0]=!check_branch[0];selected_option='Branch Z'" class="dropdown-item li-style-modal"> <span :class="{ 'secondary-color' : check_branch[0]==true }">Branch A</span> <CheckIcon v-if="check_branch[0]==true" class="check-icon-modal"></CheckIcon> </li>
                           </ul>
                        </div>
                     </div>
                  </div>
                   <!-- Branches Status -->
                   <div>
                     <div class="mb-2">
                         <label class="label-style" for="branch-name">Branch name</label>
                         <input v-model="fullName" class="input-style" type="text" id="branch-name" name="branch-name" placeholder="write branch name">
                         <div class="error-msg mx-1">
                               <div class="error-txt">
                                  <i class="fa-solid fa-exclamation error-icon"></i>
                               </div>
                               <span>Incorrect username</span>
                            </div>
                      </div>
                      <div class="mb-2">
                        <div class="label-style">Emirate</div>
                         <div class="dropdown dropdown-style-modal input-style">
                            <button @click="rotate=!rotate" class="btn dropdown-toggle dropdown_btn_modal" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                               <span style="color:#8080806b;">
                                 <span>{{selected_emirate !=='' ? selected_emirate : 'Choose emirate'}} </span>
                                 </span>
                               <ArrowIcon :class="{'rotate-style' : rotate, 'rotate-style-2': !rotate}" class="arrow-icon"></ArrowIcon>
                            </button>
                            <ul class="dropdown-menu dropdown-menu-style-modal" aria-labelledby="dropdownMenuButton1">
                                  <li  v-for="i in 3" :key="i" @click="check_branch_emirate[0]=!check_branch_emirate[0];selected_emirate='Dubai'" class="dropdown-item li-style-modal"> <span :class="{ 'secondary-color' : check_branch_emirate[0]==true }">Dubai</span> <CheckIcon v-if="check_branch_emirate[0]==true" class="check-icon-modal"></CheckIcon> </li>
                            </ul>
                         </div>
                         <div class="error-msg mx-1">
                               <div class="error-txt">
                                  <i class="fa-solid fa-exclamation error-icon"></i>
                               </div>
                               <span>Incorrect username</span>
                            </div>
                      </div>
                      <div class="mb-2">
                         <label class="label-style" for="branch-address">Address</label>
                         <input v-model="fullName" class="input-style" type="text" id="branch-address" name="branch-address" placeholder="write branch address">
                         <div class="error-msg mx-1">
                               <div class="error-txt">
                                  <i class="fa-solid fa-exclamation error-icon"></i>
                               </div>
                               <span>Incorrect username</span>
                            </div>
                      </div>
                   </div>
                </form>
             </div>
             <div class="box-buttons-modal">
                <!-- <button type="button" class="button-style button-style-modal">Add user</button> -->
                <!-- <button type="button" class="button-style">Add teacher</button> -->
                <!-- Add Branch Super Admin -->
                <button  class="button-style button-style-modal">Add Branch</button>
                <button type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">Cancel</button>
             </div>   
          </div>
       </div>
       </div>
       <!-- modal for delete member -->
       <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
             <div class="modal-content modal_content">
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
            :headers="headers_data"
            :items="user_data"
            :theme-color="theme_color"
            :rowsItems="[10,25,50]"
            border-cell
            table-class-name="customize-table"
            header-text-direction="left"
            body-text-direction="left"
            :loading="loading"
            :user_data="user_data"
            :zz="zz"
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
                  <!-- Sales/Agents -->
                  <!-- <button class="btn_table" type="button" data-bs-toggle="modal" data-bs-target="#addModal">
                     <AddTaskIcon class="table-icon"></AddTaskIcon>
                  </button> -->
                </div>
            </template>
        </EasyDataTable>
    </div>
 </template>
 
 <script>
import AddIcon from '../components/icons/AddIcon.vue';
import SearchIcon from '../components/icons/SearchIcon.vue';
import ArrowIcon from '../components/icons/ArrowIcon.vue';
import CheckIcon from './icons/CheckIcon.vue';
import UserImg from './icons/UserImg.vue';
import DeleteIcon from './icons/DeleteIcon.vue';
import EditIcon from './icons/EditIcon.vue';
import AddTaskIcon from './icons/AddTaskIcon.vue';

export default {
   data() {
      return {
            rotate:false,
            check_branch:[false,false],
            check_branch_emirate:[false,false],
            rotate_dropdown :[false,false,false],
            selected_option :'',
            selected_emirate:'',
            role:'super-admin',
            serverOptions: {
               page: 1,
               rowsPerPage:10,
               sortBy: 'name',
               sortType: 'asc',
            },
            loading: false,
            loading_loader:false,
            serverItemsLength: 30,
      }
   },
   props:['title', 'button_text', 'headers_data', 'user_data'],
   components: { AddIcon, SearchIcon, ArrowIcon, CheckIcon, UserImg, DeleteIcon, EditIcon, AddTaskIcon },
   computed:{
        activeRouter(){
            return this.$route.name;
        },
    },
}
 </script>
 
 <style scoped>
   .rotate-style {
      transform: rotate(-90deg);
      transition: 0.4s;
   }
   .rotate-style-2 {
      transform: rotate(90deg);
      transition: 0.4s;
   }
   .check-icon-modal :deep() path {
      fill: var(--secondary-color);
   }
   .arrow-icon :deep() path {
      stroke: #7B8190;
   }
   .arrow-icon-branch :deep() path {
      stroke: var(--primary-color);
   }
   .dropdown-style {
      padding: 2px 12px;
      border-radius: 30px;
      background-color: transparent;
      border: 1px solid var(--primary-color);
      width: 180px;
      display: flex;
      justify-content: center;
   }
   .dropdown-menu-style{
      width: 94px !important;
      top: 3px !important;
      left: -21px !important;
   }
   .dropdown_btn {
      border: none;
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
      padding: 0px;
   }
   .dropdown_btn:after {
      display: none;
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
   .dropdown-menu-style {
      border-radius: 20px;
      box-shadow: 0px 0px 16px 0px #415C9933;
      padding: 16px 12px;
      width: 133px;
      min-width: 179px;
      padding: 16px 0px 16px 22px;
      left: -12px !important;
   }
   .dropdown-item:hover{
      background-color: white;
   }
   .dropdown-menu-style li {
      font-size: 12px;
   }
   .li-style {
      font-weight: 400;
      color: var(--main-color); 
      display: flex;
      text-decoration: none;
      padding-left: 9px;
      padding-inline: 0px;
      max-width: 100%;
      text-wrap: wrap;
   }
   .li-style .dropdown-item {
      padding: 0px;
   }
   .li-style-modal .dropdown-item {
      padding: 0px;
   }
   .li-style:hover{
      color: var(--primary-color);
   }
   .secondary-color {
      color: var(--secondary-color);
   }
   /* easy data table */
   .customize-table {
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
}
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
 .data_table :deep() .easy-data-table__rows-selector ul.select-items li.selected {
    background-color: var(--primary-color);
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
   max-height: 96px;
   overflow-y: auto;
 }
 .input-style-search {
   padding-right: 10px !important;
 }
 .button-style-modal {
   padding: 12px 58px;
 }
 /* .modal-dialog-style {
   min-height: 500px;
 } */
 /* end style easy data table */
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
 .modal_content {
    padding: 15px 12px;
 }

.box-buttons-modal {
   gap: unset;
   justify-content: space-between;
}
}

 </style>