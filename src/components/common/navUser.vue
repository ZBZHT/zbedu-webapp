<template>
<div class="user_bn">
    <router-link :to="{path:'/teacherCMS'}">
        <div class="userPic" v-if="nickName">
            <img src="../../assets/imgs/user.png">
        </div>
    </router-link>
        <div class="username" v-if="$store.state.username !== ''">
          <a @click="clickName" v-text="nickName + '(' + userId + ')'" v-if="nickName" :value="nickName"></a>
          <el-badge :value="waitTestData" class="item">
            <p class="waitDo" @click="clickWaitText">待考试</p>
          </el-badge>
          <el-badge :value="3" class="item">
            <p class="waitDo" @click="clickWaitExer">待实训</p>
          </el-badge>
          <p class="logOut" @click="logOut">注销</p>
        </div>

        <!--<div class="userhover">-->
            <!--<router-link :to="{path:'/teacherCMS'}">-->
                <!--<span class="usermine">我的</span>-->
            <!--</router-link>-->
            <!--<span :value="nickName" v-if="nickName" class="logOut" @click="logOut">注销</span>-->
        <!--</div>-->

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
      userId:'',
      waitTestData: 0
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
  /*position:relative;*/
  display: flex;
  align-items: center;
  padding-left:22%;
  padding-top: 33px;
  box-sizing: border-box;
}
.user_bn:hover .userhover{
    display:block;
}
.username{
  width:65%;
  font-size:14px;
  /*position:absolute;*/
  /*top: -25px;*/
  /*right: -6%;*/
  text-align: left;
}
.username a:hover{
  color:#f00;
}
.user a{
  font-size:14px;
  color:inherit;
  display: inline-block;
  height: 50px;
  width: 180px;
  margin-bottom:-26px;
}
.el-badge {
  display: block;
  width: 50px;
  /*left: -123px;*/
}
.user_bn p{
  margin-top:6px;
}
.user_bn .userPic{
  width:60px;
  height:60px;
  border-radius:50%;
  overflow:hidden;
  z-index: 1;
  margin-right:10px;
}
.user_bn .userPic img{
  width:100%;
}
.waitDo{
  /*position: relative;*/
  /*right: -123px;*/
  margin-bottom:3px;
  cursor: pointer;
  position: relative;
}
.el-badge__content.is-fixed{
  position: absolute;
  left: 20px;
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
