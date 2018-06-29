<template>
  <div class="teacherInfor">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="考勤动态" name="first">
          <div class="mainContent">
            <el-row class="guidance" style="padding-top: 0;text-align: left">
              <p style="text-align: left">课程名称：</p>
              <p style="text-align: left">任课老师：</p>
              <span>颜色注解 ：</span>
              <el-button size="mini" type="success">已签到</el-button>
              <el-button size="mini" type="danger">缺勤</el-button>
              <el-button size="mini" type="warning">迟到</el-button>
              <el-button size="mini" type="primary">请假</el-button>
            </el-row>
          </div>
          <div class="currTable">
            <div class="currTable1" v-for="item in stateList">
              <el-button class='currTable2' size="mini" :type='item.state'>{{item.stuName}}</el-button>

            </div>
          </div>

        </el-tab-pane>
      </el-tabs>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import moment from 'moment'

  export default {
    name: 'teacherInfor',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        stateList: [
          {
            "stuName": "学生1",
            "state": 'success'
          },
          {
            "stuName": "学生2",
            "state": 'danger'
          },
          {
            "stuName": "学生3",
            "state": 'warning'
          },
          {
            "stuName": "学生4",
            "state": 'primary'
          }
        ]
      }
    },
    computed: {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    },
    mounted() {


    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .teacherInfor .el-table td, .el-table th {
    height: 40px;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .teacherInfor .mainContent{
    margin:0 auto;
    padding-left: 10px;
    box-sizing:border-box;
  }
  .teacherInfor .el-tabs__header{
    margin: 0 0 10px;
  }
  .teacherInfor p{
    margin-bottom: 0.5rem;
  }
  .teacherInfor .currTable{
    padding: 10px;
    text-align: left;
  }
  .teacherInfor .currTable2{
    float: left;
    margin: 2px;
  }

</style>
