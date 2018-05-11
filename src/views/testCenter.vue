<template>
<div class="testCenter">
    <div class="nav">

        <navgation-head></navgation-head>

    </div>
    <div class="topbox">
        <swipe :slides="slides" :inv="inv" :style="styleObject"></swipe>
    </div>

    <div class="middlebox">
        <div class="information">
            <p>考试通知</p>

            {{minutes}}..{{seconds}}
            <hr>
            <ul>
                <li v-for="item in information">
                    <p>{{item.num}}.{{item.src}}</p>
                </li>
            </ul>
        </div>
        <div class="ph-week" v-for="(item,index) in winner" :class="{phWeekMargin : index <= 0}">
            <p>{{item.title}}</p>
            <hr>
            <ul>
                <li v-for="item2 in item.stu">{{item2.num}}.{{item2.name}}</li>
            </ul>
        </div>
    </div>

    <div class="bottombox">
        <div class="hot-test">
            <p>最新考试</p>
            <hr>
            <ul class="test">
                <li class="test-li" v-for="item in hotTest">
                        <img :src="url_before + item.url">
                        <button class="btn" >
                            <router-link :to="'/test/' + item.testId + '/title/' + item.title">
                                {{item.title}}
                            </router-link>
                        </button>
                </li>
            </ul>
        </div>
        <div class="content-test">
            <p>课程考试 </p>
            <hr>
            <ul class="test">
                <li class="test-li" v-for="item in contentTest">
                        <img :src="url_before + item.url">
                        <button class="btn" type="button">
                            <router-link :to="'/test/' + item.testId + '/title/' + item.title">
                                {{item.title}}
                            </router-link>
                        </button>
                </li>
            </ul>
        </div>
        <div class="grade-test">
            <p>等级考试</p>
            <hr>
            <ul class="test">
                <li class="test-li" v-for="item in gradeTest">
                        <img :src="url_before + item.url">
                        <button class="btn">
                            <router-link :to="'/test/' + item.testId + '/title/' + item.title">
                                {{item.title}}
                            </router-link>
                        </button>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import navgationHead from '@/components/common/navgationHead'
import swipe from '@/components/testCenter/swipe'



export default {
  name: 'textCenter',
  data () {
    return {
        phWeekMargin:true,
        textCenterData:'',
        information:'',
        winner:'',
        hotTest:'',
        gradeTest:'',
        contentTest:'',
        slides: [],
        inv: 3000,
        styleObject: {
          width: '100%',
          height: '100%'
        },
        url:'',
        url_before:'src/assets/imgs/',
        minutes:'',
        seconds:'',
        timeLong:61,
        minutesAll:''
    }
  },
  created(){

  },
  mounted(){
      
      var gotTime = new Date().getTime() - 1525936549734;
      var minu = parseInt(gotTime/(60*1000));
      this.minutesAll = this.timeLong * 60 - parseInt(gotTime/1000);
      console.log(new Date().getTime());
      if(this.minutesAll >= 0){
        this.timeInterval();
      }else{
         
      }
      
  },
  methods:{
    timeInterval(){
  //      console.log("ddd")
        setTimeout(function () {
            this.minutesAll -= 1;
            if(this.minutesAll >= 0){
                this.secondTime(this.minutesAll);
                this.timeInterval();
            }else{
                alert("oooo");
                alert("时间到，已帮您提交");
                _this.submit();
            }

        }.bind(this),1000)
    },
    secondTime(time){
        console.log(time)
        this.minutes = parseInt(time / 60);
        this.seconds = time % 60;
        if(_this.seconds < 10){
            _this.seconds = "0" + _this.seconds;
        }
    }
  },
  watch:{
      '$route' (to,from) {
          alert(to);
          alert(from);
      }
  },
  components:{swipe,navgationHead}
}
</script>

<style scoped>
.btn{
    background-color:#e4393c;
    border-radius:5px;
    padding:8px;
}
.btn a{
    font-size:13px;
    color:#fff;
    border:0;
}
.testCenter{
    min-width:960px;
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
}
hr {
    margin-top: 3px;
    margin-bottom: 20px;
    border: 0;
    border-bottom: 2px solid #f00;
}
p{
    font-size: 16px;
    font-weight:bolder;
}
.topbox{
    width:960px;
    height:295px;
    margin:0 auto;
    position:relative;
    overflow:hidden;
    margin-bottom:0;
    margin-bottom: 40px;
}
.middlebox{
    width:960px;
    display: flex;
    margin:0 auto;
    margin-bottom: 40px;
}
.information{
    width:585px;
    height:145px;
    margin-right:22px;
    background-color:#ddd;
    text-align:left;
}
.information ul li{
   margin-bottom:5px;
   margin-left: 20px;
}
.information ul li p{
    font-size:15px;
    color:#f00;
}
.ph-week{
    width:280px;
    height:145px;
    background-color:#ddd;
    text-align:left;
}
.phWeekMargin{
    margin-right:23px;
}
.ph-week ul li{
    margin-bottom:5px;
    margin-left: 22px

}
.bottombox{
    width:960px;
    margin-top:40px;
    margin:0 auto;
    /*border:1px solid #000;*/
    text-align:left;
}
.hot-test{
    width:960px;
    /*border:1px solid #000;*/
    margin-bottom:30px;
}
.bottombox .test{
    margin-left:15px;
}
.bottombox .test .test-li{
    display: inline-block;
    width:169px;
    height:165px;
    /*border:1px solid #000;*/
    margin-right:20px;
    margin-bottom:20px;
    text-align: center;
}
.bottombox .test .test-li .btn{
    margin-top:10px;
}
.grade-test{
    width:960px;
    margin-bottom:30px;
    /*border:1px solid #000;*/
}
.content-test{
    width:960px;
}
.tecono-title{
    text-align: center;
    font-size:22px;
}
</style>
