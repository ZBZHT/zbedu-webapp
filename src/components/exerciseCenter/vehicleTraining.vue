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
    <div class="multimeterTruth"
         id="multimeterTruthID"
         @mousedown="move"
         @touchmove="move"
         v-show="clickMultimeterData === 1">
      <div class="multimeterTruthDiv" id="multimeterTruthDiv">
        {{multimeterTruthDivData}}
      </div>
      <!--<p class="multimeterTruthOff" @click="clickZhuan">off</p>-->
      <!--<p class="multimeterTruthV">V</p>-->
      <!--<p class="multimeterTruthV0">V0</p>-->
      <!--<p class="multimeterTruthV1">V1</p>-->
      <!--<p class="multimeterTruthV2">V2</p>-->
      <!--<p class="multimeterTruthV3">V3</p>-->
      <!--<p class="multimeterTruthV4">V4</p>-->
      <!--<p class="multimeterTruthV5">V5</p>-->
      <!--<p class="multimeterTruthV6">V6</p>-->
      <p class="multimeterTruthV"
         @click="clickZhuan(index)"
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
      <div class="electroprobeBlack" id="electroprobeBlack"></div>
      <div class="electroprobeRed" id="electroprobeRed"></div>
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
        multimeterTruthV:['off','V','V0','V1','V2','V3','V4','V5','V6'],
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
            type: 'value'
          },
          series: [{
            type: 'line',
            data: [],
            smooth: true,
            showSymbol: false
          }]
        },
        balls:[],
//        mLcircles:[
//          {x:343.5,y:276.5,a:[340.5,273.5],b:[346.5,273.5],c:[346.5,279.5],d:[340.5,279.5],color:'#f00'},
//          {x:353.5,y:276.5,a:[350.5,273.5],b:[356.5,273.5],c:[356.5,279.5],d:[350.5,279.5],color:'black'},
//          {x:353.5,y:286.5,a:[350.5,283.5],b:[356.5,283.5],c:[356.5,289.5],d:[350.5,289.5],color:'#f00'}
//        ],
        mLPoint:[[147,292],[423,289]],
        mLcircles:[
          [
            {x:0,y:0,color:'#ec851c',id:10001,name:1},
            {x:1,y:0,color:'#ec851c'},
            {x:4,y:0,color:'#f00'},
            {x:5,y:0,color:'#ec851c'},
            {x:6,y:0,color:'#000'},
            {x:7,y:0,color:'#000'},
            {x:8,y:0,color:'#000'},
            {x:9,y:0,color:'#000'},
            {x:10,y:0,color:'#000'},
            {x:11,y:0,color:'#000'},
            {x:12,y:0,color:'#000'},
            {x:13,y:0,color:'#000'},
            {x:14,y:0,color:'#000'},
            {x:15,y:0,color:'#000'},
            {x:16,y:0,color:'#000'},
            {x:17,y:0,color:'#000'},
            {x:18,y:0,color:'#000'},
            {x:19,y:0,color:'#000'},
            {x:20,y:0,color:'#000'},
            {x:21,y:0,color:'#000'},
            {x:22,y:0,color:'#ec851c'},
            {x:0.5,y:1.5,color:'#ec851c'},
            {x:4,y:1,color:'#f00'},
            {x:5,y:1,color:'#ec851c'},
            {x:6,y:1,color:'#000'},
            {x:7,y:1,color:'#000'},
            {x:8,y:1,color:'#000'},
            {x:9,y:1,color:'#000'},
            {x:10,y:1,color:'#000'},
            {x:11,y:1,color:'#000'},
            {x:12,y:1,color:'#000'},
            {x:13,y:1,color:'#000'},
            {x:14,y:1,color:'#000'},
            {x:15,y:1,color:'#f00'},
            {x:16,y:1,color:'#f00'},
            {x:17,y:1,color:'#000'},
            {x:18,y:1,color:'#f00'},
            {x:19,y:1,color:'#f00'},
            {x:20,y:1,color:'#000'},
            {x:21,y:1,color:'#f00'},
            {x:22,y:1,color:'#000'},
            {x:4,y:2,color:'#f00'},
            {x:5,y:2,color:'#000'},
            {x:6,y:2,color:'#000'},
            {x:7,y:2,color:'#000'},
            {x:8,y:2,color:'#000'},
            {x:9,y:2,color:'#000'},
            {x:10,y:2,color:'#000'},
            {x:11,y:2,color:'#000'},
            {x:12,y:2,color:'#000'},
            {x:13,y:2,color:'#f00'},
            {x:14,y:2,color:'#000'},
            {x:15,y:2,color:'#000'},
            {x:16,y:2,color:'#000'},
            {x:17,y:2,color:'#000'},
            {x:18,y:2,color:'#000'},
            {x:19,y:2,color:'#000'},
            {x:20,y:2,color:'#000'},
            {x:21,y:2,color:'#000'},
            {x:22,y:2,color:'#000'},
            {x:0,y:3,color:'#ec851c'},
            {x:1,y:3,color:'#ec851c'},
            {x:4,y:3,color:'#f00'},
            {x:5,y:3,color:'#000'},
            {x:6,y:3,color:'#000'},
            {x:7,y:3,color:'#ec851c'},
            {x:8,y:3,color:'#000'},
            {x:9,y:3,color:'#f00'},
            {x:10,y:3,color:'#000'},
            {x:11,y:3,color:'#ec851c'},
            {x:12,y:3,color:'#000'},
            {x:13,y:3,color:'#ec851c'},
            {x:14,y:3,color:'#000'},
            {x:15,y:3,color:'#000'},
            {x:16,y:3,color:'#000'},
            {x:17,y:3,color:'#000'},
            {x:18,y:3,color:'#ec851c'},
            {x:19,y:3,color:'#ec851c'},
            {x:20,y:3,color:'#000'},
            {x:21,y:3,color:'#f00'},
            {x:22,y:3,color:'#f00'},
          ],
          [
            {x:0,y:0,color:'#ec851c',id:10001,name:1},
            {x:1,y:0,color:'#ec851c'},
            {x:2,y:0,color:'#ec851c'},
          ]
        ],
        clientHeight: 0,
        clientWidth: window.innerWidth,
        isFull: 0,
        ratioX: 0,
        ratioY: 0,
        clientX: 0,
        clientY: 0,
        layerX: 0,
        layerY: 0,
        offsetX: 0,
        offsetY: 0,
        pageX: 0,
        pageY: 0,
        positionX: 0,
        positionY: 0,
        multimeterTruthDivData:10,
        eleX:0,
        eleY:0,
        preRedX:50,
        preRedY:50,
        preBlackX:100,
        preBlackY:100
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
      whichGramShow: function (whichGramShow) {

      }
    },
    methods: {
      upEcharts () {
        let that = this
        clearInterval(that.setInterval)
        let xAxisData = that.echartsOption.xAxis.data
        let seriesData = that.echartsOption.series[0].data
        function upEcharts1() {
          let myChart = echarts.init(document.getElementById('echarts'))
          let time = moment(new Date()).format('HH:mm:ss')
          /*设置x、y坐标*/
          let xAxisDataTime = moment(new Date()).format('mm:ss')
          let num = Math.floor(Math.random() * 10 + 1)
          if (xAxisData.length < 59) {
            if (xAxisData.length === 0) {
              for (let i = 0; i < 58; i++) {
                xAxisData.push('')
                seriesData.push('')
              }
            }
            xAxisData.push(xAxisDataTime)
            seriesData.push(num)
          } else if (xAxisData.length >= 59) {
            xAxisData.shift()
            xAxisData.push(xAxisDataTime)
            seriesData.shift()
            seriesData.push(num)
          }

          /*设置title*/
          that.echartsOption.title.text = time
          myChart.setOption(that.echartsOption)
          /*if (whichGramShow === '') {
           clearInterval(that.setInterval);
           }*/
        }
        /*调用方法更新数据*/
        upEcharts1()
        that.setInterval = setInterval(function () {
          upEcharts1()
        }, 1000)
        /*
         xAxisData = []
         seriesData = []
         that.echartsOption.xAxis.data = []
         that.echartsOption.series[0].data = []
         */
      },
      clientX (clientX) {
//        console.log(this.clientX)
        this.clientX = clientX
      }
    },
    methods: {
//      生成电压符号ID
      multimeterTruthVId(index){
        return "multimeterTruthV" + index
      },
//      点击电压旋转
      clickZhuan(index){
        console.log(index)
        this.currIndex = index
        document.getElementById("multimeterTruthTransform").style.transform = "rotate(" + 22.5 * index + "deg)"
      },
      insert () {
        var _this = this
        var currEle = ''
        let img = ['imgR','imgB']
        let imgSrc = ['src/assets/imgs/red.png','src/assets/imgs/black.png']
        let imgL = [50,100]

        for(var i = 0; i < img.length; i++){
           img[i] = new Image();
           img[i].src=imgSrc[i];
          _this.ctx.drawImage(img[i],imgL[i],imgL[i],25,180);
          _this.canvas.onmousedown=function (e) {
            console.log(e)
            var x0,y0
            x0 = e.clientX-_this.canvas.getBoundingClientRect().left;
            y0 = e.clientY-_this.canvas.getBoundingClientRect().top - 90;
            console.log(x0,y0)
            if (_this.preRedX<=x0 && x0<=_this.preRedX+25&&_this.preRedY<=y0<=_this.preRedY+180){
//                console.log(_this.preRedX)
//                console.log(x0)
//                console.log(_this.preRedY)
//                console.log(y0)
//                _this.ctx.drawImage(img[0], x1 - 12, y1, 25, 180);
//                _this.preRedX = x0
//                _this.preRedY = y0
              currEle = 1
              console.log(currEle)
            } else if (_this.preBlackX<=x0<=_this.preBlackX+25&&_this.preBlackY<=y0<=_this.preBlackY+180){
//                _this.ctx.drawImage(img[1], x1 - 12, y1, 25, 180);
//                _this.preBlackX = x1
//                _this.preBlackY = y1
              currEle = 2
              console.log(currEle)
            }
            _this.canvas.onmousemove = function (e) {
              var x1,y1
              x1 = e.clientX-_this.canvas.getBoundingClientRect().left;
              y1 = e.clientY-_this.canvas.getBoundingClientRect().top - 90;
//              console.log(x1,y1)
//                console.log(e)
              _this.draw(x1, y1);
              if(currEle === 1){
                _this.ctx.drawImage(img[0], x1 - 12, y1, 25, 180);
                _this.preRedX = x0
                _this.preRedY = y0
              }else if(currEle === 2){
                _this.ctx.drawImage(img[1], x1 - 12, y1, 25, 180);
                _this.preBlackX = x1
                _this.preBlackY = y1
              }
            };

            _this.canvas.onmouseup = function () {
              _this.canvas.onmousemove = null;
              _this.canvas.onmouseup = null;
            };
          }
        }

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
            this.clientX = e.clientX
            this.clientY = e.clientY
            this.layerX = e.layerX
            this.layerY = e.layerY
            this.offsetX = e.offsetX
            this.offsetY = e.offsetY
            this.pageX = e.pageX
            this.pageY = e.pageY

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
          document.getElementById('multimeterTruthID').style.left=75+'%';
          this.clickMultimeterData = 1
        } else {
          this.clickMultimeterData = 0
        }
        this.draw(0,0)
      },
//  点击图表
      clickDatagram () {
        this.upEcharts()
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
          var currDraw = this.balls[i]
//          console.log('currDraw',currDraw)
          for(var j = 0 ; j < currDraw.length ; j ++){
            this.ctx.beginPath();
            this.ctx.strokeRect(currDraw[j].a[0] - 0.5, currDraw[j].a[1] - 0.5, currDraw[j].diameter, currDraw[j].diameter)
//          this.ctx.closePath()
//          this.ctx.beginPath();
            this.ctx.arc(currDraw[j].x,currDraw[j].y,currDraw[j].radius,0,2*Math.PI);
            if (this.clickMultimeterData === 1) {
              this.insert()
            }
            if(this.ctx.isPointInPath(x,y)){//isPointInPath() 方法返回 true，如果指定的点位于当前路径中；否则返回 false。
              console.log('yes',currDraw[j].x,currDraw[j].y)
//          this.ctx.clearRect(0, 0, 100, 100);
              this.ctx.arc(currDraw[j].x,currDraw[j].y,currDraw[j].radius+1,0,2*Math.PI)
            }else{
//          console.log('bai')
            }
//            console.log('currX1',this.eleX)
//            console.log('currY1',this.eleY)
            if(this.ctx.isPointInPath(this.eleX,this.eleY)){//isPointInPath() 方法返回 true，如果指定的点位于当前路径中；否则返回 false。
              console.log('yes',currDraw[j].x,currDraw[j].y)
//          this.ctx.clearRect(0, 0, 100, 100);
              this.ctx.arc(currDraw[j].x,currDraw[j].y,currDraw[j].radius+1,0,2*Math.PI)
            }else{
//          console.log('bai')
            }

            this.ctx.fillStyle=currDraw[j].color
//        this.ctx.closePath()
            this.ctx.fill();
          }
        }
      },
//    计算完的数据给balls
      first() {
//      console.log(this.mLcircles)
//      console.log(this.mLcircles[0].x)
        for(var i = 0; i < this.mLcircles.length; i++){
          var currArrayCircles = this.mLcircles[i]
          var currPoint = this.mLPoint[i]
          var drawOne = []
          for(var j = 0; j < currArrayCircles.length; j++){
            var radius = 2.4
            this.aBall={
              radius:radius,
              diameter:radius * 3,
              x:currArrayCircles[j].x * 10.1 + currPoint[0] + (radius * 3) / 2 - 0.5,
              y:currArrayCircles[j].y * 10.1 + currPoint[1] + (radius * 3) / 2 - 0.5,
//          x:this.mLcircles[i].x * this.clientWidth,
//          y:this.mLcircles[i].y * this.clientHeight,
              a:[currArrayCircles[j].x * 10.1 + currPoint[0],currArrayCircles[j].y * 10.1 + currPoint[1]],
              color:currArrayCircles[j].color
            }
//        console.log('this.mLcircles[i].x',this.mLcircles[i].x)
//        console.log('clientWidth',this.clientWidth)
//        console.log('this.mLcircles[i].y',this.mLcircles[i].y)
//        console.log('clientHeight',this.clientHeight)
//          console.log('11',this.aBall)
            drawOne.push(this.aBall);
//            console.log('drawOne',drawOne)
          }
          this.balls.push(drawOne);
//          console.log(this.balls)
        }
        this.draw(0,0)
      },
//    监听canvas宽高
      handleResize (event) {
        this.clientWidth = document.getElementById("tabsCenter1").offsetWidth
        this.clientHeight = document.getElementById("tabsCenter1").clientHeight
        this.canvas.width = this.clientWidth
        this.canvas.height = this.clientHeight
        this.ratioX = this.clientWidth / 1024
        this.ratioY = this.clientHeight / 577
        if (this.mLcircles.length) {
          for(var i = 0; i < this.mLcircles.length; i++){
//            console.log(this.mLcircles.length)
            var currArrayCircles = this.mLcircles[i]
            var currPoint = this.mLPoint[i]
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
//            console.log('33',this.aBall)
                }

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
            }
            this.balls[i] = drawOne;
          }
        }

        this.draw(0,0)
      }
    },
    mounted(){
      this.windowWidth = this.clientWidth
      this.windowHeight = window.innerHeight
      console.log(this.clientWidth)
      console.log(this.windowHeight)
      var canvas = document.getElementById("canvas");
      this.canvas = canvas
      this.ctx = this.canvas.getContext("2d")
      canvas.addEventListener("mousemove",this.detect())
//      this.clientWidth = this.clientWidth * 0.65
//      this.clientHeight = this.clientWidth / 1.85
      this.clientWidth = 1024
      this.clientHeight = 577
      this.ratioX = this.clientWidth / 1024
      this.ratioY = this.clientHeight / 577
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
    width:220px;
    height:300px;
    position: absolute;
    top:80px;
    right:80px;
    background: url(../../assets/imgs/multimeter.png) no-repeat;
    background-size: cover;
    /*pointer-events: none;*/
  }
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
    left: 63px;
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
    left: 105px;
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
    left: 145px;
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
