import useModal  from "./useModal/useModal"


export default {
    install(app) {
        app.config.globalProperties.$hooks = {
            useModal: useModal(app)
        }
    }
}