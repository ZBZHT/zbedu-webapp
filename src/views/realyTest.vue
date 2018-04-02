<template>
<div>
    <div class="question" id="content">
        <div class="leftBox">
            <p>
                <nav-user></nav-user>
            </p>
        </div>
        <div class="rightBox">
            <div class="testOnline" v-show="currIndex === 0">
                <div class="title">
                    <div>
                        <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
                    </div>

                    <div class="inforItem"  v-show="textQuestionData">
                        <div class="infor">
                            <p>开始时间</p>
                            <span>{{hours}}:{{minute}}:{{second}}</span>
                        </div>
                        <div class="infor notSt">
                            <p>状态</p>
                            <p class="notStart" v-show="!textQuestionData">未考</p>
                            <p>正在考试</p>
                        </div>
                        <div class="infor">
                            <p>倒计时</p>
                            <span class="time">{{minutes}}</span>'<span class="time">{{seconds}}</span>''</p>
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="data">
                        <div class="desc" v-for="(item,index) in textQuestionData.question">
                            <span class="desctitle">
                                <a @click="tip(index)">
                                    <img src="../assets/imgs/tip.png">
                                </a>
                                {{item.num}}.{{item.desc}}
                            </span>
                            <ul class="ans">
                                <li>
                                    <label :for="item.forId[0]" v-if="item.options[0]">
                                        <input :id="item.forId[0]" :type="item.type" value="A" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                                            {{item.options[0]}}
                                    </label>
                                    <label :for="item.forId[1]" v-if="item.options[1]">
                                        <input :id="item.forId[1]" :type="item.type" value="B" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                                            {{item.options[1]}}
                                    </label>
                                    <label :for="item.forId[2]" v-if="item.options[2]">
                                        <input :id="item.forId[2]" :type="item.type" value="C" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                                            {{item.options[2]}}
                                    </label>
                                    <label :for="item.forId[3]" v-if="item.options[3]">
                                        <input :id="item.forId[3]" :type="item.type" value="D" :name="item.name" v-model="picked[index]" @change="myAnswer(item.num,index)">
                                            {{item.options[3]}}
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="number">
                        <ul>
                            <li v-for="(item,index) in textQuestionData.question">
                                <a :class='{tip:classItem[index],isCheck : isCheckArr[index]}'>{{ index + 1 }}</a>
                            </li>
                        </ul>
                        <div class="status">
                            <div class="do">
                                <p class="doP isCheck">{{isCheckNum}}</p>
                                <p>已答题</p>
                            </div>
                            <div class="do">
                                <p class="doP">{{length - isCheckNum}}</p>
                                <p>未答题</p>
                            </div>
                            <div class="do">
                                <p class="doP tip"></p>
                                <p>标记题</p>
                            </div>
                        </div>
                        <button @click='submit();openFullScreen()' class="btn" :class="{answer : !answer}" v-show="textQuestionData">提交</button>
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
import footFooter from '@/components/common/footFooter'
import Modal from '@/components/testCenter/modal';
import navUser from '@/components/common/navUser';


export default {
  name: 'test',
  data () {
    return {
        textQuestionData:'',
        minutes:120,
        seconds:0,
        dispear:true,
        answer:true,
        myAns:'',
        myNumber:'',
        questionIndex:'',
        errorIndex:[],
        sorce:0,
        error:[],
        setRed:false,
        submits:false,
        nowTime:'',
        currentdate:'',
        hours:'',
        minute:'',
        second:'',
        currIndex:0,
        user:this.$store.state.username,
        time:0,
        isCheck:'',
        isCheckNum:0,
        isCheckArr:[],
        length:20,
        classItem:{},
        QidArr:[],
        null:[],
        userMessageData:'',
        picked:[],
        Display:false,
        lengthData:'',
        url:document.domain,
        showModal:false,
        showModal1:false,
        currTestInfor:[],
        currTestRes:[],
        currTestId:'',
        interval:{},
        TestNum:0,
        fullscreenLoading: false

    }
  },
  created(){
 //   document.onkeydown = function(e){
      //  if(window.event.keyCode === 27){
      //      alert("...")
     //   }
 //   };

    window.onkeydown = function(){
        if(checkFull()){
            if(window.event.keyCode === 27){
              alert("...")
              event.preventDefault();
          }
        }
    }

        function checkFull(){
        var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;

        //to fix : false || undefined == undefined
        if(isFull === undefined) isFull = false;
        return isFull;
        }

  },
  mounted(){
   setTimeout(function(){
    var allTestNum = this.$store.state.allTestNum ;
    var url = document.domain;
    var _this = this;
    //倒计时
    var time = window.setInterval(function () {

        if (_this.seconds == 0 && _this.minutes != 0) {
            _this.seconds = 59;
            _this.minutes -= 1;
        }else if(_this.minutes == 0 && _this.seconds == 0){
            _this.seconds = 0;
            window.clearInterval(time);
            console.log("111");
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
     this.getTestQuesInfo();
      /*axios.get("http://" + url + ":8000/readTestQuestion/all",{
            params:{
                user:this.user,
                currTestNum:allTestNum
            }
        }).then((res)=>{
            if(res.data.testQuestion.state == 1){
                this.textQuestionData = res.data.testQuestion;
            }
            console.log(res.data);
            this.TestNum = res.data.testLength;
            console.log(this.TestNum+"LLL")
        }).catch(function(error){
            console.log("error init." + error)
        });*/

    axios.get("http://" + url + ":8000/readTestQuestionInfo/all",{
        params:{
          user:this.user,
          currTestId:this.$route.params.testId,
          currTestNum:allTestNum
        }
      }).then((res)=>{
          console.log('11');
          console.log(res.data.currState);
          this.$store.commit('vuexState',res.data.state);
            if(res.data.state == 1){
               this.picked = res.data.currAnswer;
               this.isCheckArr = res.data.currState;

                window.addEventListener("popstate",this.myFunction);
               this.hours = res.data.startTimeHours;
               this.minute = res.data.startTimeMinutes;
               this.second = res.data.startTimeSeconds;
               this.minutes = res.data.testTimeMinutes;
               this.seconds = res.data.testTimeSeconds;
               this.isCheckNum = res.data.isCheckNum;
               console.log(this.isCheckNum+"qqqqqqq");
               console.log(this.isCheckArr+"wwwww");
            }
      }).catch(function(error){
        console.log("错误")
      });
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
    getTestQ() {
      //console.log(this.toTestData[0]);
      axios.get("http://" + this.url + ":8000/readTestQuestion/getTestQing", {
        params: {
          user: this.user,
        }
      }).then((res) => {
        if (res.data.state == 1) {
          this.textQuestionData = res.data;
        } else {
          //console.log(res.data);
          this.TestNum = res.data.testLength;
          //console.log(this.TestNum+"LLL")
        }
      }).catch(function (error) {
        console.log("error init." + error)
      });
    },

    /*获取考试题*/
    getTestQuesInfo() {
      axios.get("http://" + this.url + ":8000/readTestQuestionInfo/getTestQuesInfo", {
        params: {
          user: this.user,
        }
      }).then((res) => {
        console.log('11');
        console.log(res.data.currState);
        this.$store.commit('vuexState',res.data.state);
        if(res.data.state == 1){
          this.picked = res.data.currAnswer;
          this.isCheckArr = res.data.currState;

          window.addEventListener("popstate",this.myFunction);
          this.hours = res.data.startTimeHours;
          this.minute = res.data.startTimeMinutes;
          this.second = res.data.startTimeSeconds;
          this.minutes = res.data.testTimeMinutes;
          this.seconds = res.data.testTimeSeconds;
          this.isCheckNum = res.data.isCheckNum;
          console.log(this.isCheckNum+"qqqqqqq");
          console.log(this.isCheckArr+"wwwww");
        }
      }).catch(function (error) {
        console.log("错误")
      });
    },

            submit:function () {
                setTimeout(function(){
                    window.clearInterval(this.interval);
                    axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/readTestQuestionInfo/submitQuestionInfo",
                        params:{
                            state:2,
                            user:this.user,
                            currTestId:this.$route.params.testId,
                            testQuestion:this.$store.state.allTestNum,
                            startTime:this.currentdate,
                            currAnswer:this.picked,
                            currState:this.isCheckArr,
                            error:this.error,
                            sorce:this.sorce,
                            startTimeHours:this.hours,
                            startTimeMinutes:this.minute,
                            startTimeSeconds:this.second,
                            testTimeMinutes:this.minutes,
                            testTimeSeconds:this.seconds,
                            isCheckNum:this.isCheckNum
                        }
                    }).then(
                        function (res) {
                        console.log(res.data)
                        }
                    );
                }.bind(this),0.1);
                axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/readTestQuestion/submitQuestionInfo",
                        params:{
                            state:2,
                            testQuestion:this.$store.state.allTestNum
                        }
                    }).then((res)=>{
                            this.$store.commit('vuexState',res.data.state);
                        });
                this.sorce=0;
                this.error = [];
                console.log(this.QidArr.length+"===this.QidArr.length");
                for(var i = 0;i < this.QidArr.length;i++){
                    if(this.QidArr[i] != null && this. QidArr[i] != ''){
                        console.log(this.QidArr[i]-1+"==========this.QidArr[i]-1");
                        console.log("asd"+this.picked[i])
                        console.log(this.textQuestionData)
                        if(this.textQuestionData.question[this.QidArr[i]-1].answer == this.picked[i]){

                            this.sorce += 5;
                        }else{
                            console.log(this.picked[i])
                            this.error.push(i+1);
                        }
                    }else{
                        console.log(i+"123456");
                        this.null.push(i+1);
                    }
                }
               this.$store.commit('stillBtn',false);

            //    alert(this.sorce + "==" + this.error + "==" + this.null);
            //    this.$router.go(0);
            },
            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                    });
                    setTimeout(() => {
                        loading.close();
                    }, 2000);
                    setTimeout(() => {
                        alert("提交成功");
                        window.close();
                    }, 2001);

            },
            num:function (n) {
                return n<10 ? "0" + n : "" + n
            },
            /*getTest(e){
                axios.get("http://" + this.url + ":8000/readTestQuestion/clickQuery",{
                    params:{
                        //state默认为0未开始考试，开始后为1
                        user:this.user,
                        state:1,
                    //    testId: e,
                    //    num: 20,
                    //    currTestNum: 1 + this.$store.state.allTestNum,
                    //    startTime:this.currentdate,
                    //    startTimeHours:this.hours,
                    //    startTimeMinutes:this.minute,
                    //    startTimeSeconds:this.second,
                    //    testTimeMinutes:this.minutes,
                    //   testTimeSeconds:this.seconds
                    }
                }).then((res)=>{
                    if(res.data.status !== 0) {
                        return;
                    }
                    console.log(res.data.currTestNum+"currTestNum");
                    this.$store.commit('allTestNum',res.data.currTestNum);
                    this.$store.commit('vuexState',res.data.state);
                    this.textQuestionData = res.data;
                    this.currTestId = e;
                }).catch(function(error){
                    console.log("error init." + error)
                });


            },*/
            myAnswer:function(id,index){
                this.lengthData = this.textQuestionData.question.length;
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

                axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/readTestQuestionInfo/update",
                        params:{
                            state:1,
                            user:this.user,
                            currTestId:this.$route.params.testId,
                            testQuestion:this.$store.state.allTestNum,
                            startTime:this.currentdate,
                            currAnswer:this.picked,
                            currState:this.isCheckArr,
                            error:this.error,
                            sorce:this.sorce,
                            startTimeHours:this.hours,
                            startTimeMinutes:this.minute,
                            startTimeSeconds:this.second,
                            testTimeMinutes:this.minutes,
                            testTimeSeconds:this.seconds,
                            isCheckNum:this.isCheckNum
                        }
                    }).then((res)=>{

                        })
            },
            myNum:function(index2){
                this.myNumber = index2;
                console.log(this.myNumber)
            },
            tip(index){
                this.$set(this.classItem,index,true)
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
                axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/testManagement/testManagement",
                        params:{
                            user:this.user
                        }
                        }).then((res)=>{
                            this.userMessageData = res.data;
                            console.log(res.data)
                        })
            }
    },
  components:{Modal,navUser,footFooter}

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
    min-width:1200px;
    min-width:700px;
    width:1200px;
    height:700px;
    margin:0 auto;
    margin-top: 40px;
    border:1px solid #000;
    display:flex;
}
.leftBox{
    width:12.5%;
    height:100%;
    border-right:1px solid #000;
}
.leftBox > p{
    font-size:20px;
    margin-top:110px;
}
.leftBox .leftItem{
    margin-top:57px;
}
.rightBox{
    width:87.5%;
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
.title{
    width:100%;
    height:15%;
    text-align:left;
    font-size:16px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
}
.inforItem{
    margin-left:50%;
    display:flex;
}
.infor{
    margin-right:14px;
    margin-top:20px;
}
.infor p{
    font-size:17px;
    margin-top:-2px;
}
.notSt{
    position:relative;
}
.notStart{
    display:block;
    width:70px;
    background:#fff;
    position:absolute;
    top:21px;
    left:0;
}
.content{
    width:100%;
    height:85%;
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
    background:yellow;
    height:18px;
}
.number{
    width:29%;
    height:100%;
    border-top:1px solid #000;
    border-left:1px solid #000;
    position:relative;
}
.number li{
    display:inline-block;
    margin-left:4px;
}
.number a{
    display:block;
    width:50px;
    height:50px;
    border:1px solid #000;
    margin-top:16%;
    padding-top:36%;
    box-sizing:border-box;
}
.isCheck{
    background:#953033;
    color:#fff;
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
    background-color:#e4393c;
    padding:8px;
    position:absolute;
    bottom:48px;
    left:18px;
    cursor:pointer;
}
.userMessage{
    width:1048px;
    height:100%;
    background:#fff;s
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
.el-row {

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
