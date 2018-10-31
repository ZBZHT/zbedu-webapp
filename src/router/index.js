import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import courseIndex from '@/views/courseIndex'
import testCenter from '@/views/testCenter'
import exerciseCenter from '@/views/exerciseCenter'
import competitionCenter from '@/views/competitionCenter'
import sourceCenter from '@/views/sourceCenter'
import test from '@/views/test'
import realyTest from '@/views/realyTest'
import testExercise from '@/views/testExercise'
import teachTest from '@/views/teachTest'
import course from '@/views/CourseDetail'
import courseNoTree from '@/views/CourseDetailNoTree'
import newCourse from '@/views/newCourse'
import playPdf from '@/views/playPdf'
import playVideo from '@/views/playVideo'
import loginPage from '@/views/loginPage'
import resourceCenter from '@/views/resourceCenter'
import teacherCMS from '@/views/CMS/teacherCMS'
import testLogin from '@/views/testLogin'
import testSureLogin from '@/views/testSureLogin'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'
import axios from 'axios'
//import md5 from 'js-md5'



Vue.use(Router)


const routes = [
    {
      path: '/index',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/',
      name:'index',
      meta:{
        title: 'zbt首页'
      },
      component:index
      // children: [{
      //   path: 'courseIndex',
      //   component: ''
      // },{
      //
      // }
      // ]
    },
    {
      path:'/courseIndex',
      name:'courseIndex',
      meta:{
        title: 'zbt教学中心'
      },
      component:courseIndex
    },
    {
      path:'/testCenter',
      name:'testCenter',
      meta:{
        title: 'zbt考试中心'
      },
      component:testCenter
    },
    {
      path:'/teachTest',
      name:'teachTest',
      meta:{
        title: 'zbt考试中心'
      },
      component:teachTest
    },
    {
      path:'/exerciseCenter',
      name:'exerciseCenter',
      meta:{
        require:true,
        title: 'zbt实训中心'
      },
      component:exerciseCenter
    },
    {
      path:'/competitionCenter',
      name:'competitionCenter',
      meta:{
        requireAuth:true,
        title: 'zbt大赛中心'
      },
      component:competitionCenter
    },
    {
      path:'/sourceCenter',
      name:'sourceCenter',
      meta:{
        require:true,
        title: 'zbt资源中心'
      },
      component:sourceCenter
    },
    {
      path:'/test',
      name:'test',
      meta:{
        requireTest:true,
        title: 'zbt考试中心'
      },
      component:test
    },
    {
      path:'/realyTest',
      name:'realyTest',
      meta:{
        title: 'zbt考试中心'
      },
      component:realyTest
    },
    {
      path:'/testExercise',
      name:'testExercise',
      meta:{
        title: 'zbt考试中心'
      },
      component:testExercise
    },
    {
      path: '/course/label/:label',
      name: 'course',
      meta:{
        requireAuth:true,
        title: 'zbt教学中心'
      },
      component: course
    },
    {
      path: '/newCourse',
      name: 'newCourse',
      meta:{
        requireAuth:true,
        title: 'zbt教学中心'
      },
      component: newCourse
    },
    {
      path: '/courseNoTree/:courseId/label/:label',
      name: 'courseNoTree',
      meta:{
        title: 'zbt教学中心'
      },
      component: courseNoTree
    },
    {
      path: '/playPdf/:courseId/pdf/:label',
      name: 'playPdf',
      meta:{
        title: 'zbt教学中心'
      },
      component: playPdf
    },
    {
      path: '/playVideo/:courseId/video/:label',
      name: 'playVideo',
      meta:{
        title: 'zbt教学中心'
      },
      component: playVideo
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      meta:{
        title: 'zbt登录'
      },
      component: loginPage
    },
    {
      path: '/testLogin',
      name: 'testLogin',
      meta:{
        title: 'zbt考试登录'
      },
      component: testLogin
    },
    {
      path: '/testSureLogin',
      name: 'testSureLogin',
      meta:{
        title: 'zbt考试登录'
      },
      component: testSureLogin
    },
    {
      path:'/resourceCenter',
      name:'resourceCenter',
      meta:{
        title: 'zbt资源中心'
      },
      component: resourceCenter
    },
    {
      path:'/teacherCMS',
      name:'teacherCMS',
      meta:{
        title: 'zbt我的信息'
      },
      component: teacherCMS
    }
];

const router = new Router({
    routes,
    mode:'history'
});

var a = 0;
var url = document.domain;

router.beforeEach((to,from,next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  if (to.matched.some(res => res.meta.requireAuth)) {
      if (!store.state.username){
            var con = confirm("请登录");
              if(con == true){
                  next({
                    path:'/loginPage',
                    query:{redirect:to.fullPath}
                  })
                }else{
                  next({
                    path:'/',
                    query:{redirect:to.fullPath}
                  })
                //  router.go(0);
                }
      }else{
        next();
      }
  }else{
    next();
  };
  if (to.matched.some(res => res.meta.requireTest)) {
      if (!store.state.username){
        console.log("AAAA")
        var con = confirm("请登录");
          if(con == true){
              router.replace('/testLogin')
            }else{
              router.replace('/')
          }

      }else if(store.state.username && store.state.testCode == 0){
        router.replace('/testSureLogin')
        store.commit('testCode',1);
      }
  }else{
    next();
    a=1;
  };
});

//判断是否退出
axios({
  method: 'post',
  url: '/api/user/loginState',
  data: {
  //    username: this.username,
   //   password: md5(this.password)
  },
  withCredentials: true
  }).then((res)=>{
  /*传值是 1: 已登陆, 4:未登录*/
  if(res.data == 1){

  }else if(res.data == 4){
      store.commit('userType','');
      store.commit('username','');
  }
  })

export default router;
