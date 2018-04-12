<template>
  <div class="myCourse_cont">

    <!--我的课程-->
    <el-col :span="19">
      <!--添加课程-->
      <div style="margin-bottom: 10px;">
        <el-button
          size="small"
          type="primary"
          @click="dialogVisible = true"
        >
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
          <el-button type="primary" @click="append('formNode')">立即创建</el-button>
        </span>

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
              <el-tree
                :data="dataTree"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => dialogV(data)">
                      添加课程
                    </el-button>
                    <el-button
                      type="text"
                      size="mini"
                      @click="() => remove(node, data)">
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
  let id = 5000;

  export default {

    name: 'myCourse',
    data() {
      return {
        resDataTree: [],
        dataTree: [],
        courseName: '',  //新增课程的名字
        nodeName: '',    //新增课程节点的名字
        editableTabsValue2: '1',
        editableTabs2: [
          {
            title: '我的课程',
            name: '1',
          }
        ],
        tabIndex: 2,
        dialogVisible: false,
        dialogVisible1: false,
        form: {
          name: '',
        },
        formNode: {
          name: '',
        },
        rules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
        },
        userID: this.$store.state.userID,
        userType: this.$store.state.userType,
        appendData: '',
      }
    },
    computed: {},
    methods: {
      //点击标签
      tabClick(tab, event){
        console.log(tab);
        console.log(this.dataTree);

      },
      //添加课程标签
      addTab(targetName) {
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

          this.editableTabsValue2 = newTabName;
        } else {
          this.warningMsg('名称不能为空')
        }
        console.log(this.dataTree);

      },
      //删除课程节点
      removeTab(targetName) {

        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let tabs = this.editableTabs2;
          let activeName = this.editableTabsValue2;
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
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
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
      //警告信息
      warningMsg(msg) {
        this.$message({
          message: msg,
          type: 'warning'
        });
      },

      //添加子节点
      dialogV(data) {
        this.dialogVisible1 = true;
        this.appendData = data;
      },
      append() {
        if (this.formNode.name != '') {
          this.dialogVisible1 = false;
          let newChild = { id: id++, label: this.formNode.name, children: [] };
          if (!this.appendData.children) {
            this.$set(this.appendData, 'children', []);
          }
          this.appendData.children.push(newChild);
        }
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

      getCustomCourse(datasol) {
        axios.post('/teacherCMS/teacherCustomCourse', {
          data: {
            userID: this.userID,
            userType: this.userType,
          }
        }).then((res) => {
          let resD = res.data.techCosCou;
          //console.log(resD[0].course);
          if (datasol == 0 && resD.length != 0) {
            for (let i=0; i<resD.length; i++) {
              this.resDataTree.push(resD[i].course);
            }
          } else {
            this.warningMsg('服务器返回错误')
          }
          console.log(this.resDataTree[0]);
          this.dataTree = this.resDataTree[0];
        });
      },

    },
    mounted() {
      this.getCustomCourse(0)
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


</style>
