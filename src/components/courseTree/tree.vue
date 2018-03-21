<template>
  <el-col :span="4">
          <el-tree
            :data="course"
            :props="defaultProps"
            accordion
            node-key="id"
            :default-expanded-keys="[1]"
            @node-click="handleNodeClick"></el-tree>
        </el-col>    
</template>
<script>
  import axios from 'axios'
  export default {
    name: 'tree',
    data() {
      return {
        course:[],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
      }
    },
    computed:{
//      course(){
//          return this.$store.state.course;
//      }
    },
    methods: {
      handleNodeClick(data){
        console.log(data)
      }
    },
    mounted () {
      this.course.push(this.$store.state.course);
      console.log(this.course)
    }
  }
</script>
<style scoped>
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
  }
  

</style>
