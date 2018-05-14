<template>
  <div class="competitionCenter-container">
    <div>
        <navgation-head></navgation-head>
    </div>

    <div class="competitionCenter-content">
        <el-row>
            <el-col :span="6">
              <el-tree
                node-key="id"
                :default-expanded-keys="[courseId1,courseId2]"
                :props="defaultProps"
                :data="data"
                highlight-current
                ref="comtree"
                @node-click="handleNodeClick"></el-tree>
            </el-col>

            <el-col :span="18">
                <!--大赛资讯-->
                <div v-show="is697">
                    <p class="exerP">{{competitionData.label}}</p>
                    <el-tabs type="border-card" v-model="activeName">
                        <el-tab-pane label="通知文件" :name="descTab">
                            <div class="exerEngImg">
                                <p class="exerEngImgTitle">{{competitionData.title}}</p>
                                <p class="exerEngImgSTitle">{{competitionData.sTitle}}</p>
                                <div v-for="item in competitionData.content">
                                    <p class="exerEngImgContent">{{item.content}}</p>
                                </div>
                                附件：
                                <div v-for="item in competitionData.moreText">
                                    <p class="exerEngmoreText" @click="sendName(item.text)">{{item.text}}</p>
                                </div>
                                <p class="exerEngImgSTitle">{{competitionData.address}}</p>
                                <p class="exerEngImgSTitle">{{competitionData.time}}</p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="大赛规程">
                            <div class="exerEngRule">
                                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                                    <param name="_Version" value="65539">
                                    <param name="_ExtentX" value="20108">
                                    <param name="_ExtentY" value="10866">
                                    <param name="_StockProps" value="0">
                                    <param name="SRC" value="teachingMaterial">
                                    <object :data="'/resource/pdf/competitionData/' + competitionData.ruleText" type="application/pdf" class="pdf-box">
                                    </object>
                                </object>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="筹划·目标">筹划·目标</el-tab-pane>
                    </el-tabs>
                </div>

                <!--历届回顾-->
                <div v-show="is123">
                    <p class="exerP">{{competitionData.label}}</p>
                    <el-tabs type="border-card" v-model="activeName">
                        <el-tab-pane label="通知文件" :name="descTab">
                            <div class="exerEngImg">
                                <!--<p class="exerEngImgTitle">{{competitionData.title}}</p>-->
                                <!--<p class="exerEngImgSTitle">{{competitionData.sTitle}}</p>-->
                                <!--<div v-for="item in competitionData.content">-->
                                    <!--<p class="exerEngImgContent">{{item.content}}</p>-->
                                <!--</div> -->
                              <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                                <param name="_Version" value="65539">
                                <param name="_ExtentX" value="20108">
                                <param name="_ExtentY" value="10866">
                                <param name="_StockProps" value="0">
                                <param name="SRC" value="teachingMaterial">
                                <object :data="'/resource/pdf/competitionData/' + competitionData.informpdf" type="application/pdf" class="pdf-box">
                                </object>
                              </object>
                                附件：
                                <div v-for="item in competitionData.moreText">
                                    <p class="exerEngmoreText" @click="sendName(item.text)">{{item.text}}</p>
                                </div>
                                <!--<p class="exerEngImgSTitle">{{competitionData.address}}</p>-->
                                <!--<p class="exerEngImgSTitle">{{competitionData.time}}</p>-->
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="大赛规程">
                            <div class="exerEngRule">
                                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                                    <param name="_Version" value="65539">
                                    <param name="_ExtentX" value="20108">
                                    <param name="_ExtentY" value="10866">
                                    <param name="_StockProps" value="0">
                                    <param name="SRC" value="teachingMaterial">
                                    <object :data="'/resource/pdf/competitionData/' + competitionData.ruleText" type="application/pdf" class="pdf-box">
                                    </object>
                                </object>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="实况·硕果">
                            <div class="exerEngImg">
                                <p class="exerEngImgTitle">{{competitionData.historyTitle}}</p>
                                <div v-for="item in competitionData.historyContent">
                                    <p class="exerEngImgContent">{{item.historyContent}}</p>
                                </div>
                                <div class="exerEngImage" v-for="item in competitionData.historyImg">
                                    <img :src=" '/resource/imgs/competition/' + item.historyImg">
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>

                <!--实战专题-->
                <div v-show="is926">
                <p class="exerP">{{}}</p>
                    <el-tabs type="border-card" v-model="activeName">
                        <el-tab-pane label="实战目标" :name="descTab">
                            <div class="exerEngImg">
                              <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                                <param name="_Version" value="65539">
                                <param name="_ExtentX" value="20108">
                                <param name="_ExtentY" value="10866">
                                <param name="_StockProps" value="0">
                                <param name="SRC" value="teachingMaterial">
                                <object :data="'/resource/pdf/competitionData/' + competitionData.goalpdf" type="application/pdf" class="pdf-box">
                                </object>
                              </object>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="教学资料">
                            <div class="exerEngRule">

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="大赛课件">
                            <div class="exerEngImg">

                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="大赛视频">
                            <div class="exerEngImg">
                                <!--<img :src=" '/resource/imgs/' + competitionData.ruleText">-->
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </el-col>
        </el-row>
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
  name: 'competitionCenter',
  data () {
    return {
      data:[],
      defaultProps: {
       children: 'children',
       label: 'label',
       },
      is697:true,
      is123:false,
      is926:false,
      courseId1:'',
      courseId2:'',
      keyId:'',
      activeName: '',
      descTab:'0'
    }
  },
  computed:{
    competitionData(){
        return this.$store.state.competitionData
    }
  },
  methods:{
    //下载文件
    sendName(item){
        axios({
          method:'get',
          url:'/fileUpDown/downComp',
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
    handleNodeClick(data) {
      //右侧显示不同页面
      console.log(data);
      var id = data.id;
      if(id == 3110 || id == 3120 || id == 3130){
          //console.log(id)
          //console.log(id.toString()+1)
          this.is697 = true;
          this.is123 = false;
          this.is926 = false;
      }else if(id == 3210 || id == 3220 || id == 3230){
          //console.log("aaaa")
          //console.log(id.toString())
          this.is697 = false;
          this.is926 = false;
          this.is123 = true;
      }else if(id > 4000){
          if(id == 4100 || id == 4200 || id == 4300){

          }else{
            //console.log("aaaa")
            //console.log(id.toString())
            this.is697 = false;
            this.is926 = true;
            this.is123 = false;
          }

      }
      //刷新保存数据
      if(data.children){

      }else{
        this.$store.commit('competitionData',data);
        this.activeName = this.descTab;
      }

    }


  },
  mounted(){
    axios.get("/readJson/bannerLeftData",{
        params:{
             user:234
        }
      }).then((res)=>{
          this.data = res.data[4].children;
          //console.log(this.data[0].label);
          setTimeout(() => {
            this.$refs.comtree.setCurrentKey(this.keyId)
          }, 20)
      }).catch(function(error){
          console.log("error init." + error)
      });
    //默认展开，标红
    var id = this.$store.state.competitionData.id;
    if(id >= 3000 && id < 4000){
        this.courseId1 = 3000;
        this.courseId2 = id;
        this.keyId = id;
    }else if(id >= 4000){
        this.courseId1 = 4000;
        this.courseId2 = id;
        this.keyId = id;
    }
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
.competitionCenter-content .competitionCenter-container{
    min-width:960px;
}
.competitionCenter-content{
    width:100%;
    margin:0 auto;
    margin-top:6px;
    margin-bottom:80px;
}
.competitionCenter-content .exerP{
    font-size:20px;
    margin-bottom:20px;
}
.competitionCenter-content .el-tree-node__expand-icon {
    font-size: 16px;
}
.competitionCenter-content .el-tree-node__label{
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  font-size: 16px;
  color: #212529;
}
.competitionCenter-content .el-tree{
    background-color: #ffffff;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #9f5355;
    text-align:left;
}
.competitionCenter-content .el-tree-node:focus>.el-tree-node__content {
    background-color: #9f5355;
    color: white;
}
.competitionCenter-content .el-tree-node__content:hover{
    background-color: #9f5355;
    color: white;
}
.competitionCenter-content .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #212529;
}
.competitionCenter-content .el-tabs--border-card>.el-tabs__header .el-tabs__item {
  border: 3px solid #9f5355;
  padding:0 60px;
  border-top: none;
  color: #212529;
}
.competitionCenter-content .el-tabs--border-card{
    margin-left:20px;
    border: 0;
    border-top: 4px solid #9f5355;
    box-shadow: none;
}
.competitionCenter-content .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background-color: #9f5355;
    color: #ffffff;
}
.competitionCenter-content .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #9f5355;
    color: white;
}
.competitionCenter-content .el-tabs__item {
  padding:0 60px;
  font-size: 18px;
  line-height: 36px;
}
.competitionCenter-content .el-tabs--border-card>.el-tabs__header{
  border: none;
  background-color: #ffffff;
}
.competitionCenter-content .el-tabs__nav{
    float:none;
}
.competitionCenter-content .exerEngImg{
    width:100%;
    margin:0 auto;
    margin-bottom:20px;
    text-align:left;
}
.competitionCenter-content .exerEngImgTitle{
    margin-top:10px;
    text-align:center;
    font-size:22px;
}
.competitionCenter-content .exerEngImgSTitle{
    text-align:right;
}
.competitionCenter-content .exerEngImgContent{
    text-align:left;
    text-indent:2em;
}
.competitionCenter-content .exerEngImage{
    width:80%;
    margin:0 auto;
    margin-bottom:40px;
}
.competitionCenter-content .exerEngmoreText{
    cursor:pointer;
}
.competitionCenter-content .exerEngImg img{
    width:100%;
}
.competitionCenter-content .pdf-box{
    width:100%;
    height: 800px;
}
.competitionCenter-content .el-col-6{
  width: 16%;
}
.competitionCenter-content .el-tree{
  padding: 0;
  border: 0;
}
.competitionCenter-content .el-tree-node{
  background-color: #d2d2d2;
}
.competitionCenter-content .el-tree-node__content{
  border-bottom: 3px solid #ffffff;
}
.el-tree-node__expand-icon{
  color: #ffffff;
}
</style>
