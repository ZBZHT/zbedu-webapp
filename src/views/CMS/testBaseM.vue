<template>
  <div class="testBaseM_cont">

    <!--题库管理-->
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="题库列表" name="first">

          <!--显示所有题-->
          <el-table
            class="userM_el-table"
            :data="choiceData.slice((currentPage1-1)*pagesize,currentPage1*pagesize)"
            @selection-change="changeFun"
            style="width: 99%; margin-top: 10px">

            <el-table-column type="selection" width="40"></el-table-column>

            <el-table-column prop="num" label="序号" width="70">
            </el-table-column>

            <el-table-column prop="desc" label="试题内容">
            </el-table-column>

            <el-table-column prop="options" label="选项">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="130">
            </el-table-column>

            <el-table-column label="操作" width="90">
              <template slot-scope="scope">
                <el-button
                  size="mini" type="warning"
                  @click="handleEdit1(scope.$index, scope.row)">编 辑
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

        </el-tab-pane>

        <!--编辑对话框-->
        <el-dialog title="修改考试题"
                   :visible.sync="dialogFormVisible3"
                   :close-on-click-modal="false">

          <el-form :model="editForm" label-width="80px" ref="editForm" class="demo-addUserForm">

            <el-form-item label="序号" style="width: 120px;margin-bottom: 12px">
              <el-input :disabled="true" v-model="editForm.num"></el-input>
            </el-form-item>

            <el-form-item label="试题内容">
              <el-input type="textarea" :rows="1" v-model="editForm.desc"></el-input>
            </el-form-item>

            <el-form-item label="选项1" style="margin-bottom: 0">
              <el-input type="textarea" :rows="1" v-model="editForm.options[0]"></el-input>
            </el-form-item>
            <el-form-item label="选项2" style="margin-bottom: 0">
              <el-input type="textarea" :rows="1" v-model="editForm.options[1]"></el-input>
            </el-form-item>
            <el-form-item label="选项3" v-show="editForm.options[2] !== undefined">
              <el-input type="textarea" :rows="1" v-model="editForm.options[2]"></el-input>
            </el-form-item>
            <el-form-item label="选项4" v-show="editForm.options[3] !== undefined">
              <el-input type="textarea" :rows="1" v-model="editForm.options[3]"></el-input>
            </el-form-item>
            <el-form :inline="true" :model="editForm" ref="editForm" style="margin-left: 40px">
              <el-form-item label="专业">
                <el-input v-model="editForm.major"></el-input>
              </el-form-item>
              <el-form-item label="答案">
                <el-input v-model="editForm.answer"></el-input>
              </el-form-item>
            </el-form>

          </el-form>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="updateTestBase('editForm')">确定修改</el-button>
          </div>
        </el-dialog>

        <el-tab-pane label="查询" name="second">

          <el-select v-model="state1" filterable placeholder="请选择查询内容" style="margin-top: 10px">
            <el-option
              v-for="item in restaurants"
              :key="item.value"
              :value="item.value">
            </el-option>

          </el-select>
          <el-button type="primary" :loading='queryLoading' size="medium" @click="getQueryList">查 询</el-button>

          <!--显示查询列表-->
          <el-table
            class="userM_el-table"
            :data="queryData.slice((currentPage2-1)*pagesize,currentPage2*pagesize)"
            @selection-change="changeFun"
            style="width: 99%; margin-top: 10px">

            <el-table-column type="selection" width="50"></el-table-column>

            <el-table-column prop="num" label="序号" width="80">
            </el-table-column>

            <el-table-column prop="desc" label="试题内容" width="500">
            </el-table-column>

            <el-table-column prop="options" label="选项" width="360">
            </el-table-column>

            <el-table-column prop="major" label="专业" width="130">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini" type="warning"
                  @click="handleEdit(scope.$index, scope.row)">编 辑
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

      </el-tabs>

      <!--按钮-->
      <div class="headBut">
            <span class="userM_But1">
              <el-button size="small" @click="delChecked" type="danger">删除选中试题</el-button>
            </span>
        <span class="userM_But2">
          <el-upload
            class="upload-demo"
            action="/teacherCMS/addExcelTest"
            :onError="uploadError"
            :beforeUpload="beforeAvatarUpload"
            :onSuccess="uploadSuccess"
            :show-file-list=false
            :on-exceed="handleExceed"
            accept=".xlsx">
              <el-button size="small" type="primary">Excel导入试题</el-button>
          </el-upload>
            </span>
      </div>

    </el-col>
  </div>
</template>

<script>
  import tree from '@/components/courseTree/tree'
  import axios from 'axios'
  import core from '../../assets/js/core.js'

  export default {
    name: 'testBaseM',
    data() {
      return {
        data: [],
        url: document.domain,
        user: this.$store.state.username,
        form: {
          theme: '',
          name: [],
          nameId: [],
          region: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          num: '',
          time: ''
        },
        currentPage1: 1,
        currentPage2: 1,
        pagesize: 10,
        total1: '',
        total2: '',
        activeName: 'first',
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        testBaseMTableData: [],
        currentRow: null,
        multipleSelection: [],  //复选框
        choiceData: [],  // 全部题
        queryData: [],  //查询题
        dialogFormVisible3: false,
        editForm: {
          options: [],
        },
        queryLoading: false,
        restaurants: [],
        state1: '',
        state2: ''
      }
    },
    computed: {},
    methods: {
      changeFun(val) { //复选框状态改变
        this.multipleSelection = val;
        //console.log(this.multipleSelection);
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      // 上传前判断是不是Excel文件
      beforeAvatarUpload(file) {
        let index = file.name.split(".");
        let isxls = index[index.length - 1];
        if (isxls == 'xlsx') {
          return true;
        } else {
          this.$message.error('只能导入xlsx格式!');
        }
      },

      // 上传成功后的回调
      uploadSuccess(res, file) {
        //console.log(res.code);
        if (res.code == 0) {
          this.Success('试题导入成功');
          this.getAllTest();
        }
      },

      // 上传错误
      uploadError(res, file, fileList) {
        console.log('上传失败，请重试！')
      },
      handleExceed(files, fileList) {
        this.$message.warning(`每次只能上传 1 个文件`);
      },

      //本来考试主题显示在input的func
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
        if (checked == true) {
          //    this.form.name.push(data.label);
        } else {
          for (var i = 0; i < this.form.name.length; i++) {
            if (this.form.name[i] == data.label) {
              //    core.remove(this.form.name, i);
            }
          }
        }
      },
      //考试主题显示在input的func
      getCheckedNodes() {
        this.form.name = [];
        this.form.nameId = [];
        //console.log(this.$refs.tree.getCheckedNodes());
        var arr = this.$refs.tree.getCheckedNodes();
        for (var i = 0; i < arr.length; i++) {
          //console.log(arr[i].label);
          this.form.name.push(arr[i].label);
          this.form.nameId.push(arr[i].courseId);
          //console.log(arr[i].courseId);
          //console.log(this.form.nameId);
        }
      },
      handleClick(data){
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 成功后提示信息
      Success(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      // 错误信息提示
      errorMsg(msg) {
        this.$message.error(msg);
      },

      //编辑
      handleEdit1(index, row) {

        this.editForm = row;
        console.log(this.editForm);
        console.log(this.editForm.options[3]);

        this.dialogFormVisible3 = true;

      },
      //更新题库
      updateTestBase(data) {
        axios.post('/teacherCMS/updateTestBase', {
          data: {
            username: this.username,
            userType: this.userType,
            testBase: this.editForm
          }
        }).then((res) => {
          if (res.data.code === 0) {
            //console.log(res.data.userInfo);
            //this.teachData = res.data.userInfo;
            //this.total = this.teachData.length;
            this.getAllTest();
            this.dialogFormVisible3 = false;
            this.addUserSuccess('修改成功')
          }
        });
      },

      //删除用户信息方法
      delChecked() {
        this.$confirm('此操作将永久删除用户信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          axios.post('/teacherCMS/delCheckedQ', {
            data: {
              username: this.username,
              userType: this.userType,
              msg: this.multipleSelection
            }
          }).then((res) => {
            if (res.data.success == 0) {
              //删除单个
              if (this.multipleSelection.length == 1) {
                for (let j = 0; j < this.dataManager.length; j++) {
                  if (this.multipleSelection[0].userID == this.dataManager[j].userID) {
                    let ee = core.remove(this.dataManager, this.dataManager[j]);
                    this.dataManager = ee;
                    //console.log(this.dataManager);
                  }
                }
              } else {
                //删除多个
                for (let i = 0; i < this.multipleSelection.length; i++) {
                  for (let j = 0; j < this.dataManager.length; j++) {
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
            } else {
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
      //获取所有题库信息，提取查询关键字
      getAllTest() {
        axios.get('/teacherCMS/getAllTest', {
          params: {
            user: this.username,
            userType: this.userType
          }
        }).then((res) => {

          if (res.data) {
            let resData = res.data;
            let queryArr = [];
            for (let i = 0; i < resData.length; i++) {
              resData[i].num = i + 1;
              if (resData[i].major !== '') {
                queryArr.push(resData[i].major)
              }
              if (resData[i].title1 !== '') {
                queryArr.push(resData[i].title1)
              }
              if (resData[i].title2 !== '') {
                queryArr.push(resData[i].title2)
              }
              if (resData[i].title3 !== '') {
                queryArr.push(resData[i].title3)
              }
              if (resData[i].title4 !== '') {
                queryArr.push(resData[i].title4)
              }
              if (resData[i].title5 !== '') {
                queryArr.push(resData[i].title5)
              }
              if (resData[i].title6 !== '') {
                queryArr.push(resData[i].title6)
              }
            }
            this.choiceData = resData;
            this.total1 = this.choiceData.length;
            queryArr = core.unique(queryArr)
            for (let i = 0; i < queryArr.length; i++) {
              this.restaurants.push({"value": queryArr[i]})
            }
          }
        });
      },

      // 根据关键字查询
      getQueryList () {
        this.queryData = []
        this.total2 = ''
        let index = 1;
        for (let i = 0; i < this.choiceData.length; i++) {
          //console.log(this.choiceData[i])
          if (this.choiceData[i].major === this.state1) {
            this.choiceData[i].num = index
            this.queryData.push(this.choiceData[i])
            index = index + 1
          }
        }
        this.total2 = this.queryData.length;
      },
    },
    mounted() {
      this.getAllTest()
    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .testBaseM_cont .el-table .cell {
    max-height: 38px;
  }

  .testBaseM_cont .elinput {
    width: 486px;
    height: 34px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: auto;
    background-color: #fff;
    margin-bottom: -14px;
  }

  .testBaseM_cont .elinput ul li {
    display: inline-block;
  }

  .buttons .el-button {
    width: 100%;
  }

  .testBaseM_cont .buttons .el-button {
    margin-top: 22px;
  }

  .testBaseM_cont .headBut {
    float: left;
  }

  .dropdown {
    width: 488px;
  }

  .testBaseM_cont .el-table-column--selection .cell {
    padding-left: 0;
    margin-left: 10px;
  }

  .testBaseM_cont .block .el-button {
    float: left;
  }

  .testBaseM_cont span {
    display: inline-block;
  }

  .testBaseM_cont .userM_But1, .userM_But2 {
    margin-bottom: 10px;
  }

  .testBaseM_cont .el-dialog {
    width: 650px;
  }

  .testBaseM_cont .el-tabs--card > .el-tabs__header .el-tabs__nav {
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }

  .testBaseM_cont .el-tabs--card > .el-tabs__header {
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
    margin: 0;
  }

  .testBaseM_cont .el-tabs--card > .el-tabs__header .el-tabs__item {
    border-left: 1px solid #9f5355;
    font-size: 16px;
  }

  .testBaseM_cont .el-table td, .el-table th {
    height: 40px;
  }

  .testBaseM_cont {
    position: relative;
  }

  .testBaseM_cont .headBut {
    width: 120px;
    position: absolute;
    bottom: -560px;
    left: 5%;
  }

  .testBaseM_cont .el-table .cell {
    line-height: 20px;
  }

  .testBaseM_cont .el-dialog__body {
    text-align: left;
  }

</style>
