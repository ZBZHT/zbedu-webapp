<template>
<div class="question">
    

        <div class="timeInterval">
            <p>距离考试结束还有：<span class="time">{{minute}}</span>分钟<span class="time">{{second}}</span>秒</p>
            <button @click='add' :class="{dispear : !dispear}">开始考试</button>
        </div>


        <div class="content" :class="{dispear : dispear}">    
            <div class="title" v-for="item in nowPageData">
                <p v-for="item2 in item.title">{{item2.title}}</p>
            </div>
            <div class="data" v-for="item in nowPageData">

                        <div class="desc" v-for="item2 in item.question">
                            <span class="desctitle">
                                {{item2.num}}.{{item2.desc}}
                            </span>
                            <ul class="ans">
                                <li v-for="(item3,index3) in item2.options">
                                    <label :for="index3">
                                        <input id="" type="radio" value="A" name="">{{item3}}
                                    </label>
                                </li>
                            </ul>
                            <span :class="{answer : !answer}">
                                正确答案：{{item2.answer}}
                            </span>
                        </div>
            </div>
            <div class="data1">
                <button @click='appear' class="btn" :class="{answer : answer}">提交</button>
                <div class="result"></div>
            </div>
        </div>
</div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'textQuestion',
  data () {
    return {
        textQuestionData:'',
        nowPageData:'',
        minutes:120,
        seconds:0,
        dispear:true,
        answer:true
        
    }
  },
  mounted(){
      axios.get("/api/menu/testQuestion",{
                params:{
                     user:22
                }
            }).then((res)=>{
                this.textQuestionData = res.data;
                this.nowPageData = this.textQuestionData.biansuqi;
                console.log(this.nowPageData);
            }).catch(function(error){
                console.log("error init." + error)
            });
    },
  methods: {
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
                    }

                },1000);
                _this.dispear = !_this.dispear;
            },
            appear:function () {
                var _this = this;
                _this.answer = !_this.answer;
            }
    },
  watch:{
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
            second:function () {
                return this.num(this.seconds)
            },
            minute:function () {
                return this.num(this.minutes)
            }
        },
  components:{}
}
</script>

<style>

*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
.question{
    min-width:960px;
}
.timeInterval{
    position:relative;
}
.timeInterval p{
    position:fixed;
    top:0;
    right:10px;
}
.timeInterval button{
    background:#e4393c;
    padding:20px;
    border-radius:5px;
    margin-top:100px;
}
.time{
    font-weight:bolder;
}
.content{
    width:960px;
    margin:0 auto;
}
.dispear{
    display:none;
}
.title{
        text-align:center;
        font-weight: bolder;
        font-size:20px;
}
.data{
    width:960px;
    text-align:left;
    margin:0 auto;
    padding:20px;
    box-shadow:0 0 15px #e4393c;
    margin-top:20px;
}
.desc{
    margin-top:15px;
}
.desctitle{
    font-weight:bolder;
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
.btn{
    width:100px;
    margin-top:10px;
    background-color:#e4393c;
    padding:8px;
}
</style>
