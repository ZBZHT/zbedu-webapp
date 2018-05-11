<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
      <p class="devDownload" v-show="noTree.teachingMaterial"></p>
      <iframe :src="'/resource/pdf/coursePdfData/' + noTree.teachingMaterial" class="pdf-box" type="application/pdf"></iframe>
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
    computed:{
      noTree(){
        return this.$store.state.noTree;
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
    margin-top: 105px;
    height: 700px;
    position: relative;
    padding: 0 5%;
  }
  .content-box .devDownload{
    margin-left: 9.7%;
    width: 79.5%;
    height: 53px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgb(82,86,89);
  }
  .content-box .pdf-box{
    width: 90%;
    height: 100%;
  }

</style>
