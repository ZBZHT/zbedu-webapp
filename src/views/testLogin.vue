<template>
<div class="testLogin">
    <div class="title">
        <test-head></test-head>
    </div>
    <div class="user" :style="{height: height - 138 + 'px'}">
        
                <div class="login" v-show="!this.$store.state.username">
                    <div class="userFont">
                        <p>考试系统登录</p>
                    </div>
                    <div class="userOther">
                        <div class="userBox">
                          <img class="unm" src="../assets/imgs/unm.png">
                          <input name="fname" type="text" placeholder="学号/ID/身份证号/手机号" v-model="username" autocomplete="on" autofocus="autofocus">
                        </div>
                        <div class="passwordBox">
                          <img class="psw" src="../assets/imgs/psw.png">
                          <input name="fpassword" type="password" placeholder="密码"  @keyup.enter="login" autocomplete="new-password" v-model="password">
                        </div>
                        <div class="btn">
                          <button class="btnOk" @click="login">确定</button>
                          <button class="btnCancel" @click="cancel">返回</button>
                        </div>
                    </div>

                </div>
                <div class="loginSure" v-show="this.$store.state.username">
                    <p>{{this.$store.state.username}},欢迎进入考试系统</p>
                    <div class="userBox">
                        <p>确定用此账号进入考试系统吗？</p>
                    </div>
                    <div class="btn">
                        <button class="btnOk" @click="yes">确定</button>
                        <button class="btnCancel" @click="no">更换账号</button>
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
import md5 from 'js-md5'
import testHead from '@/components/common/testHead'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'
import core from '../assets/js/core.js'
import footFooter from '@/components/common/footFooter'


    export default {
        name: 'v-modal',
        data: function() {
            return {
                show: false,
                username: '',
                password:'',
                nickName:'',
                url:'',
                height:window.innerHeight
            }
        },
        beforeDestroy: function () {
            window.removeEventListener('resize', this.handleResize)
        },
        components:{testHead,footFooter},
        mounted(){
            this.url = document.domain;
          //  window.addEventListener("popstate",this.myFunction);
          window.addEventListener('resize', this.handleResize)
        },
        methods: {
            handleResize (event) {
                this.height = window.innerHeight;
                if(this.height <= "620"){
                    this.height = 598;
                }
            },
            myFunction(){
                this.$router.push('/');
            },
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
                            this.nickName = res.data.username;
                            this.$store.commit('username',res.data.username);
                            this.$store.commit('userType',res.data.userType);
                            this.$store.commit('userTypeC',core.userType(res.data.userType));
                            this.$store.commit('userID',res.data.userID);
                        //    setCookie('username',this.username)
                                setTimeout(function(){
                                    if(this.$store.state.userType == "admin"){
                                        this.$router.push('/teachTest');
                                    }else if(this.$store.state.userType == ""){
                                        this.$router.push('/test');
                                    }else if(this.$store.state.userType == "S"){
                                        this.$router.push('/test');
                                    }else if(this.$store.state.userType == "E"){
                                        this.$router.push('/teachTest');
                                    }else if(this.$store.state.userType == "T"){

                                        this.$router.push('/teachTest');
                                    }

                                //    this.$router.go(0);
                                }.bind(this),0.1)
                        }else if(res.data.code == 1){
                            this.nickName = res.data.username;
                            this.$store.commit('username',res.data.username);
                            this.$store.commit('userType',res.data.userType);
                            this.$store.commit('userTypeC',core.userType(res.data.userType));
                        //    setCookie('username',this.username)
                                setTimeout(function(){
                                    if(this.$store.state.userType == "admin"){
                                        this.$router.push('/teachTest');
                                    }else if(this.$store.state.userType == ""){
                                        this.$router.push('/test');
                                    }else if(this.$store.state.userType == "S"){
                                        this.$router.push('/test');
                                    }else if(this.$store.state.userType == "E"){
                                        this.$router.push('/teachTest');
                                    }else if(this.$store.state.userType == "T"){
                                        this.$router.push('/teachTest');
                                    }
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
                          }.bind(this),0.1)
            },
            yes(){
                if(this.$store.state.userType == "admin"){
                    this.$router.push('/teachTest');
                }else if(this.$store.state.userType == ""){
                    this.$router.push('/test');
                }else if(this.$store.state.userType == "S"){
                    this.$router.push('/test');
                }else if(this.$store.state.userType == "E"){
                    this.$router.push('/test');
                }else if(this.$store.state.userType == "T"){
                    this.$router.push('/teachTest');
                }
            },
            no(){
                axios({
                        method: 'post',
                        url: '/api/user/logout',
                        withCredentials: true
                        }).then((res)=>{
                                if(res.data.code == 3){
                                    console.log(res.data.code);
                                //    delCookie('username');
                                    this.username = '';
                                    this.password = '';
                                    this.nickName = '';
                                }

                        });
                this.$store.commit('username','');
                this.$store.commit('userType','');
                this.$router.push('/testLogin');
            //    this.$router.go(0);
            }
        }
    }
</script>

<style>
body{
    margin:0;
    padding:0;
}
.testLogin {
    min-width:960px;
}
.testLogin .user{
    width:100%;
    margin:0 auto;
    min-height:700px;
    background:url("../assets/imgs/testBg.png") no-repeat;
    background-size:100% 100%;
    position:relative;
    text-align:left;
    padding:10px;
}
.testLogin .login{
    width:410px;
    height:325px;
    border:3px solid #aaa;
    position:absolute;
    top:25%;
    right:38%;
    box-shadow:0 0 30px #000;
}
.testLogin .loginSure{
    width:410px;
    height:325px;
    border:3px solid #aaa;
    position:absolute;
    top:32%;
    right:38%;
    box-shadow:0 0 30px #000;
    padding: 62px;
}
.testLogin .userBox{
    display:flex;
    margin-bottom:20px;
}
.testLogin .userFont{
    text-align:center;
    margin-bottom:0;
    height: 50px;
    background:rgb(210,210,210);
}
.testLogin .userOther{
    width:100%;
    height:85%;
    background:rgb(122,18,19);
    padding: 60px;
}
.testLogin .userFont p{
    margin-bottom:0;
    line-height: 2.5;
}
.testLogin .passwordBox{
    display:flex;
}
.testLogin .unm{

}
.testLogin .psw{

}
.testLogin .user p{
    font-size:20px;
    font-weight:bolder;
    color:#000;
}
.testLogin input{
    width:270px;
    height:43px;
   
}
.testLogin .btn{
    display:flex;
    margin-left: 16px;
}
.btn :active{
    background:transparents;
}
.testLogin .btnOk{
    width:80px;
    margin-top:30px;
    padding:8px;
    border-radius:5px;
    cursor:pointer;
}
.testLogin .btnCancel{
    width:80px;
    margin-top:30px;
    margin-left:23%;
    padding:8px;
    border-radius:5px;
    cursor:pointer;
}
</style>
