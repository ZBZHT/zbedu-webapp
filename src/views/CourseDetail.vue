<template>
  <div>
    <div class="header-box">
      <navgation-head></navgation-head>
    </div>
    <div class="content-box">
      <div class="tree-box">
        <div >
          <ul>
            <my-tree class="tree-menu" :model="theModel" @sendTitle="receiveCurrentData"></my-tree>
          </ul>
        </div>
      </div>
      <!--<p>{{theModel.title}}</p>-->
      <div class="right-box">
        <p>{{ subtitle }}</p>
        <p>{{ currentMsg.title }}</p>
        <div class="detail-box">
          <ul class="nav-box">
            <li class="nav-item" v-for="(item,index) in detailNavData" @click="onclick(index)" :class="{'line': index !== currentIndex}">
              {{item }}
            </li>
          </ul>
          <div class="course-box" v-show="this.currentIndex === 0">

            <p>{{ currentMsg.describe }}</p>
            <!--<p class="introduce">{{ theModel.children[0].title }}</p>-->
          </div>
          <div class="appraise-box" v-show="this.currentIndex === 3">
            <p>{{ currentMsg.title }}</p>
            <textarea name="" id="" cols="30" rows="10">各种评价</textarea>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import navgationHead from '@/components/common/navgationHead'
  import myTree from '@/components/courseTree/tree'
  import bus from '../assets/js/Bus'

  var busData = {

  };
  bus.$on('passHeaderNavData',value => {
    busData.theModel = value
    // console.log(value)
  });
  bus.$on('passBannerLeftData', (value) => {
    busData.theModel = value
    busData.subtitle = value.title

  });

  export default {
    name: 'user',
    data () {
      return {
        currentIndex: 0,
        appraiseMsg: '全部评价',
        line: true,
        msg: '',
        detailNavData:["课程详情","教学课件","教学微课","课程评价"],
        theModel: busData.theModel,
        subtitle:busData.subtitle,
        currentMsg:''
      }
    },
    watch:{

    },
    methods: {
      onclick: function (index) {
        this.currentIndex = index
        if (this.currentIndex === 1) {
          this.$router.push({name:'playPdf',params:'playPdf'})
        }
        if (this.currentIndex === 2) {
          this.$router.push({path: '/playVideo'})
        }
      },
      receiveCurrentData (receiveCurrentData) {
        this.currentMsg = receiveCurrentData
        // console.log(this.currentMsg)
      }
    },
    mounted(){
    },
    watch: {

    },
    components: {
      navgationHead,myTree
    }
  }
</script>

<style scoped>
  *{
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
  }
  .content-box .tree-box{
    width: 280px;
    height: 1000px;
    /*background: lightcyan;*/
    position: absolute;
    left: 60px;
  }
  .content-box .right-box{
    width: 800px;
    height: 700px;
    /*background: aliceblue;*/
    position: absolute;
    left: 350px;
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
     margin-left: 50px;
  }
  .right-box .nav-box{
    /*list-style: none;*/
    height: 40px;
    /*background: lightseagreen;*/
    display: flex;
    border-bottom: 1px solid #333;
    box-sizing: content-box;
    margin-bottom: -0px;
  }
  .right-box .nav-box .nav-item{
    /*height: 40px;*/
    line-height: 40px;
    width: 100px;
    background: linen;
    border: 1px solid #444;
    color: red;
    border-radius: 5px 5px 0px 0;
    margin-left: 10px;
    text-align: center;
  }
  .right-box .nav-box .nav-item{
    border-bottom: none;
    margin-bottom: -1px;
  }
  .right-box .nav-box .line{
    border-bottom: 1px solid black;
    color: #000;
  }
  /*.right-box .nav-box .nav-item a{*/
    /*text-decoration: none;*/
    /*color: #000;*/
  /*}*/
  /*.right-box .nav-box .nav-item a:hover{*/
    /*color: red;*/
  /*}*/
  .right-box .nav-box .nav-item:first-child{
    margin-left: 190px;
  }
  .right-box .course-box{
    width: 600px;
    height: 400px;
    margin-left: 7%;
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
    width: 700px;
    height: 400px;
    margin-left: 3%;
    position: relative;
    top: 20px;
    background: lightyellow;
  }
  .right-box .appraise-box p{
    font-weight: normal;
    font-size: 16px;
    text-align: left;
    padding: 10px;
    /*background: red;*/
    border-bottom: 1px solid #ccc;
  }
  .right-box .appraise-box textarea{
    width: 500px;
    height: 300px;
    autofocus: autofocus;
    overflow: hidden;
  }
  .tree-box{
    background: #DDDDDD;
    width: 300px;
    margin-top: 80px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 16px;
    position: relative;

   }
  .tree-menu{
    position: absolute;
    left: 10px;
    /*overflow: hidden;*/
  }
  /*.tree-menu li{*/
    /*margin-left: 0px;*/
  /*}*/

  /*.tree-menu li {*/
  /*text-overflow: ellipsis;*/
  /*overflow: hidden;*/
  /*white-space: nowrap;*/
  /*!*background: red;*!*/
  /*}*/
  /*.noneLine{*/
      /*border-bottom: 1px solid #fff;*/
    /*}*/
</style>
