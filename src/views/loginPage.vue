<template>
    <div class="user">
                <div class="login" v-show="true">
                    <div class="userBox">
                        <p> <img class="unm" src="../assets/imgs/unm.png"> </p>
                        <input name="fname" type="text" placeholder="昵称/ID/身份证号/手机号" v-model="username" autocomplete="on" autofocus="autofocus">
                    </div>
                    <div class="passwordBox">
                        <p> <img class="psw" src="../assets/imgs/psw.png"> </p>
                        <input name="fpassword" type="password" placeholder="密码" @keyup.enter="login" v-model="password" autocomplete="new-password">
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
import md5 from 'js-md5'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'
import core from '../assets/js/core.js'

    export default {
        name: 'v-modal',
        data: function() {
            return {
                show: false,
                username: '',
                password:'',
                nickName:'',
                url:''
            }
        },
        mounted(){
            this.url = document.domain;
        },
        methods: {
            login(){
                if(this.username == "" || this.password == ""){
                    alert("请输入用户名或密码")
                }else{
                    axios({
                        method: 'post',
                        url: '/api/user/login',
                        data: {
                            username: this.username,
                            password: md5(this.password)
                        },
                        withCredentials: true
                        }).then((res)=>{
                            console.log(res.data);
                        /*传值是 0:登陆成功, 1: 已登陆, 2:用户名或密码错误 */
                        if(res.data.code == 0){
                            //setCookie('username',this.username)
                                setTimeout(function(){
                                    this.nickName = res.data.username;
                                    this.$store.commit('username',res.data.username);
                                    this.$store.commit('userType',res.data.userType);
                                    this.$store.commit('userTypeC',core.userType(res.data.userType));
                                    this.$store.commit('userID',res.data.userID);
                                    this.$emit("receive",this.nickName);
                                    this.$router.push('/');
                                //    this.$router.go(0);
                                }.bind(this),0.1)
                        }else if(res.data.code == 1){
                            //setCookie('username',this.username)
                                setTimeout(function(){
                                    this.nickName = res.data.username;
                                    this.$store.commit('username',res.data.username);
                                    this.$store.commit('userType',res.data.userType);
                                    this.$store.commit('userTypeC',core.userType(res.data.userType));
                                    this.$emit("receive",this.nickName);
                                    this.$router.push('/');
                                //    this.$router.go(0);
                                }.bind(this),0.1)
                        }else if(res.data.code == 2){
                            this.$message({
                                showClose: true,
                                message: '用户名或密码错误',
                                type: 'error'
                            });
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

<style scoped>
.user{
    min-width:960px;
    margin:0 auto;
    min-height:700px;
    height:900px;
    background:url("../../src/assets/imgs/loginPage.jpg") no-repeat;
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
    height:43px;
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
