<template>
<div class="testCenter">
  111
  <div id="testCenter">
    <canvas id="canvas" width="1000" height="900" style="border:1px solid #f00">
    </canvas>
  </div>

  <!--<div @click="appFullScreen">124578</div>-->
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'testCenter',
  data () {
    return {

    }
  },
  created(){

  },
  mounted(){
      var stage = new createjs.Stage("canvas");
      var shape=new createjs.Shape();
      var graphics=shape.graphics;
      graphics.beginStroke("#000");
      graphics.drawRect(10,10,100,100);
      stage.addChild(shape);
      var circle = new createjs.Shape();
      circle.graphics.beginFill("DeepSkyBlue").drawCircle(110, 110, 50);
      stage.addChild(circle);
    console.log(circle.hitTest(stage.mouseX, stage.mouseY))

      stage.update();


//        createjs.Ticker.setFPS(30);
//        createjs.Ticker.addEventListener("tick",stage);


    var image = new createjs.Bitmap("src/assets/imgs/black.png");
    stage.addChild(image);
    createjs.Ticker.addEventListener("tick", handleTick);
    function handleTick(event) {
      image.x += 10;
      stage.update();
    }
  },
  methods:{


  },
  watch:{

  },
  components:{}
}
</script>

<style scoped>

*{
    margin:0;
    padding:0;
}

</style>
