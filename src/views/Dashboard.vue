<template>
    <div class="dashboard-wrap">
        <div class="dashboard-title">Dashboard</div>
        <div class="dashboard-content">
            <!-- teacher -->
            <div class="teacher-content" v-if="user?.role=== 'teacher'">
                <div class="teacher-lessons">
                    <div class="dashboard-table-wrap">
                        <div class="today-schedule">
                            <div class="today-schedule-text">{{$t('todaylesson')}}</div>
                            <div class="today-schedule-date">{{ myData?.today }}</div>
                        </div>
                        <div class="main-table-teacher">
                            <table class="table dashboard-table-teacher">
                                <!-- <thead class="table-head">
                                    <tr>
                                        <th class="teacher-table-th">Course name</th>
                                        <th class="teacher-table-th">Lesson name</th>
                                        <th class="teacher-table-th">Time</th>
                                    </tr>
                                </thead> -->
                                <tbody>
                                    <tr v-for="item in myData?.time_table" :key="item">
                                        <td class="teacher-table-td">{{ item?.course_name }}</td>
                                        <td class="teacher-table-td">{{ item?.lesson_name }}</td>
                                        <td class="teacher-table-td">{{ item?.lesson_time }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="teacher-courses">
                    <div class="courses-wrap">
                        <div class="corses-title">{{ $t('your courses') }}</div>
                        <div class="courses-content">
                            <div class="course-inner" v-for="course in myData?.course_list" :key="course">
                                <div class="course-info">
                                    <div class="course-name">{{ course?.course_name }}</div>
                                    <span class="course-finish">{{Math.round(course?.ended_course_percentage)}}%</span>
                                </div>
                                <div class="lessons-info-wrap">
                                    <div class="lesson-info">{{ $t('Total') }}:<span>{{ course?.lessons_count }} </span> {{ $t('lessons') }}</div>
                                    <div class="lesson-info">{{ $t('Finished') }}:<span>{{course?.ended_lessons_count}}</span> {{ $t('lessons') }}</div>
                                    <div class="lesson-info">{{ $t('Students') }}:<span>{{ course?.student_count }}</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- sales -->
            <div v-if="user?.role=== 'sale'">
                <div class="agents-tasks-wrap-sale">
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.125 26.25C28.125 26.25 30 26.25 30 24.375C30 22.5 28.125 16.875 20.625 16.875C13.125 16.875 11.25 22.5 11.25 24.375C11.25 26.25 13.125 26.25 13.125 26.25H28.125ZM13.1662 24.375C13.1524 24.3731 13.1386 24.3706 13.125 24.3675C13.1269 23.8725 13.4381 22.4363 14.55 21.1425C15.585 19.9294 17.4037 18.75 20.625 18.75C23.8444 18.75 25.6631 19.9312 26.7 21.1425C27.8119 22.4363 28.1213 23.8744 28.125 24.3675L28.11 24.3713C28.1013 24.3727 28.0925 24.374 28.0837 24.375H13.1662ZM16.875 6.72335C17.8696 6.72335 16.7967 7.03829 17.5 6.33502C18.2033 5.63176 19 5.68206 19 4.6875C19 3.69294 23.4809 6.32826 22.7776 5.625C22.0743 4.92174 24.9946 7 24 7C23.0054 7 18.6766 6.02009 17.9734 6.72335C17.2701 7.42661 16.875 8.38044 16.875 9.375C16.875 10.3696 15.2967 7.29674 16 8C16.7033 8.70326 15.8804 6.72335 16.875 6.72335ZM26.25 9.375C26.25 10.1137 26.1045 10.8451 25.8218 11.5276C25.5391 12.2101 25.1248 12.8301 24.6025 13.3525C24.0801 13.8748 23.4601 14.2891 22.7776 14.5718C22.0951 14.8545 21.3637 15 20.625 15C19.8863 15 19.1549 14.8545 18.4724 14.5718C17.7899 14.2891 17.1699 13.8748 16.6475 13.3525C16.1252 12.8301 15.7109 12.2101 15.4282 11.5276C15.1455 10.8451 15 10.1137 15 9.375C15 7.88316 15.5926 6.45242 16.6475 5.39752C17.7024 4.34263 19.1332 3.75 20.625 3.75C22.1168 3.75 23.5476 4.34263 24.6025 5.39752C25.6574 6.45242 26.25 7.88316 26.25 9.375ZM13.005 17.4C12.255 17.1638 11.4818 17.0086 10.6987 16.9369C10.2587 16.895 9.81699 16.8744 9.375 16.875C1.875 16.875 0 22.5 0 24.375C0 25.6256 0.624375 26.25 1.875 26.25H9.78C9.50204 25.6647 9.36342 25.0229 9.375 24.375C9.375 22.4813 10.0819 20.5462 11.4188 18.93C11.8744 18.3787 12.405 17.8631 13.005 17.4ZM9.225 18.75C8.11529 20.4174 7.51583 22.3722 7.5 24.375H1.875C1.875 23.8875 2.1825 22.4438 3.3 21.1425C4.32188 19.95 6.0975 18.7875 9.225 18.7519V18.75ZM2.8125 10.3125C2.8125 8.82066 3.40513 7.38992 4.46002 6.33502C5.51492 5.28013 6.94566 4.6875 8.4375 4.6875C9.92934 4.6875 11.3601 5.28013 12.415 6.33502C13.4699 7.38992 14.0625 8.82066 14.0625 10.3125C14.0625 11.8043 13.4699 13.2351 12.415 14.29C11.3601 15.3449 9.92934 15.9375 8.4375 15.9375C6.94566 15.9375 5.51492 15.3449 4.46002 14.29C3.40513 13.2351 2.8125 11.8043 2.8125 10.3125ZM3.5 9C2.50544 9 6.48911 6.95759 5.78585 7.66085C5.08259 8.36411 4.6875 9.31794 4.6875 10.3125C4.6875 11.3071 5.08259 12.2609 5.78585 12.9642C6.48911 13.6674 7.44294 14.0625 8.4375 14.0625C9.43206 14.0625 10.3859 13.6674 11.0892 12.9642C11.7924 12.2609 9.375 15.2845 9.375 14.29C9.375 13.2954 6.48911 15.2751 5.78585 14.5718C5.08259 13.8686 4.49456 9 3.5 9Z" fill="#F58220"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Total agents') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.total_agents }} {{ $t('agents') }}</div>
                        </div> 
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.125 26.25C28.125 26.25 30 26.25 30 24.375C30 22.5 28.125 16.875 20.625 16.875C13.125 16.875 11.25 22.5 11.25 24.375C11.25 26.25 13.125 26.25 13.125 26.25H28.125ZM13.1662 24.375C13.1524 24.3731 13.1386 24.3706 13.125 24.3675C13.1269 23.8725 13.4381 22.4363 14.55 21.1425C15.585 19.9294 17.4037 18.75 20.625 18.75C23.8444 18.75 25.6631 19.9312 26.7 21.1425C27.8119 22.4363 28.1213 23.8744 28.125 24.3675L28.11 24.3713C28.1013 24.3727 28.0925 24.374 28.0837 24.375H13.1662ZM16.875 6.72335C17.8696 6.72335 16.7967 7.03829 17.5 6.33502C18.2033 5.63176 19 5.68206 19 4.6875C19 3.69294 23.4809 6.32826 22.7776 5.625C22.0743 4.92174 24.9946 7 24 7C23.0054 7 18.6766 6.02009 17.9734 6.72335C17.2701 7.42661 16.875 8.38044 16.875 9.375C16.875 10.3696 15.2967 7.29674 16 8C16.7033 8.70326 15.8804 6.72335 16.875 6.72335ZM26.25 9.375C26.25 10.1137 26.1045 10.8451 25.8218 11.5276C25.5391 12.2101 25.1248 12.8301 24.6025 13.3525C24.0801 13.8748 23.4601 14.2891 22.7776 14.5718C22.0951 14.8545 21.3637 15 20.625 15C19.8863 15 19.1549 14.8545 18.4724 14.5718C17.7899 14.2891 17.1699 13.8748 16.6475 13.3525C16.1252 12.8301 15.7109 12.2101 15.4282 11.5276C15.1455 10.8451 15 10.1137 15 9.375C15 7.88316 15.5926 6.45242 16.6475 5.39752C17.7024 4.34263 19.1332 3.75 20.625 3.75C22.1168 3.75 23.5476 4.34263 24.6025 5.39752C25.6574 6.45242 26.25 7.88316 26.25 9.375ZM13.005 17.4C12.255 17.1638 11.4818 17.0086 10.6987 16.9369C10.2587 16.895 9.81699 16.8744 9.375 16.875C1.875 16.875 0 22.5 0 24.375C0 25.6256 0.624375 26.25 1.875 26.25H9.78C9.50204 25.6647 9.36342 25.0229 9.375 24.375C9.375 22.4813 10.0819 20.5462 11.4188 18.93C11.8744 18.3787 12.405 17.8631 13.005 17.4ZM9.225 18.75C8.11529 20.4174 7.51583 22.3722 7.5 24.375H1.875C1.875 23.8875 2.1825 22.4438 3.3 21.1425C4.32188 19.95 6.0975 18.7875 9.225 18.7519V18.75ZM2.8125 10.3125C2.8125 8.82066 3.40513 7.38992 4.46002 6.33502C5.51492 5.28013 6.94566 4.6875 8.4375 4.6875C9.92934 4.6875 11.3601 5.28013 12.415 6.33502C13.4699 7.38992 14.0625 8.82066 14.0625 10.3125C14.0625 11.8043 13.4699 13.2351 12.415 14.29C11.3601 15.3449 9.92934 15.9375 8.4375 15.9375C6.94566 15.9375 5.51492 15.3449 4.46002 14.29C3.40513 13.2351 2.8125 11.8043 2.8125 10.3125ZM3.5 9C2.50544 9 6.48911 6.95759 5.78585 7.66085C5.08259 8.36411 4.6875 9.31794 4.6875 10.3125C4.6875 11.3071 5.08259 12.2609 5.78585 12.9642C6.48911 13.6674 7.44294 14.0625 8.4375 14.0625C9.43206 14.0625 10.3859 13.6674 11.0892 12.9642C11.7924 12.2609 9.375 15.2845 9.375 14.29C9.375 13.2954 6.48911 15.2751 5.78585 14.5718C5.08259 13.8686 4.49456 9 3.5 9Z" fill="#F58220"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch agents') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.branch_agents }} {{ $t('agents') }}</div>
                        </div>
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <div class="icon-circle"></div>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('to_do') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.to_do }} {{ $t('tasks') }}</div>
                        </div>
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM0.777443 8C0.777443 11.9889 4.01109 15.2226 8 15.2226C11.9889 15.2226 15.2226 11.9889 15.2226 8C15.2226 4.01109 11.9889 0.777443 8 0.777443C4.01109 0.777443 0.777443 4.01109 0.777443 8Z" fill="#E57930"/>
                                <path d="M8 14.4C6.87808 14.4 5.77587 14.1051 4.80387 13.5448C3.83187 12.9845 3.02423 12.1786 2.46191 11.2077C1.8996 10.2369 1.60237 9.13533 1.60001 8.01342C1.59766 6.8915 1.89027 5.78868 2.44851 4.8155C3.00676 3.84233 3.81101 3.033 4.78065 2.46865C5.7503 1.9043 6.85126 1.60476 7.97317 1.60006C9.09508 1.59535 10.1985 1.88565 11.1729 2.44185C12.1472 2.99805 12.9582 3.80061 13.5246 4.76907L8 8V14.4Z" fill="#E57930"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('in_progress') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.total_agents }} {{ $t('tasks') }}</div>
                        </div>
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30 15C30 23.2843 23.2843 30 15 30C6.71573 30 0 23.2843 0 15C0 6.71573 6.71573 0 15 0C23.2843 0 30 6.71573 30 15ZM1.45771 15C1.45771 22.4792 7.5208 28.5423 15 28.5423C22.4792 28.5423 28.5423 22.4792 28.5423 15C28.5423 7.5208 22.4792 1.45771 15 1.45771C7.5208 1.45771 1.45771 7.5208 1.45771 15Z" fill="#F58220"/>
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M22.7071 9.29289C23.0976 9.68342 23.0976 10.3166 22.7071 10.7071L13.4142 20C12.6332 20.7811 11.3668 20.781 10.5858 20L6.29289 15.7071C5.90237 15.3166 5.90237 14.6834 6.29289 14.2929C6.68342 13.9024 7.31658 13.9024 7.70711 14.2929L12 18.5858L21.2929 9.29289C21.6834 8.90237 22.3166 8.90237 22.7071 9.29289Z" fill="#F58220"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Done') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.total_agents }} {{ $t('tasks') }}</div>
                        </div>
                    </div>
                </div>
                <div class="dashboard-table-wrap">
                    <div class="today-schedule">
                        <div class="today-schedule-text">{{ $t('todaystasks') }}</div>
                        <div class="today-schedule-date">{{ myData?.tasks?.today }}</div>
                    </div>
                    <div class="main-table-sale">
                        <table class="table dashboard-table-sale">
                            <thead class="table-head">
                                <tr>
                                    <th class="table-th1">{{ $t('Title') }}</th>
                                    <th class="table-th2">{{ $t('Agent') }}</th>
                                    <th class="table-th3">{{ $t('Due date') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in myData?.tasks?.today_tasks" :key="item">
                                    <td class="table-td1">
                                        <div class="table-td-content">
                                            <!-- task status:done -->
                                            <DoneIcon v-if="false"></DoneIcon>
                                            <!-- task status:to do -->
                                            <div class="toDo-icon" v-if="true"></div>
                                            <!-- task status:in progress -->
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="false">
                                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM0.777443 8C0.777443 11.9889 4.01109 15.2226 8 15.2226C11.9889 15.2226 15.2226 11.9889 15.2226 8C15.2226 4.01109 11.9889 0.777443 8 0.777443C4.01109 0.777443 0.777443 4.01109 0.777443 8Z" fill="#E57930"/>
                                                <path d="M8 14.4C6.87808 14.4 5.77587 14.1051 4.80387 13.5448C3.83187 12.9845 3.02423 12.1786 2.46191 11.2077C1.8996 10.2369 1.60237 9.13533 1.60001 8.01342C1.59766 6.8915 1.89027 5.78868 2.44851 4.8155C3.00676 3.84233 3.81101 3.033 4.78065 2.46865C5.7503 1.9043 6.85126 1.60476 7.97317 1.60006C9.09508 1.59535 10.1985 1.88565 11.1729 2.44185C12.1472 2.99805 12.9582 3.80061 13.5246 4.76907L8 8V14.4Z" fill="#E57930"/>
                                            </svg>
                                            <span>{{ item?.title }} </span>
                                        </div>
                                    </td>
                                    <td class="table-td2">{{ item?.agent?.full_name }}</td>
                                    <td class="table-td3">{{ item?.date }}  {{ item?.time }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="dashboard-table-wrap mt-4">
                    <div class="today-schedule">
                        <div class="today-schedule-text">{{ $t('tommorowtasks') }}</div>
                        <div class="today-schedule-date">{{ myData?.tasks?.tomorrow }}</div>
                    </div>
                    <div class="main-table-sale">
                        <table class="table dashboard-table-sale">
                            <thead class="table-head">
                                <tr>
                                    <th class="table-th1">{{ $t('Title') }}</th>
                                    <th class="table-th2">{{ $t('Agent') }}</th>
                                    <th class="table-th3">{{ $t('Due date') }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in myData?.tasks?.tomorrow_tasks" :key="item">
                                    <td class="table-td1">
                                        <div class="table-td-content">
                                            <!-- task status:done -->
                                            <DoneIcon v-if="false"></DoneIcon>
                                            <!-- task status:to do -->
                                            <div class="toDo-icon" v-if="true"></div>
                                            <!-- task status:in progress -->
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" v-if="false">
                                                <path d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM0.777443 8C0.777443 11.9889 4.01109 15.2226 8 15.2226C11.9889 15.2226 15.2226 11.9889 15.2226 8C15.2226 4.01109 11.9889 0.777443 8 0.777443C4.01109 0.777443 0.777443 4.01109 0.777443 8Z" fill="#E57930"/>
                                                <path d="M8 14.4C6.87808 14.4 5.77587 14.1051 4.80387 13.5448C3.83187 12.9845 3.02423 12.1786 2.46191 11.2077C1.8996 10.2369 1.60237 9.13533 1.60001 8.01342C1.59766 6.8915 1.89027 5.78868 2.44851 4.8155C3.00676 3.84233 3.81101 3.033 4.78065 2.46865C5.7503 1.9043 6.85126 1.60476 7.97317 1.60006C9.09508 1.59535 10.1985 1.88565 11.1729 2.44185C12.1472 2.99805 12.9582 3.80061 13.5246 4.76907L8 8V14.4Z" fill="#E57930"/>
                                            </svg>
                                            <span>{{ item?.title }} </span>
                                        </div>
                                    </td>
                                    <td class="table-td2">{{ item?.agent?.full_name }}</td>
                                    <td class="table-td3">{{ item?.date }}  {{ item?.time }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- operation -->
            <div v-if="user?.role=== 'operation'">
                <div class="agents-tasks-wrap-operation">
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.0039 15V5C25.0039 3.61929 23.8847 2.5 22.5039 2.5H7.50391C6.12319 2.5 5.00391 3.61929 5.00391 5V25C5.00391 26.3807 6.12319 27.5 7.50391 27.5H22.5039C23.8847 27.5 25.0039 26.3807 25.0039 25V23.125" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.2539 2.5V17.5L21.0267 13.75L25.0039 17.5L25 5.50024" fill="#F58220"/>
                                <path d="M20 3.50024L25 5.50024L25.0039 17.5L21.0267 13.75L16.2539 17.5V2.5H16.5L20 3.50024ZM20 3.50024L22 3.00024L24 4.00024" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Total courses') }}</div>
                            <div class="agents-tasks-number">{{myData?.statistics?.active_courses}} {{ $t('Course') }}</div>
                        </div> 
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.0039 15V5C25.0039 3.61929 23.8847 2.5 22.5039 2.5H7.50391C6.12319 2.5 5.00391 3.61929 5.00391 5V25C5.00391 26.3807 6.12319 27.5 7.50391 27.5H22.5039C23.8847 27.5 25.0039 26.3807 25.0039 25V23.125" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.2539 2.5V17.5L21.0267 13.75L25.0039 17.5L25 5.50024" fill="#F58220"/>
                                <path d="M20 3.50024L25 5.50024L25.0039 17.5L21.0267 13.75L16.2539 17.5V2.5H16.5L20 3.50024ZM20 3.50024L22 3.00024L24 4.00024" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch courses') }}</div>
                            <div class="agents-tasks-number">{{myData?.statistics?.branch_courses}} {{ $t('Course') }}</div>
                        </div>
                    </div>                
                </div>
                <div >
                    <div class="courses-wrap">
                        <div class="corses-title">{{ $t('your courses') }}</div>
                        <div class="courses-content">
                            <div class="course-inner" v-for="course in myData?.active_courses" :key="course">
                                <div class="course-info">
                                    <div class="course-name">{{ course?.name }}</div>
                                    <span class="course-finish">{{ Math.round(course?.ended_course_percentage) }} %</span>
                                </div>
                                <div class="lessons-info">
                                    <div class="lesson-info-operation">{{ $t('Total') }}:<span>{{ course?.lessons_count }} </span> {{ $t('lessons') }}</div>
                                    <div class="lesson-info-operation">{{ $t('Finished') }}:<span>{{ course?.ended_lessons_count }} </span>  {{ $t('lessons') }}</div>
                                    <div class="lesson-info-operation">{{ $t('Students') }}:<span>{{ course?.students_count }} </span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- admin -->
            <div v-if="user?.role=== 'admin' || user?.role=== 'super_admin'">
                <div class="agents-tasks-wrap-admin">
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.9624 9.30078L14.9999 15.6883L25.9624 9.33828" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15 27.0133V15.6758" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M12.4123 3.10157L5.7373 6.80157C4.2248 7.63907 2.9873 9.73907 2.9873 11.4641V18.5266C2.9873 20.2516 4.2248 22.3516 5.7373 23.1891L12.4123 26.9016C13.8373 27.6891 16.1748 27.6891 17.5998 26.9016L24.2748 23.1891C25.7873 22.3516 27.0248 20.2516 27.0248 18.5266V11.4641C27.0248 9.73907 25.7873 7.63907 24.2748 6.80157L17.5998 3.08907C16.1623 2.30157 13.8373 2.30157 12.4123 3.10157Z" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch operations employees') }} </div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.operations }} {{ $t('employee') }}</div>
                        </div> 
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6374 13.9375H9.32488C8.53738 13.9375 7.8999 14.5749 7.8999 15.3624V21.7624H12.6374V13.9375V13.9375Z" stroke="#F58220" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.9515 8.25H14.0514C13.2639 8.25 12.6265 8.88752 12.6265 9.67502V21.7501H17.364V9.67502C17.364 8.88752 16.739 8.25 15.9515 8.25Z" stroke="#F58220" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M20.685 16.0625H17.3726V21.7501H22.1101V17.4875C22.0976 16.7 21.46 16.0625 20.685 16.0625Z" stroke="#F58220" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M11.25 27.5H18.75C25 27.5 27.5 25 27.5 18.75V11.25C27.5 5 25 2.5 18.75 2.5H11.25C5 2.5 2.5 5 2.5 11.25V18.75C2.5 25 5 27.5 11.25 27.5Z" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch sales employees') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.sales }} {{ $t('employee') }}</div>
                        </div>
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.4232 3.17969H13.5602C13.1322 3.17969 12.7861 3.52689 12.7861 3.95419V9.41706L13.3458 8.7627C13.6116 8.4516 13.9619 8.25975 14.3343 8.1796V4.7284H25.6491V14.8414H14.3343V13.1485L13.9858 13.5561C13.6811 13.9116 13.2511 14.1322 12.7861 14.1756V15.6157C12.7861 16.043 13.1322 16.3897 13.5602 16.3897H17.7377L15.6154 26.0254C15.5203 26.4575 15.7934 26.8848 16.2258 26.9802C16.6544 27.0743 17.0853 26.8021 17.1795 26.3705L19.3776 16.3898H20.6555L22.8536 26.3705C22.936 26.7441 23.2675 26.9991 23.635 26.9987C23.6921 26.9987 23.7504 26.9929 23.8082 26.9802C24.2406 26.8848 24.5137 26.4575 24.4177 26.0254L22.2956 16.3897H26.4233C26.8508 16.3897 27.1973 16.043 27.1973 15.6157V3.95419C27.1973 3.52689 26.8508 3.17969 26.4232 3.17969Z" fill="#F58220"/>
                                <path d="M20.273 7.70511C20.212 7.55133 20.039 7.47583 19.8853 7.5367L15.3248 9.14637C14.9063 8.82231 14.3024 8.88021 13.9534 9.28615L12.5063 10.9761L11.2231 9.87618C11.2316 9.96701 11.2508 10.0553 11.2508 10.1485V12.5362L11.9647 13.1479C12.3884 13.5107 13.0221 13.4547 13.3763 13.0392L15.0991 11.0247L16.4885 10.2119L20.145 8.07253C20.2714 7.99965 20.3274 7.8439 20.273 7.70511Z" fill="#F58220"/>
                                <path d="M8.43539 8.13281H7.57599C6.91798 8.13281 6.33938 8.45262 5.97161 8.9401L3.33363 11.3688C2.92259 11.735 2.88531 12.3692 3.25545 12.7827L5.40769 15.185C5.77462 15.5958 6.40979 15.6322 6.82077 15.2629C7.23285 14.8936 7.26766 14.2611 6.8984 13.8495L5.41491 12.1929L7.52205 10.3073L6.29483 11.9747L7.4953 13.315C8.15865 14.0563 8.0961 15.1952 7.35517 15.8591C6.8493 16.3126 6.15895 16.419 5.56047 16.2098C5.56047 16.2098 5.56977 20.8408 5.56977 25.8002C5.56977 26.4636 6.10743 27.0013 6.77083 27.0013C7.43354 27.0013 7.9719 26.4636 7.9719 25.8002C7.9719 20.8423 7.9719 23.6716 7.9719 18.6421H8.77305C8.77305 23.6679 8.77305 20.8408 8.77305 25.8002C8.77305 26.1466 8.67649 26.4673 8.52252 26.7511C8.72405 26.9061 8.97484 27.0013 9.24817 27.0013C9.91192 27.0013 10.4496 26.4636 10.4496 25.8002C10.4496 20.8423 10.4511 22.9207 10.4511 10.1479C10.4512 9.03498 9.54899 8.13281 8.43539 8.13281Z" fill="#F58220"/>
                                <path d="M6.93363 7.41063C7.25478 7.57755 7.61533 7.68114 8.00263 7.68114C8.39092 7.68114 8.75147 7.57755 9.07356 7.41033C9.82532 7.02085 10.3435 6.24546 10.3435 5.34047C10.3435 4.04769 9.29546 3 8.00258 3C6.70989 3 5.66211 4.04769 5.66211 5.34047C5.66216 6.24595 6.18088 7.02165 6.93363 7.41063Z" fill="#F58220"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch teachers') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.teachers }} {{ $t('teacher') }}</div>
                        </div>
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.2996 17.5883C20.2997 18.3257 20.1528 19.0557 19.8674 19.7356C19.582 20.4155 19.1639 21.0317 18.6375 21.548C18.1111 22.0644 17.487 22.4706 16.8017 22.7428C16.1164 23.0151 15.3837 23.1479 14.6465 23.1336C13.1709 23.0751 11.7764 22.4435 10.7592 21.3729C9.7421 20.3024 9.18257 18.8774 9.1996 17.4008V9.67578C9.19937 9.66481 9.20301 9.65412 9.20986 9.64555C9.21671 9.63699 9.22635 9.6311 9.2371 9.62891C11.112 9.34619 13.0037 9.18959 14.8996 9.16016C16.7162 9.18882 18.5285 9.34545 20.323 9.62891C20.3334 9.63117 20.3425 9.63724 20.3486 9.64593C20.3547 9.65462 20.3573 9.66527 20.3558 9.67578L20.2996 17.5883Z" stroke="#F58220" stroke-width="1.5"/>
                                <path d="M9.20359 12.1867L4.22078 9.59453C4.21285 9.59069 4.20617 9.5847 4.20149 9.57724C4.19682 9.56978 4.19434 9.56115 4.19434 9.55234C4.19434 9.54354 4.19682 9.53491 4.20149 9.52745C4.20617 9.51999 4.21285 9.51399 4.22078 9.51016L14.763 4.15234H14.8052L25.3145 9.45391C25.3225 9.45774 25.3291 9.46374 25.3338 9.4712C25.3385 9.47866 25.341 9.48729 25.341 9.49609C25.341 9.5049 25.3385 9.51353 25.3338 9.52099C25.3291 9.52845 25.3225 9.53444 25.3145 9.53828L20.3598 12.1867" stroke="#F58220" stroke-width="1.5"/>
                                <path d="M24.7119 21.1141V9.85938" stroke="#F58220" stroke-width="1.5"/>
                                <path d="M17.6979 22.2812V25.8531H12.1338V22.4781" stroke="#F58220" stroke-width="1.5"/>
                                <path d="M20.3555 14.1227C18.5598 13.7987 16.7379 13.6418 14.9133 13.654C12.9976 13.616 11.0831 13.7731 9.19922 14.1227" stroke="#F58220" stroke-width="1.5"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch students') }} </div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.students }} {{ $t('student') }}</div>
                        </div> 
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M28.125 26.25C28.125 26.25 30 26.25 30 24.375C30 22.5 28.125 16.875 20.625 16.875C13.125 16.875 11.25 22.5 11.25 24.375C11.25 26.25 13.125 26.25 13.125 26.25H28.125ZM13.1662 24.375C13.1524 24.3731 13.1386 24.3706 13.125 24.3675C13.1269 23.8725 13.4381 22.4363 14.55 21.1425C15.585 19.9294 17.4037 18.75 20.625 18.75C23.8444 18.75 25.6631 19.9312 26.7 21.1425C27.8119 22.4363 28.1213 23.8744 28.125 24.3675L28.11 24.3713C28.1013 24.3727 28.0925 24.374 28.0837 24.375H13.1662ZM16.875 6.72335C17.8696 6.72335 16.7967 7.03829 17.5 6.33502C18.2033 5.63176 19 5.68206 19 4.6875C19 3.69294 23.4809 6.32826 22.7776 5.625C22.0743 4.92174 24.9946 7 24 7C23.0054 7 18.6766 6.02009 17.9734 6.72335C17.2701 7.42661 16.875 8.38044 16.875 9.375C16.875 10.3696 15.2967 7.29674 16 8C16.7033 8.70326 15.8804 6.72335 16.875 6.72335ZM26.25 9.375C26.25 10.1137 26.1045 10.8451 25.8218 11.5276C25.5391 12.2101 25.1248 12.8301 24.6025 13.3525C24.0801 13.8748 23.4601 14.2891 22.7776 14.5718C22.0951 14.8545 21.3637 15 20.625 15C19.8863 15 19.1549 14.8545 18.4724 14.5718C17.7899 14.2891 17.1699 13.8748 16.6475 13.3525C16.1252 12.8301 15.7109 12.2101 15.4282 11.5276C15.1455 10.8451 15 10.1137 15 9.375C15 7.88316 15.5926 6.45242 16.6475 5.39752C17.7024 4.34263 19.1332 3.75 20.625 3.75C22.1168 3.75 23.5476 4.34263 24.6025 5.39752C25.6574 6.45242 26.25 7.88316 26.25 9.375ZM13.005 17.4C12.255 17.1638 11.4818 17.0086 10.6987 16.9369C10.2587 16.895 9.81699 16.8744 9.375 16.875C1.875 16.875 0 22.5 0 24.375C0 25.6256 0.624375 26.25 1.875 26.25H9.78C9.50204 25.6647 9.36342 25.0229 9.375 24.375C9.375 22.4813 10.0819 20.5462 11.4188 18.93C11.8744 18.3787 12.405 17.8631 13.005 17.4ZM9.225 18.75C8.11529 20.4174 7.51583 22.3722 7.5 24.375H1.875C1.875 23.8875 2.1825 22.4438 3.3 21.1425C4.32188 19.95 6.0975 18.7875 9.225 18.7519V18.75ZM2.8125 10.3125C2.8125 8.82066 3.40513 7.38992 4.46002 6.33502C5.51492 5.28013 6.94566 4.6875 8.4375 4.6875C9.92934 4.6875 11.3601 5.28013 12.415 6.33502C13.4699 7.38992 14.0625 8.82066 14.0625 10.3125C14.0625 11.8043 13.4699 13.2351 12.415 14.29C11.3601 15.3449 9.92934 15.9375 8.4375 15.9375C6.94566 15.9375 5.51492 15.3449 4.46002 14.29C3.40513 13.2351 2.8125 11.8043 2.8125 10.3125ZM3.5 9C2.50544 9 6.48911 6.95759 5.78585 7.66085C5.08259 8.36411 4.6875 9.31794 4.6875 10.3125C4.6875 11.3071 5.08259 12.2609 5.78585 12.9642C6.48911 13.6674 7.44294 14.0625 8.4375 14.0625C9.43206 14.0625 10.3859 13.6674 11.0892 12.9642C11.7924 12.2609 9.375 15.2845 9.375 14.29C9.375 13.2954 6.48911 15.2751 5.78585 14.5718C5.08259 13.8686 4.49456 9 3.5 9Z" fill="#F58220"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch agents') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.agents }} {{ $t('agent') }}</div>
                        </div> 
                    </div>
                    <div class="agents-tasks-info">
                        <div class="icon-box">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.0039 15V5C25.0039 3.61929 23.8847 2.5 22.5039 2.5H7.50391C6.12319 2.5 5.00391 3.61929 5.00391 5V25C5.00391 26.3807 6.12319 27.5 7.50391 27.5H22.5039C23.8847 27.5 25.0039 26.3807 25.0039 25V23.125" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M16.2539 2.5V17.5L21.0267 13.75L25.0039 17.5L25 5.50024" fill="#F58220"/>
                                <path d="M20 3.50024L25 5.50024L25.0039 17.5L21.0267 13.75L16.2539 17.5V2.5H16.5L20 3.50024ZM20 3.50024L22 3.00024L24 4.00024" stroke="#F58220" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                        <div class="agents-tasks-content">
                            <div class="agents-tasks-text">{{ $t('Branch courses') }}</div>
                            <div class="agents-tasks-number">{{ myData?.statistics?.active_courses }} {{ $t('Course') }}</div>
                        </div> 
                    </div>                   
                </div>
                <!-- <div >
                    <div class="courses-wrap">
                        <div class="corses-title">your courses</div>
                        <div class="courses-content">
                            <div class="course-inner" v-for="course in 3" :key="course">
                                <div class="course-info">
                                    <div class="course-name">course name</div>
                                    <span class="course-finish">90%</span>
                                </div>
                                <div class="lessons-info">
                                    <div class="lesson-info-operation">Total:<span>200 </span>lessons</div>
                                    <div class="lesson-info-operation">Finished:<span>180 </span>lessons</div>
                                    <div class="lesson-info-operation">Students:<span>80 </span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import CertificateIcon from '../components/icons/CertificateIcon.vue';
import UserImg from '../components/icons/UserImg.vue';
import AddPhoto from '../components/icons/AddPhoto.vue';
import useVuelidate from '@vuelidate/core';
import { required,helpers, sameAs, minLength } from '@vuelidate/validators';
import { mapState } from 'pinia';
import { useAuthStore } from '../stores/auth';
import axios from 'axios';
import { api_url , storage_url} from '../constants';
import { authHeader } from '../helpers';
import { useLangStore } from '../stores/language';
import { _t } from '../helpers'
import DoneIcon from '../components/icons/DoneIcon.vue';
export default{
    components:{
        DoneIcon
    },
    data(){
        return{
            myData:[],
        }
    },
    mounted(){
        this.getData();
    },
    methods:{
        getData() {
        //  var branch_id = this.user?.role?`?branch_id=${this.user??.id}`:''

         this.loading= true,
         axios.get( `${api_url}/statistics`,
         { headers:{
            ...authHeader()
         }
         }).then((response) => {
            this.loading= false,
            this.myData = response.data;
         });
      },
    },
    computed:{
        ...mapState(useAuthStore, {
            user: 'user'
        }),
    }
}
</script>
<style scoped>
/* teacher */
.dashboard-wrap{
    padding:26px 30px 36px;
}
.dashboard-title{
    font-size:24px;
    font-weight: 700;
    color:var(--main-color);
    font-family: "Inter";
    margin-bottom: 24px;
}
.teacher-content{
    display:flex;
    gap:20px;
    width:100%;
}
.teacher-lessons{
    width:55%
}
.teacher-courses{
    width:45%
}
.dashboard-table-wrap{
    border:1px solid #eaeaea;
    border-radius: 10px;
    background-color: #fff;
    padding:5px;
}
.today-schedule{
    background-color:#E2EBFF;
    border-radius: 8px;
    padding:16px;
    margin-bottom:5px;
}
.today-schedule-text{
    font-family:"inter";
    font-weight: 400;
    font-size:20px;
    color:#426AB3;
}
.today-schedule-date{
    font-family:"inter";
    font-weight: 400;
    font-size:16px;
    color:#7B8190;
}
.main-table-teacher{
    min-height: 240px; 
    height: 240px;
    width:100%;
    overflow-x: auto; 
    overflow-y:auto;
}
.dashboard-table-teacher {
    border-radius: 8px;
    box-shadow: 0 0 4px 0 rgb(228 231 236 / 25%);
    margin-bottom: 0;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    max-width:850px;
    min-width:450px;
}
.table-head{
    vertical-align: baseline;
}
.teacher-table-th{
    font-weight: 500;
    font-size:12px;
    color:#7B8190;
    padding:12px 4px 12px 24px;
    background-color:  rgb(66 106 179 / 5%);
    border-bottom: 1px solid #e4e7ec;
    text-transform: capitalize;
    width: 168px;
}
.teacher-table-td{
    color:#3B424A;
    font-weight: 400;
    font-size:12px;
    padding:16px 4px 16px 24px;
    text-transform: capitalize;
    border-bottom: 1px solid #e4e7ec;
    width: 168px;
}
tr:last-child .teacher-table-td{
    border-bottom:none
}
.courses-wrap{
    border:1px solid #eaeaea;
    border-radius:10px;
    background-color: #fff;
    padding:16px;
}
.corses-title{
    font-family:"inter";
    color:#3B424A;
    font-weight: 500;
    font-size:18px;
    margin-bottom:16px;
}
.courses-content{
    display: flex;
    flex-direction: column;
    gap: 8px;
}
.course-inner{
    padding:16px;
    border-radius: 5px;
    box-shadow: 0 0 15px 0 rgb(115 100 255 / 8%);
}
.course-info{
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 12px;
}
.course-name{
    font-weight: 400;
    font-size:16px; 
    color:#3B424A;
    text-transform: capitalize;
}
.course-finish{
    background-color:rgb(245 130 32 / 10%);
    border-radius:8px;
    padding:2px 4px;
    font-weight: 400;
    font-size:14px;
    color:#F58220 
}
.lessons-info-wrap{
    /* display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:space-between */
    gap:4px 16px;
    padding-top: 12px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.lesson-info{
    font-weight: 400;
    font-size:14px;
    color:#7b8190;
    /* flex: 0 0 20%; */
    text-wrap: nowrap;
}
/* sales */
.agents-tasks-wrap-sale{
    gap:12px 9px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom:24px;
}
.agents-tasks-info{
    display:flex;
    gap:12px;
    align-items:center;
    border-radius:20px;
    background-color:#fff;
    box-shadow: 0 0 10px 0 rgb(115 100 255 / 8%);
    padding:12px 15px;
}
.agents-tasks-text{
    font-family:"Inter";
    font-weight: 300;
    font-size:14px;
    color:#F58220
}
.agents-tasks-number{
    font-family:"Inter";
    font-weight: 400;
    font-size:18px;
    color:#7b8190
}
.icon-box{
    background: #fff;
    padding:8px;
    border-radius:10px;
    box-shadow: 0 0 10px 0 rgb(115 100 255 / 5%);
}
.icon-circle{
    width:30px;
    height:30px;
    border:2px solid #F58220;
    border-radius: 50%;
    background-color:#fff;
}
.done-icon{
    width:30px;
    height:30px;
    stroke:#F58220
}
.table-th1{
    font-weight: 500;
    font-size:12px;
    color:#7B8190;
    padding:12px 4px 12px 24px;
    background-color:  rgb(66 106 179 / 5%);
    border-bottom: 1px solid #e4e7ec;
    text-transform: capitalize;
    width:calc(100% - 322px)
}
.table-th2{
    font-weight: 500;
    font-size:12px;
    color:#7B8190;
    padding:12px 4px 12px 24px;
    background-color:  rgb(66 106 179 / 5%);
    border-bottom: 1px solid #e4e7ec;
    text-transform: capitalize;
    width:172px
}
.table-th3{
    font-weight: 500;
    font-size:12px;
    color:#7B8190;
    padding:12px 4px 12px 24px;
    background-color:  rgb(66 106 179 / 5%);
    border-bottom: 1px solid #e4e7ec;
    text-transform: capitalize;
    width:150px
}
.table-td-content{
    display: flex;
    align-items: flex-start;
    gap: 12px;
}
.table-td1{
    color:#3B424A;
    font-weight: 400;
    font-size:12px;
    padding:16px 4px 16px 24px;
    text-transform: capitalize;
    border-bottom: 1px solid #e4e7ec;
    width:60%;
}
.table-td2{
    color:#3B424A;
    font-weight: 400;
    font-size:12px;
    padding:16px 4px 16px 24px;
    text-transform: capitalize;
    border-bottom: 1px solid #e4e7ec;
    width:20%;
}
.table-td3{
    color:#3B424A;
    font-weight: 400;
    font-size:12px;
    padding:16px 4px 16px 24px;
    text-transform: capitalize;
    border-bottom: 1px solid #e4e7ec;
    width:20%;
}
tr:last-child td{
    border-bottom:none
}
.toDo-icon{
    width:16px;
    height:16px;
    border:1px solid #426ab3;
    border-radius:50%;
    background-color:#fff;
    flex-shrink: 0;
}
.main-table-sale{
    min-height: 338px; 
    height: 338px;
    width:100%;
    overflow-x: auto; 
    overflow-y:auto;
}
.dashboard-table-sale {
    border-radius: 8px;
    box-shadow: 0 0 4px 0 rgb(228 231 236 / 25%);
    margin-bottom: 0;
    border-collapse: separate;
    border-spacing: 0;
    overflow: hidden;
    width:100%;
    min-width: 500px;
    max-width: 979px;
}
/* operation */
.agents-tasks-wrap-operation{
    gap:12px 24px;
    display: grid;
    margin-bottom:24px;
    grid-template-columns: repeat(2, 1fr);
    max-width: 409px;
    width:100%
}
.lessons-info{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:2px 5px;
    padding-top: 12px;
    justify-content:space-between;
    max-width:490px;
    width:100%;
}
.lesson-info-operation{
    font-weight: 400;
    font-size:14px;
    color:#7b8190;
    flex: 0 0 20%;
    text-wrap: nowrap;
}
/* admin */
.agents-tasks-wrap-admin{
    gap: 18px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 24px;
}
@media(max-width:1316px){
    /* admin */
    .agents-tasks-info{
        gap: 9px;
        padding: 12px 10px;
    }
}
@media(max-width:1250px){
    /* sales */
    .agents-tasks-wrap-sale{
        grid-template-columns: repeat(4, 1fr);
    }
}
@media(max-width:1200px){
    /* teacher */
    .teacher-content{
        flex-wrap:wrap;
    }
    .teacher-lessons{
        width:100%
    }
    .teacher-courses{
        width:100%
    }
    .dashboard-wrap{
        padding: 26px 23px 36px;
    }
    .courses-wrap {
        padding: 12px 16px;
    }
    .course-inner{
        padding: 12px 10px;
    }
    .teacher-content{
        gap:13px
    }
    /* .lesson-info{
        flex:0 0 40%;
        font-size:13px
    } */
    .course-info{
        padding-bottom: 8px;
    }
    .lessons-info-wrap{
        padding-top: 8px;
    }
    .teacher-table-th{
        padding: 12px 4px 12px 12px;
    }
    .teacher-table-td{
        padding:16px 4px 16px 12px;
    }
    .today-schedule{
        padding:16px 12px;
    }
    /* admin */
    .agents-tasks-wrap-admin{
        grid-template-columns: repeat(2, 1fr);
    }
     /* sales */
     .agents-tasks-wrap-sale{
        grid-template-columns: repeat(3, 1fr);
    }
}
@media(max-width:991px){
    /* teacher */
    /* .teacher-content{
        flex-wrap:wrap;
    } */
    /* .teacher-lessons{
        width:100%
    }
    .teacher-courses{
        width:100%
    } */
    /* .lesson-info{
        flex:0 0 20%;
    } */
    .dashboard-title{
        margin-bottom: 15px;
    }
    .dashboard-wrap{
        padding: 20px 23px 36px;
    }
    /* sales */
    .agents-tasks-wrap-sale{
        grid-template-columns: repeat(2, 1fr);
    }
    .agents-tasks-info{
        gap:7px;
    }
    .table-th1{
        padding:16px 4px 16px 7px;
    }
    .table-th2{
        padding:16px 4px 16px 7px;
    }
    .table-th3{
        padding:16px 4px 16px 7px;
    }
    .table-td1{
        padding:16px 4px 16px 7px;
        font-size: 11px;
    }
    .table-td2{
        padding:16px 4px 16px 7px;
        font-size: 11px;
    }
    .table-td3{
        padding:16px 4px 16px 7px;
        font-size: 11px;
    }
    /* admin */
    .agents-tasks-wrap-admin{
        gap:10px 7px;
    }
    .agents-tasks-wrap-admin .agents-tasks-info{
        gap:5px;
        padding: 12px 7px;
    }
    .agents-tasks-wrap-admin .agent-tasks-text{
        font-size:13px;
    }
    .agents-tasks-wrap-admin .icon-box{
        padding:5px
    }
    /* operation */
    .agents-tasks-wrap-operation{
        gap:12px
    }
}
@media(max-width:857px){
     /* admin */
    .agents-tasks-wrap-admin .agents-tasks-text{
        font-size:11px;
    }
    .agents-tasks-wrap-admin .agents-tasks-number{
        font-size:16px;
    }
    .agents-tasks-wrap-admin .icon-box{
        padding: 2px;
    }
    .agents-tasks-wrap-admin .icon-box svg{
        width:24px;
        height:24px
    }
    .agents-tasks-wrap-admin .agents-tasks-info{
        padding: 12px 5px;
    }
}
@media(max-width:768px){
    .agents-tasks-info{
        padding:12px 8px;
    }
    .icon-box{
        padding:5px;
    }
    /* sales */
    .agents-tasks-wrap-sale{
        grid-template-columns: repeat(3, 1fr);
    }
    /* admin */
    .agents-tasks-wrap-admin .agents-tasks-text{
        font-size:13px;
    }
    .agents-tasks-wrap-admin .icon-box{
        padding: 4px;
    }
    .agents-tasks-wrap-admin .icon-box svg{
        width:27px;
        height:27px
    }
}
@media(max-width:600px){
    /* sales */
    .agents-tasks-wrap-sale{
        grid-template-columns: repeat(2, 1fr);
    }
    /* admin */
    .agents-tasks-wrap-admin .agents-tasks-text{
        font-size: 12px;
    }
}
@media(max-width:490px){
    .dashboard-wrap{
        padding: 20px 12px 26px;
    }
     /* admin */
     .agents-tasks-wrap-admin{
        grid-template-columns: repeat(1, 1fr);
    }
    .agents-tasks-wrap-admin .agents-tasks-text{
        font-size: 13px;
    }
}
@media(max-width:403px){
    .icon-box{
        padding: 3px;
    }
    .icon-box svg{
        width:20px;
        height:20px;
    }
    .agents-tasks-info{
        gap: 6px;
        padding: 9px 7px;
    }
    .icon-circle{
        width:20px;
        height:20px;
    }
    .agents-tasks-number{
        font-size:16px;
    }
    .agents-tasks-text{
        font-size:13px;
    }
    .lessons-info{
        gap: 2px 10px;
    }
    /* teacher */
    .lessons-info-wrap{
        grid-template-columns: repeat(2, 1fr);
    }
}
@media(max-width:360px){
    /* teacher */
    /* .lesson-info{
        font-size:12px;
    } */
    .course-finish{
        font-size:13px;
    }
    .today-schedule{
        padding:14px
    }
    .today-schedule-text{
        font-size:19px;
    }
    .teacher-table-th{
        font-size:12px;
        padding: 12px 3px 12px 10px;
    }
    .teacher-table-td{
        padding: 16px 3px 16px 10px;
        font-size:12px;
    }
    .today-schedule{
        padding: 14px 10px;
    }
    .today-schedule-date{
        font-size:15px;
    }
}
</style>
