<template>
  <li class="listItem">
    <span  >
     <i v-if="!isInclude" class="icon"></i>
     <a href="javascript:void(0)" :title="course.label">{{course.label}}</a>
    </span>
    <ul class="son-box" v-show="open">
      <li v-for="(item,index) in course.children" v-if="item" class="sonListItem" @click="enter1(index)">
        <span @click="toggle1(index);sendMsg(item)" :label="item.label" :class="{'addBgcolor': isChange && (index === currentIndex) && !item.children}">
         <i v-if="item.children" class="icon" :class="[(open1 && currentOpenIndex === index) ? 'folder-open': 'folder']"></i>
         <i v-if="!item.children">&nbsp;&nbsp;&nbsp;</i>
         <a href="javascript:void(0)" :title="item.label">{{item.label}}</a>
        </span>

        <ul class="grandson-box" v-show="(open1 && currentOpenIndex === index)" v-if="item">
          <li class="grandsonListItem" v-for="(item2,index2) in item.children" @click="enter2(index2)">
            <span :class="{'addBgcolor': isChange && (index2 === currentIndex1)}" :label="item2.label" @click="toggle2(index2);sendMsg(item2)">
             <i v-if="item2.children" class="icon" :class="[(open2 && currentOpenIndex2 === index2) ? 'folder-open': 'folder']"></i>
             <i v-if="item && item2"></i>
             <a href="javascript:void(0)" :title="item2.label">{{item2.label}}</a>
            </span>

            <ul class="grandson2-box" v-show="(open2 && currentOpenIndex2 === index2)" v-if="item2">
              <li class="grandsonListItem2" v-for="(item3,index3) in item2.children" @click="enter3(index3)">
                <span :class="{'addBgcolor': isChange && (index3 === currentIndex2)}" :label="item3.label" @click="toggle3(index3);sendMsg(item3)">
                <i v-if="item2 && item3"></i>
                <a href="javascript:void(0)" :title="item3.label">{{item3.label}}</a>
                </span>
              </li>
            </ul>

          </li>
        </ul>
      </li>
      
    </ul>
  </li>
</template>
<script>
  import Vue from 'vue'
  import axios from 'axios'
  export default {
    name: 'tree',
    data() {
      return {
        open: true,
        isFolder: true,
        open1: false,
        open2: false,
        open3: false,
        isInclude:true,
        isChange:false,
        isChange1:false,
        currentIndex:-1,
        currentIndex1:-1,
        currentIndex2:-1,
        currentOpenIndex:-1,
        currentOpenIndex2:-1,
        currentOpenIndex3:-1
      }
    },
    computed:{
      course(){
          return this.$store.state.course;
      }
    },
    methods: {
      // toggle: function() {
      //   if (this.isInclude) {
      //     this.open = !this.open
      //   }
      // },
      toggle2: function(index) {
        if (this.isInclude) {
          this.open2 = !this.open2
          this.currentOpenIndex2 = index
        }
      },
      toggle1: function(index) {
        if (this.isInclude) {
          this.open1 = !this.open1
          this.currentOpenIndex = index
        }
      },
      toggle3: function(index) {
        if (this.isInclude) {
          this.open3 = !this.open3
          this.currentOpenIndex3 = index
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
        // alert(3333)
      },
      enter3(index) {
        this.isChange = true
        this.currentIndex2  = index
        // alert(3333)
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
  .listItem a{
    color: #fff;
    text-decoration: none;
  }
  .listItem a:hover{
    color: #fff;
    text-decoration: none;
  }
  .listItem{
    background: #000;
    font-size: 18px;
    line-height: 40px;
    color: #fff;
    margin-left: 10px;
  }
  .listItem span{
    display: inline-block;
    /*line-height: 40px;*/
    width: 270px;
    text-align: left;
    cursor: pointer;
    /*background: pink;*/
  }
  .listItem .sonListItem{
    border-bottom: 1px solid #fff;
    line-height: 40px;
    margin-top: 0px;
    font-weight: normal;
    text-overflow: ellipsis;
    white-space: nowrap;
    padding-left: 20px;
    /*background: lightseagreen;*/
  }
  .listItem .sonListItem span{
    margin-left: -20px;
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
    background-image: url(/src/assets/imgs/add.png);
  }
  .icon.folder-open {
    background: #fff;
    background-image: url(/src/assets/imgs/mnus.png);
  }
  .son-box{
    margin: 0px;
    background: #999;
  }
  .grandson-box{
    margin-left: 0px;
    /*background: #ccc;*/

  }
  .grandson-box .grandsonListItem2{
    font-size: 18px;
    font-weight: normal;
    border-bottom: 1px solid #fff;
    line-height: 40px;
    height: 40px;
    overflow: hidden;
    padding-left: 20px;
    /*background: pink;*/
  }
  .grandson-box .grandsonListItem span{
    width: 250px;
    text-overflow:ellipsis; white-space:nowrap; overflow:hidden;
  }

  .icon{
    background-image: none;
  }

</style>