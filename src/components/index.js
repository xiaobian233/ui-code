import emitter from "@/assets/uilt/directive/event";
import directives from '@/assets/uilt'
import hooks from "@/hook"
import button from './button/index.vue'
import row from './row/index.vue'
import dropdown from './dropdown/index.vue'
import menu from './menu/index.vue'
import menuItem from './menu/menuItem/index.vue'
import menuSubItem from './menu/menuSubItem/index.vue'
import pagination from './pagination/index.vue'
import upload from './upload/index.vue'
import fileView from './fileView/index.vue'
import modal from './modal/index.vue'
import input from './input/index.vue'

let components = [
    button,
    row,
    dropdown,
    menu,
    menuItem,
    pagination,
    upload,
    fileView,
    modal,
    menuSubItem,
    input
]

export default {
    install(app) {
        app.use(directives)
        app.use(hooks)
        components.map(x => app.component(x.name, x))
    }
}
