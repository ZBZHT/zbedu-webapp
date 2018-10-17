<template>
  <div class="testHead-title">
    <router-link :to="{path:'/'}">
      <img class="testHead-brand" alt="Brand" src="../../assets/imgs/zbtLogo.png">
    </router-link>
    <img class="testHead-headerbg" src="../../assets/imgs/header.png">
    <p class="mainTitle">{{mainTitle}}</p>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        mainTitle:'考试中心'
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
    background: linear-gradient(rgb(210,210,210), #fff);
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
    top:0;
    height:94px;
    width: 80%;
    z-index: 999;
  }
  .testHead-brand{
    position: absolute;
    left: 15px;
    top: 15px;
    height: 65%;
    z-index: 9999;
  }
  .testHead-title .mainTitle{
    position: absolute;
    left: 373px;
    top: 38px;
    font-size: 28px;
  }
</style>
