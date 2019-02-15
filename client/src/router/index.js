import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Shops from '@/components/Shops'
import MyShops from '@/components/MyShops'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/shops',
      name: 'shops',
      component: Shops
    },
      {
        path: '/register',
        name: 'register',
        component: Register
      },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/myshops',
      name: 'myshops',
      component: MyShops
    },
  ]
})
