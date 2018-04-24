<template>
  <div class="courseM_cont">

    <!--课程管理-->
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="历史浏览" name="first">

          <el-table
            :data="tableData"
            style="width: 100%">

            <el-table-column label="序号" type="index" width="60">
            </el-table-column>

            <el-table-column prop="date" label="浏览日期" width="180">
            </el-table-column>

            <el-table-column prop="name" label="课程名称" width="180">
            </el-table-column>

            <el-table-column prop="address" label="课程简介">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">进入课程</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除记录</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-tab-pane>
        <!--<el-tab-pane label="备用标签" name="second">备用标签</el-tab-pane>-->
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
        tableData: [],
        activeName: 'first'
      }
    },
    computed: {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },

      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },


    },

    mounted() {
     /* axios.post('http://' + this.url + ':8000/teacherCMS/userManager', {
        data: {
          username: this.username,
          userType: this.userType
        }
      }).then((res) => {
        if (res.data.userInfo.length > 0) {
          this.dataManager = res.data.userInfo;
          this.total = this.dataManager.length
        }
      });*/

    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
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
