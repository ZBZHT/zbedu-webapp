<template>
    <div class="item-a">
                <a>
                    <span>新能源<b>></b></span>

                </a>
                <div class="hiddenbox">
                    <b class="hd-title"><a href="纯电动汽车二级.html">纯电动汽车</a></b>
                    <hr/>
                    <ul class="hd-desc-ul">
                        <li class="hd-desc"><a href="动力项目一.html" target="_blank">安全操作与新车交接检查</a></li>
                        <li class="hd-desc"><a href="动力项目二.html" target="_blank">动力电池系统故障检修</a></li>
                    </ul>
                    <b class="hd-title"><a href="混合动力汽车二级.html">混合动力汽车</a></b>
                    <hr/>
                    <ul class="hd-desc-ul">
                        <li class="hd-desc"><a href="混合项目一.html" target="_blank">总体结构</a></li>
                        <li class="hd-desc"><a href="混合项目二.html" target="_blank">高压电池及管理系统故障检修</a></li>
                    </ul>
                </div>
            </div>
</template>

<script>
import navs from '@/assets/index-data.js'
export default {
  name: 'main',
  prop:['leftData'],
  data () {
    return {
      msg: 'main'
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
}
a:focus {
    color: #f00;
    text-decoration: none;
}
.banner{
  width:920px;
  height:384px;
  border:1px solid #000;
  margin:0 auto;
  position:relative;
}
.left-menu{
  z-index:2;
  width:17.5%;
  height:384px;
  padding:17px;
  padding-left:0;
  box-sizing: border-box;
  background: #2b333b;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  font-weight:200;
}
.rightbox {
    /*-webkit-box-flex: 3;*/
}
.item-a{
    width:111%;
    height:65px;
    line-height:46px;
    font-size:12px;
    cursor:pointer;
    padding-left:4px;
    padding-top:20px;
}
.item-a:hover{
    background:#fff;
}
.hiddenbox{
    width:600px;
    height:384px;
    background:#fff;
    padding-left:20px;
    position: absolute;
    top:0;
    left:161px;
    display: none;
    z-index:9999;
    cursor: auto;
    overflow: auto;
    text-align:left;
}
.item-a:hover .hiddenbox{
    display: block;
}
.hd-title a{
    display: inline-block;
    color:#262626;
    font-size: 15px;
    height:0;
}
.hiddenbox .hd-desc-ul{
    /*margin-top:-45px;
    margin-bottom: -52px;*/
}
.hiddenbox .hd-desc{
    display:inline-block;
    margin-right:10px;
    height:0;
}
.hiddenbox ul.noneli{
    margin-bottom:-40px;
}
.hiddenbox .hd-desc a{
    color:#262626;
    font-size: 14px;
    margin-top:10px;
}
.left-menu .item-a a span{
    display: inline-block;
    width:145px;
    font-size:22px;
    color:#f00;
    font-weight: bold;
}
.left-menu .item-a a i{
    color:rgba(255,0,0,0.5);
    font-size:16px;
    margin-left:10px;
}
.left-menu .item-a a:hover{
    color:#f00;
}
</style>
