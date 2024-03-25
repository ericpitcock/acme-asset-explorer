import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import Assets from '@/views/assets/Assets.vue'
import Vulnerabilities from '@/views/vulnerabilities/Vulnerabilities.vue'
import Services from '@/views/services/Services.vue'
import ServiceDetails from '@/views/services/ServiceDetails.vue'
import Reports from '@/views/reports/Reports.vue'
import Files from '@/views/files/Files.vue'
import Settings from '@/views/settings/Settings.vue'
import ServiceConfig from '@/views/settings/ServiceConfig.vue'
import Users from '@/views/settings/Users.vue'
import Alerts from '@/views/settings/Alerts.vue'
import CompanyProfile from '@/views/settings/CompanyProfile.vue'
import EscalationProcedure from '@/views/settings/EscalationProcedure.vue'
import ApiAccess from '@/views/settings/ApiAccess.vue'
import Login from '@/views/login/Login.vue'

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
    path: '/services',
    name: 'services',
    component: Services,
    meta: {
      title: 'Services',
    },
  },
  {
    path: '/services/:serviceName',
    name: 'service-details',
    component: ServiceDetails,
    meta: {
      title: 'Service Details',
    },
    props: true,
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
    component: Settings,
    meta: {
      title: 'Settings',
    },
    children: [
      {
        path: '', // This is the default child route for '/settings'
        name: 'service-config-default',
        redirect: '/settings/service-config'
      },
    ],
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

const componentMapping = {
  'Service Config': ServiceConfig,
  'Users': Users,
  'Alerts': Alerts,
  'Company Profile': CompanyProfile,
  'Escalation Procedure': EscalationProcedure,
  'API Access': ApiAccess,
}

const settingsChildren = Object.keys(componentMapping)

const settingsRoutes = settingsChildren.map((child) => {
  return {
    path: child.toLowerCase().replace(' ', '-'),
    name: child.toLowerCase().replace(' ', '-'),
    component: componentMapping[child],
    meta: {
      title: child,
    },
  }
})

routes[7].children.push(...settingsRoutes)

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
