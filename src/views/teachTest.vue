<template>
<div>
    <div class="question">
        <div class="leftBox">
            <p>{{user}}</p>
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
                    {{form.date1}}...{{form.date2}}...{{form.date3}}...{{form.date4}}
                </div>
                <div class="contentBox">
                    <el-tabs type="border-card" style="float:none;">

                        <el-tab-pane label="创建考试">
                            <div>
                                <el-form ref="form" :model="form" status-icon :rules="rules" label-width="80px">
                                    
                                    <el-form-item label="考试题目" prop="theme">
                                        <el-input class="numberClass" placeholder="请创建考试题目" v-model.theme="form.theme"></el-input>
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
                                                <el-date-picker type="date" placeholder="选择开始日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                            </el-form-item>
                                        </el-col>
                                        <el-col class="line" :span="2">-</el-col>
                                        <el-col :span="11">
                                            <el-form-item prop="date3">
                                                <el-time-picker type="fixed-time" placeholder="选择开始时间" v-model="form.date3" style="width: 100%;"></el-time-picker>
                                            </el-form-item>
                                        </el-col>
                                    </el-form-item>

                                    <el-form-item label="结束时间" required>
                                        <el-col :span="11">
                                            <el-form-item prop="date2">
                                                <el-date-picker type="date" placeholder="选择结束日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                                            </el-form-item>    
                                        </el-col>
                                        <el-col class="line" :span="2">-</el-col>
                                        <el-col :span="11">
                                            <el-form-item prop="date4">
                                                <el-time-picker type="fixed-time" placeholder="选择结束时间" v-model="form.date4" style="width: 100%;"></el-time-picker>
                                            </el-form-item>    
                                        </el-col>
                                    </el-form-item>

                                    <el-form-item label="考试时长">
                                        <el-col :span="8">
                                            <el-form-item prop="timeHour">
                                                <el-select v-model="form.timeHour" placeholder="请选择小时">
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
                                                <el-select v-model="form.timeMin" placeholder="请选择分钟" @visible-change="isMin">
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

                                    <el-form-item label="考试类型" prop="region">
                                        <el-select v-model="form.region" placeholder="请选择考试类型">
                                            <el-option label="期末考试" value="Etest"></el-option>
                                            <el-option label="期中考试" value="Mtest"></el-option>
                                            <el-option label="随堂练习" value="Ntest"></el-option>
                                        </el-select>
                                    </el-form-item>

                                    <el-form-item label="考题数目" prop="num" required>
                                        <el-input v-model.number="form.num" placeholder="请输入考试题数(0 —— 1000)"></el-input>
                                    </el-form-item>

                                    <p><el-button type="primary" @click="submitForm('form')">立即创建</el-button></p>
                                </el-form>
                            </div>
                        </el-tab-pane>

                        <el-tab-pane label="待考试">
                            <el-table :data="tableData" style="width: 100%">

                                <el-table-column label="考试题目" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="考试时间" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="考试类型" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="考试数目" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="创建人" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="考试时间" width="150">
                                <template slot-scope="scope">
                                    <el-popover trigger="hover" placement="top">
                                    <p>姓名: {{ scope.row.name }}</p>
                                    <p>住址: {{ scope.row.address }}</p>
                                    <div slot="reference" class="name-wrapper">
                                        <el-tag size="medium">{{ scope.row.name }}</el-tag>
                                    </div>
                                    </el-popover>
                                </template>
                                </el-table-column>

                                <el-table-column label="操作">
                                <template slot-scope="scope">
                                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                                        修改
                                    </el-button>
                                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
                                        删除
                                    </el-button>
                                </template>
                                </el-table-column>
                            </el-table>

                        </el-tab-pane>

                        <el-tab-pane label="历史考试">
                            <el-table :data="tableData" style="width: 100%">

                                <el-table-column label="考试题目" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="考试时间" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="考试类型" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="考试数目" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>

                                <el-table-column label="创建人" width="150">
                                <template slot-scope="scope">
                                    <i class="el-icon-time"></i>
                                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                                </template>
                                </el-table-column>
                            </el-table>

                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
            <div class="userMessage" v-show="currIndex === 1">
                <div class="titleB">
                    <div>
                        <img class="brand" alt="Brand" src="../assets/imgs/zb_logo.png">
                    </div>
                </div>
                <el-table :data="tableData" style="width: 100%">

                    <el-table-column label="NO." width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                    </el-table-column>

                    <el-table-column label="考试时间" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                    </el-table-column>

                    <el-table-column label="考试题目" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                    </el-table-column>

                    <el-table-column label="考试类型" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                    </el-table-column>

                    <el-table-column label="查看成绩" width="150">
                    <template slot-scope="scope">
                        <i class="el-icon-time"></i>
                        <span style="margin-left: 10px">{{ scope.row.date }}</span>
                    </template>
                    </el-table-column>
                </el-table>
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
import core from '../../server/utils/core.js'

export default {
  name: 'teachTest',
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
        url:document.domain,
        user:this.$store.state.username,
        leftBox:[
            {li:'考试管理'},
            {li:'成绩管理'}
        ],
        currIndex:0,
        user:this.$store.state.username,
        data:[],
        formDisabled:false,
        form: {
            theme:'',
            name: [],
            nameId:[],
            region: '',
            date1: '',
            date2: '',
            date3: '',
            date4: '',
            num:'',
            timeHour:'',
            timeMin:''
        },
        rules: {
            theme: [
                { required: true, message: '请输入考试题目', trigger: 'blur' },
            ],
            name: [
                { required: true, message: '请输入考试范围', trigger: 'blur' },
            ],
            region: [
                { required: true, message: '请选择考试类型', trigger: 'change' }
            ],
            date1: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date2: [
                { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
            ],
            date3: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            date4: [
                { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
            ],
            num: [
              { validator: checkNum, trigger: 'blur' }
            ],
            timeHour: [
                { required: true, message: '请选择考试小时', trigger: 'change' },
            ]
        },
        tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }]
    };
  },
  mounted(){

        this.url = document.domain;
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
  methods:{
        rightAppear (index) {
                this.currIndex = index;
                if(index == 1){
                    
                }
        },
        //本来考试主题显示在input的func
        handleCheckChange(data, checked, indeterminate) {
            console.log(data, checked, indeterminate)
            if(checked == true){
            //    console.log(this.form.name+"AAAA");
            //    this.form.name.push(data.label);
            }else{
                for(var i = 0;i < this.form.name.length;i++){
                    if(this.form.name[i] == data.label){
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
            for(var i = 0;i < arr.length;i++){
                console.log(arr[i].label);
                this.form.name.push(arr[i].label);
                this.form.nameId.push(arr[i].courseId);
                console.log(arr[i].courseId);
                console.log(this.form.nameId);
            }
        },
        handleClick(data){
            
        },
        isMin(){
            if(this.form.timeHour == "zero"){
                this.formDisabled = !this.formDisabled;
            }
        },
        onSubmit() {
        //    console.log()
            this.form.date1 = core.formatDate("yyyy-MM-dd",new Date(this.form.date1));
            this.form.date2 = core.formatDate("yyyy-MM-dd",new Date(this.form.date2));
            this.form.date3 = core.formatDate("hh:mm:ss",new Date(this.form.date3));
            this.form.date4 = core.formatDate("hh:mm:ss",new Date(this.form.date4));
            console.log(this.form.date3)
            axios({
                method:'get',
                url:"http://" + this.url + ":8000/readTestQuestionInfo/submitQuestionInfo",
                params:{
                    user:this.user,
                    teachData:this.form
                }
            }).then(
                function (res) {
                console.log(res.data.code)
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
        //编辑按钮
        handleEdit(index, row) {
            console.log(index, row);
        },
        //修改按钮
        handleDelete(index, row) {
            console.log(index, row);
        }
    },
  components:{Modal,footFooter}

}
</script>

<style>
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a{
    color: inherit;
    cursor: pointer;
}
.question{
    min-width:1200px;
    min-width:700px;
    width:1200px;
    height:700px;
    margin:0 auto;
    margin-top: 40px;
    border:1px solid #000;
    display:flex;
}
.leftBox{
    width:150px;
    height:100%;
    border:1px solid #000;
}
.leftBox > p{
    font-size:20px;
    margin-top:68px;
}
.leftBox .leftItem{
    margin-top:57px;
}
.leftLi{
    line-height:56px;
    background:#2b333b;
    margin-top:10px;
    font-weight:bolder;
    font-size:20px;
    cursor:pointer;
    color:#fff;
}
.active{
    color:#f00;
}
.rightBox{
    width:1050px;
    height:100%;
    position:relative;
}
.el-tabs{
    width:100%;
    height:99%;
    overflow: auto;
}
.fontL{
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
.el-dropdown {
    width: 488px;
    position:relative;
}
.elinput{
    width:502px;
    height:38px;
    border:1px solid #ccc;
    border-radius:4px;
    overflow:auto;
}
.elinput ul li{
    display:inline-block;
}
.numberClass{
    width:488px;
    margin-bottom:22px;
}
.dropdown{
    width:488px;
    height:300px;
    position:absolute;
    left:75px;
    bottom:0;
}
.treeModle{
    width:488px;
    height:250px;
    overflow:auto;
}
.buttons .el-button{
    width:100%;
}
.el-button{
    margin-top:22px;
}
.el-tabs--border-card>.el-tabs__content {
    padding: 25px 75px 25px 25px;
    text-align:left;
}
.el-form-item__content .el-col-2{
    padding-left:0.4%;
    width:1.33%;
}
.el-form-item__content .el-select{
    width:100%;
}
.el-form-item__content .el-select-dropdown{
    min-width:38%;
}
.el-form-item__content .el-input{
    width:100%;
}
.testOnline{
    width:100%;
    height:100%;
    background:#fff;
    position:absolute;
    top:0;
    left:0;
    border:1px solid #000;
}
.titleB{
    width:100%;
    height:150px;
    border:1px solid #000;
    text-align:left;
    font-weight: bolder;
    font-size:20px;
    padding:10px;
    box-sizing:border-box;
    display:flex;
}
.contentBox{
    width:100%;
    height:79%;
    display:flex;
}
.dispear{
    display:none;
}
.userMessage{
    width:1048px;
    height:100%;
    background:#fff;s
    position:absolute;
    top:0;
    left:0;
    box-sizing:border-box;
    text-align:left;
    overflow:auto;
}
</style>
