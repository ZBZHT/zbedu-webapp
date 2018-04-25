<template>
  <div>
    <div>
      <navgation-head></navgation-head>
    </div>

    <div class="resourceCenter">

    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="全部教程" active>
          <el-table
            ref="multipleTable"
            :data="msgArr"
            tooltip-effect="dark"
            style="width: 90%"
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
        </b-tab>
        <b-tab title="教学课件">
          <el-table
            ref="multipleTable"
            :data="courseWareArr"
            tooltip-effect="dark"
            style="width: 90%"
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
        </b-tab>
        <b-tab title="教学微课">
          <el-table
            ref="multipleTable"
            :data="videoArr"
            tooltip-effect="dark"
            style="width: 90%"
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
        </b-tab>
        <b-tab title="其他教材">
          <el-table
            ref="multipleTable"
            :data="otherArr"
            tooltip-effect="dark"
            style="width: 90%"
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
        </b-tab>

        <el-upload
          class="upload-demo1"
          action="/fileUpDown/upload"
          :onError="uploadError"
          :beforeUpload="beforeAvatarUpload"
          :onSuccess="uploadSuccess"
          :on-exceed="handleExceed"
          accept=".xlsx">
          <el-button class="uploadBut" size="medium " type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">温馨提示: 上传的文件不可超过1000M</div>
        </el-upload>
      </b-tabs>

      <span class="file-up">文件上传</span>

    </b-card>

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

      <!-- <div style="margin-top: 20px">
             <el-button @click="toggleSelection()">取消选择</el-button>
             <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
           </div>-->
    </div>

    <div>
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
  .resourceCenter {
    min-width: 1200px;
  }
  .resourceCenter .card {
    margin-top: 3px;
    border: none;
  }
  .resourceCenter .card-header {
    background-color: #d2d2d2;
  }
  .resourceCenter .col-auto {
    height: 38rem;
    margin-top: 2.5rem;
  }
  .resourceCenter .nav-pills .nav-link {
    padding: 0.3rem 4.5rem;
    border-bottom: 2px solid white;
    border-radius: 0;
  }
  .resourceCenter .nav-pills .nav-link.active, .nav-pills .show > .nav-link {
    background-color: #6a1518;
  }
  .resourceCenter .nav-pills .nav-link.active, .nav-pills .show > a {
    color: white;
  }
  .resourceCenter a {
    color: #212529;
  }
  .resourceCenter .card-header:first-child {
    padding: 0;
  }
  .resourceCenter #__BVID__11__BV_tab_container_ {
    min-width: 70%;
  }
  .resourceCenter .file-up {
    position: absolute;
    top: 0;
    font-size: 20px;
    background-color: #d2d2d2;
    padding: 0.25rem 4rem;
    border-bottom: 2px solid white;
    color: #6a1518;
  }
  .resourceCenter .upload-demo1 {
    position: absolute;
    bottom: 5rem;
    left: -12.7rem;
  }
  .resourceCenter .card-body {
    width: 96%;
  }
</style>
