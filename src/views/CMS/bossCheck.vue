<template>
  <div class="bossCheck">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

        <el-tab-pane label="请假审批" name="first">

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

                    <el-table-column prop="date" label="请假时间" width="300">
                    </el-table-column>

                    <el-table-column prop="courseName" label="课程">
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

                  <el-table-column prop="date" label="请假时间" width="300">
                  </el-table-column>

                  <el-table-column prop="className" label="班级" width="100">
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


  export default {
    name: 'bossCheck',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        leaveMsg: [],
        leaveMsg2: [],

      }
    },
    computed: {

    },
    mounted() {
      let date = moment().format("YYYY-MM-DD");
      this.getLeaveMsg();
    },
    methods: {
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
          if (res.data.code === 0) {
            for (let i = 0; i < resData.length; i++) {
              resData[i].date = resData[i].startDate + ',' +resData[i].startTime + '~' + resData[i].endDate + ',' + resData[i].endTime
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

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .bossCheck .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossCheck .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossCheck .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .bossCheck .el-table td, .el-table th {
    height: 40px;
  }
  .bossCheck .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .bossCheck p {
    margin-bottom: 0;
  }
  .bossCheck .el-tabs__header {
    margin: 0 0 10px;
  }
  .bossCheck .waitCheck{
    position:absolute;
    top:0;
    left:10px;
    width:100%;
  }
  .bossCheck .checkButtons{
    width:80px;
  }
  .bossCheck .card {
    margin-top: 3px;
    border: none;
  }
  .bossCheck .card-header {
    background-color: #d2d2d2;
  }
  .bossCheck .col-auto {
    height: 38rem;
    margin-top: 2.5rem;
  }
  .bossCheck .nav-pills .nav-link {
    padding: 0.3rem 4.5rem;
    border-bottom: 2px solid white;
    border-radius: 0;
  }
  .bossCheck .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    background-color: #6a1518;
  }
  .bossCheck .nav-pills .nav-link.active, .nav-pills .show > a {
    color: white;
  }
  .bossCheck a {
    color: #212529;
  }
  .bossCheck .card-header:first-child {
    padding: 0;
    margin-top:-40px;
  }
  .bossCheck #__BVID__11__BV_tab_container_ {
    min-width: 70%;
  }
  .bossCheck .el-tabs__header{
    margin: 0 0 10px;
  }
  .bossCheck p{
    margin-bottom: 0.5rem;
  }
  .bossCheck .currTable{
    width:80%;
    margin:0 auto;
    padding: 10px;
    text-align: left;
  }
  .bossCheck .currTable1{
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
