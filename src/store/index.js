import { createStore } from 'vuex'
import { faker } from '@faker-js/faker'

export default createStore({
  state: {
    commonContainerProps: {
      backgroundColor: 'var(--interface-surface)',
      containerPadding: '0 3rem',
      borderRadius: 'var(--border-radius)',
      overflow: 'hidden'
    },
    commonHeaderProps: {
      backgroundColor: 'var(--interface-surface)'
    },
    commonFooterProps: {
      backgroundColor: 'var(--interface-surface)'
    },
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
    notificationCenterOpen: false,
    // sidebar: false,
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
      return state.notifications.some(n => n.active)
    }
  },
  mutations: {
    setTheme: (state, data) => {
      state.theme = data
    },
    addNotification: (state, newNotification) => {
      console.log('addNotification mutation', newNotification)
      state.notifications.push(newNotification)
    },
    clearNotifications: state => {
      state.notifications = []
    },
    removeNotification: (state, notification) => {
      console.log('removing notification', notification)
      state.notifications = state.notifications.filter(
        n => n.id !== notification.id
      )
    },
    toggleNotificationCenter: state => {
      state.notificationCenterOpen = !state.notificationCenterOpen
    }
  },
  actions: {
    addNotification: ({ state, commit }, notification) => {
      // build new notification object
      const newNotification = {
        ...notification, // using spread syntax breaks the object reference, recevies message and variant (success, info, warning, error)
        active: true, // add active property
        id: faker.string.uuid(), // adds unique ID each time
        timestamp: Date.now() // adds timestamp
      }

      // add the notification object to the array
      commit('addNotification', newNotification)

      // if it hasn't been dismissed, move it to the notifications center (active: false) after 5 seconds
      setTimeout(() => {
        // if newNotification is not in the array, return
        if (!state.notifications.includes(newNotification)) return

        // find newNotification in the array
        const index = state.notifications.findIndex(
          n => n.id === newNotification.id
        )
        // active to false
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
