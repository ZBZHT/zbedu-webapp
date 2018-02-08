<template>
<ul class="navlist">
    <li>
        <div class="dropdown">
            <div class="dropdown-toggle">
                <ul>
                    <li class="dr-li" v-for="(item,index) in navData" @click="goto(item.name)">
                        <a @click="fobLink(index)" class="title" :class="isSelect === item.name ? 'active' : '' ">
                            {{item.title}}
                        </a>
                        <div class="dropdown-menu" v-show="item.children">
                            <ul>
                                <li v-for="item2 in item.children">
                                    <div class="dr-a">
                                        <span >
                                          <a @click="sendMsg(item2,index)">{{item2.title}}</a>
                                          <!--<router-link :to="{path:'/course' + '/title/'+ item2.title}">{{item2.title}}</router-link>-->
                                        </span>
                                        <div class="drop-right" v-show="item2.children">
                                            <ul>
                                                <li v-for="item3 in item2.children" @click="sendMsg(item3,index)">
                                                  <!--<router-link :to="{path:'/course' + '/title/'+ item3.title}">-->
                                                    <a  href="#">{{item3.title}}</a>
                                                  <!--</router-link>-->
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </li>
</ul>

</template>

<script>
      import axios from 'axios'
      // import bus from '../../assets/js/Bus'
export default {
  name: 'navUl',
  props:['navData'],
  data () {
    return {
      msg: 'navUl',
      isSelect:'',
      isAppear:true
    }
  },
  computed:{

  },
  mounted(){
    this.isSelect = this.$route.name;
    if(this.$route.path == '/'){
        this.isSelect = '';
    }
  },
  methods: {
    sendMsg: function (item,index) {
      // this.isAppear = !this.isAppear
      if (index == 0){
        this.$router.push({path:'/course' + '/title/'+ item.title});
        this.$store.commit('newTitle',item);
      }else if(index == 1 || index== 2 || index == 3 || index == 4){
        this.$router.push('/');
      }
    },
    goto(title){
        this.isSelect = this.$route.name;
    },
    fobLink(index){
        if(index == 0){
            this.$router.push('/');
        }else if(index == 1){
            this.$router.push('/exerciseCenter');
        }else if(index == 2){
            this.$router.push('/testCenter');
        }else if(index == 3){
            this.$router.push('/appraiseCenter');
        }else if(index == 4){
            this.$router.push('/sourceCenter');
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
    color: #000;
    cursor: pointer;
    font-weight:bolder;
  text-decoration: none;
}
a:hover{
    text-decoration: none;
    color:#f00;
}
.active{
    color:#f00;
}
.dropdown-toggle>ul{
    display:flex;
}
.dropdown-toggle .dr-li{
    width:95px;
    margin-top:36px;
    height: 45px;
}
.dropdown-toggle a{
    margin-right:15px;
    font-size:20px;
}
.dropdown-menu{
    width:160px;
    border-radius:5px;
    border:1px solid #ddd;
    background:#fff;
    position:absolute;
    z-index:1000;
    margin-top:2px;
    display:none;
}
.dropdown-menu>ul{
}
.dropdown-toggle ul .dr-li:hover .dropdown-menu{
    display:block;
}
.dr-a{
    font-size: 18px;
    width:160px;
    height: 38px;
    padding-top: 9px;
}
.dr-a:hover{
    background:#ddd;
}
.dr-a>span{
    display:inline-block;
    width:160px;
}
.dr-a .jiantou{
    margin-top:0;
}
.dr-a a{
    font-size:18px;
    font-weight:bolder;
    margin-left: 10px;
}
.dr-a a:hover{
    color:#000;
}
.drop-right{
    width:97%;
    height:100%;
    background:#ddd;
    position: absolute;
    top: 0;
    left: 100%;
    padding-top: 9px;
    box-sizing:border-box;
    display:none;
    overflow:auto;
}
.dropdown-menu .dr-a:hover .drop-right{
    display:block;
}
.drop-right li{
    margin-bottom:13px;
    height:34px;
    text-align:left;
    padding-top:5px;
    box-sizing:border-box;
}
.drop-right li:hover{
    background:#aaa;
}
.drop-right a{
    font-weight:normal;
    font-size:16px;
    margin-left:5px;
}
</style>
