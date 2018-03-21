<template>
  <div class="testBaseM_cont">

    <!--题库管理-->
    <el-col :span="19">
      <!--头部按钮-->
        <span>
          <el-button  size="small" @click="">显示全部试题</el-button>
        </span>

        <span>
          <el-upload
            class="upload-demo"
            action=""
            :onError="uploadError"
            :beforeUpload="beforeAvatarUpload"
            :onSuccess="uploadSuccess"
            :show-file-list=false
            :on-exceed="handleExceed">
          <el-button size="small">Excel导入试题</el-button>
        </el-upload>
        </span>

      <el-dropdown>
        <span class="el-dropdown-link">

           <span class="elinput">
              <ul>
                  <li v-for="item in form.name">{{item}}/</li>
              </ul>
          </span>
        </span>
        <el-dropdown-menu slot="dropdown" class="dropdown">
          <div class="treeModle">
            <el-tree
              :data="data"
              ref="tree"
              show-checkbox
              node-key="id"
              @check-change="handleCheckChange"
              @node-click="handleClick">
            </el-tree>
          </div>
          <div class="buttons">
            <el-button type="primary" @click="getCheckedNodes">确定</el-button>
          </div>
        </el-dropdown-menu>
      </el-dropdown>

      <!--列表-->
      <el-table
        ref="singleTable"
        :data="testBaseMTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        highlight-current-row
        @current-change="handleCurrentChange"
        style="width: 99%; margin-top: 10px">

        <el-table-column label="序号" type="index" width="60">
        </el-table-column>

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

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
          </template>
        </el-table-column>

      </el-table>

    </el-col>
  </div>
</template>

<script>
  import tree from '@/components/courseTree/tree'
  import axios from 'axios'
  import core from '../../../server/utils/core.js'

  export default {
    name: 'testBaseM',
    data() {
      return {
        data: [],
        url:document.domain,
        user:this.$store.state.username,
        form: {
          theme:'',
          name: [],
          nameId:[],
          region: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          num:'',
          time:''
        },
        currentPage: 1,
        pagesize: 12,
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        testBaseMTableData: [],
        currentRow: null,
      }
    },
    computed: {},
    methods: {
      // 上传前判断是不是Excel文件
      beforeAvatarUpload(file) {
        let index = file.name.split(".");
        let isxls = index[index.length - 1];
        if (isxls == 'xlsx' || isxls == 'xls') {
          return true;
        } else {
          this.$message.error('只能导入是 xls 或者 xlsx格式!');
        }
      },
      // 上传成功后的回调
      uploadSuccess(res, file) {

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
        if(checked == true){
          //    console.log(this.form.name+"AAAA");
          //    this.form.name.push(data.label);
        }else{
          for(var i = 0;i < this.form.name.length;i++){
            if(this.form.name[i] == data.label){
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
        for(var i = 0;i < arr.length;i++){
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

    },
    mounted() {
      axios.get("http://" + this.url + ":8000/readJson/bannerLeftData", {
        params: {
          user: 234
        }
      }).then((res) => {
        this.data = res.data[0].children;
      }).catch(function (error) {
        console.log("error init." + error)
      });

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
          this.testBaseMTableData = resUserInfo;
          this.total = this.testBaseMTableData.length;
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

  .testBaseM_cont .el-table .cell {
    text-align: left;
    margin-left: 14px
  }
  .testBaseM_cont .elinput{
    width:486px;
    height:34px;
    border:1px solid #ccc;
    border-radius:4px;
    overflow:auto;
    background-color: #fff;
    margin-bottom: -14px;
  }
  .testBaseM_cont .elinput ul li{
    display:inline-block;
  }
  .buttons .el-button{
    width:100%;
  }
  .testBaseM_cont .buttons .el-button{
    margin-top:22px;
  }
  .dropdown{
    width:488px;
  }

  .el-table-column--selection .cell {
    padding-left: 0;
  }

  .block .el-button {
    float: left;
  }

  .testBaseM_cont span {
    display: inline-block;
  }

  .testBaseM_cont .el-dialog {
    width: 650px;
  }

</style>
