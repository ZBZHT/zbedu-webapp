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
              <div class="playSth">
                <el-button type="success" @click="stuSignIn()" :disabled="false">点击签到</el-button>
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
        disabled: false,

      }
    },
    computed: {
        disabled: function () {
          let startTime = new Date(moment(this.stuCourse.courseDate + ',' + this.stuCourse.startTime).format("YYYY-MM-DD,HH:mm")).getTime();
          let newTime = new Date().getTime() + 60*30;
          if (newTime < startTime) {
            return true;
          }
        }
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
          console.log(res.data.result);
          let resData = res.data.result;
          if (res.data.code === 0) {
            this.course = resData.course[0];
            this.mondayDate = res.data.result.courseDate;
            this.weekDate = core.getDayAll(new Date(this.mondayDate));
          }
        });
      },
      //获取当前课程信息
      stuSignIn(){
        axios.post('/teacherCMS/stuSignIn', {
          data: {
            stuCourse: this.resCourse,
          }
        }).then((res) => {
          //console.log(res.data.result);
          if (res.data.code === 0) {
            this.addSuccess('签到成功')
          }
        });
      },
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
        //console.log(res.data.result);
        if (res.data.code === 0) {
          resCourse.date = resCourse.startTime + "~" + resCourse.endTime;
          this.stuCourse = resCourse;
          if (1) {

          }
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
  }
</style>
