export default {
  namespaced: true,
  state: {
    commonContainerProps: {
      backgroundColor: 'var(--interface-surface)',
      containerPadding: '0 3rem',
    },
    commonHeaderProps: {
      backgroundColor: 'var(--interface-surface)'
    },
    commonPageHeaderProps: {
      backgroundColor: 'var(--interface-surface)',
      leftPadding: '0 0 0 3rem',
      rightPadding: '0 3rem 0 0',
      rightGap: '1rem',
      sticky: true,
      stickyTop: '0',
      zIndex: 'var(--z-index--sticky)'
    },
  },
}
