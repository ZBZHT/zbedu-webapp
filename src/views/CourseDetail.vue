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
            <p class="appraiseTitle">{{ appraiseMsg }}</p>
            <p v-show="!personMsg.length">暂无评价</p>
            <div class="comment-box">
              <div v-for="(person,index) in personMsg" >
                <div class="text-box">
                  <p>用户名：<a href="#" title="用户名">{{ person.user }}</a></p>
                  <p>{{person.comment}}</p>
                  <!--<span v-on:click="dele(index)">❎</span>-->
                </div>
                <div class="msg-box">
                  <p class="time-box">时间：{{ person.commentTime }}</p>
                  <p class="all">
                    评分：
                    <input
                      type="radio"
                      name="nameType"
                      value="0" v-model="person.courseStarNum" checked="" disabled="disabled"/>
                    <span>★</span>
                    <input
                      type="radio"
                      name="nameType"
                      value="1" v-model="person.courseStarNum" checked="" disabled="disabled"/>
                    <span>★</span>
                    <input
                      type="radio"
                      name="nameType"
                      value="2" v-model="person.courseStarNum" checked="" disabled="disabled"/>
                    <span>★</span>
                    <input
                      type="radio"
                      name="nameType"
                      value="3" v-model="person.courseStarNum" checked="" disabled="disabled"/>
                    <span>★</span>
                    <input
                      type="radio"
                      name="nameType"
                      value="4" v-model="person.courseStarNum" checked="" disabled="disabled"/>
                    <span>★</span>
                    <!--<input-->
                    <!--type="radio"-->
                    <!--name="nameType"-->
                    <!--value="5" v-model="score" checked="" disabled="disabled"/>-->
                    <!--<span>★</span>-->

                  </p>
                  <p>{{ arrData[person.courseStarNum]}}</p>
                  <p class="replyNum" @click="wantReply(index)"><a href="#">回复</a></p>
                </div>
                <div class="reply-box" v-show="(isAppearCommentBox && currentReplyOpen === index)">
                  <ul>
                    <li v-for="(item,index) in replyArr">{{index + item.replyMsg }}
                      <span v-on:click="dele(index)">❎</span>
                    </li>
                  </ul>
                  <textarea type="text" v-model="replyText"></textarea>
                  <button @click="submitReply(index)">提交回复</button>
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
import navgationHead from '@/components/common/navgationHead'
import tree from '@/components/courseTree/tree'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'



  export default {
    name: 'user',
    data () {
      return {
        currentIndex: 0,
        detailNavData:["课程详情","教学课件","教学微课","课程评价"],
        currentMsg:'',
        personMsg:[],
        appraiseMsg: '全部评价',
        comment:'',
        commentTime:'',
        courseStarNum:'',
        inputdata: 0,
        arrData: ['一星', '两星', '三星', '四星', '五星'],
        currentdate: '',
        nanmeType: '',
        isAppearCommentBox: false,
        replyArr:[],
        replyMsg:'',
        text:'',
        replyText:'',
        currentReplyOpen:-1
      }
    },
    computed:{
      noTree(){
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
          this.personMsg.push({
            comment:this.text,
            commentTime:this.currentdate,
            courseStarNum:this.inputdata,
            user:this.user
          })

          // this.nameType = ++i

          this.text = ''
          console.log(this.arr)
        }

      },
      wantReply(num){
        this.currentReplyOpen = num
        this.isAppearCommentBox = !this.isAppearCommentBox
      },
      submitReply(aa) {
        this.replyArr.push({replyMsg:this.replyText})
      }
    },
    mounted(){
      this.user = getCookie('username');
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
    background: lightyellow;
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
    font-weight: normal;
    text-align: left;
    margin-bottom: 10px;
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
