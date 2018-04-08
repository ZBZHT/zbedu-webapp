<template>
  <div class="myFootprint_cont">

    <!--我的足迹-->
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

  export default {
    name: 'myFootprint',
    data() {
      return {
        data: [],
        activeName: 'first',
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
      }
    },
    computed: {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

    },
    mounted() {
     /* axios.post('/teacherCMS/userManager', {
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
  .myFootprint_cont .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myFootprint_cont .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myFootprint_cont .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .myFootprint_cont .el-table td, .el-table th {
    height: 40px;
  }
  .myFootprint_cont .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }



</style>
