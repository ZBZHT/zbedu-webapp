<template>
  <div id="app" class="container">
    <div class="banner">
        <div class="left-menu">

            <banner-left v-bind:leftData="leftData"></banner-left>

        </div>
        <div class="rightbox">
        
            <right-swipe></right-swipe>

        </div>      
    </div>

    <span class="title">精品课程</span>
    <div class="best-class">
        <div class="five-box" v-for="item in bestClassData">
                    <div class="mask-play zz mf">
                        <img :src="item.url">
                        <div class="mask">
                            <img src="src/assets/play3.png">
                            <p class="ppv"><span>PPT</span></p>
                            <p class="ppv"><span>Video</span></p></a>
                        </div>
                    </div>
                    <p class="p"><a>{{item.title}}</a></p>
        </div>
    </div>

    <div class="bottom-box">
        <div class="bb-left">
            <span class="bb-span">猜你感兴趣</span>
            <bottom-left></bottom-left>
        </div>
        <div class="bb-middle">
        <span class="title">实战推荐</span>
            <div class="shizhan">
              <ul>  
                <li class="row-a" 
                    v-for="(item,index) in pageData" 
                    v-if="index >= (page-1)*6 && index <= (page-1)*6 + 5">
                    <a>
                        <div class="mask-play">
                            <img :src="item.url">
                            <div class="mask">
                                <img class="play" src="src/assets/play3.png">
                                <p class="ppv"><span>PPT</span></p>
                                <p class="ppv"><span>Video</span></p>
                            </div>
                        
                        <div class="intro">
                            <span class="jianjie">
                            简介:
                            </span>
                            {{item.intro}}
                        </div>
                        </div>
                    <p class="p"><a>{{item.title}}</a></p>
                    </a>
                </li>
              </ul>     
            </div>
            <mo-paging 
            :total="total" 
            :size="size" 
            :page="page" 
            :changge="pageFn">
            </mo-paging>
            

        </div>
        <div class="bb-right">
            <bottom-right></bottom-right>
        </div>
    </div>
  </div>
</template>

<script>
import navs from '@/assets/index-data.js'
import bannerLeft from '@/components/bannerLeft'
import rightSwipe from '@/components/rightSwipe'
import bottomLeft from '@/components/bottomLeft'
import moPaging from '@/components/moPaging'
import bottomRight from '@/components/bottomRight'


export default {
  name: 'main',
  
  data () {
    return {
      msg: 'main',
      leftData:'',
      bestClassData:[
          {
            url:'src/assets/img.png',
            title:'标题'
          },
          {
            url:'src/assets/img.png',
            title:'标题'
          },
          {
            url:'src/assets/img.png',
            title:'标题'
          },
          {
            url:'src/assets/img.png',
            title:'标题'
          },
          {
            url:'src/assets/img.png',
            title:'标题'
          }
      ],
      pageData:[
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介1'
          },
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介2'
          },
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介3'
          },
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介4'
          },
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介5'
          },
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介'
          },
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介'
          },
          {
              url:'src/assets/img.png',
              title:'检测',
              intro:'简介'
          },
      ],
      total:'',//总信息数
      size:6,//每页显示信息个数不传默认6
      page:1,//当前页码 
      currentPages:''
    }
  },
  computed:{
          all:function(){
              return this.pageData
          }
      },
  methods:{
              //页码切换执行方法
              pageFn(val){
                  this.page=val;
                  console.log(val);
              }
          },
  mounted(){
        this.total = this.all.length,
        this.leftData = navs,
        console.log(this.leftData)
    },  
  components:{bannerLeft,rightSwipe,bottomLeft,bottomRight,moPaging}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  min-width:960px;
}
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a{
    color: inherit;
    cursor: pointer;
    text-decoration:none;
}
a:hover{
    text-decoration: none;
    color: #f00;
}
a:focus {
    color: #f00;
    text-decoration: none;
}
hr{
    margin-top: 2px;
    margin-bottom:2px;
}
.title{
    font-size:20px;
    font-weight:bolder;
}
.banner{
  width:920px;
  height:384px;
  margin:0 auto;
  position:relative;
  display:flex;
  margin-bottom:75px;
}
.left-menu{
  width:161px;;
  height:384px;
  padding:17px;
  padding-left:0;
  box-sizing: border-box;
  background: #2b333b;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  font-weight:200;
}
.rightbox {
    width:759px;
    overflow:hidden;
}
.best-class{
    display:flex;
    width:920px;
    height:200px;
    margin:0 auto;
}
.five-box{
    width:169px;
    height:200px;
    margin-right:4px;
    margin-left:9px;
}
.mask-play>img{
  width:169px;
  height:100px;
}
.best-class a{
  color:#000;
}
.best-class a:hover{
  color:#e4393c;
}
.best-class .five-box .p{
    margin-top:-25px;
    font-size: 18px;
    text-align: center;
    margin-left:-9%;
}
.zz{
    border-radius:10px;
    overflow: hidden;
}
.mf{
    width:171px;
    height:100px;
    margin-bottom:40px;
}
.mask-play .mask{
    width:171px;
    height:100px;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    top:-104px;
    right:0;
    display:none;
}
.mask>img{
    margin-top:20px;
}
.mask p>span{
    font-size:13px;
}
div.mask-play:hover .mask{
    display: block;
    cursor: pointer;
}
.bottom-box{
  width:920px;
  height:550px;
  margin:0 auto;
  margin-bottom:20px;
  display:flex;
}
.bb-left{
    width:156px;
    height: 490px;
    box-shadow: 10px 10px 30px #ccc;
    margin-top:20px;
}
.bb-span{
    color:#222;
    font-size: 18px;
    float: left;
    height: 20px;
    line-height: 20px;
    padding-left: 2px;
    border-left:4px solid #e4393c;
    margin-right:25px;
}
.bb-right{
    width:156px;
    height: 490px;
    box-shadow: 10px 10px 30px #ccc;
    margin-top:20px;
    padding-right:0;
}
.bb-middle{
    width:582px;
    height:630px;
    margin-right:27px;
    margin-top:15px;
}
.shizhan{
    width:558px;
    height:422px;
    margin-top:18px;
    margin-left:27px;
}
.shizhan>ul{
    text-align:left;
}
.mask-play{
    height:100px;
    position:relative;
}
.mask .play{
    margin-left:53px;
}
.row-a{
    width:169px;
    height:100px;
    margin-top:5px;
    display:inline-block;
    margin-right:15px;
    margin-bottom:88px;
}
.ppv{
    width:37px;
    height:18px;
    border-radius: 8px;
    background: #fff;
    color:#000;
    margin-left: 124px;
    margin-top:-43px;
    text-align: center;
}
.intro{
    width:140px;
    height:50px;
    border-radius: 15px;
    background: rgba(200,200,200,1);
    color:#fff;
    padding:10px;
    display: none;
    position: absolute;
    top:-71px;
    left:5px;
    overflow: hidden;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color:#000;
    font-size:14px;
}
.jianjie{
    font-weight: bolder;
}
div.mask-play:hover .intro{
    display: -webkit-box;
}
.intro::after {
    content: '...'
}
.bb-middle .row-a .p{
    margin-top:15px;
    font-size: 18px;
}


.pageination_align {
            text-align: center
        }

        .pageination {
            color: #48576a;
            font-size: 12px;
            display: inline-block;
            user-select: none;
        }

        .pagination_page {
            padding: 0 4px;
            border: 1px solid #d1dbe5;
            border-right: 0;
            background: #fff;
            font-size: 13px;
            min-width: 28px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            float: left;
            margin-right:5px;
            border-radius:5px;
        }

        .pagination_page_right {
            border-right: 1px solid #d1dbe5;
        }

        .pagination_page:hover {
            color: #e4393c;
        }

        .disabled {
            color: #e4e4e4 !important;
            background-color: #fff;
            cursor: not-allowed;
        }

        .pagination_page_active {
            border-color: #e4393c;
            background-color: #e4393c;
            color: #fff !important;;
            cursor: default;
        }
</style>
