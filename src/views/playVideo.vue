<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
      <!--<p>完整url:{{aa}}</p>-->
      <!--<p>路由路径:{{bb}}</p>-->
      <!--<p>路由路径参数:{{cc}}</p>-->
      <div v-for="(item,index) in noTree.videoTitle" v-if="index == 0">
        <video id="video-box" autoplay controls @click="stop" :src="'/resource/video/courseVideoData/' + item.videoTitle">
        </video>
      </div>
    </div>

  </div>
</template>

<script>
  import navgationHead from '@/components/common/navgationHead'

  export default {
    name: 'user',
    data () {
      return {
        aa:'',
        bb:'',
        cc:''
      }
    },
    computed:{
      noTree(){
        return this.$store.state.noTree;
      },
      videoId(){
        console.log('/video/'+this.$route.params.courseId+'.mp4'+'----')
        return '/video/'+this.$route.params.courseId+'.mp4'
      },
      videoTitle(){
        console.log('/video/'+this.$route.params.label+'.mp4'+'======')
        return this.$route.params.label+'.mp4'
      }
    },
    methods:{
      stop(){
        var myVideo =document.getElementById("video-box");
        if (myVideo.paused){
            myVideo.play()
        }else {
          myVideo.pause()
        }
      }
    },
    mounted(){
      this.aa = window.location.href
      this.bb = this.$route.path
      this.cc = this.$route.params
      console.log(this.aa )
    },
    watch: {

    },
    components: {
      navgationHead
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .nav{
    background: #ddd;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .content-box{
    margin-top: 105px;
    /*background: pink;*/
  }
  .content-box video{
    width: 800px;
    margin-top: 20px;
    height: 500px;
    /*background: lightgoldenrodyellow;*/
    position: relative;
    padding: 0 5%;
  }


</style>
