import { createApp } from 'vue'
import InDialog from '@/components/InDialog.vue'
import EpButton from '../../node_modules/@ericpitcock/epicenter-vue-components/src/components/button/EpButton.vue'

const plugin = {
  install: (app) => {
    app.config.globalProperties.$epDialog = {
      open: (props) => {
        const dialogInstance = createApp(InDialog, {
          ...props,
          onClose: () => {
            dialogInstance.unmount()
          }
        })
        const container = document.createElement('div')
        document.body.appendChild(container)
        dialogInstance.component('EpButton', EpButton)
        dialogInstance.mount(container)
      }
    }
  }
}

export default plugin
