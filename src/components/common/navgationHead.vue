<template>
<div class="zbt-nav">
    <div class='headHr'></div>
    <div class="navbar">
        <div class="navbar-header">
            <router-link :to="{path:'/'}">
                <img class="brand" alt="Brand" src="../../assets/imgs/zbtLogo.png">
            </router-link>
        </div>
        <img class="headerbg" src="../../assets/imgs/header.png">
        <div class="nav-collapse">
            <!--<div class="collapse-title">-->
                <!--<span>ZBT</span>-->
                <!--<span>INTELLGENT TEACHING SYSTEM</span>-->
                <!--<p>-->
                        <!--中    邦    智    慧    教    学    系    统-->
                <!--</p>-->
            <!--</div>-->
            <ul class="user">
                <li>
                    <div class="phoneApp">
                        手机客户端
                        <div class="phoneAppHover">
                            <img class="phoneAppImg" src="../../assets/imgs/客户端.png">
                        </div>
                    </div>
                    <div class="user_bn" v-if="nickName">
                        <router-link :to="{path:'/teacherCMS'}">
                            <div class="userPic" v-if="nickName">
                                <img src="../../assets/imgs/user.png">
                            </div>
                            <a v-text="nickName+ '(' + $store.state.userTypeC + ')'" v-if="nickName" class="username" :value="nickName"></a>
                        </router-link>

                        <div class="userhover" v-if="nickName">
                            <router-link :to="{path:'/teacherCMS'}">
                                <span class="usermine">我的</span>
                            </router-link>
                            <span :value="nickName" v-if="nickName" class="logOut" @click="logOut">注销</span>
                        </div>
                    </div>
                    <a class="login" v-if="!nickName" @click="simplePrompt">请登录</a>
                            <modal ref="modal" @receive="modal"></modal>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Modal from '@/components/common/Login';
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
import modalEventBind from '../../assets/js/ModalEventBind';
import EventBus from '../../assets/js/EventBus';
import bus from '../../assets/js/Bus';
import core from '../../assets/js/core.js'


export default {
  name: 'navgationHead',
  data () {
    return {
      msg: 'navgationHead',
      indexData:'',
      navData:'',
      username: '',
      password: '',
      result:-1,
      phText:true,
      phPassword:true,
      nickName:'',
      currentNavData: '',
      url:'',
      userId:''
    }
  },
  mounted(){

      /*页面挂载获取cookie，如果存在username的cookie，则不需登录*/

        setTimeout(function(){
                    if(this.$store.state.username){
                    this.nickName = this.$store.state.username;

                };
        }.bind(this),200);
        modalEventBind(this.$refs.modal);
  },
  methods: {
      logOut(){
          /*删除cookie*/
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
           this.$store.commit('userTypeC','');
           this.$router.push('/');
        //   this.$router.go(0);
        this.$store.commit('testCode',0);
      },
      prompt: function(message, title, callback, options) {
            if (typeof title === 'function') {
                options = callback;
                callback = title;
                title = undefined;
            }
            EventBus.$emit('prompt', {message: message, title: title, callback: callback, options: options || {}});
        },
      simplePrompt() {
                this.prompt((username) => {
                    alert(username);
                });
            },
      modal:function(nickName){
          this.nickName = nickName;
      }
  },
  components:{Modal}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a {
    color: inherit;
    cursor: pointer;
}
a:hover{
    text-decoration: none;
}
.headHr{
    width:100%;
    height:5px;
    background:#7a2020;
}
.zbt-nav{
    min-width:960px;
    width:100%;
    background: linear-gradient(rgb(210,210,210), #fff);
}
.navbar{
    width:100%;
    height:94px;
    box-shadow:0 0 10px #000;
    padding:20px;
    box-sizing: border-box;
    display:flex;
    position:relative;
}
.navbar .brand{
    position:absolute;
    left:15px;
    top:15px;
    height:65%;
    z-index: 9999;
}
.zbt-nav .headerbg{
    position:absolute;
    left:140px;
    top:0px;
    height:94px;
    width: 80%;
}
.nav-collapse{
    width:800px;
    display:flex;
}
.nav-collapse .collapse-title{
    width:366px;
    padding-top:11px;
    padding-left:16px;
}
.nav-collapse p{
    font-size:30px;
    font-weight:bolder;
}
.list{
    margin-left:43px;
}
.search{
    width:196px;
    height:32px;
    border-radius:5px;
    margin-right:260px;
}
.user{
  display:flex;
  position:absolute;
  top:59px;
  right:20px;
}
.nav-collapse .phoneApp{
  position:absolute;
  top:5px;
  left:-140px;
  cursor: pointer;
}
.nav-collapse .phoneApp:hover .phoneAppHover{
  display:block;
}
.nav-collapse .phoneAppHover{
  box-shadow:0 0 30px #000;
  position:absolute;
  top:31px;
  left:-35px;
  z-index:9999;
  width: 150px;
  display:none;
}
.nav-collapse .phoneAppImg{
  width:100%;
}
.username{
    position:absolute;
    top:60px;
    right:42px;
}
.user a{
  font-size:16px;
  color:inherit;
  /*background: pink;*/
  display: inline-block;
  height: 23px;
  width: 140px;
  /*text-align: right;*/
  margin-top:5px;

}
.user .login{
  border: 1px solid rgb(106,21,24);
  border-radius: 20px;
}
.user p{
  margin-top:6px;
}
.user .userPic{
    width:60px;
    height:60px;
    border-radius:50%;
    overflow:hidden;
    position: absolute;
    top: 0px;
    right: 86px;
}
.user .userPic img{
    width:100%;
}
.user_bn{
    position:relative;
    width: 155px;
    height: 84px;
    margin-top: -50px;
}
.userhover{
    width:160px;
    height:52px;
    background:#ddd;
    position:absolute;
    top:86px;
    right:34px;
    z-index:1000;
    border-radius:24px;
    display:none;

}
.user_bn:hover .userhover{
    display:block;
}
.usermine{
    font-size:16px;
    position:absolute;
    top:14px;
    right:98px;
}
.logOut{
    font-size:16px;
    position:absolute;
    top:14px;
    right:27px;
    cursor: pointer;
}
.usermine:hover{
    color:#f00;
}
.logOut:hover{
    color:#f00;
}
</style>
