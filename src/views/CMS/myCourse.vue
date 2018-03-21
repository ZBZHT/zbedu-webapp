<template>
  <div class="myCourse_cont">

    <!--我的课程-->
    <el-col :span="19">
      题库管理

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../server/utils/core.js'

  export default {
    name: 'myCourse',
    data() {
      return {
        data: [],
      }
    },
    computed: {},
    methods: {
      //删除用户信息方法


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


</style>
