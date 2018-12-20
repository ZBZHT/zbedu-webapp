<template>
<div class="testCenter">
  <div id="div1">
    <div v-mydrag>xjx</div>
  </div>
  <div id="div2" v-drag>hhh</div>
</div>
</template>

<script>
import axios from 'axios'
import pptSlides from '@/components/courseTree/pptSlides'



export default {
  name: 'testCenter',
  data () {
    return {
        total:'',//总信息数
        size:1,//每页显示信息个数不传默认6
        page:1,//当前页码
    }
  },
  directives:{
    mydrag(el){
      el.onmousedown = function(e){
        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
        var divx = e.clientX - document.getElementById('div1').offsetLeft;
        var divy = e.clientY - document.getElementById('div1').offsetTop;
        //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
        document.onmousemove = function(e){
          //获取移动后div的位置：鼠标位置-divx/divy
          var l = e.clientX - divx;
          var t = e.clientY - divy;
          document.getElementById('div1').style.left=l+'px';
          document.getElementById('div1').style.top=t+'px';
        }
        document.onmouseup = function(e){
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    },
    drag(el){
      console.log(el)
      el.onmousedown = function(e){
        console.log(e)
        //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
        var divx = e.clientX - document.getElementById('div2').offsetLeft;
        var divy = e.clientY - document.getElementById('div2').offsetTop;
        //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
        document.onmousemove = function(e){
          //获取移动后div的位置：鼠标位置-divx/divy
          var l = e.clientX - divx;
          var t = e.clientY - divy;
          document.getElementById('div2').style.left=l+'px';
          document.getElementById('div2').style.top=t+'px';
        }
        document.onmouseup = function(e){
          document.onmousemove = null;
          document.onmouseup = null;
        }
      }
    }
  },
  created(){

  },
  mounted(){

  },
  methods:{

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
#div1{
  width:110px;
  height:120px;
  border:1px solid #000000;
  position: absolute;
  top: 200px;
  left: 130px;
}
#div2{
  width:110px;
  height:120px;
  border:2px solid #000000;
  position: absolute;
  top: 0;
  left: 130px;
}
</style>
