<template>
  <div class="myExam_cont">

    <!--我的考试-->
      <el-col :span="16">
        <el-tabs @tab-click="handleClick">
          <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
          <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
        </el-tabs>

      </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'

  export default {
    name: 'myExam',
    data() {
      return {
      }
    },
    computed: {},
    methods: {
      handleClick(tab, event) {
        console.log(tab.index);
      }
    },
    mounted() {
      /*      axios.post('/teacherCMS/myDataMst', {
              data: {
                username: this.username,
                userType: this.userType,
              }
            }).then((res) => {
              if (res.data.userInfo) {
                //console.log(res.data.userInfo);
                /!*this.dataManager = res.data.userInfo;
                this.total = this.dataManager.length;*!/
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

</style>
