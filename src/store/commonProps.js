export default {
  namespaced: true,
  state: {
    commonContainerProps: {
      styles: {
        '--ep-container-bg-color': 'var(--interface-surface)',
        '--ep-container-padding': '0 3rem',
      }
    },
    commonHeaderProps: {
      styles: {
        '--ep-header-container-bg-color': 'var(--interface-surface)'
      }
    },
    commonPageHeaderProps: {
      styles: {
        '--ep-header-container-position': 'sticky',
        '--ep-header-container-top': '0',
        '--ep-header-container-bg-color': 'var(--interface-surface)',
        '--ep-header-left-padding': '0 0 0 3rem',
        '--ep-header-right-padding': '0 3rem 0 0',
        '--ep-header-right-gap': '1rem',
        '--ep-header-z-index': 'var(--z-index--sticky)',
        '--ep-header-container-overflow': 'visible'
      }
    },
  },
}
