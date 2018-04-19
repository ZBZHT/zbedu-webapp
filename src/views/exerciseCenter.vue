<template>
  <div id="app" class="exerciseCenter-container">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>

    <div class="exerciseCenter-content">
        <el-row>
            <el-col :span="6">
            <el-tree
                :data="data"
                :props="defaultProps"
                accordion
                node-key="id"
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
      defaultProps: {
        children: 'children',
        label: 'label',
        engImg:'engImg',
        engRule:'engRule',
        id:'id'
      },
      data:[],
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
        console.log(data.id);
        if(data.id == 101){
            this.is697 = true;
            this.is926 = false;
        }else if(data.id == 102){
            this.is697 = false;
            this.is926 = true;
        }
        this.exerEngImg = data.engImg;
        this.exerEngRule = data.engRule;
        this.exerLabel = data.label;
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
.exerciseCenter-container{
    min-width:960px;
}
.exerciseCenter-content{
    width:960px;
    margin:0 auto;
    margin-top:80px;
    margin-bottom:80px;
}
.exerciseCenter-content .exerP{
    font-size:20px;
    margin-bottom:20px;
}
.exerciseCenter-content .el-tree-node__expand-icon {
    font-size: 16px;
}
.exerciseCenter-content .el-tree-node__label {
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
    background-color: #d9d9d9;
}
.exerciseCenter-content .el-tree-node__content:hover{
    background-color: #d9d9d9;
}
.exerciseCenter-content .el-tree-node__label{
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow:hidden;
}
.exerciseCenter-content .el-tabs--border-card{
    margin-left:20px;
    border:1px solid #9f5355;
    border-radius:3px;
}
.exerciseCenter-content .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    border-right-color: #9f5355;
    border-left-color: #9f5355;
}
.exerciseCenter-content .el-tabs--border-card>.el-tabs__header{
    border-bottom: 1px solid #9f5355;
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
    height:500px;
}
</style>
