<template>
  <div class="teacherInfor">
    <el-col :span="19">
      <span style="text-align: left">{{courseName}}</span>
      <span style="text-align: left">({{courseDate}})</span>
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="考勤动态" name="first">
          <div class="mainContent">
            <el-row class="guidance" style="padding-top: 0;text-align: left">
              <el-button size="mini" type="success">已签到</el-button>
              <el-button size="mini" type="danger">缺勤</el-button>
              <el-button size="mini" type="warning">迟到</el-button>
              <el-button size="mini" type="primary">请假</el-button>
            </el-row>
          </div>
          <ul class="currTable">
            <li class="currTable1" v-for="item in stateList" :style="{background:item.bg}">
              <img class="studentPng" src="../../assets/imgs/user.png">
              <p class="studentName">{{item.stuName}}</p>
            </li>
          </ul>

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
        courseName: '',
        courseDate: '',
        stateList: [
          {
            "stuName": "学生1",
            "bg": 'rgb(103,194,58)'
          },
          {
            "stuName": "学生2",
            "bg": 'rgb(245,108,108)'
          },
          {
            "stuName": "学生3",
            "bg": 'rgb(230,162,60)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          },
          {
            "stuName": "学生4",
            "bg": 'rgb(64,158,255)'
          }
        ],

      }
    },
    computed: {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      getAllStuClass(){
        axios.post('/teacherCMS/getAllStuClass', {
          data: {
            user: '',
          }
        }).then((res) => {
          let resData = res.data;
          //console.log(res.data.result);
          if (resData.code === 0) {
              this.courseName = resData.result.courseName;
              this.courseDate = resData.result.startTime + '~' + resData.result.endTime;
              this.getTimeSheet(resData.result)
            //this.addSuccess('创建成功')
          } else if (resData.code === 1) {
            //this.addSuccess('创建错误')
          }
        });
      },
      getTimeSheet(data){
          console.log(data);
        axios.post('/teacherCMS/getTimeSheet', {
          data: {
            courseDate: data.courseDate,
            startTime: data.startTime,
          }
        }).then((res) => {
          let resData = res.data;
          let sList = resData.result.stateList;
          console.log(resData.result);
          if (resData.code === 0) {
            for (let i = 0; i < sList.length; i++) {
              if (sList[i].state === 0) {
                sList[i].bg = 'rgb(103,194,58)'
              } else if (sList[i].state === 1) {
                sList[i].bg = 'rgb(245,108,108)'
              } else if (sList[i].state === 2) {
                sList[i].bg = 'rgb(230,162,60)'
              } else if (sList[i].state === 3) {
                sList[i].bg = 'rgb(64,158,255)'
              }
            }
            this.stateList = sList;
            //this.addSuccess('创建成功')
          } else if (resData.code === 1) {
            //this.addSuccess('创建错误')
          }
        });
      },
    },
    mounted() {
        this.getAllStuClass();

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
    width:80%;
    margin:0 auto;
    padding: 10px;
    text-align: center;
    box-shadow: 10px 9px 40px -3px; 
    border:1px solid #aaa;
    margin-top:20px;
    margin-bottom:30px;
  }
  .teacherInfor .currTable1{
    width:100px;
    height:105px;
    border:1px solid #000;
    border-radius:10px;
    margin-right:20px;
    margin-bottom:15px;
    display:inline-block;
    text-align:center;
    padding:10px;
    box-sizing:border-box;
  }
  .teacherInfor .studentPng{
    width:50px;
    height:50px;
    border-radius:50%;
  }
  .teacherInfor .studentName{

  }
</style>
