<template>
  <li class="listItem">
    <span @click="toggle">
     <i v-if="isInclude" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
     <i v-if="!isInclude" class="icon"></i>
     <a href="#" @click="toFather(model.title)">{{ model.title }}</a>
    </span>
    <ul class="son-box" v-show="open">
      <li v-for="(item,index) in model.children" v-if="model.children&&model.children.length" class="sonListItem">
        <span @click="toggle1">
         <i v-if="item.children&&item.children.length" class="icon" :class="[open1 ? 'folder-open': 'folder']"></i>
         <i v-if="!isInclude" class="icon"></i>

         <a href="#" @click="toFather(item,index)">{{ item.title }}</a>

        </span>
        <ul class="grandson-box" v-show="open1" v-if="item.children && item.children.length">
          <li class="grandsonListItem" v-for="(item1,index) in item.children">
            <span>
             <i v-if="item1.children&&item.children.length"></i>
             <a href="#" @click="toFather(item1,index)">{{ item1.title }}</a>
            </span>
          </li>
        </ul>
      </li>


    </ul>
  </li>
</template>
<script>
  import bus from '../../assets/js/Bus'
  import Vue from 'vue'

  export default {
    name: 'tree',
    props: ['model'],
    data() {
      return {
        open: true,
        isFolder: true,
        open1: false,
        model:''
        // currentModel:''
      }
    },
    computed: {
      isInclude: function() {
        return this.model.children && this.model.children.length
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
      toFather (currentData,index) {
        this.$emit('sendTitle',currentData)
      }
    },
    mounted () {
      var self = this
      bus.$on('passHeaderNavData',function (msg) {
        self.model = msg
        console.log(msg)
      })
    }
  }
</script>
<style>
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
