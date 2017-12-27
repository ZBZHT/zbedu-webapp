<template>
  <li>
    <span @click="toggle">
     <i v-if="isInclude" class="icon" :class="[open ? 'folder-open': 'folder']"></i>
     <i v-if="!isInclude" class="icon"></i>
     <a href="#" @click="toFather(model.title)">{{ model.title }}</a>
    </span>
    <ul class="son-box" v-show="open" v-if="isInclude">
      <tree v-for="item in model.children" :model="item"></tree>
    </ul>
  </li>
</template>
<script>
  import bus from '../../assets/js/Bus'
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
      },
      toFather (headings) {
        bus.$emit('sendTitle',headings)
        // alert(index)
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
    line-height: 30px;
    margin-top: 8px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    /*background: red;*/
  }
</style>
