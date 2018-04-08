<template>
  <div class="testBaseM_cont">

    <!--题库管理-->
    <el-col :span="19">
      <!--头部按钮-->
      <span class="userM_But1">
        <el-button size="small" @click="delChecked" type="danger">删除选中用户</el-button>
      </span>

        <span class="userM_But2">
          <el-upload
            class="upload-demo"
            action="/teacherCMS/addExcelTest"
            :onError="uploadError"
            :beforeUpload="beforeAvatarUpload"
            :onSuccess="uploadSuccess"
            :show-file-list=false
            :on-exceed="handleExceed">
          <el-button size="small" type="primary">Excel导入试题</el-button>
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

      <!--显示所有题-->
      <el-table
        class="userM_el-table"
        :data="testAllData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        @selection-change="changeFun"
        style="width: 99%; margin-top: 10px">

        <el-table-column type="selection" width="40"></el-table-column>

        <el-table-column prop="num" label="序号" width="60">
        </el-table-column>

        <el-table-column prop="desc" label="序号" width="500">
        </el-table-column>

        <el-table-column prop="options" label="用户ID" width="360">
        </el-table-column>

        <el-table-column prop="major" label="专业" width="100">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini" type="warning"
              @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
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
  import tree from '@/components/courseTree/tree'
  import axios from 'axios'
  import core from '../../assets/js/core.js'

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
        total: '',
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        testBaseMTableData: [],
        testAllData: [],  //全部题
        currentRow: null,
        multipleSelection: [],  //复选框
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
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
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

    },
    mounted() {
      axios.get('/teacherCMS/getAllTest', {
        params: {
          user: this.username,
          userType: this.userType
        }
      }).then((res) => {
        this.testAllData = res.data;
        this.total = this.testAllData.length;
        //console.log(this.testAllData);
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
  .testBaseM_cont .userM_But1,.userM_But2 {
    float: left;
  }
  .testBaseM_cont .userM_But1 {
    margin-right: 10px;
  }

  .testBaseM_cont .el-dialog {
    width: 650px;
  }

</style>
