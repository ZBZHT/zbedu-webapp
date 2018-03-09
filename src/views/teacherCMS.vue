<template>
  <div id="app" class="container">
    <div class="nav">
        <navgation-head></navgation-head>
    </div>
    <el-row>
      <el-col :span="4">
        <el-tree
          :data="data"
          :props="defaultProps"
          node-key="id"
          @node-click="handleNodeClick"></el-tree>
      </el-col>

      <el-col :span="16">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            style="width: 30%">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            style="width: 30%">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
            style="width: 30%">
          </el-table-column>
          <el-table-column
            label="操作"
            style="width: 30%">
          </el-table-column>
        </el-table>
      </el-col>

    </el-row>

    <div class="footer">
        <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navgationHead from '@/components/common/navgationHead'
import footFooter from '@/components/common/footFooter'

export default {
  name: 'sourceCenter',
  data() {
    return {
      data: [{
        label: '数据管理',
        children: [
          {label: '用户管理', id: '101'},
          {label: '题库管理', id: '102'},
          {label: '考试管理', id: '103'},
          {label: '评论管理', id: '104'},
          ]
      }, {
        label: '个人中心',
        children: [
          {label: '二级 2-1', id: '201'},
          {label: '二级 2-2', id: '202'},
          ]
      }, {
        label: '系统设置',
        children: [
          {label: '二级 3-1', id: '301'},
          {label: '二级 3-2', id: '302'},
          ]
      }],
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  computed:{

      },
  methods: {
    components: {
    },
    handleNodeClick(data) {
      console.log(data.id);
      console.log(data);
    },
  },
  mounted(){
    axios.get("http://192.168.2.251:8000/readJson/bannerLeftData",{
      params:{
        user:6666
      }
    }).then((res)=>{
         console.log(res.data[0])
      }
    )
    },
  components:{navgationHead,footFooter}
}
</script>

<style>
*{
    margin:0;
    padding:0;
}
.el-tree-node__expand-icon{
  font-size: 16px;
}
.el-tree-node__label{
  font-size: 16px;
}
.el-tree{
  background-color: #dcdfe6;
}

</style>
