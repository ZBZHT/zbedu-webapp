<template>
  <div>
    <div>
      <navgation-head></navgation-head>
    </div>
    <div class="CMS_cont">

      <el-row>
        <el-col :span="4">
          <el-tree
            :data="treeData"
            node-key="id"
            default-expand-all
            ref="treeData"
            highlight-current
            :props="defaultProps"
            @node-click="handleNodeClick"></el-tree>
        </el-col>

        <!--我的资料-->
        <div v-show="isShow201">
          <my-data></my-data>
        </div>
        <!--我的足迹-->
        <div v-show="isShow202">
          <my-footprint></my-footprint>
        </div>
        <!--用户管理-->
        <div v-show="isShow101">
          <user-manager></user-manager>
        </div>
        <!--题库管理-->
        <div v-show="isShow102">
          <test-base-m></test-base-m>
        </div>
        <!--课程设置-->
        <div v-show="isShow302">
          <course-m></course-m>
        </div>
        <!--我的课程-->
        <div v-show="isShow301">
          <my-course></my-course>
        </div>
        <!--我的考试-->
        <div v-show="isShow401">
          <my-exam></my-exam>
        </div>
        <!--我的大赛-->
        <div v-show="isShow501">
          <game-m></game-m>
        </div>
        <!--课堂管理（管理员）授课计划-->
        <div v-if="isShow601">
          <boss-plan></boss-plan>
        </div>
        <!--课堂管理（管理员）考勤信息-->
        <div v-if="isShow602">
          <boss-infor></boss-infor>
        </div>
        <!--课堂管理（管理员）请假审批-->
        <div v-if="isShow603">
          <boss-check></boss-check>
        </div>
        <!--我的课堂（教师）课堂计划-->
        <div v-if="isShow701">
          <teacher-plan></teacher-plan>
        </div>
        <!--我的课堂（教师）考勤信息-->
        <div v-if="isShow702">
          <teacher-infor></teacher-infor>
        </div>
        <!--我的课堂（教师）考勤汇总-->
        <div v-if="isShow703">
          <teacher-zong></teacher-zong>
        </div>
        <!--我的课堂（学生）课堂信息-->
        <div v-if="isShow801">
          <student-plan></student-plan>
        </div>
        <!--我的课堂（学生）考勤信息-->
        <div v-if="isShow802">
          <student-info></student-info>
        </div>

      </el-row>
    </div>
    <div class="footer">
      <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import navgationHead from '@/components/common/navgationHead'
  import navUl from '@/components/common/navUl'
  import footFooter from '@/components/common/footFooter'
  import userManager from './userManager'
  import TestBaseM from './testBaseM'
  import CourseM from './courseM'
  import GameM from './gameM'
  import MyData from './myData'
  import MyFootprint from './myFootprint'
  import MyCourse from './myCourse'
  import MyExam from './myExam'
  import TeacherCMS from './teacherCMS'
  import bossPlan from './bossPlan'
  import bossInfor from './bossInfor'
  import bossCheck from './bossCheck'
  import teacherPlan from './teacherPlan'
  import teacherInfor from './teacherInfor'
  import teacherZong from './teacherZong'
  import studentPlan from './studentPlan'
  import studentInfo from './studentInfo'

  export default {
    name: 'index',
    activeName2: 'first',
    data() {
      return {
        treeData: [],
        total: '',
        pagesize: 12,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        url: document.domain,
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        isShow101: false,
        isShow102: false,
        isShow201: true,
        isShow202: false,
        isShow300: false,
        isShow301: false,
        isShow302: false,
        isShow401: false,
        isShow501: false,
        isShow601: false,
        isShow602: false,
        isShow603: false,
        isShow701: false,
        isShow702: false,
        isShow703: false,
        isShow801: false,
        isShow802: false,
        currentPage: 1,
        dialogVisible: false,
        multipleSelection:[],
        changeColor:{ backgroundColor: '#9f5355' }
      }
    },
    computed: {},
    methods: {
      handleNodeClick(data,node,store) {
        //点击用户管理
        if (data.id == 101) {
          this.isShow101 = true;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击题库管理
        if (data.id == 102) {
          this.isShow101 = false;
          this.isShow102 = true;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击我的资料
        if (data.id == 201) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = true;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击我的足迹
        if (data.id == 202) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = true;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击课程设置
        if (data.id == 302) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = true;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击我的课程
        if (data.id == 301) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = true;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击我的考试
        if (data.id == 401) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = true;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击我的大赛
        if (data.id == 501) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = true;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击课堂管理（管理员）授课计划
        if (data.id == 601) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = true;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击课堂管理（管理员）考勤信息
        if (data.id == 602) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = true;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击课堂管理（管理员）请假审批
        if (data.id == 603) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = true;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }//点击课堂管理（教师）课堂计划
        if (data.id == 701) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = true;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击课堂管理（教师）考勤信息
        if (data.id == 702) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = true;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击课堂管理（教师）考勤汇总
        if (data.id == 703) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = true;
          this.isShow801 = false;
          this.isShow802 = false;
        }
        //点击课堂管理（学生）课堂信息
        if (data.id == 801) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = true;
          this.isShow802 = false;
        }
        //点击课堂管理（学生）考勤信息
        if (data.id == 802) {
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow302 = false;
          this.isShow301 = false;
          this.isShow401 = false;
          this.isShow501 = false;
          this.isShow601 = false;
          this.isShow602 = false;
          this.isShow603 = false;
          this.isShow701 = false;
          this.isShow702 = false;
          this.isShow703 = false;
          this.isShow801 = false;
          this.isShow802 = true;
        }
      },
    },
    mounted() {
      axios.post('/teacherCMS/labelTree', {
        data: {
          username: this.username,
          userType: this.userType
        }
      }).then((res) => {
        this.treeData = res.data.result;
      //  console.log(this.treeData);
        setTimeout(() => {
          this.$refs.treeData.setCurrentKey(201)
        }, 20)
      })
    },
    components: {
      MyFootprint,
      MyData,
      MyCourse,
      TeacherCMS,
      MyExam,
      GameM,
      bossPlan,
      bossInfor,
      bossCheck,
      teacherPlan,
      teacherInfor,
      teacherZong,
      studentPlan,
      studentInfo,
      navgationHead, navUl, footFooter, userManager, TestBaseM, CourseM}
  }
</script>

<style>

  * {
    margin: 0;
    padding: 0;
  }

  .CMS_cont .el-row {
    padding-top: 20px;
  }
  .CMS_cont .cont_page {
    margin-top: 20px;
  }
  .CMS_cont {
    min-height: 38.7rem;
    background-color: #f0f3ef;
  }

  .CMS_cont .el-tree-node__expand-icon {
    font-size: 16px;
  }

  .CMS_cont .el-tree-node__label {
    font-size: 16px;
  }

  .CMS_cont .el-tree {
    background-color: #ffffff;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid #9f5355;
  }
  .CMS_cont .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background-color: #9f5355;
    color: #ffffff;
  }
  .CMS_cont .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #9f5355;
    color: white;
  }
  .CMS_cont .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    border: 3px solid #9f5355;
    padding:0 60px;
    border-top: none;
    color: #212529;
  }
/*  .CMS_cont .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
    background-color: red;
  }
  .CMS_cont .el-tree-node:focus>.el-tree-node__content {
    background-color: red;
  }*/
  .CMS_cont .el-col-4 {
    margin: 10px;
    margin-top: 0;
  }

  .CMS_cont .el-table .cell {
    text-align: left;
  }

  .CMS_cont .el-card__body {
    padding: 10rem;
  }

  .CMS_cont .el-table td, .el-table th {
    padding: 2px;
  }

  .CMS_cont .el-table-column--selection .cell {
    padding-left: 0;
  }

  .CMS_cont .block .el-button {
    float: left;
  }
</style>
