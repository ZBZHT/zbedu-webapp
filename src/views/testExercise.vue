<template>
  <div>
    <div class="title">
        <test-head></test-head>
    </div>
    <div class="question" id="content" :style="{height: height - 138 + 'px'}">
      <div class="leftBox">
        <div class="userPicFont">
            <nav-user></nav-user>
        </div>
        <div v-show="textQuestionData">
            <!--<div class="leftItem">-->
                <!--<p>开始时间</p>-->
                <!--<span>{{startTestTime}}</span>-->
            <!--</div>-->
            <div class="leftItem">
                <p>倒计时</p>
                <span class="time">{{minutes}}</span>'<span class="time">{{seconds}}</span>
            </div>
        </div>
      </div>
      <div class="rightBox">
        <div class="testOnline" v-show="currIndex === 0">

          <div class="content">
            <div class="data">
              <div class="desc" v-for="(item,index) in textQuestionData">
                  <span class="desctitle">
                      <a @click="tip(index)">
                          <i class="el-icon-location-outline" :class='{tipIcon:tipIcon[index]}'></i>
                      </a>
                      {{index + 1}}.{{item.desc}}
                  </span>
                <ul class="ans">
                  <li>
                    <label :for="item.forId[0]" v-if="item.options[0]" class="ans-label">
                      <input :id="item.forId[0]" :type="item.type" value="A" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                      {{item.options[0]}}
                    </label>
                    <label :for="item.forId[1]" v-if="item.options[1]" class="ans-label">
                      <input :id="item.forId[1]" :type="item.type" value="B" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                      {{item.options[1]}}
                    </label>
                    <label :for="item.forId[2]" v-if="item.options[2]" class="ans-label">
                      <input :id="item.forId[2]" :type="item.type" value="C" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                      {{item.options[2]}}
                    </label>
                    <label :for="item.forId[3]" v-if="item.options[3]" class="ans-label">
                      <input :id="item.forId[3]" :type="item.type" value="D" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                      {{item.options[3]}}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
            <div class="number">
              <ul class="number-ul">
                <li v-for="(item,index) in textQuestionData">
                  <a :class='{tip:classItem[index],isCheck : isCheckArr[index]}'>{{ index + 1 }}</a>
                </li>
              </ul>
              <div class="status">
                <div class="do">
                  <p class="doP isCheck">{{isCheckNum}}</p>
                  <p>已答题</p>
                </div>
                <div class="do">
                  <p class="doP">{{AllLength - isCheckNum}}</p>
                  <p>未答题</p>
                </div>
                <div class="do">
                  <p class="doP tip"></p>
                  <p>标记题</p>
                </div>
              </div>
              <button @click='submit()' class="btn" :class="{answer : !answer}" v-show="textQuestionData">提交</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import testHead from '@/components/common/testHead'
  import footFooter from '@/components/common/footFooter'
  import Modal from '@/components/testCenter/modal';
  import navUser from '@/components/common/navUser';
  import core from '../assets/js/core.js';

  export default {
    name: 'testExercise',
    data () {
      return {
        textQuestionData: '',
        minutes: 120,
        seconds: 0,
        dispear: true,
        answer: true,
        myAns: '',
        myNumber: '',
        questionIndex: '',
        errorIndex: [],
        sorce: 0,
        error: [],
        setRed: false,
        submits: false,
        nowTime: '',
        currentdate: '',
        startTestTime:'',
        hours: '',
        minute: '',
        second: '',
        currIndex: 0,
        user: this.$store.state.username,
        time: 0,
        isCheck: '',
        isCheckNum: 0,
        isCheckArr: [],
        AllLength: '',
        classItem: {},
        tipIcon:{},
        QidArr: [],
        null: [],
        userMessageData: '',
        picked: [],
        Display: false,
        lengthData: '',
        url: document.domain,
        showModal: false,
        showModal1: false,
        currTestInfor: [],
        currTestRes: [],
        currTestId: '',
        interval: {},
        TestNum: 0,
        fullscreenLoading: false,
        currTestNum: '',
        height:window.innerHeight,
        testAllData:'',

      }
    },
    created(){

      window.onkeydown = function(){
        if(checkFull()){
          if(window.event.keyCode === 27){
            alert("...")
            event.preventDefault();
          }
        }
      };

      function checkFull(){
        var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;

        //to fix : false || undefined == undefined
        if(isFull === undefined) isFull = false;
        return isFull;
      }

    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted(){
      window.addEventListener('resize', this.handleResize);
      setTimeout(function(){
        //var allTestNum = this.$store.state.allTestNum ;
        //var url = document.domain;
        var _this = this;
        //倒计时
        var time = window.setInterval(function () {

          if (_this.seconds == 0 && _this.minutes != 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
          }else if(_this.minutes == 0 && _this.seconds == 0){
            _this.seconds = 0;
            window.clearInterval(time);
          }else{
            _this.seconds -= 1
          };
          if(_this.minutes == 0 && _this.seconds == 0){
            window.clearInterval(time);
            alert("时间到，已帮您提交");
            _this.submit();
          };
          if(_this.seconds < 10){
            _this.seconds = "0" + _this.seconds;
          }

        },1000);

        _this.dispear = !_this.dispear;
        _this.nowTime = new Date();
        //给考试管理存时间
        var seperator1 = '-';
        var seperator2 = ':';
        var month = _this.nowTime.getMonth();
        var strDate = _this.nowTime.getDate();

        //给在线考试存时间
        _this.hours = _this.nowTime.getHours();
        _this.minute = _this.nowTime.getMinutes();
        if(_this.minute >= 0 && _this.minute <= 9){
          _this.minute = "0" + _this.minute;
        }
        _this.second = _this.nowTime.getSeconds();
        if(_this.second >= 0 && _this.second <= 9){
          _this.second = "0" + _this.second;
        }

        if (month >= 0 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        _this.currentdate = _this.nowTime.getFullYear() + seperator1 + month + seperator1 + strDate
          + ' ' + _this.nowTime.getHours() + seperator2 + _this.minute + seperator2 + _this.second;

        this.getTestQ();
        //this.getTestQuesInfo();
      }.bind(this),500)

    },
    watch: {
      second:{
        handler(newVal){
          this.num(newVal)
        }
      },
      minute:{
        handler(newVal){
          this.num(newVal)
        }
      }
    },
    methods:{
      handleResize (event) {
        this.height = window.innerHeight;
        if(this.height <= "620"){
            this.height = 598;
        }
      },
      getTestQ() {
        axios.get("/readTestQuestion/getTestExercise", {
          params: {
            user: this.user,
          }
        }).then((res) => {
          if (res.data.testQuestion.state == 1 && res.data.testQuestion.currTestType == 106) {
            console.log("11")
              console.log(res.data);
            this.testAllData = res.data.testQuestion;
            this.currTestNum = res.data.testQuestion.currTestNum;
            this.textQuestionData = res.data.testQuestion.question;
            this.minutes = parseInt(res.data.testQuestion.timeHour *60) + parseInt(res.data.testQuestion.timeMin);
            this.AllLength = res.data.testQuestion.question.length;
          } else {
            this.TestNum = res.data.testQuestion.testLength;
          }
        }).catch(function (error) {
          console.log("error init." + error)
        });
      },

      /*获取考试题*/
      getTestQuesInfo() {
        axios.get("/readTestQuestionInfo/getTestExerciseInfo", {
          params: {
            user: this.user,
          }
        }).then((res) => {
          //考试题的唯一编号
//          console.log("111")
//          console.log(res.data);
          this.currTestNum = res.data.currTestNum;
          this.startTestTime = core.formatDate("yyyy-MM-dd hh:mm:ss", new Date(res.data.startTime));
          if(res.data.state == 1 && res.data.currTestType == 106){
            this.picked = res.data.currAnswer;
            this.QidArr = res.data.currIsId;
            this.isCheckArr = res.data.currState;
            this.isCheckNum = res.data.isCheckNum;
          }
          console.log(this.currTestNum);
        }).catch(function (error) {
          console.log("错误")
        });
      },
      // 错误信息提示
      errorMsg(msg) {
        this.$message.error(msg);
      },

      submit:function () {
        this.sorce=0;
        this.error = [];
        for(var i = 0;i < this.QidArr.length;i++){
          if(this.QidArr[i] != null && this. QidArr[i] != ''){
            if(this.textQuestionData[i].answer == this.picked[i]){

              this.sorce += 1;
            }else{
              this.error.push(i+1);
            }
          }else{
            this.null.push(i+1);
          }
        }
        this.$store.commit('stillBtn',false);
        setTimeout(function(){
          window.clearInterval(this.interval);
          axios.get("/readTestQuestionInfo/submitQuestionInfo",{
            params:{
              user:this.user,
              currTestNum:this.currTestNum,
              startTime:this.currentdate,
              currAnswer:this.picked,
              currState:this.isCheckArr,
              error:this.error,
              sorce:this.sorce,
              testTimeMinutes:this.minutes,
              testTimeSeconds:this.seconds,
              currIsId:this.QidArr,
              isCheckNum:this.isCheckNum
            }
          }).then(
            function (res) {
              //console.log(res.data.code);
              if (res.data.code == 0) {
                alert("提交成功");
                window.close();
              } else {
                this.errorMsg('未提交成功')
              }

            }
          );
        }.bind(this),200);
      },
      num:function (n) {
        return n<10 ? "0" + n : "" + n
      },

      myAnswer:function(id,index){
        this.lengthData = this.textQuestionData.length;
        this.QidArr[index] = id;
        console.log(this.QidArr);
        var a = 0;
        for(var i = 0;i < this.QidArr.length;i++){
          if(this.QidArr[i] != null){
            a+=1;
            this.isCheckNum = a ;
          }
        }
        this.$set(this.isCheckArr,index,true);
        this.$set(this.tipIcon,index,false);
      },
      myNum:function(index2){
        this.myNumber = index2;
        console.log(this.myNumber)
      },
      tip(index){
        this.$set(this.classItem,index,true);
        this.$set(this.tipIcon,index,true);
      },
      myFunction(event){
        var con = confirm("考试未完成，点击确定将帮您提交");
        if(con){
          this.submit();
        }else{
          console.log("mamamama")
        }
      },
      testManagen(){
        axios.get("/testManagement/testManagement",{
          params:{
            user:this.user
          }
        }).then((res)=>{
          this.userMessageData = res.data;
        })
      }
    },
    components:{testHead,Modal,navUser,footFooter}

  }
</script>

<style scoped>
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
  }
  .question{
    min-width:960px;
    width:100%;
    margin:0 auto;
    border:1px solid #000;
    display:flex;
  }
  .leftBox{
    width:18%;
    height:100%;
    border-right:1px solid #000;
  }
  .leftBox .userPicFont{
    height: 19%;
    padding-top: 94px;
    background: rgb(150,150,150);
  }
  .leftBox .leftItem{
    background: rgb(210,210,210);
    margin-top: 10px;
    font-size: 20px;
    cursor: pointer;
    color: #000;
    padding-top:10px;
  }
  .leftBox .leftItem p{
    width:90px;
    height:25px;
    margin:0 auto;
    background:rgb(140,61,61);
    color:#fff;
    font-size:16px;
  }
  .rightBox{
    width:82%;
    height:100%;
    position:relative;
  }
  .testOnline{
    width:100%;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
  }
  .content{
    width:100%;
    height:100%;
    display:flex;
  }
  .data{
    width:94%;
    height:100%;
    border-top:1px solid #000;
    overflow:auto;
    text-align:left;
    padding-top:40px;
    box-sizing:border-box;
  }
  .dispear{
    display:none;
  }
  .tip{
    background:rgb(194,0,0) !important;
    height:18px;
  }
  .tipIcon{
    color:#f00;
  }
  .number{
    width:29%;
    height:100%;
    border-top:1px solid #000;
    border-left:1px solid #000;
    position:relative;
    background:rgb(140,61,61);
  }
  .number .number-ul{
    overflow:auto;
    height: 63%;
  }
  .number li{
    display:inline-block;
    margin-left:4px;
  }
  .number a{
    display:block;
    width:50px;
    height:40px;
    border:1px solid #000;
    margin-top:16%;
    padding-top:20%;
    box-sizing:border-box;
    background:#fff;
  }
  .isCheck{
    background:#bbb !important;
    color:#000 !important;
  }
  .status{
    display:flex;
    margin-top:30px;
  }
  .do{
    margin-left:30px;
  }
  .doP{
    border:1px solid #000;
    background:#fff;
  }
  .desc{
    margin-top:15px;
  }
  .desctitle{
    font-weight:bolder;
  }
  .err{
    color:#e4393c;
  }
  .ans{
    display:flex;
    margin-top:5px;
    margin-bottom:5px;
  }
  .ans-label{
    margin-right:15px;
  }
  .answer{
    display:none;
  }
  .ans li{
    margin-left:27px;
  }
  .ans li :hover{
    cursor:pointer;
  }
  .btn{
    width:85%;
    height: 78px;
    margin-top:10px;
    background-color:rgb(253,96,96);
    padding:8px;
    position:absolute;
    bottom:48px;
    left:18px;
    cursor:pointer;
    color:#fff;
  }
  .userMessage{
    width:1048px;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
    box-sizing:border-box;
    text-align:left;
    overflow:auto;
  }
  .testLine{
    background:#ddd;
    padding-left:5px;
    margin-bottom:10px;
  }
  .testLine li{
    display:inline-block;
    width:143px;
    margin-right:17px;
  }
  .testLine .testTitle a{
    text-decoration:underline;
  }
  .testLine .testTitle a:hover{
    color:#f00;
  }
  .errAnalysis a{
    text-decoration:underline;
  }
  .errAnalysis a:hover{
    color:#f00;
  }
  .ans{
    display:flex;
    margin-top:5px;
    margin-bottom:5px;
  }
  .ans li{
    margin-left:27px;
    width: 100%;
  }
  .ans li :hover{
    cursor:pointer;
  }
  #content:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    font-weight:bolder;
  }
  .bg-purple-light {

  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align:center;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-button--danger.is-plain{
    padding: 15px 40px 15px 40px;
  }
  .el-button--danger.is-plain p{
    font-size:20px;
  }
</style>
