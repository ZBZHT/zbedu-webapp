<template>
  <div class="newCourse-container">
    <div>
      <navgation-head></navgation-head>
    </div>
    <div class="newCourse-content">
      <div class="completeLeft" @mouseover="showTree" @mouseout="disTree">
        <transition enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
          <div class="findTree" v-show="showTreeData !== 1 || clickShow !== 1">
            <span class="showTree">
              <i class="el-icon-d-arrow-right icon-right"></i>
            </span>
          </div>
        </transition>

        <transition enter-active-class="fadeInLeft" leave-active-class="fadeOutLeft">
          <div id="OTREE" class="oTree animated" v-show="showTreeData === 1 || clickShow === 1">
            <!--<p class="nail" @click="clickNail">-->
            <!--<i class="iconfont iconfont1">&#xe79f;</i>-->
            <!--</p>-->
            <!--<p v-drag>123</p>-->
            <el-tree
              node-key="courseId"
              :props="defaultProps"
              :data="data"
              accordion
              :default-expanded-keys="[courseId1]"
              highlight-current
              ref="vuetree"
              @node-click="handleNodeClick"></el-tree>
          </div>
        </transition>
      </div>

      <div class="oCourse" id="oCourse">
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
              <!--<img class="introImg" :src="introList2" alt="">-->
              <div id="teachingBook">
                <!--<p class="devDownload" v-show="noTree.teachingBook"></p>-->
                <!--<embed :src="'/resource/pdf/coursePdfData/' + noTree.teachingBook" class="pdf-box"></embed>-->
                <div id="teachingBookImg" v-for="(item,index) in teachingBooklists">
                  <img class="teachingBookImg" :src="item.img">
                </div>
              </div>

              <el-button type="info" round @click="teachingBookFullScreen()"
                         style="margin-top: 10px">全屏显示</el-button>

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
              <el-button type="info" round @click="appFullScreen(currpage)"
                         style="margin-top: -10px">全屏显示</el-button>

            </el-tab-pane>

            <!--微课-->
            <el-tab-pane label="教学微课" :name="descTab2">
              <!--<img class="introImg" :src="introList3" alt="">-->
              <!--<div  v-for="(item,index) in noTree.videoTitle" v-if="index == 0">-->
              <div>
                <video id="video-box" controls="controls" controlslist="nodownload" @click="videostop" :src="videoAdr + this.videoPath">
                  <!--<video id="video-box" controls @click="videostop">-->
                </video>
              </div>
            </el-tab-pane>

            <!--工作页-->
            <el-tab-pane label="工作页">
              <!--<img class="introImg" :src="introList4" alt="">-->
              <div id="courseWorkPage">
                <!--<p class="devDownload" v-show="noTree.workPage"></p>-->
                <!--<embed :src="'/resource/pdf/coursePdfData/' + noTree.workPage" class="pdf-box"></embed>-->
                <div id="courseWorkPageImg" v-for="(item,index) in courseWorkPagelists">
                  <img class="teachingBookImg" :src="item.img">
                </div>
              </div>
              <el-button type="info" round @click="workPageFullScreen()"
                         style="margin-top: 10px">全屏显示</el-button>

            </el-tab-pane>

            <!--二维动画-->
            <el-tab-pane label="flash动画">
              <!--<div  v-for="(item,index) in noTree.videoTitle" v-if="index == 0">-->
              <div>
                <video id="flash2d" autoplay controls="controls" controlslist="nodownload" @click="flash2d" :src="videoAdr + this.videoPath + noTree.flash2d">
                </video>
              </div>
            </el-tab-pane>

            <!--课后作业-->
            <el-tab-pane label="课后作业" >
              <div class="homework-box">
                <div class="homework" v-for="(item,index) in homeworkData">
                  <p class="homeworkTitle">{{index + 1}}. {{item.desc}}</p>
                  <p class="homeworkDesc" v-for="(item2,index2) in item.options">{{item2}}</p>
                  <span class="homework_Answer">正确答案：</span>
                  <span class="homeworkAnswer" v-if="appAnswer">{{item.answer}}</span>
                </div>
              </div>
              <el-button type="success" round @click="appearAnswer()"
                         style="margin-top: 10px">点击显示正确答案</el-button>
            </el-tab-pane>

            <!--评论-->
            <el-tab-pane label="课程评价">
              <!--<img class="introImg" :src="introList5" alt="">-->
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
                      <p class="AppraiseUser" v-show="appraiseContent.appraiseMsg[index].replyText != '' ">【{{item.user}}】老师:</p>
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

                <el-button type="success" round @click="submitComments()"
                           style="margin-top: 10px">提交评论</el-button>
              </div>
            </el-tab-pane>

          </el-tabs>


        </div>
      </div>
    </div>

    <div class="footer" style="margin-top: 20px">
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
        appraiseIndex:[],
        videoAdr: '',
        showTreeData: 0,
        clickShow: 0,
        oTreePositionX: '',
        oTreePositionY: '',
        firstXY: 0,
        introList1: '',
        introList2: '',
        introList3: '',
        introList4: '',
        introList5: '',
      }
    },
    //    自定义拖动
    directives:{
      drag1(el){
        el.onmousedown = function(e){
          //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
          var divx = e.clientX - document.getElementById('OTREE').offsetLeft;
          var divy = e.clientY - document.getElementById('OTREE').offsetTop;
          //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
          document.onmousemove = function(e){
            //获取移动后div的位置：鼠标位置-divx/divy
            var l = e.clientX - divx;
            var t = e.clientY - divy;
            document.getElementById('OTREE').style.left=l+'px';
            document.getElementById('OTREE').style.top=t+'px';
          }
          document.onmouseup = function(e){
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }
      },
      drag(el){
        el.onmousedown = function(e){
          //获取鼠标点击处分别与div左边和上边的距离：鼠标位置-div位置
          var divx = e.clientX - document.getElementById('lll').offsetLeft;
          var divy = e.clientY - document.getElementById('lll').offsetTop;
          //包含在onmousedown里，表示点击后才移动，为防止鼠标移出div，使用document.onmousemove
          document.onmousemove = function(e){
            //获取移动后div的位置：鼠标位置-divx/divy
            var l = e.clientX - divx;
            var t = e.clientY - divy;
            document.getElementById('lll').style.left=l+'px';
            document.getElementById('lll').style.top=t+'px';
          }
          document.onmouseup = function(e){
            document.onmousemove = null;
            document.onmouseup = null;
          }
        }
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
        if (this.$store.state.course.children[0].describe){
          this.aa = this.$store.state.course.children[0].title
        }else {
          this.aa = this.$store.state.course.children[0].children[0].title
        }

        return this.$store.state.course;
      },
      videoTitle(){
        return this.$store.state.noTree.videoTitle;
      }
    },
    watch: {
    },
    mounted(){
      this.videoAdr = 'http://' + this.$store.state.serverIP + ':8000/resource/'
      if(this.$store.state.activeName === 3){
        this.activeName = this.descTab2;
      }else if(this.$store.state.activeName === 2){
        this.activeName = this.descTab1;
      }
      //判断当前是否是老师
      if(this.userType == 'EA' || this.userType == 'T'){
        this.userSession = 1;
      }
      //获取树形数据
      let leftData = this.$store.state.newBannerLeft
      this.data = leftData

      //PPT页数
      this.total = this.lists.length;
      //从courseIndex页传值并默认展开
      var idR = this.$store.state.noTree1.courseId;
      // 找出data中idR对应的第一个children
      let id = ''
      let idItem = []
      function getID(data) {
        for (let i = 0; i < data.length; i++) {
          let obj = data[i]
          if (obj.courseId == idR) {
            if (obj.children) {
              if (obj.children[0].children) {
                let obj1 = obj.children[0].children[0]
                if (obj1.children) {
                  id = obj1.children[0].courseId
                  idItem = obj1.children[0]
                } else {
                  id = obj1.courseId
                  idItem = obj1
                }
              } else {
                id = obj.children[0].courseId
                idItem = obj.children[0]
              }
            } else {
              id = obj.courseId
              idItem = obj
            }
          } else {
            if (obj.children) {
              getID(obj.children)
            }
          }
        }
      }
      getID(this.data)
      this.courseId1 = id
      setTimeout(() => {
        this.$refs.vuetree.setCurrentKey(id)
      }, 20)
      this.myFootPrint(idItem)
      this.findParent(id);
      this.$store.commit('noTreeTitle', idItem);

      //评论一系列
      this.user = this.$store.state.username;
      this.getComment(this.moutedHomeworkPath);
    },
    methods:{
      //      钉子
      clickNail () {
        if (this.clickShow === 0) {
          this.clickShow = 1
        } else {
          this.clickShow = 0
        }
      },
      //      展示树形
      showTree () {
        this.showTreeData = 1
//        document.getElementById('OTREE').style.left=0+'px';
//        document.getElementById('OTREE').style.top=190+'px';
      },
      disTree () {
        this.showTreeData = 0
      },
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
          this.appraiseIndex = res.data.result.appraiseMsg;
          this.appraiseContent.appraiseMsg = this.appraiseIndex;
        }).catch(function(error){
          console.log("评论请求错误")
        });
      },
      //切换标签暂停视频
      handleClickTabs(tab){
        if(tab._data.index !== 3){
          this.clickTabsStop()
        }
        if(tab._data.index !== 5){
//          this.clickTabsFlashStop()
        }
      },
      //进入页面时的请求地址
      findParent(id){
        var coursePath = [];
        var homeworkPath = [];
        let videoPath1 = ''
        let objNode = ''
        this.introList1 = ''
        this.introList2 = ''
        this.introList3 = ''
        this.introList4 = ''
        this.introList5 = ''
        id = id.toString();
        let returnedItem = []
        for (let i = 0; i < this.data.length; i++) {
          if (this.data[i].courseId == id) {
            objNode = this.data[1]
            videoPath1 = this.data[i].videoTitle[0].videoTitle
            returnedItem.unshift(this.data[i].label)
            returnedItem.push(this.data[i].teachingMaterial)
            break
          } else {
            let obj1 = this.data[i]
            if (obj1.children) {
              for (let j = 0; j < obj1.children.length; j++) {
                let obj2 = obj1.children[j]
                if (obj2.courseId == id) {
                  objNode = obj2
                  videoPath1 = obj2.videoTitle[0].videoTitle
                  returnedItem.unshift(obj2.label)
                  returnedItem.unshift(this.data[i].label)
                  returnedItem.push(obj2.teachingMaterial)
                  break
                } else {
                  if (obj2.children) {
                    for (let k = 0; k < obj2.children.length; k++) {
                      let obj3 = obj2.children[k]
                      if (obj3.courseId == id) {
                        objNode = obj3
                        videoPath1 = obj3.videoTitle[0].videoTitle
                        returnedItem.unshift(obj3.label)
                        returnedItem.unshift(obj2.label)
                        returnedItem.unshift(this.data[i].label)
                        returnedItem.push(obj3.teachingMaterial)
                        break
                      } else {
                        if (obj3.children) {
                          for (let l = 0; l < obj3.children.length; l++) {
                            let obj4 = obj3.children[l]
                            if (obj4.courseId == id) {
                              objNode = obj4
                              videoPath1 = obj4.videoTitle[0].videoTitle
                              returnedItem.unshift(obj4.label)
                              returnedItem.unshift(obj3.label)
                              returnedItem.unshift(obj2.label)
                              returnedItem.unshift(this.data[i].label)
                              returnedItem.push(obj4.teachingMaterial)
                              break
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }

        coursePath = returnedItem.join('/') + '/'
        returnedItem[returnedItem.length - 1] = videoPath1
        this.videoPath = returnedItem.join('/')
        returnedItem.pop()
        homeworkPath = returnedItem
        this.moutedCorusePath = coursePath;
        this.moutedHomeworkPath = homeworkPath;
        this.currCourse = this.moutedHomeworkPath;
        this.$store.state.noTree = objNode
        //请求PPT
        axios.post("/readResource/getPPT",{
          data:{
            userId:this.userId,
            fileName: coursePath
          }
        }).then((res)=>{
          if (res.data.result) {
            let resData = res.data.result
            this.lists = resData.courseList;
            this.total = this.lists.length;
            this.teachingBooklists = resData.textBookList;
            this.courseWorkPagelists = resData.workPageList;
            if (resData.introList.length > 0) {
              this.introList1 = resData.introList[0].img
              this.introList2 = resData.introList[1].img
              this.introList3 = resData.introList[2].img
              this.introList4 = resData.introList[3].img
              this.introList5 = resData.introList[4].img
            }
          }
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
          if(res.data.result){
            this.homeworkData = res.data.result
          }else{
            this.homeworkData = []
          }
        }).catch(function(error){
          console.log("error init." + error)
        });
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
        this.currpage = val;
        if(isFull === null){
          document.removeEventListener('DOMMouseScroll',scrollFunc,false);
          window.onmousewheel = document.onmousewheel = null;

        }else{
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
      },

      //从树形传值到tabs
      handleNodeClick(data,node) {
        // 点击获取树结构各节点组成路径
        this.appAnswer = false;
        var video = document.querySelector('video');
        for(var i = 0; i < document.getElementsByClassName("coursepptImg").length; i++){
          document.getElementsByClassName("coursepptImg")[i].style.height = '100%';
          document.getElementsByClassName("coursepptImg")[i].style.width = '100%';
        }
        this.homeworkData = [];
        this.courseId1 = '';
        this.courseId2 = '';

        if(data.children){

        }else{
          let url_1 = []
          let videoPath = ''
          let pptPath = ''
          let bookPath = ''
          let workPath = ''
          let flashPath = ''
          if (node.label) {
            url_1.push(node.label)
            if (node.parent.label) {
              url_1.push(node.parent.label)
              if (node.parent.parent.label) {
                url_1.push(node.parent.parent.label)
                if (node.parent.parent.parent.label) {
                  url_1.push(node.parent.parent.parent.label)
                  if (node.parent.parent.parent.parent.label) {
                    url_1.push(node.parent.parent.parent.parent.label)
                  }
                }
              }
            }
          }
          url_1.reverse()
          videoPath = url_1.join('/') + '/' + data.videoTitle[0].videoTitle
          pptPath = url_1.join('/') + '/' + data.teachingMaterial
          flashPath = url_1.join('/') + '/' + data.flash2d
          bookPath = url_1.join('/') + '/' + data.teachingBook
          workPath = url_1.join('/') + '/' + data.workPage
          this.videoPath = videoPath

          //点击新课程让课件跳转到第一页
          EventBus.$emit('newPageUp',this.pageFn(1));
          contentSlides.methods.pageUp(1);
          contentSlides.methods.jump(1);
          //点击新课程tabs标签默认第一个
          this.activeName = this.descTab;
          this.$store.commit('activeName','');
          //点击新课程存本地的资源
          this.$store.commit('noTreeTitle',data);
          this.$store.commit('noTreeTitle1',data);
          //添加item至我的足迹请求
          this.myFootPrint(data)
          //请求课后作业
          axios.get("/readTestQuestion/getHomeWork",{
            params:{
              userId:this.userId,
              checkArr:url_1
            }
          }).then((res)=>{
            this.currCourse = url_1;
            this.appraiseContent.title = this.currCourse;

            if(res.data.result){
              this.homeworkData = res.data.result
            }else{
              this.homeworkData = [];
            }
          }).catch(function(error){
            console.log("error init." + error)
          });

          //请求课件
          axios.post("/readResource/getPPT",{
            data:{
              userId:this.userId,
              fileName: pptPath
            }
          }).then((res)=>{
            if (res.data.result) {
              let resData = res.data.result
              this.lists = resData.courseList;
              this.total = this.lists.length;
              this.teachingBooklists = resData.textBookList;
              this.courseWorkPagelists = resData.workPageList;
              if (resData.introList.length > 0) {
                this.introList1 = resData.introList[0].img
                this.introList2 = resData.introList[1].img
                this.introList3 = resData.introList[2].img
                this.introList4 = resData.introList[3].img
                this.introList5 = resData.introList[4].img
              }
            }

          }).catch(function(error){
            console.log("error init." + error)
          });
          this.getComment(url_1);
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
            this.appraiseContent.appraiseMsg[index].replyText = this.replyText;
            this.appraiseContent.appraiseMsg[index].replyName = this.userName;
            this.appraiseContent.appraiseMsg[index].replyDate = core.formatDate("yyyy-MM-dd hh:mm:ss", new Date());
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
        this.requestFullScreen(elem,val);
      },
      workPageFullScreen(){
        var elem = document.getElementById("courseWorkPage");
        this.requestFullScreen(elem);
      },
      teachingBookFullScreen(){
        var elem = document.getElementById("teachingBook");
        this.requestFullScreen(elem);
      },
      //类似F11的全屏
      requestFullScreen(element,val) {

        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys(122);
          }
        }
        if(element == document.getElementById("courseppt")){
          var pptHeight = document.getElementsByClassName("coursepptImg")[val].offsetHeight;
          var pptWidth = document.getElementsByClassName("coursepptImg")[val].offsetWidth;
          var innerHeight = window.innerHeight;
          var innerWidth = window.innerWidth;
          if(1.7 < pptWidth / pptHeight){
            element.style.width = '100%';
            element.style.height = "auto";
          }else if(this.$store.state.noTree1.courseId >= 700 && this.$store.state.noTree1.courseId < 800 && 1.7 >= pptWidth / pptHeight){
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
          if (res.data.code === 0){
              this.addSuccess('myFootPrint更新成功');
          }else if (res.data.code === 1){
          }
        });
        //为热门课程给每个课程计数
          axios.post('/teacherCMS/countHot', {
            data: {
              courseInfo: item
            }
          }).then((res) => {

          });
        axios.post('/teacherCMS/studentHot', {
          data: {
            name: this.userName,
          }
        }).then((res) => {

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
  .newCourse-container .newCourse-content {
    min-width:960px;
    width:100%;
    margin:0 auto;
    margin-top:6px;
    display: flex;
  }
  .newCourse-content .completeLeft{
    width:1.5%;
    height:200px;
    margin-top: 100px;
    /*border: 1px solid #000;*/
  }
  .newCourse-content .findTree{
    width:100%;
    height:100%;
    box-shadow: 0 0 15px 8px #9f5355;
    border-radius: 0px 5px 5px 0px;
  }
  .newCourse-content .oTree{
    width:360px;
    position: absolute;
    top: 190px;
    z-index: 1;
    overflow: auto;
    max-height:768px;
  }
  .newCourse-content .el-tree{
    width:92%;
  }
  .newCourse-content .nail{
    width:15px;
    height:15px;
    /*border: 3px solid #000;*/
    cursor: pointer;
    position: absolute;
    top:0;
    right: 11px;
  }
  .newCourse-content .iconfont1{
    font-size: 20px;
  }
  .newCourse-content .animated {
    -webkit-animation-duration: 0.3s;
    animation-duration: 0.3s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .newCourse-content .icon-right{
    line-height:200px;
    color:#9f5355;
    font-weight: bolder;
  }
  .newCourse-content .oCourse{
    width:98.5%;
    z-index: 0;
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
    width: 70%;
    height:500px;
    overflow:auto;
    margin: 0 auto;
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
  .newCourse-container .introImg {
    width: 960px;
    margin-bottom: 14px;
  }
  #oCourse .el-tabs__content{
    padding-bottom: 0;
  }
</style>
