import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import testCenter from '@/views/testCenter'
import test from '@/views/test'
import testQuestion from '@/components/testCenter/testQuestion'
import testAnalysis from '@/components/testCenter/testAnalysis'
import course from '@/views/CourseDetail'
import courseNoTree from '@/views/CourseDetailNoTree'
import playPdf from '@/views/playPdf'
import playVideo from '@/views/playVideo'
import loginPage from '@/views/loginPage'
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
      path:'/test',
      name:'test',
      component:test,
      meta:{
        requireTest:true,
        requireQues:true
      },
      children:[
        {
          path:'testQuestion/:testId/title/:title',
          name:'testQuestion',
          component:testQuestion
        },
        {
          path:'testAnalysis',
          name:'testAnalysis',
          component:testAnalysis
        }
      ]
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
];

const router = new Router({
    routes,
    mode:'history'
});

router.beforeEach((to,from,next) => {
  console.log("11");
  if (to.matched.some(res => res.meta.requireAuth)) {
    console.log("22");
      if (!getCookie('username')){
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
    console.log("22");
      if (!getCookie('username')){
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
          // res.meta.requireQues = false;
        }else{
          next();
        };
      }
  }else{
    next();
  };
});
export default router;
