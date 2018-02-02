<template>
  <div>
    <!--<div class="header-box">-->
      <!--<navgation-head></navgation-head>-->
    <!--</div>-->
    <div>
      <button class="upload-btn" @click="upload">上传</button>
      <button class="download-btn" @click="download">下载</button>
<h1>9999</h1>
      <form action="http://192.168.2.251:8000/FileUpDown/upload" method="post" enctype='multipart/form-data'  onsubmit=" return checkTask(this)">
        <label for="resource">上传文档</label>
        <input type="file" id="resource" name="resource">
        <button type="submit">新建任务</button>
      </form>
      <form action="http://192.168.2.251:8000/FileUpDown/download" method="get">
        <button type="submit">下载文件</button>
      </form>
      <br>
      <button @click="qqq">
        展示
      </button>

    </div>
    <h1>666666</h1>

    <input type="file" value=""  id="file"  @change='onUpload'>
    <ul>
      <li v-for="item in msgArr">{{item.name}}</li>
    </ul>
  </div>
</template>


<script>

  import axios from 'axios'
  import navgationHead from '@/components/common/navgationHead'
  import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'

  export default {
    name: 'user',
    data () {
      return {
        msgArr:[]
      }
    },
    computed:{

    },
    methods: {
      upload() {
      },
      download() {
        alert(222)
      },
      qqq () {
        axios.post("http://192.168.2.251:8000/FileUpDown/loadFile",{
          params:{
            user:6666
          }
        }).then((res)=>{
            console.log(res.data.var)
            this.msgArr = res.data.var
          }
        )
      },
      onUpload(e) {

        var formData = new FormData();

        formData.append('file', e.target.files[0]);

        formData.append('type', 'test');

        $.ajax({

          url: 'http://192.168.2.251:8000/FileUpDown/upload',
          type: 'POST',
          dataType: 'json',
          cache: false,
          data: formData,
          processData: false,
          contentType: false,
          success: (res) => {
            if (res.code === 200) {

              console.log(res.code)
              // var img_tpl ='<div class="picture" style="width:108px;float:left;"><img id="preview" src="'+后台返回的tu'pian路径+'" style="width:48px;height:48px;float:left;background-size:cover;"/><span class="r-span"
              // onclick = "onDeletePicture()" style="color:#49BDCC;display:block;float:left;margin-left:10px;line-height:48px;">删除</span></div>';
              // $("#refund_img").after(img_tpl);
            }

          },

          error: function (err) {

            alert("网络错误");

          }

        });

      },
      mounted() {
      },
      watch: {},
      components: {
        navgationHead
      }
    }
  }
</script>

<style scoped>

  .header-box{
    margin: -7px -7px 0px -7px;
  }
</style>
