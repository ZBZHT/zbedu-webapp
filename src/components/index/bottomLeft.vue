<template>
            <div class="bb-left-case">

                <div class="mask-play-right" v-for="item in bottomLeftData">
                    <img :src="item.url">
                    <img @click="playBottomLeftVideo" class="play-right" src="src/assets/play3.png">
                    <p class="p" @click="sendButtomLeftTitle(item,item.title)"><router-link :to="{path:'/courseNoTree'}">{{item.title}}</router-link></p>
                </div>


            </div>
</template>

<script>
import navs from '@/assets/index-data.js'
import bus from '../../assets/js/Bus'
export default {
  name: 'bottomLeft',
  props :['bottomLeftData'],
  data () {
    return {
      msg: 'bottomLeft'
    }
  },
  methods: {
    playBottomLeftVideo() {
      this.$router.push('/playVideo')
    },
    sendButtomLeftTitle(item,title) {
      bus.$emit('sendLeftData',item,title)
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
    margin-top:15px;
    font-size: 16px;
}
.mask-play-right .play-right{
    position: relative;
    top:-10px;
    left:61px;
    margin-top:-64px;
    display: none;
}
div.mask-play-right:hover .play-right{
    display: block;
    cursor: pointer;
}
.mask-play-right>img{
    margin-top:24px;
}
</style>
