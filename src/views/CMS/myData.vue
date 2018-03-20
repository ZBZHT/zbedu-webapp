<template>
  <div class="myData_cont">

    <!--我的资料-->
      <el-col :span="16">
        <el-card>
          <!--<img src="" class="image">-->
          <el-col :span="8">
          <img src="https://account.xiaomi.com/static/img/passport/photo.jpg" alt="头像">
          </el-col>
          <el-col :span="4" style="text-align: left">
            <span>{{username}}</span>
            <el-button type="text" size="small">修改个人信息 ></el-button>
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
  .myData_cont img {
    margin-top: 30px;
    margin-bottom: 30px;
    width: 200px;
    height: 200px;
    border: 1px;
    border-radius: 50%;
  }
  .myData_cont .el-card, .el-message {
    border-radius: 10px;
  }

</style>
