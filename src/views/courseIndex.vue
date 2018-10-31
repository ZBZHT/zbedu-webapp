<template>
  <div class="courseIndex">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>
    <!--登录-->
    <div class="login">
      <login-cousre></login-cousre>
    </div>
    <div class="banner" :style="{height: rightboxHeight + 'px'}">
        <div class="left-menu">
            <!--<banner-left :bannerLeftData = "bannerLeftData"></banner-left>-->
            <banner-left></banner-left>
        </div>
        <div class="rightbox">
            <swipe :slides="slides" :inv="inv" :style="styleObject"></swipe>
        </div>
    </div>

    <div class="title">精品课程</div>
    <div class="best-class">
        <bestClass :bestClassData = "bestClassData"></bestClass>
    </div>

    <div class="bottom-box">
        <div class="bb-left">
            <span class="bb-span">&thinsp;猜你感兴趣</span>
            <bottom-left :bottomLeftData = "bottomLeftData"></bottom-left>
        </div>
        <div class="bb-middle">
        <p class="title">实战推荐</p>
            <div class="shizhan">
              <ul>
                <li class="row-a"
                    v-for="(item,index) in pageData"
                    v-if="index >= (page-1)*6 && index <= (page-1)*6 + 5">
                    <a>
                        <div class="mask-play">
                            <!--<div class="maskImg"><img :src="url_before + item.url"></div>-->
                          <div class="maskImg">
                            <img v-if="index % 6 == 0" src="src/assets/imgs/bestclass11.png">
                            <img v-if="index % 6 == 1" src="src/assets/imgs/bestclass12.png">
                            <img v-if="index % 6 == 2" src="src/assets/imgs/bestclass13.png">
                            <img v-if="index % 6 == 3" src="src/assets/imgs/bestclass14.png">
                            <img v-if="index % 6 == 4" src="src/assets/imgs/bestclass15.png">
                            <img v-if="index % 6 == 5" src="src/assets/imgs/bestclass16.png">
                            <!--<p>{{item.label}}</p>-->
                          </div>
                          <div class="mask">
                              <img @click="sendRecommendVideo(item)" class="play" src="src/assets/imgs/play3.png">
                              <p @click="sendRecommendPPT(item)" class="ppv"><span>PPT</span></p>
                              <p @click="sendRecommendVideo(item)" class="video"><span>Video</span></p>
                          </div>

                        <div class="intro">
                            <span class="jianjie">
                            简介:
                            </span>
                            {{item.describe}}
                        </div>
                        </div>
                    <p class="p" @click="sendRecommendTitle(item)">
                        {{item.label}}
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
      <!--课程排行，学霸排行-->
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
import loginCousre from '@/components/common/Login';

export default {
  name: 'index',
  data () {
    return {
      userType:this.$store.state.userType,
      userName:this.$store.state.username,
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
      url_before:'src/assets/imgs/',
      rightboxHeight:''
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
        //console.log(val);
      },
        toPlayVideo(item) {
          //console.log(item)
          this.$store.commit('noTreeTitle',item);
          this.$store.commit('noTreeTitle1',item);
          this.$router.push('/playVideo/'+ item.courseId + '/video/' + item.label)
      },
        toPlayPdf(item) {
          //console.log(item)
          this.$store.commit('noTreeTitle',item);
          this.$store.commit('noTreeTitle1',item);
          this.$router.push('/playPdf/'+item.courseId + '/pdf/' + item.label)
      },
    //为热门课程给每个课程计数
    countForHot(item){
      axios.post('/teacherCMS/countHot', {
        data: {
          courseInfo: item
        }
      }).then((res) => {
        console.log(res.data)

      });
      axios.post('/teacherCMS/studentHot', {
        data: {
          name: this.userName,
        }
      }).then((res) => {
        console.log(res.data)

      });
    },
    //我的足迹添加
    myFootPrint(item){
      axios.post('/teacherCMS/addMyfoot', {
        data: {
          userName:this.userName,
          userType:this.userType,
          courseInfo: item
        }
      }).then((res) => {
        //console.log(res.data)
        if (res.data.code === 0){
          //            this.addSuccess('更新成功');
        }else if (res.data.code === 1){
          //          this.$message.error('更新失败');
        }
      });
    },
    //点击图片或video按钮
    sendRecommendVideo(item){
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName',3);
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        //添加item至我的足迹请求
        this.myFootPrint(item);
        this.countForHot(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        this.$store.commit('loginPage',true);
      }
    },
    //点击PPT按钮
    sendRecommendPPT(item){
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName',2);
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        //添加item至我的足迹请求
        this.myFootPrint(item);
        this.countForHot(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        this.$store.commit('loginPage',true);
      }
    },
    //点击标题
    sendRecommendTitle(item){
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName','');
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        //添加item至我的足迹请求
        this.myFootPrint(item);
        this.countForHot(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        this.$store.commit('loginPage',true);
      }
    }
  },
  mounted(){
        if(this.$store.state.userType == "S"){
            this.rightboxHeight = 300;
        }else{
            this.rightboxHeight = 350;
        }

        this.url = document.domain;
        axios.get("/readJson/index",{
                params:{
                     user:123
                }
            }).then((res)=>{
                this.indexData = res.data;
                this.bottomLeftData = this.indexData.bottomLeftData;
                this.slides = this.indexData.slides;
            }).catch(function(error){
                console.log("error init." + error)
            });
        //获取精品课程
        axios.post('/teacherCMS/getBestCourse', {
          data: {
            userType:this.userType
          }
        }).then((res) => {
          this.bestClassData = res.data.result[0].bestCourse;
          this.pageData = res.data.result[0].suggCourse;
          this.bottomRightData = res.data.result[0].countForHot;
          this.total = this.all.length;
        });

    },
  components:{navgationHead,bannerLeft,swipe,bestClass,bottomLeft,bottomRight,moPaging,footFooter,loginCousre}
}
</script>

<style>
#app {
  font-family: 'Microsoft YaHei', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f0f3ef;
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
  margin:0 auto;
  width:960px;
  text-align: left;
  font-size: 22px;
  font-weight: 200;
  color: #333;
}
.courseIndex .bb-middle .title{
  width: 582px;
  text-align: left;
  margin-left: 14px;
  font-size: 22px;
  font-weight: 200;
  color: #333;
}
.courseIndex .banner{
  width:960px;
  margin:0 auto;
  position:relative;
  display:flex;
  margin-bottom:40px;
  margin-top: 25px;
}
.courseIndex .left-menu{
  width:165px;;
  height:100%;
  padding-right:17px;
  padding-top:5px;
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
    /*background: url("../../src/assets/imgs/bestclass2.png") no-repeat;*/
    background-size:100% 100%;
    /*padding-top:18% !important;*/
    /*padding:5%;*/
    /*box-sizing: border-box;*/
}
.courseIndex .mask-play .maskImg img{
    width:100%;
    height:100%;
  border-radius: 10px;
}
.courseIndex .mask-play .maskImg p{
  font-weight:bolder;
  font-size:18px;
  color:#000;
  text-align: center;
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
  background: #f1eded;
  padding-left: 12px;
  padding-top: 4px;
  width:156px;
  height: 490px;
  box-shadow: 10px 10px 30px #ccc;
  margin-top:20px;
}
.courseIndex .bb-span{
    color:#222;
    font-size: 18px;
    float: left;
    height: 20px;
    line-height: 20px;
    padding-left: 2px;
    border-left:2px solid #e4393c;
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
  height:510px;
  margin-left: 30px;
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
  height: 100px;
  margin-top:5px;
  display:inline-block;
  margin-right:20px;
  margin-bottom:88px;
  background: #f1eded;
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
    padding:6px;
    display: none;
    position: absolute;
    top:-72px;
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
    font-size: 14px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
.courseIndex .best-class {
  width: 960px;
  margin: 0 auto;
}
</style>
