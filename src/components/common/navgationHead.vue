<template>
<div class="nav">
    <div class="navbar">
        <div class="navbar-header">
            <router-link :to="{path:'/index'}">
                <img class="brand" alt="Brand" src="../../assets/imgs/zb_logo.png">
            </router-link>
        </div>
        <div class="collapse">
            <div class="list">
                   <nav-ul :navData = "navData" v-on:child="fromChild"
                           @sendHeaderNavData="receiveFromNavData"
                           :currentNavData="currentNavData"></nav-ul>
            </div>

            <form>
                    <input type="text" class="search" placeholder="Search">
            </form>

            <ul class="user">
                <li>
                    <a v-text="nickName" v-if="nickName" class="username" :value="nickName"></a>
                        <a class="login" v-if="!nickName" @click="simplePrompt">登录</a>
                            <modal ref="modal" @receive="modal"></modal>
                        <a :value="nickName" v-if="nickName" class="logOut" @click="logOut">注销</a>
                </li>
            </ul>

        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import navUl from '@/components/common/navUl'
import Modal from '@/components/common/Login';
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
import modalEventBind from '../../assets/js/ModalEventBind';
import EventBus from '../../assets/js/EventBus';
import bus from '../../assets/js/Bus'

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
      currentNavData: ''
    }
  },
  mounted(){
      axios.get("/api/menu/index",{
                params:{
                     user:1
                }
            }).then((res)=>{
                this.indexData = res.data;
                this.navData = this.indexData.bannerLeftData;

            }).catch(function(error){
                console.log("error init." + error)
            });

      /*页面挂载获取cookie，如果存在username的cookie，则不需登录*/
        if(getCookie('username')){
            this.nickName = getCookie('username')
        };

         modalEventBind(this.$refs.modal);
  },
  methods: {
      logOut(){
          /*删除cookie*/
           delCookie('username');
           this.username = '';
           this.password = '';
           this.nickName = '';
           this.$router.push('/');
           axios.post("/api/menu/logOut").then((res)=>{
                        console.log(res);
                  })
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
      },
      fromChild (somedata) {
        this.fromData = somedata
      console.log(somedata)
    },
    receiveFromNavData (currentNavData){
      this.currentNavData = currentNavData
      this.$emit('sendNavData',currentNavData)
      bus.$emit('passHeaderNavData',currentNavData)
      // console.log(currentNavData)
    }

  },
  components:{navUl,Modal}

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
    font-weight:bolder;
}
a:hover{
    text-decoration: none;
}
.nav{
    min-width:1200px;
    margin-bottom: 40px;
}
.navbar{
    width:100%;
    height:100px;
     box-shadow:0 0 10px #000;
    padding:20px;
    box-sizing: border-box;
    display:flex;
    position:relative;
}
.collapse{
    display:flex;
}
.list{
    margin-left:43px;
}
.search{
    width:196px;
    height:32px;
    border-radius:5px;
    margin-top:27px;
    margin-left:20px;
}

.user{
  display:flex;
  position:absolute;
  top:59px;
  right:20px;
}
.user span{
    position:absolute;
    top:0;
    right:100px;
}
.username{
    position:absolute;
    top:5px;
    right:110px;
}
.user a{
  font-size:20px;
  color:inherit;
  /*background: pink;*/
  display: inline-block;
  height: 50px;
  width: 100px;
  /*text-align: right;*/
}
.user a:hover{
  color:#f00;
}
.user p{
  margin-top:6px;
}
.logOut{
    position:absolute;
    top:0;
    right:0;
}
</style>
