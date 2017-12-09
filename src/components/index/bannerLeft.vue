<template>
  <div>
    <div class="item-a" v-for="items in leftData">
                <a>
                    <span>
                    
                        <b>{{items.title}}</b>
                        <b> > </b>
                    </span>
                </a>
                <div class="hiddenbox">
                    <b class="hd-title" v-for="items in leftData">
                        <a>{{items.children.title}}</a>
                    </b>
                    <hr/>
                    <ul class="hd-desc-ul">
                        <li class="hd-desc"><a>  </a></li>
                    </ul>
                </div>
     </div>
   </div>
</template>

<script>
export default {
  name: 'main',
  data () {
    return {
      msg: 'main',
      leftData:[
          {
            title:"新能源汽车",
            children:[
                {
                    title:"纯电动汽车"
                }
            ]
          },
          {
              title:"汽车发动机",
              children:[
                {
                    title:"纯电动汽车"
                }
            ]
          },
          {
              title:"汽车底盘",
              children:[
                {
                    title:"纯电动汽车"
                }
            ]
          },
          {
              title:"汽车电气",
              children:[
                {
                    title:"纯电动汽车"
                }
            ]
          },
          {
              title:"车身结构",
              children:[
                {
                    title:"纯电动汽车"
                }
            ]
          }
      ]
    }
  },
  mounted(){
  console.log("aaaaaaa");
  console.log(this.leftData);
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
    width:109%;
    height:53px;
    line-height:46px;
    font-size:12px;
    cursor:pointer;
    padding-left:4px;
    padding-top:20px;
}
.item-a:hover{
    background:#fff;
}
.item-a a>b{
    margin-left:25px;
}
.item-a a b{
    margin-left:25px;
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
