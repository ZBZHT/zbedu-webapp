<template>
  <div class="userManager_cont">

    <!--用户管理-->
    <el-col :span="19" class="el-Col">

      <!--添加学生对话框-->
      <el-dialog title="请填写学生资料"
                 :visible.sync="dialogFormVisible"
                 :before-close="handleClose"
                 :close-on-click-modal="false">
        <el-form :model="addStuForm" :rules="rules" ref="addStuForm" label-width="80px" class="demo-addUserForm">

          <el-form :inline="true" :model="addStuForm" :rules="rules" ref="addStuForm">
          <el-form-item label="姓" prop="user">&emsp;&emsp;名
            <el-input v-model="addStuForm.user" placeholder="姓名为2-4个汉字" style="width: 80%"></el-input>
          </el-form-item>

            <el-form-item label="性" prop="gender" style="width: 48%;">&emsp;&emsp;别
              <el-radio-group v-model="addStuForm.gender" style="margin-left: 10px;">
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <el-form :inline="true" :model="addStuForm" :rules="rules" ref="addStuForm">
          <el-form-item label="学" prop="userID" >&emsp;&emsp;号
            <el-input v-model="addStuForm.userID" placeholder="学号为8位数字" style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label="手" prop="MoNo">&#8194;机&#8194;号
            <el-input v-model="addStuForm.MoNo" placeholder="手机号码位11位"  style="width: 80%"></el-input>
          </el-form-item>
          </el-form>

          <el-form-item label="身份证号" prop="IDNo" style="width: 96%;margin-left: 10px;">
            <el-input v-model="addStuForm.IDNo" placeholder="身份证号码为15位或者18位"></el-input>
          </el-form-item>

          <el-form-item label="用户类别" prop="userType">
            <el-radio-group v-model="addStuForm.userType">
              <el-radio v-model="radio1" label="S">学生</el-radio>
              <el-radio v-model="radio1" label="O">外来学生</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form :inline="true" :model="addStuForm" :rules="rules" ref="addStuForm">
            <el-form-item label="专" prop="major" style="margin-right:0;">&emsp;&emsp;业
              <el-select v-model="majorMV" placeholder="请选择专业" style="width:78%;">
                <el-option
                  v-for="item in majorM"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label"
                  automatic-dropdown>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="班" prop="classGrade">&emsp;&emsp;级
              <el-select v-model="classMV" placeholder="请选择班级">
                <el-option
                  v-for="item in classM"
                  :key="item.label"
                  :label="item.label"
                  :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form :inline="true" :model="addStuForm" :rules="rules" ref="addStuForm">
            <el-form-item prop="time" label="入学时间" style="margin-left:0;margin-right:0;">
              <el-date-picker type="date" placeholder="选择日期" v-model="addStuForm.time" style="width:89%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="密" prop="pwd" style="margin-left:0;margin-right:0;width:48%;">&emsp;&emsp;码
              <el-input v-model="addStuForm.pwd" placeholder="默认密码为身份证后6位" style="width:80%;"></el-input>
            </el-form-item>
          </el-form>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="resetStu('addStuForm')">重&emsp;置</el-button>
            <el-button :plain="true" type="primary" @click="addStu('addStuForm')">提&emsp;交</el-button>
        </div>
      </el-dialog>

      <!--添加教师对话框-->
      <el-dialog title="请填写教师资料"
                 :visible.sync="dialogFormVisible2"
                 :before-close="handleClose"
                 :close-on-click-modal="false">
        <el-form :model="addTeachForm" :rules="rules" ref="addTeachForm" label-width="80px" class="demo-addUserForm">

          <el-form :inline="true" :model="addTeachForm" :rules="rules" ref="addTeachForm">
          <el-form-item label="姓" prop="user">&emsp;&emsp;名
            <el-input v-model="addTeachForm.user" placeholder="姓名为2-4个汉字" style="width: 80%;"></el-input>
          </el-form-item>

            <el-form-item label="性" prop="gender" style="width: 48%;">&emsp;&emsp;别
              <el-radio-group v-model="addTeachForm.gender">
                <el-radio v-model="radio" label="1">男</el-radio>
                <el-radio v-model="radio" label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <el-form-item label="身份证号" prop="IDNo" style="width: 96%;margin-left: 10px;">
            <el-input v-model="addTeachForm.IDNo" placeholder="身份证号码为15位或者18位"></el-input>
          </el-form-item>

          <el-form :inline="true" :model="addTeachForm" :rules="rules" ref="addTeachForm">
            <el-form-item label="手" prop="MoNo" style="margin-left: 10px;">&#8194;机&#8194;号
              <el-input v-model="addTeachForm.MoNo" placeholder="手机号码位11位" style="width: 80%;"></el-input>
            </el-form-item>
            <el-form-item label="密" prop="pwd">&emsp;&emsp;码
              <el-input v-model="addTeachForm.pwd" placeholder="默认密码为111111" style="width: 80%;"></el-input>
            </el-form-item>
          </el-form>

          <el-form-item label="用户类别" prop="userType">
            <el-radio-group v-model="addTeachForm.userType">
              <el-radio v-model="radio2" label="EA">教务管理员</el-radio>
              <el-radio v-model="radio2" label="T">教师</el-radio>
            </el-radio-group>
          </el-form-item>

        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="resetTeach">重&emsp;置</el-button>
            <el-button :plain="true" type="primary" @click="addTeach('addTeachForm')">提&emsp;交</el-button>
        </div>
      </el-dialog>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

        <el-tab-pane label="学生列表" name="first">

          <!--学生列表-->
          <el-table class="userM_el-table" :data="stuData.slice((currentPage1-1)*pagesize,currentPage1*pagesize)"
                    @selection-change="changeStudent"
                    stripe style="width: 99%;">

            <el-table-column type="selection" width="40"></el-table-column>

            <el-table-column prop="num" label="序号" width="60">
            </el-table-column>

            <el-table-column prop="user" label="用户名" width="100">
            </el-table-column>

            <el-table-column prop="userID" label="学号" width="120">
            </el-table-column>

            <el-table-column prop="IDNo" label="身份证号" width="190">
            </el-table-column>

            <el-table-column prop="MoNo" label="手机号" width="130">
            </el-table-column>

            <el-table-column prop="userType" label="用户类型" width="90">
            </el-table-column>

            <el-table-column prop="gender" label="性别" width="70">
            </el-table-column>

            <el-table-column prop="time" label="入学时间" width="110">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="110">
            </el-table-column>

            <el-table-column prop="classGrade" label="班级" width="90">
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
              :current-page.sync="currentPage1"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total=parseInt(total1)>
            </el-pagination>
          </div>

          <!--修改学生对话框-->
          <el-dialog title="修改资料"
                     :visible.sync="dialogFormVisible1"
                     :before-close="handleClose"
                     :close-on-click-modal="false">
            <el-form :model="addUserForm1" :rules="rules" ref="addUserForm1" label-width="80px" class="demo-addUserForm">

              <el-form :inline="true" :model="addUserForm1" :rules="rules" ref="addUserForm1">
                <el-form-item label="姓" prop="user">&emsp;&emsp;名
                  <el-input v-model="addUserForm1.user" placeholder="姓名为2-4个汉字" style="width: 80%"></el-input>
                </el-form-item>

                <el-form-item label="性" prop="gender" style="width: 48%;">&emsp;&emsp;别
                  <el-radio-group v-model="addUserForm1.gender" style="margin-left: 10px;">
                    <el-radio v-model="radio3" label="1">男</el-radio>
                    <el-radio v-model="radio3" label="2">女</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-form>

              <el-form :inline="true" :model="addUserForm1" :rules="rules" ref="addUserForm1">
                <el-form-item label="学" prop="userID" style="width: 48%;margin-right:0;">&emsp;&emsp;号
                  <el-input v-model="addUserForm1.userID" placeholder="学号为8位数字" style="width:80%;"></el-input>
                </el-form-item>
                <el-form-item label="手" prop="MoNo" style="width: 48%;">&#8194;机&#8194;号
                  <el-input v-model="addUserForm1.MoNo" placeholder="手机号码位11位" style="width:80%;"></el-input>
                </el-form-item>
              </el-form>

              <el-form-item label="身份证号" prop="IDNo" style="margin-left: 10px;">
                <el-input v-model="addUserForm1.IDNo" placeholder="身份证号码为15位或者18位" style="width:98%;"></el-input>
              </el-form-item>

              <el-form-item label="用户类别" prop="userType">
                <el-radio-group v-model="addUserForm1.userType">
                  <el-radio v-model="radio3" label="S">学生</el-radio>
                  <el-radio v-model="radio3" label="O">外来学生</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form :inline="true" :model="addStuForm1" :rules="rules" ref="addStuForm">
                <el-form-item label="专" prop="major" style="margin-right:0;">&emsp;&emsp;业
                  <el-select v-model="majorMV" placeholder="请选择专业" style="width:78%;">
                    <el-option
                      v-for="item in majorM"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label"
                      automatic-dropdown>
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="班" prop="classGrade">&emsp;&emsp;级
                  <el-select v-model="classMV" placeholder="请选择班级">
                    <el-option
                      v-for="item in classM"
                      :key="item.label"
                      :label="item.label"
                      :value="item.label">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>

              <el-form :inline="true" :model="addUserForm1" :rules="rules" ref="addUserForm1">
                <el-form-item prop="time" label="入学时间">
                  <el-date-picker type="date" placeholder="选择日期" v-model="addUserForm1.time"></el-date-picker>
                </el-form-item>
                <el-form-item label="密" prop="pwd" style="margin-left: 10px;">&emsp;&emsp;码
                  <el-input v-model="addUserForm1.pwd" placeholder="默认密码为身份证后6位" style="width:80%;"></el-input>
                </el-form-item>
              </el-form>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="reUser('addUserForm1')">确定修改</el-button>
            </div>
          </el-dialog>

        </el-tab-pane>

        <el-tab-pane label="教师列表" name="second">

          <!--教师列表-->
          <el-table class="userM_el-table" :data="teachData.slice((currentPage2-1)*pagesize,currentPage2*pagesize)"
                    @selection-change="changeTeacher"
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

            <el-table-column prop="time" label="入职时间" width="130">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="100">
            </el-table-column>

            <el-table-column label="操作" style="width: 100px">
              <template slot-scope="scope">
                <el-button size="small" class="userM_el-tableBut" type="warning"
                           @click="handleEdit1(scope.$index, scope.row)">修 改
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--分页显示-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage2"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total=parseInt(total2)>
            </el-pagination>
          </div>

        </el-tab-pane>

        <!--修改教师对话框-->
        <el-dialog title="修改资料"
                   :visible.sync="dialogFormVisible3"
                   :before-close="handleClose"
                   :close-on-click-modal="false">
          <el-form :model="addTeachForm" :rules="rules" ref="addUserForm1" label-width="80px" class="demo-addUserForm">

            <el-form :inline="true" :model="addTeachForm" :rules="rules" ref="addTeachForm">
              <el-form-item label="姓" prop="user">&emsp;&emsp;名
                <el-input v-model="addTeachForm.user" placeholder="姓名为2-4个汉字" style="width: 80%;"></el-input>
              </el-form-item>

              <el-form-item label="性" prop="gender" style="width: 48%;">&emsp;&emsp;别
                <el-radio-group v-model="addTeachForm.gender">
                  <el-radio v-model="radio3" label="1">男</el-radio>
                  <el-radio v-model="radio3" label="2">女</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>

            <el-form-item label="身份证号" prop="IDNo" style="width: 96%;margin-left: 10px;">
              <el-input v-model="addTeachForm.IDNo" placeholder="身份证号码为15位或者18位"></el-input>
            </el-form-item>

            <el-form :inline="true" :model="addTeachForm" :rules="rules" ref="addTeachForm">
              <el-form-item label="手" prop="MoNo" style="margin-left: 10px;">&#8194;机&#8194;号
                <el-input v-model="addTeachForm.MoNo" placeholder="手机号码位11位" style="width: 80%;"></el-input>
              </el-form-item>
              <el-form-item label="密" prop="pwd">&emsp;&emsp;码
                <el-input v-model="addTeachForm.pwd" placeholder="默认密码为111111" style="width: 80%;"></el-input>
              </el-form-item>
            </el-form>

            <el-form-item label="用户类别" prop="userType">
              <el-radio-group v-model="addTeachForm.userType">
                <el-radio v-model="radio3" label="EA">教务管理员</el-radio>
                <el-radio v-model="radio3" label="T">教师</el-radio>
              </el-radio-group>
            </el-form-item>

          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addTeach('addTeachForm')">确定修改</el-button>
          </div>
        </el-dialog>

      </el-tabs>

      <span class="headBut">
        <span class="userM_But1">
          <el-button size="small" @click="delChecked" type="danger">删除选中用户</el-button>
        </span>
        <span  class="userM_But2">
          <el-button size="small" type="primary" @click="dialogFormVisible = true">添加学生</el-button>
        </span>
        <span  class="userM_But4">
          <el-button size="small" type="primary" @click="dialogFormVisible2 = true">添加教师</el-button>
        </span>
        <span class="userM_But3">
          <el-upload
            class="upload-demo"
            action="/teacherCMS/addExcelUsers"
            :onError="uploadError"
            :onSuccess="uploadSuccess"
            :show-file-list=false
            :on-exceed="handleExceed"
            accept=".xlsx,.xls">
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
          user: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          time: '',
          major: '',
          classGrade: ''
        }],
        stuData: [{
          num: '',
          user: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          time: '',
          major: '',
          classGrade: ''
        }],
        total1: '',
        total2: '',
        activeName: 'first',
        pagesize: 10,
        currentPage1: 1,
        currentPage2: 1,
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        url: document.domain,
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        dialogVisible: false,
        studentSelection: [],
        teacherSelection: [],
        dialogFormVisible: false,
        dialogFormVisible1: false,
        dialogFormVisible2: false,
        dialogFormVisible3: false,
        addStuForm1:[],
        addStuForm: {
          user: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: 'S',
          gender: '1',
          time: '',
          major: '',
          classGrade: ''
        },
        addTeachForm: {
          user: '',
          pwd: '',
          IDNo: '',
          MoNo: '',
          userType: 'T',
          gender: '1',
        },
        addUserForm1: {
          user: '',
          pwd: '',
          userID: '',
          IDNo: '',
          MoNo: '',
          userType: '',
          gender: '',
          time: '',
          major: '',
          classGrade: ''
        },
        rules: {
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
            { min: 15, max: 18, message: '长度在 15 到 18 位', trigger: 'blur' }
          ],
          MoNo: [
            { min: 11, max: 11, message: '长度在 csdf 位', trigger: 'blur' }
          ],
          userType: [
            { required: true, message: '请选择一个类型', trigger: 'change' }
          ],
          gender: [
            {  message: '请选择性别', trigger: 'change'}
          ],
          time: [
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
        radio1: "S",
        radio2: "T",
        radio3: "",
        majorM: [],
        classM: [],
        majorMV: [],
        classMV: [],

      }
    },
    computed: {},
    methods: {
      // Excel导入成功后的回调
      uploadSuccess (res, file) {
        //console.log(res.userInfo);
        if (res.code === 0) {
          this.getUserData();
          this.$message({
            message: '用户信息导入成功',
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
      //重置添加添加学生
      resetStu() {
        this.addStuForm.user = '';
        this.addStuForm.pwd = '';
        this.addStuForm.userID = '';
        this.addStuForm.IDNo = '';
        this.addStuForm.MoNo = '';
        this.addStuForm.userType = 'S';
        this.addStuForm.gender = '1';
        this.addStuForm.time = '';
        this.addStuForm.major = '';
        this.addStuForm.classGrade = '';
      },
      //重置添加添加教师
      resetTeach() {
        this.addTeachForm.user = '';
        this.addTeachForm.pwd = '';
        this.addTeachForm.IDNo = '';
        this.addTeachForm.MoNo = '';
        this.addTeachForm.userType = 'T';
        this.addTeachForm.gender = '1';
      },
      //重置修改用户
      resetUser1() {
        this.addUserForm1.user = '';
        this.addUserForm1.pwd = '';
        this.addUserForm1.userID = '';
        this.addUserForm1.IDNo = '';
        this.addUserForm1.MoNo = '';
        this.addUserForm1.userType = '';
        this.addUserForm1.gender = '';
        this.addUserForm1.time = '';
        this.addUserForm1.major = '';
        this.addUserForm1.classGrade = '';
      },

      //修改学生
      handleEdit(index, row) {
          this.resetUser1();
        this.addUserForm1.user = row.user;
        this.addUserForm1.userID = row.userID;
        this.addUserForm1.IDNo = row.IDNo;
        this.addUserForm1.MoNo = row.MoNo;
        if (row.userType === '学生') {
          this.addUserForm1.userType = 'S';
        } else if (row.userType === '外来学生') {
          this.addUserForm1.userType = 'O';
        }
        //console.log(row);
        if (row.gender === '男') {
          this.addUserForm1.gender = '1';
        } else if (row.gender === '女') {
          this.addUserForm1.gender = '2';
        }
        this.addUserForm1.time = row.time;
        this.addUserForm1.major = row.major;
        this.addUserForm1.classGrade = row.classGrade;
        this.majorMV = row.major;
        this.classMV = row.classGrade;
        this.dialogFormVisible1 = true;
        //console.log(this.addUserForm1);
      },
      //修改老师
      handleEdit1(index, row) {
          //console.log(row);
        this.addTeachForm.user = row.user;
        this.addTeachForm.IDNo = row.IDNo;
        this.addTeachForm.MoNo = row.MoNo;
        this.addTeachForm.userType = row.userType;
        if (row.gender === '男') {
          this.addTeachForm.gender = '1';
        } else if (row.gender === '女') {
          this.addTeachForm.gender = '2';
        }
        this.dialogFormVisible3 = true;
        //console.log(this.addTeachForm);
      },

      //删除用户信息方法
      delChecked() {
        this.$confirm('此操作将永久删除用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post('/teacherCMS/delUserData', {
            data: {
              username: this.username,
              userType: this.userType,
              studentSelection: this.studentSelection,
              teacherSelection: this.teacherSelection
            }
          }).then((res) => {
            //console.log(res.data);
            if (res.data.code === 0) {
              this.getUserData();
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

      //处理发送的用户信息方法
      resUserData(data) {
          console.log(data);
        if (data.pwd == '') {
          data.pwd = md5(data.IDNo.substring(data.IDNo.length-6));
        } else {
          data.pwd = md5(data.pwd);
        }
        data.time = moment(data.time).format("YYYY-MM-DD");
        return data;
      },

      //添加学生
      addStu() {
        this.addStuForm.major = this.majorMV;
        this.addStuForm.classGrade = this.classMV;
        let resData = this.resUserData(this.addStuForm);
        this.dialogFormVisible = false;
          axios.post('/teacherCMS/addStu', {
            data: {
              username: this.username,
              userType: this.userType,
              stuForm: resData
            }
          }).then((res) => {
            if (res.data.code === 0) {
              this.addUserSuccess('用户信息已存入数据库');
              this.resetStu();
              this.getUserData();
            }
          });
      },
      //添加教师
      addTeach() {
        function resUserData1(data) {
          if (data.pwd != '') {
            data.pwd = md5(data.pwd);
          }
          return data;
        }

        let resData = resUserData1(this.addTeachForm);
        this.dialogFormVisible2 = false;
          //console.log(this.addUserForm);
          axios.post('/teacherCMS/addTeach', {
            data: {
              username: this.username,
              userType: this.userType,
              teachForm: resData
            }
          }).then((res) => {
            if (res.data.code === 0) {
              this.addUserSuccess('用户信息已存入数据库');
              this.resetStu();
              this.getUserData();
            }
          });
      },

      //修改用户信息
      reUser() {
        this.dialogFormVisible1 = false;
        //console.log(this.addUserForm1);
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
              this.getUserData();
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

      handleClose(done) {  //对话框关闭确认
        this.$confirm('已输入的信息未保存! 确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {
          });
      },
      changeStudent(val) {
        this.studentSelection = val;
      },
      changeTeacher(val) {
        this.teacherSelection = val;
      },
      handleClick(tab, event) {
        if (tab.name === 'first') {
          this.teacherSelection = [];
        } else if (tab.name === 'second') {
          this.studentSelection = [];
        }
      },
      getUserData() {
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
              studentData[i].time = moment(new Date(studentData[i].time)).format("YYYY-MM-DD");
              studentData[i].gender = core.getGender(studentData[i].gender);
              studentData[i].userType = core.userType(studentData[i].userType);
              studentData[i].num = i + 1;
            }
            this.stuData = studentData;
            this.total1 = this.stuData.length;
          }
          //教师
          let teacherData = res.data.teacher;
          if (teacherData.length > 0) {
            for (let i = 0; i < teacherData.length; i++) {
              teacherData[i].time = moment(new Date(teacherData[i].time)).format("YYYY-MM-DD");
              teacherData[i].gender = core.getGender(teacherData[i].gender);
              studentData[i].userType = core.userType(studentData[i].userType);
              teacherData[i].num = i + 1;
            }
            this.teachData = teacherData;
            this.total2 = this.teachData.length;
          }
        });
      },
      getClass() {
        axios.post('/teacherCMS/getClass', {
          data: {
            userType: this.userType
          }
        }).then((res) => {
            //console.log(res.data);
            this.majorM = res.data.majorMsg;
            this.classM = res.data.classMsg;
          //学生
          /*let studentData = res.data.student;
          if (studentData.length > 0) {
            this.stuData = studentData;
            this.total1 = this.stuData.length;
          }*/

        });
      }
    },
    mounted() {
        this.getUserData();
        this.getClass();
    },
    components: {}
  }
</script>

<style>

  * {
    margin: 0;
    padding: 0;
  }
  .userManager_cont {
    position: relative;
  }
  .userManager_cont .userM_el-table .userM_el-tableBut {
    margin-top: 0;
  }
  .userManager_cont .el-dialog {
    border-radius: 16px;
  }
  .userManager_cont .el-pagination {
    text-align: center;
  }
  .userManager_cont .userM_But1 .el-button--small, .el-button--small.is-round{
    margin-bottom: 10px;
  }
  .userManager_cont .userM_But2 .el-button--small, .el-button--small.is-round{
    margin-bottom: 10px;
  }
  .userManager_cont .userM_But4 .el-button--small, .el-button--small.is-round{
    margin-bottom: 10px;
  }
  .userManager_cont .userM_But2 {
    margin-right: 0;
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
    margin-left: 10px;
  }
  .userManager_cont .el-dialog{
    width: 40.5%;
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
  .userManager_cont .el-col-19 {
    text-align: left;
  }
  .userManager_cont .headBut {
    width: 120px;
    position: absolute;
    bottom: -500px;
    left: 5%;
  }
  .userManager_cont .el-form-item__label{
    text-align: left;
    padding: 0;
  }
  .userManager_cont .el-input__inner{
    margin-right:0;
    margin-left: 10px;
  }
  .userManager_cont .el-radio-group{
    margin-left: 10px;
  }
</style>
