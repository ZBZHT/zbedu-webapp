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
        <ul class="son-box" v-show="open1" v-if="item.children && item.children.length">
          <li v-for="(item1,index) in item.children">
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
        i:''
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
    watch : {
      model(curVal,oldVal){
        if(curVal){
          this.update(curVal)
        }
      }
    }
  }
</script>
<style>
  ul {
    list-style: none;
    text-align: left;
  }
  i.icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 15px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .listItem .sonListItem{
    background: #999;
  }
  /*.listItem .sonListItem li{*/
    /*background: hotpink;*/
    /*display: none;*/
  /*}*/
  .icon.folder {
    background: #A7A5AB;
    background-image: url(/src/assets/add.png);
  }
  .icon.folder-open {
    background: #A7A5AB;
    background-image: url(/src/assets/mnus.png);
  }
  .son-box{
    margin-left: 30px;
  }
  .ccc{
    background: red;
  }
    .icon{
    background-image: none;
  }
  .tree-menu li {
    line-height: 30px;
    margin-top: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /*background: red;*/
  }
</style>
