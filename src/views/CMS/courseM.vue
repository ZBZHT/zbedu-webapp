<template>
  <div class="courseM_cont">

    <!--课程管理-->
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="系统课程" name="one">

          <!--<el-table class="userM_el-table" :data="centerTree.slice((currentPage1-1)*pagesize,currentPage1*pagesize)"-->
          <!--stripe style="width: 90%;">-->
            <!--<el-table-column prop="label" label="课程名称">-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" style="width: 100px" >-->
              <!--<template slot-scope="scope">-->
                <!--<el-button size="small" class="userM_el-tableBut"-->
                           <!--@click="handleEdit(scope.$index, scope.row)">新增为精品课程-->
                <!--</el-button>-->
                <!--<el-button size="small" class="userM_el-tableBut"-->
                           <!--@click="handleEdit1(scope.$index, scope.row)">新增为推荐课程-->
                <!--</el-button>-->
                <!--&lt;!&ndash;<el-button size="small" class="userM_el-tableBut"&ndash;&gt;-->
                           <!--&lt;!&ndash;@click="delChecked(scope.$index, scope.row)">删除&ndash;&gt;-->
                <!--&lt;!&ndash;</el-button>&ndash;&gt;-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->

          <el-button @click="getCheckedNodes">新增为精品课程</el-button>
          <el-button @click="getCheckedNodes1">新增为推荐课程</el-button>
          <el-tree
            node-key="courseId"
            :props="defaultProps"
            :data="centerTree"
            accordion
            show-checkbox
            ref="tree"
            highlight-current
            @check-change="handleCheckChange"></el-tree>


        </el-tab-pane>
        <el-tab-pane label="精品课程" name="two">

          <!--<el-table class="userM_el-table" :data="bestCourseTree"-->
                    <!--stripe style="width: 90%;">-->
            <!--<el-table-column prop="num" label="序号" width="90">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="label" label="课程名称">-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" style="width: 100px" >-->
              <!--<template slot-scope="scope">-->
                <!--<el-button size="small" class="userM_el-tableBut"-->
                <!--@click="delChecked(scope.$index, scope.row)">删除-->
                <!--</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->

          <div class="tableL">
            <div class="colNum">
              <p>序号</p>
              <div v-for="item in bestCourseTreeIndex">{{item}}</div>
            </div>
            <div class="colCourse">
              <p>课程名称</p>
              <div
                class="color-item"
                v-for="bestCourse in bestCourseTree"
                v-dragging="{ item: bestCourse, list: bestCourseTree, group: 'bestCourse' }"
                :key="bestCourse.label">{{bestCourse.label}}</div>
            </div>
            <div class="colDel">
              <p>操作</p>
              <el-button v-for="(item,index) in bestCourseTree" size="small" class="userM_el-tableBut"
                         @click="delChecked(index,item)">删除
              </el-button>
            </div>
          </div>

        </el-tab-pane>
        <el-tab-pane label="推荐课程" name="three">

          <!--<el-table class="userM_el-table" :data="suggCourseTree.slice((currentPage1-1)*pagesize,currentPage1*pagesize)"-->
                    <!--stripe style="width: 90%;">-->
            <!--<el-table-column prop="num" label="序号" width="90">-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="label" label="课程名称">-->
            <!--</el-table-column>-->
            <!--<el-table-column label="操作" style="width: 100px" >-->
              <!--<template slot-scope="scope">-->
                <!--<el-button size="small" class="userM_el-tableBut"-->
                           <!--@click="delChecked1(scope.$index, scope.row)">删除-->
                <!--</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->

          <div class="tableL">
            <div class="colNum">
              <p>序号</p>
              <div v-for="item in suggCourseTreeIndex">{{item}}</div>
            </div>
            <div class="colCourse">
              <p>课程名称</p>
              <div
                class="color-item"
                v-for="suggCourse in suggCourseTree"
                v-dragging="{ item: suggCourse, list: suggCourseTree, group: 'suggCourse' }"
                :key="suggCourse.label">{{suggCourse.label}}</div>
            </div>
            <div class="colDel">
              <p>操作</p>
              <el-button v-for="(item,index) in suggCourseTree" size="small" class="userM_el-tableBut"
                         @click="delChecked1(index,item)">删除
              </el-button>
            </div>
          </div>

          <!--分页显示-->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="pagesize"
            layout="prev, pager, next, jumper"
            :total=parseInt(total1)>
          </el-pagination>
        </el-tab-pane>
      </el-tabs>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  let id = 1000;

  export default {
    name: 'courseM',

    data() {
      return {
        centerTree: [],
        activeName: 'one',
        userID:this.$store.state.userID,
        userType:this.$store.state.userType,
        currentPage1: 1,
        pagesize: 10,
        total1: '',
        bestCourseTree:[],
        bestCourseTreeIndex:[],
        suggCourseTree:[],
        suggCourseTreeIndex:[],
        defaultProps: {
          children: 'children',
          label: 'label',
        },

      }
    },
    computed: {},
    mounted() {
      this.getCenterTree();
      this.getBestCourse();
      this.$dragging.$on('dragged', ({ value }) => {
//        console.log(value)
        if(value.group == 'bestCourse'){
          axios.post('/teacherCMS/updateBestCourse', {
            data: {
              userType:this.userType,
              courseInfo: value.list
            }
          }).then((res) => {
//          console.log(res.data)
            if (res.data.code === 0){
//            this.addSuccess('更新成功');
            }else if (res.data.code === 1){
              this.$message.error('更新失败');
            }
          });
        }else if(value.group == 'suggCourse'){
//          console.log('我是小可爱')
          axios.post('/teacherCMS/updateSuggCourse', {
            data: {
              userType:this.userType,
              courseInfo: value.list
            }
          }).then((res) => {
//          console.log(res.data)
            if (res.data.code === 0){
//            this.addSuccess('更新成功');
            }else if (res.data.code === 1){
              this.$message.error('更新失败');
            }
          });
        }

      })
    },
    methods: {
      handleCheckChange(data, checked){
//        if(!data.children){
//          console.log(data, checked);
//          if(checked === true){
//            var newData = []
//            newData.push(data)
//            console.log(newData)
//          }
//        }
      },


      //新增为推荐课程
      getCheckedNodes1(){
        var arr = this.$refs.tree.getCheckedNodes()
        var newData = []
        for(var i = 0; i < arr.length; i++){
          if(!arr[i].children){
            newData.push(arr[i])
            console.log(newData)
          }
        }
        axios.post('/teacherCMS/addSuggCourse', {
          data: {
            userType:this.userType,
            courseInfo: newData
          }
        }).then((res) => {
//          console.log(res.data)
          if (res.data.code === 0){
            this.addSuccess('添加成功');
            this.getBestCourse();
          }else if (res.data.code === 1){
            this.$message.error('添加失败');
          }else if (res.data.code === 2){
            this.$message.error('推荐课程有点多哦');
          }
        });
//        this.getCenterTree();
      },
      //新增为精品课程
      getCheckedNodes(){
//        console.log(this.$refs.tree.getCheckedNodes());
        var arr = this.$refs.tree.getCheckedNodes()
        var newData = []
        for(var i = 0; i < arr.length; i++){
          if(!arr[i].children){
            newData.push(arr[i])
            console.log(newData)
          }
        }
        axios.post('/teacherCMS/addBestCourse', {
          data: {
            userType:this.userType,
            courseInfo: newData
          }
        }).then((res) => {
//          console.log(res.data)
          if (res.data.code === 0){
            this.addSuccess('添加成功');
            this.getBestCourse();
          }else if (res.data.code === 1){
            this.$message.error('添加失败');
          }else if (res.data.code === 2){
            this.$message.error('精品课程不能超过5个哦');
          }
        });
//        this.getCenterTree();
      },
      //获取精品课程
      //获取推荐课程
      getBestCourse(){
        axios.post('/teacherCMS/getBestCourse', {
          data: {
            userType:this.userType
          }
        }).then((res) => {
//          console.log(res.data)
          this.bestCourseTreeIndex = []
          this.suggCourseTreeIndex = []
          this.bestCourseTree = res.data.result[0].bestCourse;
          for(var i = 0; i < this.bestCourseTree.length; i++){
//            this.bestCourseTree[i].num = i + 1;
            this.bestCourseTreeIndex.push(i+1)
          }
          this.suggCourseTree = res.data.result[0].suggCourse;
          for(var j = 0; j < this.suggCourseTree.length; j++){
//            this.suggCourseTree[j].num = j + 1;
            this.suggCourseTreeIndex.push(j+1)
          }
          this.total1 = this.suggCourseTree.length;
//          console.log(this.total1)
//          console.log(this.bestCourseTree)
        });
      },
      // 成功后提示信息
      addSuccess(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },

      //删除精品课程
      delChecked(index,data){
//        console.log(index)
//        console.log(data)
        var delData = []
        for(var i = 0; i < this.bestCourseTree.length; i++){
          if(i !== index){
            delData.push(this.bestCourseTree[i])
          }
        }
        this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/teacherCMS/delBestCou', {
            data: {
              userType:this.userType,
              courseInfo: delData
            }
          }).then((res) => {
            console.log(res.data)
          if (res.data.code === 0){
            this.addSuccess('删除成功');
            this.getBestCourse();
          }else if (res.data.code === 1){
            this.$message.error('删除失败');
          }
          });
          this.getBestCourse();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });

        console.log(delData)
      },
      //删除推荐课程
      delChecked1(index,data){
        var delData = []
        for(var i = 0; i < this.suggCourseTree.length; i++){
          if(i !== index){
            delData.push(this.suggCourseTree[i])
          }
        }
        this.$confirm('此操作将删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.post('/teacherCMS/delSuggCou', {
            data: {
              userType:this.userType,
              courseInfo: delData
            }
          }).then((res) => {
            console.log(res.data)
            if (res.data.code === 0){
              this.addSuccess('删除成功');
              this.getBestCourse();
            }else if (res.data.code === 1){
              this.$message.error('删除失败');
            }
          });
          this.getBestCourse();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //删除子节点
      remove(node, data) {
        this.$confirm('此操作将永久删除该课程, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          this.updateCustomCourse();
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
      handleClick(tab, event) {
//        console.log(tab, event);
      },
      //更新到服务器
      updateCenterTree(d) {
        axios.post('/teacherCMS/updateCenterTree', {
          data: {
            userID: this.userID,
            userType: this.userType,
            course: this.resDataTree,
          }
        }).then((res) => {
          let resD = res.data;
          if (resD.code == 0) {
            if (d == 0) {
              this.successMsg('添加课程成功')
            } else if (d == 1) {
              this.successMsg('添加子课程成功')
            } else if (d == 2) {
              this.successMsg('添加课程简介成功')
            }
          } else {
            this.warningMsg('服务器返回错误')
          }
          //console.log(this.resDataTree[0]);
          //this.$set(this.dataTree, 0, this.resDataTree[0]);
          this.dataTree.push(this.resDataTree[0]);
        });
      },
      //获取课程树
      getCenterTree() {
        axios.get("/readJson/bannerLeftData",{
          params:{
            user:234
          }
        }).then((res)=>{
//          console.log(res.data[0].children)
          var result = []
          for(var i = 0; i < res.data[0].children.length - 1; i++){
            result.push(res.data[0].children[i])
          }
          this.centerTree = result
        })
//        axios.post('/teacherCMS/getCenterTree', {
//          data: {
//            userID: this.userID,
//            userType: this.userType,
//          }
//        }).then((res) => {
//
////          console.log(res.data[0].children[0].children)
////          this.centerTree = res.data[0].children[0].children;
//          var result = res.data[0].children[0].children
//          console.log(result)
//          this.centerTree = result;
////          for(var i = 0; i < result.length; i++){
//////            if(result[i].children[0].children[0].children){
////            if(i == 0){
//////              console.log(i)
////              for(var j = 0; j < result[i].children[0].children.length; j++){
////                for(var k = 0; k < result[i].children[0].children[j].children.length; k++){
//////                  console.log(result[i].children[0].children[j].children[k].label);
////                  this.centerTree.push(
////                    result[i].children[0].children[j].children[k]
////                  )
////                }
////              }
////              for(var j = 0; j < result[i].children[1].children.length; j++){
////                for(var k = 0; k < result[i].children[1].children[j].children.length; k++){
//////                  console.log(result[i].children[0].children[j].children[k].label);
////                  this.centerTree.push(
////                    result[i].children[0].children[j].children[k]
////                  )
////                }
////              }
//////              console.log(this.centerTree)
//////            }else if(result[i].children[0].children){
////            }else if(i == 1 || i == 2 || i == 3){
//////              console.log(i)
////              for(var j = 0; j < result[i].children.length; j++){
////                for(var k = 0; k < result[i].children[j].children.length; k++){
//////                  console.log(result[i].children[j].children[k].label);
////                  this.centerTree.push(
////                    result[i].children[j].children[k]
////                  )
////                }
////              }
////            }else if(i == 4 || i == 5){
//////              console.log(i)
//////              console.log("Dpdd")
////              for(var j = 0; j < result[i].children.length; j++){
//////                  console.log(result[i].children[j].label);
//////                  this.centerTree.push(result[i].children[j].label)
////                this.centerTree.push(
////                  result[i].children[j]
////                )
////              }
////            }else{}
////          }
////          console.log(this.centerTree)
//
//        })
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },




    },

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .courseM_cont .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .courseM_cont .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .courseM_cont .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
    font-size: 16px;
  }
  .courseM_cont {
  }
  .courseM_cont {
  }
  .courseM_cont .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .CMS_cont .el-tree-node:focus>.el-tree-node__content {
     background-color: white;
  }
/*
  .CMS_cont .el-tree-node:focus>.el-tree-node__content, .el-tree-node__content:hover {
     background-color: #d9d9d9;
  }
*/
  .courseM_cont .tableL{
    width:90%;
    background: #fff;
    display:flex;
    padding:10px;
    box-sizing: border-box;
    margin-bottom:30px;
  }
  .courseM_cont .tableL p{
    line-height: 23px;
    font-size: 14px;
    font-weight: bolder;
    color:rgb(144,147,158);
  }
  .courseM_cont .colDel{
    width:6%;
    text-align:left;
    font-size: 14px;
    line-height: 35px;
  }
  .courseM_cont .colNum{
    width:9%;
    text-align:left;
    font-size: 14px;
    line-height: 35px;
  }
  .courseM_cont .colCourse{
    width:46%;
    text-align:left;
    font-size: 14px;
    line-height: 35px;
    cursor: pointer;
  }
  .courseM_cont .colDel .el-button{
    margin-left:0px;
  }
</style>
