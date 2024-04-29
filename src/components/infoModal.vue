<template>
    <div class="modal fade info_modal" id="LessonInfo" tabindex="-1" aria-labelledby="LessonInfoLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content_lesson_info">
                <div class="modal-header modal_header m-auto lesson-det">
                    <span>{{selected_item?.full_name}} </span> <span class="px-1"> {{$t('Info')}}</span>
                </div>
                <div class="modal-body modal_body">
                    <p>{{ selected_item?.info }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    props:['selected_item']
}
</script>
<style scoped>
.vue3-easy-data-table {
   z-index: 0 !important;
}
.img_user {
   width: 20px;
   height: 20px;
}
.img_user img {
   width: 100%;
   height: 100%;
   object-fit: cover; 
}
.not-found {
   display: flex;
   justify-content: center;
   align-items:center;
   flex-direction:column;
   margin-top: 20px;
}
.data_table:deep() .shadow {
   box-shadow: none!important;
}
.box-modal {
    display: flex;
}
.no-lesson {
   font-weight :500px;
   color :var(--main-color);
   margin-top:16px;
   margin-bottom:24px;
}
.details_box {
   background-color: white;
   padding: 24px 20px;
   border-radius: 30px;
}
.add-btn {
   cursor: pointer;
}
.sec-head {
   display: flex;
   justify-content: space-between;
}
.sec-head-2 {
   display: flex;
   gap: 24px;
}
.box-title {
   justify-content: unset;
   gap: 16px;
}
.user-img {
   width: 20px;
   height: 20px;
   border-radius: 30px;
}
.add-icon :deep() path {
   stroke: var(--primary-color);
}
.user-img img {
   object-fit: cover;
}
.det_title {
   font-size: 20px;
   font-weight: 600;
   color: var(--main-color);
   margin:8px 0px 16px 0px;
}
.lessons {
   font-weight: 600;
   font-size: 20px;
   color: var(--main-color);
}
.info-flex {
   display: flex;
   gap: 16px;
}
.arrow-icon {
   color: #3B424A;

}
.edit {
   font-size: 16px;
   font-weight: 400;
   color: var(--primary-color);
}
.edit_icon :deep() path {
   stroke: var(--primary-color);
}
.edit_icon {
   width: 15px;
   height: 15px;
}

.user_img {
   width: 20px;
   height: 20px;
}
.info {
   color: #7B8190;
   font-size: 14px;
   font-weight: 400;
   text-align: justify;
}
.modal_content {
min-height: 533px;
height: 533px;
}
.modal_body {
overflow-y: auto;
}
.label-style {
   display: block;
   margin: auto;
   position: relative;
   margin-bottom: 4px;
   margin-left: 0px;
}
.edit-btn {
   cursor: pointer;
}
.input-style {
   padding-inline: 16px;
   border-radius: 8px;
}
.button-style-modal {
 padding: 12px 58px;
 text-wrap:nowrap;
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
.button-style-modal {
 padding: 12px 58px;
 text-wrap:nowrap;
}
.add{
   font-size: 16px;
   font-weight: 400;
   color: var(--primary-color);

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
.data_table_admin :deep() .vue3-easy-data-table__main {
  max-height: calc(100vh - 302px);
  height: calc(100vh - 302px);
}
.data_table_height :deep() .vue3-easy-data-table__main {
  max-height: calc(100vh - 302px);
  height: calc(100vh - 302px);
}
.required-icon :deep() path {
 fill: red;
}
.lesson-det {
   font-weight: bold;
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
[data-direction = rtl] .data_table :deep() .previous-page__click-button {
  transform: rotate(180deg);

}
[data-direction = rtl] .data_table :deep() .next-page__click-button {
   transform: rotate(180deg);
}
[data-direction = rtl] .lesson-det {
   flex-direction: row-reverse;
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



/* rtl */
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option {
  text-align: right;
}
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option--highlight {
  text-align: right;
}

[data-direction = rtl] .arrow-icon {
   transform: rotate(180deg);
}
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
   .details_box {
       margin-inline: 5px;
   }
}
@media(max-width: 576px) {
   .modal_content {
       padding: 15px 8px;
   }
   .modal-dialog-style {
   width: 90%;
   max-width: 90%;
   margin-inline: auto;
   }
   .main-box {
   padding: 22px 11px;
   }
   .main-box {
       padding-bottom: 2px;
   }
   .info-flex {
       flex-direction: column;
       gap: 6px;
   }
   .det_title {
       margin-bottom: 12px;
   }
   .button-style{
       padding: 7px 19px;
   }
   .box-modal {
       flex-direction: column;
   }
}
.modal-dialog{
   max-width:600px
}
.modal_content_lesson_info{
   min-height: 211px;
   height: 211px;
   padding:20px;
}

</style>