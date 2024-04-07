import { createStore } from 'vuex'
import { faker } from '@faker-js/faker'
import { fakeUserData } from '@/views/settings/userData'
import commonProps from './commonProps.js'

export default createStore({
  modules: {
    commonProps
  },
  state: {
    approvedDomains: ['acme.io', 'test.acme.io'],
    dateRange: {
      // start 30 days ago
      from: faker.date.recent({ days: 30 }).toISOString(),
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
        message: 'Welcome to Acme Asset Explorer! You just unlocked new levels of visibility into your assets and vulnerabilities.',
        variant: 'info',
        timestamp: faker.date.past().toISOString()
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'App version 1.0.3 is now available',
        variant: 'info',
        timestamp: faker.date.past().toISOString()
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'Your support request was sent successfully',
        variant: 'success',
        timestamp: faker.date.recent().toISOString()
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'You’re running low on endpoint licenses',
        variant: 'warning',
        timestamp: faker.date.recent().toISOString()
      },
      {
        id: faker.string.uuid(),
        active: false,
        message: 'Your organization has 34 assets with new critical vulnerabilities',
        variant: 'error',
        timestamp: faker.date.recent().toISOString()
      }
    ],
    leftPanelCollapsed: false,
    rightPanelOpen: false,
    theme: 'dark'
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
    toggleLeftPanel: state => {
      state.leftPanelCollapsed = !state.leftPanelCollapsed
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
    }
  }
})
