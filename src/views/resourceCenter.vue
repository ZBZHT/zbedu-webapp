<template>
  <div id="app" class="container">
    <div class="nav">
      <navgation-head></navgation-head>
    </div>

    <div class="fileList-box">
      <div>

        <form action="http://192.168.2.251:8000/FileUpDown/upload" method="post" enctype='multipart/form-data'>
          <label for="resource">选择要上传的文件</label>
          <input type="file" id="resource" name="resource">
          <button type="submit">新建任务</button>
        </form>

        <!--下载-->
        <!--<form action="http://192.168.2.251:8000/FileUpDown/download" method="get">-->
        <!--<button type="submit">下载文件</button>-->
        <!--</form>-->

        <br>
      </div>
      <!--<h1>全部内容</h1>-->
      <!--<ul>-->
        <!--<li>-->
          <!--<span>名称</span>-->
          <!--<span>上传时间</span>-->
          <!--<span>文件大小</span>-->
          <!--<span>操作️</span>-->
        <!--</li>-->
        <!--<li v-for="item in msgArr" @click="sendName(item.name)">-->
          <!--<span>{{item.name}}</span>-->
          <!--<span>{{item.birthtime}}</span>-->
          <!--<span>{{item.size}} kb</span>-->
          <!--<span>⬇️</span>-->
        <!--</li>-->
      <!--</ul>-->

      <h1>视频</h1>
      <ul>
        <li>
          <span>名称</span>
          <span>上传时间</span>
          <span>文件大小</span>
          <span>操作️</span>
        </li>
        <li v-for="item1 in videoArr">
          <span>{{item1.name}}</span>
          <span>{{item1.birthtime}}</span>
          <span>{{item1.size}}</span>
          <span>⬇️</span>
        </li>
      </ul>
      <h1>pptArr</h1>
      <ul>
        <li>
          <span>名称</span>
          <span>上传时间</span>
          <span>文件大小</span>
          <span>操作️</span>
        </li>
        <li v-for="item2 in pptArr">
          <span>{{item2.name}}</span>
          <span>{{item2.birthtime}}</span>
          <span>{{item2.size}}</span>
          <span>⬇️</span>
        </li>
      </ul>
      <h1>textArr</h1>
      <ul>
        <li>
          <span>名称</span>
          <span>上传时间</span>
          <span>文件大小</span>
          <span>操作️</span>
        </li>
        <li v-for="item3 in textArr">
          <span>{{item3.name}}</span>
          <span>{{item3.birthtime}}</span>
          <span>{{item3.size}}</span>
          <span>⬇️</span>
        </li>
      </ul>
      <h1>picArr</h1>
      <ul>
        <li>
          <span>名称</span>
          <span>上传时间</span>
          <span>文件大小</span>
          <span>操作️</span>
        </li>
        <li v-for="item4 in picArr">
          <span>{{item4.name}}</span>
          <span>{{item4.birthtime}}</span>
          <span>{{item4.size}}</span>
          <span>⬇️</span>
        </li>
      </ul>
      <h1>otherArr</h1>
      <ul>
        <li>
          <span>名称</span>
          <span>上传时间</span>
          <span>文件大小</span>
          <span>操作️</span>
        </li>
        <li v-for="item5 in otherArr">
          <span>{{item5.name}}</span>
          <span>{{item5.birthtime}}</span>
          <span>{{item5.size}}</span>
          <span>⬇️</span>
        </li>
      </ul>
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
        pptArr:[],
        textArr:[],
        picArr:[],
        otherArr:[]
      }
    },
    computed:{

    },
    methods: {

      sendName(item){
        alert(item)

        axios({
          method:'post',
          url:"http://192.168.2.251:8000/FileUpDown/download",
          data:{
            downloadName:item
          }
        }).then(
          function (res) {
          }
        )


      }
    },
    mounted(){
      // alert(222)
      axios.get("http://192.168.2.251:8000/FileUpDown/loadFile",{
        params:{
          user:6666
        }
      }).then((res)=>{
          // console.log(res.data.var)

          // this.msgArr = res.data.var

          for (var i = 0; i < res.data.var.length; i++){
            if (res.data.var[i].size != 0){
              this.msgArr.push(res.data.var[i])
            }
          }
          for ( var j = 0; j < this.msgArr.length; j++){
            var index = this.msgArr[j].name.indexOf(".") //得到"."在第几位
            var suffix = this.msgArr[j].name.substring(index) //截断"."之前的，得到后缀
            if (suffix == '.mp4' || suffix == '.rmvb' || suffix == '.avi'){
              this.videoArr.push(this.msgArr[j])
            }else if(suffix == '.pptx'){
              this.pptArr.push(this.msgArr[j])
            }else if(suffix == '.txt' || suffix == '.docx' || suffix == '.xlsx' || suffix == '.pdf'){
              this.textArr.push(this.msgArr[j])
            }else if(suffix == '.jpg' || suffix == '.png' || suffix == '.gif' || suffix == '.jpeg'){
              this.picArr.push(this.msgArr[j])
            }else {
              this.otherArr.push(this.msgArr[j])
            }
          }
          console.log(this.msgArr)

        }
      )
      console.log('00===========')
    },
    components:{navgationHead,footFooter}
  }
</script>

<style>
  *{
    margin:0;
    padding:0;
  }
  ul li{
    list-style: none;
  }
  .fileList-box ul li{
    background: #ECECEC;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px dotted #8c8c8c;
    text-align: left;
  }
  .fileList-box ul li span:first-child{
    display: inline-block;
    width: 40%;
    /*background: lightgoldenrodyellow;*/
    text-align: center;
  }
  .fileList-box ul li span:nth-child(2){
    display: inline-block;
    width: 30%;
    /*background: lightgoldenrodyellow;*/
    text-align: center;
  }
  .fileList-box ul li span:nth-child(3){
    display: inline-block;
    width: 20%;
    /*background: lightgoldenrodyellow;*/
    text-align: center;
  }
  .fileList-box ul li span:nth-child(4){
    display: inline-block;
    width: 8%;
    /*background: lightgoldenrodyellow;*/
    text-align: center;
  }
  a{
    color: inherit;
    cursor: pointer;
    text-decoration:none;
  }
  a:hover{
    text-decoration: none;
    color: #f00;
  }
  a:focus {
    color: #f00;
    text-decoration: none;
  }
  hr{
    margin-top: 2px;
    margin-bottom:2px;
  }
</style>
