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
                            {{item.num}}
                        </span>
                        <b>{{item.couse}}</b>
                    </div>
                </div>

                <div id="content2" class="content" :class="{dispear}">
                    <div class="bb-item" v-for="(item,index) in bottomRightData">
                        <span class="num"
                         :class="{top3 : index <= 2}">
                            {{item.num}}
                         </span>
                        <b>{{item.name}}</b>
                    </div>
                </div>

            </div>
        </div>
</template>

<script>
export default {
  name: 'bottomRight',
  props :['bottomRightData'],
  data () {
    return {
      msg: 'bottomRight',
      top3:true,
      dispear:true
    }
  },
  
  methods:{
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
}
#content2{
     width: 156px;
    height: 450px;
    position: absolute;
    top: 0;
    left: -41px;
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
    margin-top:-2px;
    margin-bottom: 40px;
}
.bb-right .bb-item .top3{
    background:#e4393c !important;
}
.bb-right .bb-item .num{
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
