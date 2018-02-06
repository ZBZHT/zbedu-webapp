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
import resourceCenter from '@/views/resourceCenter'
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
      path:'/test/:testId/title/:title',
      name:'test',
      component:test,
      meta:{

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
    },
  {
    path:'/resourceCenter',
    name:'resourceCenter',
    component: resourceCenter
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
router.beforeEach((to,from,next) => {
  console.log("11");
  if (to.matched.some(res => res.meta.requireAuth)) {
    console.log("22");
      if (!store.state.username){
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
      if (!store.state.username){
        console.log("AAAA")
        var con = confirm("请登录");
          if(con == true){
              next({
                path:'/testLogin',
                query:{redirect:to.fullPath}
              })
           //   router.go(0);
            }else{
              next({
                path:'/',
                query:{redirect:to.fullPath}
              })
            //  router.go(0);
          }

      }else if(store.state.username&&a==0){
        next({
                path:'/testLogin',
                query:{redirect:to.fullPath}
              })
              a+=1;

      }
  }else{
    next();
  //  a=0;
  };
});
export default router;
