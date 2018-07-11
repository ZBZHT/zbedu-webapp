<template>
  <div class="showTable">
    <el-button type="primary" @click="previous()" class="pageButton" icon="el-icon-d-arrow-left"></el-button>
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
        <div class="classPlan_bottomRight">
          <table>
            <tr>
              <td class="classDataP" v-show = "course">1</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse" :style="{color:item3.color}">
                <div v-show="item3.teacher !== ''">
                  <p>{{item3.startTime}}~{{item3.endTime}}</p>
                  <p>{{item3.teacher}}</p>
                  <p>{{item3.courseName}}</p>
                  <p>{{item3.courseAddress}}</p>
                </div>
                <div class="playButs" v-if=" item3.courseName !== '' ">
                  <el-button size="mini" @click="handleEdit(item3, 'newCourse', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">编辑</el-button>
                  <el-button size="mini" @click="deleteCourseTable(item3, 'newCourse', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">删除</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">2</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse2" :style="{color:item3.color}">
                <div v-show="item3.teacher !== ''">
                  <p>{{item3.startTime}}~{{item3.endTime}}</p>
                  <p>{{item3.teacher}}</p>
                  <p>{{item3.courseName}}</p>
                  <p>{{item3.courseAddress}}</p>
                </div>
                <div class="playButs" v-if=" item3.courseName !== '' ">
                  <el-button size="mini" @click="handleEdit(item3, 'newCourse2', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">编辑</el-button>
                  <el-button size="mini" @click="deleteCourseTable(item3, 'newCourse2', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">删除</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">3</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse3" :style="{color:item3.color}">
                <div v-show="item3.teacher !== ''">
                  <p>{{item3.startTime}}~{{item3.endTime}}</p>
                  <p>{{item3.teacher}}</p>
                  <p>{{item3.courseName}}</p>
                  <p>{{item3.courseAddress}}</p>
                </div>
                <div class="playButs" v-if=" item3.courseName !== '' ">
                  <el-button size="mini" @click="handleEdit(item3, 'newCourse3', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">编辑</el-button>
                  <el-button size="mini" @click="deleteCourseTable(item3, 'newCourse3', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">删除</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">4</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse4" :style="{color:item3.color}">
                <div v-show="item3.teacher !== ''">
                  <p>{{item3.startTime}}~{{item3.endTime}}</p>
                  <p>{{item3.teacher}}</p>
                  <p>{{item3.courseName}}</p>
                  <p>{{item3.courseAddress}}</p>
                </div>
                <div class="playButs" v-if=" item3.courseName !== '' ">
                  <el-button size="mini" @click="handleEdit(item3, 'newCourse4', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">编辑</el-button>
                  <el-button size="mini" @click="deleteCourseTable(item3, 'newCourse4', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">删除</el-button>
                </div>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">5</td>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse5" :style="{color:item3.color}">
                <div v-show="item3.teacher !== ''">
                  <p>{{item3.startTime}}~{{item3.endTime}}</p>
                  <p>{{item3.teacher}}</p>
                  <p>{{item3.courseName}}</p>
                  <p>{{item3.courseAddress}}</p>
                </div>
                <div class="playButs" v-if=" item3.courseName !== '' ">
                  <el-button size="mini" @click="handleEdit(item3, 'newCourse5', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">编辑</el-button>
                  <el-button size="mini" @click="deleteCourseTable(item3, 'newCourse5', index3)" v-show="$store.state.userType == 'EA' || $store.state.userType == 'SA'">删除</el-button>
                </div>
              </td>
            </tr>
          </table>
        </div>

        <el-dialog
          title="添加或编辑课程"
          :visible.sync="centerDialogVisible1"
          width="600px"
          :close-on-click-modal="false"
          :show-close="false"
          :close-on-press-escape="false"
          center>
          <el-form :model="alterForm" :rules="rules" ref="alterForm" >

            <el-form :inline="true" :model="alterForm" :rules="rules" ref="alterForm">
              <el-form-item label="开始日期" prop="date1">
                <el-date-picker
                  v-model="alterForm.date1"
                  type="date"
                  @change="compareTime()"
                  placeholder="开始日期"
                  :picker-options="startDatePicker">
                </el-date-picker>
              </el-form-item>

              <el-form-item label="结束日期" prop="date2">
                <el-date-picker
                  v-model="alterForm.date2"
                  type="date"
                  @change="compareTime()"
                  placeholder="结束日期"
                  :picker-options="endDatePicker">
                </el-date-picker>
              </el-form-item>
            </el-form>

            <el-form :inline="true" :model="alterForm" :rules="rules" ref="alterForm">
              <el-form-item label="上课时间" prop="startTime">
                <el-time-select
                  placeholder="上课时间"
                  v-model="alterForm.startTime"
                  :picker-options="{
                                    start: '08:00',
                                    step: '00:10',
                                    end: '20:00'
                                    }">
                </el-time-select>
              </el-form-item>

              <el-form-item label="下课时间" prop="startTime">
                <el-time-select
                  placeholder="下课时间"
                  v-model="alterForm.endTime"
                  :picker-options="{
                                    start: '08:00',
                                    step: '00:10',
                                    end: '20:00'
                                    }">
                </el-time-select>
              </el-form-item>
            </el-form>

            <el-form-item label="课" prop="courseName">&emsp;&nbsp;程
              <el-input v-model="alterForm.courseName" style="width: 85%;"></el-input>
            </el-form-item>

            <el-form-item label="教" prop="teacher">&emsp;&nbsp;师
              <el-input v-model="alterForm.teacher" style="width: 85%;"></el-input>
            </el-form-item>

            <el-form-item label="地" prop="courseAddress">&emsp;&nbsp;点
              <el-input v-model="alterForm.courseAddress" style="width: 85%;"></el-input>
            </el-form-item>

          </el-form>
          <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="editCourseTable(alterForm)">确 定</el-button>
          </span>
        </el-dialog>

      </div>
    </div>
    <el-button type="primary" @click="next()" class="pageButton" icon="el-icon-d-arrow-right"></el-button>
  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../assets/js/core.js'
  import moment from 'moment'


  export default {
    name: 'showTable',
    props: ['course','mondayDate','weekDate'],
    data() {
      return {
        weekData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        classData: ['1', '2', '3', '4', '5'],
        alterForm:{
          date1:'',
          date2:'',
          startTime: '',
          endTime: '',
          teacher:'',
          courseName:'',
          courseAddress:''
        },
        centerDialogVisible1: false,
        startDatePicker:this.beginDate(),
        endDatePicker:this.processDate(),
        courseIndex: '',
        newCourse: '',
        classGrade: this.$store.state.classGrade,
        rules:{
          date1: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          startTime: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          endTime: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          teacher: [
            {required: true, message: '请选择老师', trigger: 'change'}
          ],
          courseName: [
            {required: true, message: '请选择课程名称', trigger: 'change'}
          ],
          courseAddress: [
            {required: true, message: '请选择上课地点', trigger: 'change'}
          ],
        },
      }
    },
    computed: {},
    mounted() {


    },
    methods: {
      //创建考试开始时间不能选择历史日期
      beginDate(){
        let self = this;
        return {
          disabledDate(time){
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      },
      //创建考试结束时间不能大于开始时间
      processDate(){
        let self = this
        return {
          disabledDate(time){
            return time.getTime() < self.alterForm.date1;
          }
        }
      },
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
      handleEdit(item, newCourse, index) {
          this.centerDialogVisible1 = true;
          this.alterForm.date1 = this.weekDate[0];
          this.alterForm.date2 = this.weekDate[6];
          this.alterForm.startTime = item.startTime;
          this.alterForm.endTime = item.endTime;
          this.alterForm.teacher = item.teacher;
          this.alterForm.courseName = item.courseName;
          this.alterForm.courseAddress = item.courseAddress;
          this.courseIndex = index;
          this.newCourse = newCourse;
      },
      //编辑->确定
      editCourseTable(form){
        let course1 = {
          startTime:form.startTime,
          endTime:form.endTime,
          teacher:form.teacher,
          courseName:form.courseName,
          courseAddress:form.courseAddress,
        };
        axios.post('/teacherCMS/newCourseTable', {
          data: {
            className: this.classGrade,
            index: this.courseIndex,
            courseDate:this.newCourse,
            date1:this.weekDate[0],
            date2:this.weekDate[6],
            cycleTime:'',
            course: course1,
            edit: true,
          }
        }).then((res) => {
          let resData = res.data;
          if (resData.code === 0) {
            this.getCourseTable(this.weekDate[0]);
            this.centerDialogVisible1 = false;
            this.addSuccess('创建成功')
          } else if (resData.code === 1) {
            this.addSuccess('创建错误')
          }
        });
      },
      //编辑->删除
      deleteCourseTable(item, newCourse, index){
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.courseIndex = index;
          this.newCourse = newCourse;
          let course1 = {
            startTime:'',
            endTime:'',
            teacher:'',
            courseName:'',
            courseAddress:'',
          };
          axios.post('/teacherCMS/newCourseTable', {
            data: {
              className: this.classGrade,
              index: this.courseIndex,
              courseDate:this.newCourse,
              date1:this.weekDate[0],
              date2:this.weekDate[6],
              cycleTime:'',
              course: course1,
              edit: true,
            }
          }).then((res) => {
            let resData = res.data;
            if (resData.code === 0) {
              this.getCourseTable(this.weekDate[0]);
              this.centerDialogVisible1 = false;
              this.addSuccess('删除成功')
            } else if (resData.code === 1) {
              this.addSuccess('删除错误')
            }
          });

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
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
              className: this.classGrade,
            }
          }).then((res) => {
          //  console.log(res.data.result)
            let resData = res.data.result;
            if (res.data.code === 0) {
              this.course = resData.course[0];
              this.mondayDate = res.data.result.courseDate;
              this.weekDate = core.getDayAll(new Date(this.mondayDate));
            //  console.log("222")
            //  console.log(resData.course[0])
              for(var i = 0; i < resData.course[0].newCourse.length; i++){
                  if(resData.course[0].newCourse[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse[i].color = '#f00';
                    resData.course[0].newCourse[i].date = resData.course[0].newCourse[i].startTime + "~" + resData.course[0].newCourse[i].endTime
                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse2.length; i++){
                  if(resData.course[0].newCourse2[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse2[i].color = '#f00';
                    resData.course[0].newCourse2[i].date = resData.course[0].newCourse2[i].startTime + "~" + resData.course[0].newCourse2[i].endTime

                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse2[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse3.length; i++){
                  if(resData.course[0].newCourse3[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse3[i].color = '#f00';
                    resData.course[0].newCourse3[i].date = resData.course[0].newCourse3[i].startTime + "~" + resData.course[0].newCourse3[i].endTime

                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse3[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse4.length; i++){
                  if(resData.course[0].newCourse4[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse4[i].color = '#f00';
                    resData.course[0].newCourse4[i].date = resData.course[0].newCourse4[i].startTime + "~" + resData.course[0].newCourse4[i].endTime

                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse4[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse5.length; i++){
                  if(resData.course[0].newCourse5[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse5[i].color = '#f00';
                    resData.course[0].newCourse5[i].date = resData.course[0].newCourse5[i].startTime + "~" + resData.course[0].newCourse5[i].endTime

                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse5[i].color = '';
                  }
              }
              console.log(resData.course[0]);
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
  .showTable{
    display:flex;
    margin-bottom: 160px !important;
  }
  .showTable .pageButton{
    padding: 12px;
    height: 100%;
    margin-top: 336px;
    padding-top: 50px;
    padding-bottom: 50px;
    font-size: 20px;
  }
  .showTable .classPlan {
    width: 90%;
    height: 700px;
    margin: 0 auto;
    margin-top: 25px;
    position:relative;
    margin-bottom:85px;
  }

  .showTable .classPlan .classPlan_top {
    width: 100%;
    height: 9%;
    display: flex;
  }

  .showTable .classPlan .classPlan_bottom {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .showTable .classPlan .classPlan_topLeft {
    width: 2.5%;
    height: 100%;
    background: #e5e9f2;
    border: 5px solid #fff;
  }

  .showTable .classPlan .classPlan_topRight {
    width: 100%;
    height: 100%;
  }

  .showTable .classPlan .classPlan_bottomLeft {
    width: 5%;
    height: 85%;
  }

  .showTable .classPlan .classPlan_bottomRight {
    width: 100%;
    height: 100%;
  }

  .showTable .el-row {
    padding-top: 0;
    margin-bottom: 20px;
  }
  :last-child {
    margin-bottom: 0;
  }


  .showTable .el-col {
    border-radius: 4px;
  }

  .showTable .bg-purple-dark {
    background: #99a9bf;
  }

  .showTable .bg-purple {
    background: #d3dce6;
  }

  .showTable .bg-purple-light {
    background: #e5e9f2;
  }

  .showTable .classPlan_topRight .grid-content {
    border-radius: 4px;
    min-height: 54px;
    width: 98%;
  }
  .showTable .classPlan_topRight .weekDataP {
    background: #e5e9f2;
    width: 183px;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-top: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
  }
  .showTable .classPlan_topRight .weekDateP {
    background: #e5e9f2;
    width: 183px;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-bottom: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
  }
  .showTable .classDataP {
    background: #e5e9f2;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
    width: 2.5%;
  }
  .showTable .eachDataP {
    position: relative;
    background: #e5e9f2;
    width: 158px;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
    padding-bottom: 22px;
  }
  .showTable .eachDataP p {
    width: 130px;
    margin-bottom: 0;
    text-align: left;
    margin-left: 6px;
  }
  .showTable .eachDataP2 p {
    width: 100px;
    margin-bottom: 0;
    text-align: left;
    margin-left: 6px;
  }
  .showTable .classPlan_bottomLeft .grid-content {
    border-radius: 4px;
    min-height: 106px;
    margin-top: 3px;
    padding-top: 43px;
    box-sizing: border-box;
  }

  .showTable .classPlan_bottomRight .grid-content {
    border-radius: 4px;
    min-height: 106px;
  }
  .showTable .playButs .el-button{
    margin:0;
    padding:5px;
  }
  .showTable .playButs{
    position: absolute;
    bottom:0;
    right:0;
  }

  .showTable .classPlan_bottomRight .el-col {
    padding: 2px;
  }

  .showTable .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .showTable .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 190px;
  }
  .showTable .el-form--inline .el-form-item {
    margin-right: 4px;
  }
</style>
