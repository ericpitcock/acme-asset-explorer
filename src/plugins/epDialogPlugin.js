import { createApp } from 'vue'
import EpDialog from '@/components/EpDialog.vue'

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
        dialogInstance.mount(container)
      }
    }
  }
}

export default plugin
