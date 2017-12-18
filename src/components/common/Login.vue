<template>
  <ul class="user">
    <li>
      <a href="#" class="login">登录
          <div class="login-box" v-show="true">
            <div class="user-box">
              <p>用户名:</p>
              <input type="text">
            </div>
            <div class="password-box">
              <p>密码:</p>
              <input type="text">
            </div>
            <button @click="login">确定</button>
          </div>
      </a>
    </li>
  </ul>


</template>

<script>
  export default {
    name: 'login',
    methods: {
      login: function () {
        this.$router.push('/user')
      }
    }
  }
</script>

<style scoped>
.login-box{
  width: 320px;
  height: 180px;
  margin-top: 15px;
  right: 0px;
  position: absolute;
  background: #F8F8F8;
  padding: 10px;
  box-shadow: 0px 0px 10px #666;
  display: none;
  z-index: 99;
}
  .login-box div{
    height: 50px;
    margin: 10px 10px;
    background: #eee;
    position: relative;
  }
  .login-box div p{
    position: absolute;
    left: 10px;
    width: 70px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    font-weight: bold;
    text-align: right;
    color: #555;
    /*background: deeppink;*/
  }
  .login-box div input{
    position: absolute;
    left: 90px;
    top: 8px;
    height: 30px;
    width: 200px;
  }
  .login-box button{
    width: 70px;
    height: 40px;
    margin-top: 5px;
    background: #CD3936;
    outline: none;
    color: white;
    font-size: 20px;
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
  /*background: pink;*/
  display: inline-block;
  height: 50px;
  width: 100px;
  /*text-align: right;*/
}
.user a:hover .login-box{
  display: block;
}
.user a:hover{
  color:#f00;
}
.user p{
  margin-top:6px;
}
</style>
