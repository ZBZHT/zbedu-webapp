<template>
    <div class="question">
    
    </div>
</template>

<script>
import axios from 'axios'
import swipe from '@/components/testCenter/swipe'


export default {
  name: 'textQuestion',
  data () {
    return {
        
    }
  },
  mounted(){
      axios.get("/api/menu/index",{
                params:{
                     user:123
                }
            }).then((res)=>{
                this.textCenterData = res.data;
                console.log(this.textCenterData);

            }).catch(function(error){
                console.log("error init." + error)
            });
    },
  components:{swipe}
}
</script>

<style>
.question{
    min-width:960px;
}
</style>
