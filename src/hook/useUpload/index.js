import { createVNode, render, h, defineComponent, createApp } from "vue"
import upload from "@/components/upload"
const useModal = function (_app) {
    let uploadcheck = null
    function open(opt) {
        let dv = document.createElement('div')
        dv.id = 'w-upload-root'
        document.body.appendChild(dv)
        const remove = () => {
            uploadcheck = null
            render(uploadcheck, dv)
            document.body.removeChild(dv)
            opt.callback &&  opt.callback()
        }
        uploadcheck = createVNode(upload, { ...opt, remove })
        _app && (uploadcheck.appContext = _app._instance?.appContext)
        render(uploadcheck, dv)
        return uploadcheck
    }
    return function (opt) {
        open({ ...opt, check: true })
    }
}
export default useModal