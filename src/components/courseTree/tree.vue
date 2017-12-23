<template>
  <li>
    <span @click="toggle" :class="{'color': red}">
     <i v-if="isInclude" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
     <i v-if="!isInclude" class="icon"></i>
     {{ model.menuName }}
    </span>
    <ul class="son-box" v-show="open" v-if="isInclude">
      <tree v-for="item in model.children" :model="item" :key="item.menuCode"></tree>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'tree',
    props: ['model'],
    data() {
      return {
        open: false,
        isFolder: true
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
    /*.icon.file-text {*/
    /*background-image: url(/src/assets/file.png);*/
  /*}*/
  .tree-menu li {
    line-height: 20px;
    margin-top: 8px;
    /*background: red;*/
  }
</style>
