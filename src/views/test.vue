<template>
<div class="test_T">
    <div class="question" id="content">
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
                <div class="title">
                    <div>
                        <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
                    </div>
                </div>
                <div class="content">
                    <div class="data">
                        <p class="data-p">
                            <span class="data-p-title">考试题目:</span>
                            <span class="data-p-desc">{{$route.params.title}}</span>
                        </p>
                        <p class="data-p">
                            <span class="data-p-title">考试时间:</span>
                            <span class="data-p-desc">{{currentdate}}——{{currentdate}}</span>
                        </p>
                        <p class="data-p">
                            <span class="data-p-title">考试时长:</span>
                            <span class="data-p-desc">120分钟</span>
                        </p>
                        <p class="data-p">
                            <span class="data-p-title">考题数目:</span>
                            <span class="data-p-desc">{{length - isCheckNum}}</span>
                        </p>
                        <p class="data-p">
                            <span class="data-p-title">考试总分:</span>
                            <span class="data-p-desc">100</span>
                        </p>
                        <p>
                            <span class="data-p-title">考试说明:</span>
                            <p>  1. 考生考前15分钟到达考场，由监考人员核验考生准考证、有效身份证件。</p>
                                                  <p>   2. 考生只准携带必要的考试文具（如钢笔，圆珠笔等）入场，不得携带任何书籍资料、通讯设备、数据存储设备、智能电子设备等辅助工具及其它未经允许的物品。</p>
                                                  <p>   3. 考生请核验屏幕上显示的姓名、如有不符，请重新登录</p>
                                                  <p>   4. 在自己核验无误后，等待监考人员统一指令开始进行正式考试。</p>
                                                  <p>   5. 考试开始————分钟后，迟到考生不得进入考场。</p>
                                                  <p>   6. 考试时间由系统自动控制，计时结束后系统将自动退出作答界面。</p>
                                                  <p>   7. 考生在考场内应保持安静，严格遵守考场纪律，对于违反考场规定、不服从监考人员管理和作弊者将按按规定给予处罚。</p>
                                                  <p>   8. 考试过程中，如出现死机或系统错误等，应立刻停止操作，举手与监考人员联系。</p>
                                                  <p>   9. 考生点击交卷后，举手与监考人员联系，等监考人员确认考生交卷正常后，方可离开。</p>
                                                  <p>   10. 考生离开考场后，不准在考场附近逗留和交谈。</p>
                                                  <p>   11. 考生应自觉服从监考人员管理，不得以任何理由防碍监考人员正常工作。</p>
                        </p>
                    </div>
                    <div class="sureBtn">
                        <el-checkbox v-model="Iagree">我已阅读以上内容，点击进入考试开始倒计时</el-checkbox>
                        <el-button type="danger" :disabled="!Iagree" plain @click='add();getTest($route.params.testId);sendInfor()'>
                            <p>进入考试</p>
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="userMessage" v-show="currIndex === 1">
                <div class="title">
                    <div>
                        <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
                    </div>
                </div>
                <el-tabs type="border-card">
                    <el-tab-pane label="待考试">待考试</el-tab-pane>
                    <el-tab-pane label="历史考试">
                        <ul class="testLine">
                            <li class="testNumber">NO.</li>
                            <li class="testTime">时间</li>
                            <li class="testTitle">项目</li>
                            <li class="testState">状态</li>
                            <li class="testGrade">分数</li>
                        </ul>
                        <ul class="testLine" v-for="(item,index) in userMessageData.testQuestion">
                        <ul v-for="(item4,index4) in userMessageData.testQuestionInfo" v-if="index4 == index">
                            <li class="testNumber">{{index + 1}}</li>
                            <li class="testTime">{{item4.startTime}}</li>
                            <li class="testTitle">
                                <a id="show-modal" @click="showModal=true">
                                    <p @click="myNum(index)">{{item.currTestNum}}</p>
                                </a>
                                <modal v-if="showModal" @close="showModal = false">
                                    <h3 slot="header">custom header</h3>
                                    <div slot="body">
                                        <div v-for="(item2,index2) in userMessageData.testQuestion[myNumber].question">
                                            <span class="desctitle">
                                                {{item2.num}}.{{item2.desc}}
                                            </span>
                                            <ul class="ans">
                                                <li>
                                                    <label for="11" v-if="item2.options[0]">
                                                        <input id="11" :type="item2.type" value="A" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                            {{item2.options[0]}}
                                                    </label>
                                                    <label for="22" v-if="item2.options[1]">
                                                        <input id="22" :type="item2.type" value="B" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                            {{item2.options[1]}}
                                                    </label>
                                                    <label for="33" v-if="item2.options[2]">
                                                        <input id="33" :type="item2.type" value="C" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                            {{item2.options[2]}}
                                                    </label>
                                                    <label for="44" v-if="item2.options[3]">
                                                        <input id="44" :type="item2.type" value="D" :name="item2.name" v-model="userMessageData.testQuestionInfo[myNumber].currAnswer[index2]">
                                                            {{item2.options[3]}}
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </modal>
                            </li>
                            <li class="testState">已结束</li>
                            <li class="testGrade">{{item4.sorce}}</li>
                            <li class="errAnalysis">
                                <a id="show-modal1" @click="showModal1=true">
                                    <p @click="myNum(index)">错题分析</p>
                                </a>
                                <modal v-if="showModal1" @close="showModal1 = false">
                                    <h3 slot="header">custom2333 header</h3>
                                    <div slot="body">
                                        <div v-for="(item5,index5) in userMessageData.testQuestionInfo[myNumber].error">
                                        <div v-for="(item6,index6) in userMessageData.testQuestion[myNumber].question" v-if="index6 == 0">
                                            <span class="desctitle">
                                                <img src="../assets/imgs/err.jpg">
                                                {{item5}}.{{userMessageData.testQuestion[myNumber].question[item5 - 1].desc}}
                                            </span>
                                            <ul class="ans">
                                                <li>
                                                    {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[0]}}
                                                    {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[1]}}
                                                    {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[2]}}
                                                    {{userMessageData.testQuestion[myNumber].question[item5 - 1].options[3]}}
                                                </li>
                                            </ul>
                                            <span>
                                                正确答案：{{userMessageData.testQuestion[myNumber].question[item5 - 1].answer}}
                                            </span>
                                        </div>
                                        </div>
                                    </div>
                                </modal>
                            </li>
                            </ul>
                        </ul>
                    </el-tab-pane>
                    <el-tab-pane label="正在考试">正在考试</el-tab-pane>
                </el-tabs>
            </div>
            <div class="exerciseOnline" v-show="currIndex === 2">
                <div class="title">
                    <div>
                        <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
                    </div>
                </div>
                <div class="test-exercise">
                    <el-form class="test-exercise-form" ref="stuform" :model="stuform" status-icon :rules="rules" label-width="80px">
                        <el-form-item label="练习内容" prop="radio">
                            <el-radio-group v-model="stuform.radio">
                                <el-radio label="新能源汽车"></el-radio>
                                <el-radio label="汽车发动机"></el-radio>
                                <el-radio label="汽车底盘"></el-radio>
                                <el-radio label="汽车电气"></el-radio>
                                <el-radio label="汽车变速器"></el-radio>
                            </el-radio-group>
                        </el-form-item>

                        <el-form-item label="考题数目" prop="num" required>
                            <el-input v-model.number="stuform.num" placeholder="请输入考试题数(0 —— 1000)"></el-input>
                        </el-form-item>

                        <el-form-item label="考试时长">
                            <el-col :span="8">
                                <el-form-item prop="timeHour">
                                    <el-select v-model="stuform.timeHour" placeholder="请选择小时">
                                        <el-option label="0" value="zero"></el-option>
                                        <el-option label="1" value="one"></el-option>
                                        <el-option label="2" value="twe"></el-option>
                                        <el-option label="3" value="three"></el-option>
                                    </el-select>
                                </el-form-item>    
                            </el-col>
                            <el-col class="line" :span="3">小时</el-col>
                            <el-col :span="8">
                                <el-form-item>
                                    <el-select v-model="stuform.timeMin" placeholder="请选择分钟" @visible-change="isMin">
                                        <el-option label="0" :disabled="formDisabled" value="zero"></el-option>
                                        <el-option label="10" value="ten"></el-option>
                                        <el-option label="20" value="twenty"></el-option>
                                        <el-option label="30" value="thirty"></el-option>
                                        <el-option label="40" value="forty"></el-option>
                                        <el-option label="50" value="fifty"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col class="line" :span="4">分钟</el-col>
                        </el-form-item>

                        <el-button type="primary" @click="submitForm('stuform')">开始练习</el-button>
                        <el-button type="default" @click="resetForm('stuForm')" value="Reset">重置</el-button>
                    </el-form>
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
import footFooter from '@/components/common/footFooter'
import Modal from '@/components/testCenter/modal';
import navUser from '@/components/common/navUser';


export default {
  name: 'test',
  data () {
    var checkNum = (rule, value, callback) => {
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
        leftBox:[
            {li:'在线考试'},
            {li:'考试管理'},
            {li:'在线练习'}
        ],
        stuform:{
            radio:'',
            timeHour:2,
            timeMin:'',
            num:''
        },
        rules: {
            radio: [
                { required: true, message: '请选择练习的内容', trigger: 'change' }
            ],
            timeHour: [
                { required: true, message: '请选择考试小时', trigger: 'change' },
            ],
            num: [
              { validator: checkNum, trigger: 'blur' }
            ]
        },
        textQuestionData:'',
        minutes:120,
        seconds:0,
        dispear:true,
        answer:true,
        myAns:'',
        myNumber:'',
        questionIndex:'',
        errorIndex:[],
        sorce:0,
        error:[],
        setRed:false,
        submits:false,
        nowTime:'',
        currentdate:'',
        hours:'',
        minute:'',
        second:'',
        currIndex:0,
        user:this.$store.state.username,
        time:0,
        isCheck:'',
        isCheckNum:0,
        isCheckArr:[],
        length:20,
        classItem:{},
        QidArr:[],
        null:[],
        userMessageData:'',
        picked:[],
        Display:false,
        lengthData:'',
        url:document.domain,
        showModal:false,
        showModal1:false,
        currTestInfor:[],
        currTestRes:[],
        currTestId:'',
        interval:{},
        TestNum:0,
        Iagree:'',
        formDisabled:false

    }
  },
  created(){
 //   document.onkeydown = function(e){
      //  if(window.event.keyCode === 27){
      //      alert("...")
     //   }
 //   };

    window.onkeydown = function(){
        if(checkFull()){
            if(window.event.keyCode === 27){
              alert("...")
              event.preventDefault();
          }
        }
    }

        function checkFull(){
        var isFull =  document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled;

        //to fix : false || undefined == undefined
        if(isFull === undefined) isFull = false;
        return isFull;
        }

  },
  mounted(){
    var allTestNum = this.$store.state.allTestNum ;
    var url = document.domain;

      axios.get("http://" + url + ":8000/readTestQuestion/all",{
            params:{
                user:this.user,
                currTestNum:allTestNum
            }
        }).then((res)=>{
            if(res.data.testQuestion.state == 1){
                this.textQuestionData = res.data.testQuestion;
            }
            console.log(res.data);
            this.TestNum = res.data.testLength;
            console.log(this.TestNum+"LLL")
        }).catch(function(error){
            console.log("error init." + error)
        });

    axios.get("http://" + url + ":8000/readTestQuestionInfo/all",{
        params:{
          user:this.user,
          currTestId:this.$route.params.testId,
          currTestNum:allTestNum
        }
      }).then((res)=>{
          console.log(res.data)
          console.log(res.data.currState)
          this.$store.commit('vuexState',res.data.state);
            if(res.data.state == 1){
               this.picked = res.data.currAnswer;
               this.isCheckArr = res.data.currState;

                console.log("bbbbccccc")
                window.addEventListener("popstate",this.myFunction);

        //        window.onpopstate=function(e){
        //                var e = window.event||e;
        //                e.returnValue=("确定离开当前页面吗？");
        //        }    
        //        window.onbeforeunload=function(e){
        //                var e = window.event||e;
        //               e.returnValue=("确定离开当前页面吗？");
        //        }

               this.hours = res.data.startTimeHours;
               this.minute = res.data.startTimeMinutes;
               this.second = res.data.startTimeSeconds;
               this.minutes = res.data.testTimeMinutes;
               this.seconds = res.data.testTimeSeconds;
               this.isCheckNum = res.data.isCheckNum;
               console.log(this.isCheckNum+"qqqqqqq");
               console.log(this.isCheckArr+"wwwww");
            }
      }).catch(function(error){
        console.log("错误")
      });


    },
  watch: {
        second:{
            handler(newVal){
                this.num(newVal)
            }
        },
        minute:{
            handler(newVal){
                this.num(newVal)
            }
        }
    },
//  computed:{
//      pickedArr(){
//          return this.$store.state.pickedArr;
//      },
//      getTextQuestionData(){
//          return this.$store.state.getTextQuestionData;
//      }
//    },
  methods:{
            sendInfor(){
            //    this.$router.push('/realyTest');
                const {href} = this.$router.resolve({
                    name: 'realyTest'
                })
                window.open(href,'_blank',"channelmode=yes,toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, copyhistory=yes, width=3000, height=2000")
                var elem = document.getElementById("content");   
                console.log(elem);   
            //    this.requestFullScreen(elem);
            },
            requestFullScreen(element){
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
            isMin(){
                if(this.stuform.timeHour == "zero"){
                    this.formDisabled = !this.formDisabled;
                }
            },
            submit:function () {
                setTimeout(function(){
                    window.clearInterval(this.interval);
                    axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/readTestQuestionInfo/submitQuestionInfo",
                        params:{
                            state:2,
                            user:this.user,
                            currTestId:this.$route.params.testId,
                            testQuestion:this.$store.state.allTestNum,
                            startTime:this.currentdate,
                            currAnswer:this.picked,
                            currState:this.isCheckArr,
                            error:this.error,
                            sorce:this.sorce,
                            startTimeHours:this.hours,
                            startTimeMinutes:this.minute,
                            startTimeSeconds:this.second,
                            testTimeMinutes:this.minutes,
                            testTimeSeconds:this.seconds,
                            isCheckNum:this.isCheckNum
                        }
                    }).then(
                        function (res) {
                        console.log(res.data.code)
                        }
                    );
                }.bind(this),0.1);
                axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/readTestQuestion/submitQuestionInfo",
                        params:{
                            state:2,
                            testQuestion:this.$store.state.allTestNum
                        }
                    }).then((res)=>{
                            this.$store.commit('vuexState',res.data.state);
                        });
                this.sorce=0;
                this.error = [];
                console.log(this.QidArr.length+"===this.QidArr.length");
                for(var i = 0;i < this.QidArr.length;i++){
                    if(this.QidArr[i] != null && this. QidArr[i] != ''){
                        console.log(this.QidArr[i]-1+"==========this.QidArr[i]-1");
                        console.log("asd"+this.picked[i])
                        console.log(this.textQuestionData)
                        if(this.textQuestionData.question[this.QidArr[i]-1].answer == this.picked[i]){

                            this.sorce += 5;
                        }else{
                            console.log(this.picked[i])
                            this.error.push(i+1);
                        }
                    }else{
                        console.log(i+"123456");
                        this.null.push(i+1);
                    }
                }
                alert(this.sorce + "==" + this.error + "==" + this.null);
            //    this.$router.go(0);
            },
            num:function (n) {
                return n<10 ? "0" + n : "" + n
            },
            add:function () {
                var _this = this;
                var time = window.setInterval(function () {

                    if (_this.seconds == 0 && _this.minutes != 0) {
                        _this.seconds = 59;
                        _this.minutes -= 1;
                    }else if(_this.minutes == 0 && _this.seconds == 0){
                        _this.seconds = 0;
                        window.clearInterval(time);
                        console.log("111");
                    }else{
                        _this.seconds -= 1
                    };
                    if(_this.minutes == 0 && _this.seconds == 0){
                        window.clearInterval(time);
                        alert("时间到，已帮您提交");
                        _this.submit();
                    };
                    if(_this.seconds < 10){
                    _this.seconds = "0" + _this.seconds;
                    }

                 },1000);

                 _this.dispear = !_this.dispear;
                 _this.nowTime = new Date();
                 //给考试管理存时间
                 var seperator1 = '-';
                 var seperator2 = ':';
                 var month = _this.nowTime.getMonth() + 1;
                 var strDate = _this.nowTime.getDate();

                 //给在线考试存时间
                 _this.hours = _this.nowTime.getHours();
                 _this.minute = _this.nowTime.getMinutes();
                 if(_this.minute >= 0 && _this.minute <= 9){
                     _this.minute = "0" + _this.minute;
                 }
                 _this.second = _this.nowTime.getSeconds();
                 if(_this.second >= 0 && _this.second <= 9){
                     _this.second = "0" + _this.second;
                 }

                 if (month >= 0 && month <= 9) {
                     month = '0' + month
                 }
                 if (strDate >= 0 && strDate <= 9) {
                     strDate = '0' + strDate
                 }
                 _this.currentdate = _this.nowTime.getFullYear() + seperator1 + month + seperator1 + strDate
                 + ' ' + _this.nowTime.getHours() + seperator2 + _this.minute + seperator2 + _this.second;

            },
            getTest(e){
                axios.get("http://" + this.url + ":8000/readTestQuestion/clickQuery",{
                    params:{
                        //state默认为0未开始考试，开始后为1
                        user:this.user,
                        state:1,
                    //    testId: e,
                    //    num: 20,
                    //    currTestNum: 1 + this.$store.state.allTestNum,
                    //    startTime:this.currentdate,
                    //    startTimeHours:this.hours,
                    //    startTimeMinutes:this.minute,
                    //    startTimeSeconds:this.second,
                    //    testTimeMinutes:this.minutes,
                    //   testTimeSeconds:this.seconds
                    }
                }).then((res)=>{
                    if(res.data.status !== 0) {
                        return;
                    }
                    console.log(res.data.currTestNum+"currTestNum");
                    this.$store.commit('allTestNum',res.data.currTestNum);
                    this.$store.commit('vuexState',res.data.state);
                    this.textQuestionData = res.data;
                    this.currTestId = e;
                }).catch(function(error){
                    console.log("error init." + error)
                });

                
            },
            myAnswer:function(id,index){
                this.lengthData = this.textQuestionData.question.length;
                this.QidArr[index] = id;
                console.log(this.QidArr);
                var a = 0;
                for(var i = 0;i < this.QidArr.length;i++){
                    if(this.QidArr[i] != null){
                        a+=1;
                        this.isCheckNum = a ;
                    }
                }
                this.$set(this.isCheckArr,index,true);

                axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/readTestQuestionInfo/update",
                        params:{
                            state:1,
                            user:this.user,
                            currTestId:this.$route.params.testId,
                            testQuestion:this.$store.state.allTestNum,
                            startTime:this.currentdate,
                            currAnswer:this.picked,
                            currState:this.isCheckArr,
                            error:this.error,
                            sorce:this.sorce,
                            startTimeHours:this.hours,
                            startTimeMinutes:this.minute,
                            startTimeSeconds:this.second,
                            testTimeMinutes:this.minutes,
                            testTimeSeconds:this.seconds,
                            isCheckNum:this.isCheckNum
                        }
                    }).then((res)=>{
                            
                        })
            },
            myNum:function(index2){
                this.myNumber = index2;
                console.log(this.myNumber)
            },
            tip(index){
                this.$set(this.classItem,index,true)
            },
            rightAppear (index) {
                this.currIndex = index;
                if(index == 1){
                    this.testManagen();
                }
            },
            DisplayFun(){
                this.Display = true;
            },
            getDisplayFun(){
                this.Display = false;
            },
            myFunction(event){
                var con = confirm("考试未完成，点击确定将帮您提交");
                if(con){
                    this.submit();
                }else{
                    console.log("mamamama")
                }
            },
            testManagen(){
                axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/testManagement/testManagement",
                        params:{
                            user:this.user
                        }
                        }).then((res)=>{
                            this.userMessageData = res.data;
                            console.log(res.data)
                        })
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                if (valid) {
                    axios({
                        method:'get',
                        url:"http://" + this.url + ":8000/readTestQuestionInfo/submitQuestionInfo",
                        params:{
                            user:this.user,
                            testData:this.stuform
                        }
                    }).then(
                        function (res) {
                        console.log(res.data.code)
                        }
                    );
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
            },
            resetForm(formName) {
                this.stuform = {};
                this.stuform.timeHour = 2;
            }
    },
  components:{Modal,navUser,footFooter}

}
</script>

<style scoped>
*{
    padding:0;
}
ul li{
    list-style: none;
}
a{
    color: inherit;
    cursor: pointer;
}
p{
    margin:0;
}
.test_T .question{
    min-width:1200px;
    min-width:700px;
    width:1200px;
    height:700px;
    margin:0 auto;
    margin-top: 40px;
    border:1px solid #6a1518;
    display:flex;
}
.test_T .leftBox{
    width:12.5%;
    height:100%;
}
.test_T .leftBox > p{
    font-size:20px;
    margin-top:110px;
}
.test_T .leftBox .leftItem{
    margin-top:57px;
}
.test_T .leftLi{
    line-height:56px;
    background:#2b333b;
    margin-top:10px;
    font-weight:bolder;
    font-size:20px;
    cursor:pointer;
    color:#fff;
}
.test_T .active{
    color:#f00;
}
.test_T .rightBox{
    width:87.5%;
    height:100%;
    position:relative;
    border-left:1px solid #6a1518;
}
.test_T .testOnline{
    width:100%;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
}
.test_T .title{
    width:100%;
    height:15%;
    text-align:left;
    font-weight: bolder;
    font-size:20px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
    border-bottom:1px solid #6a1518;
}
.test_T .inforItem{
    margin-left:8px;
    display:flex;
}
.test_T .infor{
    margin-right:14px;
    margin-top:20px;
}
.test_T .infor p{
    font-size:17px;
    margin-top:-2px;
}
.test_T .notSt{
    position:relative;
}
.test_T .notStart{
    display:block;
    width:70px;
    background:#fff;
    position:absolute;
    top:21px;
    left:0;
}
.test_T .content{
    width:100%;
    height:85%;
}
.test_T .data{
    width:100%;
    height:91%;
    overflow:hidden;
    text-align:left;
    padding:30px 40px 4px 40px;
    box-sizing:border-box;
    overflow:auto;
}
.test_T .data-p{
    height:9%;
    line-height:9%;
}
.test_T .data-p-title{
    margin-right:50px;
    font-weight:bolder;
}
.test_T .data-p-desc{
    font-size:15px;
}
.test_T .sureBtn{
    width:100%;
    height:9%;
    border-top:1px solid #6a1518;
    text-align:right;
}
.test_T .dispear{
    display:none;
}
.test_T .tip{
    background:yellow;
    height:18px;
}
.test_T .number{
    width:29%;
    height:100%;
    border:1px solid #000;
    position:relative;
}
.test_T .number li{
    display:inline-block;
    margin-left:4px;
}
.test_T .number a{
    display:block;
    width:50px;
    height:50px;
    border:1px solid #000;
    margin-top:16%;
    padding-top:36%;
    box-sizing:border-box;
}
.test_T .isCheck{
    background:#953033;
    color:#fff;
}
.test_T .status{
    display:flex;
    margin-top:30px;
}
.test_T .do{
    margin-left:30px;
}
.test_T .doP{
    border:1px solid #000;
}
.test_T .desc{
    margin-top:15px;
}
.test_T .desctitle{
    font-weight:bolder;
}
.test_T .err{
    color:#e4393c;
}
.test_T .ans{
    display:flex;
    margin-top:5px;
    margin-bottom:5px;
}
.test_T .answer{
    display:none;
}
.test_T .ans li{
    margin-left:27px;
}
.test_T .ans li :hover{
    cursor:pointer;
}
.test_T .btn{
    width:85%;
    height: 78px;
    margin-top:10px;
    background-color:#e4393c;
    padding:8px;
    position:absolute;
    bottom:48px;
    left:18px;
    cursor:pointer;
}
.test_T .userMessage{
    width:100%;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
    box-sizing:border-box;
    text-align:left;
    overflow:auto;
}
.test_T .testLine{
    background:#ddd;
    padding-left:5px;
    margin-bottom:10px;
}
.test_T .testLine li{
    display:inline-block;
    width:143px;
    margin-right:17px;
}
.test_T .testLine .testTitle a{
    text-decoration:underline;
}
.test_T .testLine .testTitle a:hover{
    color:#f00;
}
.test_T .errAnalysis a{
    text-decoration:underline;
}
.test_T .errAnalysis a:hover{
    color:#f00;
}
.test_T .ans{
    display:flex;
    margin-top:5px;
    margin-bottom:5px;
}
.test_T .ans li{
    margin-left:27px;
    width: 100%;
}
.test_T .ans li :hover{
    cursor:pointer;
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
    text-align:center;
}
.test_T .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
.el-button--danger.is-plain{
    padding: 15px 40px 15px 40px;
}
.test_T .el-button--danger.is-plain p{
    font-size:20px;
}
.test_T .exerciseOnline{
    width:100%;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
    box-sizing:border-box;
    text-align:left;
    overflow:auto;
}
.test_T .test-exercise{
    width:100%;
    height:85%;
    padding: 30px 40px 4px 40px;
    box-sizing:border-box;
}
.test_T .el-select-dropdown__list .el-select-dropdown__item{
    padding: 0 20px !important;
}
.test_T .el-button--primary{
    padding:10px !important;
}
.test_T .el-button--default{
    padding:10px !important;
}
</style>