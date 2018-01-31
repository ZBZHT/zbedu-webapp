<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div>
      <button class="upload-btn" @click="upload">上传</button>
      <button class="download-btn" @click="download">下载</button>
    </div>


  </div>
</template>


<script>

  import axios from 'axios'
  import navgationHead from '@/components/common/navgationHead'
  import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'

  export default {
    name: 'user',
    data () {
      return {
        files: [],

      }
    },
    computed:{

    },
    methods: {
      upload (){
        alert(111)
      },
      download (){
        alert(222)
      }



    },
    watch: {

    },
    components: {
      navgationHead
    }
  }
</script>

<style scoped>

  .header-box{
    margin: -7px -7px 0px -7px;
  }
</style>
