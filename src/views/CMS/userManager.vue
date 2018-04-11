<template>
  <div class="userManager_cont">

    <!--用户管理-->
    <el-col :span="19" class="el-Col">

      <!--添加用户对话框-->
      <el-dialog title="请填写资料"
                 :visible.sync="dialogFormVisible"
                 :before-close="handleClose"
                 :close-on-click-modal="false">
        <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-width="80px" class="demo-addUserForm">

          <el-form :inline="true" :model="addUserForm" :rules="rules" ref="addUserForm">
          <el-form-item label="姓名" prop="name" >
            <el-input v-model="addUserForm.user" placeholder="姓名为2-4个汉字"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="n_name">
            <el-input v-model="addUserForm.n_name" placeholder="昵称为2-12个字符"></el-input>
          </el-form-item>
          </el-form>

          <el-form-item label="性别" prop="gender" style="width: 48%">
            <el-radio-group v-model="addUserForm.gender">
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="2">女</el-radio>
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
              <el-radio v-model="radio1" label="E">教务管理员</el-radio>
              <el-radio v-model="radio1" label="T">教师</el-radio>
              <el-radio v-model="radio1" label="S">学生</el-radio>
              <el-radio v-model="radio1" label="O">外来学生</el-radio>
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
            <el-button :plain="true" type="primary" @click="addUser('addUserForm')">提&emsp;交</el-button>
        </div>
      </el-dialog>

      <el-tabs v-model="activeName" type="card">

        <el-tab-pane label="学生列表" name="first">

          <!--学生列表-->
          <el-table class="userM_el-table" :data="stuData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    @selection-change="changeFun"
                    stripe style="width: 98%;">

            <el-table-column type="selection" width="40"></el-table-column>

            <el-table-column prop="num" label="序号" width="60">
            </el-table-column>

            <el-table-column prop="user" label="用户名" width="100">
            </el-table-column>

            <el-table-column prop="userID" label="用户ID" width="120">
            </el-table-column>

            <el-table-column prop="IDNo" label="身份证号" width="190">
            </el-table-column>

            <el-table-column prop="MoNo" label="手机号" width="130">
            </el-table-column>

            <el-table-column prop="userType" label="用户类型" width="90">
            </el-table-column>

            <el-table-column prop="gender" label="性别" width="70">
            </el-table-column>

            <el-table-column prop="AdmDate" label="入学时间" width="130">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="100">
            </el-table-column>

            <el-table-column prop="classGrade" label="班级" width="70">
            </el-table-column>

            <el-table-column label="操作" style="width: 100px">
              <template slot-scope="scope">
                <el-button size="small" class="userM_el-tableBut" type="warning"
                           @click="handleEdit(scope.$index, scope.row)">修 改
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--修改用户对话框-->
          <el-dialog title="修改资料"
                     :visible.sync="dialogFormVisible1"
                     :before-close="handleClose"
                     :close-on-click-modal="false">
            <el-form :model="addUserForm1" :rules="rules" ref="addUserForm1" label-width="80px" class="demo-addUserForm">

              <el-form :inline="true" :model="addUserForm1" :rules="rules" ref="addUserForm1">
                <el-form-item label="姓名" prop="name" >
                  <el-input v-model="addUserForm1.user" placeholder="姓名为2-4个汉字"></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="n_name">
                  <el-input v-model="addUserForm1.n_name" placeholder="昵称为2-12个字符"></el-input>
                </el-form-item>
              </el-form>

              <el-form-item label="性别" prop="gender" style="width: 48%">
                <el-radio-group v-model="addUserForm1.gender">
                  <el-radio v-model="radio2" label="1">男</el-radio>
                  <el-radio v-model="radio2" label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form :inline="true" :model="addUserForm1" :rules="rules" ref="addUserForm1">
                <el-form-item label="学号" prop="userID">
                  <el-input v-model="addUserForm1.userID" placeholder="学号为8位数字"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="MoNo">
                  <el-input v-model="addUserForm1.MoNo" placeholder="手机号码位11位"></el-input>
                </el-form-item>
              </el-form>

              <el-form-item label="身份证号" prop="IDNo" style="width: 92%">
                <el-input v-model="addUserForm1.IDNo" placeholder="身份证号码为15位或者18位"></el-input>
              </el-form-item>

              <el-form-item label="用户类别" prop="userType" style="width: 92%">
                <el-radio-group v-model="addUserForm1.userType">
                  <el-radio v-model="radio1" label="E">教务管理员</el-radio>
                  <el-radio v-model="radio1" label="T">教师</el-radio>
                  <el-radio v-model="radio1" label="S">学生</el-radio>
                  <el-radio v-model="radio1" label="O">外来学生</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form :inline="true" :model="addUserForm1" :rules="rules" ref="addUserForm1" style="width: 98%">
                <el-form-item label="专业" prop="major">
                  <el-select v-model="addUserForm1.major" placeholder="请选择专业">
                    <el-option label="汽车专业" value="汽车专业"></el-option>
                    <el-option label="机电专业" value="机电专业"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="班级" prop="classGrade">
                  <el-input v-model="addUserForm1.classGrade" placeholder="请输入班级"></el-input>
                </el-form-item>
              </el-form>

              <el-form :inline="true" :model="addUserForm1" :rules="rules" ref="addUserForm1">
                <el-form-item prop="AdmDate" label="入学时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="addUserForm1.AdmDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="密码" prop="pwd">
                  <el-input v-model="addUserForm1.pwd" placeholder="默认密码为身份证后6位"></el-input>
                </el-form-item>
              </el-form>
            </el-form>

            <div slot="footer" class="dialog-footer" style="width: 93%">
              <el-button type="primary" @click="reUser('addUserForm1')">确定修改</el-button>
            </div>
          </el-dialog>

          <!--分页显示-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total=parseInt(total1)>
            </el-pagination>
          </div>

        </el-tab-pane>
        <el-tab-pane label="教师列表" name="second">

          <!--教师列表-->
          <el-table class="userM_el-table" :data="teachData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                    @selection-change="changeFun"
                    stripe style="width: 98%;">

            <el-table-column type="selection" width="40"></el-table-column>

            <el-table-column label="序号" prop="num" width="60">
            </el-table-column>

            <el-table-column prop="user" label="用户名" width="100">
            </el-table-column>

            <el-table-column prop="userID" label="用户ID" width="120">
            </el-table-column>

            <el-table-column prop="IDNo" label="身份证号" width="190">
            </el-table-column>

            <el-table-column prop="MoNo" label="手机号" width="130">
            </el-table-column>

            <el-table-column prop="userType" label="用户类型" width="90">
            </el-table-column>

            <el-table-column prop="gender" label="性别" width="70">
            </el-table-column>

            <el-table-column prop="entryTime" label="入职时间" width="130">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="100">
            </el-table-column>

            <el-table-column label="操作" style="width: 100px">
              <template slot-scope="scope">
                <el-button size="small" class="userM_el-tableBut" type="warning"
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
              :total=parseInt(total2)>
            </el-pagination>
          </div>

        </el-tab-pane>
      </el-tabs>

      <span class="headBut">
        <span class="userM_But1">
          <el-button size="small" @click="delChecked" type="danger">删除选中用户</el-button>
        </span>
        <span  class="userM_But2">
          <el-button size="small" type="primary" @click="dialogFormVisible = true">添加单个用户</el-button>
        </span>
        <span class="userM_But3">
          <el-upload
            class="upload-demo"
            action="/teacherCMS/addExcelUsers"
            :onError="uploadError"
            :beforeUpload="beforeAvatarUpload"
            :onSuccess="uploadSuccess"
            :show-file-list=false
            :on-exceed="handleExceed"
            accept=".xlsx">
          <el-button size="small" type="primary">Excel导入用户</el-button>
        </el-upload>
        </span>
      </span>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import md5 from 'js-md5'
  import moment from 'moment'

  export default {
    name: 'userManager',
    data() {
      return {
        teachData: [{
          num: '',
          n_name: '',
          user: '',
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
        stuData: [{
          num: '',
          n_name: '',
          user: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          entryTime: '',
          major: '',
          classGrade: ''
        }],
        total1: '',
        total2: '',
        activeName: 'first',
        pagesize: 10,
        currentPage: 1,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        url: document.domain,
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        dialogVisible: false,
        multipleSelection: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        addUserForm: {
          n_name: '',
          user: '',
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
        addUserForm1: {
          n_name: '',
          user: '',
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
          user: [
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
        radio: "1",
        radio2: "1",
        radio1: "S",
      }
    },
    computed: {},
    methods: {
      // Excel导入成功后的回调
      uploadSuccess (res, file) {
        //console.log(res.userInfo);
        if (res.userInfo) {
          let userInfo = res.userInfo;
          for (let i=0; i<userInfo.length; i++) {
            this.teachData.push(userInfo[i])
          }
          this.$message({
            message: '用户信息已存入数据库',
            type: 'success'
          });
        }else {
          console.log('返回为空')
        }
      },
      // 添加用户成功后提示信息
      addUserSuccess(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      // 添加用户失败提示信息
      addUserDefeat(msg) {
        this.$message.error(msg);
      },
      //重置添加添加用户
      resetUser() {
        this.addUserForm.n_name = '';
        this.addUserForm.user = '';
        this.addUserForm.pwd = '';
        this.addUserForm.userID = '';
        this.addUserForm.IDNo = '';
        this.addUserForm.MoNo = '';
        this.addUserForm.userType = '';
        this.addUserForm.gender = '';
        this.addUserForm.AdmDate = '';
        this.addUserForm.major = '';
        this.addUserForm.classGrade = '';
      },
      //重置修改用户
      resetUser1() {
        this.addUserForm1.n_name = '';
        this.addUserForm1.user = '';
        this.addUserForm1.pwd = '';
        this.addUserForm1.userID = '';
        this.addUserForm1.IDNo = '';
        this.addUserForm1.MoNo = '';
        this.addUserForm1.userType = '';
        this.addUserForm1.gender = '';
        this.addUserForm1.AdmDate = '';
        this.addUserForm1.major = '';
        this.addUserForm1.classGrade = '';
      },

      //修改
      handleEdit(index, row) {
        this.addUserForm1.n_name = row.n_name;
        this.addUserForm1.user = row.user;
        this.addUserForm1.userID = row.userID;
        this.addUserForm1.IDNo = row.IDNo;
        this.addUserForm1.MoNo = row.MoNo;
        this.addUserForm1.userType = row.userType;
        this.addUserForm1.gender = row.gender;
        this.addUserForm1.AdmDate = row.AdmDate;
        this.addUserForm1.major = row.major;
        this.addUserForm1.classGrade = row.classGrade;
        this.dialogFormVisible1 = true;
        console.log(this.addUserForm1);
        console.log(this.addUserForm);
      },

      //删除用户信息方法
      delChecked() {
        this.$confirm('此操作将永久删除用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post('/teacherCMS/delChecked', {
            data: {
              username: this.username,
              userType: this.userType,
              msg: this.multipleSelection
            }
          }).then((res) => {
            if (res.data.success == 0) {
              //删除单个
              if (this.multipleSelection.length == 1) {
                for (let j=0; j<this.teachData.length; j++){
                  if (this.multipleSelection[0].userID == this.teachData[j].userID) {
                    let ee = core.remove(this.teachData, this.teachData[j]);
                    this.teachData = ee;
                    //console.log(this.teachData);
                  }
                }
              }else {
                //删除多个
                for (let i=0; i<this.multipleSelection.length; i++) {
                  for (let j=0; j<this.teachData.length; j++){
                    if (this.multipleSelection[i].userID == this.teachData[j].userID) {
                      let ee = core.remove(this.teachData, this.teachData[j]);
                      this.teachData = ee;
                    }
                  }
                  //console.log(this.teachData);
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
        if (!this.addUserForm.user) {
          this.addUserDefeat('请输入姓名!');
        } else if (!this.addUserForm.gender) {
          this.addUserDefeat('请选择性别!');
        } else if (!this.addUserForm.userID) {
          this.addUserDefeat('请输入学号!');
        } else if (!this.addUserForm.MoNo) {
          this.addUserDefeat('请输入手机号!');
        } else if (!this.addUserForm.IDNo) {
          this.addUserDefeat('请输入身份证号!');
        } else if (!this.addUserForm.userType) {
          this.addUserDefeat('请选择用户类别!');
        } else if (!this.addUserForm.major) {
          this.addUserDefeat('请选择专业!');
        } else if (!this.addUserForm.classGrade) {
          this.addUserDefeat('请输入班级!');
        } else if (!this.addUserForm.AdmDate) {
          this.addUserDefeat('请选择日期!');
        } else {
          this.dialogFormVisible = false;
          //处理发送的用户信息方法
          function resUserData(data) {
            if (data.pwd == '') {
              data.pwd = md5(data.IDNo.substring(data.IDNo.length-6));
            }
            data.AdmDate = moment(data.AdmDate).format("YYY-MM-DD");
            if (data.n_name == '') {
              data.n_name = data.user
            }
            return data;
          }

          let resData = resUserData(this.addUserForm);
          //console.log(this.addUserForm);
          axios.post('/teacherCMS/addUser', {
            data: {
              username: this.username,
              userType: this.userType,
              addUser: resData
            }
          }).then((res) => {

            if (res.data.userInfo) {
              this.teachData.push(res.data.userInfo);
              this.total2 = this.teachData.length;
              console.log('11');
              console.log(this.total2);
              this.addUserSuccess('用户信息已存入数据库');
              this.resetUser();
            }
          });
        }
      },
      //修改用户信息
      reUser() {
        this.dialogFormVisible1 = false;
        console.log(this.addUserForm1);
        //处理发送的用户信息方法
        function resUserData1(data) {
          if (data.pwd != '') {
            data.pwd = md5(data.pwd);
          }
          return data;
        }

        let resData = resUserData1(this.addUserForm1);
          axios.post('/teacherCMS/updateUser', {
            data: {
              username: this.username,
              userType: this.userType,
              addUser: resData
            }
          }).then((res) => {
            if (res.data.userInfo) {
              //console.log(res.data.userInfo);
              //this.teachData = res.data.userInfo;
              //this.total = this.teachData.length;
              this.addUserSuccess();
              this.resetUser1();
            }
          });
      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      // 上传错误
      uploadError (res, file, fileList) {
        this.$message.error('上传失败，请重试！');
      },
      handleExceed(files, fileList) {
        this.$message({
          message: '每次只能上传 1 个文件',
          type: 'warning'
        });
      },

      // 上传前判断是不是Excel文件
      beforeAvatarUpload(file) {
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
      axios.post('/teacherCMS/getUserData', {
        data: {
          username: this.username,
          userType: this.userType
        }
      }).then((res) => {
        //学生
        let studentData = res.data.student;
        if (studentData.length > 0) {
          for (let i = 0; i < studentData.length; i++) {
            studentData[i].AdmDate = moment(new Date(studentData[i].AdmDate)).format("YYYY-MM-DD");
            studentData[i].num = i + 1;
          }
          this.stuData = studentData;
          this.total1 = this.stuData.length;
        }
        //教师
        let teacherData = res.data.teacher;
        if (teacherData.length > 0) {
          for (let i = 0; i < teacherData.length; i++) {
            teacherData[i].entryTime = moment(new Date(teacherData[i].entryTime)).format("YYYY-MM-DD");
            teacherData[i].num = i + 1;
          }
          this.teachData = teacherData;
          this.total2 = this.teachData.length;
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
  .userManager_cont .headBut {
    float: left;
  }
  .userManager_cont .userM_el-table .userM_el-tableBut {
    margin-top: 0;
  }
  .userManager_cont .el-dialog {
    border-radius: 16px;
  }
  .userManager_cont .el-Col .userM_But1,.userM_But2 {
    margin-bottom: 6px;
    margin-right: 16px;
  }
  .userManager_cont .el-Col .userM_But3 {
    margin-bottom: 6px;
    margin-right: 16px;
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

  .userManager_cont .el-dialog{
    width: 40.5%;
  }
  .userManager_cont span{
    display: inline-block;
  }
  .userManager_cont .el-dialog{
    width: 650px;
  }
  .userManager_cont .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .userManager_cont .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
    margin: 0;
  }
  .userManager_cont .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
    font-size: 16px;
  }
  .userManager_cont .el-table td, .el-table th {
    height: 40px;
  }
</style>
