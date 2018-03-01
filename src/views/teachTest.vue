<template>
<div>
    <div class="question">
        <div class="leftBox">
            <p>{{user}}</p>
            <ul class="leftItem" :class="{dispear : !dispear}">
                <li class="leftLi" v-for="(item,index) in leftBox"
                    @click="rightAppear(index)"
                    :class="currIndex === index ? 'active' : '' ">
                    {{item.li}}
                </li>
            </ul>
        </div>
        <div class="rightBox">
            <div class="testOnline" v-show="currIndex === 0">
                <div class="title">
                    <div>
                        <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
                    </div>
                </div>
                <div class="content">
                    <div class="data">
                        
                        
                    </div>
                </div>
            </div>
            <div class="userMessage" v-show="currIndex === 1">
                
                
            </div>
        </div>
    </div>
    <div class="footer">
        <foot-footer></foot-footer>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import footFooter from '@/components/common/footFooter'
import Modal from '@/components/testCenter/modal';

export default {
  name: 'test',
  data () {
    return {

    }
  },
  mounted(){

    },
  methods:{
                   
    },
  components:{Modal,footFooter}

}
</script>

<style scoped>
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
}
.question{
    min-width:1200px;
    min-width:700px;
    width:1200px;
    height:700px;
    margin:0 auto;
    margin-top: 40px;
    border:1px solid #000;
    display:flex;
}
.leftBox{
    width:150px;
    height:100%;
    border:1px solid #000;
}
.leftBox > p{
    font-size:20px;
    margin-top:68px;
}
.leftBox .leftItem{
    margin-top:57px;
}
.leftLi{
    line-height:56px;
    background:#2b333b;
    margin-top:10px;
    font-weight:bolder;
    font-size:20px;
    cursor:pointer;
    color:#fff;
}
.active{
    color:#f00;
}
.rightBox{
    width:1050px;
    height:100%;
    position:relative;
}
.testOnline{
    width:1050px;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
}
.title{
    width:100%;
    height:150px;
    border:1px solid #000;
    text-align:left;
    font-weight: bolder;
    font-size:20px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
}
.content{
    width:100%;
    display:flex;
}
.data{
    width:990px;
    height:550px;
    border:1px solid #000;
    overflow:auto;
    text-align:left;
    padding:20px;
    box-sizing:border-box;
}
.dispear{
    display:none;
}
.userMessage{
    width:1048px;
    height:100%;
    background:#fff;s
    position:absolute;
    top:0;
    left:0;
    padding:10px;
    box-sizing:border-box;
    text-align:left;
    overflow:auto;
}
</style>
