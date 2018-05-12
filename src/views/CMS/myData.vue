<template>
  <div class="myData_cont">

    <!--我的资料-->
      <el-col :span="16">
        <el-card>
          <el-col :span="6">
            <div class="img">
              <img :src=" imgSrc" alt="头像" @click="dialogFormVisible2 = true">
              <el-button class="head-portrait" type="info" @click="dialogFormVisible2 = true">编辑头像</el-button>
            </div>
          </el-col>
          <el-col :span="5" class="nameMsg">
            <span class="nameMsgName">{{username}}</span><br>
            <span class="nameMsgHao">下午好 ~</span><br>
            <el-button class="nameMsgBut" type="text" size="medium"
                       @click="dialogFormVisible = true">修改密码</el-button>
          </el-col>

          <el-col :span="6" class="nameMsg_2 nameMsg">
            <span>账户类型 : </span><span style="color: #ff6700;">{{userT}}</span>
            <br>
            <span class="nameMsg_3">绑定手机 :</span>{{userMoNo}}
            <el-button class="nameMsgBut" type="text"
                       @click="dialogFormVisible1 = true">修改</el-button>
            <br>
            <span class="nameMsg_4">绑定邮箱 :</span><br>
          </el-col>

        </el-card>
      </el-col>

    <!--修改密码弹窗-->
    <el-dialog title="修改密码"
               :visible.sync="dialogFormVisible"
               width="30%"
               :before-close="handleClose"
               :close-on-click-modal="false">
      <el-form :model="passForm" status-icon :rules="rules" ref="passForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPass">
          <el-input type="password" v-model="passForm.oldPass" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input type="password" v-model="passForm.pass" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="passForm.checkPass" auto-complete="off" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('passForm')">重置</el-button>
        <el-button type="primary" @click="updatePass('passForm')">确定修改</el-button>
      </div>
    </el-dialog>

    <!--修改手机弹窗-->
    <el-dialog title="修改手机"
               :visible.sync="dialogFormVisible1"
               width="30%"
               :before-close="handleClose"
               :close-on-click-modal="false">
      <el-form :model="moNoForm" status-icon :rules="rules" ref="moNoForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧手机号" prop="oldMoNo">
          <el-input v-model="moNoForm.oldMoNo" ></el-input>
        </el-form-item>
        <el-form-item label="新手机号" prop="newMoNo">
          <el-input v-model="moNoForm.newMoNo" ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('moNoForm')">重置</el-button>
        <el-button type="primary" @click="updateMoNo('moNoForm')">确定修改</el-button>
      </div>
    </el-dialog>

    <!--修改头像-->
    <el-dialog title="点击上传头像"
               :visible.sync="dialogFormVisible2"
               width="30%"
               :limit="1"
               :file-list="fileList"
               :before-close="handleClose"
               :before-upload="beforeAvatarUpload"
               :close-on-click-modal="false">
      <el-upload
        action="/teacherCMS/uploadAvatar"
        list-type="picture-card"
        ref="upload"
        :on-preview="handlePictureCardPreview"
        accept=".jpg, .jpeg, .png, .bmp"
        :auto-upload="false"
        :on-remove="handleRemove">

        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
      <span>只能上传jpg/jpeg/png/bmp文件，且不超过 2MB</span>

      <div slot="footer" class="dialog-footer">
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传头像</el-button>
      </div>

    </el-dialog>

  </div>
</template>

<script>
  import axios from 'axios'
  import md5 from 'js-md5'
  import core from '../../assets/js/core.js'

  export default {
    name: 'myData',
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (md5(this.passForm.oldPass) !== this.resUserMsg.pwd) {
            callback(new Error('旧密码输入错误,请重输!'));
          }
          callback();
        }
      };
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (value !== this.passForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      let validateMoNo1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧手机号'));
        } else {
          if (value !== this.resUserMsg.MoNo) {
            callback(new Error('旧手机号输入错误,请重输!'));
          }
          callback();
        }
      };
      return {
        userID:this.$store.state.userID,
        username:this.$store.state.username,
        userType:this.$store.state.userType,
        userT: core.userType(this.$store.state.userType),
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        addUserForm : [],
        resUserMsg: '',
        userMoNo: '',
        moNoForm: {oldMoNo:'', newMoNo:''},
        passForm: {
          oldPass: '',
          pass: '',
          checkPass: '',
        },
        dialogImageUrl: '',
        dialogVisible: false,
        fileList: [{name:'', url:''}],
        imgSrc: '',
        rules: {
          oldPass: [
            { validator: validatePass, trigger: 'blur' },
            { min: 3, max: 12, message: '长度在 3 到 12 位', trigger: 'blur' }
          ],
          pass: [
            { min: 3, max: 12, message: '长度在 3 到 12 位', trigger: 'blur' }
          ],
          oldMoNo: [
            { required: true, validator: validateMoNo1, trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11 位', trigger: 'blur' }
          ],
          newMoNo: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
            { min: 11, max: 11, message: '长度在 11 位', trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    },
    computed: {},
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
        this.getMyMsg();
        this.dialogFormVisible2 = false;
        this.successMsg('头像上传成功');
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        console.log(file);
      },
      beforeAvatarUpload(file) {
          console.log(this.fileList);
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isLt2M;
      },
      // 添加用户成功后提示信息
      successMsg(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      handleClose(done) {
        done();
        /*this.$confirm('已输入的信息未保存! 确认关闭？')
          .then(_ => {

          })
          .catch(_ => {
          });*/
      },
      //修改密码
      updatePass(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.passForm.oldPass = md5(this.passForm.oldPass);
            this.passForm.pass = md5(this.passForm.pass);
            this.passForm.checkPass = md5(this.passForm.checkPass);
            axios.post('/teacherCMS/updatePass', {
              data: {
                userID: this.userID,
                userType: this.userType,
                form: this.passForm
              }
            }).then((res) => {
              if (res.data.code === 0) {
                this.logOut();
                this.passForm.oldPass = '';
                this.passForm.pass = '';
                this.passForm.checkPass = '';
                this.dialogFormVisible = false;
                this.successMsg('修改密码成功,请重新登录!');
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //修改手机号码
      updateMoNo(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            axios.post('/teacherCMS/updateMoNo', {
              data: {
                userID: this.userID,
                userType: this.userType,
                form: this.moNoForm
              }
            }).then((res) => {
              if (res.data.code === 0) {
                this.getMyMsg();
                this.moNoForm.oldMoNo = '';
                this.moNoForm.newMoNo = '';
                this.dialogFormVisible1 = false;
                this.successMsg('手机号码成功!');
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //注销
      logOut(){
        axios({
          method: 'post',
          url: '/api/user/logout',
          withCredentials: true
        }).then((res)=>{
          if(res.data.code == 3){
            this.username = '';
            this.password = '';
            this.nickName = '';
          }
          this.$store.commit('username','');
          this.$store.commit('userType','');
          this.$router.push('/');
        });
      },
      getMyMsg() {
        axios.post('/teacherCMS/getMyMsg', {
          data: {
            userID: this.userID,
            username: this.username,
            userType: this.userType,
          }
        }).then((res) => {
          if (res.data.userInfo) {
            this.resUserMsg = res.data.userInfo;
            this.imgSrc = "/competition/myAvatar/" + this.resUserMsg.avatar;
            console.log(this.imgSrc);
            let ee = this.resUserMsg.MoNo;
            this.userMoNo = (ee.substring(0,3)) + "****" + (ee.substring(7,11));
          }
        });
      }
    },
    mounted() {
      this.getMyMsg();
    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body{
    min-width: 1200px;
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
  .myData_cont .img {
    display: block;
    float: right;
    width: 180px;
    height: 180px;
    position: relative;
  }
  .myData_cont .img img{
    display: block;
    float: right;
    margin-top: 40px;
    margin-bottom: 40px;
    width: 180px;
    height: 180px;
    padding: 6px;
    border: 1px solid #e0e0e0;
    border-radius: 50%;
  }
  .myData_cont .el-card, .el-message {
    border-radius: 10px;
  }
  .myData_cont .el-dialog__body {
    padding-right: 40px;
  }
  .myData_cont .head-portrait {
    margin-left: 8px;
    padding: 10px 40px;
    font-size: 20px;
    position: absolute;
    top: 7rem;
  }
  .myData_cont {
    position: relative;
  }
  .myData_cont {
  }

</style>
