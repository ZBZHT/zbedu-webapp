<template>
  <div class="newCourse-container">
    <div>
      <navgation-head></navgation-head>
    </div>
    <div class="newCourse-content">
      <el-row>
        <el-col :span="6">
          <el-tree
            node-key="courseId"
            :props="defaultProps"
            :data="data"
            accordion
            :default-expanded-keys="[courseId1,courseId2]"
            highlight-current
            ref="vuetree"
            @node-click="handleNodeClick"></el-tree>
        </el-col>

        <el-col :span="18">
          <!--教学中心-->
          <div>
            <p class="exerP">{{noTree.label}}</p>

            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClickTabs">

              <!--简介-->
              <el-tab-pane label="本节简介" :name="descTab">
                <div class="courseDescribe" >
                  <p class="title">课程简介：</p>
                  <p class="desc">{{ noTree.describe }}</p>
                </div>
              </el-tab-pane>

              <!--教材-->
              <el-tab-pane label="本节教材">
                <div id="teachingBook">
                  <!--<p class="devDownload" v-show="noTree.teachingBook"></p>-->
                  <!--<embed :src="'/resource/pdf/coursePdfData/' + noTree.teachingBook" class="pdf-box"></embed>-->
                  <div id="teachingBookImg" v-for="(item,index) in teachingBooklists">
                    <img class="teachingBookImg" :src="item.img">
                  </div>
                </div>

                <el-button type="info" round @click="teachingBookFullScreen()">全屏显示</el-button>

              </el-tab-pane>

              <!--课件-->
              <el-tab-pane label="教学课件" :name="descTab1">
                <div id="courseppt">
                  <!--<p class="devDownload" v-show="noTree.teachingMaterial"></p>-->
                  <!--<embed :src="'/resource/pdf/coursePdfData/' + noTree.teachingMaterial" class="pdf-box" type="application/pdf"></embed>-->
                  <div class="courseImg" v-for="(item,index) in lists" v-show="index == page-1" @mouseenter="mousewheel(index)">
                    <!--<div class="courseImg" v-for="(item,index) in lists" v-if="index == page-1">-->
                    <img class="coursepptImg" :src="item.img">
                    <div class="pptPrev" @click="newPageUp(index)"></div>
                    <div class="pptNext" @click="newpageDown(index+2)"></div>
                  </div>

                  <ppt-slides
                    :total="total"
                    :size="size"
                    :page="page"
                    :changge="pageFn">
                  </ppt-slides>
                </div>
                <el-button type="info" round @click="appFullScreen(currpage)">全屏显示</el-button>

              </el-tab-pane>

              <!--微课-->
              <el-tab-pane label="教学微课" :name="descTab2">
                <!--<div  v-for="(item,index) in noTree.videoTitle" v-if="index == 0">-->
                <div>
                  <video id="video-box" controls @click="videostop" :src="'http://192.168.2.251:8001/resource/' + this.videoPath + noTree.videoTitle[0].videoTitle">
                    <!--<video id="video-box" controls @click="videostop">-->
                  </video>
                </div>
              </el-tab-pane>

              <!--工作页-->
              <el-tab-pane label="工作页">
                <div id="courseWorkPage">
                  <!--<p class="devDownload" v-show="noTree.workPage"></p>-->
                  <!--<embed :src="'/resource/pdf/coursePdfData/' + noTree.workPage" class="pdf-box"></embed>-->
                  <div id="courseWorkPageImg" v-for="(item,index) in courseWorkPagelists">
                    <img class="teachingBookImg" :src="item.img">
                  </div>
                </div>
                <el-button type="info" round @click="workPageFullScreen()">全屏显示</el-button>

              </el-tab-pane>

              <!--二维动画-->
              <el-tab-pane label="flash动画">
                <!--<div  v-for="(item,index) in noTree.videoTitle" v-if="index == 0">-->
                <div>
                  <video id="flash2d" autoplay controls @click="flash2d" :src="'http://192.168.2.251:8001/resource/' + this.videoPath + noTree.flash2d">
                  </video>
                </div>
              </el-tab-pane>

              <!--课后作业-->
              <el-tab-pane label="课后作业">
                <div class="homework-box">
                  <div class="homework" v-for="(item,index) in homeworkData">
                    <p class="homeworkTitle">{{index + 1}}. {{item.desc}}</p>
                    <p class="homeworkDesc" v-for="(item2,index2) in item.options">{{item2}}</p>
                    <span class="homework_Answer">正确答案：</span>
                    <span class="homeworkAnswer" v-if="appAnswer">{{item.answer}}</span>
                  </div>
                </div>
                <el-button type="success" round @click="appearAnswer()">点击显示正确答案</el-button>
              </el-tab-pane>

              <!--评论-->
              <el-tab-pane label="课程评价">
                <div class="appraise-box">
                  <p class="appraiseTitle">全部评价</p>
                  <hr>
                  <p v-show="appraiseContent.appraiseMsg.length == 0">暂无评价</p>
                  <div class="showAppraise" v-for="(item,index) in appraiseContent.appraiseMsg">
                    <div class="AppraiseMsg">
                      <p class="AppraiseUser">{{item.user}}</p>
                      <div class="AppraiseStar">
                        <el-rate
                          v-model="item.appShowStar"
                          disabled
                          show-score
                          text-color="#ff9900"
                          score-template="{value}">
                        </el-rate>
                      </div>
                    </div>
                    <div class="AppraiseText">
                      {{item.text}}
                    </div>
                    <div class="AppraiseTime">{{item.date}}</div>
                    <hr>

                    <div class="showReplyClass">
                      <div class="showReplyMsg">
                        <p class="AppraiseUser" v-show="appraiseContent.appraiseMsg[index].replyText != '' ">【{{userName}}】老师:</p>
                        <p class="showReplyText">{{item.replyText}}</p>
                        <p class="AppraiseTime">{{item.replyDate}}</p>
                      </div>
                      <div class="replyEventButtons" v-show="userSession == 1">
                        <el-button size="small" type="primary" @click="showReply(index)">
                          回复
                        </el-button>
                        <div class="replyEvent" v-show="appraiseContent.appraiseMsg[index].replyText != '' ">
                          <!--<el-button size="small" type="primary" @click="showReply(index)">-->
                          <!--修改回复-->
                          <!--</el-button>-->
                          <el-button size="small" @click="deleteReply(index)">
                            删除回复
                          </el-button>
                        </div>
                      </div>

                      <div v-show="replyShow == index">
                        <textarea autofocus class="replyText" type="text" v-model="replyText" />
                        <div class="replyButtons">
                          <el-button type="success" size="small" round @click="submitReply(index)">确定</el-button>
                          <el-button size="small" round @click="cancelReply(index)">取消</el-button>
                        </div>

                      </div>

                    </div>
                  </div>

                  <p class="appraiseTitle">我要评价</p>
                  <div class="IwantAppraise">

                    <div class="block">
                      <span class="demonstration">综合评价</span>
                      <el-rate
                        v-model="appraiseStar.value1"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                      </el-rate>
                    </div>
                    <textarea class="AppraiseNowText" type="text" v-model="text"/>
                  </div>

                  <div class="shopList">
                    <div class="block">
                      <span class="demonstration">教学内容</span>
                      <el-rate
                        v-model="appraiseStar.value2"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                      </el-rate>
                    </div>
                    <div class="block">
                      <span class="demonstration">任课老师</span>
                      <el-rate
                        v-model="appraiseStar.value3"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                      </el-rate>
                    </div>

                  </div>

                  <el-button type="success" round @click="submitComments()">提交评论</el-button>
                </div>
              </el-tab-pane>
            </el-tabs>


          </div>
        </el-col>
      </el-row>
    </div>

    <div class="footer">
      <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import navgationHead from '@/components/common/navgationHead'
  import pptSlides from '@/components/courseTree/pptSlides'
  import footFooter from '@/components/common/footFooter'
  import EventBus from '../assets/js/EventBus';
  import core from '../assets/js/core.js';

  var contentSlides = pptSlides;
  export default {
    name: 'newCourse',
    data () {
      return {
        data:[],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        currentIndex: 0,
        currentCourseMsg:'',
        currentCourseTitle:'',
        aa:'',
        commentAllObj:[],
        commentArr:[],
        replyArr:[],
        replyToReplyArr:[],
        currentMsg:'',
        appraiseMsg: '全部评价',
        appraiseStar:{
          value1:null,
          value2:null,
          value3:null,
          value:7
        },
        appraiseContent:{
          title:[],
          appraiseMsg:{}
        },
        currentdate: '',
        isAppearCommentBox: false,
        isAppearCommentBox1: false,
        text:'',
        replyText:'',
        replyTime:'',
        url:'',
        appAnswer:false,
        noTree11:'',
        courseId1:'',
        courseId2:'',
        checkArr:[],
        userId:this.$store.state.userID,
        userName:this.$store.state.username,
        userType:this.$store.state.userType,
        userSession:0,
        replyShow:-1,
        showReplyText:-1,
        keyId:'',
        activeName: '',
        descTab:'0',
        descTab1:'2',
        descTab2:'3',
        slides: [],
        styleObject: {
          width: '100%',
          height: '100%'
        },
        slidesLength:'',
        total:'',//总信息数
        size:1,//每页显示信息个数不传默认6
        page:1,//当前页码,
        teachingBooklists: [],
        courseWorkPagelists: [],
        lists:[],
        scrolled: false,
        moutedCorusePath:[],
        moutedHomeworkPath:[],
        courseButtonShow:true,
        currpage:0,
        homeworkData:[],
        videoPath:'',
        currCourse:[],
        appraiseIndex:[]
      }
    },
    computed:{
      noTree(){
        return this.$store.state.noTree;
      },
      noTree1(){
        this.noTree11 = this.$store.state.noTree1;

        return this.$store.state.noTree1;
      },
      currentTitle(){
        // for (var  i= 0; i< this.$store.state.course.children.length; i++){
        // console.log(this.$store.state.course.children[i])
        if (this.$store.state.course.children[0].describe){
          this.aa = this.$store.state.course.children[0].title
          // console.log(this.aa)
          // console.log('======')
        }else {
          this.aa = this.$store.state.course.children[0].children[0].title
          // console.log(this.aa)
        }
        // }

        return this.$store.state.course;
      },
      videoTitle(){
        return this.$store.state.noTree.videoTitle;
      }
    },
    created(){

//     var _this = this
//        this.$nextTick(function () {
//            // 直接调用
//            _this.refRecursion(100, 1)
//        })
    },
    mounted(){
      if(this.$store.state.activeName === 3){
        this.activeName = this.descTab2;
//        console.log(this.activeName)
      }else if(this.$store.state.activeName === 2){
        this.activeName = this.descTab1;
//        console.log(this.activeName)
      }
      //判断当前是否是老师
      //console.log(this.userType)
      if(this.userType == 'EA' || this.userType == 'T'){
        this.userSession = 1;
        //console.log(this.userSession)
      }else{

      }

      // var scrollbox = document.querySelector(".courseImg");
      // console.log(document.querySelector(".courseImg"))
      // window.addEventListener('scroll', this.handleScroll);

      //获取树形数据
      this.data = this.$store.state.newBannerLeft;

//      axios.get("/readJson/bannerLeftData",{
//        params:{
//             user:234
//        }

//      axios.post('/teacherCMS/getCenterTree', {
//        data: {
//          userID: this.userID,
//          userType: this.userType,
//        }
//      }).then((res)=>{
//        console.log(res.data[0].children)
//        console.log(res.data[0].children[0])
//          this.data = res.data[0].children[0].children;
//
////        var _this = this
////        this.$nextTick(function () {
////        _this.refRecursion(100, 1)
////        })
//      }).catch(function(error){
//          console.log("error init." + error)
//      });

      setTimeout(() => {
        this.$refs.vuetree.setCurrentKey(this.keyId)
      }, 20)

      //PPT页数
      this.total = this.lists.length;
      //从courseIndex页传值并默认展开
      //  console.log("sjsjs");
      //  console.log(this.$store.state.noTree1.courseId);
      var data = this.$store.state.noTree1;
      var id = this.$store.state.noTree1.courseId;
      if(id == 100 || id == 200 || id == 300 || id == 400 || id == 500 || id == 600 || id == 700){

        if(id == 100){
          this.courseId1 = id;
          this.courseId2 = 111;
          this.keyId = 1111;
          this.$store.commit('noTreeTitle',data.children[0].children[0].children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0].children[0].children[0])
          this.findParent(id);
        }else if(id == 200){
          this.courseId1 = id;
          this.courseId2 = 211;
          this.keyId = 211;
          this.$store.commit('noTreeTitle',data.children[0].children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0].children[0])
          this.findParent(id);
        }else if(id == 300){
          this.courseId1 = id;
          this.courseId2 = 311;
          this.keyId = 311;
          this.$store.commit('noTreeTitle',data.children[0].children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0].children[0])
          this.findParent(id);
        }else if(id == 400){
          this.courseId1 = id;
          this.courseId2 = 411;
          this.keyId = 411;
          this.$store.commit('noTreeTitle',data.children[0].children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0].children[0])
          this.findParent(id);
        }else if(id == 500){
          this.courseId1 = id;
          this.keyId = 510;
          this.$store.commit('noTreeTitle',data.children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0])
          this.findParent(id);
        }else if(id == 600){
          this.courseId1 = id;
          this.keyId = 610;
          this.$store.commit('noTreeTitle',data.children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0])
          this.findParent(id);
        }else if(id == 700){
          this.courseId1 = id;
          this.courseId2 = 711;
          this.keyId = 711;
          this.$store.commit('noTreeTitle',data.children[0].children[0]);
          this.findParent(id);
        }
      }else if(id > 100 && id < 200){
        if(id == 110){
          this.courseId1 = 100;
          this.courseId2 = 111;
          this.keyId = 1111;
          this.$store.commit('noTreeTitle',data.children[0].children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0].children[0])
          this.findParent(id);
        }else if(id > 110 && id < 120){
          this.courseId1 = 100;
          this.courseId2 = id;
          this.keyId = id.toString()+1;
          this.$store.commit('noTreeTitle',data.children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0])
          this.findParent(id);
        }else if(id > 120 && id < 130){
          this.courseId1 = 100;
          this.courseId2 = id;
          this.keyId = id.toString()+1;
          this.$store.commit('noTreeTitle',data.children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0])
          this.findParent(id);
        }else if(id == 120){
          this.courseId1 = 100;
          this.courseId2 = 121;
          this.keyId = 1211;
          this.$store.commit('noTreeTitle',data.children[0].children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0].children[0])
          this.findParent(id);
        }
      }else if(id > 200 && id < 300){
        if(id == 210 || id == 220 || id == 230 || id == 240 || id == 250 || id == 260){
          this.courseId1 = 200;
          this.courseId2 = id;
          this.keyId = id + 1;
          this.$store.commit('noTreeTitle',data.children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0])
          this.findParent(id);
        }else{
          this.courseId1 = 200;
          this.courseId2 = id;
          this.keyId = id;
          this.$store.commit('noTreeTitle',data);
          //添加item至我的足迹请求
          this.myFootPrint(data)
          this.findParent(id);
        }
      }else if(id > 300 && id < 400){
        if(id == 310 || id == 320 || id == 330 || id == 340 || id == 350){
          this.courseId1 = 300;
          this.courseId2 = id;
          this.keyId = id + 1;
          this.$store.commit('noTreeTitle',data.children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0])
          this.findParent(id);
        }else{
          this.courseId1 = 300;
          this.courseId2 = id;
          this.keyId = id;
          this.$store.commit('noTreeTitle',data);
          //添加item至我的足迹请求
          this.myFootPrint(data)
        }
      }else if(id > 400 && id < 500){
        if(id == 410 || id == 420 || id == 430 || id == 440 || id == 450 || id == 460){
          this.courseId1 = 400;
          this.courseId2 = id;
          this.keyId = id + 1;
          this.$store.commit('noTreeTitle',data.children[0]);
          //添加item至我的足迹请求
          this.myFootPrint(data.children[0])
          this.findParent(id);
        }else{
          this.courseId1 = 400;
          this.courseId2 = id;
          this.keyId = id;
          this.$store.commit('noTreeTitle',data);
          //添加item至我的足迹请求
          this.myFootPrint(data)
          this.findParent(id);
        }
      }else if(id > 500 && id < 600){
        this.courseId1 = 500;
        this.courseId2 = id;
        this.keyId = id;
        this.$store.commit('noTreeTitle',data);
        //添加item至我的足迹请求
          this.myFootPrint(data)
        this.findParent(id);
      }else if(id > 600 && id < 700){
        this.courseId1 = 600;
        this.courseId2 = id;
        this.keyId = id;
        this.$store.commit('noTreeTitle',data);
        //添加item至我的足迹请求
          this.myFootPrint(data)
        this.findParent(id);
      }else if(id > 700 && id < 800){
        if(id == 710 || id == 720 || id == 730 || id == 740 || id == 750 || id == 760 || id == 770 || id == 780 || id == 790){
          this.courseId1 = 700;
          this.courseId2 = id;
          var nowId = parseInt(id) + 1
          this.keyId = nowId;
          this.$store.commit('noTreeTitle',data.children[0]);
          this.findParent(id);
        }else{
          this.courseId1 = 700;
          this.courseId2 = id;
          this.keyId = id;
          this.$store.commit('noTreeTitle',data);
          this.findParent(id);
        }
      }else if(id > 1110 && id < 1300){
        this.courseId1 = 100;
        this.courseId2 = id;
        this.keyId = id;
        this.findParent(id);
      }

      //评论一系列
      this.user = this.$store.state.username;
      // console.log(this.user)
      this.getComment(this.moutedHomeworkPath);
    },
    methods:{
      //获取评论请求
      getComment(title){
        this.appraiseIndex = [];
        this.appraiseContent.appraiseMsg = this.appraiseIndex;
        axios.get("/readComments/getComment",{
          params:{
            user: this.userName,
            title: title,
          }
        }).then((res)=>{
          console.log(res.data.result);
          this.appraiseIndex = res.data.result.appraiseMsg;
          this.appraiseContent.appraiseMsg = this.appraiseIndex;
          console.log(this.appraiseIndex)
        }).catch(function(error){
          console.log("评论请求错误")
        });
      },
      //切换标签暂停视频
      handleClickTabs(tab){
        //console.log(tab);
        //console.log(tab._data)
        if(tab._data.index == 3){
          //console.log("我是微课");
          //this.videostop();
        }else{
          //console.log("爱谁谁是");
          this.clickTabsStop();
        }
        if(tab._data.index == 5){
          //console.log("我是微课");
          //this.videostop();
        }else{
          //console.log("爱谁谁是");
          this.clickTabsFlashStop();
        }
      },
      //进入页面时的请求地址
      findParent(id){
        var data = this.$store.state.noTree1;
        var coursePath = [];
        var homeworkPath = [];
        id = id.toString();
        if(id == 100){
          console.log(data.children[0].children[0].children)
          homeworkPath.push(data.label);
          homeworkPath.push(data.children[0].label);
          homeworkPath.push(data.children[0].children[0].label);
          homeworkPath.push(data.children[0].children[0].children[0].label);
          coursePath.push(data.label);
          coursePath.push(data.children[0].label);
          coursePath.push(data.children[0].children[0].label);
          coursePath.push(data.children[0].children[0].children[0].label);
          coursePath.push(this.$store.state.noTree.teachingMaterial);
        }else if(id == 200 || id == 300 || id == 400){
          coursePath.push(data.label);
          coursePath.push(data.children[0].label);
          coursePath.push(data.children[0].children[0].label);
          homeworkPath = coursePath;
        }else if(id == 500 || id == 600){
          coursePath.push(data.label);
          coursePath.push(data.children[0].label);
          homeworkPath = coursePath;
        }else if(id > 1110 && id < 1200){
          if(id >= 1111 && id <1120){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[0].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[0].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1120 && id <1130){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[1].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[1].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1130 && id <1140){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[2].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[2].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1140 && id <1150){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[3].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[3].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1150 && id <1160){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[4].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[4].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1160 && id <1170){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[5].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[5].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1170 && id <1180){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[6].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[6].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1180 && id <1190){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[7].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[7].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id >= 1190 && id <120){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(this.data[0].children[0].children[8].label);
            homeworkPath.push(data.label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(this.data[0].children[0].children[8].label);
            coursePath.push(data.label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }
        }else if(id > 100 && id < 200){
          if(id == 110){
            //console.log(this.data[4].label)
            //console.log(this.data[3].children[1].label)
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(data.label);
            homeworkPath.push(data.children[0].label);
            homeworkPath.push(data.children[0].children[0].label);
            coursePath.push(this.data[0].label);
            coursePath.push(data.label);
            coursePath.push(data.children[0].label);
            coursePath.push(data.children[0].children[0].label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id > 110 && id < 120){
            homeworkPath.push(this.data[0].label);
            homeworkPath.push(this.data[0].children[0].label);
            homeworkPath.push(data.label);
            homeworkPath.push(data.children[0].label);
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[0].label);
            coursePath.push(data.label);
            coursePath.push(data.children[0].label);
            coursePath.push(this.$store.state.noTree.teachingMaterial);
          }else if(id > 120 && id < 130){
            coursePath.push(this.data[0].label);
            coursePath.push(this.data[0].children[1].label);
            coursePath.push(data.label);
            coursePath.push(data.children[0].label);
            homeworkPath = coursePath;
          }else if(id == 120){
            coursePath.push(this.data[0].label);
            coursePath.push(data.label);
            coursePath.push(data.children[0].label);
            coursePath.push(data.children[0].children[0].label);
            homeworkPath = coursePath;
          }
        }else if(id > 200 && id < 300){
          if(id == 210 || id == 220 || id == 230 || id == 240 || id == 250 || id == 260){
            coursePath.push(this.data[1].label);
            coursePath.push(data.label);
            coursePath.push(data.children[0].label);
            homeworkPath = coursePath;
          }else if(id > 210 && id < 220){
            coursePath.push(this.data[1].label);
            coursePath.push(this.data[1].children[0].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 220 && id < 230){
            coursePath.push(this.data[1].label);
            coursePath.push(this.data[1].children[1].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 230 && id < 240){
            coursePath.push(this.data[1].label);
            coursePath.push(this.data[1].children[2].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 240 && id < 250){
            coursePath.push(this.data[1].label);
            coursePath.push(this.data[1].children[3].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 250 && id < 260){
            coursePath.push(this.data[1].label);
            coursePath.push(this.data[1].children[4].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 260 && id < 270){
            coursePath.push(this.data[1].label);
            coursePath.push(this.data[1].children[5].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }
        }else if(id > 300 && id < 400){
          if(id == 310 || id == 320 || id == 330 || id == 340 || id == 350){
            coursePath.push(this.data[2].label);
            coursePath.push(data.label);
            coursePath.push(data.children[0].label);
            homeworkPath = coursePath;
          }else if(id > 310 && id < 320){
            coursePath.push(this.data[2].label);
            coursePath.push(this.data[2].children[0].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 320 && id < 330){
            coursePath.push(this.data[2].label);
            coursePath.push(this.data[2].children[1].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 330 && id < 340){
            coursePath.push(this.data[2].label);
            coursePath.push(this.data[2].children[2].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 340 && id < 350){
            coursePath.push(this.data[2].label);
            coursePath.push(this.data[2].children[3].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 350 && id < 360){
            coursePath.push(this.data[2].label);
            coursePath.push(this.data[2].children[4].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }
        }else if(id > 400 && id < 500){
          if(id == 410 || id == 420 || id == 430 || id == 440 || id == 450 || id == 460){
            coursePath.push(this.data[3].label);
            coursePath.push(data.label);
            coursePath.push(data.children[0].label);
            homeworkPath = coursePath;
          }else if(id > 410 && id < 420){
            coursePath.push(this.data[3].label);
            coursePath.push(this.data[3].children[0].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 420 && id < 430){
            coursePath.push(this.data[3].label);
            coursePath.push(this.data[3].children[1].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 430 && id < 440){
            coursePath.push(this.data[3].label);
            coursePath.push(this.data[3].children[2].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 440 && id < 450){
            coursePath.push(this.data[3].label);
            coursePath.push(this.data[3].children[3].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 450 && id < 460){
            coursePath.push(this.data[3].label);
            coursePath.push(this.data[3].children[4].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 460 && id < 470){
            coursePath.push(this.data[3].label);
            coursePath.push(this.data[3].children[5].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }
        }else if(id > 500 && id < 600){
          coursePath.push(this.data[4].label);
          coursePath.push(data.label);
          homeworkPath = coursePath;
        }else if(id > 600 && id < 700){
          coursePath.push(this.data[5].label);
          coursePath.push(data.label);
          homeworkPath = coursePath;
        }else if(id >= 700 && id < 800){
          var allData = this.data;
          //console.log(allData)
          if(id == 700 || id == 710 || id == 720 || id == 730 || id == 740 || id == 750 || id == 760 || id == 770 || id == 780 || id == 790){
            if(id == 700){
              coursePath.push(data.children[0].label);
              coursePath.push(data.children[0].children[0].label);
              homeworkPath = coursePath;
              //console.log("222")
              //console.log(coursePath)
            }else{
              coursePath.push(data.label);
              coursePath.push(data.children[0].label);
              homeworkPath = coursePath;
            }
          }else if(id > 710 && id < 720){
            coursePath.push(allData[6].children[0].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
            //console.log(homeworkPath)
            //console.log(coursePath)
          }else if(id > 720 && id < 730){
            coursePath.push(allData[6].children[1].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 730 && id < 740){
            coursePath.push(allData[6].children[2].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 740 && id < 750){
            coursePath.push(allData[6].children[3].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 750 && id < 760){
            coursePath.push(allData[6].children[4].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 760 && id < 770){
            coursePath.push(allData[6].children[5].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 770 && id < 780){
            coursePath.push(allData[6].children[6].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 780 && id < 790){
            coursePath.push(allData[6].children[7].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }else if(id > 790 && id < 800){
            coursePath.push(allData[6].children[8].label);
            coursePath.push(data.label);
            homeworkPath = coursePath;
          }
        }
        //console.log(id)
        this.moutedCorusePath = coursePath;
        this.moutedHomeworkPath = homeworkPath;
        this.currCourse = this.moutedHomeworkPath;
        coursePath = [];
        if(this.$store.state.noTree1.courseId >= 700 && this.$store.state.noTree1.courseId < 800){
          //console.log(this.moutedCorusePath)
          //console.log(coursePath)
          homeworkPath = [];
          coursePath = coursePath + '我的课堂' + '/' + this.$store.state.username + '/';
          //    console.log(this.moutedCorusePath)
          for(var i = 0; i < this.moutedCorusePath.length; i++){
            coursePath = coursePath + this.moutedCorusePath[i] + '/';
          }
          this.videoPath = coursePath;
          coursePath = coursePath + this.$store.state.noTree.teachingMaterial;
          homeworkPath.push('我的课堂');
          homeworkPath.push(this.$store.state.username);
          for(var i = 0; i < this.moutedHomeworkPath.length; i++){
            //console.log(this.moutedHomeworkPath)
            homeworkPath.push(this.moutedHomeworkPath[i]);
          }
          homeworkPath.push(this.$store.state.noTree.teachingMaterial)
        }else{
          for(var i = 0; i < this.moutedCorusePath.length; i++){
            coursePath = coursePath + this.moutedCorusePath[i] + '/';
          }
          if((id > 1110 && id < 1200) || (id >= 100 && id < 200) || (id > 110 && id < 120) || (id >= 700 && id < 800)){
            for(var i = 0; i < this.moutedCorusePath.length - 1; i++){
              this.videoPath = this.videoPath + this.moutedCorusePath[i] + '/';
            }
          }else{
            for(var i = 0; i < this.moutedCorusePath.length; i++){
              this.videoPath = this.videoPath + this.moutedCorusePath[i] + '/';
            }
          }
        }

        console.log(coursePath)
        //console.log(this.videoPath + this.$store.state.noTree.videoTitle[0].videoTitle)
        //请求PPT
        axios.post("/readResource/getPPT",{
          data:{
            userId:this.userId,
            fileName: coursePath
          }
        }).then((res)=>{
          //console.log(res.data.result.textBookList);
          this.lists = res.data.result.courseList;
          this.total = this.lists.length;
          this.teachingBooklists = res.data.result.textBookList;
          this.courseWorkPagelists = res.data.result.workPageList;
        }).catch(function(error){
          console.log("error init." + error)
        });

        //请求课后作业
        axios.get("/readTestQuestion/getHomeWork",{
          params:{
            userId:this.userId,
            checkArr:homeworkPath
          }
        }).then((res)=>{
          //console.log(res.data.result)
          if(res.data.result){
            //  console.log("111"+res.data.result)
            this.homeworkData = res.data.result
            //  this.$store.commit('homework',res.data.result);
          }else{
            //  console.log("222"+res.data.result)
            //  this.$store.commit('homework',[]);
            this.homeworkData = []
          }
          //console.log(this.homeworkData)
        }).catch(function(error){
          console.log("error init." + error)
        });
        //console.log(homeworkPath)
        //console.log(coursePath)
      },
      //监听scroll事件(没用到)
      handleScroll () {
        this.scrolled = window.scrollY;
        alert(this.scrolled)
      },
      //滚轮键盘啥啥
      mousewheel(val){
        var _this = this;
        var isFull = document.fullscreenElement    ||
          document.msFullscreenElement  ||
          document.mozFullScreenElement ||
          document.webkitFullscreenElement
        //console.log(isFull)
        this.currpage = val;
        if(isFull === null){
          document.removeEventListener('DOMMouseScroll',scrollFunc,false);
          window.onmousewheel = document.onmousewheel = null;

          //console.log("buquanping");
        }else{
          //console.log("quanping");
          document.addEventListener("keydown",function(){
            switch(event.keyCode){
              // ←
              case 37:
                _this.newPageUp(val);
                break;
              // →
              case 39:
                _this.newpageDown(val + 2)
                break;
              // ↑
              case 38:
                _this.newPageUp(val);
                break;
              // ↓
              case 40:
                _this.newpageDown(val + 2)
                break;
              // 回车
              case 13:
                _this.newpageDown(val + 2)
                break;
            }
          });

          var scrollFunc = function (e) {

            var direct = 0;
            e = e || window.event;
            if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
              if (e.wheelDelta > 0) { //当滑轮向上滚动时
                //    alert("滑轮向上滚动");
                _this.newPageUp(val);
              }
              if (e.wheelDelta < 0) { //当滑轮向下滚动时
                //    alert("滑轮向下滚动");
                _this.newpageDown(val + 2)
              }
            } else if (e.detail) {  //Firefox滑轮事件
              if (e.detail> 0) { //当滑轮向上滚动时
                //    alert("滑轮向上滚动");
                _this.newPageUp(val);
              }
              if (e.detail< 0) { //当滑轮向下滚动时
                //    alert("滑轮向下滚动");
                _this.newpageDown(val + 2)
              }
            }
            //   ScrollText(direct);
          }
          //给页面绑定滑轮滚动事件
          if (document.addEventListener) {
            document.addEventListener('DOMMouseScroll', scrollFunc, false);
          }
          //滚动滑轮触发scrollFunc方法
          window.onmousewheel = document.onmousewheel = scrollFunc;
        }

      },

      //点击左侧向上翻页
      newPageUp(val){
        if(val > 0 && val <= this.lists.length){
          EventBus.$emit('newPageUp',this.pageFn(val));
          contentSlides.methods.pageUp(1);
          contentSlides.methods.jump(val);
        }
      },
      //点击右侧向下翻页
      newpageDown(val){
        if(val > 0 && val <= this.lists.length){
          EventBus.$emit('newpageDown',this.pageFn(val));
          contentSlides.methods.pageDown(1);
          contentSlides.methods.jump(val);
        }else{

        }
      },
      //PPT翻页
      pageFn(val){
        this.page=val;
        //  console.log(val);
      },
      //递归方法默认标红实验
      refRecursion(key, time){
        console.log(time)
        if(time > 10){
          throw new Error('没有找到VueTree')
        }
        var tree = this.$refs.vueTree;
        if(tree){
          tree.setCurrentKey(key)
        }else{
          this.refRecursion(key, time + 1)
        }

      },


      //从树形传值到tabs
      handleNodeClick(data,node) {
        this.appAnswer = false;
        //  console.log(data);


//      var now = this.$store.state.noTree.videoTitle[0].videoTitle;
//      console.log(now)
//      var url = 'http://http://127.0.0.1:8080/resource/video/courseVideoData/'+now;
//      console.log(url)
        var video = document.querySelector('video');
//      fetch(url)
//          .then(response => response.blob())
//          .then(response => {
//              const url = URL.createObjectURL(response)
//              video.onload = () => URL.revokeObjectURL(response)
//              video.src = url
//          })


//        var video = document.getElementById("video");
//        window.URL = window.URL || window.webkitURL;
//        var xhr = new XMLHttpRequest();
//        xhr.open("GET", url, true);
//
//        xhr.responseType = "blob";
//        xhr.onload = function() {
//          if (this.status == 200) {
//                var blob = this.response;
//                video.onload = function(e) {
//                    window.URL.revokeObjectURL(video.src);
//                };
//                video.src = window.URL.createObjectURL(blob);
//              }
//        }
//        xhr.send();

        //  console.log(node.data.label);
        //  console.log(node.parent.label);
        //  console.log(node.parent.parent.label);
        //  console.log(node.parent.parent.parent.label);

        for(var i = 0; i < document.getElementsByClassName("coursepptImg").length; i++){
          document.getElementsByClassName("coursepptImg")[i].style.height = '100%';
          document.getElementsByClassName("coursepptImg")[i].style.width = '100%';
        }
        this.homeworkData = [];
        this.courseId1 = '';
        this.courseId2 = '';

        if(data.children){

        }else{

          //点击新课程让课件跳转到第一页
          EventBus.$emit('newPageUp',this.pageFn(1));
          contentSlides.methods.pageUp(1);
          contentSlides.methods.jump(1);
          //点击新课程tabs标签默认第一个
          this.activeName = this.descTab;
          this.$store.commit('activeName','');
          console.log(this.activeName)
          //请求课件和课后作业给后台发送的数组
          this.checkArr = [];
          if(node.parent.label == '汽车空调' || node.parent.label == '汽车维护'){
            this.checkArr.push(node.parent.label)
            this.checkArr.push(node.label)
          }else if(node.parent.parent.parent.label == this.data[0].label){
            this.checkArr.push(node.parent.parent.parent.label)
            this.checkArr.push(node.parent.parent.label)
            this.checkArr.push(node.parent.label)
            this.checkArr.push(node.label)
          }else if(node.parent.parent.parent){
            this.checkArr.push(node.parent.parent.label)
            this.checkArr.push(node.parent.label)
            this.checkArr.push(node.label)
          }

          //console.log(this.checkArr);
          //点击新课程存本地的资源
          this.$store.commit('noTreeTitle',data);
          this.$store.commit('noTreeTitle1',data);
          //添加item至我的足迹请求
          this.myFootPrint(data)
          //请求课后作业
          var checkArrHomeWork = this.checkArr;
          if(this.$store.state.noTree1.courseId >= 700 && this.$store.state.noTree1.courseId <= 800){
            checkArrHomeWork = [];
            checkArrHomeWork.push('我的课堂');
            checkArrHomeWork.push(this.$store.state.username);
            for(var i = 1; i < this.checkArr.length; i++){
              checkArrHomeWork.push(this.checkArr[i]);
            }
            checkArrHomeWork.push(this.$store.state.noTree.teachingMaterial);
          }else{

          }
          axios.get("/readTestQuestion/getHomeWork",{
            params:{
              userId:this.userId,
              checkArr:checkArrHomeWork
            }
          }).then((res)=>{
            //console.log(res.data.result)
            //评论的title
            this.currCourse = checkArrHomeWork;
            this.appraiseContent.title = this.currCourse;

            if(res.data.result){
              //  console.log("1111")
              //  this.$store.commit('homework',res.data.result);
              this.homeworkData = res.data.result
              console.log(this.homeworkData)
            }else{
              //  console.log(res.data.result)
              //  this.$store.commit('homework',[]);
              this.homeworkData = [];
              // console.log(this.homeworkData)
            }
            //console.log(this.homeworkData)
          }).catch(function(error){
            console.log("error init." + error)
          });

          //拼接地址
          let fileNamePath = '';
          if(this.$store.state.noTree1.courseId > 1110 && this.$store.state.noTree1.courseId < 1200){
            for(var i = 0; i < this.checkArr.length; i++){
              fileNamePath = fileNamePath + this.checkArr[i] + '/';
            }
            this.videoPath = fileNamePath;
            fileNamePath = fileNamePath + this.$store.state.noTree.teachingMaterial;
          }else if(this.$store.state.noTree1.courseId >= 700 && this.$store.state.noTree1.courseId <= 800){
            for(var i = 0; i < this.checkArr.length; i++){
              if(i === 0){
                fileNamePath = fileNamePath + '我的课堂' + '/' + this.$store.state.username + '/';
              }else{
                fileNamePath = fileNamePath + this.checkArr[i] + '/';
              }
            }
            this.videoPath = fileNamePath;
            fileNamePath = fileNamePath + this.$store.state.noTree.teachingMaterial;
          }else{
            for(var i = 0; i < this.checkArr.length; i++){
              fileNamePath = fileNamePath + this.checkArr[i] + '/';
            }
            this.videoPath = fileNamePath;
          }
          // console.log(this.$store.state.noTree1.courseId);
          //console.log(fileNamePath);
          //请求课件
          axios.post("/readResource/getPPT",{
            data:{
              userId:this.userId,
              fileName: fileNamePath
            }
          }).then((res)=>{
            //console.log(res.data.result.textBookList);
            this.lists = res.data.result.courseList;
            this.total = this.lists.length;
            this.teachingBooklists = res.data.result.textBookList;
            this.courseWorkPagelists = res.data.result.workPageList;
          }).catch(function(error){
            console.log("error init." + error)
          });
          this.getComment(checkArrHomeWork);
        }
      },
      //点击显示回复
      showReply(index){
        this.replyShow = index;
      },
      //取消回复
      cancelReply(){
        this.replyShow = -1;
        this.replyText = '';
      },
      //删除回复
      deleteReply(index){
        this.appraiseContent.appraiseMsg[index].replyText = '';
        this.appraiseContent.appraiseMsg[index].replyName = '';
        this.appraiseContent.appraiseMsg[index].replyDate = '';
        this.appraiseUpdate();
      },
      //评论的更新请求
      appraiseUpdate(){
        axios({
          method:'get',
          url:"/readComments/updateComment",
          params:{
            appraiseContent:this.appraiseContent
          }
        }).then(function (res) {
          //  console.log(res.data.result)
        })
      },
      //提交回复
      submitReply(index){
        if(this.user === ''){
          var con = confirm("请登录");
          if(con == true){
            this.$router.push({path: '/loginPage'})
          }else{
            return false;
          }
        }else {
          if (this.replyText === '') {
            alert('回复不能为空')
          } else {
            //console.log(this.appraiseContent[index])
            this.appraiseContent.appraiseMsg[index].replyText = this.replyText;
            this.appraiseContent.appraiseMsg[index].replyName = this.userName;
            this.appraiseContent.appraiseMsg[index].replyDate = core.formatDate("yyyy-MM-dd hh:mm:ss", new Date());


            //console.log(this.appraiseContent)
            this.appraiseUpdate();
            this.replyText = '';
          }
        }
        this.showReplyText = index;
        this.replyShow = -1;
      },
      //提交评论
      submitComments () {
        //this.appraiseIndex = [];
        if(this.user === ''){
          var con = confirm("请登录");
          if(con == true){
            this.$router.push({path: '/loginPage'})
          }else{
            return false;
          }
        }else {
          if (this.text === '') {
            alert('评论不能为空')
          } else {
            //console.log(currCourse)
            if(this.appraiseStar.value1 == null){
              this.appraiseStar.value1 = 0;
            }else{

            }
            this.appraiseIndex.unshift({
              user:this.userName,
              appShowStar:this.appraiseStar.value1,
              text:this.text,
              date:core.formatDate("yyyy-MM-dd hh:mm:ss", new Date()),
              replyText:'',
              replyName:'',
              replyDate:'',
              contentAppraise:this.appraiseStar.value2,
              teacherAppraise:this.appraiseStar.value3
            })
            this.appraiseContent.title = this.currCourse;
            this.appraiseContent.appraiseMsg = this.appraiseIndex;

            this.appraiseStar.value1 = null;
            this.appraiseStar.value2 = null;
            this.appraiseStar.value3 = null;

            //console.log(this.appraiseContent)
            this.appraiseUpdate();
            this.text = '';
          }
        }
      },
      //点击微课视频暂停开始
      videostop(){
        var myVideo =document.getElementById("video-box");
        if (myVideo.paused){
          myVideo.play();
        }else {
          myVideo.pause();
        }
      },
      //暂停视频
      clickTabsStop(){
        var myVideo = document.getElementById("video-box");
        myVideo.pause();
      },
      //开始视频
      clickTabsStart(){
        var myVideo =document.getElementById("video-box");
        myVideo.play();
      },
      //暂停二维动画
      clickTabsFlashStop(){
        var myVideo =document.getElementById("flash2d");
        myVideo.pause();
      },
      //点击flash视频暂停开始
      flash2d(){
        var myVideo =document.getElementById("flash2d");
        if (myVideo.paused){
          myVideo.play()
        }else {
          myVideo.pause()
        }
      },
      //点击显示正确答案
      appearAnswer(){
        this.appAnswer = true;
      },
      //点击显示课件全屏
      appFullScreen(val){
        var elem = document.getElementById("courseppt");
        console.log(elem);
        this.requestFullScreen(elem,val);
      },
      workPageFullScreen(){
        var elem = document.getElementById("courseWorkPage");
        console.log(elem);
        this.requestFullScreen(elem);
      },
      teachingBookFullScreen(){
        var elem = document.getElementById("teachingBook");
        console.log(elem);
        this.requestFullScreen(elem);
      },
      //类似F11的全屏
      requestFullScreen(element,val) {

        //  console.log(document.getElementsByClassName("coursepptImg")[0])
        //  console.log(val)
        //  console.log(pptHeight)
        //  console.log(pptWidth)
        //  console.log(innerHeight)
        //  console.log(innerWidth)
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys(122);
          }
        }
        //console.log("2221")
        if(element == document.getElementById("courseppt")){
          var pptHeight = document.getElementsByClassName("coursepptImg")[val].offsetHeight;
          var pptWidth = document.getElementsByClassName("coursepptImg")[val].offsetWidth;
          var innerHeight = window.innerHeight;
          var innerWidth = window.innerWidth;
          if(1.7 < pptWidth / pptHeight){
            //  console.log(pptWidth / pptHeight)
            element.style.width = '100%';
            element.style.height = "auto";
          }else if(this.$store.state.noTree1.courseId >= 700 && this.$store.state.noTree1.courseId < 800 && 1.7 >= pptWidth / pptHeight){
            //  console.log(1.7)
            var realHeight = innerHeight + 50;
            for(var i = 0; i < document.getElementsByClassName("coursepptImg").length; i++){
              document.getElementsByClassName("coursepptImg")[i].style.height = realHeight + 'px';
              document.getElementsByClassName("coursepptImg")[i].style.width = "auto";
            }

          }
        }
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
          console.log(res.data)
          if (res.data.code === 0){
  //            this.addSuccess('更新成功');
          }else if (res.data.code === 1){
  //          this.$message.error('更新失败');
          }
        });
        //为热门课程给每个课程计数
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


    },
    components:{navgationHead,pptSlides,footFooter}
  }
</script>

<style>
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
  .newCourse-content .newCourse-container{
    min-width:960px;
  }
  .newCourse-content{
    width:100%;
    margin:0 auto;
    margin-top:6px;
    margin-bottom:80px;
  }
  .newCourse-content .courseDescribe{
    width:80%;
    height:400px;
    margin:0 auto;
    margin-top:40px;
    border-radius:15px;
    background:rgb(210,210,210);
    box-shadow: 3px -3px 30px #000;
    padding:25px;
    box-sizing:border-box;
    text-align:left;
  }
  .newCourse-content #teachingBook{
    width:80%;
    margin:0 auto;
    height:700px;
    overflow:auto;
    background:rgb(82,86,89);
  }
  .newCourse-content .teachingBookImg{
    width:90%;
    box-shadow: 3px -3px 15px #000;
    margin-top:35px;
  }
  .newCourse-content #courseWorkPage{
    width:80%;
    margin:0 auto;
    height:700px;
    overflow:auto;
    background:rgb(82,86,89);
  }
  .newCourse-content #courseppt{
    width:100%;
  }
  .newCourse-content .courseImg{
    height:100%;
    position:relative;
    cursor:pointer;
  }
  .newCourse-content .coursepptImg{
    width:100%;
    height:100%;
  }
  .newCourse-content .pptPrev{
    width:50%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
  }
  .newCourse-content .pptNext{
    width:50%;
    height:100%;
    position:absolute;
    top:0;
    right:0;
  }
  .newCourse-content .courseDescribe .title{
    font-weight:bolder;
  }
  .newCourse-content .courseDescribe .desc{
    text-indent:2em;
  }
  .newCourse-content .exerP{
    font-size:20px;
    margin-bottom:20px;
  }
  .newCourse-content .devDownload{
    width:96.7%;
    height:53px;
    position:absolute;
    background:rgb(82,86,89);
  }
  .newCourse-content .el-tree-node__expand-icon {
    font-size: 16px;
  }
  .newCourse-content .el-tree-node__label{
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    font-size: 16px;
    color: #212529;
  }
  .newCourse-content .el-tree{
    background-color: #ffffff;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #9f5355;
    text-align:left;
  }
  .newCourse-content .el-tree-node:focus>.el-tree-node__content {
    background-color: #9f5355;
    color: white;
  }
  .newCourse-content .el-tree-node__content:hover{
    background-color: #9f5355;
    color: white;
  }
  .newCourse-content .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
    color: #212529;
  }
  .newCourse-content .el-tabs--border-card>.el-tabs__header .el-tabs__item {
    border: 3px solid #9f5355;
    padding:0 10px;
    border-top: none;
    color: #212529;
    width: 120px;
  }
  .newCourse-content .el-tabs--border-card{
    margin-left:20px;
    border: 0;
    border-top: 4px solid #9f5355;
    box-shadow: none;
  }
  .newCourse-content .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background-color: #9f5355;
    color: #ffffff;
  }
  .newCourse-content .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #9f5355;
    color: white;
  }
  .newCourse-content .el-tabs__item {
    padding:0 60px;
    font-size: 18px;
    line-height: 36px;
  }
  .newCourse-content .el-tabs--border-card>.el-tabs__header{
    border: none;
    background-color: #ffffff;
  }
  .newCourse-content .el-tabs__nav{
    float:none;
  }
  .newCourse-content  .el-tabs--border-card>.el-tabs__content{
    padding-bottom: 100px;
  }
  .newCourse-content .exerEngImg{
    width:595px;
    margin:0 auto;
    margin-bottom:20px;
  }
  .newCourse-content .exerEngImg img{
    width:100%;
  }
  .newCourse-content .content-box{
    width: 100%;
    margin-top: 105px;
    height: 700px;
    position: relative;
    padding: 0 5%;
  }
  .newCourse-content .pdf-box{
    width:100%;
    height: 800px;
  }
  .newCourse-content #video-box{
    width:100%;
    height: 700px;
  }
  .newCourse-content #flash2d{
    width:100%;
    height: 700px;
  }
  .newCourse-content .el-col-6{
    width: 16%;
  }
  .newCourse-content .el-tree{
    padding: 0;
    border: 0;
  }
  .newCourse-content .el-tree-node{
    background-color: #d2d2d2;
  }
  .newCourse-content .el-tree-node__content{
    border-bottom: 3px solid #ffffff;
  }
  .el-tree-node__expand-icon{
    color: #000;
  }
  .newCourse-content .homework-box{
    width: 100%;
    height:400px;
    overflow:auto;
  }
  .newCourse-content .homework{
    margin:0 5%;
    position: relative;
    background: #F3F3F3;
    text-align:left;
  }
  .newCourse-content .homework-box .homeworkTitle{
    font-weight:bolder;
    margin-top:20px;
  }
  .newCourse-content .homework-box .homeworkDesc{
    margin-left:20px;
  }
  .newCourse-content .homework-box .homework_Answer{
    margin-left:20px;
    margin-top:10px;
  }
  .newCourse-content .appraise-box{
    width: 90%;
    margin:0 5%;
    position: relative;
    top: 20px;
  }
  .newCourse-content .courseTitle{
    font-size: 16px;
    /*font-weight: bold;*/
    /*background: red;*/
    margin-top: 10px;
  }
  .newCourse-content .course-box .appraiseTitle{
    width: 500px;
    font-size: 16px;
    font-weight: normal;
    /*background: red;*/
    word-wrap: break-word;
  }

  .newCourse-content .appraise-box .appraiseTitle{
    font-size: 14px;
    text-align: left;
    padding: 6px;
    background:rgb(159,83,85);
    width: 68px;
    height:33px;
    border-radius:50px;
    color: #fff;
  }
  .newCourse-content .AppraiseNowText{
    margin-top: 0px;
    height: 60px;
    width: 70%;
    font-size: 20px;
  }
  .newCourse-content .IwantAppraise{
    width: 90%;
    margin-left: 68px;
    border-top:1px solid #ccc;
    border-left:1px solid #ccc;
    border-right:1px solid #ccc;
    padding:20px;
    box-sizing:border-box;
    text-align:left;
  }
  .newCourse-content .showAppraise{
    text-align:left;
    margin-bottom:25px;
    margin-left: 68px;
  }
  .newCourse-content .AppraiseMsg{
    display:flex;
  }
  .newCourse-content .AppraiseUser{
    font-weight:bolder;
    font-size:15px;
    margin-right:10px;
  }
  .newCourse-content .AppraiseTime{
    text-align:right;
    font-size:13px;
    margin-top: 5px;
  }
  .newCourse-content .AppraiseText{
    margin-left:50px;
  }
  .newCourse-content .replyText{
    margin-top: 10px;
    margin-bottom: 5px;
    height: 35px;
    width: 100%;
    font-size: 20px;
  }
  .newCourse-content .showReplyText{
    margin-left:50px;
  }
  .newCourse-content .replyEventButtons{
    position:relative;
  }
  .newCourse-content .replyEvent{
    position:absolute;
    top:0;
    left:0;
  }
  .newCourse-content .replyButtons{
    display:flex;
  }
  .newCourse-content .design-box{
    width: 560px;
    height: 400px;
    margin-left: 6%;
    position: relative;
    background: #F3F3F3;
    padding: 130px 100px;
  }
  .appraise-box textarea{
    margin-top: 20px;
    height: 60px;
    width: 60%;
    font-size: 20px;
  }
  .appraise-box .comment-box{
    margin: 0 50px 0 50px;
    /*background: red;*/
  }
  .appraise-box .text-box{
    padding-top: 10px;

    /*background: linen;*/
  }
  .appraise-box .text-box p{
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    margin-bottom: 10px;
  }
  .appraise-box .text-box p:last-child{
    font-size: 18px;
    font-weight: normal;
  }
  .appraise-box .text-box .text-box-a{
    color: black;
    text-decoration: none;
  }
  .appraise-box .text-box .text-box-a:hover{
    color: red;
    text-decoration: none;
  }
  .appraise-box .shopList{
    border-top:1px dashed #ccc;
    border-bottom:1px solid #ccc;
    border-left:1px solid #ccc;
    border-right:1px solid #ccc;
    padding-top:20px;
    padding-left:25px;
    margin-bottom:10px;
    width: 90%;
    margin-left: 68px;
  }
  .appraise-box .block{
    display:flex;
    margin-bottom:12px;
  }
  .appraise-box .block span{
    margin-right:2px;
  }
  .comment-box .msg-box{
    /*background: pink;*/
    height: 20px;
    line-height: 20px;
  }
  .comment-box .msg-box .star{
    font-size: 0;
    /*background: pink;*/
    display: inline-block;
    height: 20px;
    line-height: 20px;
    float: left;
    margin-left: 10px;
    /*margin-top: 2px;*/
  }
  .comment-box .msg-box .star-item{
    /*background: red;*/
    display: inline-block;
    background-repeat: no-repeat;
    width: 15px;
    height: 15px;
    margin-right: 2px;
    background-size: 100%;
  }
  .comment-box .msg-box .star-item.on{
    margin-top: 2px;
    background-image: url(../../src/assets/imgs/on.png);
  }
  .comment-box .msg-box .star-item.off{
    margin-top: 2px;
    background-image: url(../../src/assets/imgs/off.png);
  }

  .comment-box .msg-box p{
    display: inline-block;
    float: left;
    font-size: 12px;
    font-weight: normal;
    margin-left: 20px;
    color: #93999F;
  }
  .comment-box .msg-box .replyNum a{
    color: #93999F;
    text-decoration: none;
  }
  .comment-box .msg-box .replyNum a:hover{
    color: green;
  }
  .comment-box .reply-msg-box{
    border-radius: 3px;
    background:#F7F7F7;
  }

  .comment-box .reply-msg-box li{
    font-size: 14px;
    font-weight: bold;
    margin-left: 30px;
    margin-top: 10px;
    /*background: yellow;*/
    text-align: left;
  }
  .comment-box .reply-msg-box .replyTime-box{
    margin-top: 10px;
    font-size: 12px;
    color: #93999F;
    margin-bottom: 10px;
  }
  .comment-box .reply-msg-box .replyTime-box a{
    color: #93999F;
    text-decoration: none;
  }
  .comment-box .reply-msg-box .replyTime-box a:hover{
    color: green;
  }
  .comment-box .reply-msg-box .replyTime-box p{
    display: inline-block;
  }
  .comment-box .reply-msg-box .replyTime-box p:last-child{
    margin-left: 100px;
  }
  .comment-box .reply-msg-box .replyToReply-box li{
    margin-left: 0;
    font-size: 12px;
    font-weight: normal;
    margin-bottom: 5px;
  }
  .appraise-box .shopList p{
    display: inline-block;
  }


  .appraise-box .shopList .commit-btn{
    width: 60px;
    height: 30px;
    outline: none;
    position: relative;
    margin-top: 20px;
    /*background: red;*/
    cursor: pointer;
  }
  .appraise-box .shopList .commit-btn:active{
    top: 2px;
  }

  .appraise-box .all>input{
    opacity:0;
    position:absolute;
    width:2em;
    height:2em;
    margin:0;
  }
  .appraise-box .all>span{
    font-size:1em;
    color:gold;

    -webkit-transition:color
    .2s;

    transition:color
    .2s;
  }
  .appraise-box .all>input:checked~span{
    color:#666;
  }

  .appraise-box .all>input:checked+span{
    color:gold;
  }
  #courseppt:-webkit-full-screen {
    background:#000;
  }
  #courseWorkPage:-webkit-full-screen {
    width: 100%;
    height: 100%;
    overflow:auto;
    background:rgb(82,86,89);
  }
  #teachingBook:-webkit-full-screen {
    width:100%;
    height:100%;
    overflow:auto;
    background:rgb(82,86,89);
  }
  video::-webkit-media-controls-enclosure {
    overflow:hidden;
  }
  video::-webkit-media-controls-panel {
    width: calc(100% + 30px);
  }
</style>
