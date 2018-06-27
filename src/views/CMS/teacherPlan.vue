<template>
  <div class="teacherPlan">
    <el-col :span="19">

      <el-form>
        <el-form-item label="请选择班级" prop="classGrade">
          <el-select v-model="classGrade" placeholder="请选择班级">
            <div v-for="item in classM">
              <el-option :label="item.label" :value="item.label"></el-option>
            </div>
          </el-select>
        </el-form-item>
      </el-form>

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
        classGrade: '',
        classM:[],
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
          classGrade: [
            {required: true, message: '请输入班级', trigger: 'change'}
          ],
        },
        startDatePicker:this.beginDate(),
        endDatePicker:this.processDate(),
      }
    },
    computed: {

    },
    mounted() {
         //请求班级、专业
      axios.post('/teacherCMS/getClass', {
          data: {
            userType: this.userType
          }
        }).then((res) => {
        //    console.log(res.data);
            this.majorM = res.data.majorMsg;
            this.classM = res.data.classMsg;
        });

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
