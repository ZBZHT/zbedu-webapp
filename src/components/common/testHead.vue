<template>
  <div class="testHead-title">
    <router-link :to="{path:'/'}">
      <img class="testHead-brand" alt="Brand" src="../../assets/imgs/zbtLogo.png">
    </router-link>
    <img class="testHead-headerbg" src="../../assets/imgs/header.png">
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        
      }
    },
    mounted() {
        
    },
    components: {
      
    },
    methods: {
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .testHead-title{
    width:100%;
    height:94px;
    font-size:16px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    position:relative;
  }
  .testHead-headerbg{
    position:absolute;
    left:140px;
    top:0px;
    height:94px;
    width: 80%;
    z-index: -1;
  }
  .testHead-brand{
    z-index: 9999;
  }
</style>
