<template>
  <div class="title">
    <router-link :to="{path:'/'}">
      <img class="brand" alt="Brand" src="../../assets/imgs/zbtLogo.png">
    </router-link>
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
  .title{
    width:100%;
    height:94px;
    font-size:16px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    background:url("../../assets/imgs/header.png") no-repeat;
  }

</style>
