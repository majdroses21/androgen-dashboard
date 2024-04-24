<template>
   <div class="main-box">kk{{process}}
    <div class="box-title">
       <div class="title">{{$t('Tasks')}}</div>
       <button v-if="user?.role=='sale'" type="button" @click="init(),process='task'" class="button-style button-style-add" data-bs-toggle="modal" data-bs-target="#addModal"><AddIcon/> <span>{{$t('Add task')}}</span></button>
    </div>
    <div class="filter-box">
      <button type="button" class="button-style button-style-filter" data-bs-toggle="modal" data-bs-target="#filterBy">
           <FilterIcon class="filter-icon"></FilterIcon>
           <span>{{$t('Filter')}}</span>
           <div class="filter_num" v-if="filterCounter!=0"> {{ filterCounter }}</div> 
      </button>
       <div class="search-box">
         <input @input="debounce(() => { search_name=$event.target.value; } , 1000);" class="input-style input-style-search" type="search" id="search" name="search" :placeholder="$t('Search')" style="border-radius: 30px;">
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
                  <ArrowIcon class="arrow-icon cursor_p" @click="collapsed[0]=!collapsed[0] ,collapsed_subTask=false" :class="{'rotate-style': collapsed[0]==true }"></ArrowIcon>
                  <div>{{$t('to_do')}}</div>
                </div>
                <div class="task-num">{{ to_do_tasks_meta?.total }} {{$t('Tasks')}}</div>
              </div>
            </th>
            <th class="th-style th-style-1">{{$t('Assignee')}}</th>
            <th class="th-style th-style-2">{{$t('Agent')}}</th>
            <th class="th-style th-style-3">{{$t('Due date')}}</th>
            <th class="th-style th-style-4"></th>
          </tr>
		  <tr class="d-flex justify-content-end">
				<div v-if="to_do_loader && to_do_tasks_data.length  == 0" class="lds-dual-ring"></div>
		  </tr>
          <template v-for="(to_do_task, index) in to_do_tasks_data" :key="to_do_task?.id">
				<tr v-if="collapsed[0]==true" class="tr-style">
					<td>
						<div class="d-flex gap-2 align-items-center">
							<span class="w_24">
								<ArrowIcon v-if="to_do_task?.subtask_count > 0" class="task-arrow cursor_p" @click="if(!to_do_task.subtasks) get_to_do_subtasks(to_do_task?.id);to_do_task.subtasks_expanded = !to_do_task.subtasks_expanded;" :class="{'rotate-style-2': to_do_task?.subtasks_expanded }"></ArrowIcon>
							</span>
							<div class="dropdown">
								<button @click="process='task'" class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
									<div class="d-flex gap-2 justify-content-center align-items-center">
										<div class="circle-status"></div>
									</div>
								</button>
								<button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails" @click="change_selected_item(to_do_task)">{{to_do_task?.title}}</button>
								<ul v-if="user.user_name == to_do_task?.assignee?.user_name" class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
									<li @click="change_status(type='to_do',to_do_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('to_do')}}</div></a></li>
									<li @click="change_status(type='in_progress',to_do_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
									<li @click="change_status(type='done',to_do_task)"><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
								</ul>
							</div>
							<div class="sub-task-num" v-if="to_do_task?.subtask_count > 0">
								<SubTaskIcon></SubTaskIcon>
								<span>{{ to_do_task?.subtask_count }}</span>
							</div>
						</div>
					</td>
					<td>
						<span :title="to_do_task?.assignee?.full_name">
							<UserImg width="40" hight="40" v-if="to_do_task?.assignee?.image==null" ></UserImg>
						</span>
						<div v-if="to_do_task?.assignee?.image!=null" class="img_user" >
							<img :src="storage_url+'/'+to_do_task?.assignee?.image" :title="to_do_task?.assignee?.full_name">
						</div>
					</td>
					<td>{{ to_do_task?.agent?.full_name }}</td>
					<td>{{ to_do_task?.date }} {{ to_do_task?.time?.substring(0,5) }}</td>
					<td>
						<div class="d-flex gap-4 justify-content-end">
							<AddIcon v-if="user.user_name == to_do_task?.assignee?.user_name" @click="process='sub';sub_type='to_do';init();selected_item=to_do_task" data-bs-toggle="modal" data-bs-target="#addModal" class="add-icon-table cursor_p"></AddIcon>
							<DeleteIcon v-if="user.user_name == to_do_task?.assignee?.user_name" @click="deleteTask();change_selected_item(to_do_task); process='task'" class="cursor_p"></DeleteIcon>
							<EditIcon v-if="user.user_name == to_do_task?.assignee?.user_name" @click="change_selected_item(to_do_task); process='task'" data-bs-toggle="modal" data-bs-target="#addModal" class="cursor_p"></EditIcon>
						</div>
					</td>
				</tr>
				<template v-if="to_do_task?.subtasks_expanded && collapsed[0]==true">
					<template v-for="to_do_subtask in to_do_task?.subtasks?.data" :key="to_do_subtask?.id">
						<tr class="tr-style">
							<td class="td-subtask">
								<div class="dropdown subTask-drop">
									<button @click="process='sub'" class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
										<div class="d-flex gap-2 justify-content-center align-items-center">
											<div v-if="to_do_subtask?.status=='to_do'" class="circle-status"></div>
											<Inprogress v-if="to_do_subtask?.status=='in_progress'"></Inprogress>
											<DoneIcon v-if="to_do_subtask?.status=='done'"></DoneIcon>
										</div>
									</button>
									<button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails" @click="change_selected_item(to_do_subtask)">{{ to_do_subtask?.title }}</button>
									<ul v-if="user.user_name == to_do_subtask?.assignee?.user_name" class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
										<li @click="change_status(type='to_do',to_do_subtask, to_do_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('to_do')}}</div></a></li>
										<li @click="change_status(type='in_progress',to_do_subtask, to_do_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
										<li @click="change_status(type='done',to_do_subtask, to_do_task)"><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
									</ul>
								</div>
							</td>
							<td>
								<span :title="to_do_subtask?.assignee?.full_name">
									<UserImg width="40" hight="40" v-if="to_do_subtask?.assignee?.image==null"></UserImg>
								</span>
								<div v-if="to_do_subtask?.assignee?.image!=null" class="img_user">
									<img :src="storage_url+'/'+to_do_subtask?.assignee?.image" :title="to_do_subtask?.assignee?.image">
								</div>
							</td>
							<td>{{ to_do_subtask?.agent?.full_name  }}</td>
							<td>{{ to_do_subtask?.date }} {{ to_do_subtask?.time }}</td>
							<td>
								<div class="d-flex gap-4 subTask-icon">
									<DeleteIcon  v-if="user.user_name == to_do_task?.assignee?.user_name" @click="deleteTask(to_do_task?.id);change_selected_item(to_do_subtask); process='sub'" class="cursor_p"></DeleteIcon>
									<EditIcon v-if="user.user_name == to_do_task?.assignee?.user_name" @click="change_selected_item(to_do_subtask,taskId = to_do_task?.id); process='sub'" data-bs-toggle="modal" data-bs-target="#addModal" class="cursor_p"></EditIcon>
								</div>
							</td>
						</tr>
					</template>
						<div class="d-flex">
							<button type="button" class="load-more-btn" style="padding-inline:75px" @click="get_to_do_subtasks(to_do_task?.id)" v-if="to_do_task?.subtasks?.meta && to_do_task?.subtasks?.meta?.current_page != to_do_task?.subtasks?.meta?.last_page">
								<!-- <span v-if="to_do_task.loader" class="lds-dual-ring-sm"></span> -->
								<div class="d-flex align-items-center gap-2">
									<i class="fa-solid fa-arrow-down"></i>
									<div>{{$t('Load more subtasks')}}</div>
								</div>
							</button>
							<span v-if="to_do_task.loader" class="lds-dual-ring-sm"></span>
						</div>
				</template>
				
		  </template>
        </table>
		<div class="d-flex">
			<button type="button" class="load-more-btn" @click="get_todo_tasks()" v-if="to_do_tasks_meta && to_do_tasks_meta?.current_page != to_do_tasks_meta?.last_page">
				<i class="fa-solid fa-arrow-down"></i>
				<div>{{$t('Load more tasks')}}</div>
				<span v-if="to_do_load_more_loader && to_do_tasks_data.length > 0 " class="lds-dual-ring-sm"></span>
			</button>
		</div>
     </div>
     <!-- In Progress -->
     <div style="overflow: auto;" class="mt-5">
        <table class="table-style">
          <tr>
            <th class="th task-th">
              <div class="d-flex justify-content-between  task-style-color inprogress-style">
                <div class="d-flex align-items-center">
                  <ArrowIcon class="arrow-icon cursor_p"  @click="collapsed[1]=!collapsed[1] ,collapsed_subTask=false" :class="{'rotate-style': collapsed[1]==true }"></ArrowIcon>
                  <div>{{$t('In Progress')}}</div>
                </div>
                <div class="task-num">{{ in_progress_tasks_meta?.total }} {{$t('Tasks')}}</div>
              </div>
            </th>
            <th class="th-style th-style-1">{{$t('Assignee')}}</th>
            <th class="th-style th-style-2">{{$t('Agent')}}</th>
            <th class="th-style th-style-3">{{$t('Due date')}}</th>
            <th class="th-style th-style-4"></th>
          </tr>
		  <tr class="d-flex justify-content-end">
				<div v-if="in_progress_loader && in_progress_tasks_data.length  == 0" class="lds-dual-ring"></div>
			</tr>
			<template v-for="in_progress_task in in_progress_tasks_data" :key="in_progress_task?.id">
				<tr v-if="collapsed[1]==true" class="tr-style">
					<td>
						<div class="d-flex gap-2 align-items-center">
							<span class="w_24">
								<ArrowIcon v-if="in_progress_task?.subtask_count > 0" class="task-arrow cursor_p" @click="if(!in_progress_task.subtasks) get_in_progress_subtasks(in_progress_task?.id);in_progress_task.subtasks_expanded = !in_progress_task.subtasks_expanded;" :class="{'rotate-style-2': in_progress_task?.subtasks_expanded }"></ArrowIcon>
							</span>
							<div class="dropdown">
								<button @click="process='task'" class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
								<div class="d-flex gap-2 justify-content-center align-items-center">
									<Inprogress></Inprogress>
								</div>
								</button>
								<button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails" @click="change_selected_item(in_progress_task)">{{ in_progress_task?.title }}</button>
								<ul v-if="user.user_name == in_progress_task?.assignee?.user_name" class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
									<li @click="change_status(type='to_do',in_progress_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('to_do')}}</div></a></li>
									<li @click="change_status(type='in_progress',in_progress_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
									<li @click="change_status(type='done',in_progress_task)"><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
								</ul>
							</div>
							<div class="sub-task-num" v-if="in_progress_task?.subtask_count > 0">
							<SubTaskIcon></SubTaskIcon>
							<span>{{ in_progress_task?.subtask_count }}</span>
							</div>
						</div>
					</td>
					<td>
						<span :title="in_progress_task?.assignee?.full_name">
							<UserImg width="40" hight="40" v-if="in_progress_task?.assignee?.image==null"></UserImg>
						</span>
						<div v-if="in_progress_task?.assignee?.image!=null" class="img_user">
							<img :src="storage_url+'/'+in_progress_task?.assignee?.image" :title="in_progress_task?.assignee?.full_name">
						</div>
					</td>
					<td>{{ in_progress_task?.agent?.full_name }}</td>
					<td>{{ in_progress_task?.date }} {{ in_progress_task?.time?.substring(0,5) }}</td>
					<td>
						<div class="d-flex gap-4 justify-content-end">
							<AddIcon v-if="user.user_name == in_progress_task?.assignee?.user_name" @click="process='sub';sub_type='progress';init();selected_item=in_progress_task" data-bs-toggle="modal" data-bs-target="#addModal" class="add-icon-table cursor_p"></AddIcon>
							<DeleteIcon  v-if="user.user_name == in_progress_task?.assignee?.user_name" @click="deleteTask();change_selected_item(in_progress_task); process='task'" class="cursor_p"></DeleteIcon>
							<EditIcon v-if="user.user_name == in_progress_task?.assignee?.user_name" @click="change_selected_item(in_progress_task); process='task'" data-bs-toggle="modal" data-bs-target="#addModal" class="cursor_p"></EditIcon>
						</div>
					</td>
				</tr>
				<template v-if="in_progress_task?.subtasks_expanded && collapsed[1]==true">
					<template v-for="in_progress_subtask in in_progress_task?.subtasks?.data" :key="in_progress_subtask?.id">
						<tr class="tr-style">
							<td class="td-subtask">
							<div class="dropdown subTask-drop">
								<button @click="process='sub'" class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
									<div class="d-flex gap-2 justify-content-center align-items-center">
										<div v-if="in_progress_subtask?.status=='to_do'" class="circle-status"></div>
										<Inprogress v-if="in_progress_subtask?.status=='in_progress'"></Inprogress>
										<DoneIcon v-if="in_progress_subtask?.status=='done'"></DoneIcon>
									</div>
								</button>
								<button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails" @click="change_selected_item(in_progress_subtask)">{{ in_progress_subtask?.title }}</button>
								<ul v-if="user.user_name == in_progress_subtask?.assignee?.user_name" class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
									<li @click="change_status(type='to_do',in_progress_subtask,in_progress_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('to_do')}}</div></a></li>
									<li @click="change_status(type='in_progress',in_progress_subtask,in_progress_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
									<li @click="change_status(type='done',in_progress_subtask,in_progress_task)"><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
								</ul>
							</div>
							</td>
							<td>
								<span :title="in_progress_subtask?.assignee?.full_name">
									<UserImg width="40" hight="40" v-if="in_progress_subtask?.assignee?.image==null"></UserImg>
								</span>
								<div v-if="in_progress_subtask?.assignee?.image!=null" class="img_user" :title="in_progress_subtask?.assignee?.full_name">
									<img :src="storage_url+'/'+in_progress_subtask?.assignee?.image">
								</div>
							</td>
							<td>{{ in_progress_subtask?.agent?.full_name }}</td>
							<td>{{ in_progress_subtask?.date }} {{ in_progress_subtask?.time }}</td>
							<td>
								<div class="d-flex gap-4 subTask-icon">
									<DeleteIcon  v-if="user.user_name == in_progress_subtask?.assignee?.user_name" @click="deleteTask(in_progress_task?.id);change_selected_item(in_progress_subtask); process='sub'" class="cursor_p"></DeleteIcon>
									<EditIcon v-if="user.user_name == in_progress_task?.assignee?.user_name" @click="change_selected_item(in_progress_subtask,taskId = in_progress_task?.id); process='sub'" data-bs-toggle="modal" data-bs-target="#addModal" class="cursor_p"></EditIcon>
								</div>
							</td>
						</tr>
					</template>
					<div class="d-flex">
						<button type="button" class="load-more-btn" style="padding-inline:75px" @click="get_in_progress_subtasks(in_progress_task?.id); check_load_btn = true" v-if="in_progress_task?.subtasks?.meta && in_progress_task?.subtasks?.meta?.current_page != in_progress_task?.subtasks?.meta?.last_page">
							<div class="d-flex align-items-center gap-2">
								<i class="fa-solid fa-arrow-down"></i>
								<div>{{$t('Load more subtasks')}}</div>
							</div>
						</button>
						<span v-if="in_progress_task.loader" class="lds-dual-ring-sm"></span>
					</div>
				</template>
		  	</template>
        </table>
		<div class="d-flex">
			<button type="button" class="load-more-btn" @click="get_in_progress_tasks()" v-if="in_progress_tasks_meta && in_progress_tasks_meta?.current_page != in_progress_tasks_meta?.last_page">
				<i class="fa-solid fa-arrow-down"></i>
				<div>{{$t('Load more tasks')}}</div>
				<span v-if="in_progress_load_more_loader && in_progress_tasks_data.length > 0 " class="lds-dual-ring-sm"></span>
			</button>
		</div>
     </div>
     <!-- Done -->
     <div style="overflow: auto;" class="mt-5">
        <table class="table-style">
			<tr>
				<th class="th task-th">
					<div class="d-flex justify-content-between  task-style-color done-style">
						<div class="d-flex align-items-center">
						<ArrowIcon class="arrow-icon cursor_p" @click="collapsed[2]=!collapsed[2] ,collapsed_subTask=false" :class="{'rotate-style': collapsed[2]==true }"></ArrowIcon>
						<div>{{$t('Done')}}</div>
						</div>
						<div class="task-num">{{ done_tasks_meta?.total }} {{$t('Tasks')}}</div>
					</div>
				</th>
				<th class="th-style th-style-1">{{$t('Assignee')}}</th>
				<th class="th-style th-style-2">{{$t('Agent')}}</th>
				<th class="th-style th-style-3">{{$t('Due date')}}</th>
				<th class="th-style th-style-4"></th>
			</tr>
			<tr class="d-flex justify-content-end">
				<div v-if="done_loader && done_tasks_data.length  == 0" class="lds-dual-ring"></div>
			</tr>
			<template v-for="done_task in done_tasks_data" :key="done_task?.id">
				<tr v-if="collapsed[2]==true" class="tr-style">
					<td>
						<div class="d-flex gap-2 align-items-center">
							<span class="w_24">
								<ArrowIcon v-if="done_task?.subtask_count > 0" class="task-arrow cursor_p" @click="if(!done_task.subtasks) get_done_subtasks(done_task?.id);done_task.subtasks_expanded = !done_task.subtasks_expanded;" :class="{'rotate-style-2': done_task?.subtasks_expanded }"></ArrowIcon>
							</span>
							<div class="dropdown">
								<button @click="process='task'" class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
									<div class="d-flex gap-2 justify-content-center align-items-center">
										<DoneIcon></DoneIcon>
									</div>
									</button>
								<button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails" @click="change_selected_item(done_task)">{{ done_task?.title }}</button>
								<ul v-if="user.user_name == done_task?.assignee?.user_name" class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
									<li @click="change_status(type='to_do',done_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('to_do')}}</div></a></li>
									<li @click="change_status(type='in_progress',done_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
									<li @click="change_status(type='done',done_task)"><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
								</ul>
							</div>
							<div class="sub-task-num" v-if="done_task?.subtask_count > 0">
								<SubTaskIcon></SubTaskIcon>
								<span>{{ done_task?.subtask_count }}</span>
							</div>
						</div>
					</td>
					<td>
						<span :title="done_task?.assignee?.full_name">
							<UserImg width="40" hight="40" v-if="done_task?.assignee?.image==null"></UserImg>
						</span>
						<div v-if="done_task?.assignee?.image!=null" class="img_user">
							<img :src="storage_url+'/'+done_task?.assignee?.image" :title="done_task?.assignee?.full_name">
						</div>
					</td>
					<td>{{ done_task?.agent?.full_name }}</td>
					<td>{{ done_task?.date }} {{ done_task?.time?.substring(0,5) }}</td>
					<td>
					<div class="d-flex gap-4 justify-content-end">
						<AddIcon v-if="user.user_name == done_task?.assignee?.user_name" @click="process='sub';sub_type='done';init();selected_item=done_task" data-bs-toggle="modal" data-bs-target="#addModal" class="add-icon-table cursor_p"></AddIcon>
						<DeleteIcon  v-if="user.user_name == done_task?.assignee?.user_name" @click="deleteTask();change_selected_item(done_task);process='task'" class="cursor_p"></DeleteIcon>
						<EditIcon v-if="user.user_name == done_task?.assignee?.user_name" @click="change_selected_item(done_task);process='task'" data-bs-toggle="modal" data-bs-target="#addModal" class="cursor_p"></EditIcon>
					</div>
					</td>
				</tr>
				<template v-if="done_task?.subtasks_expanded && collapsed[2]==true">
					<template v-for="done_subtask in done_task?.subtasks?.data" :key="done_subtask?.id">
						<tr class="tr-style">
							<td class="td-subtask">
								<div class="dropdown subTask-drop">
									<button @click="process='sub'" class="btn dropdown-toggle dropdown-toggle-table" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
										<div class="d-flex gap-2 justify-content-center align-items-center">
											<div v-if="done_subtask?.status=='to_do'" class="circle-status"></div>
											<Inprogress v-if="done_subtask?.status=='in_progress'"></Inprogress>
											<DoneIcon v-if="done_subtask?.status=='done'"></DoneIcon>
										</div>
									</button>
									<button class="task-title" data-bs-toggle="modal" data-bs-target="#taskDetails" @click="change_selected_item(done_subtask)">{{ done_subtask?.title }}</button>
									<ul v-if="user.user_name == done_subtask?.assignee?.user_name" class="dropdown-menu dropdown-menu-table" aria-labelledby="dropdownMenuButton1">
										<li @click="change_status(type='to_do',done_subtask,done_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"><div class="circle-status"></div><div>{{$t('to_do')}}</div></a></li>
										<li @click="change_status(type='in_progress',done_subtask,done_task)"><a class="dropdown-item dropdown-item-table" href="#" style="border-bottom: 1px solid #E0E0E0;"> <Inprogress></Inprogress><div>{{$t('In Progress')}}</div></a></li>
										<li @click="change_status(type='done',done_subtask,done_task)"><a class="dropdown-item dropdown-item-table" href="#"><DoneIcon></DoneIcon><div>{{$t('Done')}}</div> </a></li>
									</ul>
								</div>
							</td>
							<td>
								<span :title="done_subtask?.assignee?.full_name">
									<UserImg width="40" hight="40" v-if="done_subtask?.assignee?.image==null"></UserImg>
								</span>
								<div v-if="done_subtask?.assignee?.image!=null" class="img_user">
									<img :src="storage_url+'/'+done_subtask?.assignee?.image" :title="done_subtask?.assignee?.full_name">
								</div>
							</td>
							<td>{{ done_subtask?.agent?.full_name  }}</td>
							<td>{{ done_subtask?.date }} {{ done_subtask?.time }}</td>
							<td>
								<div class="d-flex gap-4 subTask-icon">
									<DeleteIcon  v-if="user.user_name == done_subtask?.assignee?.user_name" @click="deleteTask(done_task?.id);change_selected_item(done_subtask);process='sub'" class="cursor_p"></DeleteIcon>
									<EditIcon v-if="user.user_name == done_subtask?.assignee?.user_name" @click="change_selected_item(done_subtask, taskId = done_task?.id);process='sub'" data-bs-toggle="modal" data-bs-target="#addModal" class="cursor_p"></EditIcon>
								</div>
							</td>
						</tr>
					</template>
					<div class="d-flex" v-if="done_task?.subtasks_expanded == true">
						<button type="button" class="load-more-btn" style="padding-inline:75px" @click="get_done_subtasks(done_task?.id); check_load_btn = true" v-if="done_task?.subtasks?.meta && done_task?.subtasks?.meta?.current_page != done_task?.subtasks?.meta?.last_page">
							<div class="d-flex align-items-center gap-2">
								<i class="fa-solid fa-arrow-down"></i>
								<div>{{$t('Load more subtasks')}}</div>
							</div>
						</button>
						<span v-if="done_task.loader" class="lds-dual-ring-sm"></span>
					</div>
			</template>
		</template>
        </table>
		<div class="d-flex">
			<button type="button" class="load-more-btn" @click="get_done_tasks()" v-if="done_tasks_meta && done_tasks_meta?.current_page != done_tasks_meta?.last_page">
				<span v-if="done_load_more_loader && done_tasks_data.length > 0 " class="lds-dual-ring-sm"></span>
				<i class="fa-solid fa-arrow-down"></i>
				<div>{{$t('Load more tasks')}}</div>
			</button>
		</div>
     </div>
     <div class="modal fade" id="taskDetails" tabindex="-1" aria-labelledby="taskDetailsLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-style">
              <div class="modal-content modal_content modal_content_task">
                <div class="modal-body modal_body">
                <div class="modal-header modal_header">
                      <h5 class="modal-title modal_title_task" id="addModalLabel">{{ task_title }} </h5>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="task-header">
                  <div class="d-flex gap-2 align-items-center">
                    <div class="modal-word">{{$t('Status')}}</div>
                    <!-- To Do Status -->
                    <div class="d-flex gap-2 align-items-center toDo-box" v-if="select_status?.id == 'to_do'">
                      <div class="circle-status"></div>
                      <div class="toDo-stat">{{$t('to_do')}}</div>
                    </div>
                    <!-- In Progress Status -->
                    <div class="d-flex gap-2 align-items-center inProgress-box"  v-if="select_status?.id == 'in_progress'">
                      <Inprogress></Inprogress>
                      <div class="inProgress-stat">{{$t('In Progress')}}</div>
                    </div>
                    <!-- Done State -->
                    <div class="d-flex gap-2 align-items-center Done-box"  v-if="select_status?.id == 'done'">
                      <DoneIcon></DoneIcon>
                      <div class="Done-stat">{{$t('Done')}}</div>
                    </div>
                  </div>
                  <div class="d-flex gap-2 align-items-center">
                    <div class="modal-word">{{$t('Due date')}}</div>
                    <div class="modal-dec text-nowrap">{{task_date}}, {{task_time?.substring(0,5)}}</div>
                  </div>
                  <div class="d-flex gap-2 align-items-center justify-content-between w-100">
                    <div class="d-flex gap-2 align-items-center">
                      <div class="modal-word">{{$t('Agent')}}</div>
                      <div class="modal-dec agent-name">{{selected_item?.agent?.full_name}}</div>
                    </div>
                    <div class="sub-task-num">
                      <SubTaskIcon></SubTaskIcon>
                      <span>{{ selected_item?.subtask_count }}</span>
                  </div>   
                  </div>  
                </div>
                <div class="modal-desc mt-2">{{ task_description }}</div>
                <div class="d-flex gap-2 gap-1 align-items-center mt-3">
                  <div class="modal-word">{{$t('Assigned to')}}</div>
                  <div class="modal-desc d-flex gap-2 align-items-center">
                    <!-- <div style="width: 20px; height: 20px; border-radius: 20px;">
                      <img style="object-fit: cover;" src="" alt="">
                    </div>  -->
						<UserImg width="20" hight="20" v-if="selected_item?.assignee?.image==null"></UserImg>
						<div v-if="selected_item?.assignee?.image!=null" class="img_user">
							<img :src="storage_url+'/'+selected_item?.assignee?.image">
						</div>
                     	<div>{{selected_item?.assignee?.full_name}}</div>
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
                <h5 v-if="operation == 'add' && process == 'task'" class="modal-title modal_title" id="addModalLabel">{{$t('New Task')}}</h5>
                <h5 v-if="operation == 'add' && process == 'sub'" class="modal-title modal_title" id="addModalLabel">{{$t('New Subtask')}}</h5>
                <h5 v-if="operation == 'edit' && process!='sub'" class="modal-title modal_title" id="addModalLabel">{{$t('Edit Task')}}</h5>
                <h5 v-if="operation == 'edit' && process=='sub'" class="modal-title modal_title" id="addModalLabel">{{$t('Edit Subtask')}}</h5>
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
                  <div v-if="process!='sub' && operation != 'edit'" class="mb-2">
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
                        <div class="col-lg-6 col-md-6 col-sm-12">
                          <input v-model="task_date" class="input-style fieldDate" type="date" id="task_title" name="task_date">
                          <div v-for="(item, index) in v$.task_date.$errors" :key="index" class="error-msg mx-1 gap-1">
                              <div class="error-txt">
                              <i class="fa-solid fa-exclamation error-icon"></i>
                              </div>
                              <span v-if="item.$message" class="valid_msg">{{ _t(item.$message) }}</span>
                          </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12">
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
                      <v-select class="select-style-modal input-style mb-2" :options="[ {label:$t('to_do'),id:'to_do'},{label:$t('In Progress'),id:'in_progress'},{label:$t('Done'),id:'done'}]" v-model="select_status" :placeholder="$t('Choose task status')"></v-select>          
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
                <button v-if="operation == 'add'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="process!='sub'?addTask():addSubTask()">
                  <div v-if="loading_loader" class="lds-dual-ring-white"></div>
                  <template v-if="!loading_loader && process!='sub'">{{$t('Add task')}}</template>
				  <template v-if="!loading_loader && process=='sub'">{{$t('Add')}}</template>
                </button>

				<button v-if="operation == 'edit'" :disabled="loading_loader" type="button" class="button-style button-style-modal" @click.prevent="editTask()">
					<div v-if="loading_loader" class="lds-dual-ring-white"></div>
					<template v-if="!loading_loader">{{$t('Edit Task')}}</template>
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
                  <!-- <label class="label-style" for="">{{$t('Due date')}}</label> -->
                  <div class="row">
                    <div class="col-lg-6 col-md-6 col-sm-12">
					<label class="label-style" for="start-date">{{$t('Start date')}}</label>
                      <input v-model="filter_task_date1" class="input-style fieldDate" type="date" id="start-date" name="filter_task_date">
                    </div>
                    <div class="col-lg-6 col-md-6 col-sm-12 margin-top-col">
						<label class="label-style" for="end-date">{{$t('End date')}}</label>
						<input v-model="filter_task_date2" class="input-style fieldDate" type="date" id="end-date" name="filter_task_date">
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
			collapsed:[true,true,true,true],
			// collapsed_subTask:false,
			collapsed_subTask: Array.from({ length: 50 }, () => false),
			
			per_page:2,
			to_do_loader:false,
			to_do_load_more_loader:false,
			to_do_tasks_data:[],
			to_do_tasks_meta:[],
			process:'',
			in_progress_loader:false,
			in_progress_load_more_loader:false,
			in_progress_tasks_data:[],
			in_progress_tasks_meta:[],
			check_load_btn:false,

			done_loader:false,
			done_load_more_loader:false,
			done_tasks_data:[],
			done_tasks_meta:[],
			check_load_btn:false,
			sub_type:'',
			task_title:'',
			task_description:'',
			agents:[],
			select_agent:'',
			select_status:'',
			task_date:'',
			task_time:'',
			loading_loader:false,
			searchAgentLoading:false,
			searchBranchesLoading:false,
			selected_item:{},
			searchEmployeeLoading:false,
			loading: false,
			filter_agent:null,
			employees:[],
			filter_branch:null,
			filter_employee:null,
			filter_task_date1:'',
			filter_task_date2:'',
			filterCounter:0,
			operation:'add',
			taskId:'',
			storage_url:storage_url,
			search_name:'',
			vuelidateExternalResults: {
				task_title:[],
				task_description:[],
				task_date:[],
				task_time:[],
				select_agent:[],
				select_status:[],
			},
		}
	},
	computed :{
		...mapState(useAuthStore, {
			user: 'user'
		}),
	...mapState(useLangStore, {
			lang: 'language'
		}),

	},
	components:{ FilterIcon, SearchIcon, ArrowIcon, UserImg, AddIcon, DeleteIcon, EditIcon, SubTaskIcon, Inprogress, DoneIcon},
	methods:{
		_t(message){return _t(message, this.$t);},
		get_todo_tasks(){
			this.to_do_loader = true;
			this.to_do_load_more_loader = true;
			var page = (this.to_do_tasks_meta?.current_page??0) + 1;
			var q = this.search_name!='' ? "&q="+this.search_name : ""; 
			var agent_id = (this.filter_agent!=null && this.filter_agent)?`&agent_id=${this.filter_agent?.id}`:''
			var branch_id = (this.filter_branch!=null && this.filter_branch)?`&branch_id=${this.filter_branch?.id}`:''
			var assignee_id = (this.filter_employee!=null && this.filter_employee)?`&assignee_id=${this.filter_employee?.id}`:''
			var start_date = this.filter_task_date1!='' ? "&start_date="+this.filter_task_date1 : ""; 
			var end_date = this.filter_task_date2!='' ? "&end_date="+this.filter_task_date2 : ""; 

			axios.get(`${api_url}/tasks?group=to_do&page=${page}&per_page=${this.per_page}${q}${agent_id}${branch_id}${assignee_id}${start_date}${end_date}`,
				{ headers:{...authHeader()} }
			).then((response) => {
				this.to_do_loader = false;
				this.to_do_load_more_loader = false;
				this.to_do_tasks_data.push(...response.data.data);
				this.to_do_tasks_meta = response.data.meta;
			});
		},
		get_to_do_subtasks(id){
			var task_ind = null;
			this.to_do_tasks_data.forEach((el,i) => {
				if(el?.id == id)
					task_ind = i;
			});
			
			if(!this.to_do_tasks_data[task_ind])
				return;
			this.to_do_tasks_data[task_ind].loader = true;
			// this.to_do_tasks_data[task_ind].subtasks_expanded = !this.to_do_tasks_data[task_ind].subtasks_expanded;
			// var page = this.to_do_tasks_data[task_ind].subtasks_expanded == true ? (this.to_do_tasks_data[task_ind]?.subtasks?.meta?.current_page??0) + 1 : 0;
			var page = (this.to_do_tasks_data[task_ind]?.subtasks?.meta?.current_page??0) + 1 ;
			axios.get(`${api_url}/tasks?parent_task_id=${id}&page=${page}&per_page=${this.per_page}`,
				{ headers:{...authHeader()} }
			).then((response) => {
				this.to_do_tasks_data[task_ind].loader = false;

				if(!this.to_do_tasks_data[task_ind].subtasks)
					this.to_do_tasks_data[task_ind].subtasks = { data: [], meta: null };

				this.to_do_tasks_data[task_ind].subtasks.data.push(...response.data.data);
				this.to_do_tasks_data[task_ind].subtasks.meta = response.data.meta;
				this.to_do_tasks_data[task_ind].subtask_count = response.data.meta.total;
			});
		},
		get_in_progress_tasks(){
			this.in_progress_loader = true;
			this.in_progress_load_more_loader = true;
			var page = (this.in_progress_tasks_meta?.current_page??0) + 1;
			var q = this.search_name!='' ? "&q="+this.search_name : ""; 
			var agent_id = (this.filter_agent!=null && this.filter_agent)?`&agent_id=${this.filter_agent?.id}`:'';
			var branch_id = (this.filter_branch!=null && this.filter_branch)?`&branch_id=${this.filter_branch?.id}`:''
			var assignee_id = (this.filter_employee!=null && this.filter_employee)?`&assignee_id=${this.filter_employee?.id}`:''
			var start_date = this.filter_task_date1!='' ? "&start_date="+this.filter_task_date1 : ""; 
			var end_date = this.filter_task_date2!='' ? "&end_date="+this.filter_task_date2 : ""; 

			axios.get(`${api_url}/tasks?group=in_progress&page=${page}&per_page=${this.per_page}${q}${agent_id}${branch_id}${assignee_id}${start_date}${end_date}`,
				{ headers:{...authHeader()} }
			).then((response) => {
				this.in_progress_loader = false;
				this.in_progress_load_more_loader = false;
				this.in_progress_tasks_data.push(...response.data.data);
				this.in_progress_tasks_meta = response.data.meta;
			});
		},
		get_in_progress_subtasks(id){
			var task_ind = null;
			this.in_progress_tasks_data.forEach((el,i) => {
				if(el?.id == id)
					task_ind = i;
			});
			
			if(!this.in_progress_tasks_data[task_ind])
				return;

			this.in_progress_tasks_data[task_ind].loader = true;
				
			var page = (this.in_progress_tasks_data[task_ind]?.subtasks?.meta?.current_page??0) + 1 ;
			axios.get(`${api_url}/tasks?parent_task_id=${id}&page=${page}&per_page=${this.per_page}`,
				{ headers:{...authHeader()} }
			).then((response) => {
				this.in_progress_tasks_data[task_ind].loader = false;

				if(!this.in_progress_tasks_data[task_ind].subtasks)
					this.in_progress_tasks_data[task_ind].subtasks = { data: [], meta: null };

				this.in_progress_tasks_data[task_ind].subtasks.data.push(...response.data.data);
				this.in_progress_tasks_data[task_ind].subtasks.meta = response.data.meta;
				this.in_progress_tasks_data[task_ind].subtask_count = response.data.meta.total;

			});
		},
		get_done_tasks(){
			this.done_loader = true;
			this.done_load_more_loader = true;
			var page = (this.done_tasks_meta?.current_page??0) + 1;
			var q = this.search_name!='' ? "&q="+this.search_name : ""; 
			var agent_id = (this.filter_agent!=null && this.filter_agent)?`&agent_id=${this.filter_agent?.id}`:''
			var branch_id = (this.filter_branch!=null && this.filter_branch)?`&branch_id=${this.filter_branch?.id}`:''
			var assignee_id = (this.filter_employee!=null && this.filter_employee)?`&assignee_id=${this.filter_employee?.id}`:''
			var start_date = this.filter_task_date1!='' ? "&start_date="+this.filter_task_date1 : ""; 
			var end_date = this.filter_task_date2!='' ? "&end_date="+this.filter_task_date2 : ""; 

			axios.get(`${api_url}/tasks?group=done&page=${page}&per_page=${this.per_page}${q}${agent_id}${branch_id}${assignee_id}${start_date}${end_date}`,
				{ headers:{...authHeader()} }
			).then((response) => {
				this.done_loader = false;
				this.done_load_more_loader = false;
				this.done_tasks_data.push(...response.data.data);
				this.done_tasks_meta = response.data.meta;
			});
		},
		get_done_subtasks(id){
			var task_ind = null;
			this.done_tasks_data.forEach((el,i) => {
				if(el?.id == id)
					task_ind = i;
			});
			
			if(!this.done_tasks_data[task_ind])
				return;

			this.done_tasks_data[task_ind].loader = true;
			var page = (this.done_tasks_data[task_ind]?.subtasks?.meta?.current_page??0) + 1 ;
				
			axios.get(`${api_url}/tasks?parent_task_id=${id}&page=${page}&per_page=${this.per_page}`,
				{ headers:{...authHeader()} }
			).then((response) => {
				this.done_tasks_data[task_ind].loader = false;

				if(!this.done_tasks_data[task_ind].subtasks)
					this.done_tasks_data[task_ind].subtasks = { data: [], meta: null };

				this.done_tasks_data[task_ind].subtasks.data.push(...response.data.data);
				this.done_tasks_data[task_ind].subtasks.meta = response.data.meta;
				this.done_tasks_data[task_ind].subtask_count = response.data.meta.total;

			});
		},
		addTask(){
			this.vuelidateExternalResults.task_title=[],
			this.vuelidateExternalResults.task_description=[],
			this.vuelidateExternalResults.task_date=[],
			this.vuelidateExternalResults.task_time=[],
			this.vuelidateExternalResults.select_agent=[],
			this.vuelidateExternalResults.select_status=[],

			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}
			this.loading_loader = true;
			var data = { 
				title:this.task_title,
				description:this.task_description,
				agent_id:this.select_agent?.id,
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
			axios.post(`${api_url}/tasks`, formData, {
				headers: {...authHeader()}
			}).then((response) => {
				this.loading_loader = false;
				Toast.fire({
					icon: 'success',
					title: this.$t('Added')
				});
				document.querySelector('#addModal .btn-close-modal').click();
				if(response.data.data.status == 'to_do'){
					this.to_do_tasks_data=[];
					this.to_do_tasks_meta.current_page = 0;
					this.get_todo_tasks()
				}else if(response.data.data.status == 'in_progress'){
					this.in_progress_tasks_data=[];
					this.in_progress_tasks_meta.current_page = 0;
					this.get_in_progress_tasks()
				}if(response.data.data.status == 'done'){
					this.done_tasks_data=[];
					this.done_tasks_meta.current_page = 0;
					this.get_done_tasks()
				}
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
		addSubTask(){
			this.vuelidateExternalResults.task_title=[],
			this.vuelidateExternalResults.task_description=[],
			this.vuelidateExternalResults.task_date=[],
			this.vuelidateExternalResults.task_time=[],
			this.vuelidateExternalResults.select_agent=[],
			this.vuelidateExternalResults.select_status=[],

			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}
			this.loading_loader = true;
			var data = { 
				title:this.task_title,
				description:this.task_description,
				agent_id:this.select_agent?.id,
				date:this.task_date,
				time:this.task_time,
				status:this.select_status?.id,
				task_id:this.selected_item?.id
			};
			var formData = new FormData();
			Object.keys(data).forEach((key) => {
				if((!['description'].includes(key)) || (data[key] != null && data[key] !== "")){
					formData.append(key, data[key]);
				}
			});
			// 'Content-Type': 'multipart/form-data
			axios.post(`${api_url}/tasks/subtask`, formData, {
				headers: {...authHeader()}
			}).then((response) => {
				this.loading_loader = false;
				Toast.fire({
					icon: 'success',
					title: this.$t('Added')
				});
				document.querySelector('#addModal .btn-close-modal').click();
				if(response.data.data.status == 'to_do'){
					for (let i = 0; i < this.to_do_tasks_data.length; i++) {
						if(this.to_do_tasks_data[i]?.id == this.selected_item.id){
							this.to_do_tasks_data[i].subtask_count = 0;
							this.to_do_tasks_data[i].subtasks ??= {};
							this.to_do_tasks_data[i].subtasks.data=[];
							this.to_do_tasks_data[i].subtasks.meta ??= {};
							this.to_do_tasks_data[i].subtasks.meta.current_page = 0;
						}
					}
					this.get_to_do_subtasks(this.selected_item?.id)
				}else if(response.data.data.status == 'in_progress'){
					// this.in_progress_tasks_data.forEach((el,i) => {
					// 	if(el?.id == this.selected_item.id){
					// 		el.subtasks ??= {};
					// 		el.subtasks.data=[];
					// 		el.subtasks.meta ??= {};
					// 		el.subtasks.meta.current_page = 0;
					// 	}
					// });
					// this.get_in_progress_subtasks(this.selected_item?.id)
					for (let i = 0; i < this.in_progress_tasks_data.length; i++) {
						if(this.in_progress_tasks_data[i]?.id == this.selected_item.id){
							this.in_progress_tasks_data[i].subtask_count = 0;
							this.in_progress_tasks_data[i].subtasks ??= {};
							this.in_progress_tasks_data[i].subtasks.data=[];
							this.in_progress_tasks_data[i].subtasks.meta ??= {};
							this.in_progress_tasks_data[i].subtasks.meta.current_page = 0;
						}
					}
					this.get_in_progress_subtasks(this.selected_item?.id)
				}if(response.data.data.status == 'done'){
					// this.done_tasks_data.forEach((el,i) => {
					// 	if(el?.id == this.selected_item.id){
					// 		el.subtasks ??= {};
					// 		el.subtasks.data=[];
					// 		el.subtasks.meta ??= {};
					// 		el.subtasks.meta.current_page = 0;
					// 	}
					// });
					// this.get_done_subtasks(this.selected_item?.id)
					for (let i = 0; i < this.done_tasks_data.length; i++) {
						if(this.done_tasks_data[i]?.id == this.selected_item.id){
							this.done_tasks_data[i].subtask_count = 0;
							this.done_tasks_data[i].subtasks ??= {};
							this.done_tasks_data[i].subtasks.data=[];
							this.done_tasks_data[i].subtasks.meta ??= {};
							this.done_tasks_data[i].subtasks.meta.current_page = 0;
						}
					}
					this.get_done_subtasks(this.selected_item?.id)
				}
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
			this.to_do_tasks_meta.current_page=0;
			this.to_do_tasks_data=[];
			this.get_todo_tasks();
			this.in_progress_tasks_meta.current_page=0;
			this.in_progress_tasks_data=[];
			this.get_in_progress_tasks();
			this.done_tasks_meta.current_page=0;
			this.done_tasks_data=[];
			this.get_done_tasks();
			document.querySelector('#filterBy .btn-close-k').click();
		},
		resetFilter(){
			this.filter_branch=null;
			this.filter_agent=null;
			this.filter_employee=null;
			this.filter_task_date1='';
			this.filter_task_date2='';

			this.to_do_tasks_meta.current_page=0;
			this.to_do_tasks_data=[];
			this.get_todo_tasks();

			// this.in_progress_tasks_data = {};
			this.in_progress_tasks_data.data=[];
			// this.in_progress_tasks_data.meta = {};
			this.in_progress_tasks_data.meta.current_page = 0;
			this.get_in_progress_tasks();
			
			// this.done_tasks_data = {};
			this.done_tasks_data.data=[];
			// this.done_tasks_data.meta = {};
			this.done_tasks_data.meta.current_page = 0;
			this.get_done_tasks();
			this.filterCounter=0;
		},
		init(){
			this.v$.$reset();
			this.operation = 'add';
			this.task_title = '';
			this.task_description='';
			this.select_agent='';
			this.task_date='';
			this.task_time='';
			if(this.process!='sub'){
				this.select_status={label:this.$t('to_do'),id:'to_do'}
			}else if(this.sub_type=='progress'){
				this.select_status={label:this.$t('In Progress'),id:'in_progress'}
			}else if(this.sub_type=='done'){
				this.select_status={label:this.$t('Done'),id:'done'}
			}else if(this.sub_type=='to_do'){
				this.select_status={label:this.$t('to_do'),id:'to_do'}
			}
		},
		editTask(){
			this.vuelidateExternalResults.task_title=[],
			this.vuelidateExternalResults.task_description=[],
			this.vuelidateExternalResults.task_date=[],
			this.vuelidateExternalResults.task_time=[],
			this.vuelidateExternalResults.select_agent=[],
			this.vuelidateExternalResults.select_status=[],
			
			this.v$.$touch();
			if (this.v$.$invalid) {
				return;
			}
			this.loading_loader = true;
			var data = { 
				title:this.task_title,
				description:this.task_description,
				date:this.task_date,
				time:this.task_time.substring(0, 5),
				status:this.select_status?.id,
				_method:'PUT'
			};
			var formData = new FormData();
			Object.keys(data).forEach((key) => {
				if((!['description'].includes(key)) || (data[key] != null && data[key] !== "")){
					formData.append(key, data[key]);
				}
			});
			axios.post(`${api_url}/tasks/${this.selected_item?.id}`, formData, {
				headers: {...authHeader()}
			}).then((response) => {
				this.loading_loader = false;
				Toast.fire({
					icon: 'success',
					title: this.$t('Updated')
				});
				document.querySelector('#addModal .btn-close-modal').click();

				if( this.process == 'task' ){
					if(response.data.data.status == 'to_do'){
						this.to_do_tasks_data=[];
						this.to_do_tasks_meta.current_page = 0;
						this.get_todo_tasks()
					}else if(response.data.data.status == 'in_progress'){
						this.in_progress_tasks_data=[];
						this.in_progress_tasks_meta.current_page = 0;
						this.get_in_progress_tasks()
					}if(response.data.data.status == 'done'){
						this.done_tasks_data=[];
						this.done_tasks_meta.current_page = 0;
						this.get_done_tasks()
					}
				}else if( this.process == 'sub' ){
					if(response.data.data.status == 'to_do'){
						this.to_do_tasks_data.forEach((el,i) => {
							if(el?.id == this.taskId){
								el.subtasks.data=[]
								el.subtasks.meta.current_page = 0;
							}
						});
						this.get_to_do_subtasks(this.taskId)
					}else if(response.data.data.status == 'in_progress'){
						this.in_progress_tasks_data.forEach((el,i) => {
							if(el?.id == this.taskId){
								el.subtasks.data=[]
								el.subtasks.meta.current_page = 0;
							}
						});
						this.get_in_progress_subtasks(this.taskId)
					}else if(response.data.data.status == 'done'){
						this.done_tasks_data.forEach((el,i) => {
							if(el?.id == this.taskId){
								el.subtasks.data=[]
								el.subtasks.meta.current_page = 0;
							}
						});
						this.get_done_subtasks(this.taskId)
					}

				}

			},error=>{
				this.loading_loader = false;
				if(error.response.status==422)
				{
					var errors = error.response.data.errors;
					this.vuelidateExternalResults.task_title=errors.title??[],
					this.vuelidateExternalResults.description=errors.task_description??[]
					this.vuelidateExternalResults.select_agent=errors.agent_id??[]
					this.vuelidateExternalResults.task_date=errors.date??[]
					this.vuelidateExternalResults.task_time=errors.time??[]
					this.vuelidateExternalResults.select_status=errors.status??[]
				}
			});
		},
		change_selected_item(value, taskId){
			console.log('addcccvvv')
			if(!value)
				return;
			console.log('value',value)
			this.selected_item = value;
			this.v$.$reset();
			this.operation = 'edit';
			this.taskId = taskId;
			this.task_title = value.title;
			this.task_description = value.description;
			this.task_date =  value.date;
			this.task_time =  value.time;
			// value.status.label = value.status.label;
			this.select_status =  {id:value.status, label:this.$t(value.status)};

		},
		deleteTask(taskId){
			this.$swal.fire({
				title: this.$t('Are you sure you want to delete this task?'),
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
					axios.delete(`${api_url}/tasks/${this.selected_item?.id}`, {headers: {...authHeader()}
					}).then((response) => {
						Toast.fire({
							icon: 'success',
							title: this.$t('Deleted')
						});
						
						if( this.process == 'task' ){
							if(this.selected_item?.status == 'to_do'){
								this.to_do_tasks_data=[];
								this.to_do_tasks_meta.current_page = 0;
								this.get_todo_tasks()
							}else if(this.selected_item?.status == 'in_progress'){
								this.in_progress_tasks_data=[];
								this.in_progress_tasks_meta.current_page = 0;
								this.get_in_progress_tasks()
							}if(this.selected_item?.status == 'done'){
								this.done_tasks_data=[];
								this.done_tasks_meta.current_page = 0;
								this.get_done_tasks()
							}
						}else if( this.process == 'sub' ){
							if(this.selected_item?.status == 'to_do'){
								this.to_do_tasks_data.forEach((el,i) => {
									if(el?.id == taskId){
										el.subtasks.data=[]
										el.subtasks.meta.current_page = 0;
									}
								});
								this.get_to_do_subtasks(taskId)
							}else if(this.selected_item?.status == 'in_progress'){
								this.in_progress_tasks_data.forEach((el,i) => {
									if(el?.id == taskId){
										el.subtasks.data=[]
										el.subtasks.meta.current_page = 0;
									}
								});
								this.get_in_progress_subtasks(taskId)
							}else if(this.selected_item?.status == 'done'){
								console.log('1')
								this.done_tasks_data.forEach((el,i) => {
									if(el?.id == taskId){
										console.log('2')
										el.subtasks.data=[]
										el.subtasks.meta.current_page = 0;
									}
								});
								console.log('3')
								this.get_done_subtasks(taskId)
							}

						}
					})
				}
			},error=>{

			});
		},
		change_status(type,item, parent = null){
			var data = { 
				status:type,
				_method:'PUT'
			};
			var formData = new FormData();
			Object.keys(data).forEach((key) => {
				formData.append(key, data[key]);
			});
			axios.post(`${api_url}/tasks/${item?.id}/change_status`, formData, {
				headers: {...authHeader()}
			}).then((response) => {
				
				Toast.fire({
					icon: 'success',
					title: this.$t('Updated')
				});
				document.querySelector('#addModal .btn-close-modal').click();

				if(this.process == 'task')
				{
					if(type == 'to_do' || item?.status == 'to_do'){
						this.to_do_tasks_data=[];
						this.to_do_tasks_meta.current_page = 0;
						this.get_todo_tasks();
					}
					if(type == 'in_progress' || item?.status == 'in_progress'){
						this.in_progress_tasks_data=[];
						this.in_progress_tasks_meta.current_page = 0;
						this.get_in_progress_tasks();
					}
					if(type == 'done' || item?.status == 'done'){
						this.done_tasks_data=[];
						this.done_tasks_meta.current_page = 0;
						this.get_done_tasks();
					}
				}
				else if(this.process == 'sub')
				{
					if(parent?.status == 'to_do'){
						for (let i = 0; i < this.to_do_tasks_data.length; i++) {
							if(this.to_do_tasks_data[i]?.id == parent?.id){
								this.to_do_tasks_data[i].subtasks.data=[];
								this.to_do_tasks_data[i].subtasks.meta={};
								this.to_do_tasks_data[i].subtasks.meta.current_page = 0;
								this.get_to_do_subtasks(parent?.id);
							}
						}
					}
					if(parent?.status == 'in_progress'){
						for (let i = 0; i < this.in_progress_tasks_data.length; i++) {
							if(this.in_progress_tasks_data[i]?.id == parent?.id){
								this.in_progress_tasks_data[i].subtasks.data=[];
								this.in_progress_tasks_data[i].subtasks.meta={};
								this.in_progress_tasks_data[i].subtasks.meta.current_page = 0;
								this.get_in_progress_subtasks(parent?.id);
							}
						}
					}
					if(parent?.status == 'done'){
						for (let i = 0; i < this.done_tasks_data.length; i++) {
							if(this.done_tasks_data[i]?.id == parent?.id){
								this.done_tasks_data[i].subtasks.data=[];
								this.done_tasks_data[i].subtasks.meta={};
								this.done_tasks_data[i].subtasks.meta.current_page = 0;
								this.get_done_subtasks(parent?.id);
							}
						}
					}
					
				}
			},error=>{
				this.loading_loader = false;
			}
		)}
	},
	mounted(){
		this.get_todo_tasks();
		this.get_in_progress_tasks();
		this.get_done_tasks();
		document.querySelectorAll('.fieldDate').forEach(element => {
			element.min= new Date().toISOString().split("T")[0];
		});
    	this.searchEmployee('',null,true)
	},
	validations() {
		var not_sub = (value) => { return (!(this.process!='sub') || !(this.operation != 'edit')) || value }
		var for_edit_task = (value) => { return !(this.operation!='edit') || value }
		return {
			task_title : {
				required: helpers.withMessage('_.required.title', required),
			},
			select_agent: {
				not_sub: helpers.withMessage('_.required.agent', not_sub),
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
		filter_task_date1(_new,_old){
		if(_new != '' && _old==''){
			this.filterCounter=this.filterCounter+1
		}
		if(_new=='' && this.filterCounter>0){
			this.filterCounter=this.filterCounter-1;
		}
		},
		filter_task_date2(_new,_old){
		if(_new != '' && _old==''){
			this.filterCounter=this.filterCounter+1
		}
		if(_new=='' && this.filterCounter>0){
			this.filterCounter=this.filterCounter-1;
		}
		},
		search_name(newVal,oldVal){
			this.to_do_tasks_meta.current_page=0;
			this.to_do_tasks_data=[];
			this.get_todo_tasks();
			this.in_progress_tasks_meta.current_page=0;
			this.in_progress_tasks_data=[];
			this.get_in_progress_tasks();
			this.done_tasks_meta.current_page=0;
			this.done_tasks_data=[];
			this.get_done_tasks();

		},
  	}
}
</script>

<style scoped>
.subTask-drop {
	text-align: left;
    padding-inline: 56px;
}
.load-more-btn {
  border: none;
  background-color: transparent;
  display: flex;
  font-size: 12px;
  font-weight: 400;
  color: var(--primary-color);
  align-items: center;
  gap: 6px;
  width: 100%;
  padding-inline: 40px;
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
 width: 138.72px;
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
  text-wrap:nowrap;
}
.Done-box {
	background-color: #62BB460D;
	padding: 4px 6px;
	border-radius: 5px;
	text-wrap:nowrap;
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
    width: fit-content;

}
.inprogress-style{
  background-color: #F58220;
    width: fit-content;
}
.done-style {
  background-color: #62BB46;
  width: fit-content;
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
    width: 100px;
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
  /* padding-inline: 20px; */
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
width: 270px;
text-overflow: ellipsis;
max-width: 270px;
overflow: hidden;
text-align: left;
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
[data-direction = rtl] .subTask-drop {
	text-align: right;
}
[data-direction = rtl] .task-title {
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
  .margin-top-col {
	margin-top: 20px;
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
    width: 242px;
  }
  .toDo-style {
    width: 257px;
  }
  .done-style {
    width: 170px;
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
}}
.lds-dual-ring-sm:after {
    content: " ";
    display: block;
    width: 15px;
    height: 15px;
    margin: 8px;
    border-radius: 50%;
    border: 3px solid #fff;
    border-color: #426AB3 transparent #426AB3 transparent;
    animation: lds-dual-ring 1.2s linear infinite;
}
.w_24{
	width: 24px;
}
.img_user{
	margin:auto;
}
.cursor_p{
	cursor:pointer;
}
</style>