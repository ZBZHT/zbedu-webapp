import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import testCenter from '@/views/testCenter'
import testQuestion from '@/views/testQuestion'

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
    }
  ]
})
