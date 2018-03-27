<template>
<div class="best-class">
    <div class="five-box" v-for="item in bestClassData">
        <div class="mask-play zz mf">
            <img :src="url_before + item.url">
            <div class="mask">
                <img @click="playBestVideo(item)" src="src/assets/imgs/play3.png">
                <p class="ppv" @click="playBestPdf(item)"><span>PPT</span></p>
                <p class="ppv" @click="playBestVideo(item)"><span>Video</span></p>
            </div>
        </div>
        <p class="p" @click="sendBestTitle(item)">
          <router-link :to="{path:'/courseNoTree/'+ item.courseId + '/label/' + item.title}">{{item.title}}</router-link>
        </p>
    </div>
</div>
</template>

<script>
      import axios from 'axios'
      // import bus from '../../assets/js/Bus'
export default {
  name: 'bestClass',
  props:['bestClassData'],
  data () {
    return {
      msg: 'bestClass',
      url_before:'src/assets/imgs/'
    }
  },
  methods: {
    sendBestTitle(item){
      this.$store.commit('noTreeTitle',item);
      // this.$emit('sendBestCourseData',item)
      // alert(title)
    },
    playBestVideo (item) {
      this.$router.push('/playVideo/'+ item.courseId + '/video/' + item.title)
    },
    playBestPdf (item) {
      this.$router.push('/playPdf/'+item.courseId + '/pdf/' + item.title)
    }
  },
  mounted(){

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
.best-class{
    display:flex;
    width:960px;
    height:200px;
    margin:0 auto;
    margin-top:10px;
}
.five-box{
    width:169px;
    height:200px;
    margin-right:29px;
}
.best-class a{
  color:#000;
}
.best-class a:hover{
  color:#e4393c;
}
.best-class .five-box .p{
    margin-top:-25px;
    font-size: 18px;
    text-align: center;
    margin-left:-9%;
}
.mask-play>img{
  width:169px;
  height:100px;
}
.zz{
    border-radius:10px;
    overflow: hidden;
}
.mf{
    width:171px;
    height:100px;
    margin-bottom:40px;
}
.mask-play .mask{
    width:171px;
    height:100px;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    top:-104px;
    right:0;
    display:none;
}
.mask>img{
    margin-top:20px;
}
.mask p>span{
    font-size:13px;
}
div.mask-play:hover .mask{
    display: block;
    cursor: pointer;
}
.ppv{
    width:37px;
    height:18px;
    border-radius: 8px;
    background: #fff;
    color:#000;
    margin-left: 124px;
    margin-top:-43px;
    text-align: center;
}
</style>
