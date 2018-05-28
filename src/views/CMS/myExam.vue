<template>
  <div class="myExam_cont">

    <!--我的考试-->
      <el-col :span="16">


        <div>
          {{currentPage}} / {{pageCount}}
          <pdf
            src="../../../server/public/resource/pdf/BMS锂电池管理系统实训台.pdf"
            @num-pages="pageCount = $event"
            @page-loaded="currentPage = $event"
          ></pdf>
        </div>

       </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import pdf from 'vue-pdf'

  export default {
    components: {
      pdf
    },
    data() {
      return {
        currentPage: 0,
        pageCount: 0,
      }
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .myExam_cont .el-carousel__item img {
    height: 500px;
  }

</style>
