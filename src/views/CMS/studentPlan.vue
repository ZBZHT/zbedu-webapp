<template>
  <div class="studentPlan">
    <el-col :span="19">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="当前课堂" name="first">
          <div class="mainContent">
            <el-row class="guidance" style="padding-top: 0;text-align: left">
              <p style="text-align: left">上课时间：</p>
              <p style="text-align: left">下课时间：</p>
              <p style="text-align: left">课程名称：</p>
              <p style="text-align: left">任课老师：</p>
              <div class="playSth">
                <el-button type="success">签到</el-button>
              </div>
            </el-row>
          </div>

        </el-tab-pane>
        <el-tab-pane label="课程计划" name="second">
          <show-table :course = "course" :mondayDate = "mondayDate" :weekDate = "weekDate"></show-table>
        </el-tab-pane>
      </el-tabs>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import moment from 'moment'
  import showTable from './compontents/showTable'

  export default {
    name: 'studentPlan',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        mondayDate:'',
        weekDate:[],
        course: {},
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
    components: {showTable}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .studentPlan .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .studentPlan .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .studentPlan .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .studentPlan .el-table td, .el-table th {
    height: 40px;
  }
  .studentPlan .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .studentPlan .mainContent{
    margin:0 auto;
    padding-left: 10px;
    box-sizing:border-box;
  }
  .studentPlan .el-tabs__header{
    margin: 0 0 10px;
  }
  .studentPlan p{
    margin-bottom: 0.5rem;
  }
  .studentPlan .currTable{
    padding: 10px;
    text-align: left;
  }
  .studentPlan .currTable2{
    float: left;
    margin: 2px;
  }
  .studentPlan .playSth{
    width:80%;
    height:100px;
    margin:0 auto;
    text-align:center;
  }
</style>
