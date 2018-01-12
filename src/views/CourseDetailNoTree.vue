<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
      <div class="right-box">
        <p class="courseTitle">{{ currentCourseData.title }}</p>
        <div class="detail-box">
          <ul class="nav-box">
            <li v-for="(item,index) in detailNavData" @click="onclick(index)" :class="{'line': index !== currentIndex}">
              {{ item.title}}
            </li>
          </ul>
          <div class="course-box" v-show="this.currentIndex === 0">
            <p class="introduce">{{ currentCourseData.describe }}</p>
          </div>
          <div class="appraise-box" v-show="this.currentIndex === 3">
            <p class="appraiseTitle">{{ appraiseMsg }}</p>
            <div class="comment-box">


              <div v-for="person in personMsg">
                <p>{{person.comment}}</p>
                <p>{{person.commentTime }}</p>
                <p>{{person.score}}</p>
              </div>



              <div v-for="person in personMsg" >
                  <div class="text-box">
                    <p>用户名：aaaa</p>
                    <p>{{person.comment}}</p>
                    <!--<span v-on:click="dele(index)">❎</span>-->
                  </div>
                  <div class="msg-box">
                    <p class="time-box">时间：{{ person.commentTime }}</p>
                    <p>源自：{{currentCourseData.title}}</p>
                    <p class="all">

                      <input
                        type="radio"
                        name="nameType"
                        value="0" v-model="score" checked="" disabled="disabled"/>
                      <span>★</span>
                      <input
                        type="radio"
                        name="nameType"
                        value="1" v-model="score" checked="" disabled="disabled"/>
                      <span>★</span>
                      <input
                        type="radio"
                        name="nameType"
                        value="2" v-model="score" checked="" disabled="disabled"/>
                      <span>★</span>
                      <input
                        type="radio"
                        name="nameType"
                        value="3" v-model="score" checked="" disabled="disabled"/>
                      <span>★</span>
                      <input
                        type="radio"
                        name="nameType"
                        value="4" v-model="score" checked="" disabled="disabled"/>
                      <span>★</span>
                      <!--<input-->
                      <!--type="radio"-->
                      <!--name="nameType"-->
                      <!--value="5" v-model="score" checked="" disabled="disabled"/>-->
                      <!--<span>★</span>-->

                    </p>
                    <p>{{ arrData[score]}}</p>
                  </div>
                <hr>
              </div>
            </div>
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

<script>

  import navgationHead from '@/components/common/navgationHead'
  import bus from '../assets/js/Bus'
  var i=0;
  var busData = {

  };
  bus.$on('passBannerLeftData', (value) => {
    busData.currentCourseData = value

  });
  export default {
    name: 'user',
    data () {
      return {
        currentIndex: 0,
        appraiseMsg: '全部评价',
        line: true,
        msg: '',
        currentCourseData:busData.currentCourseData,
        detailNavData: [
          {
            "title": "课程详情"
          },
          {
            "title": "教学课件"
          },
          {
            "title": "教学微课"
          },
          {
            "title": "课程评价"
          }
        ],
        personMsg:[],
        comment:'',
        commentTime:'',
        inputdata: 0,
        arrData: ['一星', '两星', '三星', '四星', '五星'],
        currentdate: '',
        nanmeType: '',
        score: 0
      }
    },
    methods: {
      onclick: function (index) {
        this.currentIndex = index
        if (this.currentIndex === 1) {
           this.$router.push({path: '/playPdf'})
        }
        if (this.currentIndex === 2) {
          this.$router.push({path: '/playVideo'})
        }
      },
      // dele: function (index) {
      //   this.arr.splice(index, 1)
      // },
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
            score:this.inputdata +"1"
          })

          this.nameType = ++i
          // this.score = this.inputdata


          this.text = ''
          console.log(this.arr)
        }

        // alert(this.currentdate)
    },
    },
    watch: {
      inputdata (value) {
        console.log(value)
      }
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
    padding: 0 10%;
  }

  .content-box .right-box{
    width: 80%;
    min-width: 1000px;
    height: 700px;
    /*background: aliceblue;*/
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
    text-align: center;
  }
  .right-box .nav-box{
    /*list-style: none;*/
    height: 40px;
    /*background: lightseagreen;*/
    display: flex;
    width: 100%;
    border-bottom: 1px solid #333;
    text-align: center;
  }
  .right-box .nav-box li{
    /*height: 40px;*/
    line-height: 40px;
    width: 130px;
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
    margin-left: 23%;
  }
  .right-box .course-box{
    width: 700px;
    height: 400px;
    margin: 0 18%;
    position: relative;
    /*background: lavender;*/
    background: url("../assets/bbb.png") no-repeat;
    padding: 130px 100px;
  }

  .right-box .course-box .introduce{
    width: 500px;
    font-size: 16px;
    font-weight: normal;
    /*background: red;*/
    word-wrap: break-word;
  }

  .right-box .appraise-box{
    width: 900px;
    margin-left: 50px;
    margin-bottom: 100px;
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
    /*background: pink;*/
    border-bottom: 1px solid #ccc;
  }
  .right-box .appraise-box textarea{
    margin-top: 20px;
    height: 60px;
    width: 60%;
    font-size: 20px;
    outline: none;
  }
  .right-box .detail-box .appraise-box .comment-box{
    margin: 0 50px 0 50px;
    /*background: hotpink;*/
  }
  .right-box .appraise-box .comment-box .text-box{
    padding-top: 10px;
    /*background: red;*/
  }
  .right-box .appraise-box .text-box p{
    font-size: 14px;
    font-weight: normal;
    text-align: left;
    margin-bottom: 10px;
  }
  .right-box .comment-box .msg-box{
    /*background: pink;*/
    height: 20px;
  }
  .right-box .appraise-box .comment-box .msg-box p{
    display: inline-block;
    float: left;
    font-size: 12px;
    font-weight: normal;
    margin-left: 20px;
    color: #93999F;
  }
  .right-box .appraise-box .comment-box .msg-box p:first-child{
    margin-left: 0;
  }
  .right-box .appraise-box .shopList{
    margin-top: 20px;
    text-align: center;
  }
  .right-box .appraise-box .shopList p{
    display: inline-block;
  }
  .right-box .appraise-box .shopList p:last-child{
    margin-left: 30px;
  }
  .right-box .appraise-box .shopList .commit-btn{
    width: 60px;
    height: 30px;
    outline: none;
    position: relative;
    margin-top: 20px;
    /*background: red;*/
    cursor: pointer;
  }
  .right-box .appraise-box .shopList .commit-btn:active{
    top: 2px;
  }

  .right-box .appraise-box .all>input{opacity:0;position:absolute;width:2em;height:2em;margin:0;}


  .right-box .appraise-box .all>span{font-size:1em;color:gold;

    -webkit-transition:color
    .2s;

    transition:color
    .2s;
  }
  .right-box .appraise-box .all>input:checked~span{color:#666;}

  .right-box .appraise-box .all>input:checked+span{color:gold;}

</style>
