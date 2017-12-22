<template>
  <li>
    <span @click="toggle">
     <i v-if="isInclude" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
     <i v-if="!isInclude" class="icon"></i>
     {{ model.menuName }}
    </span>
    <ul v-show="open" v-if="isInclude">
      <tree-menu v-for="item in model.children" :model="item"></tree-menu>
    </ul>
  </li>
</template>
<script>
  export default {
    name: 'treeMenu',
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
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .icon.folder {
    background-image: url(/src/assets/add.png);
  }
  .icon.folder-open {
    background-image: url(/src/assets/mnus.png);
  }
  /*.icon.file-text {*/
    /*background-image: url(/src/assets/file.png);*/
  /*}*/
  .tree-menu li {
    line-height: 20px;
  }
</style>
