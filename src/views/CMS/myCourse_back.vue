<template>
  <div class="myCourse_cont">

    <!--我的课程-->
    <el-col :span="19">
      <!--添加课程-->
      <div style="margin-bottom: 10px;">
        <el-button size="small" type="primary" @click="dialogVisible = true">
          添加课程
        </el-button>
      </div>

      <!--添加课程对话框-->
      <el-dialog
        title="请输入课程名称"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" label-width="80px" class="demo-ruleForm">

          <el-form-item label="课程名称" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('form')">重置</el-button>
          <el-button type="primary" @click="addTab('form')">立即创建</el-button>
        </span>

      </el-dialog>

      <!--添加课程节点对话框-->
      <el-dialog
        title="请输入子课程名称"
        :visible.sync="dialogVisible1"
        width="30%"
        :before-close="handleClose">
        <el-form :model="formNode" :rules="rules" ref="formNode" label-width="80px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="formNode.name"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('formNode')">重置</el-button>
          <el-button type="primary" @click="append1('formNode')">立即创建</el-button>
        </span>
      </el-dialog>

      <!--添加课程简介对话框-->
      <el-dialog
        title="课程简介"
        :visible.sync="dialogVisible2"
        width="30%"
        :before-close="handleClose">
        <el-form :model="describeNode" :rules="rules1" ref="describeNode" class="demo-ruleForm">
          <el-form-item prop="name">
            <el-input type="textarea"
                      v-model="describeNode.name"
                      :autosize="{ minRows: 2, maxRows: 6}"
                      placeholder="请输入课程简介">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resetForm('describeNode')">重置</el-button>
          <el-button type="primary" @click="addDescribe1('describeNode')">立即创建</el-button>
        </span>
      </el-dialog>

      <!--上传对话框对话框-->
      <el-dialog
        class="dialog3"
        title="请上传课件类型"
        :visible.sync="dialogVisible3"
        width="30%"
        style="text-align: center;"
        :before-close="handleClose">
        <el-upload
          class="upload-demo upload-demo1"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          >
          <el-button type="primary">上传课件</el-button>
        </el-upload>

        <el-upload
          class="upload-demo upload-demo2"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          >
          <el-button type="primary">上传微课</el-button>
        </el-upload>


      </el-dialog>

      <!--课程标签-->
      <el-tabs v-model="editableTabsValue2" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in editableTabs2"
          :key="item.name"
          :label="item.title"
          :name="item.name"
          :closable="false">

          <div class="custom-tree-container">
            <div class="block">

              <el-table
                :data="dataTree"
                style="width: 100%">
                <el-table-column
                  label="课程名称"
                  width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.label }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  label="课程简介"
                  width="180">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>查看简介</p>
                      <p>住址: {{ scope.row.describe }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.label }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>










              <el-tree
                :data="dataTree"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button type="text" size="mini" @click="() => append(node, data)">
                      添加子课程
                    </el-button>
                    <el-button type="text" size="mini" @click="() => addDescribe(node, data)">
                      添加课程简介
                    </el-button>
                    <el-button type="text" size="mini" @click="() => uploadCourse(node, data)">
                      上传课件
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">
                      删除课程
                    </el-button>
                  </span>
                </span>
              </el-tree>
            </div>
          </div>

        </el-tab-pane>
      </el-tabs>


    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'

  export default {

    name: 'myCourse',
    data() {
      return {
        resDataTree: [],
        dataTree: [],
        courseName: '',  //新增课程的名字
        nodeName: '',    //新增课程节点的名字
        editableTabsValue2: '0',
        editableTabs2: [],
        tabIndex: 2,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        form: { name: '', },
        formNode: { name: '', },
        describeNode: { name: '', },
        rules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
        },
        rules1: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 2, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ],
        },
        userID: this.$store.state.userID,
        userType: this.$store.state.userType,
        appendData: '',
        appendNode: '',
      }
    },
    computed: {},
    methods: {
      //点击标签
      tabClick(tab, event){
        //console.log(tab.label);
        this.dataTree = [];
        for (let i=0; i<this.resDataTree.length; i++) {
          //console.log(this.resDataTree[i]);
          if (this.resDataTree[i].label == tab.label) {
            this.dataTree = [];
            this.dataTree[0] = this.resDataTree[i];
          }
        }
        //console.log(this.dataTree);
      },
      //添加课程标签
      addTab(targetName) {
          //修改页面数据
          if (this.form.name != '') {
            this.dialogVisible = false;
            let newTabName = ++this.tabIndex + '';
            this.editableTabs2.push({
              title: this.form.name,
              name: newTabName,
            });
            this.dataTree[0] = ({
              label: this.form.name,
              id: Number(this.dataTree[this.dataTree.length-1].id) + 1,
            });
            this.resDataTree.push({
              label: this.form.name,
              id: Number(this.dataTree[this.dataTree.length-1].id) + 1,
            });
            this.editableTabsValue2 = newTabName;

            this.updateCustomCourse(0)
          } else {
            this.warningMsg('名称不能为空')
          }

      },
      //删除课程
      removeTab(targetName) {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let tabs = this.editableTabs2;
          let activeName = this.editableTabsValue2;
          let tabsTitle = '';
          for(let i=0; i<tabs.length; i++) {
            tabsTitle = tabs[i].title
          }
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue2 = activeName;
          this.editableTabs2 = tabs.filter(tab => tab.name !== targetName);
          console.log(tabsTitle);

          for(let i=0; i<this.resDataTree.length; i++) {

            if (this.resDataTree[i].label == tabsTitle) {
              this.resDataTree = core.remove(this.resDataTree, this.resDataTree[i]);
              //console.log(this.resDataTree);
            }
          }

          this.updateCustomCourse();
          this.$message({
            type: 'success',
            message: '删除成功!'
          });


        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },
      //确认关闭
      handleClose(done) {
        done();
        /*this.$confirm('确认关闭？')
          .then(_ => {

          })
          .catch(_ => {});*/
      },
      //立刻创建
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //添加子课程
      append(node, data) {
        this.dialogVisible1 = true;
        this.appendData = data;
        this.appendNode = node;
      },
      append1() {
        if (this.formNode.name != '') {
          this.dialogVisible1 = false;
          let newChild = { label: this.formNode.name, children: [] };
          if (!this.appendData.children) {
            this.$set(this.appendData, 'children', []);
          }
          this.appendData.children.push(newChild);
        }
        this.updateCustomCourse(1);
      },
      //添加课程简介
      addDescribe(node, data) {
        this.dialogVisible2 = true;
        this.appendData = data;
        this.appendNode = node;
      },
      addDescribe1(data) {
        if (this.describeNode.name != '') {
          this.dialogVisible2 = false;
          this.$set(this.appendData, 'describe', this.describeNode.name);
          //console.log(this.appendData);
        }
        this.updateCustomCourse(2);
      },
      //删除子节点
      remove(node, data) {

        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);

          this.updateCustomCourse();

          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

      },


      //上传课件
      uploadCourse(node, data) {
          this.dialogVisible3 = true;

      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },



      //成功信息
      successMsg(msg) {
        this.$message({
          message: msg,
          type: 'success'
        });
      },
      //警告信息
      warningMsg(msg) {
        this.$message({
          message: msg,
          type: 'warning'
        });
      },
      //更新到服务器
      updateCustomCourse(d) {
        axios.post('/teacherCMS/addCustomCourse', {
          data: {
            userID: this.userID,
            userType: this.userType,
            course: this.resDataTree,
          }
        }).then((res) => {
          let resD = res.data;
          if (resD.code == 0) {
            if (d == 0) {
                this.successMsg('添加课程成功')
            } else if (d == 1) {
              this.successMsg('添加子课程成功')
            } else if (d == 2) {
              this.successMsg('添加课程简介成功')
            }
          } else {
            this.warningMsg('服务器返回错误')
          }
          //console.log(this.resDataTree[0]);
          //this.$set(this.dataTree, 0, this.resDataTree[0]);
          this.dataTree.push(this.resDataTree[0]);
        });
      },
      //获取我的课程数据
      getCustomCourse() {
        axios.post('/teacherCMS/getTeacherCustomCourse', {
          data: {
            userID: this.userID,
            userType: this.userType,
          }
        }).then((res) => {
          let resD = res.data.techCosCou[0].course;

          if (resD.length != 0) {
            this.resDataTree = resD;
            //console.log(resD);
            for (let i=0; i<resD.length; i++) {
              this.editableTabs2.push({
                title: resD[i].label,
              });
            }
          } else {
            this.warningMsg('服务器返回错误')
          }
          console.log(this.editableTabs2);
          this.dataTree[0] = (this.resDataTree[0]);
          //console.log(this.dataTree);
        });
      },
    },

    mounted() {
      this.getCustomCourse()
    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .myCourse_cont .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myCourse_cont .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myCourse_cont .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
    font-size: 16px;
  }
  .myCourse_cont .el-table td, .el-table th {
    height: 40px;
  }
  .myCourse_cont .el-col-19 {
    text-align: left;
  }
  .myCourse_cont .el-input__inner {
    width: 85%;
  }
  .myCourse_cont .el-dialog {
    border-radius: 16px;
    border: 2px solid #9f5355;
  }
  .myCourse_cont .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    width: 70%;
  }
  .myCourse_cont .custom-tree-container .el-tree {
    width: 60%;
  }
  .myCourse_cont .dialog3 {
    display: flex;
  }


</style>
