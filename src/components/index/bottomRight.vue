<template>
        <div class="bot-right">
          <el-tabs type="border-card">

            <el-tab-pane label="课程排行">
              <el-table
                :data="bottomRightData"
                :show-header="false"
                @cell-click="sendRecommendTitle"
                style="width: 100%">
                <el-table-column type="index" width="20">
                </el-table-column>

                <el-table-column prop="label" style="width: 130px;">
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane label="学霸排行">
              <el-table
                :data="bottomRightName"
                :show-header="false"
                style="width: 100%">
                <el-table-column type="index" width="20">
                </el-table-column>
                <el-table-column prop="user" style="width: 130px;">
                </el-table-column>
              </el-table>
            </el-tab-pane>

          </el-tabs>
        </div>
</template>

<script>
  import axios from 'axios'

  export default {
  name: 'bottomRight',
  props :['bottomRightData'],
  data () {
    return {
      msg: 'bottomRight',
      top3:true,
      dispear:true,
      userType:this.$store.state.userType,
      userName:this.$store.state.username,
      bottomRightName:[],
    }
  },
  mounted(){
    axios.post('/teacherCMS/getBestCourse', {
      data: {
        userType:this.userType
      }
    }).then((res) => {
      this.bottomRightName = res.data.result[0].studentHot;
    });
  },
  methods:{
      //为热门课程给每个课程计数
      countForHot(item){
        axios.post('/teacherCMS/countHot', {
          data: {
            courseInfo: item
          }
        }).then((res) => {
          //console.log(res.data)

        });
        axios.post('/teacherCMS/studentHot', {
          data: {
            name: this.userName,
          }
        }).then((res) => {
          //console.log(res.data)

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
          if (res.data.code === 0){
  //            this.addSuccess('更新成功');
          }else if (res.data.code === 1){
  //          this.$message.error('更新失败');
          }
        });
      },
      //点击下右侧标题
    sendRecommendTitle(row){
      if (this.$store.state.username !== '') {
        this.$store.commit('noTreeTitle',row);
        this.$store.commit('noTreeTitle1',row);
        //添加item至我的足迹请求
        this.myFootPrint(row);
        this.countForHot(row);
        const {href} = this.$router.resolve({
          name: 'newCourse'
        });
        window.open(href, '_blank')
      } else {
        this.$store.commit('loginPage',true);
      }
    },
      enter1:function(){
        return this.dispear = true
      },

      enter2:function(){
        return this.dispear = false
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
*{
    margin:0;
    padding:0;
}
.bot-right ul li{
    list-style: none;
}
.bot-right a {
    color: inherit;
    cursor: pointer;
}
.bot-right a:hover{
    text-decoration: none;
    color:#f00;
}
.bot-right a:focus {
    color: #f00;
    text-decoration: none;
}
.bot-right b:hover{
    color:#f00;
    cursor:pointer;
}
.bot-right #container{
    position:absolute;;
}
.bot-right #tab{
    display:flex;
    position: relative;
}
.bot-right #tab li{
    float: left;
}
.bot-right ul.tab li a{
    display:inline-block;
}
.bot-right .bb-a{
  color:#222;
  font-size: 17px;
  float: left;
  height: 20px;
  line-height: 20px;
  padding-left: 2px;
  border-left:2px solid #e4393c;
  margin-right:4px;
  margin-bottom:11px;
  padding-right: 2px;
}
.bot-right .bb-a:hover{
    background:#ccc;
}
.bot-right {
  background-color: #f0f3ef;
}
.bot-right .bb-item{
    margin-bottom: 10px;
}
.bot-right .bb-itemName{
    margin-bottom: 10px;
}
.bot-right .bb-item .top3,
.bot-right .bb-itemName .top3{
    background:#e4393c !important;
}
.bot-right p {
  display: inline-block;
  width: 120px;
  font-size: 14px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.bot-right .num {
  display: inline-block;
  width: 16px;
  height: 16px;
  font-size: 12px;
  color: #fff;
  line-height: 16px;
  text-align: center;
  background: #a6a6a6;
  border-radius: 10px;
  margin-left: 5px;
  margin-right: 5px;
}
.bot-right .el-tabs__item {
  padding: 0;
  font-size: 17px;
  padding-left: 4px;
  padding-right: 4px;
  /*background-color: #f1eded;*/
}
.bot-right .el-tabs--border-card>.el-tabs__content {
  display: block;
  height: 451px;
  background-color: #f1eded;
}
.bot-right .el-tabs--border-card {
  border: none;
  -webkit-box-shadow: none;

}
.bot-right .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  background-color: #f1eded;
  color: #7A1213;
}
.bot-right .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #7A1213;
}
  .bot-right .el-tabs--bottom .el-tabs--left .el-tabs__item:nth-child(2), .el-tabs--bottom .el-tabs--right .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--border-card .el-tabs__item:nth-child(2), .el-tabs--bottom.el-tabs--card .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--left .el-tabs__item:nth-child(2), .el-tabs--top .el-tabs--right .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--border-card .el-tabs__item:nth-child(2), .el-tabs--top.el-tabs--card .el-tabs__item:nth-child(2) {
    padding-left: 6px;
  }
  .bot-right .el-tabs--bottom .el-tabs--left .el-tabs__item:last-child, .el-tabs--bottom .el-tabs--right .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--border-card .el-tabs__item:last-child, .el-tabs--bottom.el-tabs--card .el-tabs__item:last-child, .el-tabs--top .el-tabs--left .el-tabs__item:last-child, .el-tabs--top .el-tabs--right .el-tabs__item:last-child, .el-tabs--top.el-tabs--border-card .el-tabs__item:last-child, .el-tabs--top.el-tabs--card .el-tabs__item:last-child {
    padding-right: 6px;
  }
  .bot-right .el-table th, .el-table tr {
    background-color: #f1eded;
    text-align: left;
  }
  .bot-right .el-table td, .el-table th.is-leaf {
    border-bottom: 1px solid #ccc;
  }
  .bot-right .el-table .cell {
    line-height: 20px;
  }
  .bot-right .el-table .cell, .el-table th div, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell {
    padding-left: 4px;
  }
</style>
