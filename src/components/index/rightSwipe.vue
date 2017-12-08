<template>
  <div ref="root">
    <div  class="sliderPanel" :class="{transitionAni:ani}" :style="{transform:translateX}">
      <div v-for="item in itemList" class="verticalCenter picbox" :style="{left:item.x+'px'}">
        <img   :src="item.url" style="min-height: 100%">
      </div>
    </div>
    <div @click="clickLeft" class="arrowLeft verticalCenter horizaCenter">
        <span> < </span>
    </div>
    <div @click="clickRight" class="arrowRight verticalCenter horizaCenter">
        <span> > </span>
    </div>
    
    <div class="sliderBar horizaCenter">
      <div v-for="(item,index) in imgArray" @click="clickSliderCircle(index)"  class="circle" :class="{circleSelected:item.selected}">
      </div>
    </div>
  </div>
</template>
<script>
  const SCREEN_WIDTH=document.body.clientWidth
  const SCREEN_HEIGHT=document.body.scrollHeight
  var left,center,right
  var selectIndex=0
  var count=0
  var second=3//slider 时间间隔
  var timer=null
  var ani=null
  var debugScale=1.0//测试用可调整为小于1
  var Direction={left:'left',right:'right'};
  var autoDirection=Direction.right
  var canClick=true
  export default({
    data:function(){
      return{
        height:SCREEN_HEIGHT+'px',
        top:0,
        ani:true,
        translateX:'scale('+debugScale+') translateX(0px)',
        imgArray:[
          {
            url:'src/assets/手机app下载.jpg',
            selected:false,
          },
          {
            url:'src/assets/case.jpg',
          },
          {
            url:'src/assets/Congratulate.jpg',
          },
          {
            url:'src/assets/platform.jpg',
          },
          {
            url:'src/assets/platform2.jpg',
          }
        ],
        itemList:[]
      }
    },
    mounted:function(){
      ani=this.$refs.root.querySelector('.sliderPanel')
      count=this.imgArray.length
      this.setIndex(selectIndex)
      //自动滚动切换图片
      this.slideAuto(second)
    },
    methods:{
      clickLeft:function(){
          if(!canClick) return false
        autoDirection=Direction.left
        this.slideAuto(second)
        this.moveLeftAni()
        canClick=false
      },
      clickRight:function(){
        if(!canClick) return false
        autoDirection=Direction.right
        this.slideAuto(second)
        this.moveRightAni()
        canClick=false
      },
      slideRight:function () {
        selectIndex++
        if(selectIndex+1>count){
          selectIndex=0
        }else if(selectIndex<0){
          selectIndex=count-1
        }
        this.setIndex(selectIndex)
      },
      slideLeft:function () {
        selectIndex--
        if(selectIndex+1>count){
          selectIndex=0
        }else if(selectIndex<0){
          selectIndex=count-1
        }
        this.setIndex(selectIndex)
      },
      clickSliderCircle:function (index) {
        this.slideAuto(second)
        this.setIndexPre(index)
      },
      setIndexPre:function (index) {
        if(!canClick) return false
        canClick=false
        if(index==selectIndex)return
        var leftIndex=index
        var centerIndex=selectIndex
        var rightIndex=index
        for(var i=0;i<count;i++){
          if(i==selectIndex){
            this.imgArray[i].selected=true
          }else{
            this.imgArray[i].selected=false
          }
        }
        left=this.imgArray[leftIndex]
        center=this.imgArray[centerIndex]
        right=this.imgArray[rightIndex]
        left=JSON.parse(JSON.stringify(left))
        right=JSON.parse(JSON.stringify(right))
        left.x=-SCREEN_WIDTH
        center.x=0
        right.x=SCREEN_WIDTH
        left.index=leftIndex
        center.index=centerIndex
        right.index=rightIndex
        this.itemList=[left,center,right]
        if(index>selectIndex){
          autoDirection=Direction.right;
            +function(obj){
            obj.anicompted(
              'scale('+debugScale+') translateX('+0+'px)',
              'scale('+debugScale+') translateX('+-SCREEN_WIDTH+'px)',
              function(){
                obj.setIndex(index)
              })
          }(this)
          //右移
        }else if(index<selectIndex){
          //左移
          autoDirection=Direction.left;
          +function(obj){
            obj.anicompted(
              'scale('+debugScale+') translateX('+0+'px)',
              'scale('+debugScale+') translateX('+SCREEN_WIDTH+'px)',
              function(){
                obj.setIndex(index)
              })
          }(this)
        }
      },
      setIndex:function (index) {
        var leftIndex=index-1
        var centerIndex=index
        var rightIndex=index+1
        if(index<=0){
          index=0
          leftIndex=count-1
          centerIndex=index
          rightIndex=index+1
        }else if(index>=count-1){
          index=count-1
          leftIndex=index-1
          centerIndex=index
          rightIndex=0
        }
        selectIndex=index
        for(var i=0;i<count;i++){
            if(i==selectIndex){
              this.imgArray[i].selected=true
            }else{
              this.imgArray[i].selected=false
            }
        }
        left=this.imgArray[leftIndex]
        center=this.imgArray[centerIndex]
        right=this.imgArray[rightIndex]
        left.x=-SCREEN_WIDTH
        center.x=0
        right.x=SCREEN_WIDTH
        left.index=leftIndex
        center.index=centerIndex
        right.index=rightIndex
        this.itemList=[left,center,right]
      },
      slideAuto:function () {
          clearInterval(timer);
          +function (obj) {
            timer=setInterval(function () {
              if(autoDirection==Direction.left){
                obj.moveLeftAni()
              }else{
                obj.moveRightAni()
              }
            },second*1000)
          }(this)
      },
      moveLeftAni:function(){
          +function(obj){
            obj.anicompted(
              'scale('+debugScale+') translateX('+0+'px)',
              'scale('+debugScale+') translateX('+SCREEN_WIDTH+'px)',
              function(){
                obj.slideLeft()
              })
          }(this)
      },
      moveRightAni:function(){
        +function(obj){
            obj.anicompted(
              'scale('+debugScale+') translateX('+0+'px)',
              'scale('+debugScale+') translateX('+-SCREEN_WIDTH+'px)',
              function(){
                obj.slideRight()
              })
          }(this)
      },
      anicompted:function(fromStr,toStr,callBack){
        var handler=null,obj=this
        handler=function(){
          ani.removeEventListener('webkitTransitionEnd',handler,false)
          callBack()
          obj.ani=false
          obj.translateX=fromStr
          canClick=true
        }
        ani.removeEventListener('webkitTransitionEnd',handler,false)
        ani.addEventListener('webkitTransitionEnd',handler,false)
        this.ani=true
        this.translateX=toStr
      }
    }

  })

</script>
<style scoped>
  .sliderPanel{
      height:384px;
  }
  .transitionAni{
    transition: all 0.8s cubic-bezier(.23,1,.32,1);
    /*transition: transform 1s;*/
  }
  .arrowLeft{
    transition: all 0.4s ease;
    width: 95px;
    height: 384px;
    position: absolute;
    left: 161px;
    top: 8%;
    margin-top: -30px;
    background: rgba(0,0,0,0);
    border-radius: 6px;
  }
  .arrowLeft:hover{
    cursor:pointer;
  }
  .verticalCenter span{
    color:#f00;
    font-size:50px;
    font-weight:bolder;
    position:relative;
    left: 0;
    top: 45%;
  }
  .verticalCenter span:hover{
    cursor:pointer;
    color:#fff;
  }
  .arrowRight{
    transition: all 0.4s ease;
    width: 95px;
    height: 384px;
    position: absolute;
    right: 0;
    top: 8%;
    margin-top: -30px;
    background: rgba(0,0,0,0);
    border-radius: 6px;
  }
  .arrowRight:hover{
    cursor:pointer;
  }
  .sliderBar{
    height: auto;
    position: absolute;
    bottom: 50px;
    left:488px;
  }
  .circle{
    width: 10px;
    height: 10px;
    background: rgba(0,0,0,0.7);
    border-radius: 50%;
    display: table-cell;
    margin-right: 3px;
    transition: all 0.5s ease;
  }
  .circle:hover{
    background: #e4393c;
    transform: scale(1.15);
  }
  .circleSelected{
    background: #e4393c;
    transform: scale(1.15);
  }
  .picbox{
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    /*transform: scale(0.9);*/
    /*opacity: 0.2;*/
    transition: all 0.45s ease;
  }
  /*@keyframes arrowOut-animation {*/
    /*from{*/
      /*transform: translateY(0px);*/
    /*}*/
    /*to{*/
      /*transform: translateY(15px);*/
      /*!*width:200px;*!*/
    /*}*/
  /*}*/
  /*@keyframes arrowIn-animation {*/
    /*from{*/
      /*transform: translateY(15px);*/
    /*}*/
    /*to{*/
      /*transform: translateY(0px);*/
      /*!*height: 200px;*!*/
    /*}*/
  /*}*/
  /*.arrowOut{*/
    /*animation: arrowOut-animation;*/
    /*animation-duration: 0.5s;*/
    /*animation-timing-function: ease-out;*/
    /*animation-fill-mode:forwards;*/
  /*}*/
  /*.arrowIn{*/
    /*animation: arrowIn-animation;*/
    /*animation-duration: 0.5s;*/
    /*animation-timing-function:ease-out;*/
    /*animation-fill-mode:forwards;*/

  /*}*/
</style>