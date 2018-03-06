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
        :onSuccess="uploadSuccess"
        :beforeUpload="beforeAvatarUpload"
        multiple
        :limit="3"
        :on-exceed="handleExceed">
        <el-button class="uploadBut" size="medium " type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">温馨提示 : 只能上传xls xlsx doc docx txt mp4 rmvb avi pdf格式的文件，且不超过100M</div>
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
                  <el-button

                    type="text"
                    size="mini">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>
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
                  <el-button size="mini" @click="sendName(scope.row.name)">点击下载</el-button>
                </template>
              </el-table-column>

            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>
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
                  <el-button size="mini" @click="sendName(scope.row.name)">点击下载</el-button>
                </template>
              </el-table-column>

            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>
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
                  <el-button size="mini" @click="sendName(scope.row.name)">点击下载</el-button>
                </template>
              </el-table-column>

            </el-table>
            <div style="margin-top: 20px">
              <el-button @click="toggleSelection()">取消选择</el-button>
              <el-button @click="sendName(scope.row.name)">下载选中项</el-button>
            </div>
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
      uploadSuccess (response, file) {

        let newFile = [];
        newFile.push(file.name);
        newFile.push(file.birthtime);
        //this.msgArr.name(file.name);
        console.log(newFile);
        //console.log(file.name);
        //console.log(file.size);
        console.log(file);
        //console.log(file.birthtime);
        //console.log('上传文件', response)
      },
      // 上传错误
      uploadError (response, file, fileList) {
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
        const fileArr = file.name.split('.');
        const fileSuffix = fileArr[fileArr.length-1];
        const extension = fileSuffix === 'xls';
        const extension2 = fileSuffix === 'xlsx';
        const extension3 = fileSuffix === 'doc';
        const extension4 = fileSuffix === 'docx';
        const extension5 = fileSuffix === 'txt';
        const extension6 = fileSuffix === 'mp4';
        const extension7 = fileSuffix === 'rmvb';
        const extension8 = fileSuffix === 'avi';
        const extension9 = fileSuffix === 'pdf';
        const isLt2M = file.size / 1024 / 1024 < 100;
        if (!extension && !extension2 && !extension3 && !extension4 && !extension5 && !extension6 && !extension7 && !extension8 && !extension9) {
          console.log('上传只能是 xls、xlsx、doc、docx txt mp4 rmvb avi格式!')
        }
        if (!isLt2M) {
          console.log('上传模板大小不能超过 100MB!')
        }
        return extension || extension2 || extension3 || extension4 || extension5 || extension6 || extension7 || extension8 || extension9 && isLt2M
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
          const content = res.data;
          const blob = new Blob([content]);
          if ('download' in document.createElement('a')) { // 非IE下载
            const elink = document.createElement('a');
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
    },
    mounted(){
      axios.get("http://192.168.2.251:8000/FileUpDown/loadFile",{
        params:{
          user:6666
        }
      }).then((res)=>{
          for (var i = 0; i < res.data.var.length; i++){
            if (res.data.var[i].size != 0){
              this.msgArr.push(res.data.var[i])
            }
          }
          for ( var j = 0; j < this.msgArr.length; j++){
            var index = this.msgArr[j].name.split(".");
            var suffix = index[index.length-1];
            if (suffix == 'mp4' || suffix == 'rmvb' || suffix == 'avi'){
              this.videoArr.push(this.msgArr[j]);
            }else if(suffix == 'txt' || suffix == 'docx' || suffix == 'doc' || suffix == 'xlsx' || suffix == 'xls' || suffix == 'pdf' || suffix == 'pptx'){
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

  .el-upload__tip {
    text-align: left;
  }

  .container .fileList-box .uploadBut {
    margin-left: -68.5rem;
  }
</style>
