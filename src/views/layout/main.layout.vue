<template>
  <!--首页-->
  <div class="index-container">
    <div class="nav">
      <navgation-head :showUserInfo="showUserInfo"></navgation-head>
    </div>
    <route-view></route-view>
    <div class="footer">
      <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
  import navgationHead from '@/components/common/navgationHead'
  import footFooter from '@/components/common/footFooter_1'

  export default {
    name: 'mainLayout',
    props: {
      showUserInfo: {
          type: Boolean,
          default: true
      }
    },
    data () {
      return {

      }
    },
    computed:{

    },
    components:{navgationHead,footFooter}
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
    color: #f00;
  }
  a:focus {
    color: #f00;
    text-decoration: none;
  }
  hr{
    margin-top: 2px;
    margin-bottom:2px;
  }
  .index-container{
    min-width:1160px;
    min-height:620px;
  }
  .index-list{
    width:100%;
    position:relative;
    background:url("../assets/imgs/newIndex.png") no-repeat;
    background-size:100% 100%;
  }
  .index-list-topline{
    width:100%;
    height:2%;
    background:rgb(59,59,59);
  }
  .index-list-middleline{
    width:100%;
    height:2%;
    background:rgb(172,172,172);
  }
  .index-list-bottomline{
    width:100%;
    height:2%;
    background:rgb(172,172,172);
  }
  .index-container .study{
    width:110px;
    height:40px;
    border:1px solid #fff;
    position:absolute;
    left:16%;
    bottom:6%;
  }
  @media screen and (min-width:1800px){

    .index-list-main{
      width:100%;
      height:96%;
      display:flex;
      box-sizing: border-box;
    }
    .index-list img{
      width:135%;
      height:100%;
    }
    .index-list .index-list-nav{
      width:22%;
      position:absolute;
      left:1%;
      top:8%;
    }
    .content{
      padding:6%;
    }
  }
  @media screen and (min-width: 1600px) and (max-width: 1799px) {

    .index-list-main{
      width:100%;
      height:96%;
      display:flex;
      box-sizing: border-box;
    }
    .index-list img{
      width:126%;
      height:100%;
    }
    .index-list .index-list-nav{
      width:22%;
      position:absolute;
      left:2%;
      top:9%;
    }
    .content{
      padding:6%;
    }
  }
  @media screen and (min-width: 1480px) and (max-width: 1599px) {

    .index-list-main{
      width:100%;
      height:96%;
      display:flex;
      box-sizing: border-box;
    }
    .index-list img{
      width:109%;
      height:100%;
    }
    .index-list .index-list-nav{
      width:22%;
      position:absolute;
      left:2%;
      top:9%;
    }
    .content{
      padding:6%;
    }
  }
  @media screen and (min-width: 1280px) and (max-width: 1479px) {

    .index-list-main{
      width:100%;
      height:96%;
      display:flex;
      box-sizing: border-box;
    }
    .index-list img{
      width:100%;
      height:100%;
    }
    .index-list .index-list-nav{
      width:22%;
      position:absolute;
      left:2%;
      top:8%;
    }
    .content{
      padding:6%;
    }
  }
  @media screen and (max-width: 1279px) {

    .index-list-main{
      width:100%;
      height:96%;
      display:flex;
      box-sizing: border-box;
    }
    .index-list img{
      width:89%;
      height:100%;
    }
    .index-list .index-list-nav{
      width:22%;
      position:absolute;
      left:2%;
      top:8%;
    }
    .content{
      padding:6%;
    }
  }
</style>
