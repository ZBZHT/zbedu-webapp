<template>
    <div class="user">
            <a class="login">
                <div class="login-box" v-show="true">
                    <div class="user-box">
                        <p>用户名:</p>
                        <input type="text" placeholder="请输入用户名" v-model="username">
                    </div>
                    <div class="password-box">
                        <p>密码:</p>
                        <input type="password" placeholder="请输入密码" v-model="password">
                    </div>
                    <button @click="login">确定</button>
                </div>
            </a>
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
                          }.bind(this),1000)
                      }
                  })
              };
            }
        }
    }
</script>

<style>
.user{
    min-width:960px;
    width:960px;
    margin:0 auto;
    border:1px solid #000;
    
}
.user span{
    position:absolute;
    top:0;
    right:100px;
}
.user a{
    font-size:20px;
    color:inherit;
    display: inline-block;
    height: 50px;
    width: 100px;
}
.user a:hover .login-box{
    display: block;
}
.user a:hover{
    color:#f00;
}
.user p{
    margin-top:6px;
}
.login-box{
    width: 320px;
    height: 180px;
    margin:0 auto;
    position: absolute;
    background: #F8F8F8;
    padding: 10px;
    box-shadow: 0px 0px 10px #666;
}
.login-box div{
    height: 50px;
    margin: 10px 10px;
    background: #eee;
    position: relative;
  }
.login-box div p{
    position: absolute;
    left: 10px;
    width: 70px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    color: #555;
  }
.login-box div input{
    position: absolute;
    left: 90px;
    top: 8px;
    height: 30px;
    width: 200px;
  }
.login-box button{
    width: 70px;
    height: 40px;
    margin-top: 5px;
    background: #CD3936;
    outline: none;
    color: white;
    font-size: 20px;
  }
</style>