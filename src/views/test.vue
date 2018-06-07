<template>
<div>
  <div class="title">
    <test-head></test-head>
  </div>
  <div class="test_T" :style="{height: height - 138 + 'px'}">
    <div class="question" id="content">
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

          <div class="Tecontent">
            <div class="data">
              <p class="data-p">
                <span class="data-p-title">考试题目:</span>
                <span class="data-p-desc">{{testOnlineData.theme}}</span>
              </p>
              <p class="data-p">
                <span class="data-p-title">考试时间:</span>
                <span class="data-p-desc">{{testOnlineData.date1}}  {{testOnlineData.date3}}——{{testOnlineData.date2}}  {{testOnlineData.date4}}</span>
              </p>
              <p class="data-p">
                <span class="data-p-title">考试时长:</span>
                <span class="data-p-desc">{{testOnlineData.theTestTime}}分钟</span>
              </p>
              <p class="data-p">
                <span class="data-p-title">考题数目:</span>
                <span class="data-p-desc">{{testOnlineData.allTestNum}}</span>
              </p>
              <p class="data-p">
                <span class="data-p-title">考试总分:</span>
                <span class="data-p-desc">{{testOnlineData.allScore}}</span>
              </p>
              <p>
                <span class="data-p-title">考试说明:</span>
              <p> 1. 考生考前15分钟到达考场，由监考人员核验考生准考证、有效身份证件。</p>
              <p> 2. 考生只准携带必要的考试文具（如钢笔，圆珠笔等）入场，不得携带任何书籍资料、通讯设备、数据存储设备、智能电子设备等辅助工具及其它未经允许的物品。</p>
              <p> 3. 考生请核验屏幕上显示的姓名、如有不符，请重新登录</p>
              <p> 4. 在自己核验无误后，等待监考人员统一指令开始进行正式考试。</p>
              <p> 5. 考试开始30分钟后，迟到考生不得进入考场。</p>
              <p> 6. 考试时间由系统自动控制，计时结束后系统将自动退出作答界面。</p>
              <p> 7. 考生在考场内应保持安静，严格遵守考场纪律，对于违反考场规定、不服从监考人员管理和作弊者将按按规定给予处罚。</p>
              <p> 8. 考试过程中，如出现死机或系统错误等，应立刻停止操作，举手与监考人员联系。</p>
              <p> 9. 考生点击交卷后，举手与监考人员联系，等监考人员确认考生交卷正常后，方可离开。</p>
              <p> 10. 考生离开考场后，不准在考场附近逗留和交谈。</p>
              <p> 11. 考生应自觉服从监考人员管理，不得以任何理由防碍监考人员正常工作。</p>
              </p>
            </div>
            <div class="sureBtn">
              <el-checkbox v-model="Iagree" v-if="!still_btn">我已阅读以上内容，点击进入考试开始倒计时</el-checkbox>
              <el-button type="danger" :disabled="!Iagree" plain @click='add()'>
                <p>开始考试</p>
              </el-button>
              <el-button type="danger" class="still_btn" v-if="still_btn" plain @click="jumpOther()">
                <p>继续考试</p>
              </el-button>
            </div>
          </div>
        </div>
        <div class="userMessage" v-show="currIndex === 1">
          <el-tabs type="border-card">

            <!--待考试-->
            <el-tab-pane label="待考试">
              <el-table :data="toTestData" style="width: 100%">

                <el-table-column label="序号" type="index" width="60">
                </el-table-column>

                <el-table-column label="考试题目" width="150">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.theme }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试开始时间" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date1 }} {{ scope.row.date3 }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试结束时间" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date2 }} {{ scope.row.date4 }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试时长" width="150">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.timeHour }}小时{{scope.row.timeMin}}分钟</span>
                  </template>
                </el-table-column>

                <el-table-column label="考题数目" width="150">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.question.length }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="sendInfor(scope.row)">
                      开始考试
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>

            </el-tab-pane>

            <!--历史考试-->
            <el-tab-pane label="历史考试">
              <el-table style="width: 100%"
                        :data="historyTestData.slice((currentPage-1)*pagesize,currentPage*pagesize)">

                <el-table-column label="序号" type="index" width="60">
                </el-table-column>

                <el-table-column label="考试题目" width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.theme }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试开始时间" width="180">
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.date1 }} {{ scope.row.date3 }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试类型" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.currTestType }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试题数" width="120">
                  <template slot-scope="scope">
                    <span>{{ scope.row.question.length }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="分数" width="100">
                  <template slot-scope="scope">
                    <span>{{ scope.row.sorce }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="查看试卷">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="getOriginPaper(scope.$index, scope.row)">
                      查看
                    </el-button>
                  </template>
                </el-table-column>

                <el-table-column label="错题分析">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="getErrorPaper(scope.$index, scope.row)">
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
                  :current-page.sync="currentPage"
                  :page-size="pagesize"
                  layout="prev, pager, next, jumper"
                  :total=parseInt(total)>
                </el-pagination>
              </div>

              <!--查看试卷弹出框-->
                <el-dialog title="查看试卷"
                           width="39%"
                           :before-close="handleClose"
                           :visible.sync="dialogTableVisible1">
                  <div v-for="(item2,index2) in originPaper.question">
                    <span class="desctitle">
                        {{index2 + 1}}.{{item2[0].desc}}
                    </span>
                    <ul class="ans">
                      <li>
                          <label for="11" v-if="item2[0].options[0]">
                              <input id="11" :type="item2[0].type" value="A" :name="item2[0].name" v-model="originPaper.currAnswer[index2]">
                                  {{item2[0].options[0]}}
                          </label>
                          <label for="22" v-if="item2[0].options[1]">
                              <input id="22" :type="item2[0].type" value="B" :name="item2[0].name" v-model="originPaper.currAnswer[index2]">
                                  {{item2[0].options[1]}}
                          </label>
                          <label for="33" v-if="item2[0].options[2]">
                              <input id="33" :type="item2[0].type" value="C" :name="item2[0].name" v-model="originPaper.currAnswer[index2]">
                                  {{item2[0].options[2]}}
                          </label>
                          <label for="44" v-if="item2[0].options[3]">
                              <input id="44" :type="item2[0].type" value="D" :name="item2[0].name" v-model="originPaper.currAnswer[index2]">
                                  {{item2[0].options[3]}}
                          </label>
                      </li>
                    </ul>
                  </div>
                </el-dialog>

                <!--查看错题分析-->
                <el-dialog title="错题分析"
                           width="39%"
                           :before-close="handleClose"
                           :visible.sync="dialogTableVisible2">
                  <div v-for="(item3,index3) in ErrorPaper">
                    <span class="desctitle">
                      <img src="../assets/imgs/err.jpg">
                      {{index3 + 1}}.{{item3[0].desc}}
                    </span>
                    <ul class="ans">
                      <li>
                          {{item3[0].options[0]}}
                          {{item3[0].options[1]}}
                          {{item3[0].options[2]}}
                          {{item3[0].options[3]}}
                      </li>
                    </ul>
                    <span>
                        正确答案：{{item3[0].answer}}
                    </span>
                  </div>
                </el-dialog>

            </el-tab-pane>

            <!--正在考试-->
            <el-tab-pane label="正在考试">
              <el-table :data="testNowData" style="width: 100%">

                <el-table-column label="序号" type="index" width="60">
                </el-table-column>

                <el-table-column label="考试题目" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.theme }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试开始时间" width="180">
                  <template slot-scope="scope">
                    <span>{{ scope.row.newData }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考试类型" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.currTestType }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="考题数目" width="150">
                  <template slot-scope="scope">
                    <span>{{ scope.row.question.length }}</span>
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="jumpOther()">
                      继续考试
                    </el-button>
                  </template>
                </el-table-column>

              </el-table>

            </el-tab-pane>

          </el-tabs>

        </div>
        <div class="exerciseOnline" v-show="currIndex === 2">
          <div class="test-exercise">
            <el-tabs type="border-card" @tab-click="rightAppear2()">
              <el-tab-pane label="创建练习">
                <el-form class="test-exercise-form" ref="stuform" :model="stuform" status-icon :rules="rules"
                         label-width="80px">
                  <el-form-item label="练习内容" prop="name">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <div class="elinput">
                                <ul>
                                    <li v-for="item in stuform.name">{{item}}/</li>
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

                  <el-form-item label="考题数目" prop="num" required>
                    <el-input class="exerciseNum" v-model.number="stuform.num"
                              placeholder="请输入考试题数(0 —— 100)"></el-input>
                  </el-form-item>

                  <el-form-item label="考试时长">
                    <el-col :span="6">
                      <el-form-item prop="timeHour">
                        <el-select v-model="stuform.timeHour" placeholder="请选择小时" @change="isMin">
                          <el-option label="0" value="0"></el-option>
                          <el-option label="1" value="1"></el-option>
                          <el-option label="2" value="2"></el-option>
                          <el-option label="3" value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">小时</el-col>
                    <el-col :span="6">
                      <el-form-item prop="timeMin">
                        <el-select v-model="stuform.timeMin" placeholder="请选择分钟">
                          <el-option label="0" :disabled="formDisabled" value="0"></el-option>
                          <el-option label="10" value="10"></el-option>
                          <el-option label="20" value="20"></el-option>
                          <el-option label="30" value="30"></el-option>
                          <el-option label="40" value="40"></el-option>
                          <el-option label="50" value="50"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="1">分钟</el-col>
                  </el-form-item>

                  <el-button type="primary" @click="submitForm('stuform')">开始练习</el-button>
                  <el-button type="default" @click="resetForm('stuForm')" value="Reset">重置</el-button>
                </el-form>
              </el-tab-pane>

              <!--历史练习-->
              <el-tab-pane label="历史练习">
                <el-table style="width: 100%"
                          :data="historyPracticeData.slice((currentPage-1)*pagesize,currentPage*pagesize)">

                  <el-table-column label="序号" type="index" width="60">
                  </el-table-column>

                  <el-table-column label="练习题目" width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.theme }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="创建时间" width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.date1 }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="考试类型" width="120">
                    <template slot-scope="scope">
                      <span>{{ scope.row.currTestType }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="练习数目" width="120">
                    <template slot-scope="scope">
                      <span>{{ scope.row.question.length }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="查看练习试卷">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="getExercisePaper(scope.$index, scope.row)">
                        查看
                      </el-button>
                    </template>
                  </el-table-column>

                  <el-table-column label="练习错题分析">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="getExerciseError(scope.$index, scope.row)">
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
                    :current-page.sync="currentPage"
                    :page-size="pagesize"
                    layout="prev, pager, next, jumper"
                    :total=parseInt(total)>
                  </el-pagination>
                </div>

                <!--查看练习试卷弹出框-->
                <el-dialog title="查看练习试卷"
                           width="39%"
                           :before-close="handleClose"
                           :visible.sync="dialogTableVisible3">
                  <div v-for="(item2,index2) in exerciseOriginPaper.question">
                    <span class="desctitle">
                        {{index2 + 1}}.{{item2[0].desc}}
                    </span>
                    <ul class="ans">
                      <li>
                          <label for="11" v-if="item2[0].options[0]">
                              <input id="11" :type="item2[0].type" value="A" :name="item2[0].name" v-model="exerciseOriginPaper.currAnswer[index2]">
                                  {{item2[0].options[0]}}
                          </label>
                          <label for="22" v-if="item2[0].options[1]">
                              <input id="22" :type="item2[0].type" value="B" :name="item2[0].name" v-model="exerciseOriginPaper.currAnswer[index2]">
                                  {{item2[0].options[1]}}
                          </label>
                          <label for="33" v-if="item2[0].options[2]">
                              <input id="33" :type="item2[0].type" value="C" :name="item2[0].name" v-model="exerciseOriginPaper.currAnswer[index2]">
                                  {{item2[0].options[2]}}
                          </label>
                          <label for="44" v-if="item2[0].options[3]">
                              <input id="44" :type="item2[0].type" value="D" :name="item2[0].name" v-model="exerciseOriginPaper.currAnswer[index2]">
                                  {{item2[0].options[3]}}
                          </label>
                      </li>
                    </ul>
                  </div>
                </el-dialog>

                <!--查看错题分析-->
                <el-dialog title="错题分析"
                           width="39%"
                           :before-close="handleClose"
                           :visible.sync="dialogTableVisible4">
                  <div v-for="(item3,index3) in exerciseErrorPaper">
                    <span class="desctitle">
                      <img src="../assets/imgs/err.jpg">
                      {{index3 + 1}}.{{item3[0].desc}}
                    </span>
                    <ul class="ans">
                      <li>
                          {{item3[0].options[0]}}
                          {{item3[0].options[1]}}
                          {{item3[0].options[2]}}
                          {{item3[0].options[3]}}
                      </li>
                    </ul>
                    <span>
                        正确答案：{{item3[0].answer}}
                    </span>
                  </div>
                </el-dialog>

              </el-tab-pane>
            </el-tabs>

          </div>
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
  import core from '../assets/js/core.js';
  import testHead from '@/components/common/testHead'
  import footFooter from '@/components/common/footFooter'
  import Modal from '@/components/testCenter/modal';
  import navUser from '@/components/common/navUser';


  export default {
    name: 'test',
    data() {
      var checkNum = (rule, value, callback) => {
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
      return {
        leftBox: [
          {li: '在线考试'},
          {li: '考试管理'},
          {li: '在线练习'}
        ],
        data: [],
        stuform: {
          name: [],
          nameId: [],
          timeHour: 2,
          timeMin: 0,
          num: ''
        },
        rules: {
          name: [
            {required: true, message: '请选择练习的内容', trigger: 'change'}
          ],
          timeHour: [
            {required: true, message: '请选择考试小时', trigger: 'change'},
          ],
          timeMin: [
            {required: true, message: '请选择考试分钟', trigger: 'change'},
          ],
          num: [
            {validator: checkNum, trigger: 'blur'}
          ]
        },
        textQuestionData: '',
        minutes: 120,
        seconds: 0,
        dispear: true,
        answer: true,
        myAns: '',
        myNumber: '',
        questionIndex: '',
        errorIndex: [],
        sorce: 0,
        error: [],
        setRed: false,
        submits: false,
        nowTime: '',
        currentdate: '',
        hours: '',
        minute: '',
        second: '',
        currIndex: 0,
        user: this.$store.state.username,
        time: 0,
        isCheck: '',
        isCheckNum: 0,
        isCheckArr: [],
        length: '',
        classItem: {},
        QidArr: [],
        null: [],
        picked: [],
        Display: false,
        lengthData: '',
        url: document.domain,
        showModal: false,
        showModal1: false,
        currTestInfor: [],
        currTestRes: [],
        currTestId: '',
        interval: {},
        TestNum: 0,
        Iagree: '',
        formDisabled: false,
        still_btn: false,
        testNowData: [], //正在考试
        toTestData: [], //待考试
        historyTestData: [], //历史考试
        historyPracticeData:[],  //历史练习
        total: '',
        currentPage: 1,
        pagesize: 10,
        isTesting:0,
        testOnlineData:{
          theme:"暂无",
          date1:"暂无",
          date2:"暂无",
          date3:"暂无",
          date4:"暂无",
          timeHour:0,
          timeMin:0,
          theTestTime:0,
          allTestNum:"暂无",
          allScore:0
        },
        originPaper:[],
        dialogTableVisible1: false,
        ErrorPaper:[],
        dialogTableVisible2: false,
        exerciseOriginPaper:[],
        dialogTableVisible3: false,
        exerciseErrorPaper:[],
        dialogTableVisible4: false,
        exerciseInfo:[],
        height:window.innerHeight
      }
    },
    computed:{
      stillBtn:{
        get:function () {
          if(this.$store.state.stillBtn == false){
            return this.$store.state.stillBtn
          }
        },
        set:function (val) {
          this.still_btn = val
        }
      }

    },
    created() {
      axios.get("/readJson/bannerLeftData", {
        params: {
          user: 234
        }
      }).then((res) => {
        //    console.log((res.data[0].children));
        this.data = res.data[0].children;
      }).catch(function (error) {
        console.log("error init." + error)
      });

      window.onkeydown = function () {
        if (checkFull()) {
          if (window.event.keyCode === 27) {
            alert("...");
            event.preventDefault();
          }
        }
      };

      function checkFull() {
        var isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;

        //to fix : false || undefined == undefined
        if (isFull === undefined) isFull = false;
        return isFull;
      }

    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.handleResize)
    },
    mounted() {
      window.addEventListener('resize', this.handleResize)
      this.testNow();
    },
    watch: {
      second: {
        handler(newVal) {
          this.num(newVal)
        }
      },
      minute: {
        handler(newVal) {
          this.num(newVal)
        }
      }
    },


    methods: {
      //监听浏览器高度
      handleResize (event) {
        this.height = window.innerHeight;
        if(this.height <= "620"){
            this.height = 598;
        }
      },
      //查看试卷弹出框
      getOriginPaper(index, row){
        this.dialogTableVisible1 = true;
        console.log(row);
      //  console.log(row.question)
        this.originPaper = row;
      },
      //查看错题分析弹出框
      getErrorPaper(index, row){
        this.dialogTableVisible2 = true;

      //  console.log(row.question);
      //  console.log(row.error);
        for(var i = 0; i < row.error.length; i++){
          for(var j = 0; j < row.question.length; j++){
              if(row.error[i] - 1 == j){
                this.ErrorPaper.push(row.question[j])
              }
          }
        }
        console.log(this.ErrorPaper)
      },
      //查看练习试卷弹出框
      getExercisePaper(index, row){
        this.dialogTableVisible3 = true;
        console.log(row);
        this.exerciseOriginPaper = row;
      },
      //查看练习错题分析弹出框
      getExerciseError(index, row){
        this.dialogTableVisible4 = true;

        console.log(row);
      //  console.log(row.error);
        for(var i = 0; i < row.error.length; i++){
          for(var j = 0; j < row.question.length; j++){
              if(row.error[i] - 1 == j){
                this.exerciseErrorPaper.push(row.question[j])
              }
          }
        }
        console.log(this.exerciseErrorPaper)
      },
      //关闭弹窗
      handleClose(done) {
        done();
        this.exerciseErrorPaper = [];
        this.ErrorPaper = [];
      },
      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      /*获取待考试的考试题（待考试的开始）*/
      getTestQ() {
        let reqCurrTestNum = '';
        if (this.toTestData.length >= 1) {
          reqCurrTestNum = this.toTestData[0].currTestNum;
        } else {
          reqCurrTestNum  = '';
        }
        axios.get("/readTestQuestionInfo/getTestQ", {
          params: {
            user: this.user,
            currTestNum: reqCurrTestNum,
          }
        }).then((res) => {
          if (res.data.state == 1) {
            this.textQuestionData = res.data;
          }
          //console.log("ddddddd")
          //console.log(res.data);
          //console.log(this.TestNum+"LLL")
        }).catch(function (error) {
          console.log("error init." + error)
        });
      },

      //待考试 ,, 开始考试,跳转
      sendInfor(row) {
       // console.log(row.currTestNum);
       var time1 = row.date1 + " " + row.date3
        var time2 = row.date2 + " " + row.date4
        var tc1 = new Date(time1).getTime()
        var tc2 = new Date(time2).getTime()
        var tcn = new Date()
        //console.log(new Date(time1).getTime())
        //console.log(new Date().getTime())
        //console.log(new Date(time2).getTime())
        if(tc1 <= tcn && tcn <= tc2){
          axios.get("/readTestQuestion/clickStartTest", {
            params: {
              user: this.user,
              currTestNum: row.currTestNum,
              startTestTime:new Date()
            }
          }).then((res) => {
            //console.log("AAAA");
            let resData = res.data;
            //console.log(resData);
            this.toTestData = resData;
            this.total = this.toTestData.length;
            this.jumpOther();
            this.testNowData = [];
            this.testNow();
            this.testManagenWait();
          });
        }else{
          this.$message({
            showClose: true,
            message: '请在考试时间范围内开始考试',
            type: 'error'
          });
        }


      },
      //跳转页面
      jumpOther(){
          const {href} = this.$router.resolve({
          name: 'realyTest'
        });
        window.open(href, '_blank', "channelmode=yes,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes, width=3000, height=2000")
      },
      //本来类似F11的全屏
      requestFullScreen(element) {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
        if (requestMethod) {
          requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
            wscript.SendKeys(122);
          }
        }
      },
      //考试时长小时是0时分钟禁用0
      isMin() {
        if (this.stuform.timeHour == "0") {
          this.formDisabled = !this.formDisabled;
          this.stuform.timeMin = '';
        } else {
          this.stuform.timeMin = 0;
          this.formDisabled = false;
        }
      },

      num: function (n) {
        return n < 10 ? "0" + n : "" + n
      },
      //判断是否到考试时间，能否考试
      add: function () {
        //将指定时间转成时间戳
        var time1 = this.testOnlineData.date1 + " " +this.testOnlineData.date3
        var time2 = this.testOnlineData.date2 + " " +this.testOnlineData.date4
        //console.log(time2)
        var tc1 = new Date(time1).getTime()
        var tc2 = new Date(time2).getTime()
        var tcn = new Date()
        //console.log(new Date(time1).getTime())
        //console.log(new Date().getTime())
        //console.log(new Date(time2).getTime())
        if(tc1 <= tcn && tcn <= tc2){
          this.getTest();
        }else if(this.testOnlineData.date1 == "暂无"){
          this.$message({
            showClose: true,
            message: '最近没有考试哦',
            type: 'error'
          });
        }else{
          this.$message({
            showClose: true,
            message: '请在考试时间范围内开始考试',
            type: 'error'
          });
        }
      },

      //开始考试时获取考试题目
      getTest() {
        axios.get("/readTestQuestion/clickStartTest", {
          params: {
            //state默认为0未开始考试，开始后为1
            //考试状态: currTestType 101 : 期末考试    102: 期中考试   103：随堂练习   104：在线练习
            user: this.user,
            currTestNum: this.toTestData[0].currTestNum,
            startTestTime:new Date()
          }
        }).then((res) => {
          //console.log(res.data.code);
          if (res.data.code == 0) {
            this.jumpOther();
            this.testNow();
            this.testManagenWait();
          } else {
            console.log('请求出错');
          }
        }).catch(function (error) {
          console.log("error init." + error)
        });
      },

      myNum: function (index2) {
        this.myNumber = index2;
        //console.log(this.myNumber)
      },
      tip(index) {
        this.$set(this.classItem, index, true)
      },
      rightAppear(index) {
        this.currIndex = index;
        if (index == 1) {
          this.testManagenWait();
          this.testManagenHistory();
          this.testNowData = [];
          this.testNow();
        }
      },
      //点击历史练习获取数据
      rightAppear2(tab, event){
          this.historyPracticeData = [];
          this.historyPractice();
      },
       /*获取正在考试的题*/
      testNow() {
        axios.get("/readTestQuestion/getTestQing", {
          params: {
            user: this.user,
            state: 1,
          }
        }).then((res) => {
          if (res.data.state == 1) {
            this.testNowData.push(res.data);
            //console.log(res.data.date1);
            res.data.date1 = moment(res.data.date1).format("YYYY-MM-DD");
            res.data.date2 = moment(res.data.date2).format("YYYY-MM-DD");
            if(this.testNowData){
              this.still_btn = true;
              this.$store.commit('stillBtn',true);
              this.isTesting = 1;

              this.testOnlineData.theme = this.testNowData[0].theme;
              this.testOnlineData.date1 = this.testNowData[0].date1;
              this.testOnlineData.date2 = this.testNowData[0].date2;
              this.testOnlineData.date3 = this.testNowData[0].date3;
            //  console.log(this.testNowData[0].date4)
              this.testOnlineData.date4 = this.testNowData[0].date4;
              this.testOnlineData.timeHour = this.testNowData[0].timeHour;
              this.testOnlineData.timeMin = this.testNowData[0].timeMin;
              this.testOnlineData.theTestTime = parseInt(this.testOnlineData.timeHour * 60) + parseInt(this.testOnlineData.timeMin);
              this.testOnlineData.allTestNum = this.testNowData[0].question.length;
              this.testOnlineData.allScore = this.testNowData[0].allScore;
              this.testManagenWait();
            }
          } else {
            this.testManagenWait();
          }
        });
      },
      //请求待考试数据
      testManagenWait() {
        axios.get("/readTestQuestionInfo/stuToTestData", {
          params: {
            user: this.user,
          }
        }).then((res) => {
          let resData = res.data;
        //  console.log(resData[0].date1)
        //  console.log( resData[0].date1.valueOf() )
          if (resData) {
            for (let i = 0; i < resData.length; i++) {
              resData[i].date1 = moment(resData[i].date1).format("YYYY-MM-DD");
              resData[i].date2 = moment(resData[i].date2).format("YYYY-MM-DD");
              resData[i].currTestType = core.getCurrTestType(resData[i].currTestType);
            }
            this.toTestData = resData;
          //  console.log("xjxj")
          //  console.log(this.toTestData)
            if(this.isTesting == 0){
              this.testOnlineData.theme = this.toTestData[0].theme;
              this.testOnlineData.date1 = this.toTestData[0].date1;
              this.testOnlineData.date2 = this.toTestData[0].date2;
              this.testOnlineData.date3 = this.toTestData[0].date3;
              this.testOnlineData.date4 = this.toTestData[0].date4;
              this.testOnlineData.timeHour = this.toTestData[0].timeHour;
              this.testOnlineData.timeMin = this.toTestData[0].timeMin;
              this.testOnlineData.theTestTime = parseInt(this.testOnlineData.timeHour * 60) + parseInt(this.testOnlineData.timeMin);
            //  console.log(this.testOnlineData.theTestTime);
              this.testOnlineData.allTestNum = this.toTestData[0].question.length;
              this.testOnlineData.allScore = this.toTestData[0].allScore;
            }else{
            }
          } else {
            console.log('stuToTestData请求无数据');
          }
          this.total = this.toTestData.length;
          this.getTestQ();
          //this.getTestQuesInfo();
        });
      },
      //请求历史考试数据
      testManagenHistory() {
        axios.get("/readTestQuestion/stuHistoryTestData", {
          params: {
            user: this.user,
          }
        }).then((res) => {
        //  console.log("res.data")
        //  console.log(res.data.testQuestionInfo)
          let resTestData = res.data.testQuestionInfo;
        //  let resTestInfoData = res.data.testQuestionInfo;
          for (let i = 0; i < resTestData.length; i++) {
            if(resTestData[i].currTestType == "106"){
              resTestData[i] = [];
            }
            resTestData[i].date1 = moment(resTestData[i].date1).format("YYYY-MM-DD");
            resTestData[i].currTestType = core.getCurrTestType(resTestData[i].currTestType);
        //    resTestData[i].sorce = resTestInfoData[i].sorce;
        //    for (let j = 0; j < resTestData[i].question.length; j++){
        //      resTestData[i].question[j].currAnswer = resTestInfoData[i].currAnswer[j];
        //    };
        //    resTestData[i].error = resTestInfoData[i].error;
          }
          this.historyTestData = resTestData;
          console.log(resTestData);
        //  console.log(resTestInfoData);
          this.total = this.historyTestData.length;
        });
      },
      // 成功后提示信息
      Success(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      // 错误信息提示
      errorMsg(msg) {
        this.$message.error(msg);
      },

      //提交创建练习结果并跳转
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(this.stuform);
          if (valid) {
            axios({
              method: 'get',
              url: "/readTestQuestion/stuNewExercise",
              params: {
                user: this.user,
                name: this.stuform.name,
                nameId: this.stuform.nameId,
                timeHour: this.stuform.timeHour,
                timeMin: this.stuform.timeMin,
                num: this.stuform.num,
              }
            }).then((res) => {
              if (res.data.code == 0) {
                //console.log(res.data.code);
                  const {href} = this.$router.resolve({
                  name: 'testExercise'
                });
                window.open(href, '_blank', "channelmode=yes,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes, width=3000, height=2000")
                this.cleanAllData(formName);
              } else {
                this.errorMsg('未创建成功')
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //创建考试后清空数据
      cleanAllData(formName){
        this.$refs[formName].resetFields();
        this.stuform.timeHour = 2;
        this.stuform.timeMin = 0;
      },
      //手动重置
      resetForm(formName) {
        this.stuform = {};
        this.stuform.timeHour = 2;
      },
      //考试主题显示在input的func
      getCheckedNodes() {
        this.stuform.name = [];
        this.stuform.nameId = [];
        var arr = this.$refs.tree.getCheckedNodes();
        for (var i = 0; i < arr.length; i++) {
          this.stuform.name.push(arr[i].label);
          this.stuform.nameId.push(arr[i].courseId);
        }
      },
      handleClick(data) {
      },
      //在线练习,--历史练习
      historyPractice() {
        axios.get("/readTestQuestion/stuHistoryPractice", {
          params: {
            user: this.user,
          }
        }).then((res) => {
          console.log(res.data.testQuestionInfo)
          let resTestData = res.data.testQuestionInfo;
        //  let resTestInfoData = res.data.testQuestion;
          for (let i = 0; i < resTestData.length; i++) {
            resTestData[i].date1 = moment(resTestData[i].newData).format("YYYY-MM-DD hh:mm:ss");
            resTestData[i].currTestType = core.getCurrTestType(resTestData[i].currTestType);
        //    resTestData[i].sorce = resTestInfoData[i].sorce;
        //    for (let j = 0; j < resTestData[i].question.length; j++){
        //      resTestData[i].question[j].currAnswer = resTestInfoData[i].currAnswer[j];
        //    };
        //    resTestData[i].error = resTestInfoData[i].error;
          }
          this.historyPracticeData = resTestData;
        //  this.total = this.historyPracticeData.length;
          console.log(this.historyPracticeData)
        });
      },

    },
    components: {testHead,Modal, navUser, footFooter}

  }
</script>

<style>
  * {
    padding: 0;
  }

  ul li {
    list-style: none;
  }

  a {
    color: inherit;
    cursor: pointer;
  }

  p {
    margin: 0;
  }
  .test_T{
    min-width: 960px;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 40px;
    border: 1px solid #6a1518;
  }
  .test_T .question {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
  }

  .test_T .leftBox {
    width: 18%;
    height: 100%;
  }

  .test_T .leftBox .userPicFont {
    height: 19%;
    padding-top: 94px;
    background: rgb(150,150,150);
  }

  .test_T .leftLi {
    line-height: 56px;
    background: rgb(210,210,210);
    margin-top: 10px;
    font-weight: bolder;
    font-size: 20px;
    cursor: pointer;
    color: #000;
  }

  .test_T .active {
    color: #fff;
    background:rgb(106,21,24)
  }

  .test_T .rightBox {
    width: 82%;
    height: 100%;
    position: relative;
    border-left: 1px solid #6a1518;
  }

  .test_T .testOnline {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }

  .test_T .inforItem {
    margin-left: 8px;
    display: flex;
  }

  .test_T .infor {
    margin-right: 14px;
    margin-top: 20px;
  }

  .test_T .infor p {
    font-size: 17px;
    margin-top: -2px;
  }

  .test_T .notSt {
    position: relative;
  }

  .test_T .notStart {
    display: block;
    width: 70px;
    background: #fff;
    position: absolute;
    top: 21px;
    left: 0;
  }

  .test_T .Tecontent {
    width: 100%;
    height: 85%;
  }

  .test_T .data {
    width: 100%;
    height: 107%;
    overflow: hidden;
    text-align: left;
    padding: 30px 40px 4px 40px;
    box-sizing: border-box;
    overflow: auto;
  }

  .test_T .data-p {
    height: 9%;
    line-height: 9%;
  }

  .test_T .data-p-title {
    margin-right: 50px;
    font-weight: bolder;
  }

  .test_T .data-p-desc {
    font-size: 15px;
  }

  .test_T .sureBtn {
    position: relative;
    width: 100%;
    border-top: 1px solid #6a1518;
    text-align: right;
  }

  .test_T .dispear {
    display: none;
  }

  .test_T .still_btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .test_T .tip {
    background: yellow;
    height: 18px;
  }

  .test_T .number {
    width: 29%;
    height: 100%;
    border: 1px solid #000;
    position: relative;
  }

  .test_T .number li {
    display: inline-block;
    margin-left: 4px;
  }

  .test_T .number a {
    display: block;
    width: 50px;
    height: 50px;
    border: 1px solid #000;
    margin-top: 16%;
    padding-top: 36%;
    box-sizing: border-box;
  }

  .test_T .isCheck {
    background: #953033;
    color: #fff;
  }

  .test_T .status {
    display: flex;
    margin-top: 30px;
  }

  .test_T .do {
    margin-left: 30px;
  }

  .test_T .doP {
    border: 1px solid #000;
  }

  .test_T .desc {
    margin-top: 15px;
  }

  .test_T .desctitle {
    font-weight: bolder;
  }

  .test_T .err {
    color: #e4393c;
  }

  .test_T .ans {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .test_T .answer {
    display: none;
  }

  .test_T .ans li {
    margin-left: 27px;
  }

  .test_T .ans li :hover {
    cursor: pointer;
  }

  .test_T .btn {
    width: 85%;
    height: 78px;
    margin-top: 10px;
    background-color: #e4393c;
    padding: 8px;
    position: absolute;
    bottom: 48px;
    left: 18px;
    cursor: pointer;
  }

  .test_T .userMessage {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    text-align: left;
    overflow: auto;
  }

  .test_T .testLine {
    background: #ddd;
    padding-left: 5px;
    margin-bottom: 10px;
  }

  .test_T .testLine li {
    display: inline-block;
    width: 143px;
    margin-right: 17px;
  }

  .test_T .testLine .testTitle a {
    text-decoration: underline;
  }

  .test_T .testLine .testTitle a:hover {
    color: #f00;
  }

  .test_T .errAnalysis a {
    text-decoration: underline;
  }

  .test_T .errAnalysis a:hover {
    color: #f00;
  }

  .test_T .ans {
    display: flex;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .test_T .ans li {
    margin-left: 27px;
    width: 100%;
  }

  .test_T .ans li :hover {
    cursor: pointer;
  }

  #content:-webkit-full-screen {
    width: 100%;
    height: 100%;
  }

  .test_T .el-col {
    border-radius: 4px;
  }

  .test_T .bg-purple-dark {
    background: #99a9bf;
  }

  .test_T .grid-content {
    border-radius: 4px;
    min-height: 36px;
    text-align: center;
  }

  .test_T .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .el-button--danger.is-plain {
    padding: 15px 40px 15px 40px;
    color: #000;
    background: #f56c6c;
  }

  .test_T .el-button--danger.is-plain p {
    font-size: 20px;
  }

  .test_T .line{
    margin-left: -32px;
    margin-top: 8px;
  }

  .test_T .exerciseOnline {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    text-align: left;
    overflow: auto;
  }

  .test_T .test-exercise {
    width: 100%;
    height: 85%;
    box-sizing: border-box;
  }

  .test_T .el-select-dropdown__list .el-select-dropdown__item {
    padding: 0 20px !important;
  }

  .test_T .el-button--primary {
    padding: 10px !important;
  }

  .test_T .el-button--default {
    padding: 10px !important;
  }

  .test_T .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
    border-right-color: #6a1518;
    border-left-color: #6a1518;
  }

  .test_T .el-tabs--border-card > .el-tabs__content .block {
    padding-left: 36%;
    box-sizing: border-box;
  }

  .test_T .el-dropdown {
    width: 488px;
    position: relative;
  }

  .test_T .elinput {
    width: 502px;
    height: 38px;
    border: 1px solid #ccc;
    border-radius: 4px;
    overflow: auto;
  }

  .test_T .el-form-item__content {
    line-height: 22px !important;
  }

  .test_T .elinput ul li {
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

  .buttons .el-button {
    width: 100%;
    height: 60px;
    position: absolute;
    left: 0;
    bottom: 0;
  }

  .test_T .exerciseNum {
    width: 23%;
  }
  .test_T .el-table td, .el-table th {
    padding: 6px 0;
  }
  .test_T .el-dialog{
    height:61%;
    overflow:auto;
  }
</style>
