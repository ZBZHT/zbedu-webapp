<template>
    <transition name="modal">
        <div id="v-modal-wrap" v-show="show">
            <div id="v-modal-dialog">

                <div id="v-modal-cancel">
                    <button class="v-modal-btn slave" @click="cancel()">X</button>
                </div>

                <div id="v-modal-body">
                /* 试题浏览 */
                    <div class="desc" v-for="(item,index) in userMessage.question">
                        <span class="desctitle">
                            {{item.num}}.{{item.desc}}
                        </span>
                        <ul class="ans">
                            <li>
                                <label for="11" v-if="item.options[0]">
                                    <input id="11" :type="item.type" value="A" :name="item.name">
                                        {{item.options[0]}}
                                </label>
                                <label for="22" v-if="item.options[1]">
                                    <input id="22" :type="item.type" value="B" :name="item.name">
                                        {{item.options[1]}}
                                </label>
                                <label for="33" v-if="item.options[2]">
                                    <input id="33" :type="item.type" value="C" :name="item.name">
                                        {{item.options[2]}}
                                </label>
                                <label for="44" v-if="item.options[3]">
                                    <input id="44" :type="item.type" value="D" :name="item.name">
                                        {{item.options[3]}}
                                </label>
                            </li>
                        </ul>
                    </div>
                /*错题分析*/    
                    <div class="errAnaBox" :class="{display : Display}">
                        <p>错题分析</p>
                        <span class="desctitle">
                            <img src="../../assets/err.jpg">
                            2.变速器增加了超速挡可以( )。
                        </span>
                        <ul class="ans">
                            <li>
                                <label for="11">
                                    <input id="11" type="radio" value="A" name="name">
                                        A
                                </label>
                                <label for="22">
                                    <input id="22" type="radio" value="B" name="name">
                                        B
                                </label>
                                <label for="33">
                                    <input id="33" type="radio" value="C" name="name">
                                        C
                                </label>
                                <label for="44">
                                    <input id="44" type="radio" value="D" name="name">
                                        D
                                </label>
                            </li>
                        </ul>
                        <span>
                            正确答案：A
                        </span>
                    </div>
                    
                    
                </div>

            </div>
        </div>
    </transition>
</template>

<script>
import axios from 'axios'
import {setCookie,getCookie,delCookie} from '../../assets/js/cookie.js'
    export default {
        name: 'modal',
        data: function() {
            return {
                show: false,
                type: '',
                message: '',
                slot: null,
                title: '',
                callback: null,
            }
        },
        computed:{
            userMessage(){
                return this.$store.state.userMessage;
            },
            Display(){
                return this.$store.state.Display;
            }
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
            },
        }
    }
</script>

<style>
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a{
    color: inherit;
    cursor: pointer;
    text-decoration:none;
}
a:hover{
    text-decoration: none;
}
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
  width: 49%;
  height: 570px;
  padding-top: 20px;
  border-radius: 4px;
  box-sizing: border-box;
  color: #333;
  overflow: auto;
  -webkit-user-select: none;
}

#v-modal-dialog * {
  box-sizing: border-box;
}



.v-modal-btn {
  flex: 1;
  border: none;
  background-color: #f00;
  outline: none;
  font-size: 16px;
  position: absolute;
  right: 22%;
  top: 15%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.v-modal-btn.primary {
  color: #e4393c;
}

.v-modal-btn:hover, .v-modal-btn:active {
  background-color: #eeeeee;
}

#v-modal-body {
  font-size: 15px;
  line-height: 22px;
  margin-bottom: 20px;
  padding: 0 20px;
  white-space: normal;
  test-align:left;
  position:relative;
}

.errAnaBox{
    padding: 0 20px;
    position:absolute;
    top:0;
    left:0;
    background:#fff;
    width:100%;
    height:100%;
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .2s ease;
}
.modal-enter, .modal-leave-active {
  opacity: 0
}
.desc{
    margin-top:15px;
    background:#fff;
}
.desctitle{
    font-weight:bolder;
}
.ans{
    display:flex;
    margin-top:5px;
    margin-bottom:5px;
}
.ans li{
    margin-left:27px;
}
.ans li :hover{
    cursor:pointer;
}
.display{
    display:none;
}
</style>
