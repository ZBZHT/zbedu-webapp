<template>
  <div class="teacherPlan">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick()">
        <el-tab-pane label="授课计划表" name="first">
          
          <show-table></show-table>

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
    name: 'teacherPlan',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        weekData:['周一','周二','周三','周四','周五','周六','周日','备注'],
        classData:['1','2','3','4','5','6'],
        form:{
          date1: '',
          date2: '',
        },
        rules:{
          date1: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
        },
        startDatePicker:this.beginDate(),
        endDatePicker:this.processDate(),
      }
    },
    computed: {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //创建考试开始时间不能选择历史日期
      beginDate(){
        let self = this
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
            return time.getTime() < self.form.date1;
          }
        }
      },

    },
    mounted() {
        

    },
    components: {showTable}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .teacherPlan .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherPlan .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherPlan .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .teacherPlan .el-table td, .el-table th {
    height: 40px;
  }
  .teacherPlan .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  
</style>
