<template>
  <div class="teacherPlan">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick()">
        <el-tab-pane label="授课计划表" name="first">
          <div class="classPlan">
            <div class="classPlan_top">
              <div class="classPlan_topLeft"></div>
              <div class="classPlan_topRight">
                <el-row>
                  <el-col :span="3" v-for="item in weekData">
                    <div class="grid-content bg-purple">
                      <p class="weekDataP">{{item}}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="classPlan_bottom">
              <div class="classPlan_bottomLeft">
                <el-row>
                    <el-col v-for="item in classData">
                      <div class="grid-content bg-purple">
                        {{item}}
                      </div>
                    </el-col>
                  </el-row>
              </div>
              <div class="classPlan_bottomRight">
                <el-row>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                    <el-col :span="3"><div class="grid-content bg-purple-light"></div></el-col>
                  </el-row>
              </div>
            </div>
            
          </div>
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
    components: {}
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
  .teacherPlan .classPlan{
    width:80%;
    height:700px;
    border:1px solid #000;
    margin:0 auto;
    margin-top: 25px;
  }
  .teacherPlan .classPlan .classPlan_top{
    width:100%;
    height:8%;
    display:flex;
  }
  .teacherPlan .classPlan .classPlan_bottom{
    width:100%;
    height:100%;
    display:flex;
  }
  .teacherPlan .classPlan .classPlan_topLeft{
    width:5%;
    height:100%;
    border:1px solid #000;
  }
  .teacherPlan .classPlan .classPlan_topRight{
    width:95%;
    height:100%;
    border:1px solid #000;
  }
  .teacherPlan .classPlan .classPlan_bottomLeft{
    width:5%;
    height:92%;
    border:1px solid #000;
  }
  .teacherPlan .classPlan .classPlan_bottomRight{
    width:95%;
    height:100%;
    border:1px solid #000;
  }
  .teacherPlan .el-row {
    padding-top:0;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .teacherPlan .el-col {
    border-radius: 4px;
  }
  .teacherPlan .bg-purple-dark {
    background: #99a9bf;
  }
  .teacherPlan .bg-purple {
    background: #d3dce6;
  }
  .teacherPlan .bg-purple-light {
    background: #e5e9f2;
  }
  .teacherPlan .classPlan_topRight .grid-content {
    border-radius: 4px;
    min-height: 54px;
    width: 98%;
  }
  .teacherPlan .classPlan_topRight .weekDataP{
    
  }
  .teacherPlan .classPlan_bottomLeft .grid-content {
    border-radius: 4px;
    min-height: 106px;
    margin-top: 3px;
    padding-top: 43px;
    box-sizing: border-box;
  }
  .teacherPlan .classPlan_bottomRight .grid-content {
    border-radius: 4px;
    min-height: 106px;
  }
  .teacherPlan .classPlan_bottomRight .el-col {
    padding:2px;
  }
  .teacherPlan .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
