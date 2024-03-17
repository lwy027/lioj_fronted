import { type RouteRecordRaw } from 'vue-router'
import HomeView from '../views/home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about/index.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/index.vue'),
    meta: {
      access: 'admin'
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotAuth',
    component: () => import('../views/NotAuth.vue'),
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/user',
    name: '用户',
    component: () => import('../components/UserLayout.vue'),
    meta: {
      hideInMenu: true
    }
  }
]

export default routes
