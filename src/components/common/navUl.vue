<template>
    <div class="contentui">
        <el-row :gutter="75">
            <el-col :span="8"  v-for="(item,index) in navData" :key = "index">
                <a @click="fobLink(index)">
                    <div class="grid-content"
                         :style="{ 'background-color':item.background,'background-repeat':'no-repeat','background-size':'cover'}"
                         >
                        <p class="p">{{item.label}}</p>
                        <div class="introduce">
                            <p>{{item.introduce}}</p>
                        </div>
                    </div>
                </a>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'navUl',
  props:['navData'],
  data () {
    return {

    }
  },
  computed:{

  },
  mounted(){
    var _this = this;
    window.onresize = function(){
        _this.$router.go(0);
    }

  },
  methods: {
      fobLink(index){
        if(index == 0){
            this.$router.push('/courseIndex');
        }else if(index == 1){
            this.$router.push('/exerciseCenter');
        }else if(index == 2 && this.$store.state.userType == "admin"){
            this.$router.push('/teachTest');
        }else if(index == 2 && this.$store.state.userType == ""){
            this.$router.push('/test');
        }else if(index == 2 && this.$store.state.userType == "S"){
            this.$router.push('/test');
        }else if(index == 2 && this.$store.state.userType == "E"){
            this.$router.push('/teachTest');
        }else if(index == 2 && this.$store.state.userType == "T"){
            this.$router.push('/teachTest');
        }else if(index == 3){
            this.$router.push('/resourceCenter');
        }else if(index == 4){
            this.$router.push('/appraiseCenter');
        }
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a {
    color: #fff;
    cursor: pointer;
    font-weight:bolder;
    text-decoration: none;
}
a:hover{
    text-decoration: none;
    color:#000;
}
.active{
    color:#f00;
}
@media screen and (min-width:1800px){
    .contentui{
        width:100%;
        padding: 22% 5% 5% 5%;
        box-sizing:border-box;
    }
    .contentui .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .contentui .el-col {
        border-radius: 4px;
    }
    .contentui .introduce{
        width:100%;
        font-size:12px;
        font-weight:normal;
        position:absolute;
        left:0;
        bottom:0;
        background:rgba(200,200,200,0.5);
        transition:height 0.5s;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        text-align: left;
        text-indent: 1em;
    }
    .contentui .introduce p{
        color:#000;
        display:none;
    }
    .contentui .el-col:hover .introduce{
        height:55px;
    }
    .contentui .el-col:hover .introduce p{
        display:block;
        color:#000;
    }
    .contentui .bg-purple {
        background-color:rgba(0,0,0,0.5);
    }
    .contentui .grid-content {
        border-radius: 4px;
        min-height: 0;
        margin-top: 7.5px;
        margin-bottom: 68.5px;
        padding: 50px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 1px solid #ccc;
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:22px;
        font-weight:bolder;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
@media screen and (min-width: 1420px) and (max-width: 1799px) {
    .contentui{
        width:100%;
        padding: 28% 11% 0% 1%;
        box-sizing:border-box;
    }
    .contentui .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .contentui .el-col {
        border-radius: 4px;
    }
    .contentui .introduce{
        width:100%;
        height:0px;
        font-size:14px;
        font-weight:normal;
        position:absolute;
        left:0;
        bottom:0;
        background:rgba(200,200,200,0.5);
        transition:height 0.5s;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
        text-indent: 1em;
    }
    .contentui .introduce p{
        color:#000;
        display:none;
    }
    .contentui .el-col:hover .introduce{
        height:40px;
    }
    .contentui .el-col:hover .introduce p{
        display:block;
        color:#000;
    }
    .contentui .bg-purple {
        background-color:rgba(0,0,0,0.5);
    }
    .contentui .grid-content {
        width:114%;
        border-radius: 4px;
        min-height: 0;
        margin-top: 7.5px;
        margin-bottom: 46.5px;
        padding: 38px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 1px solid #ccc;
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:18px;
        font-weight:bolder;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
@media screen and (min-width: 1270px) and (max-width: 1419px) {
    .contentui{
        width:93%;
        padding: 26% 7% 5% 1%;
        box-sizing:border-box;
    }
    .contentui .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .contentui .el-col {
        border-radius: 4px;
    }
    .contentui .introduce{
        width:100%;
        height:0px;
        font-size:9px;
        font-weight:normal;
        position:absolute;
        left:0;
        bottom:0;
        background:rgba(200,200,200,0.5);
        transition:height 0.5s;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        text-align: left;
        text-indent: 1em;
    }
    .contentui .introduce p{
        color:#000;
        display:none;
    }
    .contentui .el-col:hover .introduce{
        height:35px;
    }
    .contentui .el-col:hover .introduce p{
        display:block;
        color:#000;
    }
    .contentui .bg-purple {
        background-color:rgba(0,0,0,0.5);
    }
    .contentui .grid-content {
        width:135%;
        border-radius: 4px;
        min-height: 0;
        margin-top: 7.5px;
        margin-bottom: 28.5px;
        padding: 34px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 1px solid #ccc;
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:18px;
        font-weight:bolder;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
@media screen and (min-width: 960px) and (max-width: 1269px) {
    .contentui{
        width:91%;
        padding: 30% 7% 5% 1%;
        box-sizing:border-box;
    }
    .contentui .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .contentui .el-col {
        border-radius: 4px;
    }
    .contentui .introduce{
        width:100%;
        height:0px;
        font-size:8px;
        font-weight:normal;
        position:absolute;
        left:0;
        bottom:0;
        background:rgba(200,200,200,0.5);
        transition:height 0.5s;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-align: left;
        text-indent: 1em;
    }
    .contentui .introduce p{
        color:#000;
        display:none;
    }
    .contentui .el-col:hover .introduce{
        height:18px;
    }
    .contentui .el-col:hover .introduce p{
        display:block;
        color:#000;
    }
    .contentui .bg-purple {
        background-color:rgba(0,0,0,0.5);
    }
    .contentui .grid-content {
        width:150%;
        border-radius: 4px;
        min-height: 0;
        margin-top: 7.5px;
        margin-bottom: 15.5px;
        padding: 23px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 1px solid #ccc;
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:15px;
        font-weight:bolder;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>
