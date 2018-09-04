<template>
        <div class="bb-right">
            <ul id="tab">
                <li v-on:mouseenter="enter1">
                    <a class="bb-a">课程排行</a> <br/>
                </li>
                <li v-on:mouseenter="enter2">
                    <a class="bb-a">学霸排行</a> <br/>
                </li>
            </ul>
            <div id="container">
                <div id="content1" class="content" :class="{dispear : !dispear}">
                    <div class="bb-item" v-for="(item,index) in bottomRightData">
                        <span class="num"
                        :class="{top3 : index <= 2}">
                            {{index + 1}}
                        </span>
                        <b @click="sendRecommendTitle(item)">{{item.label}}</b>
                    </div>
                </div>

                <div id="content2" class="content" :class="{dispear}">
                    <div class="bb-itemName" v-for="(item,index) in bottomRightData">
                        <span class="num"
                         :class="{top3 : index <= 2}" v-show="item.name">
                            {{item.num}}
                         </span>
                        <b>{{item.name}}</b>
                    </div>
                </div>

            </div>
        </div>
</template>

<script>
  import axios from 'axios'
export default {
  name: 'bottomRight',
  props :['bottomRightData'],
  data () {
    return {
      msg: 'bottomRight',
      top3:true,
      dispear:true,
      userType:this.$store.state.userType,
      userName:this.$store.state.username,
    }
  },

  methods:{
      //为热门课程给每个课程计数
      countForHot(item){
        axios.post('/teacherCMS/countHot', {
          data: {
            courseInfo: item
          }
        }).then((res) => {
          console.log(res.data)

        });
      },
      //我的足迹添加
      myFootPrint(item){
        axios.post('/teacherCMS/addMyfoot', {
          data: {
            userName:this.userName,
            userType:this.userType,
            courseInfo: item
          }
        }).then((res) => {
          console.log(res.data)
          if (res.data.code === 0){
  //            this.addSuccess('更新成功');
          }else if (res.data.code === 1){
  //          this.$message.error('更新失败');
          }
        });
      },
      //点击下右侧标题
      sendRecommendTitle(item){
        this.$store.commit('noTreeTitle',item);
        this.$store.commit('noTreeTitle1',item);
        //添加item至我的足迹请求
        this.myFootPrint(item)
        this.countForHot(item)
        const {href} = this.$router.resolve({
                name: 'newCourse'
            });
        window.open(href, '_blank')
      },
      enter1:function(){
        return this.dispear = true
      },

      enter2:function(){
        return this.dispear = false
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
    color: inherit;
    cursor: pointer;
}
a:hover{
    text-decoration: none;
    color:#f00;
}
a:focus {
    color: #f00;
    text-decoration: none;
}
b:hover{
    color:#f00;
    cursor:pointer;
}
#container{
    position:absolute;;
}
#tab{
    display:flex;
    position: relative;
}
#tab li{
    float: left;
}
ul.tab li a{
    display:inline-block;
}
#content1{
  width: 156px;
    height: 450px;
    position: absolute;
    top: 0;
    left: -24px;
    text-align:left;
    margin-left: 23px;
}
#content2{
     width: 156px;
    height: 450px;
    position: absolute;
    top: 0;
    left: -41px;
    text-align:left;
    margin-left: 40px;
}
.dispear{
    display:none;
}
#tab li:first-child,#content1{
    background-color: #fff;
}
#tab li:first-child,#content2{
    background-color: #fff;
}
.bb-a{
    color:#222;
    font-size: 17px;
    float: left;
    height: 20px;
    line-height: 20px;
    padding-left: 2px;
    border-left:4px solid #e4393c;
    margin-right:4px;
    margin-bottom:11px;
}
.bb-a:hover{
    background:#ccc;
}
.bb-right .bb-item{
    margin-bottom: 20px;
}
.bb-right .bb-itemName{
    margin-bottom: 37px;
}
.bb-right .bb-item .top3,
.bb-right .bb-itemName .top3{
    background:#e4393c !important;
}
.bb-right .bb-item .num,
.bb-right .bb-itemName .num{
    display: inline-block;
    width: 16px;
    height: 16px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background: #a6a6a6;
    margin-right: 5px;
}
</style>
