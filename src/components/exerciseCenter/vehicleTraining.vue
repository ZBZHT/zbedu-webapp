<template>
<div class="vehicleTraining">
  <div class="tabTitle"
       @click="changeTab(index)"
       v-for="(item, index) in systemName">
    {{item}}
  </div>
  <div class="trainingContent">
    <div class="highPressure" v-show="currPage === 0">
      <img src="../../assets/imgs/vehicleTraining1.png">
    </div>
    <div class="airConditioning" v-show="currPage === 1">
222
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'vehicleTraining',
  data () {
    return {
      systemName: ['高压', '空调'],
      currPage: 0
    }
  },
  methods: {
//    切换标签
    changeTab (index) {
      this.currPage = index
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
.vehicleTraining{
  width:60%;
  height:468px;
  margin:0 auto;
  border:1px solid #000;
  margin-top:40px;
  text-align: left;
}
  .vehicleTraining .tabTitle{
    display: inline-block;
    width:5%;

  }
</style>
