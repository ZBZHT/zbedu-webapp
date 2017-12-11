<template>
<div class="textCenter">
    <div class="topbox">
        <swipe></swipe>
    </div>

    <div class="middlebox">
        <div class="information">
            <p>考试通知</p>
            <hr>
            <ul>
                <li v-for="item in information">
                    <p>{{item.num}}.{{item.src}}</p>
                </li>
            </ul>
        </div>
        <div class="ph-week" v-for="(item,index) in winner" :class="{phWeekMargin : index <= 0}">
            <p>{{item.title}}</p>
            <hr>
            <ul>
                <li v-for="item2 in item.stu">{{item2.num}}.{{item2.name}}</li>
            </ul>
        </div>
    </div>

    <div class="bottombox">
        <div class="hot-test">
            <p>热门考试</p>
            <hr>
            <ul class="test">
                <li class="test-li" v-for="item in hotTest">
                        <img :src="item.url">
                        <button class="btn">
                            <a>{{item.title}}</a>
                        </button>
                </li>
            </ul>
        </div>
        <div class="grade-test">
            <p>>等级考试</p>
            <hr>
            <ul class="test">
                <li class="test-li" v-for="item in gradeTest">
                        <img :src="item.url">
                        <button class="btn">
                            <a>{{item.title}}</a>
                        </button>
                </li>
            </ul>
        </div>
        <div class="content-test">
            <p>课程考试 </p>
            <hr>
            <ul class="test">
                <li class="test-li" v-for="item in contentTest">
                        <img :src="item.url">
                        <button class="btn">
                            <a>{{item.title}}</a>
                        </button>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import swipe from '@/components/textCenter/swipe'


export default {
  name: 'textCenter',
  data () {
    return {
        phWeekMargin:true,
        information:[
          {
            num:'1',
            src:'同学们，手机登录也能进行考试啦！'
          },
          {
            num:'2',
            src:'最新消息！注意啦：目前本公司推出汽车维修工中级和汽车维修电工中级试题。'
          }
      ],
        winner:[
          {
            title:'一周考试排行榜',
            stu:[
                {
                    num:'1',
                    name:'熊永刚'
                },
                {
                    num:'2',
                    name:'卞旺阳'
                },
                {
                    num:'3',
                    name:'尹东阳'
                }
            ]
          },
          {
            title:'一月考试排行榜',
            stu:[
                {
                    num:'1',
                    name:'徐瑞'
                },
                {
                    num:'2',
                    name:'姜老师'
                },
                {
                    num:'3',
                    name:'贺林'
                }
            ]
          }
      ],
       hotTest:[
          {
            url:'src/assets/img.png',
            title:'汽车电气'
          },
          {
            url:'src/assets/img.png',
            title:'全国汽车维修工中级培训'
          },
          {
            url:'src/assets/img.png',
            title:'全国汽车维修电工中级'
          },
          {
            url:'src/assets/img.png',
            title:'新能源'
          },
          {
            url:'src/assets/img.png',
            title:'汽车底盘'
          }
      ],
      gradeTest:[
          {
            url:'src/assets/img.png',
            title:'全国汽车维修工中级培训'
          },
          {
            url:'src/assets/img.png',
            title:'全国汽车维修电工中级'
          }
      ],
      contentTest:[
          {
            url:'src/assets/img.png',
            title:'汽车发动机'
          },
          {
            url:'src/assets/img.png',
            title:'汽车电气'
          },
          {
            url:'src/assets/img.png',
            title:'汽车变速器'
          },
          {
            url:'src/assets/img.png',
            title:'新能源'
          },
          {
            url:'src/assets/img.png',
            title:'汽车底盘'
          }
      ]
    }
  },
  computed:{

      },
  methods:{

          },
  mounted(){

    },
  components:{swipe}
}
</script>

<style>
.btn{
    background-color:#e4393c;
    border-radius:5px;
    padding:8px;
}
.btn a{
    font-size:13px;
    color:#fff;
    border:0;
}
.textCenter{
    min-width:960px;
}
*{
    margin:0;
    padding:0;
}
ul li{
    list-style: none;
}
a{
    color: inherit;
    cursor: pointer;
    text-decoration:none;
}
a:hover{
    text-decoration: none;
}
hr {
    margin-top: 3px;
    margin-bottom: 20px;
    border: 0;
    border-bottom: 2px solid #f00;
}
p{
    font-size: 16px;
    font-weight:bolder;
}
.topbox{
    width:920px;
    height:295px;
    margin:0 auto;
    position:relative;
    overflow:hidden;
    margin-bottom:0;
    margin-bottom: 40px;
}
.middlebox{
    width:920px;
    display: flex;
    margin:0 auto;
    margin-bottom: 40px;
}
.information{
    width:585px;
    height:145px;
    margin-right:22px;
    background-color:#ddd;
    text-align:left;
}
.information ul li{
   margin-bottom:5px;
   margin-left: 20px;
}
.information ul li p{
    font-size:15px;
    color:#f00;
}
.ph-week{
    width:280px;
    height:145px;
    background-color:#ddd;
    text-align:left;
}
.phWeekMargin{
    margin-right:23px;
}
.ph-week ul li{
    margin-bottom:5px;
    margin-left: 22px

}
.bottombox{
    width:920px;
    margin-top:40px;
    margin:0 auto;
    /*border:1px solid #000;*/
    text-align:left;
}
.hot-test{
    width:920px;
    /*border:1px solid #000;*/
    margin-bottom:30px;
}
.bottombox .test{
    margin-left:14px;
}
.bottombox .test .test-li{
    display: inline-block;
    width:169px;
    height:165px;
    /*border:1px solid #000;*/
    margin-right:12px;
    margin-bottom:20px;
    text-align: center;
}
.bottombox .test .test-li .btn{
    margin-top:10px;
}
.grade-test{
    width:920px;
    margin-bottom:30px;
    /*border:1px solid #000;*/
}
.content-test{
    width:920px;
}
.tecono-title{
    text-align: center;
    font-size:22px;
}
</style>
