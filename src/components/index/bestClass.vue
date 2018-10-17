<template>
<div class="best-class">
    <div class="five-box" v-for="(item,index) in bestClassData">
        <div class="mask-play zz mf">
            <!--<div class="maskImg"><img :src="url_before + item.url"></div>-->
          <div class="maskImg">
            <img v-if="index == 0" src="src/assets/imgs/bestclass2.png">
            <img v-if="index == 1" src="src/assets/imgs/bestclass3.png">
            <img v-if="index == 2" src="src/assets/imgs/bestclass4.png">
            <img v-if="index == 3" src="src/assets/imgs/bestclass5.png">
            <img v-if="index == 4" src="src/assets/imgs/bestclass10.png">
            <!--<p>{{item.label}}</p>-->
          </div>
          <div class="mask">
            <img @click="sendBestVideo(item)" src="src/assets/imgs/play3.png">
            <p class="ppv" @click="sendBestPPT(item)"><span>PPT</span></p>
            <p class="ppv" @click="sendBestVideo(item)"><span>Video</span></p>
          </div>
        </div>
        <p class="p" @click="sendBestTitle(item)">
            {{item.label}}
          <!--<router-link :to="{path:'/courseNoTree/'+ item.courseId + '/label/' + item.title}">{{item.title}}</router-link>-->
        </p>
    </div>
</div>
</template>

<script>
import axios from 'axios'
import Bus from '../../assets/js/Bus.js'
export default {
  name: 'bestClass',
  props:['bestClassData'],
  data () {
    return {
      msg: 'bestClass',
      url_before:'src/assets/imgs/',
      userType:this.$store.state.userType,
      userName:this.$store.state.username,
    }
  },
  methods: {
    //我的足迹添加
    myFootPrint(item){
      axios.post('/teacherCMS/addMyfoot', {
        data: {
          userName:this.userName,
          userType:this.userType,
          courseInfo: item
        }
      }).then((res) => {
          //console.log(res.data);
        if (res.data.code === 0){
//            this.addSuccess('更新成功');
        }else if (res.data.code === 1){
//          this.$message.error('更新失败');
        }
      });
      //为热门课程给每个课程计数
      axios.post('/teacherCMS/countHot', {
        data: {
          courseInfo: item
        }
      }).then((res) => {
        console.log(res.data)

      });
      axios.post('/teacherCMS/studentHot', {
        data: {
          name: this.userName,
        }
      }).then((res) => {
        console.log(res.data)

      });
    },
    //点击课程题目时
    sendBestTitle(item){
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName','');
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        this.myFootPrint(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        Bus.$emit('change','/courseIndex'); //Hub触发事件
      }
    },
    //点击图片或者video按钮时
    sendBestVideo(item){
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName',3);
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        this.myFootPrint(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        Bus.$emit('change','/courseIndex'); //Hub触发事件
      }
    },
    //点击PPT按钮时
    sendBestPPT(item){
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName',2);
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        this.myFootPrint(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        Bus.$emit('change','/courseIndex'); //Hub触发事件
      }
    },

    //以下暂时没用
    /*playBestVideo (item) {
        console.log(item)
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
//        const {href} = this.$router.resolve({
//                name: 'newCourse'
//            });
//        window.open(href, '_blank')
      this.$router.push('/playVideo/'+ item.courseId + '/video/' + item.label)
    },
    playBestPdf (item) {
        console.log(item)
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
      this.$router.push('/playPdf/'+item.courseId + '/pdf/' + item.label)
    }*/
  },
  mounted(){

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a {
    color: inherit;
    cursor: pointer;
}
a:hover{
    text-decoration: none;
}
.best-class{
    display:flex;
    width:960px;
    height:190px;
    margin:0 auto;
    margin-top:10px;
}
.five-box{
  background: #f1eded;
  padding: 9px;
  padding-top: 20px;
  margin-right: 6px;
    width:190px;
    height:190px;
}
.best-class a{
  color:#000;
}
.best-class a:hover{
  color:#e4393c;
}
.best-class .five-box .p{
  margin-top:-25px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  margin-left:9%;
  width: 140px;
  cursor:pointer;
}
.best-class .five-box .p:hover{
  color:#e4393c;
}
.mask-play>img{
  width:169px;
  height:100px;
}
.zz{
    border-radius:10px;
    overflow: hidden;
}
.mf{
    width:169px;
    height:100px;
    margin-bottom:40px;
}
.mask-play .maskImg{
    width:169px;
    height:100px;
    /*background: url("../../../src/assets/imgs/bestclass2.png") no-repeat;*/
    /*background-size:100% 100%;*/
    /*padding-top:18% !important;*/
    /*padding:5%;*/
    /*box-sizing: border-box;*/
}
.mask-play .maskImg img{
    width:100%;
    height:100%;
}
.mask-play .maskImg p{
    font-weight:bolder;
    font-size:18px;
    color:#000;
}
.mask-play .mask{
    width:171px;
    height:100px;
    background: rgba(0, 0, 0, 0.7);
    position: relative;
    top:-100px;
    right:0;
    display:none;
}
.mask>img{
    margin-top:20px;
}
.mask p>span{
    font-size:13px;
}
div.mask-play:hover .mask{
    display: block;
    cursor: pointer;
}
.ppv{
    width:37px;
    height:23px;
    border-radius: 8px;
    background: #fff;
    color:#000;
    margin-left: 124px;
    margin-top:-50px;
    text-align: center;
}
</style>
