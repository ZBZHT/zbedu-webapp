<template>
  <div id="app" class="resourceCenter">
    <div class="nav">
      <navgation-head></navgation-head>
    </div>

    <div class="fileList-box">
      <el-upload
        class="upload-demo"
        action="/fileUpDown/upload"
        :onError="uploadError"
        :beforeUpload="beforeAvatarUpload"
        :onSuccess="uploadSuccess"
        :on-exceed="handleExceed"
        accept=".xlsx">
        <el-button class="uploadBut" size="medium " type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">温馨提示: 上传的文件不可超过600M</div>
      </el-upload>
      <!--对话框-->
      <el-dialog
        title="请选择上传文件的类型"
        :visible.sync="centerDialogVisible"
        width="25%"
        :show-close=false
        :close-on-press-escape=false
        center>
        <div style="margin-top: 20px; margin-left: 60px;">
          <el-radio v-model="radioJX" label="1" border size="medium">教学课件</el-radio>
          <el-radio v-model="radioJX" label="2" border size="medium">教学微课</el-radio>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="addArr">确 定</el-button>
  </span>
      </el-dialog>

      <br>
      <div>
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

          <!--全部教材-->
          <el-tab-pane label="全部教材" name="first">
            <el-table
              ref="multipleTable"
              :data="msgArr"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="名称" width="500">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column label="上传时间" width="300">
                <template slot-scope="scope">{{ scope.row.birthtime }}</template>
              </el-table-column>

              <el-table-column label="文件大小" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.size }}M</template>
              </el-table-column>

              <el-table-column width="120" class="tableName4">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="sendName(scope.row.name)">下载</el-button>
                  <el-button type="text" size="mini" @click="fileDelete(scope.row.name)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
           <!-- <div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>-->
          </el-tab-pane>

          <!--教学课件-->
          <el-tab-pane label="教学课件" name="second">
            <el-table
              ref="multipleTable"
              :data="courseWareArr"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="名称" width="500">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column label="上传时间" width="300">
                <template slot-scope="scope">{{ scope.row.birthtime }}</template>
              </el-table-column>

              <el-table-column label="文件大小" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.size }}M</template>
              </el-table-column>

              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="sendName(scope.row.name)">下载</el-button>
                  <el-button type="text" size="mini" @click="fileDelete(scope.row.name)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
           <!-- <div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>-->
          </el-tab-pane>

          <!--教学微课-->
          <el-tab-pane label="教学微课" name="third">
            <el-table
              ref="multipleTable"
              :data="videoArr"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="名称" width="500">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column label="上传时间" width="300">
                <template slot-scope="scope">{{ scope.row.birthtime }}</template>
              </el-table-column>

              <el-table-column label="文件大小" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.size }}M</template>
              </el-table-column>

              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="sendName(scope.row.name)">下载</el-button>
                  <el-button type="text" size="mini" @click="fileDelete(scope.row.name)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
            <!--<div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>-->
          </el-tab-pane>

          <!--其他教材-->
          <el-tab-pane label="其他教材" name="fourth">
            <el-table
              ref="multipleTable"
              :data="otherArr"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>

              <el-table-column label="名称" width="500">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>

              <el-table-column label="上传时间" width="300">
                <template slot-scope="scope">{{ scope.row.birthtime }}</template>
              </el-table-column>

              <el-table-column label="文件大小" show-overflow-tooltip>
                <template slot-scope="scope">{{ scope.row.size }}M</template>
              </el-table-column>

              <el-table-column width="120">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" @click="sendName(scope.row.name)">下载</el-button>
                  <el-button type="text" size="mini" @click="fileDelete(scope.row.name)">删除</el-button>
                </template>
              </el-table-column>

            </el-table>
           <!-- <div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>-->
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="footer">
      <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import navgationHead from '@/components/common/navgationHead'
  import footFooter from '@/components/common/footFooter'

  export default {
    name: 'sourceCenter',
    data () {
      return {
        msgArr:[],
        courseWareArr:[],
        videoArr:[],
        otherArr:[],
        activeName2: 'first',
        checked: true,
        multipleSelection: [],
        centerDialogVisible: false,
        radioJX: '1',
        url:document.domain
      }
    },
    computed:{
    },
    methods: {
      /*上传方法*/
      // 上传成功后的回调
      uploadSuccess (res, file) {
        if (res.fileMsg[0]) {
          this.msgArr.push(res.fileMsg[0]);
        }
      },
      // 上传错误
      uploadError (res, file, fileList) {
        console.log('上传失败，请重试！')
      },
      handleExceed(files, fileList) {
        this.$message.warning(`每次只能上传 1 个文件`);
      },
      addArr() {
        this.centerDialogVisible = false;
        if (this.radioJX == 1)
        {
          this.courseWareArr.push(this.msgArr[this.msgArr.length-1])
        }
        else if (this.radioJX == 2)
        {
          this.videoArr.push(this.msgArr[this.msgArr.length-1])
        }
        else
        {
          this.otherArr.push(this.msgArr[this.msgArr.length-1])
        }
      },
      // 上传前弹出对话框
      beforeAvatarUpload (file) {
      this.centerDialogVisible = true;
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },

      /*下载方法*/
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sendName(item){
        axios({
          method:'get',
          url:'/fileUpDown/download',
          responseType: 'blob',
          params:{
            downloadName:item
          }
        }).then((res) => { // 处理返回的文件流
          let content = res.data;
          let blob = new Blob([content]);
          if ('download' in document.createElement('a')) { // 非IE下载
            let elink = document.createElement('a');
            elink.download = item;
            elink.style.display = 'none';
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href);// 释放URL 对象
            document.body.removeChild(elink)
          } else { // IE10+下载
            navigator.msSaveBlob(blob, item)
          }
        })
      },
      fileDelete(item){
        axios({
          method:'get',
          url:'/fileUpDown/fileDelete',
          params:{
            downloadName:item
          }
        }).then((res) => { // 处理返回的文件流
          let resFileName = res.data.fileName;

          dellArrE(this.msgArr, resFileName);
          dellArrE(this.courseWareArr, resFileName);
          dellArrE(this.videoArr, resFileName);
          dellArrE(this.otherArr, resFileName);

          function dellArrE(arr, resFileName) {
            if (resFileName) {
              for (let i=0; i<arr.length; i++)
              {
                if (arr[i].name === resFileName)
                {
                  arr.splice(i,1);
                }
              }
            }
          }
        })
      },
    },
    mounted(){
      axios.get('/fileUpDown/loadFile',{
        params:{
          user:6666
        }
      }).then((res)=>{
          for (let i = 0; i < res.data.var.length; i++){
            if (res.data.var[i].size != 0){
              this.msgArr.push(res.data.var[i])
            }
          }
          //
          for ( let j = 0; j < this.msgArr.length; j++){
            let index = this.msgArr[j].name.split(".");
            let suffix = index[index.length-1];
            if (suffix == 'mp4' || suffix == 'rmvb' || suffix == 'avi'){
              this.videoArr.push(this.msgArr[j]);
            }else if(suffix == 'txt' || suffix == 'docx' || suffix == 'doc' || suffix == 'xlsx' || suffix == 'xls' || suffix == 'pdf' || suffix == 'ppt' || suffix == 'pptx'){
              this.courseWareArr.push(this.msgArr[j])
            }else {
              this.otherArr.push(this.msgArr[j])
            }
          }
        }
      );
    },
    components: {navgationHead, footFooter}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .resourceCenter .fileList-box {
    width: 1200px;
    margin: 0 auto;
  }

  .resourceCenter .el-table .cell{
    text-align: left;
  }

  .resourceCenter .el-upload__tip {
    text-align: left;
  }

  .resourceCenter .fileList-box .uploadBut {
    margin-top: 10px;
    margin-left: -68.5rem;
  }
  .resourceCenter .fileList-box {
    height: 60%;
  }
</style>
