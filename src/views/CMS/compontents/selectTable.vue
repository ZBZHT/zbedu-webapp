<template>
  <div class="selectTable">
    <el-button type="primary" @click="previous()" class="pageButton"> < </el-button>
    <div class="classPlan">
      <div class="classPlan_top">
        <!--<div class="classPlan_topLeft"></div>-->
        <div class="classPlan_topLeft" v-show = "course"></div>
        <div class="classPlan_topRight">
          <table>
            <tr>
              <td v-for="(item,index) in weekData" :key="index" class="weekDataP">{{item}}</td>
            </tr>
            <tr>
              <td rowspan="2" v-for="(itemW,indexW) in weekDate" :key="indexW" class="weekDateP">{{itemW}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="classPlan_bottom">
        <!--<div class="classPlan_bottomLeft">-->
          <!--<table>-->
            <!--<tr v-for="(item2,index2) in classData" :key="index2">-->
              <!--<td class="classDataP">{{item2}}</td>-->
            <!--</tr>-->
          <!--</table>-->
        <!--</div>-->
        <div class="classPlan_bottomRight">
          <table>
            <tr>
              <td class="classDataP" v-show = "course">1</td>
                <td class="eachDataP" v-for="(item3,index3) in course.newCourse">
                    <p>{{item3.startTime}}~{{item3.endTime}}</p>
                    <p>{{item3.teacher}}</p>
                    <p>{{item3.courseName}}</p>
                    <p>{{item3.courseAddress}}</p>
                    <div class="bing"></div>
                </td>
            </tr>
            <tr>
              <td class="classDataP2" v-show = "course">2</td>
              <td class="eachDataP2" v-for="(item3,index3) in course.newCourse2">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">3</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse3">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">4</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse4">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">5</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse5">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
          </table>
        </div>

        <el-dialog
          title="修改课程"
          :visible.sync="centerDialogVisible1"
          width="30%"
          :close-on-click-modal="false"
          :show-close="false"
          :close-on-press-escape="false"
          center>
          <el-form :inline="true" :model="alterForm" ref="alterForm" label-width="100px">
            <el-form-item label="上课时间" >
              <el-time-select
                placeholder="上课时间"
                v-model="alterForm.startTime"
                :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
              </el-time-select>
            </el-form-item>

            <el-form-item label="下课时间">
              <el-time-select
                placeholder="下课时间"
                v-model="alterForm.endTime"
                :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
              </el-time-select>
            </el-form-item>

            <el-form-item label="课程" >
              <el-input v-model="alterForm.courseName"></el-input>
            </el-form-item>

            <el-form-item label="教师" >
              <el-input v-model="alterForm.teacher"></el-input>
            </el-form-item>

            <el-form-item label="地点" >
              <el-input v-model="alterForm.courseAddress"></el-input>
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="addEach11()">确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </div>
    <el-button type="primary" @click="next()" class="pageButton"> > </el-button>
  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../assets/js/core.js'
  import moment from 'moment'


  export default {
    name: 'selectTable',
    props: ['course','mondayDate','weekDate'],
    data() {
      return {
        weekData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        classData: ['1', '2', '3', '4', '5'],
        alterForm:{
          startTime: '',
          endTime: '',
          teacher:'',
          courseName:'',
          courseAddress:''
        },
        centerDialogVisible1: false,

      }
    },
    computed: {},
    mounted() {
      //获取课程框的高

    },
    methods: {
      //重置数据
      cancel1(){
        for(let i = 0; i < this.courseIndexArr1.length; i++){
          if(this.courseIndexArr1[i] !== -1){
            if(this.allMyCourse.newCourse5[i].startTime === '' ||
              this.allMyCourse.newCourse5[i].endTime === '' ||
              this.allMyCourse.newCourse5[i].teacher === '' ||
              this.allMyCourse.newCourse5[i].courseName === '' ||
              this.allMyCourse.newCourse5[i].courseAddress === ''){
              this.courseIndexArr5[i] = -1;
            }
          }
        }
      },
      //编辑
      handleEdit(item) {
          this.centerDialogVisible1 = true;
          this.alterForm.startTime = item.startTime;
          this.alterForm.endTime = item.endTime;
          this.alterForm.teacher = item.teacher;
          this.alterForm.courseName = item.courseName;
          this.alterForm.courseAddress = item.courseAddress;
      },
      //点击上一个
      previous(){
        this.course = '';
     //   console.log(this.mondayDate);
        var res = core.getYestoday(new Date(this.mondayDate));
        res = core.getMonday(new Date(res));
        res = moment(res).format("YYYY-MM-DD");
     //   console.log(res)
        this.getCourseTable(res)
      },
      //点击下一个
      next(){
        this.course = '';
     //   console.log(this.mondayDate);
        var res = core.getTomorrow(new Date(this.mondayDate));
        res = core.getMonday(new Date(res));
        res = moment(res).format("YYYY-MM-DD");
        console.log(res)
        this.getCourseTable(res)
      },
      //获取-课程表
      getCourseTable(resDate){
          axios.post('/teacherCMS/getCourseTable', {
            data: {
              courseDate: resDate,
              className: this.$store.state.classGrade,
            }
          }).then((res) => {
          //  console.log(res.data.result)
            let resData = res.data.result;
            if (res.data.code === 0) {
              this.course = resData.course[0];
              this.mondayDate = res.data.result.courseDate;
              this.weekDate = core.getDayAll(new Date(this.mondayDate));
            }

          });
        },
    },

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .selectTable{
    display:flex;
    margin-bottom: 60px !important;
    overflow:auto;
  }
  .selectTable .pageButton{
    height: 100%;
    margin-top: 336px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .selectTable .classPlan {
    width: 80%;
    height: 700px;
    margin: 0 auto;
    margin-top: 73px;
    position:relative;
    margin-bottom:85px;
  }

  .selectTable .classPlan .classPlan_top {
    width: 100%;
    height: 9%;
    display: flex;
  }

  .selectTable .classPlan .classPlan_bottom {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .selectTable .classPlan .classPlan_topLeft {
    width: 4%;
    height: 100%;
    background: #e5e9f2;
    border: 5px solid #fff;
  }

  .selectTable .classPlan .classPlan_topRight {
    width: 100%;
    height: 100%;
  }

  .selectTable .classPlan .classPlan_bottomLeft {
    width: 5%;
    height: 85%;
  }

  .selectTable .classPlan .classPlan_bottomRight {
    width: 100%;
    height: 100%;
  }

  .selectTable .el-row {
    padding-top: 0;
    margin-bottom: 20px;
  }
  :last-child {
    margin-bottom: 0;
  }


  .selectTable .el-col {
    border-radius: 4px;
  }

  .selectTable .bg-purple-dark {
    background: #99a9bf;
  }

  .selectTable .bg-purple {
    background: #d3dce6;
  }

  .selectTable .bg-purple-light {
    background: #e5e9f2;
  }

  .selectTable .classPlan_topRight .grid-content {
    border-radius: 4px;
    min-height: 54px;
    width: 98%;
  }

  .selectTable .classPlan_topRight .weekDataP {
    background: #e5e9f2;
    width: 183px;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-top: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
  }
  .selectTable .classPlan_topRight .weekDateP {
    background: #e5e9f2;
    width: 183px;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-bottom: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
  }
  .selectTable .classDataP {
    background: #e5e9f2;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
    width: 2%;
  }
  .selectTable .classDataP2 {
    background: #e5e9f2;
    border: 5px solid #fff;
    border-bottom: 6px solid #aaa;
    border-radius: 15px;
    height: 108px;
    width: 2%;
  }
  .selectTable .eachDataP {
    background: #e5e9f2;
    width: 4%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
    position:relative;
  }
  .selectTable .eachDataP2 {
    background: #e5e9f2;
    width: 4%;
    border: 5px solid #fff;
    border-bottom: 6px solid #aaa;
    border-radius: 15px;
    height: 108px;
  }
  .selectTable .eachDataP p {
    margin-bottom: 0;
    text-align: left;
    margin-left: 6px;
  }
  .selectTable .eachDataP2 p {
    margin-bottom: 0;
    text-align: left;
    margin-left: 6px;
  }
  .selectTable .bing{
      width:160px;
      height:120px;
      background:#fff;
      border-radius:10px;
      box-shadow: 10px 9px 40px -3px;
      display:none;
      position:absolute;
      bottom: 112px;
      right: -7%;
  }
  .selectTable .eachDataP:hover .bing{
    display:block;
  }
  .selectTable .classPlan_bottomLeft .grid-content {
    border-radius: 4px;
    min-height: 106px;
    margin-top: 3px;
    padding-top: 43px;
    box-sizing: border-box;
  }

  .selectTable .classPlan_bottomRight .grid-content {
    border-radius: 4px;
    min-height: 106px;
  }

  .selectTable .classPlan_bottomRight .el-col {
    padding: 2px;
  }

  .selectTable .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
