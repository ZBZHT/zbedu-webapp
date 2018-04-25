<template>
<div class="user_bn">
    <router-link :to="{path:'/teacherCMS'}">
        <div class="userPic" v-if="nickName">
            <img src="../../assets/imgs/user.png">
        </div>
        <a v-text="nickName + '(' + userId + ')'" v-if="nickName" class="username" :value="nickName"></a>
    </router-link>
        <div class="userhover">
            <router-link :to="{path:'/teacherCMS'}">
                <span class="usermine">我的</span>
            </router-link>
            <span :value="nickName" v-if="nickName" class="logOut" @click="logOut">注销</span>
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
      url:document.domain,
      userId:''
    }
  },
  mounted(){

      /*页面挂载获取cookie，如果存在username的cookie，则不需登录*/
        setTimeout(function(){
                    if(this.$store.state.username){
                    this.nickName = this.$store.state.username;
                    this.userId = core.userType(this.$store.state.userType);
                };
        }.bind(this),200);
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
                        this.$store.commit('username','');
                        this.$store.commit('userType','');
                        this.$router.push('/');
                        //   this.$router.go(0);
                  });

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
.user_bn{
    position:relative;
}
.userhover{
    font-size:15px;
    width:144px;
    height:30px;
    background:#ddd;
    position:absolute;
    top:80px;
    right:35px;
    z-index:1000;
    border-radius:24px;
    display:none;
}
.user_bn:hover .userhover{
    display:block;
}
.username{
    width:65%;
    font-size:16px;
    position:absolute;
    top:60px;
    right:30px;
}
.user a{
  font-size:16px;
  color:inherit;
  display: inline-block;
  height: 50px;
  width: 180px;
  margin-bottom:-26px;
}
.user_bn p{
  margin-top:6px;
}
.user_bn .userPic{
    width:60px;
    height:60px;
    border-radius:50%;
    overflow:hidden;
    margin: 0 auto;
    margin-top: -80px;
}
.user_bn .userPic img{
    width:100%;
}
.logOut{
    position:absolute;
    top:6px;
    right:30px;
}
.usermine{
    position:absolute;
    top:6px;
    right:89px;
}
.usermine:hover{
    color:#f00;
}
.logOut:hover{
    color:#f00;
}
</style>
