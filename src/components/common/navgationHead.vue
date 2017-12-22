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
                   <nav-ul :navData = "navData"></nav-ul>
            </div>

            <form>
                    <input type="text" class="search" placeholder="Search">
            </form>
            
            <ul class="user">
                <li>
                    <a v-text="nickName" v-if="nickName" class="username"></a>
                    <a class="login">
                        <a v-if="!nickName" @click="simplePrompt">登录</a>
                        <div class="login-box" v-show="true">
                            <div class="user-box">
                                <p>用户名:</p>
                                <input type="text" placeholder="请输入用户名" v-model="username">
                            </div>
                            <div class="password-box">
                                <p>用户名:</p>
                                <input type="password" placeholder="请输入密码" v-model="password">
                            </div>
                            <button @click="login">确定</button>
                        </div>
                    </a>
                    <a v-if="nickName" class="logOut" @click="logOut">注销</a>
                </li>
            </ul>
            
        </div>
    </div>

    
        

        <modal ref="modal"></modal>


</div>
</template>

<script>
import axios from 'axios'
import navUl from '@/components/common/navUl'
import Modal from '@/components/common/Login';
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
import ModalApi from '../../assets/js/ModalApi';
import modalEventBind from '../../assets/js/ModalEventBind';
export default {
  mixins: [ModalApi],
  name: 'navgationHead',
  data () {
    return {
      msg: 'navgationHead',
      indexData:'',
      navData:'',
      username: '',
      password: '',
      nickName:'',
      result:-1,
      phText:true,
      phPassword:true
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
            this.nickName = document.userName;
        };

         modalEventBind(this.$refs.modal);  
  },
  methods: {
      login(){
        if(this.username == "" || this.password == ""){
            alert("请输入用户名或密码")
        }else{
            let data = {'username':this.username,'password':this.password}
            /*请求存有用户账号的json文件*/
            axios.post("/api/menu/login",data).then((res)=>{
                console.log(res);
                for(var i = 0;i < res.data.users.length;i++){
                    if(this.username == res.data.users[i].username){
                        if(this.password == res.data.users[i].password){
                            this.result = 1;
                        }else{
                            this.result = 0;
                        }
                    }
                }
             /*判断后的值是(-1,该用户不存在),(0,密码错误),(1,可登录)*/
              if(this.result == -1){
                  alert("该用户不存在")
              }else if(this.result == 0){
                  alert("密码输入错误")
              }else{
                  setCookie('username',this.username,1000*60*60)
                  setTimeout(function(){
                      this.nickName = document.userName;
                  }.bind(this),1000)
              }
          })
      }
    },
      logOut(){
          /*删除cookie*/
           this.nickName = '';
           delCookie('username');
           this.username = '';
           this.password = '';
      },

      
            simplePrompt() {
                this.prompt((username) => {
                    alert('你输入的数据为：' + username);
                });
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

.login-box{
  width: 320px;
  height: 180px;
  margin-top: -15px;
  right: 0px;
  position: absolute;
  background: #F8F8F8;
  padding: 10px;
  box-shadow: 0px 0px 10px #666;
  display: none;
  z-index: 99;
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
    /*background: deeppink;*/
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
.user a:hover .login-box{
  display: block;
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
