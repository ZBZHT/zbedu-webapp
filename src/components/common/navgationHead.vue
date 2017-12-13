<template>
    

</template>

<script>
      import axios from 'axios'
export default {
  name: 'main',
  props:['bannerLeftData'],
  data () {
    return {
      msg: 'main'
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

</style>
