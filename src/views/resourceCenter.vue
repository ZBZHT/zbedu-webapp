<template>
  <div id="resourceCenter">
    <div>
      <navgation-head></navgation-head>
    </div>

    <div class="resourceCenter">

    <b-card no-body>
      <b-tabs pills card vertical>
        <b-tab title="精彩瞬间" active>
          <el-table
            ref="multipleTable"
            :data="msgArr"
            tooltip-effect="dark"
            style="width: 96%;"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column label="序号">
              <template slot-scope="scope">{{ scope.row.index }}</template>
            </el-table-column>

            <el-table-column label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column label="上传时间" width="220" >
              <template slot-scope="scope">{{ scope.row.birthtime }}</template>
            </el-table-column>

            <el-table-column label="上传者" width="220" >
              <template slot-scope="scope">{{ scope.row.personName }}</template>
            </el-table-column>

            <el-table-column label="文件大小" show-overflow-tooltip width="120">
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
        <b-tab title="说课课件">
          <el-table
            ref="multipleTable"
            :data="courseWareArr"
            tooltip-effect="dark"
            style="width: 96%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>


            <el-table-column label="序号">
              <template slot-scope="scope">{{ scope.row.index }}</template>
            </el-table-column>

            <el-table-column label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column label="上传时间" width="220">
              <template slot-scope="scope">{{ scope.row.birthtime }}</template>
            </el-table-column>

            <el-table-column label="上传者" width="220" >
              <template slot-scope="scope">{{ scope.row.personName }}</template>
            </el-table-column>

            <el-table-column label="文件大小" show-overflow-tooltip width="120">
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
        <b-tab title="实操视频">
          <el-table
            ref="multipleTable"
            :data="videoArr"
            tooltip-effect="dark"
            style="width: 96%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column label="序号">
              <template slot-scope="scope">{{ scope.row.index }}</template>
            </el-table-column>

            <el-table-column label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column label="上传时间" width="220">
              <template slot-scope="scope">{{ scope.row.birthtime }}</template>
            </el-table-column>

            <el-table-column label="上传者" width="220" >
              <template slot-scope="scope">{{ scope.row.personName }}</template>
            </el-table-column>

            <el-table-column label="文件大小" show-overflow-tooltip width="120">
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
        <b-tab title="其他素材">
          <el-table
            ref="multipleTable"
            :data="otherArr"
            tooltip-effect="dark"
            style="width: 90%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55">
            </el-table-column>

            <el-table-column label="序号">
              <template slot-scope="scope">{{ scope.row.index }}</template>
            </el-table-column>

            <el-table-column label="名称">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>

            <el-table-column label="上传时间" width="220">
              <template slot-scope="scope">{{ scope.row.birthtime }}</template>
            </el-table-column>

            <el-table-column label="上传者" width="220" >
              <template slot-scope="scope">{{ scope.row.personName }}</template>
            </el-table-column>

            <el-table-column label="文件大小" show-overflow-tooltip  width="120">
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
          :on-exceed="handleExceed">
          <el-button class="uploadBut" size="medium " type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">提示: 上传的文件不可超过1000M</div>
        </el-upload>
      </b-tabs>

      <span class="file-up">成果收集</span>

    </b-card>

    <!--文件类型对话框-->
    <el-dialog
      title="请选择上传文件的类型"
      :visible.sync="centerDialogVisible"
      width="25%"
      :close-on-press-escape=false
      :close-on-click-modal=false
      :show-close=false
      center>
        <el-select v-model="label1" placeholder="请选择类型">
          <el-option
            v-for="item in options"
            :key="item.label"
            :label="item.label"
            :value="item.label">
          </el-option>
        </el-select>
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
        url:document.domain,
        options: [{
          label: '教学课件'
        }, {
          label: '教学微课'
        }, {
          label: '其他教材'
        }],
        label1: '',
      }
    },
    computed:{
    },
    methods: {
      // 成功提示信息
      successMsg(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      // 失败提示信息
      DefeatMsg(msg) {
        this.$message.error(msg);
      },
      warningMsg(msg) {
        this.$message({
          message: msg,
          type: 'warning'
        });
      },
      /*上传方法*/
      // 上传成功后的回调
      uploadSuccess (res, file) {
        if (res.fileMsg[0]) {
          this.msgArr.push(res.fileMsg[0]);
          this.successMsg('上传成功');
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
        if (this.label === '') {
            this.warningMsg('请选择上传文件的类型')
        } else {
          this.getFile();
          this.centerDialogVisible = false;
          if (this.label1 === '说课课件')
          {
            this.courseWareArr.push(this.msgArr[this.msgArr.length-1])
          }
          else if (this.label1 === '实操视频')
          {
            this.videoArr.push(this.msgArr[this.msgArr.length-1])
          }
          else if (this.label1 === '其他素材')
          {
            this.otherArr.push(this.msgArr[this.msgArr.length-1])
          }
        }
        

      },
      // 上传前弹出对话框
      beforeAvatarUpload (file) {
      this.centerDialogVisible = true;
      //this.successMsg('文件正在上传')
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
      //删除文件
      fileDelete(item){
        axios({
          method:'get',
          url:'/fileUpDown/fileDelete',
          params:{
            downloadName:item
          }
        }).then((res) => { // 处理返回的文件流
          this.successMsg('删除成功');
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
      loadFile() {
        axios.get('/fileUpDown/loadFile',{
          params:{
            user:6666
          }
        }).then((res)=>{
            for (let i = 0; i < res.data.var.length; i++){
              if (res.data.var[i].size != 0){
                this.msgArr.push(res.data.var[i])
                this.msgArr[i].personName = this.$store.state.username;
                this.msgArr[i].index = i + 1;
              }
            //  console.log("111")
            //  console.log(this.msgArr)
            }
            this.getFile();
          }
        );
      },
      getFile(){
        axios.get('/fileUpDown/loadFile',{
          params:{
            userType:6666,
            msgArr:this.msgArr
          }
        }).then((res)=>{


          for ( let j = 0; j < this.msgArr.length; j++){
              let index = this.msgArr[j].name.split(".");
              let suffix = index[index.length-1];
              if (suffix === 'mp4' || suffix === 'rmvb' || suffix === 'avi'){
                this.videoArr.push(this.msgArr[j]);
              }else if(suffix === 'txt' || suffix === 'docx' || suffix === 'doc' || suffix === 'xlsx' || suffix === 'xls' || suffix === 'pdf' || suffix === 'ppt' || suffix === 'pptx'){
                this.courseWareArr.push(this.msgArr[j])
              }else {
                this.otherArr.push(this.msgArr[j])
              }
            }

            
          })
      }
    },
    mounted(){
        this.loadFile();
        
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
    bottom: 16rem;
    left: -12rem;
  }
  .resourceCenter {
    position: relative;
  }
  .resourceCenter .card-body {
    width: 100%;
    position: absolute;
    top:0;
    left:0;
  }
  .resourceCenter .el-table .cell {
    text-align: left;
  }
  .resourceCenter .el-dialog {
    border-radius: 16px;
  }
  .resourceCenter .el-dialog--center .el-dialog__body {
    text-align: center;
  }
</style>
