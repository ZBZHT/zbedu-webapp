<template>
  <div class="courseIndex">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>
    <div class="banner">
        <div class="left-menu">

            <banner-left :bannerLeftData = "bannerLeftData"></banner-left>

        </div>
        <div class="rightbox">
            <swipe :slides="slides" :inv="inv" :style="styleObject"></swipe>
        </div>
    </div>

    <span class="title">精品课程</span>
    <div class="best-class">

        <bestClass :bestClassData = "bestClassData"></bestClass>

    </div>

    <div class="bottom-box">
        <div class="bb-left">
            <span class="bb-span">猜你感兴趣</span>
            <bottom-left :bottomLeftData = "bottomLeftData"></bottom-left>
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
                            <div class="maskImg"><img :src="url_before + item.url"></div>
                            <div class="mask">
                                <img @click="toPlayVideo(item)" class="play" src="src/assets/imgs/play3.png">
                                <p @click="toPlayPdf(item)" class="ppv"><span>PPT</span></p>
                                <p @click="toPlayVideo(item)" class="video"><span>Video</span></p>
                            </div>

                        <div class="intro">
                            <span class="jianjie">
                            简介:
                            </span>
                            {{item.describe}}
                        </div>
                        </div>
                    <p class="p" @click="sendRecommendTitle(item)">
                        {{item.title}}
                        <!--<router-link :to="{path:'/courseNoTree/'+ item.courseId + '/label/' + item.title}">{{item.title}}</router-link>-->
                    </p>
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
            <bottom-right :bottomRightData = "bottomRightData"></bottom-right>
        </div>
    </div>

    <div class="footer">
        <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navgationHead from '@/components/common/navgationHead'
import footFooter from '@/components/common/footFooter'
import bannerLeft from '@/components/index/bannerLeft'
import swipe from '@/components/testCenter/swipe'
import bestClass from '@/components/index/bestClass'
import bottomLeft from '@/components/index/bottomLeft'
import moPaging from '@/components/index/moPaging'
import bottomRight from '@/components/index/bottomRight'

export default {
  name: 'index',

  data () {
    return {
      msg: 'index',
      indexData:'',
      leftData:'',
      bestClassData:'',
      pageData:'',
      bottomLeftData:'',
      bottomRightData:'',
      bannerLeftData:'',
      imgArray:'',
      total:'',//总信息数
      size:6,//每页显示信息个数不传默认6
      page:1,//当前页码
      currentPages:'',
      slides: [],
      inv: 3000,
      styleObject: {
          width: '100%',
          height: '100%'
        },
      url:'',
      url_before:'src/assets/imgs/'
    }
  },
  computed:{
          all:function(){
              return this.pageData
          },
          testData() {
            return this.leftData
          }
      },
  methods:{
              //页码切换执行方法
          pageFn(val){
            this.page=val;
            console.log(val);
        },
          toPlayVideo(item) {
            console.log(item)
            this.$store.commit('noTreeTitle',item);
            this.$store.commit('noTreeTitle1',item);
            this.$router.push('/playVideo/'+ item.courseId + '/video/' + item.title)
        },
          toPlayPdf(item) {
            console.log(item)
            this.$store.commit('noTreeTitle',item);
            this.$store.commit('noTreeTitle1',item);
            this.$router.push('/playPdf/'+item.courseId + '/pdf/' + item.title)
        },
    sendRecommendTitle(item){
      this.$store.commit('noTreeTitle',item);
      this.$store.commit('noTreeTitle1',item);
      const {href} = this.$router.resolve({
            name: 'newCourse'
        });
      window.open(href, '_blank')
    }
  },
  mounted(){
        this.url = document.domain;
        axios.get("/readJson/index",{
                params:{
                     user:123
                }
            }).then((res)=>{
                this.indexData = res.data;
                this.bestClassData = this.indexData.bestClassData;
                this.pageData = this.indexData.pageData;
                this.total = this.all.length;
                this.bottomLeftData = this.indexData.bottomLeftData;
                this.bottomRightData = this.indexData.bottomRightData;
                this.slides = this.indexData.slides;
            }).catch(function(error){
                console.log("error init." + error)
            });

        axios.get("/readJson/bannerLeftData",{
                params:{
                     user:234
                }
            }).then((res)=>{
                this.indexData = res.data;
                this.bannerLeftData = this.indexData;
            }).catch(function(error){
                console.log("error init." + error)
            });
    },
  components:{navgationHead,bannerLeft,swipe,bestClass,bottomLeft,bottomRight,moPaging,footFooter}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
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
.courseIndex .title{
    font-size:20px;
    font-weight:bolder;
}
.courseIndex .banner{
  width:960px;
  height:460px;
  margin:0 auto;
  position:relative;
  display:flex;
  margin-bottom:75px;
}
.courseIndex .left-menu{
  width:165px;;
  height:100%;
  padding:17px;
  padding-left:0;
  box-sizing: border-box;
  background: #2b333b;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  font-weight:200;
}
.courseIndex .rightbox {
    width:795px;
    height:100%;
    overflow:hidden;
}
.courseIndex .mask-play>img{
  width:169px;
  height:100px;
}
.courseIndex .zz{
    border-radius:10px;
    overflow: hidden;
}
.courseIndex .mf{
    width:171px;
    height:100px;
    margin-bottom:40px;
}
.courseIndex .mask-play .mask{
    width:171px;
    height:100px;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    top:-100px;
    right:0;
    display:none;
}
.courseIndex .mask-play .maskImg{
    width:169px;
    height:100px;
}
.courseIndex .mask-play .maskImg img{
    width:100%;
    height:100%;
}
.courseIndex .mask>img{
    margin-top:20px;
}
.courseIndex .mask p>span{
    font-size:13px;
}
.courseIndex div.mask-play:hover .mask{
    display: block;
    cursor: pointer;
}
.courseIndex .bottom-box{
  width:960px;
  height:550px;
  margin:0 auto;
  margin-bottom:20px;
  display:flex;
}
.courseIndex .bb-left{
    width:156px;
    height: 490px;
    box-shadow: 10px 10px 30px #ccc;
    margin-top:20px;
    margin-right:30px;
}
.courseIndex .bb-span{
    color:#222;
    font-size: 18px;
    float: left;
    height: 20px;
    line-height: 20px;
    padding-left: 2px;
    border-left:4px solid #e4393c;
    margin-right:25px;
}
.courseIndex .bb-right{
    width:156px;
    height: 490px;
    box-shadow: 10px 10px 30px #ccc;
    margin-top:20px;
    padding-right:0;
}
.courseIndex .bb-middle{
    width:582px;
    height:630px;
    margin-right:33px;
    margin-top:15px;
}
.courseIndex .shizhan{
    width:580px;
    height:422px;
    margin-top:18px;
    margin-left:15px;
}
.courseIndex .shizhan>ul{
    text-align:left;
}
.courseIndex .mask-play{
    height:100px;
    position:relative;
}
.courseIndex .mask .play{
    margin-left:53px;
}
.courseIndex .row-a{
    width:169px;
    height:100px;
    margin-top:5px;
    display:inline-block;
    margin-right:20px;
    margin-bottom:88px;
}
.courseIndex .ppv{
    width:37px;
    height:23px;
    border-radius: 8px;
    background: #fff;
    color:#000;
    margin-left: 124px;
    margin-top:-48px;
    text-align: center;
}
.courseIndex .video{
    width:37px;
    height:23px;
    border-radius: 8px;
    background: #fff;
    color:#000;
    margin-left: 124px;
    margin-top:-67px;
    text-align: center;
}
.courseIndex .intro{
    width:161px;
    height:70px;
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
.courseIndex .jianjie{
    font-weight: bolder;
}
.courseIndex div.mask-play:hover .intro{
    display: -webkit-box;
}
.courseIndex .intro::after {
    content: '...'
}
.courseIndex .bb-middle .row-a .p{
    text-align:center;
    margin-top:15px;
    font-size: 18px;
}
.courseIndex .bb-middle .row-a .p:hover{
    color:#f00;
}

.courseIndex .pageination_align {
            text-align: center
        }

        .courseIndex .pageination {
            color: #48576a;
            font-size: 12px;
            display: inline-block;
            user-select: none;
        }

        .courseIndex .pagination_page {
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

        .courseIndex .pagination_page_right {
            border-right: 1px solid #d1dbe5;
        }

        .courseIndex .pagination_page:hover {
            color: #e4393c;
        }

        .courseIndex .disabled {
            color: #e4e4e4 !important;
            background-color: #fff;
            cursor: not-allowed;
        }

        .courseIndex .pagination_page_active {
            border-color: #e4393c;
            background-color: #e4393c;
            color: #fff !important;;
            cursor: default;
        }
</style>
