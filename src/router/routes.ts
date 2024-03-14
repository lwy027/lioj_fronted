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
      access: 'canAdmin'
    }
  },
  {
    path: '/NotAuth',
    component: () => import('../views/NotAuth.vue')
  }
]

export default routes
