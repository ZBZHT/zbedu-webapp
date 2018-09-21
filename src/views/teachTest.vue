<template>
<div>
  <div class="titleB">
    <test-head></test-head>
  </div>
  <div class="teach_Test" :style="{height: height - 138 + 'px'}">
    <div class="question">
      <div class="leftBox">
        <div class="userPicFont">
          <nav-user></nav-user>
        </div>
        <ul class="leftItem">
          <li class="leftLi" v-for="(item,index) in leftBox"
              @click="rightAppear(index)"
              :class="currIndex === index ? 'active' : '' ">
            {{item.li}}
          </li>
        </ul>
      </div>
      <div class="rightBox">
        <div class="testOnline" v-show="currIndex === 0">

          <div class="contentBox">
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

              <!--创建考试-->
              <el-tab-pane label="创建考试">
                <div class="createTest">
                  <el-form :inline="true" class="demo-form-inline" ref="form" :model="form" status-icon :rules="rules"
                           label-width="80px">

                    <el-form-item label="考试题目" prop="theme" width="150">
                      <el-input class="numberClass" placeholder="请创建考试题目" v-model.theme="form.theme" style="width: 100%"></el-input>
                    </el-form-item>

                    <el-form-item label="考试范围" prop="name">
                      <el-dropdown trigger="click">
                            <span class="el-dropdown-link">
                                <div class="elinput">
                                    <ul>
                                        <li v-for="(item,index) in form.name">{{item}} <span v-if="index != indexSpan"> |&nbsp </span> </li>
                                    </ul>
                                </div>
                            </span>
                        <el-dropdown-menu slot="dropdown" class="dropdown">
                          <div class="treeModle">
                            <el-tree
                              :data="data"
                              ref="tree"
                              show-checkbox
                              node-key="id"
                              @check-change="handleCheckChange"
                              @node-click="handleClick">
                            </el-tree>
                          </div>
                          <el-dropdown-item>
                              <div class="buttons">
                                  <el-button @click="getCheckedNodes">确定</el-button>
                              </div>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-form-item>

                    <el-form-item label="开始日期" prop="date1">
                      <el-date-picker
                        v-model="form.date1"
                        type="date"
                        placeholder="开始日期"
                        @blur="outOfTime()"
                        :picker-options="startDatePicker">
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item label="开始时间" prop="date3">
                      <el-time-select
                        placeholder="开始时间"
                        @blur="writeEnd();compareTime();outOfTime()"
                        v-model="form.date3"
                        :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '23:30'
                        }">
                      </el-time-select>
                    </el-form-item>

                    <el-form-item label="结束日期" prop="date2">
                      <el-date-picker
                        v-model="form.date2"
                        type="date"
                        placeholder="结束日期"
                        @blur="writeEnd();compareTime();showGrade()"
                        :picker-options="endDatePicker">
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item label="结束时间">
                      <el-time-select
                        placeholder="结束时间"
                        @blur="compareTime();showGrade()"
                        v-model="form.date4"
                        :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '23:30'
                        }">
                      </el-time-select>
                    </el-form-item>

                    <el-form-item label="考试时长">
                      <el-col :span="8">
                        <el-form-item>
                          <el-select v-model="form.timeHour" placeholder="请选择小时" @change="isMin" @blur="compareTime0()">
                            <el-option label="0" value="0"></el-option>
                            <el-option label="1" value="1"></el-option>
                            <el-option label="2" value="2"></el-option>
                            <el-option label="3" value="3"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="3">小时</el-col>
                      <el-col :span="8">
                        <el-form-item>
                          <el-select v-model="form.timeMin" placeholder="请选择分钟" @blur="compareTime0()">
                            <el-option label="0" :disabled="formDisabled" value="0"></el-option>
                            <el-option label="30" value="30"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="4">分钟</el-col>
                    </el-form-item>

                    <el-form-item label="考试类型" prop="currTestType">
                      <el-select v-model="form.currTestType" placeholder="请选择考试类型">
                        <el-option label="期末考试" value="101"></el-option>
                        <el-option label="期中考试" value="102"></el-option>
                        <el-option label="随堂练习" value="103"></el-option>
                        <el-option label="单元测试" value="104"></el-option>
                        <el-option label="资格考试" value="105"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="考题数目" prop="num" required>
                      <el-input v-model.number="form.num" placeholder="请输入考试题数(0 — 100)"></el-input>
                    </el-form-item>

                    <el-form-item label="考试总分" prop="allScore" required>
                      <el-input v-model.number="form.allScore" placeholder="请输入考试总分(0 — 200)"></el-input>
                    </el-form-item>

                    <el-form-item label="专业" prop="major">
                      <el-select v-model="form.major" placeholder="请选择专业">
                        <div v-for="item in majorM">
                          <el-option :label="item.label" :value="item.label"></el-option>
                        </div>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="班级" prop="classGrade">
                      <el-select v-model="form.classGrade" multiple placeholder="请选择班级">
                        <div v-for="item in classM">
                          <el-option :label="item.label" :key="item.label" :value="item.label"></el-option>
                        </div>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="公布成绩" prop="date2">
                      <el-date-picker
                        v-model="form.date5"
                        type="date"
                        placeholder="公布成绩日期"
                        :picker-options="gradeDatePicker">
                      </el-date-picker>
                    </el-form-item>

                    <el-form-item>
                      <el-time-select
                        v-model="form.date6"
                        @blur="showGradeTime()"
                        :picker-options="{
                          start: '00:00',
                          step: '00:30',
                          end: '23:30'
                        }">
                      </el-time-select>
                    </el-form-item>
                    <p>
                      <el-button type="primary" @click="compareTime1()">立即创建</el-button>
                    </p>
                  </el-form>
                </div>
              </el-tab-pane>

            </el-tabs>
          </div>
        </div>

        <!--成绩管理-->
        <div class="userMessage" v-show="currIndex === 1">
          <!--历史考试列表-->
            <el-table style="width: 100%;margin-left: 16px" :data="historyTestData.slice((currentPage1-1)*pagesize,currentPage1*pagesize)">

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

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="primary" @click="scoreManData(scope.$index, scope.row)">
                    查看成绩
                  </el-button>
                  <el-button size="mini" type="primary" @click="exportExcel1(scope.$index, scope.row)">
                    导出成绩
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

            <!--查看成绩弹窗-->
            <el-dialog title="查看成绩"
                       width="59%"
                       :before-close="handleClose"
                       :visible.sync="dialogTableVisible4">
              <el-table id="out-table" style="width: 97%; margin-left: 16px" :data="checkGradesData.slice((currentPage2-1)*pagesize,currentPage2*pagesize)">

                <el-table-column label="序号" width="60">
                  <template slot-scope="scope">
                    <span>{{ scope.row.num }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="姓名" width="80">
                  <template slot-scope="scope">
                    <span>{{ scope.row.user }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试题目" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.theme }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="开始时间" width="200">
                  <template slot-scope="scope">
                    <span>{{ scope.row.startTime }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试类型" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.currTestType }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="成绩" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sorce }}</span>
                  </template>
                </el-table-column>

              </el-table>

              <!--分页显示-->
              <div class="block">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPage2"
                  :page-size="pagesize"
                  layout="prev, pager, next, jumper"
                  :total=parseInt(total3)>
                </el-pagination>
              </div>

              <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="exportExcel()">
                  导出成绩
                </el-button>
              </div>

            </el-dialog>

        </div>

      </div>

    </div>
  </div>
  <div class="footer">
    <foot-footer></foot-footer>
  </div>
</div>
</template>

<script>
  import axios from 'axios'
  import moment from 'moment'
  import testHead from '@/components/common/testHead'
  import footFooter from '@/components/common/footFooter'
  import Modal from '@/components/testCenter/modal';
  import core from '../assets/js/core.js';
  import navUser from '@/components/common/navUser';

  export default {
    name: 'teachTest',
    data() {
      let checkNum = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('题数不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value <= 0 || value > 100) {
              callback(new Error('题数必须大于0且小于100'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      let checkScore = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('题数不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value <= 0 || value > 200) {
              callback(new Error('题数必须大于0且小于200'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      return {
        url: document.domain,
        user: this.$store.state.username,
        leftBox: [
          {li: '考试管理'},
          {li: '成绩管理'}
        ],
        currIndex: 0,
        data: [],
        formDisabled: false,
        indexSpan:'',
        form: {
          theme: '',
          name: [],
          nameId: [],
          currTestType: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          date5: '',
          date6: '',
          num: '',
          timeHour: 2,
          timeMin: 0,
          major: '',
          classGrade: '',
          newData: core.formatDate("yyyy-MM-dd hh:mm:ss", new Date()),
          allScore:100
        },
        rules: {
          theme: [
            {required: true, message: '请输入考试题目', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入考试范围', trigger: 'change'},
          ],
          currTestType: [
            {required: true, message: '请选择考试类型', trigger: 'change'}
          ],
          date1: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {required: true, message: '请选择日期', trigger: 'change'}
          ],
          date3: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
          date4: [
            {required: true, message: '请选择时间', trigger: 'change'}
          ],
          num: [
            {validator: checkNum, trigger: 'blur'}
          ],
          timeHour: [
            {required: true, message: '请选择考试小时', trigger: 'change'}
          ],
          major: [
            {required: true, message: '请输入专业', trigger: 'change'}
          ],
          classGrade: [
            {required: true, message: '请输入班级', trigger: 'change'}
          ],
          allScore: [
            {validator: checkScore, trigger: 'blur'}
          ],
        },
        toTestData: [],
        toTestDataIndex:[],
        historyTestData: [],
        checkGradesData: [],
        historyTestDataIndex:[],
        scoreM: [],
        currentPage1: 1,
        currentPage2: 1,
        pagesize: 10,
        total1: '',
        total2: '',
        total3: '',
        dialogTableVisible1: false,
        dialogTableVisible2: false,
        dialogTableVisible3: false,
        dialogTableVisible4: false,
        toMoreData: [],
        toHistoryData: [],
        scoreData: [],
        startDatePicker:this.beginDate(),
        endDatePicker:this.processDate(),
        gradeDatePicker:this.showGradeDate(),
        height:window.innerHeight,
        majorM:[],
        classM:[],
      };
    },

    computed:{

    },

    methods: {
      handleResize (event) {
        this.height = window.innerHeight;
        if(this.height <= "620"){
            this.height = 598;
        }
      },
      //创建考试开始时间不能选择历史日期
      beginDate(){
        let self = this
        return {
          disabledDate(time){
            return time.getTime() < Date.now() - 8.64e7;
          }
        }
      },
      //创建考试结束时间不能大于开始时间
      processDate(){
        let self = this
        return {
          disabledDate(time){
            return time.getTime() < self.form.date1;
          }
        }
      },
      //公布成绩时间不能大于考试结束时间
      showGradeDate(){
        let self = this
        return {
          disabledDate(time){
            return time.getTime() < self.form.date2;
          }
        }
      },
      //教师创建考试后重新请求待考试数据
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

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      rightAppear(index) {
          console.log(index);
        this.currIndex = index;
      },
      // 成功后提示信息
      Success(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      errorMsg(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'error'
        });
      },
      //本来考试主题显示在input的func
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
        if (checked == true) {
        } else {
          for (var i = 0; i < this.form.name.length; i++) {
            if (this.form.name[i] == data.label) {
            }
          }
        }
      },
      //考试主题显示在input的func
      getCheckedNodes() {
        this.form.name = [];
        this.form.nameId = [];
//        console.log(this.$refs.tree.getCheckedNodes());
        var arr = this.$refs.tree.getCheckedNodes();
        for (var i = 0; i < arr.length; i++) {
        //  console.log(arr[i].label);
          this.form.name.push(arr[i].label);
          this.form.nameId.push(arr[i].courseId);
          this.indexSpan = i;
        //  console.log(this.indexSpan)
        //  console.log(arr[i].courseId);
        //  console.log(this.form.nameId);
        }
      },
      handleClick(data) {
      },

      //考试时长小时是0时分钟禁用0
      isMin() {
        if (this.form.timeHour == "0") {
          this.formDisabled = !this.formDisabled;
          this.form.timeMin = '';
        } else {
          this.form.timeMin = 0;
          this.formDisabled = false;
        }
      },
      //判断考试开始时间过期不允许
      outOfTime(){
        if(core.formatDate("yyyy-MM-dd hh:mm:ss", new Date()).split(" ")[0] == core.formatDate("yyyy-MM-dd", new Date(this.form.date1)) ){
          var newDateHourAll = core.formatDate("yyyy-MM-dd hh:mm:ss", new Date()).split(" ")[1];
          var newDateHour = parseInt(newDateHourAll.split(":")[0]);
          var chooseHour = parseInt(this.form.date3.split(":")[0]);
          var shouldTime = newDateHour + 1;
          if(chooseHour <= newDateHour) {
            this.$message({
                  showClose: true,
                  message: '来不及啦！创建考试开始时间请至少在今日' + shouldTime + '点及之后',
                  type: 'error'
                });
            this.form.date3 = '';
          }else if(newDateHour == "23"){
            this.$message({
                  showClose: true,
                  message: '今天来不及考试啦！',
                  type: 'error'
                });
          }
        }
      },
      //公布成绩时间不能在考试结束时间之前
      showGradeTime(){
          var newDateHour = parseInt(this.form.date4.split(":")[0]);
          var chooseHour = parseInt(this.form.date6.split(":")[0]);
          if(chooseHour <= newDateHour) {
            this.$message({
              showClose: true,
              message: '请设置公布成绩时间在考试结束时间之后',
              type: 'error'
            });
            this.form.date6 = this.form.date4;
          }else{

          }
      },
      //判断时长
      compareTime(){

        var a = parseInt(this.form.date3.split(":")[1])
        var a0 = parseInt(this.form.date3.split(":")[0])
            //console.log(a)
        var b = parseInt(this.form.date4.split(":")[1])
        var b0 = parseInt(this.form.date4.split(":")[0])
            //console.log(b)
        if(moment(this.form.date1).format("YYYY-MM-DD") == moment(this.form.date2).format("YYYY-MM-DD")){
          if((a == 0 && b0 < a0) || (a == 30 && b0 <= a0) || (a == b && a0 == b0)){
            this.$message({
                showClose: true,
                message: '考试时长有误，请核对后重新输入',
                type: 'error'
              });
            this.form.date4 = '';
          }else{
            if(b >= a){
              this.form.timeHour = parseInt(b0) - parseInt(a0);
              this.form.timeMin = parseInt(b) - parseInt(a);
              if(this.form.timeHour * 60 + this.form.timeMin > 120){
                this.form.timeHour = 2;
                this.form.timeMin = 0;
              }
            }else if(b < a){
              this.form.timeHour = parseInt(b0) - parseInt(a0) - 1;
              this.form.timeMin = 30;
              if(this.form.timeHour * 60 + this.form.timeMin > 120){
                this.form.timeHour = 2;
                this.form.timeMin = 0;
              }
            }
          }
        }else if(moment(this.form.date1).format("YYYY-MM-DD") != moment(this.form.date2).format("YYYY-MM-DD")){
          this.form.timeHour = 2;
          this.form.timeMin = 0;
        }
      },
      //初始化公布成绩时间
      showGrade(){
        if(this.form.date2){
          this.form.date5 = this.form.date2;
          this.form.date6 = this.form.date4;
        }
      },
      //考试时长不能超过时间选择器
      compareTime0(){
        var a = parseInt(this.form.date3.split(":")[1])
        var a0 = parseInt(this.form.date3.split(":")[0])
        var b = parseInt(this.form.date4.split(":")[1])
        var b0 = parseInt(this.form.date4.split(":")[0])
        if(moment(this.form.date1).format("YYYY-MM-DD") == moment(this.form.date2).format("YYYY-MM-DD")){
          if(b >= a){
              var timeHour = parseInt(b0) - parseInt(a0);
              var timeMin = parseInt(b) - parseInt(a);
              var sureTime = parseInt(timeHour *3600) + parseInt(timeMin *60)
            }else{
              var timeHour = parseInt(b0) - parseInt(a0) - 1;
              var timeMin = 30;
              var sureTime = parseInt(timeHour *3600) + parseInt(timeMin *60)
            }
            var realyTime = parseInt(this.form.timeHour *3600) + parseInt(this.form.timeMin *60);
            if(realyTime > sureTime){
              this.$message({
                showClose: true,
                message: '考试时长有误，请核对后重新输入',
                type: 'error'
              });
            }
        }else if(moment(this.form.date1).format("YYYY-MM-DD") == moment(this.form.date2).format("YYYY-MM-DD")){

        }
      },
      //考试时长不能超过时间选择器并提交
      compareTime1(){
        var a = parseInt(this.form.date3.split(":")[1])
        var a0 = parseInt(this.form.date3.split(":")[0])
        var b = parseInt(this.form.date4.split(":")[1])
        var b0 = parseInt(this.form.date4.split(":")[0])
        if(moment(this.form.date1).format("YYYY-MM-DD") == moment(this.form.date2).format("YYYY-MM-DD")){
          if(b >= a){
              var timeHour = parseInt(b0) - parseInt(a0);
              var timeMin = parseInt(b) - parseInt(a);
              var sureTime = parseInt(timeHour *3600) + parseInt(timeMin *60)
            }else{
              var timeHour = parseInt(b0) - parseInt(a0) - 1;
              var timeMin = 30;
              var sureTime = parseInt(timeHour *3600) + parseInt(timeMin *60)
            }
            var realyTime = parseInt(this.form.timeHour *3600) + parseInt(this.form.timeMin *60);
            if(realyTime > sureTime){
              this.$message({
                showClose: true,
                message: '考试时长有误，请核对后重新输入',
                type: 'error'
              });
            }else{
              this.submitForm('form');
            }
        }else if(moment(this.form.date1).format("YYYY-MM-DD") !== moment(this.form.date2).format("YYYY-MM-DD")){
          this.submitForm('form');
        }
      },
      //选择开始时间默认结束时间是两个小时后
      writeEnd(){
        if(moment(this.form.date1).format("YYYY-MM-DD") === moment(this.form.date2).format("YYYY-MM-DD")){
          var str = this.form.date3.split(":");
          var newStr = parseInt(str[0]) + parseInt(2)
          if(newStr < 10){
            newStr = "0" + newStr;
          }
          //console.log( newStr )
          this.form.date4 = newStr + ":" + str[1];
          if(parseInt(str[0]) >= "22"){
            this.form.date4 = "23" + ":" + 30;
          }
        }else if(moment(this.form.date1).format("YYYY-MM-DD") !== moment(this.form.date2).format("YYYY-MM-DD")){
          this.form.date4 = '';
        }
      },
      //创建考试方法
      onSubmit(formName) {
        this.form.date1 = core.formatDate("yyyy-MM-dd", new Date(this.form.date1));
        this.form.date2 = core.formatDate("yyyy-MM-dd", new Date(this.form.date2));
        this.form.date5 = core.formatDate("yyyy-MM-dd", new Date(this.form.date5));
        //console.log(this.form.date1)
        //console.log(this.form.date2)
      //  this.form.date3 = core.formatDate("hh:mm:ss", new Date(this.form.date3));
      //  this.form.date4 = core.formatDate("hh:mm:ss", new Date(this.form.date4));
        //console.log(this.form.date3);
        axios({
          method: 'get',
          url: "/readTestQuestionInfo/addTestQuestion",
          params: {
            user: this.user,
            theme: this.form.theme,
            name: this.form.name,
            nameId: this.form.nameId,
            currTestType: this.form.currTestType,
            date1: this.form.date1,
            date2: this.form.date2,
            date3: this.form.date3,
            date4: this.form.date4,
            date5: this.form.date5,
            date6: this.form.date6,
            num: this.form.num,
            timeHour: this.form.timeHour,
            timeMin: this.form.timeMin,
            major: this.form.major,
            classGrade: this.form.classGrade,
            newData: this.form.newData,
            allScore:this.form.allScore
          }
        }).then((res) => {
            if (res.data.code === 0) {
              this.toTestDataReq();
              this.Success('考试创建成功');
              this.cleanAllData(formName);
            }else if(res.data.code === 1){
              this.$message({
                  showClose: true,
                  message: '考试题目不能重复',
                  type: 'error'
                });
            }
            }).catch(function (error) {
              this.$message({
                  showClose: true,
                  message: '考试提交失败',
                  type: 'error'
                });
            });
      },
      //创建考试后清空数据
      cleanAllData(formName){
        this.$refs[formName].resetFields();
        this.form.date1 = '';
        this.form.date2 = '';
        this.form.date3 = '';
        this.form.date4 = '';
        this.form.date5 = '';
        this.form.date6 = '';
        this.form.timeHour = 2;
        this.form.timeMin = 0;
        this.form.allScore = 100;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.onSubmit(formName);
          } else {
            console.log('error submit!!');
            this.$message({
                showClose: true,
                message: '考试提交失败',
                type: 'error'
            });
            return false;
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

      //考试管理,待考试,查看
      getToMoreData(index, row) {
        this.dialogTableVisible1 = true;
        row.date1 = moment(row.date1).format("YYYY-MM-DD");
        row.date2 = moment(row.date2).format("YYYY-MM-DD");
        row.newData = core.formatDate("yyyy-MM-dd", new Date(row.newData));
        this.toMoreData.push(row);
        //console.log(this.toMoreData);
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
      //成绩管理, 查看成绩
      scoreManData(index, row) {
        this.getCheckGrades(row);
        this.dialogTableVisible4 = true;
        row.date1 = moment(row.date1).format("YYYY-MM-DD");
        row.date2 = moment(row.date2).format("YYYY-MM-DD");
        row.newData = core.formatDate("yyyy-MM-dd", new Date(row.newData));
        this.toHistoryData.push(row);
        //console.log(this.toHistoryData);

      },
      //关闭三个弹窗,清空数组
      handleClose(done) {
        done();
        this.toMoreData = [];
        this.toHistoryData = [];

      },
      //请求成绩管理数据
      getCheckGrades(row) {
        axios.get("/readTestQuestion/checkGradesData", {
          params: {
            username: this.user,
            theme: row.theme,
          }
        }).then((res) => {
          //console.log(res.data);
          let resData = res.data.result;
          console.log(resData);
          for (let i = 0; i < resData.length; i++) {
              if (resData[i].startTime !== null) {
                resData[i].startTime = moment(resData[i].startTime).format("YYYY-MM-DD hh:mm:ss");
              } else {
                resData[i].startTime = '';
              }
            resData[i].currTestType = core.getCurrTestType(resData[i].currTestType);
            resData[i].historyTestDataIndex = i;
            resData[i].num = i + 1;
          }
          this.checkGradesData = [];
          this.checkGradesData = resData;
          this.total3 = this.checkGradesData.length;
          //console.log(this.checkGradesData);
        });
      },
      //导出Excel成绩
      exportExcel1(index, row) {
        axios.get("/readTestQuestion/checkGradesData", {
          params: {
            username: this.user,
            theme: row.theme,
          }
        }).then((res) => {
          //console.log(res.data);
          let resData = res.data.result;
          for (let i = 0; i < resData.length; i++) {
            if (resData[i].startTime !== null) {
              resData[i].startTime = moment(resData[i].startTime).format("YYYY-MM-DD hh:mm:ss");
            } else {
              resData[i].startTime = '';
            }
            resData[i].currTestType = core.getCurrTestType(resData[i].currTestType);
            resData[i].historyTestDataIndex = i;
            resData[i].num = i + 1;
          }
          this.checkGradesData = [];
          this.checkGradesData = resData;
          this.total3 = this.checkGradesData.length;
          //console.log(this.checkGradesData);
          this.exportExcel();
        });
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      //格式化json并转换为excel
      exportExcel() {
          //console.log(this.checkGradesData);
        require.ensure([], () => {
          const { export_json_to_excel } = require('.././json2excel/Export2Excel');
          const tHeader = ['序号','姓名','考试题目','开始时间','考试类型','成绩',];
          const filterVal = ['num', 'user', 'theme', 'startTime', 'currTestType', 'sorce',];
          const data = this.formatJson(filterVal, this.checkGradesData);
          const name = this.checkGradesData[0].theme;
          export_json_to_excel(tHeader, data, name);
        })
      },
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
      //请求班级、专业
      axios.post('/teacherCMS/getClass', {
          data: {
            userType: this.userType
          }
        }).then((res) => {
        //    console.log(res.data);
            this.majorM = res.data.majorMsg;
            this.classM = res.data.classMsg;
        });

      //请求待考试数据
      this.toTestDataReq();

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

      //请求data数据
      axios.get("/readJson/bannerLeftData",{
        params:{
          user:234
        }
      }).then((res)=>{
        //    console.log((res.data[0].children));
        this.data = res.data[0].children;
      }).catch(function(error){
        console.log("error init." + error)
      });
    },

    components: {testHead,Modal, navUser, footFooter}

  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  a {
    color: inherit;
    cursor: pointer;
  }
  .teach_Test{
    min-width: 960px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 40px;
    border: 1px solid #6a1518;
  }
  .teach_Test .question {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
  }

  .teach_Test .leftBox {
    width: 18%;
    height: 100%;
  }

  .teach_Test .leftBox .userPicFont {
    height: 19%;
    padding-top: 94px;
    background: rgb(150,150,150);
  }

  .teach_Test .leftBox .userPicFont .user_bn .userPic{

  }

  .teach_Test .leftBox .leftItem {

  }

  .teach_Test .leftLi {
    line-height: 56px;
    background: rgb(210,210,210);
    margin-top: 10px;
    font-weight: bolder;
    font-size: 20px;
    cursor: pointer;
    color: #000;
  }

  .teach_Test .active {
    color: #fff;
    background:rgb(106,21,24)
  }

  .teach_Test .rightBox {
    width: 82%;
    height: 100%;
    position: relative;
    border-left: 1px solid #6a1518;
  }

  .teach_Test .el-tabs {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  .teach_Test .fontL {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    margin-left: 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .teach_Test .el-dropdown {
    width: 488px;
    position: relative;
  }

  .teach_Test .el-tree-node__expand-icon{
    color:#000;
  }

  .teach_Test .elinput {
    width: 502px;
    height: 38px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: auto;
    cursor: pointer;
  }

  .teach_Test .elinput ul li {
    display: inline-block;
  }

  .dropdown {
    width: 488px;
    height: 300px;
    position: absolute;
    left: 75px;
    bottom: 0;
  }

  .treeModle {
    width: 488px;
    height: 250px;
    overflow: auto;
  }

  .buttons .el-button{
    width:100%;
    height:50px;
    position:absolute;
    left:0;
    bottom:0;
}

  .teach_Test .el-tabs--border-card > .el-tabs__content {
    text-align: left;
  }

  .teach_Test .el-form-item__content .el-col-2 {
    padding-left: 0.4%;
    width: 1.33%;
  }

  .teach_Test .el-form-item__content .el-select {
    width: 100%;
  }

  .teach_Test .el-form-item__content .el-select-dropdown {
    min-width: 38%;
  }
  .teach_Test .el-tabs--border-card>.el-tabs__content{
    padding: 15px 60px 15px 15px;
  }
  .teach_Test .createTest{
    width:900px;
  }
  .teach_Test .testOnline {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }

  .teach_Test .contentBox {
    width: 100%;
    height: 100%;
    display: flex;
  }

  .teach_Test .dispear {
    display: none;
  }

  .teach_Test .el-table td, .el-table th {
    padding: 6px 0;
  }

  .teach_Test .userMessage {
    width: 1048px;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    text-align: left;
    overflow: auto;
  }

  .teach_Test .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    border-right-color: #6a1518;
    border-left-color: #6a1518;
  }
  .teach_Test .block {
    text-align: center;
  }
</style>
