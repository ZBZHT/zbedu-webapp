<template>
    <div class="pageination_align">
            <div class="pageination" v-if="pageinationTotal">
                <div @click="pageUp(0)" class="pagination_page" :class="startDisabled?'disabled':''">首页</div>
                <div @click="pageUp(1)" class="pagination_page" :class="startDisabled?'disabled':''">上一页</div>

                <div class="pagination_page" :class="item==pageinationCurrentPage?'pagination_page_active':''"
                     v-for="(item,index) in pageinationLength" @click="jump(item)">
                    {{item}}
                </div>
                <div class="point" v-show="nowIndex <= pageinationPage - 6">......</div>
                <div  v-show="nowIndex <= pageinationPage - 5" class="pagination_page" :class="pageinationPage==pageinationCurrentPage?'pagination_page_active':''"
                @click="pageDown(0)">
                    {{pageinationPage}}
                </div>

                <div @click="pageDown(1)" class="pagination_page" :class="endDisabled?'disabled':''">下一页</div>
                <div @click="pageDown(0)" class="pagination_page pagination_page_right" :class="endDisabled?'disabled':''">
                    尾页
                </div>

                <div class="numJump">
                    <p class="numJumpP">跳到第</p>
                    <el-input size="mini" v-model="pageInputValue" @change="pageInput(pageInputValue)"></el-input>
                    <p>页</p>
                </div>
            </div>
    </div>
</template>

<script>
import EventBus from '../../assets/js/EventBus';

    export default {
    name : 'MoPaging',
    //通过props来接受从父组件传递过来的值
    props :['total', 'size', 'page', 'changge', 'isUrl'],
    data () {
        return {
            pageinationTotal: this.total,//总条目数
            pageinationSize: this.size ? this.size : 1,//每页显示条目个数
            pageinationLength: [],
            pageinationCurrentPage: this.page ? this.page : 1,//当前页数默认1
            pageinationPage: 0,//可分页数
            startDisabled: true,//是否可以点击首页上一页
            endDisabled: true,//是否可以点击尾页下一页
            pageChangge: this.changge,//修改方法
            pageIsUrl: this.isUrl ? true : false,//是否开启修改url,
            nowIndex:'',
            pageInputValue:'',
            isMsg:''
        }
    },
     methods: {
        pageInput(val){
            if(val == ''){
                this.pageInputValue = '';
            }else if(val <= 1){
                this.jump(1);
                this.pageInputValue = 1;
            }else if(val >= this.pageinationPage){
                this.jump(this.pageinationPage);
                this.pageInputValue = this.pageinationPage;
            }else{
                this.jump(val);
            }
            
        },
        jump(item) {
            
            this.pageinationCurrentPage = item;
            console.log(this.pageinationCurrentPage)
            this.pagers();
            EventBus.$on('newPageUp', function (msg) {
                this.pageChangge = msg;
                this.isMsg = msg;
            })
            
            EventBus.$on('newpageDown', function (msg) {
                this.pageChangge = msg;
                this.isMsg = msg;
            })
            
            if(this.isMsg != ''){

            }else{
                this.pageChangge(this.pageinationCurrentPage);
                this.nowIndex = item;
                console.log(item)
            }
            
          //  console.log(this.nowIndex)
        },//跳转页码
        pagers() {
            //可分页数
            this.pageinationPage = Math.ceil(this.pageinationTotal / this.pageinationSize);
            //url修改
            if (this.pageIsUrl) {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        page: this.pageinationCurrentPage,
                    }
                });
            }
            //是否可以点击上一页首页
            this.startDisabled = this.pageinationCurrentPage != 1 ? false : true;
            //是否可以点击下一页尾页

            this.endDisabled = this.pageinationCurrentPage != this.pageinationPage ? false : true;
            if (this.pageinationPage == 0) this.endDisabled = true;
            //重置
            this.pageinationLength = [];
            //开始页码1
            let start = this.pageinationCurrentPage - 4 > 1 ? this.pageinationCurrentPage - 4 : 1;
            //当前页码减去开始页码得到差
            let interval = this.pageinationCurrentPage - start;
            //最多9个页码，总页码减去interval 得到end要显示的数量+
            let end = (9 - interval) < this.pageinationPage ? (9 - interval) : this.pageinationPage;
            //最末页码减开始页码小于8
            if ((end - start) != 8) {
                //最末页码加上与不足9页的数量，数量不得大于总页数
                end = end + (8 - (end - start)) < this.pageinationPage ? end + (8 - (end - start)) : this.pageinationPage;
                //最末页码加上但是还不够9页，进行开始页码追加，开始页码不得小于1
                if ((end - start) != 8) {
                    start = (end - 8) > 1 ? (end - 8) : 1;
                }
            }
            for (let i = start; i <= end; i++) {
                this.pageinationLength.push(i);
            }
        },//计算分页显示的数字
        pageUp(state) {
            EventBus.$on('newPageUp', function (msg) {
                this.pageChangge = msg;
            })
            if (this.startDisabled) return;
            if (this.pageinationCurrentPage - 1 != 0 && state == 1) {
                this.jump(this.pageinationCurrentPage - 1);
            } else {
                this.jump(1);
            }
        },//上一页跟首页 state=1是上一页 state=0是首页
        pageDown(state) {
            EventBus.$on('newpageDown', function (msg) {
                this.pageChangge = msg;
            })
            if (this.endDisabled) return;
            if (this.pageinationCurrentPage + 1 != this.pageinationPage && state == 1) {
                this.jump(this.pageinationCurrentPage + 1);
            } else {
                this.jump(this.pageinationPage);
            }
        },// state=1是下一页 state=0是尾页
        pageCurrentChange() {
            this.pageChangge(this.pageinationCurrentPage);
            this.pagers();
        }
    },
    created() {
        this.pageCurrentChange();
    },
    watch: {
        total: function (val, oldVal) {
            this.pageinationTotal = val;
            this.pagers();
        },
        page: function (val, oldVal) {
            this.pageinationCurrentPage = val;
            this.pagers();
        }
    }
}
</script>

<style>
    .pageination_align {
            text-align: center
        }

        .pageination {
            color: #48576a;
            font-size: 12px;
            user-select: none;
            display:flex;
        }

        .pagination_page {
            padding: 0 4px;
            border: 1px solid #d1dbe5;
            background: #fff;
            font-size: 13px;
            min-width: 28px;
            height: 28px;
            line-height: 28px;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            float: left;
        }

        .pagination_page_right {
            border-right: 1px solid #d1dbe5;
        }

        .pagination_page:hover {
            color: #e4393c;
        }

        .disabled {
            color: #e4e4e4 !important;
            background-color: #fff;
            cursor: not-allowed;
        }

        .pagination_page_active {
            border-color: #e4393c;
            background-color: #e4393c;
            color: #fff !important;;
            cursor: default;
        }

        .pageination_align .point{

        }

        .numJump{
            display:flex;
            margin-left:20px;
        }
        
        .numJump .numJumpP{
            width:60px;
        }

        .numJump p{
            margin-top:5px;
        }

        .el-input--mini .el-input__inner{
            width:55px;
        }
</style>