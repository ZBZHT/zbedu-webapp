<template>
  <div class="user-box">
    <p class="">用户管理中心</p>
    <div class="left-box">
      <ul >
        <li v-for="(list,index) in leftData" @click="clickItem(index)" >
          <div>
            <span :class="{'addAtt':highlighted}"><a  href="#">{{ list.leftTitle }}</a></span>
          </div>
        </li>
      </ul>
    </div>
    <div class="myCourse-box" v-show="currentBox === 0">
      <ul>
        <li v-for="list in leftData">
          <a href="#">{{ list.titleId }}</a>
        </li>
      </ul>
    </div>
    <div class="myTest-box" v-show="currentBox === 1">
      <h1>我的考试</h1>
    </div>
    <div class="myComment-box" v-show="currentBox === 2">
      <h1>我的评价</h1>
    </div>
    <div class="myCount-box" v-show="currentBox === 3">
      <h1>我的账户管理</h1>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'user',
    data () {
      return {
        leftData: [
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
          ],
        currentBox: 0,
        highlighted: true

      }
    },
    methods: {
      clickItem: function (index) {
        this.currentBox = index
      },
      leave () {

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
  .myCourse-box{
    width: 600px;
    height: 500px;
    text-align: center;
    background: pink;
    position: absolute;
    left: 350px;
    top: 100px;
  }
  .myCourse-box ul{
    display: flex;
  }
  .left-box li{
    height:50px;
    line-height: 50px;
    font-size: 20px;
    border-bottom: 1px solid #333;
  }
  .addAtt{
    color: red;
  }
  .left-box li:last-child{
    border-bottom: none;
  }
  .left-box a{
    color: black;
    text-decoration: none;
  }
  .left-box a:hover{
    color: red;
  }

  .myCourse-box li{
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    width: 150px;
    border-bottom:2px solid #333;
    box-sizing: border-box;
  }
  .myTest-box{
    width: 600px;
    height: 500px;
    background: lightsalmon;
    position: absolute;
    left: 350px;
    top: 100px;
  }
  .myComment-box{
    width: 600px;
    height: 500px;
    background: bisque;
    position: absolute;
    left: 350px;
    top: 100px;
  }
  .myCount-box{
    width: 600px;
    height: 500px;
    background: lavender;
    position: absolute;
    left: 350px;
    top: 100px;
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


</style>
