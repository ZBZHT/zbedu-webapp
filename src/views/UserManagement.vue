<template>
  <div class="left-box">
    <ul >
      <li v-for="list in leftData.left"><a href="">{{ list.leftTitle }}</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: 'user',
    data () {
      return {
        leftData: {
          left: [
            {
              leftTitle: '我的课程'
            },
            {
              leftTitle: '我的考试'
            },
            {
              leftTitle: '我的评价'
            },
            {
              leftTitle: '账户管理'
            }
          ]
        }
      }
    }
  }
</script>

<style scoped>
  .left-box{
    background: lightgoldenrodyellow;
    width: 200px;
    /*height: 500px;*/
    margin: 100px;
    border: 1px solid #333;
  }
  .left-box li{
    height:50px;
    line-height: 50px;
    font-size: 20px;
    border-bottom: 1px solid #333;
  }
  .left-box li:last-child{
    border-bottom: none;
  }
</style>
