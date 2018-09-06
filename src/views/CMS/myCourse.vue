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
      <!--课程, 目录-->
      <el-dialog
        class="dialog3"
        title="选择已有课程或者新建目录"
        width="35%"
        :close-on-click-modal="false"
        style="height: 430px;"
        :visible.sync="dialogVisible"
        :before-close="handleClose">
        <el-form label-width="80px" style="margin-bottom: 10px;" class="demo-ruleForm">
          <span>已有目录：</span>
          <el-select v-model="value1" filterable placeholder="请选择已有课程">
            <el-option
              v-for="(item) in resDataForm"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
          <el-button type="primary" @click="last5" style="float: right">新建目录</el-button>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="selectCourse(value1)">下一步</el-button>
        </span>
      </el-dialog>

      <!--创建目录-->
      <el-dialog
        class="dialog3"
        title="请输入目录"
        width="35%"
        :close-on-click-modal="false"
        style="height: 430px;"
        :visible.sync="dialogVisible1"
        :before-close="handleClose">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="目录名称" prop="name">
            <el-input v-model="form.name" autofocus="autofocus"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="last6" style="float:left;">上一步</el-button>
          <el-button type="primary" @click="addTab('form')">下一步</el-button>
        </span>
      </el-dialog>

      <!--目录, 课程名称-->
      <el-dialog
        class="dialog3"
        title="输入课程名称"
        width="35%"
        :close-on-click-modal="false"
        style="height: 430px;"
        :visible.sync="dialogVisible8"
        :before-close="handleClose">
        <el-form :model="courseForm1" :rules="rules" ref="course1Form" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="courseForm1.name" autofocus="autofocus"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="last7" style="float:left;">上一步</el-button>
          <el-button type="primary" @click="addCourse1()">下一步</el-button>
        </span>
      </el-dialog>

      <!--目录, 课程简介-->
      <el-dialog
        class="dialog3"
        width="35%"
        title="请输入课程简介"
        :close-on-click-modal="false"
        style="height: 430px;padding-bottom: 0"
        :visible.sync="dialogVisible9"
        :before-close="handleClose">
        <el-form :model="describeNode1" :rules="rules" ref="describeNode1" class="demo-ruleForm">
          <el-form-item prop="describe">
            <el-input type="textarea"
                      autofocus="autofocus"
                      v-model="describeNode1.describe"
                      :autosize="{ minRows: 2, maxRows: 2}">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="padding-top: 0">
          <el-button type="primary" @click="last8" style="float:left;">上一步</el-button>
          <el-button type="primary" @click="addDescribe1('describeNode')">下一步</el-button>
        </span>
      </el-dialog>

      <!--课程名称   @keyup.enter="addCourse"-->
      <el-dialog
        class="dialog3"
        title="输入课程名称"
        width="35%"
        :close-on-click-modal="false"
        style="height: 430px;"
        :visible.sync="dialogVisible4"
        :before-close="handleClose">
        <el-form :model="courseForm" :rules="rules" ref="courseForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="name">
            <el-input v-model="courseForm.name" autofocus="autofocus"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="last1" style="float:left;">上一步</el-button>
          <el-button type="primary" @click="addCourse()">下一步</el-button>
        </span>
      </el-dialog>

      <!--课程简介-->
      <el-dialog
        class="dialog3"
        width="35%"
        title="请输入课程简介"
        :close-on-click-modal="false"
        style="height: 430px;padding-bottom: 0"
        :visible.sync="dialogVisible2"
        :before-close="handleClose">
        <el-form :model="describeNode" :rules="rules" ref="describeNode" class="demo-ruleForm">
          <el-form-item prop="describe">
            <el-input type="textarea"
                      autofocus="autofocus"
                      v-model="describeNode.describe"
                      :autosize="{ minRows: 2, maxRows: 2}">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="padding-top: 0">
          <el-button type="primary" @click="last2" style="float:left;">上一步</el-button>
          <el-button type="primary" @click="addDescribe('describeNode')">下一步</el-button>
        </span>
      </el-dialog>

      <!--上传课件-->
      <el-dialog
        class="dialog3"
        title="请上传课件"
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible5"
        style="height: 430px;text-align: center"
        :before-close="handleClose">
        <el-upload
          class="upload-demo"
          action="/teacherCMS/uploadCourse"
          :on-success="uploadSuccess1"
          :before-upload="beforeUpload1"
          :show-file-list="false"
          :multiple="false"
          accept=".ppt,.pdf">
          <el-button type="primary" style="margin-bottom: 40px;">点击上传课件</el-button>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="last3"  style="float:left;">上一步</el-button>
        </span>
      </el-dialog>

      <!--上传微课-->
      <el-dialog
        class="dialog4"
        title="请上传微课"
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible6"
        style="height: 430px;text-align: center"
        :before-close="handleClose">
        <el-upload
          class="upload-demo"
          action="/teacherCMS/uploadCourse"
          :on-success="uploadSuccess2"
          :before-upload="beforeUpload2"
          :show-file-list="false"
          :multiple="false"
          accept=".mp4,.rmvb,.avi">
          <el-button type="primary" style="margin-bottom: 40px;">点击上传微课</el-button>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="last4" style="float:left;">上一步</el-button>
          <el-button @click="skip2()">跳&#8195;过</el-button>
        </span>
      </el-dialog>

      <!--课程标签-->
      <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="tabClick">
        <el-tab-pane
          v-for="(item, index) in resDataForm"
          :key="item.label"
          :label="item.label"
          :name="item.label"
          :closable="false">

          <div class="custom-tree-container">
            <div class="block">

              <el-table
                :data="dataForm"
                style="width: 100%">

                <el-table-column label="课程名称" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.label }}</span>
                  </template>
                </el-table-column>

                <el-table-column prop="teachingMaterial" label="课件名称"></el-table-column>

                <el-table-column label="微课名称">
                  <template slot-scope="scope">
                    <span v-if="scope.row.videoTitle.length>0">
                      {{ scope.row.videoTitle[0].videoTitle }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column label="工作页名称">
                  <template slot-scope="scope">
                    <span>{{ scope.row.workPage }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="flash动画">
                  <template slot-scope="scope">
                    <span>{{ scope.row.flash2d }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="150">
                  <template slot-scope="scope">
                    <el-button size="mini"
                               @click="editCourse(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

            </div>
          </div>

        </el-tab-pane>
      </el-tabs>

      <!--编辑  :disabled="true"-->
      <el-dialog
        class="dialog6 dialog7"
        title="编辑课程"
        width="40%"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible7"
        :before-close="handleClose">
        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="课程名称" prop="label">
            <el-input v-model="editForm.label"></el-input>
          </el-form-item>

          <el-form-item label="课件名称" prop="teachingMaterial">
            <el-input v-model="editForm.teachingMaterial" style="width:70%;"></el-input>
            <el-upload
              class="upload-demo"
              style="float:right;"
              action="/teacherCMS/uploadCourse"
              :on-success="uploadSuccess1"
              :before-upload="editBeforeUpload1"
              :show-file-list="false"
              :multiple="false"
              accept=".ppt,.pdf">
              <el-button type="primary">上传课件</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="微课名称" prop="videoTitle">
            <el-input v-model="videoTitle" style="width:70%;"></el-input>
            <el-upload
              class="upload-demo1"
              style="float:right;"
              action="/teacherCMS/uploadCourse"
              :on-success="uploadSuccess2"
              :before-upload="editBeforeUpload2"
              :show-file-list="false"
              :multiple="false"
              accept=".mp4,.rmvb,.avi">
              <el-button type="primary">上传微课</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="工作页名称" prop="teachingMaterial">
            <el-input v-model="editForm.workPage" style="width:70%;"></el-input>
            <el-upload
              class="upload-demo"
              style="float:right;"
              action="/teacherCMS/uploadCourse"
              :on-success="uploadSuccess1"
              :before-upload="editBeforeUpload3"
              :show-file-list="false"
              :multiple="false"
              accept=".pdf">
              <el-button type="primary">上传工作页</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item label="动画名称" prop="videoTitle">
            <el-input v-model="editForm.flash2d" style="width:70%;"></el-input>
            <el-upload
              class="upload-demo1"
              style="float:right;"
              action="/teacherCMS/uploadCourse"
              :on-success="uploadSuccess2"
              :before-upload="editBeforeUpload4"
              :show-file-list="false"
              :multiple="false"
              accept=".mp4,.rmvb,.avi">
              <el-button type="primary">上传动画</el-button>
            </el-upload>
          </el-form-item>

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeEdit">取消</el-button>
          <el-button type="primary" @click="editCourse1('editForm')">确定</el-button>
        </span>
      </el-dialog>

      <!--上传工作页-->
      <el-dialog
        title="请上传工作页"
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible10"
        style="height: 430px;text-align: center"
        :before-close="handleClose">
        <el-upload
          class="upload-demo"
          action="/teacherCMS/uploadCourse"
          :on-success="uploadSuccess1"
          :before-upload="beforeUpload10"
          :show-file-list="false"
          :multiple="false"
          accept=".pdf">
          <el-button type="primary" style="margin-bottom: 40px;">点击上传工作页</el-button>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="last10"  style="float:left;">上一步</el-button>
          <el-button @click="skip10()">跳&#8195;过</el-button>
        </span>
      </el-dialog>

      <!--上传flash动画-->
      <el-dialog
        title="请上传flash动画"
        width="35%"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible11"
        style="height: 430px;text-align: center"
        :before-close="handleClose">
        <el-upload
          class="upload-demo"
          action="/teacherCMS/uploadCourse"
          :on-success="uploadSuccess2"
          :before-upload="beforeUpload11"
          :show-file-list="false"
          :multiple="false"
          accept=".mp4,.rmvb,.avi">
          <el-button type="primary" style="margin-bottom: 40px;">点击上传flash动画</el-button>
        </el-upload>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="last11" style="float:left;">上一步</el-button>
          <el-button @click="skip11()">创建完成</el-button>
        </span>
      </el-dialog>

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
        loading1: true,
        resDataForm: [],
        dataForm: [],
        courseIndex: 0,  //新增课程的index
        editableTabsValue: '2',
        tabIndex: 0,
        dialogVisible: false,
        dialogVisible1: false,
        dialogVisible2: false,
        dialogVisible3: false,
        dialogVisible4: false,
        dialogVisible5: false,
        dialogVisible6: false,
        dialogVisible7: false,
        dialogVisible8: false,
        dialogVisible9: false,
        dialogVisible10: false,
        dialogVisible11: false,
        editForm: [],
        form: { name: '', },
        courseForm: { name: '', },
        courseForm1: { name: '', },
        formNode: { name: '', },
        describeNode: { describe: '', },
        describeNode1: { describe: '', },
        rules: {
          name: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          label: [
            { required: true, message: '请输入课程名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          describe: [
            { required: true, message: '请输入课程简介', trigger: 'blur' },
            { min: 2, max: 200, message: '长度在 1 到 200 个字符', trigger: 'blur' }
          ],
          teachingMaterial: [
            { required: true, message: '请上传课件', trigger: 'blur' },
            { min: 2, max: 60, message: '长度在 1 到 60 个字符', trigger: 'blur' }
          ],
          videoTitle: [
            { required: true, message: '请上传微课', trigger: 'blur' },
          ],
        },
        userID: this.$store.state.userID,
        userType: this.$store.state.userType,
        courseItem: '', //点击课程目录的名称
        appendData: '',
        appendNode: '',
        value1: '',
        videoTitle:'',
        upDate:this.resDataForm,
        newFileName1:'',
        newFileName2:'',
        fileType:'',
      }
    },
    computed: {},
    methods: {
      //加载遮蔽层
      openFullScreen() {
        this.$loading({
          lock: true,
          text: '正在上传，请稍等！',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      },
      //删除
      handleDelete(index, row) {
        //console.log(row.label);
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            //console.log(this.dataForm);
          for (let i=0; i<this.dataForm.length; i++) {
            if (this.dataForm[i].label === row.label) {
              let resultEE = core.remove(this.dataForm, this.dataForm[i]);
              this.dataForm = resultEE;
            }
          }
          this.resDataForm[this.tabIndex].children = this.dataForm;
          //console.log(this.resDataForm);
          //console.log(this.resDataForm[this.tabIndex].children);
          this.updateCustomCourse();
          this.successMsg('删除成功!')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //点击标签
      tabClick(tab, event){
          //console.log(tab.label);
        //this.dataForm = [];
        for (let i=0; i<this.resDataForm.length; i++) {
          if (this.resDataForm[i].label == tab.label) {
            this.dataForm = (this.resDataForm[i].children);
            this.tabIndex = i;
            this.editableTabsValue = (this.resDataForm[i].label);
            //console.log(this.dataForm);
          }
        }
      },
      //确认关闭
      handleClose(done) {
        done();
      },
     //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //编辑
      editCourse(index, row) {
        //console.log(this.resDataForm[index].label);
        this.courseIndex = index;
        this.editForm = this.dataForm[index];
        //console.log(this.editForm);
        this.dialogVisible7 = true;
        this.videoTitle = '';
        if (this.editForm.videoTitle.length>0) {
          this.videoTitle = this.editForm.videoTitle[0].videoTitle
        }
        this.newFileName1 = '';
        this.newFileName1 = this.resDataForm[this.tabIndex].label;
        this.newFileName2 = '';
        this.newFileName2 = this.editForm.label;
        //console.log(this.newFileName1);
        //console.log(this.newFileName2);
      },
      //编辑, 取消
      closeEdit() {
        this.dialogVisible7 = false;
        this.getCustomCourse();
      },
      //编辑, 确定
      editCourse1(form) {
          //console.log(this.resDataForm[this.tabIndex].children);
        this.getCustomCourse();
        this.dialogVisible7 = false;
      },
      //编辑, 上传课件前
      editBeforeUpload1(file) {
        this.openFullScreen();
        this.fileType = '';
        this.fileType = '-课件';
        if (file.name != '') {
          if (this.value1 === this.resDataForm[this.resDataForm.length-1].label) {
            let EE = this.resDataForm[this.resDataForm.length-1].course;
            EE[EE.length-1].teachingMaterial= file.name;
            this.updateCustomCourse();
            //console.log(EE);
          } else {
            this.dataForm[this.courseIndex].teachingMaterial = file.name;
            this.updateCustomCourse();
          }
        }
      },
      //编辑, 上传微课前
      editBeforeUpload2(file) {
        this.openFullScreen();
        if (file.name != '') {
            this.videoTitle = file.name;
          if (this.dataForm[this.courseIndex].videoTitle.length === 0) {
            let EE = {videoTitle: file.name};
            this.dataForm[this.courseIndex].videoTitle.push(EE);
          } else {
            this.dataForm[this.courseIndex].videoTitle[0].videoTitle = file.name;
          }
        }
        this.updateCustomCourse();
      },
      //编辑, 上传工作页前
      editBeforeUpload3(file) {
        this.openFullScreen();
        this.fileType = '';
        this.fileType = '-工作页';
        if (file.name != '') {
          if (this.value1 === this.resDataForm[this.resDataForm.length-1].label) {
            let EE = this.resDataForm[this.resDataForm.length-1].course;
            EE[EE.length-1].workPage= file.name;
            //console.log(EE);
            this.updateCustomCourse();
          } else {
            this.dataForm[this.courseIndex].workPage = file.name;
            this.updateCustomCourse();
          }
        }
      },
      //编辑, 上传动画前
      editBeforeUpload4(file) {
        this.openFullScreen();
        if (file.name != '') {
          if (this.value1 === this.resDataForm[this.resDataForm.length-1].label) {
            let EE = this.resDataForm[this.resDataForm.length-1].course;
            EE[EE.length-1].flash2d= file.name;
            this.updateCustomCourse();
            //console.log(EE);
          } else {
            this.dataForm[this.courseIndex].flash2d = file.name;
            this.updateCustomCourse();
          }
        }
      },
      //删除课程标签
      removeTab(targetName) {
        this.$confirm('此操作将永久删除该目录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //console.log(targetName);
          for(let i=0; i<this.resDataForm.length; i++) {
            if (this.resDataForm[i].label == targetName) {
              this.resDataForm = core.remove(this.resDataForm, this.resDataForm[i]);
            }
          }
          //console.log(this.resDataForm);
          this.updateCustomCourse();
          this.editableTabsValue = this.resDataForm[this.resDataForm.length-1].label;
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
      //选择课程
      selectCourse(value) {
        if (value) {
          this.dialogVisible = false;
          this.dialogVisible4 = true;
          for (let i=0; i<this.resDataForm.length; i++) {
            if (this.resDataForm[i].label === value) {
                //console.log(this.resDataForm[i]);
              this.courseIndex = i;
              //console.log(this.value1);
            }
          }
        }
      },
      //课程目录
      addTab(targetName) {
        let p1 = new Promise((resolve, reject) => {
          if (this.form.name !== '') {
            resolve('name不为空')
          } else {
            this.warningMsg('目录名称不能为空')
          }
        });

        let p2 = new Promise((resolve, reject) => {
          if (this.resDataForm.length >1) {
            for (let i = 0; i < this.resDataForm.length; i++) {
              //console.log(this.form.name);
              //console.log(this.resDataForm[i].label);
              if (this.resDataForm[i].label === this.form.name) {
                this.courseIndex = '';
                this.courseIndex = i;
                resolve('dupName');
                //this.warningMsg('目录名重复，请换个名字！');
              }
            }
            setTimeout(function () { resolve('name不重复'); },100)
          } else {
            if (this.resDataForm[0] === undefined) {
              resolve('name不重复');
            } else {
              if (this.resDataForm[0].label === this.form.name) {
                this.courseIndex = '';
                this.courseIndex = 0;
                resolve('dupName');
                //this.warningMsg('目录名重复，请换个名字！');
              } else {
                resolve('name不重复');
              }
            }
          }
        });

        Promise.all([p1, p2]).then((result) => {
          console.log(result);
          if (result[result.length-1] === 'dupName') { //重名
            //console.log(this.resDataForm[this.courseIndex]);
            this.dialogVisible1 = false;
            this.dialogVisible8 = true;
          } else { //不重名
            if (this.resDataForm.length === 0) {
              this.resDataForm.push({ label: this.form.name, children: [], });
              //this.dataForm = (this.resDataForm[0].children);
              this.dialogVisible1 = false;
              this.dialogVisible8 = true;
            } else {
              if (this.resDataForm[this.resDataForm.length-1].label === this.form.name) {
                this.dialogVisible1 = false;
                this.dialogVisible8 = true;
              } else {
                this.resDataForm.push({ label: this.form.name, children: [], });
                this.courseIndex = Number(this.resDataForm.length-1);
                this.dialogVisible1 = false;
                this.dialogVisible8 = true;
              }
            }
          }
          this.newFileName1 = '';
          this.newFileName1 = this.form.name;
        }).catch((error) => {
          console.log(error)
        });
      },
      //目录,课程名称
      addCourse1() {
          //console.log(this.courseForm1.name);
        let formIndex = this.resDataForm[this.courseIndex];
        let name = this.courseForm1.name;
        //console.log(formIndex);
        let p1 = new Promise((resolve, reject) => {
          if (name !== '') {
            resolve('name不为空')
          } else {
            this.warningMsg('课程名称不能为空')
          }
        });

        let p2 = new Promise((resolve, reject) => {
            let code = 0;
            if (formIndex.label !== undefined) {
              let EE = formIndex.children;
              for (let i = 0; i < EE.length; i++) {
                if (EE[i].label === name) {
                    code = 1;
                  this.warningMsg('课程名称重复，请换个名称！')
                }
              }
            }
            setTimeout(function () {
              if (code === 0) {
                resolve('课程名称不重复')
              }
            },100)
        });

        Promise.all([p1, p2]).then((result) => {
          //console.log(result);
          if (formIndex.label !== undefined) {
            let EE = formIndex.children;
            if (EE.length === 0) {
              let newCourse = { label : name, describe: '', teachingMaterial: '', videoTitle: [], flash2d:'', workPage: ''};
              formIndex.children.push(newCourse);
              //this.dataForm = newCourse;
            } else if (EE[EE.length-1].label !== name) {
              let newCourse = { label : name, describe: '', teachingMaterial: '', videoTitle: [] , flash2d:'', workPage: ''};
              formIndex.children.push(newCourse);
              //this.dataForm = newCourse;
            }
          }
          this.newFileName2 = '';
          this.newFileName2 = name;
          //console.log(this.newFileName2);
          this.dialogVisible8 = false;
          this.dialogVisible5 = true;

          this.updateCustomCourse();
        }).catch((error) => {
          console.log(error)
        });
      },
      //目录,课程简介
      addDescribe1() {
        if (this.describeNode1.describe != '') {
          let EE = this.resDataForm[this.resDataForm.length-1].children;
          EE[EE.length-1].describe = this.describeNode1.describe;
          this.dialogVisible9 = false;
          this.dialogVisible5 = true;
          //console.log(EE);
        } else {
          this.warningMsg('课程简介不能为空')
        }
        this.updateCustomCourse();
      },
      //添加课程
      addCourse() {
        if (this.courseForm.name != '') {
          let EE = this.resDataForm[this.courseIndex].children;
          if (EE[EE.length-1].label != this.courseForm.name) {
            let newCourse = { label : this.courseForm.name, describe: '', teachingMaterial: '', videoTitle: [] };
            this.resDataForm[this.courseIndex].children.push(newCourse);
            this.dialogVisible4 = false;
            this.dialogVisible5 = true;
          } else if (EE[EE.length-1].label === this.courseForm.name) {
            this.dialogVisible4 = false;
            this.dialogVisible5 = true;
          }
          this.newFileName1 = '';
          this.newFileName1 = this.value1;
          this.newFileName2 = '';
          this.newFileName2 = this.courseForm.name;
          console.log(this.newFileName1);
          console.log(this.newFileName2);
          //console.log(this.resDataForm[this.courseIndex]);
        } else {
          this.warningMsg('名称不能为空')
        }
      },
      //添加课程简介
      addDescribe() {
        if (this.describeNode.describe != '') {
          let EE = this.resDataForm[this.courseIndex].children;
          EE[EE.length-1].describe = this.describeNode.describe;
          this.dialogVisible2 = false;
          this.dialogVisible5 = true;
          console.log(EE);
        } else {
          this.warningMsg('课程简介不能为空')
        }
      },
      //上一步
      last1() {
        this.dialogVisible4 = false;
        this.dialogVisible = true;
      },
      last2() {
        this.dialogVisible2 = false;
        this.dialogVisible4 = true;
      },
      last3() {
        //console.log(this.resDataForm[this.resDataForm.length-1].label);
        //console.log(this.form.name);
        if (this.resDataForm[this.resDataForm.length-1].label === this.form.name) {
          this.dialogVisible5 = false;
          this.dialogVisible8 = true;
        } else {
          this.dialogVisible5 = false;
          this.dialogVisible4 = true;
        }
      },
      last4() {
        this.dialogVisible6 = false;
        this.dialogVisible5 = true;
      },
      last5() {
        this.dialogVisible = false;
        this.dialogVisible1 = true;
      },
      last6() {
        this.dialogVisible1 = false;
        this.dialogVisible = true;
      },
      last7() {
        this.dialogVisible8 = false;
        this.dialogVisible1 = true;
      },
      last8() {
        this.dialogVisible9 = false;
        this.dialogVisible8 = true;
      },
      last10() {
        this.dialogVisible10 = false;
        this.dialogVisible6 = true;
      },
      last11() {
        this.dialogVisible11 = false;
        this.dialogVisible10 = true;
      },
      //跳过
      skip1() {
        this.dialogVisible5 = false;
        this.dialogVisible6 = true;
      },
      skip2() {
        let EE = this.resDataForm[this.courseIndex].children;
        let newCourse = { videoTitle : '', };
        EE[EE.length-1].videoTitle.push(newCourse);
        this.dialogVisible6 = false;
        this.dialogVisible10 = true;
        this.form.name = '';
      },
      skip10() {
        this.dialogVisible10 = false;
        this.dialogVisible11 = true;
        this.getCustomCourse();
      },
      skip11() {
        this.dialogVisible11 = false;
        this.updateCustomCourse();
        this.getCustomCourse();
      },

      //上传课件前
      beforeUpload1(file) {
        this.openFullScreen();
        if (file.name != '') {
          let EE = this.resDataForm[this.courseIndex].children;
          EE[EE.length-1].teachingMaterial = file.name;
          this.updateCustomCourse();
          this.getCustomCourse();
        }
        this.fileType = '';
        this.fileType = '-课件';
      },
      //上传工作页前
      beforeUpload10(file) {
        this.openFullScreen();
        if (file.name != '') {
          let EE = this.resDataForm[this.courseIndex].children;
          EE[EE.length-1].workPage = file.name;
          this.updateCustomCourse();
          this.getCustomCourse();
        }
        this.fileType = '';
        this.fileType = '-工作页';

      },
      //上传微课前
      beforeUpload2(file) {
        this.fileType = '';
        this.fileType = '微课';
        this.openFullScreen();
        if (file.name != '') {
          let EE = this.resDataForm[this.courseIndex].children;
          let newCourse = { videoTitle : file.name, };
          EE[EE.length-1].videoTitle.push(newCourse);
          //console.log(this.resDataForm);
          this.updateCustomCourse();
          this.getCustomCourse();
        }
      },
      //上传动画前
      beforeUpload11(file) {
        this.fileType = '';
        this.fileType = '动画';
        this.openFullScreen();
        if (file.name != '') {
          let EE = this.resDataForm[this.courseIndex].children;
          EE[EE.length-1].flash2d = file.name;
        }
        this.updateCustomCourse();
        this.getCustomCourse();
      },

      //上传课件和工作页成功
      uploadSuccess1(response, file, fileList) {
        if (response.code === 0) {
          //发送newFileName
          axios.post('/teacherCMS/uploadCourseSec', {
            data: {
              newFileName1: this.newFileName1,
              newFileName2: this.newFileName2,
              fileName: file.name,
              fileType: this.fileType,
            }
          }).then((res) => {
            if (res.data.code === 0) {
              this.$loading().close();
              if (this.dialogVisible7 === false) {
                if (this.fileType === '-课件') {
                  this.dialogVisible5 = false;
                  this.dialogVisible6 = true;
                } else if (this.fileType === '-工作页') {
                  this.dialogVisible10 = false;
                  this.dialogVisible11 = true;
                }
              }
              this.successMsg(file.name + '上传的文件已处理完!');
            }
          });
        }
      },

     //上传微课或者动画成功
      uploadSuccess2(response, file, fileList) {
        if (response.code === 0) {
          //发送newFileName
          axios.post('/teacherCMS/uploadMove', {
            data: {
              newFileName1: this.newFileName1,
              newFileName2: this.newFileName2,
              fileName: file.name,
            }
          }).then((res) => {
            if (res.data.code === 0) {
              this.form.name = '';
              this.$loading().close();
              if (this.dialogVisible7 === false) {
                if (this.fileType === '微课') {
                  this.dialogVisible6 = false;
                  this.dialogVisible10 = true;
                } else if (this.fileType === '动画') {
                  this.dialogVisible11 = false;
                }
              }
              this.successMsg(file.name + '已上传成功!');
            }
          });

        }
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
      updateCustomCourse() {
        axios.post('/teacherCMS/addCustomCourse', {
          data: {
            userID: this.userID,
            userType: this.userType,
            tab: this.resDataForm,
          }
        }).then((res) => {
          let resD = res.data;
          if (resD.code != 0) {
            this.warningMsg('服务器返回错误');
          }
          //console.log(this.resDataForm[0]);
          //this.dataForm.push(this.resDataForm[0]);
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
          if (res.data) {
            let resD = res.data.techCosCou[0].tab;
            this.resDataForm = resD;
            if (this.dataForm == '') {
                if (this.resDataForm[0] !== undefined) {
                  this.dataForm = (this.resDataForm[0].children);
                }
            }
            if (this.resDataForm[0] !== undefined) {
              this.editableTabsValue = (this.resDataForm[0].label);
            }
          } else {
            this.warningMsg('服务器返回错误')
          }
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
