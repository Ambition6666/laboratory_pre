import { createRouter, createWebHistory } from 'vue-router'
import firstPage from '../views/firstPage.vue'
import login from '../views/login.vue'
import  register from '../views/register.vue'
import setting from '../views/setting.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: firstPage
    },
    {
      path: '/login',
      component: login
    },
    {
      path:'/register',
      component:register
    },
    {
      path:"/setting",
      component:setting
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

export default router
