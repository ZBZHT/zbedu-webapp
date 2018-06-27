<template>
  <div class="showTable">
    <div class="classPlan">
            <div class="classPlan_top">
              <div class="classPlan_topLeft"></div>
              <div class="classPlan_topRight">
                <!--<el-row>-->
                  <!--<el-col :span="3" v-for="(item,index) in weekData" :key = "index">-->
                    <!--<div class="grid-content bg-purple">-->
                      <!--<p>{{item}}</p>-->
                    <!--</div>-->
                  <!--</el-col>-->
                <!--</el-row>-->
                <table>
                  <tr>
                    <td v-for="(item,index) in weekData" :key = "index" class="weekDataP">{{item}}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="classPlan_bottom">
              <div class="classPlan_bottomLeft">
                <!--<el-row>-->
                    <!--<el-col v-for="(item,index) in classData" :key = "index">-->
                      <!--<div class="grid-content bg-purple">-->
                        <!--{{item}}-->
                      <!--</div>-->
                    <!--</el-col>-->
                  <!--</el-row>-->
                <table>
                  <tr v-for="(item2,index2) in classData" :key = "index2">
                    <td class="classDataP">{{item2}}</td>
                  </tr>
                </table>
              </div>
              <div class="classPlan_bottomRight">
                <table>
                  <tr>
                    <td class="eachDataP" v-for="(item3,index3) in course.firstQuarter">
                        {{item3.courseTime}}
                        {{item3.teacher}}
                        {{item3.courseName}}
                        {{item3.courseAddress}}
                    </td>
                  </tr>
                  <tr>
                    <td class="eachDataP" v-for="(item3,index3) in course.Quarter">
                        {{item3.courseTime}}
                        {{item3.teacher}}
                        {{item3.courseName}}
                        {{item3.courseAddress}}
                    </td>
                  </tr>
                </table>
              </div>
            </div>

          </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'showTable',
    props:['course'],
    data() {
      return {
        weekData:['周一','周二','周三','周四','周五','周六','周日'],
        classData:['1','2','3','4','5'],
        
      }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
      

    },

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .showTable .classPlan{
    width:80%;
    height:700px;
    margin:0 auto;
    margin-top: 25px;
  }
  .showTable .classPlan .classPlan_top{
    width:100%;
    height:8%;
    display:flex;
  }
  .showTable .classPlan .classPlan_bottom{
    width:100%;
    height:100%;
    display:flex;
  }
  .showTable .classPlan .classPlan_topLeft{
    width:5%;
    height:104%;
    background: #e5e9f2;
    border: 5px solid #fff;
  }
  .showTable .classPlan .classPlan_topRight{
    width:95%;
    height:100%;
  }
  .showTable .classPlan .classPlan_bottomLeft{
    width:5%;
    height:92%;
  }
  .showTable .classPlan .classPlan_bottomRight{
    width:95%;
    height:100%;
  }
  .showTable .el-row {
    padding-top:0;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .showTable .el-col {
    border-radius: 4px;
  }
  .showTable .bg-purple-dark {
    background: #99a9bf;
  }
  .showTable .bg-purple {
    background: #d3dce6;
  }
  .showTable .bg-purple-light {
    background: #e5e9f2;
  }
  .showTable .classPlan_topRight .grid-content {
    border-radius: 4px;
    min-height: 54px;
    width: 98%;
  }
  .showTable .classPlan_topRight .weekDataP{
    background: #e5e9f2;
    width: 183px;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 53px;
  }
  .showTable .classDataP{
    background: #e5e9f2;
    width: 1%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
  }
  .showTable .eachDataP{
    background: #e5e9f2;
    width: 4%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
  }
  .showTable .classPlan_bottomLeft .grid-content {
    border-radius: 4px;
    min-height: 106px;
    margin-top: 3px;
    padding-top: 43px;
    box-sizing: border-box;
  }
  .showTable .classPlan_bottomRight .grid-content {
    border-radius: 4px;
    min-height: 106px;
  }
  .showTable .classPlan_bottomRight .el-col {
    padding:2px;
  }
  .showTable .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
