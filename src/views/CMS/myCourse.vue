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
              v-for="item in resDataForm"
              :key="item.label"
              :label="item.label"
              :value="item.label">
            </el-option>
          </el-select>
        </el-form>
        <el-button type="primary" @click="last5" >新建目录</el-button>
        <span slot="footer" class="dialog-footer" style="padding: 10px 0 20px 20px;">
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
          <el-button @click="skip1()">跳&#8195;过</el-button>
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

                <el-table-column
                  label="课程名称"
                  width="200">
                  <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                      <p>课程简介: {{ scope.row.describe }}</p>
                      <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.label }}</el-tag>
                      </div>
                    </el-popover>
                  </template>
                </el-table-column>

                <el-table-column prop="teachingMaterial" label="课件名称" width="360"></el-table-column>

                <el-table-column
                  label="微课名称"
                  width="360">
                  <template slot-scope="scope">
                    <span v-if="scope.row.videoTitle.length>0">
                      {{ scope.row.videoTitle[0].videoTitle }}
                    </span>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
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
          <el-form-item label="课程简介" prop="describe">
            <el-input type="textarea"
                      v-model="editForm.describe"
                      :autosize="{ minRows: 2, maxRows: 2}">
            </el-input>
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
              class="upload-demo"
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

        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="closeEdit">取消</el-button>
          <el-button type="primary" @click="editCourse1('editForm')">确定</el-button>
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
        resDataForm: [],
        dataForm: [],
        courseIndex: 0,  //新增课程的index
        editableTabsValue: '',
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
            { min: 2, max: 30, message: '长度在 1 到 30 个字符', trigger: 'blur' }
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
      }
    },
    computed: {},
    methods: {
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
          this.resDataForm[this.tabIndex].course = this.dataForm;
          //console.log(this.resDataForm);
          console.log(this.resDataForm[this.tabIndex].course);
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
            this.dataForm = (this.resDataForm[i].course);
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
        this.courseIndex = index;
        this.editForm = this.dataForm[index];
        this.dialogVisible7 = true;
        this.videoTitle = '';
        if (this.editForm.videoTitle.length>0) {
          this.videoTitle = this.editForm.videoTitle[0].videoTitle
        }
        //console.log(this.editForm);
      },
      //编辑, 取消
      closeEdit() {
        this.dialogVisible7 = false;
        this.getCustomCourse();
      },
      //编辑, 确定
      editCourse1(form) {
          console.log(this.resDataForm[this.tabIndex].course);
        this.dialogVisible7 = false;
      },
      //编辑, 上传课件前
      editBeforeUpload1(file) {
        if (file.name != '') {
            if (this.value1 === this.resDataForm[this.resDataForm.length-1].label) {
                let EE = this.resDataForm[this.resDataForm.length-1].course;
              EE[EE.length-1].teachingMaterial= file.name;
              //console.log(EE);
            } else {
              this.dataForm[this.courseIndex].teachingMaterial = file.name;
            }
          //console.log(this.editForm);

        }
      },
      //编辑, 上传微课前
      editBeforeUpload2(file) {
        if (file.name != '') {
            this.videoTitle = file.name;
          if (this.dataForm[this.courseIndex].videoTitle.length === 0) {
            let EE = {videoTitle: file.name};
            this.dataForm[this.courseIndex].videoTitle.push(EE);
          } else {
            this.dataForm[this.courseIndex].videoTitle[0].videoTitle = file.name;
          }
          this.successMsg('正在上传,上传完成将会有提示信息!');
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
          for (let i=0; i<=this.resDataForm.length; i++) {
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
        if (this.form.name != '') {
          if (this.resDataForm.length === 0) {
            this.resDataForm.push({ label: this.form.name, course: [], });
            //this.dataForm = (this.resDataForm[0].course);
            this.dialogVisible1 = false;
            this.dialogVisible8 = true;
          } else {
            if (this.resDataForm[this.resDataForm.length-1].label === this.form.name) {
              this.dialogVisible1 = false;
              this.dialogVisible8 = true;
            } else {
              this.resDataForm.push({ label: this.form.name, course: [], });
              this.courseIndex = Number(this.resDataForm.length-1);
              this.dialogVisible1 = false;
              this.dialogVisible8 = true;
            }
          }
        } else {
          this.warningMsg('名称不能为空')
        }
      },
      //目录,课程名称
      addCourse1() {
        if (this.courseForm1.name != '') {
            console.log(this.dataForm);
          let EE = this.resDataForm[this.resDataForm.length-1].course;
          if (EE.length === 0) {
            let newCourse = { label : this.courseForm1.name, describe: '', teachingMaterial: '', videoTitle: [] };
            this.resDataForm[this.courseIndex].course.push(newCourse);
            //this.dataForm = newCourse;
          } else if (EE[EE.length-1].label != this.courseForm1.name) {
            let newCourse = { label : this.courseForm1.name, describe: '', teachingMaterial: '', videoTitle: [] };
            this.resDataForm[this.courseIndex].course.push(newCourse);
            //this.dataForm = newCourse;
          }
          console.log(this.dataForm);
          this.dialogVisible8 = false;
          this.dialogVisible9 = true;
        } else {
          this.warningMsg('名称不能为空')
        }
      },
      //目录,课程简介
      addDescribe1() {
        if (this.describeNode1.describe != '') {
          let EE = this.resDataForm[this.resDataForm.length-1].course;
          EE[EE.length-1].describe = this.describeNode1.describe;
          this.dialogVisible9 = false;
          this.dialogVisible5 = true;
          console.log(EE);
        } else {
          this.warningMsg('课程简介不能为空')
        }
      },
      //添加课程
      addCourse() {
        if (this.courseForm.name != '') {
          let EE = this.resDataForm[this.courseIndex].course;
          if (EE[EE.length-1].label != this.courseForm.name) {
            let newCourse = { label : this.courseForm.name, describe: '', teachingMaterial: '', videoTitle: [] };
            this.resDataForm[this.courseIndex].course.push(newCourse);
            this.dialogVisible4 = false;
            this.dialogVisible2 = true;
          } else if (EE[EE.length-1].label === this.courseForm.name) {
            this.dialogVisible4 = false;
            this.dialogVisible2 = true;
          }
          console.log(this.resDataForm[this.courseIndex]);
        } else {
          this.warningMsg('名称不能为空')
        }
      },
      //添加课程简介
      addDescribe() {
        if (this.describeNode.describe != '') {
          let EE = this.resDataForm[this.courseIndex].course;
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
          this.dialogVisible9 = true;
        } else {
          this.dialogVisible5 = false;
          this.dialogVisible2 = true;
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
      //跳过
      skip1() {
        this.dialogVisible5 = false;
        this.dialogVisible6 = true;
      },
      skip2() {
        this.dialogVisible6 = false;
        this.updateCustomCourse();
        this.form.name = '';
      },
      //上传课件成功
      uploadSuccess1(response, file, fileList) {
          //console.log(response.code);
          if (response.code === 0) {
              this.getCustomCourse();
            this.successMsg(file.name + '已上传成功!');
          }
      },
      //上传课件前
      beforeUpload1(file) {
        if (file.name != '') {
          let EE = this.resDataForm[this.courseIndex].course;
          EE[EE.length-1].teachingMaterial = file.name;
          this.dialogVisible5 = false;
          this.dialogVisible6 = true;
        }
      },
     //上传微课成功
      uploadSuccess2(response, file, fileList) {
        if (response.code === 0) {
          this.updateCustomCourse();
          this.form.name = '';
          this.successMsg(file.name + '已上传成功!');
        }
      },
      //上传微课前
      beforeUpload2(file) {
        if (file.name != '') {
          let EE = this.resDataForm[this.courseIndex].course;
          let newCourse = { videoTitle : file.name, };
          EE[EE.length-1].videoTitle.push(newCourse);
          //console.log(this.resDataForm);
          this.successMsg('正在上传,上传完成将会有提示信息!');
          this.dialogVisible6 = false;
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
              this.dataForm = (this.resDataForm[0].course);
            }
            this.editableTabsValue = (this.resDataForm[0].label);
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
