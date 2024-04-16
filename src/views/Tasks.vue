<template>
   <div class="main-box"> 
    <div class="box-title">
       <div class="title">{{$t('Tasks')}}</div>
       <button type="button" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add task')}}</span></button>
    </div>
    <div class="filter-box">
      <button type="button" class="button-style button-style-filter" data-bs-toggle="modal" data-bs-target="#filterBy">
           <FilterIcon class="filter-icon"></FilterIcon>
           <span>{{$t('Filter')}}</span>
           <!-- <div class="filter_num" v-if="filter_counter!=0"> {{ filter_counter }}</div>  -->
      </button>
       <div class="search-box">
         <input class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
         <SearchIcon class="search-icon"></SearchIcon>
       </div>
    </div>
    <!-- To do -->
     <div style="overflow: auto;" class="mt-3">
        <table class="table-style">
          <tr>
            <th class="th task-th">
              <div class="d-flex justify-content-between task-style-color toDo-style">
                <div class="d-flex align-items-center">
                  <ArrowIcon class="arrow-icon"  @click="collapsed=!collapsed ,collapsed_subTask=false" :class="{'rotate-style': collapsed==true }"></ArrowIcon>
                  <div>{{$t('To Do')}}</div>
                </div>
                <div class="task-num">2 Tasks</div>
              </div>
            </th>
            <th class="th-style th-style-1">{{$t('Assignee')}}</th>
            <th class="th-style th-style-2">{{$t('Agent')}}</th>
            <th class="th-style th-style-3">{{$t('Due date')}}</th>
            <th class="th-style th-style-4"></th>
          </tr>
          <tr v-if="collapsed==true" class="tr-style">
            <td>
              <div class="d-flex gap-2 align-items-center">
                <ArrowIcon class="task-arrow" @click="collapsed_subTask=!collapsed_subTask" :class="{'rotate-style-2': collapsed_subTask==true }"></ArrowIcon>
                <div class="dropdown">
                    <button class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <div class="d-flex gap-2 justify-content-center align-items-center">
                        <div class="circle-status"></div>
                      </div>
                    </button>
                    <button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails">{{$t('Task title')}}</button>
                  <ul class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('To Do')}}</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
                  </ul>
                </div>
                <div class="sub-task-num">
                  <SubTaskIcon></SubTaskIcon>
                  <span>1</span>
                </div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 justify-content-center">
                <AddIcon class="add-icon-table"></AddIcon>
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
          <tr v-if="collapsed_subTask==true" class="tr-style">
            <td class="td-subtask">
              <div class="d-flex gap-2 align-items-center subTask-td">
                 <div class="circle-status"></div>
                  <div>{{$t('Subtask title')}}</div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 subTask-icon">
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
          <tr v-if="collapsed==true" class="tr-style">
            <td>
              <div class="d-flex gap-2 align-items-center">
                <div class="dropdown non-subTask">
                    <button class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <div class="d-flex gap-2 justify-content-center align-items-center">
                        <div class="circle-status"></div>
                        <div>{{$t('Task title')}}</div>
                      </div>
                    </button>
                  <ul class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>To Do</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>In Progress</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>Done</div> </a></li>
                  </ul>
                </div>
                <div class="sub-task-num" v-if="false">
                  <SubTaskIcon></SubTaskIcon>
                  <span>1</span>
                </div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 justify-content-center">
                <AddIcon class="add-icon-table"></AddIcon>
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
        </table>
        <button type="button" class="load-more-btn">
          <i class="fa-solid fa-arrow-down"></i>
          <div>{{$t('Load more')}}</div>
        </button>
     </div>
     <!-- In Progress -->
     <div style="overflow: auto;" class="mt-5">
        <table class="table-style">
          <tr>
            <th class="th task-th">
              <div class="d-flex justify-content-between  task-style-color inprogress-style">
                <div class="d-flex align-items-center">
                  <ArrowIcon class="arrow-icon"  @click="collapsed=!collapsed ,collapsed_subTask=false" :class="{'rotate-style': collapsed==true }"></ArrowIcon>
                  <div>{{$t('In Progress')}}</div>
                </div>
                <div class="task-num">2 Tasks</div>
              </div>
            </th>
            <th class="th-style th-style-1">{{$t('Assignee')}}</th>
            <th class="th-style th-style-2">{{$t('Agent')}}</th>
            <th class="th-style th-style-3">{{$t('Due date')}}</th>
            <th class="th-style th-style-4"></th>
          </tr>
          <tr v-if="collapsed==true" class="tr-style">
            <td>
              <div class="d-flex gap-2 align-items-center">
                <ArrowIcon class="task-arrow" @click="collapsed_subTask=!collapsed_subTask" :class="{'rotate-style-2': collapsed_subTask==true }"></ArrowIcon>
                <div class="dropdown">
                    <button class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <div class="d-flex gap-2 justify-content-center align-items-center">
                        <Inprogress></Inprogress>
                      </div>
                    </button>
                    <button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails">{{$t('Task title')}}</button>
                    <ul class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('To Do')}}</div></a></li>
                      <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
                      <li><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
                    </ul>
                </div>
                <div class="sub-task-num">
                  <SubTaskIcon></SubTaskIcon>
                  <span>1</span>
                </div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 justify-content-center">
                <AddIcon class="add-icon-table"></AddIcon>
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
          <tr v-if="collapsed_subTask==true" class="tr-style">
            <td class="td-subtask">
              <div class="d-flex gap-2 align-items-center subTask-td">
                <Inprogress></Inprogress>
                  <div>{{$t('Subtask title')}}</div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 subTask-icon">
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
          <tr v-if="collapsed==true" class="tr-style">
            <td>
              <div class="d-flex gap-2 align-items-center">
                <div class="dropdown non-subTask">
                    <button class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <div class="d-flex gap-2 justify-content-center align-items-center">
                        <Inprogress></Inprogress>
                        <div>{{$t('Task title')}}</div>
                      </div>
                    </button>
                  <ul class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>To Do</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>In Progress</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>Done</div> </a></li>
                  </ul>
                </div>
                <div class="sub-task-num" v-if="false">
                  <SubTaskIcon></SubTaskIcon>
                  <span>1</span>
                </div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 justify-content-center">
                <AddIcon class="add-icon-table"></AddIcon>
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
        </table>
     </div>
     <!-- Done -->
     <div style="overflow: auto;" class="mt-5">
        <table class="table-style">
          <tr>
            <th class="th task-th">
              <div class="d-flex justify-content-between  task-style-color done-style">
                <div class="d-flex align-items-center">
                  <ArrowIcon class="arrow-icon"  @click="collapsed=!collapsed ,collapsed_subTask=false" :class="{'rotate-style': collapsed==true }"></ArrowIcon>
                  <div>{{$t('Done')}}</div>
                </div>
                <div class="task-num">2 Tasks</div>
              </div>
            </th>
            <th class="th-style th-style-1">{{$t('Assignee')}}</th>
            <th class="th-style th-style-2">{{$t('Agent')}}</th>
            <th class="th-style th-style-3">{{$t('Due date')}}</th>
            <th class="th-style th-style-4"></th>
          </tr>
          <tr v-if="collapsed==true" class="tr-style">
            <td>
              <div class="d-flex gap-2 align-items-center">
                <ArrowIcon class="task-arrow" @click="collapsed_subTask=!collapsed_subTask" :class="{'rotate-style-2': collapsed_subTask==true }"></ArrowIcon>
                <div class="dropdown">
                    <button class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <div class="d-flex gap-2 justify-content-center align-items-center">
                        <DoneIcon></DoneIcon>
                      </div>
                    </button>
                    <button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails">{{$t('Task title')}}</button>
                    <ul class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
                      <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('To Do')}}</div></a></li>
                      <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
                      <li><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
                    </ul>
                </div>
                <div class="sub-task-num">
                  <SubTaskIcon></SubTaskIcon>
                  <span>1</span>
                </div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 justify-content-center">
                <AddIcon class="add-icon-table"></AddIcon>
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
          <tr v-if="collapsed_subTask==true" class="tr-style">
            <td class="td-subtask">
              <div class="d-flex gap-2 align-items-center subTask-td">
                  <DoneIcon></DoneIcon>
                  <div>{{$t('Subtask title')}}</div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 subTask-icon">
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
          <tr v-if="collapsed==true" class="tr-style">
            <td>
              <div class="d-flex gap-2 align-items-center">
                <div class="dropdown non-subTask">
                    <button class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                      <div class="d-flex gap-2 justify-content-center align-items-center">
                        <DoneIcon></DoneIcon>
                        <div>{{$t('Task title')}}</div>
                      </div>
                    </button>
                  <ul class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>To Do</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>In Progress</div></a></li>
                    <li><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>Done</div> </a></li>
                  </ul>
                </div>
                <div class="sub-task-num" v-if="false">
                  <SubTaskIcon></SubTaskIcon>
                  <span>1</span>
                </div>
              </div>
            </td>
            <td>
               <UserImg width="24" hight="24"></UserImg>
            </td>
            <td>{{$t('Agent Name')}}</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 justify-content-center">
                <AddIcon class="add-icon-table"></AddIcon>
                <DeleteIcon></DeleteIcon>
                <EditIcon></EditIcon>
              </div>
            </td>
          </tr>
        </table>
     </div>
     <div class="modal fade" id="taskDetails" tabindex="-1" aria-labelledby="taskDetailsLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-style">
              <div class="modal-content modal_content modal_content_task">
                <div class="modal-body modal_body">
                <div class="modal-header modal_header">
                      <h5 class="modal-title modal_title_task" id="addModalLabel">{{$t('Task Title')}} </h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="d-flex gap-3 align-items-center">
                  <div class="d-flex gap-2 gap-1 align-items-center">
                    <div class="modal-word">{{$t('Status')}}</div>
                    <div class="d-flex gap-2 align-items-center toDo-box"><div class="circle-status"></div><div class="toDo-stat">To Do</div></div>
                  </div>
                  <div class="d-flex gap-2 gap-1 align-items-center">
                    <div class="modal-word">Due date</div>
                    <div class="modal-dec">26 - 12 - 2023, 12:12</div>
                  </div>
                  <div class="d-flex gap-2 gap-1 align-items-center">
                    <div class="modal-word">{{$t('Agent')}}</div>
                    <div class="modal-dec">{{$t('Agent name')}}</div>
                  </div>
                  <div class="sub-task-num">
                      <SubTaskIcon></SubTaskIcon>
                      <span>1</span>
                  </div>
                  
                </div>
                <div class="modal-desc mt-2">Lorem ipsum dolor sit amet consectetur. Convallis at urna senectus leo scelerisque tincidunt habitant dolor enim. Nisi quam felis orci nullam tortor sapien. Blandit sit bibendum hac duis diam scelerisque. Nisl dolor dolor diam cras pellentesque orci amet sed.</div>
                <div class="d-flex gap-2 gap-1 align-items-center mt-2">
                  <div class="modal-word">{{$t('Assigned to')}}</div>
                  <div class="modal-desc d-flex gap-2"> 
                    <UserImg style="width: 20px; height: 20px;"></UserImg>
                     <div>{{$t('User Name')}}</div>
                    </div>
                </div>    
                </div> 
            </div>
          </div>
      </div>

   </div>
</template>

<script>
import FilterIcon from '../components/icons/FilterIcon.vue';
import AddIcon from '../components/icons/AddIcon.vue';
import SearchIcon from '../components/icons/SearchIcon.vue';
import ArrowIcon from '../components/icons/ArrowIcon.vue';
import UserImg from '../components/icons/UserImg.vue';
import DeleteIcon from '../components/icons/DeleteIcon.vue';
import EditIcon from '../components/icons/EditIcon.vue';
import SubTaskIcon from '../components/icons/SubTaskIcon.vue';
import Inprogress from'../components/icons/Inprogress.vue';
import DoneIcon from '../components/icons/DoneIcon.vue'
export default {
  data() {
    return {
      collapsed:true,
      collapsed_subTask:false,
    }

  },

  components:{ FilterIcon, SearchIcon, ArrowIcon, UserImg, AddIcon, DeleteIcon, EditIcon, SubTaskIcon, Inprogress, DoneIcon}
}
</script>

<style scoped>
.load-more-btn {
  border: none;
  background-color: transparent;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  color: var(--primary-color);
  align-items: center;
  gap: 16px;
  width: 100%;
  padding-inline: 48px;
  margin-top: 10px;
  margin-bottom: 10px;
  }
.th-style-1 {
 width: 73.23px;
}
.th-style-2 {
 width: 138.72spx;
}
.th-style-3 {
  width: 179.94px;
}
.th-style-4 {
  width: 172.93px;
}
 .button-style-modal {
  padding: 12px 58px;
  text-wrap:nowrap;
}
.modal-word {
  color: #7B8190;
  font-size: 14px;
  font-weight: 500;
}
.modal_content_task {
  min-width: 680px;
  max-width: 90%;
}
.modal-desc {
  color: #3B424A;
  font-size: 14px;
  font-weight: 400;
  text-align: justify;
  
}
.toDo-stat {
  color: var(--primary-color);
}
.toDo-box {
  background-color: #426AB30D;
  padding: 4px 6px;
  border-radius: 5px;
}
.modal_title_task {
  color: #3B424A;
  margin-left: auto;
}
.button-style-2:hover {
    background-color: var(--primary-color);
    color: white;
 }
 .button-style-2 {
    background-color: white;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
 }
 .button-style {
    padding: 10px 13px;
 }
 .button-style-filter {
   background-color: transparent;
   border: 1px solid var(--primary-color);
   color: #7B8190;
   height: 40px;
   font-size: 14px;
   display: flex;
 }
 .input-style-search {
   padding-inline: 46px;
   height: 40px;
}
.task-style-color {
  font-size: 14px;
  font-weight: 500;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: 600;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  height: 44px;
  gap: 10px;
  padding: 10px;
  text-align: center;
}
.toDo-style {
    background-color: var(--primary-color);
    width: 190px;

}
.inprogress-style{
  background-color: #F58220;
    width: 244px;
}
.done-style {
  background-color: #62BB46;
  width: 180px;
}
.th-style {
  color: #7B8190;
  font-size: 14px;
  font-weight: 500;
  height: 44px;
  gap: 10px;
  text-align: center;
}
.table-style {
  width: 100%;
  margin-top: 16px;
}
.task-num {
    font-size: 14px;
    font-weight: 500;
    padding: 2px 8px;
    border: 1px solid white;
    border-radius: 16px;
    width: 75px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #F9F5FF1A;
}
.arrow-icon {
  width: 24px;
  height: 24px;
  border-radius: 20px;
  transform: rotate(0deg);
  transition: 0.4s;
}
.task-arrow {
  transform: rotate(0deg);
  transition: 0.4s;
  width: 24px;
  height: 24px;
}
.table-style td {
  background-color: white;
  padding: 6px 14px;
  font-size: 14px;
  color: #3B424A;
  text-align: center;
  text-wrap:nowrap;
}
.rotate-style {
  transform: rotate(90deg);
  transition: 0.4s;
}
.rotate-style-2 {
  transform: rotate(90deg);
  transition: 0.4s;

}
/* .tr-style {
  transition: 2s;
} */
.arrow-icon :deep() path{
  stroke: white;
}
.circle-status {
  width: 16px;
  height: 16px;
  border: 1px solid #426AB3;
  border-radius: 16px;
}
.user-img {
  object-fit: cover;
}
.add-icon-table :deep() path{
  stroke: black;
}
.task-arrow :deep() path {
  stroke: var(--primary-color);
}
.task-th {
  width: 450px;
}
.sub-task-num{
  background-color: #F6F6F6;
  border-radius: 17px;
  background-color: #F6F6F6;
  color: #3B424A;
  font-size: 10px;
  display: flex;
  gap: 4;
  width: 45px;
  height: 20px;
  justify-content: center;
  align-items: center;
  margin-left: auto;
}
.td-subtask {
  padding-inline: 72px;
}
.subTask-td {
  padding-inline: 60px;
}
.subTask-icon {
  justify-content: end;
  padding-inline: 20px;
}
.tr-visible {
  visibility: hidden;
}
.collapsed {
  visibility: visible;
  transition: 2s;
}
.non-subTask {
  margin-inline: 33px;
}
.dropdown-toggle-table {
  border: none;
  color: #3B424A;
  font-size: 14px;
  padding: 0px;
}
.dropdown-toggle-table::after {
  display: none;
}
/* .dropdown-menu-table {

} */
.dropdown-menu.show {
    display: block;
    width: 112px;
    min-width: 112px;
    padding: 0px 12px;
    border-radius: 20px;
    border: none;
    box-shadow: 0px 0px 2px 0px #8080809c;
}
.dropdown-item-table {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #3B424A;
  font-size: 12px;
  padding:12px 0px;
}
.dropdown-item-table:hover {
  background-color: transparent;
  color: var(--primary-color);
}
.task-title {
  border: none;
  background-color: transparent;
  padding: 0px 5px;
}
::-webkit-scrollbar {
  width: 3px;
  height: 3px;
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
/* ::-webkit-scrollbar {
 width: 1px;
}

::-webkit-scrollbar-track {
 box-shadow: inset 0 0 1px grey;
}

::-webkit-scrollbar-thumb {
 background: var(--primary-color);
 border-radius: 10px;
} */
 @media(max-width:1024px) {
 .box-title {
    justify-content: unset;
    gap: 24px;
 } 

 .button-style-add {
    padding: 9px 43px;
    text-wrap:nowrap;   
 }
 @media(max-width:992px) { 
  .th-style-1 , .th-style-2 ,.th-style-3 ,.th-style-4 ,.task-th{
    width: unset;
  }

 }
 @media(max-width:576px) { 
  .box-title {
    justify-content: unset;
    gap: 24px;
  }
  .button-style{
      padding: 7px 19px;
    }
  }
  .button-style-filter {
      padding: 7px;
  }
  .main-box {
    padding: 22px 11px;
  }
  .task-style-color {
    font-size: 16px;
  }
  .inprogress-style {
    width: 217px;
  }
  .toDo-style {
    width: 174px;
  }
  .done-style {
    width: 164px;
}
}

</style>