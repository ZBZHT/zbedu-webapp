<template>
  <div class="bossPlan">
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

          <show-table :course = "course"></show-table>

        </el-tab-pane>
        <el-tab-pane label="增加授课计划" name="second">
          <el-form :inline="true" class="demo-form-inline" ref="form" :model="form" status-icon :rules="rules"
                           label-width="80px">

                    <el-form-item label="开始日期" prop="date1">
                      <el-date-picker
                        v-model="form.date1"
                        type="date"
                        placeholder="开始日期"
                        :picker-options="startDatePicker">
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束日期" prop="date2">
                      <el-date-picker
                        v-model="form.date2"
                        type="date"
                        placeholder="结束日期"
                        :picker-options="endDatePicker">
                      </el-date-picker>
                    </el-form-item>

                    <add-table></add-table>

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
        course:  {
            "firstQuarter": [
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              }
            ],
            "Quarter": [
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某77777楼"
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              },
              {
                  "courseTime": "2018-6-18-9:00, 2018-6-18-10:00",
                  "teacher": "付老师",
                  "courseName": "新能源电池技术",
                  "courseAddress": "某某5楼"
                
              }
            ]
          },
        

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
