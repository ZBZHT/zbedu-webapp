<template>
    <div class="question">
        <div class="content">
            <div class="title" v-for="item in nowPageData">
                <p v-for="item2 in item.title">{{item2.title}}</p>
            </div>
            <div class="data" v-for="item in nowPageData">

                        <div class="desc" v-for="item2 in item.question">
                            <span class="desctitle">
                                {{item2.num}}.{{item2.desc}}
                            </span>
                            <ul class="ans">
                                <li v-for="item3 in item2.options">
                                    <label for="">
                                        <input id="" type="radio" value="A" name="">{{item3}}
                                    </label>
                                </li>
                            </ul>
                        </div>
            </div>
            <div class="data1">
                <button class="data2 btn">提交</button>
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
        nowPageData:''
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
.content{
    width:920px;
    margin:0 auto;
}
.title{
        text-align:center;
        font-weight: bolder;
        font-size:20px;
}
.data{
    width:920px;
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
