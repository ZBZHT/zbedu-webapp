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
                highlight-current
                @node-click="handleNodeClick"></el-tree>
            </el-col>

            <el-col :span="18">
                <!--教学中心-->
                <div>
                    <p class="exerP">{{noTree.label}}</p>
                    <el-tabs type="border-card">

                        <!--教材-->
                        <el-tab-pane label="本节简介">
                            <div class="courseDescribe" >
                                <p class="title">课程简介：</p>
                                <p class="desc">{{ noTree.describe }}</p>
                            </div>
                        </el-tab-pane>

                        <!--简介-->
                        <el-tab-pane label="本节教材">
                            
                        </el-tab-pane>

                        <!--课件-->
                        <el-tab-pane label="教学课件" id="courseppt">
                            <p class="devDownload" v-show="noTree.teachingMaterial"></p>
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
                        </el-tab-pane>

                        <!--微课-->
                        <el-tab-pane label="教学微课">
                            <div  v-for="item in noTree.videoTitle">
                                <video id="video-box" controls @click="videostop" :src="'/resource/video/courseVideoData/' + item.videoTitle">
                                </video>
                            </div>
                        </el-tab-pane>

                        <!--工作页-->
                        <el-tab-pane label="工作页" id="courseWorkPage">
                            <p class="devDownload" v-show="noTree.workPage"></p>
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
                        </el-tab-pane>

                        <!--课后作业-->
                        <el-tab-pane label="课后作业">
                            <div class="homework-box">
                                <div class="homework" v-for="(item,index) in noTree.homeWorkData">
                                <p class="homeworkTitle">{{index + 1}}. {{item.title}}</p>
                                <p class="homeworkDesc">{{item.desc}}</p>
                                    <span class="homework_Answer">正确答案：</span>
                                    <span class="homeworkAnswer" v-if="appAnswer">{{item.answer}}</span>
                                </div>
                            </div>
                            <el-button type="success" round @click="appearAnswer()">点击显示正确答案</el-button>
                        </el-tab-pane>

                        <!--评论-->
                        <el-tab-pane label="课程评价">
                            <div class="appraise-box">
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
                                    <el-button type="success" round @click="submitComments()">提交评论</el-button>
                                </div>
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
import footFooter from '@/components/common/footFooter'

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
  methods:{
    handleNodeClick(data) {
      //console.log(data);
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
        //console.log("2221")
      }


  },
  mounted(){
    axios.get("/readJson/bannerLeftData",{
        params:{
             user:234
        }
      }).then((res)=>{
          this.data = res.data[0].children;
          //console.log(this.data[0].label)
      }).catch(function(error){
          console.log("error init." + error)
      });

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
  components:{navgationHead,footFooter}
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
    width:100%;
    height:53px;
    position:absolute;
    top:0;
    left:0;
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
.newCourse-content .exerEngImg{
    width:595px;
    margin:0 auto;
    margin-bottom:20px;
}
.newCourse-content .exerEngImg img{
    width:100%;
}
.newCourse-content .pdf-box{
    width:100%;
  height: 800px;
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
  color: #ffffff;
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
    font-weight: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    margin: 0 30px;
    border-bottom: 1px solid #ccc;
  }
  .newCourse-content .appraise-box textarea{
    margin-top: 20px;
    /*background: linen;*/
    height: 60px;
    width: 60%;
    font-size: 20px;
  }

  .newCourse-content .appraise-box .appraiseTitle{
    font-weight: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    margin: 0 30px 30px;
    /*background: red;*/
    /*border-bottom: 1px solid #ccc;*/
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
    width: 100%;
    height: 100%;
  }
  #courseWorkPage:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
</style>
