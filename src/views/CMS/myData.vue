<template>
  <div class="myData_cont">

    <!--我的资料-->
      <el-col :span="16">
        <el-card>
          <!--<img src="" class="image">-->
          <el-col :span="8">
          <img src="https://account.xiaomi.com/static/img/passport/photo.jpg" alt="头像">
          </el-col>
          <el-col :span="7" class="nameMsg">
            <span class="nameMsgName">{{username}}</span><br>
            <span class="nameMsgHao">下午好 ~</span><br>
            <el-button  class="nameMsgBut" type="text" size="small">修改个人信息 ></el-button>
          </el-col>

          <el-col :span="6" class="nameMsg_2 nameMsg">
            <span class="">账户类型 :</span><br>
            <span class="nameMsg_3">绑定手机 :</span><br>
            <span class="">下午好</span><br>
          </el-col>

        </el-card>
      </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../server/utils/core.js'

  export default {
    name: 'myData',
    data() {
      return {
        username:this.$store.state.username,
      }
    },
    computed: {},
    methods: {
      //删除用户信息方法
    },
    mounted() {
     /* axios.post('http://' + this.url + ':8000/teacherCMS/userManager', {
        data: {
          username: this.username,
          userType: this.userType
        }
      }).then((res) => {
        if (res.data.userInfo.length > 0) {
          this.dataManager = res.data.userInfo;
          this.total = this.dataManager.length
        }
      });*/
    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .myData_cont .el-card__body{
    padding: 0;
  }
  .myData_cont .nameMsg {
    margin-top: 100px;
    text-align: left;
  }
  .myData_cont .nameMsg .nameMsgName {
    font-size: 20px;
    color: #616161;
  }
  .myData_cont .nameMsg .nameMsgBut {
    color: #ff6700;
  }
  .myData_cont .nameMsg .nameMsgHao {
    color: #b0b0b0;
    line-height: 40px;
  }
  .myData_cont .nameMsg_2 {
    font-size: 16px;
    color: #757575;
  }
  .myData_cont .nameMsg_3 {
    line-height: 40px;
  }
  .myData_cont img {
    display: block;
    margin-top: 30px;
    margin-bottom: 30px;
    margin-left: 6rem;
    width: 180px;
    height: 180px;
    padding: 6px;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
  }
  .myData_cont .el-card, .el-message {
    border-radius: 10px;
  }

</style>
