import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import testCenter from '@/views/testCenter'
import header from '@/components/common/Header'
import footer from '@/components/common/Footer'
import dropmenu from '@/components/common/DropMenu'
import login from '@/components/common/Login'



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
      path: '/header',
      name: 'header',
      component: header
    },
    {
      path: '/footer',
      name: 'footer',
      component: footer
    },
    {
      path: '/dropmenu',
      name: dropmenu,
      component: dropmenu
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
