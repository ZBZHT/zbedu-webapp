<template>
<div class="question">
    <div class="leftBox">
        <router-link :to="fromPath" class="testItem">在线考试</router-link>
        <router-link to="/test/testAnalysis" class="testItem">考试分析</router-link>
    </div>
    <div class="rightBox">
        <router-view></router-view>
    </div>
</div>
</template>

<script>
import axios from 'axios'
 
export default {
  name: 'test',
  data () {
    return {
        fromPath:''
    }
  },
    watch: {
    '$route' (to, from) {
        // console.log(to);
        // console.log(from.path);
         this.fromPath = from.path;
     }
    },
  methods:{
      
  }
}
</script>

<style>
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a{
    color: inherit;
    cursor: pointer;
    text-decoration:none;
}
a:hover{
    text-decoration: none;
}
.question{
    min-width:1200px;
    min-width:800px;
    width:1200px;
    height:800px;
    margin:0 auto;
    border:1px solid #000;
    display:flex;
}
.leftBox{
    width:150px;
    height:100%;
    border:1px solid #000;
}
.rightBox{
    width:1050px;
    height:100%;
}
.testItem{

}
</style>