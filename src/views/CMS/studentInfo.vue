<template>
  <div class="studentInfo">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick()">
        <el-tab-pane label="信息查询" name="first">
 
        </el-tab-pane>
        <el-tab-pane label="请假信息" name="second">
 
        </el-tab-pane>
      </el-tabs>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import moment from 'moment'
  

  export default {
    name: 'studentInfo',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        dateData:[],
        rules:{
          classGrade: [
            {required: true, message: '请输入班级', trigger: 'change'}
          ],
        },
      }
    },
    computed: {

    },
    mounted() {
      

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
  .studentInfo .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .studentInfo .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .studentInfo .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .studentInfo .el-table td, .el-table th {
    height: 40px;
  }
  .studentInfo .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  
</style>
