import { inject, provide } from "vue"

const treeKey = Symbol('w-tree')
const useTreeProvide = (obj) => {
    provide(treeKey, obj)
}
const useTreeInject = () => {
    return inject(treeKey)
}

export default {
    useTreeProvide,
    useTreeInject
}