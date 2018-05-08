<template>
            <div class="bb-left-case">

                <div class="mask-play-right" v-for="item in bottomLeftData">
                    <img :src="url_before + item.url">
                    <img @click="playBottomLeftVideo(item)" class="play-right" src="src/assets/imgs/play3.png">
                    <p class="p" @click="sendButtomLeftTitle(item)">
                        {{item.title}}
                        <!--<router-link :to="{path:'/courseNoTree/'+item.courseId + '/title/' + item.title}">{{item.title}}</router-link>-->
                    </p>
                </div>


            </div>
</template>

<script>

export default {
  name: 'bottomLeft',
  props :['bottomLeftData'],
  data () {
    return {
      msg: 'bottomLeft',
      url_before:'src/assets/imgs/'
    }
  },
  methods: {
    playBottomLeftVideo(item) {
      console.log(item)
      this.$store.commit('noTreeTitle',item);
      this.$store.commit('noTreeTitle1',item);
      this.$router.push('/playVideo/'+item.courseId + '/video/' + item.title)
    },
    sendButtomLeftTitle(item) {
      this.$store.commit('noTreeTitle',item);
      this.$store.commit('noTreeTitle1',item);
      const {href} = this.$router.resolve({
            name: 'newCourse'
        });
      window.open(href, '_blank')
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
.bb-left-case{
    margin-bottom: 45px;
    margin-top:25px;
    margin-left:-24px;
}
.bb-left img{
    margin-top:10px;
}
.bb-left .p{
    margin-top:10px;
    margin-left: 23px;
    font-size: 16px;
    width: 134px;
    cursor: pointer;
}
.bb-left .p:hover{
    color:#f00;
}
.mask-play-right .play-right{
    position: relative;
    top:-6px;
    left:61px;
    margin-top:-64px;
    display: none;
}
div.mask-play-right:hover .play-right{
    display: block;
    cursor: pointer;
}
.mask-play-right>img{
    margin-top:15px;
}
</style>
