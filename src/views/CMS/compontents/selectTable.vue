<template>
  <div class="selectTable">
    <div class="colorButtons">
      <el-button size="mini" type="success">出勤</el-button>
      <el-button size="mini" type="danger">缺勤</el-button>
      <el-button size="mini" type="warning">迟到</el-button>
      <el-button size="mini" type="primary">请假</el-button>
    </div>  
    <el-button type="primary" @click="previous()" class="pageButton"> < </el-button>
    <div class="classPlan">
      <div class="classPlan_top">
        <!--<div class="classPlan_topLeft"></div>-->
        <div class="classPlan_topLeft" v-show = "course"></div>
        <div class="classPlan_topRight">
          <table>
            <tr>
              <td v-for="(item,index) in weekData" :key="index" class="weekDataP">{{item}}</td>
            </tr>
            <tr>
              <td rowspan="2" v-for="(itemW,indexW) in weekDate" :key="indexW" class="weekDateP">{{itemW}}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="classPlan_bottom">
        <!--<div class="classPlan_bottomLeft">-->
          <!--<table>-->
            <!--<tr v-for="(item2,index2) in classData" :key="index2">-->
              <!--<td class="classDataP">{{item2}}</td>-->
            <!--</tr>-->
          <!--</table>-->
        <!--</div>-->
        <div class="classPlan_bottomRight">
          <table>
            <tr>
              <td class="classDataP" v-show = "course">1</td>
                <td @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse" :style="{color:item3.color}">
                    <p>{{item3.startTime}}~{{item3.endTime}}</p>
                    <p>{{item3.teacher}}</p>
                    <p>{{item3.courseName}}</p>
                    <p>{{item3.courseAddress}}</p>
                    <!--<div class="bing"></div>-->
                    <div :id="item3.id">

                    </div>

                </td>
            </tr>
            <tr>
              <td class="classDataP2" v-show = "course">2</td>
              <td @click="openDialog(item3, index3)" class="eachDataP2" v-for="(item3,index3) in course.newCourse2" :style="{color:item3.color}">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">3</td>
              <td @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse3" :style="{color:item3.color}">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">4</td>
              <td @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse4" :style="{color:item3.color}">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
            <tr>
              <td class="classDataP" v-show = "course">5</td>
              <td @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse5" :style="{color:item3.color}">
                <p>{{item3.startTime}}~{{item3.endTime}}</p>
                <p>{{item3.teacher}}</p>
                <p>{{item3.courseName}}</p>
                <p>{{item3.courseAddress}}</p>
              </td>
            </tr>
          </table>
        </div>

        <el-dialog title="考勤信息" :visible.sync="dialogTableVisible">
          <ul class="currTable">
            <li class="currTable1" v-for="item in stateList" :style="{background:item.state}">
              <img class="studentPng" src="../../../assets/imgs/user.png">
              <p class="studentName">{{item.stuName}}</p>
            </li>
          </ul>
        </el-dialog>

      </div>
    </div>
    <el-button type="primary" @click="next()" class="pageButton"> > </el-button>
  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../assets/js/core.js'
  import moment from 'moment'
  import echarts from 'echarts'

  export default {
    name: 'selectTable',
    props: ['course','mondayDate','weekDate'],
    data() {
      return {
        echarts1_option:{
          backgroundColor: '#fff',
          series : [
              {
                  type: 'pie',
                  radius: '50%',
                  data:[
                    {
                      value:30,
                      name:'30',
                      itemStyle: {
                          color: 'rgb(103,194,58)'
                      }
                    }, 
                    {
                      value:10,
                      name:'10',
                      itemStyle: {
                          color: 'rgb(245,108,108)'
                      }
                    }, 
                    {
                      value:1,
                      name:'1',
                      itemStyle: {
                          color: 'rgb(230,162,60)'
                      }
                    }, 
                    {
                      value:0,
                      name:'0',
                      itemStyle: {
                          color: 'rgb(0,122,204)'
                      }
                    }, 
                  ],
                  label: {
                      normal: {
                          textStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          lineStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
            }
          ]
        },
        echarts2_option:{
          backgroundColor: '#fff',
          series : [
              {
                  type: 'pie',
                  radius: '50%',
                  data:[
                    {
                      value:20,
                      name:'20',
                      itemStyle: {
                          color: 'rgb(103,194,58)'
                      }
                    }, 
                    {
                      value:1,
                      name:'1',
                      itemStyle: {
                          color: 'rgb(245,108,108)'
                      }
                    }, 
                    {
                      value:2,
                      name:'2',
                      itemStyle: {
                          color: 'rgb(230,162,60)'
                      }
                    }, 
                    {
                      value:7,
                      name:'7',
                      itemStyle: {
                          color: 'rgb(0,122,204)'
                      }
                    }, 
                  ],
                  label: {
                      normal: {
                          textStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          lineStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
            }
          ]
        },
        echarts3_option:{
          backgroundColor: '#fff',
          series : [
              {
                  type: 'pie',
                  radius: '50%',
                  data:[
                    {
                      value:25,
                      name:'25',
                      itemStyle: {
                          color: 'rgb(103,194,58)'
                      }
                    }, 
                    {
                      value:0,
                      name:'0',
                      itemStyle: {
                          color: 'rgb(245,108,108)'
                      }
                    }, 
                    {
                      value:5,
                      name:'5',
                      itemStyle: {
                          color: 'rgb(230,162,60)'
                      }
                    }, 
                    {
                      value:5,
                      name:'5',
                      itemStyle: {
                          color: 'rgb(0,122,204)'
                      }
                    }, 
                  ],
                  label: {
                      normal: {
                          textStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          lineStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
            }
          ]
        },
        echarts4_option:{
          backgroundColor: '#fff',
          series : [
              {
                  type: 'pie',
                  radius: '50%',
                  data:[
                    {
                      value:30,
                      name:'30',
                      itemStyle: {
                          color: 'rgb(103,194,58)'
                      }
                    }, 
                    {
                      value:0,
                      name:'0',
                      itemStyle: {
                          color: 'rgb(245,108,108)'
                      }
                    }, 
                    {
                      value:0,
                      name:'0',
                      itemStyle: {
                          color: 'rgb(230,162,60)'
                      }
                    }, 
                    {
                      value:0,
                      name:'0',
                      itemStyle: {
                          color: 'rgb(0,122,204)'
                      }
                    }, 
                  ],
                  label: {
                      normal: {
                          textStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          lineStyle: {
                              color: 'rgb(0, 0, 0)'
                          }
                      }
                  },
            }
          ]
        },
        weekData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        classData: ['1', '2', '3', '4', '5'],
        alterForm:{
          startTime: '',
          endTime: '',
          teacher:'',
          courseName:'',
          courseAddress:''
        },
        dialogTableVisible: false,
        classGrade: this.$store.state.classGrade,
        courseName: "计算机原理",
        courseDate: "2018-6-18",
        teacher: "杜伟",
        startTime: "9:00",
        endTime: "10:00",
        stateList: [],
        

      }
    },
    computed: {},
    mounted() {
      //获取课程框的高

      //获取饼
      this.getPie();

    },
    methods: {

      //重置数据

      //点击上一个
      previous(){
        this.course = '';
     //   console.log(this.mondayDate);
        var res = core.getYestoday(new Date(this.mondayDate));
        res = core.getMonday(new Date(res));
        res = moment(res).format("YYYY-MM-DD");
     //   console.log(res)
        this.getCourseTable(res)
      },
      //点击下一个
      next(){
        this.course = '';
     //   console.log(this.mondayDate);
        var res = core.getTomorrow(new Date(this.mondayDate));
        res = core.getMonday(new Date(res));
        res = moment(res).format("YYYY-MM-DD");
        console.log(res);
        this.getCourseTable(res)
      },
      //显示考勤信息弹窗
      openDialog(item, index){
        this.stateList = [];
        this.dialogTableVisible = true;
        axios.post('/teacherCMS/getTimeSheet', {
          data: {
            courseName: item.courseName,
            courseDate: this.weekDate[index],
            teacher: item.teacher,
            className: this.classGrade,
            startTime: item.startTime,
          }
        }).then((res) => {
          let resData = res.data.result;
          if (res.data.code === 0) {
            for (let i = 0; i < resData.stateList.length; i++) {
            //  resData.stateList[i].teacher = item.teacher;
            //  resData.stateList[i].classGrade = this.classGrade;
            //  resData.stateList[i].courseName = item.courseName;
            //  resData.stateList[i].courseDate = this.weekDate[index];
              if (resData.stateList[i].state === 0) {
                resData.stateList[i].state = 'rgba(103,194,58,0.5)';
              } else if (resData.stateList[i].state === 1) {
                resData.stateList[i].state = 'rgba(245,108,108,0.5)';
              } else if (resData.stateList[i].state === 2) {
                resData.stateList[i].state = 'rgba(230,162,60,0.5)';
              } else if (resData.stateList[i].state === 3) {
                resData.stateList[i].state = 'rgba(0,122,204,0.5)';
              }
            }
            console.log(resData.stateList);
            this.stateList = resData.stateList;
          }
        });
      },
      //获取饼
      getPie(){
        var fun = window.setInterval(function(){
          if(echarts.init(document.getElementById('a1'))){
            let myChart = echarts.init(document.getElementById('a1'));
            //console.log(myChart)
            // 绘制图表，this.echarts1_option是数据
            myChart.setOption(this.echarts1_option);
            //console.log("11")
            let myChart2 = echarts.init(document.getElementById('a2'));
            myChart2.setOption(this.echarts2_option);
            let myChart3 = echarts.init(document.getElementById('a3'));
            myChart3.setOption(this.echarts3_option);
            let myChart4 = echarts.init(document.getElementById('a4'));
            myChart4.setOption(this.echarts4_option);
            window.clearInterval(fun);
          }else{
            //console.log("nmnmmn")
          }
        }.bind(this),1000);
      },
      //获取-课程表
      getCourseTable(resDate){
          this.getPie();
          axios.post('/teacherCMS/getCourseTable', {
            data: {
              courseDate: resDate,
              className: this.$store.state.classGrade,
            }
          }).then((res) => {
          //  console.log(res.data.result)
            let resData = res.data.result;
            if (res.data.code === 0) {
              this.course = resData.course[0];
              this.mondayDate = res.data.result.courseDate;
              this.weekDate = core.getDayAll(new Date(this.mondayDate));
            }
            for(var i = 0; i < resData.course[0].newCourse.length; i++){
                resData.course[0].newCourse[i].id = 'a'+ parseInt(i+1);
                  if(resData.course[0].newCourse[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse[i].color = '#f00';
                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse2.length; i++){
                resData.course[0].newCourse2[i].id = 'b'+ parseInt(i+1);
                  if(resData.course[0].newCourse2[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse2[i].color = '#f00';
                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse2[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse3.length; i++){
                resData.course[0].newCourse3[i].id = 'c'+ parseInt(i+1);
                  if(resData.course[0].newCourse3[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse3[i].color = '#f00';
                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse3[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse4.length; i++){
                resData.course[0].newCourse4[i].id = 'd'+ parseInt(i+1);
                  if(resData.course[0].newCourse4[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse4[i].color = '#f00';
                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse4[i].color = '';
                  }
              }
              for(var i = 0; i < resData.course[0].newCourse5.length; i++){
                resData.course[0].newCourse5[i].id = 'e'+ parseInt(i+1);
                  if(resData.course[0].newCourse5[i].teacher == this.$store.state.username){
                    resData.course[0].newCourse5[i].color = '#f00';
                    //console.log("nnnmmm")
                  }else{
                    resData.course[0].newCourse5[i].color = '';
                  }
              }
          });
        },
    },

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .selectTable{
    display:flex;
    margin-bottom: 60px !important;
    overflow:auto;
  }
  .selectTable .pageButton{
    height: 100%;
    margin-top: 336px;
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .selectTable .classPlan {
    width: 80%;
    height: 700px;
    margin: 0 auto;
    margin-top: 73px;
    position:relative;
    margin-bottom:85px;
  }

  .selectTable .classPlan .classPlan_top {
    width: 100%;
    height: 9%;
    display: flex;
  }

  .selectTable .classPlan .classPlan_bottom {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .selectTable .classPlan .classPlan_topLeft {
    width: 4%;
    height: 100%;
    background: #e5e9f2;
    border: 5px solid #fff;
  }

  .selectTable .classPlan .classPlan_topRight {
    width: 100%;
    height: 100%;
  }

  .selectTable .classPlan .classPlan_bottomLeft {
    width: 5%;
    height: 85%;
  }

  .selectTable .classPlan .classPlan_bottomRight {
    width: 100%;
    height: 100%;
  }

  .selectTable .el-row {
    padding-top: 0;
    margin-bottom: 20px;
  }
  :last-child {
    margin-bottom: 0;
  }


  .selectTable .el-col {
    border-radius: 4px;
  }

  .selectTable .bg-purple-dark {
    background: #99a9bf;
  }

  .selectTable .bg-purple {
    background: #d3dce6;
  }

  .selectTable .bg-purple-light {
    background: #e5e9f2;
  }

  .selectTable .classPlan_topRight .grid-content {
    border-radius: 4px;
    min-height: 54px;
    width: 98%;
  }

  .selectTable .classPlan_topRight .weekDataP {
    background: #e5e9f2;
    width: 183px;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-top: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
  }
  .selectTable .classPlan_topRight .weekDateP {
    background: #e5e9f2;
    width: 183px;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-bottom: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
  }
  .selectTable .classDataP {
    background: #e5e9f2;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
    width: 2%;
  }
  .selectTable .classDataP2 {
    background: #e5e9f2;
    border: 5px solid #fff;
    border-bottom: 6px solid #aaa;
    border-radius: 15px;
    height: 108px;
    width: 2%;
  }
  .selectTable .eachDataP {
    background: #e5e9f2;
    width: 4%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
    position:relative;
    cursor:pointer;
  }
  .selectTable .eachDataP2 {
    background: #e5e9f2;
    width: 4%;
    border: 5px solid #fff;
    border-bottom: 6px solid #aaa;
    border-radius: 15px;
    height: 108px;
    cursor:pointer;
  }
  .selectTable .eachDataP p {
    margin-bottom: 0;
    text-align: left;
    margin-left: 6px;
    width: 100px;
  }
  .selectTable .eachDataP2 p {
    margin-bottom: 0;
    text-align: left;
    margin-left: 6px;
    width: 100px;
  }
  .selectTable .bing{
      width:160px;
      height:120px;
      background:#fff;
      border-radius:10px;
      box-shadow: 10px 9px 40px -3px;


  }
  .selectTable .bing{
    display:none;
  }
  .selectTable .eachDataP:hover .bing{
    position:absolute;
      bottom: 112px;
      right: -7%;
    display:block;
  }
  .selectTable #aa{
    display:none;
  }
  .selectTable .eachDataP:hover #aa{
    position:absolute;
      bottom: 112px;
      right: -7%;
    display:block;
  }
  .selectTable .classPlan_bottomLeft .grid-content {
    border-radius: 4px;
    min-height: 106px;
    margin-top: 3px;
    padding-top: 43px;
    box-sizing: border-box;
  }

  .selectTable .classPlan_bottomRight .grid-content {
    border-radius: 4px;
    min-height: 106px;
  }

  .selectTable .classPlan_bottomRight .el-col {
    padding: 2px;
  }
  .selectTable .el-dialog{
    width:69%;
  }
  .selectTable .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .selectTable .colorButtons{
    position:absolute;
    top: 0;
    right: 0;
  }
  .selectTable .colorButtons .el-button{
    width:20%;
    height:100%;
  }

  .selectTable #a1{
    display:none;
    width:200px;
    height:200px;
    overflow: inherit;
    background:#fff;
    z-index:9999;
  }
  .selectTable .eachDataP:hover #a1{
    position:absolute;
    top: -150px;
    right: -40px;
    display:block;
  }
  .selectTable #a2{
    display:none;
    width:200px;
    height:200px;
    overflow: inherit;
    background:#fff;
    z-index:9999;
  }
  .selectTable .eachDataP:hover #a2{
    position:absolute;
    top: -150px;
    right: -40px;
    display:block;
  }
  .selectTable #a3{
    display:none;
    width:200px;
    height:200px;
    overflow: inherit;
    background:#fff;
    z-index:9999;
  }
  .selectTable .eachDataP:hover #a3{
    position:absolute;
    top: -150px;
    right: -40px;
    display:block;
  }
  .selectTable #a4{
    display:none;
    width:200px;
    height:200px;
    overflow: inherit;
    background:#fff;
    z-index:9999;
  }
  .selectTable .eachDataP:hover #a4{
    position:absolute;
    top: -150px;
    right: -40px;
    display:block;
  }
  .selectTable .currTable{
    width:100%;
    margin:0 auto;
    padding: 10px;
    text-align: left;
  }
  .selectTable .currTable1{
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
  .selectTable .studentPng{
    width:50px;
    height:50px;
    border-radius:50%;
  }
</style>
