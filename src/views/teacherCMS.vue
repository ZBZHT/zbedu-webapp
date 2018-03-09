<template>
  <div id="app" class="container">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>

    <div class="footer">
        <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navgationHead from '@/components/common/navgationHead'
import footFooter from '@/components/common/footFooter'

export default {
  name: 'sourceCenter',
  data () {
    return {
      msgArr:[],
    }
  },
  computed:{

      },
  methods: {
    components: {
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted(){
    // alert(222)
    axios.post("http://192.168.2.251:8000/FileUpDown/loadFile",{
      params:{
        user:6666
      }
    }).then((res)=>{
        // console.log(res.data.var)
      }
    )
    },
  components:{navgationHead,footFooter}
}
</script>

<style scoped>
*{
    margin:0;
    padding:0;
}

</style>
