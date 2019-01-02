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
          <img id="tabsCenter1" class="coursepptImg" src="../../assets/imgs/vehicleTraining2.jpg">
          <canvas id="canvas">
          </canvas>
        </div>
      </el-tab-pane>

      <!--空调-->
      <el-tab-pane label="空调">
        <div class="courseImg">
          <img class="coursepptImg" src="../../assets/imgs/vehicleTraining1.jpg">
        </div>
      </el-tab-pane>



      <!--波动图-->
      <div class="datagramTruth">
        <transition enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
          <div class="echartsB" v-show="whichGramShow === 1 || clickGramData === 1">
            <div id="echarts">

            </div>

          </div>
        </transition>
      </div>
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
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import echarts from 'echarts/dist/echarts.common.min'
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
        fullScreen: false,
        setInterval: '',
        echartsOption: {
          title: {
            left: 'left',
            text: '时间',
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            type: 'line',
            data: []
          }]
        },
        balls:[],
        circles:[
          {x:365.4,y:294.8,color:'red'},
          {x:375.4,y:294.8,color:'black'},
          {x:375.4,y:304.8,color:'red'}
        ],
        clientHeight: '',
        clientWidth: window.innerWidth
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
    watch: {
      whichGramShow: function (whichGramShow) {
        let that = this
        let xAxisData = that.echartsOption.xAxis.data
        let seriesData = that.echartsOption.series[0].data
        function upEcharts() {
          let myChart = echarts.init(document.getElementById('echarts'))
          let time = moment(new Date()).format('HH:mm:ss')
          /*设置x、y坐标*/
          let xAxisDataTime = moment(new Date()).format('mm:ss')
          let num = Math.floor(Math.random() * 10 + 1)
          if (xAxisData.length < 59) {
            xAxisData.push(xAxisDataTime)
            seriesData.push(num)
          }
          if (xAxisData.length >= 59) {
            xAxisData.shift()
            xAxisData.push(xAxisDataTime)
            seriesData.shift()
            seriesData.push(num)
          }
          /*设置title*/
          that.echartsOption.title.text = time
          myChart.setOption(that.echartsOption)
          if (whichGramShow === '') {
            clearInterval(that.setInterval);
          }
        }
        upEcharts()
        if (whichGramShow === 1) {
          that.setInterval = setInterval(function () {
            upEcharts()
          }, 1000)
        }
        /*
         xAxisData = []
         seriesData = []
         that.echartsOption.xAxis.data = []
         that.echartsOption.series[0].data = []
        */
      }
    },
    methods: {
      upEcharts () {
      },
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
        let elem = document.getElementById("courseppt");
        let tabsCenter = document.getElementById('tabsCenter')
        let fullScreen = document.getElementById('fullScreen')
        let tabsCenter1 = document.getElementById('tabsCenter1')
        let cen = ''
        if (this.fullScreen === false) {
          for(var i = 0; i < this.circles.length; i++){
            var radius = 3.5
            this.aBall={
              radius:radius,
              x:this.circles[i].x * this.clientWidth / 1024,
              y:this.circles[i].y * this.clientHeight / 577,
//          x:this.circles[i].x * this.clientWidth,
//          y:this.circles[i].y * this.clientHeight,
              color:this.circles[i].color
            }
            this.balls[i]=this.aBall;
            console.log('22',this.aBall)
          }
          var rfs = elem.requestFullScreen || elem.webkitRequestFullScreen ||
            elem.mozRequestFullScreen || elem.msRequestFullScreen;
          if (typeof rfs != "undefined" && rfs) {
            rfs.call(elem);
          } else if (typeof window.ActiveXObject != "undefined") {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
              wscript.SendKeys("{F11}");
            }
          }
          this.fullScreen = true
          setTimeout(function () {
            let outHeight =  parseInt(window.getComputedStyle(tabsCenter).height)
            cen = (screen.height - outHeight) / 2
            tabsCenter.style.marginTop = cen + 'px'
            fullScreen.style.top = cen + 'px'
          },100)
        } else if (this.fullScreen === true) {
          for(var i = 0; i < this.circles.length; i++){
            var radius = 2.8
            this.aBall={
              radius:radius,
              x:this.circles[i].x * 1024 / this.clientWidth,
              y:this.circles[i].y * 577 / this.clientHeight,
//          x:this.circles[i].x * this.clientWidth,
//          y:this.circles[i].y * this.clientHeight,
              color:this.circles[i].color
            }
            this.balls[i]=this.aBall;
            console.log('33',this.aBall)
          }
//          console.log(window.ActiveXObject)
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
          setTimeout(function () {
            tabsCenter.style.marginTop = 0 + 'px'
            fullScreen.style.top = 0 + 'px'
          }, 100)
        }
      },
//    监听鼠标位置
      detect(){
        var _this = this
        //鼠标点击canvas，获取的鼠标点击的位置(x,y)
        this.canvas.onmousemove = function (e){
          var x=e.clientX-_this.canvas.getBoundingClientRect().left;
          var y=e.clientY-_this.canvas.getBoundingClientRect().top;
          _this.draw(x,y);
        }
      },
//    画布显示balls数据
      draw(x,y){
//      console.log(x)
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        for( var i = 0 ; i < this.balls.length ; i ++ ){
          this.ctx.beginPath();
          this.ctx.arc(this.balls[i].x,this.balls[i].y,this.balls[i].radius,0,2*Math.PI);
          if(this.ctx.isPointInPath(x,y)){//isPointInPath() 方法返回 true，如果指定的点位于当前路径中；否则返回 false。
            console.log('yes',this.balls[i].x,this.balls[i].y)
//          this.ctx.clearRect(0, 0, 100, 100);
            this.ctx.arc(this.balls[i].x,this.balls[i].y,this.balls[i].radius+2,0,2*Math.PI)
          }else{
//          console.log('bai')
          }
          this.ctx.fillStyle=this.balls[i].color
//        this.ctx.closePath()
          this.ctx.fill();
        }
      },
//    计算完的数据给balls
      first() {
//      console.log(this.circles)
//      console.log(this.circles[0].x)
        for(var i = 0; i < this.circles.length; i++){
          var radius = 2.8
          this.aBall={
            radius:radius,
            x:this.circles[i].x,
            y:this.circles[i].y,
//          x:this.circles[i].x * this.clientWidth,
//          y:this.circles[i].y * this.clientHeight,
            color:this.circles[i].color
          }
//        console.log('this.circles[i].x',this.circles[i].x)
//        console.log('clientWidth',this.clientWidth)
//        console.log('this.circles[i].y',this.circles[i].y)
//        console.log('clientHeight',this.clientHeight)
          console.log('11',this.aBall)
          this.balls[i]=this.aBall;
        }
      },
//    监听canvas宽高
      handleResize (event) {
        this.clientWidth = document.getElementById("tabsCenter1").offsetWidth
        this.clientHeight = document.getElementById("tabsCenter1").clientHeight
        this.canvas.width = this.clientWidth
        this.canvas.height = this.clientHeight
      }
    },
    mounted(){
      var canvas = document.getElementById("canvas");
      this.canvas = canvas
      this.ctx = this.canvas.getContext("2d")
      canvas.addEventListener("mousemove",this.detect())
      this.clientWidth = this.clientWidth * 0.65
      this.clientHeight = this.clientWidth / 1.85
//    console.log(this.clientWidth)
//    console.log(this.clientHeight)
      canvas.width = this.clientWidth
      canvas.height = this.clientHeight
      this.first()
      window.addEventListener('resize', this.handleResize)
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
    width:1024px;
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
  .vehicleTraining .echartsB {
    width: 370px;
    height: 180px;
    background-color: #fff;
  }
  .vehicleTraining #canvas{
    position:absolute;
    top:0;
    left:0;
  }
  #echarts {
    width: 340px;
    height: 180px;
    border: 1px solid #000;
    background-color: #fff;
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
