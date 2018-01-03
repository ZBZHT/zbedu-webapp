<template>
    <div class="user">
                <div class="login" v-show="true">
                    <div class="userBox">
                        <p> <img class="unm" src="../assets/unm.png"> </p>
                        <input type="text" placeholder="昵称/ID/身份证号/手机号" v-model="username">
                    </div>
                    <div class="passwordBox">
                        <p> <img class="psw" src="../assets/psw.png"> </p>
                        <input type="password" placeholder="密码" v-model="password">
                    </div>
                    <div class="btn"> 
                        <button class="btnOk" @click="login">确定</button>
                        <button class="btnCancel" @click="cancel">返回</button>
                    </div>
                </div>
    </div>  
</template>

<script>
import axios from 'axios'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'
    export default {
        name: 'v-modal',
        data: function() {
            return {
                show: false,
                username: '',
                password:'',
                nickName:''
            }
        },
        methods: {
            login(){
                if(this.username == "" || this.password == ""){
                    alert("请输入用户名或密码")
                }else{
                    let data = {'username':this.username,'password':this.password}
                    /*请求存有用户账号的json文件*/
                    axios.post("/api/menu/login",data).then((res)=>{
                        console.log(res.data);
                    /*传值是(-2,该用户不存在),(1,密码错误),(0,可登录)*/
                      if(res.data.status == -2){
                          alert("该用户不存在")
                      }else if(res.data.status == 1){
                          alert("密码输入错误")
                      }else{
                          setCookie('username',this.username,1000*60*60)
                          setTimeout(function(){
                              this.nickName = document.userName;
                              this.$emit("receive",this.nickName);
                              this.$router.go(0);
                              this.$router.push('/testCenter');
                              this.$router.go(0);
                          }.bind(this),0.1)
                      }
                  })
              };
            },
            cancel(){
                setTimeout(function(){
                              this.$router.push('/');
                              this.$router.go(0);
                          }.bind(this),0.1)
            }
        }
    }
</script>

<style>
.user{
    min-width:960px;
    margin:0 auto;
    min-height:700px;
    height:900px;
    background:blue;
    background-size:100% 100%;
    position:relative;
}
.login{
    width:278px;
    height:200px;
    position:absolute;
    top:300px;
    right:117px;
    text-align:left;
}
.userBox{
    position:relative;
}
.passwordBox{
    margin-top:30px;
    position:relative;
}
.unm{
    position:absolute;
    top:0;
    left:-43px;
}
.psw{
    position:absolute;
    top:0;
    left:-43px;
}
p{
    font-size:20px;
    font-weight:bolder;
    color:#000;
}
input{
    width:270px;
    height:37px;
}
.btn{
    display:flex;
}
.btn :active{
    background:transparents;
}
.btnOk{
    width:80px;
    margin-top:30px;
    padding:8px;
    border-radius:5px;
    cursor:pointer;
}
.btnCancel{
    width:80px;
    margin-top:30px;
    margin-left:23%;
    padding:8px;
    border-radius:5px;
    cursor:pointer;
}
</style>