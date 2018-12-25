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
  <!--最大化-->
    <div id="fullScreen" @click="appFullScreen">
      <i class="iconfont iconfont2">&#xe630;</i>
    </div>
  <el-tabs id="tabsCenter" type="border-card" v-model="activeName" @tab-click="handleClickTabs">

    <!--高压-->
    <el-tab-pane label="高压">
      <div class="courseImg">
        <img id="tabsCenter1" class="coursepptImg" src="../../assets/imgs/vehicleTraining2.png">
      </div>
    </el-tab-pane>

    <!--空调-->
    <el-tab-pane label="空调">
      <div class="courseImg">
        <img class="coursepptImg" src="../../assets/imgs/vehicleTraining1.png">
      </div>
    </el-tab-pane>

  </el-tabs>

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
  <div class="multimeterTruth" id="multimeterTruthID" v-drag v-show="clickMultimeterData === 1">
    <!--<div class="coursepptImg"></div>-->
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
      fullScreen: false
    }
  },
  //    自定义拖动
  directives:{
    drag(el){
      el.onmousedown = function(e){
          let elId = document.getElementById('multimeterTruthID')
        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
        var divx = e.clientX - elId.offsetLeft;
        var divy = e.clientY - elId.offsetTop;
        //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
        document.onmousemove = function(e){
          //获取移动后div的位置：鼠标位置-divx/divy
          var l = e.clientX - divx;
          var t = e.clientY - divy;
          elId.style.left=l+'px';
          elId.style.top=t+'px';
        }
        document.onmouseup = function(e){
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    }
  },
  methods: {
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
        document.getElementById('multimeterTruthID').style.top=80+'px';
        document.getElementById('multimeterTruthID').style.left=77+'%';
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
        console.log(screen.width + "*" + screen.height)
      let elem = document.getElementById("courseppt");
      let tabsCenter = document.getElementById('tabsCenter')
      let tabsCenter1 = document.getElementById('tabsCenter1')
      let fullScreen = document.getElementById('fullScreen')
      if (this.fullScreen === false) {
        function launchFullscreen(element) {
          if(element.requestFullscreen) {
            element.requestFullscreen();
          } else if(element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if(element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
          } else if(element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }
        launchFullscreen(elem)
        this.fullScreen = true

        console.log(elem.style)
        let cen = (screen.height - tabsCenter1.style.height + 40) / 2
        console.log(cen)
        tabsCenter.style.marginTop = 40 + 'px'
        fullScreen.style.top = 40 + 'px'

      } else if (this.fullScreen === true) {
        function exitFullscreen() {
          if(document.exitFullscreen) {
            document.exitFullscreen();
          } else if(document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          }
        }
        exitFullscreen(elem)
        this.fullScreen = false
        tabsCenter.style.marginTop = 0 + 'px'
        fullScreen.style.top = 0 + 'px'
      }
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
  margin-top:10px;
  text-align: left;
  min-width: 960px;
  position: relative;
  overflow: hidden;
  z-index: 300;
}
.vehicleTraining .courseImg{
  height:100%;
  position:relative;
  cursor:pointer;
}
.vehicleTraining .coursepptImg{
  width:100%;
  height:100%;
  /*border: 3px solid #000;*/
}
.vehicleTraining >>> .el-tabs--border-card>.el-tabs__content{
  padding: 0;
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
  height:300px;
  position: absolute;
  top:80px;
  right:80px;
  background: url(../../assets/imgs/multimeter.png) no-repeat;
}
.vehicleTraining .datagramTruth{
  width:300px;
  position: absolute;
  bottom:15px;
  right:15px;
}
.vehicleTraining #fullScreen{
  position: absolute;
  top:0;
  right:6px;
  cursor: pointer;
  z-index: 400;
}
.vehicleTraining .iconfont2{
 font-size: 22px;
}
</style>
