<template>
  <div class="drop-box">
    <ul>
      <h6>{{ menuId }}</h6>
      <li v-for="item in menuData.result[menuId].lev1Data">
        {{item.title}}
        <!--<div class="item-box" v-for="childTitles in item.children">-->
          <!--<a >{{ childTitles.childrenTitle }}</a>-->
        <!--</div>-->
      </li>
    </ul>
  </div>
</template>

<script>
  import headerData from '../HeaderData.js'
  console.log('headerData')
  console.log(headerData)
  // var headerData = require('../HeaderData')
  export default {
    name: 'list',
    props: ['message', 'menuId'],
    data () {
      return {
        menuData: headerData
      }
    },
    methods: {
      aaa: function () {
        alert(111)
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>
  a:hover{
    background: lightgray;
    color: #000;
  }
  .drop-box{
    width: 150px;
    background-color: #F8F8F8;
    border: 1px solid #666;
    border-radius: 10px;
  }
  .drop-box li{
    line-height: 40px;
    font-size: 10px;
    font-weight: bold;
    /*border-bottom: 1px solid #666;*/
  }
  .drop-box li:nth-child(1){

  }
  .drop-box li:last-child{

  }
  .drop-box .item-box{
    width: 130px;
    height: 40px;
    background: lightcyan;
    text-align: left;
    padding-left: 15px;
    background: url("../assets/imgs/right.png") no-repeat 120px 8px;
  }

</style>
