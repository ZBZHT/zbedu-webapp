import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import courseIndex from '@/views/courseIndex'
import testCenter from '@/views/testCenter'
import exerciseCenter from '@/views/exerciseCenter'
import appraiseCenter from '@/views/appraiseCenter'
import sourceCenter from '@/views/sourceCenter'
import test from '@/views/test'
import realyTest from '@/views/realyTest'
import testExercise from '@/views/testExercise'
import teachTest from '@/views/teachTest'
import course from '@/views/CourseDetail'
import courseNoTree from '@/views/CourseDetailNoTree'
import playPdf from '@/views/playPdf'
import playVideo from '@/views/playVideo'
import loginPage from '@/views/loginPage'
import resourceCenter from '@/views/resourceCenter'
import teacherCMS from '@/views/CMS/teacherCMS'
import testLogin from '@/views/testLogin'
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
      component:index
    },
    {
      path:'/courseIndex',
      name:'courseIndex',
  //    meta:{
  //      requireAuth:true
  //    },
      component:courseIndex
    },
    {
      path:'/testCenter',
      name:'testCenter',
      component:testCenter
    },
    {
      path:'/teachTest',
      name:'teachTest',
      component:teachTest
    },
    {
      path:'/exerciseCenter',
      name:'exerciseCenter',
      meta:{
        require:true
      },
      component:exerciseCenter
    },
    {
      path:'/appraiseCenter',
      name:'appraiseCenter',
      meta:{
        require:true
      },
      component:appraiseCenter
    },
    {
      path:'/sourceCenter',
      name:'sourceCenter',
      meta:{
        require:true
      },
      component:sourceCenter
    },
    {
      path:'/test',
      name:'test',
      meta:{
        requireTest:true
      },
      component:test
    },
    {
      path:'/realyTest',
      name:'realyTest',
      component:realyTest
    },
    {
      path:'/testExercise',
      name:'testExercise',
      component:testExercise
    },
    // {
    //   path:'/testQuestion/:testId/title/:title',
    //   name:'testQuestion',
    //   component:testQuestion,
    //   meta:{
    //     requireTest:true,
    //     requireQues:true
    //   }
    // },
    {
      path: '/course/label/:label',
      name: 'course',
      meta:{
        requireAuth:true
      },
      component: course
    },
    {
      path: '/courseNoTree/:courseId/label/:label',
      name: 'courseNoTree',
      component: courseNoTree
    },
    {
      path: '/playPdf/:courseId/pdf/:label',
      name: 'playPdf',
      component: playPdf
    },
    {
      path: '/playVideo/:courseId/video/:label',
      name: 'playVideo',
      component: playVideo
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    },
    {
      path: '/testLogin',
      name: 'testLogin',
      component: testLogin
    },
    {
      path:'/resourceCenter',
      name:'resourceCenter',
      component: resourceCenter
    },
    {
      path:'/teacherCMS',
      name:'teacherCMS',
      component: teacherCMS
    }
    // ,
    // {
    //   path:'/userManagement',
    //   name:'userManagement',
    //   component: userManagement
    // }
];

const router = new Router({
    routes,
    mode:'history'
});

var a = 0;
var url = document.domain;

router.beforeEach((to,from,next) => {
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

      }else if(store.state.username && a == 0){
        router.replace('/testLogin')
              a+=1;

      }
  }else{
    next();
    a=0;
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
