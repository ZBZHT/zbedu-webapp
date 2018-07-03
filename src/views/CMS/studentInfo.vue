<template>
  <div class="studentInfo">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick()">
        <el-tab-pane label="信息查询" name="first">
          <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="class"
              label="班级"
              width="180">
            </el-table-column>
            <el-table-column
              prop="here"
              label="出勤">
            </el-table-column>
            <el-table-column
              prop="sick"
              label="请假">
            </el-table-column>
            <el-table-column
              prop="late"
              label="迟到">
            </el-table-column>
            <el-table-column
              prop="dispear"
              label="缺勤">
            </el-table-column>
            <el-table-column
              prop="lateTime"
              label="迟到总时间">
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
                  v-model="form.date4"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>

            <el-form :model="form" ref="form">
              <el-form-item label="请假事由">
                <el-input type="textarea" v-model="form.desc"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="apply(),dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>

          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="time"
              label="请假时间"
              width="180">
            </el-table-column>
            <el-table-column
              prop="class"
              label="请假事由"
              width="180">
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
        tableData: [{
          name: '王小虎',
        }],
        dialogFormVisible: false,
        form: {
          date4: [],
          desc: ''
        },
        formLabelWidth: '120px',
        endDatePicker:this.processDate(),
      }
    },
    computed: {

    },
    mounted() {


    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      
      //创建考试结束时间不能大于开始时间
      processDate(){
        let self = this
        return {
          disabledDate(time){
            return time.getTime() < self.form.date1;
          }
        }
      },
      apply(){
        axios.post('/teacherCMS/newCourseTable', {
          data: {
            form:this.form
          }
        }).then((res) => {

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
