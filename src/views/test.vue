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
                        <span class="time">{{minutes}}</span>`<span class="time">{{seconds}}</span>``</p>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="data">
                    <button @click='add();getTest($route.params.testId)' :class="{dispear : !dispear}">
                        {{$route.params.title}}开始考试
                    </button>
                    <div class="desc" v-for="(item,index) in textQuestionData.question">
                        <span class="desctitle" :class="{setRed : index === errorIndex - 1 && submits == true}">
                            <a @click="tip(index)">
                                <img src="../assets/tip.png">
                            </a>
                            {{item.num}}.{{item.desc}}
                        </span>
                        <ul class="ans">

                            <li v-for="(item2,index2) in item.options">
                                <label :for="item.forId[index2]">
                                    <input :id="item.forId[index2]"
                                    :type="item.type"
                                    :value="item.value[index2]"
                                    :name="item.name"
                                    @change="myAnswer(item.name,item.value[index2],index)">
                                        {{item2}}
                                </label>
                            </li>

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
            <ul class="testLine">
                <li class="testNumber">1</li>
                <li class="testTime">xx.xx</li>
                <li class="testTitle">汽车电气</li>
                <li class="testState">已结束</li>
                <li class="testGrade">50</li>
            </ul>
            <ul class="testLine">
                <li class="testNumber">2</li>
                <li class="testTime">xx.xx</li>
                <li class="testTitle">汽车电气</li>
                <li class="testState">已结束</li>
                <li class="testGrade">50</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'

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
        myId:'',
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
        answerArr:[]
    }
  },
  mounted(){
      this.user = getCookie('username');
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
            submit:function () {
                var _this = this;
                _this.answer = !_this.answer;


                alert("您的总分为：" + _this.sorce + ",错误的题有：" + _this.error);
                this.submits = true;

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
                _this.hours = _this.nowTime.getHours();
                _this.minute = _this.nowTime.getMinutes();
                if(_this.minute < 10){
                    _this.minute = "0" + _this.minute;
                }
                _this.second = _this.nowTime.getSeconds();
                if(_this.second < 10){
                    _this.second = "0" + _this.second;
                }


            },
            getTest(e){
                axios.get("/api/menu/"+e,{
                    params:{
                        testId: e,
                        num: 30,
                        grade: 'hard'
                    }
                }).then((res)=>{
                    if(res.data.status!==0) {
                        return;
                    }
                    console.log("1111112");
                    console.log(res.data.result);
                    this.textQuestionData = res.data.result;
                }).catch(function(error){
                    console.log("error init." + error)
                });
            },
            myAnswer:function(id,answer,index){
                
                if(id == this.myId){
                    this.answerArr.push(answer);
                    console.log("--"+this.answerArr);
                    console.log("---"+this.answerArr.length);
                    this.myAns = this.$set(this.answerArr,this.answerArr.length - 1,answer);
                    console.log("!!!!"+this.myAns);
                }else{
                    this.myAns = answer;
                }
                this.myId = id;
                
                
                this.questionIndex = index;
                console.log("11111"+id+answer);
                console.log("==="+this.myAns);
                if(this.myAns !== ''){
                    //  this.isCheck = index + 1;
                    this.isCheckNum += 1;
                    //  this.isCheckArr.push(this.isCheck);
                    this.$set(this.isCheckArr,index,true);

                }
                this.length = this.textQuestionData.question.length;
                for(var i = 0;i < this.textQuestionData.question.length;i++){
                    if(this.myId == this.textQuestionData.question[i].name){
                        if(this.myAns == this.textQuestionData.question[i].answer){
                            this.sorce += 5;
                            console.log(this.sorce);
                        }else{
                            this.error.push(this.textQuestionData.question[i].num);
                            this.errorIndex = this.textQuestionData.question[i].num;
                            //    this.setRed = true;
                        }
                    }
                }
            },
            tip(index){
                this.$set(this.classItem,index,true)
            },
            rightAppear (index) {
                this.currIndex = index;
            }
  }
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
    text-decoration:none;
}
a:hover{
    text-decoration: none;
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
    width:120px;
    margin-right:80px;
}
</style>
