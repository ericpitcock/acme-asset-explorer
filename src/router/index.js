import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
// import Dashboard from '@/views/dashboard/Dashboard.vue'
import Assets from '@/views/assets/Assets.vue'
import InAssetDetails from '@/views/assets/InAssetDetails.vue'
import Vulnerabilities from '@/views/vulnerabilities/Vulnerabilities.vue'
import VulnerabilityDetails from '@/views/vulnerabilities/VulnerabilityDetails.vue'
import Services from '@/views/services/Services.vue'
import ServiceDetails from '@/views/services/ServiceDetails.vue'
import Reports from '@/views/reports/Reports.vue'
import Files from '@/views/files/Files.vue'
import Settings from '@/views/settings/Settings.vue'
import ServiceConfig from '@/views/settings/service-config/ServiceConfig.vue'
import Network from '@/views/settings/service-config/Network.vue'
import Endpoint from '@/views/settings/service-config/Endpoint.vue'
import Cloud from '@/views/settings/service-config/Cloud.vue'
import UserManagement from '@/views/settings/user-management/UserManagement.vue'
import Notifications from '@/views/settings/Notifications.vue'
import CompanyProfile from '@/views/settings/CompanyProfile.vue'
import EscalationProcedure from '@/views/settings/EscalationProcedure.vue'
import ApiAccess from '@/views/settings/api-access/ApiAccess.vue'
import ApiAccessConfiguration from '@/views/settings/api-access/ApiAccessConfiguration.vue'
import ApiAccessDocsOverview from '@/views/settings/api-access/ApiAccessDocsOverview.vue'
import ApiAccessDocsThreatIntelligence from '@/views/settings/api-access/ApiAccessDocsThreatIntelligence.vue'
import ApiAccessDocsTicketing from '@/views/settings/api-access/ApiAccessDocsTicketing.vue'
import ApiAccessDocsTesting from '@/views/settings/api-access/ApiAccessDocsTesting.vue'
import Login from '@/views/login/Login.vue'

const routes = [
  {
    path: '/',
    name: 'assets',
    component: Assets,
    meta: {
      title: 'Assets',
    },
  },
  {
    path: '/assets',
    redirect: '/',
  },
  {
    path: '/assets/:assetID',
    name: 'asset-details',
    component: InAssetDetails,
    meta: {
      title: 'Asset Details',
    },
    props: true,
    beforeEnter: (to, from, next) => {
      // using the assetID from the route, get the asset from the store
      // and commit addSelectedAsset mutation

      // if the asset is already selected, move on
      if (store.state.selectedAsset !== null) {
        return next()
      }
      // get first asset in the store
      const asset = store.state.assets[0]
      // set the first asset as the selected asset
      store.commit('addSelectedAsset', asset)
      next()
    }
  },
  {
    path: '/vulnerabilities',
    name: 'vulnerabilities',
    component: Vulnerabilities,
    meta: {
      title: 'Vulnerabilities',
    },
  },
  // routes for each vulnerability which would be like /vulnerabilities/:vulnerabilityID
  // and needs to accept a prop for the vulnerabilityID
  {
    path: '/vulnerabilities/:vulnerabilityID',
    name: 'vulnerability-details',
    component: VulnerabilityDetails,
    meta: {
      title: 'Vulnerability Details',
    },
    props: true,
    beforeEnter: (to, from, next) => {
      // if the vulnerability is already selected, move on
      if (store.state.selectedVulnerability !== null) {
        return next()
      }
      // get the first vulnerability from the store
      const vulnerability = store.state.vulnerabilities[0]
      // set the first vulnerability as the selected vulnerability
      store.commit('addSelectedVulnerability', vulnerability)
      // change the route to the vulnerability.id
      next()
    }
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
        redirect: '/settings/service-config/network'
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
  'User Management': UserManagement,
  'Notifications': Notifications,
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

routes[9].children.push(...settingsRoutes)

// children routes for service-config
routes[9].children[1].children = [
  {
    path: '', // This is the default child route for '/settings'
    name: 'network-default',
    redirect: '/settings/service-config/network'
  },
  {
    path: 'network',
    name: 'network',
    component: Network,
    meta: {
      title: 'Service Config / Network',
    },
  },
  {
    path: 'endpoint',
    name: 'endpoint',
    component: Endpoint,
    meta: {
      title: 'Service Config / Endpoint',
    },
  },
  {
    path: 'cloud',
    name: 'cloud',
    component: Cloud,
    meta: {
      title: 'Service Config / Cloud',
    },
  },
]

// children routes for api-access: configuration, docs-overview, docs-threat-intelligence, docs-ticketing, docs-testing
routes[9].children[6].children = [
  {
    path: '', // This is the default child route for '/settings'
    name: 'api-access-default',
    redirect: '/settings/api-access/configuration'
  },
  {
    path: 'configuration',
    name: 'configuration',
    component: ApiAccessConfiguration,
    meta: {
      title: 'API Access / Configuration',
    },
  },
  {
    path: 'docs-overview',
    name: 'docs-overview',
    component: ApiAccessDocsOverview,
    meta: {
      title: 'API Access / API Library Overview',
    },
  },
  {
    path: 'docs-threat-intelligence',
    name: 'docs-threat-intelligence',
    component: ApiAccessDocsThreatIntelligence,
    meta: {
      title: 'API Access / Threat Intelligence API Docs',
    },
  },
  {
    path: 'docs-ticketing',
    name: 'docs-ticketing',
    component: ApiAccessDocsTicketing,
    meta: {
      title: 'API Access / Ticketing API Docs',
    },
  },
  {
    path: 'docs-testing',
    name: 'docs-testing',
    component: ApiAccessDocsTesting,
    meta: {
      title: 'API Access / Testing and Development',
    },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const pageTitle = `${to.meta.title} — Insight` || 'Insight'
  document.title = pageTitle

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    store.dispatch('toggleTheme')
  }

  next()
})

export default router
