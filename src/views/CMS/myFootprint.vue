<template>
  <div class="myFootprint_cont">

    <!--我的足迹-->
    <el-col :span="19">

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="历史浏览" name="first">

          <el-table
            :data="myFootData"
            style="width: 100%">

            <el-table-column label="序号" type="index" width="60">
            </el-table-column>

            <el-table-column prop="label" label="课程名称" width="220">
            </el-table-column>

            <el-table-column prop="describe" label="课程简介" width="600">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">进入课程</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除记录</el-button>
              </template>
            </el-table-column>

          </el-table>

        </el-tab-pane>
        <!--<el-tab-pane label="备用标签" name="second">备用标签</el-tab-pane>-->
      </el-tabs>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'

  export default {
    name: 'myFootprint',
    data() {
      return {
        activeName: 'first',
        tableData: [],
        userType:this.$store.state.userType,
        userName:this.$store.state.username,
        myFootData:[],
      }
    },
    computed: {},
    mounted() {
      this.getMyFootData()
    },
    methods: {
      //获取我的足迹数据
      getMyFootData(){
        axios.post('/teacherCMS/getMyfoot', {
          data: {
            userName:this.userName,
            userType:this.userType,
          }
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 0){
            this.myFootData = res.data.result
          }else if (res.data.code === 1){
//            this.$message.error('更新失败');
          }
        });
      },
      //我的足迹添加
      myFootPrint(item){
        axios.post('/teacherCMS/addMyfoot', {
          data: {
            userName:this.userName,
            userType:this.userType,
            courseInfo: item
          }
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 0){
//            this.addSuccess('更新成功');
          }else if (res.data.code === 1){
//          this.$message.error('更新失败');
          }
        });
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      //进入课程
      handleEdit(index, item) {
        console.log(index, item);
        this.$store.commit('activeName','');
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        //添加item至我的足迹请求
        this.myFootPrint(item)
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
        this.getMyFootData()
      },
      handleDelete(index, row) {
        console.log(index, row);
      },

    },

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .myFootprint_cont .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myFootprint_cont .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .myFootprint_cont .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .myFootprint_cont .el-table td, .el-table th {
    height: 40px;
  }
  .myFootprint_cont .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }



</style>
