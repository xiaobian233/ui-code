import useModal  from "./useModal/useModal"
import useProvide from './useProvide/index'

export default {
    install(app) {
        app.config.globalProperties.$hooks = {
            useModal: useModal(app),
            useProvide: useProvide
        }
    }
}