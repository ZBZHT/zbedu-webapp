<template>
<div class="nav">
    <div class="navbar">
        <div class="navbar-header">
            <router-link :to="{path:'index'}">
                <img class="brand" alt="Brand" src="../../assets/imgs/zb_logo.png">
            </router-link>
        </div>
        <div class="collapse">
            <div class="list">
                   <nav-ul :bannerLeftData = "bannerLeftData"></nav-ul>
            </div>

            <form>
                    <input type="text" class="search" placeholder="Search">
            </form>

            <ul class="user">
                <li><a href="#" class="login">登录</a></li>
                <li><p>/</p></li>
                <li><a href="#" class="enrol">注册</a></li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import navUl from '@/components/common/navUl'
export default {
  name: 'main',
  props:['bannerLeftData'],
  data () {
    return {
      msg: 'main'
    }
  },
  mounted(){
      
  },
  components:{navUl}

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
.nav{
    min-width:1200px;
    margin-bottom: 40px;
    position:fix;
}
.navbar{
    width:100%;
    height:100px;
     box-shadow:0 0 10px #000;
    padding:20px;
    box-sizing: border-box;
    display:flex;
    position:relative;
}
.collapse{
    display:flex;
}
.list{
    margin-left:43px;
}
.search{
    width:196px;
    height:32px;
    border-radius:5px;
    margin-top:27px;
    margin-left:20px;
}
.user{
    display:flex;
    position:absolute;
    top:59px;
    right:20px;
}
.user li{
    margin-right:10px;
}
.user a{
    font-size:20px;
    color:inherit;
}
.user a:hover{
    color:#f00;
}
.user p{
    margin-top:6px;
}
</style>
