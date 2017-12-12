<template>
  <div class="login-box">
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
  background: #F8F8F8;
  margin-top: 100px;
  padding: 10px;
  box-shadow: 0px 0px 10px #666;
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
    top: 5px;
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
    background: #CD3936;
    outline: none;
    color: white;
    font-size: 20px;
  }
</style>
