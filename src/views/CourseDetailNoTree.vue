<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
      <div class="right-box">
        <p>{{ subtitle }}</p>
        <div class="detail-box">
          <ul class="nav-box">
            <li v-for="(item,index) in detailNavData" @click="onclick(index)" :class="{line:line}">
              <a href="#">{{ item.title}}</a>
            </li>
          </ul>
          <div class="course-box" v-show="this.currentIndex === 0">
            <p class="introduce">动力电池盖拆解的步骤以及电动车高压的安全操作注意事项。工具的使用选择以及注意力的大小，密封胶的清洁</p>
          </div>
          <div class="appraise-box" v-show="this.currentIndex === 3">
            <p>{{ appraiseMsg }}</p>
            <textarea name="" id="" cols="30" rows="10">各种评价</textarea>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import navgationHead from '@/components/common/navgationHead'
  import bus from '../assets/js/Bus'

  var busData = {

  };
  bus.$on('sendLeftData', (value,title) => {
    busData.theModel = value
    busData.subtitle = title
    // alert(title)
    console.log(busData.theModel)
    console.log(title)
  });
  export default {
    name: 'user',
    data () {
      return {
        currentIndex: 0,
        appraiseMsg: '全部评价',
        line: true,
        msg: '',
        subtitle:busData.subtitle,
        detailNavData: [
          {
            "title": "课程详情"
          },
          {
            "title": "教学课件"
          },
          {
            "title": "教学微课"
          },
          {
            "title": "课程评价"
          }
        ]
      }
    },
    methods: {
      onclick: function (index) {
        this.currentIndex = index
        if (this.currentIndex === 1) {
           this.$router.push({path: '/playPdf'})
        }
        if (this.currentIndex === 2) {
          this.$router.push({path: '/playVideo'})
        }
      }
    },
    mounted(){
    },
    watch: {

    },
    components: {
      navgationHead
    }
  }
</script>

<style scoped>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .nav{
    background: #ddd;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
  }
  .content-box{
    width: 100%;
    min-width: 960px;
    margin-top: 150px;
    height: 700px;
    /*background: lightgoldenrodyellow;*/
    position: relative;
    padding: 0 10%;
  }

  .content-box .right-box{
    width: 80%;
    min-width: 1000px;
    height: 700px;
    /*background: aliceblue;*/
    /*margin: 0 150px;*/

  }
  .right-box p{
    font-size: 20px;
    font-weight: bold;
    /*background: pink;*/
    margin-bottom: 50px;
  }
  .right-box .detail-box{
    height: 500px;
    width: auto;
    text-align: center;
  }
  .right-box .nav-box{
    /*list-style: none;*/
    height: 40px;
    /*background: lightseagreen;*/
    display: flex;
    width: 100%;
    border-bottom: 1px solid #333;
    text-align: center;
  }
  .right-box .nav-box li{
    /*height: 40px;*/
    line-height: 40px;
    width: 130px;
    background: linen;
    border: 1px solid #444;
    border-radius: 5px 5px 0px 0;
    margin-left: 10px;

  }
  .right-box .nav-box li{
    border-bottom: none;
  }
  .right-box .nav-box .line{
    /*border-bottom: 1px solid red;*/
  }
  .right-box .nav-box li a{
    text-decoration: none;
    color: #000;
  }
  .right-box .nav-box li a:hover{
    color: red;
  }
  .right-box .nav-box li:first-child{
    margin-left: 23%;
  }
  .right-box .course-box{
    width: 700px;
    height: 400px;
    margin: 0 18%;
    position: relative;
    /*background: lavender;*/
    background: url("../assets/bbb.png") no-repeat;
    padding: 130px 100px;
  }

  .right-box .course-box p{
    width: 500px;
    font-size: 16px;
    font-weight: normal;
    /*background: red;*/
    word-wrap: break-word;
  }
  .right-box .appraise-box{
    width: 900px;
    height: 500px;
    margin-left: 50px;
    position: relative;
    top: 20px;
    background: lightyellow;
  }
  .right-box .appraise-box p{
    font-weight: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    margin: 0 30px 50px;
    /*background: red;*/
    border-bottom: 1px solid #ccc;
  }
  .right-box .appraise-box textarea{
    width: 600px;
    height: 300px;
    autofocus: autofocus;
    overflow: hidden;
  }
  .tree-menu{
    background: pink;
  }

  /*.noneLine{*/
  /*border-bottom: 1px solid #fff;*/
  /*}*/
</style>
