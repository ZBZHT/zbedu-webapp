<template>
  <div class="gameM_cont">

    <!--大赛管理-->
    <el-col :span="19">
        <div class="teacherList">
          <div class="teacherListName">请选择带队教师</div>
          <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions">
          </video-player>



          <!--教师列表-->
          <el-table class="userM_el-table" :data="teachData.slice((currentPage2-1)*pagesize,currentPage2*pagesize)"
                    @selection-change="changeTeacher"
                    stripe style="width: 97%;">

            <el-table-column type="selection" width="40"></el-table-column>

            <el-table-column label="序号" prop="num" width="60">
            </el-table-column>

            <el-table-column prop="user" label="用户名" width="100">
            </el-table-column>

            <el-table-column prop="userID" label="用户ID" width="120">
            </el-table-column>

            <el-table-column prop="IDNo" label="身份证号" width="190">
            </el-table-column>

            <el-table-column prop="MoNo" label="手机号" width="130">
            </el-table-column>

            <el-table-column prop="userType" label="用户类型" width="90">
            </el-table-column>

            <el-table-column prop="gender" label="性别" width="70">
            </el-table-column>

            <el-table-column prop="time" label="入职时间" width="130">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="100">
            </el-table-column>

          </el-table>

          <!--分页显示-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total=parseInt(total2)>
            </el-pagination>
          </div>
        </div>

        <div class="studentList">
          <div class="teacherListName">请选择参赛学生</div>
          <!--学生列表-->
          <el-table class="userM_el-table" :data="stuData.slice((currentPage1-1)*pagesize,currentPage1*pagesize)"
                    @selection-change="changeStudent"
                    stripe style="width: 99%;">

            <el-table-column type="selection" width="40"></el-table-column>

            <el-table-column prop="num" label="序号" width="60">
            </el-table-column>

            <el-table-column prop="user" label="用户名" width="100">
            </el-table-column>

            <el-table-column prop="userID" label="学号" width="120">
            </el-table-column>

            <el-table-column prop="IDNo" label="身份证号" width="190">
            </el-table-column>

            <el-table-column prop="MoNo" label="手机号" width="130">
            </el-table-column>

            <el-table-column prop="userType" label="用户类型" width="90">
            </el-table-column>

            <el-table-column prop="gender" label="性别" width="70">
            </el-table-column>

            <el-table-column prop="time" label="入学时间" width="110">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="110">
            </el-table-column>

            <el-table-column prop="classGrade" label="班级" width="90">
            </el-table-column>

          </el-table>

          <!--分页显示-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total=parseInt(total1)>
            </el-pagination>
          </div>
        </div>
    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import moment from 'moment'

  export default {
    name: 'gameM',
    data() {
      return {
        playerOptions: {
          autoplay: false,
          controls: true,
          sources: [{
            type: 'video/mp4',
            src: 'http://192.168.0.251/resource/新能源汽车/纯电动汽车/充电系统检修/充电桩结构原理及性能介绍/充电桩结构原理及性能介绍.mp4'
          }]
        },
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        teachData: [{
          num: '',
          user: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          time: '',
          major: '',
          classGrade: ''
        }],
        stuData: [{
          num: '',
          user: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          time: '',
          major: '',
          classGrade: ''
        }],
        total1: '',
        total2: '',
        pagesize: 10,
        currentPage1: 1,
        currentPage2: 1,
      }
    },
    computed: {},
    methods: {
      getUserData() {
        axios.post('/teacherCMS/getUserData', {
          data: {
            username: this.username,
            userType: this.userType
          }
        }).then((res) => {
          //学生
          let studentData = res.data.student;
          if (studentData.length > 0) {
            for (let i = 0; i < studentData.length; i++) {
              studentData[i].time = moment(new Date(studentData[i].time)).format("YYYY-MM-DD");
              studentData[i].gender = core.getGender(studentData[i].gender);
              studentData[i].userType = core.userType(studentData[i].userType);
              studentData[i].num = i + 1;
            }
            this.stuData = studentData;
            this.total1 = this.stuData.length;
          }
          //教师
          let teacherData = res.data.teacher;
          if (teacherData.length > 0) {
            for (let i = 0; i < teacherData.length; i++) {
              teacherData[i].time = moment(new Date(teacherData[i].time)).format("YYYY-MM-DD");
              teacherData[i].gender = core.getGender(teacherData[i].gender);
              studentData[i].userType = core.userType(studentData[i].userType);
              teacherData[i].num = i + 1;
            }
            this.teachData = teacherData;
            this.total2 = this.teachData.length;
          }
        });
      },
      getClass() {
        axios.post('/teacherCMS/getClass', {
          data: {
            userType: this.userType
          }
        }).then((res) => {
            //console.log(res.data);
            this.majorM = res.data.majorMsg;
            this.classM = res.data.classMsg;
          //学生
          /*let studentData = res.data.student;
          if (studentData.length > 0) {
            this.stuData = studentData;
            this.total1 = this.stuData.length;
          }*/

        });
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      changeStudent(val) {
        this.studentSelection = val;
      },
      changeTeacher(val) {
        this.teacherSelection = val;
      },

    },
    mounted() {
        this.getUserData();
        this.getClass();

    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .gameM_cont .teacherListName{
    font-size:20px;
    margin-bottom:10px;
  }

</style>
