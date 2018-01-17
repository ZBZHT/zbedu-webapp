<template>
    <transition name="modal">
        <div id="v-modal-wrap" v-show="show">
            <div id="v-modal-dialog">

                <div id="v-modal-body">

                    <div class="desc" v-for="(item,index) in userMessage.question">
                        <span class="desctitle">
                            {{item.num}}.{{item.desc}}
                        </span>
                        <ul class="ans">
                            <li v-for="(item2,index2) in item.options">
                                <label :for="item.forId[index2]">
                                    <input :id="item.forId[index2]"
                                    :type="item.type"
                                    :value="item.value[index2]"
                                    :name="item.name">
                                        {{item2}}
                                </label>
                            </li>
                        </ul>
                    </div>
                    
                    
                </div>

                <div id="v-modal-footer">
                    <button class="v-modal-btn slave" @click="cancel()">取消</button>
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
}

.modal-enter-active, .modal-leave-active {
  transition: opacity .2s ease;
}
.modal-enter, .modal-leave-active {
  opacity: 0
}
.desc{
    margin-top:15px;
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
</style>
