<template>
    <!-- Modal for Create Task For Agent -->
    <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-dialog-style">
         <div class="modal-content modal_content modal_content_newTask">
            <div class="modal-header modal_header">
            <h5 class="modal-title modal_title" id="addModalLabel">{{$t('New Task')}}</h5>
        </div>
            <div class="modal-body modal_body px-3">
               <form class="form-style">
                  <div class="mb-2">
                      <label class="label-style" for="task_title">{{$t('Title')}}</label>
                      <input v-model="task_title" class="input-style" type="text" id="task_title" name="task_title" :placeholder="$t('Write task title')">
                      <div v-if="task_validation=='task'" v-for="(item, index) in v$_2.task_title.$errors" :key="index" class="error-msg mx-1 gap-1">
                          <div class="error-txt">
                          <i class="fa-solid fa-exclamation error-icon"></i>
                          </div>
                          <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                      </div>
                  </div>
                  <div class="mb-2">
                      <label class="label-style" for="file">{{$t('Description')}}</label>
                      <textarea v-model="task_description" class="input-style" id="description" name="description" rows="3" cols="45"  :placeholder="$t('Write task description')" style="height: unset;">
                      </textarea>
                      <!-- <div v-for="(item, index) in v$_2.task_description.$errors" :key="index" class="error-msg mx-1 gap-1">
                          <div class="error-txt">
                          <i class="fa-solid fa-exclamation error-icon"></i>
                          </div>
                          <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                      </div> -->
                  </div>
                  <div class="mb-2">
                      <label class="label-style" for="">{{$t('Due date')}}</label>
                      <div class="row">
                        <div class="col-lg-6">
                          <input v-model="task_date" class="input-style fieldDate" type="date" id="task_title" name="task_date">
                          <div v-if="task_validation=='task'" v-for="(item, index) in v$_2.task_date.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                              <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <input v-model="task_time" class="input-style" type="time" id="task_time" name="task_time">
                          <div v-if="task_validation=='task'" v-for="(item, index) in v$_2.task_time.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                              <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                          </div>
                        </div>
                      </div>
                  <div>
                      </div>
                  </div>
                  <div class="mb-2">
                      <label class="label-style" for="Agent">{{$t('Status')}}</label>
                      <v-select class="select-style-modal input-style mb-2" :options="[ {label:$t('To Do'),id:'to_do'},{label:$t('In Progress'),id:'in_progress'},{label:$t('Done'),id:'done'}]" v-model="select_status" :placeholder="$t('Choose task status')"></v-select>          
                      <div v-if="task_validation=='task'" v-for="(item, index) in v$_2.select_status.$errors" :key="index" class="error-msg mx-1 gap-1">
                          <div class="error-txt">
                          <i class="fa-solid fa-exclamation error-icon"></i>
                          </div>
                          <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                      </div>
                  </div>
                </form>
            </div>
            <div class="box-buttons-modal">
                <button :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="addTask()">
                  <div v-if="loading_loader" class="lds-dual-ring-white"></div>
                  <template v-if="!loading_loader">{{$t('Add task')}}</template>
                </button>
                <button type="button" class="button-style button-style-2 btn-close-modal button-style-modal" data-bs-dismiss="modal" aria-label="Close">{{$t('Cancel')}}</button>
            </div>   
         </div>
      </div>
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
import {api_url,storage_url} from '../constants'
import useVuelidate from '@vuelidate/core';
import { required,helpers,minLength,maxLength} from '@vuelidate/validators';
import "vue-select/dist/vue-select.css";
import FilterIcon from '../components/icons/FilterIcon.vue';
import { authHeader } from '../helpers';
import { _t } from '../helpers';
import { useLangStore } from '../stores/language';
import { useAuthStore } from '../stores/auth';
import { mapState } from 'pinia';

export default{
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
         v$_2: useVuelidate(),
      }
   },
   props:['selected_item','task_validation'],
    data(){
        return{
            task_description:'',
            task_date:'',
            task_title:'',
            task_time:'',
            select_status:'',
            loading_loader:false,
            vuelidateExternalResults: {
				task_title:[],
				task_description:[],
				task_date:[],
				task_time:[],
				select_status:[],
			},
        }
    },
    validations(){
        if(this.task_validation=='task'){
            return{
                task_title : {
                    required: helpers.withMessage('_.required.title', required),
                },
                task_date :{
                    required: helpers.withMessage('_.required.date', required),
                },
                task_time :{
                    required: helpers.withMessage('_.required.time', required),
                },
                select_status :{
                    required: helpers.withMessage('_.required.status', required),
                }
            }
        }
    },
    mounted(){
        document.querySelectorAll('.fieldDate').forEach(element => {
			element.min= new Date().toISOString().split("T")[0];
		});
    },
    methods:{
        _t(message){return _t(message, this.$t);},
        addTask(){
			this.vuelidateExternalResults.task_title=[],
			this.vuelidateExternalResults.task_description=[],
			this.vuelidateExternalResults.task_date=[],
			this.vuelidateExternalResults.task_time=[],
			this.vuelidateExternalResults.select_status=[],

			this.v$_2.$touch();
			if (this.v$_2.$invalid) {
				return;
			}
			this.loading_loader = true;
			var data = { 
				title:this.task_title,
				description:this.task_description,
				agent_id:this.selected_item?.id,
				date:this.task_date,
				time:this.task_time,
				status:this.select_status?.id,
			};
			var formData = new FormData();
			Object.keys(data).forEach((key) => {
				if((!['description'].includes(key)) || (data[key] != null && data[key] !== "")){
					formData.append(key, data[key]);
				}
			});
			// 'Content-Type': 'multipart/form-data
			axios.post(`${api_url}/tasks`, formData, {
				headers: {...authHeader()}
			}).then((response) => {
				this.loading_loader = false;
				Toast.fire({
					icon: 'success',
					title: this.$t('Added')
				});
				document.querySelector('#addModal .btn-close-modal').click();
			},error=>{
				this.loading_loader = false;
				if(error.response.status==422)
				{
					var errors = error.response.data.errors;
					this.vuelidateExternalResults.file=errors.file??[],
					this.vuelidateExternalResults.student_add_edit=errors.student_id??[]
				}
				// TODO: handle other errors
			});
      	},
    }

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
/* .data_table :deep() .easy-data-table__rows-selector {
   margin-right: 0px;
} */
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
@media(max-width:768px) {
   .modal_content_addAgent{
     min-width: 320px;
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
   .button-style {
    padding: 7px 19px;
   }
   .button-style-filter {
         padding: 7px;
      }
   .modal_content_filterBy {
      padding: 15px 8px;
   }
   
}
</style>