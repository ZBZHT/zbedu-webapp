<template>
  <div class="bossInfor">
    <el-col :span="19">
      请选择班级
      <el-select class="selectClass" v-model="classGrade" @change="showThreeTable()" placeholder="请选择班级">
        <div v-for="item in classM">
          <el-option :label="item.label" :value="item.label"></el-option>
        </div>
      </el-select>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

        <el-tab-pane label="信息查询" name="first">

          <select-table :course = "course" :mondayDate = "mondayDate" :weekDate = "weekDate"></select-table>

        </el-tab-pane>
        <el-tab-pane label="请假审批" name="second">

          <b-card no-body>
            <b-tabs pills card vertical>
              <b-tab title="待审核" active>
                <div class="waitCheck">
                  <el-table
                    :data="leaveMsg"
                    stripe
                    style="width: 100%">
                    <el-table-column prop="stuName" label="请假人" width="120">
                    </el-table-column>

                    <el-table-column prop="date" label="请假时间" width="140">
                    </el-table-column>

                    <el-table-column prop="className" label="班级" width="120">
                    </el-table-column>

                    <el-table-column prop="reason" label="请假事由">
                    </el-table-column>

                    <el-table-column label="操作" width="180">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="ratify(scope.$index, scope.row)">批准</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="prohibit(scope.$index, scope.row)">不批准</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>


              </b-tab>
              <b-tab title="已审核">
                <div class="waitCheck">
                  <el-table
                    :data="leaveMsg2"
                    stripe
                    style="width: 100%">
                    <el-table-column prop="stuName" label="请假人" width="120">
                    </el-table-column>

                  <el-table-column prop="date" label="请假时间" width="140">
                  </el-table-column>

                  <el-table-column prop="className" label="班级" width="120">
                  </el-table-column>

                  <el-table-column prop="reason" label="请假事由">
                  </el-table-column>

                  <el-table-column prop="state" label="请假状态" width="100">
                  </el-table-column>

                    <el-table-column label="操作" width="100">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="ratify(scope.$index, scope.row)" v-show="leaveMsg2[scope.$index].state == '未批准'">批准</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>


              </b-tab>
            </b-tabs>
          </b-card>

        </el-tab-pane>
      </el-tabs>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import moment from 'moment'
  import selectTable from './compontents/selectTable'


  export default {
    name: 'bossInfor',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        classGrade: '',
        classM:[],
        dateData:[],
        rules:{
          classGrade: [
            {required: true, message: '请输入班级', trigger: 'change'}
          ],
        },
        mondayDate:'',
        weekDate:[],
        showThree:false,
        leaveMsg: [],
        leaveMsg2: [],
        course: [],
        stateList: [],

      }
    },
    computed: {

    },
    mounted() {
      this.classGrade = this.$store.state.classGrade;
      let date = moment().format("YYYY-MM-DD");
      this.getCourseTable(date);
      this.getClassList();
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
      //选择班级显示table，选择班级切换数据
      showThreeTable(){
        this.course = '';
        this.$store.commit('getClassGrade',this.classGrade);
        let resDate = core.getMonday(new Date());
        resDate = moment(resDate).format("YYYY-MM-DD");
        //console.log(resDate)
        //console.log(this.classGrade);
        this.getCourseTable(resDate);
        this.getLeaveMsg();
      },
      //获取-班级信息
      getClassList() {
        axios.post('/teacherCMS/getClass', {
          data: {
            userType: this.userType
          }
        }).then((res) => {
          //console.log(res.data);
          //this.majorM = res.data.majorMsg;
          this.classM = res.data.classMsg;
        });
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
            for(var i = 0; i < this.course.newCourse.length; i++){
              this.course.newCourse[i].id = 'a'+ parseInt(i+1);
              if(this.course.newCourse[i].teacher == this.$store.state.username){
                this.course.newCourse[i].color = '#f00';
              }else{
                this.course.newCourse[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse2.length; i++){
              this.course.newCourse2[i].id = 'b'+ parseInt(i+1);
              if(this.course.newCourse2[i].teacher == this.$store.state.username){
                this.course.newCourse2[i].color = '#f00';
              }else{
                this.course.newCourse2[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse3.length; i++){
              this.course.newCourse3[i].id = 'c'+ parseInt(i+1);
              if(this.course.newCourse3[i].teacher == this.$store.state.username){
                this.course.newCourse3[i].color = '#f00';
                //console.log("nnnmmm")
              }else{
                this.course.newCourse3[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse4.length; i++){
              this.course.newCourse4[i].id = 'd'+ parseInt(i+1);
              if(this.course.newCourse4[i].teacher == this.$store.state.username){
                this.course.newCourse4[i].color = '#f00';
                //console.log("nnnmmm")
              }else{
                this.course.newCourse4[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse5.length; i++){
              this.course.newCourse5[i].id = 'e'+ parseInt(i+1);
              if(this.course.newCourse5[i].teacher == this.$store.state.username){
                this.course.newCourse5[i].color = '#f00';
                //console.log("nnnmmm")
              }else{
                this.course.newCourse5[i].color = '';
              }
            }
          }
          this.weekDate = core.getDayAll(new Date(this.mondayDate));
          //  console.log(this.weekDate)
        });
      },
      //获取请假信息
      getLeaveMsg(){
        this.leaveMsg = [];
        this.leaveMsg2 = [];
        axios.post('/teacherCMS/getLeaveMsg', {
          data: {
            className: this.classGrade,
          }
        }).then((res) => {
          let resData = res.data.result;
          console.log(resData);
          if (res.data.code === 0) {
            for (let i = 0; i < resData.length; i++) {
              resData[i].date = resData[i].startDate + ',' +resData[i].startTime + resData[i].endDate + ',' + resData[i].endTime
              if (resData[i].state === 1) {
                this.leaveMsg.push(resData[i])
              } else {
                if (resData[i].state === 0) {
                  resData[i].state = '已批准'
                } else if (resData[i].state === 2) {
                  resData[i].state = '未批准'
                }
                this.leaveMsg2.push(resData[i])
              }
            }
            //console.log(this.leaveMsg);
            //console.log(this.leaveMsg2);
          }
        });
      },
      //批准-不批准
      alterLeaveState(row, state){
        //console.log(row);
        //console.log(state);
        axios.post('/teacherCMS/alterLeaveState', {
          data: {
            leaveState: row,
            state: state,
          }
        }).then((res) => {
          let resData = res.data;
          if (res.data.code === 0) {
            this.addSuccess('已批准');
            this.getLeaveMsg();
          } else if (res.data.code === 1) {
            this.addDefeat('修改出错')
          }
          console.log(resData);
        });
      },
      //批准
      ratify(index, row) {
        //console.log(index, row);
        this.alterLeaveState(row, 0)
      },
      //不批准
      prohibit(index, row) {
        //console.log(index, row);
        this.alterLeaveState(row, 2)
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },

    components: {selectTable}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .bossInfor .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossInfor .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossInfor .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .bossInfor .el-table td, .el-table th {
    height: 40px;
  }
  .bossInfor .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .bossInfor p {
    margin-bottom: 0;
  }
  .bossInfor .el-tabs__header {
    margin: 0 0 10px;
  }
  .bossInfor .waitCheck{
    position:absolute;
    top:0;
    left:10px;
    width:100%;
  }
  .bossInfor .checkButtons{
    width:80px;
  }
  .bossInfor .card {
    margin-top: 3px;
    border: none;
  }
  .bossInfor .card-header {
    background-color: #d2d2d2;
  }
  .bossInfor .col-auto {
    height: 38rem;
    margin-top: 2.5rem;
  }
  .bossInfor .nav-pills .nav-link {
    padding: 0.3rem 4.5rem;
    border-bottom: 2px solid white;
    border-radius: 0;
  }
  .bossInfor .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    background-color: #6a1518;
  }
  .bossInfor .nav-pills .nav-link.active, .nav-pills .show > a {
    color: white;
  }
  .bossInfor a {
    color: #212529;
  }
  .bossInfor .card-header:first-child {
    padding: 0;
    margin-top:-40px;
  }
  .bossInfor #__BVID__11__BV_tab_container_ {
    min-width: 70%;
  }
  .bossInfor .el-tabs__header{
    margin: 0 0 10px;
  }
  .bossInfor p{
    margin-bottom: 0.5rem;
  }
  .bossInfor .currTable{
    width:80%;
    margin:0 auto;
    padding: 10px;
    text-align: left;
  }
  .bossInfor .currTable1{
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

</style>
