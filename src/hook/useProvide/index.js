import { inject, provide } from "vue"

const treeKey = Symbol('w-tree')
const useTreeProvide = (obj) => {
    provide(treeKey, obj)
}
const useTreeInject = () => {
    inject(treeKey)
}

export default {
    useTreeProvide,
    useTreeInject
}