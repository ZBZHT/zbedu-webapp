<template>
  <div class="index-container">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>


    <div class="index-list" :style="{height: height - 152 + 'px'}">
        <div class="index-list-topline">{{height}}</div>
        <div class="index-list-main">
            <div>
                <img src="../assets/imgs/index-bg.png">
            </div>
            <div class="index-list-nav">
                <nav-ul :navData = "navData"></nav-ul>
            </div>
        </div>
        <!--<div class="index-list-middleline"></div>-->
        <div class="index-list-bottomline"></div>
    </div>

    <div class="footer">
        <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navgationHead from '@/components/common/navgationHead'
import swipe from '@/components/testCenter/swipe'
import navUl from '@/components/common/navUl'
import footFooter from '@/components/common/footFooter'

export default {
  name: 'index',

  data () {
    return {
      windowHeight:'',
      windowWidth:'',
      navData:'',
      slides: [],
      inv: 3000,
        styleObject: {
          width: '100%',
          height: '100%'
        },
        height:window.innerHeight
    }
  },
  computed:{
    
  },
  methods:{
    handleResize (event) {
        this.height = window.innerHeight
    }
  },
  beforeDestroy: function () {

    window.removeEventListener('resize', this.handleResize)
  },
  mounted(){
      this.url = document.domain;
      let _this = this;
  //    _this.windowHeight = window.innerHeight;
  //    _this.windowHeight -= 152;
  //    document.querySelector(".index-list").style.height = _this.windowHeight + "px";
   
    window.addEventListener('resize', this.handleResize)

      axios.get("/readJson/bannerLeftData",{
                params:{
                     user:234
                }
            }).then((res)=>{
                this.indexData = res.data;
                this.navData = this.indexData;
            }).catch(function(error){
                console.log("error init." + error)
            });

      axios.get("/readJson/index",{
                params:{
                     user:123
                }
            }).then((res)=>{
                console.log(res)
                this.slides = res.data.slides;
            }).catch(function(error){
                console.log("error init." + error)
            });
    },
  components:{navgationHead,swipe,navUl,footFooter}
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
    color: #f00;
}
a:focus {
    color: #f00;
    text-decoration: none;
}
hr{
    margin-top: 2px;
    margin-bottom:2px;
}
.index-container{
    min-width:1160px;
    min-height:680px;
}
.index-list{
    width:100%;
    position:relative;
    background:rgb(122,18,19);
}
@media screen and (min-width:1800px){
    .index-list-topline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-middleline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-bottomline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-main{
        width:100%;
        height:96%;
        display:flex;
        padding-left: 100px;
        box-sizing: border-box;
    }
    .index-list img{
        width:135%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:36%;
        position:absolute;
        right:0%;
        top:25%;
    }
    .content{
        padding:6%;
    }
}
@media screen and (min-width: 1600px) and (max-width: 1799px) {
    .index-list-topline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-middleline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-bottomline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-main{
        width:100%;
        height:96%;
        display:flex;
        padding-left: 100px;
        box-sizing: border-box;
    }
    .index-list img{
        width:126%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:33%;
        position:absolute;
        right:0%;
        top:11%;
    }
    .content{
        padding:6%;
    }
}
@media screen and (min-width: 1480px) and (max-width: 1599px) {
    .index-list-topline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-middleline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-bottomline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-main{
        width:100%;
        height:96%;
        display:flex;
        padding-left: 138px;
        box-sizing: border-box;
    }
    .index-list img{
        width:109%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:30%;
        position:absolute;
        right:1%;
        top:18%;
    }
    .content{
        padding:6%;
    }
}
@media screen and (min-width: 1280px) and (max-width: 1479px) {
    .index-list-topline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-middleline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-bottomline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-main{
        width:100%;
        height:96%;
        display:flex;
        padding-left: 68px;
        box-sizing: border-box;
    }
    .index-list img{
        width:100%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:32%;
        position:absolute;
        right:1%;
        top:16%;
    }
    .content{
        padding:6%;
    }
}
@media screen and (min-width: 960px) and (max-width: 1279px) {
    .index-list-topline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-middleline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-bottomline{
        width:100%;
        height:2%;
        background:rgb(172,172,172);
    }
    .index-list-main{
        width:100%;
        height:96%;
        display:flex;
        box-sizing: border-box;
    }
    .index-list img{
        width:89%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:32%;
        position:absolute;
        right:2%;
        top:16%;
    }
    .content{
        padding:6%;
    }
}
</style>
