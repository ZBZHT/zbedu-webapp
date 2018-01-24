<template>
  <div>

    <div class="header-box">
      <navgation-head></navgation-head>
    </div>

    <div class="content-box">
      <div class="tree-box">
        <tree></tree>
    </div>
        <div class="right-box">

        <p class="courseTitle">111{{ noTree.title }}</p>

        <div class="detail-box">
          <ul class="nav-box">
            <li class="nav-item" v-for="(item,index) in detailNavData" @click="onclick(index)" :class="{'line': index !== currentIndex}">
              {{item }}
            </li>
          </ul>
          <div class="course-box" v-show="this.currentIndex === 0">

            <p class="courseDescribe" >{{ noTree.describe }}</p>
          </div>
          <div class="appraise-box" v-show="this.currentIndex === 3">

            <!--<div>-->
            <!--<p v-for="bb in commentArr">{{bb}}</p>-->
            <!--<hr>-->
            <!--<p v-for="cc in replyArr">{{cc}}</p>-->
            <!--<hr>-->
            <!--<p v-for="dd in replyToReplyArr">{{dd}}</p>-->
            <!--</div>-->

            <p class="appraiseTitle">{{ appraiseMsg }}</p>
            <p v-show="!commentArr.length">暂无评价</p>
            <div class="comment-box">
              <div v-for="(commentItem,index) in commentArr" v-show="commentItem.commentTitle === noTree.title">
                <div class="text-box">
                  <p @click="enterUserManagement" >用户名：<a href="">{{ commentItem.commentUser  }}</a></p>
                  <p >{{commentItem.commentText}}</p>
                </div>
                <div class="msg-box">
                  <p class="time-box">时间：{{ commentItem.commentTime }}</p>
                  <p class="star">
                      <span  :class="{'on': commentItem.commentScore>=0}"class="star-item" >
                      </span>
                    <span  :class="{'on': commentItem.commentScore>=1}" class="star-item" >
                      </span>
                    <span  :class="{'on': commentItem.commentScore>=2}" class="star-item" >
                      </span>
                    <span  :class="{'on': commentItem.commentScore>=3}" class="star-item" >
                      </span>
                    <span  :class="{'on': commentItem.commentScore>=4}" class="star-item" >
                      </span>
                  </p>
                  <p class="replyNum" @click="wantReply(commentItem,index)"><a href="#">回复</a></p>
                </div>
                <div class="reply-msg-box">
                  <ul v-show="replyArr.length">
                    <li v-for="(replyItem,index) in replyArr" v-show="replyItem.target === commentItem.commentUser && replyItem.commentTitle ===noTree.title">
                      <span>{{replyItem.commentUser}}：</span>
                      <span>{{replyItem.commentText}}</span>
                      <div class="replyTime-box">
                        <p>{{replyItem.commentTime}}</p>
                        <p @click="replyToReply(replyItem,index)"><a href="#">回复</a></p>
                      </div>

                      <div class="replyToReply-box">
                        <ul v-show="replyToReplyArr.length">
                          <li v-for="(replytoReplyItem,index) in replyToReplyArr" v-show="replytoReplyItem.target === replyItem.commentUser && replytoReplyItem.commentTitle ===noTree.title">
                            <span>{{replytoReplyItem.commentUser}}  回复   {{ replyItem.commentUser }}</span>
                            <span>{{replytoReplyItem.commentText}}</span>
                            <p>{{replytoReplyItem.commentTime}}</p>
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
        currentCoursrTitle:'',
        detailNavData:["课程详情","教学课件","教学微课","课程评价"],

        commentAllObj:[],
        commentArr:[],
        replyArr:[],
        replyToReplyArr:[],


        currentMsg:'',
        appraiseMsg: '全部评价',
        // comment:'',
        // commentTime:'',
        // commentScore:'',
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
        currentReplyToReply:-1
      }
    },
    computed:{
      noTree(){
        this.currentCoursrTitle = this.$store.state.noTree.title
        return this.$store.state.noTree;
      }
    },
    methods: {
      onclick: function (index) {
        this.currentIndex = index
        if (this.currentIndex === 1) {
          this.$router.push({name:'playPdf',params:'playPdf'})
        }
        if (this.currentIndex === 2) {
          this.$router.push({path: '/playVideo'})
        }
      },
      enterUserManagement () {
        this.$router.push('/userManagement')
      },
      dele: function (index) {
        this.replyArr.splice(index, 1)
      },
      submitComments () {
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
          // console.log(this.commentAllObj)
          // this.commentAllObj.push({
          //   type:1,
          //   commentTitle: 2222,
          //   commentUser:this.user,
          //   commentText:this.text,
          //   commentTime:this.currentdate,
          //   commentScore:this.inputdata,
          // })
          this.commentArr.push({
            type:1,
            commentTitle: this.appraiseMsg,
            commentUser:this.user,
            commentText:this.text,
            commentTime:this.currentdate,
            commentScore:this.inputdata,
          })
          this.text = ''
        }
      },
      wantReply(item,num){

        this.currentReplyOpen = num
        this.isAppearCommentBox = true
        // this.isAppearCommentBox = !this.isAppearCommentBox
      },
      submitReply(item,aa) {
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
        this.replyArr.push({
          type:2,
          commentTitle:this.appraiseMsg,
          commentUser:this.user,
          commentText:this.replyText,
          commentTime:this.replyTime,
          commentScore:'',
          target:item.commentUser
        })
        this.currentReplyOpen = -1
        this.replyText = ''
      },
      replyToReply(item, num){
        this.currentReplyToReply = num
        this.isAppearCommentBox1 = true
        // this.isAppearCommentBox1 = !this.isAppearCommentBox1
        // alert(num)
      },
      submitReplyToReply (item){

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
        this.replyToReplyArr.push({
          type:3,
          commentTitle:this.appraiseMsg,
          commentUser: this.user,
          commentText: this.replyToReplyText,
          commentTime: this.replyToReplyTime,
          commentScore:'',
          target:item.commentUser

        })
        this.replyToReplyText = ''
        // console.log(item)
        this.currentReplyToReply = -1
      }
    },
    mounted(){
      this.user = getCookie('username');
      // axios.get("/api/menu/comments",{
      axios.get("http://192.168.2.251:8000/readJson/comments",{
        params:{
          user:6666
        }
      }).then((res)=>{
        console.log(res.data.msg)
        // console.log(res.data.result)
        this.commentAllObj = res.data.result
        for (var i=0;i<this.commentAllObj.length; i++){
          if (this.commentAllObj[i].type === "1"){
            // console.log(this.commentAllObj[i])
            this.commentArr.push(this.commentAllObj[i])
          }
          if (this.commentAllObj[i].type === "2"){
            // console.log(this.commentAllObj[i])
            this.replyArr.push(this.commentAllObj[i])
          }
          if (this.commentAllObj[i].type === "3"){
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
  }
  .content-box .tree-box{
    width: 280px;
    height: 1000px;
    /*background: lightcyan;*/
    position: absolute;
    left: 60px;
  }
  .content-box .right-box{
    width: 800px;
    height: 700px;
    /*background: aliceblue;*/
    position: absolute;
    left: 350px;
  }
  .right-box .courseDescribe{
    /*background: pink;*/
    margin-bottom: 50px;
  }
   .right-box .detail-box{
    height: 500px;
    width: auto;
    text-align: center;
     margin-left: 50px;
  }
  .right-box .nav-box{
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
    width: 100px;
    background: linen;
    border: 1px solid #444;
    color: red;
    border-radius: 5px 5px 0px 0;
    margin-left: 10px;
    text-align: center;
  }
  .right-box .nav-box .nav-item:first-child{
    margin-left: 23%;
  }
  .right-box .nav-box .nav-item{
    border-bottom: none;
    margin-bottom: -1px;
  }
  .right-box .nav-box .line{
    border-bottom: 1px solid black;
    color: #000;
  }


  .right-box .course-box{
    width: 600px;
    height: 400px;
    margin-left: 7%;
    position: relative;
    /*background: lavender;*/
    background: url("../assets/bbb.png") no-repeat;
    padding: 130px 100px;
  }
  .right-box .courseTitle{
    font-size: 20px;
    font-weight: bold;
    /*background: red;*/
    margin-top: 30px;
  }
  .right-box .course-box .appraiseTitle{
    width: 500px;
    font-size: 16px;
    font-weight: normal;
    /*background: red;*/
    word-wrap: break-word;
  }
  .right-box .appraise-box{
    width: 700px;
    /*height: 400px;*/
    margin-left: 3%;
    position: relative;
    top: 20px;
    /*background: lightyellow;*/
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
  .appraise-box .text-box a{
    color: black;
    text-decoration: none;
  }
  .appraise-box .text-box a:hover{
    color: red;
    text-decoration: none;
  }
  .tree-box{
    background: #DDDDDD;
    width: 300px;
    margin-top: 80px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 16px;
    position: relative;

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
    background-image: url(../../src/assets/on.png);
  }
  .comment-box .msg-box .star-item.off{
    margin-top: 2px;
    background-image: url(../../src/assets/off.png);
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

</style>
