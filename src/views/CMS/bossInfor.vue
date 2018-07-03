<template>
  <div class="bossInfor">
    <el-col :span="19">
      请选择班级
      <el-select class="selectClass" v-model="classGrade" @change="showThreeTable()" placeholder="请选择班级">
        <div v-for="item in classM">
          <el-option :label="item.label" :value="item.label"></el-option>
        </div>
      </el-select>

      <el-tabs v-model="activeName" type="card" @tab-click="handleClick" v-show="showThree">
        <el-tab-pane label="信息查询" name="first">

          <select-table :course = "course" :mondayDate = "mondayDate" :weekDate = "weekDate"></select-table>

        </el-tab-pane>
        <el-tab-pane label="请假审批" name="second">
          <el-table
            :data="vacApprove"
            stripe
            style="width: 100%">
            <el-table-column prop="name" label="请假人" width="100">
            </el-table-column>

            <el-table-column prop="date" label="请假时间" width="110">
            </el-table-column>

            <el-table-column prop="courseName" label="课程" width="180">
            </el-table-column>

            <el-table-column prop="teacher" label="授课教师" width="100">
            </el-table-column>

            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="ratify(scope.$index, scope.row)">批准</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="prohibit(scope.$index, scope.row)">不批准</el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
      </el-tabs>

    </el-col>

  </div>
</template>

<script>
  import axios from 'axios'
  import core from '../../assets/js/core.js'
  import moment from 'moment'
  import selectTable from './compontents/selectTable'


  export default {
    name: 'bossInfor',
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        activeName: 'first',
        classGrade: '',
        classM:[],
        dateData:[],
        rules:{
          classGrade: [
            {required: true, message: '请输入班级', trigger: 'change'}
          ],
        },
        mondayDate:'',
        weekDate:[],
        course: {},
        showThree:false,
        vacApprove: [{
          date: '2016-05-02',
          name: '王小虎',
          courseName: '新能源电池技术',
          teacher: "付老师",
        }, {
          date: '2016-05-04',
          name: '王小虎',
          courseName: '新能源电池技术',
          teacher: "付老师",
        }, {
          date: '2016-05-01',
          name: '王小虎',
          courseName: '新能源电池技术',
          teacher: "付老师",
        }, {
          date: '2016-05-03',
          name: '王小虎',
          courseName: '新能源电池技术',
          teacher: "付老师",
        }],
        course: [],

      }
    },
    computed: {

    },
    mounted() {
        let date = moment().format("YYYY-MM-DD");
        this.getCourseTable(date)
        this.getClassList();

    },
    methods: {
      //选择班级显示table，选择班级切换数据
      showThreeTable(){
        this.course = '';
        this.$store.commit('getClassGrade',this.classGrade);
        if(this.classGrade != ''){
          this.showThree = true;
        }else{
        }
        let resDate = core.getMonday(new Date());
        resDate = moment(resDate).format("YYYY-MM-DD");
        //console.log(resDate)
        //console.log(this.classGrade);
        this.getCourseTable(resDate)
      },
      //获取-班级信息
      getClassList() {
        axios.post('/teacherCMS/getClass', {
          data: {
            userType: this.userType
          }
        }).then((res) => {
          //console.log(res.data);
          //this.majorM = res.data.majorMsg;
          this.classM = res.data.classMsg;
        });
      },
      
      //编辑

      //获取-课程表
      getCourseTable(resDate){
        axios.post('/teacherCMS/getCourseTable', {
          data: {
            courseDate: resDate,
            className: this.$store.state.classGrade,
          }
        }).then((res) => {
          //  console.log(res.data.result)
          let resData = res.data.result;
          if (res.data.code === 0) {
            this.course = resData.course[0];
            this.mondayDate = res.data.result.courseDate;
          }
          this.mondayDate = res.data.result.courseDate;
          this.weekDate = core.getDayAll(new Date(this.mondayDate));
        //  console.log(this.weekDate)
        });
      },
      ratify(index, row) {
        console.log(index, row);
      },
      prohibit(index, row) {
        console.log(index, row);
      },

      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    },
    
    components: {selectTable}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .bossInfor .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossInfor .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .bossInfor .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .bossInfor .el-table td, .el-table th {
    height: 40px;
  }
  .bossInfor .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .bossInfor p {
    margin-bottom: 0;
  }
  .bossInfor .el-tabs__header {
    margin: 0 0 10px;
  }



</style>
