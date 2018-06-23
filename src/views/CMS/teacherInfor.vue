<template>
  <div class="teacherInfor">
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="考勤动态" name="first">
          <p>课堂信息</p>
          <div class="mainContent">
            <div class="currClass">
              <p>
                <span>课程名称：</span>
              </p>
              <p>
                <span>任课老师：</span>
              </p>
            </div>
            <p>
              <span>签到动态</span>
              <span>(</span>
              <span class="IamHere">出勤</span>
              <span class="IamLate">迟到</span>
              <span class="IamDispear">缺勤</span>
              <span class="IamSick">请假</span>
              <span>)</span>
            </p>
            <div class="currTable">
            
            </div>
          </div>
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
    name: 'teacherInfor',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
      }
    },
    computed: {

    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    },
    mounted() {
        

    },
    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .teacherInfor .el-table td, .el-table th {
    height: 40px;
  }
  .teacherInfor .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .teacherInfor .mainContent{
    width:80%;
    height:700px;
    margin:0 auto;
    padding:15px;
    box-sizing:border-box;
  }
  .teacherInfor .currClass{
    text-align:left;
  }
  .teacherInfor .IamHere{
    background:rgb(158,234,106);
  }
  .teacherInfor .IamLate{
    background:rgb(221,190,69);
  }
  .teacherInfor .IamDispear{
    background:#f00;
  }
  .teacherInfor .IamSick{
    background:#ccc;
  }
</style>
