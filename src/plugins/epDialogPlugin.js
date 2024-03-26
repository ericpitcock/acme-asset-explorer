import { createApp } from 'vue'
import EpDialog from '@/components/EpDialog.vue'
import EpButton from '../../node_modules/@ericpitcock/epicenter-vue-components/src/components/button/EpButton.vue'

const plugin = {
  install: (app) => {
    app.config.globalProperties.$epDialog = {
      open: (props) => {
        const dialogInstance = createApp(EpDialog, {
          ...props,
          onClose: () => {
            dialogInstance.unmount()
          }
        })
        const container = document.createElement('div')
        document.body.appendChild(container)
        dialogInstance.component('ep-button', EpButton)
        dialogInstance.mount(container)
      }
    }
  }
}

export default plugin
