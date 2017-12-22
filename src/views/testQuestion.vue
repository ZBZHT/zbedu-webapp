<template>
<div class="question">

        <div class="timeInterval">
            <p>距离考试结束还有：<span class="time">{{minutes}}</span>分钟<span class="time">{{seconds}}</span>秒</p>
            <button @click='add' :class="{dispear : !dispear}">开始考试</button>
        </div>      

        <div class="content" :class="{dispear : dispear}">
            <div class="title">
                <p>{{textQuestionData.title}}</p>
            </div>
            <div class="data">

                        <div class="desc" v-for="(item,index) in textQuestionData.question">
                            <span class="desctitle"
                            
                            >
                                {{item.num}}.{{item.desc}}
                            </span>
                            <ul class="ans">

                                <li v-for="(item2,index2) in item.options">
                                    <label :for="item.forId[index2]">
                                        <input :id="item.forId[index2]" 
                                        :type="item.type" 
                                        :value="item.value[index2]" 
                                        :name="item.name"
                                        @change="myAnswer(item.name,item.value[index2]),isError(item.name,index)"">
                                            {{item2}}
                                    </label>
                                </li>

                            </ul>
                            <span :class="{answer : answer}">
                                正确答案：{{item.answer}}
                            </span>
                        </div>
            </div>
            <div class="data1">
                <button @click='submit' class="btn" :class="{answer : !answer}">提交</button>
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
        minutes:120,
        seconds:0,
        dispear:true,
        answer:true,
        myAns:'',
        myId:'',
        sorce:0,
        error:[]
    }
  },
  mounted(){
      axios.get("/api/menu/testQuestion",{
                params:{
                     testId: 10001,
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
            submit:function () {
                var _this = this;
                _this.answer = !_this.answer;
                
                
                alert("您的总分为：" + _this.sorce + ",错误的题有：" + _this.error);

            },
            myAnswer:function(id,answer){
                this.myId = id;
                this.myAns = answer;
                console.log("11111"+id+answer);
                console.log(this.textQuestionData.question.length);

                for(var i = 0;i < this.textQuestionData.question.length;i++){
                    if(id == this.textQuestionData.question[i].name){
                        if(answer == this.textQuestionData.question[i].answer){
                            this.sorce += 5;
                            console.log(this.sorce);
                        }else{
                            this.error.push(this.textQuestionData.question[i].num);
                            this.errNum = this.textQuestionData.question[i].num;                            
                        }
                    }
                }
            },
            isError:function(id,errorIndex){
                console.log("222"+errorIndex);
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
    width:100px;
    margin-top:10px;
    background-color:#e4393c;
    padding:8px;
}
</style>
