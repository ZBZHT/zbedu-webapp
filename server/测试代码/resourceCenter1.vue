<template>
  <div id="app" class="container">
    <div class="nav">
      <navgation-head></navgation-head>
    </div>

    <div class="fileList-box">
      <el-upload
        class="upload-demo"
        action="http://192.168.2.251:8000/FileUpDown/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        :onError="uploadError"
        :beforeUpload="beforeAvatarUpload"
        :onSuccess="uploadSuccess"
        multiple
        :on-exceed="handleExceed">
        <el-button class="uploadBut" size="medium " type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">温馨提示 : 只能上传xls xlsx doc docx ppt pptx txt mp4 rmvb avi pdf格式的文件，且不超过100M</div>
      </el-upload>
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
                  <el-button type="text" size="mini" @click="sendName(scope.row.fileName)">下载</el-button>
                  <el-button type="text" size="mini" @click="fileDelete(scope.row.fileName)">删除</el-button>
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
        videoArr:[],
        courseWareArr:[],
        picArr:[],
        otherArr:[],
        activeName2: 'first',
        checked: true,
        multipleSelection: []
      }
    },
    computed:{
    },
    methods: {
      /*上传方法*/
      // 上传成功后的回调
      uploadSuccess (res, file) {
        let resFileMsg = res.fileMsg[0];
        this.msgArr.push(resFileMsg);
        console.log(this.msgArr);

        for ( let j = 0; j < resFileMsg.length; j++){
          let index = resFileMsg[j].name.split(".");
          let suffix = index[index.length-1];
          if (suffix == 'mp4' || suffix == 'rmvb' || suffix == 'avi'){
            this.videoArr.push(resFileMsg[j]);
          }else if(suffix == 'txt' || suffix == 'docx' || suffix == 'doc' || suffix == 'xlsx' || suffix == 'xls' || suffix == 'pdf' || suffix == 'ppt' || suffix == 'pptx'){
            this.courseWareArr.push(this.msgArr[j])
          }else {
            this.otherArr.push(this.msgArr[j])
          }
        }

      },
      // 上传错误
      uploadError (res, file, fileList) {
        console.log('上传失败，请重试！')
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
      // 上传前对文件的大小的判断  xls xlsx doc docx txt mp4 rmvb avi pdf
      beforeAvatarUpload (file) {

        const h = this.$createElement;
        this.$msgbox({
          title: '请选择上传课程的类型',
          message: h('p', null, [
            h('span', null, '内容可以是 '),
            h('i', { style: 'color: teal' }, 'VNode')
          ]),
          showClose: false,
          confirmButtonText: '确定',
          closeOnPressEscape: false,
          closeOnClickModal: false,
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });

        let fileArr = file.name.split('.');
        let fileSuffix = fileArr[fileArr.length-1];
        let extension = fileSuffix === 'xls';
        let extension2 = fileSuffix === 'xlsx';
        let extension3 = fileSuffix === 'doc';
        let extension4 = fileSuffix === 'docx';
        let extension5 = fileSuffix === 'txt';
        let extension6 = fileSuffix === 'mp4';
        let extension7 = fileSuffix === 'rmvb';
        let extension8 = fileSuffix === 'avi';
        let extension9 = fileSuffix === 'pdf';
        let extension10 = fileSuffix === 'ppt';
        let extension11 = fileSuffix === 'pptx';
        let isLt2M = file.size / 1024 / 1024 < 100;
        if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7 && !extension8 && !extension9 && !extension10 && !extension11) {
          console.log('上传只能是 xls/xlsx/doc/docx/ppt/pptx/txt/mp4/rmvb/avi格式!')
        }
        if (!isLt2M) {
          console.log('上传模板大小不能超过 100MB!')
        }
        return extension || extension2 || extension3 || extension4 || extension5 || extension6 || extension7 || extension8 || extension9 || extension10 || extension11 && isLt2M
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
          url:"http://192.168.2.251:8000/FileUpDown/download",
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
          url:"http://192.168.2.251:8000/FileUpDown/fileDelete",
          params:{
            downloadName:item
          }
        }).then((res) => { // 处理返回的文件流

        })
      },
    },
    mounted(){
      axios.get("http://192.168.2.251:8000/FileUpDown/loadFile",{
        params:{
          user:6666
        }
      }).then((res)=>{
          for (let i = 0; i < res.data.var.length; i++){
            if (res.data.var[i].size != 0){
              this.msgArr.push(res.data.var[i])
            }
          }
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

  .fileList-box {
    width: 1200px;
    margin: 0 auto;
  }

  .el-table .cell{
    text-align: left;
  }

  .el-upload__tip {
    text-align: left;
  }

  .container .fileList-box .uploadBut {
    margin-left: -68.5rem;
  }
</style>
