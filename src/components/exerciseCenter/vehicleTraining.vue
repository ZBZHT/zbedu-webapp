<template>
<div class="vehicleTraining" id="courseppt">
  <!--<div class="tabTitle"-->
       <!--@click="changeTab(index)"-->
       <!--v-for="(item, index) in systemName">-->
    <!--{{item}}-->
  <!--</div>-->
  <!--<div class="trainingContent">-->
    <!--<div class="highPressure" v-show="currPage === 0">-->
      <!--<img src="../../assets/imgs/vehicleTraining1.png">-->
    <!--</div>-->
    <!--<div class="airConditioning" v-show="currPage === 1">-->
      <!--<img src="../../assets/imgs/vehicleTraining2.png">-->
    <!--</div>-->
  <!--</div>-->
  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClickTabs">
    <!--简介-->
    <el-tab-pane label="高压">
      <div class="courseImg">
        <img class="coursepptImg" src="../../assets/imgs/vehicleTraining2.png">
      </div>
    </el-tab-pane>

    <!--课件-->
    <el-tab-pane label="空调">
      <div class="courseImg">
        <img class="coursepptImg" src="../../assets/imgs/vehicleTraining1.png">
      </div>
    </el-tab-pane>

  </el-tabs>
  <div class="fullScreen" @click="appFullScreen">
    <i class="iconfont iconfont2">&#xe630;</i>
  </div>

  <div class="tool">
    <div class="multimeter"
         @click="clickMultimeter"
         :class="{multimeterGram:showGramData === 1 && whichShow === 0}"
         @mouseover="showGram(0)" @mouseout="disGram(0)">
      <i class="el-icon-d-arrow-left icon-left" v-show="whichGramShow === '' || whichShow === 1"></i>
      <i class="iconfont iconfont1" v-show="whichGramShow === 0">&#xe602;</i>
    </div>
    <div class="datagram"
         :class="{datagramGram:showGramData === 1 && whichShow === 1}"
         @click="clickDatagram"
         @mouseover="showGram(1)" @mouseout="disGram(1)">
      <i class="el-icon-d-arrow-left icon-left" v-show="whichGramShow === '' || whichShow === 0"></i>
      <i class="iconfont iconfont1" v-show="whichGramShow === 1">&#xe60d;</i>
    </div>
  </div>
  <div class="multimeterTruth">
    <img id="multimeterTruthID"
         class="coursepptImg"
         v-show="clickMultimeterData === 1"
         src="../../assets/imgs/multimeter.png">
  </div>
  <div class="datagramTruth">
    <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
      <img class="coursepptImg animated" v-show="whichGramShow === 1 || clickGramData === 1" src="../../assets/imgs/datagram.png">
    </transition>

  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'vehicleTraining',
  data () {
    return {
      activeName: '',
      showGramData: 0,
      whichShow: '',
      whichGramShow: '',
      clickMultimeterData: 0,
      clickGramData: 0,
      dom:''
    }
  },
  //    自定义拖动
//  directives:{
//    drag(el){
//      el.onmousedown = function(e){
//        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
//        var divx = e.clientX - document.getElementById('multimeterTruthID').offsetLeft;
//        var divy = e.clientY - document.getElementById('multimeterTruthID').offsetTop;
//        //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
//        document.onmousemove = function(e){
//          //获取移动后div的位置：鼠标位置-divx/divy
//          var l = e.clientX - divx;
//          var t = e.clientY - divy;
//          document.getElementById('multimeterTruthID').style.left=l+'px';
//          document.getElementById('multimeterTruthID').style.top=t+'px';
//        }
//        document.onmouseup = function(e){
//          document.onmousemove = null;
//          document.onmouseup = null;
//        }
//      }
//      el.mouseup = e => {
//        el.onmousemove = null
//      }
//    }
//  },
  methods: {
//    drop(ev)
//    {
//      ev.preventDefault();
//      ev.target.appendChild(this.dom)
//      console.log('drop',ev)
//      console.log('drop',this.dom)
//    },
//    allowDrop(ev)
//    {
//      ev.preventDefault();
//    },
//    drag(ev)
//    {
//      this.dom = ev.target
//      console.log(ev)
//      console.log(this.dom)
//    },
//    切换标签
    handleClickTabs(tab){

    },
//    显示图标
    showGram (index) {
      this.showGramData = 1
      this.whichShow = index
      if (index === 0) {
        this.whichGramShow = 0
      } else {
        this.whichGramShow = 1
      }
    },
//    隐藏图标
    disGram (index) {
      this.showGramData = 0
      this.whichShow = index
      this.whichGramShow = ''
    },
//  点击工具
    clickMultimeter () {
      if (this.clickMultimeterData === 0) {
//        document.getElementById('multimeterTruthID').style.top=80+'px';
//        document.getElementById('multimeterTruthID').style.left=77+'%';
        this.clickMultimeterData = 1
      } else {
        this.clickMultimeterData = 0
      }
    },
//  点击图表
    clickDatagram () {
      if (this.clickGramData === 0) {
        this.clickGramData = 1
      } else {
        this.clickGramData = 0
      }
    },
//    全屏显示
    appFullScreen () {
      var elem = document.getElementById("courseppt");
      var requestMethod = elem.requestFullScreen || elem.webkitRequestFullScreen || elem.mozRequestFullScreen || elem.msRequestFullScreen;
      if (requestMethod) {
        requestMethod.call(elem);
      } else if (typeof window.ActiveXObject !== "undefined") {
        var wscript = new ActiveXObject("WScript.Shell");
        if (wscript !== null) {
          wscript.SendKeys(122);
        }
      }
//      if (elem == document.getElementById("courseppt")) {
//        var pptHeight = document.getElementsByClassName("coursepptImg").offsetHeight;
//        var pptWidth = document.getElementsByClassName("coursepptImg").offsetWidth;
//        var innerHeight = window.innerHeight;
//        var innerWidth = window.innerWidth;
//        if(1.7 < pptWidth / pptHeight){
//          //  console.log(pptWidth / pptHeight)
//          elem.style.width = '100%';
//          elem.style.height = "auto";
//        }else if(1.7 >= pptWidth / pptHeight){
//          //  console.log(1.7)
//          var realHeight = innerHeight + 50;
//          for(var i = 0; i < document.getElementsByClassName("coursepptImg").length; i++){
//            document.getElementsByClassName("coursepptImg").style.height = realHeight + 'px';
//            document.getElementsByClassName("coursepptImg").style.width = "auto";
//          }
//        }
//      }
    }
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a {
    color: inherit;
    cursor: pointer;
}
a:hover{
    text-decoration: none;
}
.vehicleTraining{
  width:65%;
  height:auto;
  margin:0 auto;
  box-shadow: 0 0 15px 8px #ccc;
  margin-top:40px;
  text-align: left;
  min-width: 960px;
  position: relative;
  overflow: hidden;
}
.vehicleTraining .courseImg{
  height:100%;
  position:relative;
  cursor:pointer;
}
.vehicleTraining .coursepptImg{
  width:100%;
  height:100%;
}
.vehicleTraining .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #212529;
}
.vehicleTraining .el-tabs--border-card>.el-tabs__header .el-tabs__item {
  border: 3px solid #9f5355;
  padding:0 10px;
  border-top: none;
  color: #212529;
  width: 120px;
}
.vehicleTraining .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  background-color: #9f5355;
  color: #ffffff;
}
.vehicleTraining .el-tabs__item {
  padding:0 60px;
  font-size: 18px;
  line-height: 36px;
}
.vehicleTraining .el-tabs--border-card>.el-tabs__header{
  border: none;
  background-color: #ffffff;
}
.vehicleTraining .el-tabs__nav{
  float:none;
}
.e-content-tree .el-tabs--border-card{
  border: 0;
  border-top: 0px solid #9f5355;
  box-shadow: none;
  margin-left: 0;
}
.vehicleTraining .tool{
  /*width:50px;*/
  /*height:100%;*/
  /*border: 3px solid #9f5355;*/
  position: absolute;
  top:0;
  right:0;
}
.vehicleTraining .multimeter{
  width:16px;
  height:50px;
  transition: width 0.5s;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  /*border: 3px solid #9f5355;*/
  /*border-right: 0px solid #9f5355;*/
  background-color:#9f5355;
  /*margin-top:150px;*/
  /*float: right;*/
  position: absolute;
  top:150px;
  right:0;
}
.vehicleTraining .multimeterGram{
  transition: width 0.5s;
  width: 50px;
}
.vehicleTraining .datagram{
  width:16px;
  height:50px;
  transition: width 0.5s;
  cursor: pointer;
  text-align: center;
  overflow: hidden;
  /*border: 3px solid #9f5355;*/
  /*border-right: 0px solid #9f5355;*/
  background-color:#9f5355;
  /*margin-top:150px;*/
  position: absolute;
  top:300px;
  right:0;
}
.vehicleTraining .datagramGram{
  transition: width 0.5s;
  width: 50px;
}
.vehicleTraining .icon-left{
  line-height: 50px;
  color:#fff;
}
.vehicleTraining .iconfont1{
  line-height: 50px;
  color:#fff;
  font-size: 30px;
}
.vehicleTraining .multimeterTruth{
  width:150px;
  position: absolute;
  top:80px;
  right:80px;
}
.vehicleTraining .datagramTruth{
  width:300px;
  position: absolute;
  bottom:15px;
  right:15px;
}
.vehicleTraining .fullScreen{
  position: absolute;
  top:0;
  right:6px;
  cursor: pointer;
  z-index: 99;
}
.vehicleTraining .iconfont2{
 font-size: 22px;
}
</style>
