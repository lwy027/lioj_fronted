import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      access: 'admin'
    }
  },
  {
    path: '/NotAuth',
    name: 'NotAuth',
    component: () => import('../views/NotAuth.vue'),
    meta: {
      hideInMenu: true
    }
  }
]

export default routes
