<template>
  <div class="courseM_cont">

    <!--课程管理-->
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="系统课程" name="one">

          <el-tree
            :data="centerTree"
            show-checkbox
            node-key="id"
            default-expand-all
            :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span>{{ node.label }}</span>
                  <span>
                    <el-button type="text" size="mini" @click="() => append(node, data)">
                      添加子课程
                    </el-button>
                    <el-button type="text" size="mini" @click="() => addDescribe(node, data)">
                      添加课程简介
                    </el-button>
                    <el-button type="text" size="mini" @click="() => uploadCourse(node, data)">
                      上传课件
                    </el-button>
                    <el-button type="text" size="mini" @click="() => remove(node, data)">
                      删除课程
                    </el-button>
                  </span>
                </span>
          </el-tree>


        </el-tab-pane>
        <el-tab-pane label="精品课程" name="two">精品课程</el-tab-pane>
        <el-tab-pane label="推荐课程" name="three">推荐课程</el-tab-pane>
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
        activeName: 'one'
      }
    },
    computed: {},
    methods: {
      //添加子课程
      append(node, data) {
      },
      //添加课程简介
      addDescribe(node, data) {
      },
      //上传课件
      uploadCourse(node, data) {
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
        console.log(tab, event);
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
        axios.post('/teacherCMS/getCenterTree', {
          data: {
            userID: this.userID,
            userType: this.userType,
          }
        }).then((res) => {
          let resD = res.data.techCosCou[0].course;

          if (resD.length != 0) {

          } else {
            this.warningMsg('服务器返回错误')
          }
          //console.log(this.dataTree);
        });
      },





    },


    mounted() {
        this.getCenterTree();

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
</style>
