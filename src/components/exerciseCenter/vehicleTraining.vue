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
          <img id="tabsCenter1" class="coursepptImg" src="../../assets/imgs/vehicleTraining02.jpg">
          <canvas id="canvas">
          </canvas>
        </div>
      </el-tab-pane>

      <!--空调-->
      <el-tab-pane label="空调">
        <div class="courseImg">
          <img class="coursepptImg" src="../../assets/imgs/vehicleTraining01.jpg">
          <canvas id="canvasKT">
          </canvas>
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

    <!--工具-->
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
    <div class="multimeterTruth"
         id="multimeterTruthID"
         @mousedown="move"
         @touchmove="move"
         v-show="clickMultimeterData === 1">
      <div v-show="showJoint === 1">
        <div id="blackJoint">
          <!--<img class="blackJoint" src="../../assets/imgs/blackJoint.png">-->
        </div>
        <div id="redJoint">
          <!--<img class="redJoint" src="../../assets/imgs/redJoint.png">-->
        </div>
      </div>
      <div class="multimeterTruthDiv" id="multimeterTruthDiv">
        {{multimeterTruthDivData}}V
      </div>
      <p class="multimeterTruthV"
         @click="clickZhuan(index,item)"
         v-for="(item,index) in multimeterTruthV"
         :class="currIndex === index ? 'multimeterTruthVchoose' : '' "
         :id="multimeterTruthVId(index)">
        {{item}}
      </p>
      <div class="multimeterTruthTransform" id="multimeterTruthTransform">
        <!--<img src="../../assets/imgs/zhuan.png">-->
      </div>
    </div>
    <div class="electroprobe"
         @mousedown="move"
         @touchmove="move"
         v-show="clickMultimeterData === 1">
      <!--<div class="electroprobeBlack" id="electroprobeBlack"></div>-->
      <!--<div class="electroprobeRed" id="electroprobeRed"></div>-->
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
        multimeterTruthV:['off','V-','V~','','Ω','','','A'],
        currIndex:0,
        windowWidth: 0,
        windowHeight: 0,
        clickmultimeterTruth: 0,
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
            left: 'center',
            text: '时间',
          },
          xAxis: {
            type: 'category',
            data: []
          },
          yAxis: {
            type: 'value',
            name: '电压',
            min: 0,
            minInterval: 1
          },
          series: [{
            type: 'line',
            data: [],
            smooth: true,
            showSymbol: false,
            markLine: {
              silent: true,
            }
          }]
        },
        balls:[],
        drawPointData:[],
        drawCricleData:[],
        resData:[],
        clientHeight: 0,
        clientWidth: window.innerWidth,
        isFull: 0,
        ratioX: 0,
        ratioY: 0,
        positionX: 0,
        positionY: 0,
        multimeterTruthDivData: 0,
        XYoption:{
          preRedX:0,
          preRedY:0,
          preBlackX:0,
          preBlackY:0,
        },
        showJoint: 0,
        isRed:false,
        isBlack:false,
        mouseType:''

      }
    },
    //    自定义拖动
//    directives:{
//      drag(el){
//        el.onmousedown = function(e){
//          let elId = document.getElementById('multimeterTruthID')
//          //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
//          var divx = e.clientX - elId.offsetLeft;
//          var divy = e.clientY - elId.offsetTop;
//          //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
//          document.onmousemove = function(e){
//            //获取移动后div的位置：鼠标位置-divx/divy
//            var l = e.clientX - divx;
//            var t = e.clientY - divy;
//            elId.style.left=l+'px';
//            elId.style.top=t+'px';
//          }
//          document.onmouseup = function(e){
//            document.onmousemove = null;
//            document.onmouseup = null;
//          }
//        }
//      }
//    },
    watch: {
      XYoption:{//深度监听，可监听到对象、数组的变化
        handler(NpreBlackX, OpreBlackX){
          this.draw(NpreBlackX)
//          console.log(NpreBlackX)
        },
        deep:true
      }
    },
    computed:{
//      preBlackX(){
//        return this.preBlackX
//        this.aaa(this.preBlackX)
//      }
    },
    methods: {
      upEcharts() {
          if (this.clickGramData === 0) {
            this.echartsOption.xAxis.data = []
            this.echartsOption.series[0].data = []
            clearInterval(this.setInterval)
          } else {
            let xAxisData = this.echartsOption.xAxis.data
            let seriesData = this.echartsOption.series[0].data

            let upEcharts1 = () => {
              let myChart = echarts.init(document.getElementById('echarts'))
              let time = moment(new Date()).format('HH:mm:ss')
              /*设置x、y坐标*/
              let xAxisDataTime = moment(new Date()).format('mm:ss')
              let num = Math.floor(Math.random() * 9 + 1)
              num = Number('3.' + num)
              let num1 = parseInt(num)
              this.echartsOption.yAxis.min = num1 - 1
              let date1 = 59
              let date2 = 58
              this.multimeterTruthDivData = num
              if (xAxisData.length < date1) {
                if (xAxisData.length === 0) {
                  for (let i = 0; i < date2; i++) {
                    xAxisData.push('')
                    seriesData.push('')
                  }
                }
                xAxisData.push(xAxisDataTime)
                seriesData.push(num)
              } else if (xAxisData.length >= date1) {
                xAxisData.shift()
                xAxisData.push(xAxisDataTime)
                seriesData.shift()
                seriesData.push(num)
              }

              /*设置title*/
              this.echartsOption.title.text = time
              myChart.setOption(this.echartsOption)
            }
            upEcharts1()
            this.setInterval = setInterval(function () {
              upEcharts1()
            }, 1000)
          }

      },
//      生成电压符号ID
      multimeterTruthVId(index){
        return "multimeterTruthV" + index
      },
//      点击电压旋转
      clickZhuan(index,item){
        // console.log(index)
        // console.log(item)
        if (item == 'off') {
          this.showJoint = 0
        } else {
          this.showJoint = 1
          if (this.isFull === 0){

          }else{
            document.getElementById('blackJoint').style.top = 237*this.ratioX + 'px';
            document.getElementById('blackJoint').style.left = 93*this.ratioY + 'px';
            document.getElementById('blackJoint').style.width = 14*this.ratioX + 'px';
            document.getElementById('blackJoint').style.height = 55*this.ratioX + 'px';
            document.getElementById('redJoint').style.top = 237*this.ratioX + 'px';
            document.getElementById('redJoint').style.left = 119*this.ratioY + 'px';
            document.getElementById('redJoint').style.width = 14*this.ratioX + 'px';
            document.getElementById('redJoint').style.height = 55*this.ratioX + 'px';
          }
        }
        this.currIndex = index
        document.getElementById("multimeterTruthTransform").style.transform = "rotate(" + 23 * index + "deg)"
      },
      //      click和touch事件
      move(e){
        if (e.touches) {
//          console.log('touch事件')
          document.addEventListener("touchstart",function(e){
            console.log(e);
            let odiv = e.touches[0].target;
            var touches = e.touches[0];
            let disX = touches.clientX - odiv.offsetLeft + 34
            let disY = touches.clientY - odiv.offsetTop + 26
            document.addEventListener("touchmove",function(e) {
              var touches = e.touches[0];
              let left = touches.clientX - disX;
              let top = touches.clientY - disY;
              this.positionX = top
              this.positionY = left
              odiv.style.left = left + "px";
              odiv.style.top = top + "px";
            },false)
          },false)

        } else {
//            this.clientX = e.clientX
//            this.clientY = e.clientY
//            this.layerX = e.layerX
//            this.layerY = e.layerY
//            this.offsetX = e.offsetX
//            this.offsetY = e.offsetY
//            this.pageX = e.pageX
//            this.pageY = e.pageY

//          console.log('鼠标事件')
          var str = e.target.id.substring(0,10)
//          console.log(e)
          if (str === 'multimeter') {
            var odiv = document.getElementById('multimeterTruthID');
          } else {
            var odiv = e.target
          }
          //算出鼠标相对元素的位置
          let disX = e.clientX - odiv.offsetLeft
          let disY = e.clientY - odiv.offsetTop
          this.clientX = e.clientX
          this.clientY = e.clientY
          document.onmousemove = (e) => {       //鼠标按下并移动的事件
            //用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
            let left = e.clientX - disX
            let top = e.clientY - disY
            //绑定元素位置到positionX和positionY上面
            this.positionX = top
            this.positionY = left
            //移动当前元素
            odiv.style.left = left + 'px'
            odiv.style.top = top + 'px'
//           console.log(e)
          };
          document.onmouseup = (e) => {
            document.onmousemove = null;
            document.onmouseup = null;
          };

        }
      },
      handleClickTabs(tab){

        var index = tab.index
        if (index == 0) {
          this.stage = new createjs.Stage("canvas");
          this.stage.removeAllChildren()
          this.drawPointData = this.resData[0].mLPoint
          this.drawCricleData = this.resData[0].mLcircles
//          console.log(this.stage)
//
        } else if (index == 1) {
          this.stage = new createjs.Stage("canvasKT");
          this.stage.removeAllChildren()
          this.drawPointData = this.resData[1].KTPoint
          this.drawCricleData = this.resData[1].KTcircles
//          console.log(this.stage)
        }
//        console.log(this.drawPointData)
        createjs.Ticker._setFPS(30);
        createjs.Ticker.addEventListener("tick",this.stage);
        this.first()
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
          document.getElementById('multimeterTruthID').style.top = 60 + 'px';
          document.getElementById('multimeterTruthID').style.right = 170 + 'px';
          this.clickMultimeterData = 1
//          this.drawPen()

        } else {
          this.clickMultimeterData = 0
//          this.clearPen()
        }
        this.drawPoint()
      },
//    点击图表
      clickDatagram () {
        if (this.clickGramData === 0) {
          this.clickGramData = 1
        } else {
          this.clickGramData = 0
          this.multimeterTruthDivData = 0
        }
        this.upEcharts()
      },
//    全屏显示
      appFullScreen () {
        let elem = document.getElementById("courseppt");
        let tabsCenter = document.getElementById('tabsCenter')
        let fullScreen = document.getElementById('fullScreen')
        let tabsCenter1 = document.getElementById('tabsCenter1')
        let cen = ''
        if (this.fullScreen === false) {
          this.isFull = 1
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
            let outHeight =  document.getElementById("tabsCenter").clientHeight
            cen = (screen.height - outHeight) / 2
            console.log(screen.height)
            console.log(outHeight)
            console.log(cen)
            tabsCenter.style.marginTop = cen + 'px'
            fullScreen.style.top = cen + 'px'
          },100)
        } else if (this.fullScreen === true) {
          this.isFull = 0
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
//      detect(){
//        var _this = this
//        //鼠标点击canvas，获取的鼠标点击的位置(x,y)
//        this.canvas.onmousemove = function (e){
//          var x=e.clientX-_this.canvas.getBoundingClientRect().left;
//          var y=e.clientY-_this.canvas.getBoundingClientRect().top;
//          _this.draw(x,y);
//        }
//      },
//    画布显示balls数据
      draw(XYoptions){
//        var _this = this
        this.stage.removeAllChildren()
        if (this.isFull === 0){
          this.imageB.scaleX = 0.3
          this.imageB.scaleY = 0.3
        }else{

        }
        this.stage.addChild(this.imageB);

        if (this.isFull === 0){
          this.imageR.scaleX= 0.3
          this.imageR.scaleY= 0.3
        }else{

        }
        this.stage.addChild(this.imageR);

        for( var i = 0 ; i < this.balls.length ; i ++ ){
          var currDraw = this.balls[i]
          for(var j = 0 ; j < currDraw.length ; j ++){
            var shape=new createjs.Shape();
            var graphics=shape.graphics;
            var circle = new createjs.Shape();
            var circleRect = new createjs.Shape();
            if (i <= 2) {
              graphics.beginStroke("000");
              graphics.drawRect(currDraw[j].a[0] - 0.5, currDraw[j].a[1] - 0.5, currDraw[j].diameter, currDraw[j].diameter);
              this.stage.addChild(shape);
              circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].x,currDraw[j].y,currDraw[j].radius);
              this.stage.addChild(circle);
            } else if (i > 2 && i <= 6) {
              circleRect.graphics.beginStroke("#000").drawCircle(currDraw[j].a[0],currDraw[j].a[1],currDraw[j].radius + 1.6);
              this.stage.addChild(circleRect);
              circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].a[0],currDraw[j].a[1],currDraw[j].radius);
              this.stage.addChild(circle);
            } else {
              circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].a[0],currDraw[j].a[1],currDraw[j].radius);
              this.stage.addChild(circle);
            }
            var pianx
            if (this.isFull === 0){
              pianx = 10
            }else{
              pianx = 10 * this.ratioX
            }
//            _this.stage.enableMouseOver(20);
//            黑表笔检测
              if (circle.hitTest(XYoptions.preBlackX + pianx, XYoptions.preBlackY)) {
                this.isBlack = true
                console.log(this.isBlack)
                console.log("yeye",currDraw[j].id)
                if (i <= 2) {
                  circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].x,currDraw[j].y,4 * this.ratioX);
                }else {
                  circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].a[0],currDraw[j].a[1],4 * this.ratioX);
                }
                this.imageB.addEventListener("pressup",(e)=>{
                  this.imageB.rotation = -40
                  this.imageB.x=XYoptions.preBlackX
                  this.imageB.y=XYoptions.preBlackY+8
//                  console.log(circle.hitTest(XYoptions.preBlackX+10, XYoptions.preBlackY))
                  e.remove();
                })
              }else{
//                console.log(circle.hitTest(XYoptions.preBlackX+10, XYoptions.preBlackY))
              }


//            红表笔检测
            if (circle.hitTest(XYoptions.preRedX + pianx, XYoptions.preRedY)) {
              if (i <= 2) {
                circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].x,currDraw[j].y,4 * this.ratioX);
              }else {
                circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].a[0],currDraw[j].a[1],4 * this.ratioX);
              }
              this.imageR.addEventListener("pressup",(e) => {
                this.imageR.rotation = -40
                this.imageR.x=XYoptions.preRedX
                this.imageR.y=XYoptions.preRedY+8
                e.remove();
              })
              console.log("yeye",currDraw[j].id)
              this.isRed = true
            } else {
            }

          }
        }
        if(this.isBlack && this.isRed){
          this.multimeterTruthDivData = 560
        }else{
          this.multimeterTruthDivData = 0
        }
        this.stage.setChildIndex(this.imageB, this.stage._getNumChildren() - 1);
        this.stage.setChildIndex(this.imageR, this.stage._getNumChildren() - 1);
      },
//    计算完的数据给balls
      first() {
        this.cleanStage()
        for(var i = 0; i < this.drawCricleData.length; i++){
          var currArrayCircles = this.drawCricleData[i]
          var currPoint = this.drawPointData[i]
          var drawOne = []
          for(var j = 0; j < currArrayCircles.length; j++){
            var radius = 2.4
            this.aBall={
              radius:radius,
              diameter:radius * 3,
              x:currArrayCircles[j].x * 10.1 + currPoint[0] + (radius * 3) / 2 - 0.5,
              y:currArrayCircles[j].y * 10.1 + currPoint[1] + (radius * 3) / 2 - 0.5,
              a:[currArrayCircles[j].x * 10.1 + currPoint[0],currArrayCircles[j].y * 10.1 + currPoint[1]],
              color:currArrayCircles[j].color,
              id:currArrayCircles[j].id
            }
            drawOne.push(this.aBall);
//            console.log('drawOne',drawOne)
          }
          this.balls.push(drawOne);
//          console.log(this.balls)
        }
        this.drawPoint()
      },
      drawPoint(){
        this.stage.removeAllChildren()
        for( var i = 0 ; i < this.balls.length ; i ++ ){
          var currDraw = this.balls[i]
          for(var j = 0 ; j < currDraw.length ; j ++){
            var shape=new createjs.Shape();
            var graphics=shape.graphics;
            var circle = new createjs.Shape();
            var circleRect = new createjs.Shape();
            if (i <= 2) {
              graphics.beginStroke("000");
              graphics.drawRect(currDraw[j].a[0] - 0.5, currDraw[j].a[1] - 0.5, currDraw[j].diameter, currDraw[j].diameter);
              this.stage.addChild(shape);
              circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].x,currDraw[j].y,currDraw[j].radius);
              this.stage.addChild(circle);
            } else if (i > 2 && i <= 6) {
              circleRect.graphics.beginStroke("#000").drawCircle(currDraw[j].a[0],currDraw[j].a[1],currDraw[j].radius + 1.6);
              this.stage.addChild(circleRect);
              circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].a[0],currDraw[j].a[1],currDraw[j].radius);
              this.stage.addChild(circle);
            } else {
              circle.graphics.beginFill(currDraw[j].color).drawCircle(currDraw[j].a[0],currDraw[j].a[1],currDraw[j].radius);
              this.stage.addChild(circle);
            }
          }
        }

        this.stage.setChildIndex(this.imageB, this.stage._getNumChildren() - 1);
        this.stage.setChildIndex(this.imageR, this.stage._getNumChildren() - 1);
        if (this.clickMultimeterData === 1) {
          this.imageB.rotation = 0
          this.imageR.rotation = 0
          this.imageB.x = 850
          this.imageB.y = 70
          if (this.isFull === 0){
            this.imageB.scaleX = 0.3
            this.imageB.scaleY = 0.3
          }else{
            this.imageB.scaleX = 0.3 * this.ratioX
            this.imageB.scaleY = 0.3 * this.ratioY
          }

          this.stage.addChild(this.imageB);
          console.log(this.imageB)
          var oldX;
          var oldY;
          this.imageB.addEventListener("mousedown", (e) =>  {
            oldX = e.stageX;
            oldY = e.stageY;
            this.imageB.rotation = 0
            this.isBlack = false
          });
          this.imageB.addEventListener("pressmove", (e) =>  {
            e.target.x += e.stageX - oldX;
            e.target.y += e.stageY - oldY;
            oldX = e.stageX;
            oldY = e.stageY;
            this.XYoption.preBlackX = e.target.x
            this.XYoption.preBlackY = e.target.y
          });

          this.imageR.x = 900
          this.imageR.y = 70
          if (this.isFull === 0){
            this.imageR.scaleX= 0.3
            this.imageR.scaleY= 0.3
          }else{
            this.imageR.scaleX = 0.3 * this.ratioX
            this.imageR.scaleY = 0.3 * this.ratioY
          }
          this.imageR.width = 25
          this.imageR.height = 180
          this.stage.addChild(this.imageR);
//        stage.update();
          var oldX;
          var oldY;
          this.imageR.addEventListener("mousedown",(e)=>{
            oldX= e.stageX;
            oldY= e.stageY;
            this.imageR.rotation = 0
            this.isRed = false
//            _this.imageR.x=XYoptions.preRedX
//            _this.imageR.y=XYoptions.preRedY
          });
          this.imageR.addEventListener("pressmove",  (e)=> {
            e.target.x+= e.stageX-oldX;
            e.target.y+= e.stageY-oldY;
            oldX= e.stageX;
            oldY= e.stageY;
            this.XYoption.preRedX = e.target.x
            this.XYoption.preRedY = e.target.y
          });
        } else {
          this.stage.removeChild(this.imageR,this.imageB);
        }
      },
      cleanStage(){
        this.balls = []
      },
//    监听canvas宽高
      handleResize (event) {
        this.clientWidth = document.getElementById("tabsCenter1").offsetWidth
        this.clientHeight = document.getElementById("tabsCenter1").clientHeight
        this.canvas.width = this.clientWidth
        this.canvas.height = this.clientHeight
        this.ratioX = this.clientWidth / 1024
        this.ratioY = this.clientHeight / 577
        if (this.drawCricleData.length) {
          for(var i = 0; i < this.drawCricleData.length; i++){
            var currArrayCircles = this.drawCricleData[i]
            var currPoint = this.drawPointData[i]
            var drawOne = []
            if (this.isFull === 0){
              //          缩小
              for(var j = 0; j < currArrayCircles.length; j++){
                if(currArrayCircles.length){
//                  console.log(currArrayCircles.length)
                  var radius = 2.4 * (1 / this.ratioX)
                  this.aBall={
                    radius:radius,
                    diameter:radius * 3,
                    x:(currArrayCircles[j].x * 10.1 + currPoint[0] +  radius*this.ratioX+0.5) * (1 / this.ratioX),
                    y:(currArrayCircles[j].y * 10.1 + currPoint[1] +  radius*this.ratioX+0.5) * (1 / this.ratioY),
                    a:[(currArrayCircles[j].x * 10.1 + currPoint[0]) * (1 / this.ratioX), (currArrayCircles[j].y * 10.1 + currPoint[1]) * (1 / this.ratioY)],
                    color:currArrayCircles[j].color
                  }
                  drawOne.push(this.aBall);
                }
              }
              document.getElementById('multimeterTruthID').style.width = 220 + 'px';
              document.getElementById('multimeterTruthID').style.height = 300 + 'px';
              document.getElementById('multimeterTruthDiv').style.top = 50 + 'px';
              document.getElementById('multimeterTruthDiv').style.right = 64 + 'px';
              document.getElementById('multimeterTruthTransform').style.top = 146 + 'px';
              document.getElementById('multimeterTruthTransform').style.right = 66 + 'px';
              document.getElementById('multimeterTruthV0').style.top = 180 + 'px';
              document.getElementById('multimeterTruthV0').style.left = 64 + 'px';
              document.getElementById('multimeterTruthV1').style.top = 165 + 'px';
              document.getElementById('multimeterTruthV1').style.left = 72 + 'px';
              document.getElementById('multimeterTruthV2').style.top = 151 + 'px';
              document.getElementById('multimeterTruthV2').style.left = 75 + 'px';
              document.getElementById('multimeterTruthV3').style.top = 142 + 'px';
              document.getElementById('multimeterTruthV3').style.left = 89 + 'px';
              document.getElementById('multimeterTruthV4').style.top = 138 + 'px';
              document.getElementById('multimeterTruthV4').style.left = 108 + 'px';
              document.getElementById('multimeterTruthV5').style.top = 142 + 'px';
              document.getElementById('multimeterTruthV5').style.left = 122 + 'px';
              document.getElementById('multimeterTruthV6').style.top = 151 + 'px';
              document.getElementById('multimeterTruthV6').style.left = 137 + 'px';
              document.getElementById('multimeterTruthV7').style.top = 165 + 'px';
              document.getElementById('multimeterTruthV7').style.left = 147 + 'px';
//              document.getElementById('multimeterTruthV8').style.top = 180 + 'px';
//              document.getElementById('multimeterTruthV8').style.left = 147 + 'px';
//              document.getElementById('echarts').style.width = 340 + 'px';
//              document.getElementById('echarts').style.height = 180 + 'px';
              if(this.showJoint === 1){
                document.getElementById('blackJoint').style.top = 237 + 'px';
                document.getElementById('blackJoint').style.left = 93 + 'px';
                document.getElementById('blackJoint').style.width = 14 + 'px';
                document.getElementById('blackJoint').style.height = 55 + 'px';
                document.getElementById('redJoint').style.width = 14 + 'px';
                document.getElementById('redJoint').style.top = 237 + 'px';
                document.getElementById('redJoint').style.left = 119 + 'px';
                document.getElementById('redJoint').style.height = 55 + 'px';
              }else{

              }
            } else {
              //          放大
              for(var j = 0; j < currArrayCircles.length; j++){
                if(currArrayCircles.length){
//                  console.log(currArrayCircles.length)
                  var radius = 2.4 * (this.ratioX)
                  this.aBall={
                    radius:radius,
                    diameter:radius * 3,
                    x:(currArrayCircles[j].x * 10.1 + currPoint[0] + radius/this.ratioX+1 ) * (this.ratioX),
                    y:(currArrayCircles[j].y * 10.1 + currPoint[1] + radius/this.ratioX+1) * (this.ratioY),
                    a:[(currArrayCircles[j].x * 10.1 + currPoint[0]) * (this.ratioX), (currArrayCircles[j].y * 10.1 + currPoint[1]) * (this.ratioY)],
                    color:currArrayCircles[j].color
                  }
                  drawOne.push(this.aBall);
//            console.log('22',this.aBall)
                }
              }
              document.getElementById('multimeterTruthID').style.width = 220*this.ratioX + 'px';
              document.getElementById('multimeterTruthID').style.height = 300*this.ratioY + 'px';
              document.getElementById('multimeterTruthDiv').style.top = 50*this.ratioX + 'px';
              document.getElementById('multimeterTruthDiv').style.right = 64*this.ratioY + 'px';
              document.getElementById('multimeterTruthTransform').style.top = 146*this.ratioX + 'px';
              document.getElementById('multimeterTruthTransform').style.right = 66*this.ratioY + 'px';
              document.getElementById('multimeterTruthV0').style.top = 180*this.ratioX + 'px';
              document.getElementById('multimeterTruthV0').style.left = 64*this.ratioY + 'px';
              document.getElementById('multimeterTruthV1').style.top = 165*this.ratioX + 'px';
              document.getElementById('multimeterTruthV1').style.left = 72*this.ratioY + 'px';
              document.getElementById('multimeterTruthV2').style.top = 151*this.ratioX + 'px';
              document.getElementById('multimeterTruthV2').style.left = 75*this.ratioY + 'px';
              document.getElementById('multimeterTruthV3').style.top = 142*this.ratioX + 'px';
              document.getElementById('multimeterTruthV3').style.left = 89*this.ratioY + 'px';
              document.getElementById('multimeterTruthV4').style.top = 138*this.ratioX + 'px';
              document.getElementById('multimeterTruthV4').style.left = 108*this.ratioY + 'px';
              document.getElementById('multimeterTruthV5').style.top = 142*this.ratioX + 'px';
              document.getElementById('multimeterTruthV5').style.left = 122*this.ratioY + 'px';
              document.getElementById('multimeterTruthV6').style.top = 151*this.ratioX + 'px';
              document.getElementById('multimeterTruthV6').style.left = 137*this.ratioY + 'px';
              document.getElementById('multimeterTruthV7').style.top = 165*this.ratioX + 'px';
              document.getElementById('multimeterTruthV7').style.left = 147*this.ratioY + 'px';
//              document.getElementById('multimeterTruthV8').style.top = 180*this.ratioX + 'px';
//              document.getElementById('multimeterTruthV8').style.left = 147*this.ratioY + 'px';
//              document.getElementById('echarts').style.width = 340*this.ratioX + 'px';
//              document.getElementById('echarts').style.height = 180*this.ratioY + 'px';
//              document.getElementById('echartsB').style.width = 370*this.ratioX + 'px';
//              document.getElementById('echartsB').style.height = 180*this.ratioY + 'px';
              if(this.showJoint === 1){
                document.getElementById('blackJoint').style.top = 237*this.ratioX + 'px';
                document.getElementById('blackJoint').style.left = 93*this.ratioY + 'px';
                document.getElementById('blackJoint').style.width = 14*this.ratioX + 'px';
                document.getElementById('blackJoint').style.height = 55*this.ratioX + 'px';
                document.getElementById('redJoint').style.top = 237*this.ratioX + 'px';
                document.getElementById('redJoint').style.left = 119*this.ratioY + 'px';
                document.getElementById('redJoint').style.width = 14*this.ratioX + 'px';
                document.getElementById('redJoint').style.height = 55*this.ratioX + 'px';
              }else{

              }

            }
            this.balls[i] = drawOne;
          }
        }

        this.drawPoint()
      },
      getOriginData(){
        axios({
          method: 'post',
          url: '/trainManager/getCanvasTerminal',
          data: {
            username: 111
          }
        }).then((res)=>{
          console.log(res.data.result)
          this.resData = res.data.result
          console.log(this.resData[0].mLPoint)
          this.drawPointData = this.resData[0].mLPoint
          this.drawCricleData = this.resData[0].mLcircles
          this.first()
        })
      }
    },
    mounted(){
      this.getOriginData()
      this.windowWidth = this.clientWidth
      this.windowHeight = window.innerHeight

      var canvas = document.getElementById("canvas");
      this.canvas = canvas
      this.ctx = this.canvas.getContext("2d")
      var canvasKT = document.getElementById("canvasKT");
      this.canvasKT = canvasKT
      this.context = this.canvasKT.getContext("2d")
      this.stage = new createjs.Stage("canvas");
      createjs.Touch.enable(this.stage);
      createjs.Ticker._setFPS(30);
      createjs.Ticker.addEventListener("tick",this.stage);
      this.imageR=new createjs.Bitmap("src/assets/imgs/red.png");
      this.imageB=new createjs.Bitmap("src/assets/imgs/black.png");
//      this.stageKT = new createjs.Stage("canvasKT");
//      createjs.Touch.enable(this.stageKT);
//      createjs.Ticker.addEventListener("tick",this.stageKT);

//      canvas.addEventListener("mousemove",this.detect())
//      this.clientWidth = this.clientWidth * 0.65
//      this.clientHeight = this.clientWidth / 1.85
      this.clientWidth = 1024
      this.clientHeight = 577
      this.ratioX = this.clientWidth / 1024
      this.ratioY = this.clientHeight / 577

      canvas.width = this.clientWidth
      canvas.height = this.clientHeight
      canvasKT.width = this.clientWidth
      canvasKT.height = this.clientHeight

      window.addEventListener('resize', this.handleResize)
    },
    components:{}
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
  .vehicleTraining #canvasKT{
    position:absolute;
    top:0;
    left:0;
  }
  #echarts {
    width: 640px;
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
    width:220px;
    height:300px;
    position: absolute;
    top:50px;
    right:50px;
    background: url(../../assets/imgs/multimeter.png) no-repeat;
    background-size: cover;
    /*pointer-events: none;*/
  }
  .vehicleTraining .multimeterTruth #blackJoint{
    width: 14px;
    height: 55px;
    position: absolute;
    top: 237px;
    left: 93px;
    background: url(../../assets/imgs/blackJoint.png) no-repeat;
    background-size: 100% 100%;
  }
  .vehicleTraining .multimeterTruth #redJoint{
    width: 14px;
    height: 55px;
    position: absolute;
    top: 237px;
    left: 119px;
    background: url(../../assets/imgs/redJoint.png) no-repeat;
    background-size: 100% 100%;
  }
  /*.vehicleTraining .multimeterTruth #blackJoint img{*/
    /*width:100%;*/
  /*}*/
  /*.vehicleTraining .multimeterTruth #redJoint img{*/
    /*width:100%;*/
  /*}*/
  .vehicleTraining .multimeterTruth .multimeterTruthV{
    position: absolute;
    color: #fff;
    font-size: 12px;
    z-index:99;
    cursor: pointer;
  }
  .vehicleTraining .multimeterTruth .multimeterTruthVchoose{
    color: #f00;
    font-weight: bolder;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV0{
    top: 180px;
    left: 64px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV1{
    top: 165px;
    left: 72px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV2{
    top: 151px;
    left: 75px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV3{
    top: 142px;
    left: 89px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV4{
    top: 138px;
    left: 108px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV5{
    top: 142px;
    left: 122px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV6{
    top: 151px;
    left: 137px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV7{
    top: 165px;
    left: 147px;
  }
  .vehicleTraining .multimeterTruth #multimeterTruthV8{
    top: 180px;
    left: 147px;
  }
  .vehicleTraining .multimeterTruth .multimeterTruthDiv{
    width: 39.5%;
    height: 14%;
    background: #a3afa1;
    position: absolute;
    top: 50px;
    right: 64px;
    text-align: right;
    box-sizing: border-box;
    padding-top: 10%;
    padding-right: 1%;
  }
  .vehicleTraining .multimeterTruth .multimeterTruthTransform{
    width: 37.5%;
    height: 27%;
    position: absolute;
    top: 146px;
    right: 66px;
    background: url(../../assets/imgs/zhuan.png) no-repeat;
    background-size: cover;
  }
  .vehicleTraining .electroprobeBlack{
    width: 25px;
    height: 180px;
    position: absolute;
    bottom: 28px;
    right: 165px;
    background: url(../../assets/imgs/black.png) no-repeat;
    background-size: cover;
    /*pointer-events: none;*/
    /*z-index: 1;*/
  }
  .vehicleTraining .electroprobeRed{
    width: 25px;
    height: 180px;
    position: absolute;
    bottom: 25px;
    right: 66px;
    background: url(../../assets/imgs/red.png) no-repeat;
    background-size: cover;
    /*pointer-events: none;*/
    /*z-index: 1;*/
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
