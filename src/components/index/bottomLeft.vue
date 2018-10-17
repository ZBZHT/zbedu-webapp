<template>
            <div class="bb-left-case">

                <div class="mask-play-right" v-for="item in bottomLeftData">
                    <div class="maskImg"><img :src="url_before + item.url"></div>
                    <img @click="sendButtomLeftVideo(item)" class="play-right" src="src/assets/imgs/play3.png">
                    <p class="p" @click="sendButtomLeftTitle(item)">
                        {{item.title}}
                        <!--<router-link :to="{path:'/courseNoTree/'+item.courseId + '/title/' + item.title}">{{item.title}}</router-link>-->
                    </p>
                </div>


            </div>
</template>

<script>
import axios from 'axios'
import Bus from '../../assets/js/Bus.js'
export default {
  name: 'bottomLeft',
  props :['bottomLeftData'],
  data () {
    return {
      msg: 'bottomLeft',
      url_before:'src/assets/imgs/',
      userType:this.$store.state.userType,
      userName:this.$store.state.username,
    }
  },
  methods: {
//    playBottomLeftVideo(item) {
//      console.log(item)
//      this.$store.commit('noTreeTitle',item);
//      this.$store.commit('noTreeTitle1',item);
//      this.$router.push('/playVideo/'+item.courseId + '/video/' + item.title)
//    },
    //为热门课程给每个课程计数
    countForHot(item){
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
    //我的足迹添加
    myFootPrint(item){
      axios.post('/teacherCMS/addMyfoot', {
        data: {
          userName:this.userName,
          userType:this.userType,
          courseInfo: item
        }
      }).then((res) => {
        console.log(res.data)
        if (res.data.code === 0){
//            this.addSuccess('更新成功');
        }else if (res.data.code === 1){
//          this.$message.error('更新失败');
        }
      });
    },
    //点击标题
    sendButtomLeftTitle(item) {
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName','');
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        //添加item至我的足迹请求
        this.myFootPrint(item);
        this.countForHot(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        Bus.$emit('change','/courseIndex'); //Hub触发事件
      }
    },
    //点击图片
    sendButtomLeftVideo(item) {
      if (this.$store.state.username !== '') {
        this.$store.commit('activeName',3);
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        //添加item至我的足迹请求
        this.myFootPrint(item);
        this.countForHot(item);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        Bus.$emit('change','/courseIndex'); //Hub触发事件
      }
    }
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
    color: #e4393c;
}
a:focus {
    color: #e4393c;
    text-decoration: none;
}
/*    background: #f1eded;*/
.bb-left-case{
    margin-bottom: 45px;
    margin-top:25px;
    margin-left:-24px;
}
.bb-left img{
    margin-top:10px;
}
.bb-left-case .p{
    margin-top:10px;
    margin-left: 23px;
    font-size: 14px;
    width: 134px;
    cursor: pointer;
}
.bb-left .p:hover{
    color:#f00;
}
.mask-play-right {
  margin-top: 12px;
}
.mask-play-right .play-right{
    position: relative;
    top:4px;
    left:61px;
    margin-top:-64px;
    display: none;
}
.mask-play-right .maskImg{
    width:132px;
    height:77px;
}
.mask-play-right .maskImg img{
    width:100%;
    height:100%;
    margin-left: 22px;
  border-radius: 10px;
}
div.mask-play-right:hover .play-right{
    display: block;
    cursor: pointer;
}
.mask-play-right>img{
    margin-top:15px;
}
</style>
