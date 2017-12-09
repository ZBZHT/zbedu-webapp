<template>
  <div class="header-box">
    <a href="#" class="logo">
      <img class="logoimage" alt="Brand" src="../assets/imgs/zb_logo.png">
    </a>
    <div class="nav-list" >
      <ul>
        <li v-for="navTitle in menuData" v-on:mouseenter="enter">
          <div class="list-box">
            <a>{{ navTitle.nanvName }}</a>
          </div>
          <div class="drop-box" :class="{dispear : !dispear}"></div>
        </li>
      </ul>
    </div>
    <form  class="search-box" action="">
      <div class="form-box">
        <input type="text" placeholder="Search">
        <span class="searchicon"></span>
      </div>
    </form>
    <ul class="nav-right">
      <li><a href="" class="login">{{loginMsg }}</a></li>
      <li><p>/</p></li>
      <li><a href="" class="enrol">{{ enrolMsg }}</a></li>
    </ul>
    <button class="drawer-box"></button>
  </div>
</template>

<script>
//  import navData from '../HeaderData'
  import axios from 'axios'
  export default {
    name: 'Header',
    data () {
      return {
        loginMsg: '登录',
        enrolMsg: '注册' ,
//        navTitleData: navData,
        menuData: null
      }
    },
    methods: {
      enter: function () {
        this.dispear = true
        return this.dispear
      }
    },
    mounted: function () {
      axios.get("http://192.168.2.57:3000/menu/header",{
        params:{
          userid: "123"
        }
      }).then((res)=>{
        console.log(res);
        let localData = res.data;
        if(localData.status === 0) {
          this.menuData = res.data.result;
        }else {
        }
      }).catch(function (error) {
        console.log("error init" + error)
      })
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @media screen and (min-width: 1183px) {
    .header-box {
      width: auto;
      min-width: 960px;
      height: 100px;
      background-color: #F8F8F8;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 0px 3px 10px #333;
      margin-top: 0;
    }
    .logoimage {
      vertical-align: middle;
      width: 251.42px;
      height: 59px;
      float: left;
    }
    .nav-list {
      height: 70px;
      /*background-color: antiquewhite;*/
      float: left;
      margin-left: 20px;
      margin-top: 10px;
      display: block;
    }
    .nav-list ul {
      overflow: hidden;
    }
    .nav-list ul li {
      float: left;
    }
    .nav-list ul li .list-box {
      width: 100px;
      height: 70px;
      text-align: center;
      line-height: 70px;
      font-size: 22px;
      font-weight: bold;
      /*background-color: cadetblue;*/
    }
    .nav-list ul li .drop-box{
      width: 100px;
      height: 100px;
      background-color: greenyellow;
    }
    .nav-list ul .dispear{
      display: block;
    }


    .list-box a:hover {
      color: red;
    }
    .search-box {
      width: 202px;
      height: 44px;
      float: left;
      margin-top: 20px;
      text-align: center;
      display: block;
    }
    .form-box {
      width: 172px;
      height: 44px;
      line-height: 44px;
      margin: 0 15px;
      position: absolute;
      overflow: hidden;
    }
    .form-box input {
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      box-sizing: border-box;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .form-box .searchicon {
      position: relative;
      float: right;
      right: 10px;
      bottom: 28px;
      display: inline-block;
      width: 16px;
      height: 16px;
      color: #ccc;
      background: url("../assets/imgs/search.png") no-repeat;
    }
    .nav-right {
      float: right;
      width: 150px;
      height: 61px;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      line-height: 71px;
      overflow: hidden;
      padding: 10px;
      display: block;
      color: #777;
    }
    .nav-right li {
      float: left;
      width: 70px;
      height: 61px;
      color: #777;
    }
    .nav-right li a{
      color: #777;
    }
    .nav-right li a:hover{
      color: red;
    }
    .nav-right li:nth-child(2) {
      width: 10px;
      height: 61px;
    }
    .drawer-box{
      display: none;
    }
    h1, h2 {
      font-weight: normal;
    }
  }
  @media (min-width: 581px) and (max-width: 1184px){
    .header-box{
      width: 100%;
      height: 171px;
      background-color: #F8F8F8;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 0px 3px 10px #333;
      margin-top: 0;
    }
    .logoimage {
      vertical-align: middle;
      width: 251.42px;
      height: 59px;
      float: left;
    }
    .nav-list {
      height: 70px;
      position: absolute;
      float: left;
      left: 80px;
      top: 100px;
      display: block;
    }
    .nav-list ul {
      overflow: hidden;
    }
    .nav-list ul li {
      float: left;
    }
    .nav-list ul li .list-box {
      width: 100px;
      height: 70px;
      text-align: center;
      line-height: 70px;
      font-size: 22px;
      font-weight: bold;
      /*background-color: cadetblue;*/
    }
    .search-box {
      position: relative;
      top: 90px;
      left: 570px;
      width: 202px;
      height: 44px;
      text-align: center;
      display: block;
    }
    .form-box {
      width: 172px;
      height: 44px;
      line-height: 44px;
      margin: 0 15px;
      position: absolute;
      overflow: hidden;
    }

    .form-box input {
      width: 100%;
      height: 34px;
      padding: 6px 12px;
      box-sizing: border-box;
      background-color: #fff;
      border: 1px solid #ccc;
      border-radius: 4px;
    }

    .form-box .searchicon {
      position: relative;
      float: right;
      right: 10px;
      bottom: 28px;
      display: inline-block;
      width: 16px;
      height: 16px;
      color: #ccc;
      background: url("../assets/imgs/search.png") no-repeat;
    }
    .nav-right {
      display: none;
    }
    .drawer-box{
      display: none;
    }
  }
  @media screen and (max-width: 580px){
    .list-box{
      display: none;
    }
    .header-box{
      width: 100%;
      height: 100px;
      background-color: #F8F8F8;
      padding: 20px;
      box-sizing: border-box;
      box-shadow: 0px 3px 10px #333;
      margin-top: 0;
    }
    .logoimage {
      vertical-align: middle;
      width: 251.42px;
      height: 59px;
      float: left;
    }
    .search-box{
      display: none;
    }
    .nav-right {
      display: none;
    }
    .drawer-box{
      width: 45px;
      height: 35px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background-color: #F8F8F8;
      background: url("../assets/imgs/drawer.png") no-repeat center;
      position: absolute;
      right: 30px;
      top:30px;
      display: block;
    }
    button{
      outline: none;
    }
    button:hover{
      background-color: #ddd;
    }
  }

</style>
