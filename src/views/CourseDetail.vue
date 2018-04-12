<template>
  <div class="page-box">
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
        <div class="tree-box">
          <tree></tree>
        </div>
        <div class="right-box">

          <h2>{{currentTitle.label}}</h2>
          <!--<p class="courseTitle">{{ noTree.label }}</p>-->
          <div class="detail-box">
            <ul class="nav-box">
              <li class="nav-item" v-for="(item,index) in detailNavData" @click="onclick(index)" :class="{'line': index !== currentIndex}">
                {{item}}
              </li>
            </ul>

            <!--教材-->
            <!--<div class="teaching-box" v-show="this.currentIndex === 0">-->
              <!--<p class="teaching" >待上传</p>-->
            <!--</div>-->

            <!--简介-->
            <div class="course-box" v-show="this.currentIndex === 0">
              <p class="courseDescribe" >{{ noTree.describe }}</p>
            </div>
            
            <!--课件-->
            <div id="courseppt" class="contentSmallCourse" v-show="this.currentIndex === 1">
              <p class="devDownload"></p>
              <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                <param name="_Version" value="65539">
                <param name="_ExtentX" value="20108">
                <param name="_ExtentY" value="10866">
                <param name="_StockProps" value="0">
                <param name="SRC" value="teachingMaterial">
                <object :data="'/resource/pdf/coursePdfData/' + noTree.teachingMaterial" type="application/pdf" class="pdf-box">
                </object>
              </object>
              <el-button type="info" round @click="appFullScreen()">全屏显示</el-button>
            </div>

            <!--微课-->
            <div class="courseVideo" v-show="this.currentIndex === 2">
              <div  v-for="item in noTree.videoTitle">
                <video id="video-box" controls @click="videostop" :src="'/resource/video/courseVideoData/' + item.videoTitle">
                </video>
              </div>
            </div>

            <!--工作页-->
            <div id="courseWorkPage" class="contentSmallCourse" v-show="this.currentIndex === 3">
            <p class="devDownload"></p>
              <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                <param name="_Version" value="65539">
                <param name="_ExtentX" value="20108">
                <param name="_ExtentY" value="10866">
                <param name="_StockProps" value="0">
                <param name="SRC" value="teachingMaterial">
                <object :data="'/resource/pdf/coursePdfData/' + noTree.workPage" type="application/pdf" class="pdf-box">
                </object>
              </object>
              <el-button type="info" round @click="workPageFullScreen()">全屏显示</el-button>
            </div>

            <!--课后作业-->
            <div v-show="this.currentIndex === 4">
              <div class="homework-box">
                <div class="homework" v-for="(item,index) in noTree.homeWorkData">
                  <p class="homeworkTitle">{{index + 1}}. {{item.title}}</p>
                  <p class="homeworkDesc">{{item.desc}}</p>
                    <span class="homework_Answer">正确答案：</span>
                    <span class="homeworkAnswer" v-if="appAnswer">{{item.answer}}</span>
                </div>
              </div>
              <el-button type="success" round @click="appearAnswer()">点击显示正确答案</el-button>
            </div>

            <!--评论-->
            <div class="appraise-box" v-show="this.currentIndex === 5">
              <p class="appraiseTitle">{{ appraiseMsg }}</p>
              <p v-show="!commentArr.length">暂无评价</p>
              <div class="comment-box">
                <div v-for="(commentItem,index) in commentArr" v-show="commentItem.title === noTree.label">
                  <div class="text-box">
                    <p @click="enterUserManagement" >用户名：<a class="text-box-a" href="">{{ commentItem.user  }}</a></p>
                    <p >{{commentItem.text}}</p>
                  </div>
                  <div class="msg-box">
                    <p class="time-box">时间：{{ commentItem.time }}</p>
                    <p class="star">
                      <span  :class="{'on': commentItem.score>=0}"class="star-item" >
                      </span>
                      <span  :class="{'on': commentItem.score>=1}" class="star-item" >
                      </span>
                      <span  :class="{'on': commentItem.score>=2}" class="star-item" >
                      </span>
                      <span  :class="{'on': commentItem.score>=3}" class="star-item" >
                      </span>
                      <span  :class="{'on': commentItem.score>=4}" class="star-item" >
                      </span>
                    </p>
                    <p class="replyNum" @click="wantReply(commentItem,index)"><a href="javascript:void(0)">回复</a></p>
                  </div>
                  <div class="reply-msg-box">
                    <ul v-show="replyArr.length">
                      <li v-for="(replyItem,index) in replyArr" v-show="replyItem.target == commentItem.user && replyItem.title ==noTree.label && replyItem.targetId == commentItem.num">
                        <span>{{replyItem.user}}：</span>
                        <span>{{replyItem.text}}</span>
                        <div class="replyTime-box">
                          <p>{{replyItem.time}}</p>
                          <p @click="replyToReply(replyItem,index)"><a href="javascript:void(0)">回复</a></p>
                        </div>

                        <div class="replyToReply-box">
                          <ul v-show="replyToReplyArr.length">
                            <li v-for="(replytoReplyItem,index) in replyToReplyArr" v-show="replytoReplyItem.target == replyItem.user && replytoReplyItem.title == noTree.label && replytoReplyItem.targetId == replyItem.num">
                              <span>{{replytoReplyItem.user}}  回复   @{{ replyItem.user }}</span>
                              <span>{{replytoReplyItem.text}}</span>
                              <p>{{replytoReplyItem.time}}</p>
                            </li>
                          </ul>
                        </div>
                        <div v-show="(isAppearCommentBox1 && (currentReplyToReply === index))">

                          <textarea type="text" v-model="replyToReplyText"></textarea>

                          <button @click="submitReplyToReply(replyItem)">回复他</button>
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="reply-input-box" v-show="(isAppearCommentBox && currentReplyOpen === index)">
                    <textarea type="text" v-model="replyText"></textarea>
                    <button @click="submitReply(commentItem,index)">提交回复</button>
                  </div>
                  <hr>
                </div>
              </div>
              <p class="appraiseTitle">我要评价</p>

              <textarea type="text" v-model="text"/>

              <div class="shopList">
                <p>请评价：</p>
                <p class="all">

                  <input
                    type="radio"
                    name="b"
                    value="0" v-model="inputdata"/>
                  <span>★</span>
                  <input
                    type="radio"
                    name="b"
                    value="1" v-model="inputdata" />
                  <span>★</span>
                  <input
                    type="radio"
                    name="b"
                    value="2" v-model="inputdata" />
                  <span>★</span>
                  <input
                    type="radio"
                    name="b"
                    value="3" v-model="inputdata" />
                  <span>★</span>
                  <input
                    type="radio"
                    name="b"
                    value="4" v-model="inputdata" />
                  <span>★</span>
                  <!--<input-->
                  <!--type="radio"-->
                  <!--name="b"-->
                  <!--value="5" v-model="inputdata" />-->
                  <!--<span>★</span>-->

                </p>
                <p>{{ arrData[inputdata]}}</p>
                <br>
                <button class="commit-btn" @click="submitComments">提交评论</button>
              </div>
            </div>

            <!--二维动画-->
            <!--<div class="teaching-box" v-show="this.currentIndex === 7">-->
              <!--<p class="teaching" >待上传</p>-->
            <!--</div>-->

          </div>
        </div>
    </div>

  </div>
</template>

<script scoped>
import axios from 'axios'
import navgationHead from '@/components/common/navgationHead'
import tree from '@/components/courseTree/tree'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'

  export default {
    name: 'user',
    data () {
      return {
        currentIndex: 0,
        currentCourseMsg:'',
        currentCourseTitle:'',
        aa:'',
//        detailNavData:["本节教材","本节简介","教学课件","教学微课","课后作业","课程评价","工作页","二维动画"],
        detailNavData:["本节简介","教学课件","教学微课","工作页","课后作业","课程评价"],
        commentAllObj:[],
        commentArr:[],
        replyArr:[],
        replyToReplyArr:[],
        currentMsg:'',
        appraiseMsg: '全部评价',
        inputdata: 0,
        arrData: ['一星', '两星', '三星', '四星', '五星'],
        currentdate: '',
        isAppearCommentBox: false,
        isAppearCommentBox1: false,
        text:'',
        replyText:'',
        replyToReplyText:'',
        replyTime:'',
        replyToReplyTime:'',
        currentReplyOpen:-1,
        currentReplyToReply:-1,
        url:'',
        appAnswer:false
      }
    },
    computed:{
      noTree(){
        this.currentCourseMsg = this.$store.state.noTree
        this.currentCourseTitle = this.$store.state.noTree.label
        return this.$store.state.noTree;
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
    methods: {
      onclick: function (index) {
        this.currentIndex = index;
        this.appAnswer = false;
    //    console.log(this.currentCourseMsg)
    //    if (this.currentIndex === 2) {
    //      this.$router.push('/playPdf/'+this.currentCourseMsg.courseId + '/pdf/' + this.currentCourseMsg.label)
    //    }
    //    if (this.currentIndex === 3) {
    //      this.$router.push('/playVideo/'+ this.currentCourseMsg.courseId + '/video/' + this.currentCourseMsg.label)
    //    }
      },
      enterUserManagement () {
        this.$router.push('/userManagement')
      },
      dele: function (index) {
        this.replyArr.splice(index, 1)
      },
      submitComments () {
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
            var date = new Date()
            var seperator1 = '-'
            var seperator2 = ':'
            var month = date.getMonth() + 1
            var strDate = date.getDate()
            if (month >= 1 && month <= 9) {
              month = '0' + month
            }
            if (strDate >= 0 && strDate <= 9) {
              strDate = '0' + strDate
            }
            this.currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
              + ' ' + date.getHours() + seperator2 + date.getMinutes()
              + seperator2 + date.getSeconds()
            this.score = this.inputdata
            this.commentAllObj.push({
              type:1,
              num:this.commentAllObj.length +1 ,
              source:"course",
              title: this.currentCourseTitle,
              user:this.user,
              text:this.text,
              time:this.currentdate,
              score:this.inputdata,
              targetId:'',
              target:''
            })
            console.log(this.currentCourseTitle)
            this.commentArr.push({
              type:1,
              num:this.commentAllObj.length + 1,
              source:"course",
              title: this.currentCourseTitle,
              user:this.user,
              text:this.text,
              time:this.currentdate,
              score:this.inputdata,
              targetId:'',
              target:''
            })

            axios({
              method:'get',
              url:"/readComments/update",
              params:{
                type:1,
                num:this.commentAllObj.length + 1,
                title: this.currentCourseTitle,
                source:"course",
                user:this.user,
                text:this.text,
                time:this.currentdate,
                score:this.inputdata,
                targetId:'',
                target:''
              }
            }).then(
              function (res) {
                console.log(res.data.code)
              }
            )
            this.text = ''
          }
        }
      },
      wantReply(item,num){
        if(this.user === ''){
          var con = confirm("请登录");
          if(con == true){
            this.$router.push({path: '/loginPage'})
          }else{
            return false;
          }
        }else {
          this.currentReplyOpen = num
          this.isAppearCommentBox = true
        }
        // this.isAppearCommentBox = !this.isAppearCommentBox
      },
      submitReply(item,aa) {
        console.log(item)
        if (this.replyText === '') {
          alert('评论不能为空')
        }else {

          var date = new Date()
          var seperator1 = '-'
          var seperator2 = ':'
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          this.replyTime = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + ' ' + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds()
          // console.log(item.replyArr)
          // console.log(item)
          this.commentAllObj.push({
            type:2,
            num:this.commentAllObj.length + 1 ,
            source:"course",
            title: this.currentCourseTitle,
            user:this.user,
            text:this.text,
            time:this.currentdate,
            score:this.inputdata,
            target:item.user,
            targetId:item.num
          })
          this.replyArr.push({
            type:2,
            num:this.commentAllObj.length + 1,
            source:"course",
            title:this.currentCourseTitle,
            user:this.user,
            text:this.replyText,
            time:this.replyTime,
            score:'',
            target:item.user,
            targetId:item.num
          })
          axios({
            method:'get',
            url:"/readComments/update",
            params:{
              type:2,
              num:this.commentAllObj.length + 1,
              source:"course",
              title:this.currentCourseTitle,
              user:this.user,
              text:this.replyText,
              time:this.replyTime,
              score:'',
              target:item.user,
              targetId:item.num
            }
          }).then(
            function (res) {
              console.log(res.data.code)
            }
          )
          this.currentReplyOpen = -1
          this.replyText = ''
        }
      },
      replyToReply(item, num){
        if(this.user === ''){
          var con = confirm("请登录");
          if(con == true){
            this.$router.push({path: '/loginPage'})
          }else{
            return false;
          }
        }else {
          this.currentReplyToReply = num
          this.isAppearCommentBox1 = true
        }
      },
      submitReplyToReply (item){
        if (this.replyToReplyText === '') {
          alert('评论不能为空')
        }else {

          var date = new Date()
          var seperator1 = '-'
          var seperator2 = ':'
          var month = date.getMonth() + 1
          var strDate = date.getDate()
          if (month >= 1 && month <= 9) {
            month = '0' + month
          }
          if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate
          }
          this.replyToReplyTime = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + ' ' + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds()
          this.commentAllObj.push({
            type:3,
            num:this.commentAllObj.length+1,
            source:"course",
            title: this.currentCourseTitle,
            user:this.user,
            text:this.text,
            time:this.currentdate,
            score:this.inputdata,
            target:item.user,
            targetId:item.num
          })
          this.replyToReplyArr.push({
            type:3,
            num:this.commentAllObj.length +1,
            source:"course",
            title:this.currentCourseTitle,
            user: this.user,
            text: this.replyToReplyText,
            time: this.replyToReplyTime,
            score:'',
            target:item.user,
            targetId:item.num
          })

          axios({
            method:'get',
            url:"/readComments/update",
            params:{
              type:3,
              num:this.commentAllObj.length+1,
              source:"course",
              title:this.currentCourseTitle,
              user: this.user,
              text: this.replyToReplyText,
              time: this.replyToReplyTime,
              score:'',
              target:item.user,
              targetId:item.num
            }
          }).then(
            function (res) {
              console.log(res.data.code)
            }
          )
          this.replyToReplyText = ''
          // console.log(item)
          this.currentReplyToReply = -1
        }
      },
      //点击视频暂停开始
      videostop(){
        var myVideo =document.getElementById("video-box");
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
      appFullScreen(){
        var elem = document.getElementById("courseppt");
        console.log(elem);
        this.requestFullScreen(elem);
      },
      workPageFullScreen(){
        var elem = document.getElementById("courseWorkPage");
        console.log(elem);
        this.requestFullScreen(elem);
      },
      //类似F11的全屏
      requestFullScreen(element) {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys(122);
          }
        }
        console.log("2221")
      }
    },
    mounted(){
      this.url = document.domain;
      this.user = this.$store.state.username;
      // console.log(this.user)
      axios.get("/readComments/all",{
        params:{
          user:6666
        }
      }).then((res)=>{
        // console.log(res.data.msg)
        // console.log(res.data.result)
        this.commentAllObj = res.data.result
        // console.log(this.commentAllObj)
        for (var i=0;i<this.commentAllObj.length; i++){
            // console.log(i)
            if (this.commentAllObj[i].type == "1"){
              // console.log(this.commentAllObj[i])
              // console.log(i)
              this.commentArr.push(this.commentAllObj[i])
            }
            if (this.commentAllObj[i].type == "2"){
              // console.log(this.commentAllObj[i])
              this.replyArr.push(this.commentAllObj[i])
            }
            if (this.commentAllObj[i].type == "3"){
              // console.log(this.commentAllObj[i])
              this.replyToReplyArr.push(this.commentAllObj[i])
            }
        }
        // console.log(this.qqqq)
      }).catch(function(error){
        console.log("评论请求错误")
      });
    },
    components: {navgationHead,tree}
  }
</script>

<style scoped>
  *{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .page-box{
    min-width: 1024px;
    width:1024px;
    margin:0 auto;
  }
  .nav{
    background: #ddd;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .content-box{
    width: 109%;
    margin-top: 180px;
    height: 700px;
    display:flex;
  }
  .content-box .tree-box{
    width:30%;
  }
    .right-box .detail-box{
      height: 500px;
      width: auto;
      text-align: center;
    }
    .content-box .right-box{
      width: 80%;
      margin:0 0% 0 0%;
    }

    .right-box .nav-box{
      padding-right:82px;
      box-sizing:border-box;
      margin-top: 20px;
      height: 40px;
      /*background: lightseagreen;*/
      text-align: center;
      display: flex;
      border-bottom: 1px solid #333;
      box-sizing: content-box;
      margin-bottom: -0px;
    }
    .right-box .nav-box .nav-item{
      /*height: 40px;*/
      line-height: 40px;
      width: 12%;
      background: linen;
      border: 1px solid #444;
      color: red;
      border-radius: 5px 5px 0px 0;
      margin-left: 10px;
      text-align: center;
    }
    .right-box .nav-box .nav-item:first-child{
      margin-left: 10%;
    }
    .right-box .nav-box .nav-item{
      border-bottom: none;
      margin-bottom: -1px;
    }
    .right-box .nav-box .line{
      border-bottom: 1px solid black;
      color: #000;
    }

    .right-box .teaching-box{
      width: 90%;
      height: 400px;
      margin:0 5%;
      position: relative;
      background: #F3F3F3;
    }
    .right-box .courseVideo{
      height:525px;
      width:100%;
    }
    .right-box .courseVideo #video-box{
      width:100%;
      height:525px;
    }
    .right-box .course-box{
      width: 80%;
      height: 400px;
      margin:0 10%;
      position: relative;
      /*background: lavender;*/
      background: url("../assets/imgs/bbb.png") no-repeat center top;
      background-size: cover;
      /*padding: 130px 100px;*/
    }
    .right-box .contentSmallCourse{
      width: 100%;
      height: 450px;
      position: relative;
    }
    .right-box .devDownload{
      width:100%;
      height:53px;
      position:absolute;
      top:0;
      left:0;
      background:rgb(82,86,89);
    }
    .right-box .contentSmallCourse .pdf-box{
      width: 100%;
      height: 100%;
    }
    .right-box .courseDescribe{
      width: 80%;
      font-size: 16px;
      margin: 0 10% 0 10%;
      padding-top: 110px;
      font-weight: normal;
      /*background: red;*/
      word-wrap: break-word;
      text-align: left;
      text-indent: 2em;
    }
    .right-box .homework-box{
      width: 90%;
      height:400px;
      overflow:auto;
    }
    .right-box .homework{
      margin:0 5%;
      position: relative;
      background: #F3F3F3;
      text-align:left;
    }
    .right-box .homework-box .homeworkTitle{
      font-weight:bolder;
      margin-top:20px;
    }
    .right-box .homework-box .homeworkDesc{
      margin-left:20px;
    }
    .right-box .homework-box .homework_Answer{
      margin-left:20px;
      margin-top:10px;
    }
    .right-box .appraise-box{
      width: 90%;
      /*height: 400px;*/
      margin:0 5%;
      position: relative;
      top: 20px;
      /*background: lightyellow;*/
    }
  .right-box .courseTitle{
    font-size: 16px;
    /*font-weight: bold;*/
    /*background: red;*/
    margin-top: 10px;
  }
  .right-box .course-box .appraiseTitle{
    width: 500px;
    font-size: 16px;
    font-weight: normal;
    /*background: red;*/
    word-wrap: break-word;
  }

  .right-box .appraise-box .appraiseTitle{
    font-weight: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    margin: 0 30px;
    border-bottom: 1px solid #ccc;
  }
  .right-box .appraise-box textarea{
    margin-top: 20px;
    /*background: linen;*/
    height: 60px;
    width: 60%;
    font-size: 20px;
  }

  .right-box .appraise-box .appraiseTitle{
    font-weight: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    margin: 0 30px 30px;
    /*background: red;*/
    /*border-bottom: 1px solid #ccc;*/
  }
  .right-box .design-box{
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
  .appraise-box .shopList{
    margin-top: 20px;
    text-align: center;
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

  .appraise-box .all>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}

  /*.appraise-box .all>input:nth-of-type(1),*/

  /*.appraise-box .all>span:nth-of-type(1){display:none;}*/

  .appraise-box .all>span{font-size:1em;color:gold;

    -webkit-transition:color
    .2s;

    transition:color
    .2s;
  }
  .appraise-box .all>input:checked~span{color:#666;}

  .appraise-box .all>input:checked+span{color:gold;}
  #courseppt:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
  #courseWorkPage:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
</style>
