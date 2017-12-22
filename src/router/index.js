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

Vue.use(Router)

export default new Router({
  routes: [
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
    }
  ]
})
