<template>
  <div class="index-container">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>


    <div class="index-list">
        <div class="index-list-topline"></div>
        <div class="index-list-main">
            <img src="../assets/imgs/index-bg.png">
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
        }
    }
  },
  computed:{

  },
  methods:{

  },
  mounted(){
      this.url = document.domain;
      let _this = this;
      _this.windowHeight = window.innerHeight;
      _this.windowHeight -= 152;
 //     console.log(window.innerHeight);
 //     console.log(_this.windowHeight);
      document.querySelector(".index-list").style.height = _this.windowHeight + "px";

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

      axios.get("http://" + this.url + ":8000/readJson/index",{
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
@media screen and (min-width:1800px){
    .index-list{
        width:100%;
        height:0;
        position:relative;
        background:rgb(122,18,19);
    }
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
        width:52%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:47%;
        height:100%;
    }
    .content{
        padding:6%;
    }
}
@media screen and (min-width: 1420px) and (max-width: 1799px) {
    .index-list{
        width:100%;
        height:0;
        position:relative;
        background:rgb(122,18,19);
    }
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
        width:52%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:47%;
        height:100%;
    }
    .content{
        padding:6%;
    }
}
@media screen and (min-width: 1270px) and (max-width: 1419px) {
    .index-list{
        width:100%;
        height:0;
        position:relative;
        background:rgb(122,18,19);
    }
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
        width:52%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:47%;
        height:100%;
    }
    .content{
        padding:6%;
    }
}
@media screen and (min-width: 960px) and (max-width: 1269px) {
    .index-list{
        width:100%;
        height:0;
        position:relative;
        background:rgb(122,18,19);
    }
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
        width:52%;
        height:100%;
    }
    .index-list .index-list-nav{
        width:47%;
        height:100%;
    }
    .content{
        padding:6%;
    }
}
</style>
