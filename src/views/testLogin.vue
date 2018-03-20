<template>
    <div class="user">
        <router-link :to="{path:'/'}">
                <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
            </router-link>
                <div class="login" v-show="!this.$store.state.username">
                    <p>考试系统登录</p>
                    <div class="userBox">
                        <p> <img class="unm" src="../assets/unm.png"> </p>
                        <input name="fname" type="text" placeholder="学号/ID/身份证号/手机号" v-model="username" autocomplete="on" autofocus="autofocus">
                    </div>
                    <div class="passwordBox">
                        <p> <img class="psw" src="../assets/psw.png"> </p>
                        <input name="fpassword" type="password" placeholder="密码"  @keyup.enter="login" autocomplete="new-password" v-model="password">
                    </div>
                    <div class="btn">
                        <button class="btnOk" @click="login">确定</button>
                        <button class="btnCancel" @click="cancel">返回</button>
                    </div>
                </div>
                <div class="login" v-show="this.$store.state.username">
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
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'
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
          //  window.addEventListener("popstate",this.myFunction);
        },
        methods: {
            myFunction(){
                this.$router.push('/');
            },
            login(){
                if(this.username == "" || this.password == ""){
                    alert("请输入用户名或密码")
                }else{
                    axios({
                        method: 'post',
                        url: 'http://' + this.url + ':8000/api/user/login',
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
                        //    setCookie('username',this.username)
                                setTimeout(function(){
                                    if(this.$store.state.userType == "admin"){
                                        this.$router.push('/teachTest');
                                    }else if(this.$store.state.userType == ""){
                                        this.$router.push('/testCenter');
                                    }else if(this.$store.state.userType == "S"){
                                        this.$router.push('/testCenter');
                                    }else if(this.$store.state.userType == "E"){
                                        this.$router.push('/testCenter');
                                    }else if(this.$store.state.userType == "T"){
                                        
                                        this.$router.push('/teachTest');
                                    }
                                    
                                //    this.$router.go(0);
                                }.bind(this),0.1)
                        }else if(res.data.code == 1){
                            this.nickName = res.data.username;
                            this.$store.commit('username',res.data.username);
                            this.$store.commit('userType',res.data.userType);
                        //    setCookie('username',this.username)
                                setTimeout(function(){
                                    if(this.$store.state.userType == "admin"){
                                        this.$router.push('/teachTest');
                                    }else if(this.$store.state.userType == ""){
                                        this.$router.push('/testCenter');
                                    }else if(this.$store.state.userType == "S"){
                                        this.$router.push('/testCenter');
                                    }else if(this.$store.state.userType == "E"){
                                        this.$router.push('/testCenter');
                                    }else if(this.$store.state.userType == "T"){
                                        this.$router.push('/teachTest');
                                    }
                                //    this.$router.go(0);
                                }.bind(this),0.1)
                        }else if(res.data.code == 2){
                            alert("用户名或密码错误");
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
                    this.$router.push('/testCenter');
                }else if(this.$store.state.userType == "S"){
                    this.$router.push('/testCenter');
                }else if(this.$store.state.userType == "E"){
                    this.$router.push('/testCenter');
                }else if(this.$store.state.userType == "T"){
                    this.$router.push('/teachTest');
                }
            },
            no(){
                axios({
                        method: 'post',
                        url: 'http://' + this.url + ':8000/api/user/logout',
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
                this.$router.push('/testLogin');
                this.$router.go(0);
            }
        }
    }
</script>

<style scoped>
.user{
    min-width:960px;
    margin:0 auto;
    min-height:700px;
    height: auto  !important;
    background-size:100% 100%;
    position:relative;
    box-shadow:0 300px 400px -100px #e4393c inset;
    text-align:left;
    padding:10px;
}
.login{
    width:278px;
    height:200px;
    position:absolute;
    top:50%;
    right:50%;
    transform: translate(34%, -50%);
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
