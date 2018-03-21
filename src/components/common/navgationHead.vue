<template>
<div class="nav">
    <div class='headHr'></div>
    <div class="navbar">
        <div class="navbar-header">
            <router-link :to="{path:'/'}">
                <img class="brand" alt="Brand" src="../../assets/imgs/zb_logo.png">
            </router-link>
        </div>
        <div class="collapse">
            <b>
                    智    慧    教    学    系    统
            </b>
            <ul class="user">
                <form>
                        <input type="text" class="search" placeholder="Search">
                </form>
                <li>
                    <router-link :to="{path:'/teacherCMS'}">
                        <div class="userPic" v-if="nickName">
                            <img src="../../assets/user.png">
                        </div>
                        <a v-text="nickName" v-if="nickName" class="username" :value="nickName"></a>
                    </router-link>
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
      currentNavData: '',
      url:''
    }
  },
  mounted(){
      this.url = document.domain;
      axios.get("http://" + this.url + ":8000/readJson/bannerLeftData",{
                params:{
                     user:234
                }
            }).then((res)=>{
                this.indexData = res.data;
                this.navData = this.indexData;
            }).catch(function(error){
                console.log("error init." + error)
            });

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
           this.$store.commit('userType','');
           this.$router.push('/');
           this.$router.go(0);
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
.nav{
    min-width:1200px;
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
    width:100%;
    display:flex;
}
.collapse b{
    font-size:30px;
    padding-top:21px;
    padding-left:10px;
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
.user span{
    position:absolute;
    top:0;
    right:100px;
}
.username{
    position:absolute;
    top:15px;
    right:80px;
}
.user a{
  font-size:18px;
  color:inherit;
  /*background: pink;*/
  display: inline-block;
  height: 50px;
  width: 100px;
  /*text-align: right;*/
  margin-bottom:-22px;
}
.user a:hover{
  color:#f00;
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
    top: -50px;
    right: 99px;
}
.user .userPic img{
    width:100%;
}
.logOut{
    position:absolute;
    top:14px;
    right:0;
}
</style>
