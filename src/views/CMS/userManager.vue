<template>
  <div class="userManager_cont">

    <!--用户管理-->
    <el-col :span="20" class="el-Col">
      <el-button size="small" @click="delChecked">删除选中用户</el-button>

      <el-button size="small" @click="dialogFormVisible = true">添加单个用户</el-button>

      <!--添加单个用户对话框-->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form :model="addUserForm" :rules="rules" ref="addUserForm" label-width="80px" class="demo-addUserForm">

          <el-form-item label="姓名" prop="name" >
            <el-input v-model="addUserForm.name" placeholder="姓名为2-4个汉字"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-radio-group v-model="addUserForm.gender">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="昵称" prop="n_name">
            <el-input v-model="addUserForm.n_name" placeholder="昵称为2-12个字符"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input v-model="addUserForm.pwd" placeholder="默认密码为身份证后6位"></el-input>
          </el-form-item>

          <el-form-item label="学号" prop="userID">
            <el-input v-model="addUserForm.userID" placeholder="学号为8位数字"></el-input>
          </el-form-item>

          <el-form-item label="身份证号" prop="IDNo">
            <el-input v-model="addUserForm.IDNo" placeholder="身份证号码为15位或者18位"></el-input>
          </el-form-item>

          <el-form-item label="手机号" prop="MoNo">
            <el-input v-model="addUserForm.MoNo" placeholder="手机号码位11位"></el-input>
          </el-form-item>

          <el-form-item label="用户类别" prop="resource">
            <el-radio-group v-model="addUserForm.userType">
              <el-radio label="管理员"></el-radio>
              <el-radio label="教务管理员"></el-radio>
              <el-radio label="教师"></el-radio>
              <el-radio label="学生"></el-radio>
              <el-radio label="外来学生"></el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="入学时间" prop="AdmDate">
            <el-input v-model="addUserForm.AdmDate" placeholder="手机号码位11位"></el-input>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>


      <el-button size="small" @click="">Excel导入用户</el-button> <!--addUser-->

      <el-table :data="dataManager.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                @selection-change="changeFun"
                stripe style="width: 98%;">

        <el-table-column type="selection" width="40"></el-table-column>

        <el-table-column prop="user" label="用户名" style="width: 5%">
        </el-table-column>

        <el-table-column prop="userID" label="用户ID" style="width: 100px">
        </el-table-column>

        <el-table-column prop="IDNo" label="身份证号" style="width: 200px">
        </el-table-column>

        <el-table-column prop="MoNo" label="手机号" style="width: 100px">
        </el-table-column>

        <el-table-column prop="userType" label="用户类型" style="width: 100px">
        </el-table-column>

        <el-table-column label="操作" style="width: 100px">
          <template slot-scope="scope">
            <el-button type="text" size="small">编辑</el-button>
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

      <!--添加用户-->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form ref="data" :model="data" label-width="80px">
          <el-form-item label="姓名">
            <el-input v-model="data.name"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="addUser('addUserForm')">立即创建</el-button>
            <el-button @click="resetAddUser('addUserForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../server/utils/core.js'

  export default {
    name: 'userManager',
    activeName2: 'first',
    data() {
      return {
        data: [],
        dataManager: [{
          user: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: ''
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
            { min: 2, max: 12, message: '长度在 2 到 12 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 4, max: 8, message: '长度在 2 到 4 个汉字', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 4, max: 8, message: '长度在 2 到 4 个汉字', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择性别', trigger: 'change' }
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

      },
      //重置添加添加用户
      resetAddUser(formName) {
        this.$refs[formName].resetFields();
      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

      handleClose(done) {  //对话框关闭确认
        this.$confirm('确认关闭？')
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
        if (res.data.userInfo.length > 0) {
          this.dataManager = res.data.userInfo;
          this.total = this.dataManager.length
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

  .el-tree-node__expand-icon {
    font-size: 16px;
  }

  .el-tree-node__label {
    font-size: 16px;
  }

  .el-tree {
    background-color: #dcdfe6;
  }

  .el-table .cell {
    text-align: left;
    margin-left: 14px
  }

  .CMS_cont {
    min-height: 34.3rem;
  }

  .el-card__body {
    padding: 10rem;
  }

  .el-table td, .el-table th {
    padding: 2px;
  }

  .el-table-column--selection .cell {
    padding-left: 0;
  }

  .block .el-button {
    float: left;
  }
</style>
