import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Assets from '@/views/Assets.vue'
import Vulnerabilities from '@/views/Vulnerabilities.vue'
import ServiceInfo from '@/views/ServiceInfo.vue'
import Reports from '@/views/Reports.vue'
import Files from '@/views/Files.vue'
import UserSettings from '@/views/UserSettings.vue'
import Login from '@/views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
    },
  },
  {
    path: '/assets',
    name: 'assets',
    component: Assets,
    meta: {
      title: 'Assets',
    },
  },
  {
    path: '/vulnerabilities',
    name: 'vulnerabilities',
    component: Vulnerabilities,
    meta: {
      title: 'Vulnerabilities',
    },
  },
  {
    path: '/service-info',
    name: 'service-info',
    component: ServiceInfo,
    meta: {
      title: 'Service Info',
    },
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports,
    meta: {
      title: 'Reports',
    },
  },
  {
    path: '/files',
    name: 'files',
    component: Files,
    meta: {
      title: 'Files',
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: UserSettings,
    meta: {
      title: 'Settings',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: 'Sign In',
    },
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const pageTitle = `${to.meta.title} — Acme Asset Explorer` || 'Acme Asset Explorer'
  document.title = pageTitle
  next()
})

export default router
