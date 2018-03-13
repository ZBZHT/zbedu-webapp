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
                </div>
                <div class="contentBox">
                    <el-tabs type="border-card" style="float:none;">

                        <el-tab-pane label="创建考试">
                            <div>
                                <label class="fontL">考试范围</label>
                                    <el-dropdown>
                                        <span class="el-dropdown-link">
                                            <el-input v-model="form.name" :disabled="true">
                                            
                                            </el-input>
                                            
                                        </span>
                                        <el-dropdown-menu slot="dropdown" class="dropdown">
                                            <el-tree
                                                :data="data"
                                                show-checkbox
                                                node-key="id"
                                                @check-change="handleCheckChange">
                                            </el-tree>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                
                                <el-form ref="form" :model="form" label-width="80px">
                                    <el-form-item label="开始时间">
                                        <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                                        </el-col>
                                        <el-col class="line" :span="2">-</el-col>
                                        <el-col :span="11">
                                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date3" style="width: 100%;"></el-time-picker>
                                        </el-col>
                                    </el-form-item>

                                    <el-form-item label="结束时间">
                                        <el-col :span="11">
                                        <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
                                        </el-col>
                                        <el-col class="line" :span="2">-</el-col>
                                        <el-col :span="11">
                                        <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date4" style="width: 100%;"></el-time-picker>
                                        </el-col>
                                    </el-form-item>

                                    <el-form-item label="考试类型">
                                        <el-select v-model="form.region" placeholder="请选择考试类型">
                                        <el-option label="期末考试" value="Etest"></el-option>
                                        <el-option label="期中考试" value="Mtest"></el-option>
                                        <el-option label="随堂练习" value="Ntest"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <label class="fontL">考试数目</label>

                                    <el-input class="numberClass" v-model="form.num"></el-input>
                                    <p><el-button type="primary" @click="onSubmit">立即创建</el-button></p>
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

export default {
  name: 'test',
  data () {
    return {
        leftBox:[
            {li:'考试管理'},
            {li:'成绩管理'}
        ],
        currIndex:0,
        user:this.$store.state.username,
        data:[],
        form: {
            name: '',
            region: '',
            date1: '',
            date2: '',
            date3: '',
            date4: '',
            num:'',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
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
    }
  },
  
  mounted(){

        this.url = document.domain;
        axios.get("http://" + this.url + ":8000/readJson/bannerLeftData",{
                params:{
                     user:234
                }
            }).then((res)=>{
                console.log((res.data[0].children));
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
        //考试主题显示在input的func
        handleCheckChange(data) {
            this.form.name=data.label;
            console.log(this.form.name);
        },
        onSubmit() {
            console.log('submit!');
        },
        handleEdit(index, row) {
            console.log(index, row);
        },
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
    margin-left: 12px;
    position:relative;
}
.numberClass{
    width:488px;
    margin-left: 12px;
}
.dropdown{
    width:488px;
    height:300px;
    overflow:auto;
    position:absolute;
    left:75px;
    bottom:0;
}
.el-form-item{
    margin-top:22px;
}
.el-button{
    margin-top:22px;
}
.el-tabs--border-card>.el-tabs__content {
    padding: 25px;
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
