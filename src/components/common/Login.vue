<template>
    <transition name="modal">
        <div id="v-modal-wrap" v-show="show">
            <div id="v-modal-dialog">

                <div id="v-modal-body">
                    <template v-if="type == 'prompt'">
                        <form class="v-modal-prompt-form">
                            <p> <img class="unm" src="../../assets/imgs/unm.png"> </p>
                                <input name="fname" type="text" ref="input" v-model="username" class="v-modal-input" placeholder="昵称/ID/身份证号/手机号" autocomplete="on" autofocus="autofocus">
                            <p> <img class="psw" src="../../assets/imgs/psw.png"> </p>

                                <input name="fpassword" type="password" ref="input" v-model="password" class="v-modal-input" placeholder="密码" @keyup.enter="login" autocomplete="new-password" >
                                <span class="checkPassword" v-show="checkPassword">用户名或密码错误</span>
                        </form>
                    </template>
                </div>
                <div id="v-modal-footer">
                    <button class="v-modal-btn primary" @click="login()">确定</button>
                    <button class="v-modal-btn slave" @click="cancel()">取消</button>
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios'
import md5 from 'js-md5'
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
import core from '../../assets/js/core.js'
    export default {
        name: 'v-modal',
        data: function() {
            return {
                show: false,
                type: '',
                message: '',
                slot: null,
                title: '',
                callback: null,
                username: '',
                inputType: 'text',
                username: '',
                password:'',
                nickName:'',
                url:'',
                checkPassword:false
            }
        },

        mounted(){
            this.url = document.domain;
        },
        methods: {
            modal: function(message, title) {
                if (typeof message === 'string') {
                    this.message = message;
                    this.slot = null;
                } else if (typeof message === 'object' && message.slot) {
                    this.slot = message.slot;
                }
                this.title = title;
                this.callback = null;
                this.username = '';
                this.password = '';
                this.show = true;
            },
            modalPrompt: function(params = {}) {
                this.type = 'prompt';
                this.modal(params.message, params.title || '输入');
                this.callback = params.callback;
                this.inputType = params.options.inputType || 'text';
            },

            cancel: function() {
                var self = this;
                this.show = false;
                setTimeout(function() {
                    if (self.callback) {
                        self.callback(self.type == 'prompt' ? undefined : false);
                    }
                }, 0);
                this.checkPassword = false;
            },
            login(){
                if(this.username == "" || this.password == ""){
                    alert("请输入用户名或密码")
                }else{
                    /*请求存有用户账号的json文件*/
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
                 //           setCookie('username',this.username)
                                setTimeout(function(){
                                    this.nickName = res.data.username;
                                    this.$store.commit('username',res.data.username);
                                    this.$store.commit('userType',res.data.userType);
                                    this.$store.commit('userTypeC',core.userType(res.data.userType));
                                    this.$store.commit('userID',res.data.userID);
                                    this.$emit("receive",this.nickName);
                                    this.$router.push('/');
                                    this.show = false;
                                //    this.$router.go(0);
                                }.bind(this),0.1)
                        }else if(res.data.code == 1){
                //            setCookie('username',this.username)
                                setTimeout(function(){
                                    this.nickName = res.data.username;
                                    this.$store.commit('username',res.data.username);
                                    this.$store.commit('userType',res.data.userType);
                                    this.$store.commit('userTypeC',core.userType(res.data.userType));
                                    this.$store.commit('userID',res.data.userID);
                                    this.$emit("receive",this.nickName);
                                    this.$router.push('/');
                                    this.show = false;
                                //   this.$router.go(0);
                                }.bind(this),0.1)
                        }else if(res.data.code == 2){
                            this.checkPassword = true;
                        }
                  })
              };
              
            }
        }
    }
</script>

<style>
#v-modal-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  background-color: rgba(51, 51, 51, 0.5);
  z-index: 50;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate3d(0, 0, 0);
}

#v-modal-dialog {
  background-color: #fff;
  width: 27%;
  height: 218px;
  padding-top: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  color: #333;
  overflow: hidden;
  -webkit-user-select: none;
}

#v-modal-dialog * {
  box-sizing: border-box;
}

#v-modal-footer {
  text-align: right;
  display: flex;
  height: 50px;
  position: relative;
}

#v-modal-footer:after {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  background: #dadada;
  transform: scaleY(0.5);
  transform-origin: top left;
}

.v-modal-btn {
  flex: 1;
  border: none;
  background-color: #ffffff;
  outline: none;
  font-size: 16px;
}

.v-modal-btn.primary {
  color: #e4393c;
}

.v-modal-btn.slave {
  color: #666;
  position: relative;
}

.v-modal-btn.slave:after {
  content: '';
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 1px;
  background: #dadada;
  transform: scaleX(0.5);
  transform-origin: top right;
}

.v-modal-btn:hover, .v-modal-btn:active {
  background-color: #eeeeee;
}

#v-modal-title {
  font-size: 16px;
  text-align: center;
  margin-bottom: 15px;
}

#v-modal-body {
  font-size: 15px;
  text-align: center;
  line-height: 22px;
  margin-bottom: 20px;
  padding: 0 20px;
  white-space: normal;
}

.v-modal-prompt-form {
  margin-top: 10px;
  text-align: left;
  position:relative;
}
.v-modal-prompt-form p{
  font-weight:bolder;
  font-size:18px;
  margin-top:7px;
}
.v-modal-prompt-form .unm{
  position:absolute;
  top:0;
  left:0;
}
.v-modal-prompt-form .psw{
  position:absolute;
  top:63px;
  left:0;
}
.v-modal-input {
  height: 43px;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 0 5px;
  outline: none;
  background-color: #fff;
  font-size: 15px;
  display: block;
  width: 85%;
  margin-left:43px;
  margin-top:20px;
}

.v-modal-input:focus {
  border-color: #e4393c;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .2s ease;
}
.modal-enter, .modal-leave-active {
  opacity: 0
}
.checkPassword{
    font-size:12px;
    color:#f00;
    position:absolute;
    left:43px;
    bottom:-21px;
}
</style>
