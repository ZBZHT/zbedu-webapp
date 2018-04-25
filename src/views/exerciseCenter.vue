<template>
  <div class="exerciseCenter-container">
    <div>
        <navgation-head></navgation-head>
    </div>

    <div class="exerciseCenter-content">
        <el-row>
            <el-col :span="6">
              <el-tree
                node-key="courseId"
                :default-expanded-keys="[1000,1100]"
                :props="defaultProps"
                :data="data"
                accordion
                @node-click="handleNodeClick"></el-tree>
            </el-col>

            <el-col :span="18">
                <!--教学设备-->
                <div v-show="is697">
                    <p class="exerP">{{exerLabel}}</p>
                    <el-tabs type="border-card">
                        <el-tab-pane label="设备展示">
                            <div class="exerEngImg" v-for="item in exerEngImg">
                                <img :src=" '/resource/imgs/' + item.engImage">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="设备参数">
                            <div class="exerEngRule">
                                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                                    <param name="_Version" value="65539">
                                    <param name="_ExtentX" value="20108">
                                    <param name="_ExtentY" value="10866">
                                    <param name="_StockProps" value="0">
                                    <param name="SRC" value="teachingMaterial">
                                    <object :data="'/resource/pdf/' + exerEngRule" type="application/pdf" class="pdf-box">
                                    </object>
                                </object>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="设备说明">设备说明</el-tab-pane>
                    </el-tabs>
                </div>

                <!--实训中心设计-->
                <div v-show="is926">
                <p class="exerP">{{exerLabel}}</p>
                    <el-tabs type="border-card">
                        <el-tab-pane label="实训中心效果图">
                            <div class="exerEngImg">
                                <img :src=" '/resource/imgs/' + exerEngImg">
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="实训中心配置">
                            <div class="exerEngRule">
                                <object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" border="0">
                                    <param name="_Version" value="65539">
                                    <param name="_ExtentX" value="20108">
                                    <param name="_ExtentY" value="10866">
                                    <param name="_StockProps" value="0">
                                    <param name="SRC" value="teachingMaterial">
                                    <object :data="'/resource/pdf/' + exerEngRule" type="application/pdf" class="pdf-box">
                                    </object>
                                </object>
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
  name: 'exerciseCenter',
  data () {
    return {
      data:[],
      defaultProps: {
       children: 'children',
       label: 'label',
       },
      exerEngImg:[],
      exerEngRule:'',
      exerLabel:'实训中心',
      is697:true,
      is926:false
    }
  },
  computed:{

      },
  methods:{
    handleNodeClick(data) {
      console.log(data);
      if(data.label == "教学设备展示"){
          this.is697 = true;
          this.is926 = false;
      }else if(data.label == "实训中心设计"){
          this.is697 = false;
          this.is926 = true;
      }
      if (data.engImg) {
        this.exerEngImg = data.engImg;
        this.exerEngRule = data.engRule;
        this.exerLabel = data.label;
      }
    }


  },
  mounted(){
    axios.get("/readJson/bannerLeftData",{
        params:{
             user:234
        }
      }).then((res)=>{
          this.data = res.data[1].children;
          //console.log(this.data[0].label)
      }).catch(function(error){
          console.log("error init." + error)
      });
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
.exerciseCenter-content .exerciseCenter-container{
    min-width:960px;
}
.exerciseCenter-content{
    width:100%;
    margin:0 auto;
    margin-top:6px;
    margin-bottom:80px;
}
.exerciseCenter-content .exerP{
    font-size:20px;
    margin-bottom:20px;
}
.exerciseCenter-content .el-tree-node__expand-icon {
    font-size: 16px;
}
.exerciseCenter-content .el-tree{
    background-color: #ffffff;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #9f5355;
    text-align:left;
}
.exerciseCenter-content .el-tree-node:focus>.el-tree-node__content {
    background-color: #9f5355;
  color: white;
}
.exerciseCenter-content .el-tree-node__content:hover{
    background-color: #9f5355;
    color: white;
}
.exerciseCenter-content .el-tree-node__label{
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
    font-size: 16px;
    color: #212529;
}
.exerciseCenter-content .el-tree-node__label:hover {
    color: white;
}
.exerciseCenter-content .el-tabs--border-card{
    margin-left:20px;
    border: 0;
    border-top: 4px solid #9f5355;
    box-shadow: none;
}
.exerciseCenter-content .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background-color: #9f5355;
    color: #ffffff;
}
.exerciseCenter-content .el-tabs--border-card>.el-tabs__header .el-tabs__item {
  border: 3px solid #9f5355;
  padding:0 60px;
  border-top: none;
  color: #212529;
}
.exerciseCenter-content .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #212529;
}
.exerciseCenter-content .el-tabs__item {
  padding:0 60px;
  font-size: 18px;
  line-height: 36px;
}
.exerciseCenter-content .el-tabs--border-card>.el-tabs__header{
  border: none;
  background-color: #ffffff;
}
.exerciseCenter-content .el-tabs__nav{
    float:none;
}
.exerciseCenter-content .exerEngImg{
    width:595px;
    margin:0 auto;
    margin-bottom:20px;
}
.exerciseCenter-content .exerEngImg img{
    width:100%;
}
.exerciseCenter-content .pdf-box{
    width:100%;
  height: 800px;
}
.exerciseCenter-content .el-col-6{
  width: 16%;
}
.exerciseCenter-content .el-tree{
  padding: 0;
  border: 0;
}
.exerciseCenter-content .el-tree-node{
  background-color: #d2d2d2;
}
.exerciseCenter-content .el-tree-node__content{
  border-bottom: 3px solid #ffffff;
}
.el-tree-node__expand-icon{
  color: #ffffff;
}
</style>
