<template>
<div>
  <li class="listItem">
    <span @click="toggle">
     <i v-if="isInclude" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
     <i v-if="!isInclude" class="icon"></i>
     <a href="#" >{{course.title}}</a>
    </span>
    <ul class="son-box" v-show="open">
      <li v-for="item in course.children" v-if="item" class="sonListItem">
        <span @click="toggle1">
         <i v-if="item" class="icon" :class="[open1 ? 'folder-open': 'folder']"></i>
         <i v-if="!isInclude" class="icon"></i>

         <a href="#" >{{item.title}}</a>

        </span>
        <ul class="grandson-box" v-show="open1" v-if="item">
          <li class="grandsonListItem" v-for="item2 in item.children">
            <span>
             <i v-if="item && item2"></i>
             <a href="#" @click="sendMsg(item2)">{{item2.title}}</a>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</div>
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
        isInclude:true
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
        }
      },
      sendMsg(item){
        this.$store.commit('noTreeTitle',item);
      }

    },
    mounted () {

    }
  }
</script>
<style scoped>
  a{
    color: #fff;
    text-decoration: none;
  }
  ul {
    list-style: none;
    text-align: left;
    overflow: hidden;

  }
  .listItem{
    background: #000;
    width: 250px;
    line-height: 40px;
    color: #fff;
    margin-left: 10px;
  }
  .listItem li{
    border-bottom: 1px solid #fff;
    line-height: 40px;
    margin-top: 0px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;

  }
  .listItem a:hover{
    background: red;
    color: #fff;
  }
  .listItem a{
    display: inline-block;
    width: 230px;
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
    margin-left: 0px;
    background: #999;
    overflow: hidden;
  }
  .son-box .sonListItem{
    /*border-bottom: 1px solid #fff;*/
    /*line-height: 40px;*/
  }
  .grandson-box{
    margin-left: 0px;
    background: #ccc;
    overflow: hidden;
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
