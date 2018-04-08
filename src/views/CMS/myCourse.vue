<template>
  <div class="myCourse_cont">

    <!--我的课程-->
    <el-col :span="19">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="我的课程列表" name="first">

            <el-table
              ref="singleTable"
              :data="myCourseTableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
              highlight-current-row
              @current-change="handleCurrentChange"
              style="width: 99%; margin-top: 10px">

              <el-table-column label="序号" type="index" width="60">
              </el-table-column>

              <el-table-column prop="date" label="创建日期" width="160">
              </el-table-column>

              <el-table-column prop="name" label="课程名称" width="130">
              </el-table-column>

              <el-table-column prop="address" label="课程简介" width="260">
              </el-table-column>


              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编 辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删 除</el-button>
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
    name: 'myCourse',
    data() {
      return {
        data: [],
        activeName: 'first',
        currentPage: 1,
        pagesize: 10,
        myCourseTableData: [{
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
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
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
      handleCurrentChange(val) {
        this.currentRow = val;
      },
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
  .myCourse_cont .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myCourse_cont .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myCourse_cont .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .myCourse_cont .el-table td, .el-table th {
    height: 40px;
  }


</style>
