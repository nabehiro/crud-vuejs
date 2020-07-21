import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/todos',
    name: 'Todos',
    component: () => import('../views/Todos.vue')
  },
  {
    path: '/todos/create',
    name: 'TodoCreate',
    component: () => import('../views/TodoCreate.vue')
  },
  {
    path: '/todos/edit/:id',
    name: 'TodoEdit',
    component: () => import('../views/TodoEdit.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
