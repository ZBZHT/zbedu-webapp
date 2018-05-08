<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
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
    min-width: 960px;
    margin-top: 105px;
    height: 700px;
    /*background: lightgoldenrodyellow;*/
    position: relative;
    padding: 0 5%;
  }
  .content-box .pdf-box{
    width: 90%;
    height: 100%;
  }

</style>
