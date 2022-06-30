import { createVNode, render, h, defineComponent, createApp } from "vue"
import modal from "@/components/modal"
const useModal = function (_app) {
    let formModal = null
    function open(opt) {
        let dv = document.createElement('div')
        dv.id = 'w-modal-root'
        document.body.appendChild(dv)
        const removeMsg = () => {
            formModal = null
            render(formModal, dv)
            document.body.removeChild(dv)
            opt.callback &&  opt.callback()
        }
        formModal = createVNode(modal, { ...opt, removeMsg })
        _app && (formModal.appContext = _app._instance?.appContext)
        render(formModal, dv)
        return formModal
    }
    return function (opt) {
        open({ ...opt, visible: true })
    }
}
export default useModal