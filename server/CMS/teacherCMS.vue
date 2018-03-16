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
        <el-card v-show="isShow000">
          <h1>欢迎使用中邦智慧教学</h1><br>
          <h1>后台管理系统</h1>
        </el-card>

        <!--用户管理-->
        <div v-show="isShow101">
          <user-manager></user-manager>
        </div>
        <!--题库管理-->
        <div v-show="isShow102">
          题库管理
        </div>
        <!--考试管理-->
        <div v-show="isShow103">
          考试管理
        </div>
        <!--评论管理-->
        <div v-show="isShow104">
          评论管理
        </div>
        <!--课程管理-->
        <div v-show="isShow105">
          课程管理
        </div>

        <!--个人资料-->
        <div v-show="isShow201">
          个人资料
        </div>
        <!--登录信息-->
        <div v-show="isShow202">
          登录信息
        </div>

        <!--个人设置-->
        <div v-show="isShow301">
          个人设置
        </div>
        <!--其他设置-->
        <div v-show="isShow302">
          其他设置
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
        isShow103: false,
        isShow104: false,
        isShow105: false,
        isShow201: false,
        isShow202: false,
        isShow301: false,
        isShow302: false,
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
          this.isShow103 = false;
          this.isShow104 = false;
          this.isShow105 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow301 = false;
          this.isShow302 = false;
        }
        //点击题库管理
        if (data.id == 102) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = true;
          this.isShow103 = false;
          this.isShow104 = false;
          this.isShow105 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow301 = false;
          this.isShow302 = false;
        }
        //点击考试管理
        if (data.id == 103) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow103 = true;
          this.isShow104 = false;
          this.isShow105 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow301 = false;
          this.isShow302 = false;
        }
        //点击评论管理
        if (data.id == 104) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow103 = false;
          this.isShow104 = true;
          this.isShow105 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow301 = false;
          this.isShow302 = false;
        }
        //点击课程管理
        if (data.id == 105) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow103 = false;
          this.isShow104 = false;
          this.isShow105 = true;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow301 = false;
          this.isShow302 = false;
        }
        //点击个人资料
        if (data.id == 201) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow103 = false;
          this.isShow104 = false;
          this.isShow105 = false;
          this.isShow201 = true;
          this.isShow202 = false;
          this.isShow301 = false;
          this.isShow302 = false;
        }
        //点击登录信息
        if (data.id == 202) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow103 = false;
          this.isShow104 = false;
          this.isShow105 = false;
          this.isShow201 = false;
          this.isShow202 = true;
          this.isShow301 = false;
          this.isShow302 = false;
        }
        //点击个人设置
        if (data.id == 301) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow103 = false;
          this.isShow104 = false;
          this.isShow105 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow301 = true;
          this.isShow302 = false;
        }
        //点击其他设置
        if (data.id == 302) {
          this.isShow000 = false;
          this.isShow101 = false;
          this.isShow102 = false;
          this.isShow103 = false;
          this.isShow104 = false;
          this.isShow105 = false;
          this.isShow201 = false;
          this.isShow202 = false;
          this.isShow301 = false;
          this.isShow302 = true;
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
    components: {navgationHead, navUl, footFooter, userManager}
  }
</script>

<style>

  * {
    margin: 0;
    padding: 0;
  }

  .el-tree-node__expand-icon {
    font-size: 16px;
  }

  .el-tree-node__label {
    font-size: 16px;
  }

  .el-tree {
    background-color: #dcdfe6;
  }

  .el-table .cell {
    text-align: left;
    margin-left: 14px
  }

  .CMS_cont {
    min-height: 34.3rem;
  }

  .el-card__body {
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
