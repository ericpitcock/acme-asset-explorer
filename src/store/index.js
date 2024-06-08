import { createStore } from 'vuex'
import { faker } from '@faker-js/faker'
import { assetData } from './assetData.js'
import { fakeUserData } from './userData.js'
import { vulnTableData } from './vulnData.js'
import commonProps from './commonProps.js'
import { generatePastDate, generateRecentDate } from '../utils/helpers.js'

export default createStore({
  modules: {
    commonProps
  },
  state: {
    approvedDomains: ['acme.io', 'test.acme.io'],
    assets: assetData,
    dateRange: {
      // start 30 days ago
      from: generateRecentDate({ days: 30 }),
      // end today
      to: new Date().toISOString()
    },
    fakeUserData: fakeUserData(16),
    sites: [
      {
        name: 'New York City',
        address: ['123 Maple Street', 'Suite 405', 'New York, NY 10001'],
        phoneNumber: '+1 (212) 555-1234'
      },
      {
        name: 'London',
        address: ['45 Primrose Lane', 'Apartment 3B', 'London W1U 2RT'],
        phoneNumber: '+44 20 1234 5678'
      },
      {
        name: 'Tokyo',
        address: ['7 Sakura Avenue', 'Shibuya District', 'Tokyo 150-0043'],
        phoneNumber: '+81 3 1234 5678'
      }
    ],
    notifications: [
      {
        id: faker.string.uuid(),
        active: false,
        message: 'Welcome to Insight! You just unlocked new levels of visibility into your assets and vulnerabilities.',
        variant: 'info',
        timestamp: generatePastDate(),
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'App version 1.0.3 is now available',
        variant: 'info',
        timestamp: generatePastDate(),
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'Your support request was sent successfully',
        variant: 'success',
        timestamp: generateRecentDate(),
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'You’re running low on endpoint licenses',
        variant: 'warning',
        timestamp: generateRecentDate(),
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'Your organization has 34 assets with new critical vulnerabilities',
        variant: 'error',
        timestamp: generateRecentDate(),
      }
    ],
    leftPanelCollapsed: false,
    leftPanelCollapsedUser: false,
    rightPanelOpen: false,
    selectedAsset: null,
    selectedVulnerability: null,
    theme: 'dark',
    vulnerabilities: vulnTableData
  },
  getters: {
    getActiveNotifications: state => {
      return state.notifications.filter(n => n.active)
    },
    getInactiveNotifications: state => {
      return state.notifications.filter(n => !n.active)
    },
    hasActiveNotifications: state => {
      return state.notifications.length > 0
    },
    getVulnerabilityById: state => id => {
      return state.vulnerabilities.find(v => v.id === id)
    }
  },
  mutations: {
    addApprovedDomain(state, newDomain) {
      state.approvedDomains.push(newDomain)
    },
    addUserData(state, newUser) {
      // check if the user already exists by id and change that user's data
      const existingUser = state.fakeUserData.find(u => u.id === newUser.id)
      if (existingUser) {
        // replace user data
        Object.assign(existingUser, newUser)
        return
      }
      state.fakeUserData.push(newUser)
    },
    addSelectedVulnerability: (state, vulnerability) => {
      state.selectedVulnerability = vulnerability
    },
    addSelectedAsset: (state, asset) => {
      state.selectedAsset = asset
    },
    setTheme: (state, data) => {
      state.theme = data
    },
    addNotification: (state, newNotification) => {
      state.notifications.push(newNotification)
    },
    clearNotifications: state => {
      state.notifications = []
    },
    removeApprovedDomain(state, index) {
      state.approvedDomains.splice(index, 1)
    },
    removeNotification: (state, notification) => {
      state.notifications = state.notifications.filter(
        n => n.id !== notification.id
      )
    },
    removeSite: (state, index) => {
      state.sites.splice(index, 1)
    },
    // toggleLeftPanel: state => {
    //   state.leftPanelCollapsed = !state.leftPanelCollapsed
    // },
    // when the user clicks the menu button
    toggleleftPanelCollapsedUser: state => {
      if (state.leftPanelCollapsed) {
        // was set by window resize
        state.leftPanelCollapsed = false
        state.leftPanelCollapsedUser = false
        return
      }
      console.log('toggleleftPanelCollapsedUser')
      state.leftPanelCollapsedUser = !state.leftPanelCollapsedUser
    },
    // when the viewport is resized
    setLeftPanel: (state, value) => {
      state.leftPanelCollapsed = value
    },
    toggleRightPanel: state => {
      state.rightPanelOpen = !state.rightPanelOpen
    },
  },
  actions: {
    addNotification: ({ state, commit }, notification) => {
      const newNotification = {
        ...notification,
        active: true,
        id: faker.string.uuid(),
        timestamp: Date.now()
      }

      commit('addNotification', newNotification)

      // if it hasn't been dismissed, move it to the notifications center (active: false) after 5 seconds
      setTimeout(() => {
        if (!state.notifications.includes(newNotification)) return

        const index = state.notifications.findIndex(
          n => n.id === newNotification.id
        )

        state.notifications[index].active = false
      }, 5000)
    },
    clearNotifications: ({ state, commit }) => {
      commit('clearNotifications')
    },
    toggleNotificationCenter: ({ state, commit }) => {
      commit('toggleNotificationCenter')
    },
    removeNotification: ({ state, commit }, notification) => {
      commit('removeNotification', notification)
    },
    toggleTheme: ({ state, commit }) => {
      let newTheme = state.theme == 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-color-theme', newTheme)
      commit('setTheme', newTheme)
    },
  }
})
