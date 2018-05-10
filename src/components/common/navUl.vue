<template>
    <div class="contentui">
        <el-row :gutter="5">
            <el-col :span="12"  v-for="(item,index) in navData" :key = "index">
                <a @click="fobLink(index)">
                    <div class="grid-content">
                         <!--:style="{ 'background-color':item.background,'background-repeat':'no-repeat','background-size':'cover'}"-->
                         <img class="indexPic" :src="'src/assets/imgs/'+item.background">
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
//  props:['navData'],
  data () {
    return {
        navData:[
            {
                'label':'教学中心',
                'background':'courseIndex.png'
            },
            {
                'label':'实训中心',
                'background':'exerciseIndex.png'
            },
            {
                'label':'考试中心',
                'background':'testIndex.png'
            },
            {
                'label':'资源中心',
                'background':'sourceIndex.png'
            },
            {
                'label':'大赛中心',
                'background':'competitionIndex.png'
            },
            {
                'label':'互动中心',
                'background':'interactiveIndex.png'
            }
        ]
    }
  },
  computed:{

  },
  mounted(){
    axios.get("/readJson/bannerLeftData",{
                params:{
                     user:234
                }
            }).then((res)=>{
                    this.navData = res.data;

            }).catch(function(error){
                console.log("error init." + error)
            });

  },
  methods: {
      fobLink(index){
        if(index == 0){
            this.$router.push('/courseIndex');
        }else if(index == 1){
            this.$router.push('/exerciseCenter');
        }else if(index == 2 && this.$store.state.userType == "admin"){
            const {href} = this.$router.resolve({
                name: 'teachTest'
            });
            window.open(href, '_blank')
        }else if(index == 2 && this.$store.state.userType == ""){
            const {href} = this.$router.resolve({
                name: 'test'
            });
            window.open(href, '_blank')
        }else if(index == 2 && this.$store.state.userType == "S"){
            const {href} = this.$router.resolve({
                name: 'test'
            });
            window.open(href, '_blank')
        }else if(index == 2 && this.$store.state.userType == "E"){
            const {href} = this.$router.resolve({
                name: 'teachTest'
            });
            window.open(href, '_blank')
        }else if(index == 2 && this.$store.state.userType == "T"){
            const {href} = this.$router.resolve({
                name: 'teachTest'
            });
            window.open(href, '_blank')
        }else if(index == 3){
            this.$router.push('/resourceCenter');
        }else if(index == 4){
            this.$router.push('/competitionCenter');
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
        padding: 5% 5% 5% 5%;
        box-sizing:border-box;
    }
    .contentui .indexPic{
        width:35%;
        height: 60px;
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
        border-radius: 17px;
        min-height: 0;
        margin-top: 5.5px;
        padding: 8px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 4px solid rgb(105,59,60);
        background:rgb(181,135,136);
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:22px;
        font-weight:normal;
        color:#fff;
        font-size:18px;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
@media screen and (min-width: 1600px) and (max-width: 1799px) {
    .contentui{
        width:100%;
        padding: 5% 11% 0% 1%;
        box-sizing:border-box;
    }
    .contentui .indexPic{
        width:35%;
        height: 60px;
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
        height:62px;
    }
    .contentui .el-col:hover .introduce p{
        display:block;
        color:#000;
    }
    .contentui .bg-purple {
        background-color:rgba(0,0,0,0.5);
    }
    .contentui .grid-content {
        width:100%;
        border-radius: 17px;
        min-height: 0;
        margin-top: 5.5px;
        padding: 8px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 4px solid rgb(105,59,60);
        background:rgb(181,135,136);
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:18px;
        font-weight:normal;
        color:#fff;
        font-size:18px;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
@media screen and (min-width: 1480px) and (max-width: 1599px) {
    .contentui{
        width:100%;
        padding: 5% 7% 5% 1%;
        box-sizing:border-box;
    }
    .contentui .indexPic{
        width:35%;
        height: 50px;
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
        width:100%;
        border-radius: 17px;
        min-height: 0;
        margin-top: 5.5px;
        padding: 8px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 4px solid rgb(105,59,60);
        background:rgb(181,135,136);
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:16px;
        font-weight:normal;
        color:#fff;
        font-size:18px;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
@media screen and (min-width: 1280px) and (max-width: 1479px) {
    .contentui{
        width:100%;
        padding: 5% 7% 5% 1%;
        box-sizing:border-box;
    }
    .contentui .indexPic{
        width:35%;
        height: 50px;
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
        width:100%;
        border-radius: 17px;
        min-height: 0;
        margin-top: 6.5px;
        padding: 8px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 4px solid rgb(105,59,60);
        background:rgb(181,135,136);
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:16px;
        font-weight:normal;
        color:#fff;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
@media screen and (max-width: 1279px) {
    .contentui{
        width:100%;
        padding: 5% 7% 5% 1%;
        box-sizing:border-box;
    }
    .contentui .indexPic{
        width:35%;
        height: 47px;
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
        width:100%;
        border-radius: 17px;
        min-height: 0;
        margin-top: 5.5px;
        padding: 8px;
        box-sizing: border-box;
        position:relative;
        transition:0.5s ease;
        overflow:hidden;
        border: 4px solid rgb(105,59,60);
        background:rgb(181,135,136);
    }
    .contentui .grid-content:hover{
        transform:scale(1.05);
        box-shadow:0 10px 30px rgba(0,0,0,0.4);
    }
    .contentui .grid-content .p{
        font-size:15px;
        font-weight:normal;
        color:#fff;
    }
    .contentui .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
}
</style>
