<template>
  <div class="myExam_cont">

    <!--我的考试-->
      <el-col :span="16">
        <el-table
          v-loading="loading1"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>

      </el-col>

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    components: {
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        loading1: true
      }
    },
    methods: {
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

</style>
