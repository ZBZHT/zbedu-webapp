<template>
  <!--实训中心-->
  <div class="e-content">
    <div>
        <navgation-head></navgation-head>
    </div>

    <div class="e-content-tree">
        <el-row  id="setHeight1">
            <el-col :span="6">
              <el-tree
                node-key="id"
                :default-expanded-keys="[courseId1,courseId2]"
                :props="defaultProps"
                :data="data"
                highlight-current
                ref="extree"
                @node-click="handleNodeClick"></el-tree>
            </el-col>

            <el-col :span="18" id="setHeight">
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
                                <p class="devDownload" v-show="exerEngRule"></p>
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
                                <p class="devDownload" v-show="exerEngRule"></p>
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

              <!--实训实验设计-->
              <div class="shiyan" v-show="is3000">
                <p class="exerP">{{exerLabel}}</p>
                <el-tabs type="border-card" class="shiyan-1">
                  <el-tab-pane label="故障实验">

                    <el-table
                      :data="tableData"
                      style="width: 100%">
                      <el-table-column label="序号" type="index" width="50">
                      </el-table-column>
                      <el-table-column property="name" label="故障名称" width="180">
                      </el-table-column>
                      <el-table-column label="操作">
                        <template slot-scope="scope">
                          <el-button size="mini" type="success"
                                     v-show="scope.row.onOff === 'off'"
                                     @click="openTrain(scope.$index, scope.row)">打开
                          </el-button>
                          <el-button size="mini" type="danger"
                                     v-show="scope.row.onOff === 'on'"
                                     @click="closeTrain(scope.$index, scope.row)">关闭
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>

                  </el-tab-pane>
                  <el-tab-pane label="自定义故障" class="tab-train">
                    <el-table
                      :data="tableData1"
                      style="width: 85%">
                      <el-table-column label="序号" type="index" width="50">
                      </el-table-column>
                      <el-table-column property="name" label="故障别名" width="180">
                      </el-table-column>
                      <el-table-column label="故障名">
                        <template slot-scope="scope">
                          <span v-for="item in scope.row.children">
                            {{item.onOffName}}
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="260">
                        <template slot-scope="scope">
                          <el-button size="mini" type="success"
                                     @click="">打开
                          </el-button>
                          <el-button size="mini" type="danger"
                                     @click="">关闭
                          </el-button>
                          <el-button size="mini" type="success"
                                     @click="editTrain(scope.$index, scope.row)">编辑
                          </el-button>
                          <el-button size="mini" type="danger"
                                     @click="deleteTrain(scope.$index, scope.row)">删除
                          </el-button>
                        </template>
                      </el-table-column>
                    </el-table>

                    <el-button type="success" class="but-addTrain"
                               @click="dialogVisible = true">添加故障
                    </el-button>
                  </el-tab-pane>

                  <!--添加故障弹窗-->
                  <el-dialog
                    title="自定义故障"
                    :visible.sync="dialogVisible"
                    width="600px"
                    :before-close="handleClose">

                    <!--穿梭框-->
                    <el-transfer class="shiyan-2"
                                 filterable
                                 v-model="userTrainValue"
                                 :titles="[Source, Target]"
                                 :button-texts="['撤销', '选定']"
                                 :props="{
                                  key: 'num',
                                  label: 'name'
                                }"
                                 :data="tableData">
                    </el-transfer>

                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addUserTrain">确 定</el-button>
                  </span>
                  </el-dialog>



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
      is697:true,
      is926:false,
      is3000:false,
      courseId1:1000,
      courseId2:1100,
      keyId:'',
      tableData: [],
      tableData1: [
        {
          name: '自定义名称3',
          children: [
            {userNum: 1, onOffName: '故障2'},
            {userNum: 5, onOffName: '故障6'}
          ]
        }, {
          name: '自定义名称4',
          children: [
            {userNum: 0, onOffName: '故障1'},
            {userNum: 3, onOffName: '故障4'}
          ]
        }
      ],
      userTrainValue: [],
      Source: '故障列表',
      Target: '自定义故障列表',
      dialogVisible: false
    }
  },
  computed:{
    exerEngImg(){
        return this.$store.state.exerciseData.engImg
    },
    exerEngRule(){
        return this.$store.state.exerciseData.engRule
    },
    exerLabel(){
        return this.$store.state.exerciseData.label
    },
  },
  methods: {
    //添加自定义故障
    addUserTrain() {
        //this.dialogVisible = false;
        console.log(this.userTrainValue);
        console.log(this.tableData);

    },
    //弹窗关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    //获取屏幕高度
    Train1() {
      let hh = window.innerHeight - 185 - 44;
      let domHeight = document.getElementById("setHeight1");
      console.log(hh);
      console.log(domHeight.clientHeight);
      if (hh > domHeight.clientHeight) {
        domHeight.style.height = hh + 'px';
      }
    },
    //编辑
    editTrain(index, row) {

    },
    //删除
    deleteTrain(index, row) {
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    //发送指定命令
    onOff(index, row) {
      let tIndex = this.tableData[index];
      axios.post('/trainManager/onOffControl', {
        data: {
          command: tIndex.onOff + tIndex.num,
          courseName: 'SW16'
        }
      }).then((res) => {
        //console.log(res.data);
        if (res.data.code === 0) {
          if (tIndex.onOff === 'off') {
            tIndex.onOff = 'on';
          } else if (tIndex.onOff === 'on') {
            tIndex.onOff = 'off';
          }
        }
        this.updateTrain();
      }).catch(function (error) {
        console.log("error init." + error)
      });
    },
    //开关状态更新到数据库
    updateTrain() {
      axios.post('/trainManager/updateTrain', {
        data: {
          trainData: this.tableData
        }
      }).then((res) => {
        //console.log(res.data);
        if (res.data.code === 0) {
          if (tIndex.onOff === 'off') {
            tIndex.onOff = 'on';
          } else if (tIndex.onOff === 'on') {
            tIndex.onOff = 'off';
          }
        }
        this.updateTrain();
      }).catch(function (error) {
        console.log("error init." + error)
      });

    },
    //开
    openTrain(index, row) {
      //console.log(index, row);
      if (this.tableData[index].onOff === 'off') {
        this.onOff(index, row)
      }
    },
    //关
    closeTrain(index, row) {
      //console.log(index, row);
      if (this.tableData[index].onOff === 'on') {
        this.onOff(index, row)
      }
    },
    //获取实训数据
    getTrainData() {
      axios.post('/trainManager/getTrain', {
        data:{
          historyFault: [],
          userFault: []
        }
      }).then((res) => {
        if (res.data.code === 0) {
          this.tableData = res.data.result.historyFault;
        }

      }).catch(function (error) {
        console.log("error init." + error)
      });

    },
    handleNodeClick(data) {
      //右侧显示不同页面
      //console.log(data);

      var id = data.id;
      if (id.toString() >= '1000' && id.toString() < '2000') {
        //console.log(id)
        //console.log(id.toString()+1)
        this.is697 = true;
        this.is926 = false;
        this.is3000 = false;
      } else if (id.toString() >= '2000' && id.toString() < '3000') {
        //console.log("aaaa")
        //console.log(id.toString())
        this.is697 = false;
        this.is3000 = false;
        this.is926 = true;
      } else if (id.toString() >= '3000' && id.toString() < '4000') {
        this.is697 = false;
        this.is926 = false;
        this.is3000 = true;
        if (id.toString() >= '3101' && id.toString() < '3200') {
          this.getTrainData(data);
        }
      }
      //刷新保存数据
      if (data.children) {

      } else {
        this.$store.commit('exerciseData', data)
      }
    }

  },
  mounted(){
    this.Train1();
    //获取左边列表
    axios.post('/teacherCMS/getCenterTree', {
      data: {
        user: 234
      }
    }).then((res) => {
      console.log(res.data[0].children[1].children);
      this.data = res.data[0].children[1].children;
      this.$refs.extree.setCurrentKey(this.keyId)

    }).catch(function (error) {
      console.log("error init." + error)
    });

    //默认展开，标红
    var id = this.$store.state.exerciseData.id;
    if(id >= 1000 && id < 2000){
        this.courseId1 = 1000;
        this.courseId2 = id;
        this.keyId = id;
    }else if(id >= 2000 && id < 3000){
        this.courseId1 = 2000;
        this.courseId2 = id;
        this.keyId = id;
    }else if(id >= 3000 && id < 4000){
      this.courseId1 = 3000;
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
.e-content-tree ul li{
    list-style: none;
}
.e-content-tree a{
    color: inherit;
    cursor: pointer;
    text-decoration:none;
}
.e-content-tree a:hover{
    text-decoration: none;
    color: #f00;
}
.e-content-tree a:focus {
    color: #f00;
    text-decoration: none;
}
.e-content-tree hr{
    margin-top: 2px;
    margin-bottom:2px;
}
.e-content-tree .exerciseCenter-container{
    min-width:960px;
}
.e-content-tree{
    width:100%;
    margin:0 auto;
    margin-top:6px;
    margin-bottom:80px;
}
.e-content-tree .exerP{
    font-size:20px;
    margin-bottom:20px;
}
.e-content-tree .el-tree-node__expand-icon {
    font-size: 16px;
}
.e-content-tree .el-tree-node__label{
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
  font-size: 16px;
  color: #212529;
}
.e-content-tree .el-tree{
    background-color: #ffffff;
    padding: 10px;
    border-radius: 3px;
    border: 1px solid #9f5355;
    text-align:left;
}
.e-content-tree .el-tree-node:focus>.el-tree-node__content {
    background-color: #9f5355;
    color: white;
}
.e-content-tree .el-tree-node__content:hover{
    background-color: #9f5355;
    color: white;
}
.e-content-tree .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #212529;
}
.e-content-tree .el-tabs--border-card>.el-tabs__header .el-tabs__item {
  border: 3px solid #9f5355;
  padding:0 60px;
  border-top: none;
  color: #212529;
}
.e-content-tree .el-tabs--border-card{
    margin-left:20px;
    border: 0;
    border-top: 4px solid #9f5355;
    box-shadow: none;
}
.e-content-tree .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    background-color: #9f5355;
    color: #ffffff;
}
.e-content-tree .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
    background-color: #9f5355;
    color: white;
}
.e-content-tree .el-tabs__item {
  padding:0 60px;
  font-size: 18px;
  line-height: 36px;
}
.e-content-tree .el-tabs--border-card>.el-tabs__header{
  border: none;
  background-color: #ffffff;
}
.e-content-tree .el-tabs__nav{
    float:none;
}
.e-content-tree .exerEngImg{
    width:595px;
    margin:0 auto;
    margin-bottom:20px;
}
.e-content-tree .exerEngImg img{
    width:100%;
}
.e-content-tree .pdf-box{
    width:100%;
  height: 800px;
}
.e-content-tree .el-col-6{
  width: 16%;
}
.e-content-tree .el-tree{
  padding: 0;
  border: 0;
}
.e-content-tree .el-tree-node{
  background-color: #d2d2d2;
}
.e-content-tree .el-tree-node__content{
  border-bottom: 3px solid #ffffff;
}
.e-content-tree.el-tree-node__expand-icon{
  color: #ffffff;
}
.e-content-tree .devDownload{
    width:96.7%;
    height:53px;
    position:absolute;
    background:rgb(82,86,89);
}
.e-content-tree .shiyan .shiyan-1 .el-table th {
  text-align: center;
}
.e-content-tree .shiyan .shiyan-1 .el-table td, .el-table th {
  padding: 2px 0;
}
.e-content-tree .shiyan .shiyan-1 .el-button+.el-button {
  margin-left: 0;
}
.e-content-tree .shiyan .shiyan-1 .el-table .cell{
  text-align: center;
}
.e-content-tree {
  position: relative;
}
.e-content-tree .tab-train .but-addTrain{
  position: absolute;
  top: 40px;
  right: 0;
}
.e-content-tree .shiyan-2 .el-transfer-panel__item .el-checkbox__input {
  position: absolute;
  top: 8px;
  left: 14px;
}
  .e-content-tree .shiyan-2 .el-transfer-panel .el-transfer-panel__header {
    text-align: left;
  }
  .e-content-tree .shiyan-2 .el-checkbox, .el-checkbox__input{
    text-align: left;
  }
  .e-content-tree .shiyan-2 .el-transfer-panel__item{
    height: 26px;
  }
  .e-content-tree .shiyan .el-dialog{
    border-radius: 12px;

  }
</style>
