<template>
  <li class="listItem" @mouseenter="enter">
    <span @click="toggle" >
     <i v-if="isInclude" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
     <i v-if="!isInclude" class="icon"></i>
     <a href="#">{{course.title}}</a>
    </span>
    <ul class="son-box" v-show="open">
      <li v-for="(item,index) in course.children" v-if="item" class="sonListItem" @mouseenter="enter1(index)" @mouseleave="leave">
        <span @click="toggle1(index)" :class="{'addBgcolor': isChange && (index === currentIndex)}">
         <i v-if="item.children" class="icon" :class="[(open1 && currentOpenIndex === index) ? 'folder-open': 'folder']"></i>
         <!--<i v-if="!isInclude" class="icon"></i>-->
         <a href="#" @click="sendMsg(item)">{{item.title}}</a>
        </span>
        <ul class="grandson-box" v-show="(open1 && currentOpenIndex === index)" v-if="item">
          <li class="grandsonListItem" v-for="(item2,index2) in item.children" @mouseenter="enter2(index2)" @mouseleave="leave">
            <span :class="{'addBgcolor': isChange && (index2 === currentIndex1)}">
             <i v-if="item && item2"></i>
             <a href="#" @click="sendMsg(item2)">{{item2.title}}</a>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>
<script>
  import Vue from 'vue'

  export default {
    name: 'tree',
    data() {
      return {
        open: true,
        isFolder: true,
        open1: false,
        isInclude:true,
        isChange:false,
        currentIndex:-1,
        currentIndex1:-1,
        currentOpenIndex:-1
      }
    },
    computed:{
      course(){
          return this.$store.state.course;
      }
    },
    methods: {
      toggle: function() {
        if (this.isInclude) {
          this.open = !this.open
        }
      },
      toggle1: function(index) {
        if (this.isInclude) {
          this.open1 = !this.open1
          this.currentOpenIndex = index
        }
      },
      sendMsg(item){
        this.$store.commit('noTreeTitle',item);
      },
      enter1(index) {
        this.isChange = true
        this.currentIndex  = index
        // alert(index)
      },
      enter2(index) {
        this.isChange = true
        this.currentIndex1  = index
        // alert(index)
      },
      leave(){
        this.currentIndex = -1
      },
      enter(){
        this.isChange = true
      }

    },
    mounted () {

    }
  }
</script>
<style scoped>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  a{
    color: #fff;
    text-decoration: none;
  }
  .listItem{
    background: #000;
    /*width: 250px;*/
    line-height: 40px;
    color: #fff;
    margin-left: 10px;
  }
  .listItem span{
    display: inline-block;
    /*line-height: 40px;*/
    width: 270px;
    text-align: left;
    /*background: pink;*/
  }
  .listItem .sonListItem{
    border-bottom: 1px solid #fff;
    line-height: 40px;
    margin-top: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    /*background: lightseagreen;*/
  }
  .listItem  .addBgcolor{
    background: red;
  }
  .listItem a{
    display: inline-block;
    /*width: 230px;*/
    line-height: 40px;
  }
  i.icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    /*margin-left: 30px;*/
    margin-top: -2px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .icon.folder {
    background: #fff;
    background-image: url(/src/assets/add.png);
  }
  .icon.folder-open {
    background: #fff;
    background-image: url(/src/assets/mnus.png);
  }
  .son-box{
    margin: 0px;
    background: #999;
  }
  .grandson-box{
    margin-left: 0px;
    background: #ccc;
  }
  .grandson-box .grandsonListItem{
    border-bottom: 1px solid #fff;
    line-height: 40px;
    overflow: hidden;
    /*margin-left: 20px;*/
  }

  .icon{
    background-image: none;
  }

</style>
