<template>
  <div class="container">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>
   
    <div class="topbox">
        <swipe :slides="slides" :inv="inv" :style="styleObject" class="swipe"></swipe>
    </div>

    <div class="list">
            <nav-ul :navData = "navData"></nav-ul>
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
      navData:'',
      slides: [],
      inv: 3000,
        styleObject: {
          width: '100%',
          height: '295px'
        }
    }
  },
  computed:{

  },
  methods:{
              
  },
  mounted(){
      this.url = document.domain;
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
.container{
    
}
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
.topbox{
    width:100%;
    height:295px;
    margin:0 auto;
    position:relative;
    overflow:hidden;
    margin-top: -40px;
    margin-bottom: 40px;
}
.swipe{
    margin:0 auto;
}
</style>
