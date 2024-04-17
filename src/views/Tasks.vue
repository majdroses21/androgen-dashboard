<template>
   <div class="main-box"> 
    <div class="box-title">
       <div class="title">{{$t('Tasks')}}</div>
       <button type="button" @click="init()" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add task')}}</span></button>
    </div>
    <div class="filter-box">
      <button type="button" class="button-style button-style-filter" data-bs-toggle="modal" data-bs-target="#filterBy">
           <FilterIcon class="filter-icon"></FilterIcon>
           <span>{{$t('Filter')}}</span>
           <div class="filter_num" v-if="filterCounter!=0"> {{ filterCounter }}</div> 
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
            <td>Agent Name</td>
            <td>2020-21-12 12:10</td>
            <td>
              <div class="d-flex gap-4 justify-content-center">
                <button style="border: none; background-color: transparent;" type="button" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon class="add-icon-table"></AddIcon></button>
                <DeleteIcon></DeleteIcon>
                <button style="border: none; background-color: transparent;" type="button" data-bs-toggle="modal" data-bs-target="#addModal"><EditIcon></EditIcon></button>
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
                <div class="task-header">
                  <div class="d-flex gap-2 align-items-center">
                    <div class="modal-word">{{$t('Status')}}</div>
                    <!-- To Do Status -->
                    <!-- <div class="d-flex gap-2 align-items-center toDo-box">
                      <div class="circle-status"></div>
                      <div class="toDo-stat">{{$t('To Do')}}</div>
                    </div> -->
                    <!-- In Progress Status -->
                    <div class="d-flex gap-2 align-items-center inProgress-box">
                      <Inprogress></Inprogress>
                      <div class="inProgress-stat">{{$t('In Progress')}}</div>
                    </div>
                    <!-- Done State -->
                    <!-- <div class="d-flex gap-2 align-items-center Done-box">
                      <DoneIcon></DoneIcon>
                      <div class="Done-stat">{{$t('Done')}}</div>
                    </div> -->
                  </div>
                  <div class="d-flex gap-2 align-items-center">
                    <div class="modal-word">{{$t('Due date')}}</div>
                    <div class="modal-dec text-nowrap">26 - 12 - 2023, 12:12</div>
                  </div>
                  <div class="d-flex gap-2 align-items-center justify-content-between w-100">
                    <div class="d-flex gap-2 align-items-center">
                      <div class="modal-word">{{$t('Agent')}}</div>
                      <div class="modal-dec agent-name">Agent name</div>
                    </div>
                    <div class="sub-task-num">
                      <SubTaskIcon></SubTaskIcon>
                      <span>1</span>
                  </div>   
                  </div>  
                </div>
                <div class="modal-desc mt-2">Lorem ipsum dolor sit amet consectetur. Convallis at urna senectus leo scelerisque tincidunt habitant dolor enim. Nisi quam felis orci nullam tortor sapien. Blandit sit bibendum hac duis diam scelerisque. Nisl dolor dolor diam cras pellentesque orci amet sed.</div>
                <div class="d-flex gap-2 gap-1 align-items-center mt-3">
                  <div class="modal-word">{{$t('Assigned to')}}</div>
                  <div class="modal-desc d-flex gap-2">
                    <!-- <div style="width: 20px; height: 20px; border-radius: 20px;">
                      <img style="object-fit: cover;" src="" alt="">
                    </div>  -->
                    <UserImg style="width: 20px; height: 20px;"></UserImg>
                     <div>{{$t('User Name')}}</div>
                    </div>
                </div>    
                </div> 
            </div>
          </div>
      </div>
      <!-- modal for add task -->
      <div class="modal fade" id="addModal" tabindex="-1" aria-labelledby="addModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-style">
          <div class="modal-content modal_content">
            <div class="modal-header modal_header">
                <h5 class="modal-title modal_title" id="addModalLabel">{{$t('New Task')}}</h5>
            </div>
            <div class="modal-body modal_body">
                <form class="form-style">
                  <div class="mb-2">
                      <label class="label-style" for="task_title">{{$t('Title')}}</label>
                      <input v-model="task_title" class="input-style" type="text" id="task_title" name="task_title" :placeholder="$t('Write task title')">
                      <div v-for="(item, index) in v$.task_title.$errors" :key="index" class="error-msg mx-1 gap-1">
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
                      <!-- <div v-for="(item, index) in v$.task_description.$errors" :key="index" class="error-msg mx-1 gap-1">
                          <div class="error-txt">
                          <i class="fa-solid fa-exclamation error-icon"></i>
                          </div>
                          <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                      </div> -->
                  </div>
                  <div class="mb-2">
                      <label class="label-style" for="Agent">{{$t('Agent')}}</label>
                      <v-select class="select-style-modal input-style mb-2" :options="agents" :loading="searchAgentLoading" @search="searchAgent" v-model="select_agent" :placeholder="$t('Choose agent')"></v-select>          
                      <div v-for="(item, index) in v$.select_agent.$errors" :key="index" class="error-msg mx-1 gap-1">
                          <div class="error-txt">
                          <i class="fa-solid fa-exclamation error-icon"></i>
                          </div>
                          <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                      </div>
                  </div>
                  <div class="mb-2">
                      <label class="label-style" for="">{{$t('Due date')}}</label>
                      <div class="row">
                        <div class="col-lg-6">
                          <input v-model="task_date" class="input-style fieldDate" type="date" id="task_title" name="task_date">
                          <div v-for="(item, index) in v$.task_date.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                              <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <input v-model="task_time" class="input-style" type="time" id="task_time" name="task_time">
                          <div v-for="(item, index) in v$.task_time.$errors" :key="index" class="error-msg mx-1 gap-1">
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
                      <v-select class="select-style-modal input-style mb-2" :options="[ $t('To Do'),$t('In Progress'),$t('Done')]" v-model="select_status" :placeholder="$t('Choose task status')"></v-select>          
                      <div v-for="(item, index) in v$.select_status.$errors" :key="index" class="error-msg mx-1 gap-1">
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
      <!-- modal for filter by -->
      <div class="modal fade" id="filterBy" tabindex="-1" aria-labelledby="filterModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-dialog-centered modal-dialog-style">
            <div class="modal-content modal_content modal_content_filterBy">
               <div class="modal-header modal_header">
               <h5 class="modal-title modal_title modal_title_filter" id="addModalLabel">{{$t('Filter')}}</h5>
               <button  @click="resetFilter()"  type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               <button  style="display:none"   type="button" class="btn-close-k" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body modal_body px-3">
               <div class="mb-2" v-if="user?.role=='super_admin'">
                  <div class="label-style">{{$t('Branch')}}</div>
                  <v-select class="select-style-modal input-style mb-2" :options="branches" :loading="searchBranchesLoading" @search="searchBranches" v-model="filter_branch" :placeholder="$t('Choose branch')"></v-select>
               </div>
                <div class="mb-2">
                  <div class="label-style">{{$t('Agent')}}</div>
                  <v-select class="select-style-modal input-style mb-2" :options="agents" :loading="searchAgentLoading" @search="searchAgent" v-model="filter_agent" :placeholder="$t('Choose agent')"></v-select>
                </div>
                <div class="mb-2">
                  <div class="label-style">{{$t('Assignee')}}</div>
                  <v-select class="select-style-modal input-style mb-2" :options="employees" :loading="searchEmployeeLoading" @search="searchEmployee" v-model="filter_employee" :placeholder="$t('Choose employee')"></v-select>
                </div>
                <div class="mb-2">
                  <label class="label-style" for="">{{$t('Due date')}}</label>
                  <div class="row">
                    <div class="col-lg-6">
                      <input v-model="filter_task_date" class="input-style fieldDate" type="date" id="" name="filter_task_date">
                    </div>
                    <div class="col-lg-6">
                      <input v-model="filter_task_time" class="input-style" type="time" id="filter_task_time" name="filter_task_time">
                    </div>
                  </div>
                </div>          
            </div>
            <div class="box-buttons-modal">
               <button @click="applySearch()" class="button-style button-style-modal">{{ $t('Apply') }}</button>
               <button @click="resetFilter()" type="button" class="button-style button-style-2  button-style-modal">{{ $t('Reset') }}</button> 
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
import DoneIcon from '../components/icons/DoneIcon.vue';
import "vue-select/dist/vue-select.css";
import useVuelidate from '@vuelidate/core';
import axios from 'axios';
import { required,helpers } from '@vuelidate/validators';
import { _t } from '../helpers';
import {api_url,storage_url} from '../constants';
import { authHeader } from '../helpers';
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
      collapsed:true,
      collapsed_subTask:false,
      task_title:'',
      task_description:'',
      agents:[],
      select_agent:'',
      select_status:'To Do',
      task_date:'',
      task_time:'',
      loading_loader:false,
      searchAgentLoading:false,
      searchBranchesLoading:false,
      searchEmployeeLoading:false,
      loading: false,
      filter_agent:null,
      employees:[],
      filter_branch:null,
      filter_employee:null,
      filter_task_date:'',
      filter_task_time:'',
      filterCounter:0,
      operation:'add',
    }
  },
  components:{ FilterIcon, SearchIcon, ArrowIcon, UserImg, AddIcon, DeleteIcon, EditIcon, SubTaskIcon, Inprogress, DoneIcon},
  computed :{
    ...mapState(useAuthStore, {
      user: 'user'
   }),
   ...mapState(useLangStore, {
         lang: 'language'
   }),

  },
  methods : {
    _t(message){return _t(message, this.$t);},
    addTask() {
      this.v$.$touch();
         if (this.v$.$invalid) {
          return;
      }
    },
    searchAgent(q = '', loading = null, force = true) {
      if(q.length==0 && ! force)
          return;
      this.agents = [];
      if(loading !== null)
          loading(true);
      else
        this.searchAgentLoading = true;
        this.debounce(() => {
          q = q.length>0?"?q=" + q:'';
            axios.get(`${api_url}/agents${q}`
            ,{headers: {...authHeader()}}).then((response) => {
            this.agents = response.data.data;
            if(this.user?.role=='super_admin'){
              this.searchBranches('',null,true);
            }
            this.agents.forEach(el => {
              el.label=el?.full_name
              });
              if(loading !== null)
                loading(false);
             else
                this.searchAgentLoading = false;
            });
          }, 1000);
    },
    searchBranches(q = '', loading = null, force = false) {
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
                      });
                      if(loading !== null)
                        loading(false);
                      else
                        this.searchBranchesLoading = false;
                  });
                }
            }, 1000);
    },
    searchEmployee(q = '', loading = null, force = false) {
         if(q.length==0 && ! force)
               return;
         this.employees = [];
         if(loading !== null)
               loading(true);
         else
            this.searchEmployeeLoading = true;
            this.debounce(() => {
                q = q.length>0?"?q=" + q:'';
                // if(this.user?.role=='super_admin'){
                  axios.get(`${api_url}/users?role=sale${q}`
                  ,{headers: {...authHeader()}}).then((response) => {
                  this.employees = response.data.data;
                  this.searchAgent('',null,true)
                  this.employees.forEach(el => {
                      el.label=el?.full_name
                      });
                      if(loading !== null)
                        loading(false);
                      else
                        this.searchEmployeeLoading = false;
                  });
                // }
            }, 1000);
    },
    applySearch(){
      // this.get_reports();
      document.querySelector('#filterBy .btn-close-k').click();
    },
    resetFilter(){
      this.filter_branch=null;
      this.filter_agent=null;
      this.filter_employee=null;
      this.filter_task_date='';
      this.filter_task_time='';
    //  this.get_students();
      this.filterCounter=0;
    },
    init(){
      this.v$.$reset();
      this.operation = 'add';
      this.task_title = '';
      this.task_description='';
      this.select_agent='';
      this.task_date='';
      this.task_time=''
   },
  },
  mounted() {
    document.querySelectorAll('.fieldDate').forEach(element => {
        element.min= new Date().toISOString().split("T")[0];
    });
    // this.searchAgent('',null,true)
    this.searchEmployee('',null,true)
  },
  validations() {
         return {
            task_title : {
               required: helpers.withMessage('_.required.title', required),
            },
            select_agent: {
              required: helpers.withMessage('_.required.agent', required),
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
  },
  watch :{
    filter_branch(_new,_old){
      if(_new != null && _old==null){
        this.filterCounter=this.filterCounter+1
      }
      if(_new==null && this.filterCounter>0){
        this.filterCounter=this.filterCounter-1;
      }
    },
    filter_agent(_new,_old){
      if(_new != null && _old==null){
        this.filterCounter=this.filterCounter+1
      }
      if(_new==null && this.filterCounter>0){
        this.filterCounter=this.filterCounter-1;
      }
    },
    filter_employee(_new,_old){
      if(_new != null && _old==null){
        this.filterCounter=this.filterCounter+1
      }
      if(_new==null && this.filterCounter>0){
        this.filterCounter=this.filterCounter-1;
      }
    },
    filter_task_date(_new,_old){
      if(_new != '' && _old==''){
        this.filterCounter=this.filterCounter+1
      }
      if(_new=='' && this.filterCounter>0){
        this.filterCounter=this.filterCounter-1;
      }
    },
    filter_task_time(_new,_old){
      if(_new != '' && _old==''){
        this.filterCounter=this.filterCounter+1
      }
      if(_new=='' && this.filterCounter>0){
        this.filterCounter=this.filterCounter-1;
      }
    },
  }
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
  .task-header {
    display: flex;
    align-items: center;
    gap: 10px;
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
.label-style {
    display: block;
    margin: auto;
    position: relative;
    margin-bottom: 4px;
    margin-left: 0px;
 }
.modal-word {
  color: #7B8190;
  font-size: 14px;
  font-weight: 500;
  text-wrap:nowrap
}
.agent-name {
  text-wrap: nowrap;
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.modal_body {
   overflow-y: auto;
   overflow-x: hidden;
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
.inProgress-stat {
  color: #F58220;
}
.Done-stat {
    color: #62BB46;
}
.toDo-box {
  background-color: #426AB30D;
  padding: 4px 6px;
  border-radius: 5px;
}
.Done-box {
  background-color: #62BB460D;
  padding: 4px 6px;
  border-radius: 5px;
}
.inProgress-box {
  background-color: #F582200D;
  padding: 4px 6px;
  border-radius: 5px;
  text-wrap:nowrap;
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
[data-direction=rtl]  .task-num  {
  direction: ltr;
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
[data-direction=rtl] .sub-task-num {
  direction: ltr;
  margin-right: auto;
  margin-left: unset;
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
.modal_content {
   min-height: 454px;
   height: 454px;
  }
.input-style {
    padding-inline: 16px;
    border-radius: 8px;
  }
.select-style-modal :deep() .vs__clear {
   margin-inline: 6px;
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
.select-style-modal :deep() .vs__clear {
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
.button-style-modal {
  padding: 12px 58px;
  text-wrap:nowrap;
}
.input-style-search {
   padding-inline: 46px;
   height: 40px;
}
.modal_content_task {
  min-width: 680px;
  max-width: 90%;
  margin: auto;
  height: 280px;
  min-height: 280px;
}
[data-direction = rtl].select-style:deep().vs__selected-options{
   display: flex !important;
   flex-direction: row-reverse!important;
}
[data-direction = rtl].select-style:deep() .vs__actions {
   flex-direction: row-reverse;
}
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option {
   text-align: right;
}
[data-direction = rtl] .select-style-modal :deep() .vs__dropdown-option--highlight {
   text-align: right;
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
 @media(max-width:992px) { 
  .th-style-1 , .th-style-2 ,.th-style-3 ,.th-style-4 ,.task-th{
    width: unset;
  }

 }
 @media(max-width:768px) {
  .select-style :deep() .vs__dropdown-toggle {
    max-width: 182.35px;
    width: 182.35px;
 } 
 .modal_content_task {
    min-width: 534px;
    width: 534px;
    height: 370px;
    min-height: 370px;
 } 
 .task-header {
    flex-direction: column;
    align-items: flex-start;
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
.modal-dialog-style {
    width: 90%;
    max-width: 90%;
    margin-inline: auto;
    }
  .modal_content_task {
    min-width: 292px;
    height: 431px;
    min-height: 431px;
}

  }
  

</style>