<template>
  <div class="selectTable">
    <div class="colorButtons">
      <el-button size="mini" type="success">出勤</el-button>
      <el-button size="mini" type="danger">缺勤</el-button>
      <el-button size="mini" type="warning">迟到</el-button>
      <el-button size="mini" type="primary">请假</el-button>
    </div>
    <el-button type="primary" @click="previous()" class="pageButton" icon="el-icon-d-arrow-left"></el-button>
    <div class="classPlan">
      <div class="classPlan_top">
        <!--<div class="classPlan_topLeft"></div>-->
        <!--<div class="classPlan_topLeft" v-show = "course"></div>-->
        <div class="classPlan_topRight">
            <ul>
              <li v-for="(item,index) in weekData" :key="index" class="weekDataP">{{item}}</li>
            </ul>
            <ul>
              <li rowspan="2" v-for="(itemW,indexW) in weekDate" :key="indexW" class="weekDateP">{{itemW}}</li>
            </ul>
            <ul>
              <!--<li class="classDataP" v-show = "course">1</li>-->
              <li @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse" :style="{color:item3.color}">
                <div class="topdiv" v-show="item3.teacher !== ''">
                  <div @mouseenter="mouseenter(item3, index3)">
                    <div>{{item3.startTime}}~{{item3.endTime}}</div>
                    <div>{{item3.teacher}}</div>
                    <div>{{item3.courseName}}</div>
                    <div>{{item3.courseAddress}}</div>
                    <div class="bing" v-show="item3.teacher == $store.state.username">
                      <p>总人数：{{peopleData}}</p>
                      <p>出勤：{{hereData}}</p>
                      <p>请假：{{sickData}}</p>
                      <p>迟到：{{lateData}}</p>
                      <p>缺勤：{{dispearData}}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul>
              <!--<li class="classDataP" v-show = "course">2</li>-->
              <li @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse2" :style="{color:item3.color}">
                <div class="topdiv" v-show="item3.teacher !== ''">
                  <div @mouseenter="mouseenter(item3, index3)">
                    <div>{{item3.startTime}}~{{item3.endTime}}</div>
                    <div>{{item3.teacher}}</div>
                    <div>{{item3.courseName}}</div>
                    <div>{{item3.courseAddress}}</div>
                    <div class="bing" v-show="item3.teacher == $store.state.username">
                      <p>总人数：{{peopleData}}</p>
                      <p>出勤：{{hereData}}</p>
                      <p>请假：{{sickData}}</p>
                      <p>迟到：{{lateData}}</p>
                      <p>缺勤：{{dispearData}}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul>
              <!--<li class="classDataP" v-show = "course">3</li>-->
              <li @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse3" :style="{color:item3.color}">
                <div class="topdiv" v-show="item3.teacher !== ''">
                  <div @mouseenter="mouseenter(item3, index3)">
                    <div>{{item3.startTime}}~{{item3.endTime}}</div>
                    <div>{{item3.teacher}}</div>
                    <div>{{item3.courseName}}</div>
                    <div>{{item3.courseAddress}}</div>
                    <div class="bing" v-show="item3.teacher == $store.state.username">
                      <p>总人数：{{peopleData}}</p>
                      <p>出勤：{{hereData}}</p>
                      <p>请假：{{sickData}}</p>
                      <p>迟到：{{lateData}}</p>
                      <p>缺勤：{{dispearData}}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul>
              <!--<li class="classDataP" v-show = "course">4</li>-->
              <li @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse4" :style="{color:item3.color}">
                <div class="topdiv" v-show="item3.teacher !== ''">
                  <div @mouseenter="mouseenter(item3, index3)">
                    <div>{{item3.startTime}}~{{item3.endTime}}</div>
                    <div>{{item3.teacher}}</div>
                    <div>{{item3.courseName}}</div>
                    <div>{{item3.courseAddress}}</div>
                    <div class="bing" v-show="item3.teacher == $store.state.username">
                      <p>总人数：{{peopleData}}</p>
                      <p>出勤：{{hereData}}</p>
                      <p>请假：{{sickData}}</p>
                      <p>迟到：{{lateData}}</p>
                      <p>缺勤：{{dispearData}}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <ul>
              <!--<li class="classDataP" v-show = "course">5</li>-->
              <li @click="openDialog(item3, index3)" class="eachDataP" v-for="(item3,index3) in course.newCourse5" :style="{color:item3.color}">
                <div class="topdiv" v-show="item3.teacher !== ''">
                  <div @mouseenter="mouseenter(item3, index3)">
                    <div>{{item3.startTime}}~{{item3.endTime}}</div>
                    <div>{{item3.teacher}}</div>
                    <div>{{item3.courseName}}</div>
                    <div>{{item3.courseAddress}}</div>
                    <div class="bing" v-show="item3.teacher == $store.state.username">
                      <p>总人数：{{peopleData}}</p>
                      <p>出勤：{{hereData}}</p>
                      <p>请假：{{sickData}}</p>
                      <p>迟到：{{lateData}}</p>
                      <p>缺勤：{{dispearData}}</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
        </div>
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
    <el-button type="primary" @click="next()" class="pageButton" icon="el-icon-d-arrow-right"></el-button>
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
        a1Echarts:{
          backgroundColor: '#fff',
          series : [
              {
                  type: 'pie',
                  radius: '50%',
                  data:[
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(103,194,58)'
                      }
                    },
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(245,108,108)'
                      }
                    },
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(230,162,60)'
                      }
                    },
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(0,122,204)'
                      }
                    },
                  ],
            }
          ]
        },
        a2Echarts:{
          backgroundColor: '#fff',
          series : [
              {
                  type: 'pie',
                  radius: '50%',
                  data:[
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(103,194,58)'
                      }
                    },
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(245,108,108)'
                      }
                    },
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(230,162,60)'
                      }
                    },
                    {
                      value:0,
                      name:'',
                      itemStyle: {
                          color: 'rgb(0,122,204)'
                      }
                    },
                  ],
            }
          ]
        },
        a3Echarts:{
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
            }
          ]
        },
        a4Echarts:{
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
        hereData:0,
        sickData:0,
        lateData:0,
        dispearData:0,

      }
    },
    computed: {
      peopleData(){
        return this.hereData + this.sickData + this.lateData + this.dispearData
      }

    },
    mounted() {
      let newDate = moment().format("YYYY-MM-DD");
      this.modDate = newDate;
      console.log(this.modDate);
      //获取课程框的高

      //获取饼
//      this.getPie();

    },
    methods: {

      //重置数据

      //点击上一个
      previous(){
        this.course = '';
        console.log(this.modDate);
        let res = core.getYestoday(this.modDate);
        console.log(res);
        this.getCourseTable(res);

      },
      //点击下一个
      next(){
        this.course = '';
        console.log(this.modDate);
        let res = core.getTomorrow(this.modDate);
        console.log(res);
        this.getCourseTable(res);
      },
      //显示考勤信息弹窗
      openDialog(item, index){
        this.stateList = [];

        axios.post('/teacherCMS/getTimeSheet', {
          data: {
            courseName: item.courseName,
            courseDate: this.weekDate[index],
            teacher: item.teacher,
            className: this.classGrade,
            startTime: item.startTime,
          }
        }).then((res) => {
          console.log(res.data.result);
          let resData = res.data.result;
          if (res.data.code === 0) {
            this.dialogTableVisible = true;
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
              } else if (resData.stateList[i].state === 4) {
                resData.stateList[i].state = '#909399';
              }
            }
            // console.log(resData.stateList);
            this.stateList = resData.stateList;
          }else{
            this.dialogTableVisible = false;
          }
        });
      },
      //鼠标经过时获取数据
      mouseenter(item, index){
        axios.post('/teacherCMS/getTimeSheet', {
          data: {
            courseName: item.courseName,
            courseDate: this.weekDate[index],
            teacher: item.teacher,
            className: this.classGrade,
            startTime: item.startTime,
          }
        }).then((res) => {
//          console.log(res.data.result)
          let resData = res.data.result;
          if (res.data.code === 0) {

            for (let i = 0; i < resData.stateList.length; i++) {
              if (resData.stateList[i].state === 0) {
                this.hereData += 1;
              } else if (resData.stateList[i].state === 1) {
                this.sickData += 1;
              } else if (resData.stateList[i].state === 2) {
                this.lateData += 1;
              } else if (resData.stateList[i].state === 3) {
                this.dispearData += 1;
              }
            }
            //  console.log(item);
            //  console.log(index);
//              var echarts = item.id + 'Echarts';
//              console.log(item.id)
//            if(item.id == 'a1'){
//              this.a1Echarts.series[0].data[0].value = this.hereData;
//              this.a1Echarts.series[0].data[0].name = this.hereData;
//              console.log(this.a1Echarts.series[0].data[0].value)
//              this.a1Echarts.series[0].data[1].value = this.sickData;
//              this.a1Echarts.series[0].data[1].name = this.sickData;
//              this.a1Echarts.series[0].data[2].value = this.lateData;
//              this.a1Echarts.series[0].data[2].name = this.lateData;
//              this.a1Echarts.series[0].data[3].value = this.dispearData;
//              this.a1Echarts.series[0].data[3].name = this.dispearData;
//            }else if(item.id == 'a2'){
//
//              this.a2Echarts.series[0].data[0].value = this.hereData;
//              this.a2Echarts.series[0].data[0].name = this.hereData;
//              console.log(this.a2Echarts.series[0].data[0].value)
//              this.a2Echarts.series[0].data[1].value = this.sickData;
//              this.a2Echarts.series[0].data[1].name = this.sickData;
//              this.a2Echarts.series[0].data[2].value = this.lateData;
//              this.a2Echarts.series[0].data[2].name = this.lateData;
//              this.a2Echarts.series[0].data[3].value = this.dispearData;
//              this.a2Echarts.series[0].data[3].name = this.dispearData;
//            }
          }else{

          }

        }).catch((error) => {

        });
        this.hereData = 0;
        this.sickData = 0;
        this.lateData = 0;
        this.dispearData = 0;
      },
      //获取饼
      getPie(){
        console.log(this.Echarts);
        var fun = window.setInterval(function(){
          if(echarts.init(document.getElementById('a1'))){
            let myChart = echarts.init(document.getElementById('a1'));
            //console.log(myChart)
            // 绘制图表，this.a1Echarts是数据
            myChart.setOption(this.a1Echarts);
            //console.log("11")
            let myChart2 = echarts.init(document.getElementById('a2'));
            myChart2.setOption(this.a2Echarts);
            let myChart3 = echarts.init(document.getElementById('a3'));
            myChart3.setOption(this.a3Echarts);
            let myChart4 = echarts.init(document.getElementById('a4'));
            myChart4.setOption(this.a4Echarts);
            window.clearInterval(fun);
          }else{
            console.log("nmnmmn")
          }
        }.bind(this),1000);
      },
      //获取-课程表
      getCourseTable(resDate){
          //this.getPie();
          axios.post('/teacherCMS/getCourseTable', {
            data: {
              courseDate: resDate,
              className: this.$store.state.classGrade,
            }
          }).then((res) => {
          //  console.log(res.data.result)
            let resData = res.data.result;
            if (res.data.code === 0) {
              this.modDate = resDate;
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
  ul{
    margin: 0;
    padding: 0;
  }
  .selectTable{
    display:flex;
    margin-bottom: 60px !important;
  }
  .selectTable .pageButton{
    padding: 12px;
    height: 100%;
    margin-top: 336px;
    padding-top: 50px;
    padding-bottom: 50px;
    font-size: 20px;
  }
  .selectTable .classPlan {
    width: 90%;
    height: 850px;
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

  .selectTable .classPlan .classPlan_topLeft {
    width: 2.5%;
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
    width: 14%;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-top: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
    display: inline-block;
  }
  .selectTable .classPlan_topRight .weekDateP {
    background: #e5e9f2;
    width: 14%;
    border-right: 5px solid #fff;
    border-left: 5px solid #fff;
    border-bottom: 5px solid #fff;
    border-radius: 15px;
    height: 30px;
    display: inline-block;
  }
  .selectTable .classDataP {
    background: #e5e9f2;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
    width: 2.5%;
  }

  .selectTable .eachDataP {
    position: relative;
    background: #e5e9f2;
    width: 14%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 165px;
    padding-bottom: 22px;
    display: inline-block;
    cursor:pointer;
  }

  .selectTable .eachDataP div {
    margin-bottom: 19px;
    text-align: left;
    margin-left: 6px;
    margin-top: 13px;
  }

  .selectTable .eachDataP .topdiv {
    position: absolute;
    top:-25px;
    left: 0;
  }

  .selectTable .bing{
      width:160px;
      height:165px;
      background:#fff;
      border-radius:10px;
      box-shadow: 10px 9px 40px -3px;
  }
  .selectTable .bing{
    display:none;
  }
  .selectTable .eachDataP:hover .bing{
    position:absolute;
    bottom: 125px;
    right: -15%;
    display:block;
    color:#000;
    padding:10px;
    box-sizing: border-box;
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
    width:70%;
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
