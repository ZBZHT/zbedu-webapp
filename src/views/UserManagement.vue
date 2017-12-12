<template>
  <div class="user-box">
    <p class=""></p>
    <div class="left-box">
      <ul >
        <li v-for="list in leftData.left" @mouseenter="enter" @mouseleave="leave">
          <div>
            <a href="">{{ list.leftTitle }}</a>
          </div>
        </li>
      </ul>
    </div>
    <div class="center-box">
      <ul>
        <li v-for="list in leftData.left">
          <a href="#">{{ list.titleId }}</a>
        </li>
      </ul>
    </div>
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
              leftTitle: '我的课程',
              titleId: '1',
              items: {
                myCourses: '我的课程'
              }
            },
            {
              leftTitle: '我的考试',
              titleId: '2'
            },
            {
              leftTitle: '我的评价',
              titleId: '3',
              items: {
                type: '考试类型',
                name: '考试名称',
                time: '考试时间',
                score: '考试分数'

              }
            },
            {
              leftTitle: '账户管理',
              titleId: '4'
            }
          ]
        }
      }
    },
    methods: {
      enter: function () {
        alert('111')
      }
    }
  }
</script>

<style scoped>
  .user-box{
    margin: 0;
    width: 100%;
    height:600px;
    background: lightcyan;
    position: relative;
  }
  .center-box{
    width: 600px;
    height: 500px;
    text-align: center;
    background: pink;
    position: absolute;
    left: 350px;
    top: 100px;
  }
  .center-box ul{
    display: flex;
  }
  .center-box li{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    width: 150px;
    border-bottom:2px solid #333;
    box-sizing: border-box;
  }

  .left-box{
    background: lightgoldenrodyellow;
    width: 200px;
    position: absolute;
    left: 100px;
    top: 200px;
    border: 1px solid #333;
    border-radius: 5px;
  }
  /*.detail-box{*/

  /*}*/
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
