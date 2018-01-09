<template>
<div class="question">
    <div class="leftBox">
        <p>{{user}}</p>
        <ul class="leftItem">
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
                <div class="infor">
                    <p>开始时间</p>
                    <p>{{hours}}:{{minute}}</p>
                </div>
                <div class="infor">
                    <p>状态</p>
                    <p>正在考试</p>
                </div>
                <div class="infor">
                    <p>距离考试结束还有</p>
                    <span class="time">{{minutes}}</span>分钟<span class="time">{{seconds}}</span>秒</p>
                </div>
            </div>
            <div class="content">
                <div class="data">
                    <button @click='add();getTest($route.params.testId)' :class="{dispear : !dispear}">
                        {{$route.params.title}}开始考试
                    </button>
                    <div class="desc" v-for="(item,index) in textQuestionData.question">
                        <span class="desctitle" :class="{setRed : index === errorIndex - 1 && submits == true}">
                            <a @click="tip(index)">标记</a>
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
                        <div>
                            <p></p>
                            <p>标记题</p>
                        </div>
                    </div>
                    <button @click='submit' class="btn" :class="{answer : !answer}">提交</button>
                </div>
            </div>
        </div>
        <div class="testAnalysis" v-show="currIndex === 1">aaa</div>
        <div class="userMessage" v-show="currIndex === 2">bbb</div>
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
            {li:'考试分析'},
            {li:'用户管理'}
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
        currIndex:0,
        user:'',
        time:0,
        isCheck:'',
        isCheckNum:0,
        isCheckArr:{},
        length:20,
        classItem:{}
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


                },1000);
                _this.dispear = !_this.dispear;
                _this.nowTime = new Date();
                _this.hours = _this.nowTime.getHours();
                _this.minute = _this.nowTime.getMinutes();


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
                this.myId = id;
                this.myAns = answer;
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
                    if(id == this.textQuestionData.question[i].name){
                        if(answer == this.textQuestionData.question[i].answer){
                            this.sorce += 5;
                            console.log(this.sorce);
                        }else{
                            this.error.push(this.textQuestionData.question[i].num);
                            this.errorIndex = this.textQuestionData.question[i].num;
                                this.setRed = true;
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
.testAnalysis{
    width:1050px;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
}
.userMessage{
    width:1050px;
    height:100%;
    background:#fff;s
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
.infor{
    margin-left:140px;
    margin-top:65px;
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
    margin-right:8px;
}
.ans li :hover{
    cursor:pointer;
}
.btn{
    width:100%;
    margin-top:10px;
    background-color:#e4393c;
    padding:8px;
    position:absolute;
    bottom:0;
    left:0;
    cursor:pointer;
}
.setRed{
    color:red;
}
</style>
