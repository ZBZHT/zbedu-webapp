<template>
<div>
    <div class="question">
        <div class="leftBox">
            <p>{{user}}</p>
            <ul class="leftItem" :class="{dispear : !dispear}">
                <li class="leftLi" v-for="(item,index) in leftBox"
                    @click="rightAppear(index)"
                    :class="currIndex === index ? 'active' : '' ">
                    {{item.li}}
                </li>
            </ul>
        </div>
        <div class="rightBox">
            <div class="testOnline" v-show="currIndex === 0">
                <div class="title">
                    <div>
                        <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
                        <p class="titleP">{{$route.params.title}}考试</p>
                    </div>
                    <div class="inforItem">
                        <div class="infor">
                            <p>开始时间</p>
                            <span>{{hours}}:{{minute}}:{{second}}</span>
                        </div>
                        <div class="infor notSt">
                            <p>状态</p>
                            <p class="notStart" :class="{dispear : !dispear}">未考</p>
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
                        <button @click='add();getTest($route.params.testId);sendInfor()' v-show="!textQuestionData">
                            {{$route.params.title}}开始考试
                        </button>
                        <div class="desc" v-for="(item,index) in textQuestionData.question">
                            <span class="desctitle">
                                <a @click="tip(index)">
                                    <img src="../assets/tip.png">
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
                        <button @click='submit' class="btn" :class="{answer : !answer}" v-show="textQuestionData">提交</button>
                    </div>
                </div>
            </div>
            <div class="userMessage" v-show="currIndex === 1">
                <ul class="testLine">
                    <li class="testNumber">NO.</li>
                    <li class="testTime">时间</li>
                    <li class="testTitle">项目</li>
                    <li class="testState">状态</li>
                    <li class="testGrade">分数</li>
                </ul>
                <ul class="testLine" v-for="(item,index) in userMessageData.testQuestion">
                <ul v-for="(item4,index4) in userMessageData.testQuestionInfo" v-if="index4 == index">
                    <li class="testNumber">{{index + 1}}</li>
                    <li class="testTime">{{item4.startTime}}</li>
                    <li class="testTitle">
                        <a id="show-modal" @click="showModal=true">
                            <p @click="myNum(index)">{{item.currTestNum}}</p>
                        </a>
                        <modal v-if="showModal" @close="showModal = false">
                            <h3 slot="header">custom header</h3>
                            <div slot="body">
                                <div v-for="(item2,index2) in userMessageData.testQuestion[myNumber].question">
                                    <span class="desctitle">
                                        {{item2.num}}.{{item2.desc}}
                                    </span>
                                    <ul class="ans">
                                        <li>
                                            <label for="11" v-if="item2.options[0]">
                                                <input id="11" :type="item2.type" value="A" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                    {{item2.options[0]}}
                                            </label>
                                            <label for="22" v-if="item2.options[1]">
                                                <input id="22" :type="item2.type" value="B" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                    {{item2.options[1]}}
                                            </label>
                                            <label for="33" v-if="item2.options[2]">
                                                <input id="33" :type="item2.type" value="C" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                    {{item2.options[2]}}
                                            </label>
                                            <label for="44" v-if="item2.options[3]">
                                                <input id="44" :type="item2.type" value="D" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                    {{item2.options[3]}}
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </modal>
                    </li>
                    <li class="testState">已结束</li>
                    <li class="testGrade">{{item4.sorce}}</li>
                    <li class="errAnalysis">
                        <a id="show-modal1" @click="showModal1=true">
                            <p @click="myNum(index)">错题分析</p>
                        </a>
                        <modal v-if="showModal1" @close="showModal1 = false">
                            <h3 slot="header">custom2333 header</h3>
                            <div slot="body">
                                <div v-for="(item5,index5) in userMessageData.testQuestionInfo[myNumber].error">
                                <div v-for="(item6,index6) in userMessageData.testQuestion[myNumber].question" v-if="index6 == 0">
                                    <span class="desctitle">
                                        <img src="../assets/err.jpg">
                                        {{item5}}.{{userMessageData.testQuestion[myNumber].question[item5 - 1].desc}}
                                    </span>
                                    <ul class="ans">
                                        <li>
                                            {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[0]}}
                                            {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[1]}}
                                            {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[2]}}
                                            {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[3]}}
                                        </li>
                                    </ul>
                                    <span>
                                        正确答案：{{userMessageData.testQuestion[myNumber].question[item5 - 1].answer}}
                                    </span>
                                </div>
                                </div>
                            </div>
                        </modal>
                    </li>
                    </ul>
                </ul>
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

export default {
  name: 'test',
  data () {
    return {
        leftBox:[
            {li:'在线考试'},
            {li:'考试管理'}
        ],
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
        isCheckArr:{},
        length:20,
        classItem:{},
        QidArr:[],
        null:[],
        userMessageData:'',
        picked:{},
        Display:false,
        lengthData:'',
        url:'',
        showModal:false,
        showModal1:false,
        currTestInfor:[],
        currTestRes:[],
        currTestId:'',
        interval:{},
        TestNum:0

    }
  },
  mounted(){
        
    //var allTestNum = this.$store.state.allTestNum ;
    var allTestNum = 0;
    console.log(allTestNum+"TTT")

      axios.get("http://192.168.2.251:8000/readTestQuestion/all",{
            params:{
                user:this.user,
                currTestNum: 1 + allTestNum
            }
        }).then((res)=>{
            if(res.data.testQuestion.state == 1){
                this.textQuestionData = res.data.testQuestion;

                

            }
            console.log(res.data);
            this.TestNum = res.data.testLength;
            console.log(this.TestNum+"LLL")
        //    this.$store.commit('allTestNum',this.TestNum);
            this.$store.commit('allTestNum',0);
        }).catch(function(error){
            console.log("error init." + error)
        });

    axios.get("http://192.168.2.251:8000/readTestQuestionInfo/all",{
        params:{
          user:this.user,
          currTestId:this.$route.params.testId,
          currTestNum: 1 + allTestNum
        }
      }).then((res)=>{
          console.log(res.data)
          console.log(res.data.currState)

            if(res.data.state == 1){
               this.picked = res.data.currAnswer;
               this.isCheckArr = res.data.currState;



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



         this.url = document.domain;

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
//  computed:{
//      pickedArr(){
//          return this.$store.state.pickedArr;
//      },
//      getTextQuestionData(){
//          return this.$store.state.getTextQuestionData;
//      }
//    },
  methods:{
            sendInfor(){




            },
            submit:function () {
                setTimeout(function(){
                    window.clearInterval(this.interval);
                    axios({
                        method:'get',
                        url:"http://192.168.2.251:8000/readTestQuestionInfo/submitQuestionInfo",
                        params:{
                            state:2,
                            user:this.user,
                            currTestId:this.$route.params.testId,
                            testQuestion: 1 + this.$store.state.allTestNum,
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
                        console.log(res.data.code)
                        }
                    );
                }.bind(this),2000);
                axios({
                        method:'get',
                        url:"http://192.168.2.251:8000/readTestQuestion/submitQuestionInfo",
                        params:{
                            state:2,
                            testQuestion: 1 + this.$store.state.allTestNum
                        }
                    }).then((res)=>{
                            
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
                alert(this.sorce + "==" + this.error + "==" + this.null);
                this.$router.go(0);
            },
            num:function (n) {
                return n<10 ? "0" + n : "" + n
            },
            add:function () {
                var _this = this;
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
                 var month = _this.nowTime.getMonth() + 1;
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

            },
            getTest(e){
                axios.get("http://192.168.2.251:8000/readTestQuestion/clickQuery",{
                    params:{
                        //state默认为0未开始考试，开始后为1
                        state:1,
                        testId: e,
                        num: 20,
                        currTestNum: 1 + this.$store.state.allTestNum
                    }
                }).then((res)=>{
                    if(res.data.status !== 0) {
                        return;
                    }
                    if(res.data.state == 1 ){
                        window.addEventListener("popstate",this.myFunction);

                        window.onpopstate=function(e){
                        　　var e = window.event||e;
                        　　e.returnValue=("确定离开当前页面吗？");
                        }
                        window.onbeforeunload=function(e){
                        　　var e = window.event||e;
                        　　e.returnValue=("确定离开当前页面吗？");
                        }
                    }
                    this.textQuestionData = res.data;
                    this.currTestId = e;
                }).catch(function(error){
                    console.log("error init." + error)
                });
            },
            myAnswer:function(id,index){
                this.lengthData = this.textQuestionData.question.length;
                this.QidArr[index] = id;
                console.log(this.QidArr);
                var a=0;
                for(var i = 0;i < this.QidArr.length;i++){
                    if(this.QidArr[i] != null){
                        a+=1;
                        this.isCheckNum = a ;
                    }
                }
                this.$set(this.isCheckArr,index,true);

                axios({
                        method:'get',
                        url:"http://192.168.2.251:8000/readTestQuestionInfo/update",
                        params:{
                            state:1,
                            user:this.user,
                            currTestId:this.$route.params.testId,
                            testQuestion: 1 + this.$store.state.allTestNum,
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
            rightAppear (index) {
                this.currIndex = index;
                if(index == 1){
                    this.testManagen();
                }
            },
            DisplayFun(){
                this.Display = true;
            },
            getDisplayFun(){
                this.Display = false;
            },
            myFunction(event){
                 alert("aaa")
            },
            testManagen(){
                axios({
                        method:'get',
                        url:"http://192.168.2.251:8000/testManagement/testManagement",
                        params:{
                            user:this.user
                        }
                        }).then((res)=>{
                            this.userMessageData = res.data;
                            console.log(res.data)
                        })
            }
    },
  components:{Modal,footFooter}

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
    width:150px;
    height:100%;
    border:1px solid #000;
}
.leftBox > p{
    font-size:20px;
    margin-top:68px;
}
.leftBox .leftItem{
    margin-top:57px;
}
.leftLi{
    line-height:56px;
    background:#2b333b;
    margin-top:10px;
    font-weight:bolder;
    font-size:20px;
    cursor:pointer;
    color:#fff;
}
.active{
    color:#f00;
}
.rightBox{
    width:1050px;
    height:100%;
    position:relative;
}
.testOnline{
    width:1050px;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
}
.title{
    width:100%;
    height:150px;
    border:1px solid #000;
    text-align:left;
    font-weight: bolder;
    font-size:20px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
}
.titleP{
    margin-top:37px;
}
.inforItem{
    margin-left: 430px;
    display:flex;
}
.infor{
    margin-right:38px;
    margin-top:65px;
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
    display:flex;
}
.data{
    width:990px;
    height:550px;
    border:1px solid #000;
    overflow:auto;
    text-align:left;
    padding:20px;
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
    width:310px;
    height:550px;
    border:1px solid #000;
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
    padding:10px;
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
</style>
