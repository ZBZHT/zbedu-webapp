<template>
  <div class="studentInfo">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick(tab, event)">
        <el-tab-pane label="信息查询" name="first">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column prop="stuName" label="姓名" width="120">
            </el-table-column>

            <el-table-column prop="className" label="班级" width="180">
            </el-table-column>

            <el-table-column prop="here" label="出勤">
            </el-table-column>

            <el-table-column prop="sick" label="请假">
            </el-table-column>

            <el-table-column prop="late" label="迟到(总时间)">
            </el-table-column>

            <el-table-column prop="dispear" label="缺勤">
            </el-table-column>

          </el-table>
        </el-tab-pane>
        <el-tab-pane label="请假信息" name="second">
          <div class="IamSick">
            <el-button size="mini" type="primary" @click="dialogFormVisible = true">我要请假</el-button>
          </div>

          <el-dialog title="请假申请" :visible.sync="dialogFormVisible">
                <span class="demonstration">请假时间</span>
                <el-date-picker
                  v-model="form.date"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['08:00:00', '20:00:00']">
                </el-date-picker>
            <el-form :model="form" ref="form">
              <el-form-item label="请假事由">
                <el-input type="textarea" v-model="form.reason"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="apply()">确 定</el-button>
            </div>
          </el-dialog>

          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column prop="stuName" label="请假人" width="120">
            </el-table-column>
            <el-table-column prop="date" label="请假时间" width="280">
            </el-table-column>
            <el-table-column prop="reason" label="请假事由">
            </el-table-column>
            <el-table-column prop="state" label="状态">
            </el-table-column>

          </el-table>
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
    name: 'studentInfo',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        dateData:[],
        tableData: [],
        dialogFormVisible: false,
        form: {
          date: [],
          reason: ''
        },
        formLabelWidth: '120px',
        endDatePicker:this.processDate(),
      }
    },
    computed: {

    },
    mounted() {
        this.getStuLeaveMsg();


    },
    methods: {
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      //获取请假信息
      getStuLeaveMsg(){
        axios.post('/teacherCMS/getStuLeaveMsg', {
          data: {
            form: '',
          }
        }).then((res) => {
          let resData = res.data.result;
          if (res.data.code === 0) {
            for (let i = 0; i < resData.length; i++) {
              //console.log(resData[i]);
              resData[i].date = resData[i].startDate + ',' +resData[i].startTime + '~' + resData[i].endDate + ',' + resData[i].endTime;
              if (resData[i].state === 0) {
                resData[i].state = '已批准'
              } else if (resData[i].state === 1) {
                resData[i].state = '待审核'
              }else if (resData[i].state === 2) {
                resData[i].state = '未批准'
              }
            }
            this.tableData = resData;
          }
        });
      },

      //创建考试结束时间不能大于开始时间
      processDate(){
        let self = this;
        return {
          disabledDate(time){
            return time.getTime() < self.form.date1;
          }
        }
      },
      apply(){
        this.dialogFormVisible = false;
        this.form.date[0] = moment(this.form.date[0]).format("YYYY-MM-DD,HH:mm");
        this.form.date[1] = moment(this.form.date[1]).format("YYYY-MM-DD,HH:mm");
        let date0 = this.form.date[0].split(",");
        let date1 = this.form.date[1].split(",");
        let leaveMsg = {
          startDate: date0[0],
          endDate: date1[0],
          startTime: date0[1],
          endTime: date1[1],
          reason: this.form.reason,
        };
        axios.post('/teacherCMS/newStuLeaveMsg', {
          data: {
            form: leaveMsg
          }
        }).then((res) => {
            if (res.data.code === 0) {
              this.getStuLeaveMsg();
            }

        });
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
  .studentInfo .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .studentInfo .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .studentInfo .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .studentInfo .el-table td, .el-table th {
    height: 40px;
  }
  .studentInfo .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .studentInfo .IamSick{
    text-align:left;
    margin-bottom:15px;
  }
  .studentInfo .addTable .eachDataP .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 89%;
  }
  .studentInfo .el-form-item__label{
    margin-left: 7px;
  }
</style>
