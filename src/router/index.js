import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import testCenter from '@/views/testCenter'
import testQuestion from '@/views/testQuestion'
import course from '@/views/CourseDetail'
import courseNoTree from '@/views/CourseDetailNoTree'
import playPdf from '@/views/playPdf'
import playVideo from '@/views/playVideo'
import loginPage from '@/views/loginPage'
import {setCookie,getCookie,delCookie} from '../assets/js/cookie.js'

Vue.use(Router)

const routes = [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/index',
      name:'index',
      component:index
    },
    {
      path:'/testCenter',
      name:'testCenter',
      meta:{
        requireAuth:true
      },
      component:testCenter
    },
    {
      path:'/testQuestion',
      name:'testQuestion',
      component:testQuestion
    },
    {
      path: '/course',
      name: 'course',
      meta:{
        requireAuth:true
      },
      component: course
    },
    {
      path: '/courseNoTree',
      name: 'courseNoTree',
      component: courseNoTree
    },
    {
      path: '/playPdf',
      name: 'playPdf',
      component: playPdf
    },
    {
      path: '/playVideo',
      name: 'playVideo',
      component: playVideo
    },
    {
      path: '/loginPage',
      name: 'loginPage',
      component: loginPage
    }
];

const router = new Router({
    routes
});

router.beforeEach((to,from,next) => {
  console.log("11");
  if (to.matched.some(res => res.meta.requireAuth)) {
    console.log("22");
      if (!getCookie('username')){
        alert("请登录");
              next({
                path:'/loginPage',
                query:{redirect:to.fullPath}
              })
      }else{
        console.log("33");
        next();
      }
  }else{
    next();
  }
});
export default router;