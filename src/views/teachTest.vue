<template>
  <div class="teach_Test">
    <div class="question">
      <div class="leftBox">
        <p>
          <nav-user></nav-user>
        </p>
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
          <div class="titleB">
            <div>
              <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
            </div>
          </div>
          <div class="contentBox">
            <el-tabs type="border-card" style="float:none;">

              <!--待考试-->
              <el-tab-pane label="待考试">
                <el-table style="width: 100%" :data="toTestData.slice((currentPage-1)*pagesize,currentPage*pagesize)">

                  <el-table-column label="序号" type="index" width="60">
                  </el-table-column>

                  <el-table-column label="考试题目" width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.theme }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="创建时间" width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.newData }}</span>
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

                  <el-table-column label="详细信息" width="120">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary">
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

              </el-tab-pane>

              <!--历史考试-->
              <el-tab-pane label="历史考试">
                <el-table style="width: 100%" :data="historyTestData.slice((currentPage-1)*pagesize,currentPage*pagesize)">

                  <el-table-column label="序号" type="index" width="60">
                  </el-table-column>

                  <el-table-column label="考试题目" width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.theme }}</span>
                    </template>
                  </el-table-column>

                  <el-table-column label="创建时间" width="200">
                    <template slot-scope="scope">
                      <span>{{ scope.row.newData }}</span>
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
                      <el-button size="mini" type="primary">
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

              </el-tab-pane>

              <!--创建考试-->
              <el-tab-pane label="创建考试">
                <div>
                  <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">

                    <el-form-item label="考试题目" prop="theme">
                      <el-input class="numberClass" placeholder="请创建考试题目" v-model.theme="form.theme" style="width: 54.8%"></el-input>
                    </el-form-item>

                    <el-form-item label="考试范围" prop="name">
                      <el-dropdown>
                            <span class="el-dropdown-link">
                                <div class="elinput">
                                    <ul>
                                        <li v-for="item in form.name">{{item}}/</li>
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
                          <div class="buttons">
                            <el-button @click="getCheckedNodes">确定</el-button>
                          </div>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </el-form-item>

                    <el-form-item label="开始时间" required>
                      <el-col :span="11">
                        <el-form-item prop="date1">
                          <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1"
                                          style="width: 100%;"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="date3">
                          <el-time-picker type="fixed-time" placeholder="选择开始时间" v-model="form.date3"
                                          style="width: 100%;"></el-time-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="结束时间" required>
                      <el-col :span="11">
                        <el-form-item prop="date2">
                          <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2"
                                          style="width: 100%;"></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="date4">
                          <el-time-picker type="fixed-time" placeholder="选择结束时间" v-model="form.date4"
                                          style="width: 100%;"></el-time-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>

                    <el-form-item label="考试时长">
                      <el-col :span="8">
                        <el-form-item prop="timeHour">
                          <el-select v-model="form.timeHour" placeholder="请选择小时">
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
                          <el-select v-model="form.timeMin" placeholder="请选择分钟" @visible-change="isMin">
                            <el-option label="0" :disabled="formDisabled" value="0"></el-option>
                            <el-option label="10" value="10"></el-option>
                            <el-option label="20" value="20"></el-option>
                            <el-option label="30" value="30"></el-option>
                            <el-option label="40" value="40"></el-option>
                            <el-option label="50" value="50"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="4">分钟</el-col>
                    </el-form-item>
                  </el-form>

                  <el-form :inline="true" class="demo-form-inline" ref="form" :model="form" status-icon :rules="rules"
                           label-width="80px">
                    <el-form-item label="考试类型" prop="currTestType">
                      <el-select v-model="form.currTestType" placeholder="请选择考试类型">
                        <el-option label="期末考试" value="101"></el-option>
                        <el-option label="期中考试" value="102"></el-option>
                        <el-option label="随堂练习" value="103"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="考题数目" prop="num" required>
                      <el-input v-model.number="form.num" placeholder="请输入考试题数(0 —— 1000)"></el-input>
                    </el-form-item>

                    <el-form-item label="专业" prop="major">
                      <el-select v-model="form.major" placeholder="请选择专业">
                        <el-option label="汽车维修" value="汽车维修"></el-option>
                        <el-option label="汽车维护" value="汽车维护"></el-option>
                        <el-option label="汽车电气" value="汽车电气"></el-option>
                      </el-select>
                    </el-form-item>

                    <el-form-item label="班级" prop="classGrade">
                      <el-input v-model="form.classGrade" placeholder="请输入班级"></el-input>
                    </el-form-item>

                    <p>
                      <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                    </p>
                  </el-form>
                </div>
              </el-tab-pane>

            </el-tabs>
          </div>
        </div>
        <!--成绩管理-->
        <div class="userMessage" v-show="currIndex === 1">
          <div class="titleB">
            <div>
              <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
            </div>
          </div>

          <el-table style="width: 97%; margin-left: 16px" :data="historyTestData.slice((currentPage-1)*pagesize,currentPage*pagesize)">

            <el-table-column label="序号" type="index" width="60">
            </el-table-column>

            <el-table-column label="考试题目" width="100">
              <template slot-scope="scope">
                <span>{{ scope.row.theme }}</span>
              </template>
            </el-table-column>

            <el-table-column label="创建时间" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.newData }}</span>
              </template>
            </el-table-column>

            <el-table-column label="考试类型" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.currTestType }}</span>
              </template>
            </el-table-column>

            <el-table-column label="专业" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.major }}</span>
              </template>
            </el-table-column>

            <el-table-column label="班级" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.classGrade }}</span>
              </template>
            </el-table-column>

            <el-table-column label="成绩详情">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="scoreManData(scope.$index, scope.row)">
                  查看成绩
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

          <!--查看成绩对话框-->
          <el-dialog title="成绩列表"
                     width="70%"
                     :visible.sync="dialogTableVisible">
            <el-table :data="scoreData">
              <el-table-column label="序号" type="index" width="60"></el-table-column>
              <el-table-column property="name" label="姓名" width="120"></el-table-column>
              <el-table-column property="data" label="学号" width="120"></el-table-column>
              <el-table-column property="data" label="分数" width="100"></el-table-column>
              <el-table-column property="data" label="总题数" width="100"></el-table-column>
              <el-table-column property="data" label="错题数" width="100"></el-table-column>
              <el-table-column property="data" label="正确率" width="100"></el-table-column>
              <el-table-column property="data" label="答题用时" width="100"></el-table-column>
            </el-table>
          </el-dialog>

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
  import footFooter from '@/components/common/footFooter'
  import Modal from '@/components/testCenter/modal';
  import core from '../../server/utils/core.js';
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
            if (value <= 0 || value > 1000) {
              callback(new Error('题数必须大于0且小于1000'));
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
        form: {
          theme: '',
          name: [],
          nameId: [],
          currTestType: '',
          date1: '',
          date2: '',
          date3: '',
          date4: '',
          num: '',
          timeHour: '',
          timeMin: '',
          major: '',
          classGrade: '',
          newData: moment().format("YYYY-MM-DD hh:mm:ss")
        },
        rules: {
          theme: [
            {required: true, message: '请输入考试题目', trigger: 'blur'},
          ],
          name: [
            {required: true, message: '请输入考试范围', trigger: 'blur'},
          ],
          currTestType: [
            {required: true, message: '请选择考试类型', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date3: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          date4: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          num: [
            {validator: checkNum, trigger: 'blur'}
          ],
          timeHour: [
            {required: true, message: '请选择考试小时', trigger: 'change'},
          ],
          major: [
            {required: true, message: '请输入专业', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 位', trigger: 'blur'}
          ],
          classGrade: [
            {required: true, message: '请输入班级', trigger: 'blur'},
            {min: 2, max: 12, message: '长度在 2 到 12 位', trigger: 'blur'}
          ]
        },
        toTestData: [],
        historyTestData: [],
        scoreM: [],
        currentPage: 1,
        pagesize: 8,
        total: '',
        dialogTableVisible: false,
        scoreData: [],
      };
    },

    methods: {
      //教师创建考试后重新请求待考试数据
      toTestDataReq() {
        axios.get("http://" + this.url + ":8000/readTestQuestion/toTestData", {
          params: {
            user: this.user,
          }
        }).then((res) => {
          //console.log(res.data);
          let resData = res.data;
          for (let i = 0; i < resData.length; i++) {
            resData[i].newData = moment(resData[i].newData).format("YYYY-MM-DD hh:mm:ss")
          }
          this.toTestData = resData;
          this.total = this.toTestData.length;
        });
      },

      handleSizeChange(val) {
        //console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        //console.log(`当前页: ${val}`);
      },
      rightAppear(index) {
        this.currIndex = index;
        if (index == 1) {

        }
      },
      // 成功后提示信息
      Success(msg) {
        this.$message({
          showClose: true,
          message: msg,
          type: 'success'
        });
      },
      //本来考试主题显示在input的func
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
        if (checked == true) {
          //    console.log(this.form.name+"AAAA");
          //    this.form.name.push(data.label);
        } else {
          for (var i = 0; i < this.form.name.length; i++) {
            if (this.form.name[i] == data.label) {
              //    core.remove(this.form.name, i);
            }
          }
        }
      },
      //考试主题显示在input的func
      getCheckedNodes() {
        this.form.name = [];
        this.form.nameId = [];
        console.log(this.$refs.tree.getCheckedNodes());
        var arr = this.$refs.tree.getCheckedNodes();
        for (var i = 0; i < arr.length; i++) {
          console.log(arr[i].label);
          this.form.name.push(arr[i].label);
          this.form.nameId.push(arr[i].courseId);
          console.log(arr[i].courseId);
          console.log(this.form.nameId);
        }
      },
      handleClick(data) {
      },

      isMin() {
        if (this.form.timeHour == "zero") {
          this.formDisabled = !this.formDisabled;
        }
      },

      //创建考试方法
      onSubmit() {
        //console.log()
        this.form.date1 = core.formatDate("yyyy-MM-dd", new Date(this.form.date1));
        this.form.date2 = core.formatDate("yyyy-MM-dd", new Date(this.form.date2));
        this.form.date3 = core.formatDate("hh:mm:ss", new Date(this.form.date3));
        this.form.date4 = core.formatDate("hh:mm:ss", new Date(this.form.date4));
        //console.log(this.form.date3);
        axios({
          method: 'get',
          url: "http://" + this.url + ":8000/readTestQuestion/addTestQuestion",
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
            num: this.form.num,
            timeHour: this.form.timeHour,
            timeMin: this.form.timeMin,
            major: this.form.major,
            classGrade: this.form.classGrade,
            newData: this.form.newData,
          }
        }).then((res) => {
          this.toTestDataReq();
          this.Success('考试创建成功');
          //console.log(res.data);
          this.toTestData = res.data;

          }
        );
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.onSubmit();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },

      //修改按钮
      handleDelete(index, row) {
        //console.log(row.id);
        axios({
          method: 'get',
          url: "http://" + this.url + ":8000/readTestQuestion/dellNewTestQ",
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
            this.total = this.toTestData.length;
            this.Success('删除成功');
          } else if (res.data.code == 1) {
            this.Success('删除成功');
          }

        });
      },

      //查看成绩请求
      scoreManData(index, row) {
        this.dialogTableVisible = true;
        console.log(row);
        axios.get("http://" + this.url + ":8000/readTestQuestion/scoreManData",{
          params:{
            user:this.user,
            classGrade: this.classGrade,
            major: this.major
          }
        }).then((res)=>{
          console.log(res.data);
          //    console.log((res.data[0].children));
        }).catch(function(error){
          console.log("error init." + error)
        });
      },
    },

    mounted() {

      //请求待考试数据
      axios.get("http://" + this.url + ":8000/readTestQuestion/toTestData", {
        params: {
          user: this.user,
        }
      }).then((res) => {
        //console.log(res.data);
        let resData = res.data;
        for (let i = 0; i < resData.length; i++) {
          resData[i].newData = moment(resData[i].newData).format("YYYY-MM-DD hh:mm:ss")
        }
        this.toTestData = resData;
        this.total = this.toTestData.length;
      });

      //请求历史考试数据
      axios.get("http://" + this.url + ":8000/readTestQuestion/historyTestData", {
        params: {
          user: this.user,
        }
      }).then((res) => {
        //console.log(res.data);
        let resData = res.data;
        for (let i = 0; i < resData.length; i++) {
          resData[i].newData = moment(resData[i].newData).format("YYYY-MM-DD hh:mm:ss")
        }
        this.historyTestData = resData;
        this.total = this.historyTestData.length;
      });

      //请求data数据
      axios.get("http://" + this.url + ":8000/readJson/bannerLeftData",{
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

    components: {Modal, navUser, footFooter}

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

  .teach_Test .question {
    min-width: 700px;
    width: 1200px;
    height: 700px;
    margin: 0 auto;
    margin-top: 40px;
    border: 1px solid #6a1518;
    display: flex;
  }

  .teach_Test .leftBox {
    width: 12.5%;
    height: 100%;
  }

  .teach_Test .leftBox > p {
    font-size: 20px;
    margin-top: 110px;
  }

  .teach_Test .leftBox .leftItem {
    margin-top: 57px;
  }

  .teach_Test .leftLi {
    line-height: 56px;
    background: #2b333b;
    margin-top: 10px;
    font-weight: bolder;
    font-size: 20px;
    cursor: pointer;
    color: #fff;
  }

  .teach_Test .active {
    color: #f00;
  }

  .teach_Test .rightBox {
    width: 87.5%;
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

  .teach_Test .elinput {
    width: 502px;
    height: 38px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow: auto;
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

  .buttons .el-button {
    width: 100%;
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

  .teach_Test .testOnline {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    top: 0;
    left: 0;
  }

  .teach_Test .titleB {
    width: 100%;
    height: 15%;
    border-bottom: 1px solid #6a1518;
    text-align: left;
    font-weight: bolder;
    font-size: 20px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
  }

  .teach_Test .contentBox {
    width: 100%;
    height: 79%;
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
