<template>
<div>
  <div v-for="(item,index) in bannerLeftData" v-if="index <= 0">
    <div class="item-a" v-for="item2 in item.children">
                <a>
                    <span class="item-b">
                        <span class="bleft">{{item2.title}}</span>
                        <b class="jiantou"> > </b>
                    </span>
                </a>
                <div class="hiddenbox">
                    <div v-for="item3 in item2.children">
                        <b class="hd-title" @click="setMsg(item3,item3.title)">
                          <router-link :to="{path:'/course'}">
                            {{item3.title}}
                          </router-link>

                            <!--<a @click="qqq(item3.title)">{{item3.title}}</a>-->
                        </b>
                        <hr/>
                        <ul class="hd-desc-ul">
                            <li class="hd-desc" v-for="item4 in item3.children" @click="setMsg(item4,item4.title)">

                              <router-link :to="{path:'/courseNoTree'}">
                                {{item4.title}}
                              </router-link>

                            </li>
                        </ul>
                    </div>
                </div>
    </div>
  </div>
</div>
</template>

<script>
      import axios from 'axios'
      import bus from '../../assets/js/Bus'
export default {
  name: 'bannerLeft',
  props:['bannerLeftData'],
  data () {
    return {
      msg: 'bannerLeft'
    }
  },
  mounted(){

  },
  methods: {
    setMsg: function (item,title) {
      bus.$emit('sendLeftData',item,title)
      // alert(title)
    }
  }
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
a:focus {
    color: #f00;
    text-decoration: none;
}
.banner{
  width:920px;
  height:384px;
  border:1px solid #000;
  margin:0 auto;
  position:relative;
}
.left-menu{
  z-index:2;
  width:17.5%;
  height:384px;
  padding:17px;
  padding-left:0;
  box-sizing: border-box;
  background: #2b333b;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  font-weight:200;
}
.rightbox {
    /*-webkit-box-flex: 3;*/
}
.item-a{
    width:110%;
    height:50px;
    line-height:46px;
    font-size:12px;
    cursor:pointer;
    padding-left:4px;
    padding-top:20px;
}
.item-b{
    position:relative;
}
.item-a:hover{
    background:#fff;
}
.item-a span{
    width:180px;
}
.item-a .bleft{
    margin-left:-28px;
}
.item-a .jiantou{
    margin-left:10px;
    position:absolute;
    top:0;
    right:11px;
}
.hiddenbox{
    width:600px;
    height:384px;
    background:#fff;
    padding-left:20px;
    position: absolute;
    top:0;
    left:161px;
    display: none;
    z-index:9999;
    cursor: auto;
    overflow: auto;
    text-align:left;
}
.item-a:hover .hiddenbox{
    display: block;
}
.hd-title a{
    display: inline-block;
    color:#262626;
    font-size: 15px;
    height:0;
}
.hiddenbox .hd-desc-ul{
    /*margin-top:-45px;
    margin-bottom: -52px;*/
}
.hiddenbox .hd-desc{
    display:inline-block;
    margin-right:26px;
    height:0;
}
.hiddenbox ul.noneli{
    margin-bottom:-40px;
}
.hiddenbox .hd-desc a{
    color:#262626;
    font-size: 14px;
    margin-top:10px;
}
.left-menu .item-a a span{
    display: inline-block;
    width:160px;
    font-size:22px;
    color:#f00;
    font-weight: bold;
}
.left-menu .item-a a i{
    color:rgba(255,0,0,0.5);
    font-size:16px;
    margin-left:10px;
}
.left-menu .item-a a:hover{
    color:#f00;
}
</style>
