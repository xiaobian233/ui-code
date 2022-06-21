import UseModalJSX from "./useModal"
import indexs from './index'
import { createVNode, render } from "vue"
// console.error(createVNode(indexs), 'UseModalJSX');

export const useModal = function (options) {
    let formModal
    const container = document.createElement('div')
    // const remove = () => {
    //     formModal = null
    //     render(null, container)
    //     container.remove()
    // }
    formModal = createVNode(indexs, { ...options, visible: true, title: "2311321" })
    // // _app && (formModal.appContext = _app._instance?.appContext)
    // render(formModal, container)
    // return formModal
    console.error(indexs, 'UseModalJSX');
    document.body.appendChild(formModal)
}