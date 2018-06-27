<template>
  <div class="addTable">
    <div class="classPlan">
            <div class="classPlan_top">
              <div class="classPlan_topLeft"></div>
              <div class="classPlan_topRight">

                <table>
                  <tr>
                    <td v-for="(item,index) in weekData" :key = "index" class="weekDataP">{{item}}</td>
                  </tr>
                </table>
              </div>
            </div>
            <div class="classPlan_bottom">
              <div class="classPlan_bottomLeft">

                <table>
                  <tr v-for="(item2,index2) in classData" :key = "index2">
                    <td class="classDataP">{{item2}}</td>
                  </tr>
                </table>
              </div>
              <div class="classPlan_bottomRight">
                <table>
                  <tr>
                    <td class="eachDataP" v-for="(item,index) in allMyCourse.newCourse" :key = "index">
                        <el-button size="mini" type="primary" @click="addEach1(index),centerDialogVisible = true" v-show="courseIndexArr[index] == -1">添加</el-button>
                        {{item.startTime}}
                        {{item.endTime}}
                        {{item.teacher}}
                        {{item.courseName}}
                        {{item.courseAddress}}
                        
                        <el-dialog
                        title="添加课程"
                        :visible.sync="centerDialogVisible"
                        width="30%"
                        :close-on-click-modal="false"
                        :show-close="false"
                        :close-on-press-escape="false"
                        center>
                            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px">
                                <el-form-item label="上课时间" prop="date3">
                                <el-time-select
                                    placeholder="上课时间"
                                    v-model="form.date3"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="下课时间" prop="date4">
                                <el-time-select
                                    placeholder="下课时间"
                                    v-model="form.date4"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="课程" prop="courseName">
                                <el-input v-model="form.courseName"></el-input>
                                <!--<el-select v-model="form.courseName" placeholder="请选择课程名称">-->

                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="教师" prop="teacher">
                                  <el-input v-model="form.teacher"></el-input>
                                <!--<el-select v-model="form.teacher" placeholder="请选择任课老师">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="地点" prop="courseAddress">
                                  <el-input v-model="form.courseAddress"></el-input>
                                <!--<el-select v-model="form.courseAddress" placeholder="请选择上课地点">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancel1(),centerDialogVisible = false">取 消</el-button>
                                <el-button type="primary" @click="addEach11()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </td>
                  </tr>


                  <tr>
                    <td class="eachDataP" v-for="(item2,index2) in allMyCourse.newCourse2" :key = "index2">
                        <el-button size="mini" type="primary" @click="addEach2(index2),centerDialogVisible2 = true" v-show="courseIndexArr2[index2] == -1">添加</el-button>
                        {{item2.startTime}}
                        {{item2.endTime}}
                        {{item2.teacher}}
                        {{item2.courseName}}
                        {{item2.courseAddress}}
                        
                        <el-dialog
                        title="添加课程"
                        :visible.sync="centerDialogVisible2"
                        width="30%"
                        :close-on-click-modal="false"
                        :show-close="false"
                        :close-on-press-escape="false"
                        center>
                            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px">
                                <el-form-item label="上课时间" prop="date3">
                                <el-time-select
                                    placeholder="上课时间"
                                    v-model="form.date3"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="下课时间" prop="date4">
                                <el-time-select
                                    placeholder="下课时间"
                                    v-model="form.date4"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="课程" prop="courseName">
                                <el-input v-model="form.courseName"></el-input>
                                <!--<el-select v-model="form.courseName" placeholder="请选择课程名称">-->

                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="教师" prop="teacher">
                                  <el-input v-model="form.teacher"></el-input>
                                <!--<el-select v-model="form.teacher" placeholder="请选择任课老师">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="地点" prop="courseAddress">
                                  <el-input v-model="form.courseAddress"></el-input>
                                <!--<el-select v-model="form.courseAddress" placeholder="请选择上课地点">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancel2(),centerDialogVisible2 = false">取 消</el-button>
                                <el-button type="primary" @click="addEach22()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </td>
                  </tr>
                  <tr>
                    <td class="eachDataP" v-for="(item3,index3) in allMyCourse.newCourse3" :key = "index3">
                        <el-button size="mini" type="primary" @click="addEach3(index3),centerDialogVisible3 = true" v-show="courseIndexArr3[index3] == -1">添加</el-button>
                        {{item3.startTime}}
                        {{item3.endTime}}
                        {{item3.teacher}}
                        {{item3.courseName}}
                        {{item3.courseAddress}}
                        
                        <el-dialog
                        title="添加课程"
                        :visible.sync="centerDialogVisible3"
                        width="30%"
                        :close-on-click-modal="false"
                        :show-close="false"
                        :close-on-press-escape="false"
                        center>
                            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px">
                                <el-form-item label="上课时间" prop="date3">
                                <el-time-select
                                    placeholder="上课时间"
                                    v-model="form.date3"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="下课时间" prop="date4">
                                <el-time-select
                                    placeholder="下课时间"
                                    v-model="form.date4"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="课程" prop="courseName">
                                <el-input v-model="form.courseName"></el-input>
                                <!--<el-select v-model="form.courseName" placeholder="请选择课程名称">-->

                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="教师" prop="teacher">
                                  <el-input v-model="form.teacher"></el-input>
                                <!--<el-select v-model="form.teacher" placeholder="请选择任课老师">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="地点" prop="courseAddress">
                                  <el-input v-model="form.courseAddress"></el-input>
                                <!--<el-select v-model="form.courseAddress" placeholder="请选择上课地点">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancel3(),centerDialogVisible3 = false">取 消</el-button>
                                <el-button type="primary" @click="addEach33()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </td>
                  </tr>
                  <tr>
                    <td class="eachDataP" v-for="(item4,index4) in allMyCourse.newCourse4" :key = "index4">
                        <el-button size="mini" type="primary" @click="addEach4(index4),centerDialogVisible4 = true" v-show="courseIndexArr4[index4] == -1">添加</el-button>
                        {{item4.startTime}}
                        {{item4.endTime}}
                        {{item4.teacher}}
                        {{item4.courseName}}
                        {{item4.courseAddress}}
                        
                        <el-dialog
                        title="添加课程"
                        :visible.sync="centerDialogVisible4"
                        width="30%"
                        :close-on-click-modal="false"
                        :show-close="false"
                        :close-on-press-escape="false"
                        center>
                            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px">
                                <el-form-item label="上课时间" prop="date3">
                                <el-time-select
                                    placeholder="上课时间"
                                    v-model="form.date3"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="下课时间" prop="date4">
                                <el-time-select
                                    placeholder="下课时间"
                                    v-model="form.date4"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="课程" prop="courseName">
                                <el-input v-model="form.courseName"></el-input>
                                <!--<el-select v-model="form.courseName" placeholder="请选择课程名称">-->

                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="教师" prop="teacher">
                                  <el-input v-model="form.teacher"></el-input>
                                <!--<el-select v-model="form.teacher" placeholder="请选择任课老师">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="地点" prop="courseAddress">
                                  <el-input v-model="form.courseAddress"></el-input>
                                <!--<el-select v-model="form.courseAddress" placeholder="请选择上课地点">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancel4(),centerDialogVisible4 = false">取 消</el-button>
                                <el-button type="primary" @click="addEach44()">确 定</el-button>
                            </span>
                        </el-dialog>
                      </td>
                  </tr>
                  <tr>
                    <td class="eachDataP" v-for="(item5,index5) in allMyCourse.newCourse5" :key = "index5">
                        <el-button size="mini" type="primary" @click="addEach5(index5),centerDialogVisible5 = true" v-show="courseIndexArr5[index5] == -1">添加</el-button>
                        {{item5.startTime}}
                        {{item5.endTime}}
                        {{item5.teacher}}
                        {{item5.courseName}}
                        {{item5.courseAddress}}
                        
                        <el-dialog
                        title="添加课程"
                        :visible.sync="centerDialogVisible5"
                        width="30%"
                        :close-on-click-modal="false"
                        :show-close="false"
                        :close-on-press-escape="false"
                        center>
                            <el-form :inline="true" :model="form" :rules="rules" ref="form" label-width="100px">
                                <el-form-item label="上课时间" prop="date3">
                                <el-time-select
                                    placeholder="上课时间"
                                    v-model="form.date3"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="下课时间" prop="date4">
                                <el-time-select
                                    placeholder="下课时间"
                                    v-model="form.date4"
                                    :picker-options="{
                                    start: '00:00',
                                    step: '00:10',
                                    end: '23:30'
                                    }">
                                </el-time-select>
                                </el-form-item>

                                <el-form-item label="课程" prop="courseName">
                                <el-input v-model="form.courseName"></el-input>
                                <!--<el-select v-model="form.courseName" placeholder="请选择课程名称">-->

                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="教师" prop="teacher">
                                  <el-input v-model="form.teacher"></el-input>
                                <!--<el-select v-model="form.teacher" placeholder="请选择任课老师">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                                <el-form-item label="地点" prop="courseAddress">
                                  <el-input v-model="form.courseAddress"></el-input>
                                <!--<el-select v-model="form.courseAddress" placeholder="请选择上课地点">-->
                                    <!--<div v-for="item in majorM">-->
                                      <!--<el-option :label="item.label" :value="item.label"></el-option>-->
                                    <!--</div>-->
                                <!--</el-select>-->
                                </el-form-item>

                            </el-form>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancel5(),centerDialogVisible5 = false">取 消</el-button>
                                <el-button type="primary" @click="addEach55()">确 定</el-button>
                            </span>
                        </el-dialog>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          <p>
            <el-button type="primary" @click="addAll()">立即创建</el-button>
          </p>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'addTable',
    props:['course','classGrade'],
    data() {
      return {
        username: this.$store.state.username,
        userType: this.$store.state.userType,
        weekData:['周一','周二','周三','周四','周五','周六','周日'],
        classData:['1','2','3','4','5'],
        form:{
          date3: '',
          date4: '',
          teacher:'',
          courseName:'',
          courseAddress:''
        },
        rules:{
          date3: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          date4: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          teacher: [
            {required: true, message: '请选择老师', trigger: 'change'}
          ],
          courseName: [
            {required: true, message: '请选择课程名称', trigger: 'change'}
          ],
          courseAddress: [
            {required: true, message: '请选择上课地点', trigger: 'change'}
          ],
        },
        courseIndex:'',
        courseIndex2:'',
        courseIndex3:'',
        courseIndex4:'',
        courseIndex5:'',
        courseIndexArr:[-1,-1,-1,-1,-1,-1,-1],
        courseIndexArr2:[-1,-1,-1,-1,-1,-1,-1],
        courseIndexArr3:[-1,-1,-1,-1,-1,-1,-1],
        courseIndexArr4:[-1,-1,-1,-1,-1,-1,-1],
        courseIndexArr5:[-1,-1,-1,-1,-1,-1,-1],
        allMyCourse:{
          newCourse:[
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },

          ],
          newCourse2:[
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },

          ],
          newCourse3:[
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },

          ],
          newCourse4:[
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },

          ],
          newCourse5:[
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },
              {
                  startTime:'',
                  endTime:'',
                  teacher:'',
                  courseName:'',
                  courseAddress:''
              },

          ],
        },
        
        centerDialogVisible: false,
        centerDialogVisible2: false,
        centerDialogVisible3: false,
        centerDialogVisible4: false,
        centerDialogVisible5: false
      }
    },
    computed: {

    },
    mounted() {

    },
    methods: {
      addEach1(index){
        this.courseIndex = index;
        this.courseIndexArr[index] = index;
        console.log(this.courseIndexArr)
      },
      cancel1(){
        for(var i = 0; i < this.courseIndexArr.length; i++){
          if(this.courseIndexArr[i] != -1){
            if(this.allMyCourse.newCourse[i].startTime == '' ||
               this.allMyCourse.newCourse[i].endTime == '' ||
               this.allMyCourse.newCourse[i].teacher == '' ||
               this.allMyCourse.newCourse[i].courseName == '' ||
               this.allMyCourse.newCourse[i].courseAddress == ''){
                  this.courseIndexArr[i] = -1;
               }
            }
        }
      },
      addEach11(){
        this.allMyCourse.newCourse[this.courseIndex].startTime = this.form.date3;
        this.allMyCourse.newCourse[this.courseIndex].endTime = this.form.date4;
        this.allMyCourse.newCourse[this.courseIndex].teacher = this.form.teacher;
        this.allMyCourse.newCourse[this.courseIndex].courseName = this.form.courseName;
        this.allMyCourse.newCourse[this.courseIndex].courseAddress = this.form.courseAddress;
        if(this.allMyCourse.newCourse[this.courseIndex].startTime == '' ||
               this.allMyCourse.newCourse[this.courseIndex].endTime == '' ||
               this.allMyCourse.newCourse[this.courseIndex].teacher == '' ||
               this.allMyCourse.newCourse[this.courseIndex].courseName == '' ||
               this.allMyCourse.newCourse[this.courseIndex].courseAddress == ''){
                 this.$message({
                    showClose: true,
                    message: '信息不完整哦',
                    type: 'error'
                  });
                  this.allMyCourse.newCourse[this.courseIndex].startTime = '';
                  this.allMyCourse.newCourse[this.courseIndex].endTime = '';
                  this.allMyCourse.newCourse[this.courseIndex].teacher = '';
                  this.allMyCourse.newCourse[this.courseIndex].courseName = '';
                  this.allMyCourse.newCourse[this.courseIndex].courseAddress = '';
                  this.centerDialogVisible = true;
               }else{
                 this.centerDialogVisible = false;
               }
      },
      addEach2(index){
        this.courseIndex2 = index;
        this.courseIndexArr2[index] = index;
        console.log(this.courseIndexArr2)
      },
      cancel2(){
        for(var i = 0; i < this.courseIndexArr2.length; i++){
          if(this.courseIndexArr2[i] != -1){
            if(this.allMyCourse.newCourse2[i].startTime == '' ||
               this.allMyCourse.newCourse2[i].endTime == '' ||
               this.allMyCourse.newCourse2[i].teacher == '' ||
               this.allMyCourse.newCourse2[i].courseName == '' ||
               this.allMyCourse.newCourse2[i].courseAddress == ''){
                  this.courseIndexArr2[i] = -1;
               }
            }
        }
      },
      addEach22(){
        this.allMyCourse.newCourse2[this.courseIndex2].startTime = this.form.date3;
        this.allMyCourse.newCourse2[this.courseIndex2].endTime = this.form.date4;
        this.allMyCourse.newCourse2[this.courseIndex2].teacher = this.form.teacher;
        this.allMyCourse.newCourse2[this.courseIndex2].courseName = this.form.courseName;
        this.allMyCourse.newCourse2[this.courseIndex2].courseAddress = this.form.courseAddress;
        if(this.allMyCourse.newCourse2[this.courseIndex2].startTime == '' ||
               this.allMyCourse.newCourse2[this.courseIndex2].endTime == '' ||
               this.allMyCourse.newCourse2[this.courseIndex2].teacher == '' ||
               this.allMyCourse.newCourse2[this.courseIndex2].courseName == '' ||
               this.allMyCourse.newCourse2[this.courseIndex2].courseAddress == ''){
                 this.$message({
                    showClose: true,
                    message: '信息不完整哦',
                    type: 'error'
                  });
                  this.allMyCourse.newCourse2[this.courseIndex2].startTime = '';
                  this.allMyCourse.newCourse2[this.courseIndex2].endTime = '';
                  this.allMyCourse.newCourse2[this.courseIndex2].teacher = '';
                  this.allMyCourse.newCourse2[this.courseIndex2].courseName = '';
                  this.allMyCourse.newCourse2[this.courseIndex2].courseAddress = '';
                  this.centerDialogVisible2 = true;
               }else{
                 this.centerDialogVisible2 = false;
               }
      },
      addEach3(index){
        this.courseIndex3 = index;
        this.courseIndexArr3[index] = index;
        console.log(this.courseIndexArr3)
      },
      cancel3(){
        for(var i = 0; i < this.courseIndexArr3.length; i++){
          if(this.courseIndexArr3[i] != -1){
            if(this.allMyCourse.newCourse3[i].startTime == '' ||
               this.allMyCourse.newCourse3[i].endTime == '' ||
               this.allMyCourse.newCourse3[i].teacher == '' ||
               this.allMyCourse.newCourse3[i].courseName == '' ||
               this.allMyCourse.newCourse3[i].courseAddress == ''){
                  this.courseIndexArr3[i] = -1;
               }
            }
        }
      },
      addEach33(){
        this.allMyCourse.newCourse3[this.courseIndex3].startTime = this.form.date3;
        this.allMyCourse.newCourse3[this.courseIndex3].endTime = this.form.date4;
        this.allMyCourse.newCourse3[this.courseIndex3].teacher = this.form.teacher;
        this.allMyCourse.newCourse3[this.courseIndex3].courseName = this.form.courseName;
        this.allMyCourse.newCourse3[this.courseIndex3].courseAddress = this.form.courseAddress;
        if(this.allMyCourse.newCourse3[this.courseIndex3].startTime == '' ||
               this.allMyCourse.newCourse3[this.courseIndex3].endTime == '' ||
               this.allMyCourse.newCourse3[this.courseIndex3].teacher == '' ||
               this.allMyCourse.newCourse3[this.courseIndex3].courseName == '' ||
               this.allMyCourse.newCourse3[this.courseIndex3].courseAddress == ''){
                 this.$message({
                    showClose: true,
                    message: '信息不完整哦',
                    type: 'error'
                  });
                  this.allMyCourse.newCourse3[this.courseIndex3].startTime = '';
                  this.allMyCourse.newCourse3[this.courseIndex3].endTime = '';
                  this.allMyCourse.newCourse3[this.courseIndex3].teacher = '';
                  this.allMyCourse.newCourse3[this.courseIndex3].courseName = '';
                  this.allMyCourse.newCourse3[this.courseIndex3].courseAddress = '';
                  this.centerDialogVisible3 = true;
               }else{
                 this.centerDialogVisible3 = false;
               }
      },
      addEach4(index){
        this.courseIndex4 = index;
        this.courseIndexArr4[index] = index;
        console.log(this.courseIndexArr4)
      },
      cancel4(){
        for(var i = 0; i < this.courseIndexArr4.length; i++){
          if(this.courseIndexArr4[i] != -1){
            if(this.allMyCourse.newCourse4[i].startTime == '' ||
               this.allMyCourse.newCourse4[i].endTime == '' ||
               this.allMyCourse.newCourse4[i].teacher == '' ||
               this.allMyCourse.newCourse4[i].courseName == '' ||
               this.allMyCourse.newCourse4[i].courseAddress == ''){
                  this.courseIndexArr4[i] = -1;
               }
            }
        }
      },
      addEach44(){
        this.allMyCourse.newCourse4[this.courseIndex4].startTime = this.form.date3;
        this.allMyCourse.newCourse4[this.courseIndex4].endTime = this.form.date4;
        this.allMyCourse.newCourse4[this.courseIndex4].teacher = this.form.teacher;
        this.allMyCourse.newCourse4[this.courseIndex4].courseName = this.form.courseName;
        this.allMyCourse.newCourse4[this.courseIndex4].courseAddress = this.form.courseAddress;
        if(this.allMyCourse.newCourse4[this.courseIndex4].startTime == '' ||
               this.allMyCourse.newCourse4[this.courseIndex4].endTime == '' ||
               this.allMyCourse.newCourse4[this.courseIndex4].teacher == '' ||
               this.allMyCourse.newCourse4[this.courseIndex4].courseName == '' ||
               this.allMyCourse.newCourse4[this.courseIndex4].courseAddress == ''){
                 this.$message({
                    showClose: true,
                    message: '信息不完整哦',
                    type: 'error'
                  });
                  this.allMyCourse.newCourse4[this.courseIndex4].startTime = '';
                  this.allMyCourse.newCourse4[this.courseIndex4].endTime = '';
                  this.allMyCourse.newCourse4[this.courseIndex4].teacher = '';
                  this.allMyCourse.newCourse4[this.courseIndex4].courseName = '';
                  this.allMyCourse.newCourse4[this.courseIndex4].courseAddress = '';
                  this.centerDialogVisible4 = true;
               }else{
                 this.centerDialogVisible4 = false;
               }
      },
      addEach5(index){
        this.courseIndex5 = index;
        this.courseIndexArr5[index] = index;
        console.log(this.courseIndexArr5)
      },
      cancel5(){
        for(var i = 0; i < this.courseIndexArr5.length; i++){
          if(this.courseIndexArr5[i] != -1){
            if(this.allMyCourse.newCourse5[i].startTime == '' ||
               this.allMyCourse.newCourse5[i].endTime == '' ||
               this.allMyCourse.newCourse5[i].teacher == '' ||
               this.allMyCourse.newCourse5[i].courseName == '' ||
               this.allMyCourse.newCourse5[i].courseAddress == ''){
                  this.courseIndexArr5[i] = -1;
               }
            }
        }
      },
      addEach55(){
        this.allMyCourse.newCourse5[this.courseIndex5].startTime = this.form.date3;
        this.allMyCourse.newCourse5[this.courseIndex5].endTime = this.form.date4;
        this.allMyCourse.newCourse5[this.courseIndex5].teacher = this.form.teacher;
        this.allMyCourse.newCourse5[this.courseIndex5].courseName = this.form.courseName;
        this.allMyCourse.newCourse5[this.courseIndex5].courseAddress = this.form.courseAddress;
        if(this.allMyCourse.newCourse5[this.courseIndex5].startTime == '' ||
               this.allMyCourse.newCourse5[this.courseIndex5].endTime == '' ||
               this.allMyCourse.newCourse5[this.courseIndex5].teacher == '' ||
               this.allMyCourse.newCourse5[this.courseIndex5].courseName == '' ||
               this.allMyCourse.newCourse5[this.courseIndex5].courseAddress == ''){
                 this.$message({
                    showClose: true,
                    message: '信息不完整哦',
                    type: 'error'
                  });
                  this.allMyCourse.newCourse5[this.courseIndex5].startTime = '';
                  this.allMyCourse.newCourse5[this.courseIndex5].endTime = '';
                  this.allMyCourse.newCourse5[this.courseIndex5].teacher = '';
                  this.allMyCourse.newCourse5[this.courseIndex5].courseName = '';
                  this.allMyCourse.newCourse5[this.courseIndex5].courseAddress = '';
                  this.centerDialogVisible5 = true;
               }else{
                 this.centerDialogVisible5 = false;
               }
      },
      addAll(){
        axios.post('/teacherCMS/newCourseTable', {
          data: {
            userType: this.userType,
            userName: this.username,
            className: this.classGrade,
            allMyCourse: this.allMyCourse
          }
        }).then((res) => {
          
        });
      }
    },

    components: {}
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  .addTable .classPlan{
    width:80%;
    height:640px;
    margin:0 auto;
    margin-top: 25px;
  }
  .addTable .classPlan .classPlan_top{
    width:100%;
    height:8%;
    display:flex;
  }
  .addTable .classPlan .classPlan_bottom{
    width:100%;
    height:100%;
    display:flex;
  }
  .addTable .classPlan .classPlan_topLeft{
    width:5%;
    height:110%;
    background: #e5e9f2;
    border: 5px solid #fff;
  }
  .addTable .classPlan .classPlan_topRight{
    width:95%;
    height:100%;
  }
  .addTable .classPlan .classPlan_bottomLeft{
    width:5%;
    height:92%;
  }
  .addTable .classPlan .classPlan_bottomRight{
    width:95%;
    height:100%;
  }
  .addTable .el-row {
    padding-top:0;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .addTable .el-col {
    border-radius: 4px;
  }
  .addTable .bg-purple-dark {
    background: #99a9bf;
  }
  .addTable .bg-purple {
    background: #d3dce6;
  }
  .addTable .bg-purple-light {
    background: #e5e9f2;
  }
  .addTable .classPlan_topRight .grid-content {
    border-radius: 4px;
    min-height: 54px;
    width: 98%;
  }
  .addTable .classPlan_topRight .weekDataP{
    background: #e5e9f2;
    width: 183px;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 53px;
  }
  .addTable .classDataP{
    background: #e5e9f2;
    width: 1%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
  }
  .addTable .eachDataP{
    background: #e5e9f2;
    width: 4%;
    border: 5px solid #fff;
    border-radius: 15px;
    height: 108px;
  }
  .addTable .classPlan_bottomLeft .grid-content {
    border-radius: 4px;
    min-height: 106px;
    margin-top: 3px;
    padding-top: 43px;
    box-sizing: border-box;
  }
  .addTable .classPlan_bottomRight .grid-content {
    border-radius: 4px;
    min-height: 106px;
  }
  .addTable .classPlan_bottomRight .el-col {
    padding:2px;
  }
  .addTable .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
