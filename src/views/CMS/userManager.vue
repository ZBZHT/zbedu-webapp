<template>
  <div class="userManager_cont">

    <!--用户管理-->
    <el-col :span="19" class="el-Col">
        <span>
          <el-button size="small" @click="delChecked">删除选中用户</el-button>
        </span>
        <span>
          <el-button size="small" @click="dialogFormVisible = true">添加单个用户</el-button>
        </span>
        <!--addUser-->
        <span>
          <el-upload
            class="upload-demo"
            action="'http://' + this.url + ':8000/teacherCMS/addExcelUsers'"
            :onError="uploadError"
            :beforeUpload="beforeAvatarUpload"
            :onSuccess="uploadSuccess"
            :show-file-list=false
            :on-exceed="handleExceed">
          <el-button size="small">Excel导入用户</el-button>
        </el-upload>
        </span>

      <!--添加用户对话框-->
      <el-dialog title="添加用户"
                 :visible.sync="dialogFormVisible"
                 :before-close="handleClose"
                 :close-on-click-modal="false">
        <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-width="80px" class="demo-addUserForm">

          <el-form :inline="true" :model="addUserForm" :rules="rules" ref="addUserForm">
          <el-form-item label="姓名" prop="name" >
            <el-input v-model="addUserForm.name" placeholder="姓名为2-4个汉字"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="n_name">
            <el-input v-model="addUserForm.n_name" placeholder="昵称为2-12个字符"></el-input>
          </el-form-item>
          </el-form>

          <el-form-item label="性别" prop="gender" style="width: 48%">
            <el-radio-group v-model="addUserForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form :inline="true" :model="addUserForm" :rules="rules" ref="addUserForm">
          <el-form-item label="学号" prop="userID">
            <el-input v-model="addUserForm.userID" placeholder="学号为8位数字"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="MoNo">
            <el-input v-model="addUserForm.MoNo" placeholder="手机号码位11位"></el-input>
          </el-form-item>
          </el-form>

          <el-form-item label="身份证号" prop="IDNo" style="width: 92%">
            <el-input v-model="addUserForm.IDNo" placeholder="身份证号码为15位或者18位"></el-input>
          </el-form-item>

          <el-form-item label="用户类别" prop="userType" style="width: 92%">
            <el-radio-group v-model="addUserForm.userType">
              <el-radio label="管理员"></el-radio>
              <el-radio label="教务管理员"></el-radio>
              <el-radio label="教师"></el-radio>
              <el-radio label="学生"></el-radio>
              <el-radio label="外来学生"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form :inline="true" :model="addUserForm" :rules="rules" ref="addUserForm" style="width: 98%">
            <el-form-item label="专业" prop="major">
              <el-select v-model="addUserForm.major" placeholder="请选择专业">
                <el-option label="汽车专业" value="汽车专业"></el-option>
                <el-option label="机电专业" value="机电专业"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班级" prop="classGrade" >
              <el-input v-model="addUserForm.classGrade" placeholder="请输入班级"></el-input>
            </el-form-item>
          </el-form>

          <el-form :inline="true" :model="addUserForm" :rules="rules" ref="addUserForm">
            <el-form-item prop="AdmDate" label="入学时间">
              <el-date-picker type="date" placeholder="选择日期" v-model="addUserForm.AdmDate"></el-date-picker>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="addUserForm.pwd" placeholder="默认密码为身份证后6位"></el-input>
            </el-form-item>
          </el-form>
        </el-form>

        <div slot="footer" class="dialog-footer" style="width: 93%">
          <el-button @click="resetUser">重&emsp;置</el-button>
            <el-button type="primary" @click="addUser('addUserForm')">立即创建</el-button>
        </div>
      </el-dialog>

      <!--列表-->
      <el-table :data="dataManager.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                @selection-change="changeFun"
                stripe style="width: 98%;">

        <el-table-column type="selection" width="40"></el-table-column>

        <el-table-column prop="user" label="用户名" width="100">
        </el-table-column>

        <el-table-column prop="userID" label="用户ID" width="130">
        </el-table-column>

        <el-table-column prop="IDNo" label="身份证号" width="200">
        </el-table-column>

        <el-table-column prop="MoNo" label="手机号" width="136">
        </el-table-column>

        <el-table-column prop="userType" label="用户类型" width="90">
        </el-table-column>

        <el-table-column prop="gender" label="性别" width="70">
        </el-table-column>

        <el-table-column prop="AdmDate" label="入学时间" width="130">
        </el-table-column>

        <el-table-column prop="major" label="专业" width="100">
        </el-table-column>

        <el-table-column prop="classGrade" label="班级" width="60">
        </el-table-column>

        <el-table-column label="操作" style="width: 100px">
          <template slot-scope="scope">
            <el-button type="text" size="small"
              @click="handleEdit(scope.$index, scope.row)">修 改
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--分页显示-->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total=parseInt(total)>
        </el-pagination>
      </div>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../server/utils/core.js'

  export default {
    name: 'userManager',
    data() {
      return {
        dataManager: [{
          n_name: '',
          name: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          AdmDate: '',
          major: '',
          classGrade: ''
        }],
        total: '',
        pagesize: 12,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        url: document.domain,
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        currentPage: 1,
        dialogVisible: false,
        multipleSelection: [],
        dialogFormVisible: false,
        addUserForm: {
          n_name: '',
          name: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          AdmDate: '',
          major: '',
          classGrade: ''
        },
        rules: {
          n_name: [
            { min: 1, max: 8, message: '长度在 1 到 8 个字', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2 到 4 个汉字', trigger: 'blur' }
          ],
          pwd: [
            { min: 6, max: 12, message: '长度在 6 到 12 位', trigger: 'blur' }
          ],
          userID: [
            { required: true, message: '请输入学号', trigger: 'change' },
            { min: 8, max: 8, message: '长度在 8 个字符', trigger: 'blur' }
          ],
          IDNo: [
            { required: true, message: '请输入身份证号', trigger: 'change' },
            { min: 15, max: 18, message: '长度在 15 到 18 位', trigger: 'blur' }
          ],
          MoNo: [
            { required: true, message: '请输入手机号', trigger: 'change' },
            { min: 11, max: 11, message: '长度在 11 位', trigger: 'blur' }
          ],
          userType: [
            { required: true, message: '请选择一个类型', trigger: 'change' }
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change'}
          ],
          AdmDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          major: [
            { required: true, message: '请输入专业', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12 位', trigger: 'blur' }
          ],
          classGrade: [
            { required: true, message: '请输入班级', trigger: 'blur' },
            { min: 2, max: 12, message: '长度在 2 到 12 位', trigger: 'blur' }
          ],
        },

      }
    },
    computed: {},
    methods: {
      //删除用户信息方法
      delChecked() {
        this.$confirm('此操作将永久删除用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post('http://' + this.url + ':8000/teacherCMS/delChecked', {
            data: {
              username: this.username,
              userType: this.userType,
              msg: this.multipleSelection
            }
          }).then((res) => {
            if (res.data.success == 0) {
              //删除单个
              if (this.multipleSelection.length == 1) {
                for (let j=0; j<this.dataManager.length; j++){
                  if (this.multipleSelection[0].userID == this.dataManager[j].userID) {
                    let ee = core.remove(this.dataManager, this.dataManager[j]);
                    this.dataManager = ee;
                    //console.log(this.dataManager);
                  }
                }
              }else {
                //删除多个
                for (let i=0; i<this.multipleSelection.length; i++) {
                  for (let j=0; j<this.dataManager.length; j++){
                    if (this.multipleSelection[i].userID == this.dataManager[j].userID) {
                      let ee = core.remove(this.dataManager, this.dataManager[j]);
                      this.dataManager = ee;
                    }
                  }
                  //console.log(this.dataManager);
                }
              }
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }else {
              console.log('返回错误')
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //添加单个用户
      addUser() {
        this.dialogFormVisible = false;

        //处理发送的用户信息方法
        function resUserData(data) {
          if (data.pwd == '') {
            data.pwd = data.IDNo.substring(data.IDNo.length-6);
          }
          data.gender = data.gender=='男'?'1':'2';
          data.AdmDate = core.formatDate("yyyy-MM-dd", data.AdmDate);
          if (data.userType == '管理员') {
            data.userType = 'admin';
          } else if (data.userType == '教务管理员') {
            data.userType = 'E';
          }else if (data.userType == '教师') {
            data.userType = 'T';
          }else if (data.userType == '学生') {
            data.userType = 'S';
          }else if (data.userType == '外来学生') {
            data.userType = 'O';
          }
          return data;
        }

        let resData = resUserData(this.addUserForm);
          console.log(this.addUserForm);
          axios.post('http://' + this.url + ':8000/teacherCMS/addUser', {
            data: {
              userType: this.userType,
              addUser: resData
            }
          }).then((res) => {
            if (res.data.userInfo.length > 0) {
              this.dataManager = res.data.userInfo;
              this.total = this.dataManager.length
            }
          });
      },

      //重置添加添加用户
      resetUser() {
        console.log(this.addUserForm);
          this.addUserForm.n_name = '';
          this.addUserForm.name = '';
          this.addUserForm.pwd = '';
          this.addUserForm.userID = '';
          this.addUserForm.IDNo = '';
          this.addUserForm.MoNo = '';
          this.addUserForm.userType = '';
          this.addUserForm.gender = '';
          this.addUserForm.AdmDate = '';
          this.addUserForm.major = '';
          this.addUserForm.classGrade = '';
        console.log(this.addUserForm)
      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      // 上传成功后的回调
      uploadSuccess (res, file) {

      },
      // 上传错误
      uploadError (res, file, fileList) {
        console.log('上传失败，请重试！')
      },
      handleExceed(files, fileList) {
        this.$message.warning(`每次只能上传 1 个文件`);
      },

      // 上传前判断是不是Excel文件
      beforeAvatarUpload(file) {
        let index = file.name.split(".");
        let isxls = index[index.length-1];
        if (isxls == 'xlsx' || isxls == 'xls') {
          return true;
        } else {
          this.$message.error('只能导入是 xls 或者 xlsx格式!');
        }
      },
      //导入Excel用户
      addExcelUser(){
      },
      //编辑
      handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible = true;
      },

      handleClose(done) {  //对话框关闭确认
        this.$confirm('已输入的信息未保存! 确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      changeFun(val) { //复选框状态改变
        this.multipleSelection = val;
        console.log(this.multipleSelection);
      },

    },
    mounted() {
      axios.post('http://' + this.url + ':8000/teacherCMS/userManager', {
        data: {
          username: this.username,
          userType: this.userType
        }
      }).then((res) => {
        let resUserInfo = res.data.userInfo;
        if (resUserInfo.length > 0) {
          for (let i = 0; i < resUserInfo.length; i++) {
            resUserInfo[i].AdmDate = core.formatDate("yyyy-MM-dd", new Date(resUserInfo[i].AdmDate));
          }
          this.dataManager = resUserInfo;
          this.total = this.dataManager.length;
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
  .userManager_cont .el-col-19 {
  }

  .userManager_cont .el-tree-node__expand-icon {
    font-size: 16px;
  }

  .userManager_cont .el-tree-node__label {
    font-size: 16px;
  }

  .userManager_cont .el-tree {
    background-color: #dcdfe6;
  }
  .userManager_cont .el-table {
    margin-top: 6px;
  }

  .userManager_cont .el-table .cell {
    text-align: left;
    margin-left: 14px

  }

  .userManager_cont .CMS_cont {
    min-height: 34.3rem;
  }

  .userManager_cont .el-card__body {
    padding: 10rem;
  }

  .userManager_cont .el-table td, .el-table th {
    padding: 2px;
  }

  .userManager_cont .el-table-column--selection .cell {
    padding-left: 0;
  }

  .userManager_cont .block .el-button {
    float: left;
  }
  .userManager_cont .el-dialog{
    width: 40.5%;
  }
  .userManager_cont span{
    display: inline-block;
  }
  .userManager_cont .el-dialog{
    width: 650px;
  }
</style>
