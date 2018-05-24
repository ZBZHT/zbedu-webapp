<template>
<div>
  <div v-for="(item,index) in bannerLeftData.children">
    <div class="item-a">
                <a @click="setMsg(item)">
                    <!--<router-link :to="{path:'/course' + '/label/'+ item.label}">-->
                        <span class="item-b">
                            <span class="bleft">{{item.label}}</span>
                            <b class="jiantou"> > </b>
                        </span>
                    <!--</router-link>-->
                </a>
                <div class="hiddenbox">
                    <div v-for="item3 in item.children">
                        <b class="hd-label" @click="setMsg(item3)">
                          <!--<router-link :to="{path:'/course' + '/label/'+ item3.label}">-->
                            <a class="hiddenbox-a">{{item3.label}}</a>
                          <!--</router-link>-->

                            <!--<a @click="qqq(item3.label)">{{item3.label}}</a>-->
                        </b>
                        <hr/>
                        <ul class="hd-desc-ul">
                            <li class="hd-desc" v-for="item4 in item3.children" @click="setMsg(item4)">

                              <!--<router-link :to="{path:'/courseNoTree/'+ item4.courseId + '/label/' + item4.label}">-->
                                <a>{{item4.label}}</a>
                              <!--</router-link>-->

                            </li>
                        </ul>
                    </div>
                </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'bannerLeft',
//  props:['bannerLeftData'],
  data () {
    return {
      msg: 'bannerLeft',
      bannerLeftData:'',
      secondData:[],
      thirdData:[],
      teachingPPTimg:[],
      videoTitle:[]
    }
  },
  methods: {
    setMsg: function (item) {
      console.log(item);
      var ownLabel = "";
      for(var i = 0; i < item.label.length; i++){
          if(i == item.label.length - 2 || i == item.label.length - 1)
            ownLabel = ownLabel + item.label[i];
      }
      // console.log(ownLabel)
      if(ownLabel == "课堂" && item.children.length == 0){
          this.$message({
            showClose: true,
            message: '还没有自己的课程呢。。请在个人中心添加',
            type: 'error'
          });
      }else{
        if(item.children){
          this.$store.commit('noTreeTitle1',item);
        //  this.$router.push('/course' + '/label/'+ item.label);
          const {href} = this.$router.resolve({
                name: 'newCourse'
            });
          window.open(href, '_blank')
          //this.$router.replace('/newCourse');
      }else{
          this.$store.commit('noTreeTitle1',item);
        //  window.open('/courseNoTree/'+ item.courseId + '/label/' + item.label);
        //  this.$router.replace('/newCourse');
          const {href} = this.$router.resolve({
                name: 'newCourse'
            });
          window.open(href, '_blank')
      }
     }
      
    }
  },
  mounted(){
    if(this.$store.state.userType == "S"){

    }else{
        axios.post("/teacherCMS/getTeacherCustomCourse",{
        data:{
            userID: this.$store.state.userID,
            userType: this.$store.state.userType,
        }
        }).then((res)=>{
        var tab = res.data.techCosCou[0].tab;
        for(var i = 0; i < tab.length; i++){
            this.thirdData = []
            for(var j = 0; j < tab[i].course.length; j++){
            var ii = i + 1;    
            var jj = j + 1;    
            //    this.teachingPPTimg.push({
            //        teachingPPTimg:tab[i].course[j].teachingPPTimg
            //    })

            //    for(var t = 0; t < tab[i].course[j].videoTitle.length; t++){
            //        this.videoTitle.push({
            //            videoTitle:tab[i].course[j].videoTitle[t]
            //        })
            //    }
                
                this.thirdData.push({
                    label:tab[i].course[j].label,
                    describe:tab[i].course[j].describe,
                    videoTitle:tab[i].course[j].videoTitle,
                    teachingMaterial:tab[i].course[j].teachingMaterial,
                    courseId:'7' + ii + jj,
                    teachingPPTimg:"",
                    teachingBook:"",
                    flash2d:"",
                    workPage:''
                })
            }
            
            this.secondData.push({
                label:tab[i].label,
                courseId:'7' + ii + '0',
                children:this.thirdData
            })
        }

        }).catch(function(error){
        console.log("error init." + error)
        });
    }
    

    setTimeout(function () {
       axios.get("/readJson/bannerLeftData",{
        params:{
            user:234
        }
        }).then((res)=>{
        if(this.$store.state.userType == "S"){
            this.bannerLeftData = res.data[0];
            var newBannerLeft = [];
        //    console.log(this.bannerLeftData.children.length -1);
            for(var i = 0; i < this.bannerLeftData.children.length; i++){
            //    console.log(i)
                if(i != this.bannerLeftData.children.length -1){
                    newBannerLeft.push(this.bannerLeftData.children[i]);
                }
                //console.log(newBannerLeft)
            }  
            this.bannerLeftData.children = newBannerLeft;
        }else{
            this.bannerLeftData = res.data[0];
            var lastData = res.data[0];
        //      console.log(lastData.children[6])
        //      console.log(this.bannerLeftData[0].children[6])
        //    console.log("this.secondData");
        //    console.log(this.secondData)
            for(var h = 0; h < this.secondData.length; h++){
        //        console.log(this.secondData.length)
                this.bannerLeftData.children[6].children.push(this.secondData[h])
            }
        //    console.log(this.bannerLeftData)
            if(this.$store.state.username){
                var myName = this.$store.state.username;
                for(var i = 0; i < myName.length; i++){
                    if(i == 0){
                        var myFirstName = myName[i]
                    }
                }
                // console.log(myFirstName)
                this.bannerLeftData.children[6].label = myFirstName + '老师课堂'
            }
            
        //    console.log(this.bannerLeftData.children[6].children)
            this.$store.commit('newBannerLeft',this.bannerLeftData.children);
            
        }
        }).catch(function(error){
            console.log("error init." + error)
        });
             

    }.bind(this),1000)

    
  },
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
.left-menu{
  z-index:2;
  width:17.5%;
  height:384px;
  padding-right:17px;
  padding-top:5px;
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
    width:110%;
    height:48px;
    line-height:46px;
    font-size:12px;
    cursor:pointer;
    padding-left:4px;
    padding-top:3px;
}
.item-b{
    position:relative;
}
.item-a:hover{
    background:#fff;
}
.item-a span{
    width:180px;
}
.item-a .bleft{
    margin-left:-28px;
}
.item-a .jiantou{
    margin-left:10px;
    position:absolute;
    top:0;
    right:11px;
}
.hiddenbox{
    width:600px;
    height:100%;
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
.hiddenbox-a{
    font-weight:bolder;
    font-size:15px;
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
    margin-right:26px;
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
    width:160px;
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
