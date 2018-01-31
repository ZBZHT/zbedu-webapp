import Vue from 'vue'
import Router from 'vue-router'
import store from '../vuex/store'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import testCenter from '@/views/testCenter'
import exerciseCenter from '@/views/exerciseCenter'
import appraiseCenter from '@/views/appraiseCenter'
import sourceCenter from '@/views/sourceCenter'
import test from '@/views/test'
import course from '@/views/CourseDetail'
import courseNoTree from '@/views/CourseDetailNoTree'
import playPdf from '@/views/playPdf'
import playVideo from '@/views/playVideo'
import loginPage from '@/views/loginPage'
// import userManagement from '@/views/UserManagement'
import testLogin from '@/views/testLogin'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'

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
      path:'/testCenter',
      name:'testCenter',
      meta:{
        requireTest:true
      },
      component:testCenter
    },
    {
      path:'/exerciseCenter',
      name:'exerciseCenter',
      meta:{
        requireTest:true
      },
      component:exerciseCenter
    },
    {
      path:'/appraiseCenter',
      name:'appraiseCenter',
      meta:{
        requireTest:true
      },
      component:appraiseCenter
    },
    {
      path:'/sourceCenter',
      name:'sourceCenter',
      meta:{
        requireTest:true
      },
      component:sourceCenter
    },
    {
      path:'/test/:testId/title/:title',
      name:'test',
      component:test,
      meta:{
        requireTest:true,
        requireQues:true
      }
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
      path: '/course/title/:title',
      name: 'course',
      meta:{
        requireAuth:true
      },
      component: course
    },
    {
      path: '/courseNoTree/:courseId/title/:title',
      name: 'courseNoTree',
      component: courseNoTree
    },
    {
      path: '/playPdf/:courseId/pdf/:title',
      name: 'playPdf',
      component: playPdf
    },
    {
      path: '/playVideo/:courseId/video/:title',
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
var username = store.state.username;
router.beforeEach((to,from,next) => {
  console.log("11");
  if (to.matched.some(res => res.meta.requireAuth)) {
    console.log("22");
      if (!username){
            var con = confirm("请登录");
              if(con == true){
                  next({
                    path:'/loginPage',
                    query:{redirect:to.fullPath}
                  })
                  router.go(0);
                }else{
                  next({
                    path:'/',
                    query:{redirect:to.fullPath}
                  })
                  router.go(0);
                }
      }else{
        console.log("33");
        next();
      }
  }else{
    next();
  };
  if (to.matched.some(res => res.meta.requireTest)) {
      if (!username){
        var con = confirm("请登录");
          if(con == true){
              next({
                path:'/testLogin',
                query:{redirect:to.fullPath}
              })
              router.go(0);
            }else{
              next({
                path:'/',
                query:{redirect:to.fullPath}
              })
              router.go(0);
            }
      }else{
        if (to.matched.some(res => res.meta.requireQues)) {
            var con = confirm("确认用当前账号考试吗？");
            if(con == true){
              next();
            }else{
              next({
                  path:'/testLogin',
                  query:{redirect:to.fullPath}
                });
              router.go(0);
            }
        }else{
          next();
        };
      }
  }else{
    next();
  };
});
export default router;
