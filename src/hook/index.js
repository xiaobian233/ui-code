import useModal from "./useModal/useModal"
import useUpload from './useUpload/index'
import useProvide from './useProvide/index'

export default {
    install(app) {
        app.config.globalProperties.$hooks = {
            useModal: useModal(app),
            useUpload: useUpload(app),
            useProvide: useProvide
        }
    }
}