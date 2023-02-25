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
    component: Dashboard
  },
  {
    path: '/assets',
    name: 'assets',
    component: Assets
  },
  {
    path: '/vulnerabilities',
    name: 'vulnerabilities',
    component: Vulnerabilities
  },
  {
    path: '/service-info',
    name: 'service-info',
    component: ServiceInfo
  },
  {
    path: '/reports',
    name: 'reports',
    component: Reports
  },
  {
    path: '/files',
    name: 'files',
    component: Files
  },
  {
    path: '/settings',
    name: 'settings',
    component: UserSettings
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
