<template>
    <div class="box">
        <div class="over-lay"  @click="sidebar_collapsed=true" :class="{'over-lay-back' : sidebar_collapsed==false}"></div>
            <Sidebar @sidebar-status="(v) => sidebar_collapsed = v" class="side_bar" :class="{ collapsed: sidebar_collapsed}"/>
            <div class="main_wrap">
                <Navbar @sidebar-toggle="(v) => sidebar_collapsed = v" :class="{'' : sidebar_collapsed==false}"/>
                    <div class="content_wrap">
                        <RouterView/>
                    </div>
            </div>
        </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue';
export default {
    data(){
        return{
            sidebar_collapsed: true,
        }
    },
    components :{ Navbar ,Sidebar},
}
</script>

<style scoped>
.over-lay {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    /* z-index: 11; */
}
.over-lay-back {
    background-color: #00000033;
    z-index: 12;

}
.z-in {
    z-index: 15;
    position: relative;

}

.content_wrap {
    position: relative;
}

.box {
    position: relative;
}
.main_wrap {
    width: calc(100vw - 298px);
}
.content_wrap {
    background-color: rgba(245, 245, 250, 1);
    min-height:calc(100vh - 60px);
    height: calc(100vh - 60px);
    overflow-y: auto;

}
.box {
    display: flex;
    height: 100vh;
}
.hide-sidebar {
      margin-left: 0;
}
.side_bar {
    width: 298px;
    background-color:white;
    overflow-y: auto;
    box-shadow: 0px -1px 5px 0px rgba(115, 100, 255, 0.25);
    z-index: 1;
    direction: rtl;
    transition: 3s; 
    scrollbar-gutter: stable;
}
[data-direction = rtl] .side_bar {
    direction: ltr;     
}
.side_bar.collapsed {
    margin-left: 0;
    transition: .8s;
}
[data-direction = rtl] .side_bar.collapsed {
    margin-left: unset;
    margin-right:0;

}
[data-direction = rtl] .box {
    flex-direction: row-reverse;
}
@media (max-width:768px) {
    .side_bar.collapsed {
        left: -298px;
    }
    [data-direction = rtl] .side_bar.collapsed {
        left: unset;
        right: -298px;
    }
    .main_wrap{
        width: 100vw; 
   } 
   .side_bar {
        position: fixed;
        z-index: 15;
        top: 0;
        left: 0;
        overflow-x: hidden;
        transition: 0.8s;
        height: 100vh;
   }
    [data-direction = rtl] .side_bar {
        right: 0;
        left: unset;
    }
}
@media(max-width:375px) {
    .side_bar {
        width: 260px;
    }
}

</style>
