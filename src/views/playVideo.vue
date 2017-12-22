<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
      <video src="/src/assets/video/前氧传感器故障检测-11.22.mp4" autoplay controls>

      </video>
    </div>

  </div>
</template>

<script>
  import navgationHead from '@/components/common/navgationHead'
  export default {
    name: 'user',
    data () {
      return {

      }
    },
    mounted(){
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
    width: 100%;
    min-width: 960px;
    margin-top: 105px;
    height: 700px;
    /*background: lightgoldenrodyellow;*/
    position: relative;
    padding: 0 5%;
  }
  .content-box .pdf-box{
    min-width: 1000px;
    width: 90%;
    height: 100%;
  }

</style>
