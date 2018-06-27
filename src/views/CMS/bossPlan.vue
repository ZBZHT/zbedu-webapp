<template>
  <div class="bossPlan">
    <el-col :span="19">

      <el-select class="selectClass" v-model="classGrade" @change="showThreeTable()" placeholder="请选择班级">
        <div v-for="item in classM">
          <el-option :label="item.label" :value="item.label"></el-option>
        </div>
      </el-select>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick()" v-show="showThree">
        <el-tab-pane label="授课计划表" name="first">

          <show-table :course = "course"></show-table>

        </el-tab-pane>
        <el-tab-pane label="增加授课计划" name="second">
          <el-form :inline="true" class="demo-form-inline" ref="form" :model="form" status-icon :rules="rules"
                           label-width="80px">

                    <el-form-item label="开始日期" prop="date1">
                      <el-date-picker
                        v-model="form.date1"
                        type="date"
                        @change="compareTime()"
                        placeholder="开始日期"
                        :picker-options="startDatePicker">
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束日期" prop="date2">
                      <el-date-picker
                        v-model="form.date2"
                        type="date"
                        @change="compareTime()"
                        placeholder="结束日期"
                        :picker-options="endDatePicker">
                      </el-date-picker>
                    </el-form-item>

                    <add-table :classGrade = "classGrade"></add-table>

                  </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改授课计划" name="third">

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
  import addTable from './compontents/addTable'

  export default {
    name: 'bossPlan',
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
        course: {},
        showThree:false,
      }
    },
    computed: {

    },
    mounted() {
      this.getClassList();
      this.getCourseTable();
      
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //选择班级显示table，选择班级切换数据
      showThreeTable(){
        if(this.classGrade != ''){
        //  console.log("ppp")
          this.showThree = true;
        }else{

        }
      },
      //选择后创建考试结束时间不能大于开始时间
      compareTime(){
      //  console.log(new Date(this.form.date1).getTime());
      //  console.log(new Date(this.form.date2).getTime());
        if(new Date(this.form.date1).getTime() > new Date(this.form.date2).getTime()){
      //    console.log("xiao")
          this.form.date2 = '';
        }else{
      //    console.log("da")
        }
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
      //获取-课程表
      getCourseTable(){
        axios.post('/teacherCMS/getCourseTable', {
          data: {
            courseDate: "2018-6-19",
            className: "镇江培训"
          }
        }).then((res) => {
          let resData = res.data.result;
          if (res.data.code === 0) {
            this.course = resData.course[0];
          }
        });
      },
      //获取-课程表
      getClassList() {
        axios.post('/teacherCMS/getClass', {
          data: {
            userType: this.userType
          }
        }).then((res) => {
          console.log(res.data);
          //this.majorM = res.data.majorMsg;
          this.classM = res.data.classMsg;
        });
      },
    },

    components: {showTable,addTable}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .bossPlan .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossPlan .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossPlan .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .bossPlan .el-table td, .el-table th {
    height: 40px;
  }
  .bossPlan .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .bossPlan p .el-button--primary{
    margin-bottom: 70px;
  }
</style>
