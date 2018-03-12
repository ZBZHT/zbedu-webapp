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

      <!--用户管理页面-->
      <div ID="labelAll">

      <el-col :span="20" style="display: none">
        <el-table :data="dataManager" stripe style="width: 100%">

          <el-table-column prop="user" label="用户名" style="width: 10%">
          </el-table-column>

          <el-table-column prop="userID" label="用户ID" style="width: 20%">
          </el-table-column>

          <el-table-column prop="IDNo" label="身份证号" style="width: 30%">
          </el-table-column>

          <el-table-column prop="MoNo" label="手机号" style="width: 10%">
          </el-table-column>

          <el-table-column prop="userType" label="用户类型" style="width: 10%">
          </el-table-column>

          <el-table-column label="操作" style="width: 10%">
          </el-table-column>

        </el-table>
      </el-col>
      </div>


    </el-row>

    <div class="footer">
      <foot-footer></foot-footer>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import navgationHead from '@/components/common/navgationHead'
import swipe from '@/components/testCenter/swipe'
import navUl from '@/components/common/navUl'
import footFooter from '@/components/common/footFooter'

export default {
  name: 'index',

  data () {
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
      dataManager: [{
        user: '',
        userID: '',
        IDNo: '',
        MoNo: '',
        userType: ''
      },
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      url:document.domain,
      handleNode101: false,
      username: this.$store.state.username,
    }
  },
  computed:{
  },
  methods:{
    handleNodeClick(data) {
      console.log(data.id);

      //控制标签的显示和隐藏
      if (data.id == 101) {
        document.getElementById('labelAll')

      }

      if (data.id == 101) {  //用户管理请求
        this.handleNode101 = false;
        axios.get('http://' + this.url + ':8000/teacherCMS/userManager', {
          params: {
            username: this.username
          }
        }).then((res) => {
          this.handleNode101 = true;
          this.dataManager = res.data.userInfo;
        })
      }

      if (data.id == 102) {  //用户管理请求
        this.handleNode = '';
        axios.get('http://' + this.url + ':8000/teacherCMS/userManager', {
          params: {
            username: this.username
          }
        }).then((res) => {
          this.handleNode = 102;
          this.dataManager = res.data.userInfo;
        })
      }
    },

  },
  mounted(){
    },
  components:{navgationHead,swipe,navUl,footFooter}
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
.el-table .cell{
  text-align: left;
}
.dataManager{

}

</style>
