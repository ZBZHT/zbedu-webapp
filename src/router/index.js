import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/views/index'
import textCenter from '@/views/textCenter'


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
      path:'/textCenter',
      name:'textCenter',
      component:textCenter
    }
  ]
})
