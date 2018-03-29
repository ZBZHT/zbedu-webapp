<template>
  <div class="myData_cont">

    <!--我的资料-->
      <el-col :span="16">
        <el-card>
          <!--<img src="" class="image">-->
          <el-col :span="6">
          <img src="https://account.xiaomi.com/static/img/passport/photo.jpg" alt="头像">
          </el-col>
          <el-col :span="5" class="nameMsg">
            <span class="nameMsgName">{{username}}</span><br>
            <span class="nameMsgHao">下午好 ~</span><br>
            <el-button class="nameMsgBut" type="text" size="small"
                       @click="dialogFormVisible = true">修改个人信息 ></el-button>
          </el-col>

          <el-col :span="6" class="nameMsg_2 nameMsg">
            <span>账户类型 : </span><span style="color: #ff6700;">{{userT}}</span>
            <br>
            <span class="nameMsg_3">绑定手机 :</span><br>
            <span class="">下午好</span><br>
          </el-col>

        </el-card>
      </el-col>

    <!--修改个人信息弹窗-->
    <el-dialog title="修改个人信息"
               :visible.sync="dialogFormVisible"
               :before-close="handleClose"
               :close-on-click-modal="false">
      <el-form :model="addUserForm" ref="addUserForm" label-width="80px" class="demo-addUserForm">

        <el-form :inline="true" :model="addUserForm" ref="addUserForm">
          <el-form-item label="手机号" prop="MoNo">
            <el-input v-model="addUserForm.MoNo" placeholder="手机号码位11位"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="n_name">
            <el-input v-model="addUserForm.n_name" placeholder="昵称为2-12个字符"></el-input>
          </el-form-item>
        </el-form>

      </el-form>

      <div slot="footer" class="dialog-footer" style="width: 93%">
        <el-button type="primary" @click="reUser('addUserForm')">确定修改</el-button>
      </div>
    </el-dialog>

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
        userT: core.userType(this.$store.state.userType),
        dialogFormVisible: false,
        addUserForm : [],
      }
    },
    computed: {},
    methods: {
      handleClose(done) {  //对话框关闭确认
        this.$confirm('已输入的信息未保存! 确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      //修改用户信息
      reUser() {
        this.dialogFormVisible1 = false;
        /*console.log(this.addUserForm1);
        //处理发送的用户信息方法
        function resUserData1(data) {
          if (data.pwd != '') {
            data.pwd = md5(data.pwd);
          }
          return data;
        }

        let resData = resUserData1(this.addUserForm);*/
        axios.post('http://' + this.url + ':8000/teacherCMS/updateUser', {
          data: {
            username: this.username,
            userType: this.userType,
            addUser: resData
          }
        }).then((res) => {
          if (res.data.userInfo) {
            console.log(res.data.userInfo);
            /*this.dataManager = res.data.userInfo;
            this.total = this.dataManager.length;*/
            this.addUserSuccess();
            this.resetUser();
          }
        });
      },

    },
    mounted() {

      axios.post('http://' + this.url + ':8000/teacherCMS/myDataMst', {
        data: {
          username: this.username,
          userType: this.userType,
        }
      }).then((res) => {
        if (res.data.userInfo) {
          console.log(res.data.userInfo);
          /*this.dataManager = res.data.userInfo;
          this.total = this.dataManager.length;*/
        }
      });
    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .myData_cont .el-dialog {
    border-radius: 16px;
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
  .myData_cont .el-col-5 {
    margin-left: 3%;
    margin-right: 3%;
  }
  .myData_cont .el-col-6 {
    margin-left: 3%;
    margin-right: 3%;
  }
  .myData_cont img {
    display: block;
    float: right;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 180px;
    padding: 6px;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
  }
  .myData_cont .el-card, .el-message {
    border-radius: 10px;
  }

</style>
