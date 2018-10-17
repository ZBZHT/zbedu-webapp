<template>
  <!--我的考试-->
  <div class="myExam_cont">
    <!--学生-->
    <div v-if="userType === 'S'">
      222
    </div>
    <!--教师-->
    <div class="teacherPart" v-if="userType !== 'S'">
      <el-tabs type="border-card" style="float:none;">

        <!--待考试-->
        <el-tab-pane label="待考试">
          <el-table style="width: 100%" :data="toTestData">

            <el-table-column label="序号" type="index" width="60">
            </el-table-column>

            <el-table-column label="考试题目" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.theme }}</span>
              </template>
            </el-table-column>

            <el-table-column label="开始日期" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.date1 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="开始时间" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.date3 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="考试类型" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.currTestType }}</span>
              </template>
            </el-table-column>

            <el-table-column label="考试数目" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.num }}</span>
              </template>
            </el-table-column>

            <el-table-column label="详细信息" width="100">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="getToMoreData(scope.$index, scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--查看对话框-->
          <el-dialog title="查看详情"
                     width="59%"
                     :before-close="handleClose"
                     :visible.sync="dialogTableVisible1">
            <el-table :data="toMoreData">
              <el-table-column property="user" label="创建人" width="80"></el-table-column>
              <el-table-column property="theme" label="名称" width="120"></el-table-column>
              <el-table-column property="currTestType" label="试题类型" width="100"></el-table-column>
              <el-table-column property="num" label="总题数" width="70"></el-table-column>
              <el-table-column property="major" label="专业" width="100"></el-table-column>
              <el-table-column property="classGrade" label="班级" width="60"></el-table-column>
              <el-table-column property="allScore" label="总分" width="60"></el-table-column>
              <el-table-column property="date1" label="开始日期" width="100"></el-table-column>
              <el-table-column property="date3" label="开始时间" width="100"></el-table-column>
              <el-table-column property="date2" label="结束日期" width="100"></el-table-column>
              <el-table-column property="date4" label="结束时间" width="100"></el-table-column>
              <el-table-column property="newData" label="创建时间" width="100"></el-table-column>
            </el-table>
          </el-dialog>

        </el-tab-pane>

        <!--历史考试-->
        <el-tab-pane label="历史考试">
          <el-table style="width: 100%" :data="historyTestData.slice((currentPage1-1)*pagesize,currentPage1*pagesize)">

            <el-table-column label="序号" type="index" width="60">
            </el-table-column>

            <el-table-column label="考试题目" width="150">
              <template slot-scope="scope">
                <span>{{ scope.row.theme }}</span>
              </template>
            </el-table-column>

            <el-table-column label="开始日期" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.date1 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="开始时间" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.date3 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="考试类型" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.currTestType }}</span>
              </template>
            </el-table-column>

            <el-table-column label="考试数目" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.num }}</span>
              </template>
            </el-table-column>

            <el-table-column label="详细信息">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="getToHistoryData(scope.$index, scope.row)">
                  查看
                </el-button>
              </template>
            </el-table-column>

          </el-table>

          <!--分页显示-->
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage1"
              :page-size="pagesize"
              layout="prev, pager, next, jumper"
              :total=parseInt(total2)>
            </el-pagination>
          </div>

          <!--查看对话框-->
          <el-dialog title="查看详情"
                     width="59%"
                     :before-close="handleClose"
                     :visible.sync="dialogTableVisible2">
            <el-table :data="toHistoryData">
              <el-table-column property="user" label="创建人" width="80"></el-table-column>
              <el-table-column property="theme" label="名称" width="120"></el-table-column>
              <el-table-column property="currTestType" label="试题类型" width="100"></el-table-column>
              <el-table-column property="num" label="总题数" width="70"></el-table-column>
              <el-table-column property="major" label="专业" width="100"></el-table-column>
              <el-table-column property="classGrade" label="班级" width="60"></el-table-column>
              <el-table-column property="allScore" label="总分" width="60"></el-table-column>
              <el-table-column property="date1" label="开始日期" width="100"></el-table-column>
              <el-table-column property="date3" label="开始时间" width="100"></el-table-column>
              <el-table-column property="date2" label="结束日期" width="100"></el-table-column>
              <el-table-column property="date4" label="结束时间" width="100"></el-table-column>
              <el-table-column property="newData" label="创建时间" width="100"></el-table-column>
            </el-table>
          </el-dialog>

        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js';

  export default {
    components: {
    },
    data() {
      return {
        user: this.$store.state.username,
        userType:this.$store.state.userType,
        toTestData: [],
        toTestDataIndex:[],
        toHistoryData: [],
        historyTestData: [],
        historyTestDataIndex:[],
        toMoreData: [],
        dialogTableVisible1: false,
        dialogTableVisible2: false,
        currentPage1: 1,
        total2: '',
        pagesize: 10,
      }
    },
    mounted(){
      //请求历史考试数据
      axios.get("/readTestQuestion/historyTestData", {
        params: {
          user: this.user,
        }
      }).then((res) => {
        //console.log(res.data);
        let resData = res.data.result;
        if (res.data.code === 0) {
          for (let i = 0; i < resData.length; i++) {
            resData[i].newData = moment(resData[i].newData).format("YYYY-MM-DD hh:mm:ss");
            resData[i].date1 = moment(resData[i].date1).format("YYYY-MM-DD");
            resData[i].currTestType = core.getCurrTestType(resData[i].currTestType);
            resData[i].historyTestDataIndex = i;
          }
          this.historyTestData = [];
          this.historyTestData = resData;
          this.total2 = this.historyTestData.length;
        } else if (res.data.code === 1) {
        }
      });
      //请求待考试数据
      this.toTestDataReq();
    },
    methods: {
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      //考试管理,历史考试,查看
      getToHistoryData(index, row) {
        this.dialogTableVisible2 = true;
        row.date1 = moment(row.date1).format("YYYY-MM-DD");
        row.date2 = moment(row.date2).format("YYYY-MM-DD");
        row.newData = core.formatDate("yyyy-MM-dd", new Date(row.newData));
        this.toHistoryData.push(row);
        //console.log(this.toHistoryData);

      },
      //考试管理,待考试,查看
      getToMoreData(index, row) {
        this.dialogTableVisible1 = true;
        row.date1 = moment(row.date1).format("YYYY-MM-DD");
        row.date2 = moment(row.date2).format("YYYY-MM-DD");
        row.newData = core.formatDate("yyyy-MM-dd", new Date(row.newData));
        this.toMoreData.push(row);
//        console.log('222')
//        console.log(this.toMoreData);
      },
      //关闭三个弹窗,清空数组
      handleClose(done) {
        done();
        this.toMoreData = [];
        this.toHistoryData = [];

      },
      //请求待考试数据
      toTestDataReq() {
        axios.get("/readTestQuestion/toTestData", {
          params: {
            user: this.user,
          }
        }).then((res) => {
          //console.log(res.data);
          let resData = res.data.result;
          if (res.data.code === 0) {
            for (let i = 0; i < resData.length; i++) {
              resData[i].newData = moment(resData[i].newData).format("YYYY-MM-DD hh:mm:ss");
              resData[i].date1 = moment(resData[i].date1).format("YYYY-MM-DD");
              resData[i].currTestType = core.getCurrTestType(resData[i].currTestType);
              resData[i].toTestDataIndex = i;
            }
            this.toTestData = resData;
            this.total1 = this.toTestData.length;
          } else if (res.data.code === 1) {
          }
        });
      },
      //删除按钮
      handleDelete(index, row) {
        //console.log(row.id);
        axios({
          method: 'get',
          url: "/readTestQuestion/dellNewTestQ",
          params: {
            user : this.user,
            id : row.id
          }
        }).then((res) => {
          console.log(res.data.code);
          if (res.data.code == 0) {
            for (let i=0; i<this.toTestData.length; i++) {
              if (this.toTestData[i].id == row.id) {
                //console.log(this.toTestData[i].id);
                let e = core.remove(this.toTestData, this.toTestData[i]);
                //console.log(e);
                this.toTestData = e;
              }
            }
            this.total1 = this.toTestData.length;
            this.Success('删除成功');
          } else if (res.data.code === 1) {
            this.Success('删除成功');
          }

        });
      },
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .myExam_cont .el-table td, .el-table th {
    padding: 6px 0;
  }
  .myExam_cont .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    border-right-color: #6a1518;
    border-left-color: #6a1518;
  }
  .myExam_cont .teacherPart{
    width: 80%;
    float: right;
  }
</style>
