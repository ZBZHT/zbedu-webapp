<template>
  <div class="noTree-box">
    <div class = "notree-box1">
      <div class="header-box">
        <navgation-head></navgation-head>
      </div>
      <div class="content-box">
        <div class="right-box">
          <p class="courseTitle">{{ noTree.title }}</p>
          <div class="detail-box">
            <ul class="nav-box">
              <li v-for="(item,index) in detailNavData" @click="onclick(noTree,index)" :class="{'line': index !== currentIndex}">
                {{ item}}
              </li>
            </ul>
            <div class="teaching-box" v-show="this.currentIndex === 0">

              <p class="teaching" >待上传</p>
            </div>
            <div class="course-box" v-show="this.currentIndex === 1">
              <p class="introduce">{{ noTree.describe }}</p>
            </div>
            <div class="homework-box" v-show="this.currentIndex === 4">

              <p class="homework">待上传</p>
            </div>
            <!--<div class="design-box" v-show="this.currentIndex === 5">-->

            <!--<p class="design">待上传</p>-->
            <!--</div>-->
            <div class="appraise-box" v-show="this.currentIndex === 5">

              <!--<div>-->
              <!--<p v-for="bb in commentArr">{{bb}}</p>-->
              <!--<hr>-->
              <!--<p v-for="cc in replyArr">{{cc}}</p>-->
              <!--<hr>-->
              <!--<p v-for="dd in replyToReplyArr">{{dd}}</p>-->
              <!--</div>-->

              <!--<p>{{this.commentObjArr}}</p>-->
              <p class="appraiseTitle">{{ appraiseMsg }}</p>
              <p v-show="!commentArr.length">暂无评价</p>
              <div class="comment-box">
                <div v-for="(commentItem,index) in commentArr" v-show="commentItem.title === noTree.title">
                  <div class="text-box" >
                    <p @click="enterUserManagement" >用户名：<a href="">{{ commentItem.user  }}</a></p>
                    <p >{{commentItem.text}}</p>
                    <!--<p>{{// commentItem.title}}</p>-->
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
                      <li v-for="(replyItem,index) in replyArr" v-show="replyItem.target == commentItem.user && replyItem.title == noTree.title && replyItem.targetId == commentItem.num">
                        <!--<li v-for="(replyItem,index) in replyArr" v-show="replyItem.target === commentItem.user && replyItem.title === noTree.title && replyItem.targetId === commentItem.num">-->
                        <span>{{replyItem.user}}：</span>
                        <span>{{replyItem.text}}</span>
                        <div class="replyTime-box">
                          <p>{{replyItem.time}}</p>
                          <p @click="replyToReply(replyItem,index)"><a href="javascript:void(0)">回复</a></p>
                        </div>
                        <div class="replyToReply-box">
                          <ul v-show="replyToReplyArr.length">
                            <li v-for="(replytoReplyItem,index) in replyToReplyArr" v-show="replytoReplyItem.target == replyItem.user && replytoReplyItem.title ==noTree.title && replytoReplyItem.targetId == replyItem.num">
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
                  <hr >
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
            <div class="teaching-box" v-show="this.currentIndex === 6">

              <p class="teaching" >待上传</p>
            </div>
            <div class="teaching-box" v-show="this.currentIndex === 7">

              <p class="teaching" >待上传</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import axios from 'axios'
  import navgationHead from '@/components/common/navgationHead'
  import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'

  export default {
    name: 'user',
    data () {
      return {
        score: 0,
        user:'',
        currentIndex: 0,
        currentCoursrTitle:'',
        appraiseMsg: '全部评价',
        line: true,
        msg: '',
        detailNavData:["本节教材","本节简介","教学课件","教学微课","课后作业","课程评价","工作页","二维动画"],
        commentAllObj:[],
        currentPageCommentObj:[],
        qqqqArr:[],
        commentArr:[],
        replyArr:[],
        replyToReplyArr:[],
        // text:'',
        // time:'',
        // score:'',
        inputdata: 0,
        arrData: ['一星', '两星', '三星', '四星', '五星'],
        currentdate: '',
        isAppearCommentBox: false,
        isAppearCommentBox1: false,
        text:'',
        replyText:'',
        replyToReplyText:'',
        currentReplyOpen:-1,
        currentReplyToReply:-1,
        url:''
      }
    },
    computed:{
      noTree(){
        this.currentCoursrTitle = this.$store.state.noTree.title
        return this.$store.state.noTree;
      },
      itemClasses () {

        let result = []
        let score = Math.floor(this.score * 2) / 2
        let integer = Math.floor(score)
        for (let i = 0; i < integer; i++) {
          result.push('on')
        }
        while (result.length < 5) {
          result.push('off')
        }
        return result
      }

    },
    methods: {
      onclick: function (courseMsg,index) {
        this.currentIndex = index
        // console.log(courseMsg)
        if (this.currentIndex === 2) {
           this.$router.push('/playPdf/'+this.$route.params.courseId + '/pdf/' + this.$route.params.title)
        }
        if (this.currentIndex === 3) {
          this.$route.params.title
          this.$router.push('/playVideo/'+ this.$route.params.courseId + '/video/' + this.$route.params.title)
        }
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
            // console.log(999999)

            this.commentAllObj.push({
              type:1,
              num:this.commentAllObj.length+1,
              source:"course",
              title: this.currentCoursrTitle,
              user:this.user,
              text:this.text,
              time:this.currentdate,
              score:this.inputdata,
              targetId:'',
              target:''
            })
            // console.log(this.currentCoursrTitle)
            this.commentArr.push({
              type:1,
              num:this.commentAllObj.length + 1,
              source:"course",
              title: this.currentCoursrTitle,
              user:this.user,
              text:this.text,
              time:this.currentdate,
              score:this.inputdata,
              targetId:'',
              target:''
            })
            // console.log(this.commentAllObj.length)
            axios({
              method:'get',
              url:"/readComments/update",
              params:{
                type:1,
                num:this.commentAllObj.length + 1,
                title: this.currentCoursrTitle,
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
            this.commentAllObj.push({
              type:2,
              num:this.commentAllObj.length+1,
              source:"course",
              title: this.currentCoursrTitle,
              user:this.user,
              text:this.text,
              time:this.currentdate,
              score:this.inputdata,
              target:item.user,
              targetId:item.num
            })
            this.replyArr.push({
              type:2,
              num:this.commentAllObj.length +1 ,
              source:"course",
              title:this.currentCoursrTitle,
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
                num:this.commentAllObj.length +1 ,
                source:"course",
                title:this.currentCoursrTitle,
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
      enterUserManagement () {
        this.$router.push('/userManagement')
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
            num:this.commentAllObj.length + 1,
            source:"course",
            title: this.currentCoursrTitle,
            user:this.user,
            text:this.text,
            time:this.currentdate,
            score:this.inputdata,
            target:item.user,
            targetId:item.num
          })
          this.replyToReplyArr.push({
            type:3,
            num:this.commentAllObj.length + 1,
            source:"course",
            title:this.currentCoursrTitle,
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
              title:this.currentCoursrTitle,
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
      }
    },
    mounted(){
      this.url = document.domain;
      this.user = this.$store.state.username;

      console.log('9999')

      console.log(this.user)
        axios.get("/readComments/all",{
        params:{
          user:6666
        }
      }).then((res)=>{
        console.log(res.data.msg)
        this.commentAllObj = res.data.result
          console.log(this.commentAllObj)
        for (var i=0;i<this.commentAllObj.length; i++){
          if (this.commentAllObj[i].title == this.currentCoursrTitle) {
            this.currentPageCommentObj.push(this.commentAllObj[i])
            // console.log(i)
            // console.log(this.currentPageCommentObj)
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
        }
      }).catch(function(error){
        console.log("评论请求错误")
      });
    },
    watch: {

    },
    components: {
      navgationHead
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .noTree-box{
    min-width: 960px;
  }
  .notree-box1{
    width: 960px;
    margin: 0 auto;
    /*background: pink;*/
  }
  .nav{
    background: #ddd;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .content-box{
    width: 100%;
    min-width: 960px;
    margin-top: 150px;
    height: 700px;
    /*background: lightgoldenrodyellow;*/
    position: relative;
    /*padding: 0 15%;*/
  }

  .content-box .right-box{
    width: 100%;
    height: 700px;
    /*background: aliceblue;*/
    position: relative;
    /*margin: 0 150px;*/

  }
  .right-box .courseTitle{
    font-size: 20px;
    font-weight: bold;
    /*background: pink;*/
    margin-bottom: 50px;
  }
  .right-box .detail-box{
    height: 500px;
    width: auto;
    /*text-align: center;*/
    /*background: pink;*/
  }
  .right-box .nav-box{
    /*list-style: none;*/
    height: 40px;
    /*background: lightseagreen;*/
    display: flex;
    width: 100%;
    border-bottom: 1px solid #333;
    text-align: center;
    padding-right:44px;
  }
  .right-box .nav-box li{
    /*height: 40px;*/
    line-height: 40px;
    width: 10%;
    background: linen;
    color: red;
    border: 1px solid #444;
    border-radius: 5px 5px 0px 0;
    margin-left: 10px;

  }
  .right-box .nav-box li{
    border-bottom: none;
    margin-bottom: -1px;
  }
  .right-box .nav-box .line{
    border-bottom: 1px solid #000;
    color: #000;

  }
  .right-box .nav-box .fontColor{
    color: red;
  }
  .right-box .nav-box li:first-child{
    margin-left: 8%;
  }
  .right-box .course-box{
    /*width: 700px;*/
    height: 400px;
    margin: 20px 15%;
    background: url("../assets/imgs/bbb.png") no-repeat center top;
    background-size: cover;
    /*background: lavender;*/

  }

  .right-box .course-box .introduce{
    width: 60%;
    font-size: 16px;
    padding: 200px 20% 0 20%;
    font-weight: normal;
    /*background: red;*/
    word-wrap: break-word;
  }

  .right-box .appraise-box{
    /*width: 900px;*/
    margin:20px 5%;
    margin-bottom: 100px;
    /*background: lightyellow;*/
  }
  .right-box .appraise-box .appraiseTitle{
    font-weight: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    margin: 0 30px;
    /*background: pink;*/
    margin-bottom: 30px;
    border-bottom: 1px solid #ccc;
  }
  .appraise-box textarea{
    margin-top: 20px;
    height: 60px;
    width: 60%;
    font-size: 20px;
    outline: none;
  }

  .right-box .teaching-box{
    width: 60%;
    height: 200px;
    margin: 20px 10%;
    background: #F3F3F3;
    padding: 130px 100px;
  }
  .right-box .homework-box{
    width: 60%;
    height: 200px;
    margin: 20px 10%;
    background: #F3F3F3;
    padding: 130px 100px;
  }
  /*.right-box .design-box{*/
    /*width: 750px;*/
    /*height: 200px;*/
    /*margin-left: 8%;*/
    /*position: relative;*/
    /*background: #F3F3F3;*/
    /*padding: 130px 100px;*/
    /*margin-top: 20px;*/
  /*}*/
  .detail-box .appraise-box .comment-box{
    margin: 0 50px 0 50px;
    /*background: hotpink;*/
  }
  .appraise-box .comment-box .text-box{
    padding-top: 10px;
    /*background: red;*/
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
  .appraise-box .comment-box .text-box a{
    color: black;
    text-decoration: none;
  }
  .appraise-box .comment-box .text-box a:hover{
    color: red;
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
    display: inline-block;
    background-repeat: no-repeat;
    width: 15px;
    height: 15px;
    /*margin-right: 2px;*/
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

  .appraise-box .comment-box .msg-box p{
    display: inline-block;
    float: left;
    font-size: 12px;
    font-weight: normal;
    margin-left: 20px;
    color: #93999F;
  }
  .appraise-box .comment-box .msg-box p:first-child{
    margin-left: 0;
  }

  .appraise-box .comment-box .msg-box .replyNum a{
    margin-left: 50px;
    color: #93999F;
    text-decoration: none;
  }
  .appraise-box .comment-box .msg-box .replyNum a:hover{
    color: green;
  }
  .comment-box .reply-msg-box{
    /*background: pink;*/
    border-radius: 3px;
    background: #F7F7F7;
  }
  .comment-box .reply-msg-box li{
    margin-left: 30px;
    margin-top: 10px;
    /*background: yellow;*/
    text-align: left;
  }
  .comment-box .reply-msg-box li {
    font-size: 14px;
    font-weight: bold;
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
  .comment-box .reply-msg-box .replyToReply-box{

  }
  .comment-box .reply-msg-box .replyToReply-box li{
    margin-left: 0;
    font-size: 12px;
    font-weight: normal;
    margin-bottom: 5px;
  }

  .comment-box .reply-input-box{
    /*width: 500px;*/
    /*height: 100px;*/
    margin: 0 auto;
    /*background: linen;*/
    text-align: center;
  }
  .comment-box .reply-input-box textarea{
    width: 400px;
    height: 60px;
    margin-top: 0;
  }
  .appraise-box .shopList{
    margin-top: 20px;
    text-align: center;
  }
  .shopList p{
    display: inline-block;
  }
  .appraise-box .shopList p:last-child{
    margin-left: 30px;
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
  .appraise-box .all>span{font-size:1em;color:gold;

    -webkit-transition:color
    .2s;

    transition:color
    .2s;
  }
  .appraise-box .all>input:checked~span{color:#666;}

  .appraise-box .all>input:checked+span{color:gold;}







</style>
