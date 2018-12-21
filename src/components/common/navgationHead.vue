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
        <p class="mainTitle">{{mainTitle}}</p>
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
                    <div class="user_bn" v-if="$store.state.username !== ''">
                        <router-link class="userPic1" :to="{path:'/teacherCMS'}">
                            <div class="userPic" v-if="$store.state.username !== ''">
                                <img src="../../assets/imgs/user.png">
                            </div>
                          <a class="username1" @click="clickName" v-text="$store.state.username+ '(' + $store.state.userTypeC + ')'"
                             :value="$store.state.username"></a>
                        </router-link>
                        <div class="username" v-if="$store.state.username !== ''">

                          <el-badge :value="waitTestData" class="item">
                            <p class="waitDo" @click="clickWaitText">待考试</p>
                          </el-badge>
                          <el-badge :value="3" class="item">
                            <p class="waitDo" @click="clickWaitExer">待实训</p>
                          </el-badge>
                          <p class="logOut" @click="logOut">注销</p>
                        </div>
                        <!--<div class="userhover" v-if="$store.state.username !== ''">-->
                            <!--<router-link :to="{path:'/teacherCMS'}">-->
                                <!--<span class="usermine">我的</span>-->
                            <!--</router-link>-->
                            <!--<span :value="$store.state.username" v-if="$store.state.username !== ''">注销</span>-->
                        <!--</div>-->
                    </div>
                    <a class="login" v-if="$store.state.username === ''" @click="simplePrompt">请登录</a>
                        <modal ref="modal" @receive="modal"></modal>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Modal from '../../components/common/Login';
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
      userId:'',
      mainTitle:'',
      waitTestData: 0
    }
  },
  mounted(){
      this.getWaitTestData()
      /*页面挂载获取cookie，如果存在username的cookie，则不需登录*/

        setTimeout(function(){
            if(this.$store.state.username !== ''){
            this.nickName = this.$store.state.username;
          }
        }.bind(this),200);
        modalEventBind(this.$refs.modal);
//        显示logo后面的标题
      //console.log(this.$route.path);
        if(this.$route.path === '/'){

        }else if(this.$route.path === '/teacherCMS'){
          this.mainTitle = '个人中心'
        }else if(this.$route.path === '/courseIndex'){
          this.mainTitle = '教学中心'
        }else if(this.$route.path === '/newCourse'){
          this.mainTitle = '教学中心'
        }else if(this.$route.path === '/exerciseCenter'){
          this.mainTitle = '实训中心'
        }else if(this.$route.path === '/resourceCenter'){
          this.mainTitle = '资源中心'
        }else if(this.$route.path === '/competitionCenter'){
          this.mainTitle = '大赛中心'
        }else if(this.$route.path === '/teachTest'){
          this.mainTitle = '考试中心'
        }else if(this.$route.path === '/test'){
          this.mainTitle = '考试中心'
        }
  },
  methods: {
      //    获取待考试数目
      getWaitTestData () {
        axios.get("/readTestQuestionInfo/stuToTestData", {
          params: {
            user: this.user,
          }
        }).then((res) => {
          this.waitTestData = res.data.length
//          console.log(res.data.length)
        });
      },
      //    点击名字跳转我的中心
      clickName () {
        this.$router.push('/teacherCMS')
      },
      //    点击待考试
      clickWaitText () {
        this.$router.push('/test')
      },
      //    点击待实训
      clickWaitExer () {
        this.$router.push('/exerciseCenter')
      },
      //    撤销
      logOut(){
          /*删除cookie*/
        this.$store.commit('username','');
        this.$store.commit('userType','');
        this.$store.commit('userTypeC','');
        this.$store.commit('testCode',0);
           axios({
              method: 'post',
              url: '/api/user/logout',
              withCredentials: true
              }).then((res)=>{
                  if(res.data.code === 3){
                      console.log(res.data.code);
                  //    delCookie('username');
                      this.username = '';
                      this.password = '';
                      this.nickName = '';
                  }
                });
        this.$router.push('/');

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
        this.$store.commit('loginPage',true);
                /*this.prompt((username) => {
                    alert(username);
                });*/
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
  /*font-size:30px;*/
  /*font-weight:bolder;*/
}
.zbt-nav .mainTitle{
  position: absolute;
  left: 373px;
  top: 38px;
  font-size: 28px;
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
  z-index:100;
  width: 150px;
  display:none;
}
.nav-collapse .phoneAppImg{
  width:100%;
}
.username{
  position: absolute;
  text-align: left;
  top: 12px;
  left: 164px;
  font-size: 14px;
  width: 104px;
}
.username >>> .el-badge__content.is-fixed {
  top: 10px;
}
.username .waitDo {
  right: -48px;
}
.username a{
  font-size: 14px;
}
.username a:hover{
  color:#f00;
}
.user a{
  display: inline-block;
  margin-top:5px;
  height:25px;
}
.el-badge {
  display: block;
  left: -62px;
}
.username .el-badge__content{
  height: 16px;
  line-height: 16px;
  padding: 0 4px;
}
.user .login{
  border: 1px solid rgb(106,21,24);
  border-radius: 20px;
  width: 140px;
}
.user p{
  /*margin-top:6px;*/
}
.user .userPic{
  width:60px;
  height:60px;
  border-radius:50%;
  overflow:hidden;
  position: absolute;
  top: 5px;
  right: 150px;
  z-index: 1;
}
.user .userPic img{
  width:100%;
}
.user_bn{
  position: relative;
  width: 250px;
  height: 91px;
  margin-top: -62px;
  box-shadow: 0 0 10px 2px #ccc;
}
.user_bn .userPic1 {
  display: block;
  width: 140px;
  text-align: center;
}
.user_bn .username1 {
  text-align: center;
  margin-top: 64px;
}
.waitDo{
  position: relative;
  right: -62px;
  margin-bottom:3px;
  cursor: pointer;
}
.logOut{
  cursor: pointer;
}
.waitDo:hover{
  color:#f00;
}
.logOut:hover{
  color:#f00;
}
</style>
