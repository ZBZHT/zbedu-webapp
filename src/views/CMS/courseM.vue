<template>
  <div class="courseM_cont">

    <!--课程管理-->
    <el-col :span="19">

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../../server/utils/core.js'

  export default {
    name: 'courseM',
    data() {
      return {
        data: [],
      }
    },
    computed: {},
    methods: {

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


</style>
