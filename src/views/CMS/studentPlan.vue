<template>
  <div class="studentPlan">
    <el-col :span="19">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="当前课堂" name="first">
          <div class="mainContent">
            <el-row class="guidance" style="padding-top: 0;text-align: left">
              <p style="text-align: left">上课时间：{{stuCourse.date}}</p>
              <p style="text-align: left">课程名称：{{stuCourse.courseName}}</p>
              <p style="text-align: left">任课老师：{{stuCourse.teacher}}</p>
              <span class="ps">(请在课前30分钟内签到)</span>
              <div class="playSth">
                <div v-if="showBut === false && showReadlyBut === true">
                  <el-button type="success" @click="stuSignIn()" :disabled="true">点击签到</el-button>
                </div>
                <div v-if="showBut === true && showReadlyBut === true">
                  <el-button type="success" @click="stuSignIn()">点击签到</el-button>
                </div>
                <div v-if="showReadlyBut === false">
                  <el-button @click="stuSignIn()">已签到</el-button>
                </div>
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
        course: [],
        stateList: [],
        stuCourse: '',
        showBut: true,
        showReadlyBut: true,
      }
    },
    computed: {

    },
    methods: {
      // 添加成功后提示信息
      addSuccess(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      // 添加失败提示信息
      addDefeat(msg) {
        this.$message.error(msg);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //获取-课程表
      getCourseTable(resDate){
        axios.post('/teacherCMS/getCourseTable', {
          data: {
            courseDate: resDate,
            className: this.classGrade,
          }
        }).then((res) => {
        //  console.log(res.data.result);
          let resData = res.data.result;
          if (res.data.code === 0) {
            this.course = resData.course[0];
            this.mondayDate = res.data.result.courseDate;
            this.weekDate = core.getDayAll(new Date(this.mondayDate));
          }
        });
      },
      //学生签到
      stuSignIn(){
        axios.post('/teacherCMS/stuSignIn', {
          data: {
            stuCourse: this.stuCourse,
          }
        }).then((res) => {
          //console.log(res.data.result);
          if (res.data.code === 0) {
            this.addSuccess('签到成功')
            this.getFirstData();
          }
        });
      },
      //请求数据
      getFirstData(){
        axios.post('/teacherCMS/getSignInMsg', {
              data: {
                stuCourse: this.stuCourse,
              }
            }).then((res) => {
              //console.log(res.data.result);
              if (res.data.code === 0) {
                  let resState = res.data.result.state;
                if (resState === 0 || resState === 1 || resState === 2 || resState === 3) {
                  this.showReadlyBut = false;
                } else {
                  this.showReadlyBut = true;
                }
              }
            });
      }
    },
    mounted() {
      let newDate = core.getMonday(new Date());
        newDate = moment(newDate).format("YYYY-MM-DD");
        this.getCourseTable(newDate);

        axios.post('/teacherCMS/getAllStuClass', {
          data: {
            stuCourse: '',
          }
        }).then((res) => {
          let resCourse = res.data.result;
          console.log(resCourse)
          if (res.data.code === 0) {
            
              let startTime = new Date(moment(resCourse.courseDate + ',' + resCourse.startTime).format("YYYY-MM-DD,HH:mm")).getTime() - 60*30*1000;
              let endTime = new Date(moment(resCourse.courseDate + ',' + resCourse.endTime).format("YYYY-MM-DD,HH:mm")).getTime();
              let newTime = new Date().getTime();
              resCourse.date = resCourse.startTime + "~" + resCourse.endTime;
              this.stuCourse = resCourse;
              if (startTime <= newTime && newTime < endTime) {
                this.showBut = true;
                console.log(this.showBut)
              } else {
                this.showBut = false;
                console.log(startTime)
                console.log(newTime)
                console.log(endTime)
              }
              this.getFirstData();
              //console.log(this.showBut);
            
            
          }else if(res.data.code === 1){
            this.showBut = false;
          }
        });

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
    position:relative;
  }
  .studentPlan .mainContent{
    position:relative;
  }
  .studentPlan .mainContent .ps{
    position:absolute;
    right:56%;
    top:105px;
  }
</style>
