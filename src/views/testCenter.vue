<template>
<div class="testCenter">
  111
  <div id="testCenter">
    <canvas id="canvas" width="500" height="400" style="border:1px solid #f00">
    </canvas>
  </div>

  <div @click="appFullScreen">124578</div>
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
        {x:64,y:35,color:'red'},
        {x:145,y:99,color:'black'},
        {x:241,y:165,color:'red'},
        {x:333,y:230,color:'green'},
        {x:423,y:285,color:'black'}
      ]
    }
  },
  created(){

  },
  mounted(){
    this.first()
    var canvas = document.getElementById("canvas");
    this.canvas = canvas
    this.ctx = this.canvas.getContext("2d")
    canvas.addEventListener("mousemove",this.detect())
  },
  methods:{
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
    first() {
//      console.log(this.circles)
//      console.log(this.circles[0].x)
      for(var i = 0; i < this.circles.length; i++){
        var radius = 5
        this.aBall={
          radius:radius,
          x:this.circles[i].x,
          y:this.circles[i].y,
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
