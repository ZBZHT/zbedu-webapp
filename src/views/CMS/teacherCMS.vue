<template>
  <div id="app" class="container">
    <div class="nav">
      <navgation-head></navgation-head>
    </div>
    <div class="CMS_cont">

      <el-row>
        <el-col :span="4">
          <el-tree
            :data="data"
            :props="defaultProps"
            default-expand-all
            node-key="id"
            @node-click="handleNodeClick"></el-tree>
        </el-col>

        <!--显示的首页-->
        <el-col class="cont_page" :span="16">
          <el-card v-show="isShow000">
            <h1>欢迎使用中邦智慧教学</h1><br>
            <h1>后台管理系统</h1>
          </el-card>
        </el-col>

        <!--用户管理-->
        <div v-show="isShow101">
          <user-manager></user-manager>
        </div>
        <!--题库管理-->
        <div v-show="isShow102">
          <test-base-m></test-base-m>
        </div>
        <!--我的资料-->
        <div v-show="isShow201">
          <my-data></my-data>
        </div>
        <!--我的足迹-->
        <div v-show="isShow202">
          <my-footprint></my-footprint>
        </div>
        <!--课程管理-->
        <div v-show="isShow300">
          <course-m></course-m>
        </div>
        <!--我的课程-->
        <div v-show="isShow301">
          <my-course></my-course>
        </div>
        <!--我的考试-->
        <div v-show="isShow400">
          <my-course></my-course>
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
  //import core from '../../server/utils/core.js'

  export default {
    name: 'index',
    activeName2: 'first',
    data() {
      return {
        data: [],
        total: '',
        pagesize: 12,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        url: document.domain,
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        isShow000: true,
        isShow101: false,
        isShow102: false,
        isShow201: false,
        isShow202: false,
        isShow300: false,
        isShow301: false,
        isShow400: false,
        currentPage: 1,
        dialogVisible: false,
        multipleSelection:[],
      }
    },
    computed: {},
    methods: {
      handleNodeClick(data) {
        //console.log(data.id);
        //点击用户管理
        if (data.id == 101) {
          this.isShow000 = false;
          this.isShow101 = true;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow300 = false;
          this.isShow301 = false;
          this.isShow400 = false;
        }
        //点击题库管理
        if (data.id == 102) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = true;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow300 = false;
          this.isShow301 = false;
          this.isShow400 = false;
        }
        //点击我的资料
        if (data.id == 201) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = true;
          this.isShow202 = false;
          this.isShow300 = false;
          this.isShow301 = false;
          this.isShow400 = false;
        }
        //点击我的足迹
        if (data.id == 202) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = true;
          this.isShow300 = false;
          this.isShow301 = false;
          this.isShow400 = false;
        }
        //点击我的课程
        if (data.id == 300) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow300 = true;
          this.isShow301 = false;
          this.isShow400 = false;
        }
        //点击我的课程
        if (data.id == 301) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow300 = false;
          this.isShow301 = true;
          this.isShow400 = false;
        }
        //点击我的课程
        if (data.id == 400) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow300 = false;
          this.isShow301 = false;
          this.isShow400 = true;
        }
      },
    },
    mounted() {
      axios.post('http://' + this.url + ':8000/teacherCMS/labelTree', {
        data: {
          username: this.username,
          userType: this.userType
        }
      }).then((res) => {
        //console.log();
        this.data = res.data.result;
      })
    },
    components: {
      MyFootprint,
      MyData,
      MyCourse,
      GameM,
      navgationHead, navUl, footFooter, userManager, TestBaseM, CourseM}
  }
</script>

<style>

  * {
    margin: 0;
    padding: 0;
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
  .CMS_cont .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
    background-color: #d9d9d9;
  }
  .CMS_cont .el-col-4 {
    margin: 10px;
    margin-top: 20px;
  }

  .CMS_cont .el-table .cell {
    text-align: left;
    margin-left: 14px
  }

  .CMS_cont .el-card__body {
    padding: 10rem;
  }

  .el-table td, .el-table th {
    padding: 2px;
  }

  .el-table-column--selection .cell {
    padding-left: 0;
  }

  .block .el-button {
    float: left;
  }
</style>
