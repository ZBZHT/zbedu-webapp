<template>
    <div class="content">
        <el-row :gutter="15">
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
            this.$router.push('/testCenter');
        }else if(index == 2 && this.$store.state.userType == "S"){
            this.$router.push('/testCenter');
        }else if(index == 2 && this.$store.state.userType == "E"){
            this.$router.push('/testCenter');
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
.content{
    width:800px;
    margin:0 auto;
    padding-top:6%;
}
.el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
}
.el-col {
    border-radius: 4px;
}
.introduce{
    width:100%;
    height:0px;
    position:absolute;
    left:0;
    bottom:0;
    background:rgba(200,200,200,0.5);
    transition:height 0.5s;
}
.introduce p{
    color:#000;
    display:none;
}
.el-col:hover .introduce{
    height:80px;
}
.el-col:hover .introduce p{
    display:block;
    color:#000;
}
.bg-purple {
    background-color:rgba(0,0,0,0.5);
}
.grid-content {
    border-radius: 4px;
    min-height: 214.5px;
    margin-top: 7.5px;
    margin-bottom: 7.5px;
    padding-top: 98px;
    box-sizing: border-box;
    position:relative;
    transition:0.5s ease;
    overflow:hidden;
}
.grid-content:hover{
    transform:scale(1.05);
    box-shadow:0 10px 30px rgba(0,0,0,0.4);
}
.grid-content .p{
    font-size:22px;
    font-weight:bolder;
}
.row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
}
</style>
