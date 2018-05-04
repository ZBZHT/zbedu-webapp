<template>
  <div class="myExam_cont">

    <!--我的考试-->
      <el-col :span="16">
        <template v-if="">
          1
        </template>
        <template>
          2
        </template>

        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          @node-click="handleNodeClick">
        </el-tree>

      </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'

  export default {
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        data: [{
          courseId: 1,
          label: '一级 1',
          children: [{
            courseId: 4,
            label: '二级 1-1',
            children: [{
              courseId: 9,
              label: '三级 1-1-1'
            }, {
              courseId: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          courseId: 2,
          label: '一级 2',
          children: [{
            courseId: 5,
            label: '二级 2-1'
          }, {
            courseId: 6,
            label: '二级 2-2'
          }]
        }, {
          courseId: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        change_color: {
          backgroundColor: 'red'
        }
      };
    },
    computed: {},
    methods: {
      handleNodeClick(data,node,store) {
          //console.log(core.getServerTime());
      }
    },
    components: {},
    mounted: {
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .myExam_cont .el-tree{

  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .changeColor {
    background-color: red;
  }
  .myExam_cont .el-tree-node{
    background-color: #d2d2d2;
  }
  .myExam_cont .el-tree-node__content{
    border-bottom: 2px solid #fff;
  }

</style>
