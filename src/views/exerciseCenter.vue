<template>
  <div id="app" class="exerciseCenter-container">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>

    <div class="exerciseCenter-content">
        <el-row>
            <el-col :span="6">
            <el-tree
                :data="data[0]"
                :props="defaultProps"
                accordion
                node-key="id"
                @node-click="handleNodeClick"></el-tree>
            </el-col>

            <el-col :span="18">
                <!--教学设备-->
                <div>
                    <el-tabs type="border-card">
                        <el-tab-pane label="设备展示">设备展示</el-tab-pane>
                        <el-tab-pane label="设备参数">设备参数</el-tab-pane>
                        <el-tab-pane label="设备说明">设备说明</el-tab-pane>
                    </el-tabs>
                </div>

                <!--实训中心-->
                <div>
                
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
        label: 'label'
      },
      data:[]
    }
  },
  computed:{

      },
  methods:{
    handleNodeClick(data) {
        //console.log(data.id);
        if (data.id == 101) {

        }
    }
  
  },
  mounted(){
    axios.get("/readJson/bannerLeftData",{
                params:{
                     user:234
                }
            }).then((res)=>{
                console.log(res.data[1])
                this.data.push(res.data[1].children);
                console.log(this.data)
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
}
.exerciseCenter-content .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover{
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
</style>
