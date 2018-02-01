<template>
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
                    <button @click='add();getTest($route.params.testId)' :class="{dispear : !dispear}">
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

                            <li >
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
                            <p >{{picked}}</p>
                        </ul>
                        <span :class="{answer : answer}">
                            正确答案：{{item.answer}}
                        </span>
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
                    <button @click='submit' class="btn" :class="{answer : !answer,dispear : dispear}">提交</button>
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
            <ul class="testLine" v-for="(item,index) in userMessageData" v-if="index % 2 == 0">
                <li class="testNumber">{{index + 1}}</li>
                <li class="testTime">xx.xx</li>
                <li class="testTitle">
                    <a id="show-modal" @click="showModal=true">
                        <p @click="myNum(index)">{{item.testId}}</p>
                    </a>
                    <modal v-if="showModal" @close="showModal = false">
                        <h3 slot="header">custom header</h3>
                        <div slot="body">
                            <div v-for="(item2,index2) in userMessageData[myNumber].question">
                                <span class="desctitle">
                                    {{item2.num}}.{{item2.desc}}
                                </span>
                                <ul class="ans">
                                    <li>
                                        <label for="11" v-if="item2.options[0]">
                                            <input id="11" :type="item2.type" value="A" :name="item2.name" v-model="userMessageData[myNumber+1][index2]">
                                                {{item2.options[0]}}
                                        </label>
                                        <label for="22" v-if="item2.options[1]">
                                            <input id="22" :type="item2.type" value="B" :name="item2.name" v-model="userMessageData[myNumber+1][index2]">
                                                {{item2.options[1]}}
                                        </label>
                                        <label for="33" v-if="item2.options[2]">
                                            <input id="33" :type="item2.type" value="C" :name="item2.name" v-model="userMessageData[myNumber+1][index2]">
                                                {{item2.options[2]}}
                                        </label>
                                        <label for="44" v-if="item2.options[3]">
                                            <input id="44" :type="item2.type" value="D" :name="item2.name" v-model="userMessageData[myNumber+1][index2]">
                                                {{item2.options[3]}}
                                        </label>
                                    </li>
                                </ul>
                            </div>    
                        </div>
                    </modal>
                </li>
                <li class="testState">已结束</li>
                <li class="testGrade">50</li>
                <li class="errAnalysis">
                    <a id="show-modal1" @click="showModal1=true">
                        错题分析
                    </a>
                    <modal v-if="showModal1" @close="showModal1 = false">
                        <h3 slot="header">custom2333 header</h3>
                        
                    </modal>
                </li>
            </ul>
            <button @click="clearAll">删除所有记录</button>
        
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'
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
        errorIndex:'',
        sorce:0,
        error:[],
        setRed:false,
        submits:false,
        nowTime:'',
        hours:'',
        minute:'',
        second:'',
        currIndex:0,
        user:'',
        time:0,
        isCheck:'',
        isCheckNum:0,
        isCheckArr:{},
        length:20,
        classItem:{},
        QidArr:[],
        null:[],
        userMessageData:[],
        picked:[],
        Display:false,
        lengthData:'',
        url:'',
        showModal:false,
        showModal1:false
    }
  },
  mounted(){
         this.url = document.domain;
         this.user = getCookie('username');
         this.hours = this.$store.state.testStartTime;
         this.minute = this.$store.state.testStartTimeMinute;
         this.second = this.$store.state.testStartTimeSecond;
         this.dispear = this.$store.state.startBtnDispear;
         this.textQuestionData = this.$store.state.getTextQuestionData;
         this.picked = this.$store.state.pickedArr;
         this.minutes = this.$store.state.testTimeMinutes;
         this.seconds = this.$store.state.testTimeSeconds;
         this.isCheckNum = this.$store.state.CheckNum;
       //  this.isCheckArr = this.$store.state.CheckArr;
         this.userMessageData = this.$store.state.userMessage;
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
  computed:{
      pickedArr(){
          return this.$store.state.pickedArr;
      },
      getTextQuestionData(){
          return this.$store.state.getTextQuestionData;
      }
    },
  methods:{
            submit:function () {
                this.sorce=0;
                this.error = [];
                console.log(this.QidArr.length+"===this.QidArr.length");
                for(var i = 0;i < this.QidArr.length;i++){
                    if(this.QidArr[i] != null && this. QidArr[i] != ''){
                        console.log(this.QidArr[i]-1+"==========this.QidArr[i]-1");
                        if(this.textQuestionData.question[this.QidArr[i]-1].answer == this.picked[i]){
                            this.sorce += 5;
                        }else{
                            this.error.push(i+1);
                        }
                    }else{
                        console.log(i+"123456");
                        this.null.push(i+1);
                    }
                }
                alert(this.sorce + "==" + this.error + "==" + this.null);

                this.$store.commit('userMessagePickedArr',this.picked)

                setTimeout(function(){
                    this.$store.commit('testStartTime','');
                    this.$store.commit('testStartTimeMinute','');
                    this.$store.commit('testStartTimeSecond','');
                    this.$store.commit('startBtnDispear',true);
                    this.$store.commit('getTextQuestionData','');
                    this.$store.commit('pickedArr',[]);
                    this.$store.commit('testTimeMinutes',120);
                    this.$store.commit('testTimeSeconds',0);
                    this.$store.commit('CheckNum',0);
                    console.log(this.picked+"/////");
                    this.$router.go(0);
                }.bind(this),0.1)

                

//                axios({
//                        method: 'post',
//                        url: 'http://" + this.url + ":8000/readJson/testQuestion101',
//                        data: {
//                            userMessageData: this.userMessageData
//                        }
//                        }).then((req,res)=>{
//                            console.log(res.data);
//                            console.log(req);                            
//                  })

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
                    _this.$store.commit('testTimeMinutes',_this.minutes);
                    _this.$store.commit('testTimeSeconds',_this.seconds);

                 },1000);

                 _this.dispear = !_this.dispear;
                 _this.nowTime = new Date();
                 _this.hours = _this.nowTime.getHours();
                 _this.minute = _this.nowTime.getMinutes();
                 if(_this.minute < 10){
                     _this.minute = "0" + _this.minute;
                 }
                 _this.second = _this.nowTime.getSeconds();
                 if(_this.second < 10){
                     _this.second = "0" + _this.second;
                 }
                 _this.$store.commit('testStartTime',_this.hours);
                 _this.$store.commit('testStartTimeMinute',_this.minute);
                 _this.$store.commit('testStartTimeSecond',_this.second);
                 _this.$store.commit('startBtnDispear',_this.dispear);
            },
            getTest(e){
                axios.get("http://" + this.url + ":8000/readJson/testQuestion"+e,{
                    params:{
                        testId: e,
                        num: 30,
                        grade: 'hard'
                    }
                }).then((res)=>{
                    if(res.data.status!==0) {
                        return;
                    }
                    this.textQuestionData = res.data.result;
                    this.$store.commit('getTextQuestionData',this.textQuestionData);
                    this.$store.commit('getUserMessage',this.textQuestionData);
                }).catch(function(error){
                    console.log("error init." + error)
                });
            },
            myAnswer:function(id,index){
                this.lengthData = this.textQuestionData.question.length;
                this.QidArr[index] = id;
                console.log(this.QidArr);
                this.isCheckNum += 1;
                this.$store.commit('CheckNum',this.isCheckNum);
                this.$set(this.isCheckArr,index,true);
                this.$store.commit('CheckArr',this.isCheckArr);
                this.$store.commit('pickedArr',this.picked);
            },
            myNum:function(index){
                this.myNumber = index;
            },
            tip(index){
                this.$set(this.classItem,index,true)
            },
            rightAppear (index) {
                this.currIndex = index;
            },
            clearAll(){
                this.$store.commit('getUserMessageData',[]);
            },
            DisplayFun(){
                this.Display = true;
                this.$store.commit('getDisplay',this.Display);
            },
            getDisplayFun(){
                this.Display = false;
                this.$store.commit('getDisplay',this.Display);
            }
    },
  components:{Modal}

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
}
.testLine{
    background:#ddd;
    padding-left:5px;
    margin-bottom:10px;
}
.testLine li{
    display:inline-block;
    width:145px;
    margin-right:20px;
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
