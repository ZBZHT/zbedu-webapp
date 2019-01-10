<template>
<div class="testCenter">
  111
  <div id="testCenter">
    <canvas id="canvas" width="500" height="400" style="border:1px solid #f00">
    </canvas>
  </div>

  <!--<div @click="appFullScreen">124578</div>-->
  </div>
</template>

<script>
import axios from 'axios'
import pptSlides from '@/components/courseTree/pptSlides'



export default {
  name: 'testCenter',
  data () {
    return {
      balls:[],
      circles:[
        {x:343.5,y:276.5,a:[340.5,273.5],b:[346.5,273.5],c:[346.5,279.5],d:[340.5,279.5],color:'red'},
        {x:353.5,y:276.5,a:[350.5,273.5],b:[356.5,273.5],c:[356.5,279.5],d:[350.5,279.5],color:'black'},
        {x:353.5,y:286.5,a:[350.5,283.5],b:[356.5,283.5],c:[356.5,289.5],d:[350.5,289.5],color:'red'}
      ],
    }
  },
  created(){

  },
  mounted(){
    this.first()
    var canvas = document.getElementById("canvas");
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    this.ooo()
    canvas.addEventListener("mousemove",this.detect())
  },
  methods:{
    ooo(){
      let img = new Image();
      img.onload = function(){
        this.ctx.drawImage(img, 0, 0)
      }
      img.src="src/assets/imgs/red.png";
    },
    detect(){
      var _this = this
      //鼠标点击canvas，获取的鼠标点击的位置(x,y)
      this.canvas.onmousemove = function (e){
        var x=e.clientX-_this.canvas.getBoundingClientRect().left;
        var y=e.clientY-_this.canvas.getBoundingClientRect().top;
        _this.draw(x,y);
      }
    },
    draw(x,y){
//      console.log(x)
      this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
      for( var i = 0 ; i < this.balls.length ; i ++ ){
        this.ctx.beginPath();
//        this.ctx.arc(this.balls[i].x,this.balls[i].y,this.balls[i].radius,0,2*Math.PI);
//        this.ctx.moveTo(this.balls[i].a[0],this.balls[i].a[1])
//        this.ctx.lineTo(this.balls[i].b[0],this.balls[i].b[1])
//        this.ctx.lineTo(this.balls[i].c[0],this.balls[i].c[1])
//        this.ctx.lineTo(this.balls[i].d[0],this.balls[i].d[1])
        this.ctx.strokeRect(this.balls[i].a[0], this.balls[i].a[1], 10, 10)
//        this.ctx.closePath()
//        this.ctx.beginPath();
        this.ctx.arc(this.balls[i].x,this.balls[i].y,this.balls[i].radius,0,2*Math.PI);
        if(this.ctx.isPointInPath(x,y)){//isPointInPath() 方法返回 true，如果指定的点位于当前路径中；否则返回 false。
          console.log('yes',this.balls[i].x,this.balls[i].y)
//          this.ctx.clearRect(0, 0, 100, 100);
          this.ctx.arc(this.balls[i].x,this.balls[i].y,this.balls[i].radius+2,0,2*Math.PI)
//          this.ctx.moveTo(this.balls[i].a[0]-1,this.balls[i].a[1]-1)
//          this.ctx.lineTo(this.balls[i].b[0]+1,this.balls[i].b[1]-1)
//          this.ctx.lineTo(this.balls[i].c[0]+1,this.balls[i].c[1]+1)
//          this.ctx.lineTo(this.balls[i].d[0]-1,this.balls[i].d[1]+1)
//          this.ctx.closePath()
//          this.ctx.stroke();
        }else{
//          console.log('bai')
        }
        this.ctx.fillStyle=this.balls[i].color
        this.ctx.closePath()
        this.ctx.fill();
      }
    },
    first() {
//      console.log(this.circles)
//      console.log(this.circles[0].x)
      for(var i = 0; i < this.circles.length; i++){
        var radius = 5
        this.aBall={
          radius:radius,
          x:this.circles[i].x,
          y:this.circles[i].y,
          a:[this.circles[i].a[0],this.circles[i].a[1]],
          b:[this.circles[i].b[0],this.circles[i].b[1]],
          c:[this.circles[i].c[0],this.circles[i].c[1]],
          d:[this.circles[i].d[0],this.circles[i].d[1]],
          color:this.circles[i].color
        }
        this.balls[i]=this.aBall;
      }
    }
  },
  watch:{

  },
  components:{pptSlides}
}
</script>

<style scoped>

*{
    margin:0;
    padding:0;
}
  #testCenter{
    width:500px;
    height:400px;
    margin:0 auto;
    border: 1px solid #000;
    /*background: url(../assets/imgs/point.png) no-repeat;*/
  }
</style>
