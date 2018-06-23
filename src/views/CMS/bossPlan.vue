<template>
  <div class="bossPlan">
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

                    <p>
                      <el-button type="primary" @click="compareTime1()">立即创建</el-button>
                    </p>
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

  export default {
    name: 'bossPlan',
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
  .bossPlan .classPlan{
    width:80%;
    height:700px;
    border:1px solid #000;
    margin:0 auto;
    margin-top: 25px;
  }
  .bossPlan .classPlan .classPlan_top{
    width:100%;
    height:8%;
    display:flex;
  }
  .bossPlan .classPlan .classPlan_bottom{
    width:100%;
    height:100%;
    display:flex;
  }
  .bossPlan .classPlan .classPlan_topLeft{
    width:5%;
    height:100%;
    border:1px solid #000;
  }
  .bossPlan .classPlan .classPlan_topRight{
    width:95%;
    height:100%;
    border:1px solid #000;
  }
  .bossPlan .classPlan .classPlan_bottomLeft{
    width:5%;
    height:92%;
    border:1px solid #000;
  }
  .bossPlan .classPlan .classPlan_bottomRight{
    width:95%;
    height:100%;
    border:1px solid #000;
  }
  .bossPlan .el-row {
    padding-top:0;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .bossPlan .el-col {
    border-radius: 4px;
  }
  .bossPlan .bg-purple-dark {
    background: #99a9bf;
  }
  .bossPlan .bg-purple {
    background: #d3dce6;
  }
  .bossPlan .bg-purple-light {
    background: #e5e9f2;
  }
  .bossPlan .classPlan_topRight .grid-content {
    border-radius: 4px;
    min-height: 54px;
    width: 98%;
  }
  .bossPlan .classPlan_topRight .weekDataP{
    
  }
  .bossPlan .classPlan_bottomLeft .grid-content {
    border-radius: 4px;
    min-height: 106px;
    margin-top: 3px;
    padding-top: 43px;
    box-sizing: border-box;
  }
  .bossPlan .classPlan_bottomRight .grid-content {
    border-radius: 4px;
    min-height: 106px;
  }
  .bossPlan .classPlan_bottomRight .el-col {
    padding:2px;
  }
  .bossPlan .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
