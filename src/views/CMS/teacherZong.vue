<template>
  <div class="teacherZong">
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
    name: 'teacherZong',
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
        showThree:false,
        course: [],
        
      }
    },
    computed: {

    },
    mounted() {
      let date = moment().format("YYYY-MM-DD");
      this.getCourseTable(date);
      this.getClassList();

    },
    methods: {
      // 添加成功后提示信息
      addSuccess(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      // 添加失败提示信息
      addDefeat(msg) {
        this.$message.error(msg);
      },
      //选择班级显示table，选择班级切换数据
      showThreeTable(){
        this.course = '';
        this.$store.commit('getClassGrade',this.classGrade);
        if(this.classGrade !== ''){
          this.showThree = true;
        }else{
        }
        let resDate = core.getMonday(new Date());
        resDate = moment(resDate).format("YYYY-MM-DD");
        //console.log(resDate)
        //console.log(this.classGrade);
        this.getCourseTable(resDate);
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
            for(var i = 0; i < this.course.newCourse.length; i++){
              this.course.newCourse[i].id = 'a'+ parseInt(i+1);
              if(this.course.newCourse[i].teacher == this.$store.state.username){
                this.course.newCourse[i].color = '#f00';
              }else{
                this.course.newCourse[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse2.length; i++){
              this.course.newCourse2[i].id = 'b'+ parseInt(i+1);
              if(this.course.newCourse2[i].teacher == this.$store.state.username){
                this.course.newCourse2[i].color = '#f00';
              }else{
                this.course.newCourse2[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse3.length; i++){
              this.course.newCourse3[i].id = 'c'+ parseInt(i+1);
              if(this.course.newCourse3[i].teacher == this.$store.state.username){
                this.course.newCourse3[i].color = '#f00';
                //console.log("nnnmmm")
              }else{
                this.course.newCourse3[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse4.length; i++){
              this.course.newCourse4[i].id = 'd'+ parseInt(i+1);
              if(this.course.newCourse4[i].teacher == this.$store.state.username){
                this.course.newCourse4[i].color = '#f00';
                //console.log("nnnmmm")
              }else{
                this.course.newCourse4[i].color = '';
              }
            }
            for(var i = 0; i < this.course.newCourse5.length; i++){
              this.course.newCourse5[i].id = 'e'+ parseInt(i+1);
              if(this.course.newCourse5[i].teacher == this.$store.state.username){
                this.course.newCourse5[i].color = '#f00';
                //console.log("nnnmmm")
              }else{
                this.course.newCourse5[i].color = '';
              }
            }
          }
          this.weekDate = core.getDayAll(new Date(this.mondayDate));
          //  console.log(this.weekDate)
        });
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
  .teacherZong .el-tabs--card>.el-tabs__header .el-tabs__nav{
    border-width: 1px 1px 0 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherZong .el-tabs--card>.el-tabs__header{
    border-width: 0 0 1px 0;
    border-color: #9f5355;
    border-style: solid;
  }
  .teacherZong .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left: 1px solid #9f5355;
  }
  .teacherZong .el-table td, .el-table th {
    height: 40px;
  }
  .teacherZong .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
    font-size: 16px;
  }
  .teacherZong p {
    margin-bottom: 0;
  }
  .teacherZong .el-tabs__header {
    margin: 0 0 10px;
  }

</style>
