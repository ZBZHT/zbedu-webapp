<template>
  <div class="showTable">
    <div class="classPlan">
      <div class="classPlan_top">
        <div class="classPlan_topLeft"></div>
        <div class="classPlan_topRight">
          <!--<el-row>-->
          <!--<el-col :span="3" v-for="(item,index) in weekData" :key = "index">-->
          <!--<div class="grid-content bg-purple">-->
          <!--<p>{{item}}</p>-->
          <!--</div>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <table>
            <tr>
              <td v-for="(item,index) in weekData" :key="index" class="weekDataP">{{item}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="classPlan_bottom">
        <div class="classPlan_bottomLeft">
          <!--<el-row>-->
          <!--<el-col v-for="(item,index) in classData" :key = "index">-->
          <!--<div class="grid-content bg-purple">-->
          <!--{{item}}-->
          <!--</div>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <table>
            <tr v-for="(item2,index2) in classData" :key="index2">
              <td class="classDataP">{{item2}}</td>
            </tr>
          </table>
        </div>
        <div class="classPlan_bottomRight">
          <table>
            <tr>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse">
                <el-button size="mini" @click="handleEdit(item3)">编辑</el-button>
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse2">
                <el-button size="mini" @click="handleEdit(item3)">编辑</el-button>
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse3">
                <el-button size="mini" @click="handleEdit(item3)">编辑</el-button>
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse4">
                <el-button size="mini" @click="handleEdit(item3)">编辑</el-button>
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="eachDataP" v-for="(item3,index3) in course.newCourse5">
                <el-button size="mini" @click="handleEdit(item3)">编辑</el-button>
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
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'showTable',
    props: ['course'],
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
    },

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .showTable .classPlan {
    width: 80%;
    height: 700px;
    margin: 0 auto;
    margin-top: 25px;
  }

  .showTable .classPlan .classPlan_top {
    width: 100%;
    height: 8%;
    display: flex;
  }

  .showTable .classPlan .classPlan_bottom {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .showTable .classPlan .classPlan_topLeft {
    width: 5%;
    height: 100%;
    background: #e5e9f2;
    border: 5px solid #fff;
  }

  .showTable .classPlan .classPlan_topRight {
    width: 95%;
    height: 100%;
  }

  .showTable .classPlan .classPlan_bottomLeft {
    width: 5%;
    height: 92%;
  }

  .showTable .classPlan .classPlan_bottomRight {
    width: 95%;
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
    border: 5px solid #fff;
    border-radius: 15px;
    height: 53px;
  }

  .showTable .classDataP {
    background: #e5e9f2;
    width: 1%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
  }

  .showTable .eachDataP {
    background: #e5e9f2;
    width: 4%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
  }
  .showTable .eachDataP p {
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

  .showTable .classPlan_bottomRight .el-col {
    padding: 2px;
  }

  .showTable .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
